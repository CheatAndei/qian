// 城市磁场测试 V2
// 10 维偏好模型 + 32 座代表城市。数值仅用于娱乐产品内部匹配，不是城市排名。

export const MODEL_VERSION = 'city-v2.1'
export const ANSWER_VERSION = 'v2'

export const DIMENSIONS = [
  { key: 'opportunity', label: '机会资源', short: '机会', high: '你希望城市保有较多工作与资源选择', mid: '你在机会和生活之间更看重平衡', low: '你不需要用高资源密度换取日常压力' },
  { key: 'affordability', label: '成本可控', short: '成本', high: '你把日常成本的可控性放在重要位置', mid: '你愿意为合适的体验承担适度成本', low: '只要城市足够合拍，你能接受更高预算' },
  { key: 'tempo', label: '城市节奏', short: '节奏', high: '你会被高密度行程和持续运转的城市激活', mid: '你喜欢忙与松之间仍有切换空间', low: '你需要城市给日常留出充足空白' },
  { key: 'culture', label: '文化新鲜度', short: '文化', high: '展览、餐饮、活动和新鲜街区会持续给你能量', mid: '你需要稳定日常里保留一些新鲜内容', low: '熟悉、安稳的生活半径比持续上新更重要' },
  { key: 'nature', label: '自然可达', short: '自然', high: '山海、绿地或开阔空间是你的重要恢复来源', mid: '你希望自然与城市便利都不缺席', low: '丰富的城市内容可以弥补自然距离' },
  { key: 'mobility', label: '通勤机动', short: '通勤', high: '公共交通、步行和短通勤会显著影响幸福感', mid: '你能接受适度通勤，前提是路线稳定', low: '只要目的地值得，出行距离不是第一优先级' },
  { key: 'warmth', label: '温度偏好', short: '温度', high: '你更偏爱温暖、少寒冷的长期体感', mid: '你对冷热都保留一定适应空间', low: '偏冷气候不会显著影响你的城市选择' },
  { key: 'humidity', label: '干湿偏好', short: '干湿', high: '你能接受或偏爱湿润体感', mid: '适度湿润或干燥都可以适应', low: '你明显更偏爱干爽空气' },
  { key: 'seasonality', label: '季节变化', short: '四季', high: '清晰的季节变化会增强你的生活感', mid: '你希望换季存在，但不要过于极端', low: '稳定气候比四季分明更重要' },
  { key: 'cityScale', label: '城市尺度', short: '尺度', high: '你更享受大城市的人群、设施与选择密度', mid: '区域中心城市的规模更接近你的舒适区', low: '较小城市和紧凑生活半径更让你放松' },
]

export const DIM_KEYS = DIMENSIONS.map((d) => d.key)
export const DIMENSION_MAP = Object.fromEntries(DIMENSIONS.map((d) => [d.key, d]))

export const CLUSTERS = [
  { key: 'resource', label: '资源密度' },
  { key: 'balanced', label: '综合枢纽' },
  { key: 'coastal', label: '沿海生活' },
  { key: 'culture', label: '文化漫游' },
  { key: 'nature', label: '自然接近' },
  { key: 'steady', label: '稳态落地' },
]

const CLUSTER_MAP = Object.fromEntries(CLUSTERS.map((c) => [c.key, c]))

function q(id, spec, prompt, options) {
  return { id, spec, prompt, options }
}

function o(id, text, scores, read, constraints = []) {
  const tempo = Number.isFinite(scores.tempo) ? scores.tempo : 50
  const culture = Number.isFinite(scores.culture) ? scores.culture : 50
  return {
    id,
    text,
    scores,
    read,
    constraints,
    // 保留旧字段，避免仍在读取 invest/recip 的外部代码立即失效。
    invest: Math.round((tempo / 100) * 3),
    recip: Math.round((culture / 100) * 3),
  }
}

