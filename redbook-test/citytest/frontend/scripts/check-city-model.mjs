import {
  ANSWER_VERSION,
  ARCHETYPE_ORDER,
  CITY_PROFILES,
  CLUSTERS,
  DIMENSION_CALIBRATION,
  DIM_KEYS,
  MODEL_VERSION,
  computeReport,
  decodeAnswers,
  encodeAnswers,
  questions,
  scoreCityCandidates,
} from '../src/data/quiz.js'

const EXPECTED_CITIES = [
  'beijing', 'shanghai', 'shenzhen', 'guangzhou',
  'hangzhou', 'nanjing', 'suzhou', 'ningbo', 'hefei',
  'wuhan', 'changsha', 'nanchang', 'zhengzhou',
  'chengdu', 'chongqing', 'kunming', 'dali', 'guiyang',
  'qingdao', 'jinan', 'dalian', 'shenyang', 'harbin',
  'xiamen', 'fuzhou', 'quanzhou', 'zhuhai', 'nanning', 'haikou',
  'xian', 'lanzhou', 'urumqi',
]

const failures = []
function check(condition, message) {
  if (!condition) failures.push(message)
}

check(MODEL_VERSION.startsWith('city-v2'), 'MODEL_VERSION 必须是 city-v2')
check(ANSWER_VERSION === 'v2', '紧凑答案版本必须是 v2')
check(questions.length === 20, `题目数量应为 20，当前为 ${questions.length}`)
check(DIM_KEYS.length === 10, `维度数量应为 10，当前为 ${DIM_KEYS.length}`)
check(CLUSTERS.length === 6, `气质簇数量应为 6，当前为 ${CLUSTERS.length}`)
check(ARCHETYPE_ORDER.length === 32, `城市数量应为 32，当前为 ${ARCHETYPE_ORDER.length}`)
check(new Set(ARCHETYPE_ORDER).size === ARCHETYPE_ORDER.length, '城市 key 存在重复')
check(EXPECTED_CITIES.every((key) => ARCHETYPE_ORDER.includes(key)), '32 城名单不完整')
check(new Set(questions.map((question) => question.id)).size === questions.length, '题目 id 存在重复')

for (const key of ARCHETYPE_ORDER) {
  const city = CITY_PROFILES[key]
  check(Boolean(city), `缺少城市数据：${key}`)
  if (!city) continue
  check(CLUSTERS.some((cluster) => cluster.key === city.cluster), `${key} 的气质簇无效`)
  check(Object.keys(city.profile || {}).length === DIM_KEYS.length, `${key} 的画像维度数量错误`)
  for (const dimension of DIM_KEYS) {
    const value = city.profile?.[dimension]
    check(Number.isFinite(value) && value >= 0 && value <= 100, `${key}.${dimension} 必须在 0-100`)
  }
}

const allOptionIds = []
const dimensionTouches = Object.fromEntries(DIM_KEYS.map((key) => [key, 0]))
for (const question of questions) {
  check(question.options.length === 4, `第 ${question.id} 题必须有 4 个选项`)
  check(new Set(question.options.map((option) => option.id)).size === 4, `第 ${question.id} 题 optionId 重复`)
  const touchedHere = new Set()
  for (const option of question.options) {
    allOptionIds.push(option.id)
    check(option.id.startsWith(`q${String(question.id).padStart(2, '0')}_`), `optionId 与题号不一致：${option.id}`)
    for (const [key, value] of Object.entries(option.scores)) {
      check(DIM_KEYS.includes(key), `未知选项维度：${option.id}.${key}`)
      check(Number.isFinite(value) && value >= 0 && value <= 100, `${option.id}.${key} 必须在 0-100`)
      touchedHere.add(key)
    }
  }
  touchedHere.forEach((key) => { dimensionTouches[key] += 1 })
}
check(new Set(allOptionIds).size === allOptionIds.length, '全局 optionId 存在重复')
for (const key of DIM_KEYS) {
  check(dimensionTouches[key] >= 2, `${key} 仅被 ${dimensionTouches[key]} 道题触达`)
  check(Number.isFinite(DIMENSION_CALIBRATION[key]?.baseline), `${key} 缺少校准基线`)
  check(Number.isFinite(DIMENSION_CALIBRATION[key]?.scale), `${key} 缺少校准倍率`)
}

const baselineIds = questions.map((question) => question.options[0].id)
const encoded = encodeAnswers(baselineIds)
check(encoded.length === 23, `V2 URL 载荷应为 23 字符，当前为 ${encoded.length}`)
const decoded = decodeAnswers(encoded)
check(decoded.ok && decoded.optionIds.join('|') === baselineIds.join('|'), 'V2 答案编解码失败')

