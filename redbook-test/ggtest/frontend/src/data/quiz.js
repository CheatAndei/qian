// =============================================================
//  友情同频检测 · 健康友情场景模型
//  只整理本次答案，不承诺关系结果；仅供娱乐和轻量观察。
// =============================================================

export const DIM_LABELS = {
  valueRespect: '价值尊重',
  rhythmFit: '节奏适配',
  trustPrivacy: '信任守密',
  repairSupport: '修复支持',
  humorSync: '玩梗默契',
}

export const RADAR_DIMS = [
  'valueRespect',
  'rhythmFit',
  'trustPrivacy',
  'repairSupport',
  'humorSync',
]

function q(id, spec, prompt, options) {
  return { id, spec, prompt, options }
}

function o(text, score, dims, read) {
  return { text, score, dims, read }
}

export const questions = [
  q(1, '低频连接 · 安全感', '如果一阵子没联系，你更接近哪种感受？', [
    o('会默认她不在乎，等她先证明', 0, {}, '联系频率正在代替安全感'),
    o('有点介意，可能旁敲侧击试探', 1, { trustPrivacy: 1 }, '信号需要确认'),
    o('想她时会直接问候，不计算谁先找谁', 2, { rhythmFit: 2, trustPrivacy: 1 }, '主动连接，不做计分'),
    o('各自忙很久也安心，需要时能自然接上', 3, { rhythmFit: 3, trustPrivacy: 2 }, '低频稳定 · 重连顺畅'),
  ]),
  q(2, '意见差异 · 价值尊重', '对一件重要的事看法相反时，你们通常？', [
    o('一定要争到对方认同自己', 0, {}, '差异被当成输赢'),
    o('先避开，免得影响关系', 1, { rhythmFit: 1 }, '暂时绕开分歧'),
    o('能听完理由，保留各自选择', 3, { valueRespect: 3, repairSupport: 1 }, '差异可被容纳'),
    o('会讨论，但偶尔忍不住替对方决定', 2, { valueRespect: 2 }, '尊重基本在线'),
  ]),
  q(3, '冲突复位 · 修复能力', '闹别扭后，哪种情况更像你们？', [
    o('冷战等对方服软，很少说明原因', 0, {}, '修复通道暂时关闭'),
    o('气消后恢复聊天，但问题常被跳过', 1, { rhythmFit: 1 }, '表面复位'),
    o('会说明哪里不舒服，也愿意听对方', 3, { repairSupport: 3, valueRespect: 1 }, '双向修复在线'),
    o('需要一点时间，之后能回来把话说清', 2, { repairSupport: 2, rhythmFit: 1 }, '允许暂停，也会返回'),
  ]),
  q(4, '回复节奏 · 不以秒回计分', '消息没有马上回复时，你们通常怎么理解？', [
    o('必须秒回，不然就会怀疑关系变了', 0, {}, '即时在线被当成义务'),
    o('嘴上说没事，心里会默默扣分', 1, { trustPrivacy: 1 }, '延迟容易触发猜测'),
    o('知道彼此忙，晚点回也会把重要话接上', 3, { rhythmFit: 3, trustPrivacy: 2 }, '延迟不等于忽视'),
    o('不要求同步在线，有空下来会回一句', 2, { rhythmFit: 2 }, '异步连接稳定'),
  ]),
  q(5, '作息错峰 · 节奏适配', '一个早睡、一个夜猫时，你们会？', [
    o('要求对方跟自己的时间走', 0, {}, '节奏差异变成压力'),
    o('常因错过消息闹情绪', 1, { trustPrivacy: 1 }, '错峰仍需磨合'),
    o('约定彼此方便的时间，不要求随叫随到', 3, { rhythmFit: 3, valueRespect: 1 }, '错峰也能稳定连接'),
    o('重要事情提前约，闲聊随缘接上', 2, { rhythmFit: 2 }, '节奏已有协议'),
  ]),
  q(6, '需要支持 · 有回应不透支', '深夜想找她聊，但她第二天很忙，你更接受？', [
    o('必须现在陪，不然就不算重要', 0, {}, '支持被等同于随时待命'),
    o('什么都不说，之后用疏远表达失望', 1, { trustPrivacy: 1 }, '需要没有被说清'),
    o('她先确认我是否安全，再约时间认真聊', 3, { repairSupport: 3, rhythmFit: 2 }, '支持与边界同时存在'),
    o('先收到一句回应，具体内容第二天再说', 2, { repairSupport: 2, rhythmFit: 1 }, '低带宽支持可用'),
  ]),
  q(7, '隐私边界 · 守密', '你告诉她一件私事后，哪种情况更像？', [
    o('她会当谈资讲给共同朋友', 0, {}, '隐私边界有缺口'),
    o('小事能守住，重要内容还不太敢说', 1, { trustPrivacy: 1 }, '信任仍在建立'),
    o('她会先确认哪些能说、哪些不能说', 3, { trustPrivacy: 3, valueRespect: 1 }, '守密规则清楚'),
    o('未经允许不会转述，也不逼我交代全部', 2, { trustPrivacy: 2, valueRespect: 1 }, '隐私与自主被尊重'),
  ]),
  q(8, '消费差异 · 不强求同款', '一起逛街但预算和审美不同，你们会？', [
    o('互相嫌弃，非要说服对方买同款', 0, {}, '差异被当成扫兴'),
    o('表面配合，心里觉得对方不懂自己', 1, { humorSync: 1 }, '消费差异未说开'),
    o('可以逛不同店，最后分享各自喜欢的东西', 3, { valueRespect: 3, rhythmFit: 1 }, '不同偏好也能同行'),
    o('会给建议，但尊重对方预算和决定', 2, { valueRespect: 2 }, '建议不越过边界'),
  ]),
  q(9, '财务边界 · 清楚也亲近', '一起花钱时，哪种方式最像你们？', [
    o('不好意思算清，事后又为谁付得多不舒服', 0, {}, '模糊账目积累情绪'),
    o('默认谁有钱谁多付，却很少确认意愿', 1, { trustPrivacy: 1 }, '财务期待未确认'),
    o('AA 或轮流请都可以，彼此觉得舒服最重要', 3, { valueRespect: 3, trustPrivacy: 1 }, '清晰边界不影响亲近'),
    o('预算差很多也会提前商量，不让谁硬撑', 2, { valueRespect: 2, rhythmFit: 1 }, '消费节奏可协商'),
  ]),
  q(10, '玩笑边界 · 玩梗默契', '互相开玩笑时，你们怎么判断能不能继续？', [
    o('越戳痛处越好笑，熟人不用介意', 0, {}, '玩笑越过真实边界'),
    o('有人不舒服时还会说“开不起玩笑”', 1, { humorSync: 1 }, '停损信号未被接住'),
    o('一个表情就能接梗，也知道哪些绝不碰', 3, { humorSync: 3, valueRespect: 1 }, '默契与边界同时在线'),
    o('不确定时会确认，对方说停就停', 2, { humorSync: 2, repairSupport: 1 }, '玩笑可随时刹车'),
  ]),
  q(11, '审美不同 · 保留空间', '她喜欢的风格你完全欣赏不来时，你会？', [
    o('反复吐槽，直到她改主意', 0, {}, '偏好被当成对错'),
    o('敷衍夸好看，私下继续嫌弃', 1, { humorSync: 1 }, '真实反馈不够清楚'),
    o('坦白不是自己的风格，也能帮她认真挑', 3, { valueRespect: 3, humorSync: 1 }, '不同审美不妨碍支持'),
    o('各自保留喜好，偶尔交换有用建议', 2, { valueRespect: 2 }, '差异有空间'),
  ]),
  q(12, '久未联系 · 稳定重连', '半年没有见面，再碰面时你们会？', [
    o('先追究为什么谁都没主动', 0, {}, '重连先进入计分'),
    o('有点生疏，需要慢慢热起来', 1, { rhythmFit: 1 }, '重连需要缓冲'),
    o('自然更新近况，不把低频解释成变淡', 3, { rhythmFit: 3, trustPrivacy: 2 }, '低频关系仍有安全感'),
    o('先约一个轻松的小活动重新接上', 2, { rhythmFit: 2, repairSupport: 1 }, '重连方式低压力'),
  ]),
  q(13, '重要选择 · 支持自主', '她要做一个你不太认同的决定，你会？', [
    o('用关系施压，要求她按自己的方案来', 0, {}, '关心变成替对方决定'),
    o('怕冲突，只说“都行”', 1, { rhythmFit: 1 }, '真实意见暂时缺席'),
    o('说清担心和依据，最终尊重她的选择', 3, { valueRespect: 3, repairSupport: 2 }, '建议不夺走自主权'),
    o('先问她需要建议、信息还是单纯倾听', 2, { valueRespect: 2, repairSupport: 1 }, '支持模式先确认'),
  ]),
  q(14, '遇到冲突 · 不升级伤害', '你被人欺负后，她怎样回应最像你们？', [
    o('不问经过就帮我骂回去，把事情闹大', 0, {}, '情绪升级不等于支持'),
    o('不问事实先站到我这边，之后才考虑后果', 1, { trustPrivacy: 1 }, '立场先于安全判断'),
    o('先听完整经过，确认安全，再和我商量怎么办', 3, { repairSupport: 3, valueRespect: 2 }, '支持、事实与安全并重'),
    o('先接住情绪，同时提醒我别做会后悔的事', 2, { repairSupport: 2, trustPrivacy: 1 }, '陪伴不推动冲动'),
  ]),
  q(15, '关系边界 · 不替你生活', '你开始一段新关系后，她通常？', [
    o('要求知道全部细节，替我决定要不要继续', 0, {}, '关心越过自主边界'),
    o('因为见面变少就和新对象竞争', 1, { rhythmFit: 1 }, '关系变化带来拉扯'),
    o('尊重我的隐私，有具体风险时会坦诚提醒', 3, { trustPrivacy: 3, valueRespect: 2 }, '关心有证据也有边界'),
    o('愿意听我分享，也接受我保留一部分空间', 2, { trustPrivacy: 2, valueRespect: 1 }, '亲近不要求全透明'),
  ]),
  q(16, '分享习惯 · 频率不等于质量', '看到好笑或好用的东西时，你们通常？', [
    o('必须每条都回应，否则会被说不在乎', 0, {}, '分享变成在线考勤'),
    o('转发很多，但真正重要的话常被淹没', 1, { humorSync: 1 }, '高频不等于高质量'),
    o('不一定天天发，但总能记住对方真正喜欢什么', 3, { humorSync: 3, trustPrivacy: 1 }, '低频分享也有针对性'),
    o('有空就互相投递，没空也不追着要反馈', 2, { humorSync: 2, rhythmFit: 1 }, '分享节奏不施压'),
  ]),
  q(17, '理解偏差 · 主动确认', '一句话被对方误解时，你们会？', [
    o('认定“这么熟还不懂我”，拒绝解释', 0, {}, '默契被当成读心义务'),
    o('先阴阳几句，等对方自己发现', 1, { humorSync: 1 }, '误解通过暗示处理'),
    o('直接确认彼此意思，错了就修正', 3, { repairSupport: 3, trustPrivacy: 1 }, '理解靠沟通而非猜中'),
    o('先暂停情绪，再把原话和感受分开说', 2, { repairSupport: 2, valueRespect: 1 }, '修复步骤清楚'),
  ]),
  q(18, '见面频率 · 双方舒适', '关于多久见一次，你们更像？', [
    o('越频繁越亲，少见就是关系退步', 0, {}, '频率被直接当成亲密度'),
    o('没有共识，经常一方追一方躲', 1, { rhythmFit: 1 }, '节奏期待不一致'),
    o('高频或低频都可以，双方舒服且需要时找得到', 3, { rhythmFit: 3, trustPrivacy: 2 }, '连接质量高于次数'),
    o('会根据忙闲调整，也能提前说明变化', 2, { rhythmFit: 2, repairSupport: 1 }, '节奏可以动态协商'),
  ]),
  q(19, '情绪支持 · 陪伴不共沉', '她不开心时，你更可能怎么做？', [
    o('立刻跟着一起崩，把所有人都骂一遍', 0, {}, '情绪同步放大消耗'),
    o('急着给方案，让她赶快好起来', 1, { repairSupport: 1 }, '支持节奏偏快'),
    o('先问她想被陪、被听，还是一起想办法', 3, { repairSupport: 3, valueRespect: 2 }, '陪伴方式由需要决定'),
    o('关心并接住她，同时保留自己的情绪边界', 2, { repairSupport: 2, trustPrivacy: 1 }, '支持不要求一起下沉'),
  ]),
  q(20, '关系变化 · 持续协商', '想到未来生活可能变化，你更认同？', [
    o('如果变得没以前亲密，就说明友情失败', 0, {}, '变化被当成背叛'),
    o('不谈变化，希望一切自动保持原样', 1, { trustPrivacy: 1 }, '期待仍未说开'),
    o('接受阶段不同，重要的是愿意更新彼此需要', 3, { valueRespect: 3, rhythmFit: 2, repairSupport: 1 }, '关系靠协商适应变化'),
    o('不承诺固定形式，但会认真回应当下的连接', 2, { valueRespect: 2, trustPrivacy: 1 }, '珍惜当下，不做绝对保证'),
  ]),
]

