export const product = {
  slug: 'showtest',
  title: '孩子理科学习风险趋势自测',
  shortTitle: '风险趋势筛查',
  subject: '数学 / 物理',
  audience: '家长版',
  minutes: '3 分钟',
  questionCount: 24,
  accent: '#1f6feb',
  accent2: '#f59e0b',
  intro: '24 个真实学习场景，看出孩子是短期波动、隐性漏洞，还是已经出现掉队前兆。',
  primaryCta: '开始筛查',
  resultTitle: '学习风险趋势报告',
  nextLabel: '继续做学生能力诊断',
  nextUrl: '../savetest/frontend/dist/index.html',
  disclaimer: '本测评仅用于学习情况初筛，不构成专业诊断或升学承诺。',
}

export const scaleOptions = [
  { label: '没有', score: 0 },
  { label: '偶尔', score: 1 },
  { label: '经常', score: 2 },
  { label: '很明显', score: 3 },
]

export const dimensions = {
  foundation: {
    name: '基础掌握',
    risk: '基础知识存在断点，后续综合题会越来越吃力。',
    advice: '先补概念、公式含义和基础题变式，不急着刷难题。',
  },
  transfer: {
    name: '变式迁移',
    risk: '孩子可能会做原题，但换问法后无法迁移。',
    advice: '需要建立题型识别和条件拆解方法。',
  },
  accuracy: {
    name: '计算规范',
    risk: '粗心背后常是书写、检查和运算习惯不稳定。',
    advice: '用限时基础题、错因标注和步骤规范训练。',
  },
  review: {
    name: '复盘习惯',
    risk: '错题没有形成闭环，同类错误容易反复出现。',
    advice: '每周固定复盘错题，按题型和错因归类。',
  },
  exam: {
    name: '考试输出',
    risk: '平时会不等于考场能拿分，输出链路需要训练。',
    advice: '用套卷节奏、时间分配和先易后难策略训练。',
  },
  emotion: {
    name: '学习情绪',
    risk: '逃避、否定自己，会放大学习阻力。',
    advice: '先让孩子看到可完成的小目标，再恢复信心。',
  },
}

function q(id, dim, prompt, options) {
  return { id, dim, prompt, options }
}

