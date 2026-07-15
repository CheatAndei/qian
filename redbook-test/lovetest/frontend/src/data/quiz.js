// =============================================================
//  心动投入度监测 · 数据层
//  结果模型：指数 0–100%（越高代表关系占用越明显）
//  五维：rush 升温速度 / anxiety 回应敏感 / dissolve 自我让位
//        / please 过度配合 / reason 自我保留
//  零 emoji；read 为监测仪读数（答题即时反馈）
// =============================================================

export const DIM_LABELS = {
  rush: '升温速度',
  anxiety: '回应敏感',
  dissolve: '自我让位',
  please: '过度配合',
  reason: '自我保留',
}

export const questions = [
  {
    id: 1,
    spec: '回应延迟 · 焦虑放电',
    prompt: '他半天没回消息，你的第一反应是？',
    options: [
      { text: '该干嘛干嘛，他忙完自然会回', score: 0, dims: { reason: 3 }, read: '脑波平稳 · 理智区在线' },
      { text: '瞄一眼手机，但不至于影响心情', score: 1, dims: { reason: 1 }, read: '轻微波动 · 在可控范围' },
      { text: '反复点开对话框，想他是不是烦我了', score: 2, dims: { anxiety: 3 }, read: '检测到焦虑放电 · 频率上升' },
      { text: '脑内已上演完「他要分手」的全套剧本', score: 3, dims: { anxiety: 3, dissolve: 1 }, read: '警报 · 情绪皮层过载' },
    ],
  },
  {
    id: 2,
    spec: '存储占比 · 对象密度',
    prompt: '你手机相册里，他占多少？',
    options: [
      { text: '几乎没有，我自己更上镜', score: 0, dims: { reason: 2 }, read: '自我信号充足' },
      { text: '有一些合照', score: 1, dims: {}, read: '基线正常' },
      { text: '一半以上是他和聊天截图', score: 2, dims: { dissolve: 2 }, read: '对象密度偏高' },
      { text: '单独建了相册，按日期归档', score: 3, dims: { dissolve: 3, please: 1 }, read: '存储几乎被单一对象占满' },
    ],
  },
  {
    id: 3,
    spec: '优先级 · 资源调度',
    prompt: '朋友先约了周末，他突然说想见你，你会？',
    options: [
      { text: '朋友先约的，照常赴约', score: 0, dims: { reason: 3 }, read: '优先级清晰 · 边界稳定' },
      { text: '看情况，尽量两边平衡', score: 1, dims: {}, read: '调度均衡' },
      { text: '大概率推掉朋友', score: 2, dims: { please: 2 }, read: '资源向对象倾斜' },
      { text: '想都不用想，朋友改期', score: 3, dims: { please: 3, dissolve: 1 }, read: '调度被单一对象接管' },
    ],
  },
  {
    id: 4,
    spec: '冲突复位 · 谁先低头',
    prompt: '你们吵架了，通常谁先低头？',
    options: [
      { text: '谁错谁先道歉', score: 0, dims: { reason: 3 }, read: '复位机制健康' },
      { text: '看谁先绷不住，五五开', score: 1, dims: {}, read: '双向复位' },
      { text: '基本都是我先', score: 2, dims: { please: 3 }, read: '单向退让 · 持续偏置' },
      { text: '哪怕是他的错，我也怕他不理我', score: 3, dims: { please: 3, anxiety: 2 }, read: '复位被恐惧驱动' },
    ],
  },
  {
    id: 5,
    spec: '语义解析 · 过度联想',
    prompt: '他发了条没头没尾的朋友圈，你会？',
    options: [
      { text: '划过去，关我什么事', score: 0, dims: { reason: 2 }, read: '解析模块休眠 · 正常' },
      { text: '顺手点个赞', score: 1, dims: {}, read: '轻度关注' },
      { text: '反复揣摩这句是不是说给我听的', score: 2, dims: { anxiety: 2 }, read: '过度联想 · 算力占用上升' },
      { text: '截图发闺蜜群，连夜开会分析', score: 3, dims: { anxiety: 3, rush: 1 }, read: '语义解析过载 · 进入加班模式' },
    ],
  },
  {
    id: 6,
    spec: '认定速度 · 上头曲线',
    prompt: '认识多久，你开始觉得「就是他了」？',
    options: [
      { text: '我向来慢热，得长期观察', score: 0, dims: { reason: 3 }, read: '上头曲线平缓' },
      { text: '几个月吧，得了解了解', score: 1, dims: {}, read: '曲线正常' },
      { text: '几次约会有感觉就认定', score: 2, dims: { rush: 3 }, read: '上头斜率陡升' },
      { text: '见第一面/聊几句就上头', score: 3, dims: { rush: 3, dissolve: 1 }, read: '瞬时峰值 · 理智来不及介入' },
    ],
  },
  {
    id: 7,
    spec: '缺点滤镜 · 美化系数',
    prompt: '他的缺点，你怎么看？',
    options: [
      { text: '缺点就是缺点，该介意介意', score: 0, dims: { reason: 3 }, read: '滤镜关闭 · 视野清晰' },
      { text: '能接受的范围内包容', score: 1, dims: {}, read: '轻度美化' },
      { text: '总能帮他找到理由开脱', score: 2, dims: { dissolve: 2 }, read: '美化系数升高' },
      { text: '在我眼里那都是优点', score: 3, dims: { dissolve: 3, rush: 1 }, read: '滤镜满格 · 缺点已不可见' },
    ],
  },
  {
    id: 8,
    spec: '空窗待机 · 等待功耗',
    prompt: '他没主动找你的那天，你在干嘛？',
    options: [
      { text: '过我自己的生活，很充实', score: 0, dims: { reason: 3 }, read: '待机功耗低 · 自洽' },
      { text: '偶尔想起，但不刻意', score: 1, dims: {}, read: '功耗正常' },
      { text: '一整天都在等他消息', score: 2, dims: { anxiety: 3 }, read: '空转耗电 · 注意力被占用' },
      { text: '坐立难安，怀疑自己哪里做错了', score: 3, dims: { anxiety: 3, please: 1 }, read: '高功耗待机 · 自我消耗' },
    ],
  },
  {
    id: 9,
    spec: '自我形变 · 配合程度',
    prompt: '为了配合他，你改变过多少？',
    options: [
      { text: '没必要，我还是我', score: 0, dims: { reason: 3 }, read: '自我结构稳定' },
      { text: '一些小习惯吧', score: 1, dims: {}, read: '轻微形变' },
      { text: '作息、口味、爱好都跟着调', score: 2, dims: { dissolve: 3 }, read: '结构开始软化' },
      { text: '连朋友圈都重新立人设了', score: 3, dims: { dissolve: 3, please: 2 }, read: '自我边界大幅形变' },
    ],
  },
  {
    id: 10,
    spec: '未来推演 · 提前量',
    prompt: '你们的未来，你想到哪一步了？',
    options: [
      { text: '走着看，不着急规划', score: 0, dims: { reason: 2 }, read: '推演克制 · 活在当下' },
      { text: '偶尔会想想', score: 1, dims: {}, read: '正常推演' },
      { text: '房子、孩子名字都想过', score: 2, dims: { rush: 3 }, read: '提前量过大 · 进度超前' },
      { text: '连吵架了怎么和好的剧本都备好了', score: 3, dims: { rush: 3, anxiety: 1 }, read: '推演失控 · 脑补未来全套' },
    ],
  },
  {
    id: 11,
    spec: '外部告警 · 屏蔽倾向',
    prompt: '闺蜜说他对你不够好，你会？',
    options: [
      { text: '觉得有道理，认真想想', score: 0, dims: { reason: 3 }, read: '接收外部告警 · 健康' },
      { text: '听一听，自己判断', score: 1, dims: {}, read: '正常采纳' },
      { text: '当场就替他辩护', score: 2, dims: { dissolve: 2, please: 1 }, read: '开始屏蔽告警' },
      { text: '渐渐和说他坏话的人疏远', score: 3, dims: { dissolve: 3 }, read: '告警系统被关闭 · 危险' },
    ],
  },
  {
    id: 12,
    spec: '断连恢复 · 缓冲时长',
    prompt: '如果现在分手，你预估自己多久能缓过来？',
    options: [
      { text: '难过一阵，但一定会好', score: 0, dims: { reason: 3 }, read: '恢复机制完好' },
      { text: '几个月吧', score: 1, dims: {}, read: '缓冲正常' },
      { text: '不敢想，可能很久', score: 2, dims: { anxiety: 2, dissolve: 1 }, read: '缓冲偏长 · 依赖偏高' },
      { text: '感觉天会塌，活不下去那种', score: 3, dims: { anxiety: 3, dissolve: 3 }, read: '恢复系统告急 · 高度依赖' },
    ],
  },
  {
    id: 13,
    spec: '资源投放 · 经济',
    prompt: '在他身上花钱，你是什么节奏？',
    options: [
      { text: '各花各的，我对自己更大方', score: 0, dims: { reason: 3 }, read: '投放克制 · 账户独立' },
      { text: '该请请该送送，正常往来', score: 1, dims: {}, read: '投放正常' },
      { text: '总忍不住给他买东西，自己反而省', score: 2, dims: { dissolve: 2, please: 1 }, read: '投放向对象倾斜' },
      { text: '工资大半花在他身上也甘愿', score: 3, dims: { dissolve: 3, please: 1 }, read: '账户几乎为对象服务' },
    ],
  },
  {
    id: 14,
    spec: '在线状态 · 监测频率',
    prompt: '你会盯他的在线 / 最后登录状态吗？',
    options: [
      { text: '从不看，没那习惯', score: 0, dims: { reason: 3 }, read: '监测模块关闭 · 健康' },
      { text: '偶尔瞥一眼', score: 1, dims: {}, read: '低频监测' },
      { text: '经常刷新看他在不在线', score: 2, dims: { anxiety: 3 }, read: '监测频率升高 · 算力占用' },
      { text: '他几点上线几点下线我门儿清', score: 3, dims: { anxiety: 3, dissolve: 1 }, read: '全天候监控 · 高功耗' },
    ],
  },
  {
    id: 15,
    spec: '话题占比 · 对象提及',
    prompt: '和朋友聊天时，话题多久绕回他？',
    options: [
      { text: '很少提，我有很多别的可聊', score: 0, dims: { reason: 2 }, read: '话题分布均衡' },
      { text: '偶尔会说说', score: 1, dims: {}, read: '提及率正常' },
      { text: '聊着聊着就拐到他身上', score: 2, dims: { rush: 1, dissolve: 1 }, read: '对象提及率偏高' },
      { text: '朋友吐槽「你又在说他」', score: 3, dims: { rush: 2, dissolve: 1 }, read: '话题被单一对象占满' },
    ],
  },
  {
    id: 16,
    spec: '边界完整性 · 容忍',
    prompt: '他做了让你不舒服的事，你通常？',
    options: [
      { text: '直接说出来，不舒服就是不舒服', score: 0, dims: { reason: 3 }, read: '边界完整 · 反馈正常' },
      { text: '看情况，原则问题会讲', score: 1, dims: {}, read: '边界稳定' },
      { text: '忍一忍，怕说了他不高兴', score: 2, dims: { please: 3 }, read: '边界开始让步' },
      { text: '反过来想是不是自己太敏感', score: 3, dims: { please: 2, dissolve: 2 }, read: '边界塌陷 · 自我归因' },
    ],
  },
  {
    id: 17,
    spec: '自我带宽 · 独处',
    prompt: '谈恋爱后，你还有自己的时间和爱好吗？',
    options: [
      { text: '当然，我的生活不只有他', score: 0, dims: { reason: 3 }, read: '自我带宽充足' },
      { text: '少了一点，但还在', score: 1, dims: {}, read: '带宽正常' },
      { text: '大部分空闲都留给他了', score: 2, dims: { dissolve: 2 }, read: '自我带宽被挤占' },
      { text: '早就没什么「自己的时间」概念了', score: 3, dims: { dissolve: 3, please: 1 }, read: '自我带宽几乎归零' },
    ],
  },
  {
    id: 18,
    spec: '情绪耦合 · 同步率',
    prompt: '他心情不好的时候，你会？',
    options: [
      { text: '关心他，但不影响我自己的状态', score: 0, dims: { reason: 3 }, read: '情绪解耦 · 各自独立' },
      { text: '会受点影响，但能分开', score: 1, dims: {}, read: '弱耦合' },
      { text: '他一不开心我也整天悬着', score: 2, dims: { anxiety: 2, dissolve: 1 }, read: '情绪强耦合 · 同步升高' },
      { text: '他的情绪就是我的情绪，跟着一起沉', score: 3, dims: { anxiety: 3, dissolve: 2 }, read: '情绪完全同步 · 失去缓冲' },
    ],
  },
  {
    id: 19,
    spec: '行为试探 · 求关注',
    prompt: '想确认他在不在乎你，你会？',
    options: [
      { text: '不试探，有话直说', score: 0, dims: { reason: 3 }, read: '通信透明 · 无试探' },
      { text: '偶尔旁敲侧击', score: 1, dims: {}, read: '轻度试探' },
      { text: '故意不回消息，看他急不急', score: 2, dims: { anxiety: 2, please: 1 }, read: '检测到试探信号' },
      { text: '时不时「作」一下，确认他还要我', score: 3, dims: { anxiety: 3, please: 1 }, read: '高频试探 · 安全感外求' },
    ],
  },
  {
    id: 20,
    spec: '供电来源 · 安全感',
    prompt: '这段关系里，你的安全感主要来自？',
    options: [
      { text: '我自己——我知道我值得被爱', score: 0, dims: { reason: 3 }, read: '自供电 · 电力稳定' },
      { text: '一半靠自己，一半靠他', score: 1, dims: {}, read: '双路供电' },
      { text: '主要看他给不给我反馈', score: 2, dims: { anxiety: 2, dissolve: 1 }, read: '外部供电为主' },
      { text: '全靠他，他一冷我就慌', score: 3, dims: { anxiety: 3, dissolve: 2 }, read: '完全外部供电 · 断电即崩' },
    ],
  },
]

