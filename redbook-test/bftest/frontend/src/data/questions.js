// ===== 30 道男友资格考试题目 =====
// 每题 4 选项, 分数 0-3, 附带 tag + roast

export const questions = [
  // ===== 关心与照顾 =====
  {
    id: 1,
    question: '你发烧到38度，躺在床上起不来，他会？',
    emoji: '🤒',
    options: [
      { text: '"多喝热水"说完继续打游戏', score: 0, tags: ['🎯'], roast: '一句万能回复，既没确认症状也没提供实际支持 🤒' },
      { text: '外卖买了药和粥送到你家门口', score: 1, tags: ['🔥'], roast: '外卖小哥都比他像男朋友...不过起码下单了 💊' },
      { text: '先问症状和你需要什么，能到场就照顾，不能到场也会安排实际支持', score: 2, tags: ['🔥', '🍯'], roast: '关心不只看是否请得了假，关键是回应具体需要 🍗' },
      { text: '陪你观察状态、按说明用药；若持续高热或出现危险信号会建议及时就医', score: 3, tags: ['🔥', '🛡️'], roast: '不乱下诊断，也不把“多喝水”当万能答案，稳妥 💊' }
    ]
  },
  {
    id: 2,
    question: '你来大姨妈，肚子疼得不行，他？',
    emoji: '😣',
    options: [
      { text: '"这有什么，忍忍就过去了"', score: 0, tags: ['🚩'], roast: '让他来试试？站着说话不腰疼 🚩' },
      { text: '说"多喝热水"，但至少语气是关心的', score: 1, tags: ['🎯'], roast: '又是热水...他是不是只会这一招 😅' },
      { text: '问你平时哪种方式舒服，按你的偏好准备热敷、止痛药或休息空间', score: 2, tags: ['🔥', '🍯'], roast: '不套固定偏方，先听本人经验更靠谱 ✅' },
      { text: '尊重你的隐私和身体感受；疼痛异常或影响生活时支持你咨询医生', score: 3, tags: ['🔥', '🛡️', '✨'], roast: '不监控经期、不替你定禁忌，支持和尊重都到位 💗' }
    ]
  },
  {
    id: 3,
    question: '你加班到深夜/学习学到很晚，他会？',
    emoji: '🌙',
    options: [
      { text: '自己先睡了，第二天问你"昨晚几点回来的？"', score: 0, tags: ['🧘'], roast: '睡挺香啊...你确定他是你男朋友不是室友？😴' },
      { text: '发条"注意安全"，然后没了', score: 1, tags: ['🎯'], roast: '比已读不回强一点，但就一点 😑' },
      { text: '先问你需要接送、陪聊还是早点休息，再按实际情况安排', score: 2, tags: ['🔥', '🍯'], roast: '不预设答案，支持会更贴合当晚状态 🌙' },
      { text: '和你确认安全返程方案，行程变化及时沟通，也尊重彼此第二天的安排', score: 3, tags: ['🔥', '💘', '🛡️'], roast: '安全感来自稳定预期，不来自无意义地苦等 🚕' }
    ]
  },
  {
    id: 4,
    question: '你心情不好不想说话，他会？',
    emoji: '😔',
    options: [
      { text: '觉得你矫情，"这点事至于吗"', score: 0, tags: ['🚩', '🎯'], roast: '先否定感受，会让对方更难说明发生了什么 🚩' },
      { text: '"那你先静静"，然后该干嘛干嘛去了', score: 1, tags: ['🧘', '🎯'], roast: '静静是谁？怎么比你还重要 🤔' },
      { text: '安静坐在你旁边，递杯奶茶，等你愿意开口', score: 2, tags: ['🔥', '🐶'], roast: '不说话但陪着，这才是正确打开方式 🥤' },
      { text: '问你想独处、安静陪伴还是被逗一逗，晚点也会回来确认状态', score: 3, tags: ['🔥', '🐶', '🤪'], roast: '幽默是可选项，不强行逗笑，也不把空间变成消失 🫂' }
    ]
  },
  {
    id: 5,
    question: '你生病没胃口不想吃饭，他会？',
    emoji: '🍚',
    options: [
      { text: '嘴上说"多少吃点吧"，然后继续打游戏', score: 0, tags: ['🎯'], roast: '嘴上关心手上操作，游戏比你重要 🎮' },
      { text: '帮你点了个清淡的外卖放桌上，自己忙去了', score: 1, tags: ['🎯', '🔥'], roast: '有行动力但不多，给个及格分吧 📦' },
      { text: '准备你能接受的清淡食物，但不会盯着或强迫你吃完', score: 2, tags: ['🔥', '🍯'], roast: '有照顾，也把身体决定权留给你 🥣' },
      { text: '持续关注补水和状态；明显吃不下或恶化时陪你寻求医疗建议', score: 3, tags: ['🔥', '🛡️', '🐶'], roast: '支持不等于哄喂，知道何时该找专业帮助更重要 🩺' }
    ]
  },

  // ===== 沟通与回应 =====
  {
    id: 6,
    question: '你发的消息，他多久回？',
    emoji: '📱',
    options: [
      { text: '轮回：上午发晚上回，甚至忘了', score: 0, tags: ['🧘', '❄️'], roast: '兄弟你是去外太空出差了吗 🚀' },
      { text: '看心情，半小时到几小时不等', score: 1, tags: ['🎯'], roast: '他回消息的速度取决于开黑结束时间 🎮' },
      { text: '基本秒回，忙的时候会提前告诉你', score: 2, tags: ['🔥', '🐶'], roast: '忙之前还报备，尊重到位了 👌' },
      { text: '按双方约定的节奏回复；忙时会说明，紧急情况也有明确联系方式', score: 3, tags: ['💘', '🐶', '🔥'], roast: '安全感来自可预期的联系，不来自全天GPS 📍' }
    ]
  },
  {
    id: 7,
    question: '你跟他分享今天遇到的小事，他？',
    emoji: '💬',
    options: [
      { text: '"嗯" "哦" "好" 三连击', score: 0, tags: ['❄️', '🧘'], roast: '嗯哦好三连——建议他去当AI客服 🤖' },
      { text: '听是听了，但明显在走神刷手机', score: 1, tags: ['🎯', '🧘'], roast: '耳朵在你这，魂在手机里 📱' },
      { text: '认真听完，还会追问细节，像在听连载小说', score: 2, tags: ['🔥', '🍯'], roast: '追细节追得像在看连载，这谁受得了啊 🥹' },
      { text: '不仅认真听，还会记住你一周前说的某件小事，回头问你后续', score: 3, tags: ['🔥', '💘', '✨'], roast: '记住一周前的小事还问后续？？记忆力分我一半 🧠✨' }
    ]
  },
  {
    id: 8,
    question: '发生争执后，他通常怎么推进修复？',
    emoji: '💔',
    options: [
      { text: '每次都是你先低头，他能一直冷下去', score: 0, tags: ['❄️', '🚩'], roast: '冷战马拉松冠军是吧 🏆❄️' },
      { text: '看情况——他错了可能会主动，但大多数时候等你找', score: 1, tags: ['🎯', '❄️'], roast: '偶尔主动但频率约等于中彩票 🎰' },
      { text: '冷静后愿意回来谈，也会听你说完整', score: 2, tags: ['🔥', '🐶'], roast: '愿意回来谈，修复才真正开始 👍' },
      { text: '会说明自己需要多久冷静，再一起复盘影响、责任和下次怎么做', score: 3, tags: ['🐶', '🛡️', '🔥'], roast: '不是谁先投降，而是问题有没有被真正处理 🤝' }
    ]
  },
  {
    id: 9,
    question: '你有重要的事想跟他商量，他会？',
    emoji: '🤔',
    options: [
      { text: '"你自己决定吧，别问我"', score: 0, tags: ['🧘', '🚩'], roast: '他要你这个女朋友是当摆设的吗 🤷' },
      { text: '听你说了，但给不出什么有用的建议', score: 1, tags: ['🧘'], roast: '听了但没完全听，建议了个寂寞 🗑️' },
      { text: '认真听完，帮你分析利弊，但尊重你的最终决定', score: 2, tags: ['🔥', '🛡️', '👨‍🏫'], roast: '帮你分析又尊重你，这才是成年人的爱情 💼' },
      { text: '先问你是否想听建议，再按你的需求一起梳理选项和风险', score: 3, tags: ['🛡️', '🔥', '👨‍🏫'], roast: '方案能力用在对方需要的时候，才是真正有效 📊' }
    ]
  },

  // ===== 浪漫与仪式感 =====
  {
    id: 10,
    question: '你们的纪念日，他会？',
    emoji: '💝',
    options: [
      { text: '什么纪念日？完全不知道你在说什么', score: 0, tags: ['🎯', '🧘'], roast: '纪念日是什么能吃吗.jpg 🗿' },
      { text: '记住了大概月份，但具体日期经常搞混', score: 1, tags: ['🎯'], roast: '月份记住了...要求不高的话还行？🤏' },
      { text: '重要日子都记在手机里，会提前准备小惊喜', score: 2, tags: ['🔥', '✨'], roast: '记手机+准备惊喜，仪式感及格了 📅🎁' },
      { text: '你们谈过彼此在意哪些日子，会轮流准备、量力而行', score: 3, tags: ['✨', '💘', '🍯'], roast: '仪式感先对齐期待，不必靠记住所有日期证明爱 📅' }
    ]
  },
  {
    id: 11,
    question: '情人节/七夕，他通常会？',
    emoji: '💐',
    options: [
      { text: '"这种节日都是商家骗钱的"', score: 0, tags: ['🎯', '🚩'], roast: '省的钱是打算买房还是怎么的 💸' },
      { text: '发个红包，金额看心情', score: 1, tags: ['🎯'], roast: '红包解决一切——距离走心还差一步 💰' },
      { text: '提前订好餐厅，准备好礼物和花', score: 2, tags: ['🔥', '✨'], roast: '餐厅+礼物+花，标准三件套，稳了 🌹' },
      { text: '会按双方喜欢的方式安排，偶尔加入两个人都懂的小梗，预算和时间也提前沟通', score: 3, tags: ['✨', '🤪', '🍯'], roast: '浪漫不是单人策划考核，两个人舒服又玩得开心才是重点 💐' }
    ]
  },
  {
    id: 12,
    question: '你随口说过"这个好可爱"，过段时间他？',
    emoji: '🎀',
    options: [
      { text: '完全没印象，你说了他都当耳旁风', score: 0, tags: ['🧘', '🎯'], roast: '没记住并非罪过，但长期不回应会让分享失去动力 👂' },
      { text: '隐约记得你说过，但想不起来具体是啥', score: 1, tags: ['🎯'], roast: '有印象但没行动——差一点就差很多 😮‍💨' },
      { text: '偷偷买下来，在你某个平凡的日子送给你', score: 2, tags: ['🔥', '🍯', '✨'], roast: '偷偷买了在平凡日子送——这也太会了吧 🥹🎀' },
      { text: '会记住重要偏好，合适时问你还感不感兴趣，不把随口一句都当任务', score: 3, tags: ['💘', '✨', '🔥'], roast: '记得细节，也允许偏好会变化，这才是长期版本 📝' }
    ]
  },
  {
    id: 13,
    question: '你生日那天，他会？',
    emoji: '🎂',
    options: [
      { text: '忘了，第二天才想起来，还狡辩说"我以为你说的是农历"', score: 0, tags: ['🚩', '🎯'], roast: '农历都搬出来了？？搁这考农历换算呢 🗓️' },
      { text: '发了个红包+一句生日快乐', score: 1, tags: ['🎯'], roast: '红包+四字祝福——微信祝福模板 📱' },
      { text: '零点点发祝福，白天准备了蛋糕+礼物+晚餐', score: 2, tags: ['🔥', '✨', '🍯'], roast: '零点祝福+全天安排，诚意到位了 🎂' },
      { text: '知道你喜欢热闹还是安静，提前留出时间，安排不会让你有社交压力', score: 3, tags: ['✨', '💘', '🛡️'], roast: '生日安排对准本人偏好，比规模更重要 🎂' }
    ]
  },
  {
    id: 14,
    question: '他会突然给你制造小惊喜吗？',
    emoji: '🎁',
    options: [
      { text: '惊喜？惊吓倒是有', score: 0, tags: ['🧘', '🎯'], roast: '小心意不是必修课，但别让承诺反复变成意外 ⚡' },
      { text: '偶尔心血来潮，但频率约等于哈雷彗星回归', score: 1, tags: ['🎯'], roast: '哈雷彗星76年一次...你等的起吗 ☄️' },
      { text: '隔三差五会有，比如下班路上买你爱吃的甜点', score: 2, tags: ['🔥', '🍯'], roast: '下班顺路带甜点，平凡又真实的甜蜜 🍰' },
      { text: '偶尔准备贴合你兴趣、带点共同笑点的小心意，也接受你不爱惊喜', score: 3, tags: ['💘', '✨', '🤪'], roast: '惊喜有边界、有共同梗，才不会从心意变成压力 🎁' }
    ]
  },

  // ===== 公开与社交 =====
  {
    id: 15,
    question: '他朋友圈里有你的存在吗？',
    emoji: '📸',
    options: [
      { text: '完全没有，看起来像个单身贵族', score: 0, tags: ['🚩', '❄️'], roast: '朋友圈立单身人设？你是个秘密吗 🕵️' },
      { text: '有过一条，还是你拿他手机自己发的', score: 1, tags: ['🎯'], roast: '你帮他发了才算有？这算工伤了 😂' },
      { text: '重要节点会发你们的合照，配文还挺甜', score: 2, tags: ['🔥', '🍯'], roast: '重要节点准时营业，文案及格了 📝' },
      { text: '你们谈过公开边界；想分享时自然分享，不发也不会刻意隐藏关系', score: 3, tags: ['🔥', '🛡️', '🍯'], roast: '公开程度由两个人商量，不靠朋友圈条数证明感情 📸' }
    ]
  },
  {
    id: 16,
    question: '他和朋友聚会，会带你吗？',
    emoji: '🎉',
    options: [
      { text: '从不带你，也拒绝解释为什么把两个社交圈完全隔开', score: 0, tags: ['🚩', '❄️'], roast: '社交圈可以独立，但持续隐藏且拒绝沟通值得留意 🤔' },
      { text: '偶尔带你，但你明显感觉他有点局促', score: 1, tags: ['🎯'], roast: '带了但不敢秀——有点怪怪的 🤨' },
      { text: '主动邀请你一起去，把你介绍给所有朋友', score: 2, tags: ['🔥', '🛡️'], roast: '主动带你还介绍一圈，大方！👏' },
      { text: '重要聚会会真诚邀请你，也保留各自单独和朋友相处的时间', score: 3, tags: ['🔥', '🛡️'], roast: '融入彼此生活，不等于每个社交场景都绑定出席 🎉' }
    ]
  },
  {
    id: 17,
    question: '他家人知道你的存在吗？',
    emoji: '👨‍👩‍👦',
    options: [
      { text: '完全不知道，他从来没提过', score: 0, tags: ['🚩', '❄️'], roast: '家人面前查无此人——你是地下党吗 🕶️' },
      { text: '知道有这个人，但没见过面', score: 1, tags: ['🧘'], roast: '光知道不见面——你是个传说吗 👻' },
      { text: '会解释自己的家庭情况，也问你是否准备好见面', score: 2, tags: ['🔥', '🛡️'], roast: '介绍家人不是进度条，知情和自愿更重要 📋' },
      { text: '在双方舒服的阶段正式介绍，并在家庭边界上主动支持你', score: 3, tags: ['🔥', '✨', '🛡️'], roast: '真正的融入不是被催着参加，而是有人守住边界 👨‍👩‍👦' }
    ]
  },
  {
    id: 18,
    question: '走在路上遇到熟人，他会？',
    emoji: '👋',
    options: [
      { text: '松手、拉开距离，假装你们只是普通朋友', score: 0, tags: ['🚩', '❄️'], roast: '突然隐藏关系会让人困惑，需要解释具体原因 👋' },
      { text: '不主动介绍，等对方问"这是？"才含糊说一句', score: 1, tags: ['🎯'], roast: '问一句答一句，你又不是犯罪嫌疑人 🚨' },
      { text: '自然介绍你的身份，不故意隐藏，也不会替你过度介绍', score: 2, tags: ['🔥', '🛡️'], roast: '公开坦然，也给你自己决定说多少的空间 👋' },
      { text: '会提前尊重你对称呼和公开程度的偏好，介绍时让你感到自在', score: 3, tags: ['🔥', '💘', '🍯'], roast: '被看见和被尊重可以同时发生 🏆' }
    ]
  },

  // ===== 日常相处 =====
  {
    id: 19,
    question: '陪你做一件他兴趣不大的事时，他是什么状态？',
    emoji: '🛍️',
    options: [
      { text: '全程刷手机，还不断催你快点结束', score: 0, tags: ['🎯', '🧘'], roast: '人到了，注意力和耐心却没到 ⏳' },
      { text: '愿意陪，但明显心不在焉，也没说自己能待多久', score: 1, tags: ['🧘'], roast: '勉强陪伴容易让两个人都累 🤖' },
      { text: '会认真参与一段时间，不懂的地方也愿意听你介绍', score: 2, tags: ['🔥', '🍯'], roast: '兴趣不同，也能给对方一段有质量的陪伴 👍' },
      { text: '提前商量时间和参与方式；需要休息会直说，也会关注你是否尽兴', score: 3, tags: ['🔥', '🛡️', '✨'], roast: '不必假装同好，清楚协商就能成为好搭子 ✨' }
    ]
  },
  {
    id: 20,
    question: '家务活怎么分配？',
    emoji: '🏠',
    options: [
      { text: '全是你在做，他觉得家务天然就该由你承担', score: 0, tags: ['🚩', '🎯'], roast: '共同生活却把劳动默认推给一个人，这不是公平分工 🧹' },
      { text: '"你让我做我就做"，但从不主动', score: 1, tags: ['🎯', '🧘'], roast: '叫才动一下——机器人还得按启动键呢 🤖' },
      { text: '有分工，他负责他不讨厌的（比如拖地洗碗）', score: 2, tags: ['🔥'], roast: '有分工但挑活儿——至少干了不是吗 🧼' },
      { text: '按时间和能力公平分工，定期复盘工作量，谁忙时另一个人多接一点', score: 3, tags: ['🔥', '🛡️', '🍯'], roast: '家务不是性别角色，也不是谁帮谁，而是共同维护生活 🧹' }
    ]
  },
  {
    id: 21,
    question: '他会做饭吗？',
    emoji: '🍳',
    options: [
      { text: '只会泡面，也不愿意学习或承担其他餐食工作', score: 0, tags: ['🎯'], roast: '厨艺可以不会，但共同生活的责任不能长期空缺 🍜' },
      { text: '会做几个简单的菜，味道一般但能吃', score: 1, tags: ['🎯'], roast: '能吃就行——生命维持餐级别 🥚' },
      { text: '做得一手好菜，经常下厨投喂你', score: 2, tags: ['🔥', '🍯'], roast: '下厨投喂——抓住胃就抓住心了 🍳' },
      { text: '愿意学习彼此爱吃的菜，也会共同承担采购、做饭和收拾', score: 3, tags: ['🔥', '💘', '🍯', '✨'], roast: '会不会做饭不是天赋考核，愿意一起承担才可持续 👨‍🍳' }
    ]
  },
  {
    id: 22,
    question: '周末他想干嘛？',
    emoji: '🎯',
    options: [
      { text: '打游戏/睡大觉，你的存在感约等于游戏里的NPC', score: 0, tags: ['🧘', '🎯'], roast: '你在他生活里像个NPC——存在但无关紧要 🕹️' },
      { text: '"你想去哪？我都可以"（实际上哪都不想去）', score: 1, tags: ['🧘'], roast: '"我都可以"翻译：我哪都不想去 🦥' },
      { text: '提前问彼此想做什么，再一起选一个轻松有趣的活动', score: 2, tags: ['🔥', '🤪', '👨‍🏫'], roast: '会规划，也没有替另一个人拍板 📋' },
      { text: '一起看两个人的精力，留出共同活动、各自时间和真正的休息', score: 3, tags: ['✨', '💘', '👨‍🏫'], roast: '好周末不是行程塞满，而是双方都恢复了电量 🗺️' }
    ]
  },
  {
    id: 23,
    question: '你被一段内容触动到眼眶发红，他什么反应？',
    emoji: '😭',
    options: [
      { text: '"至于吗？又不是真的"', score: 0, tags: ['🎯', '🚩'], roast: '共情能力为零——建议查查他是不是机器人 🤖' },
      { text: '看你一眼，继续玩手机', score: 1, tags: ['🧘', '🎯'], roast: '看一眼继续玩手机——你的眼泪没有手机好看 📱' },
      { text: '递纸巾+搂着你一起看，虽然他不理解你为啥哭', score: 2, tags: ['🔥', '🐶'], roast: '不理解但递纸巾搂你——态度满分 🧻' },
      { text: '先递纸巾、问你是想安静看完、聊聊，还是等缓过来一起吐槽剧情', score: 3, tags: ['🐶', '🍯', '🤪'], roast: '先接住感受，再用双方都舒服的幽默缓和 🧻' }
    ]
  },

  // ===== 信任与边界 =====
  {
    id: 24,
    question: '当你对某段手机互动感到不安时，他会？',
    emoji: '📲',
    options: [
      { text: '拒绝解释具体事情，还反过来用攻击结束对话', score: 0, tags: ['🚩', '❄️'], roast: '守住隐私没问题，但攻击和拒绝沟通不会消除疑虑 📵' },
      { text: '直接让你检查手机，但之后一直用这件事翻旧账', score: 1, tags: ['🎯'], roast: '临时验机没有解决边界分歧，反而留下新的怨气 👀' },
      { text: '愿意解释让你不安的具体事情，但不把交出全部隐私当作信任证明', score: 2, tags: ['🔥'], roast: '解释疑点和开放整部手机不是一回事 📱' },
      { text: '你们约定不秘密翻查，也不强迫交出私人聊天；出现疑点就直接谈', score: 3, tags: ['🔥', '🛡️'], roast: '信任靠一致规则积累，不靠手机检查权 ✅' }
    ]
  },
  {
    id: 25,
    question: '他和异性朋友的关系是？',
    emoji: '👯',
    options: [
      { text: '有好几个"红颜知己"，你还不能吃醋', score: 0, tags: ['🚩'], roast: '红颜知己好几个还不能吃醋——你是来修行的吗 🧘🚩' },
      { text: '有异性朋友但不太介绍你们认识', score: 1, tags: ['🎯'], roast: '有异性朋友但藏着掖着——不对劲 🤔' },
      { text: '有正常社交，也会遵守你们共同认可的边界', score: 2, tags: ['🔥', '🛡️'], roast: '朋友多少不是重点，行为边界是否一致更重要 👍' },
      { text: '关系透明但不过度汇报；遇到可能越界的情境会主动说明并讨论', score: 3, tags: ['💘', '🛡️', '🔥'], roast: '透明不等于逐条上交聊天记录，边界清楚就好 🐶' }
    ]
  },
  {
    id: 26,
    question: '你发现他给某个女生点赞/评论，你问他是谁，他？',
    emoji: '🔍',
    options: [
      { text: '"你管得着吗？"然后跟你吵一架', score: 0, tags: ['🚩', '❄️'], roast: '用攻击终止提问，只会让疑虑和冲突一起升级 🚩' },
      { text: '含糊其辞，说"就是个朋友"，不愿多说', score: 1, tags: ['❄️'], roast: '含糊其辞——越描越黑 🖤' },
      { text: '坦然解释是谁、什么关系，让你放心', score: 2, tags: ['🔥'], roast: '大大方方解释——这才是对的态度 ✅' },
      { text: '坦然说明关系和互动背景，也愿意讨论你的不安，同时保护第三方隐私', score: 3, tags: ['🔥', '💘', '🛡️'], roast: '解释清楚、回应感受，不必把别人的聊天隐私一起交出 📱' }
    ]
  },
  {
    id: 27,
    question: '他经济方面怎么样？',
    emoji: '💰',
    options: [
      { text: '经常找你借钱，借了不还还觉得理所当然', score: 0, tags: ['🚩'], roast: '找你借钱还不还——你不是女朋友是花呗 💸' },
      { text: 'AA制严格，一块钱都要算清楚', score: 1, tags: ['🎯'], roast: '一块钱都要AA——建议开个群收款 📊' },
      { text: '大方但不乱花，会为你们的未来存钱', score: 2, tags: ['🔥', '🛡️'], roast: '大方但有规划——会过日子的类型 💰' },
      { text: '共同支出透明、目标能协商，同时双方都保有合理的个人账户和决定权', score: 3, tags: ['🔥', '💘', '🛡️'], roast: '财务信任不是上交控制权，而是规则透明、责任对等 💳' }
    ]
  },

  // ===== 情绪价值 =====
  {
    id: 28,
    question: '你说"我好像胖了"，他会？',
    emoji: '⚖️',
    options: [
      { text: '"确实胖了，你该减肥了"', score: 0, tags: ['🚩', '🎯'], roast: '未经邀请评价身体，可能放大本来就存在的不安 🎯' },
      { text: '上下打量你一眼，沉默不语 😶', score: 1, tags: ['🎯'], roast: '沉默比说错更可怕——姐妹你还好吗 😶' },
      { text: '"哪有！我觉得刚刚好，抱着更舒服了"', score: 2, tags: ['🔥', '🍯'], roast: '"抱着更舒服"——这回答标准答案了 🍯' },
      { text: '不评价你的身材，先问这句话背后是焦虑、玩笑还是想获得具体支持', score: 3, tags: ['🔥', '🍯', '🛡️'], roast: '不急着否认或安排健身，先听懂真正的担心 💬' }
    ]
  },
  {
    id: 29,
    question: '你被老板骂了/考试考砸了/被老师批评了，很委屈，他会？',
    emoji: '😢',
    options: [
      { text: '"那肯定是你自己的问题啊"', score: 0, tags: ['🚩', '🎯'], roast: '不了解情况就归责，会让委屈叠加成孤立感 🚩' },
      { text: '"别想了都会过去的"——然后继续刷手机', score: 1, tags: ['🧘', '🎯'], roast: '敷衍式安慰+刷手机——安慰了个寂寞 📱' },
      { text: '认真听完，先确认你的感受，不急着站队或讲道理', score: 2, tags: ['🔥', '🐶'], roast: '先把委屈听完整，情绪才有落点 🫂' },
      { text: '问你想被安慰、一起复盘还是需要实际帮助，之后也会记得跟进', score: 3, tags: ['🔥', '🛡️', '👨‍🏫'], roast: '倾听、选择、跟进都有，支持不靠固定套餐 🛡️' }
    ]
  },

  // ===== 未来与承诺 =====
  {
    id: 30,
    question: '聊到未来的计划，他？',
    emoji: '🗺️',
    options: [
      { text: '"以后的事以后再说吧"——从没认真想过', score: 0, tags: ['🧘', '🎯'], roast: '活在当下型——翻译：根本没想过和你的未来 🫥' },
      { text: '有自己的计划，但好像没怎么把你规划进去', score: 1, tags: ['🎯'], roast: '他的未来规划像个单人游戏——你是NPC 🤷' },
      { text: '未来规划里有你，会跟你认真讨论你们以后的生活', score: 2, tags: ['🔥', '🛡️', '👨‍🏫'], roast: '规划里有彼此，也给双方充分参与的空间 🏠' },
      { text: '谈过价值观、城市、财务和生活方式，也会随着现实变化共同更新计划', score: 3, tags: ['💘', '🔥', '👨‍🏫'], roast: '未来不是单方面剧本，而是持续更新的共同方案 🗺️' }
    ]
  }
]

