import { createRequire } from 'node:module'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)
const sharp = require('C:/Users/谢沛余/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp')

const here = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.join(here, 'exports')
const sourceDir = path.join(here, 'sources')

const W = 1242
const H = 1242
const LONG_H = 1546
const NOTE_W = 750
const NOTE_H = 1000

await fs.mkdir(outDir, { recursive: true })

const esc = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')

function svg(width, height, body, background = '#F7F3FF') {
  return Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <defs>
        <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="18" stdDeviation="24" flood-color="#392B67" flood-opacity="0.18"/>
        </filter>
        <linearGradient id="lavender" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#FAF7FF"/>
          <stop offset="0.55" stop-color="#EDE6FF"/>
          <stop offset="1" stop-color="#FBE8EC"/>
        </linearGradient>
        <linearGradient id="violet" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#7B5CF2"/>
          <stop offset="1" stop-color="#4D2DB5"/>
        </linearGradient>
        <linearGradient id="dark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#17131E"/>
          <stop offset="1" stop-color="#30264A"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="${background}"/>
      ${body}
    </svg>
  `)
}

function text(x, y, value, size, weight = 700, color = '#17131E', anchor = 'start', extra = '') {
  return `<text x="${x}" y="${y}" font-family="Microsoft YaHei, SimHei, sans-serif" font-size="${size}" font-weight="${weight}" fill="${color}" text-anchor="${anchor}" ${extra}>${esc(value)}</text>`
}

function rounded(x, y, width, height, radius, fill, stroke = 'none', strokeWidth = 0, extra = '') {
  return `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${radius}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" ${extra}/>`
}

function pill(x, y, label, fill, color = '#17131E', width = 220, height = 62, fontSize = 28) {
  return `${rounded(x, y, width, height, height / 2, fill)}${text(x + width / 2, y + height / 2 + fontSize * 0.36, label, fontSize, 700, color, 'middle')}`
}

async function writePng(filename, image) {
  const target = path.join(outDir, filename)
  await image.png({ compressionLevel: 9, palette: false }).toFile(target)
  return target
}

// 01: AI visual master + exact copy overlay.
{
  const bg = await sharp(path.join(sourceDir, 'ai-bundle-background.png'))
    .resize(W, H, { fit: 'cover', position: 'centre' })
    .modulate({ brightness: 0.98, saturation: 0.92 })
    .toBuffer()

  const overlay = svg(W, H, `
    <rect width="${W}" height="${H}" fill="#FFFFFF" opacity="0.10"/>
    ${rounded(62, 54, 1118, 276, 46, '#FFFFFFE8', '#DCCFFF', 2, 'filter="url(#shadow)"')}
    ${pill(92, 82, '电子内容 · 不寄实物', '#17131E', '#FFFFFF', 300, 58, 25)}
    ${text(92, 196, 'AI 趣味测试完整报告', 58, 900)}
    ${text(92, 274, '15测通用卡', 76, 900, '#6E4AE2')}
    ${rounded(72, 918, 1098, 246, 42, '#17131EEA', 'none', 0, 'filter="url(#shadow)"')}
    ${text(110, 1001, '¥1.9', 94, 900, '#B7D400')}
    ${text(410, 988, '一次兑换', 38, 800, '#FFFFFF')}
    ${text(410, 1044, '当前浏览器解锁全部 15 个', 38, 800, '#FFFFFF')}
    ${text(110, 1120, '主结果免费 · 想看更多维度再兑换', 29, 500, '#DED7F3')}
  `, 'transparent')

  await writePng('product-01-main.png', sharp(bg).composite([{ input: overlay }]))
}

// 02: 15-test matrix.
{
  const groups = [
    ['关系互动', '#FFE1E7', ['CP契合度', '男友资格考试', '恋爱风格', '心动投入度', '情感信号雷达']],
    ['自我观察', '#E8E0FF', ['隐藏反差值', '关系靠近方式', '情绪后台占用', '社交电量', '信任第一反应']],
    ['生活选择', '#EDF7C7', ['亲密状态', '友情同频度', '城市磁场', '手机最后8%', '人生重启能力栈']],
  ]
  let body = `
    <rect width="${W}" height="${H}" fill="url(#lavender)"/>
    ${text(70, 92, '一张卡，到底能测什么？', 57, 900)}
    ${text(72, 146, '不是15选1 · 激活后同一浏览器全部解锁', 27, 500, '#5D5570')}
  `
  groups.forEach(([name, color, items], groupIndex) => {
    const y = 202 + groupIndex * 316
    body += rounded(64, y, 1114, 280, 36, '#FFFFFFDD', '#E3D9F7', 2)
    body += pill(88, y + 28, name, color, '#17131E', 188, 58, 27)
    items.forEach((item, index) => {
      const col = index % 3
      const row = Math.floor(index / 3)
      const x = 88 + col * 355
      const iy = y + 112 + row * 78
      body += `<circle cx="${x + 13}" cy="${iy - 7}" r="7" fill="#6E4AE2"/>`
      body += text(x + 34, iy, item, 29, 700)
    })
  })
  body += rounded(64, 1168, 1114, 10, 5, '#6E4AE2')
  await writePng('product-02-matrix.png', sharp(svg(W, H, body)))
}