export const questions = [
  q(1, '起床后的第一件事', '理想城市的一天，你希望怎么开始？', [
    o('q01_a', '楼下买杯咖啡，边走边看街景', { tempo: 66, culture: 72, mobility: 80, cityScale: 68 }, '街区与步行偏好被记录'),
    o('q01_b', '自然醒，窗外安静，有阳光就够', { tempo: 22, nature: 66, warmth: 68, cityScale: 32 }, '低干扰生活信号增强'),
    o('q01_c', '赶地铁去见人，行程满一点才有活力', { opportunity: 82, tempo: 92, mobility: 90, cityScale: 94 }, '高密度城市能量增强', ['needs_opportunity']),
    o('q01_d', '去海边或公园散步，先把心放空', { tempo: 15, nature: 96, mobility: 54, cityScale: 28 }, '自然恢复需求增强', ['needs_nature']),
  ]),
  q(2, '周末半径', '周末空出来，你更想？', [
    o('q02_a', '找一家新店，顺路逛展', { tempo: 62, culture: 92, mobility: 72, cityScale: 72 }, '城市内容密度加分'),
    o('q02_b', '睡到自然醒，附近吃点熟悉的', { affordability: 72, tempo: 20, culture: 24, cityScale: 38 }, '熟悉半径与低消耗偏好增强'),
    o('q02_c', '安排饭局、演出、夜生活，一天别浪费', { tempo: 94, culture: 96, cityScale: 92 }, '活动与夜间活力权重上升'),
    o('q02_d', '去山里、湖边、海边，离开人群', { tempo: 12, nature: 98, cityScale: 22 }, '户外可达成为关键条件', ['needs_nature']),
  ]),
  q(3, '社交密度', '你喜欢城市里有多少社交机会？', [
    o('q03_a', '想见人时随时有人可约', { tempo: 78, culture: 70, cityScale: 86 }, '社交供给密度增强'),
    o('q03_b', '三五好友够了，不想太吵', { affordability: 62, tempo: 34, culture: 38, cityScale: 45 }, '稳定小圈层更重要'),
    o('q03_c', '陌生人很多才有新鲜感', { tempo: 66, culture: 94, cityScale: 92 }, '多样性与新连接增强'),
    o('q03_d', '少一点人，多一点空间', { tempo: 18, nature: 72, cityScale: 16 }, '低密度空间需求增强'),
  ]),
  q(4, '消费偏好', '更容易让你心动的是？', [
    o('q04_a', '小众买手店、咖啡馆、独立书店', { affordability: 32, culture: 92, cityScale: 74 }, '审美与独立内容权重上升'),
    o('q04_b', '菜市场、小饭馆、老街烟火气', { affordability: 74, culture: 68, cityScale: 48 }, '日常生活纹理增强'),
    o('q04_c', '商场、livehouse、酒吧、展会', { affordability: 24, tempo: 86, culture: 98, cityScale: 94 }, '商业和活动密度增强'),
    o('q04_d', '低物欲，城市别太贵就行', { affordability: 98, tempo: 30, culture: 24, cityScale: 32 }, '成本可控成为硬条件', ['needs_affordable']),
  ]),
  q(5, '气候口味', '天气上你最能接受？', [
    o('q05_a', '四季分明，有明显换季感', { warmth: 42, humidity: 44, seasonality: 96 }, '清晰季节变化被记录'),
    o('q05_b', '温暖湿润，适合慢慢走', { warmth: 90, humidity: 92, seasonality: 16 }, '温暖湿润偏好增强'),
    o('q05_c', '冷一点也行，只要城市够有内容', { warmth: 16, humidity: 42, seasonality: 86, culture: 92 }, '内容优先于温度'),
    o('q05_d', '阳光、海风、空气清爽最重要', { warmth: 78, humidity: 30, seasonality: 38, nature: 92 }, '阳光与清爽体感增强', ['needs_nature']),
  ]),
  q(6, '工作节奏', '如果在那里生活，你希望工作状态是？', [
    o('q06_a', '机会多，卷一点也能接受', { opportunity: 96, affordability: 26, tempo: 90, cityScale: 92 }, '机会密度成为首要条件', ['needs_opportunity']),
    o('q06_b', '稳定有边界，下班后是自己的', { opportunity: 54, affordability: 66, tempo: 38, cityScale: 58 }, '工作与生活边界增强'),
    o('q06_c', '能接触新行业、新人、新项目', { opportunity: 92, tempo: 84, culture: 88, cityScale: 88 }, '变化与跨界资源增强', ['needs_opportunity']),
    o('q06_d', '远程或自由职业，城市负责滋养我', { opportunity: 32, affordability: 72, tempo: 24, culture: 68, nature: 90, cityScale: 38 }, '自然与自由度权重上升', ['needs_nature']),
  ]),
  q(7, '夜晚城市', '晚上九点，你希望城市是什么状态？', [
    o('q07_a', '街上还有人，灯亮着，能继续逛', { tempo: 88, culture: 84, cityScale: 90 }, '夜间活跃度增强'),
    o('q07_b', '安静下来，适合回家休息', { affordability: 66, tempo: 14, culture: 24, cityScale: 28 }, '夜间降噪需求增强'),
    o('q07_c', '有夜市和小馆子，但不至于太疯', { tempo: 58, culture: 74, cityScale: 62 }, '烟火与节奏平衡增强'),
    o('q07_d', '海边或河边能走走，风比人重要', { tempo: 18, culture: 34, nature: 94, cityScale: 34 }, '自然夜景权重上升'),
  ]),
  q(8, '安全感来源', '一座城市让你安心，靠什么？', [
    o('q08_a', '公共交通方便，去哪都不麻烦', { mobility: 98, cityScale: 82 }, '公共交通成为硬条件', ['needs_mobility']),
    o('q08_b', '房租压力小，生活成本可控', { affordability: 100, cityScale: 36 }, '预算安全感成为硬条件', ['needs_affordable']),
    o('q08_c', '机会和人都多，不怕没选择', { opportunity: 96, tempo: 78, cityScale: 94 }, '选择密度成为硬条件', ['needs_opportunity']),
    o('q08_d', '自然环境好，心里不堵', { tempo: 24, nature: 98, cityScale: 28 }, '自然恢复成为硬条件', ['needs_nature']),
  ]),
  q(9, '城市记录', '最想长期记录哪类城市内容？', [
    o('q09_a', '城市漫游路线和拍照点', { culture: 86, mobility: 70, cityScale: 66 }, '街区可逛性增强'),
    o('q09_b', '本地小吃和菜市场', { affordability: 72, culture: 72, cityScale: 50 }, '生活内容与本地纹理增强'),
    o('q09_c', '演出、展览、派对、活动', { tempo: 84, culture: 100, cityScale: 94 }, '事件密度权重上升'),
    o('q09_d', '海、山、湖、日落', { tempo: 18, culture: 46, nature: 100, cityScale: 28 }, '风景与户外权重上升', ['needs_nature']),
  ]),
  q(10, '居住想象', '你会选哪种住处？', [
    o('q10_a', '市中心小房子，出门就是生活', { affordability: 24, tempo: 78, mobility: 94, cityScale: 96 }, '中心区便利优先'),
    o('q10_b', '老小区，附近熟人店多', { affordability: 72, tempo: 36, culture: 58, mobility: 62, cityScale: 48 }, '社区日常优先'),
    o('q10_c', '交通方便，能快速去任何地方', { mobility: 100, cityScale: 84 }, '全城机动性优先', ['needs_mobility']),
    o('q10_d', '窗外有树，远一点也没关系', { affordability: 62, tempo: 20, nature: 94, mobility: 34, cityScale: 30 }, '自然景观优先', ['needs_nature']),
  ]),
  q(11, '陌生城市', '第一次到一个城市，你通常？', [
    o('q11_a', '不做太多攻略，边走边发现', { tempo: 46, culture: 88, mobility: 58, cityScale: 58 }, '随机探索倾向增强'),
    o('q11_b', '先找舒服的住处和好吃的', { affordability: 64, tempo: 32, culture: 58, cityScale: 44 }, '生活落点优先'),
    o('q11_c', '把景点、店、路线排满', { tempo: 92, culture: 94, mobility: 86, cityScale: 82 }, '高效体验倾向增强'),
    o('q11_d', '先看哪里能发呆、看水、看山', { tempo: 18, nature: 100, cityScale: 24 }, '自然落点优先', ['needs_nature']),
  ]),
  q(12, '城市声音', '你更能忍受哪种声音？', [
    o('q12_a', '地铁、车流、人群，说明城市在运转', { tempo: 92, mobility: 90, cityScale: 98 }, '都市运转感增强'),
    o('q12_b', '街坊聊天、锅气、叫卖声', { affordability: 72, tempo: 48, culture: 68, cityScale: 52 }, '社区烟火感增强'),
    o('q12_c', '音乐、酒杯、演出散场的人声', { tempo: 88, culture: 96, cityScale: 90 }, '文化夜生活增强'),
    o('q12_d', '风声、雨声、鸟叫声', { tempo: 12, nature: 96, humidity: 62, cityScale: 22 }, '自然声场偏好增强', ['needs_nature']),
  ]),
  q(13, '人生阶段', '你现在更需要一座城市给你什么？', [
    o('q13_a', '机会，让我往上走', { opportunity: 100, affordability: 28, tempo: 84, cityScale: 94 }, '当前阶段偏向事业推进', ['needs_opportunity']),
    o('q13_b', '治愈，让我慢下来', { affordability: 68, tempo: 12, nature: 92, cityScale: 28 }, '当前阶段偏向恢复', ['needs_nature']),
    o('q13_c', '灵感，让我多看看世界', { opportunity: 58, tempo: 56, culture: 100, cityScale: 72 }, '当前阶段偏向创作与探索'),
    o('q13_d', '归属，让生活稳定一点', { opportunity: 46, affordability: 86, tempo: 30, culture: 42, cityScale: 46 }, '当前阶段偏向长期落地', ['needs_affordable']),
  ]),
  q(14, '关系网络', '在城市里，你希望身边的人？', [
    o('q14_a', '厉害、有野心，能互相拉一把', { opportunity: 96, tempo: 82, cityScale: 92 }, '上升型关系网络增强', ['needs_opportunity']),
    o('q14_b', '松弛、有趣，不用端着', { tempo: 38, culture: 72, cityScale: 58 }, '低压力社交增强'),
    o('q14_c', '多元、开放，什么人都有', { opportunity: 70, culture: 100, cityScale: 96 }, '多样性成为重要条件'),
    o('q14_d', '少而稳定，别消耗我', { affordability: 72, tempo: 20, culture: 30, cityScale: 30 }, '低消耗关系优先'),
  ]),
  q(15, '通勤忍耐', '每天通勤这件事，你的底线？', [
    o('q15_a', '只要城市值得，远一点也行', { opportunity: 76, tempo: 78, mobility: 28, cityScale: 90 }, '愿意用通勤换城市资源'),
    o('q15_b', '必须短，生活不能都耗路上', { affordability: 62, tempo: 30, mobility: 100, cityScale: 52 }, '短通勤成为硬条件', ['needs_mobility']),
    o('q15_c', '路上有风景、咖啡或好店就能接受', { culture: 84, mobility: 66, cityScale: 62 }, '通勤过程体验优先'),
    o('q15_d', '最好能骑车或步行', { tempo: 30, nature: 66, mobility: 96, cityScale: 42 }, '慢行友好成为关键条件', ['needs_mobility']),
  ]),
  q(16, '旅行回忆', '你最容易记住一个城市的什么？', [
    o('q16_a', '某个街角和一段路', { culture: 86, mobility: 72, cityScale: 56 }, '街区与慢行记忆增强'),
    o('q16_b', '一顿饭和一个很舒服的下午', { affordability: 72, tempo: 24, culture: 68, warmth: 68, humidity: 58 }, '日常体感成为记忆锚点'),
    o('q16_c', '它给我的机会和刺激', { opportunity: 98, tempo: 86, cityScale: 94 }, '资源与刺激成为记忆锚点', ['needs_opportunity']),
    o('q16_d', '它的天气、空气、颜色', { nature: 82, warmth: 54, humidity: 32, seasonality: 72, cityScale: 38 }, '气候与空气体感权重上升'),
  ]),
  q(17, '城市审美', '你偏爱的城市画面？', [
    o('q17_a', '高楼、霓虹、地铁口人流', { opportunity: 78, tempo: 90, mobility: 90, cityScale: 100 }, '大都会画面增强'),
    o('q17_b', '骑楼、巷子、老店招牌', { affordability: 66, tempo: 42, culture: 88, cityScale: 50 }, '旧城生活纹理增强'),
    o('q17_c', '艺术区、展馆、独立空间', { opportunity: 62, culture: 100, cityScale: 82 }, '文化空间密度增强'),
    o('q17_d', '海岸线、山路、开阔天空', { tempo: 18, nature: 100, cityScale: 24 }, '开阔自然画面增强', ['needs_nature']),
  ]),
  q(18, '离开原因', '你最受不了一座城市什么？', [
    o('q18_a', '没机会，看不到上升空间', { opportunity: 100, tempo: 76, cityScale: 90 }, '机会不足是明确红线', ['needs_opportunity']),
    o('q18_b', '太贵，生活被成本绑架', { affordability: 100, tempo: 32, cityScale: 42 }, '成本压力是明确红线', ['needs_affordable']),
    o('q18_c', '太无聊，缺少新鲜事', { tempo: 72, culture: 100, cityScale: 82 }, '内容不足是明确红线'),
    o('q18_d', '太吵太挤，没有喘气的地方', { tempo: 10, nature: 82, cityScale: 8 }, '拥挤与噪声是明确红线', ['avoid_megacity']),
  ]),
  q(19, '留下理由', '一座城市最可能把你留下，是因为？', [
    o('q19_a', '事业机会和资源', { opportunity: 100, affordability: 28, tempo: 82, cityScale: 92 }, '长期留下依赖事业资源', ['needs_opportunity']),
    o('q19_b', '生活舒服，吃住都合拍', { affordability: 86, tempo: 38, culture: 62, cityScale: 52 }, '长期留下依赖日常合拍', ['needs_affordable']),
    o('q19_c', '总有新地方可探索', { opportunity: 62, tempo: 68, culture: 100, cityScale: 82 }, '长期留下依赖持续新鲜'),
    o('q19_d', '自然环境让我身心稳定', { affordability: 68, tempo: 18, nature: 100, cityScale: 28 }, '长期留下依赖自然恢复', ['needs_nature']),
  ]),
  q(20, '一句话选城', '如果只看当前生活取舍，你更靠近哪一种？', [
    o('q20_a', '资源密度高，节奏快，选择很多', { opportunity: 100, affordability: 24, tempo: 92, cityScale: 98 }, '资源密度成为最终锚点', ['needs_opportunity']),
    o('q20_b', '日常顺手，成本可控，慢慢熟悉', { opportunity: 48, affordability: 92, tempo: 34, culture: 54, cityScale: 48 }, '长期落地成为最终锚点', ['needs_affordable']),
    o('q20_c', '内容多元，每周都有新地方可去', { opportunity: 68, tempo: 72, culture: 100, cityScale: 84 }, '文化新鲜度成为最终锚点'),
    o('q20_d', '安静开阔，自然离生活很近', { affordability: 72, tempo: 12, nature: 100, cityScale: 22 }, '自然接近成为最终锚点', ['needs_nature']),
  ]),
]

