// 隐藏反差值 V2：30 道情境题 + 1 道自评。
// 结果只描述表达方式与场景差异，不评价人格高低，也不作心理诊断。

export const MODEL_VERSION = 'contrast-v2.0'

export const DIMENSIONS = [
  { key: 'contrast', label: '场景反差', short: '反差', target: 50, high: '你会根据熟悉度切换明显不同的状态', low: '你在不同场景里的表现较为一致' },
  { key: 'expression', label: '表达主动', short: '表达', target: 55, high: '你愿意主动让别人看到真实想法', low: '你更习惯先确认安全感，再逐步表达' },
  { key: 'playfulness', label: '新鲜玩法', short: '新鲜', target: 55, high: '你容易被新点子、幽默和即兴体验激活', low: '你更偏爱熟悉、稳定、可预期的体验' },
  { key: 'boundary', label: '边界感知', short: '边界', target: 85, high: '你很重视场合、同意与隐私边界', low: '兴致上来时，你可能需要多确认一步他人的感受' },
]

export const DIM_KEYS = DIMENSIONS.map((dimension) => dimension.key)
export const DIMENSION_MAP = Object.fromEntries(DIMENSIONS.map((dimension) => [dimension.key, dimension]))

const RESPONSE_PROFILES = {
  steady: [18, 40, 28, 94],
  observer: [62, 24, 46, 90],
  slowBloom: [84, 28, 54, 91],
  warm: [60, 66, 52, 93],
  direct: [28, 88, 56, 91],
  privateCreator: [90, 30, 94, 85],
  playful: [58, 72, 95, 83],
  switcher: [91, 79, 73, 87],
  contextReader: [68, 50, 48, 98],
  open: [34, 84, 71, 89],
  spontaneous: [79, 91, 91, 66],
  balanced: [48, 58, 61, 91],
}

function dimensionsFrom(profile) {
  return Object.fromEntries(DIM_KEYS.map((key, index) => [key, RESPONSE_PROFILES[profile][index]]))
}

function option(id, text, score, profile, feedback) {
  return {
    id,
    text,
    score,
    profile,
    tags: [profile],
    dimensions: dimensionsFrom(profile),
    roast: feedback,
  }
}

function q(id, question, emoji, choices) {
  return { id, question, emoji, options: choices }
}