// 03: Steps.
{
  const steps = [
    ['01', '任选测试', '从15个主题里挑一个'],
    ['02', '完成答题', '主结果可以免费查看'],
    ['03', '输入兑换码', '在结果页完成首次激活'],
    ['04', '继续探索', '当前浏览器解锁15项深报'],
  ]
  let body = `
    <rect width="${W}" height="${H}" fill="#17131E"/>
    <circle cx="1080" cy="112" r="190" fill="#6E4AE2" opacity="0.55"/>
    <circle cx="104" cy="1128" r="240" fill="#FF5C6C" opacity="0.18"/>
    ${text(70, 104, '4步完成解锁', 68, 900, '#FFFFFF')}
    ${text(72, 158, '约30秒开始 · 先看免费结果', 29, 500, '#BEB6D0')}
  `
  steps.forEach(([num, title, desc], index) => {
    const y = 226 + index * 224
    body += rounded(70, y, 1102, 184, 34, index === 2 ? '#6E4AE2' : '#FFFFFF10', index === 2 ? '#9D86FF' : '#FFFFFF22', 2)
    body += text(106, y + 72, num, 48, 900, index === 2 ? '#B7D400' : '#9D86FF')
    body += text(248, y + 72, title, 43, 900, '#FFFFFF')
    body += text(248, y + 126, desc, 29, 500, index === 2 ? '#EEE9FF' : '#BEB6D0')
  })
  body += text(72, 1166, '建议使用常用浏览器，并及时保存结果图', 27, 500, '#B7D400')
  await writePng('product-03-how-to-use.png', sharp(svg(W, H, body)))
}

async function phoneScreenshot(inputPath, width, height) {
  return sharp(inputPath)
    .resize(width, height, { fit: 'cover', position: 'top' })
    .png()
    .toBuffer()
}

// 04: Three real product screens.
{
  const shots = [
    ['trust-home.png', '信任第一反应', 74],
    ['last8-home.png', '手机最后8%', 444],
    ['restart-home.png', '人生重启能力栈', 814],
  ]
  const composites = []
  let body = `
    <rect width="${W}" height="${H}" fill="url(#lavender)"/>
    ${text(66, 92, '不是概念图，是现在就能玩的测试', 49, 900)}
    ${text(68, 142, '3个短测 · 8选3 · 顺序参与结果', 28, 500, '#5D5570')}
  `
  for (const [filename, label, x] of shots) {
    body += rounded(x - 12, 214, 350, 820, 42, '#17131E', '#FFFFFF', 8, 'filter="url(#shadow)"')
    body += text(x + 163, 1092, label, 27, 800, '#17131E', 'middle')
    composites.push({
      input: await phoneScreenshot(path.join(sourceDir, filename), 326, 774),
      left: x,
      top: 236,
    })
  }
  body += pill(415, 1144, '真实线上界面', '#6E4AE2', '#FFFFFF', 412, 62, 28)
  await writePng('product-04-real-tests.png', sharp(svg(W, H, body)).composite(composites))
}

// 05: Free result vs locked deep report.
{
  const resultShot = await phoneScreenshot(path.join(sourceDir, 'trust-result.png'), 470, 950)
  const body = `
    <rect width="${W}" height="${H}" fill="#F7F3FF"/>
    ${text(70, 92, '先免费查看主结果', 62, 900)}
    ${text(72, 148, '需要更多维度时，再决定是否兑换', 28, 500, '#5D5570')}
    ${rounded(60, 210, 506, 972, 42, '#17131E', '#FFFFFF', 8, 'filter="url(#shadow)"')}
    ${rounded(630, 238, 544, 748, 42, '#FFFFFF', '#E4D9F8', 2, 'filter="url(#shadow)"')}
    ${pill(676, 282, '深度报告包含', '#E8E0FF', '#4D2DB5', 332, 60, 27)}
    ${text(680, 406, '更完整的结果解释', 34, 800)}
    ${text(680, 488, '选择顺序与答案证据', 34, 800)}
    ${text(680, 570, '容易忽略的行为信号', 34, 800)}
    ${text(680, 652, '可以直接使用的行动建议', 34, 800)}
    ${rounded(676, 732, 438, 150, 30, '#17131E')}
    ${text(895, 792, '¥1.9', 52, 900, '#B7D400', 'middle')}
    ${text(895, 842, '15测通用卡', 28, 700, '#FFFFFF', 'middle')}
    ${text(634, 1078, 'AI趣味生成，仅供娱乐参考', 27, 500, '#5D5570')}
  `
  await writePng('product-05-deep-report.png', sharp(svg(W, H, body)).composite([{ input: resultShot, left: 78, top: 220 }]))
}

