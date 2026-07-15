// =============================================================
//  情感信号雷达 · 数据层
//  双轴模型：invest 你的投入信号 / recip 对方回波
//  20 题，每选项给 (invest, recip) 0–3 + read（雷达读数）
//  结果：信号强度% + 主导状态(archetype) + 各状态信号分布
//  零 emoji
// =============================================================

export const questions = [
  {
    id: 1,
    spec: '目标锁定 · 是否有人',
    prompt: '现在有没有一个让你心动的人？',
    options: [
      { text: '没有，单身且自在', invest: 0, recip: 0, read: '未捕获目标信号' },
      { text: '有一个，但只敢自己偷偷想', invest: 3, recip: 0, read: '强信号 · 单向发射' },
      { text: '有，而且感觉对方也有点意思', invest: 3, recip: 3, read: '双向回波 · 同步' },
      { text: '同时有好几个在聊', invest: 1, recip: 2, read: '多目标 · 低投入广覆盖' },
    ],
  },
  {
    id: 2,
    spec: '高频信道 · 聊天对象',
    prompt: '手机里聊得最多的那个异性，是什么关系？',
    options: [
      { text: '没有聊得特别频繁的', invest: 0, recip: 0, read: '信道空闲' },
      { text: '暗恋对象，但没怎么敢主动聊', invest: 3, recip: 1, read: '发射强 · 回波弱' },
      { text: '互有来回的暧昧对象', invest: 3, recip: 3, read: '信道双工 · 稳定' },
      { text: '对方同时和几个人保持暧昧联系', invest: 1, recip: 3, read: '多信道接入 · 我方被动' },
    ],
  },
  {
    id: 3,
    spec: '回波延迟 · 对方回应',
    prompt: '那个人回你消息的速度是？',
    options: [
      { text: '没有特定要等的谁', invest: 0, recip: 0, read: '无回波' },
      { text: '经常已读不回，回得很慢', invest: 3, recip: 0, read: '回波丢失 · 单向损耗' },
      { text: '基本秒回，聊得很热', invest: 2, recip: 3, read: '回波即时 · 强同步' },
      { text: '我才是那个挑着回的人', invest: 1, recip: 3, read: '我方延迟 · 对方追踪' },
    ],
  },
  {
    id: 4,
    spec: '主动频率 · 谁先发起',
    prompt: '你主动找对方的频率？',
    options: [
      { text: '没有想主动找的人', invest: 0, recip: 0, read: '无主动发射' },
      { text: '每天都想找，但忍着不发', invest: 3, recip: 1, read: '高发射欲 · 强行抑制' },
      { text: '你来我往，很自然', invest: 2, recip: 2, read: '收发均衡' },
      { text: '基本都是别人来找我', invest: 0, recip: 3, read: '我方静默 · 对方主动' },
    ],
  },
  {
    id: 5,
    spec: '周末调度 · 时间分配',
    prompt: '一到周末，你更可能？',
    options: [
      { text: '自己安排得明明白白', invest: 0, recip: 0, read: '独立运行' },
      { text: '等他有没有空约我', invest: 3, recip: 1, read: '待命 · 等待对方调度' },
      { text: '早和暧昧对象有约了', invest: 3, recip: 3, read: '已建立连接' },
      { text: '在好几个邀约里挑一个', invest: 1, recip: 3, read: '多邀约 · 我方筛选' },
    ],
  },
  {
    id: 6,
    spec: '关系定义 · 对外口径',
    prompt: '外人问起你们，你会怎么说？',
    options: [
      { text: '我单身啊', invest: 0, recip: 0, read: '状态：未连接' },
      { text: '就……朋友吧（其实在暗恋）', invest: 3, recip: 0, read: '口径模糊 · 隐藏发射' },
      { text: '说不清，反正挺暧昧', invest: 3, recip: 2, read: '连接未确认' },
      { text: '是我对象（已经定了）', invest: 3, recip: 3, read: '连接已锁定' },
    ],
  },
  {
    id: 7,
    spec: '情绪牵动 · 已读未回',
    prompt: '对方半天没回消息，你的状态？',
    options: [
      { text: '无所谓，我也没空盯手机', invest: 0, recip: 0, read: '无牵动' },
      { text: '有点慌，反复点开看', invest: 3, recip: 1, read: '高牵动 · 信号焦虑' },
      { text: '知道他忙，不太担心', invest: 2, recip: 2, read: '低牵动 · 信任在线' },
      { text: '没什么感觉，反正还有别人聊', invest: 1, recip: 2, read: '注意力分散' },
    ],
  },
  {
    id: 8,
    spec: '付出权重 · 谁更上心',
    prompt: '这段关系里，谁付出得更多？',
    options: [
      { text: '没什么关系可言', invest: 0, recip: 0, read: '无负载' },
      { text: '基本都是我在付出', invest: 3, recip: 1, read: '负载严重不均 · 我方过载' },
      { text: '差不多，互相付出', invest: 2, recip: 2, read: '负载均衡' },
      { text: '对方更主动，我比较佛', invest: 1, recip: 3, read: '对方过载 · 我方省电' },
    ],
  },
  {
    id: 9,
    spec: '朋友圈布防 · 可见度',
    prompt: '发朋友圈时，你会特意考虑某个人看不看得到吗？',
    options: [
      { text: '不会，想发就发', invest: 0, recip: 0, read: '无定向广播' },
      { text: '会，专门发给某个人看', invest: 3, recip: 1, read: '定向广播 · 单一目标' },
      { text: '会，因为我们互相关注彼此动态', invest: 2, recip: 2, read: '互相订阅' },
      { text: '会屏蔽掉那些纠缠我的人', invest: 1, recip: 2, read: '我方设防' },
    ],
  },
  {
    id: 10,
    spec: '未来推演 · 关系走向',
    prompt: '你想过和这个人的未来吗？',
    options: [
      { text: '没有这个人', invest: 0, recip: 0, read: '无推演' },
      { text: '想了很多，但都是我一个人想', invest: 3, recip: 0, read: '单方推演 · 对方缺席' },
      { text: '我们偶尔会聊到以后', invest: 3, recip: 3, read: '双方规划在线' },
      { text: '懒得想那么远', invest: 1, recip: 2, read: '推演关闭' },
    ],
  },
  {
    id: 11,
    spec: '吃醋反应 · 独占欲',
    prompt: '看到对方和别的异性走得近，你会？',
    options: [
      { text: '没有让我在意的对象', invest: 0, recip: 0, read: '无独占信号' },
      { text: '很难受，但我没立场说什么', invest: 3, recip: 1, read: '独占欲强 · 无名分' },
      { text: '会吃醋，但我们能说开', invest: 3, recip: 3, read: '独占 · 双向确认' },
      { text: '无所谓，反正我也没只盯着一个', invest: 1, recip: 2, read: '低独占 · 多线并行' },
    ],
  },
  {
    id: 12,
    spec: '深夜信号 · emo 归属',
    prompt: '半夜突然 emo，你第一个想联系？',
    options: [
      { text: '谁也不找，自己消化', invest: 0, recip: 0, read: '自维持' },
      { text: '想找他，但怕打扰，忍住了', invest: 3, recip: 1, read: '强归属 · 自我抑制' },
      { text: '直接找他，他也会回应', invest: 3, recip: 3, read: '归属明确 · 回应稳定' },
      { text: '随便找个还在线的聊聊', invest: 1, recip: 2, read: '归属分散' },
    ],
  },
  {
    id: 13,
    spec: '见面意愿 · 线下连接',
    prompt: '关于和对方见面这件事？',
    options: [
      { text: '没有要见的人', invest: 0, recip: 0, read: '无线下连接' },
      { text: '超想见，但对方总是含糊', invest: 3, recip: 1, read: '我方请求 · 对方回避' },
      { text: '经常见，见面很自然', invest: 3, recip: 3, read: '线下连接稳定' },
      { text: '有人约我，看心情答应', invest: 1, recip: 3, read: '被动接入 · 我方挑选' },
    ],
  },
  {
    id: 14,
    spec: '备注与置顶 · 优先级',
    prompt: '对方在你手机里的「待遇」？',
    options: [
      { text: '没有特别标记的人', invest: 0, recip: 0, read: '无优先级' },
      { text: '特别备注 + 置顶，消息免打扰也单独放行', invest: 3, recip: 1, read: '最高优先级 · 单向' },
      { text: '互相置顶，彼此都在意', invest: 3, recip: 3, read: '双向高优先级' },
      { text: '好几个都置顶着', invest: 1, recip: 2, read: '多目标置顶' },
    ],
  },
  {
    id: 15,
    spec: '表白进度 · 捅破窗户纸',
    prompt: '关于「挑明关系」这件事？',
    options: [
      { text: '没有要挑明的对象', invest: 0, recip: 0, read: '无待确认连接' },
      { text: '我想说，但怕说了连朋友都没得做', invest: 3, recip: 1, read: '请求挂起 · 恐惧丢包' },
      { text: '迟早会说开，感觉对方也在等', invest: 3, recip: 3, read: '握手即将完成' },
      { text: '没必要挑明，现在这样挺好', invest: 1, recip: 2, read: '维持模糊态' },
    ],
  },
  {
    id: 16,
    spec: '回应温度 · 忽冷忽热',
    prompt: '对方对你的态度，最贴近？',
    options: [
      { text: '没有在观察谁的态度', invest: 0, recip: 0, read: '无监测对象' },
      { text: '忽冷忽热，让我一直猜', invest: 3, recip: 2, read: '回波不稳 · 干扰强' },
      { text: '一直很稳定，让我很安心', invest: 3, recip: 3, read: '回波稳定' },
      { text: '是我在忽冷忽热吊着别人', invest: 1, recip: 3, read: '我方为干扰源' },
    ],
  },
  {
    id: 17,
    spec: '分享冲动 · 第一时间',
    prompt: '遇到好玩的事，你第一时间想分享给？',
    options: [
      { text: '发朋友圈或闺蜜群', invest: 0, recip: 0, read: '公共广播' },
      { text: '只想发给他，哪怕他经常不接话', invest: 3, recip: 1, read: '定向 · 回应稀疏' },
      { text: '我俩，因为他总会接住我的梗', invest: 3, recip: 3, read: '定向 · 接收良好' },
      { text: '看心情，谁回得快发给谁', invest: 1, recip: 2, read: '择优发送' },
    ],
  },
  {
    id: 18,
    spec: '退出成本 · 抽身难度',
    prompt: '如果现在这段关系/暧昧结束，你会？',
    options: [
      { text: '本来就没开始，无所谓', invest: 0, recip: 0, read: '退出成本为零' },
      { text: '我会很难过，毕竟我投入太多', invest: 3, recip: 1, read: '退出成本高 · 沉没投入' },
      { text: '会舍不得，我们都很认真', invest: 3, recip: 3, read: '双向高黏性' },
      { text: '挥挥手，下一个就来', invest: 1, recip: 2, read: '低黏性 · 易切换' },
    ],
  },
  {
    id: 19,
    spec: '迎合程度 · 自我让渡',
    prompt: '为了对方，你改变过自己多少？',
    options: [
      { text: '没改变，也没那个对象', invest: 0, recip: 0, read: '无形变' },
      { text: '改了很多去迁就他，他却没怎么变', invest: 3, recip: 1, read: '单方形变 · 不对等' },
      { text: '互相磨合，都在为对方调整', invest: 2, recip: 2, read: '双向适配' },
      { text: '我可不惯着，是别人迁就我', invest: 1, recip: 3, read: '对方适配我方' },
    ],
  },
  {
    id: 20,
    spec: '信号总览 · 当前心态',
    prompt: '用一句话形容你现在的情感状态？',
    options: [
      { text: '一个人，挺好，不缺谁', invest: 0, recip: 0, read: '独立 · 信号自洽' },
      { text: '心里有个人，但够不着', invest: 3, recip: 1, read: '强发射 · 弱回波' },
      { text: '正在和某人靠近，有来有回', invest: 3, recip: 3, read: '双向逼近 · 锁定中' },
      { text: '身边不缺人，但我没动真格', invest: 1, recip: 3, read: '多接入 · 我方保留' },
    ],
  },
]