export const questions = [
  q(1, '刚到一个不太熟的聚会，你通常会？', '💬', [
    option('q01_a', '先找个舒服的位置，安静听大家聊', 0, 'steady', '你不急着抢镜，稳定感本身就是存在感'),
    option('q01_b', '先观察气氛，找到合适的话题再加入', 1, 'observer', '你会先读懂现场，再决定打开到哪一档'),
    option('q01_c', '跟身边的人聊起来，熟了就自然放松', 2, 'warm', '你的热场方式不张扬，但很容易让人放松'),
    option('q01_d', '前十分钟安静，熟起来后像换了个人', 3, 'switcher', '慢热只是加载过程，熟悉后才是完整版'),
  ]),
  q(2, '群聊里突然出现一个很冷的梗，你会？', '📱', [
    option('q02_a', '看懂了也不一定接，让话题自然过去', 0, 'contextReader', '你更在意场合是否合适，不必每个梗都接'),
    option('q02_b', '默默收藏，等遇到懂的人再用', 1, 'observer', '你的幽默有自己的投放名单'),
    option('q02_c', '顺手补一句，让这个梗成功落地', 2, 'playful', '你很会给聊天增加一点刚好的趣味'),
    option('q02_d', '连续接梗，把群聊带进新剧情', 3, 'spontaneous', '灵感一来，你很容易成为现场编剧'),
  ]),
  q(3, '临时被点名上台或发言，你的真实状态？', '🎙️', [
    option('q03_a', '按准备好的内容说完，稳稳下台', 0, 'steady', '你相信稳定完成比临场炫技更重要'),
    option('q03_b', '上台前紧张，上台后反而越来越顺', 1, 'slowBloom', '你的状态需要一点启动时间'),
    option('q03_c', '很快进入状态，也愿意表达自己的看法', 2, 'direct', '被看见不会让你退缩，清楚表达更重要'),
    option('q03_d', '现场发挥通常比准备稿更有意思', 3, 'playful', '即兴会激活你的创造力'),
  ]),
  q(4, '你的公开动态和仅好友可见内容，差别大吗？', '🪟', [
    option('q04_a', '差别不大，我在不同地方都差不多', 0, 'open', '你不太需要维护多套人设'),
    option('q04_b', '公开内容克制一些，熟人圈更日常', 1, 'contextReader', '你会根据关系距离调整信息浓度'),
    option('q04_c', '熟人圈会出现很多公开区看不到的我', 2, 'slowBloom', '信任感会解锁你的隐藏频道'),
    option('q04_d', '像两个频道，风格和内容都很不一样', 3, 'privateCreator', '你的不同表达面向各有完整世界'),
  ]),
  q(5, '别人突然夸你“跟想象中很不一样”，你会？', '✨', [
    option('q05_a', '问清楚哪里不一样，认真听听', 0, 'balanced', '你愿意把反馈当作认识自己的镜子'),
    option('q05_b', '有点意外，但会默默记住这句话', 1, 'observer', '你对他人眼中的自己保持着好奇'),
    option('q05_c', '笑着承认：熟了之后确实不太一样', 2, 'warm', '你能自然接住自己的反差'),
    option('q05_d', '很开心，说明对方终于看到隐藏版本', 3, 'switcher', '被看见完整的一面，会让你很有共鸣'),
  ]),
  q(6, '朋友让你选一首最像自己的歌，你会选？', '🎧', [
    option('q06_a', '常听、耐听、不会出错的一首', 0, 'steady', '你偏爱能长期相处的稳定质感'),
    option('q06_b', '歌词很懂我，但不一定告诉别人原因', 1, 'observer', '有些共鸣适合留在自己的耳机里'),
    option('q06_c', '曲风和我平时给人的感觉有点反差', 2, 'slowBloom', '你的审美会透露日常形象之外的一面'),
    option('q06_d', '选一首能让全场重新认识我的歌', 3, 'switcher', '你偶尔也享受一次有分寸的形象翻面'),
  ]),
  q(7, '如果有个没人认识你的匿名账号，你更可能？', '🎭', [
    option('q07_a', '发的内容和日常账号差不多', 0, 'open', '换不换名字，你表达的核心都很一致'),
    option('q07_b', '记录一些不适合公开展开的小想法', 1, 'contextReader', '你会为不同内容选择合适的容器'),
    option('q07_c', '认真经营一个完全不同的兴趣方向', 2, 'privateCreator', '你的隐藏兴趣值得拥有自己的空间'),
    option('q07_d', '尝试新的表达风格，看自己还能成为什么样', 3, 'playful', '匿名感会放大你的探索欲，而不是改变底线'),
  ]),
  q(8, '手机桌面和收藏夹，哪一个更像真实的你？', '📂', [
    option('q08_a', '都差不多，实用和清晰最重要', 0, 'steady', '你的数字空间也偏向清楚直接'),
    option('q08_b', '桌面很整齐，收藏夹内容丰富很多', 1, 'observer', '外部秩序和内部好奇可以同时存在'),
    option('q08_c', '收藏夹像一张只有我懂的兴趣地图', 2, 'privateCreator', '你会长期养成属于自己的内容宇宙'),
    option('q08_d', '每隔一阵就大换风格，看当下心情', 3, 'playful', '你喜欢让数字空间跟着状态更新'),
  ]),
  q(9, '尝试和平时完全不同的穿搭时，你更在意？', '🧥', [
    option('q09_a', '舒服自然，不需要别人注意到变化', 0, 'steady', '你把自己的体感放在外部目光之前'),
    option('q09_b', '先在低风险场合试试，看自己习不习惯', 1, 'contextReader', '你会用小范围实验确认舒适边界'),
    option('q09_c', '让熟人看到后有一点惊喜就很好', 2, 'warm', '你喜欢温和地展示新的自己'),
    option('q09_d', '既然换风格，就想把完整效果做出来', 3, 'direct', '你一旦决定表达，就不太愿意只做半套'),
  ]),
  q(10, '拍合照时，你通常是哪一种？', '📷', [
    option('q10_a', '自然站好，留下记录就行', 0, 'steady', '你更在意当下，而不是每张照片都出片'),
    option('q10_b', '一开始有点拘谨，多拍几张会放松', 1, 'slowBloom', '镜头前的你也需要一个熟悉过程'),
    option('q10_c', '会主动找角度，也帮大家调整状态', 2, 'warm', '你愿意让自己和身边的人都更自在'),
    option('q10_d', '普通合照不够，会临时设计一个特别版本', 3, 'playful', '你很会把记录变成共同创作'),
  ]),
  q(11, '你最容易喜欢哪类影视角色？', '🎬', [
    option('q11_a', '稳定可靠，做事让人放心的角色', 0, 'steady', '可预期的力量对你很有吸引力'),
    option('q11_b', '话不多，但细节里很有层次的角色', 1, 'observer', '你擅长从细节识别没有说出口的部分'),
    option('q11_c', '看似普通，关键时刻突然翻面的角色', 2, 'switcher', '你会被有依据的反差打动'),
    option('q11_d', '脑洞很大，总能打破常规的角色', 3, 'playful', '不可预测的创造力会持续吸引你'),
  ]),
  q(12, '收到一条很长的真诚消息，你会怎么回复？', '✉️', [
    option('q12_a', '认真读完，用简洁但明确的话回应', 0, 'direct', '你不靠字数证明在意，清楚回应就是尊重'),
    option('q12_b', '先消化一会儿，想好之后再回复', 1, 'contextReader', '你希望重要回应经过思考，而不是即时交差'),
    option('q12_c', '文字不一定很多，但会补充具体行动', 2, 'warm', '你的表达更相信持续行动'),
    option('q12_d', '平时话少，这次会写出对方没见过的认真', 3, 'slowBloom', '重要关系会让你的表达深度明显升级'),
  ]),
  q(13, '突然对一个新领域上头时，你会？', '🧩', [
    option('q13_a', '先了解基础，再决定要不要投入', 0, 'contextReader', '你不会把一时兴奋直接当长期承诺'),
    option('q13_b', '安静研究一阵，成果出来再告诉别人', 1, 'privateCreator', '你的兴趣常常先在后台悄悄生长'),
    option('q13_c', '边学边分享，找同好一起交流', 2, 'warm', '共同学习会让你的兴趣更有续航'),
    option('q13_d', '迅速做出一个作品或挑战计划', 3, 'playful', '把好奇变成行动，是你最自然的学习方式'),
  ]),
  q(14, '和朋友旅行时，你更像哪种队友？', '🧭', [
    option('q14_a', '按基础计划走，留足休息时间', 0, 'steady', '稳定节奏能让你真正享受旅程'),
    option('q14_b', '提前查细节，但现场不一定说很多', 1, 'observer', '你的准备常常藏在顺畅体验背后'),
    option('q14_c', '会照顾大家节奏，也愿意接受临时变化', 2, 'warm', '你擅长在计划和人的感受之间调节'),
    option('q14_d', '看到有趣支线就想带大家一起拐过去', 3, 'playful', '你很容易发现攻略之外的惊喜'),
  ]),
  q(15, '熟人说“你原来这么会讲段子”，你会？', '🎤', [
    option('q15_a', '笑一下，觉得只是刚好碰上合适话题', 0, 'balanced', '你不会急着把一次表现变成固定标签'),
    option('q15_b', '只在熟人面前这样，外面还是比较安静', 1, 'slowBloom', '你的幽默需要信任感供电'),
    option('q15_c', '承认自己一直会，只是平时没必要展示', 2, 'direct', '你知道自己有哪些能力，也不急着证明'),
    option('q15_d', '继续发挥，让对方见识完整版本', 3, 'switcher', '被打开开关之后，你很难只展示一小段'),
  ]),
  q(16, '原定计划临时取消，多出半天空白，你会？', '🕰️', [
    option('q16_a', '回到熟悉安排，好好休息或处理小事', 0, 'steady', '空白时间对你来说也是一种恢复'),
    option('q16_b', '先看看附近有什么，再慢慢决定', 1, 'observer', '你愿意探索，但不需要立刻把时间排满'),
    option('q16_c', '约一个熟人做件平时想做的小事', 2, 'warm', '你会把变化转成一段舒服的共同经历'),
    option('q16_d', '把它当彩蛋，临时开启完全不同的安排', 3, 'spontaneous', '意外空白会迅速点亮你的即兴模式'),
  ]),
  q(17, '面对一个没试过、但风险可控的新体验，你？', '🛝', [
    option('q17_a', '如果兴趣不大，会坦然不参加', 0, 'steady', '拒绝不感兴趣的事，也是清楚的自我选择'),
    option('q17_b', '先了解规则和退出方式，再决定', 1, 'contextReader', '你愿意尝试，也会先确认可控边界'),
    option('q17_c', '有人同行、信息清楚的话愿意试试', 2, 'balanced', '陪伴和信息会提高你的探索安全感'),
    option('q17_d', '只要边界明确，通常会想亲自体验', 3, 'playful', '你的好奇心建立在清楚边界之上'),
  ]),
  q(18, '脑中突然出现一个有点怪但有趣的点子，你会？', '💡', [
    option('q18_a', '记下来，不一定马上做', 0, 'observer', '你会先给灵感一个安全的暂存区'),
    option('q18_b', '先自己推演，确认它不是一时冲动', 1, 'privateCreator', '你的创意常在安静打磨后才出现'),
    option('q18_c', '找懂的人聊聊，看看能不能变得更完整', 2, 'warm', '交流能帮助你的点子找到现实形状'),
    option('q18_d', '做个最小版本，当天就试起来', 3, 'playful', '行动是你检验灵感最有效的方式'),
  ]),
  q(19, '别人第一次看到你的歌单，最可能说？', '🎵', [
    option('q19_a', '“很像你，风格一直很稳定”', 0, 'steady', '你的喜好有清楚且持久的主线'),
    option('q19_b', '“比我想象中丰富很多”', 1, 'observer', '你的多样性通常不会一次性展示完'),
    option('q19_c', '“完全看不出你还会听这些”', 2, 'switcher', '审美是你最容易出现反差的入口'),
    option('q19_d', '“这几种风格居然能放在一起”', 3, 'privateCreator', '你喜欢在私人空间里容纳多种版本的自己'),
  ]),
  q(20, '晚上突然进入高能状态，你更可能？', '🌙', [
    option('q20_a', '尽量收尾休息，不打乱第二天节奏', 0, 'steady', '你能把短暂兴奋放回长期节奏里'),
    option('q20_b', '安静做点自己的事，不打扰别人', 1, 'privateCreator', '独处会给你的隐藏兴趣留出完整时间'),
    option('q20_c', '把想法记下来，第二天继续推进', 2, 'balanced', '你会保护灵感，也保护正常生活'),
    option('q20_d', '如果第二天允许，会趁状态做出一个成果', 3, 'playful', '高能时段是你的创作加速器'),
  ]),
  q(21, '朋友用一个你不喜欢的方式开玩笑，你会？', '🗣️', [
    option('q21_a', '直接说不喜欢，请对方停下', 0, 'direct', '清楚表达不适，是对关系负责'),
    option('q21_b', '先提醒一次，看看对方是否理解', 1, 'contextReader', '你会给沟通机会，也保留自己的边界'),
    option('q21_c', '换个更轻松的说法，把边界讲明白', 2, 'warm', '你很会让边界表达不必变成对抗'),
    option('q21_d', '当场接住气氛，之后再单独认真沟通', 3, 'switcher', '你能处理现场，也不会放弃事后说明'),
  ]),
  q(22, '面对不想参加的活动邀请，你通常？', '🚪', [
    option('q22_a', '礼貌但明确地拒绝', 0, 'direct', '不绕弯的拒绝能减少双方猜测'),
    option('q22_b', '确认安排后再给答复，不冲动答应', 1, 'contextReader', '你会给自己留下真实判断的空间'),
    option('q22_c', '说明原因，也给出替代见面的方式', 2, 'warm', '你能同时照顾边界和关系'),
    option('q22_d', '如果人很合拍，可能临时改变主意', 3, 'spontaneous', '你会为值得的人保留一点弹性'),
  ]),
  q(23, '朋友向你分享一件很私人的事，你会？', '🔒', [
    option('q23_a', '认真听，不主动追问未说的细节', 0, 'contextReader', '你知道信任不等于获得全部信息'),
    option('q23_b', '先确认对方想被倾听还是想要建议', 1, 'contextReader', '确认需求会让你的支持更准确'),
    option('q23_c', '给出回应，也明确不会转述给别人', 2, 'warm', '你会用行动增加这段对话的安全感'),
    option('q23_d', '如果合适，也分享自己的经历建立共鸣', 3, 'open', '你愿意用对等的真实回应真实'),
  ]),
  q(24, '群聊开始讨论某人的隐私，你更可能？', '🛡️', [
    option('q24_a', '不参与，也不转发相关内容', 0, 'steady', '不加入传播就是清楚的边界选择'),
    option('q24_b', '提醒大家别把未经确认的信息当事实', 1, 'contextReader', '你会在热闹里保留事实意识'),
    option('q24_c', '把话题转开，避免继续扩大', 2, 'warm', '你擅长用低冲突方式给讨论降温'),
    option('q24_d', '明确指出不合适，请大家停止', 3, 'direct', '需要有人说清楚时，你愿意站出来'),
  ]),
  q(25, '情绪不太好，但又不想立刻解释时，你会？', '🌧️', [
    option('q25_a', '告诉对方我需要一点时间，之后再聊', 0, 'contextReader', '暂缓不是消失，你会给关系一个时间说明'),
    option('q25_b', '先独处整理，准备好后再表达', 1, 'slowBloom', '你的真实感受通常需要安静成形'),
    option('q25_c', '只和信任的人说，其他场合保持日常', 2, 'switcher', '关系距离会明显影响你的开放程度'),
    option('q25_d', '用创作、运动或幽默先把情绪转化出来', 3, 'privateCreator', '你常把难说的感受转换成另一种表达'),
  ]),
  q(26, '突然成为全场关注焦点，你的第一反应？', '🔦', [
    option('q26_a', '尽快把注意力拉回事情本身', 0, 'steady', '你不需要持续被注视来确认价值'),
    option('q26_b', '先有点不自在，适应后再回应', 1, 'slowBloom', '你的表达需要几秒钟完成切换'),
    option('q26_c', '自然接住，也会照顾现场其他人', 2, 'warm', '你能被看见，也不会忽略旁人的存在'),
    option('q26_d', '既然被看见，就给大家一个意外亮点', 3, 'playful', '你会把突发关注变成一次小型创作'),
  ]),
  q(27, '不同朋友对你的描述差别大吗？', '👥', [
    option('q27_a', '不太大，大家看到的我比较一致', 0, 'open', '你的核心状态在不同关系里很稳定'),
    option('q27_b', '有些差别，主要取决于认识多久', 1, 'slowBloom', '熟悉度是你开放程度的重要变量'),
    option('q27_c', '差别明显，不同圈子会看到不同侧面', 2, 'switcher', '你会让合适的一面出现在合适的关系里'),
    option('q27_d', '把描述放一起，可能像在说不同的人', 3, 'privateCreator', '你的多面性很难被单一标签装下'),
  ]),
  q(28, '你怎么看待自己“和想象中不一样”这件事？', '🪞', [
    option('q28_a', '没什么特别，每个人本来就不止一面', 0, 'balanced', '你不会把正常的多面性戏剧化'),
    option('q28_b', '有些部分只想留给自己，不必都公开', 1, 'contextReader', '保留不等于伪装，你清楚信息属于谁'),
    option('q28_c', '希望重要的人能逐渐看到更多真实面向', 2, 'warm', '你在意的不是曝光，而是被理解'),
    option('q28_d', '反差是我很喜欢的一部分个人风格', 3, 'switcher', '你愿意主动拥有自己的多面性'),
  ]),
  q(29, '很熟的朋友问“哪个才是真实的你”，你会？', '🧭', [
    option('q29_a', '每个场景里的我都是真实的一部分', 0, 'balanced', '你不需要从多面之中选出唯一正版'),
    option('q29_b', '安静时更接近我的基础状态', 1, 'observer', '低刺激环境更容易让你回到自己的节奏'),
    option('q29_c', '在信任的人面前，我会更完整', 2, 'slowBloom', '安全感决定你愿意展示多少层次'),
    option('q29_d', '真实的我就是会随场景切换，但有同一套底线', 3, 'contextReader', '灵活表达和稳定底线可以同时成立'),
  ]),
  q(30, '你最希望别人发现自己哪种“意外面”？', '📖', [
    option('q30_a', '其实比看起来更稳定、更能扛事', 0, 'steady', '你的意外感来自长期可靠，而不是戏剧性'),
    option('q30_b', '其实有很多安静但深入的兴趣', 1, 'privateCreator', '你的内容密度往往高于外在音量'),
    option('q30_c', '其实很会照顾气氛，也敢表达真实想法', 2, 'warm', '温和与清楚在你身上并不冲突'),
    option('q30_d', '其实脑洞很大，熟了以后特别会玩梗', 3, 'playful', '你的隐藏版本很可能自带创意和笑点'),
  ]),
]

