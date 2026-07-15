export const CATEGORY_ORDER = ['echo', 'closure', 'fallback', 'present']

export const CATEGORIES = Object.freeze({
  echo: { name: '回声优先', short: '回声', signal: '先确认关系仍然连着' },
  closure: { name: '闭环优先', short: '闭环', signal: '先减少没有收口的挂起项' },
  fallback: { name: '退路优先', short: '退路', signal: '先保住下一步的机动空间' },
  present: { name: '当下优先', short: '当下', signal: '先让正在发生的此刻完整' },
})

export const OPTIONS = Object.freeze([
  { id: 'A', category: 'echo', text: '给家人报平安' },
  { id: 'B', category: 'echo', text: '回复那个正在等你确认的人' },
  { id: 'C', category: 'closure', text: '保存还没同步的重要资料' },
  { id: 'D', category: 'closure', text: '把已经答应的事情收尾' },
  { id: 'E', category: 'fallback', text: '查好回家的路线' },
  { id: 'F', category: 'fallback', text: '把剩余电量留给紧急情况' },
  { id: 'G', category: 'present', text: '拍下今晚最想留下的画面' },
  { id: 'H', category: 'present', text: '关掉屏幕，专心过完当下' },
])

const optionMap = new Map(OPTIONS.map((option) => [option.id, option]))

const RESULT_COPY = Object.freeze({
  'echo>closure': {
    title: '先回信，再清场',
    conclusion: '电量不足时，你先处理“有人在等”，再把答应过的事收口。关系回应给你方向，完成感帮你停止反复检查。',
    tags: ['先回应', '重承诺', '怕悬着'],
    evidence: ['第一顺位留给明确的人际回应', '随后转向资料或承诺的闭环'],
    delayedNeed: '独处和恢复常被你排在“大家都收到回应”之后。你可能不是不需要休息，只是不习惯让别人先等一会儿。',
  },
  'echo>fallback': {
    title: '先回信，再留后手',
    conclusion: '你先让重要的人知道你的状态，再确认自己还有安全退路。你的排序既照顾连接，也在防止局面失控。',
    tags: ['先报平安', '风险敏感', '照顾周全'],
    evidence: ['首选指向关系中的确定回应', '第二判断优先保留路线或应急电量'],
    delayedNeed: '纯粹为了自己开心的选择容易被压后。你往往先确保“没有人担心、没有意外”，才允许自己松开。',
  },
  'echo>present': {
    title: '先回信，再回现场',
    conclusion: '你愿意先给关系一个交代，然后把注意力还给眼前。你要的不是一直在线，而是安心地暂时离线。',
    tags: ['有交代', '能抽离', '重体验'],
    evidence: ['先完成必要的人际确认', '随后选择记录或直接进入当下'],
    delayedNeed: '不解释就离开的自由常被你推迟。你会先完成一轮安抚，才敢把时间完整留给自己。',
  },
  'closure>echo': {
    title: '先清场，再回声',
    conclusion: '你先解决最怕丢失或违约的事项，再回到人的等待。做完一件具体的事，能让你的回应更踏实。',
    tags: ['任务先行', '责任明确', '回应可靠'],
    evidence: ['首选是保存或完成已承诺事项', '下一顺位才转向关系回应'],
    delayedNeed: '被理解和被照顾的需求常藏在执行之后。你更习惯用“我处理好了”代替“我其实有点累”。',
  },
  'closure>fallback': {
    title: '先清场，再布防',
    conclusion: '你会先降低未完成事项的损失，再为接下来的变化留出口。你的决定像是在压缩风险面，而不是追求一时轻松。',
    tags: ['先止损', '有预案', '不留尾巴'],
    evidence: ['首先处理可确认的挂起事项', '随后把资源转给路线与紧急余量'],
    delayedNeed: '即兴和放空容易被放到最后。只要还有一个可见风险没处理，你就很难真正待在当下。',
  },
  'closure>present': {
    title: '先收尾，再沉浸',
    conclusion: '你需要先把该做的事放回正确位置，才愿意全心进入今晚。收尾不是扫兴，而是你获得专注的开关。',
    tags: ['先完成', '后沉浸', '边界清楚'],
    evidence: ['第一顺位用于结束挂起状态', '第二倾向转向记录或体验当下'],
    delayedNeed: '“没做完也可以休息”的许可常被推迟。你会等事情看起来足够整齐，才允许自己享受。',
  },
  'fallback>echo': {
    title: '先保底，再联系',
    conclusion: '你先确认自己不会被困住，再向重要的人发出回应。安全感一旦就位，你就更有余裕照顾关系。',
    tags: ['先保底', '后回应', '节奏稳'],
    evidence: ['首选保留路线或应急资源', '随后把注意力交给关系中的等待'],
    delayedNeed: '允许别人帮忙的需求容易被推迟。你倾向先独自把风险降下来，再告诉别人发生了什么。',
  },
  'fallback>closure': {
    title: '先保底，再归档',
    conclusion: '你先守住移动和应急能力，再处理必须完成的事项。你的排序强调“先别失去选择，再把事情做对”。',
    tags: ['保留余量', '风险前置', '执行有序'],
    evidence: ['第一判断优先维护可撤回空间', '第二判断回到资料或承诺的闭环'],
    delayedNeed: '无目的的体验容易被认为不够重要。你经常等退路和任务都安排好，才考虑自己真正想做什么。',
  },
  'fallback>present': {
    title: '先保底，再尽兴',
    conclusion: '你会先留住最低限度的安全余量，然后把剩余注意力交给今晚。你不是保守，只是不想让快乐以失控收场。',
    tags: ['有退路', '能尽兴', '资源感强'],
    evidence: ['首选保存路线或紧急电量', '随后选择记录或直接体验现场'],
    delayedNeed: '彻底不做预案的松弛感常被推迟。你要先看见出口，身体才愿意真正放松。',
  },
  'present>echo': {
    title: '先过今晚，再回声',
    conclusion: '你先保护正在发生的体验，再回到重要的人际回应。你相信真正在场之后，给出的回应会更诚实。',
    tags: ['当下感强', '真诚回应', '不愿分心'],
    evidence: ['首选记录或直接进入当下', '随后才处理关系中的等待'],
    delayedNeed: '持续稳定地报备容易被推迟。你不是不在乎，而是切进现场后很难同时维护多个频道。',
  },
  'present>closure': {
    title: '先过今晚，再收尾',
    conclusion: '你先让眼前的时刻完整发生，再回去处理未完成事项。你愿意承担一点待办压力，换取不被打断的体验。',
    tags: ['先体验', '后完成', '注意力集中'],
    evidence: ['第一顺位留给画面或离屏体验', '第二顺位转向资料和承诺收口'],
    delayedNeed: '提前为明天减负的需求常被推迟。你容易在体验结束后，才发现待办一起回到了桌面。',
  },
  'present>fallback': {
    title: '先过今晚，再找出口',
    conclusion: '你先守住此刻的质感，再检查回程与余量。你的排序不让风险抢走开场，但也不会彻底忘记退路。',
    tags: ['体验优先', '临场调整', '后置风控'],
    evidence: ['首选让自己留在正在发生的现场', '随后补上路线或应急资源'],
    delayedNeed: '更早做准备的需求常被推迟。你相信临场能解决，但高压时也可能把自己留给最后一分钟。',
  },
})