// 每个答案记录一个可解释的当前状态信号。它比把所有选择压成二维坐标更稳定，
// 也能告诉用户“哪些答案把结果推向了这里”。
const ONE_WAY_OVERLOAD_QUESTIONS = new Set([3, 5, 7, 8, 10, 11, 12, 13, 14, 17, 18, 19])
const STABLE_MUTUAL_QUESTIONS = new Set([7, 8, 10, 11, 12, 13, 14, 16, 17, 18, 19])

for (const question of questions) {
  question.options.forEach((option, index) => {
    let state = 'solo'
    if (index === 1) state = ONE_WAY_OVERLOAD_QUESTIONS.has(question.id) ? 'licking' : 'crush'
    if (index === 2) state = STABLE_MUTUAL_QUESTIONS.has(question.id) ? 'stable' : 'ambiguous'
    if (index === 3) state = 'fishpond'
    if (question.id === 6 && index === 3) state = 'stable'
    if (question.id === 16 && index === 1) state = 'ambiguous'
    option.state = state
    option.evidence = question.spec
  })
}

// ===== 6 种情感状态（archetype）=====
// proto: [invest, recip] 0–100 原型坐标；angle 决定雷达扇区方位
export const archetypes = {
  solo: {
    key: 'solo',
    name: '独立待机',
    aka: '信号自洽型',
    signalLabel: '独立运行',
    proto: [16, 20],
    accent: '#36F1A6',
    verdict: '你的注意力目前主要留给自己。能独立安排生活，也愿意等到真正想靠近的人出现。',
    tags: ['#单身不等于落单', '#自给自足', '#在等对的频率'],
    deep: {
      summary:
        '雷达显示你当前几乎没有对外发射，也没有锁定任何回波——这是一个非常稳定的独立态。你不靠暧昧续命，也不靠别人确认自己的价值。这种状态最大的好处是：你下一次出手，多半是因为真的合适，而不是因为孤单。',
      forecast: '状态提示：独立不是封闭。保持标准的同时，也可以给真诚的新连接一个低压力窗口。',
      warnings: ['偶尔会把「自洽」用成「不给任何人机会」的盾牌', '错把所有靠近都当打扰，可能漏掉真信号'],
      advice: ['保持标准，但给真诚靠近的人一点回应窗口', '主动认识新的人 ≠ 妥协，只是扩大样本', '享受当下，脱单不是人生 KPI'],
    },
  },
  crush: {
    key: 'crush',
    name: '未确认心动',
    aka: '单向发射型',
    signalLabel: '强发射 · 弱回波',
    proto: [82, 22],
    accent: '#36F1A6',
    verdict: '你的注意力集中在一个人身上，但目前收到的回应还不足以确认关系方向。',
    tags: ['#暗恋ing', '#单方面上头', '#该出手了'],
    deep: {
      summary:
        '你在持续向一个特定目标发射强信号，但接收到的回波很弱——这是典型的单箭头。你把大量注意力、情绪、脑补都投在对方身上，而对方可能根本没意识到，或假装没意识到。暗恋本身很美，但长期单向发射会耗光你的电。',
      forecast: '状态提示：用一次低成本、可退出的邀请验证回应，比长期脑补更能保护你的精力。',
      warnings: ['容易把对方的礼貌当信号，过度解读', '为一个未确认的人推掉现实里的其他可能'],
      advice: ['用低成本方式试探一次回应，别赌上全部', '给自己设一个止损期限，到点就撤', '把投在脑补里的电，分一点回到自己生活上'],
    },
  },
  licking: {
    key: 'licking',
    name: '单侧过载',
    aka: '高投入低回声型',
    signalLabel: '投入偏高 · 回应不足',
    proto: [95, 40],
    accent: '#FF5C7A',
    verdict: '你投入了很多注意力和照顾，但目前的回应不够稳定。先把电量收回一点，才能看清是否对等。',
    tags: ['#单侧过载', '#需要对等回应', '#收回一点电'],
    deep: {
      summary:
        '多道答案都指向“你主动维持、对方回应较少”。这不说明谁好谁坏，但说明你需要把投入与实际回声放在一起看，而不是只看偶尔的高光时刻。',
      forecast: '状态提示：把付出降到可持续水平，观察对方是否会主动靠近、兑现约定和承担关系责任。',
      warnings: ['容易把偶尔回应当成长期承诺', '过度付出会让自己的边界越来越模糊'],
      advice: ['暂停额外加码，记录一周内双方主动和兑现情况', '明确说出一个真实需求，不用试探代替沟通', '把时间重新分给朋友、睡眠和自己的计划'],
    },
  },
  ambiguous: {
    key: 'ambiguous',
    name: '双向未确认',
    aka: '连接未确认型',
    signalLabel: '双向逼近 · 未锁定',
    proto: [66, 60],
    accent: '#36F1A6',
    verdict: '双方都有来回，但关系边界尚未确认。甜是真的，不确定也是真的。',
    tags: ['#暧昧拉扯中', '#就差一层窗户纸', '#甜并焦虑着'],
    deep: {
      summary:
        '你和对方在持续互相发射、互相回应，信号强度都不低，但连接始终没有正式锁定——典型的暧昧拉扯。这个阶段最甜也最累：每一次回应都让你上头，每一次冷淡都让你患得患失。暧昧的本质是「双方都还在观望，谁都不想先承担风险」。',
      forecast: '状态提示：比猜测更有效的是一次温和确认，了解双方是否想把关系往同一方向推进。',
      warnings: ['长期暧昧会消耗信任，把好感拖成疲惫', '不确认就没有边界，容易受伤也容易被换'],
      advice: ['找一个合适的时机，温和但明确地确认一次关系', '观察对方是「在了解」还是「在拖延」，两者待遇不同', '给暧昧设一个心理期限，别无限投入一个不给名分的人'],
    },
  },
  stable: {
    key: 'stable',
    name: '稳定互选',
    aka: '双向锁定型',
    signalLabel: '连接已锁定 · 同步稳定',
    proto: [88, 90],
    accent: '#5BFFC0',
    verdict: '你们的信号有来有回，也有持续性。稳定不是满分证明，而是双方持续回应的结果。',
    tags: ['#已脱单', '#稳定供电', '#双向奔赴'],
    deep: {
      summary:
        '你和对方的信号互相锁定，收发稳定、回波同步——这是一段健康在轨的关系。你既能投入，也能收到对等的回应，不靠拉扯续命，不靠脑补维持。这种稳定不是理所当然的，它需要双方持续地校准和投入。',
      forecast: '状态提示：继续保留表达、修复和各自空间，避免把稳定误当成不需要经营。',
      warnings: ['稳定久了容易把对方的好当默认值', '减少主动经营，信号也会慢慢失同步'],
      advice: ['定期给关系「校准」：表达、惊喜、好好说话', '把对方的付出说出来，别让 ta 觉得理所当然', '保持各自的生活，稳定不等于黏成一个人'],
    },
  },
  fishpond: {
    key: 'fishpond',
    name: '多线保留',
    aka: '多接入保留型',
    signalLabel: '多目标接入 · 我方保留',
    proto: [30, 80],
    accent: '#FFB020',
    verdict: '你接收到不止一个方向的关注，但暂时没有把投入集中到某段关系里。',
    tags: ['#多线保留', '#低承诺观察', '#先说清边界'],
    deep: {
      summary:
        '当前答案更像“保持多个浅连接，同时保留自己的选择”。它可能来自尚未遇到想认真靠近的人，也可能是对承诺和受伤风险的谨慎。',
      forecast: '状态提示：只要边界透明，多线认识并不等于伤害；真正需要避免的是让别人误以为关系已经排他。',
      warnings: ['模糊边界容易制造不必要的误会', '长期只接收关注，可能忽略自己真正想要什么'],
      advice: ['对正在接触的人说明当前关系边界', '区分“我还在了解”与“我不想投入”', '出现真正想靠近的人时，减少分散注意力并观察双向行动'],
    },
  },
}