// ===== 结果带（4 档人设）=====
export const bands = [
  {
    range: [0, 38],
    code: 'HOLD',
    name: '清醒投入',
    aka: '自我保留充足',
    verdict: '你谈恋爱像做实验：投入，但始终留着一只手在自己身上。这很好，别被人说成「不够爱」。',
    tags: ['#情绪稳定', '#边界清晰', '#自己也是世界'],
    accent: '#34E5B6',
    deep: {
      summary:
        '监测显示你的理智区全程在线。你会爱，但不会把自己整个交出去——情绪有锚点，决策有自己的一票。这不是冷淡，是成熟。你的风险不在「太上头」，而在偶尔太克制，容易被对方误读为不在乎。',
      forecast: '状态提示：自我保留很充足，也可以主动表达一点脆弱和需要，避免被误读为不在乎。',
      warnings: ['过度独立可能让对方缺少被需要感', '把心动误判成不理智，错过真正合适的人'],
      advice: ['允许自己偶尔上头一次，关系需要温度', '把你的在乎说出来，他不一定能看懂沉默', '保持现在的边界感，这是你的护城河'],
    },
  },
  {
    range: [39, 49],
    code: 'WARM',
    name: '心动升温',
    aka: '投入可回收',
    verdict: '大部分时候你拎得清，只在特定的人面前会短暂失灵。属于「健康的喜欢」，别慌。',
    tags: ['#在乎但不失控', '#会回血', '#人间清醒偶尔断电'],
    accent: '#16E0FF',
    deep: {
      summary:
        '你的脑波多数时间平稳，只在他做出特定动作时出现尖峰。这说明你有正常的依恋，也有正常的复位能力——上头之后能自己缓过来。这是最舒服的恋爱状态：投入得起，也收得回。',
      forecast: '状态提示：稳定回应会让你更放松；忽冷忽热则容易触发额外确认需求。',
      warnings: ['对方的「忽冷忽热」是你的主要触发器', '上头时容易临时降低自己的标准'],
      advice: ['记住平静时定的底线，别在投入升高时临时改它', '回应焦虑升高时先离开手机十分钟', '把「对方偶尔的冷淡」和「你的价值」分开看'],
    },
  },
  {
    range: [50, 61],
    code: 'FULL',
    name: '高投入模式',
    aka: '自我空间收窄',
    verdict: '他已经变成你生活的主线程，其他事都在后台运行。甜是真甜，但你也在悄悄消耗自己。',
    tags: ['#重度在乎', '#自我在让位', '#该回点血了'],
    accent: '#FF6F8E',
    deep: {
      summary:
        '监测捕捉到明显的自我让位信号：你的优先级、作息、情绪都开始围着他转。这种全情投入会让关系很浓烈，但你的「自我信号」正在变弱——当一个人把全部重量压在另一个人身上，关系会失去弹性。',
      forecast: '状态提示：先核对投入是否对等，并把朋友、爱好和作息重新放回日程。',
      warnings: ['你的情绪稳定越来越依赖对方的反馈', '正在疏远朋友/爱好，退路在变窄', '容易把「为他改变」当成爱的证明'],
      advice: ['每周留两件「只属于你」的事，雷打不动', '重新和被你冷落的朋友联系', '在心里给自己留一条「就算分开我也能活好」的底线'],
    },
  },
  {
    range: [62, 100],
    code: 'RESET',
    name: '投入过载',
    aka: '边界需要回收',
    verdict: '说句掏心窝的：你不是不够好，是太用力了。你把自己活成了他的附属程序，是时候把主控权抢回来。',
    tags: ['#请先爱自己', '#这不是你的错', '#把自己捡回来'],
    accent: '#FF3B6B',
    deep: {
      summary:
        '当前多项投入信号偏高：自我保留空间变小，情绪更容易跟随对方涨落。这不说明你哪里有问题，更像是你把太多确定感押在了单一关系反馈上。稳定感需要双向行动，也需要你保留自己的生活支点。',
      forecast: '状态提示：当前投入已经影响自我空间。先降低额外加码，再观察对方是否有稳定、对等的实际回应。',
      warnings: ['你的自我价值越来越依赖这段关系的反馈', '已出现「为了留住关系而违背自己」的行为', '断连后的恢复变慢，确认需求明显升高'],
      advice: ['这不是道德问题，是你太久没被好好爱过——先对自己温柔', '找一件能带来掌控感的小事，每天做，重建自我地基', '如果焦虑长期影响生活，请认真和信任的人聊聊，必要时寻求专业帮助'],
    },
  },
]