const PROFILE_KEYS = DIM_KEYS
const REGIONS = {
  national: '全国高资源',
  east: '长三角及东部',
  central: '中部枢纽',
  southwest: '西南',
  north: '华北与东北',
  south: '东南与华南',
  northwest: '西北',
}

const CITY_ROWS = [
  ['beijing', '北京', 'national', 'resource', '#73A7FF', [96,25,88,96,52,92,35,30,90,100]],
  ['shanghai', '上海', 'national', 'resource', '#76D7FF', [95,22,86,96,48,96,58,78,70,100]],
  ['shenzhen', '深圳', 'national', 'resource', '#9D8CFF', [94,28,91,82,65,85,88,78,20,95]],
  ['guangzhou', '广州', 'national', 'balanced', '#FF8A5B', [88,38,78,90,60,88,91,88,18,95]],
  ['hangzhou', '杭州', 'east', 'balanced', '#8FE3C5', [87,32,76,86,72,80,62,82,68,88]],
  ['nanjing', '南京', 'east', 'culture', '#D3A6FF', [78,46,64,87,69,84,55,76,78,78]],
  ['suzhou', '苏州', 'east', 'balanced', '#74DCC2', [78,43,62,78,73,82,60,80,72,76]],
  ['ningbo', '宁波', 'east', 'coastal', '#60C7D6', [76,52,60,70,72,72,65,82,66,72]],
  ['hefei', '合肥', 'east', 'steady', '#E2C26C', [76,61,66,66,58,72,58,74,76,75]],
  ['wuhan', '武汉', 'central', 'balanced', '#FF806E', [80,55,74,83,58,82,75,86,68,86]],
  ['changsha', '长沙', 'central', 'culture', '#FF9B73', [77,52,73,86,61,74,79,82,55,80]],
  ['nanchang', '南昌', 'central', 'steady', '#E0BD63', [68,64,61,67,62,70,81,86,50,72]],
  ['zhengzhou', '郑州', 'central', 'balanced', '#D4B16D', [78,62,72,65,45,80,55,55,80,86]],
  ['chengdu', '成都', 'southwest', 'culture', '#F2B35D', [84,50,64,90,72,78,66,82,58,88]],
  ['chongqing', '重庆', 'southwest', 'culture', '#FF775F', [82,56,72,86,75,72,78,86,42,90]],
  ['kunming', '昆明', 'southwest', 'nature', '#75D5A5', [63,65,45,76,88,62,63,45,55,70]],
  ['dali', '大理', 'southwest', 'nature', '#A7D46F', [38,52,28,72,96,48,62,42,52,40]],
  ['guiyang', '贵阳', 'southwest', 'nature', '#80D3A4', [66,72,50,68,86,58,62,82,50,68]],
  ['qingdao', '青岛', 'north', 'coastal', '#63CDE3', [72,48,57,77,87,70,48,62,80,74]],
  ['jinan', '济南', 'north', 'steady', '#D9B868', [73,59,66,68,57,74,52,48,84,78]],
  ['dalian', '大连', 'north', 'coastal', '#67BDE0', [68,52,54,74,88,68,42,58,82,70]],
  ['shenyang', '沈阳', 'north', 'steady', '#D4B46B', [72,70,64,72,58,72,25,45,95,80]],
  ['harbin', '哈尔滨', 'north', 'culture', '#9ABEFF', [62,72,55,82,64,68,12,40,100,75]],
  ['xiamen', '厦门', 'south', 'coastal', '#5DD4CF', [69,30,52,82,89,72,91,90,10,66]],
  ['fuzhou', '福州', 'south', 'coastal', '#67CFB9', [72,49,58,74,84,70,90,90,12,72]],
  ['quanzhou', '泉州', 'south', 'culture', '#E3A96B', [65,61,50,86,72,58,88,86,12,64]],
  ['zhuhai', '珠海', 'south', 'coastal', '#69D8D1', [68,38,48,68,92,66,92,88,8,64]],
  ['nanning', '南宁', 'south', 'nature', '#77D69E', [67,72,54,73,78,64,94,88,8,74]],
  ['haikou', '海口', 'south', 'nature', '#70D9B2', [58,55,42,67,94,58,98,92,5,62]],
  ['xian', '西安', 'northwest', 'culture', '#E5A45E', [79,61,69,95,58,82,48,36,88,86]],
  ['lanzhou', '兰州', 'northwest', 'steady', '#D6B668', [62,76,59,78,75,67,42,20,90,70]],
  ['urumqi', '乌鲁木齐', 'northwest', 'nature', '#81CBA2', [65,70,61,82,92,62,35,10,98,72]],
]

