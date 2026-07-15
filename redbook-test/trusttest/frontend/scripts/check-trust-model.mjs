import assert from 'node:assert/strict'
import {
  TRUST_OPTIONS,
  TRUST_REPORT_KEYS,
  deriveTrustResult,
  validateSelection,
} from '../src/data/trustModel.js'

const paths = []
for (const first of TRUST_OPTIONS) {
  for (const second of TRUST_OPTIONS) {
    if (second.id === first.id) continue
    for (const third of TRUST_OPTIONS) {
      if (third.id === first.id || third.id === second.id) continue
      paths.push([first.id, second.id, third.id])
    }
  }
}

assert.equal(paths.length, 336, '必须穷举 8×7×6 共 336 条有序路径')
assert.equal(TRUST_REPORT_KEYS.length, 12, '四种主型与三种不同副型必须形成 12 组合')

const counts = new Map(TRUST_REPORT_KEYS.map((key) => [key, 0]))
for (const path of paths) {
  const result = deriveTrustResult(path)
  assert.ok(result, `合法路径 ${path.join('')} 必须产生结果`)
  counts.set(result.key, (counts.get(result.key) || 0) + 1)
}

for (const [key, count] of counts) {
  assert.equal(count, 28, `${key} 应恰好覆盖 28 条路径`)
}

assert.notEqual(
  deriveTrustResult(['A', 'C', 'E']).key,
  deriveTrustResult(['C', 'A', 'E']).key,
  '改变第一选择必须改变主型，模型需要保持顺序敏感',
)
assert.notEqual(
  deriveTrustResult(['A', 'C', 'E']).key,
  deriveTrustResult(['A', 'E', 'C']).key,
  '同主型下，最早出现的不同类别必须决定副型',
)

const invalidSelections = [
  null,
  [],
  ['A'],
  ['A', 'B'],
  ['A', 'A', 'C'],
  ['A', 'B', 'C', 'D'],
  ['A', 'B', 'Z'],
  'ABC',
]

for (const selection of invalidSelections) {
  assert.equal(validateSelection(selection), false, `非法选择不应通过校验：${String(selection)}`)
  assert.equal(deriveTrustResult(selection), null, `非法选择不应产生结果：${String(selection)}`)
}

console.log('trust model ok: 336 paths, 12 combinations, 28 paths each')
