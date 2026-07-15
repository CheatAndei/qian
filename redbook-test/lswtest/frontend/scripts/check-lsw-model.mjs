import { questions, computeReport, RESULT_TYPES } from '../src/data/quiz.js'

let seed = 20260715
function random() {
  seed = (seed * 1664525 + 1013904223) >>> 0
  return seed / 4294967296
}

const samples = 160000
const counts = Object.fromEntries(Object.keys(RESULT_TYPES).map((key) => [key, 0]))
for (let i = 0; i < samples; i += 1) {
  const answers = questions.map((question) => question.options[Math.floor(random() * question.options.length)])
  const report = computeReport(answers)
  counts[report.primary] += 1
  for (const value of Object.values(report.dims)) {
    if (value < 0 || value > 100) throw new Error(`维度越界: ${value}`)
  }
}

for (const [key, count] of Object.entries(counts)) {
  const share = count / samples
  if (share < 0.03 || share > 0.45) throw new Error(`${key} 分布异常: ${(share * 100).toFixed(2)}%`)
}

for (const key of Object.keys(RESULT_TYPES)) {
  const answers = questions.map((question) => (
    [...question.options].sort((a, b) => (b.dims?.[key] || 0) - (a.dims?.[key] || 0))[0]
  ))
  if (computeReport(answers).primary !== key) throw new Error(`${key} 的典型答案不可达`)
}

console.log(JSON.stringify({
  samples,
  shares: Object.fromEntries(Object.entries(counts).map(([key, count]) => [key, `${(count / samples * 100).toFixed(2)}%`])),
}, null, 2))
