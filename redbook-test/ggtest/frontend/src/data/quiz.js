// =============================================================
//  闺蜜同频检测 · 数据层（双频共振）
//  结果模型：默契指数 0–100%（越高越同频）
//  五维：worldview 三观同频 / rhythm 作息同步 / spending 消费观
//        / roast 吐槽频率 / secret 秘密共享
//  分数 score 0–3：越高越默契；read 为双频仪读数（答题即时反馈）
//  零 emoji
// =============================================================

export const DIM_LABELS = {
  worldview: '三观同频',
  rhythm: '作息同步',
  spending: '消费观',
  roast: '吐槽频率',
  secret: '秘密共享',
}

export const questions = [
  {
    id: 1,
    spec: '建立连接 · 信号年限',
    prompt: '你和她，认识多久了？',
    options: [
      { text: '才认识没多久，还在磨合', score: 0, dims: {}, read: '信号弱 · 尚未配对' },
      { text: '一两年，越处越熟', score: 1, dims: { worldview: 1 }, read: '同步率 38% · 逐步锁相' },
      { text: '好几年了，老交情', score: 2, dims: { worldview: 2 }, read: '同步率 71% · 频道稳定' },
      { text: '从小一起长大，根本数不清', score: 3, dims: { worldview: 3, secret: 1 }, read: '同步率 95% · 长期共振' },
    ],
  },
  {
    id: 2,
    spec: '默契带宽 · 一眼解码',
    prompt: '一个眼神，你们能懂对方在想什么吗？',
    options: [
      { text: '基本靠猜，经常猜错', score: 0, dims: {}, read: '解码失败 · 需要明说' },
      { text: '简单的能懂，复杂的不行', score: 1, dims: { worldview: 1 }, read: '解码率 40%' },
      { text: '大多数时候一个眼神就够了', score: 2, dims: { worldview: 2, roast: 1 }, read: '解码率 78% · 默契在线' },
      { text: '眼神一对就笑，旁人完全插不进', score: 3, dims: { worldview: 3, roast: 1 }, read: '解码率 96% · 无损直连' },
    ],
  },
  {
    id: 3,
    spec: '冲突复位 · 和好时延',
    prompt: '你俩闹别扭，一般多久能和好？',
    options: [
      { text: '能冷战很久，谁也不让', score: 0, dims: {}, read: '复位超时 · 缓冲过长' },
      { text: '几天吧，气消了就好了', score: 1, dims: { worldview: 1 }, read: '复位中 · 时延偏高' },
      { text: '当天就和好，隔夜仇都没有', score: 2, dims: { worldview: 2 }, read: '复位 12 小时内 · 良好' },
      { text: '吵完五分钟又凑一起骂别人去了', score: 3, dims: { worldview: 2, roast: 2 }, read: '秒级复位 · 频道无缝' },
    ],
  },
  {
    id: 4,
    spec: '响应延迟 · 消息回执',
    prompt: '你给她发消息，她通常多久回？',
    options: [
      { text: '经常已读不回，看心情', score: 0, dims: {}, read: '回执丢包 · 链路不稳' },
      { text: '有空就回，没空就晚点', score: 1, dims: { rhythm: 1 }, read: '回执延迟 · 可接受' },
      { text: '基本秒回，除非在忙', score: 2, dims: { rhythm: 2 }, read: '回执 < 1 分钟 · 在线' },
      { text: '我刚发完她那边消息就弹出来了', score: 3, dims: { rhythm: 3, roast: 1 }, read: '心电感应 · 双向同时发包' },
    ],
  },
  {
    id: 5,
    spec: '作息相位 · 在线重叠',
    prompt: '你们俩的作息时间，重合吗？',
    options: [
      { text: '完全相反，一个早睡一个夜猫', score: 0, dims: {}, read: '相位相反 · 在线不重叠' },
      { text: '差不多，偶尔错峰', score: 1, dims: { rhythm: 1 }, read: '相位接近 · 部分重叠' },
      { text: '基本同步，醒着睡着都差不多', score: 2, dims: { rhythm: 2 }, read: '相位重合 78%' },
      { text: '她几点醒几点睡我门儿清，因为我也一样', score: 3, dims: { rhythm: 3 }, read: '相位完全锁定 · 同步在线' },
    ],
  },
  {
    id: 6,
    spec: '深夜信道 · emo 求援',
    prompt: '你半夜突然 emo，第一个会找谁？',
    options: [
      { text: '自己消化，不想打扰别人', score: 0, dims: {}, read: '信道关闭 · 独自承载' },
      { text: '看情况，不一定是她', score: 1, dims: { secret: 1 }, read: '信道待机' },
      { text: '大概率是她，她懂我', score: 2, dims: { secret: 2, rhythm: 1 }, read: '深夜专线 · 已接通' },
      { text: '已经在打字了，她肯定还醒着', score: 3, dims: { secret: 3, rhythm: 1 }, read: '深夜专线 · 秒接 · 高保真' },
    ],
  },
  {
    id: 7,
    spec: '秘密缓存 · 保密完整性',
    prompt: '你的秘密告诉她，会被传出去吗？',
    options: [
      { text: '不太敢说，怕她嘴不严', score: 0, dims: {}, read: '加密缺失 · 有泄漏风险' },
      { text: '小事可以，大事还是留个心眼', score: 1, dims: { secret: 1 }, read: '部分加密' },
      { text: '基本放心，她不会乱说', score: 2, dims: { secret: 2 }, read: '端到端加密 · 稳定' },
      { text: '烂在肚子里那种，比我自己还守口如瓶', score: 3, dims: { secret: 3, worldview: 1 }, read: '保密完整 100% · 金库级' },
    ],
  },
  {
    id: 8,
    spec: '消费节律 · 买买买同步',
    prompt: '一起逛街买东西，你俩节奏合吗？',
    options: [
      { text: '完全合不来，她快我慢/她省我冲', score: 0, dims: {}, read: '消费相位失配' },
      { text: '大方向一致，细节常分歧', score: 1, dims: { spending: 1 }, read: '消费部分同步' },
      { text: '审美和预算都差不多，逛得很顺', score: 2, dims: { spending: 2 }, read: '消费同步 76%' },
      { text: '她看上的我也想要，经常一起剁手', score: 3, dims: { spending: 3, roast: 1 }, read: '消费完全共振 · 一起破产' },
    ],
  },
  {
    id: 9,
    spec: '账目结算 · AA 与垫付',
    prompt: '一起花钱，你们怎么算账？',
    options: [
      { text: '算得很清，谁也别想占便宜', score: 0, dims: {}, read: '结算严格 · 边界分明' },
      { text: '该 AA 就 AA，偶尔请客', score: 1, dims: { spending: 1 }, read: '结算正常' },
      { text: '谁方便谁付，从不计较', score: 2, dims: { spending: 2, secret: 1 }, read: '结算松弛 · 互信良好' },
      { text: '钱包基本不分你我，几十块谁还记得', score: 3, dims: { spending: 3 }, read: '账目共享 · 资金池打通' },
    ],
  },
  {
    id: 10,
    spec: '吐槽频道 · 同款槽点',
    prompt: '看到讨厌的人或事，你俩的反应？',
    options: [
      { text: '槽点经常对不上，她无感的我很烦', score: 0, dims: {}, read: '吐槽频道错位' },
      { text: '有时同款，有时各看各的', score: 1, dims: { roast: 1 }, read: '吐槽部分对齐' },
      { text: '基本同款，一吐槽就停不下来', score: 2, dims: { roast: 2, worldview: 1 }, read: '吐槽频道对齐 80%' },
      { text: '一个眼神就知道在吐槽同一个人', score: 3, dims: { roast: 3, worldview: 1 }, read: '吐槽完全同频 · 实时合拍' },
    ],
  },
  {
    id: 11,
    spec: '审美校准 · 穿搭口味',
    prompt: '她的穿搭/审美，你怎么看？',
    options: [
      { text: '经常欣赏不来，风格差太多', score: 0, dims: {}, read: '审美失配' },
      { text: '各有各的好看', score: 1, dims: { spending: 1 }, read: '审美中性' },
      { text: '挺合拍，会互相种草', score: 2, dims: { spending: 2, worldview: 1 }, read: '审美对齐 74%' },
      { text: '同款审美，经常撞衫还不尴尬', score: 3, dims: { spending: 2, worldview: 1, roast: 1 }, read: '审美共振 · 同一频段' },
    ],
  },
  {
    id: 12,
    spec: '空窗待机 · 断连不尬',
    prompt: '很久没联系，再见面会尴尬吗？',
    options: [
      { text: '会有点生分，得重新熟悉', score: 0, dims: {}, read: '断连掉线 · 需重连' },
      { text: '稍微缓一下就好了', score: 1, dims: { rhythm: 1 }, read: '断连可恢复' },
      { text: '一点不尬，接着上次的话继续', score: 2, dims: { rhythm: 2, worldview: 1 }, read: '断连不掉线 · 状态保持' },
      { text: '哪怕半年不见，见面还是昨天那样', score: 3, dims: { rhythm: 2, worldview: 2 }, read: '永久在线 · 零重连成本' },
    ],
  },
  {
    id: 13,
    spec: '价值同频 · 三观对齐',
    prompt: '遇到大事要做选择，你俩想法一致吗？',
    options: [
      { text: '经常想不到一块去', score: 0, dims: {}, read: '三观偏移 · 频差大' },
      { text: '大方向一致，小事有分歧', score: 1, dims: { worldview: 1 }, read: '三观接近' },
      { text: '基本同频，建议都很受用', score: 2, dims: { worldview: 2 }, read: '三观对齐 80%' },
      { text: '想法惊人地一致，常常异口同声', score: 3, dims: { worldview: 3 }, read: '三观完全共振 · 同一波形' },
    ],
  },
  {
    id: 14,
    spec: '应援响应 · 撑腰速度',
    prompt: '你被欺负了，她的反应是？',
    options: [
      { text: '劝我别冲动，先讲道理', score: 0, dims: {}, read: '响应温和 · 偏理性' },
      { text: '先问清楚再帮我评理', score: 1, dims: { secret: 1 }, read: '响应中 · 谨慎应援' },
      { text: '二话不说先站我这边', score: 2, dims: { secret: 2, roast: 1 }, read: '应援即时 · 无条件站位' },
      { text: '比我还气，已经在帮我想怎么骂回去', score: 3, dims: { secret: 2, roast: 2 }, read: '应援满格 · 情绪同步放大' },
    ],
  },
  {
    id: 15,
    spec: '对象审查 · 闺蜜把关',
    prompt: '你新认识了对象，她的态度？',
    options: [
      { text: '不太关心，那是我自己的事', score: 0, dims: {}, read: '把关离线' },
      { text: '随口问问，不会多管', score: 1, dims: { secret: 1 }, read: '把关待机' },
      { text: '认真帮我把关，有意见会直说', score: 2, dims: { secret: 2, worldview: 1 }, read: '把关在线 · 如实反馈' },
      { text: '比我还上心，连人家朋友圈都研究了', score: 3, dims: { secret: 2, roast: 1, worldview: 1 }, read: '把关满级 · 全方位扫描' },
    ],
  },
  {
    id: 16,
    spec: '想念触发 · 看到就分享',
    prompt: '买到好东西或看到好笑的，会想到她吗？',
    options: [
      { text: '很少，各玩各的', score: 0, dims: {}, read: '触发器关闭' },
      { text: '偶尔会顺手发给她', score: 1, dims: { rhythm: 1 }, read: '触发偶发' },
      { text: '经常第一反应就是发给她', score: 2, dims: { rhythm: 2, roast: 1 }, read: '触发频繁 · 共享在线' },
      { text: '好东西必给她留一份，好笑的必转她', score: 3, dims: { rhythm: 2, spending: 1, roast: 1 }, read: '触发即时 · 双向共享' },
    ],
  },
  {
    id: 17,
    spec: '潜台词解析 · 一句接半句',
    prompt: '聊天时，你说半句她能接上吗？',
    options: [
      { text: '经常会错意，得解释半天', score: 0, dims: {}, read: '潜台词解析失败' },
      { text: '有时能接，有时跑偏', score: 1, dims: { worldview: 1 }, read: '解析部分命中' },
      { text: '大多数能接上，很省话', score: 2, dims: { worldview: 2, roast: 1 }, read: '解析命中 82%' },
      { text: '我刚起头她就把后半句说完了', score: 3, dims: { worldview: 2, roast: 2 }, read: '潜台词完全解码 · 抢拍' },
    ],
  },
  {
    id: 18,
    spec: '同框频率 · 见面节奏',
    prompt: '你们多久见一次面/语音一次？',
    options: [
      { text: '很少，基本靠点赞维持', score: 0, dims: {}, read: '同框低频 · 信号微弱' },
      { text: '隔段时间约一次', score: 1, dims: { rhythm: 1 }, read: '同框间歇' },
      { text: '挺频繁，没事就聊两句', score: 2, dims: { rhythm: 2 }, read: '同框高频 · 链路活跃' },
      { text: '几乎天天连线，不聊浑身难受', score: 3, dims: { rhythm: 3, secret: 1 }, read: '同框常驻 · 持续在线' },
    ],
  },
  {
    id: 19,
    spec: '情绪耦合 · 喜怒同步',
    prompt: '她不开心的时候，你会？',
    options: [
      { text: '不太能察觉，她不说我不知道', score: 0, dims: {}, read: '情绪解耦 · 信号未捕获' },
      { text: '会关心，但情绪不太受影响', score: 1, dims: { secret: 1 }, read: '弱耦合' },
      { text: '一眼看出来，跟着一起低落', score: 2, dims: { secret: 2, worldview: 1 }, read: '情绪耦合 · 同步升高' },
      { text: '她还没说我就感觉到了，立马去找她', score: 3, dims: { secret: 3, rhythm: 1 }, read: '情绪强共振 · 远程感知' },
    ],
  },
  {
    id: 20,
    spec: '未来在线 · 长期共振',
    prompt: '十年后，你觉得你们还会这么好吗？',
    options: [
      { text: '说不好，缘分这种事很难讲', score: 0, dims: {}, read: '长期信号不确定' },
      { text: '应该会吧，看各自发展', score: 1, dims: { worldview: 1 }, read: '长期信号待定' },
      { text: '会的，再忙也会留着对方', score: 2, dims: { worldview: 2, secret: 1 }, read: '长期锁相 · 稳定' },
      { text: '一定会，老了还要一起带孙子互损', score: 3, dims: { worldview: 3, secret: 1 }, read: '永久共振 · 终身配对' },
    ],
  },
]

