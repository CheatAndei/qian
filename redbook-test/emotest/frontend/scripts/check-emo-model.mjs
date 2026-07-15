import assert from 'node:assert/strict'
import * as model from '../src/data/quiz.js'

const { DIM_LABELS, DIM_MAX, questions, RESULT_BANDS, RADAR_DIMS, computeReport } = model
const LOAD_DIMS = ['rumination', 'selfBlame', 'anticipation', 'suppression']

assert.equal(questions.length, 20, '必须保持20题')
assert.equal(RESULT_BANDS.length, 4, '必须保持4类结果')
assert.deepEqual(RADAR_DIMS, [...LOAD_DIMS, 'recovery'], '雷达维度必须保持页面兼容')
assert.equal(new Set(RESULT_BANDS.map((band) => band.key)).size, 4, '结果 key 必须唯一')

const theoreticalMax = Object.fromEntries(RADAR_DIMS.map((key) => [key, 0]))
for (const [index, question] of questions.entries()) {
  assert.equal(question.id, index + 1, '题号必须连续')
  assert.equal(question.options.length, 4, `第${question.id}题必须有4个选项`)
  for (const option of question.options) {
    assert(Number.isFinite(option.score) && option.score >= 0 && option.score <= 3, '选项分数必须在0..3')
    assert(Object.keys(option.dims || {}).every((key) => RADAR_DIMS.includes(key)), '选项不得包含未知维度')
  }
  for (const key of RADAR_DIMS) {
    theoreticalMax[key] += Math.max(...question.options.map((option) => option.dims?.[key] || 0))
  }
}
assert.deepEqual(DIM_MAX, theoreticalMax, '雷达必须使用逐维理论最大值')
assert(RADAR_DIMS.every((key) => DIM_LABELS[key]), '所有雷达维度必须有标签')

const MAX_SCORE = questions.length * 3
let reachable = new Map([[0, []]])
for (const question of questions) {
  const nextReachable = new Map()
  for (const [sum, answers] of reachable.entries()) {
    for (const option of question.options) {
      const next = sum + option.score
      if (!nextReachable.has(next)) nextReachable.set(next, [...answers, option])
    }
  }
  reachable = nextReachable
}

for (const band of RESULT_BANDS) {
  const found = [...reachable.entries()].find(([sum]) => {
    const index = Math.round((sum / MAX_SCORE) * 100)
    return computeReport(reachable.get(sum)).band.key === band.key && index >= 0
  })
  assert(found, `${band.name} 必须可达`)
  const report = computeReport(found[1])
  for (const key of RADAR_DIMS) {
    const expected = Math.round(Math.max(0, Math.min(100, (report.raw[key] / theoreticalMax[key]) * 100)))
    assert.equal(report.dims[key], expected, `${key} 未按理论最大值归一`)
  }
  assert(Array.isArray(report.band.deep.evidence) && report.band.deep.evidence.length > 0, '深报必须引用答案证据')
  assert(Array.isArray(report.band.deep.recoveryEvidence) && report.band.deep.recoveryEvidence.length > 0, '深报必须说明恢复证据')
}

const profileReports = LOAD_DIMS.map((dimension) => {
  const answers = questions.map((question) => [...question.options].sort(
    (a, b) => (b.dims?.[dimension] || 0) - (a.dims?.[dimension] || 0),
  )[0])
  return computeReport(answers)
})
profileReports.forEach((report, index) => {
  assert.equal(report.topKey, LOAD_DIMS[index], `${LOAD_DIMS[index]} 必须能成为主耗损机制`)
})
assert.equal(new Set(profileReports.map((report) => report.band.deep.summary)).size, 4, '主耗损机制必须生成差异化深报')

let seed = 0x1234abcd
function random() {
  seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0
  return seed / 0x100000000
}

const runs = 60000
const counts = Object.fromEntries(RESULT_BANDS.map((band) => [band.key, 0]))
for (let run = 0; run < runs; run += 1) {
  const answers = questions.map((question) => question.options[Math.floor(random() * question.options.length)])
  counts[computeReport(answers).band.key] += 1
}
const shares = Object.fromEntries(Object.entries(counts).map(([key, count]) => [key, Number((count / runs).toFixed(4))]))
for (const [key, share] of Object.entries(shares)) {
  assert(share >= 0.03, `${key} 占比 ${(share * 100).toFixed(2)}%，低于3%`)
  assert(share <= 0.45, `${key} 占比 ${(share * 100).toFixed(2)}%，超过45%`)
}

console.log('情绪内耗模型检查通过')
console.table(shares)
