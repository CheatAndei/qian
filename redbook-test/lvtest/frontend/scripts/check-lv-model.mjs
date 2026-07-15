import assert from 'node:assert/strict'
import {
  ARCHETYPE_ORDER,
  archetypes,
  computeReport,
  questions,
} from '../src/data/quiz.js'

const SAMPLE_SIZE = 240_000
const MIN_SHARE = 3
const MAX_SHARE = 45

function payload(option) {
  return {
    invest: option.invest,
    recip: option.recip,
    state: option.state,
    dims: option.dims || {},
    text: option.text,
    read: option.read,
  }
}

function closestOption(question, key) {
  const direct = question.options.find((option) => option.state === key)
  if (direct) return direct
  const [targetWarmth, targetStability] = archetypes[key].proto
  return question.options
    .slice()
    .sort((a, b) => {
      const aDistance = Math.hypot((a.invest / 3) * 100 - targetWarmth, (a.recip / 3) * 100 - targetStability)
      const bDistance = Math.hypot((b.invest / 3) * 100 - targetWarmth, (b.recip / 3) * 100 - targetStability)
      return aDistance - bDistance
    })[0]
}

let seed = 0x51f15e
function random() {
  seed = (Math.imul(seed, 1_664_525) + 1_013_904_223) >>> 0
  return seed / 4_294_967_296
}

assert.equal(questions.length, 20, 'lvtest must keep exactly 20 questions')
assert.equal(new Set(questions.map((question) => question.prompt)).size, questions.length, 'question prompts must be unique')
questions.forEach((question) => {
  assert.equal(question.options.length, 4, `question ${question.id} must have four options`)
  question.options.forEach((option) => {
    assert.ok(ARCHETYPE_ORDER.includes(option.state), `question ${question.id} has unknown state ${option.state}`)
    assert.ok(option.invest >= 0 && option.invest <= 3, `question ${question.id} warmth is out of range`)
    assert.ok(option.recip >= 0 && option.recip <= 3, `question ${question.id} stability is out of range`)
  })
})

const templateCounts = new Map()
questions.forEach((question) => {
  const signature = question.options
    .map((option) => `${option.state}:${option.invest},${option.recip}`)
    .sort()
    .join('|')
  templateCounts.set(signature, (templateCounts.get(signature) || 0) + 1)
})
const maxTemplateReuse = Math.max(...templateCounts.values())
assert.ok(maxTemplateReuse <= 2, `a numeric option template is reused ${maxTemplateReuse} times`)

const exposure = Object.fromEntries(ARCHETYPE_ORDER.map((key) => [key, 0]))
questions.forEach((question) => {
  question.options.forEach((option) => {
    exposure[option.state] += 1
  })
})
Object.entries(exposure).forEach(([key, count]) => {
  assert.ok(count >= 12 && count <= 14, `${key} option exposure ${count} is not balanced`)
  assert.ok(!/^Lv\.\s*\d/i.test(archetypes[key].name), `${key} still presents a ranked Lv label`)
})

const canonical = {}
ARCHETYPE_ORDER.forEach((key) => {
  const answers = questions.map((question) => payload(closestOption(question, key)))
  const report = computeReport(answers)
  canonical[key] = report.key
  assert.equal(report.key, key, `${key} canonical answer path resolves to ${report.key}`)
  assert.equal(report.distribution.reduce((sum, item) => sum + item.pct, 0), 100, `${key} distribution must total 100`)
  assert.ok(report.evidence.length > 0, `${key} must expose trigger evidence`)
  assert.ok(report.archetype.deep.summary.includes(report.topDimension.label), `${key} deep report must mention its top dimension`)
})

const counts = Object.fromEntries(ARCHETYPE_ORDER.map((key) => [key, 0]))
for (let index = 0; index < SAMPLE_SIZE; index += 1) {
  const answers = questions.map((question) => {
    const option = question.options[Math.floor(random() * question.options.length)]
    return payload(option)
  })
  counts[computeReport(answers).key] += 1
}

const shares = Object.fromEntries(
  ARCHETYPE_ORDER.map((key) => [key, Number(((counts[key] / SAMPLE_SIZE) * 100).toFixed(2))])
)
Object.entries(shares).forEach(([key, share]) => {
  assert.ok(share >= MIN_SHARE, `${key} structural share ${share}% is below ${MIN_SHARE}%`)
  assert.ok(share <= MAX_SHARE, `${key} structural share ${share}% exceeds ${MAX_SHARE}%`)
})

console.log('[lv-model] questions:', questions.length)
console.log('[lv-model] unique numeric templates:', templateCounts.size, 'max reuse:', maxTemplateReuse)
console.log('[lv-model] option exposure:', exposure)
console.log('[lv-model] canonical reachability:', canonical)
console.log('[lv-model] uniform structural sample:', shares)
console.log('[lv-model] calibration passed')
