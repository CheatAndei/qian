// =============================================================
//  社交电量测试 · 场景化数据层
//  零 emoji；仅供娱乐和轻量自我观察，不作诊断。
// =============================================================

export const DIM_LABELS = {
  strangerEnergy: '陌生局能量',
  familiarEnergy: '熟人局能量',
  onlineEnergy: '线上局能量',
  soloRecovery: '独处回血',
  boundaryLoad: '边界消耗',
}

export const RADAR_DIMS = [
  'strangerEnergy',
  'familiarEnergy',
  'onlineEnergy',
  'soloRecovery',
  'boundaryLoad',
]

const SCENE_DIMS = RADAR_DIMS.slice(0, 4)
const DEFAULT_DRAIN = {
  strangerEnergy: 'strangerDensity',
  familiarEnergy: 'familiarDuty',
  onlineEnergy: 'onlineNoise',
  soloRecovery: 'recoveryInterruption',
}

function q(id, spec, prompt, options) {
  return { id, spec, prompt, options }
}

function o(
  text,
  sceneDim,
  score,
  read,
  boundaryLoad = 0,
  drainKey = DEFAULT_DRAIN[sceneDim],
  drainValue = 1,
) {
  const dims = { [sceneDim]: 3 }
  if (boundaryLoad > 0) dims.boundaryLoad = boundaryLoad
  return { text, score, dims, read, drain: { key: drainKey, value: drainValue } }
}

