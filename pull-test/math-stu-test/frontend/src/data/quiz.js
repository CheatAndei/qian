export const product = {
  slug: 'math-stu-test',
  title: '数学课生存图鉴',
  shortTitle: '数学课人设',
  subject: '你在数学课上活成了哪种狠人？',
  audience: '学生自测版',
  minutes: '60 秒',
  questionCount: 12,
  accent: '#6d28d9',
  accent2: '#f59e0b',
  intro: '不考你做题，考的是你的数学课生存法则——摸鱼、蒙题、装懂、翻车，12 道灵魂拷问测出你的真实人设。',
  primaryCta: '开测，不考数学',
  resultTitle: '你的数学课人设',
  nextLabel: '发给同学对线',
  nextUrl: '',
  disclaimer: '仅供娱乐，认真你就输了。不建议发给数学老师。'
}

export const dimensions = {
  slack: {
    name: '摸鱼天赋',
    risk: '你深谙数学课摸鱼之道，能在老师眼皮底下完成各种骚操作。',
    advice: '摸鱼是门艺术，但建议至少把作业抄明白。'
  },
  guess: {
    name: '蒙题玄学',
    risk: '你有一套自成体系的蒙题方法论，正确率时高时低全看运气。',
    advice: '三长一短选最短是入门，真正的玄学是"感觉这题选 C"。'
  },
  social: {
    name: '社牛指数',
    risk: '数学课是你的社交主场，传纸条、接话茬、带动全班节奏。',
    advice: '社交能力满分，但建议控制一下接老师话的频率。'
  },
  flex: {
    name: '装逼功力',
    risk: '你喜欢在不经意间展示自己的数学实力，但偶尔会翻车。',
    advice: '装逼的至高境界是"我也不会，但就是分高"。'
  },
  crash: {
    name: '翻车频率',
    risk: '你是数学课的节目效果担当，每次翻车都能贡献经典名场面。',
    advice: '翻车不可怕，可怕的是全班都记住了你的翻车瞬间。'
  },
  survive: {
    name: '求生欲望',
    risk: '你有极强的危机意识，总能在关键时刻化险为夷。',
    advice: '求生欲是你的超能力，建议开班授课。'
  }
}

function q(id, dim, prompt, options) {
  return { id, dim, prompt, options }
}

