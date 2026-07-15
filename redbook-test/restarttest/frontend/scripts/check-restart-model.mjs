import assert from 'node:assert/strict'
import { choices, combinations, computeRestartResult } from '../src/data/quiz.js'

const keys = choices.map((choice) => choice.key)
const paths = []

for (const first of keys) {
  for (const second of keys) {
    if (second === first) continue
    for (const third of keys) {
      if (third === first || third === second) continue
      paths.push([first, second, third])
    }
  }
}

assert.equal(paths.length, 336, '8×7×6 应生成 336 条有序路径')
assert.equal(Object.keys(combinations).length, 12, '应恰好存在 12 个主副组合')

const counts = new Map(Object.keys(combinations).map((key) => [key, 0]))
for (const path of paths) {
  const result = computeRestartResult(path)
  assert.ok(result, `合法路径 ${path.join(',')} 必须产生结果`)
  assert.ok(counts.has(result.key), `未知组合 ${result.key}`)
  assert.equal(result.selection.length, 3)
  assert.equal(result.evidence.length, 3)
  assert.equal(result.tags.length, 3)
  assert.equal(result.deep.order.length, 3)
  assert.equal(result.deep.sevenDay.length, 7)
  counts.set(result.key, counts.get(result.key) + 1)
}

for (const [key, count] of counts) {
  assert.equal(count, 28, `${key} 应覆盖 28 条路径，实际 ${count}`)
}

const forward = computeRestartResult(['A', 'C', 'E'])
const reversed = computeRestartResult(['C', 'A', 'E'])
assert.notEqual(forward.key, reversed.key, '相同选项改变顺序后，主副模型必须改变')
assert.notEqual(forward.name, reversed.name, '顺序变化应得到不同结果文案')

const invalidSelections = [
  [],
  ['A'],
  ['A', 'B'],
  ['A', 'A', 'C'],
  ['A', 'C', 'Z'],
  ['A', 'C', 'E', 'G'],
  null,
]

for (const invalid of invalidSelections) {
  assert.equal(computeRestartResult(invalid), null, `非法选择 ${JSON.stringify(invalid)} 不应产生结果`)
}

console.log('restarttest model ok: 336 paths, 12 combinations, 28 paths each')
