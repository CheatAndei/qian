// ===== 30 道恋爱风格测试题目 =====
// 每题 4 选项, 分数 0-3, 附带 tag + roast

export function neutralizeText(value) {
  return String(value || '')
    .replaceAll('男朋友', '伴侣')
    .replaceAll('女朋友', '伴侣')
    .replaceAll('男生', '异性')
    .replaceAll('女生', '异性')
    .replaceAll('他', 'TA')
}

export const questions = [
  // ===== 关心他 (Caring for him) - Q1-5 =====
  {
    id: 1,
    question: '他辛辛苦苦做了顿饭，但真的很难吃，你会？',
    emoji: '🍳',
    options: [
      { text: '"宝贝...要不我们以后还是点外卖吧"', score: 0, tags: ['🧊', '🎭'], roast: '一刀毙命——他的厨师生涯还没开始就结束了 🔪' },
      { text: '硬着头皮吃完了，但表情管理完全失控', score: 1, tags: ['🙈', '🌸'], roast: '身体很诚实，脸上藏不住——但至少你吃完了 😂' },
      { text: '先肯定他的用心，再委婉说出哪里不太合口味', score: 2, tags: ['🌸', '💪'], roast: '既接住心意又没让味蕾说谎，沟通很稳 🍳' },
      { text: '一起研究怎么改，下次分工做一顿两个人都喜欢的', score: 3, tags: ['👑', '💋'], roast: '翻车菜谱直接升级成双人实验，问题解决了还有参与感 👩‍🍳💕' }
    ]
  },
  {
    id: 2,
    question: '他工作压力大到爆炸，连续加班一周了，你会？',
    emoji: '😫',
    options: [
      { text: '"加油哦你可以的"发完继续自己的聚会，之后也没再问', score: 0, tags: ['🧊', '🦋'], roast: '一句口号式鼓励，没接住他真正的压力 🎈' },
      { text: '每天发一条"辛苦了"的消息，但也就这样了', score: 1, tags: ['🙈', '💪'], roast: '每日一句辛苦了——AI客服的自动回复都比你有温度 🤖' },
      { text: '问他想倾诉、休息还是需要具体帮忙，再按他的回答支持', score: 2, tags: ['🌸', '🧸'], roast: '先问需求再行动，比一套固定安慰更贴合 🫂' },
      { text: '稳定关心，也提醒他别长期透支；需要时一起讨论可执行的减压办法', score: 3, tags: ['🌸', '👑', '💪'], roast: '有关心也有边界，支持不是替他接管生活 📊💕' }
    ]
  },
  {
    id: 3,
    question: '他加班到深夜还没吃晚饭，你会？',
    emoji: '🌙',
    options: [
      { text: '自己吃完大餐发了朋友圈，他点赞了你才知道他还在加班', score: 0, tags: ['🧊', '🎭'], roast: '朋友圈美食九宫格vs他空荡荡的胃——对比过于残忍 🍱😭' },
      { text: '发条"早点休息别太累"，然后你就睡了', score: 1, tags: ['🙈', '🦋'], roast: '你先睡了，他在工位独自emo——画面太凄凉 🌃' },
      { text: '点了他爱吃的外卖送到他公司，附上暖心小纸条', score: 2, tags: ['🌸', '💋'], roast: '外卖+纸条双杀——加班狗也能吃到爱心投喂 📝🍱' },
      { text: '先确认他方便收餐，再把合适的晚饭送到或帮他下单，忙完后问一句状态', score: 3, tags: ['🌸', '🧸', '💪'], roast: '实用支持不打扰，关心落地也尊重他的工作节奏 🍱💘' }
    ]
  },
  {
    id: 4,
    question: '他心情不好不想说话，你会？',
    emoji: '😔',
    options: [
      { text: '"又怎么了？有事说事别憋着"', score: 0, tags: ['👑', '🎭'], roast: '审问式关心——你是他女朋友还是他领导？🫡' },
      { text: '"那你自己静静吧"然后去干自己的事了', score: 1, tags: ['🧊', '🦋'], roast: '让他静静——结果一静就是一整天，他以为你消失了 👻' },
      { text: '安静坐在他旁边，靠着他肩膀，等他愿意开口', score: 2, tags: ['🌸', '🧸'], roast: '不说话但陪着——有时候陪伴就是最好的安慰 🫂' },
      { text: '问他想独处、安静陪伴还是被逗一逗，之后也记得回来确认状态', score: 3, tags: ['🌸', '👑', '🧸'], roast: '给选择也不消失，陪伴终于不用靠猜 🫂' }
    ]
  },
  {
    id: 5,
    question: '他忘记吃早餐就出门了，你会？',
    emoji: '🥐',
    options: [
      { text: '"饿一顿又不会死"', score: 0, tags: ['🧊', '👑'], roast: '一句轻描淡写，没有回应他当下的身体需要 🍞' },
      { text: '发消息说"记得吃早餐哦"，然后就没有然后了', score: 1, tags: ['🙈', '🦋'], roast: '提醒是提醒了，但早餐不会自己飞到他手里 🕊️' },
      { text: '第二天提前起来给他做了三明治塞包里', score: 2, tags: ['🌸', '🧸'], roast: '早起做三明治——这得是真爱才能战胜被窝 🥪💤' },
      { text: '偶尔顺手帮他准备，也和他商量一个能长期坚持的早餐方案', score: 3, tags: ['🌸', '💪', '👑'], roast: '一次照顾加一个可持续方案，不用谁长期扮演生活助理 🥪' }
    ]
  },

  // ===== 沟通 & 吵架 (Communication & fights) - Q6-10 =====
  {
    id: 6,
    question: '吵架的时候，你通常是？',
    emoji: '💢',
    options: [
      { text: '火力全开，什么难听说什么，吵完还要冷战三天', score: 0, tags: ['🚩', '👑', '🎭'], roast: '语言攻击+冷战三天——你是来谈恋爱还是来打仗的 💣' },
      { text: '冷战到底，他不道歉这事就没完', score: 1, tags: ['👑', '🧊'], roast: '冷战马拉松——看谁先冻死，你是北极科考队的吧 🧊' },
      { text: '吵完冷静半小时，然后主动去拉他的手说"我们不要吵了好不好"', score: 2, tags: ['🌸', '🧸'], roast: '冷战半小时就破功——爱情的温暖融化了北极冰 🤝💕' },
      { text: '暂停攻击，分别说清事实和感受，确认下一步怎么修复', score: 3, tags: ['🌸', '💪', '👑'], roast: '不是争输赢，而是把问题带回可解决的轨道 🤝' }
    ]
  },
  {
    id: 7,
    question: '他发消息给你，你多久回？',
    emoji: '📱',
    options: [
      { text: '心情好秒回，心情不好三天后回个"嗯"', score: 0, tags: ['🎭', '🧊'], roast: '三天回个"嗯"——你这回复速度比邮政平邮还慢 📮' },
      { text: '看到消息了，但经常意念回复——以为自己回了其实没回', score: 1, tags: ['🦋', '🙈'], roast: '意念回复——你的大脑5G但手指2G 📡' },
      { text: '基本秒回，忙的时候会先发"在忙，等下找你"', score: 2, tags: ['🌸', '💪'], roast: '忙前报备——成年人的体面，满分操作 👌' },
      { text: '按各自节奏回复；忙时会说明，双方也谈过什么情况需要及时联系', score: 3, tags: ['🌸', '💪', '👑'], roast: '安全感来自稳定预期，不来自实时行程播报 🏰' }
    ]
  },
  {
    id: 8,
    question: '他有心事但不想跟你说，你会？',
    emoji: '🤐',
    options: [
      { text: '"不说拉倒！以后都别跟我说了"摔门走人', score: 0, tags: ['🚩', '🎭', '👑'], roast: '摔门+放狠话——情绪过山车，他坐得有点晕 🎢' },
      { text: '不停追问，"你到底说不说？你是不是不爱我了？"', score: 1, tags: ['🎭', '🧸'], roast: '密集追问会让关心变成压力，也更难听到真实回答 🔦' },
      { text: '"等你准备好了可以找我；如果只想自己待会儿也可以"', score: 2, tags: ['🌸', '👑'], roast: '给空间也说明支持还在，边界清楚 🛋️' },
      { text: '尊重他暂时不说，同时约定晚点再确认一次，不把沉默变成失联', score: 3, tags: ['🌸', '🧸', '💪'], roast: '不追问、不消失，也不把关心做成审讯 🍵' }
    ]
  },
  {
    id: 9,
    question: '你发现自己错了，会主动道歉吗？',
    emoji: '🙇‍♀️',
    options: [
      { text: '道歉？不可能的，错的永远是他', score: 0, tags: ['🚩', '👑'], roast: '永远他对你错——你这字典里是不是没有"对不起"三个字 📕' },
      { text: '知道错了但嘴硬，用"行吧算我不好"敷衍过去', score: 1, tags: ['🐱', '👑'], roast: '"行吧算我不好"——这道歉比蚊子声音还小 🦟' },
      { text: '会认真说"对不起"，然后解释自己为什么那样做', score: 2, tags: ['🌸', '💪'], roast: '真诚道歉+解释——成年人处理问题的方式 ✅' },
      { text: '明确承认影响，询问怎么补救，并在下次用行动避免重复', score: 3, tags: ['🌸', '💪', '👑'], roast: '道歉不靠礼物覆盖，真正的修复是后续行动 ✅' }
    ]
  },
  {
    id: 10,
    question: '他跟你抱怨工作上的烦心事，你？',
    emoji: '🗣️',
    options: [
      { text: '"这有什么好烦的，我比你惨多了好吧"开始讲自己的事', score: 0, tags: ['🧊', '🎭'], roast: '他的烦恼刚开口就被你的比惨大赛碾压了——话题终结者 🏆' },
      { text: '"那你换个工作不就行了？"给建议但没在听', score: 1, tags: ['👑', '💪'], roast: '答案给得很快，但他的感受还没被听见 🗑️' },
      { text: '认真听完，先共情"确实好烦啊"，再问他需要什么帮助', score: 2, tags: ['🌸', '💪'], roast: '先共情再帮忙——情绪价值和实际支持双管齐下 🎯' },
      { text: '先完整听完，再问他想要共情、建议还是实际协助，按需要回应', score: 3, tags: ['🌸', '💪', '🧸'], roast: '不用礼物跳过情绪，先把人听明白 🎯' }
    ]
  },

  // ===== 浪漫 & 惊喜 (Romance & surprises) - Q11-15 =====
  {
    id: 11,
    question: '你会给他准备惊喜吗？',
    emoji: '🎁',
    options: [
      { text: '惊喜？他能不受到惊吓就不错了', score: 0, tags: ['🧊', '🙈'], roast: '惊吓比惊喜多——他跟你谈恋爱像在玩恐怖游戏 👻' },
      { text: '只在节日简单准备一下，平时很少主动表达', score: 1, tags: ['🦋', '💪'], roast: '表达集中在固定日期，日常回应感会弱一些 📅' },
      { text: '隔三差五会有小惊喜，比如他加班回家发现桌上多了他爱吃的夜宵', score: 2, tags: ['🌸', '😈'], roast: '不定期投喂——你的惊喜频率让他每天都有一点点期待 🌟' },
      { text: '知道他喜欢怎样被表达，偶尔准备一个贴合兴趣、不会打乱安排的小惊喜', score: 3, tags: ['💋', '🌸', '😈'], roast: '惊喜对准喜好，也给现实安排留了位置 🎁' }
    ]
  },
  {
    id: 12,
    question: '情人节/纪念日，你通常会？',
    emoji: '💐',
    options: [
      { text: '"要什么仪式感，都是商家骗钱的"——然后真的啥也不做', score: 0, tags: ['🧊', '💪'], roast: '仪式感=骗钱——你这逻辑让花店老板听了想哭 💐😢' },
      { text: '等他安排，他安排啥你配合啥，自己不费脑子', score: 1, tags: ['🙈', '🦋'], roast: '全程等他安排——你这不是过节是参加他策划的团建 🏕️' },
      { text: '提前问彼此期待，再共同选一个两个人都舒服的安排', score: 2, tags: ['🌸', '💋'], roast: '仪式感先对齐，不让任何一方独自猜题 🌹' },
      { text: '记住你们真正看重的纪念方式，也会轮流策划、量力而行', score: 3, tags: ['💋', '😈', '🌸'], roast: '有心意也可持续，这才是长期版本的浪漫 💝' }
    ]
  },
  {
    id: 13,
    question: '他随口说"这个好像挺有意思的"，过段时间你？',
    emoji: '🎀',
    options: [
      { text: '完全不记得他说过，你的大脑自动过滤了他的碎碎念', score: 0, tags: ['🧊', '🦋'], roast: '自动过滤系统太强了——他的碎碎念全被拦截在防火墙外 🔇' },
      { text: '有点印象，但忘了具体是啥，也懒得去翻聊天记录', score: 1, tags: ['🙈', '💪'], roast: '知道他说过但忘了是啥——你的记忆像金鱼，七秒一刷新 🐠' },
      { text: '偷偷记下来，过段时间买好放在他桌上，说"你上次不是说想要吗"', score: 2, tags: ['🌸', '🧸'], roast: '偷偷记+突然送——轻描淡写一句"你上次说的"，杀伤力极强 🎯💝' },
      { text: '会记住重要偏好，合适时提议一起体验，但不会把每句话都当任务', score: 3, tags: ['🧸', '🌸', '😈'], roast: '记得心愿，也允许一句随口感叹只是随口感叹 📝✨' }
    ]
  },
  {
    id: 14,
    question: '你多久会主动说一次"我爱你"或类似的话？',
    emoji: '💌',
    options: [
      { text: '基本不说，"说这些虚的干嘛，看行动"', score: 0, tags: ['🧊', '👑'], roast: '爱你在心口难开——但他的耳朵可能已经快饿死了 👂😢' },
      { text: '他逼你说你才说，而且说得飞快像在背课文', score: 1, tags: ['🐱', '🙈'], roast: '被逼着说像背课文——这种"我爱你"听着像在念经 📿' },
      { text: '偶尔说，在气氛特别好的时候会自然地说出来', score: 2, tags: ['🌸', '💋'], roast: '氛围感表白——在恰到好处的时刻，杀伤力加倍 ✨' },
      { text: '会用双方都舒服的频率表达，也能具体说出欣赏他的哪一点', score: 3, tags: ['🧸', '💋', '🌸'], roast: '比高频复读更有分量的，是具体而真诚的喜欢 💌' }
    ]
  },
  {
    id: 15,
    question: '你会给他写小作文/小纸条吗？',
    emoji: '✍️',
    options: [
      { text: '写小作文？你是小学生吗？从来没写过', score: 0, tags: ['🧊', '👑'], roast: '不喜欢文字表达没关系，但嘲讽对方喜欢的方式会让人退缩 🤐' },
      { text: '刚在一起的时候写过一两次，后来就懒了', score: 1, tags: ['🦋', '🙈'], roast: '热恋期限定技能，CD一过就再没开过——技能已过期 ⏰' },
      { text: '重要日子会写，比如生日/纪念日会附上走心的信', score: 2, tags: ['🌸', '💋'], roast: '重要节点愿意认真表达，文字会让心意更具体 ✉️' },
      { text: '在他重视的时刻用文字表达，内容具体，也尊重他是否喜欢公开展示', score: 3, tags: ['🧸', '🌸', '💋'], roast: '表达有内容，也不拿旁人的羡慕当评分标准 💌' }
    ]
  },

  // ===== 社交 & 边界 (Social & boundaries) - Q16-20 =====
  {
    id: 16,
    question: '你朋友圈里有他的存在吗？',
    emoji: '📸',
    options: [
      { text: '完全没有，你的朋友圈看起来精致得像单身博主', score: 0, tags: ['🚩', '🦋'], roast: '朋友圈立单身博主形象——他是你手机里的隐藏文件吗 📁' },
      { text: '有过一条合影，还是他拿你手机自己发的', score: 1, tags: ['🙈', '🐱'], roast: '他帮你发才算有——这合照是他自己争取来的权益 📱' },
      { text: '时不时发合照，配文不是什么甜言蜜语但能看出来你很开心', score: 2, tags: ['🌸', '💋'], roast: '自然流露的开心合照——比硬拗的甜言蜜语真实一百倍 📷' },
      { text: '你们谈过公开边界；想分享时自然分享，不发也不会把关系藏起来', score: 3, tags: ['🌸', '👑', '💪'], roast: '公开程度由两个人商量，不靠朋友圈数量证明感情 📸' }
    ]
  },
  {
    id: 17,
    question: '他和异性朋友正常交往（同事/同学），你的反应是？',
    emoji: '👯',
    options: [
      { text: '不行！要求TA删掉所有异性好友，也不许正常聊天', score: 0, tags: ['🚩', '👑', '🎭'], roast: '一刀切断正常社交，不能真正解决安全感问题 🚫' },
      { text: '嘴上说“没关系”，但每次看到TA和异性聊天就冷嘲热讽', score: 1, tags: ['🐱', '🎭'], roast: '表面同意、事后惩罚，会让双方都更难说真话 🌋' },
      { text: '正常交往没问题，但会让他知道你的底线在哪里', score: 2, tags: ['👑', '💪'], roast: '有底线但不过度——边界感拿捏得刚刚好 🎯' },
      { text: '尊重正常社交，也和他约定双方一致的边界；不舒服时直接说具体情境', score: 3, tags: ['🌸', '👑', '💪'], roast: '信任不是假装毫不在意，而是边界能被坦白讨论 🎯' }
    ]
  },
  {
    id: 18,
    question: '你会偷偷查他手机吗？',
    emoji: '📲',
    options: [
      { text: '定期检查，趁他洗澡的时候翻聊天记录、朋友圈点赞、转账记录', score: 0, tags: ['🚩', '🎭', '🧸'], roast: '秘密翻查会破坏隐私，也无法替代对不安来源的沟通 🕵️' },
      { text: '偶尔忍不住想看，但看完了又不敢说，自己生闷气', score: 1, tags: ['🐱', '🙈', '🎭'], roast: '偷看+生闷气——自己给自己加戏，演完还内耗 🎬😤' },
      { text: '基本不查，除非他行为明显异常才会问一句', score: 2, tags: ['👑', '💪'], roast: '不查但保持观察——信任为主，雷达不关 📡' },
      { text: '不秘密翻查；如果不安会直接谈原因，也认可双方都保有合理隐私', score: 3, tags: ['👑', '🌸', '💪'], roast: '安全感来自可讨论的边界，不来自手机检查权 📱' }
    ]
  },
  {
    id: 19,
    question: '他说周末想和兄弟去开黑/打球，你？',
    emoji: '🎮',
    options: [
      { text: '"又去？游戏重要我重要？今天你去了就别回来了"', score: 0, tags: ['🚩', '🧸', '🎭'], roast: '游戏我二选一——你这选择题比他高考还难 📝' },
      { text: '表面上答应了，但从他出门前到回家后一直闷闷不乐', score: 1, tags: ['🐱', '🎭'], roast: '嘴上放行脸上阴天——他出门带着负罪感，回家还得哄你 🌧️' },
      { text: '"去吧，玩得开心，我也安排自己的活动"', score: 2, tags: ['🦋', '💪'], roast: '各自有朋友和兴趣，关系不会因此掉线 🎮' },
      { text: '支持他和朋友相处，你也安排自己的时间，并约好之后留一段两人时间', score: 3, tags: ['🌸', '🦋', '💪'], roast: '各自有空间，也知道什么时候重新连接，双赢 🏆' }
    ]
  },
  {
    id: 20,
    question: '他因为工作需要还跟前任有联系（比如在一个行业），你？',
    emoji: '👻',
    options: [
      { text: '大闹一场，让他立刻换工作/删掉所有联系方式', score: 0, tags: ['🚩', '🎭', '👑'], roast: '逼他换工作——你是来谈恋爱还是来拆迁的 🏗️' },
      { text: '表面不说什么，但每次提到那个人你就开始各种试探+阴阳怪气', score: 1, tags: ['🐱', '🎭', '🙈'], roast: '试探+阴阳怪气——你的心理战打得比甄嬛传还精彩 📺' },
      { text: '"工作需要可以理解，但除了工作别的不聊，这是我的底线"', score: 2, tags: ['👑', '💪'], roast: '明确底线但不无理取闹——成年人处理前任的正确方式 ✅' },
      { text: '理解必要联系，也具体谈清工作外的边界；有变化时双方及时说明', score: 3, tags: ['👑', '🌸', '💪'], roast: '信任加上可执行边界，比强装大方更可靠 🎯' }
    ]
  },

  // ===== 日常相处 (Daily life) - Q21-25 =====
  {
    id: 21,
    question: '一起宅在家的时候，你通常在干嘛？',
    emoji: '🏠',
    options: [
      { text: '各玩各的手机，一整天说不到十句话', score: 0, tags: ['🧊', '🙈'], roast: '同屋不同频——你俩像在图书馆自习的陌生人 📚' },
      { text: '你在追剧他在打游戏，偶尔喊一句"饿了吗点外卖"', score: 1, tags: ['🦋', '💪'], roast: '合租式恋爱——各干各的，唯一的交集是外卖订单 🍕' },
      { text: '窝在一起看电影/拼乐高/做饭，做什么不重要，重要的是靠在一起', score: 2, tags: ['🌸', '🧸'], roast: '贴贴式宅家——做什么不重要，肉体接触不能断 🫂' },
      { text: '会商量一段共同活动，也允许各自安静做喜欢的事', score: 3, tags: ['🌸', '🧸', '💪'], roast: '亲密和独处都能被安排，宅家不用全程绑定 🏠' }
    ]
  },
  {
    id: 22,
    question: '他打游戏正嗨的时候，你想让他陪你，你会？',
    emoji: '🎮',
    options: [
      { text: '直接拔网线/关电源——"打什么游戏！陪我！"', score: 0, tags: ['🚩', '👑', '🎭'], roast: '拔网线？？你这操作比游戏里的BOSS还恐怖 😱' },
      { text: '在旁边碎碎念"还要多久啊…好了没…你都不理我…"', score: 1, tags: ['🧸', '🎭'], roast: '碎碎念攻击——他的血条没被敌人打掉，被你念没了 💔' },
      { text: '"打完这把来陪我哦"——然后自己去看剧等他', score: 2, tags: ['🌸', '🦋'], roast: '打完这把来找我——通情达理但存在感不丢 👀' },
      { text: '先确认这一局多久结束，约好结束后一起做什么；等待时你也安排自己的事', score: 3, tags: ['🌸', '💪', '👑'], roast: '需求说清、时间说准，不用靠围观和投喂换陪伴 🎮' }
    ]
  },
  {
    id: 23,
    question: '你们同居的话，家务怎么分？',
    emoji: '🧹',
    options: [
      { text: '“家务反正不是我的事”——什么都不做，等TA收拾', score: 0, tags: ['🚩', '👑'], roast: '共同生活却把劳动全部推给一个人，并不公平 🏨' },
      { text: '心情好的时候做一点，但做完了要让他夸你半小时', score: 1, tags: ['🐱', '🎭'], roast: '做一点家务求夸半小时——你的劳动力比奢侈品还贵 💎' },
      { text: '分工明确，你做饭他洗碗，你拖地他洗衣服，配合默契', score: 2, tags: ['💪', '👑'], roast: '分工明确像室友公约——高效但少了点温情 📋' },
      { text: '按时间和擅长动态分工，定期复盘工作量，谁忙时另一个人多接一点', score: 3, tags: ['🌸', '💪', '👑'], roast: '家务不是性别角色，也不是谁帮谁，而是共同维护生活 🧹' }
    ]
  },
  {
    id: 24,
    question: '他做了一件让你很不爽的事（比如迟到一小时），你？',
    emoji: '😤',
    options: [
      { text: '当场爆炸，当众大声数落他，让他难堪', score: 0, tags: ['🚩', '👑', '🎭'], roast: '公开羞辱会扩大伤害，却不太能解决迟到本身 💥' },
      { text: '全程黑脸不说话，他怎么哄都不理，冷战到第二天', score: 1, tags: ['🐱', '🧊'], roast: '黑脸+冷战叠buff——他的道歉在你面前像石沉大海 🪨' },
      { text: '"我真的很生气，但你先解释一下为什么迟到"——给机会但表明态度', score: 2, tags: ['👑', '💪'], roast: '生气但愿意听解释——你比他情绪管理课的老师还理性 📐' },
      { text: '听完原因后说明迟到带来的影响，再约定下次提前通知和补救方式', score: 3, tags: ['🌸', '💪', '👑'], roast: '不靠惩罚和公开威胁，规则说清楚更能避免重演 ⏰' }
    ]
  },
  {
    id: 25,
    question: '周末他想宅家躺平，你想出去玩，最后？',
    emoji: '⚖️',
    options: [
      { text: '"不出门就分手！"——逼他跟你出去，不达目的不罢休', score: 0, tags: ['🚩', '👑'], roast: '不出门就分手——你这谈判筹码也太重了吧 🏋️' },
      { text: '自己出去玩，但全程给他发消息阴阳怪气+晒好玩的好吃的', score: 1, tags: ['😈', '🦋'], roast: '自己玩+远程放毒——美食九宫格攻击，他躺着也中枪 📸' },
      { text: '商量着来：这周陪你出去，下周陪他宅家', score: 2, tags: ['🌸', '💪'], roast: '轮换制——一人让一步，感情进一步 👣' },
      { text: '一起看当天精力，把宅家和外出各留一段，也允许这次各自行动', score: 3, tags: ['🌸', '💪', '🦋'], roast: '折中不是把人安排明白，而是两个人都真心同意 ⚖️' }
    ]
  },

  // ===== 信任 & 忠诚 (Trust & loyalty) - Q26-30 =====
  {
    id: 26,
    question: '有异性同学或同事约你单独吃饭，你？',
    emoji: '🍽️',
    options: [
      { text: '去啊，不告诉他，问了就说"要你管"', score: 0, tags: ['🚩', '🦋', '🧊'], roast: '去了不告诉还说"要你管"——你这不是自由是双标 🚩' },
      { text: '去，但只轻描淡写提一句，刻意省略对方身份', score: 1, tags: ['🦋', '🙈'], roast: '刻意模糊关键信息，容易让普通社交也变得可疑 🤷' },
      { text: '自然告诉他这次见面的对象和缘由，也听听他是否有具体担心', score: 2, tags: ['🌸', '💪'], roast: '透明但不把正常社交交给对方审批，边界更清楚 🔍' },
      { text: '你们平时已约定一致的社交边界；正常赴约，行程变化会及时说明', score: 3, tags: ['🌸', '👑', '💪'], roast: '独立社交和关系透明可以同时存在 📖' }
    ]
  },
  {
    id: 27,
    question: '他突然说想看你的手机，你？',
    emoji: '🔍',
    options: [
      { text: '直接炸毛：你不信任我？！然后跟他大吵一架', score: 0, tags: ['🚩', '🎭', '👑'], roast: '看手机就炸毛——你手机里是藏了国家机密还是藏了备胎 🤔' },
      { text: '给他看但全程黑脸，之后翻旧账说他不信任你', score: 1, tags: ['🐱', '🎭'], roast: '给看但翻旧账——他的信任额度被你扣成负的了 📉' },
      { text: '先问他为什么不安，愿意解释具体事情，但不默认整部手机都要开放', score: 2, tags: ['👑', '💪'], roast: '解释疑点和交出全部隐私不是一回事 📱' },
      { text: '坦诚讨论触发点，并重申双方都不秘密检查、也不强迫交出私人聊天', score: 3, tags: ['👑', '🌸', '💪'], roast: '信任靠一致规则慢慢积累，不靠临时验机 ✅' }
    ]
  },
  {
    id: 28,
    question: '如果异地恋一个月见不到面，你会？',
    emoji: '💔',
    options: [
      { text: '一个月？三天不联系你就开始接触新的人了', score: 0, tags: ['🚩', '🦋', '🧊'], roast: '三天开始接触新人——你对他的爱保质期比酸奶还短 🥛' },
      { text: '嘴上说能坚持，但隔三差五跟他闹"你是不是不爱我了"', score: 1, tags: ['🧸', '🎭'], roast: '反复验证爱不爱，会挤掉本来可以讨论的具体需要 📞' },
      { text: '每天视频+分享日常，虽然想他但不耽误自己的生活节奏', score: 2, tags: ['💪', '🌸'], roast: '想他但不内耗——健康异地恋的范本 🌐' },
      { text: '一起约定联系频率和见面计划，也允许忙碌时调整，不用全天在线证明在乎', score: 3, tags: ['🧸', '🌸', '💪'], roast: '稳定预期加灵活调整，比打卡式亲密更可持续 🌐' }
    ]
  },
  {
    id: 29,
    question: '他最近回复变慢、有点冷淡，你第一反应是？',
    emoji: '🤔',
    options: [
      { text: '"他肯定有别人了！"——直接打电话过去骂他一顿', score: 0, tags: ['🚩', '🎭', '🧸'], roast: '直接定罪+开骂——你跳过侦查直接宣判，法官看了都摇头 ⚖️' },
      { text: '自己也冷回去，他冷你更冷，看谁先冻死', score: 1, tags: ['🐱', '🧊', '👑'], roast: '以冷制冷——你俩在比谁先冻成冰雕 🧊' },
      { text: '"你最近是不是有什么事？感觉你心情不太好"——先关心而不是质问他', score: 2, tags: ['🌸', '💪'], roast: '先关心不质问——你的情商温度比天气预报还准 🌡️' },
      { text: '描述你观察到的变化，直接问发生了什么，也尊重他暂时没精力详谈', score: 3, tags: ['🌸', '💪', '👑'], roast: '不先定罪、不绕着试探，问题才能真正开始聊 🕊️' }
    ]
  },
  {
    id: 30,
    question: '关于你们的未来，你的态度是？',
    emoji: '🗺️',
    options: [
      { text: '"开心一天是一天，想那么多干嘛"——从来没认真想过', score: 0, tags: ['🦋', '🙈', '🧊'], roast: '活在当下——他的未来在你规划里的存在感约等于空气 💨' },
      { text: '心里有规划但没跟他说过，怕给他压力', score: 1, tags: ['🙈', '🐱'], roast: '心里有规划但不说——你俩的未来在你脑内是加密文件 🔐' },
      { text: '认真跟他聊过未来，有共同目标，正在一步步实现', score: 2, tags: ['💪', '🌸'], roast: '有目标+在行动——你俩是恋爱合伙人，正在共创项目 📊' },
      { text: '谈过价值观、城市、财务和生活方式，也会随着现实变化一起更新计划', score: 3, tags: ['🌸', '💪', '👑'], roast: '未来不是单方面剧本，而是可持续更新的共同方案 🗺️' }
    ]
  }
]

