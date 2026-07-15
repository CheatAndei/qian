import {
  ARCHETYPES,
  DIMENSION_CALIBRATION,
  DIM_KEYS,
  MODEL_VERSION,
  bonusQuestion,
  buildContrastReport,
  questions,
  results,
} from '../src/data/questions.js'

const failures = []
function check(condition, message) {
  if (!condition) failures.push(message)
}

check(MODEL_VERSION.startsWith('contrast-v2'), '模型版本必须是 contrast-v2')
check(questions.length === 30, `情境题应为 30 道，当前 ${questions.length}`)
check(questions.length + 1 === 31 && bonusQuestion.maxScore === 10, '31 项流程或自评范围错误')
check(DIM_KEYS.length === 4, `主维度应为 4 个，当前 ${DIM_KEYS.length}`)
check(ARCHETYPES.length === 8, `反差人格应为 8 种，当前 ${ARCHETYPES.length}`)
check(results.length === 5, `分数区间应为 5 档，当前 ${results.length}`)
check(new Set(questions.map((question) => question.id)).size === questions.length, '题目 id 存在重复')
check(new Set(ARCHETYPES.map((item) => item.key)).size === ARCHETYPES.length, '人格 key 存在重复')

const optionIds = []
for (const question of questions) {
  check(question.options.length === 4, `第 ${question.id} 题不是 4 个选项`)
  for (const option of question.options) {
    optionIds.push(option.id)
    check(option.id.startsWith(`q${String(question.id).padStart(2, '0')}_`), `optionId 与题号不一致：${option.id}`)
    check(Number.isInteger(option.score) && option.score >= 0 && option.score <= 3, `${option.id} score 超出 0-3`)
    check(Object.keys(option.dimensions).length === DIM_KEYS.length, `${option.id} 维度数量错误`)
    for (const key of DIM_KEYS) {
      check(Number.isFinite(option.dimensions[key]) && option.dimensions[key] >= 0 && option.dimensions[key] <= 100, `${option.id}.${key} 超出 0-100`)
    }
  }
}
check(new Set(optionIds).size === optionIds.length, '全局 optionId 存在重复')
for (const key of DIM_KEYS) {
  check(Number.isFinite(DIMENSION_CALIBRATION[key]?.baseline), `${key} 缺少校准基线`)
  check(Number.isFinite(DIMENSION_CALIBRATION[key]?.scale), `${key} 缺少校准倍率`)
}

const copy = [
  bonusQuestion.question,
  bonusQuestion.subtitle,
  ...questions.flatMap((question) => [question.question, ...question.options.flatMap((option) => [option.text, option.roast])]),
  ...ARCHETYPES.flatMap((item) => [item.name, item.desc, ...(item.tags || [])]),
  ...results.flatMap((item) => [item.grade, item.title, item.subtitle, item.description, ...(item.tags || [])]),
].join('\n')
const banned = /身材照|擦边|情趣用品|床戏|少儿不宜|欲望满满|野王|人畜无害|装纯|道德标兵|嘴上说不要|老干部|攻陷|为所欲为/
check(!banned.test(copy), `仍包含不适合新版方向的表达：${copy.match(banned)?.[0] || ''}`)

function answersAt(index) {
  return questions.map((question) => ({ questionId: question.id, optionId: question.options[index].id, score: question.options[index].score }))
}

const lowReport = buildContrastReport(answersAt(0), 0)
const highReport = buildContrastReport(answersAt(3), 10)
check(lowReport?.hiddenScore === 0, `最低锚点应为 0，当前 ${lowReport?.hiddenScore}`)
check(highReport?.hiddenScore === 100, `最高锚点应为 100，当前 ${highReport?.hiddenScore}`)
check(lowReport?.evidence.length === 3 && highReport?.evidence.length === 3, '深报必须生成 3 条答题证据')

for (const result of results) {
  const target = Math.round((result.range[0] + result.range[1]) / 2)
  const base = Math.floor(target / questions.length)
  const remaining = target - (base * questions.length)
  const answers = questions.map((question, index) => {
    const level = Math.max(0, Math.min(3, base + (index < remaining ? 1 : 0)))
    const option = question.options.find((item) => item.score === level) || question.options[level]
    return { questionId: question.id, optionId: option.id, score: option.score }
  })
  const report = buildContrastReport(answers, 0)
  check(report && report.hiddenScore >= result.range[0] && report.hiddenScore <= result.range[1], `${result.grade} 区间不可达`)
}

const compactPayload = JSON.stringify(answersAt(2))
check(encodeURIComponent(compactPayload).length < 3500, `答案 URL 载荷过长：${encodeURIComponent(compactPayload).length}`)
const legacyAnswers = questions.map((question) => ({ questionId: question.id, score: 1, text: `旧版第 ${question.id} 题答案`, tags: ['🫣'] }))
check(Boolean(buildContrastReport(legacyAnswers, 5)), '旧版答案对象无法生成报告')
check(buildContrastReport(answersAt(1).slice(0, 29), 5) === null, '不完整 29 题不应生成结果')

let seed = 20260715
function random() {
  seed = (seed * 1664525 + 1013904223) >>> 0
  return seed / 4294967296
}

const sampleSize = 50000
const archetypeCounts = Object.fromEntries(ARCHETYPES.map((item) => [item.key, 0]))
const bandCounts = Object.fromEntries(results.map((item) => [item.grade, 0]))
for (let sample = 0; sample < sampleSize; sample += 1) {
  const answers = questions.map((question) => {
    const option = question.options[Math.floor(random() * 4)]
    return { questionId: question.id, optionId: option.id, score: option.score }
  })
  const report = buildContrastReport(answers, Math.floor(random() * 11))
  check(Boolean(report), `随机样本 ${sample} 未生成报告`)
  if (!report) continue
  archetypeCounts[report.archetype.key] += 1
  bandCounts[report.band.grade] += 1
}

const ranked = Object.entries(archetypeCounts).sort((a, b) => b[1] - a[1])
const topShare = ranked[0][1] / sampleSize
const reached = ranked.filter(([, count]) => count > 0).length
check(reached === ARCHETYPES.length, `随机样本只覆盖 ${reached}/${ARCHETYPES.length} 种人格`)
check(topShare < 0.32, `人格分布偏斜：${ranked[0][0]} 占 ${(topShare * 100).toFixed(2)}%`)
for (const [key, count] of ranked) {
  check(count / sampleSize >= 0.003, `${key} 占比低于 0.3%，实际 ${(count / sampleSize * 100).toFixed(2)}%`)
}

console.log(`模型：${MODEL_VERSION}`)
console.log(`流程/维度/人格：31/${DIM_KEYS.length}/${ARCHETYPES.length}`)
console.log(`URL 载荷：${encodeURIComponent(compactPayload).length} 字符`)
console.log(`随机样本覆盖：${reached}/${ARCHETYPES.length}`)
console.log(`最高人格占比：${ranked[0][0]} ${(topShare * 100).toFixed(2)}%`)
console.log('人格分布：' + ranked.map(([key, count]) => `${key} ${(count / sampleSize * 100).toFixed(2)}%`).join(' · '))
console.log('分数档分布：' + Object.entries(bandCounts).map(([key, count]) => `${key} ${(count / sampleSize * 100).toFixed(2)}%`).join(' · '))

if (failures.length) {
  console.error('\n模型检查失败：')
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exitCode = 1
} else {
  console.log('模型检查通过')
}
