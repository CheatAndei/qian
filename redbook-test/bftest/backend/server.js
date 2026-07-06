require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() })
})

// 路由
app.use('/api/quiz', require('./routes/quiz'))
app.use('/api/payment', require('./routes/payment'))
app.use('/api/cardkey', require('./routes/cardkey'))
app.use('/api/stats', require('./routes/stats'))

app.listen(PORT, () => {
  console.log(`💘 男友资格考试后端已启动 → http://localhost:${PORT}`)
})
