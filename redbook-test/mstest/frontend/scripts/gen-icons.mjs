import fs from 'node:fs'
import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
const mdi = require('@iconify-json/mdi/icons.json')

const USED = [
  'access-point', 'arrow-right-thin', 'chevron-right', 'chevron-left', 'close-thick',
  'download', 'image-outline', 'restart', 'check-circle', 'star',
  'key-variant', 'lock-open-variant-outline', 'shield-key-outline', 'lock-outline',
  // 匿名夜间 / 外冷内热档案 mstest
  'moon-waning-crescent', 'eye-outline', 'shield-moon-outline',
  'book-open-blank-variant', 'notebook-outline', 'file-hidden', 'fingerprint',
  'account-question-outline', 'comment-quote-outline', 'alert-circle-outline',
  'flask-round-bottom-outline', 'ghost-outline',
]

const W = mdi.width || 24
const H = mdi.height || 24
const out = {}
for (const name of [...new Set(USED)]) {
  const ic = mdi.icons[name]
  if (!ic) { console.error('MISSING:', name); continue }
  out[name] = { b: ic.body, w: ic.width || W, h: ic.height || H }
}

const body = '// 自动生成（scripts/gen-icons.mjs）。离线内联 mdi 图标，勿手改。\n' + 'export default ' + JSON.stringify(out) + '\n'
fs.mkdirSync('src/icons', { recursive: true })
fs.writeFileSync('src/icons/data.js', body)
console.log('wrote src/icons/data.js with', Object.keys(out).length, 'icons')
