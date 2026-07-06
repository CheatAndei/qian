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
      { text: '好几个备胎轮着聊', invest: 1, recip: 3, read: '多信道接入 · 我方被动' },
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

// ===== 6 种情感状态（archetype）=====
// proto: [invest, recip] 0–100 原型坐标；angle 决定雷达扇区方位
export const archetypes = {
  solo: {
    key: 'solo',
    name: '单身待机',
    aka: '信号自洽型',
    signalLabel: '独立运行',
    proto: [16, 20],
    accent: '#36F1A6',
    verdict: '你不是没人要，是没把雷达开给随便谁。一个人能过得自洽，是被很多人羡慕的能力。',
    tags: ['#单身不等于落单', '#自给自足', '#在等对的频率'],
    deep: {
      summary:
        '雷达显示你当前几乎没有对外发射，也没有锁定任何回波——这是一个非常稳定的独立态。你不靠暧昧续命，也不靠别人确认自己的价值。这种状态最大的好处是：你下一次出手，多半是因为真的合适，而不是因为孤单。',
      forecast: '走向预测：你大概率会保持挑剔，直到出现一个值得你开机的人。别被「该脱单了」的声音逼着将就。',
      warnings: ['偶尔会把「自洽」用成「不给任何人机会」的盾牌', '错把所有靠近都当打扰，可能漏掉真信号'],
      advice: ['保持标准，但给真诚靠近的人一点回应窗口', '主动认识新的人 ≠ 妥协，只是扩大样本', '享受当下，脱单不是人生 KPI'],
    },
  },
  crush: {
    key: 'crush',
    name: '单箭头暗恋',
    aka: '单向发射型',
    signalLabel: '强发射 · 弱回波',
    proto: [82, 22],
    accent: '#36F1A6',
    verdict: '你的雷达死死锁着一个人，可惜回波一直很弱。暗恋最累的地方，是你一个人演完了整部剧。',
    tags: ['#暗恋ing', '#单方面上头', '#该出手了'],
    deep: {
      summary:
        '你在持续向一个特定目标发射强信号，但接收到的回波很弱——这是典型的单箭头。你把大量注意力、情绪、脑补都投在对方身上，而对方可能根本没意识到，或假装没意识到。暗恋本身很美，但长期单向发射会耗光你的电。',
      forecast: '走向预测：要么找机会试探一次拿到真实回波，要么这段信号会在自我消耗中慢慢衰减。最怕的是无限期挂起。',
      warnings: ['容易把对方的礼貌当信号，过度解读', '为一个未确认的人推掉现实里的其他可能'],
      advice: ['用低成本方式试探一次回应，别赌上全部', '给自己设一个止损期限，到点就撤', '把投在脑补里的电，分一点回到自己生活上'],
    },
  },
  licking: {
    key: 'licking',
    name: '舔狗本狗',
    aka: '过载付出型',
    signalLabel: '满功率发射 · 入不敷出',
    proto: [95, 40],
    accent: '#FF5C7A',
    verdict: '说句重的：你不是不够好，是把自己贱卖了。一直加倍付出去换一点回应，这买卖你血亏。',
    tags: ['#别舔了', '#你值得对等的爱', '#收回点电'],
    deep: {
      summary:
        '你的发射功率几乎拉满，但收到的回波远远配不上你的投入——长期处在「我付出 100，他回应 20」的不对等里。你可能在用过度付出去换一个「他不会走」的安全感，但越用力，对方越习惯，越不珍惜。这不是爱情，是单方面的供养。',
      forecast: '走向预测：维持现状只会让落差越来越大。真正的转机，是你开始把电收回来，看看对方有没有主动靠近的能力。',
      warnings: ['你的自我价值正高度绑定在对方的回应上', '已经出现「跪着也要留住他」的行为', '朋友可能早就看不下去了'],
      advice: ['停止加码，把付出降到对等水平，观察对方反应', '一个需要你舔才能维持的关系，本身就是答案', '把注意力挪回自己身上，你会发现选择比你以为的多'],
    },
  },
  ambiguous: {
    key: 'ambiguous',
    name: '暧昧拉扯',
    aka: '连接未确认型',
    signalLabel: '双向逼近 · 未锁定',
    proto: [66, 60],
    accent: '#36F1A6',
    verdict: '你俩信号来来回回挺热闹，就是没人按下「确认」。暧昧最上头，也最磨人——它给你甜，但不给你保证。',
    tags: ['#暧昧拉扯中', '#就差一层窗户纸', '#甜并焦虑着'],
    deep: {
      summary:
        '你和对方在持续互相发射、互相回应，信号强度都不低，但连接始终没有正式锁定——典型的暧昧拉扯。这个阶段最甜也最累：每一次回应都让你上头，每一次冷淡都让你患得患失。暧昧的本质是「双方都还在观望，谁都不想先承担风险」。',
      forecast: '走向预测：暧昧有保质期。要么有人主动确认升级，要么久拖之后热度散去。拖得越久，先动心的那个越被动。',
      warnings: ['长期暧昧会消耗信任，把好感拖成疲惫', '不确认就没有边界，容易受伤也容易被换'],
      advice: ['找一个合适的时机，温和但明确地确认一次关系', '观察对方是「在了解」还是「在拖延」，两者待遇不同', '给暧昧设一个心理期限，别无限投入一个不给名分的人'],
    },
  },
  stable: {
    key: 'stable',
    name: '稳定在轨',
    aka: '双向锁定型',
    signalLabel: '连接已锁定 · 同步稳定',
    proto: [88, 90],
    accent: '#5BFFC0',
    verdict: '雷达上你俩信号互锁、稳定同步——这是最让人羡慕的状态。别凡尔赛了，好好珍惜对面那个人。',
    tags: ['#已脱单', '#稳定供电', '#双向奔赴'],
    deep: {
      summary:
        '你和对方的信号互相锁定，收发稳定、回波同步——这是一段健康在轨的关系。你既能投入，也能收到对等的回应，不靠拉扯续命，不靠脑补维持。这种稳定不是理所当然的，它需要双方持续地校准和投入。',
      forecast: '走向预测：只要双方都不把稳定当成可以偷懒的理由，这段关系会越走越顺。最大的敌人是「习惯」带来的忽视。',
      warnings: ['稳定久了容易把对方的好当默认值', '减少主动经营，信号也会慢慢失同步'],
      advice: ['定期给关系「校准」：表达、惊喜、好好说话', '把对方的付出说出来，别让 ta 觉得理所当然', '保持各自的生活，稳定不等于黏成一个人'],
    },
  },
  fishpond: {
    key: 'fishpond',
    name: '养鱼塘主',
    aka: '多接入保留型',
    signalLabel: '多目标接入 · 我方保留',
    proto: [30, 80],
    accent: '#FFB020',
    verdict: '身边不缺人，但你一个都没动真格——塘里鱼不少，就是没下决心捞哪条。爽是爽，小心哪天没人陪你玩真的。',
    tags: ['#养鱼塘主', '#不缺人就是不动心', '#小心空欢喜'],
    deep: {
      summary:
        '你接收到不少来自不同方向的回波，但自己的发射功率一直压得很低——你享受被很多人喜欢，却没有对谁真正投入。这种「养鱼」状态给你很强的安全感和掌控感，但也让你停留在浅层连接里，迟迟进入不了真正的关系。',
      forecast: '走向预测：鱼塘热闹得了一时。等你真正想认真时，可能会发现自己已经习惯了不投入，或者好的那条鱼早已离开。',
      warnings: ['习惯了被追，可能丧失主动投入的能力', '广撒网容易在某一天集体散场，留下空落感', '被你「养着」的人，未必会一直等'],
      advice: ['诚实面对：你是在保护自己，还是在逃避认真？', '如果塘里真有让你心动的，试着只对 ta 加大功率', '别用别人的喜欢来填自己的空，那填不满'],
    },
  },
}

