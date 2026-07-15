import assert from 'node:assert/strict'
import { bands, computeReport, DIM_MAX, questions, RADAR_DIMS } from '../src/data/quiz.js'

assert.equal(questions.length, 20, '题目必须保持20题')
assert.equal(bands.length, 4, '结果必须保持4类')
assert.equal(new Set(bands.map((band) => band.code)).size, 4, '结果 code 必须唯一')

for (const key of RADAR_DIMS) {
  const theoretical = questions.reduce((sum, question) => (
    sum + Math.max(...question.options.map((option) => option.dims?.[key] || 0))
  ), 0)
  assert.equal(DIM_MAX[key], theoretical, `${key} 必须按理论上限归一`)
}

for (const band of bands) {
  const target = Math.round((band.range[0] + band.range[1]) / 2)
  let remainingScore = Math.round(target / 100 * questions.length * 3)
  const answers = questions.map((question) => {
    const score = Math.min(3, remainingScore)
    remainingScore -= score
    const option = question.options.find((item) => item.score === score)
    assert(option, `第${question.id}题缺少分值${score}的选项`)
    return option
  })
  const report = computeReport(answers)
  assert.equal(report.band.code, band.code, `${band.code} 的典型答案路径不可达`)
}

let seed = 0x20260715
function random() {
  seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0
  return seed / 0x100000000
}

const samples = 160000
const counts = Object.fromEntries(bands.map((band) => [band.code, 0]))
for (let i = 0; i < samples; i += 1) {
  const answers = questions.map((question) => question.options[Math.floor(random() * question.options.length)])
  const report = computeReport(answers)
  counts[report.band.code] += 1
  assert(report.band.deep.evidence.length > 0, '深报必须包含答案证据')
  Object.values(report.dims).forEach((value) => assert(value >= 0 && value <= 100, '维度必须在0-100'))
}

for (const [code, count] of Object.entries(counts)) {
  const share = count / samples
  assert(share >= 0.03 && share <= 0.50, `${code} 结构分布异常：${(share * 100).toFixed(2)}%`)
}

console.log(JSON.stringify({
  samples,
  shares: Object.fromEntries(Object.entries(counts).map(([code, count]) => [code, `${(count / samples * 100).toFixed(2)}%`])),
}, null, 2))