export const bonusQuestion = {
  id: 99,
  question: '不考虑别人期待，你觉得自己在熟人和陌生人面前的反差有多大？',
  emoji: '🎚️',
  subtitle: '0 代表几乎一致，10 代表切换非常明显。自评只占结果的一小部分。',
  maxScore: 10,
}

export const ARCHETYPES = [
  { key: 'steady_anchor', name: '稳定底色型', desc: '你的意外感不靠翻面，而是来自越相处越可靠。', proto: [30, 35, 35, 92], tags: ['#状态一致', '#稳定耐看', '#边界清楚'] },
  { key: 'slow_bloom', name: '慢热解锁型', desc: '你的反差需要信任感解锁，熟悉之后内容浓度会明显上升。', proto: [76, 34, 44, 91], tags: ['#熟人限定', '#慢热高浓度', '#信任解锁'] },
  { key: 'private_creator', name: '后台创作型', desc: '安静外表之下，你有一套持续运行的兴趣与创意后台。', proto: [76, 35, 77, 83], tags: ['#隐藏兴趣', '#独处充电', '#脑内有作品'] },
  { key: 'warm_switch', name: '温柔切换型', desc: '你会读懂关系距离，在不同场景切换表达浓度。', proto: [75, 74, 42, 92], tags: ['#会读场', '#熟了更有趣', '#照顾感受'] },
  { key: 'direct_open', name: '直给透明型', desc: '你不太依赖神秘感，真实想法通常能被清楚看见。', proto: [29, 76, 51, 91], tags: ['#表达直接', '#不猜谜', '#状态透明'] },
  { key: 'context_reader', name: '场景雷达型', desc: '你最突出的不是隐藏，而是知道什么内容适合什么场合。', proto: [50, 47, 32, 96], tags: ['#场合感', '#分寸在线', '#信息有边界'] },
  { key: 'playful_spark', name: '灵感跳脱型', desc: '你的反差常从新点子和幽默里出现，熟悉规则后很会创造玩法。', proto: [38, 70, 80, 82], tags: ['#脑洞在线', '#即兴有梗', '#新鲜感'] },
  { key: 'full_spectrum', name: '全频反差型', desc: '你能快速表达、灵活切换，也容易把现场带进新的节奏。', proto: [78, 78, 78, 70], tags: ['#切换迅速', '#能量外放', '#反差全开'] },
]

