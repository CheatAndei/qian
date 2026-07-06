// 一次性：从 @iconify-json/mdi 提取项目用到的图标 → src/icons/data.js（离线内联，零运行时请求）
import fs from 'node:fs'
import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
const mdi = require('@iconify-json/mdi/icons.json')

const USED = [
  // 通用 UI
  'access-point', 'arrow-right-thin', 'chevron-right', 'chevron-left', 'power',
  'share-variant-outline', 'star-outline', 'star', 'download', 'image-outline', 'restart',
  // 试卷批改 / 男友资格统考 bftest
  'pencil', 'pencil-outline', 'check-bold', 'close-thick',
  'certificate-outline', 'school-outline', 'file-document-edit-outline',
  'format-list-checks', 'trophy-outline', 'account-search-outline',
  'book-open-page-variant-outline', 'clipboard-text-outline', 'seal-variant',
  // 答题 / 阅卷批注 / 成绩单
  'check-circle', 'close-circle-outline', 'alert-circle-outline', 'flag-variant-outline',
  'comment-quote-outline', 'heart-multiple-outline', 'gesture-tap-button',
  'emoticon-cool-outline', 'medal-outline', 'pen', 'draw-pen',
]

const W = mdi.width || 24
const H = mdi.height || 24
const out = {}
for (const name of [...new Set(USED)]) {
  const ic = mdi.icons[name]
  if (!ic) {
    console.error('MISSING:', name)
    continue
  }
  out[name] = { b: ic.body, w: ic.width || W, h: ic.height || H }
}

const body =
  '// 自动生成（scripts/gen-icons.mjs）。离线内联 mdi 图标，勿手改。\n' +
  'export default ' + JSON.stringify(out) + '\n'

fs.mkdirSync('src/icons', { recursive: true })
fs.writeFileSync('src/icons/data.js', body)
console.log('wrote src/icons/data.js with', Object.keys(out).length, 'icons')
