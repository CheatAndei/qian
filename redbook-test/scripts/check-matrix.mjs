import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import {
  existsSync,
  readFileSync,
  readdirSync,
  statSync,
} from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const PRODUCTS = [
  'bftest', 'gftest', 'cptest', 'mstest',
  'lovetest', 'shiptest', 'ggtest', 'lswtest',
  'emotest', 'eletest', 'citytest', 'lvtest',
  'trusttest', 'last8test', 'restarttest',
]

const matrixRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const repoRoot = resolve(matrixRoot, '..')
const shouldBuild = process.argv.includes('--build')
const modelJobs = []
const buildJobs = []

function read(path) {
  return readFileSync(path, 'utf8').replace(/\r\n/g, '\n')
}

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    return statSync(path).isDirectory() ? walk(path) : [path]
  })
}

function extractQuotedArray(source, declaration) {
  const body = source.match(new RegExp(`(?:const|export\\s+const)\\s+${declaration}\\s*=\\s*\\[([^\\]]+)\\]`, 's'))?.[1] || ''
  return [...body.matchAll(/'([^']+)'/g)].map((match) => match[1])
}

const moreTests = []
const cardInputs = []
const unlockProductLists = []
for (const product of PRODUCTS) {
  const frontend = join(matrixRoot, product, 'frontend')
  assert(existsSync(frontend), `缺少产品目录：${product}`)

  const moreTestsPath = join(frontend, 'src', 'components', 'MoreTests.vue')
  const cardInputPath = join(frontend, 'src', 'components', 'CardInput.vue')
  assert(existsSync(moreTestsPath), `${product} 缺少 MoreTests.vue`)
  assert(existsSync(cardInputPath), `${product} 缺少 CardInput.vue`)
  moreTests.push(read(moreTestsPath))
  const cardInput = read(cardInputPath)
  const defaultProduct = cardInput.match(/default:\s*'([^']+)'/)?.[1]
  assert.equal(defaultProduct, product, `${product} CardInput 默认 product 错误：${defaultProduct}`)
  cardInputs.push(cardInput)
  const inlineCardProducts = extractQuotedArray(cardInput, 'ALL_PRODUCTS')
  if (inlineCardProducts.length) {
    assert.deepEqual(inlineCardProducts, PRODUCTS, `${product} CardInput ALL_PRODUCTS 与15测清单不一致`)
  } else {
    assert(cardInput.includes("from '../composables/useUnlock.js'"), `${product} CardInput 未声明或导入 ALL_PRODUCTS`)
  }
  assert(/1\.9\s*元/.test(cardInput), `${product} CardInput 缺少1.9元价格说明`)
  assert(/15\s*测万能卡/.test(cardInput), `${product} CardInput 缺少“15测万能卡”文案`)
  assert(/15\s*项深度报告/.test(cardInput), `${product} CardInput 缺少“15项深度报告”成功反馈`)
  assert(cardInput.includes('/cardkey/redeem'), `${product} CardInput 未调用统一兑换接口`)
  assert(cardInput.includes("localStorage.setItem('unlocked'"), `${product} CardInput 未写入统一 unlocked 状态`)
  assert(cardInput.includes('xpytt_unlocked=1'), `${product} CardInput 未写入跨子域解锁 cookie`)
  assert(cardInput.includes('product: props.product'), `${product} CardInput 未提交当前产品 slug`)
  assert(!cardInput.includes('key: n'), `${product} CardInput 不应把完整卡密重复写入本地状态`)
  assert(!/12测|12项/.test(cardInput), `${product} CardInput 仍包含旧12测文案`)

  const deepReportPath = join(frontend, 'src', 'components', 'DeepReport.vue')
  if (existsSync(deepReportPath)) {
    const deepReport = read(deepReportPath)
    const gatedContent = deepReport.match(/<div\s+([^>]*class="(?:dr|deep|report)-content"[^>]*)>/)?.[1] || ''
    const resultPagePath = join(frontend, 'src', 'pages', 'ResultPage.vue')
    const parentGatesReport = existsSync(resultPagePath)
      && /<DeepReport\s+v-if="unlocked"/.test(read(resultPagePath))
    assert(
      gatedContent.includes('v-if="unlocked"') || parentGatesReport,
      `${product} 深报正文必须在解锁后才渲染，不能只用模糊遮罩隐藏`,
    )
  }

  const envPath = join(frontend, '.env')
  assert(existsSync(envPath), `${product} 缺少 .env`)
  assert(read(envPath).includes('VITE_API_BASE=https://api.xpytt.com/api'), `${product} 未使用统一生产 API`)

  const sharedUnlockPath = join(frontend, 'src', 'composables', 'useUnlock.js')
  const gatePath = existsSync(sharedUnlockPath)
    ? sharedUnlockPath
    : join(frontend, 'src', 'pages', 'ResultPage.vue')
  const gate = read(gatePath)
  assert(gate.includes("localStorage.getItem('unlocked')"), `${product} 门禁未读取统一 unlocked 状态`)
  assert(gate.includes('xpytt_unlocked=1'), `${product} 门禁未读取跨子域解锁 cookie`)
  if (existsSync(sharedUnlockPath)) {
    assert.deepEqual(extractQuotedArray(gate, 'ALL_PRODUCTS'), PRODUCTS, `${product} useUnlock ALL_PRODUCTS 与15测清单不一致`)
    unlockProductLists.push(JSON.stringify(extractQuotedArray(gate, 'ALL_PRODUCTS')))
  }

  const sourceFiles = [
    ...walk(join(frontend, 'src')).filter((path) => /\.(?:js|vue|css)$/.test(path)),
    join(frontend, 'index.html'),
  ]
  const source = sourceFiles.map(read).join('\n')
  assert(!/12测通用卡|12测万能卡|解锁12项|12项深度报告/.test(source), `${product} 源码仍包含旧12测商品文案`)
  const forbidden = [
    '算命', '占卜', '预测复合', '测他还爱不爱你', '正缘预测',
    '保证准确', '专业诊断', '走向预测', '原地结婚', '直男癌',
    '拿命珍惜', '灵魂双胞胎', '轻症恋爱脑', 'ICU抢救区',
  ]
  for (const phrase of forbidden) {
    assert(!source.includes(phrase), `${product} 仍包含禁用表达：${phrase}`)
  }

  const homePath = join(frontend, 'src', 'pages', 'HomePage.vue')
  if (existsSync(homePath)) {
    const home = read(homePath)
    assert(!/\d{1,3},\d{3}|\d+(?:\.\d+)?\s*万|已有不少|累计用户|用户已/.test(home), `${product} 首页仍包含无来源的样本量暗示`)
  }

  const backendPath = join(matrixRoot, product, 'backend')
  if (existsSync(backendPath)) {
    const backend = walk(backendPath)
      .filter((path) => /\.(?:js|ts)$/.test(path))
      .map(read)
      .join('\n')
    assert(!/模拟增长|totalParticipants\s*:\s*\d/.test(backend), `${product} backend 仍包含虚构参与人数`)
  }

  const scriptsDir = join(frontend, 'scripts')
  if (existsSync(scriptsDir)) {
    for (const script of readdirSync(scriptsDir).filter((name) => /^check(?:-.*)?-model\.mjs$/.test(name)).sort()) {
      modelJobs.push({ product, frontend, script: join(scriptsDir, script), name: script })
    }
  }
  buildJobs.push({ product, frontend })
}