function profileFrom(values) {
  return Object.fromEntries(PROFILE_KEYS.map((key, index) => [key, values[index]]))
}

function buildTradeoffs(profile) {
  const notes = []
  if (profile.affordability < 40) notes.push('预算与居住半径需要提前核算，不能只看城市中心的体验。')
  if (profile.tempo > 80) notes.push('快节奏和通勤消耗需要结合具体工作地点评估。')
  if (profile.warmth < 35) notes.push('冬季体感可能成为长期生活的重要变量，建议跨季体验。')
  if (profile.humidity > 84) notes.push('湿热或潮湿体感值得在不同季节实际验证。')
  if (profile.mobility < 62) notes.push('跨区出行便利度要按真实居住点和工作点单独核对。')
  if (profile.nature > 86 && profile.opportunity < 68) notes.push('自然接近度较高，但岗位和稳定收入来源需要先确认。')
  if (profile.cityScale < 55) notes.push('城市规模较紧凑，专业机会与活动密度可能不如大型城市。')
  if (notes.length < 2) notes.push('同一城市不同片区差异很大，结果不能代替具体选址。')
  return notes.slice(0, 3)
}

function buildTryFirst(name, profile) {
  const climateCheck = profile.humidity > 80 || profile.warmth < 35
    ? '至少跨一个体感差异明显的季节，再判断气候是否适合长期生活。'
    : '避开纯旅游路线，用普通工作日体验真实天气和生活节奏。'
  return [
    `先在${name}按工作日节奏短住 3–7 天，走一次通勤、买菜和夜间回家路线。`,
    climateCheck,
    '核对你的行业岗位、住房预算与常用生活半径，再做现实决定。',
  ]
}

