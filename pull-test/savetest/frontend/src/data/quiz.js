export const product = {
  slug: 'savetest',
  title: '学生数学物理学习短板诊断',
  shortTitle: '能力短板诊断',
  subject: '数学 / 物理',
  audience: '学生版',
  minutes: '3 分钟',
  questionCount: 24,
  accent: '#0f766e',
  accent2: '#f97316',
  intro: '让孩子自己回答 24 个学习场景，定位卡在读题、调用、步骤、复盘，还是考场输出。',
  primaryCta: '开始诊断',
  resultTitle: '能力短板诊断报告',
  nextLabel: '返回家长风险筛查',
  nextUrl: '../showtest/frontend/dist/index.html',
  disclaimer: '本测评用于学习问题沟通和课程匹配，不构成专业诊断或升学承诺。',
}

export const scaleOptions = [
  { label: '很少', score: 0 },
  { label: '偶尔', score: 1 },
  { label: '经常', score: 2 },
  { label: '总是', score: 3 },
]

export const dimensions = {
  reading: {
    name: '信息提取',
    risk: '读题抓不住条件，后面步骤再努力也容易偏。',
    advice: '训练圈条件、标目标、拆问法三步读题。',
  },
  knowledge: {
    name: '知识调用',
    risk: '公式和概念没有形成可调用工具，遇到题会乱选方法。',
    advice: '把知识点和典型题型绑定，先练"看到条件想公式"。',
  },
  method: {
    name: '解题步骤',
    risk: '会一点想一点，缺少稳定路径，综合题容易断。',
    advice: '用固定模板训练列式、推导、检查和表达。',
  },
  review: {
    name: '错题复盘',
    risk: '错题只改答案，没有改思路，所以同类错会重复。',
    advice: '每道错题补一句错因和一句下次识别信号。',
  },
  exam: {
    name: '考试策略',
    risk: '考场节奏和取舍不稳定，会把会做的分也丢掉。',
    advice: '训练限时分段、先易后难和最后 5 分钟检查清单。',
  },
  drive: {
    name: '自我驱动',
    risk: '孩子不知道自己差在哪里，就很难持续投入。',
    advice: '把目标拆小，先让孩子体验"练一块、涨一块"。',
  },
}

function q(id, dim, prompt, options) {
  return { id, dim, prompt, options }
}

