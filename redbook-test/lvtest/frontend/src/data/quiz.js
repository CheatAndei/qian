// =============================================================
//  情侣亲密度测试 · 数据层
//  亲密深度：warmth 互动温度 / stability 稳定承接
//  关系状态：礼貌靠近 / 日常搭子 / 双向亲密 / 深度同盟 / 高温拉扯 / 单侧过载
//  20 题；保留 invest/recip 导出字段，兼容现有答题与结果页面。
//  零 emoji；仅供娱乐参考，不作现实关系判断。
// =============================================================

function q(id, spec, prompt, options) {
  return { id, spec, prompt, options }
}

function o(text, warmth, stability, state, dims, read) {
  return {
    text,
    invest: warmth,
    recip: stability,
    state,
    dims,
    read,
  }
}

export const questions = [
  q(1, '联络节奏', '不在热聊时，你们的消息通常怎么流动？', [
    o('偶尔礼貌问候，聊完就自然停下', 0, 2, 'lv1', { boundary: 2, consistency: 1 }, '联系有分寸，连接仍偏轻'),
    o('会分享小事，回复不密但基本稳定', 2, 2, 'lv2', { reciprocity: 2, consistency: 2 }, '日常通道稳定在线'),
    o('想到就会发，双方都愿意把话接下去', 3, 3, 'lv3', { reciprocity: 3, consistency: 2 }, '双向分享形成循环'),
    o('一阵连续轰炸，一阵突然消失', 3, 0, 'lv5', { reciprocity: 1, consistency: 0 }, '热度很高，连续性不足'),
  ]),
  q(2, '安静相处', '两个人待在一起却没说话时，更像哪种画面？', [
    o('还不够熟，会努力找话题避免冷场', 1, 1, 'lv1', { boundary: 1, consistency: 1 }, '仍在确认彼此的舒适区'),
    o('各做各的，偶尔交换一句也很自然', 2, 2, 'lv2', { boundary: 2, consistency: 2 }, '陪伴感来自日常同处'),
    o('沉默也能感觉在同一队，不必证明什么', 2, 3, 'lv4', { boundary: 3, consistency: 3 }, '低噪声里仍有稳定连接'),
    o('一安静就会猜：是不是有人突然冷了', 2, 0, 'lv5', { boundary: 1, consistency: 0 }, '沉默容易触发关系警报'),
  ]),
  q(3, '见面计划', '约下一次见面时，真实情况更接近？', [
    o('有人提起才礼貌回应，还没有固定预期', 1, 1, 'lv1', { reciprocity: 1, future: 0 }, '见面仍是低承诺安排'),
    o('会一起对时间、预算和体力，找到双方都舒服的方案', 2, 3, 'lv4', { future: 3, consistency: 3 }, '现实安排也能共同协作'),
    o('双方都会主动腾时间，见面前就开始期待', 3, 3, 'lv3', { reciprocity: 3, future: 2 }, '靠近是两个人的共同动作'),
    o('多数时候是我追问，对方总说到时再看', 3, 1, 'lv6', { reciprocity: 0, future: 1 }, '见面投入出现单侧温差'),
  ]),
  q(4, '关系确认', '别人问起你们是什么关系时，答案通常是？', [
    o('还在了解，会介绍成普通朋友', 1, 2, 'lv1', { boundary: 2, future: 0 }, '关系仍处在观察窗口'),
    o('双方称呼一致，也能自然提起对方', 3, 3, 'lv3', { reciprocity: 3, consistency: 3 }, '关系确认清楚且双向'),
    o('公开与否会随当下情绪反复变化', 3, 0, 'lv5', { boundary: 1, consistency: 0 }, '身份信号忽明忽暗'),
    o('我想确认，对方却持续用含糊回答带过', 2, 0, 'lv6', { reciprocity: 0, future: 0 }, '确认需求没有收到回声'),
  ]),
  q(5, '冲突启动', '意见顶上来的一刻，你们最常做什么？', [
    o('先暂停，约好情绪下来后再谈', 1, 2, 'lv2', { repair: 2, boundary: 2 }, '会给冲突留一个缓冲区'),
    o('都能说感受，也愿意听对方到底在意什么', 3, 2, 'lv3', { repair: 3, reciprocity: 3 }, '冲突中仍保留双向通道'),
    o('先稳住局面，再一起处理具体问题', 2, 3, 'lv4', { repair: 3, consistency: 3 }, '修复比输赢更重要'),
    o('容易说狠话、拉黑或断联，等对方先着急', 3, 0, 'lv5', { repair: 0, boundary: 0 }, '高温冲突挤掉了修复空间'),
  ]),
  q(6, '冲突收尾', '一次争执过去后，你们一般怎样真正翻篇？', [
    o('不再提就算过去，关系回到礼貌状态', 1, 1, 'lv1', { repair: 1, consistency: 1 }, '表面复位，深层问题暂存'),
    o('能说开，也会重新确认彼此的在意', 3, 2, 'lv3', { repair: 3, reciprocity: 2 }, '情绪和关系都得到修复'),
    o('会复盘触发点，并约定下次怎样处理', 2, 3, 'lv4', { repair: 3, future: 3 }, '修复正在沉淀成共同规则'),
    o('总是我追着解释、道歉或求和', 3, 1, 'lv6', { repair: 1, reciprocity: 0 }, '修复责任长期落在一边'),
  ]),
  q(7, '隐私边界', '对手机、定位和私人空间，你们更接近？', [
    o('不过问每条动态，重要的事会主动说', 1, 2, 'lv2', { boundary: 3, consistency: 2 }, '边界清楚，信息不过载'),
    o('愿意分享，也能坦然说“这部分我想保留”', 3, 3, 'lv3', { boundary: 3, reciprocity: 2 }, '亲密与隐私可以同时存在'),
    o('敏感事项会提前说清规则，双方都照做', 2, 3, 'lv4', { boundary: 3, consistency: 3 }, '边界已经变成共同约定'),
    o('会靠查手机、盯定位或突然冷淡来换安全感', 3, 0, 'lv5', { boundary: 0, consistency: 0 }, '安全感正在依赖控制和试探'),
  ]),
  q(8, '各自生活', '恋爱之外，你们怎样对待彼此原有的生活？', [
    o('各自为主，关系参与还比较少', 0, 2, 'lv1', { boundary: 2, future: 0 }, '轻连接尚未深入日常'),
    o('有固定约会，也保留朋友和个人爱好', 2, 2, 'lv2', { boundary: 3, consistency: 2 }, '陪伴与独处都有位置'),
    o('会支持彼此目标，忙的时候也能协调资源', 2, 3, 'lv4', { future: 3, consistency: 3 }, '关系能承接各自的成长'),
    o('我不断调整安排，对方很少为我挪动', 3, 1, 'lv6', { boundary: 1, reciprocity: 0 }, '生活空间正向单侧倾斜'),
  ]),
  q(9, '疲惫时刻', '你很累、只剩一点电时，对方通常怎么接近？', [
    o('先问你想独处还是想有人陪', 2, 2, 'lv2', { boundary: 3, repair: 2 }, '照顾从确认需求开始'),
    o('会及时回应，也能给到情绪上的拥抱', 3, 2, 'lv3', { reciprocity: 3, repair: 2 }, '情绪信号能被双方接住'),
    o('既接住情绪，也愿意一起处理现实麻烦', 2, 3, 'lv4', { repair: 3, consistency: 3 }, '陪伴进一步落到行动'),
    o('我常接住对方，但轮到我时经常等不到人', 3, 1, 'lv6', { reciprocity: 0, consistency: 1 }, '支持系统存在单向供电'),
  ]),
  q(10, '投入平衡', '安排见面、解释误会、花钱出力这些事，整体更像？', [
    o('还在观察期，双方投入都比较有限', 1, 1, 'lv1', { reciprocity: 1, future: 0 }, '投入保持在试探范围'),
    o('双方都会主动，不必总由同一个人开头', 3, 3, 'lv3', { reciprocity: 3, consistency: 2 }, '关系有稳定的双向回声'),
    o('热的时候加倍付出，冷的时候全部撤回', 3, 0, 'lv5', { reciprocity: 1, consistency: 0 }, '投入随情绪大幅震荡'),
    o('多数安排和解释是我，对方更像被动接受', 3, 1, 'lv6', { reciprocity: 0, consistency: 1 }, '关系维护正在单侧运行'),
  ]),
  q(11, '未来颗粒度', '你们谈到未来时，通常具体到哪一步？', [
    o('还没到讨论阶段，先把当下相处看清楚', 0, 2, 'lv1', { future: 0, boundary: 2 }, '未来暂未进入共同议程'),
    o('会聊下次旅行、下个月或近期安排', 2, 2, 'lv2', { future: 2, consistency: 2 }, '短期计划开始连在一起'),
    o('能谈工作、住房、家人等现实问题，也有行动', 2, 3, 'lv4', { future: 3, consistency: 3 }, '长期议题已有执行信号'),
    o('甜的时候画得很远，一闹矛盾又全部推翻', 3, 0, 'lv5', { future: 1, consistency: 0 }, '承诺高度跟随情绪'),
  ]),
  q(12, '圈层交集', '彼此的朋友和生活圈，目前交集有多深？', [
    o('还没有交集，双方都保持自己的圈子', 0, 1, 'lv1', { boundary: 2, future: 0 }, '生活网络尚未连接'),
    o('认识少数重要朋友，偶尔一起出现', 2, 2, 'lv2', { consistency: 2, future: 1 }, '关系进入部分日常'),
    o('能自然参与彼此生活，不需要刻意安排身份', 3, 3, 'lv3', { reciprocity: 3, future: 2 }, '双方生活正在双向开放'),
    o('我把对方带进生活，对方却一直不让我靠近', 3, 1, 'lv6', { reciprocity: 0, future: 1 }, '生活开放程度明显不对等'),
  ]),
  q(13, '重要节点', '生日、纪念日或重要时刻，你们通常怎样处理？', [
    o('记得重要日期，方式简单但不会缺席', 2, 2, 'lv2', { consistency: 3, future: 1 }, '稳定出现比排场更重要'),
    o('双方都会准备贴合对方喜好的表达', 3, 3, 'lv3', { reciprocity: 3, consistency: 2 }, '仪式感是双向理解的结果'),
    o('再忙也会提前协商，错过了会认真补上', 2, 3, 'lv4', { repair: 3, consistency: 3 }, '现实变化不会取消在意'),
    o('有时轰轰烈烈，有时完全像忘了这段关系', 3, 0, 'lv5', { reciprocity: 1, consistency: 0 }, '重要节点也呈现冷热摆动'),
  ]),
  q(14, '距离测试', '一段时间见不到面时，关系怎样维持？', [
    o('联系不多，保持轻量，不急着加深', 0, 2, 'lv1', { boundary: 2, consistency: 1 }, '距离让轻连接保持原样'),
    o('双方都会主动同步近况，也尊重彼此忙碌', 3, 3, 'lv3', { reciprocity: 3, consistency: 3 }, '距离没有切断双向连接'),
    o('会突然高频报备，也会毫无预告地失联', 3, 0, 'lv5', { boundary: 1, consistency: 0 }, '远距离放大了冷热切换'),
    o('主要靠我找话题和安排，对方很少主动', 3, 1, 'lv6', { reciprocity: 0, consistency: 1 }, '连接成本集中在一边'),
  ]),
  q(15, '共同决策', '遇到会影响双方的选择时，你们怎么决定？', [
    o('重要决定仍各自做，之后再告知', 0, 2, 'lv1', { future: 0, boundary: 2 }, '关系尚未进入共同决策层'),
    o('会先说一声，但不一定共同权衡', 1, 2, 'lv2', { future: 1, consistency: 2 }, '日常连接多于共同规划'),
    o('即使利益冲突，也会一起找可执行的方案', 2, 3, 'lv4', { future: 3, repair: 3 }, '共同体现在现实选择里'),
    o('最后常是我迁就，对方的计划优先', 3, 1, 'lv6', { reciprocity: 0, boundary: 1 }, '决定权和付出并不对称'),
  ]),
  q(16, '连续性', '如果把最近一个月画成折线，关系温度更像？', [
    o('不算密集，但起伏不大，基本可预期', 1, 3, 'lv2', { consistency: 3, boundary: 2 }, '低频不等于低可靠'),
    o('热度会变化，但双方回应一直是确定的', 3, 2, 'lv3', { consistency: 3, reciprocity: 2 }, '心动之外还有连续回应'),
    o('全看当天情绪，甜和冷都来得很突然', 3, 0, 'lv5', { consistency: 0, repair: 1 }, '关系曲线频繁急升急降'),
    o('对方需要我时很热，我需要时却经常冷掉', 3, 0, 'lv6', { consistency: 0, reciprocity: 0 }, '温度变化与双方需求不对称'),
  ]),
  q(17, '需求表达', '想被陪伴、被确认或需要空间时，你们会？', [
    o('怕越界，所以很少直接开口', 0, 1, 'lv1', { boundary: 1, repair: 1 }, '需要仍停留在心里'),
    o('能直接说，也能接受对方当下做不到', 3, 2, 'lv3', { boundary: 3, reciprocity: 3 }, '表达与拒绝都有安全空间'),
    o('会把需求变成具体、可协商的安排', 2, 3, 'lv4', { repair: 3, future: 3 }, '需求能够落成共同方案'),
    o('更常用反话、试探或突然冷淡让对方猜', 3, 0, 'lv5', { repair: 0, boundary: 0 }, '真实需求被高温信号包住'),
  ]),
  q(18, '现实压力', '工作变动、搬家或经济压力出现时，你们更像？', [
    o('各自处理，确实需要时再帮一把', 1, 2, 'lv2', { boundary: 3, consistency: 2 }, '支持存在但仍保持独立'),
    o('愿意分担，具体边界还在磨合', 3, 2, 'lv3', { reciprocity: 3, future: 2 }, '双方开始进入现实协作'),
    o('会分工、复盘，也敢谈钱和责任', 2, 3, 'lv4', { future: 3, consistency: 3 }, '关系经得起现实压力测试'),
    o('责任经常落在我身上，决定权却不在我', 3, 1, 'lv6', { reciprocity: 0, boundary: 1 }, '承担与话语权出现错位'),
  ]),
  q(19, '低谷陪伴', '其中一人进入低谷时，关系最常出现什么？', [
    o('会礼貌关心，但不会介入太深', 1, 1, 'lv1', { boundary: 2, reciprocity: 1 }, '关心仍停留在轻连接'),
    o('稳定问候，尊重对方自己的恢复节奏', 1, 2, 'lv2', { boundary: 3, consistency: 2 }, '陪伴温和而持续'),
    o('一低落就互相拉扯、翻旧账或确认爱不爱', 3, 0, 'lv5', { repair: 0, consistency: 0 }, '压力会放大关系震荡'),
    o('我经常负责救火，自己低落时却很少被反接', 3, 1, 'lv6', { reciprocity: 0, repair: 1 }, '照顾长期只有单向出口'),
  ]),
  q(20, '关系全景', '暂时不谈“好不好”，你们现在最像哪种连接？', [
    o('正在了解，真实相处的证据还不够多', 1, 2, 'lv1', { boundary: 2, future: 0 }, '轻连接，继续观察比急着定性重要'),
    o('像一个共同体，甜和现实问题都能一起面对', 2, 3, 'lv4', { future: 3, consistency: 3 }, '深连接已经落到共同承担'),
    o('心动很强，但稳定感总是跟不上', 3, 0, 'lv5', { consistency: 0, repair: 1 }, '强吸引与低稳定同时存在'),
    o('一方拼命靠近，另一方始终有所保留', 3, 1, 'lv6', { reciprocity: 0, boundary: 1 }, '连接强度与回应明显不对称'),
  ]),
]

