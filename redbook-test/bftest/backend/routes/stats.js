const express = require('express')
const router = express.Router()

// 全平台统计（暂用内存，后续接数据库）
let globalStats = {
  totalParticipants: 128439,  // 前端显示的初始值
  avgScore: 62,
  mostCommonGrade: 'B级'
}

router.get('/global', (req, res) => {
  // 每次查询 +1 参与人数（模拟增长）
  globalStats.totalParticipants++
  res.json(globalStats)
})

module.exports = router
