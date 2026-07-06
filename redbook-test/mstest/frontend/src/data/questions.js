// ===== 30 道闷骚指数测试题目 =====

export const questions = [
  // ===== 日常掩饰 (Q1-6) =====
  {
    id:1, question:'朋友聚会聊到暧昧话题，你的反应是？', emoji:'💬',
    options:[
      { text:'立刻转移话题，假装听不懂', score:0, tags:['😇'], roast:'装纯第一名——但你耳朵红了 👂' },
      { text:'假装淡定地听着，心里默默记笔记', score:1, tags:['🫣'], roast:'表面风平浪静，内心在开小会 📝' },
      { text:'加入讨论但保持优雅，偶尔说一句金句', score:2, tags:['😈'], roast:'优雅开车，车技一流还不留痕迹 🚗' },
      { text:'主导话题走向，越聊越深入', score:3, tags:['🐺'], roast:'你就是话题的油门，一脚踩到底 🏎️' }
    ]
  },
  {
    id:2, question:'看到帅哥/美女的身材照，你的第一反应？', emoji:'👀',
    options:[
      { text:'划走，假装没看到', score:0, tags:['😇','🙈'], roast:'手指划走了，眼球多停留了两秒 👀' },
      { text:'快速瞄一眼，然后假装在找别的东西', score:1, tags:['🫣'], roast:'"我在看背景"——你骗谁呢 🤥' },
      { text:'多看两眼，默默点个赞', score:2, tags:['😈','💭'], roast:'大胆点，喜欢看又不是什么坏事 👍' },
      { text:'保存到相册，说不定还会翻出来再看看', score:3, tags:['🐺','🔥'], roast:'相册里"参考素材"文件夹日益壮大 📁' }
    ]
  },
  {
    id:3, question:'同事/同学在群里发了张擦边表情包，你？', emoji:'📱',
    options:[
      { text:'立刻回复"不合适吧"并撤回', score:0, tags:['😇'], roast:'道德标兵来了，都让让 🚔' },
      { text:'已读不回，但偷偷存了', score:1, tags:['🫣','🙈'], roast:'已读不回+存图——全套闷骚操作 ✅' },
      { text:'回一个更擦边的表情包battle', score:2, tags:['😈','🔥'], roast:'表情包军备竞赛——你赢了 🏆' },
      { text:'建个小群单独讨论这个表情包的艺术性', score:3, tags:['🐺'], roast:'"艺术性讨论群"——群名我已经帮你想好了 🎨' }
    ]
  },
  {
    id:4, question:'逛街时看到内衣/情趣用品店，你？', emoji:'🛍️',
    options:[
      { text:'目不斜视快步走过', score:0, tags:['😇','🧊'], roast:'路过速度堪比百米冲刺 🏃' },
      { text:'用余光扫一眼，脚步不停', score:1, tags:['🫣'], roast:'余光扫描——人类最先进的偷看技术 📡' },
      { text:'大大方方走进去逛一圈', score:2, tags:['😈'], roast:'坦荡到让店员都害羞了 🫡' },
      { text:'不仅逛还拍照发给对象/闺蜜讨论', score:3, tags:['🐺','🔥'], roast:'你是来购物的还是来做测评的 📸' }
    ]
  },
  {
    id:5, question:'夜深人静一个人的时候，你最可能在干嘛？', emoji:'🌙',
    options:[
      { text:'看书/追剧/学习，正经事', score:0, tags:['😇'], roast:'真的吗？我不信.jpg 🤨' },
      { text:'刷社交媒体，偶然刷到一些"意外"内容多看两眼', score:1, tags:['🫣'], roast:'"偶然"——嗯，每次都很偶然 🎰' },
      { text:'有固定的小爱好，夜深了才是自己的时间', score:2, tags:['😈','💭'], roast:'"自己的时间"——懂的都懂 🌃' },
      { text:'深夜是灵感爆发期，什么都可能发生', score:3, tags:['🐺','🔥'], roast:'凌晨两点，你的另一个身份醒了 🦇' }
    ]
  },
  {
    id:6, question:'有人夸你"你好闷骚啊"，你的反应？', emoji:'😏',
    options:[
      { text:'"别瞎说！我哪有！"——立刻否认三连', score:0, tags:['😇','🙈'], roast:'否认三连——最经典的闷骚证词 🎭' },
      { text:'微微一笑不置可否', score:1, tags:['🫣'], roast:'这个笑容已经说明了一切 😊' },
      { text:'"谢谢夸奖"——大方承认', score:2, tags:['😈'], roast:'坦荡到让夸你的人接不住话了 💅' },
      { text:'"你还没见过我真正闷骚的一面呢"', score:3, tags:['🐺'], roast:'一句话让对方好奇心拉满 🎣' }
    ]
  },

  // ===== 隐秘欲望 (Q7-12) =====
  {
    id:7, question:'如果匿名发一条动态没人知道是你，会发什么？', emoji:'🎭',
    options:[
      { text:'发个日常吐槽，跟实名没什么区别', score:0, tags:['😇'], roast:'匿名了个寂寞——你太老实了 🫥' },
      { text:'问一个"朋友的问题"（其实就是你的问题）', score:1, tags:['🫣'], roast:'"我有个朋友..."——经典开局 👯' },
      { text:'发一个平时不敢说的秘密想法', score:2, tags:['😈','💭'], roast:'匿名功能终于派上用场了 🤫' },
      { text:'发完之后每隔两分钟刷新看评论', score:3, tags:['🐺','🔥'], roast:'两分钟刷新一次——比追剧还上头 📱' }
    ]
  },
  {
    id:8, question:'你手机里有一些"不方便给别人看"的内容吗？', emoji:'📱',
    options:[
      { text:'完全没有，手机随便翻', score:0, tags:['😇'], roast:'要么是真没有，要么是藏得好 🤔' },
      { text:'有一些但藏在很深的文件夹里', score:1, tags:['🫣'], roast:'文件夹路径：文件/工作/资料/参考/学习/随便/不重要/.隐藏 🗂️' },
      { text:'有一些，但好朋友大概知道', score:2, tags:['😈'], roast:'好闺蜜之间没有秘密——大概吧 🤝' },
      { text:'有不少，还有专门的整理分类', score:3, tags:['🐺','🔥'], roast:'还有分类管理？你这整理能力建议去当资料管理员 📚' }
    ]
  },
  {
    id:9, question:'你对自己的吸引力打几分？', emoji:'💋',
    options:[
      { text:'不知道自己有什么吸引力', score:0, tags:['😇','🙈'], roast:'谦虚过头了——你肯定有自己的魅力点 ✨' },
      { text:'6-7分吧，中规中矩', score:1, tags:['🫣'], roast:'中规中矩——但闷骚的灵魂加2分 📈' },
      { text:'8分，我觉得自己挺有魅力的', score:2, tags:['😈'], roast:'自信的人最有魅力——你已经是8分了 💯' },
      { text:'满分，我对自己有绝对自信', score:3, tags:['🐺','🔥'], roast:'自信女王/国王——这就是最高级的性感 👑' }
    ]
  },
  {
    id:10, question:'如果世界上没有道德约束，你最想尝试什么？', emoji:'🤔',
    options:[
      { text:'没什么特别想试的，现在挺好的', score:0, tags:['😇','🧊'], roast:'无欲无求——你是圣人吗 🙏' },
      { text:'想了一下觉得太刺激了，还是算了', score:1, tags:['🫣'], roast:'想了但不敢说——你的内心戏我看得到 🎬' },
      { text:'有一些大胆的想法但不方便说', score:2, tags:['😈','💭'], roast:'"不方便说"——最诱惑的三个字 🔥' },
      { text:'列个清单一个个体验过去', score:3, tags:['🐺','🔥'], roast:'还有清单？你的人生规划比我详细 📋' }
    ]
  },
  {
    id:11, question:'有人在你耳边轻声说话，你的反应？', emoji:'🫦',
    options:[
      { text:'立刻拉开距离，不习惯这么近', score:0, tags:['😇','🧊'], roast:'安全距离维护者——1.5米是底线 📏' },
      { text:'有点不好意思但不躲开', score:1, tags:['🫣'], roast:'表面淡定，心跳已过百 💓' },
      { text:'享受这种感觉，甚至会故意不躲', score:2, tags:['😈','🔥'], roast:'享受就享受呗，人之常情 😌' },
      { text:'你反而会靠近对方耳边回话', score:3, tags:['🐺'], roast:'反向操作——猎人变成了猎物 🎯' }
    ]
  },
  {
    id:12, question:'你做过最"闷骚"的事是什么？', emoji:'😳',
    options:[
      { text:'好像没有，我是个正经人', score:0, tags:['😇'], roast:'"正经人"——闷骚界的最高伪装 👔' },
      { text:'有一些但不好意思说出口', score:1, tags:['🫣','🙈'], roast:'欲言又止——闷骚本色出演 🎭' },
      { text:'偷偷做过一些事但没被发现过', score:2, tags:['😈'], roast:'完美犯罪——没人知道你的另一面 🕵️' },
      { text:'太多了，选不出最闷骚的', score:3, tags:['🐺','🔥'], roast:'"选不出"——你的闷骚履历太丰富了 📜' }
    ]
  },

  // ===== 幻想世界 (Q13-18) =====
  {
    id:13, question:'看影视剧时，你最容易被什么情节吸引？', emoji:'🎬',
    options:[
      { text:'感人的亲情/友情线', score:0, tags:['😇'], roast:'正能量小天使就是你 👼' },
      { text:'暧昧的拉扯——他看她一眼她就躲', score:1, tags:['🫣','💭'], roast:'暧昧拉扯——爽过直接表白 🔥' },
      { text:'激情戏和床戏——回放好几遍', score:2, tags:['😈','🔥'], roast:'回放键：今天又要辛苦了 ⏪' },
      { text:'越禁忌越上头——不被允许的感情最迷人', score:3, tags:['🐺'], roast:'禁忌之恋——你的审美很危险 🌶️' }
    ]
  },
  {
    id:14, question:'你的"理想型"更接近？', emoji:'💘',
    options:[
      { text:'阳光温暖的邻家型——靠谱最重要', score:0, tags:['😇'], roast:'阳光暖男——安全牌首选 ☀️' },
      { text:'优雅知性但偶尔有点小坏', score:1, tags:['🫣'], roast:'"偶尔有点坏"——这个"偶尔"是重点 📌' },
      { text:'危险迷人型——越难驾驭越心动', score:2, tags:['😈','🔥'], roast:'危险是最高级的魅力——你心动了 ⚡' },
      { text:'狂野不羁型——在床上能打架的那种', score:3, tags:['🐺'], roast:'"打架"——你说的最好是字面意思 🤼' }
    ]
  },
  {
    id:15, question:'如果对象突然变得非常主动，你的反应？', emoji:'🔥',
    options:[
      { text:'有点慌，不知道该怎么回应', score:0, tags:['😇','🙈'], roast:'幸福来得太突然，你还没准备好 🫣' },
      { text:'表面淡定内心狂喜', score:1, tags:['🫣'], roast:'外表是冰山，内心在火山爆发 🌋' },
      { text:'配合度100%，还会加码', score:2, tags:['😈','🔥'], roast:'加码——你比对方还会玩 🃏' },
      { text:'"终于等到这一天了"——你比ta还主动', score:3, tags:['🐺'], roast:'你等这一天等了多久了？⏳' }
    ]
  },
  {
    id:16, question:'你的手机搜索记录里最可能有什么？', emoji:'🔍',
    options:[
      { text:'工作/学习相关+日常百科', score:0, tags:['😇'], roast:'搜索记录干净得像三好学生的作业本 📖' },
      { text:'偶尔有一些"奇怪"的词但及时清除了', score:1, tags:['🫣'], roast:'及时清除——反侦察意识满分 🕵️' },
      { text:'有一些不太方便展示的内容', score:2, tags:['😈'], roast:'无痕浏览——人类最伟大的发明 👑' },
      { text:'无痕浏览是日常，搜索记录是绝密档案', score:3, tags:['🐺','🔥'], roast:'绝密档案——FBI都想找你取经 🔐' }
    ]
  },
  {
    id:17, question:'如果有一个"为所欲为日"，你会？', emoji:'🎪',
    options:[
      { text:'睡一整天——终于可以休息了', score:0, tags:['😇'], roast:'睡一整天——你对自由的想象力仅限于此？😴' },
      { text:'做一些平时不好意思做的事但不会太过分', score:1, tags:['🫣'], roast:'"不会太过分"——这个边界非常模糊 🤏' },
      { text:'把平时不敢尝试的都试一遍', score:2, tags:['😈','🔥'], roast:'人生清单——闷骚版 📝' },
      { text:'这一天会发生什么，我自己都不敢想', score:3, tags:['🐺'], roast:'你都不敢想——那就更有意思了 🎢' }
    ]
  },
  {
    id:18, question:'你觉得"刺激"和"安全感"哪个更重要？', emoji:'⚖️',
    options:[
      { text:'安全感最重要，稳定才能长久', score:0, tags:['😇'], roast:'稳定派——你的内心住着一个老干部 🧓' },
      { text:'安全感是基础，但偶尔需要一点刺激', score:1, tags:['🫣'], roast:'"偶尔"——这个词的弹性很大 🤌' },
      { text:'刺激和安全感缺一不可，要平衡', score:2, tags:['😈'], roast:'两手都要抓——成年人的智慧 🧠' },
      { text:'刺激才是生活的意义，安全感是无聊的借口', score:3, tags:['🐺'], roast:'冒险家——你的人生没有"无聊"这个词 🚀' }
    ]
  },

  // ===== 边界试探 (Q19-24) =====
  {
    id:19, question:'你和对象单独在家，窗帘拉上了，最可能发生什么？', emoji:'🏠',
    options:[
      { text:'一起追剧/做饭/聊天——正经日常', score:0, tags:['😇'], roast:'拉窗帘就是为了追剧——我信了 📺' },
      { text:'追着追着就不正经了——但点到为止', score:1, tags:['🫣'], roast:'"点到为止"——这个"点"在哪，你自己清楚 🎯' },
      { text:'窗帘拉上的那一刻就心照不宣了', score:2, tags:['😈','🔥'], roast:'心照不宣——最高级的默契 🤝' },
      { text:'拉窗帘是信号——接下来是另一个世界', score:3, tags:['🐺'], roast:'"另一个世界"——需要地图吗 🗺️' }
    ]
  },
  {
    id:20, question:'看到少儿不宜的内容被跳过了，你？', emoji:'⏭️',
    options:[
      { text:'完全不在意，翻过去就忘了', score:0, tags:['😇','🧊'], roast:'波澜不惊——你是真的不在意 🤷' },
      { text:'有点好奇但也不会特意去找', score:1, tags:['🫣'], roast:'"有点"好奇——这个"有点"我懂 🤏' },
      { text:'之后悄悄搜完整版来看', score:2, tags:['😈','🔥'], roast:'悄悄搜完整版——行动力满分 🏃' },
      { text:'已经熟到知道哪些平台有未删减版了', score:3, tags:['🐺'], roast:'你是资源导航吧——分享一下链接？🔗' }
    ]
  },
  {
    id:21, question:'朋友跟你讲ta的私密八卦，你？', emoji:'🫢',
    options:[
      { text:'"别别别，我不想知道这么多"', score:0, tags:['😇'], roast:'你是道德防线本线 🛡️' },
      { text:'嘴上说着不想听，身体前倾了', score:1, tags:['🫣'], roast:'嘴上说不要，身体很诚实——经典 🎭' },
      { text:'认真听完还追问细节', score:2, tags:['😈'], roast:'细节控——你是八卦学的博士生 🎓' },
      { text:'听完之后分享一个更劲爆的', score:3, tags:['🐺','🔥'], roast:'八卦互殴——高手过招 ⚔️' }
    ]
  },
  {
    id:22, question:'你觉得自己最容易被什么"攻陷"？', emoji:'🎯',
    options:[
      { text:'不太容易被攻陷，我有坚定的底线', score:0, tags:['😇'], roast:'铜墙铁壁——堡垒级别防御 🏰' },
      { text:'持之以恒的温柔攻势——慢慢来', score:1, tags:['🫣'], roast:'温水煮青蛙——不知不觉就被煮了 🐸' },
      { text:'直接热烈的追求——不玩虚的', score:2, tags:['😈','🔥'], roast:'直球进攻——你喜欢痛快的 ⚾' },
      { text:'不用攻——看对眼了随时沦陷', score:3, tags:['🐺'], roast:'"随时沦陷"——你的城门是敞开的 🏴' }
    ]
  },
  {
    id:23, question:'如果对象说"今晚换个玩法"，你？', emoji:'🎲',
    options:[
      { text:'装睡，假装没听到', score:0, tags:['😇','🙈'], roast:'装睡——人类最古老的逃避技能 💤' },
      { text:'问"换什么玩法"但语气有点犹豫', score:1, tags:['🫣'], roast:'欲拒还迎——嘴上犹豫眼神在发光 ✨' },
      { text:'"早就想换花样了"——拿出准备好的方案', score:2, tags:['😈','🔥'], roast:'准备好的方案——你是策划总监吧 📋' },
      { text:'"你先说你的，然后我说我的"——双向交流', score:3, tags:['🐺'], roast:'双向交流——成年人高效沟通的典范 💼' }
    ]
  },
  {
    id:24, question:'看到镜子里的自己，你会？', emoji:'🪞',
    options:[
      { text:'快速看一眼就走', score:0, tags:['😇'], roast:'路过——你和镜子是点头之交 👋' },
      { text:'整理一下仪容仪表', score:1, tags:['🫣'], roast:'体面人——但你可能错过了什么 😉' },
      { text:'认真打量——"嗯，今天也挺好看的"', score:2, tags:['😈'], roast:'自我欣赏——自信的人会发光 🌟' },
      { text:'摆几个pose——"我怎么这么好看"', score:3, tags:['🐺','🔥'], roast:'镜子面前开个唱——你就是自己的头号粉丝 🎤' }
    ]
  },

  // ===== 深夜模式 (Q25-30) =====
  {
    id:25, question:'凌晨两点睡不着，你最可能在？', emoji:'🕐',
    options:[
      { text:'焦虑明天的工作/学习', score:0, tags:['😇'], roast:'焦虑失眠——你太辛苦了 😔' },
      { text:'刷短视频——不知不觉两小时过去了', score:1, tags:['🫣'], roast:'短视频黑洞——你被算法拿捏了 📱' },
      { text:'想一些白天不方便想的人或事', score:2, tags:['😈','💭'], roast:'深夜脑内小剧场——门票免费 🎭' },
      { text:'"深夜档"才是你的主场——精力反而更旺盛', score:3, tags:['🐺'], roast:'夜行动物——你的时区跟别人不一样 🌃' }
    ]
  },
  {
    id:26, question:'如果有一个"24小时隐身"能力，你会？', emoji:'🫥',
    options:[
      { text:'去银行金库看看（但不会拿）', score:0, tags:['😇'], roast:'善良的隐身人——金库观光团 🏦' },
      { text:'去看看前任/暗恋对象在干嘛', score:1, tags:['🫣','💭'], roast:'看看就走——真的就走（大概）🚶' },
      { text:'做一些平时没勇气做的事', score:2, tags:['😈'], roast:'"没勇气做的事"——这个范围太大了 🌊' },
      { text:'24小时根本不够用——计划表超长', score:3, tags:['🐺'], roast:'计划表超长——你是有备而来的 📋' }
    ]
  },
  {
    id:27, question:'你觉得自己的"另一面"和日常形象差距有多大？', emoji:'🎭',
    options:[
      { text:'没什么差距，表里如一', score:0, tags:['😇'], roast:'表里如一——珍惜动物 🦄' },
      { text:'有一些差距但不大，认识久了才了解', score:1, tags:['🫣'], roast:'慢热型——熟人才知道的隐藏菜单 📖' },
      { text:'差距挺大的——熟人眼中的我完全不同', score:2, tags:['😈'], roast:'双面人生——你的朋友圈分"可见"和"不可见" 👥' },
      { text:'日常是角色扮演，深夜才是真实的自己', score:3, tags:['🐺'], roast:'白天奥斯卡，夜晚做自己——演技派 🏆' }
    ]
  },
  {
    id:28, question:'如果对象把你的私密话题告诉了朋友，你？', emoji:'😤',
    options:[
      { text:'非常生气——隐私是底线', score:0, tags:['😇'], roast:'底线明确——值得尊重 ✊' },
      { text:'有点不舒服但不会大吵', score:1, tags:['🫣'], roast:'隐忍派——但心里已经记了一笔 📝' },
      { text:'生气但也会反思是不是自己太保守了', score:2, tags:['😈'], roast:'自我反思——成熟的标志 🧘' },
      { text:'"你跟他们说了？那我也去问问他们的"', score:3, tags:['🐺'], roast:'对等原则——公平公正公开 ⚖️' }
    ]
  },
  {
    id:29, question:'身边的朋友大多是？', emoji:'👥',
    options:[
      { text:'正经靠谱——人以群分', score:0, tags:['😇'], roast:'正能量朋友圈——文明标兵 🏅' },
      { text:'什么样都有——但保持适当距离', score:1, tags:['🫣'], roast:'广结善缘——安全社交半径 📐' },
      { text:'有趣灵魂居多——偶尔会越界聊天', score:2, tags:['😈'], roast:'有趣灵魂——深夜情感热线 📞' },
      { text:'物以类聚——我们都很"丰富"', score:3, tags:['🐺','🔥'], roast:'"丰富"——你的朋友圈精彩程度五颗星 ⭐' }
    ]
  },
  {
    id:30, question:'如果有人给你一本"成人版探索指南"，你？', emoji:'📖',
    options:[
      { text:'礼貌拒绝——"不用了谢谢"', score:0, tags:['😇'], roast:'拒绝——但你的眼神瞟了一下封面 👀' },
      { text:'收下放好——"有空再看"', score:1, tags:['🫣'], roast:'"有空再看"=今晚就看 🌙' },
      { text:'当场翻开——"这第一章就很有深度"', score:2, tags:['😈','🔥'], roast:'当场研究——学术态度令人敬佩 🧐' },
      { text:'"这书只到入门级——我给你推荐进阶版"', score:3, tags:['🐺'], roast:'进阶版推荐——你是这个领域的博导 🎓' }
    ]
  }
]