assert.equal(new Set(moreTests).size, 1, '15 份 MoreTests.vue 必须保持完全一致')
assert.equal(new Set(unlockProductLists).size, 1, '所有 useUnlock.js 的产品清单必须保持完全一致')

const sharedMoreTests = moreTests[0]
for (const product of PRODUCTS) {
  assert(sharedMoreTests.includes(`slug: '${product}'`), `MoreTests 缺少 ${product}`)
}
assert(sharedMoreTests.includes('1.9元万能卡'), 'MoreTests 缺少统一万能卡说明')
assert(sharedMoreTests.includes('15项深报'), 'MoreTests 缺少15项权益说明')
assert(!/12测|12项/.test(sharedMoreTests), 'MoreTests 仍包含旧12测文案')
const moreTestEntries = [...sharedMoreTests.matchAll(/\{\s*slug:\s*'([^']+)'[^}]*url:\s*'([^']+)'/g)]
  .map((match) => ({ slug: match[1], url: match[2] }))
assert.equal(moreTestEntries.length, PRODUCTS.length, 'MoreTests ALL_TESTS 必须正好包含15项')
assert.deepEqual(new Set(moreTestEntries.map((entry) => entry.slug)), new Set(PRODUCTS), 'MoreTests slug 必须与15测清单一致')
assert.equal(new Set(moreTestEntries.map((entry) => entry.url)).size, PRODUCTS.length, 'MoreTests URL 不可重复')

const recommendationSource = sharedMoreTests.match(/const RECOMMENDATION_ORDER\s*=\s*\{([\s\S]*?)\n\}/)?.[1] || ''
const recommendations = new Map(
  [...recommendationSource.matchAll(/(\w+):\s*\[([^\]]*)\]/g)].map((match) => [
    match[1],
    [...match[2].matchAll(/'([^']+)'/g)].map((item) => item[1]),
  ]),
)
assert.deepEqual(new Set(recommendations.keys()), new Set(PRODUCTS), 'MoreTests 推荐表必须覆盖全部15个产品')
for (const product of PRODUCTS) {
  const recommended = recommendations.get(product)
  assert(recommended.length >= 4, `${product} 推荐项不足4个`)
  assert.equal(new Set(recommended).size, recommended.length, `${product} 推荐项存在重复`)
  assert(!recommended.includes(product), `${product} 推荐项不能包含自身`)
  assert(recommended.every((slug) => PRODUCTS.includes(slug)), `${product} 推荐项包含未知 slug`)
}