export const questions = [
  q(1, 'slack', '数学老师转身写板书的那一瞬间，你会？', [
    { label: '赶紧低头假装记笔记', note: '标准操作', score: 1 },
    { label: '掏出手机刷两条朋友圈', note: '熟练工', score: 2 },
    { label: '跟同桌用眼神交流一个八卦', note: '老油条', score: 3 },
    { label: '我在认真听课，别问我', note: '三好学生', score: 0 }
  ]),
  q(2, 'guess', '考试遇到一道完全看不懂的选择题，你的第一反应是？', [
    { label: '三长一短选最短，蒙就完了', note: '经典流派', score: 1 },
    { label: '先排除两个明显不对的，再蒙', note: '理性蒙题', score: 2 },
    { label: '算一下前面几题 ABCD 分布，选出现最少的', note: '统计学蒙题', score: 3 },
    { label: '我从不蒙题，不会就空着', note: '诚实但分低', score: 0 }
  ]),
  q(3, 'social', '老师点名让你上黑板做题，但你完全不会，你会？', [
    { label: '硬着头皮上去，写个"解"字站一会', note: '体面人', score: 1 },
    { label: '"老师我去上个厕所"', note: '经典逃生', score: 2 },
    { label: '让同桌小声告诉你，然后自信走上去', note: '团队协作', score: 3 },
    { label: '老实说不会，然后站了一节课', note: '太实诚了', score: 0 }
  ]),
  q(4, 'flex', '同桌说"这题好难啊"，而你恰好会做，你会？', [
    { label: '"还行吧，就那样"', note: '低调装逼', score: 1 },
    { label: '"来我教你"（声音大到全班听见）', note: '高调装逼', score: 2 },
    { label: '"这都不会？我闭眼都能做"', note: '危险发言', score: 3 },
    { label: '"确实难，我也不会"', note: '深藏不露', score: 0 }
  ]),
  q(5, 'crash', '你信心满满回答了一个问题，结果答案是错的，老师还让全班一起纠正你，你内心？', [
    { label: '假装记笔记，脸已经红透了', note: '默默承受', score: 1 },
    { label: '"哦哦哦我知道了"（其实还在懵）', note: '强行挽尊', score: 2 },
    { label: '"老师我刚才嘴瓢了"', note: '嘴硬王者', score: 3 },
    { label: '这种事情在我身上发生太多次了，麻了', note: '习得性无助', score: 0 }
  ]),
  q(6, 'survive', '明天要检查数学作业，但你一个字没写，今晚你会？', [
    { label: '晚自习疯狂补，能写多少写多少', note: '亡羊补牢', score: 1 },
    { label: '找学霸借来"参考"一下', note: '资源整合', score: 2 },
    { label: '跟课代表搞好关系，让他跳过你', note: '人情世故', score: 3 },
    { label: '赌老师明天忘了检查', note: '赌博行为', score: 0 }
  ]),
  q(7, 'slack', '数学课上最让你清醒的瞬间是？', [
    { label: '老师突然拍桌子', note: '物理唤醒', score: 1 },
    { label: '下课铃响了', note: '生物钟精准', score: 2 },
    { label: '同桌说"老师看你了"', note: '社交唤醒', score: 3 },
    { label: '我全程都很清醒，真的', note: '你在撒谎', score: 0 }
  ]),
  q(8, 'guess', '填空题你不会，但还差一个空就交卷了，你会填什么？', [
    { label: '填个 0 或者 1', note: '朴素直觉', score: 1 },
    { label: '填前面算出来的某个数', note: '制造工作量', score: 2 },
    { label: '瞄一眼旁边学霸的卷子', note: '侦查能力', score: 3 },
    { label: '空着，不写就不会错', note: '逻辑自洽', score: 0 }
  ]),
  q(9, 'social', '班里数学考第一的同学在吹自己没复习，你会？', [
    { label: '翻个白眼但不说啥', note: '内心戏丰富', score: 1 },
    { label: '"是是是你最牛"阴阳怪气一波', note: '阴阳大师', score: 2 },
    { label: '当场拆穿"你昨晚在图书馆待到十点"', note: '正义执行', score: 3 },
    { label: '默默把卷子翻到分数那面盖住', note: '自我保护', score: 0 }
  ]),
  q(10, 'flex', '数学老师表扬了你的解题方法，全班看向你，你的反应是？', [
    { label: '"碰巧想到的"谦虚一笑', note: '优雅装逼', score: 1 },
    { label: '把解题过程详细讲一遍，顺便延伸一下', note: '表演型人格', score: 2 },
    { label: '下课被围住问方法，享受这一刻', note: '明星待遇', score: 3 },
    { label: '内心狂喜但面无表情，怕下次考砸', note: '创伤后应激', score: 0 }
  ]),
  q(11, 'crash', '你在数学课上睡着被老师抓到的经历？', [
    { label: '有一次，头差点砸桌上', note: '轻度社死', score: 1 },
    { label: '不止一次，而且每次姿势都不一样', note: '睡眠艺术家', score: 2 },
    { label: '老师走到我旁边都没醒，同桌推我才醒', note: '深度睡眠', score: 3 },
    { label: '从来没睡过，因为坐第一排', note: '地理劣势', score: 0 }
  ]),
  q(12, 'survive', '期末数学考砸了，回家怎么跟家长交代？', [
    { label: '"这次题太难了，全班平均分才 XX"', note: '转移焦点', score: 1 },
    { label: '"我下次一定考好"态度先摆出来', note: '态度流', score: 2 },
    { label: '"我们班第一也才 XX 分"拉个垫背的', note: '比较文学', score: 3 },
    { label: '把卷子藏起来，能拖一天是一天', note: '时间管理', score: 0 }
  ])
]

export const levels = [
  { min: 0, max: 9, name: '数学课透明人', tone: '你在数学课上主打一个"不被注意"，老师基本想不起来叫你。虽然存在感不高，但你用最低调的方式活过了每一节数学课。缺点是存在感太低，连课代表发卷子都会漏掉你。', badge: '存在感 ≈ 空气' },
  { min: 10, max: 17, name: '蒙题玄学大师', tone: '你已经形成了自己的蒙题方法论，选择题正确率偶尔能超过认真做的同桌。你的座右铭是"数学不会就是不会，但蒙对就是本事"。建议出一本《蒙题从入门到精通》。', badge: '蒙对过 5 道选择题' },
  { min: 18, max: 24, name: '抄作业行为艺术家', tone: '你不是不想自己写，你只是更擅长资源整合。抄作业时你会故意改错一两道，显得真实——这种细节意识已经超越了很多同龄人。生存智慧满分，但建议考试前还是自己练练。', badge: '抄出风格，抄出水平' },
  { min: 25, max: 30, name: '数学课整活王', tone: '你是数学课的节目效果担当，不管是接话茬、传纸条、还是翻车后强行挽尊，全班都会因为你而多笑几次。老师对你是又爱又恨。你的存在让数学课不那么无聊了。', badge: '班级文娱委员（非官方）' },
  { min: 31, max: 36, name: '隐藏卷王', tone: '你就是那种"没复习"然后考第一的人。平时看起来在摸鱼，实际偷偷卷。你在数学课上的人设管理堪称一绝——装不会、装懵、然后考完让全班震惊。建议截图发群，让同学重新认识你。', badge: '建议截图发群对线' }
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
    shareText: `我测出「${level.name}」——${level.badge}。你在数学课上是哪种狠人？来测测看。`
  }
}
