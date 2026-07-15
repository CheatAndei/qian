import assert from 'node:assert/strict'
import * as model from '../src/data/quiz.js'

const {
  DIM_LABELS,
  DIM_MAX,
  questions,
  RESULT_BANDS,
  RADAR_DIMS,
  computeReport,
} = model

const SCENE_DIMS = ['strangerEnergy', 'familiarEnergy', 'onlineEnergy', 'soloRecovery']
const EXPECTED_DIMS = [...SCENE_DIMS, 'boundaryLoad']

assert.deepEqual(RADAR_DIMS, EXPECTED_DIMS, '雷达必须使用五个场景化维度')
assert.equal(questions.length, 20, '题目必须保持20题')
assert.equal(RESULT_BANDS.length, 4, '结果类型必须保持4类')
assert.equal(new Set(RESULT_BANDS.map((band) => band.key)).size, 4, '结果 key 必须唯一')

const theoreticalMax = Object.fromEntries(EXPECTED_DIMS.map((key) => [key, 0]))
for (const [questionIndex, question] of questions.entries()) {
  assert.equal(question.id, questionIndex + 1, '题目 id 必须连续')
  assert.equal(question.options.length, 4, `第${question.id}题必须有4个选项`)
  for (const option of question.options) {
    const keys = Object.keys(option.dims || {})
    assert(keys.every((key) => EXPECTED_DIMS.includes(key)), `第${question.id}题存在旧维度或未知维度`)
    const sceneHits = SCENE_DIMS.filter((key) => (option.dims?.[key] || 0) > 0)
    assert.equal(sceneHits.length, 1, `第${question.id}题每个选项必须明确归属一个主要场景`)
    assert(Number.isFinite(option.score) && option.score >= 0 && option.score <= 3, '电量反馈分必须在0..3')
    assert(option.drain?.key && option.drain.value > 0, `第${question.id}题每个选项必须声明耗电源`)
  }
  for (const key of EXPECTED_DIMS) {
    theoreticalMax[key] += Math.max(...question.options.map((option) => option.dims?.[key] || 0))
  }
}

assert.deepEqual(DIM_MAX, theoreticalMax, 'DIM_MAX 必须来自每题各维度理论最大值之和')
assert(EXPECTED_DIMS.every((key) => DIM_LABELS[key]), '五个雷达维度都必须有中文标签')

function expectedNorm(raw, key) {
  return Math.round(Math.max(0, Math.min(100, (raw[key] / theoreticalMax[key]) * 100)))
}

for (const band of RESULT_BANDS) {
  assert(SCENE_DIMS.includes(band.sceneDim), `${band.key} 必须绑定一个主要场景维度`)
  const targetedAnswers = questions.map((question) => {
    const option = [...question.options].sort(
      (a, b) => (b.dims?.[band.sceneDim] || 0) - (a.dims?.[band.sceneDim] || 0),
    )[0]
    return { score: option.score, dims: option.dims, text: option.text, read: option.read, drain: option.drain }
  })
  const report = computeReport(targetedAnswers)
  assert.equal(report.band.key, band.key, `${band.name} 必须可由结构化答案到达`)
  for (const key of EXPECTED_DIMS) {
    assert.equal(report.dims[key], expectedNorm(report.raw, key), `${key} 雷达值没有按理论最大值归一`)
  }
  assert.equal(typeof report.band.deep.highestDrain, 'string', '深报必须给出最高耗电源')
  assert(report.band.deep.recoveryMenu.length >= 3, '深报必须给出至少3项回血菜单')
  assert.equal(typeof report.band.deep.refusalScript, 'string', '深报必须给出拒绝话术')
  assert.equal(typeof report.band.deep.socialBudget, 'string', '深报必须给出社交预算')
}

const deepSignatures = RESULT_BANDS.map((band) => JSON.stringify({
  summary: band.deep.summary,
  recoveryMenu: band.deep.recoveryMenu,
  refusalScript: band.deep.refusalScript,
  socialBudget: band.deep.socialBudget,
}))
assert.equal(new Set(deepSignatures).size, 4, '四类 deep 内容必须实质差异化')

const zeroLegacyAnswers = Array.from({ length: 20 }, (_, index) => ({
  text: `legacy-${index}`,
  dims: {},
}))
const boundaryLegacyAnswers = zeroLegacyAnswers.map((answer) => ({
  ...answer,
  dims: { boundary: 3 },
}))
const zeroLegacyReport = computeReport(zeroLegacyAnswers)
const boundaryLegacyReport = computeReport(boundaryLegacyAnswers)
assert.deepEqual(boundaryLegacyReport.raw, zeroLegacyReport.raw, '旧 boundary 不得抬高任一场景电量')
assert.equal(boundaryLegacyReport.band.key, zeroLegacyReport.band.key, '旧 boundary 不得改变场景能量类型')
assert.equal(boundaryLegacyReport.index, zeroLegacyReport.index, '旧 boundary 不得抬高场景匹配度')

const deepLegacyReport = computeReport(zeroLegacyAnswers.map((answer) => ({
  ...answer,
  dims: { deepConnection: 3 },
})))
assert.equal(deepLegacyReport.band.sceneDim, 'familiarEnergy', '旧 deepConnection 只能兼容映射到熟人局')
assert.equal(deepLegacyReport.raw.strangerEnergy, 0, '旧 deepConnection 不得抬高陌生局电量')

let state = 0x6d2b79f5
function random() {
  state = (Math.imul(state, 1664525) + 1013904223) >>> 0
  return state / 0x100000000
}

const runs = 60000
const counts = Object.fromEntries(RESULT_BANDS.map((band) => [band.key, 0]))
for (let run = 0; run < runs; run += 1) {
  const answers = questions.map((question) => {
    const option = question.options[Math.floor(random() * question.options.length)]
    return { score: option.score, dims: option.dims, text: option.text, read: option.read, drain: option.drain }
  })
  const report = computeReport(answers)
  counts[report.band.key] += 1
}

const shares = Object.fromEntries(
  Object.entries(counts).map(([key, count]) => [key, Number((count / runs).toFixed(4))]),
)
for (const [key, share] of Object.entries(shares)) {
  assert(share > 0, `${key} 在均匀结构压测中不可达`)
  assert(share <= 0.45, `${key} 占比 ${(share * 100).toFixed(2)}%，超过45%`)
}

console.log('社交电量模型检查通过')
console.table(shares)