export const DIM_LABELS = {
  reciprocity: '双向回应',
  repair: '冲突修复',
  boundary: '边界舒适',
  future: '共同投入',
  consistency: '稳定承接',
}

const DIM_KEYS = Object.keys(DIM_LABELS)

const dimensionCopy = {
  reciprocity: {
    strength: '你们最明显的优势是有来有回：主动、回应和照顾不只落在一个人身上。',
    focus: '双向回应信号仍偏弱，主动、解释或照顾可能长期集中在同一边。',
    warning: '双向回应不是要求每次五五开，而是长期不能只靠一个人维持。',
    advice: '把一次自然收到的回应说出来，让对方知道哪些动作真的让你安心。',
  },
  repair: {
    strength: '你们在不舒服之后仍有回到同一张桌子的能力，修复比不吵架更重要。',
    focus: '冲突后的修复信号仍偏弱，表面翻篇不一定真的解决了触发点。',
    warning: '修复不能只停在和好，反复出现的触发点仍需要具体规则。',
    advice: '下次冲突前先约好暂停信号和重启时间，减少靠猜测恢复关系。',
  },
  boundary: {
    strength: '你们较能同时容纳亲密与个人空间，不必靠控制来证明在乎。',
    focus: '边界舒适度仍需校准，靠得太紧或退得太远都可能让真实需求失焦。',
    warning: '边界清楚不等于冷淡，也别把沉默自动解释成成熟。',
    advice: '各自说清一个希望被尊重的空间，也说清一个希望被主动靠近的时刻。',
  },
  future: {
    strength: '你们愿意把彼此放进真实安排，关系不只停留在情绪和口头承诺。',
    focus: '共同投入仍缺少可验证的行动，未来感更像想象或单方面期待。',
    warning: '共同计划的价值在行动，不在把未来描述得多浪漫。',
    advice: '先完成一个三十天内可验证的小计划，用行动校准长期期待。',
  },
  consistency: {
    strength: '你们的连接相对可预期，低频或忙碌时也不容易让关系突然断电。',
    focus: '稳定承接信号仍偏弱，关系温度容易被当天情绪或单次回应带着走。',
    warning: '稳定不是默认拥有，长时间省略表达也会让连接慢慢变薄。',
    advice: '保留一个低成本但稳定的连接习惯，让忙碌时也有确定回声。',
  },
}