export function validateSelection(selection) {
  return (
    Array.isArray(selection) &&
    selection.length === 3 &&
    new Set(selection).size === 3 &&
    selection.every((id) => optionMap.has(id))
  )
}

export function classifySelection(selection) {
  if (!validateSelection(selection)) return null

  const orderedOptions = selection.map((id) => optionMap.get(id))
  const primaryKey = orderedOptions[0].category
  const secondaryOption = orderedOptions.slice(1).find((option) => option.category !== primaryKey)
  if (!secondaryOption) return null

  const secondaryKey = secondaryOption.category
  const comboKey = `${primaryKey}>${secondaryKey}`
  const copy = RESULT_COPY[comboKey]
  if (!copy) return null

  return {
    comboKey,
    primaryKey,
    secondaryKey,
    primary: CATEGORIES[primaryKey],
    secondary: CATEGORIES[secondaryKey],
    orderedOptions,
    ...copy,
    deep: {
      actionBasis: [
        `你的第一判断是“${orderedOptions[0].text}”，它把${CATEGORIES[primaryKey].name}放在最前面。`,
        `后续最早出现的不同信号是“${secondaryOption.text}”，说明你会用${CATEGORIES[secondaryKey].name}修正第一反应。`,
        `第三个选择“${orderedOptions[2].text}”更像资源允许后的补充，不覆盖前两步的先后关系。`,
      ],
      delayedNeed: copy.delayedNeed,
      overloadChecklist: [
        `先写下此刻唯一必须完成的${CATEGORIES[primaryKey].short}动作，限制在2分钟内。`,
        `再补一个${CATEGORIES[secondaryKey].short}动作，不同时打开第三条处理线。`,
        '剩下的事情明确写成“今晚不处理”，给决定设置停止点。',
      ],
    },
  }
}