function createCity([key, name, region, cluster, accent, values]) {
  const profile = profileFrom(values)
  const top = [...DIMENSIONS]
    .sort((a, b) => profile[b.key] - profile[a.key])
    .slice(0, 3)
  const clusterLabel = CLUSTER_MAP[cluster].label
  const tradeoffs = buildTradeoffs(profile)
  const tryFirst = buildTryFirst(name, profile)
  return {
    key,
    name,
    region,
    regionLabel: REGIONS[region],
    cluster,
    clusterLabel,
    accent,
    profile,
    proto: [profile.tempo, profile.culture],
    aka: `${clusterLabel} · 城市样本`,
    signalLabel: clusterLabel,
    verdict: `${name}在本模型中更接近“${clusterLabel}”取向。它不是命定答案，而是与你当前生活取舍较接近的一个代表城市。`,
    tags: top.map((d) => `#${d.short}`),
    tradeoffs,
    tryFirst,
    dataVersion: '2026-07',
    deep: {
      summary: `${name}的内部画像更突出${top.map((d) => d.label).join('、')}。建议把它当成偏好线索，而不是城市优劣判断。`,
      forecast: '真正决定长期合拍度的仍是具体岗位、住房预算、通勤半径和跨季体感。',
      warnings: tradeoffs,
      advice: tryFirst,
    },
  }
}