export const archetypes = {
  lv1: {
    key: 'lv1',
    name: '礼貌靠近',
    aka: '轻连接观察型',
    signalLabel: '轻连接 · 待观察',
    proto: [22, 58],
    accent: '#9CCBFF',
    verdict: '你们正在靠近，但真实相处证据还不多。慢一点不是坏事，先看行动能否持续。',
    tags: ['#正在了解', '#边界仍在确认', '#不急着定性'],
    deep: {
      summary: '这段关系目前更像轻连接：相处不差，但情绪、生活和未来还没有深度交叉。',
      forecast: '如果双方都开始主动增加真实相处，连接会自然加深；如果一直只靠礼貌回应，关系也可能停在原地。',
      warnings: ['别把一次聊得来直接当成长期合适', '也别因为进展慢就用突然加码换答案'],
      advice: ['增加一次真实场景里的相处', '观察对方是否持续主动，而不只看某次高光'],
    },
  },
  lv2: {
    key: 'lv2',
    name: '日常搭子',
    aka: '舒适陪伴型',
    signalLabel: '日常连接 · 低耗稳定',
    proto: [48, 68],
    accent: '#76D7FF',
    verdict: '你们已经进入彼此日常，舒服、不太累。下一步不是更黏，而是更明确地表达选择。',
    tags: ['#舒服相处', '#低耗陪伴', '#正在升温'],
    deep: {
      summary: '这段关系的底色是舒服和可持续，陪伴已经发生，但深层确认和共同投入仍有增长空间。',
      forecast: '只要别把舒服过成默认和敷衍，关系会继续加深；长期不表达，也可能慢慢固定成普通搭子。',
      warnings: ['稳定不等于已经足够亲密', '“反正你懂”会省掉本该说出口的在意'],
      advice: ['主动表达一次具体感谢或想念', '制造一段只有你们知道的共同记忆'],
    },
  },
  lv3: {
    key: 'lv3',
    name: '双向亲密',
    aka: '心动有回声型',
    signalLabel: '高温连接 · 双向回应',
    proto: [82, 78],
    accent: '#FF7AA2',
    verdict: '你们不只会靠近，也能收到彼此的回应。甜是真的，双向才是这段关系最值钱的部分。',
    tags: ['#双向奔赴', '#高甜有回声', '#彼此看见'],
    deep: {
      summary: '这段关系的互动温度和双向回应都很明显，靠近不是一个人的独角戏。',
      forecast: '继续保持坦诚和边界，这份亲密会逐渐从高甜走向可靠；最大的风险是把回应当成默认值。',
      warnings: ['热度高时也要允许彼此拥有独处和慢回复', '别用默契代替必要的确认'],
      advice: ['保留主动表达，不只等对方先做', '遇到小分歧时及时修复，别等甜度替你们遮住问题'],
    },
  },
  lv4: {
    key: 'lv4',
    name: '深度同盟',
    aka: '长期队友型',
    signalLabel: '深连接 · 稳定承接',
    proto: [70, 94],
    accent: '#8FE3C5',
    verdict: '你们不只共享心动，也能一起处理现实。可靠、协商和修复，构成了更深的亲密。',
    tags: ['#长期队友', '#现实能承接', '#深度信任'],
    deep: {
      summary: '这段关系已经进入共同体层面：能分享快乐，也能讨论责任、压力和不那么浪漫的问题。',
      forecast: '长期潜力来自持续协作，而不是一个固定结论。越稳定，越需要主动更新彼此的真实状态。',
      warnings: ['别因为可靠就停止表达爱意', '共同承担也不等于必须放弃各自空间'],
      advice: ['定期聊一次压力、资源和期待', '把稳定经营成有温度的日常，而不是例行公事'],
    },
  },
  lv5: {
    key: 'lv5',
    name: '高温拉扯',
    aka: '强吸引震荡型',
    signalLabel: '高温连接 · 稳定不足',
    proto: [88, 24],
    accent: '#FFB020',
    verdict: '你们的心动很强，稳定感却常常掉线。它不是更高级，只是一种甜和累都被放大的状态。',
    tags: ['#强吸引', '#冷热切换', '#需要降噪'],
    deep: {
      summary: '这段关系的互动强度很高，但确认、连续回应或冲突修复没有跟上热度。',
      forecast: '建立稳定规则后，强吸引可以变成真实亲密；继续靠失联、试探和情绪峰值维持，只会增加消耗。',
      warnings: ['不要把折腾误认为爱得更深', '高光时刻无法抵消长期的不确定'],
      advice: ['给冲突设置暂停信号和重启时间', '把需求说成具体请求，减少反话和试探'],
    },
  },
  lv6: {
    key: 'lv6',
    name: '单侧过载',
    aka: '投入温差型',
    signalLabel: '连接不对称 · 单侧耗电',
    proto: [74, 34],
    accent: '#FF5C7A',
    verdict: '这不是“第六级”，而是投入与回应不对称的提醒。真正舒服的亲密必须有回声。',
    tags: ['#投入不对等', '#收回一点电', '#观察真实行动'],
    deep: {
      summary: '当前连接里，一方承担了更多主动、解释、照顾或关系维护，另一方的持续回应没有跟上。',
      forecast: '关系能否向前，取决于对方是否愿意真实投入，而不是你能否再努力一点。',
      warnings: ['过度加码会让你更难看清真实回声', '偶尔的甜不能替代长期对等'],
      advice: ['把投入降到相对对等的水平', '表达一次具体需求，然后观察行动而不是补充解释'],
    },
  },
}

