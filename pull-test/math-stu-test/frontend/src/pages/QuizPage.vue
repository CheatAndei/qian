<template>
  <main class="quiz shell">
    <header class="quiz-top">
      <button class="icon-btn" @click="goHome" aria-label="返回首页">‹</button>
      <div class="progress" aria-label="答题进度">
        <span :style="{ width: progress + '%' }"></span>
      </div>
      <strong>{{ currentIndex + 1 }}/{{ questions.length }}</strong>
    </header>

    <transition :name="slideName" mode="out-in">
      <section class="question-card" :key="current.id">
        <span class="dim">{{ currentDim.name }}</span>
        <h1>{{ current.prompt }}</h1>
        <div class="options">
          <button
            v-for="option in scaleOptions"
            :key="option.label"
            class="option"
            :class="{ active: answerMap[current.id] === option.score }"
            :disabled="isMoving"
            @click="choose(option)"
          >
            <span>
              <strong>{{ option.label }}</strong>
              <small>{{ option.note }}</small>
            </span>
            <b>{{ optionMark(option.score) }}</b>
          </button>
        </div>
      </section>
    </transition>

    <transition name="insight-pop" mode="out-in">
      <div class="quiz-insight" :key="current.dim + (isMoving ? '-react' : '')" :class="{ reacting: isMoving }">
        <template v-if="isMoving && lastReaction">
          <span class="insight-emoji">{{ lastReaction.emoji }}</span>
          <div>
            <strong>{{ lastReaction.title }}</strong>
            <small>{{ lastReaction.sub }}</small>
          </div>
        </template>
        <template v-else>
          <span class="insight-emoji">{{ insight.emoji }}</span>
          <div>
            <strong>{{ insight.title }}</strong>
            <small>{{ insight.body }}</small>
          </div>
        </template>
      </div>
    </transition>

    <div class="social-ticker" aria-hidden="true">
      <span class="ticker-track">{{ socialMessages[currentTicker] }}</span>
    </div>

    <transition name="toast-drop">
      <div v-if="milestone" class="milestone-toast">{{ milestone }}</div>
    </transition>

    <footer class="quiz-actions">
      <button class="ghost-btn" :disabled="currentIndex === 0" @click="prev">上一题</button>
      <p class="auto-tip">{{ currentIndex === questions.length - 1 ? '最后一道，选完看结果' : '点击答案后自动进入下一题' }}</p>
    </footer>
  </main>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { questions, dimensions } from '../data/quiz'

const router = useRouter()
const currentIndex = ref(0)
const answerMap = ref({})
const isMoving = ref(false)
const slideName = ref('question-forward')
const lastReaction = ref(null)
const milestone = ref('')
const currentTicker = ref(0)

const current = computed(() => questions[currentIndex.value])
const currentDim = computed(() => dimensions[current.value.dim])
const scaleOptions = computed(() => current.value.options)
const progress = computed(() => Math.round(((currentIndex.value + 1) / questions.length) * 100))

const dimInsights = {
  slack:    { emoji: '🛌', title: '侦察到摸鱼信号…',       body: '你的课堂生存策略正在被记录。别紧张，大家都是这么过来的。' },
  guess:    { emoji: '🎲', title: '蒙题能量波动检测中…',   body: '第六感即将接受考验。记住：三长一短选最短只是入门。' },
  social:   { emoji: '📢', title: '社交雷达已启动…',       body: '正在扫描你的班级存在感。传纸条、接话茬、带节奏——都是能力。' },
  flex:     { emoji: '😎', title: '装逼探测仪强烈响应…',   body: '你的凡尔赛指数正在被量化。注意：装过头容易翻车。' },
  crash:    { emoji: '💀', title: '翻车预警系统在线…',     body: '历史社死记录已载入。不过没关系——每次翻车都是节目效果。' },
  survive:  { emoji: '🆘', title: '求生本能评估启动…',     body: '危机应对能力即将被量化。能在数学课上活下来的都不简单。' },
}

const insight = computed(() => dimInsights[current.value.dim])