export const DIM_MAX = Object.fromEntries(
  RADAR_DIMS.map((key) => [
    key,
    questions.reduce(
      (sum, question) => sum + Math.max(...question.options.map((option) => option.dims?.[key] || 0)),
      0,
    ),
  ]),
)

export const bands = [
  {
    key: 'separate',
    range: [0, 43],
    code: 'GG-01',
    name: '各有节奏',
    aka: '联系形式不同，仍可把需要说清',
    verdict: '本次答案里有一些节奏或边界尚未对齐。这不直接说明关系好坏，更适合拿来发现下一次可以说清的小事。',
    tags: ['#不以频率定亲疏', '#先确认需要', '#允许重新校准'],
    accent: '#8B7BFF',
  },
  {
    key: 'tuning',
    range: [44, 50],
    code: 'GG-02',
    name: '正在校频',
    aka: '已有默契，也有需要协商的接口',
    verdict: '你们在一些场景里很自然，另一些场景还会错拍。把猜测改成确认，比追求完全同步更有用。',
    tags: ['#有默契也有差异', '#关系可以协商', '#修复比猜中重要'],
    accent: '#C77D9B',
  },
  {
    key: 'steady',
    range: [51, 57],
    code: 'GG-03',
    name: '稳态互信',
    aka: '不必持续在线，也知道彼此会回应',
    verdict: '你们较能尊重差异、接住重要信息，并在错拍后重新连接。稳定来自可商量，不来自时刻一致。',
    tags: ['#低频也稳定', '#边界清楚', '#需要时找得到'],
    accent: '#FF8A73',
  },
  {
    key: 'aligned',
    range: [58, 100],
    code: 'GG-04',
    name: '多维合拍',
    aka: '多个友情接口都能舒服协作',
    verdict: '本次答案显示你们在尊重、节奏、信任、修复或玩梗上有较多合拍证据，同时仍保留各自独立空间。',
    tags: ['#尊重不必相同', '#支持不越界', '#默契可以明说'],
    accent: '#FF6F61',
  },
]

