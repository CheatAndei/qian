const express = require('express')
const crypto = require('crypto')
const router = express.Router()

// 虎皮椒配置（从环境变量读取）
const XUNHU_CONFIG = {
  appid: process.env.XUNHUPAY_APP_ID || '',
  appsecret: process.env.XUNHUPAY_APP_SECRET || '',
  apiUrl: 'https://api.xunhupay.com/payment/do.html',
  notifyUrl: process.env.PAYMENT_NOTIFY_URL || 'http://localhost:3000/api/payment/notify',
  returnUrl: process.env.PAYMENT_RETURN_URL || 'http://localhost:5173/#/result',
}

// 内存存储（生产环境应换数据库）
const orders = {}

// 生成签名
function generateSign(params, appsecret) {
  // 1. 过滤空值和 hash 本身
  const filtered = {}
  for (const [k, v] of Object.entries(params)) {
    if (v !== '' && v !== null && v !== undefined && k !== 'hash') {
      filtered[k] = String(v)
    }
  }
  // 2. 按 key ASCII 排序
  const sorted = Object.keys(filtered).sort()
  // 3. 拼接 key=value&key=value
  const stringA = sorted.map(k => `${k}=${filtered[k]}`).join('&')
  // 4. 追加 appsecret 后 MD5
  return crypto.createHash('md5').update(stringA + appsecret).digest('hex').toLowerCase()
}

// 生成随机字符串
function nonceStr(len = 16) {
  return crypto.randomBytes(len).toString('hex').slice(0, len)
}

// 创建订单
router.post('/create-order', async (req, res) => {
  try {
    const { productId, amount, title } = req.body

    if (!productId || !amount) {
      return res.json({ ok: false, message: '缺少必填参数' })
    }

    const tradeOrderId = `ORDER_${Date.now()}_${nonceStr(6)}`
    const timestamp = Math.floor(Date.now() / 1000)

    const params = {
      version: '1.1',
      appid: XUNHU_CONFIG.appid,
      trade_order_id: tradeOrderId,
      total_fee: Number(amount).toFixed(2),
      title: title || '男友资格考试 - 付费测评',
      time: timestamp,
      notify_url: XUNHU_CONFIG.notifyUrl,
      return_url: XUNHU_CONFIG.returnUrl,
      nonce_str: nonceStr(),
      type: 'WAP',
      wap_url: req.headers.origin || 'http://localhost:5173',
      wap_name: '男友资格考试',
    }

    params.hash = generateSign(params, XUNHU_CONFIG.appsecret)

    // 调用虎皮椒 API
    const formBody = new URLSearchParams(params).toString()
    const response = await fetch(XUNHU_CONFIG.apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formBody
    })
    const result = await response.json()

    // 保存订单
    orders[tradeOrderId] = {
      tradeOrderId,
      productId,
      amount,
      status: result.errcode === 0 ? 'pending' : 'failed',
      createdAt: new Date().toISOString(),
      xunhuOrderId: result.oderid || null,
    }

    if (result.errcode === 0) {
      res.json({
        ok: true,
        orderId: tradeOrderId,
        payUrl: result.url,           // 手机端跳转链接
        qrcodeUrl: result.url_qrcode, // PC端二维码
        orderNo: result.oderid,
      })
    } else {
      res.json({
        ok: false,
        message: result.errmsg || '创建支付订单失败',
        debug: result
      })
    }
  } catch (e) {
    console.error('创建支付订单失败:', e)
    res.json({ ok: false, message: '服务器错误: ' + e.message })
  }
})

// 支付回调
router.post('/notify', (req, res) => {
  console.log('收到支付回调:', req.body)

  const { trade_order_id, status, total_fee, transaction_id, hash, appid } = req.body

  // 验签
  const params = { ...req.body }
  const expectedHash = generateSign(params, XUNHU_CONFIG.appsecret)
  if (hash !== expectedHash) {
    console.error('回调签名验证失败')
    return res.send('fail')
  }

  const order = orders[trade_order_id]
  if (!order) {
    console.error('订单不存在:', trade_order_id)
    return res.send('fail')
  }

  if (status === 'OD') {
    order.status = 'paid'
    order.paidAt = new Date().toISOString()
    order.transactionId = transaction_id
    console.log(`✅ 订单已支付: ${trade_order_id}, 金额: ${total_fee}`)
  }

  // 必须返回 success
  res.send('success')
})

// 查询订单状态
router.get('/order-status/:orderId', (req, res) => {
  const order = orders[req.params.orderId]
  if (!order) {
    return res.json({ ok: false, message: '订单不存在' })
  }
  res.json({
    ok: true,
    orderId: order.tradeOrderId,
    status: order.status,
    amount: order.amount,
  })
})

module.exports = router