const reactionMap = {
  '标准操作':          { emoji: '📝', title: '标准操作', sub: '稳如老狗，老师完全没发现' },
  '熟练工':            { emoji: '😏', title: '老油条认证', sub: '你这套操作已经刻进DNA了' },
  '老油条':            { emoji: '😈', title: '混沌选手', sub: '全班就你敢在数学课上这么玩' },
  '三好学生':          { emoji: '😇', title: '三好学生', sub: '你这种人数学课上是稀有物种' },
  '经典流派':          { emoji: '🎯', title: '经典蒙题流', sub: '三长一短选最短，永远的神' },
  '理性蒙题':          { emoji: '🧠', title: '理性蒙题派', sub: '排除法：我不是在蒙，我在推理' },
  '统计学蒙题':        { emoji: '📊', title: '统计学蒙题', sub: '用大数定律对抗出题人，格局打开' },
  '诚实但分低':        { emoji: '😭', title: '诚实的孩子', sub: '空着不写——老师看了都心疼' },
  '体面人':            { emoji: '🤝', title: '体面人', sub: '写个"解"字站一会，全班都懂' },
  '经典逃生':          { emoji: '🏃', title: '厕所遁', sub: '老套路了，但确实好用' },
  '团队协作':          { emoji: '🤫', title: '团队协作', sub: '同桌：我又当了一次工具人' },
  '太实诚了':          { emoji: '😔', title: '实诚人', sub: '站了一节课——但你的诚实让人敬佩' },
  '低调装逼':          { emoji: '✨', title: '优雅装逼', sub: '"还行吧"——然后卷子98分' },
  '高调装逼':          { emoji: '📣', title: '高调炫技', sub: '全班都听见了，包括不想听的' },
  '危险发言':          { emoji: '🔥', title: '危险发言', sub: '"我闭眼都能做"——flag已立' },
  '深藏不露':          { emoji: '🥷', title: '深藏不露', sub: '下次考试全班都会记住你的分数' },
  '默默承受':          { emoji: '🫠', title: '社死进行中', sub: '脸上淡定，内心已经重开了八次' },
  '强行挽尊':          { emoji: '💪', title: '强行挽尊', sub: '"哦哦哦我知道了"（完全不知道）' },
  '嘴硬王者':          { emoji: '👑', title: '嘴硬王者', sub: '"老师我刚才嘴瓢了"——经典永流传' },
  '习得性无助':        { emoji: '😮‍💨', title: '麻木了', sub: '翻车太多已经无所谓了，境界提升了' },
  '亡羊补牢':          { emoji: '⏰', title: '亡羊补牢', sub: '能写多少写多少——比不写强' },
  '资源整合':          { emoji: '📋', title: '资源整合大师', sub: '"参考"是一门艺术' },
  '人情世故':          { emoji: '🍜', title: '人情世故', sub: '跟课代表搞好关系比做题重要' },
  '赌博行为':          { emoji: '🎰', title: '纯赌徒', sub: '赌老师忘了检查——高风险低回报' },
  '物理唤醒':          { emoji: '😱', title: '物理唤醒', sub: '拍桌子：人类最强闹钟' },
  '生物钟精准':        { emoji: '⏱️', title: '生物钟精准', sub: '下课铃响前一秒自动睁眼' },
  '社交唤醒':          { emoji: '👀', title: '社交唤醒', sub: '"老师看你了"——四个字让你秒醒' },
  '你在撒谎':          { emoji: '🤥', title: '可疑发言', sub: '"我很清醒"——说这话时刚醒' },
  '朴素直觉':          { emoji: '🤔', title: '朴素直觉', sub: '0或1——数学的尽头是二进制' },
  '制造工作量':        { emoji: '📝', title: '障眼法', sub: '看起来写了很多，其实全是蒙的' },
  '侦查能力':          { emoji: '🔭', title: '侦查型选手', sub: '瞄学霸卷子——视力5.2不是白长的' },
  '逻辑自洽':          { emoji: '🧘', title: '佛系做题', sub: '"不写就不会错"——哲学高度' },
  '内心戏丰富':        { emoji: '🙄', title: '白眼翻上天', sub: '嘴上不说，白眼已经出卖了你' },
  '阴阳大师':          { emoji: '🎭', title: '阴阳大师', sub: '"是是是你最牛"——满分阴阳' },
  '正义执行':          { emoji: '⚡', title: '正义执行', sub: '当面拆穿——全班为你鼓掌' },
  '自我保护':          { emoji: '📄', title: '自我保护', sub: '盖住分数——只要不看就不存在' },
  '优雅装逼':          { emoji: '🌸', title: '优雅装逼', sub: '"碰巧想到的"——然后淡然一笑' },
  '表演型人格':        { emoji: '🎤', title: '表演型人格', sub: '讲题比做题还享受' },
  '明星待遇':          { emoji: '🌟', title: '班级明星', sub: '被围住问方法——享受这一刻' },
  '创伤后应激':        { emoji: '😰', title: 'PTSD', sub: '内心狂喜但面无表情——怕下次考砸' },
  '轻度社死':          { emoji: '😳', title: '轻度社死', sub: '头差点砸桌上——全班憋笑' },
  '睡眠艺术家':        { emoji: '🎨', title: '睡眠艺术家', sub: '每次睡觉姿势都有创新' },
  '深度睡眠':          { emoji: '😴', title: '深度睡眠', sub: '老师走到旁边都没醒——睡眠质量满分' },
  '地理劣势':          { emoji: '📍', title: '地理劣势', sub: '坐第一排——想睡都睡不了' },
  '转移焦点':          { emoji: '🎯', title: '转移焦点', sub: '"全班平均分才XX"——经典甩锅' },
  '态度流':            { emoji: '🙏', title: '态度流', sub: '态度先摆出来——气势不能输' },
  '比较文学':          { emoji: '📖', title: '比较文学', sub: '"全班第一也才XX"——垫背大法' },
  '时间管理':          { emoji: '📅', title: '时间管理大师', sub: '能拖一天是一天——活在当下' },
}

