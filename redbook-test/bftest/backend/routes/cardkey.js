const express = require('express')
const crypto = require('crypto')
const fs = require('fs')
const path = require('path')
const router = express.Router()

const KEYS_FILE = path.join(__dirname, '..', 'data', 'cardkeys.json')

// 确保数据文件存在
function loadKeys() {
  try {
    if (!fs.existsSync(KEYS_FILE)) {
      fs.writeFileSync(KEYS_FILE, '{}', 'utf8')
      return {}
    }
    return JSON.parse(fs.readFileSync(KEYS_FILE, 'utf8'))
  } catch (e) {
    return {}
  }
}

function saveKeys(data) {
  const dir = path.dirname(KEYS_FILE)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(KEYS_FILE, JSON.stringify(data, null, 2), 'utf8')
}

// 生成卡密
router.post('/generate', (req, res) => {
  const { count = 50, prefix = 'BF', product = 'cptest' } = req.body
  const keys = loadKeys()
  const generated = []

  for (let i = 0; i < count; i++) {
    const id = crypto.randomBytes(4).toString('hex').toUpperCase()
    const key = `${prefix}-${id.slice(0,4)}-${id.slice(4,8)}`
    keys[key] = {
      product,
      used: false,
      createdAt: new Date().toISOString(),
      usedAt: null,
    }
    generated.push(key)
  }

  saveKeys(keys)
  res.json({ ok: true, count: generated.length, keys: generated })
})

// 验证并兑换卡密
router.post('/redeem', (req, res) => {
  const { key, product } = req.body

  if (!key) return res.json({ ok: false, message: '请输入卡密' })

  const keys = loadKeys()
  const entry = keys[key.toUpperCase()]

  if (!entry) {
    return res.json({ ok: false, message: '卡密无效，请检查是否输入正确' })
  }

  if (entry.used) {
    return res.json({ ok: false, message: '该卡密已被使用' })
  }

  // 标记已使用
  entry.used = true
  entry.usedAt = new Date().toISOString()
  saveKeys(keys)

  res.json({
    ok: true,
    message: '兑换成功！',
    product: entry.product,
    unlockedAt: entry.usedAt,
  })
})

// 查询卡密状态
router.get('/check/:key', (req, res) => {
  const keys = loadKeys()
  const entry = keys[req.params.key.toUpperCase()]
  if (!entry) return res.json({ ok: false, message: '卡密不存在' })
  res.json({
    ok: true,
    used: entry.used,
    product: entry.product,
    createdAt: entry.createdAt,
    usedAt: entry.usedAt,
  })
})

// 列出所有卡密（管理用）
router.get('/list', (req, res) => {
  const keys = loadKeys()
  const list = Object.entries(keys).map(([k, v]) => ({ key: k, ...v }))
  res.json({ ok: true, total: list.length, keys: list })
})

module.exports = router