export const bonusQuestion = {
  id:99, question:'抛开以上所有题目，你觉得自己的内心到底有多"闷骚"？',
  emoji:'🔥', subtitle:'自我认知往往比测试更准确——你有多了解自己？😏', maxScore:10
}

export const tagMap = {
  '😈':{ name:'闷骚王者', icon:'😈', desc:'人前正经，人后狂野。你的反差是最大魅力' },
  '🫣':{ name:'初级闷骚', icon:'🫣', desc:'偶尔想入非非，但大部分时候还算老实' },
  '🐺':{ name:'野王', icon:'🐺', desc:'压抑？你字典里根本没这个词' },
  '🔥':{ name:'欲望满满', icon:'🔥', desc:'内心有一团火，只是平时盖着盖子' },
  '😇':{ name:'表面正经', icon:'😇', desc:'看起来人畜无害——但也可能是伪装大师' },
  '🧊':{ name:'冷淡系', icon:'🧊', desc:'内心波澜不惊，或者藏得太深了' },
  '💭':{ name:'幻想家', icon:'💭', desc:'活在脑内小剧场里，剧情比现实精彩' },
  '🙈':{ name:'害羞型', icon:'🙈', desc:'不是没想法，只是不敢说' },
}

const tagWeights = (()=>{
  const freq={}
  questions.forEach(q=>{ q.options.forEach(o=>{ (o.tags||[]).forEach(t=>{freq[t]=(freq[t]||0)+1})})})
  const w={};for(const[t,n]of Object.entries(freq)) w[t]=1/Math.sqrt(n)
  return w
})()

