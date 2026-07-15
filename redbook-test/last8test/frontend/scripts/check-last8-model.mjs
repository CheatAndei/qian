import assert from 'node:assert/strict'
import { OPTIONS, classifySelection, validateSelection } from '../src/data/model.js'

const ids = OPTIONS.map((option) => option.id)
const combinations = new Map()
const titles = new Set()
let pathCount = 0

for (const first of ids) {
  for (const second of ids) {
    if (second === first) continue
    for (const third of ids) {
      if (third === first || third === second) continue
      const selection = [first, second, third]
      const result = classifySelection(selection)
      assert.ok(result, `合法路径未得到结果: ${selection.join('')}`)
      assert.equal(result.orderedOptions.length, 3)
      assert.equal(result.tags.length, 3)
      assert.equal(result.evidence.length, 2)
      assert.equal(result.deep.actionBasis.length, 3)
      assert.equal(result.deep.overloadChecklist.length, 3)
      assert.ok(result.deep.delayedNeed)
      titles.add(result.title)
      combinations.set(result.comboKey, (combinations.get(result.comboKey) || 0) + 1)
      pathCount += 1
    }
  }
}

assert.equal(pathCount, 8 * 7 * 6, '合法有序路径总数错误')
assert.equal(combinations.size, 12, '应当恰好得到12个主副组合')
assert.equal(titles.size, 12, '12个组合必须使用不同的结果标题')
for (const [comboKey, count] of combinations) {
  assert.equal(count, 28, `${comboKey} 应覆盖28条路径，实际为${count}`)
}

assert.equal(validateSelection(['A', 'B', 'C']), true)
for (const invalid of [
  [],
  ['A'],
  ['A', 'B'],
  ['A', 'A', 'C'],
  ['A', 'B', 'Z'],
  ['A', 'B', 'C', 'D'],
  'ABC',
  null,
]) {
  assert.equal(classifySelection(invalid), null, `非法选择不应产生结果: ${String(invalid)}`)
}

const orderSensitiveA = classifySelection(['A', 'C', 'E'])
const orderSensitiveB = classifySelection(['C', 'A', 'E'])
assert.notEqual(orderSensitiveA.comboKey, orderSensitiveB.comboKey, '交换前两项必须改变主副组合')
assert.equal(orderSensitiveA.comboKey, 'echo>closure')
assert.equal(orderSensitiveB.comboKey, 'closure>echo')

console.log(`last8test model OK: ${pathCount} paths, ${combinations.size} combinations, 28 paths each`)
