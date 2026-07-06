const express = require('express')
const router = express.Router()

// 内存存储（后续可换数据库）
const submissions = []

// 提交成绩
router.post('/submit', (req, res) => {
  const { objective, bonus, total, tags, grade } = req.body

  if (total == null || grade == null) {
    return res.status(400).json({ error: '缺少必填字段' })
  }

  const record = {
    id: submissions.length + 1,
    objective: objective || 0,
    bonus: bonus || 0,
    total,
    grade,
    tags: tags || [],
    createdAt: new Date().toISOString()
  }

  submissions.push(record)

  res.json({
    ok: true,
    record,
    stats: getStats()
  })
})

// 获取统计
router.get('/stats', (req, res) => {
  res.json(getStats())
})

function getStats() {
  const total = submissions.length
  if (total === 0) return { total, avgScore: 0, gradeDist: {}, topTags: [] }

  const avgScore = Math.round(submissions.reduce((s, r) => s + r.total, 0) / total)

  // 等级分布
  const gradeDist = {}
  submissions.forEach(r => {
    gradeDist[r.grade] = (gradeDist[r.grade] || 0) + 1
  })

  // 最常见 tag
  const tagCounts = {}
  submissions.forEach(r => {
    (r.tags || []).forEach(t => {
      tagCounts[t.name || t.key] = (tagCounts[t.name || t.key] || 0) + 1
    })
  })
  const topTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => ({ name, count }))

  return { total, avgScore, gradeDist, topTags }
}

module.exports = router
