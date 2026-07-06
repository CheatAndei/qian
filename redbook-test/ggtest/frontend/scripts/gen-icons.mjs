// 一次性：从 @iconify-json/mdi 提取项目用到的图标 → src/icons/data.js（离线内联，零运行时请求）
import fs from 'node:fs'
import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
const mdi = require('@iconify-json/mdi/icons.json')

const USED = [
  // 状态条 / 首屏 / 规格
  'sync', 'access-point', 'waveform', 'timer-sand',
  'format-list-numbered', 'chart-bell-curve-cumulative', 'power',
  // 答题
  'close', 'chevron-left', 'chevron-right', 'check-circle', 'pulse',
  'account-multiple-outline', 'vector-link',
  // 结果 / 分享卡 / 引流
  'image-outline', 'restart', 'sine-wave', 'radar', 'heart-multiple-outline', 'download',
  // 兑换码
  'lock-open-variant-outline', 'shield-key-outline',
  // 深度报告
  'alert-octagon-outline', 'check-decagram-outline', 'lock-outline', 'key-variant', 'link-variant',
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