// 06: Purchase notice.
{
  const notices = [
    ['01', '电子内容', '不寄送任何实物'],
    ['02', '单次激活', '每个兑换码仅成功使用一次'],
    ['03', '浏览器权益', '换设备或清数据可能无法恢复'],
    ['04', '内容边界', 'AI趣味生成，仅供娱乐参考'],
  ]
  let body = `
    <rect width="${W}" height="${H}" fill="url(#dark)"/>
    ${pill(70, 62, '购买前请确认', '#B7D400', '#17131E', 280, 62, 28)}
    ${text(70, 170, '这4件事很重要', 67, 900, '#FFFFFF')}
  `
  notices.forEach(([num, title, desc], index) => {
    const y = 242 + index * 205
    body += rounded(70, y, 1102, 162, 32, '#FFFFFF0C', '#FFFFFF24', 2)
    body += text(108, y + 68, num, 40, 900, '#9D86FF')
    body += text(236, y + 66, title, 38, 900, '#FFFFFF')
    body += text(236, y + 116, desc, 28, 500, '#C9C2D9')
  })
  body += rounded(70, 1086, 1102, 86, 26, '#6E4AE2')
  body += text(621, 1142, '兑换异常请通过平台订单联系客服核验', 29, 700, '#FFFFFF', 'middle')
  await writePng('product-06-notice.png', sharp(svg(W, H, body)))
}

// Long detail guide within platform image constraints.
{
  const body = `
    <rect width="${W}" height="${LONG_H}" fill="url(#lavender)"/>
    ${text(70, 100, 'AI趣味测试 · 15测通用卡', 58, 900)}
    ${text(72, 152, '一枚兑换码｜当前浏览器解锁全部深度报告', 28, 500, '#5D5570')}
    ${rounded(64, 210, 1114, 300, 38, '#FFFFFFE8', '#E3D9F7', 2)}
    ${pill(92, 240, '你会获得', '#6E4AE2', '#FFFFFF', 220, 58, 27)}
    ${text(94, 342, '· 1个一次性兑换码', 33, 800)}
    ${text(94, 408, '· 15个测试的完整内容', 33, 800)}
    ${text(94, 474, '· 主结果免费，更多维度按需兑换', 33, 800)}
    ${rounded(64, 546, 1114, 376, 38, '#17131E', 'none', 0, 'filter="url(#shadow)"')}
    ${pill(92, 580, '怎么使用', '#B7D400', '#17131E', 220, 58, 27)}
    ${text(96, 704, '01  任选测试并完成答题', 34, 800, '#FFFFFF')}
    ${text(96, 780, '02  免费查看主结果', 34, 800, '#FFFFFF')}
    ${text(96, 856, '03  在结果页输入兑换码', 34, 800, '#FFFFFF')}
    ${rounded(64, 958, 1114, 474, 38, '#FFFFFFE8', '#E3D9F7', 2)}
    ${pill(92, 992, '重要说明', '#FFE1E7', '#9E2945', 220, 58, 27)}
    ${text(94, 1110, '· 每码仅首次激活一次', 31, 800)}
    ${text(94, 1172, '· 当前权益保存在首次激活的浏览器', 31, 800)}
    ${text(94, 1234, '· 换设备、无痕模式或清数据可能无法恢复', 31, 800)}
    ${text(94, 1296, '· 建议及时保存需要的结果图', 31, 800)}
    ${text(94, 1374, 'AI趣味生成，仅供娱乐参考', 30, 900, '#6E4AE2')}
    ${text(94, 1418, '不构成心理咨询、医学建议或现实关系判断', 26, 500, '#5D5570')}
    ${text(94, 1480, '卡密无效或未交付：请通过平台订单联系客服', 25, 700, '#9E2945')}
  `
  await writePng('detail-01-full-guide.png', sharp(svg(W, LONG_H, body)))
}

async function renderRealCard(filename, screenshotName, title, accent) {
  const shot = await phoneScreenshot(path.join(sourceDir, screenshotName), 648, 810)
  const overlay = svg(NOTE_W, NOTE_H, `
    <rect width="${NOTE_W}" height="${NOTE_H}" fill="#17131E"/>
    ${text(46, 72, title, 42, 900, '#FFFFFF')}
    ${text(46, 110, '真实线上界面', 23, 500, accent)}
    ${rounded(42, 146, 666, 824, 34, '#FFFFFF', accent, 5, 'filter="url(#shadow)"')}
  `)
  await writePng(filename, sharp(overlay).composite([{ input: shot, left: 51, top: 156 }]))
}

await renderRealCard('real-01-trust.png', 'trust-result.png', '信任第一反应', '#9D86FF')
await renderRealCard('real-02-last8.png', 'last8-home.png', '手机最后8%', '#B7D400')
await renderRealCard('real-03-restart.png', 'restart-home.png', '人生重启能力栈', '#E8FF44')

console.log(`Rendered product assets to ${outDir}`)