const legacyChangedTexts = {
  7: '海边/河边能走走，风比人重要',
  15: '路上有风景/咖啡/好店就能接受',
  20: '安静、开阔、让人松下来',
}
const legacyChangedIndexes = { 7: 3, 15: 2, 20: 3 }
const legacyPayload = JSON.stringify(questions.map((question) => {
  const index = legacyChangedIndexes[question.id] ?? 0
  const option = question.options[index]
  return {
    text: legacyChangedTexts[question.id] || option.text,
    invest: option.invest,
    recip: option.recip,
    read: option.read,
  }
}))
const legacy = decodeAnswers(legacyPayload)
check(legacy.ok && legacy.version === 'legacy', '旧 JSON URL 兼容失败')
check(Boolean(computeReport(legacy.optionIds)), '旧答案无法生成报告')
check(!decodeAnswers('v2.0123').ok, '不完整 V2 答案不应通过')
check(computeReport(baselineIds.slice(0, 19)) === null, '不完整 19 题答案不应生成结果')
const baselineReport = computeReport(baselineIds)
check(baselineReport.cityMatches.length === 4, '深报城市数量必须固定为 4')
check(baselineReport.fitScore >= 0 && baselineReport.fitScore <= 100, 'fitScore 必须在 0-100')

// 检查画像是否唯一：每座城市以自身画像计算时，最近邻必须是自己。
for (const key of ARCHETYPE_ORDER) {
  const city = CITY_PROFILES[key]
  const selfDistance = 0
  const nearestOther = ARCHETYPE_ORDER
    .filter((otherKey) => otherKey !== key)
    .map((otherKey) => {
      const other = CITY_PROFILES[otherKey]
      const distance = Math.sqrt(DIM_KEYS.reduce((sum, dimension) => {
        const delta = city.profile[dimension] - other.profile[dimension]
        return sum + delta * delta
      }, 0) / DIM_KEYS.length)
      return { key: otherKey, distance }
    })
    .sort((a, b) => a.distance - b.distance)[0]
  check(nearestOther.distance > selfDistance, `${key} 与其他城市画像完全重复`)
}

function evaluateCityPath(targetKey, optionIds) {
  const state = scoreCityCandidates(optionIds)
  const target = state.scored.find((item) => item.key === targetKey)
  const bestOther = state.scored
    .filter((item) => item.key !== targetKey)
    .sort((a, b) => b.rawScore - a.rawScore)[0]
  const report = computeReport(optionIds)
  return {
    optionIds,
    report,
    user: state.user,
    targetScore: target.rawScore,
    competitor: bestOther.key,
    margin: target.rawScore - bestOther.rawScore,
    quality: (target.rawScore - bestOther.rawScore) + (target.rawScore * 0.0001),
  }
}

function targetDirectedSeed(targetKey) {
  const profile = CITY_PROFILES[targetKey].profile
  const desiredRaw = Object.fromEntries(DIM_KEYS.map((key) => [
    key,
    DIMENSION_CALIBRATION[key].baseline + ((profile[key] - 50) / DIMENSION_CALIBRATION[key].scale),
  ]))
  return questions.map((question) => question.options
    .map((option) => ({
      id: option.id,
      distance: DIM_KEYS.reduce((sum, key) => {
        const delta = (option.scores[key] ?? 50) - desiredRaw[key]
        return sum + (delta * delta)
      }, 0),
    }))
    .sort((a, b) => a.distance - b.distance || a.id.localeCompare(b.id))[0].id)
}

function deterministicSeed(cityIndex, restart) {
  if (restart === 0) return targetDirectedSeed(ARCHETYPE_ORDER[cityIndex])
  if (restart >= 1 && restart <= 4) {
    return questions.map((question) => question.options[restart - 1].id)
  }
  let localSeed = (20260715 + ((cityIndex + 1) * 2654435761) + (restart * 1013904223)) >>> 0
  return questions.map((question) => {
    localSeed = (localSeed * 1664525 + 1013904223) >>> 0
    return question.options[localSeed % 4].id
  })
}

function refineTypicalPath(targetKey, initial) {
  let current = initial
  for (let pass = 0; pass < 5; pass += 1) {
    let improved = false
    for (let questionIndex = 0; questionIndex < questions.length; questionIndex += 1) {
      let localBest = current
      for (const option of questions[questionIndex].options) {
        if (option.id === current.optionIds[questionIndex]) continue
        const candidateIds = [...current.optionIds]
        candidateIds[questionIndex] = option.id
        const candidate = evaluateCityPath(targetKey, candidateIds)
        if (candidate.report.key !== targetKey) continue
        const candidateTypicalScore = candidate.targetScore + (Math.max(0, candidate.margin) * 0.05)
        const localTypicalScore = localBest.targetScore + (Math.max(0, localBest.margin) * 0.05)
        if (candidateTypicalScore > localTypicalScore + 1e-9) localBest = candidate
      }
      if (localBest !== current) {
        current = localBest
        improved = true
      }
    }
    if (!improved) break
  }
  return current
}