export const archetypes = Object.fromEntries(CITY_ROWS.map((row) => {
  const value = createCity(row)
  return [value.key, value]
}))

export const CITY_PROFILES = archetypes
export const ARCHETYPE_ORDER = CITY_ROWS.map((row) => row[0])

function clamp(value, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value))
}

// 每个维度被不同数量的题目触达。先以“未触达 = 50”计算问卷自身基线，
// 再按随机作答时的离散度校准，避免高频维度被平均到中心、低频维度失声。
export const DIMENSION_CALIBRATION = Object.fromEntries(DIM_KEYS.map((key) => {
  const rows = questions.map((question) => question.options.map((option) => option.scores[key] ?? 50))
  const questionMeans = rows.map((values) => values.reduce((sum, value) => sum + value, 0) / values.length)
  const baseline = questionMeans.reduce((sum, value) => sum + value, 0) / questions.length
  const meanVariance = rows.reduce((sum, values) => {
    const rowMean = values.reduce((rowSum, value) => rowSum + value, 0) / values.length
    return sum + values.reduce((rowSum, value) => rowSum + ((value - rowMean) ** 2), 0) / values.length
  }, 0) / (questions.length ** 2)
  const randomSpread = Math.sqrt(meanVariance)
  const sparseClimateDimension = ['warmth', 'humidity', 'seasonality'].includes(key)
  return [key, {
    baseline: Number(baseline.toFixed(2)),
    scale: Number(clamp(
      18 / Math.max(1, randomSpread),
      sparseClimateDimension ? 17 : 1.35,
      sparseClimateDimension ? 18 : 4.8,
    ).toFixed(2)),
  }]
}))