// ===== 自评加分题（独立一题，0-10分） =====
export const bonusQuestion = {
  id: 99,
  question: '抛开以上所有题目，凭良心说——你给自己打几分？',
  emoji: '💗',
  subtitle: '有时候数据不能定义你，你的自我认知最准 ✨',
  maxScore: 10
}

// ===== Tag 映射表 =====
export const tagMap = {
  '👑': { name: '稳定主心骨', icon: '👑', desc: '有主见也有边界，愿意尊重彼此选择' },
  '🌸': { name: '温柔回应者', icon: '🌸', desc: '能接住情绪，也会问对方真正需要什么' },
  '🐱': { name: '慢热嘴硬派', icon: '🐱', desc: '表达较含蓄，熟悉后会慢慢放下防备' },
  '💋': { name: '表达力选手', icon: '💋', desc: '擅长把喜欢说出来，也懂得制造相处氛围' },
  '💪': { name: '独立合伙人', icon: '💪', desc: '保有自己的节奏，也愿意和对方并肩做决定' },
  '🧸': { name: '陪伴充电型', icon: '🧸', desc: '重视靠近与陪伴，也需要稳定的回应' },
  '😈': { name: '氛围制造机', icon: '😈', desc: '有创意、会玩梗，擅长让平凡日常变有趣' },
  '🦋': { name: '自由灵魂', icon: '🦋', desc: '来去如风，抓不住也不想被抓住' },
  '🚩': { name: '边界待校准', icon: '🚩', desc: '压力下容易用试探或控制换安全感' },
  '🧊': { name: '低频回应派', icon: '🧊', desc: '情绪表达偏少，更习惯用行动或空间来处理' },
  '🎭': { name: '情绪直觉派', icon: '🎭', desc: '感受来得快，需要练习把情绪翻译成需求' },
  '🙈': { name: '慢处理型', icon: '🙈', desc: '需要时间理清想法，约定回来沟通会更安心' }
}