export function getBand(index) {
  const v = Math.max(0, Math.min(100, index))
  return bands.find((b) => v >= b.range[0] && v <= b.range[1]) || bands[bands.length - 1]
}

// ===== 计算指数 + 五维 =====
// 五维理论最大值（每题取该维最高增量之和），用于归一化
const DIM_KEYS = ['rush', 'anxiety', 'dissolve', 'please', 'reason']
export const DIM_MAX = (() => {
  const max = Object.fromEntries(DIM_KEYS.map((k) => [k, 0]))
  questions.forEach((q) => {
    const best = {}
    q.options.forEach((o) => {
      for (const k in o.dims || {}) best[k] = Math.max(best[k] || 0, o.dims[k])
    })
    for (const k in best) max[k] += best[k]
  })
  return max
})()

const MAX_SCORE = questions.length * 3

export function computeReport(answers) {
  const totalScore = answers.reduce((s, a) => s + (a.score || 0), 0)
  const index = Math.round((totalScore / MAX_SCORE) * 100)

  const acc = Object.fromEntries(DIM_KEYS.map((k) => [k, 0]))
  answers.forEach((a) => {
    for (const k in a.dims || {}) acc[k] += a.dims[k]
  })
  const dims = {}
  DIM_KEYS.forEach((k) => {
    dims[k] = DIM_MAX[k] ? Math.round((acc[k] / DIM_MAX[k]) * 100) : 0
  })

  const [topKey, secondaryKey] = [...DIM_KEYS].sort((a, b) => dims[b] - dims[a])
  const evidence = answers
    .filter((answer) => (answer?.dims?.[topKey] || 0) > 0)
    .sort((a, b) => (b.dims?.[topKey] || 0) - (a.dims?.[topKey] || 0))
    .slice(0, 3)
    .map((answer) => ({ text: answer.text, read: answer.read }))
  const sourceBand = getBand(index)
  const band = {
    ...sourceBand,
    deep: {
      ...sourceBand.deep,
      evidence,
      blend: `本次最高维度是「${DIM_LABELS[topKey]}」，次高维度是「${DIM_LABELS[secondaryKey]}」。它描述的是当前答题状态，不是固定人格。`,
    },
  }

  return { index, dims, band, topKey, secondaryKey }
}

// 雷达展示顺序（自我保留放最后，正向保护维度）
export const RADAR_DIMS = ['rush', 'anxiety', 'dissolve', 'please', 'reason']