// 旧版 URL 保存的是选项文案；这些文案在 V2 中做过措辞升级，需要显式映射。
const LEGACY_TEXT_ALIASES = {
  '海边/河边能走走，风比人重要': 'q07_d',
  '路上有风景/咖啡/好店就能接受': 'q15_c',
  '锋利、聪明、机会很多': 'q20_a',
  '温柔、有烟火气、慢慢熟': 'q20_b',
  '有趣、多变、每天有新鲜事': 'q20_c',
  '安静、开阔、让人松下来': 'q20_d',
}

function idsFromArray(input) {
  if (!Array.isArray(input) || input.length !== questions.length) return null
  const ids = input.map((answer, index) => {
    const options = questions[index].options
    if (typeof answer === 'string') return options.some((opt) => opt.id === answer) ? answer : null
    if (answer && typeof answer === 'object') {
      if (typeof answer.optionId === 'string' && options.some((opt) => opt.id === answer.optionId)) return answer.optionId
      if (typeof answer.id === 'string' && options.some((opt) => opt.id === answer.id)) return answer.id
      if (typeof answer.text === 'string') {
        return options.find((opt) => opt.text === answer.text)?.id
          || (options.some((opt) => opt.id === LEGACY_TEXT_ALIASES[answer.text]) ? LEGACY_TEXT_ALIASES[answer.text] : null)
      }
    }
    return null
  })
  return ids.every(Boolean) ? ids : null
}

export function decodeAnswers(raw) {
  if (typeof raw !== 'string' || !raw) return { ok: false, reason: 'empty' }
  if (raw.startsWith(`${ANSWER_VERSION}.`)) {
    const digits = raw.slice(ANSWER_VERSION.length + 1)
    if (!new RegExp(`^[0-3]{${questions.length}}$`).test(digits)) return { ok: false, reason: 'invalid-v2' }
    const optionIds = [...digits].map((digit, index) => questions[index].options[Number(digit)]?.id)
    if (!optionIds.every(Boolean)) return { ok: false, reason: 'unknown-option' }
    return { ok: true, version: ANSWER_VERSION, optionIds }
  }
  try {
    const parsed = JSON.parse(raw)
    const optionIds = idsFromArray(parsed)
    return optionIds
      ? { ok: true, version: 'legacy', optionIds }
      : { ok: false, reason: 'invalid-legacy' }
  } catch (_) {
    return { ok: false, reason: 'parse-error' }
  }
}

export function encodeAnswers(input) {
  const optionIds = input?.optionIds || idsFromArray(input)
  if (!optionIds || optionIds.length !== questions.length) return ''
  const digits = optionIds.map((id, index) => questions[index].options.findIndex((opt) => opt.id === id))
  if (digits.some((digit) => digit < 0 || digit > 3)) return ''
  return `${ANSWER_VERSION}.${digits.join('')}`
}

function resolveOptionIds(input) {
  if (input?.optionIds) return idsFromArray(input.optionIds)
  return idsFromArray(input)
}

function buildUserProfile(optionIds) {
  const sums = Object.fromEntries(DIM_KEYS.map((key) => [key, 0]))
  const constraints = new Set()

  optionIds.forEach((id, index) => {
    const option = questions[index].options.find((opt) => opt.id === id)
    DIM_KEYS.forEach((key) => {
      sums[key] += option.scores[key] ?? 50
    })
    option.constraints.forEach((constraint) => constraints.add(constraint))
  })

  const values = Object.fromEntries(DIM_KEYS.map((key) => {
    const rawMean = sums[key] / questions.length
    const calibration = DIMENSION_CALIBRATION[key]
    const calibrated = 50 + ((rawMean - calibration.baseline) * calibration.scale)
    return [key, Math.round(clamp(calibrated, 5, 95))]
  }))
  const weights = Object.fromEntries(DIM_KEYS.map((key) => [
    key,
    Number((1 + Math.min(0.8, Math.abs(values[key] - 50) / 62.5)).toFixed(2)),
  ]))

  if (constraints.has('needs_affordable')) weights.affordability += 0.8
  if (constraints.has('needs_mobility')) weights.mobility += 0.8
  if (constraints.has('needs_opportunity')) weights.opportunity += 0.8
  if (constraints.has('needs_nature')) weights.nature += 0.8
  if (constraints.has('avoid_megacity')) weights.cityScale += 0.8

  return { values, weights, constraints }
}

function hardPenalty(city, constraints) {
  const p = city.profile
  let penalty = 0
  if (constraints.has('needs_affordable') && p.affordability < 48) penalty += Math.min(10, (48 - p.affordability) * 0.24)
  if (constraints.has('needs_mobility') && p.mobility < 62) penalty += Math.min(8, (62 - p.mobility) * 0.22)
  if (constraints.has('needs_opportunity') && p.opportunity < 62) penalty += Math.min(10, (62 - p.opportunity) * 0.24)
  if (constraints.has('needs_nature') && p.nature < 62) penalty += Math.min(8, (62 - p.nature) * 0.22)
  if (constraints.has('avoid_megacity') && p.cityScale > 82) penalty += Math.min(10, (p.cityScale - 82) * 0.32)
  return Math.min(24, penalty)
}