// ===== 计算五维画像：按场景题得分，而不是把人格标签当好坏 =====
export const dimensionQuestionMap = {
  '体贴度': [1, 2, 3, 4, 5, 10],
  '浪漫度': [11, 12, 13, 14, 15],
  '安全感': [16, 17, 18, 19, 20, 26, 27, 28, 29],
  '趣味度': [4, 11, 12, 21, 22, 25],
  '坦诚度': [6, 7, 8, 9, 10, 23, 24, 26, 27, 30]
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
  '体贴度': '关心前先问一句“你现在更想被听见，还是一起想办法？”',
  '浪漫度': '仪式感不必追求频率，记住彼此真正在意的小事更有效。',
  '安全感': '把试探、查看或阴阳怪气换成可直接回应的请求，例如“我需要知道我们对边界的理解一致”。',
  '趣味度': '保留一个两个人都享受的小玩法，不需要把每次相处都安排成节目。',
  '坦诚度': '有分歧时用“事实—感受—需要—下一步”说清楚，也给对方完整回应的空间。'
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
    return answer && question ? `第${question.id}题「${neutralizeText(question.question)}」，你选了“${neutralizeText(answer.text)}”。` : ''
  }

  return {
    primary: { name: primary[0], score: primary[1] },
    secondary: { name: secondary[0], score: secondary[1] },
    watch: { name: watch[0], score: watch[1] },
    summary: `你的主线是${primary[0]}，其次是${secondary[0]}。这表示你更容易在这两类场景里给出积极回应；${watch[0]}是本次相对更值得留意的部分。`,
    evidence: [evidenceFor(primary[0], true), evidenceFor(watch[0], false)].filter(Boolean),
    advice: dimensionAdvice[watch[0]],
    note: '结果只根据本次情境选择生成，它描述回应习惯，不是人格诊断或关系结论。'
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
  if (!sorted.length) return { key: '🌸', name: '温柔回应者', icon: '🌸', desc: '信息较少，暂时无法形成稳定风格判断' }
  const [key, score] = sorted[0]
  return { key, count: Math.round(score * 10) / 10, ...tagMap[key] }
}