export const questions = [
  // ── 信息提取 ──
  q(1, 'reading', '我看题时不知道先找什么信息。', [
    { label: '我会先圈数字、单位和关键动词再读问题', note: '方法对', score: 0 },
    { label: '短题能抓到重点，文字一多就跳着看', note: '偶尔慢', score: 1 },
    { label: '读完一遍经常不知道哪句是条件哪句是问题', note: '常跑偏', score: 2 },
    { label: '看到大段文字就头晕，完全没方向', note: '读题困难', score: 3 },
  ]),
  q(2, 'reading', '我读完应用题，常常不知道题目真正问什么。', [
    { label: '我能圈出问句，再把条件按问题方向整理', note: '拆得清', score: 0 },
    { label: '大多数能判断在问什么，复杂场景会犹豫', note: '大方向对', score: 1 },
    { label: '经常做完才发现答非所问，白写一页', note: '审题偏', score: 2 },
    { label: '读完像看故事一样，根本没认出它要考什么', note: '问意模糊', score: 3 },
  ]),
  q(3, 'reading', '我容易漏掉题目里的限制条件。', [
    { label: '我习惯用笔划出所有"不大于""至少""整数"这些词', note: '条件抓全', score: 0 },
    { label: '大部分限制能找到，偶尔漏一两个非数字型的', note: '小漏', score: 1 },
    { label: '经常做完了才发现有个条件没用上，要重算', note: '常漏关键', score: 2 },
    { label: '漏掉限制条件导致整题方向全错的情况很多', note: '条件盲区', score: 3 },
  ]),
  q(4, 'reading', '我不太会把文字条件转成式子或图。', [
    { label: '读完题能顺手画出简图或写出方程雏形', note: '转译快', score: 0 },
    { label: '简单关系能转，多条件嵌套时会乱', note: '需要拆解', score: 1 },
    { label: '知道条件是什么意思但不知道写成什么式子', note: '表达卡', score: 2 },
    { label: '应用题对我来说就像一堵文字墙，根本无从下手', note: '转译断', score: 3 },
  ]),

  // ── 知识调用 ──
  q(5, 'knowledge', '我公式记得住，但代入时会乱。', [
    { label: '我能分清每个字母对应什么量，代入后还会验算', note: '代入稳', score: 0 },
    { label: '基础公式不犯错，变形公式偶尔会弄混字母', note: '变形偏弱', score: 1 },
    { label: '公式写出来了，但不知道题目给的数往哪放', note: '对位混乱', score: 2 },
    { label: '背了一堆公式，做题时不知道该套哪一个', note: '调用阻塞', score: 3 },
  ]),
  q(6, 'knowledge', '我经常不知道该用哪个知识点。', [
    { label: '看到条件里的关键词就能联想到对应模块', note: '联想快', score: 0 },
    { label: '大部分能选对，跨章节综合时会纠结', note: '跨章偏弱', score: 1 },
    { label: '知道考哪一章但不知道该用哪个具体方法', note: '定位模糊', score: 2 },
    { label: '看到题脑子一片空白，完全联想不到任何知识点', note: '知识断联', score: 3 },
  ]),
  q(7, 'knowledge', '我学新课时，旧知识容易忘。', [
    { label: '新旧知识我能串起来，知道它们之间的联系', note: '串联好', score: 0 },
    { label: '一些基础公式还记得，细节性的容易模糊', note: '细节衰减', score: 1 },
    { label: '学完一章忘了上一章，考前要重新从头翻书', note: '遗忘快', score: 2 },
    { label: '像根本没学过一样，连基本概念都回忆不起来', note: '大面积忘', score: 3 },
  ]),
  q(8, 'knowledge', '我基础题还行，综合题就不行。', [
    { label: '综合题我会先拆成几个小问题，一块一块解决', note: '拆解力好', score: 0 },
    { label: '两个知识点结合还行，三四个交叉时就容易乱', note: '多步吃力', score: 1 },
    { label: '一看到题目跨章节，就不知道怎么把方法串起来', note: '跨章断', score: 2 },
    { label: '综合题在我眼里就是一团乱麻，连第一步都找不到', note: '综合溃散', score: 3 },
  ]),

  // ── 解题步骤 ──
  q(9, 'method', '我做题喜欢凭感觉。', [
    { label: '我有固定的解题框架，每一步都知道为什么', note: '步骤化', score: 0 },
    { label: '大部分题能按步骤来，新题型会先试再调整', note: '有意识', score: 1 },
    { label: '做题经常是想到哪写到哪，没有固定套路', note: '随意性强', score: 2 },
    { label: '完全是凭感觉瞎碰，做对做错全看运气', note: '无章法', score: 3 },
  ]),
  q(10, 'method', '我经常看懂答案，但自己想不到。', [
    { label: '看完答案我会反推"为什么这样想"，下次能复用', note: '会复盘思路', score: 0 },
    { label: '多数能自己想到，卡住的看完能模仿着做', note: '差一步', score: 1 },
    { label: '每道题看答案都觉得简单，但自己做就是想不到开头', note: '思路脱节', score: 2 },
    { label: '像在看另一个世界的东西——每一步都看得懂但完全不会想', note: '思维断层', score: 3 },
  ]),
  q(11, 'method', '我写步骤时会跳步。', [
    { label: '我会把每一步推导都写清楚，检查时能找到哪出的错', note: '规范好', score: 0 },
    { label: '简单合并不跳关键推理，赶时间时偶尔省略说明', note: '大致完整', score: 1 },
    { label: '经常跳过中间推导，觉得"反正老师知道我在想啥"', note: '跳步多', score: 2 },
    { label: '卷子上只有答案没有过程，完全不知道从哪来的', note: '无过程', score: 3 },
  ]),
  q(12, 'method', '我讲不清自己为什么这样做。', [
    { label: '别人问我这题，我能从条件到结论一步步讲清楚', note: '能讲透', score: 0 },
    { label: '能说出大方向，具体推导细节有时讲得不太顺', note: '表达偏弱', score: 1 },
    { label: '会说"就是这样想的啊"但说不出每一步的理由', note: '讲不清', score: 2 },
    { label: '做对了也不知道怎么对的，做错了更不知道为什么错', note: '盲目做', score: 3 },
  ]),

  // ── 错题复盘 ──
  q(13, 'review', '我错题改完就放一边。', [
    { label: '每道错题我会写一句错因和一句下次注意信号', note: '闭环好', score: 0 },
    { label: '会改答案但对错因分析不多，下次可能还会错', note: '分析浅', score: 1 },
    { label: '就把正确答案抄上去，根本不看自己错在哪', note: '只改答案', score: 2 },
    { label: '错题看一眼就合上了，完全不想再碰', note: '回避错题', score: 3 },
  ]),
  q(14, 'review', '我不喜欢回看以前的错题。', [
    { label: '我每周固定回顾上周错题，把还会错的标红', note: '有节奏', score: 0 },
    { label: '会看但没规律，考前突击翻一下', note: '频率低', score: 1 },
    { label: '一想到要看错题就烦躁，能拖就拖', note: '抵触情绪', score: 2 },
    { label: '错题本我都没打开过，翻旧账对我来说像受刑', note: '完全回避', score: 3 },
  ]),
  q(15, 'review', '我不太会总结同类题方法。', [
    { label: '做过的题我会按题型和用到的知识点分类整理', note: '分类力好', score: 0 },
    { label: '能发现有些题考法相似但总结得不够系统', note: '有意识待练', score: 1 },
    { label: '知道应该总结但不知道怎么下手，做了很多题还是散', note: '不会归纳', score: 2 },
    { label: '每道题在我眼里都是独立的，看不出它们之间的联系', note: '碎片化', score: 3 },
  ]),
  q(16, 'review', '我刷了题，但分数提升不明显。', [
    { label: '我知道自己做错的类型，针对性刷题后准确率确实在涨', note: '有方向', score: 0 },
    { label: '刷了挺多但有些薄弱点还没补到，提升不快但稳定', note: '待聚焦', score: 1 },
    { label: '大量刷题但每次错的类型都不一样，像在碰运气', note: '盲目刷', score: 2 },
    { label: '刷了那么多还是那个分数，越刷越没信心', note: '无效刷题', score: 3 },
  ]),

  // ── 考试策略 ──
  q(17, 'exam', '我做题慢，考试容易卡住。', [
    { label: '我会跳过卡住的题先做会的，最后再回来攻', note: '会取舍', score: 0 },
    { label: '多数能按节奏走，碰到没思路的会停两三分钟', note: '偶尔卡', score: 1 },
    { label: '一道题卡住了就死磕，回过神来时间已经过半', note: '不会跳', score: 2 },
    { label: '前半张卷子还没做完时间就没了，后面全空', note: '速度崩', score: 3 },
  ]),
  q(18, 'exam', '我不会安排考试时间。', [
    { label: '考前会根据题型和分值分配好每块时间', note: '有规划', score: 0 },
    { label: '大概有个时间感但执行时容易被难题带偏', note: '执行不稳', score: 1 },
    { label: '完全凭感觉做，没看过还剩多少分钟', note: '无时间感', score: 2 },
    { label: '每次考试最后十分钟都在疯狂赶题，卷面一片乱', note: '时间失控', score: 3 },
  ]),
  q(19, 'exam', '我考试时比平时更容易错。', [
    { label: '考试和平时的准确率差不多，心态比较稳定', note: '输出稳', score: 0 },
    { label: '考试开头会紧张，做几题后就进入状态了', note: '启动慢', score: 1 },
    { label: '考试时手抖、脑子一片白，平时会做的也写不出来', note: '考场掉线', score: 2 },
    { label: '考完翻卷才发现好几道明明会但是做错了，不是第一次了', note: '考场黑洞', score: 3 },
  ]),
  q(20, 'exam', '我看到难题会先想放弃。', [
    { label: '难题我先拆条件、试两步，不会马上放弃', note: '能试探', score: 0 },
    { label: '看了一会儿没思路会先跳过，但不会怕它', note: '策略跳', score: 1 },
    { label: '一看到不熟悉的题型心里就咯噔一下，信心掉一大截', note: '畏难明显', score: 2 },
    { label: '连题目都不想读完，直接判定"这题我不可能做出来"', note: '直接放弃', score: 3 },
  ]),

  // ── 自我驱动 ──
  q(21, 'drive', '我遇到新题型会慌。', [
    { label: '新题型我先找跟旧题的相似点，稳下来再分析不同', note: '应对稳', score: 0 },
    { label: '刚开始有点懵，但深呼吸后能冷静拆题', note: '能调整', score: 1 },
    { label: '心里慌，笔都拿不稳，后面几题也被影响', note: '连锁慌', score: 2 },
    { label: '看到新题型大脑直接死机，整场考试心态全崩', note: '恐慌模式', score: 3 },
  ]),
  q(22, 'drive', '我不知道自己到底差在哪里。', [
    { label: '我清楚自己读题和计算偏弱，正针对这两块练', note: '自知力好', score: 0 },
    { label: '大概知道哪不行，但说不具体是哪个点', note: '方向模糊', score: 1 },
    { label: '每次考砸都觉得"全都不行"，看不出具体短板', note: '混沌感', score: 2 },
    { label: '我觉得自己全都差，根本不知道从哪开始补', note: '全面迷茫', score: 3 },
  ]),
  q(23, 'drive', '我学理科时容易觉得自己不行。', [
    { label: '理科就是多练，我信自己练够就会进步', note: '心态好', score: 0 },
    { label: '有时候状态好觉得自己还行，遇到挫折就想动摇', note: '起伏不定', score: 1 },
    { label: '经常想"是不是我脑子不适合学理科"，跟自己较劲', note: '自我怀疑', score: 2 },
    { label: '我已经认定自己学不好理科了，再怎么努力也没用', note: '习得性无助', score: 3 },
  ]),
  q(24, 'drive', '我需要别人催，才会开始复习。', [
    { label: '我自己会定复习计划并按节奏执行，不需要人盯', note: '自主驱动', score: 0 },
    { label: '大部分能自己开始，偶尔需要旁人提醒一下', note: '偶尔需要', score: 1 },
    { label: '知道该复习但就是不想动，等别人催了才勉强开始', note: '被动启动', score: 2 },
    { label: '没人盯着我根本不会翻开书本，催了也不一定动', note: '完全被动', score: 3 },
  ]),
]