// ===== 主观加分题（独立一题，0-10分） =====
export const bonusQuestion = {
  id: 99,
  question: '抛开以上所有问题，凭你的直觉——你额外给他打几分？',
  emoji: '💗',
  subtitle: '有时候数据不能说明一切，你的直觉最准 ✨',
  maxScore: 10
}

// ===== Tag 映射表 =====
export const tagMap = {
  '🔥': { name: '细节回应者', icon: '🔥', desc: '能留意具体需要，也愿意把关心落到行动上' },
  '🛡️': { name: '稳定担当派', icon: '🛡️', desc: '遇事愿意协商、承担，也尊重伴侣的最终选择' },
  '🐶': { name: '亲密陪伴派', icon: '🐶', desc: '喜欢靠近与分享，能给出及时而温暖的回应' },
  '🎯': { name: '务实直球派', icon: '🎯', desc: '表达直接、重视效率，可以多确认对方当下需要' },
  '✨': { name: '仪式感大师', icon: '✨', desc: '把日子过成诗，每个节点都值得纪念' },
  '💘': { name: '高投入型', icon: '💘', desc: '很重视关系，也需要记得保留双方的个人空间' },
  '🧘': { name: '松弛节奏派', icon: '🧘', desc: '不急着推进，重要事项说清时间与承诺会更可靠' },
  '❄️': { name: '慢热冷静派', icon: '❄️', desc: '习惯先沉淀再表达，记得约定何时回来继续沟通' },
  '👨‍🏫': { name: '方案型伙伴', icon: '👨‍🏫', desc: '擅长分析和安排，也要先确认对方是否想听建议' },
  '🍯': { name: '语言表达派', icon: '🍯', desc: '会肯定、会表达，让在乎更容易被对方接收到' },
  '🤪': { name: '氛围担当', icon: '🤪', desc: '擅长用幽默松动紧张，但不会用玩笑跳过真实感受' },
  '🚩': { name: '边界待校准', icon: '🚩', desc: '部分场景容易忽略感受或边界，需要更直接地沟通' }
}