// 雷达扇区顺序（决定 blip 角度，-90 起顺时针每 60°）
export const ARCHETYPE_ORDER = ['solo', 'crush', 'licking', 'ambiguous', 'stable', 'fishpond']

const MAX_AXIS = questions.length * 3

export function computeReport(answers) {
  const sumInvest = answers.reduce((s, a) => s + (a.invest || 0), 0)
  const sumRecip = answers.reduce((s, a) => s + (a.recip || 0), 0)
  const invest = Math.round((sumInvest / MAX_AXIS) * 100)
  const recip = Math.round((sumRecip / MAX_AXIS) * 100)
  const signal = invest

  // 与各原型的距离 → softmax 信号分布
  const scored = ARCHETYPE_ORDER.map((key) => {
    const [pi, pr] = archetypes[key].proto
    const dist = Math.hypot(invest - pi, recip - pr)
    return { key, dist, w: Math.exp(-dist / 24) }
  })
  const wsum = scored.reduce((s, x) => s + x.w, 0) || 1
  const distribution = scored
    .map((x) => ({ key: x.key, name: archetypes[x.key].name, pct: Math.round((x.w / wsum) * 100) }))
    .sort((a, b) => b.pct - a.pct)

  const domKey = scored.reduce((a, b) => (b.w > a.w ? b : a)).key
  const idx = ARCHETYPE_ORDER.indexOf(domKey)
  const blip = { angle: -90 + idx * 60, radius: Math.max(22, signal) }

  return { invest, recip, signal, key: domKey, archetype: archetypes[domKey], distribution, blip }
}