export const levels = [
  { min: 0, max: 18, name: '基础稳定', tone: '当前短板不重，继续保持复盘和规范训练即可。' },
  { min: 19, max: 36, name: '轻度短板', tone: '已经有局部卡点，先补最高维度，提分会更快。' },
  { min: 37, max: 54, name: '明显短板', tone: '学习链路里有关键环节断开，单靠多刷题很容易低效。' },
  { min: 55, max: 72, name: '高压短板', tone: '多个能力点同时拖分，需要先分层诊断，再安排训练顺序。' },
]

export function computeReport(answerMap) {
  const items = questions.map((item) => ({ ...item, score: Number(answerMap[item.id] ?? 0) }))
  const total = items.reduce((sum, item) => sum + item.score, 0)
  const maxTotal = questions.length * 3
  const dimensionScores = Object.entries(dimensions).map(([key, dim]) => {
    const related = items.filter((item) => item.dim === key)
    const score = related.reduce((sum, item) => sum + item.score, 0)
    const max = related.length * 3
    return { key, ...dim, score, max, pct: Math.round((score / max) * 100) }
  })
  const sorted = [...dimensionScores].sort((a, b) => b.pct - a.pct)
  const level = levels.find((item) => total >= item.min && total <= item.max) || levels[levels.length - 1]
  return {
    total,
    maxTotal,
    pct: Math.round((total / maxTotal) * 100),
    level,
    dimensions: dimensionScores,
    topDimensions: sorted.slice(0, 2),
  }
}