// ===== 计算五维画像：按场景题得分，而不是把人格标签当好坏 =====
export const dimensionQuestionMap = {
  '体贴度': [1, 2, 3, 4, 5, 28, 29],
  '浪漫度': [10, 11, 12, 13, 14],
  '安全感': [8, 9, 15, 16, 17, 18, 24, 25, 26, 27, 30],
  '幽默值': [4, 14, 19, 22, 23, 28],
  '坦诚度': [6, 7, 8, 9, 24, 25, 26, 27, 30]
}

export function computeDimensions(answers) {
  const dims = {}
  for (const [name, ids] of Object.entries(dimensionQuestionMap)) {
    const matched = answers.filter(answer => ids.includes(Number(answer.questionId)))
    if (!matched.length) {
      dims[name] = 50
      continue
    }
    const average = matched.reduce((sum, answer) => sum + Number(answer.score || 0), 0) / matched.length
    dims[name] = Math.round(18 + (average / 3) * 76)
  }
  return dims
}

const dimensionAdvice = {
  '体贴度': '回应前先确认“你想让我听你说，还是一起想办法？”，比默认替对方安排更准确。',
  '浪漫度': '把仪式感从消费和频率里拆出来，选一个双方都在意、能长期做到的小动作。',
  '安全感': '安全感不等于交出手机、工资卡或全天行程；把边界和承诺说清楚更重要。',
  '幽默值': '幽默可以缓和气氛，但先确认对方感受被听见，再开玩笑会更稳。',
  '坦诚度': '少用“没事”“随便”或沉默收尾，说明事实、感受、需要和下一次怎么做。'
}