export const questions = [
  // ── 基础掌握 ──
  q(1, 'foundation', '上课听懂，回家自己做就卡住。', [
    { label: '回家能独立完成同类题，还会举一反三', note: '真正掌握', score: 0 },
    { label: '大部分能独立做，偶尔一两道需要提醒一下', note: '基本过关', score: 1 },
    { label: '必须我坐旁边一步步带着做才能写出来', note: '依赖性强', score: 2 },
    { label: '明明课上点头说听懂了，回家翻开题完全不知道从哪下手', note: '假听懂', score: 3 },
  ]),
  q(2, 'foundation', '公式会背，但不知道什么时候用。', [
    { label: '看到题目条件能准确判断该调用哪个公式', note: '调用准确', score: 0 },
    { label: '基础公式能对上号，综合题选公式会犹豫', note: '选择偏慢', score: 1 },
    { label: '背得很熟但一做题就乱套，经常用错公式', note: '背用脱节', score: 2 },
    { label: '公式背了一堆，做题时一个都想不起来用', note: '调用失灵', score: 3 },
  ]),
  q(3, 'foundation', '基础题换个问法就容易错。', [
    { label: '换个数字、换个问法也能抓住本质不变的部分', note: '变式适应好', score: 0 },
    { label: '简单变式还行，条件一多就容易踩坑', note: '复杂变式弱', score: 1 },
    { label: '题型稍微改一下就不会了，感觉跟没学过一样', note: '迁移困难', score: 2 },
    { label: '连最基础的换个数都能做错，说明根本没理解', note: '基础虚', score: 3 },
  ]),
  q(4, 'foundation', '学过的内容过段时间就忘。', [
    { label: '上学期学的内容现在还能熟练运用', note: '记忆稳固', score: 0 },
    { label: '有些细节会忘但核心概念和方法还记得住', note: '主干在', score: 1 },
    { label: '期中考试前发现期初学的已经忘得差不多', note: '遗忘偏快', score: 2 },
    { label: '像没学过一样，每次考试都要从零开始重新学', note: '留存率低', score: 3 },
  ]),

  // ── 变式迁移 ──
  q(5, 'transfer', '作业会做，考试一变题就错。', [
    { label: '作业和考试的不一样他能识别出来并调整思路', note: '灵活应变', score: 0 },
    { label: '变式题多花点时间能推出来，不算严重', note: '可适应', score: 1 },
    { label: '作业做过的原题全对，考试换个数字就不会了', note: '死记硬套', score: 2 },
    { label: '考试凡是没见过的题型基本全丢分', note: '无法迁移', score: 3 },
  ]),
  q(6, 'transfer', '综合题不知道先从哪一步入手。', [
    { label: '能自己把大问题拆成几个小步骤，按顺序解决', note: '拆解力强', score: 0 },
    { label: '提醒一下"先看条件"之后能自己往下推', note: '需引导', score: 1 },
    { label: '盯着题目看了很久也不知道第一步该干什么', note: '启动困难', score: 2 },
    { label: '一看到综合题就直接放弃，连尝试拆解的意愿都没有', note: '拆解无力', score: 3 },
  ]),
  q(7, 'transfer', '应用题读完题，找不出关键条件。', [
    { label: '读完就能圈出关键数据，忽略干扰信息', note: '找得准', score: 0 },
    { label: '简单题能抓住重点，信息多的题会被绕进去', note: '多信息弱', score: 1 },
    { label: '经常把干扰条件当关键条件，方向从一开始就偏了', note: '误判多', score: 2 },
    { label: '读完了完全分不清哪些信息有用哪些没用', note: '全盲', score: 3 },
  ]),
  q(8, 'transfer', '会看懂答案，但自己想不到思路。', [
    { label: '看完答案能总结出"下次遇到这种题应该怎么想"', note: '会反推', score: 0 },
    { label: '大多数能自己想，卡住的题看了答案能模仿着做', note: '模仿力有', score: 1 },
    { label: '每道题都要看答案才做得出来，自己完全没有思路', note: '依赖答案', score: 2 },
    { label: '看了答案也不明白为什么这样想，下次还是一样不会', note: '无法内化', score: 3 },
  ]),

  // ── 计算规范 ──
  q(9, 'accuracy', '计算题经常丢分。', [
    { label: '计算正确率稳定在 95% 以上，很少因计算丢分', note: '计算稳', score: 0 },
    { label: '大部分算得对，偶尔犯低级失误能自己发现', note: '小失误', score: 1 },
    { label: '每次卷子下来总有两三道是算错的，不是不会', note: '习惯性错', score: 2 },
    { label: '会做的题有一半以上因为计算错而丢分', note: '计算黑洞', score: 3 },
  ]),
  q(10, 'accuracy', '符号、单位、正负号容易出错。', [
    { label: '写完会专门花时间检查符号和单位，很少出错', note: '检查到位', score: 0 },
    { label: '偶尔忘写单位或抄错符号，提醒后会注意', note: '小毛刺', score: 1 },
    { label: '经常丢负号、写错单位、抄错数字，错因都一样', note: '反复错', score: 2 },
    { label: '明明是会的题，因为符号搞反扣了一半以上的分', note: '符号杀手', score: 3 },
  ]),
  q(11, 'accuracy', '解题步骤跳太多，过程不规范。', [
    { label: '每一步推导都写得清楚，过程比答案还漂亮', note: '规范好', score: 0 },
    { label: '关键步骤会写，简单的合并有时省略', note: '大致完整', score: 1 },
    { label: '草稿纸上写了但卷子上直接给答案，跳步严重', note: '跳步多', score: 2 },
    { label: '卷子上只有答案连基本过程都没有，不知道哪来的', note: '无过程', score: 3 },
  ]),
  q(12, 'accuracy', '检查时也查不出自己的错误。', [
    { label: '检查时能用不同方法验算，能抓到自己的粗心错误', note: '检查有效', score: 0 },
    { label: '检查能发现一些明显错误，细微的容易忽略', note: '粗检尚可', score: 1 },
    { label: '查了两遍都没发现问题，发下来才看到错在哪', note: '检查盲区', score: 2 },
    { label: '根本不知道怎么检查，就是把题重新看一遍', note: '不会检查', score: 3 },
  ]),

  // ── 复盘习惯 ──
  q(13, 'review', '错题改过，下次同类题还错。', [
    { label: '改错时会分析错因，同类题之后基本不再犯', note: '闭环完整', score: 0 },
    { label: '大部分错题改后能避免，少数顽固的还会再错', note: '部分改善', score: 1 },
    { label: '改了答案没改思路，同样的坑反复踩', note: '只改表面', score: 2 },
    { label: '同一类题每次都错，错题本上记了三遍还不长记性', note: '无效复盘', score: 3 },
  ]),
  q(14, 'review', '平时不主动整理错题。', [
    { label: '有自己的错题本，按题型和错因归类得整整齐齐', note: '主动归纳', score: 0 },
    { label: '偶尔会整理，但坚持不下来，过一段就停了', note: '有习惯不稳', score: 1 },
    { label: '只有老师要求时才整理，其他时间从不碰', note: '被动执行', score: 2 },
    { label: '从来没有整理过错题，考完卷子就扔了', note: '零复盘', score: 3 },
  ]),
  q(15, 'review', '考前突击，平时缺少复盘。', [
    { label: '每周固定时间回顾本周错题，考前只需快速过一遍', note: '节奏好', score: 0 },
    { label: '平时偶尔翻翻，主要靠考前集中复习', note: '偏考前', score: 1 },
    { label: '平时从来不碰错题，考前两三天才疯狂翻', note: '纯突击', score: 2 },
    { label: '考前都不肯翻错题，全靠临时刷几道新题碰运气', note: '无准备', score: 3 },
  ]),
  q(16, 'review', '刷了很多题，但没有总结方法。', [
    { label: '做完题会把同类题放一起比较，提炼解题模板', note: '会总结', score: 0 },
    { label: '数量够了但没有归类意识，效率慢慢在降', note: '缺归纳', score: 1 },
    { label: '大量刷题但方法零散，像在碰运气而不是在上台阶', note: '刷而不思', score: 2 },
    { label: '刷了很多还是老样子，越刷越迷茫，分数纹丝不动', note: '无效勤奋', score: 3 },
  ]),

  // ── 考试输出 ──
  q(17, 'exam', '成绩忽上忽下，不稳定。', [
    { label: '成绩波动在正常范围，发挥比较稳定', note: '输出稳定', score: 0 },
    { label: '偶尔有起伏，主要跟试卷难度有关', note: '小幅波动', score: 1 },
    { label: '上次考得好下次一定差，像坐过山车完全没规律', note: '大起大落', score: 2 },
    { label: '每次考试像开盲盒，完全不知道这次会考多少', note: '完全随机', score: 3 },
  ]),
  q(18, 'exam', '考试时间不够，最后几题写不完。', [
    { label: '时间分配合理，做完还有空检查一遍', note: '时间感好', score: 0 },
    { label: '偶尔时间紧但能完成，很少大面积空题', note: '基本够用', score: 1 },
    { label: '经常最后两道大题来不及写就收卷了', note: '常写不完', score: 2 },
    { label: '前半张就花了大半时间，后面一大片空白', note: '严重超时', score: 3 },
  ]),
  q(19, 'exam', '简单题丢分，难题也拿不到分。', [
    { label: '简单题稳拿，难题能拿步骤分，总分比较健康', note: '分层好', score: 0 },
    { label: '简单题偶尔粗心丢两三分，大题能写一部分', note: '轻微失血', score: 1 },
    { label: '简单题粗心、难题不会，两头都在丢分', note: '两头漏', score: 2 },
    { label: '会做的题也丢分、不会的题全空，整张卷子没有不丢分的模块', note: '全盘漏', score: 3 },
  ]),
  q(20, 'exam', '最近考试暴露的问题比以前更多。', [
    { label: '暴露出的问题越来越少，知识体系在收紧', note: '在变好', score: 0 },
    { label: '偶尔出现新问题但不算多，算正常学习波动', note: '正常范围', score: 1 },
    { label: '每次考试暴露出新的薄弱点，旧的也没补上', note: '问题累积', score: 2 },
    { label: '问题越积越多像滚雪球，感觉哪里全都是漏洞', note: '全面告急', score: 3 },
  ]),

  // ── 学习情绪 ──
  q(21, 'emotion', '家长一辅导就容易吵。', [
    { label: '辅导时心平气和，孩子能接受纠错共同讨论', note: '沟通顺畅', score: 0 },
    { label: '大部分时候还行，偶尔我说多了他会不耐烦', note: '偶尔摩擦', score: 1 },
    { label: '一讲题就互相急眼，我说东他扯西，根本进行不下去', note: '高频冲突', score: 2 },
    { label: '已经不敢辅导了，一开口就是吵，亲子关系都受影响了', note: '关系告急', score: 3 },
  ]),
  q(22, 'emotion', '孩子开始逃避数学或物理。', [
    { label: '遇到困难会主动寻求帮助，不躲不藏', note: '直面问题', score: 0 },
    { label: '偶尔会说不想做理科作业，但说两句还是会去做', note: '轻微抵触', score: 1 },
    { label: '总是找各种借口拖数学物理作业，优先做其他科', note: '明显逃避', score: 2 },
    { label: '提到数学物理就烦躁抗拒，甚至装病不去上学', note: '严重逃避', score: 3 },
  ]),
  q(23, 'emotion', '孩子常说自己不适合理科。', [
    { label: '遇到困难会说"这次没考好"，而不是否定自己能力', note: '归因健康', score: 0 },
    { label: '考差时会说丧气话但过几天能调整回来', note: '短暂低潮', score: 1 },
    { label: '动不动就说自己脑子笨学不会理科，越说越当真', note: '固化标签', score: 2 },
    { label: '已经从"我学不好"升级到"我就是个废物"，全面否定自己', note: '深度自我否定', score: 3 },
  ]),
  q(24, 'emotion', '低分后短暂努力，几天后又松下来。', [
    { label: '成绩波动不影响学习节奏，保持稳定投入', note: '韧性强', score: 0 },
    { label: '考差了会多花时间补，坚持一两周还行', note: '短期反弹', score: 1 },
    { label: '考完发奋两天，三天后就回原样，反复循环', note: '三分钟热', score: 2 },
    { label: '低分已经刺激不了他了，考好考差都一个态度——无所谓', note: '动力枯竭', score: 3 },
  ]),
]

export const levels = [
  { min: 0, max: 18, name: '低风险', tone: '目前整体稳定，重点是防止"听懂了但没真正会"的假会。' },
  { min: 19, max: 36, name: '隐性风险', tone: '分数可能还没明显下滑，但漏洞已经开始累积，现在干预最省力。' },
  { min: 37, max: 54, name: '明显风险', tone: '这通常不是单纯粗心，而是基础、方法、习惯里至少一项在持续拖分。' },
  { min: 55, max: 72, name: '高风险', tone: '孩子已经出现掉队前兆，越晚处理，后面越容易变成系统性补漏。' },
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