const workerPath = join(repoRoot, 'worker', 'index.js')
assert(existsSync(workerPath), '缺少 worker/index.js')
const worker = read(workerPath)
const workerProductsSource = worker.match(/const ALL_PRODUCTS\s*=\s*\[([^\]]+)\]/s)?.[1] || ''
const workerProducts = [...workerProductsSource.matchAll(/'([^']+)'/g)].map((match) => match[1])
assert.deepEqual(workerProducts, PRODUCTS, 'Worker ALL_PRODUCTS 必须与15产品清单完全一致')

const hookBankPath = join(matrixRoot, 'CONTENT_HOOK_BANK.md')
assert(existsSync(hookBankPath), '缺少 CONTENT_HOOK_BANK.md')
const hookBank = read(hookBankPath)
for (const phrase of ['测他还爱不爱你', '确认还爱不爱', '保证准确', '建议原地结婚']) {
  assert(!hookBank.includes(phrase), `引流题库仍包含高风险表达：${phrase}`)
}

for (const job of modelJobs) {
  console.log(`[model] ${job.product}/${job.name}`)
  execFileSync(process.execPath, [job.script], { cwd: job.frontend, stdio: 'inherit' })
}

if (shouldBuild) {
  const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm'
  for (const job of buildJobs) {
    console.log(`[build] ${job.product}`)
    execFileSync(npm, ['run', 'build'], { cwd: job.frontend, stdio: 'inherit' })
  }
}

console.log(JSON.stringify({
  ok: true,
  products: PRODUCTS.length,
  sharedMoreTests: true,
  sharedCardInputLogic: true,
  workerProducts: workerProducts.length,
  sharedUnlockLogic: true,
  modelChecks: modelJobs.length,
  builds: shouldBuild ? buildJobs.length : 0,
  buildChecked: shouldBuild,
}, null, 2))