export const questions = [
  q(1, '临时邀约', '朋友临时约你出门，你更可能？', [
    o('有空就去，现场认识谁都可以', 'strangerEnergy', 3, '陌生局接口已打开', 1),
    o('先问问熟人是否在场', 'familiarEnergy', 2, '熟人专线优先'),
    o('改成语音或线上碰面也不错', 'onlineEnergy', 2, '云端连接更省切换'),
    o('把这段空白留给自己恢复', 'soloRecovery', 3, '独处快充开始'),
  ]),
  q(2, '陌生饭局', '到了一个不太熟的饭局，你会先？', [
    o('和身边的人自然搭话', 'strangerEnergy', 3, '现场破冰供电稳定'),
    o('坐到认识的人旁边慢慢进入状态', 'familiarEnergy', 3, '熟人基站已连接'),
    o('先在群里看名单和话题', 'onlineEnergy', 2, '线上预热降低负载'),
    o('提前给自己留好离场时间', 'soloRecovery', 2, '恢复窗口已预留', 1),
  ]),
  q(3, '群聊爆量', '群聊突然99+，你通常？', [
    o('顺手认识群里没聊过的人', 'strangerEnergy', 2, '新连接正在建立', 1),
    o('先看熟人有没有@自己', 'familiarEnergy', 2, '熟人信号优先'),
    o('异步扫重点，想回时再回', 'onlineEnergy', 3, '线上节奏由你掌控'),
    o('先静音，等脑子空下来再看', 'soloRecovery', 2, '勿扰快充已开启', 1),
  ]),
  q(4, '空闲夜晚', '今晚没有安排，你最想把电量放在哪？', [
    o('去线下活动逛逛，遇到谁算谁', 'strangerEnergy', 3, '现场探索模式'),
    o('约两个熟人吃饭散步', 'familiarEnergy', 3, '熟人局稳定供电'),
    o('开黑、连麦或参加线上小组', 'onlineEnergy', 3, '云端常亮'),
    o('一个人吃饭、看片、发呆', 'soloRecovery', 3, '独处回满'),
  ]),
  q(5, '新同事午餐', '新团队第一次一起吃午饭，你会？', [
    o('主动拼桌，把大家认一遍', 'strangerEnergy', 3, '陌生局适配良好'),
    o('跟已经熟一点的人坐一起', 'familiarEnergy', 2, '熟悉感帮助启动'),
    o('先在工作群里聊几句再入场', 'onlineEnergy', 2, '线上缓冲生效'),
    o('偶尔想自己吃，午休更重要', 'soloRecovery', 3, '午间恢复优先', 1),
  ]),
  q(6, '压力出口', '状态很乱时，你更想用哪种方式消化？', [
    o('去低压力的线下场合换换空气', 'strangerEnergy', 2, '现场环境帮助切频'),
    o('找最信任的人当面说清楚', 'familiarEnergy', 3, '熟人专线快充', 1),
    o('用文字慢慢整理后再发出去', 'onlineEnergy', 3, '异步表达更从容'),
    o('先不说，独处到思路回来', 'soloRecovery', 3, '静默恢复进行中'),
  ]),
  q(7, '活动散场', '高密度活动结束后，你最自然的下一步？', [
    o('还想去下一场，继续认识人', 'strangerEnergy', 3, '现场余电充足', 1),
    o('和熟人吃个宵夜复盘', 'familiarEnergy', 3, '熟人余温续航'),
    o('回家后在线上继续聊', 'onlineEnergy', 2, '云端续摊'),
    o('立刻回家安静一会儿', 'soloRecovery', 3, '切回独处快充'),
  ]),
  q(8, '动态互动', '发出一条动态后，你更舒服的互动方式？', [
    o('开放评论，和新面孔也能聊', 'strangerEnergy', 2, '公开互动可承载'),
    o('熟人认真回应几句就很满足', 'familiarEnergy', 3, '熟人反馈更有电'),
    o('私信、评论都异步处理', 'onlineEnergy', 3, '线上节奏可控'),
    o('有时只想记录，不想被围观', 'soloRecovery', 2, '曝光边界已收紧', 2),
  ]),
  q(9, '下班余量', '忙完一天后还有社交邀请，你会优先？', [
    o('换个现场反而能把工作脑关掉', 'strangerEnergy', 2, '现场切频可用', 1),
    o('只见熟悉且不用端着的人', 'familiarEnergy', 3, '低压熟人局'),
    o('线上聊一会儿，不再通勤', 'onlineEnergy', 3, '云端节省路程'),
    o('今天的电留给自己', 'soloRecovery', 3, '下班后停止外供'),
  ]),
  q(10, '休息被打断', '独处时突然收到见面请求，你通常？', [
    o('如果是新鲜局，也可能立刻出门', 'strangerEnergy', 2, '现场好奇心启动', 1),
    o('熟人有事就见，其他改天', 'familiarEnergy', 2, '熟人白名单生效', 1),
    o('先在线上确认是什么事', 'onlineEnergy', 3, '异步确认减少切换'),
    o('守住休息时间，稍后再回复', 'soloRecovery', 3, '恢复边界保持完整'),
  ]),
  q(11, '周末排布', '哪种周末最像你的理想版本？', [
    o('市集、活动、临时新局都有', 'strangerEnergy', 3, '现场探索续航'),
    o('固定见几位重要的人', 'familiarEnergy', 3, '熟人专线稳定'),
    o('线上兴趣局穿插其中', 'onlineEnergy', 3, '云端兴趣供电'),
    o('至少留出半天完全不约人', 'soloRecovery', 3, '恢复窗口不可占用'),
  ]),
  q(12, '重要表达', '有件重要的事想说，你更容易？', [
    o('在共同活动里自然聊出来', 'strangerEnergy', 2, '现场流动感减压'),
    o('只对最熟的人完整展开', 'familiarEnergy', 3, '深熟关系承载表达'),
    o('先写成长消息，慢慢组织', 'onlineEnergy', 3, '文字通道更稳定'),
    o('先自己想清楚，再决定说不说', 'soloRecovery', 3, '内部整理优先'),
  ]),
  q(13, '兴趣入圈', '刚加入一个兴趣圈，你更可能？', [
    o('直接参加线下活动认识新人', 'strangerEnergy', 3, '陌生圈层可进入'),
    o('让熟人带着加入', 'familiarEnergy', 3, '熟人桥接更顺滑'),
    o('先在论坛或群里潜水互动', 'onlineEnergy', 3, '云端观察启动'),
    o('先自己研究，准备好再出现', 'soloRecovery', 2, '独立探索阶段'),
  ]),
  q(14, '拒绝邀约', '不想赴约时，你最常用的处理方式？', [
    o('直接和组织者说这次不参加', 'strangerEnergy', 3, '公开边界表达清楚'),
    o('先告诉熟人，请对方帮忙转达', 'familiarEnergy', 2, '熟人通道降低压力', 1),
    o('用消息说明，避免现场解释', 'onlineEnergy', 3, '异步拒绝更从容'),
    o('拖到最后才回，期间一直惦记', 'soloRecovery', 1, '拒绝压力持续耗电', 3, 'boundaryPressure', 3),
  ]),
  q(15, '旅行同行', '旅行时哪种连接方式更舒服？', [
    o('住青旅或参加当地拼团', 'strangerEnergy', 3, '旅行陌生局供电'),
    o('只和熟悉的人结伴', 'familiarEnergy', 3, '熟人同行更稳'),
    o('白天独行，晚上线上分享', 'onlineEnergy', 3, '云端陪伴不挤空间'),
    o('完整独旅，行程全由自己决定', 'soloRecovery', 3, '独处自由度拉满'),
  ]),
  q(16, '维持联系', '你更自然的关系维护方式？', [
    o('持续参加活动，让新连接流动起来', 'strangerEnergy', 3, '现场网络持续更新'),
    o('定期和固定的人见面', 'familiarEnergy', 3, '熟人线路定期维护'),
    o('用群聊、表情包和分享保持在线', 'onlineEnergy', 3, '轻量云端续航'),
    o('允许彼此很久不联系也不焦虑', 'soloRecovery', 3, '低频关系也安全'),
  ]),
  q(17, '一小时空档', '临时多出一小时，你会怎么用？', [
    o('去附近逛逛，顺便和人聊两句', 'strangerEnergy', 2, '现场采样模式'),
    o('找熟人喝杯东西', 'familiarEnergy', 3, '熟人快充'),
    o('回消息、刷兴趣社区', 'onlineEnergy', 2, '线上碎片时间'),
    o('戴耳机走路或安静坐着', 'soloRecovery', 3, '微型独处回血'),
  ]),
  q(18, '低电提示', '电量已经见底时，什么最能接住你？', [
    o('和不需要负责后续的新面孔闲聊', 'strangerEnergy', 2, '低承诺现场连接'),
    o('和安全的人安静待在一起', 'familiarEnergy', 3, '熟人陪伴快充'),
    o('只用文字和表情保持联系', 'onlineEnergy', 3, '低带宽在线'),
    o('彻底离线一段时间', 'soloRecovery', 3, '深度独处充电'),
  ]),
  q(19, '边界提醒', '别人连续追加安排时，你更可能？', [
    o('现场说清自己能参加到几点', 'strangerEnergy', 3, '现场边界已声明'),
    o('只保留对重要熟人的承诺', 'familiarEnergy', 2, '熟人预算重新分配', 1),
    o('在线上统一回复可行时间', 'onlineEnergy', 3, '异步排期减少拉扯'),
    o('先都答应，之后再默默透支', 'soloRecovery', 0, '边界压力正在抽电', 3, 'boundaryPressure', 3),
  ]),
  q(20, '电池自述', '此刻你的社交电池更像？', [
    o('接上现场就亮，陌生人也能供电', 'strangerEnergy', 3, '现场点亮型信号'),
    o('只给熟人开高功率专线', 'familiarEnergy', 3, '熟人专线型信号'),
    o('在线上能稳定保持常亮', 'onlineEnergy', 3, '云端常亮型信号'),
    o('回到底座独处，充得最快', 'soloRecovery', 3, '独处快充型信号'),
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

export const RESULT_BANDS = [
  {
    key: 'field',
    sceneDim: 'strangerEnergy',
    code: 'FIELD-68',
    name: '现场点亮型',
    aka: '走进真实场景，你的电路才开始发光',
    accent: '#E7A968',
    tags: ['现场破冰', '新鲜感供电', '边走边连接'],
    verdict: '陌生局对你不只是消耗，也可能是换气口；你常在真实互动里找到新的电。',
    deep: {
      summary: '你偏向用现场感启动社交：看得到表情、接得住节奏、允许关系自然发生，比提前想好每句话更轻松。',
      forecast: '当场景有流动感且允许自由离场时，你会很亮；连续赶场或被默认承担热场责任时，也会迅速掉电。',
      warnings: ['别把能破冰等同于必须照顾全场。', '新鲜感能供电，但连续高密度输入仍会积累疲劳。'],
      advice: ['进场前先定离场时间。', '活动之间留出15分钟无对话缓冲。'],
      recoveryMenu: ['独自散步一段路，把现场噪音降下来。', '活动后只保留一个低压力联系人。', '第二天减少临时邀约，给身体补觉。'],
      refusalScript: '这场我想来，但我只待到九点，后面的安排这次先不跟。',
      socialBudget: '每周安排1—2个高密度现场；连续现场不超过2天，并为每场预留离场后的恢复窗。',
    },
  },
  {
    key: 'circle',
    sceneDim: 'familiarEnergy',
    code: 'CIRCLE-72',
    name: '熟人专线型',
    aka: '不是电少，是你的高功率只对重要的人开放',
    accent: '#5F8E6A',
    tags: ['熟人快充', '关系有选择', '深度陪伴'],
    verdict: '你在可信任的关系里最有电，熟悉感不是退缩，而是让你把注意力用在真正的连接上。',
    deep: {
      summary: '你的电量和关系质量绑定得很紧。泛社交未必让你兴奋，但被熟人理解、和重要的人安静待着，会让你恢复。',
      forecast: '小范围、可预期、有来有回的关系最适合你；当熟人把你当作随叫随到的情绪接口时，专线也会过载。',
      warnings: ['关系重要不代表每次倾诉都要即时接住。', '别因为不想让熟人失望，就把自己的休息全部让出去。'],
      advice: ['把陪伴分成现在能聊、晚点能聊、今天接不住。', '深聊后安排一段不继续处理消息的时间。'],
      recoveryMenu: ['和安全的人并排做事，不强迫持续聊天。', '把大聚会改成一对一散步或吃饭。', '用熟悉的音乐、路线和小店恢复确定感。'],
      refusalScript: '我在乎这件事，但今晚的电量接不住长聊，我们明天约一个我能认真听的时间。',
      socialBudget: '每周保留2次高质量熟人连接；同一天只安排1场深聊，并留至少1个晚上完全不承担情绪劳动。',
    },
  },
  {
    key: 'cloud',
    sceneDim: 'onlineEnergy',
    code: 'CLOUD-66',
    name: '云端常亮型',
    aka: '异步不是敷衍，是你最稳定的连接协议',
    accent: '#7DAEC9',
    tags: ['异步表达', '线上续航', '低带宽连接'],
    verdict: '你在线上更容易掌握节奏：可以先想清楚再回应，也能用轻量互动维持真实关系。',
    deep: {
      summary: '文字、群聊、兴趣社区和异步回复给了你可控带宽。你并非躲在屏幕后，而是需要一个能暂停和整理的连接方式。',
      forecast: '允许延迟回复、主题清晰的线上关系会让你常亮；通知碎片化、跨平台轰炸和默认秒回会成为主要耗电源。',
      warnings: ['在线不等于随时可用。', '碎片消息堆积时，越想全部回完越容易卡死。'],
      advice: ['固定两个消息处理时段。', '把重要沟通从多平台收束到一个渠道。'],
      recoveryMenu: ['关闭非必要红点和群提醒。', '用长消息替代来回十几条碎片对话。', '屏幕休息20分钟，再决定是否继续在线。'],
      refusalScript: '我现在不方便实时聊，你把重点发给我，我会在今晚统一回复。',
      socialBudget: '每天设置2个集中回复窗口；高强度连麦不超过1场，并保留至少1段完全离线的时间。',
    },
  },
  {
    key: 'solo',
    sceneDim: 'soloRecovery',
    code: 'DOCK-74',
    name: '独处快充型',
    aka: '回到底座不是掉线，是你的核心充电协议',
    accent: '#A4C95A',
    tags: ['独处回血', '低刺激续航', '自主节奏'],
    verdict: '你需要完整、可支配、不被打断的独处时间；这是维护电量的基础设施，不是对关系的拒绝。',
    deep: {
      summary: '你的电池依靠低刺激和自主节奏恢复。只要独处窗口被尊重，你仍然可以认真连接，只是不适合连续输出。',
      forecast: '提前知道开始和结束时间的社交最友好；临时加码、休息被打断、拒绝后被追问，会让你比场面本身更累。',
      warnings: ['独处需求没有提前说，别人可能把突然静音误解成冷淡。', '恢复不是无限拖延，重要关系仍需要明确回来的时间。'],
      advice: ['在掉到见底前主动报电量。', '为每次见人安排同等长度的独处缓冲。'],
      recoveryMenu: ['至少30分钟不接收新信息。', '散步、洗澡、整理空间，让注意力回到身体。', '选择安静共处，而不是勉强维持话题。'],
      refusalScript: '我今天需要一个人恢复，不是针对你；我会在明天下午重新联系。',
      socialBudget: '一天最多1场主要社交；每场前后各留30分钟空白，每周至少保留半天不接受临时安排。',
    },
  },
]

const DRAIN_META = {
  strangerDensity: {
    label: '陌生局密度',
    detail: '连续自我介绍、读空气和快速切换话题，会在不知不觉中抽走注意力。',
  },
  familiarDuty: {
    label: '熟人情绪劳动',
    detail: '越在乎的人越容易让你超额陪伴，真正耗电的是“必须接住”的责任感。',
  },
  onlineNoise: {
    label: '线上消息噪音',
    detail: '红点、碎片回复和跨平台切换，让你的电量被很多小口持续带走。',
  },
  recoveryInterruption: {
    label: '独处被打断',
    detail: '恢复窗口一再被插入新任务，会让你很难真正回到底座。',
  },
  boundaryPressure: {
    label: '边界压力',
    detail: '不好意思拒绝、答应后再透支，比社交本身更容易让你见底。',
  },
}

function emptyDims() {
  return Object.fromEntries(RADAR_DIMS.map((key) => [key, 0]))
}

function emptyDrains() {
  return Object.fromEntries(Object.keys(DRAIN_META).map((key) => [key, 0]))
}

function norm(value, max) {
  if (!max) return 0
  return Math.round(Math.max(0, Math.min(100, (value / max) * 100)))
}

function addLegacyDims(raw, dims) {
  const social = Number(dims.socialDrive || 0)
  raw.strangerEnergy += social * 0.55
  raw.familiarEnergy += social * 0.2 + Number(dims.deepConnection || 0)
  raw.onlineEnergy += social * 0.25
  raw.soloRecovery += Number(dims.recoveryNeed || 0)
  raw.boundaryLoad += Number(dims.stimulusSensitivity || 0)
}

function addLegacyDrain(drains, dims) {
  if (Number(dims.stimulusSensitivity || 0) > 0) {
    drains.boundaryPressure += Number(dims.stimulusSensitivity || 0)
  } else if (Number(dims.recoveryNeed || 0) > 0) {
    drains.recoveryInterruption += Number(dims.recoveryNeed || 0)
  } else if (Number(dims.deepConnection || 0) > 0) {
    drains.familiarDuty += Number(dims.deepConnection || 0)
  } else if (Number(dims.socialDrive || 0) > 0) {
    drains.strangerDensity += Number(dims.socialDrive || 0)
  }
}

function answerSignature(answers) {
  let hash = 2166136261
  for (const answer of answers) {
    const source = answer?.text || JSON.stringify(answer?.dims || {})
    for (let index = 0; index < source.length; index += 1) {
      hash ^= source.charCodeAt(index)
      hash = Math.imul(hash, 16777619)
    }
  }
  return hash >>> 0
}

function pickBand(raw, answers) {
  const highest = Math.max(...SCENE_DIMS.map((key) => raw[key]))
  const candidates = SCENE_DIMS.filter((key) => raw[key] === highest)
  const sceneDim = candidates[answerSignature(answers) % candidates.length]
  return RESULT_BANDS.find((band) => band.sceneDim === sceneDim) || RESULT_BANDS[0]
}

export function computeReport(answers) {
  const safeAnswers = Array.isArray(answers) ? answers : []
  const raw = emptyDims()
  const drains = emptyDrains()

  for (const answer of safeAnswers) {
    const answerDims = answer?.dims || {}
    const hasSceneDims = RADAR_DIMS.some((key) => Number(answerDims[key] || 0) > 0)
    if (hasSceneDims) {
      for (const [key, value] of Object.entries(answerDims)) {
        if (key in raw) raw[key] += Number(value || 0)
      }
    } else {
      addLegacyDims(raw, answerDims)
    }

    const drain = answer?.drain
    if (drain?.key in drains) {
      drains[drain.key] += Number(drain.value || 0)
    } else if (Number(answerDims.boundaryLoad || 0) > 0) {
      drains.boundaryPressure += Number(answerDims.boundaryLoad || 0)
    } else {
      const sceneDim = SCENE_DIMS.find((key) => Number(answerDims[key] || 0) > 0)
      if (sceneDim) {
        drains[DEFAULT_DRAIN[sceneDim]] += 1
      } else {
        addLegacyDrain(drains, answerDims)
      }
    }
  }

  const dims = Object.fromEntries(RADAR_DIMS.map((key) => [key, norm(raw[key], DIM_MAX[key])]))
  const baseBand = pickBand(raw, safeAnswers)
  const sceneValues = SCENE_DIMS.map((key) => raw[key]).sort((a, b) => b - a)
  const lead = Math.max(0, (sceneValues[0] || 0) - (sceneValues[1] || 0))
  const index = Math.round(60 + Math.min(40, (lead / Math.max(3, safeAnswers.length * 3)) * 40))
  const rankedDrains = Object.entries(drains).sort((a, b) => b[1] - a[1])
  const topDrainKey = rankedDrains[0]?.[1] > 0 ? rankedDrains[0][0] : 'boundaryPressure'
  const topDrain = DRAIN_META[topDrainKey]
  const band = {
    ...baseBand,
    deep: {
      ...baseBand.deep,
      highestDrain: `${topDrain.label}：${topDrain.detail}`,
    },
  }

  return {
    index,
    dims,
    raw,
    drains,
    band,
    topKey: baseBand.sceneDim,
    topDrainKey,
  }
}