export function buildDeepReport(answers) {
  const dims = computeDimensions(answers)
  const ranked = Object.entries(dims).sort((a, b) => b[1] - a[1])
  const [primary, secondary] = ranked
  const watch = ranked[ranked.length - 1]
  const answerById = new Map(answers.map(answer => [Number(answer.questionId), answer]))

  function evidenceFor(dimension, preferHigh) {
    const candidates = (dimensionQuestionMap[dimension] || [])
      .map(id => answerById.get(id))
      .filter(answer => answer?.text)
      .sort((a, b) => preferHigh ? Number(b.score) - Number(a.score) : Number(a.score) - Number(b.score))
    const answer = candidates[0]
    const question = answer && questions.find(item => item.id === Number(answer.questionId))
    return answer && question ? `第${question.id}题「${question.question}」，你选了“${answer.text}”。` : ''
  }

  return {
    primary: { name: primary[0], score: primary[1] },
    secondary: { name: secondary[0], score: secondary[1] },
    watch: { name: watch[0], score: watch[1] },
    summary: `本次较突出的是${primary[0]}，其次是${secondary[0]}；${watch[0]}是相对更值得继续观察的部分。这里比较的是情境回应，不是给一个人下定论。`,
    evidence: [evidenceFor(primary[0], true), evidenceFor(watch[0], false)].filter(Boolean),
    advice: dimensionAdvice[watch[0]],
    note: '本报告仅依据本次作答生成，不能替代现实沟通，也不构成心理、医学或关系决策建议。'
  }
}

