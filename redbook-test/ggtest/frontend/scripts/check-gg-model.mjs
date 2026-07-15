import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import * as model from '../src/data/quiz.js'

const { DIM_LABELS, DIM_MAX, questions, bands, RADAR_DIMS, computeReport } = model
const EXPECTED_DIMS = ['valueRespect', 'rhythmFit', 'trustPrivacy', 'repairSupport', 'humorSync']

assert.equal(questions.length, 20, '必须保持20题')
assert.equal(bands.length, 4, '必须保持4类结果')
assert.deepEqual(RADAR_DIMS, EXPECTED_DIMS, '必须改为五个健康友情维度')
assert.equal(new Set(bands.map((band) => band.key)).size, 4, '结果 key 必须唯一')

const theoreticalMax = Object.fromEntries(RADAR_DIMS.map((key) => [key, 0]))
for (const [index, question] of questions.entries()) {
  assert.equal(question.id, index + 1, '题号必须连续')
  assert.equal(question.options.length, 4, `第${question.id}题必须有4个选项`)
  for (const option of question.options) {
    assert(Number.isFinite(option.score) && option.score >= 0 && option.score <= 3, '选项分数必须在0..3')
    assert(Object.keys(option.dims || {}).every((key) => RADAR_DIMS.includes(key)), '选项不得包含旧维度')
  }
  for (const key of RADAR_DIMS) {
    theoreticalMax[key] += Math.max(...question.options.map((option) => option.dims?.[key] || 0))
  }
}
assert.deepEqual(DIM_MAX, theoreticalMax, '雷达必须按逐维理论最大值归一')
assert(RADAR_DIMS.every((key) => DIM_LABELS[key]), '所有维度必须有标签')

const replyQuestion = questions.find((question) => question.id === 4)
assert(replyQuestion.options.some((option) => /晚点|空下来/.test(option.text) && option.score >= 2), '允许晚回但有交代也应是稳定关系')
assert(replyQuestion.options.every((option) => !/秒回/.test(option.text) || option.score < 3), '秒回不得直接等于最高亲密')
const spendingQuestion = questions.find((question) => question.id === 9)
assert(spendingQuestion.options.some((option) => /AA|算清|预算/.test(option.text) && option.score >= 2), '清晰财务边界不得被当成疏远')
const supportQuestion = questions.find((question) => question.id === 14)
assert(supportQuestion.options.every((option) => !/骂回去|无条件站/.test(option.text) || option.score <= 1), '情绪升级或无条件站队不得高分')
const emotionQuestion = questions.find((question) => question.id === 19)
assert(emotionQuestion.options.some((option) => /陪|关心|接住/.test(option.text) && option.score >= 2), '支持对方但不情绪同步也应高分')

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
for (const band of bands) {
  const found = [...reachable.values()].find((answers) => computeReport(answers).band.key === band.key)
  assert(found, `${band.name} 必须可达`)
  const report = computeReport(found)
  for (const key of RADAR_DIMS) {
    const expected = Math.round(Math.max(0, Math.min(100, (report.raw[key] / theoreticalMax[key]) * 100)))
    assert.equal(report.dims[key], expected, `${key} 未按理论最大值归一`)
  }
  assert(report.band.deep.primaryLabel && report.band.deep.secondaryLabel, '深报必须标出主次维度')
  assert(Array.isArray(report.band.deep.evidence) && report.band.deep.evidence.length > 0, '深报必须引用答案证据')
}

const dimensionReports = RADAR_DIMS.map((dimension) => {
  const answers = questions.map((question) => [...question.options].sort(
    (a, b) => (b.dims?.[dimension] || 0) - (a.dims?.[dimension] || 0),
  )[0])
  return computeReport(answers)
})
dimensionReports.forEach((report, index) => {
  assert.equal(report.topKey, RADAR_DIMS[index], `${RADAR_DIMS[index]} 必须能成为主维度`)
})
assert.equal(new Set(dimensionReports.map((report) => report.band.deep.summary)).size, 5, '五个主维度必须生成差异化深报')

let seed = 0xdecafbad
function random() {
  seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0
  return seed / 0x100000000
}
const runs = 60000
const counts = Object.fromEntries(bands.map((band) => [band.key, 0]))
for (let run = 0; run < runs; run += 1) {
  const answers = questions.map((question) => question.options[Math.floor(random() * question.options.length)])
  counts[computeReport(answers).band.key] += 1
}
const shares = Object.fromEntries(Object.entries(counts).map(([key, count]) => [key, Number((count / runs).toFixed(4))]))
for (const [key, share] of Object.entries(shares)) {
  assert(share >= 0.03, `${key} 占比 ${(share * 100).toFixed(2)}%，低于3%`)
  assert(share <= 0.45, `${key} 占比 ${(share * 100).toFixed(2)}%，超过45%`)
}

const source = await readFile(new URL('../src/data/quiz.js', import.meta.url), 'utf8')
assert(!/走向预测|拿命珍惜|一辈子|永远在线|无条件站队|一个脑子两个身体|终身配对/.test(source), '不得包含伪预测或危险绝对表达')

console.log('闺蜜同频模型检查通过')
console.table(shares)
