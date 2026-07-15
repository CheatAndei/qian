const express = require('express')
const router = express.Router()

router.get('/global', (req, res) => {
  res.status(410).json({
    ok: false,
    code: 'STATS_NOT_AVAILABLE',
    message: '真实统计尚未接入，不展示模拟参与人数'
  })
})

module.exports = router