// 雷达扇区顺序（决定 blip 角度，-90 起顺时针每 60°）
export const ARCHETYPE_ORDER = ['solo', 'crush', 'licking', 'ambiguous', 'stable', 'fishpond']

const MAX_AXIS = questions.length * 3
const STATE_OPTION_COUNTS = questions
  .flatMap((question) => question.options)
  .reduce((counts, option) => {
    counts[option.state] = (counts[option.state] || 0) + 1
    return counts
  }, {})

function inferLegacyState(answer) {
  if (ARCHETYPE_ORDER.includes(answer?.state)) return answer.state
  const invest = Number(answer?.invest || 0)
  const recip = Number(answer?.recip || 0)
  if (invest === 0 && recip === 0) return 'solo'
  if (invest >= 2 && recip <= 1) return 'crush'
  if (invest >= 2 && recip >= 3) return 'stable'
  if (invest >= 2 && recip >= 2) return 'ambiguous'
  if (invest <= 1 && recip >= 2) return 'fishpond'
  return 'ambiguous'
}

function toPercentDistribution(scored, total) {
  const rows = scored.map((item) => {
    const exact = total ? (item.count / total) * 100 : 0
    return { ...item, pct: Math.floor(exact), remainder: exact - Math.floor(exact) }
  })
  let left = 100 - rows.reduce((sum, row) => sum + row.pct, 0)
  for (const row of [...rows].sort((a, b) => b.remainder - a.remainder)) {
    if (left <= 0) break
    row.pct += 1
    left -= 1
  }
  return rows.map(({ remainder, ...row }) => row)
}