// ===== 结果等级 =====
export const results = [
  {
    range: [90, 100],
    grade: 'S级',
    title: '👑 高回应合伙人',
    subtitle: '多数场景里，你能同时照顾感受与边界',
    description: '本次作答显示，你较常用沟通、协商和具体行动回应关系问题。这是成熟的相处资源，但也不需要每次都做满分答卷：表达自己的需要，和照顾对方同样重要。',
    tags: ['#高回应', '#有边界', '#共同成长'],
    color: '#A78BFA',
    bgGradient: 'linear-gradient(135deg, #A78BFA, #C4B5FD)',
    sticker: '👑'
  },
  {
    range: [70, 89],
    grade: 'A级',
    title: '💎 稳定回应者',
    subtitle: '整体稳定，少数场景还可以说得更直接',
    description: '你多数时候愿意回应、倾听和协商，也能保留自己的节奏。压力下偶尔出现嘴硬、试探或暂时回避很常见，重点是说明何时回来继续聊，而不是要求自己始终完美。',
    tags: ['#稳定沟通', '#保留自我', '#会修复'],
    color: '#C08497',
    bgGradient: 'linear-gradient(135deg, #C08497, #D4A8B4)',
    sticker: '💎'
  },
  {
    range: [50, 69],
    grade: 'B级',
    title: '🌟 探索中回应者',
    subtitle: '有回应意愿，但不同场景下的稳定度有差异',
    description: '你会表达喜欢，也有想要解决问题的时候；但当不安或疲惫出现，可能会改用冷处理、试探或少说一点。不必给自己贴标签，先找出哪类场景最容易失速，再练习一个更清晰的表达就好。',
    tags: ['#节奏波动', '#愿意调整', '#找到触发点'],
    color: '#F59E0B',
    bgGradient: 'linear-gradient(135deg, #F59E0B, #FBBF24)',
    sticker: '🌟'
  },
  {
    range: [30, 49],
    grade: 'C级',
    title: '📝 沟通待对齐',
    subtitle: '当下更容易先保护自己，再处理关系问题',
    description: '这组选择显示，在冲突、边界或回应压力下，你较容易退开、试探或让对方猜。这不等于你“不适合恋爱”，但这些方式可能让双方更难理解彼此。可以从一件小事开始：说清当时的感受、需要，以及你希望的下一步。',
    tags: ['#沟通待对齐', '#少让对方猜', '#从小事练习'],
    color: '#F87171',
    bgGradient: 'linear-gradient(135deg, #F87171, #FCA5A5)',
    sticker: '📝'
  },
  {
    range: [0, 29],
    grade: 'D级',
    title: '⚠️ 高压回应模式',
    subtitle: '本次多个选择指向冷处理、控制或激烈反应',
    description: '这份结果不能判定一段关系的好坏，但它提醒：如果试探、翻查、威胁或长时间失联成为固定模式，彼此都会比较累。先停下一次自动反应，把“你必须……”换成“当……发生，我会不安，我希望……”。如果存在人身安全问题，优先向可信任的人求助。',
    tags: ['#高压模式', '#先停一停', '#把需要说清'],
    color: '#9CA3AF',
    bgGradient: 'linear-gradient(135deg, #9CA3AF, #D1D5DB)',
    sticker: '⚠️'
  }
]

export function getResult(score) {
  const clamped = Math.max(0, Math.min(100, score))
  return results.find(r => clamped >= r.range[0] && clamped <= r.range[1]) || results[results.length - 1]
}
