// 一次性：从 @iconify-json/mdi 提取项目用到的图标 → src/icons/data.js（离线内联，零运行时请求）
import fs from 'node:fs'
import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
const mdi = require('@iconify-json/mdi/icons.json')

const USED = [
  // 通用 UI
  'access-point', 'arrow-right-thin', 'chevron-right', 'chevron-left', 'close-thick',
  'download', 'image-outline', 'restart', 'check-circle', 'star', 'star-four-points-outline',
  // 杂志 / 恋爱人格刊 gftest
  'book-open-page-variant-outline', 'camera-iris', 'bookmark-outline', 'format-quote-close',
  'pencil', 'draw-pen', 'palette-outline', 'magnify', 'crown-outline', 'heart-multiple-outline',
  'comment-quote-outline', 'tag-heart-outline', 'chart-arc', 'newspaper-variant-outline',
  'account-heart-outline', 'sticker-emoji', 'flower-tulip-outline',
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
