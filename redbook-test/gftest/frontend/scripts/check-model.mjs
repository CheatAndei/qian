import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import {
  bonusQuestion,
  buildDeepReport,
  computeTopTag,
  getResult,
  neutralizeText,
  questions,
  results,
  tagMap
} from '../src/data/questions.js'

const PRODUCT = 'gftest'
const SAMPLE_SIZE = 160_000

assert.equal(questions.length, 30, 'objective question count must stay at 30')
assert.equal(bonusQuestion.maxScore, 10, 'bonus question must stay at 10 points')
assert.equal(new Set(questions.map(question => question.id)).size, questions.length, 'question ids must be unique')

for (const question of questions) {
  assert.equal(question.options.length, 4, `Q${question.id} must have four options`)
  assert.deepEqual(question.options.map(option => option.score).sort(), [0, 1, 2, 3], `Q${question.id} scores must be 0..3`)
  assert.equal(new Set(question.options.map(option => option.text)).size, 4, `Q${question.id} option text must be unique`)
  for (const option of question.options) {
    assert.ok(option.tags?.length, `Q${question.id} option must keep at least one persona tag`)
    option.tags.forEach(tag => assert.ok(tagMap[tag], `Q${question.id} references unknown tag ${tag}`))
  }
}

const reachableGrades = new Set(Array.from({ length: 101 }, (_, score) => getResult(score).grade))
assert.deepEqual(reachableGrades, new Set(results.map(result => result.grade)), 'every grade band must be reachable')

const canonicalPersonas = {}
let reachSeed = 0x4b7a1d2f
const reachNext = () => {
  reachSeed = (Math.imul(reachSeed, 1103515245) + 12345) >>> 0
  return reachSeed / 0x1_0000_0000
}
for (const target of Object.keys(tagMap)) {
  let found = false
  for (let attempt = 0; attempt < 12_000 && !found; attempt += 1) {
    const answers = questions.map(question => {
      const matching = question.options.filter(option => option.tags.includes(target))
      const pool = matching.length && reachNext() < 0.82 ? matching : question.options
      const option = pool[Math.floor(reachNext() * pool.length)]
      return { questionId: question.id, score: option.score, tags: option.tags, text: option.text }
    })
    found = computeTopTag(answers).key === target
  }
  canonicalPersonas[target] = found ? target : 'unreachable'
  assert.ok(found, `persona ${target} must be reachable by a targeted path`)
}

let seed = 0x71a4b9c3
const next = () => {
  seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0
  return seed / 0x1_0000_0000
}

const gradeCounts = Object.fromEntries(results.map(result => [result.grade, 0]))
const personaCounts = Object.fromEntries(Object.keys(tagMap).map(tag => [tag, 0]))
for (let sample = 0; sample < SAMPLE_SIZE; sample += 1) {
  const answers = questions.map(question => {
    const option = question.options[Math.floor(next() * question.options.length)]
    return { questionId: question.id, score: option.score, tags: option.tags, text: option.text }
  })
  const total = answers.reduce((sum, answer) => sum + answer.score, 0) + Math.floor(next() * 11)
  gradeCounts[getResult(total).grade] += 1
  personaCounts[computeTopTag(answers).key] += 1
}

const toPct = counts => Object.fromEntries(Object.entries(counts).map(([key, count]) => [key, Number((count * 100 / SAMPLE_SIZE).toFixed(2))]))
const gradePct = toPct(gradeCounts)
const personaPct = toPct(personaCounts)
console.log(`[${PRODUCT}] uniform grade sample:`, gradePct)
console.log(`[${PRODUCT}] uniform persona sample:`, personaPct)
assert.ok(Math.max(...Object.values(gradePct)) < 70, 'one grade band dominates at least 70% of the structural sample')
assert.ok(Math.min(...Object.values(personaPct)) >= 3, 'one persona falls below 3% of the structural sample')
assert.ok(Math.max(...Object.values(personaPct)) <= 25, 'one persona exceeds 25% of the structural sample')

const midpointAnswers = questions.map(question => {
  const option = question.options[2]
  return { questionId: question.id, score: option.score, tags: option.tags, text: option.text }
})
const deep = buildDeepReport(midpointAnswers)
assert.ok(deep.primary?.name && deep.secondary?.name && deep.watch?.name, 'deep report must include ranked dimensions')
assert.ok(deep.evidence.length >= 2, 'deep report must cite at least two answer signals')
assert.ok(deep.summary.includes(deep.primary.name) && deep.summary.includes(deep.secondary.name), 'deep summary must name primary and secondary dimensions')

const source = readFileSync(new URL('../src/data/questions.js', import.meta.url), 'utf8')
const uiSource = [
  '../src/pages/HomePage.vue',
  '../src/pages/QuizPage.vue',
  '../src/pages/ResultPage.vue',
  '../src/components/PersonaCover.vue',
  '../index.html'
].map(path => readFileSync(new URL(path, import.meta.url), 'utf8')).join('\n')
for (const phrase of ['完美女友', '单身警告', '建议原地结婚', '他得听你的', '对爱人不需要隐私', '节日限定版女友', '习得性无助', '女王范', '撩人精', '恋爱人格']) {
  assert.ok(!source.includes(phrase), `legacy phrase returned: ${phrase}`)
  assert.ok(!uiSource.includes(phrase), `legacy UI phrase returned: ${phrase}`)
}
for (const question of questions) {
  assert.ok(!/他|男朋友|女朋友|男生|女生/.test(neutralizeText(question.question)), `Q${question.id} rendered prompt is not gender neutral`)
  question.options.forEach(option => assert.ok(!/他|男朋友|女朋友|男生|女生/.test(neutralizeText(option.text)), `Q${question.id} rendered option is not gender neutral`))
}

console.log(`[${PRODUCT}] questions: ${questions.length} + bonus`)
console.log(`[${PRODUCT}] canonical personas:`, canonicalPersonas)
console.log(`[${PRODUCT}] model calibration passed`)
