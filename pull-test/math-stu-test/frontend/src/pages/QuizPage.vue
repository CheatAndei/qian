<template>
  <main class="quiz shell">
    <header class="quiz-top">
      <button class="icon-btn" @click="goHome" aria-label="返回首页">‹</button>
      <div class="progress" role="progressbar" aria-label="答题进度" :aria-valuenow="progress" aria-valuemin="0" aria-valuemax="100">
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
            @click.stop="choose(option)"
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
      <div class="quiz-insight" aria-live="polite" :key="current.dim + (isMoving ? '-react' : '')" :class="{ reacting: isMoving }">
        <template v-if="isMoving && lastReaction">
          <span class="insight-emoji" v-html="lastReaction.icon"></span>
          <div>
            <strong>{{ lastReaction.title }}</strong>
            <small>{{ lastReaction.sub }}</small>
          </div>
        </template>
        <template v-else>
          <span class="insight-emoji" v-html="insight.icon"></span>
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

const icon = {
  sleep: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 17h16"/><path d="M5 17V9a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3v8"/><path d="M13 12h6a2 2 0 0 1 2 2v3"/></svg>',
  dice: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="3"/><circle cx="8" cy="8" r="1" fill="currentColor"/><circle cx="16" cy="8" r="1" fill="currentColor"/><circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="8" cy="16" r="1" fill="currentColor"/><circle cx="16" cy="16" r="1" fill="currentColor"/></svg>',
  wave: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12c3-5 6 5 9 0s6 5 9 0"/><path d="M3 17c3-3 6 3 9 0s6 3 9 0"/></svg>',
  spark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z"/></svg>',
  skull: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3a8 8 0 0 0-8 8v3a4 4 0 0 0 4 4v3h8v-3a4 4 0 0 0 4-4v-3a8 8 0 0 0-8-8z"/><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/></svg>',
  alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3l10 18H2z"/><path d="M12 9v5"/><path d="M12 18h.01"/></svg>',
  doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 3h9l3 3v15H6z"/><path d="M15 3v4h4"/><path d="M9 12h6M9 16h4"/></svg>',
  target: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3l8 4v5c0 5-3.4 8-8 9-4.6-1-8-4-8-9V7z"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v6l4 2"/></svg>',
}

const dimInsights = {
  slack:    { icon: icon.sleep, title: '侦察到摸鱼信号…',       body: '你的课堂生存策略正在被记录。别紧张，大家都是这么过来的。' },
  guess:    { icon: icon.dice, title: '蒙题能量波动检测中…',   body: '第六感即将接受考验。记住：三长一短选最短只是入门。' },
  social:   { icon: icon.wave, title: '社交雷达已启动…',       body: '正在扫描你的班级存在感。传纸条、接话茬、带节奏——都是能力。' },
  flex:     { icon: icon.spark, title: '装逼探测仪强烈响应…',   body: '你的凡尔赛指数正在被量化。注意：装过头容易翻车。' },
  crash:    { icon: icon.skull, title: '翻车预警系统在线…',     body: '历史社死记录已载入。不过没关系——每次翻车都是节目效果。' },
  survive:  { icon: icon.alert, title: '求生本能评估启动…',     body: '危机应对能力即将被量化。能在数学课上活下来的都不简单。' },
}

const insight = computed(() => dimInsights[current.value.dim])

const reactionMap = Object.fromEntries([
  '标准操作','熟练工','老油条','三好学生','经典流派','理性蒙题','统计学蒙题','诚实但分低',
  '体面人','经典逃生','团队协作','太实诚了','低调装逼','高调装逼','危险发言','深藏不露',
  '默默承受','强行挽尊','嘴硬王者','习得性无助','亡羊补牢','资源整合','人情世故','赌博行为',
  '物理唤醒','生物钟精准','社交唤醒','你在撒谎','朴素直觉','制造工作量','侦查能力','逻辑自洽',
  '内心戏丰富','阴阳大师','正义执行','自我保护','优雅装逼','表演型人格','明星待遇','创伤后应激',
  '轻度社死','睡眠艺术家','深度睡眠','地理劣势','转移焦点','态度流','比较文学','时间管理'
].map((label, index) => [label, {
  icon: [icon.doc, icon.target, icon.shield, icon.spark, icon.clock][index % 5],
  title: label,
  sub: '你的选择已记录，正在更新数学课生存画像。'
}]))

const socialMessages = [
  '已有 2,847 人完成测试',
  '63% 的人在第3题选了蒙',
  '仅 8% 的人拿到隐藏卷王',
  '隔壁班正在疯狂转发中',
  '第5题是翻车率最高的一题',
  '刚才有3个人同时测出透明人',
  '你的同桌可能也在偷偷测',
  '第9题的社死率高达71%',
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
  lastReaction.value = reactionMap[option.label] || { icon: icon.spark, title: option.label, sub: option.note }
  isMoving.value = true

  const nextIdx = currentIndex.value + 1
  if (nextIdx === 3) milestone.value = '1/4 达成！渐入佳境'
  else if (nextIdx === 6) milestone.value = '过半了！稳如老狗'
  else if (nextIdx === 9) milestone.value = '最后四题！别翻车'
  else if (nextIdx === 12) milestone.value = '最后一题！人设即将揭晓'
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