export const tagMap = Object.fromEntries(ARCHETYPES.map((archetype) => [archetype.key, archetype]))

function clamp(value, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value))
}

export const DIMENSION_CALIBRATION = Object.fromEntries(DIMENSIONS.map((dimension) => {
  const rows = questions.map((question) => question.options.map((item) => item.dimensions[dimension.key]))
  const means = rows.map((row) => row.reduce((sum, value) => sum + value, 0) / row.length)
  const baseline = means.reduce((sum, value) => sum + value, 0) / means.length
  const meanVariance = rows.reduce((sum, row) => {
    const rowMean = row.reduce((rowSum, value) => rowSum + value, 0) / row.length
    return sum + row.reduce((rowSum, value) => rowSum + ((value - rowMean) ** 2), 0) / row.length
  }, 0) / (questions.length ** 2)
  const randomSpread = Math.sqrt(meanVariance)
  return [dimension.key, {
    baseline: Number(baseline.toFixed(2)),
    target: dimension.target,
    scale: Number(clamp(15 / Math.max(1, randomSpread), 1.25, 3.8).toFixed(2)),
  }]
}))

const LEGACY_PROFILE_BY_SCORE = ['steady', 'observer', 'warm', 'switcher']

function resolveAnswers(input) {
  if (!Array.isArray(input) || input.length !== questions.length) return null
  const resolved = []
  const seen = new Set()
  input.forEach((answer, index) => {
    const questionId = Number(answer?.questionId) || questions[index]?.id
    const question = questions.find((item) => item.id === questionId)
    if (!question || seen.has(questionId)) return
    let selected = null
    if (typeof answer === 'string') selected = question.options.find((item) => item.id === answer)
    if (answer && typeof answer === 'object') {
      selected = question.options.find((item) => item.id === answer.optionId)
        || question.options.find((item) => item.text === answer.text)
    }
    if (!selected && Number.isFinite(Number(answer?.score))) {
      const score = clamp(Math.round(Number(answer.score)), 0, 3)
      const profile = LEGACY_PROFILE_BY_SCORE[score]
      selected = {
        id: `legacy_${questionId}_${score}`,
        text: answer.text || `旧版第 ${questionId} 题选择`,
        score,
        profile,
        tags: [profile],
        dimensions: dimensionsFrom(profile),
        roast: '这项旧版选择已按原分值纳入新版模型。',
      }
    }
    if (!selected) return
    seen.add(questionId)
    resolved.push({ question, option: selected })
  })
  return resolved.length === questions.length && seen.size === questions.length ? resolved : null
}