const DIM_PROFILES = {
  valueRespect: {
    strength: '你们较能允许彼此有不同偏好和选择，不用完全一致来证明亲近。',
    watch: '给建议前先确认对方是否需要，避免关心悄悄变成替对方决定。',
    practice: '下次意见不同时，先复述对方理由，再表达自己的担心。',
  },
  rhythmFit: {
    strength: '你们能在回复、见面和忙闲变化中找到双方都舒服的节奏。',
    watch: '节奏变化最好被说明，不要让对方只能靠频率猜关系状态。',
    practice: '约定一种低成本报备方式，例如“这周忙，周末再认真回”。',
  },
  trustPrivacy: {
    strength: '重要信息有边界，亲近也不要求彼此全透明或随时交代。',
    watch: '转述共同经历前，仍要确认哪些内容可以公开。',
    practice: '遇到私密话题时直接问一句：“这件事我可以和别人说吗？”',
  },
  repairSupport: {
    strength: '你们的支持不只是在情绪上站到一起，也包括听清事实、确认需要和修复误解。',
    watch: '接住情绪不等于放大冲动；支持可以同时包含边界和后果。',
    practice: '先问“你想让我听、陪，还是一起想办法？”再行动。',
  },
  humorSync: {
    strength: '你们有共享语境和玩笑节奏，也较能识别什么时候应该停。',
    watch: '熟悉不会自动取消边界；对方说不舒服时，先停比解释更重要。',
    practice: '把一个常用梗的禁区说清，保留好笑，也保留安全感。',
  },
}