const socialMessages = [
  '🔥 已有 2,847 人完成测试',
  '💬 63% 的人在第3题选了蒙',
  '🏆 仅 8% 的人拿到隐藏卷王',
  '📢 隔壁班正在疯狂转发中',
  '🎯 第5题是翻车率最高的一题',
  '⚡ 刚才有3个人同时测出透明人',
  '👀 你的同桌可能也在偷偷测',
  '💀 第9题的社死率高达71%',
]

let tickerTimer = null
function startTicker() {
  tickerTimer = setInterval(() => {
    currentTicker.value = (currentTicker.value + 1) % socialMessages.length
  }, 4000)
}

function optionMark(score) { return ['A', 'B', 'C', 'D'][score] || '' }

function choose(option) {
  if (isMoving.value) return
  slideName.value = 'question-forward'
  answerMap.value = { ...answerMap.value, [current.value.id]: option.score }
  lastReaction.value = reactionMap[option.label] || { emoji: '👏', title: option.label, sub: option.note }
  isMoving.value = true

  const nextIdx = currentIndex.value + 1
  if (nextIdx === 3) milestone.value = '🎉 1/4 达成！渐入佳境'
  else if (nextIdx === 6) milestone.value = '🔥 过半了！稳如老狗'
  else if (nextIdx === 9) milestone.value = '⚡ 最后四题！别翻车'
  else if (nextIdx === 12) milestone.value = '🏁 最后一题！人设即将揭晓'
  else milestone.value = ''

  window.setTimeout(() => {
    if (milestone.value) { window.setTimeout(() => { milestone.value = '' }, 1800) }
    lastReaction.value = null
    next()
    isMoving.value = false
  }, 500)
}

function prev() {
  if (isMoving.value) return
  slideName.value = 'question-back'
  if (currentIndex.value > 0) currentIndex.value -= 1
}

function next() {
  if (answerMap.value[current.value.id] === undefined) return
  if (currentIndex.value < questions.length - 1) { currentIndex.value += 1; return }
  if (tickerTimer) clearInterval(tickerTimer)
  router.push({ path: '/result', query: { a: encodeURIComponent(JSON.stringify(answerMap.value)) } })
}

function goHome() {
  if (tickerTimer) clearInterval(tickerTimer)
  router.push('/')
}

onMounted(() => startTicker())
onUnmounted(() => { if (tickerTimer) clearInterval(tickerTimer) })
</script>
