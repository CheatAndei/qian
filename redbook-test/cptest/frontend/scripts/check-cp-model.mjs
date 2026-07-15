import { bfTags, gfTags, compute } from '../src/data/compatibility.js'

const reports = bfTags.flatMap((bf) => gfTags.map((gf) => compute(bf.key, gf.key)))

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

assert(reports.length === 144, `expected 144 combinations, received ${reports.length}`)
assert(reports.every(Boolean), 'every valid pair must return a report')
assert(new Set(reports.map((report) => report.cpCode)).size === 144, 'CP codes must be unique')
assert(reports.every((report) => !report.cpName.includes('神秘')), 'generic mysterious CP names are forbidden')
assert(reports.every((report) => report.dims.length === 5), 'every report must expose five dimensions')
assert(
  reports.every((report) => report.dims.every((dim) => dim.val >= 0 && dim.val <= 100)),
  'dimension values must remain in the 0-100 range',
)

const scores = reports.map((report) => report.score)
const grades = reports.reduce((acc, report) => {
  acc[report.grade] = (acc[report.grade] || 0) + 1
  return acc
}, {})
assert(Object.keys(grades).length === 5, 'all five result grades must remain reachable')

console.log(JSON.stringify({
  combinations: reports.length,
  uniqueCodes: new Set(reports.map((report) => report.cpCode)).size,
  uniqueNames: new Set(reports.map((report) => report.cpName)).size,
  scoreRange: [Math.min(...scores), Math.max(...scores)],
  grades,
}, null, 2))
