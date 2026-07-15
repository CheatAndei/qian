// 契合度 V2 · 双方关系风格的可解释交互模型
// 结果只描述本次选择呈现的相处偏好，不判断现实关系或他人真实意图。

export const bfTags = [
  { key: '🔥', name: '稳定回应型', icon: '🔥' },
  { key: '🛡️', name: '行动护航型', icon: '🛡️' },
  { key: '🐶', name: '贴贴陪伴型', icon: '🐶' },
  { key: '✨', name: '仪式制造型', icon: '✨' },
  { key: '💘', name: '高投入型', icon: '💘' },
  { key: '🍯', name: '温柔照料型', icon: '🍯' },
  { key: '🤪', name: '幽默破冰型', icon: '🤪' },
  { key: '🎯', name: '直球表达型', icon: '🎯' },
  { key: '🧘', name: '低耗松弛型', icon: '🧘' },
  { key: '❄️', name: '冷静降温型', icon: '❄️' },
  { key: '👨‍🏫', name: '规划照料型', icon: '👨‍🏫' },
  { key: '🚩', name: '边界待确认型', icon: '🚩' },
]

export const gfTags = [
  { key: '👑', name: '主导共建型', icon: '👑' },
  { key: '🌸', name: '温柔承接型', icon: '🌸' },
  { key: '🐱', name: '嘴硬心软型', icon: '🐱' },
  { key: '💋', name: '主动升温型', icon: '💋' },
  { key: '💪', name: '事业并肩型', icon: '💪' },
  { key: '🧸', name: '高频陪伴型', icon: '🧸' },
  { key: '😈', name: '反差火花型', icon: '😈' },
  { key: '🦋', name: '自由空间型', icon: '🦋' },
  { key: '🚩', name: '边界待确认型', icon: '🚩' },
  { key: '🧊', name: '低频回应型', icon: '🧊' },
  { key: '🎭', name: '情绪戏剧型', icon: '🎭' },
  { key: '🙈', name: '压力撤退型', icon: '🙈' },
]

const profiles = {
  '🔥': { code: 'SUN', alias: '暖阳', dims: [78, 64, 74, 58, 76] },
  '🛡️': { code: 'GUARD', alias: '护航', dims: [66, 50, 86, 42, 78] },
  '🐶': { code: 'PING', alias: '贴贴', dims: [82, 72, 78, 64, 66] },
  '✨': { code: 'GLOW', alias: '仪式', dims: [64, 90, 58, 48, 70] },
  '💘': { code: 'FULL', alias: '满格', dims: [72, 84, 66, 52, 58] },
  '🍯': { code: 'CARE', alias: '照料', dims: [80, 76, 64, 62, 72] },
  '🤪': { code: 'LOL', alias: '笑点', dims: [58, 58, 60, 92, 52] },
  '🎯': { code: 'LINE', alias: '直球', dims: [56, 34, 52, 42, 54] },
  '🧘': { code: 'EASY', alias: '松弛', dims: [46, 30, 56, 48, 62] },
  '❄️': { code: 'COOL', alias: '降温', dims: [30, 22, 38, 28, 42] },
  '👨‍🏫': { code: 'PLAN', alias: '规划', dims: [60, 42, 68, 34, 76] },
  '🚩': { code: 'CHECK', alias: '待验', dims: [28, 24, 22, 40, 30] },
  '👑': { code: 'LEAD', alias: '主导', dims: [72, 62, 72, 54, 66] },
  '🌸': { code: 'SOFT', alias: '春风', dims: [82, 74, 82, 62, 76] },
  '🐱': { code: 'CAT', alias: '猫系', dims: [58, 58, 58, 76, 54] },
  '💋': { code: 'SPARK', alias: '火花', dims: [76, 86, 66, 72, 58] },
  '💪': { code: 'TEAM', alias: '并肩', dims: [66, 52, 78, 48, 78] },
  '🧸': { code: 'HUG', alias: '抱抱', dims: [86, 82, 76, 66, 64] },
  '😈': { code: 'TWIST', alias: '反差', dims: [66, 72, 60, 88, 54] },
  '🦋': { code: 'FREE', alias: '自由', dims: [58, 54, 50, 68, 56] },
  '🧊': { code: 'MUTE', alias: '低频', dims: [32, 24, 42, 30, 44] },
  '🎭': { code: 'WAVE', alias: '波动', dims: [48, 58, 38, 64, 40] },
  '🙈': { code: 'HIDE', alias: '撤退', dims: [34, 30, 40, 42, 36] },
}

const dimMeta = [
  { label: '沟通节奏', emoji: '💬', weight: 1.15 },
  { label: '表达温度', emoji: '💐', weight: 0.85 },
  { label: '信任承接', emoji: '🛡️', weight: 1.2 },
  { label: '幽默同频', emoji: '😆', weight: 0.75 },
  { label: '生活协作', emoji: '🏠', weight: 1.05 },
]

const specialNames = {
  '🔥🌸': '暖风同盟', '🔥🧸': '双向满格', '🔥👑': '暖阳主场', '🔥💋': '甜辣火花',
  '🛡️🌸': '安全感回路', '🛡️👑': '双核共建', '🛡️💪': '行动搭档',
  '🐶🌸': '软糖同盟', '🐶🧸': '贴贴回声', '🐶😈': '反差喜剧',
  '✨💋': '浪漫放映厅', '✨🌸': '仪式共振', '✨👑': '高光搭档',
  '💘🌸': '心动回声', '💘🧸': '双向奔赴', '💘🐱': '嘴硬心软局',
  '🤪😈': '笑点风暴', '🤪🐱': '互怼同盟', '🍯💋': '蜜糖火花',
}