// ===== 结果带（4 档人设，按默契指数）=====
export const bands = [
  {
    range: [0, 49],
    code: 'GG-01',
    name: '远程同频',
    aka: '低频但有信号',
    verdict: '你们像隔着一座城的两台收音机，频率没完全对上，但只要愿意调一调，信号还在。别急，好朋友也是处出来的。',
    tags: ['#各有各的频道', '#偶尔对上线', '#值得再调一调'],
    accent: '#8B7BFF',
    deep: {
      summary:
        '双频仪显示你们目前处在弱耦合状态：在某些频段会共振，但更多时候各走各的相位。这未必是感情不够，更多是生活节奏、表达方式还没磨合到一个频道上。你们的关系像刚配对的设备，握手成功了，传输速度还没拉满。',
      forecast: '走向预测：如果都只等对方主动，信号会越来越弱；只要有一方愿意多发几个包，频率很容易重新对上。',
      warnings: ['容易因为「她没找我」就默认对方不在乎，其实只是错峰', '长期不联系会让共同话题越来越少，话题库需要补给'],
      advice: ['主动发一次「在干嘛」，不需要理由，连线本身就是维系', '找一件能一起做的小事，把节奏重新对齐', '别用「她变了」下结论，先确认是不是只是各自忙'],
    },
  },
  {
    range: [50, 69],
    code: 'GG-02',
    name: '欢喜冤家',
    aka: '吵吵闹闹型',
    verdict: '你们的频率经常对上，也经常打架——一边互损一边离不开。表面是冤家，底层是高带宽。这种「越吵越亲」的关系，外人根本学不来。',
    tags: ['#损归损不能少', '#一言不合就合拍', '#塑料里掺了真心'],
    accent: '#FF6F61',
    deep: {
      summary:
        '双频仪捕捉到一个有趣的波形：你们的信号高频共振，但相位时常对冲——也就是又默契又爱杠。这其实是关系健康的表现：能放心吵架、吵完还在，说明底层信任足够厚。你们之间的「互损」是一种亲密语言，外人听着像吵架，你们听着像情话。',
      forecast: '走向预测：只要别在气头上翻旧账、戳真正的痛处，这种关系会越处越皮实，是能扛事的那种交情。',
      warnings: ['吵架时容易嘴比脑子快，偶尔会戳到对方真正在意的点', '把「我们这么熟」当理由，忽略了对方也需要被认真对待'],
      advice: ['损归损，涉及对方底线的话题踩一脚刹车', '吵完别冷处理，你们的优势就是和好快，用起来', '偶尔切换一下频道，正经夸她一次，她会受宠若惊'],
    },
  },
  {
    range: [70, 89],
    code: 'GG-03',
    name: '过命交情',
    aka: '能托付型',
    verdict: '你们的频率高度重合：作息、三观、钱包、秘密，几乎都打通了。这是那种「半夜出事第一个打给她」的关系。能处到这一步的，一只手数得过来。',
    tags: ['#半夜能叫醒', '#秘密全托管', '#一个眼神就懂'],
    accent: '#FF6F61',
    deep: {
      summary:
        '双频仪显示你们处在强共振状态：多个频段长期锁相，几乎没有掉线。你们之间已经形成了高带宽、低延迟的专线——不用解释太多，一个表情就懂；不用客套，钱和秘密都能放心交。这种关系很难得，它需要时间，也需要双方都没有偷懒。',
      forecast: '走向预测：这段关系稳定性很高，能扛过距离、扛过各自恋爱、扛过人生变动。唯一的风险是太熟之后忘了维护。',
      warnings: ['越熟越容易把对方的好当理所当然', '可能因为「反正她懂」而省略了该说的感谢和在意', '彼此恋爱/成家后，要主动给这段友情留出时间'],
      advice: ['再熟也别省那句「谢谢你」，她值得被认真珍惜', '定期约一个只属于你俩的时间，雷打不动', '在她为别的事忙时主动说一句「我在」，专线要保温'],
    },
  },
  {
    range: [90, 100],
    code: 'GG-04',
    name: '灵魂双胞胎',
    aka: '同频天花板',
    verdict: '说句实话：你们已经不像两个人，更像一个人分了两个身体。频率完全重合，连吐槽的对象都是同一个。这种默契是稀有品，请务必拿命珍惜。',
    tags: ['#一个脑子两个身体', '#异口同声成日常', '#这辈子跑不掉'],
    accent: '#FF6F61',
    deep: {
      summary:
        '双频仪各项指标全部触顶：三观、作息、消费、吐槽、秘密五个频段完全锁相，波形几乎重叠。你们之间已经不需要「沟通」，而是「共享」——经常异口同声，经常想到一块去，连沉默都是同一种舒服。这种程度的同频，在所有关系里都属于天花板，可遇不可求。',
      forecast: '走向预测：这是能走一辈子的频率。无论各自走到哪、身边换了谁，你们这条专线大概率永远在线。',
      warnings: ['太同频也要给彼此留一点独立空间，别完全长在一起', '小心因为太懂对方，反而忽略了把在意说出口', '关系太好也会被外人羡慕嫉妒，护好你们的小世界'],
      advice: ['这种朋友一辈子遇不到几个，值得你主动维护', '允许彼此有对方不参与的生活，频率才不会过载', '把「有你真好」说出来，再亲也别让默契代替表达'],
    },
  },
]

export function getBand(index) {
  const v = Math.max(0, Math.min(100, index))
  return bands.find((b) => v >= b.range[0] && v <= b.range[1]) || bands[bands.length - 1]
}

// ===== 计算默契指数 + 五维 =====
// 五维理论最大值（每题取该维最高增量之和），用于归一化
const DIM_KEYS = ['worldview', 'rhythm', 'spending', 'roast', 'secret']
const dimMax = (() => {
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
    dims[k] = dimMax[k] ? Math.round((acc[k] / dimMax[k]) * 100) : 0
  })

  return { index, dims, band: getBand(index) }
}

// 雷达展示顺序（五个同频维度）
export const RADAR_DIMS = ['worldview', 'rhythm', 'spending', 'roast', 'secret']
