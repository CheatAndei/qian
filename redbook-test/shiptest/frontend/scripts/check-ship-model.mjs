import { questions, archetypes, ARCHETYPE_ORDER, computeReport } from '../src/data/quiz.js'

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

assert(questions.length === 20, 'ship model expects 20 questions')
assert(ARCHETYPE_ORDER.length === 6, 'ship model expects six states')
assert(questions.every((question) => question.options.every((option) => ARCHETYPE_ORDER.includes(option.state))), 'every option needs a valid state signal')

let seed = 20260715
function random() {
  seed = (seed * 1664525 + 1013904223) >>> 0
  return seed / 4294967296
}

const runs = 100000
const counts = Object.fromEntries(ARCHETYPE_ORDER.map((key) => [key, 0]))
for (let run = 0; run < runs; run += 1) {
  const answers = questions.map((question) => question.options[Math.floor(random() * question.options.length)])
  const report = computeReport(answers)
  assert(report.distribution.reduce((sum, row) => sum + row.pct, 0) === 100, 'distribution must sum to 100')
  counts[report.key] += 1
}

const shares = Object.fromEntries(
  Object.entries(counts).map(([key, count]) => [key, Number(((count / runs) * 100).toFixed(2))]),
)
console.log(JSON.stringify({ runs, shares }, null, 2))
for (const [key, share] of Object.entries(shares)) {
  assert(share >= 3, `${archetypes[key].name} random baseline is below 3%: ${share}%`)
  assert(share <= 45, `${archetypes[key].name} random baseline exceeds 45%: ${share}%`)
}