// ===== 计算 Tag（归一化：稀有标签加权）=====
const tagWeights = (() => {
  const freq = {}
  questions.forEach(q => {
    q.options.forEach(opt => {
      (opt.tags || []).forEach(t => { freq[t] = (freq[t] || 0) + 1 })
    })
  })
  // 曝光频率校准：兼顾高频标签垄断与低频标签方差过大的问题
  const weights = {}
  for (const [t, n] of Object.entries(freq)) {
    weights[t] = 1 / Math.pow(n, 0.82)
  }
  return weights
})()

export function computeTopTag(answers) {
  const scores = {}
  answers.forEach(opt => {
    (opt.tags || []).forEach(t => {
      scores[t] = (scores[t] || 0) + (tagWeights[t] || 0.3)
    })
  })
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1])
  if (!sorted.length) return { key: '🎯', name: '神秘男友', icon: '❓', desc: '信息太少，AI 也无法判断' }
  const [key, score] = sorted[0]
  return { key, count: Math.round(score * 10) / 10, ...tagMap[key] }
}

// ===== 结果等级 =====
export const results = [
  {
    range: [90, 100],
    grade: 'S级',
    title: '🏆 高回应合伙人',
    subtitle: '多数场景里，他能兼顾关心、沟通与边界',
    description: '本次作答显示，他较常把关心落实为具体行动，也愿意协商和修复。这是很有价值的相处资源，但高分不等于关系保证，更不代表任何一方需要永远表现完美。继续保留彼此的选择权和个人空间，会比“满分人设”更可持续。',
    tags: ['#高回应', '#会协商', '#尊重边界'],
    color: '#FF6B9D',
    bgGradient: 'linear-gradient(135deg, #FF6B9D, #FFA0C4)',
    sticker: '👑'
  },
  {
    range: [70, 89],
    grade: 'A级',
    title: '💖 稳定回应者',
    subtitle: '整体回应稳定，少数场景仍可更直接地对齐需求',
    description: '他多数时候愿意听、愿意做，也能在现实条件里给出支持。偶尔反应慢、表达少或直接给方案，不必归因于性别，也不需要谁去“改造”谁；把期待说具体、确认彼此是否同意，通常比猜测更有效。',
    tags: ['#稳定回应', '#可以商量', '#共同调整'],
    color: '#FF8C69',
    bgGradient: 'linear-gradient(135deg, #FF8C69, #FFB899)',
    sticker: '🌟'
  },
  {
    range: [50, 69],
    grade: 'B级',
    title: '📝 回应有波动',
    subtitle: '有投入意愿，但不同情境里的表现不够一致',
    description: '他在一些场景里会给出关心和行动，另一些时候可能回避、敷衍或只按自己的方式解决。与其把他归类成“会不会谈恋爱”，不如找出具体分歧：是回应速度、隐私边界、家务分工，还是冲突后的修复方式。具体问题更容易被讨论。',
    tags: ['#回应波动', '#找具体场景', '#别靠猜'],
    color: '#FFB347',
    bgGradient: 'linear-gradient(135deg, #FFB347, #FFD18C)',
    sticker: '📚'
  },
  {
    range: [30, 49],
    grade: 'C级',
    title: '⚠️ 多项需求未对齐',
    subtitle: '本次较多选择显示回应不足、边界模糊或修复缺位',
    description: '这组选择提示，你们可能在关心方式、承诺、家务或隐私等方面缺少共同规则。它不能说明一个人“好或坏”，但值得把反复出现的具体事件拿出来谈：发生了什么、造成什么影响、下次各自愿意怎么做。只有口头承诺而长期没有行动，也是一条需要认真观察的信息。',
    tags: ['#需求未对齐', '#看持续行动', '#建立共同规则'],
    color: '#FFA07A',
    bgGradient: 'linear-gradient(135deg, #FFA07A, #FFC4A8)',
    sticker: '📋'
  },
  {
    range: [0, 29],
    grade: 'D级',
    title: '🚩 高风险互动信号',
    subtitle: '本次多个选择涉及持续忽视、控制或责任回避',
    description: '测试不能替你决定是否继续一段关系，但持续的羞辱、威胁、经济不诚信、强迫查看隐私或完全拒绝沟通，都不应被“直男”“不会表达”合理化。先看现实中的频率、影响和对方是否愿意改变；如果存在人身安全或强迫控制，优先联系可信任的人和当地支持资源。',
    tags: ['#关注现实行为', '#边界不是矫情', '#安全优先'],
    color: '#FF4757',
    bgGradient: 'linear-gradient(135deg, #FF4757, #FF7F8A)',
    sticker: '🏃‍♀️'
  }
]

export function getResult(score) {
  const clamped = Math.max(0, Math.min(100, score))
  return results.find(r => clamped >= r.range[0] && clamped <= r.range[1]) || results[results.length - 1]
}