export function getBand(index) {
  const value = Math.max(0, Math.min(100, Number(index || 0)))
  return bands.find((band) => value >= band.range[0] && value <= band.range[1]) || bands[bands.length - 1]
}

function normalize(value, max) {
  if (!max) return 0
  return Math.round(Math.max(0, Math.min(100, (value / max) * 100)))
}

export function computeReport(answers) {
  const safeAnswers = Array.isArray(answers) ? answers : []
  const maxScore = questions.length * 3
  const totalScore = safeAnswers.reduce((sum, answer) => sum + Number(answer?.score || 0), 0)
  const index = Math.round(Math.max(0, Math.min(100, (totalScore / maxScore) * 100)))
  const raw = Object.fromEntries(RADAR_DIMS.map((key) => [key, 0]))

  for (const answer of safeAnswers) {
    for (const [key, value] of Object.entries(answer?.dims || {})) {
      if (key in raw) raw[key] += Number(value || 0)
    }
  }

  const dims = Object.fromEntries(RADAR_DIMS.map((key) => [key, normalize(raw[key], DIM_MAX[key])]))
  const ranked = RADAR_DIMS
    .map((key) => ({ key, value: dims[key] }))
    .sort((a, b) => b.value - a.value)
  const topKey = ranked[0]?.key || RADAR_DIMS[0]
  const secondaryKey = ranked[1]?.key || RADAR_DIMS[1]
  const primaryLabel = DIM_LABELS[topKey]
  const secondaryLabel = DIM_LABELS[secondaryKey]
  const primary = DIM_PROFILES[topKey]
  const secondary = DIM_PROFILES[secondaryKey]
  const evidence = safeAnswers
    .filter((answer) => Number(answer?.dims?.[topKey] || 0) > 0)
    .sort((a, b) => Number(b.dims?.[topKey] || 0) - Number(a.dims?.[topKey] || 0))
    .slice(0, 2)
    .map((answer) => `“${answer.text}”`)
  const growthEvidence = safeAnswers
    .filter((answer) => Number(answer?.score || 0) <= 1)
    .slice(0, 2)
    .map((answer) => `“${answer.text}”`)
  const baseBand = getBand(index)
  const band = {
    ...baseBand,
    deep: {
      primaryLabel,
      secondaryLabel,
      summary: `本次选择里较突出的合拍维度是「${primaryLabel}」，其次是「${secondaryLabel}」。${primary.strength}`,
      forecast: '这份结果只整理当前答案中的互动证据，不推断关系期限，也不要求两个人在所有方面同步。',
      evidence: evidence.length ? evidence : ['本次选择未集中命中单一维度，主次排序来自整体分布。'],
      growthEvidence: growthEvidence.length ? growthEvidence : ['本次选择中较少出现明显卡点，可以继续保留现有的沟通与边界习惯。'],
      warnings: [primary.watch, secondary.watch],
      advice: [primary.practice, secondary.practice, '选择一个最容易执行的小动作，不把测试分数当作友情结论。'],
    },
  }

  return { index, dims, raw, band, topKey, secondaryKey }
}