function scoreCityRaw(city, user) {
  let weightedSquares = 0
  let totalWeight = 0
  DIM_KEYS.forEach((key) => {
    const weight = user.weights[key]
    const delta = user.values[key] - city.profile[key]
    weightedSquares += weight * delta * delta
    totalWeight += weight
  })
  const distance = Math.sqrt(weightedSquares / Math.max(1, totalWeight))
  return Math.max(0, 100 - distance - hardPenalty(city, user.constraints))
}

function dimensionCopy(key, value) {
  const meta = DIMENSION_MAP[key]
  if (value >= 66) return meta.high
  if (value <= 34) return meta.low
  return meta.mid
}

function pickAlternatives(scored, primary) {
  const remaining = scored.filter((item) => item.key !== primary.key)
  const selected = []
  while (selected.length < 3 && remaining.length) {
    let bestIndex = 0
    let bestAdjusted = -Infinity
    remaining.forEach((item, index) => {
      const sameCluster = [primary, ...selected].some((picked) => picked.city.cluster === item.city.cluster)
      const sameRegion = [primary, ...selected].some((picked) => picked.city.region === item.city.region)
      const adjusted = item.fitScore - (sameCluster ? 3.5 : 0) - (sameRegion ? 1.5 : 0)
      if (adjusted > bestAdjusted) {
        bestAdjusted = adjusted
        bestIndex = index
      }
    })
    selected.push(remaining.splice(bestIndex, 1)[0])
  }
  return selected
}

function publicMatch(item, role = '') {
  return {
    key: item.key,
    name: item.city.name,
    fitScore: item.fitScore,
    cluster: item.city.cluster,
    clusterLabel: item.city.clusterLabel,
    regionLabel: item.city.regionLabel,
    accent: item.city.accent,
    role,
  }
}

export function computeReport(input) {
  const candidateState = scoreCityCandidates(input)
  if (!candidateState) return null

  const { optionIds, user, scored } = candidateState
  const primary = scored[0]
  const alternatives = pickAlternatives(scored, primary)
  const primaryCity = primary.city
  const clusterIndex = CLUSTERS.findIndex((cluster) => cluster.key === primaryCity.cluster)

  const whyMatched = DIM_KEYS
    .map((key) => {
      const closeness = 100 - Math.abs(user.values[key] - primaryCity.profile[key])
      return {
        key,
        label: DIMENSION_MAP[key].label,
        value: user.values[key],
        cityValue: primaryCity.profile[key],
        closeness,
        copy: dimensionCopy(key, user.values[key]),
        rank: closeness * user.weights[key],
      }
    })
    .sort((a, b) => b.rank - a.rank)
    .slice(0, 3)

  const dimensionScores = DIMENSIONS.map((dimension) => ({
    key: dimension.key,
    label: dimension.label,
    value: user.values[dimension.key],
    cityValue: primaryCity.profile[dimension.key],
    closeness: 100 - Math.abs(user.values[dimension.key] - primaryCity.profile[dimension.key]),
  }))
  const cityMatches = [
    publicMatch(primary, '主推荐'),
    ...alternatives.map((item, index) => publicMatch(item, ['同频备选', '不同取向', '意外选项'][index])),
  ]

  return {
    modelVersion: MODEL_VERSION,
    optionIds,
    key: primary.key,
    archetype: primaryCity,
    fitScore: primary.fitScore,
    signal: primary.fitScore,
    invest: user.values.tempo,
    recip: user.values.culture,
    userProfile: user.values,
    dimensionScores,
    whyMatched,
    realityReminders: primaryCity.tradeoffs.slice(0, 2),
    shortStayChecks: primaryCity.tryFirst,
    alternatives: cityMatches.slice(1),
    cityMatches,
    distribution: cityMatches.map((item) => ({ key: item.key, name: item.name, pct: item.fitScore })),
    clusterIndex,
    clusterLabels: CLUSTERS.map((cluster) => cluster.label),
    blip: { angle: -90 + clusterIndex * 60, radius: Math.max(28, primary.fitScore) },
  }
}

// 提供给模型校验的确定性评分 seam；生产结果仍只按同一套维度距离与约束惩罚排序。
export function scoreCityCandidates(input) {
  const optionIds = resolveOptionIds(input)
  if (!optionIds) return null

  const user = buildUserProfile(optionIds)
  const scored = ARCHETYPE_ORDER
    .map((key) => {
      const city = archetypes[key]
      const rawScore = scoreCityRaw(city, user)
      return { key, city, rawScore, fitScore: Math.round(rawScore) }
    })
    .sort((a, b) => b.fitScore - a.fitScore || b.rawScore - a.rawScore || a.key.localeCompare(b.key))

  return { optionIds, user, scored }
}