export const ARCHETYPE_ORDER = ['lv1', 'lv2', 'lv3', 'lv4', 'lv5', 'lv6']

const MAX_AXIS = questions.length * 3

const dimMax = (() => {
  const result = Object.fromEntries(DIM_KEYS.map((key) => [key, 0]))
  questions.forEach((question) => {
    DIM_KEYS.forEach((key) => {
      result[key] += Math.max(...question.options.map((option) => option.dims?.[key] || 0))
    })
  })
  return result
})()

function clamp(value, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value))
}

function getDepth(signal) {
  if (signal < 32) return { code: 'D1', name: '轻连接', note: '真实相处证据还在积累' }
  if (signal < 56) return { code: 'D2', name: '日常连接', note: '已经进入彼此日常' }
  if (signal < 76) return { code: 'D3', name: '亲密连接', note: '心动与参与感较明显' }
  return { code: 'D4', name: '深度连接', note: '生活与现实议题已有交叉' }
}

function fitScore(warmth, stability, key) {
  const [pw, ps] = archetypes[key].proto
  const distance = Math.hypot(warmth - pw, stability - ps)
  return Math.exp(-distance / 24)
}

function normalizeDistribution(entries) {
  const total = entries.reduce((sum, item) => sum + item.score, 0) || 1
  const parts = entries.map((item) => {
    const exact = (item.score / total) * 100
    return { ...item, pct: Math.floor(exact), remainder: exact - Math.floor(exact) }
  })
  let left = 100 - parts.reduce((sum, item) => sum + item.pct, 0)
  parts
    .slice()
    .sort((a, b) => b.remainder - a.remainder)
    .forEach((item) => {
      if (left <= 0) return
      const target = parts.find((part) => part.key === item.key)
      target.pct += 1
      left -= 1
    })
  return parts.map(({ remainder, score, ...item }) => item).sort((a, b) => b.pct - a.pct)
}