function buildDimensionValues(resolved) {
  return Object.fromEntries(DIM_KEYS.map((key) => {
    const raw = resolved.reduce((sum, item) => sum + item.option.dimensions[key], 0) / resolved.length
    const calibration = DIMENSION_CALIBRATION[key]
    const value = calibration.target + ((raw - calibration.baseline) * calibration.scale)
    return [key, Math.round(clamp(value, 5, 95))]
  }))
}

function scoreArchetype(archetype, values) {
  const weights = { contrast: 1.15, expression: 1, playfulness: 1, boundary: 0.82 }
  const distance = Math.sqrt(DIM_KEYS.reduce((sum, key, index) => {
    const delta = values[key] - archetype.proto[index]
    return sum + weights[key] * delta * delta
  }, 0) / Object.values(weights).reduce((sum, value) => sum + value, 0))
  return Math.round(100 - distance)
}

function dimensionCopy(key, value) {
  const dimension = DIMENSION_MAP[key]
  if (value >= dimension.target + 10) return dimension.high
  if (value <= dimension.target - 10) return dimension.low
  return `你在${dimension.label}上更接近灵活平衡状态`
}

function buildWatchouts(values) {
  const items = []
  if (values.contrast >= 72 && values.expression <= 42) items.push('你可能期待熟人自动读懂隐藏版本；重要关系里，适度说明会减少误会。')
  if (values.expression >= 78 && values.boundary <= 72) items.push('表达速度很快时，记得确认对方是否也想进入同样的话题和节奏。')
  if (values.playfulness >= 78) items.push('新鲜感会给你能量，但不必把每段稳定期误判成无聊。')
  if (values.boundary >= 82) items.push('边界清楚不等于冷淡；你可以直接告诉对方，哪些空间需要被尊重。')
  if (items.length < 2) items.push('测试只截取了有限场景，现实中的你会随关系、安全感和精力变化。')
  return items.slice(0, 3)
}