const dimensionAdvice = {
  '沟通节奏': '约定情绪上来时先说“我需要一点时间”，并给出会回来继续聊的具体时间。',
  '表达温度': '不要让对方猜，把感谢、想念和需要各说一句，观察对方是否有稳定回应。',
  '信任承接': '把“查证”换成“确认”，直接讨论边界、公开程度和让彼此安心的行动。',
  '幽默同频': '玩笑前先确认对方是否舒服，冲突时停止用梗掩盖真实感受。',
  '生活协作': '挑一件真实小事共同完成，用行动验证分工、守时和兑现能力。',
}

function clamp(value, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value))
}

function interactionValue(a, b) {
  const rhythmFit = 100 - Math.abs(a - b)
  const sharedCapacity = (a + b) / 2
  return clamp(Math.round(rhythmFit * 0.25 + sharedCapacity * 0.75))
}

function level(score) {
  if (score >= 78) return {
    grade: 'S级', title: '高同频组合', subtitle: '偏好和回应方式高度贴合', sticker: 'S',
    color: '#E85D75', bg: 'linear-gradient(135deg,#C0392B,#E85D75,#F4A0B0)',
    desc: '你们的相处偏好有较高重合度，也具备把喜欢落到行动里的基础。高分不是“命中注定”，而是当前选择里有较多可协作的部分。',
    tags: ['#高同频', '#双向回应', '#可继续验证'],
  }
  if (score >= 68) return {
    grade: 'A级', title: '互补顺滑组合', subtitle: '差异存在，但有回应空间', sticker: 'A',
    color: '#F4A0B0', bg: 'linear-gradient(135deg,#E85D75,#F4A0B0,#FFD1DA)',
    desc: '你们不是完全相同，却能在关键位置形成互补。把差异说清楚，比追求处处一致更有用。',
    tags: ['#互补顺滑', '#差异可谈', '#行动验证'],
  }
  if (score >= 58) return {
    grade: 'B级', title: '可磨合组合', subtitle: '有同频点，也有待确认区', sticker: 'B',
    color: '#D4A853', bg: 'linear-gradient(135deg,#D4A853,#E8C97A,#F5E0B0)',
    desc: '这组关系风格既有接得住的部分，也有容易错频的位置。真正的契合来自愿不愿意回应和修复，而不只是初始相似度。',
    tags: ['#可磨合', '#需要确认', '#别靠猜'],
  }
  if (score >= 48) return {
    grade: 'C级', title: '需要说清楚', subtitle: '当前节奏差异比较明显', sticker: 'C',
    color: '#F0A060', bg: 'linear-gradient(135deg,#E8A040,#F0B860,#F5D090)',
    desc: '你们在表达、承接或生活节奏上存在明显差异。差异本身不是结论，但需要双方都愿意把需求说出来。',
    tags: ['#节奏错位', '#边界先谈', '#观察行动'],
  }
  return {
    grade: 'D级', title: '当前错频组合', subtitle: '先验证回应，再决定投入', sticker: 'D',
    color: '#9CA3AF', bg: 'linear-gradient(135deg,#9CA3AF,#C0C6CC,#E0E3E6)',
    desc: '本次选择显示你们在多个关键偏好上不太同步。它不代表现实关系的最终答案，更适合用来提醒双方核对边界和投入是否对等。',
    tags: ['#当前错频', '#先看回应', '#不替现实下结论'],
  }
}

export function compute(bf, gf) {
  const bfTag = bfTags.find((tag) => tag.key === bf)
  const gfTag = gfTags.find((tag) => tag.key === gf)
  const bp = profiles[bf]
  const gp = profiles[gf]
  if (!bfTag || !gfTag || !bp || !gp) return null

  const dims = dimMeta.map((meta, index) => ({
    label: meta.label,
    emoji: meta.emoji,
    val: interactionValue(bp.dims[index], gp.dims[index]),
    weight: meta.weight,
  }))
  const weightTotal = dims.reduce((sum, dim) => sum + dim.weight, 0)
  const score = Math.round(dims.reduce((sum, dim) => sum + dim.val * dim.weight, 0) / weightTotal)
  const ranked = [...dims].sort((a, b) => b.val - a.val)
  const strongest = ranked[0]
  const weakest = ranked[ranked.length - 1]
  const base = level(score)
  const pairKey = bf + gf
  const cpName = specialNames[pairKey] || `${bp.alias}×${gp.alias}`
  const cpCode = `${bp.code}-${gp.code}`
  const warning = weakest.val < 58
    ? `当前最值得现实验证的是“${weakest.label}”。分数来自双方风格选择，不代表对方真实想法。`
    : `五个维度较均衡，仍建议用真实沟通和持续行动验证，而不是只看测试分数。`

  return {
    ...base,
    score,
    cpName,
    cpCode,
    bfTag,
    gfTag,
    dims: dims.map(({ weight, ...dim }) => dim),
    desc: `${base.desc} 你们当前最同频的是“${strongest.label}”，最需要说清楚的是“${weakest.label}”。`,
    tags: [...base.tags.slice(0, 2), `#${strongest.label}同频`],
    tips: [
      dimensionAdvice[weakest.label],
      `利用“${strongest.label}”这个优势，先完成一次低压力、可观察的小协作。`,
      '讨论一次各自需要的确认感和私人空间，约定可以执行的边界。',
    ],
    warn: warning,
    roast: '这张卡不是关系判决书；看双方是否愿意稳定回应，比一个高分更重要。',
  }
}
