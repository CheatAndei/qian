const ALL_PRODUCTS = ['bftest', 'gftest', 'cptest', 'mstest', 'lovetest', 'shiptest', 'ggtest', 'lswtest', 'emotest', 'eletest', 'citytest', 'lvtest', 'trusttest', 'last8test', 'restarttest']
const ALLOWED_PRODUCTS = new Set([...ALL_PRODUCTS, 'unknown'])

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json; charset=utf-8',
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders })
    }

    if (url.pathname === '/api/health' && request.method === 'GET') {
      return json({ ok: true, service: 'card-api' })
    }

    if (url.pathname === '/api/cardkey/redeem' && request.method === 'POST') {
      return handleRedeem(request, env)
    }

    return json({ ok: false, message: 'Not found' }, 404)
  },
}

async function handleRedeem(request, env) {
  if (!env.DB) {
    return json({ ok: false, code: 'DB_NOT_CONFIGURED', message: '卡密服务未配置，请稍后再试' }, 500)
  }

  const contentLength = Number(request.headers.get('Content-Length') || 0)
  if (contentLength > 2048) {
    return json({ ok: false, code: 'REQUEST_TOO_LARGE', message: '请求内容过大' }, 413)
  }

  const body = await request.json().catch(() => null)
  const code = normalizeCode(body?.key)
  const product = normalizeProduct(body?.product)
  const userAgent = truncate(request.headers.get('User-Agent') || '', 500)
  const ipHash = await hashIp(request.headers.get('CF-Connecting-IP') || '')

  if (!code) {
    await insertLog(env, { code: '', product, success: false, reason: 'missing_key', ipHash, userAgent })
    return json({ ok: false, code: 'MISSING_KEY', message: '请输入卡密' })
  }

  try {
    const updated = await env.DB.prepare(`
      UPDATE card_keys
      SET
        status = 'used',
        used_at = datetime('now'),
        used_by_product = ?,
        used_user_agent = ?,
        used_ip_hash = ?,
        updated_at = datetime('now')
      WHERE code = ?
        AND status = 'active'
        AND used_at IS NULL
    `).bind(product, userAgent, ipHash, code).run()

    if (updated.meta?.changes === 1) {
      const unlockedAt = new Date().toISOString()
      await insertLog(env, { code, product, success: true, reason: 'redeemed', ipHash, userAgent })
      return json({
        ok: true,
        message: '兑换成功！',
        unlockedAt,
        unlocks: ALL_PRODUCTS,
      })
    }

    const existing = await env.DB.prepare(`
      SELECT status, used_at FROM card_keys WHERE code = ? LIMIT 1
    `).bind(code).first()

    if (!existing) {
      await insertLog(env, { code, product, success: false, reason: 'not_found', ipHash, userAgent })
      return json({ ok: false, code: 'INVALID_KEY', message: '卡密无效，请检查是否输入正确' })
    }

    if (existing.status === 'used' || existing.used_at) {
      await insertLog(env, { code, product, success: false, reason: 'already_used', ipHash, userAgent })
      return json({ ok: false, code: 'ALREADY_USED', message: '该卡密已被使用' })
    }

    if (existing.status === 'disabled') {
      await insertLog(env, { code, product, success: false, reason: 'disabled', ipHash, userAgent })
      return json({ ok: false, code: 'DISABLED', message: '该卡密已被禁用，请联系客服' })
    }

    await insertLog(env, { code, product, success: false, reason: 'unavailable', ipHash, userAgent })
    return json({ ok: false, code: 'INVALID_KEY', message: '卡密不可用' })
  } catch (error) {
    console.error('redeem failed', { product, message: error?.message })
    await insertLog(env, { code, product, success: false, reason: 'server_error', ipHash, userAgent })
    return json({ ok: false, code: 'SERVER_ERROR', message: '卡密服务暂时不可用，请稍后再试' }, 500)
  }
}

async function insertLog(env, { code, product, success, reason, ipHash, userAgent }) {
  if (!env.DB) return

  try {
    const codeForLog = maskCode(code)
    await env.DB.prepare(`
      INSERT INTO redemption_logs (code, product, success, reason, ip_hash, user_agent)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(codeForLog, product, success ? 1 : 0, reason, ipHash, userAgent).run()
  } catch (_) {
    // Log writes must never block the redemption response.
  }
}

function normalizeCode(value) {
  return String(value || '').trim().replace(/\s+/g, '').toUpperCase()
}

function normalizeProduct(value) {
  const product = String(value || '').trim().toLowerCase()
  return ALLOWED_PRODUCTS.has(product) ? product : 'unknown'
}

function maskCode(code) {
  if (!code) return ''
  return code.length <= 4 ? '****' : `****${code.slice(-4)}`
}

function truncate(value, maxLength) {
  return value.length > maxLength ? value.slice(0, maxLength) : value
}

async function hashIp(ip) {
  if (!ip) return ''
  const data = new TextEncoder().encode(ip)
  const digest = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('')
}

function json(payload, status = 200) {
  return new Response(JSON.stringify(payload), { status, headers: corsHeaders })
}