export function computeReport(answers) {
  const sumInvest = answers.reduce((s, a) => s + (a.invest || 0), 0)
  const sumRecip = answers.reduce((s, a) => s + (a.recip || 0), 0)
  const invest = Math.round((sumInvest / MAX_AXIS) * 100)
  const recip = Math.round((sumRecip / MAX_AXIS) * 100)
  const counts = Object.fromEntries(ARCHETYPE_ORDER.map((key) => [key, 0]))
  for (const answer of answers) counts[inferLegacyState(answer)] += 1

  const scored = ARCHETYPE_ORDER.map((key) => {
    const [pi, pr] = archetypes[key].proto
    const dist = Math.hypot(invest - pi, recip - pr)
    const strength = counts[key] / Math.max(1, STATE_OPTION_COUNTS[key])
    return { key, name: archetypes[key].name, count: counts[key], strength, dist }
  })
  const ranked = [...scored].sort((a, b) => b.strength - a.strength || a.dist - b.dist)
  const domKey = ranked[0].key
  const clarity = (ranked[0].strength - ranked[1].strength) / Math.max(0.01, ranked[0].strength)
  const signal = Math.round(50 + clarity * 50)
  const strengthTotal = scored.reduce((sum, row) => sum + row.strength, 0)
  const distribution = toPercentDistribution(
    scored.map((row) => ({ ...row, count: row.strength })),
    strengthTotal,
  )
    .sort((a, b) => b.pct - a.pct || a.dist - b.dist)
    .map(({ dist, count, strength, ...row }) => row)
  const idx = ARCHETYPE_ORDER.indexOf(domKey)
  const blip = { angle: -90 + idx * 60, radius: Math.max(22, signal) }
  const evidence = answers
    .filter((answer) => inferLegacyState(answer) === domKey)
    .map((answer) => answer.evidence || answer.read)
    .filter(Boolean)
    .slice(0, 3)
  const archetype = {
    ...archetypes[domKey],
    deep: { ...archetypes[domKey].deep, evidence },
  }

  return { invest, recip, signal, key: domKey, archetype, distribution, blip, evidence }
}