export function computeTopTag(answers){
  const s={}
  answers.forEach(a=>{ (a.tags||[]).forEach(t=>{ s[t]=(s[t]||0)+(tagWeights[t]||0.3) }) })
  const sorted=Object.entries(s).sort((a,b)=>b[1]-a[1])
  if(!sorted.length) return { key:'😇',name:'神秘人',icon:'❓',desc:'数据太少，无法判断' }
  const [key,score]=sorted[0]
  return {key,count:Math.round(score*10)/10,...tagMap[key]}
}

export const results = [
  { range:[90,100],grade:'S级',title:'🐺 野王',subtitle:'压抑？你的字典里没这词',
    description:'恭喜你——你已经超越了闷骚，达到了"明骚"的境界。你对欲望的开放程度让人刮目相看，在你这儿，没有什么话题是禁忌。继续保持，你是朋友圈里最有趣的灵魂。只要注意场合就好——有些话还是留着跟对的人说吧 😏',
    tags:['#野王','#明骚本骚','#毫无压抑'],color:'#FF3B30',bgGradient:'linear-gradient(135deg,#8B0000,#FF3B30,#FF6B35)',sticker:'🐺' },
  { range:[70,89],grade:'A级',title:'😈 闷骚王者',subtitle:'表面淡定内心澎湃',
    description:'你是一个标准的闷骚王者——白天一本正经，晚上灵魂苏醒。你懂得在人前保持体面，但在对的人面前，你的另一面会让对方大吃一惊。这种反差不是伪装，是你精心维护的个人魅力。别压抑了，适当释放一下也挺好的 🔥',
    tags:['#闷骚王者','#反差萌','#人前人后两个样'],color:'#FF3B30',bgGradient:'linear-gradient(135deg,#CC2200,#FF3B30,#FF6B35)',sticker:'😈' },
  { range:[50,69],grade:'B级',title:'🫣 初级闷骚',subtitle:'偶尔想入非非，但还能hold住',
    description:'你有一点点闷骚的苗头，但总体来说还在可控范围内。夜深人静时你会有些大胆的想法，但天亮之后又恢复正经模式。这种偶尔的"越轨"其实很可爱——说明你是个有血有肉的人。试着多表达一点真实的自己？你会发现没那么可怕 🫣',
    tags:['#初级闷骚','#偶尔不正经','#还有发展空间'],color:'#FF6B35',bgGradient:'linear-gradient(135deg,#FF3B30,#FF6B35,#FF9F0A)',sticker:'🫣' },
  { range:[30,49],grade:'C级',title:'😇 表面正经',subtitle:'确实挺正经的——或者藏得太深',
    description:'你的测试结果显示你是真的比较正经——或者你把内心的小野兽藏得太好了，好到连你自己都找不到了。不管是哪一种，有一件事是确定的：偶尔放松一下不会影响你的形象。给自己一点自由的空间，你会发现生活更有趣 🤍',
    tags:['#表面正经','#可能是伪装大师','#偶尔放松'],color:'#D4A853',bgGradient:'linear-gradient(135deg,#A06030,#C08040,#E0B860)',sticker:'😇' },
  { range:[0,29],grade:'D级',title:'🧊 冰山',subtitle:'波澜不惊，内心住了个老干部',
    description:'你的内心像一座千年冰山——不动如山。你不是在压抑，你是真的不需要。可能你对这些话题天然免疫，也可能你需要一个特别对的人来融化这座冰山。无论哪种，做自己就好。不过...偶尔看看山那边的风景也不错？🧊',
    tags:['#冰山本山','#无欲无求','#等待对的人'],color:'#9CA3AF',bgGradient:'linear-gradient(135deg,#4A5060,#6B7280,#9CA3AF)',sticker:'🧊' }
]

export function getResult(score){
  const c=Math.max(0,Math.min(100,score))
  return results.find(r=>c>=r.range[0]&&c<=r.range[1])||results[results.length-1]
}
