// 一次性：从 @iconify-json/mdi 提取项目用到的图标 → src/icons/data.js（离线内联，零运行时请求）
import fs from 'node:fs'
import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
const mdi = require('@iconify-json/mdi/icons.json')

const USED = [
  // 通用 UI
  'image-outline', 'restart', 'chevron-right', 'chevron-left', 'download', 'close',
  'lock-open-variant-outline', 'shield-key-outline', 'alert-octagon-outline',
  'check-decagram-outline', 'lock-outline', 'key-variant', 'check-circle', 'pulse',
  'access-point', 'timer-sand', 'format-list-numbered', 'chart-bell-curve-cumulative',
  'power', 'arrow-up-thin', 'arrow-down-thin', 'arrow-right-thin', 'circle-medium',
  // 关系气象站 lswtest
  'weather-windy', 'weather-partly-cloudy', 'weather-pouring', 'windsock', 'gauge',
  'navigation-variant', 'compass-outline', 'radar',
  // 脑内后台任务管理器 emotest
  'brain', 'memory', 'chart-timeline-variant', 'sine-wave', 'thermometer',
  'cpu-64-bit', 'database-outline',
  // 社交电池地图 eletest
  'heart-pulse', 'battery-high', 'battery-charging-100', 'flash', 'lightning-bolt',
  'map-marker-distance', 'map-marker-path',
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