function coordinateSearchCity(targetKey, cityIndex, restarts = 28) {
  let globalBest = null
  let winningBest = null
  for (let restart = 0; restart < restarts; restart += 1) {
    const ids = deterministicSeed(cityIndex, restart)
    let current = evaluateCityPath(targetKey, ids)
    let reachedTarget = false
    for (let pass = 0; pass < 5; pass += 1) {
      let improved = false
      for (let offset = 0; offset < questions.length; offset += 1) {
        const questionIndex = (offset + (pass * 7)) % questions.length
        let localBest = current
        for (const option of questions[questionIndex].options) {
          if (option.id === current.optionIds[questionIndex]) continue
          const candidateIds = [...current.optionIds]
          candidateIds[questionIndex] = option.id
          const candidate = evaluateCityPath(targetKey, candidateIds)
          if (candidate.quality > localBest.quality + 1e-9) localBest = candidate
        }
        if (localBest !== current) {
          current = localBest
          improved = true
        }
        if (current.report.key === targetKey) {
          current = refineTypicalPath(targetKey, current)
          if (!winningBest || current.targetScore > winningBest.targetScore) winningBest = current
          reachedTarget = true
          break
        }
      }
      if (reachedTarget || !improved) break
    }
    if (!globalBest || current.quality > globalBest.quality) globalBest = current
  }
  return winningBest || globalBest
}

// 每座城市必须由同一套维度距离模型找到一条完整、可复现的 20 题路径。
const reachability = ARCHETYPE_ORDER.map((key, cityIndex) => {
  const found = coordinateSearchCity(key, cityIndex)
  check(found.report.key === key, `${key} 不可达；最佳仍为 ${found.report.key}，领先差 ${found.margin.toFixed(3)}`)
  check(found.margin > 0, `${key} 仅靠整数同分或 key 顺序获胜，原始分差 ${found.margin.toFixed(3)}`)
  return { key, ...found, encoded: encodeAnswers(found.optionIds) }
})
const unreachableDiagnostics = reachability.filter((item) => item.report.key !== item.key)

// 固定随机种子压力测试，防止模型再次向少数中心画像过度收敛。
let seed = 20260715
function random() {
  seed = (seed * 1664525 + 1013904223) >>> 0
  return seed / 4294967296
}

const sampleSize = 50000
const counts = Object.fromEntries(ARCHETYPE_ORDER.map((key) => [key, 0]))
for (let sample = 0; sample < sampleSize; sample += 1) {
  const ids = questions.map((question) => question.options[Math.floor(random() * 4)].id)
  const report = computeReport(ids)
  check(Boolean(report), `随机样本 ${sample} 未生成报告`)
  if (report) counts[report.key] += 1
}

const ranked = Object.entries(counts).sort((a, b) => b[1] - a[1])
const [topKey, topCount] = ranked[0]
const topShare = topCount / sampleSize
const reached = ranked.filter(([, count]) => count > 0).length
check(topShare < 0.25, `偏斜过高：${topKey} 占 ${(topShare * 100).toFixed(2)}%`)
check(reached >= 16, `随机压力测试仅覆盖 ${reached} 座城市，画像分区过窄`)

console.log(`模型：${MODEL_VERSION}`)
console.log(`题目/维度/城市/气质簇：${questions.length}/${DIM_KEYS.length}/${ARCHETYPE_ORDER.length}/${CLUSTERS.length}`)
console.log(`紧凑答案长度：${encoded.length}`)
console.log(`逐城可达：${reachability.filter((item) => item.report.key === item.key).length}/${ARCHETYPE_ORDER.length}`)
console.log('典型路径：')
reachability.forEach((item) => console.log(`- ${item.key}: ${item.encoded} → ${item.report.key} (fit ${item.targetScore.toFixed(2)}, margin ${item.margin.toFixed(3)})`))
if (unreachableDiagnostics.length) {
  console.log('不可达诊断：')
  unreachableDiagnostics.forEach((item) => {
    const values = DIM_KEYS.map((key) => `${key}=${item.user.values[key]}`).join(',')
    console.log(`- ${item.key} vs ${item.competitor}; ${values}; constraints=${[...item.user.constraints].join('|')}`)
  })
}
console.log(`随机样本覆盖：${reached}/${ARCHETYPE_ORDER.length}`)
console.log(`最高结果占比：${CITY_PROFILES[topKey].name} ${(topShare * 100).toFixed(2)}%`)
console.log('Top 8：' + ranked.slice(0, 8).map(([key, count]) => `${CITY_PROFILES[key].name} ${(count / sampleSize * 100).toFixed(2)}%`).join(' · '))

if (failures.length) {
  console.error('\n模型检查失败：')
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exitCode = 1
} else {
  console.log('模型检查通过')
}