function unique(items) {
  return [...new Set(items.filter(Boolean))]
}

function buildDeepReport(base, depth, topDimension, evidence) {
  const dimCopy = dimensionCopy[topDimension.key]
  const evidenceText = evidence.length ? ` 本次最明显的触发证据是“${evidence[0]}”。` : ''
  const dimensionLead = topDimension.value >= 55
    ? `相对优势落在「${topDimension.label}」${topDimension.value}%`
    : `当前最值得补强的是「${topDimension.label}」${topDimension.value}%`
  const dimensionReading = topDimension.value >= 55 ? dimCopy.strength : dimCopy.focus
  return {
    summary: `${base.deep.summary} 当前亲密深度处在「${depth.name}」（${depth.note}）；${dimensionLead}。${evidenceText}`,
    forecast: `${base.deep.forecast} ${dimensionReading}`,
    warnings: unique([...base.deep.warnings, dimCopy.warning]).slice(0, 3),
    advice: unique([...base.deep.advice, dimCopy.advice]).slice(0, 3),
  }
}

export function computeReport(answers) {
  const safeAnswers = Array.isArray(answers) ? answers : []
  const warmth = Math.round((safeAnswers.reduce((sum, answer) => sum + (answer.invest || 0), 0) / MAX_AXIS) * 100)
  const stability = Math.round((safeAnswers.reduce((sum, answer) => sum + (answer.recip || 0), 0) / MAX_AXIS) * 100)
  const signal = Math.round(warmth * 0.62 + stability * 0.38)
  const depth = getDepth(signal)

  const stateVotes = Object.fromEntries(ARCHETYPE_ORDER.map((key) => [key, 0]))
  const dimensionRaw = Object.fromEntries(DIM_KEYS.map((key) => [key, 0]))
  safeAnswers.forEach((answer) => {
    if (answer.state in stateVotes) stateVotes[answer.state] += 1
    DIM_KEYS.forEach((key) => {
      dimensionRaw[key] += answer.dims?.[key] || 0
    })
  })

  const hasStateEvidence = Object.values(stateVotes).some(Boolean)
  const scored = ARCHETYPE_ORDER.map((key) => {
    const fit = fitScore(warmth, stability, key)
    return {
      key,
      fit,
      score: hasStateEvidence ? stateVotes[key] * 4 + fit : fit,
    }
  })
  const domKey = scored.reduce((best, item) => (item.score > best.score ? item : best)).key
  const distribution = normalizeDistribution(
    scored.map((item) => ({ key: item.key, name: archetypes[item.key].name, score: item.score }))
  )

  const dims = Object.fromEntries(
    DIM_KEYS.map((key) => [key, dimMax[key] ? Math.round((dimensionRaw[key] / dimMax[key]) * 100) : 0])
  )
  const topDimensionKey = DIM_KEYS.reduce((best, key) => (dims[key] > dims[best] ? key : best), DIM_KEYS[0])
  const topDimension = {
    key: topDimensionKey,
    label: DIM_LABELS[topDimensionKey],
    value: dims[topDimensionKey],
  }
  const evidence = unique(safeAnswers.filter((answer) => answer.state === domKey).map((answer) => answer.read)).slice(0, 3)
  const base = archetypes[domKey]
  const archetype = {
    ...base,
    deep: buildDeepReport(base, depth, topDimension, evidence),
  }
  const idx = ARCHETYPE_ORDER.indexOf(domKey)

  return {
    invest: warmth,
    recip: stability,
    signal: clamp(signal),
    depth,
    dims,
    dimensionRaw,
    topDimension,
    evidence,
    stateVotes,
    key: domKey,
    archetype,
    distribution,
    blip: { angle: -90 + idx * 60, radius: Math.max(24, clamp(signal)) },
  }
}