function buildSuggestions(primary, secondary) {
  return [
    `选一个低风险场景，多表达一点你的“${primary.label}”面向，观察自己是否更轻松。`,
    `和信任的人说明你的“${secondary.label}”节奏，不必让对方靠猜。`,
    '遇到新玩法或敏感话题时，继续把场合、同意和隐私放在兴致之前。',
  ]
}

export function buildContrastReport(input, bonus = 5) {
  const resolved = resolveAnswers(input)
  if (!resolved) return null
  const selfRating = clamp(Number(bonus) || 0, 0, 10)
  const values = buildDimensionValues(resolved)
  values.contrast = Math.round(clamp((values.contrast * 0.88) + (selfRating * 10 * 0.12), 5, 95))

  const objective = resolved.reduce((sum, item) => sum + item.option.score, 0)
  const hiddenScore = Math.round(clamp(objective + selfRating, 0, 100))
  const rankedArchetypes = ARCHETYPES
    .map((archetype) => ({ ...archetype, fitScore: scoreArchetype(archetype, values) }))
    .sort((a, b) => b.fitScore - a.fitScore || a.key.localeCompare(b.key))
  const archetype = rankedArchetypes[0]
  const dimensions = DIMENSIONS
    .map((dimension) => ({
      ...dimension,
      value: values[dimension.key],
      distance: Math.abs(values[dimension.key] - dimension.target),
      copy: dimensionCopy(dimension.key, values[dimension.key]),
    }))
    .sort((a, b) => b.distance - a.distance)
  const primary = dimensions[0]
  const secondary = dimensions[1]
  const evidence = resolved
    .map(({ question, option }) => ({
      questionId: question.id,
      question: question.question,
      answer: option.text,
      insight: option.roast,
      impact: Math.abs(option.dimensions[primary.key] - DIMENSION_MAP[primary.key].target),
    }))
    .sort((a, b) => b.impact - a.impact || a.questionId - b.questionId)
    .slice(0, 3)

  return {
    modelVersion: MODEL_VERSION,
    hiddenScore,
    selfRating,
    archetype,
    alternatives: rankedArchetypes.slice(1, 3),
    values,
    dimensions,
    primary,
    secondary,
    evidence,
    watchouts: buildWatchouts(values),
    suggestions: buildSuggestions(primary, secondary),
    band: getResult(hiddenScore),
    summary: `你的主维度是${primary.label}，次维度是${secondary.label}。这表示你在特定场景下的表达方式更突出，不代表固定人格。`,
  }
}

