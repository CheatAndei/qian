// 一次性：从 @iconify-json/mdi 提取项目用到的图标 → src/icons/data.js（离线内联，零运行时请求）
import fs from 'node:fs'
import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
const mdi = require('@iconify-json/mdi/icons.json')

const USED = [
  // 通用 UI
  'access-point', 'arrow-right-thin', 'chevron-right', 'chevron-left', 'close-thick',
  'download', 'image-outline', 'restart', 'check-circle', 'star',
  'key-variant', 'lock-open-variant-outline', 'shield-key-outline',
  // 双人匹配仪 / 关系档案 cptest
  'account-outline', 'account-heart-outline', 'heart-pulse', 'pulse', 'heart-multiple-outline',
  'vector-link', 'link-variant', 'radar', 'magnify', 'percent-outline', 'swap-horizontal',
  'gesture-tap-button', 'alert-circle-outline', 'lightbulb-on-outline', 'comment-quote-outline',
  'chart-arc', 'flask-outline',
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