export function computeTopTag(answers) {
  const report = buildContrastReport(answers, 5)
  return report?.archetype || { key: 'unknown', name: '信息不足', desc: '请完成全部 31 项后查看结果。', tags: [] }
}

export const results = [
  { range: [90, 100], grade: '反差全开', title: '高能切换', subtitle: '隐藏版本常常自带完整剧情', description: '你在熟悉场景里容易展现明显不同的能量。反差不是“真实与伪装”的二选一，而是你会根据关系和环境调用不同表达方式。', tags: ['#反差全开', '#状态切换', '#表达高能'] },
  { range: [70, 89], grade: '高反差', title: '熟人限定', subtitle: '信任感会解锁更多内容', description: '你通常不会把所有面向一次性公开。关系越安全、场景越合适，你越愿意让幽默、创意或主动表达出现。', tags: ['#熟人限定', '#信任解锁', '#多面但真实'] },
  { range: [50, 69], grade: '可见反差', title: '灵活切换', subtitle: '不同场景有不同表达浓度', description: '你的反差能够被熟悉的人察觉，但不会主导全部互动。你既保留稳定底色，也会在合适时刻展示意外一面。', tags: ['#灵活切换', '#反差适中', '#场景表达'] },
  { range: [30, 49], grade: '慢热反差', title: '低调展开', subtitle: '不是没有内容，只是不急着展示', description: '你的状态整体稳定，更多反差藏在长期相处和具体兴趣里。你不需要为了显得有趣而强行外放。', tags: ['#慢热展开', '#稳定底色', '#不急着证明'] },
  { range: [0, 29], grade: '低反差', title: '内外一致', subtitle: '不同场景里的核心状态较稳定', description: '你在熟人和陌生人面前的差异相对有限。内外一致不是单调，而是你通常不需要用切换状态来获得安全感。', tags: ['#内外一致', '#状态稳定', '#真实直接'] },
]

export function getResult(score) {
  const value = clamp(Number(score) || 0, 0, 100)
  return results.find((result) => value >= result.range[0] && value <= result.range[1]) || results[results.length - 1]
}
