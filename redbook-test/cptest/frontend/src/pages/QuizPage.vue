<template>
  <div class="quiz">
    <!-- 顶栏 -->
    <header class="topbar">
      <button class="topbar-back" @click="handleExit">✕ 退出</button>
      <div class="topbar-progress">
        <div class="progress-track">
          <div class="progress-fill" :style="{ width: progressPct + '%' }"></div>
        </div>
      </div>
      <span class="topbar-num">{{ currentNo }}/{{ totalQuestions }}</span>
    </header>

    <!-- 题目区 -->
    <main class="quiz-body" v-if="!finished">
      <transition :name="slideDir" mode="out-in">
        <div class="card" :key="currentIdx">

          <!-- 普通题 -->
          <template v-if="!isBonus">
            <p class="card-emoji">{{ currentQ.emoji }}</p>
            <p class="card-label">第 {{ currentIdx + 1 }} 题</p>
            <h2 class="card-question">{{ currentQ.question }}</h2>

            <div class="options">
              <button
                v-for="(opt, i) in currentQ.options"
                :key="i"
                class="opt"
                :class="{ 'opt--pick': selected === i }"
                @click="selectOption(i)"
              >
                <span class="opt-mark">{{ ['A','B','C','D'][i] }}</span>
                <span class="opt-text">{{ opt.text }}</span>
              </button>
            </div>

            <!-- 底部操作 -->
            <div class="card-actions">
              <button class="act-prev" :class="{ invisible: currentIdx === 0 }" @click="goPrev">← 上一题</button>
              <span class="act-hint" v-if="selected === null">点击选项自动进入下一题</span>
            </div>
          </template>

          <!-- 加分题 -->
          <template v-else>
            <p class="card-emoji bonus-pulse">{{ bonusMood.emoji }}</p>
            <p style="font-size:13px;color:var(--text-light);margin-top:-8px">{{ bonusMood.label }}</p>
            <span class="bonus-chip">加分题</span>
            <h2 class="card-question">{{ bonusQ.question }}</h2>
            <p class="bonus-tip">{{ bonusQ.subtitle }}</p>

            <div class="bonus-score">{{ bonusScore }}<small>/10</small></div>
            <input type="range" min="0" max="10" v-model.number="bonusScore" class="bonus-range" />
            <div class="bonus-labels"><span>0</span><span>5</span><span>10</span></div>

            <button class="bonus-cta" @click="submitBonus">提交最终得分 💝</button>
            <button class="bonus-back" @click="goPrev">🤔 再犹豫一下</button>
          </template>

        </div>
      </transition>

      <!-- 闺蜜吐槽区 -->
      <div class="roast-zone" v-if="roastHistory.length">
        <p class="roast-zone-title">💬 闺蜜吐槽</p>
        <TransitionGroup name="bubble" tag="div" class="roast-list">
          <div
            v-for="(item, idx) in roastHistory"
            :key="item.id"
            class="roast-bubble"
            :class="{ 'roast-bubble--new': idx === roastHistory.length - 1 }"
          >
            <span class="roast-bubble-avatar">{{ item.avatar }}</span>
            <span class="roast-bubble-text">{{ item.text }}</span>
          </div>
        </TransitionGroup>
      </div>
    </main>

    <!-- 交卷过渡 -->
    <div class="finish" v-else>
      <p class="finish-emoji">📝</p>
      <h2>交卷成功</h2>
      <p>正在批改……</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import gsap from 'gsap'
import { questions, bonusQuestion } from '../data/questions.js'

const router = useRouter()

const currentIdx = ref(0)
const answersMap = ref({})   // { [questionId]: { questionId, score, tags, text } }
const selected = ref(null)   // 当前高亮的选项 index
const slideDir = ref('slide-left')
const finished = ref(false)
const bonusScore = ref(5)

const bonusMood = computed(() => {
  if (bonusScore.value <= 3) return { emoji: '😤', label: '再想想...' }
  if (bonusScore.value <= 5) return { emoji: '🤔', label: '还行吧' }
  if (bonusScore.value <= 7) return { emoji: '😊', label: '不错哦' }
  if (bonusScore.value <= 9) return { emoji: '🥰', label: '很满意！' }
  return { emoji: '😍', label: '满分！' }
})
const roastHistory = ref([])  // 闺蜜吐槽历史 [{id, text, avatar}]
let roastId = 0
let lock = false             // 防连点 + 区分新题/修改

// 每题选项随机打乱（只打乱一次，缓存）
function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
const shuffledCache = {}
function getShuffled(q) {
  if (!shuffledCache[q.id]) shuffledCache[q.id] = shuffle(q.options)
  return shuffledCache[q.id]
}

const totalQuestions = 31
const isBonus = computed(() => currentIdx.value >= questions.length)
const currentQ = computed(() => {
  const q = questions[currentIdx.value]
  return { ...q, options: getShuffled(q) }
})
const bonusQ = bonusQuestion
const currentNo = computed(() => isBonus.value ? 'B' : currentIdx.value + 1)
const progressPct = computed(() => (currentIdx.value / (questions.length + 1)) * 100)

function restoreSelected() {
  if (isBonus.value) { selected.value = null; return }
  const prev = answersMap.value[currentQ.value.id]
  selected.value = prev
    ? currentQ.value.options.findIndex(o => o.text === prev.text)
    : null
}
restoreSelected()

// 通用吐槽备选
const fallback = {
  3: ['哟，还挺会嘛 😏','满分操作！'],
  2: ['还行还行，及格线以上 😊','有点东西~'],
  1: ['啧...勉强给个同情分 😬','有点危险...'],
  0: ['姐妹你认真的吗... 🚩','下一个更乖 🙏']
}

const scoreAvatars = { 3: '🥰', 2: '😊', 1: '😬', 0: '🚩' }

function selectOption(i) {
  if (lock) return
  lock = true
  selected.value = i
  nextTick(() => {
    const el = document.querySelector('.opt--pick')
    if (el) {
      gsap.from(el, { scale: 0.95, duration: 0.4, ease: 'back.out(2)' })
    }
  })
  const opt = currentQ.value.options[i]
  answersMap.value[currentQ.value.id] = {
    questionId: currentQ.value.id,
    score: opt.score,
    tags: opt.tags || [],
    text: opt.text
  }
  // 存入吐槽历史（最多 3 条，CSS 5s 渐隐）
  const text = opt.roast || (fallback[opt.score] || fallback[1])[0]
  const id = ++roastId
  roastHistory.value.push({ id, text, avatar: scoreAvatars[opt.score] || '💬' })
  if (roastHistory.value.length > 3) roastHistory.value.shift()
  // 5s 后移除
  setTimeout(() => {
    roastHistory.value = roastHistory.value.filter(r => r.id !== id)
  }, 5200)
  nextTick(() => {
    const bubbles = document.querySelectorAll('.roast-bubble--new')
    const last = bubbles[bubbles.length - 1]
    if (last) {
      gsap.from(last, { opacity: 0, y: 20, scale: 0.8, duration: 0.4, ease: 'back.out(1.7)' })
    }
  })

  setTimeout(() => goNext(), 450)
}

function goNext() {
  if (currentIdx.value < questions.length) {
    slideDir.value = 'slide-left'
    currentIdx.value++
    restoreSelected()
    lock = false
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

function goPrev() {
  if (currentIdx.value === 0) return
  slideDir.value = 'slide-right'
  currentIdx.value--
  restoreSelected()
  lock = false
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function handleExit() {
  if (Object.keys(answersMap.value).length > 0) {
    if (!window.confirm('确定要退出吗？已答的题目不会保存哦～')) return
  }
  router.replace('/')
}

function submitBonus() {
  const objectiveScore = Object.values(answersMap.value)
    .reduce((sum, a) => sum + (a.score || 0), 0)
  const total = objectiveScore + bonusScore.value
  const answerList = Object.values(answersMap.value)

  finished.value = true
  setTimeout(() => {
    router.push({
      path: '/result',
      query: {
        objective: objectiveScore,
        bonus: bonusScore.value,
        total,
        answers: JSON.stringify(answerList)
      }
    })
  }, 1000)
}
</script>

<style scoped>
.quiz {
  min-height: 100vh;
  background: linear-gradient(180deg, #FFF0F5 0%, #FFE4EC 50%, #FFF5F8 100%);
}
/* ---- 顶栏 ---- */
.topbar {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  background: linear-gradient(180deg, rgba(255,255,255,0.95), rgba(255,245,248,0.9));
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255,160,196,0.15);
}
.topbar-back {
  border: none; background: none;
  font-size: 14px; color: var(--text-light);
  cursor: pointer; padding: 10px 12px;
  white-space: nowrap;
  min-width: 44px; min-height: 44px;
  display: inline-flex; align-items: center; justify-content: center;
  font-weight: 600;
}
.topbar-progress {
  flex: 1;
}
.progress-track {
  height: 6px;
  background: #F0E0E8;
  border-radius: 6px;
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #FF6B9D, #FFA0C4);
  border-radius: 6px;
  transition: width 0.35s ease;
}
.topbar-num {
  font-size: 13px;
  font-weight: 700;
  color: var(--pink);
  min-width: 40px;
  text-align: right;
}

/* ---- 卡片 ---- */
.quiz-body {
  padding: 16px 16px 40px;
  max-width: 440px;
  margin: 0 auto;
}
.card {
  background: #fff;
  border-radius: 24px;
  padding: 32px 20px 24px;
  box-shadow: 0 4px 32px rgba(180,130,150,0.1), 0 1px 4px rgba(0,0,0,0.04);
  text-align: center;
}
.card-emoji {
  font-size: 52px;
  margin: 0;
}
.card-label {
  font-size: 12px;
  color: var(--pink-light);
  font-weight: 600;
  letter-spacing: 1px;
  margin: 4px 0 8px;
}
.card-question {
  font-size: 19px;
  font-weight: 700;
  color: var(--text);
  line-height: 1.5;
  margin: 0 0 22px;
}

/* ---- 卡片滑动过渡 ---- */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.28s ease;
}
.slide-left-enter-from  { transform: translateX(30px); opacity: 0; }
.slide-left-leave-to    { transform: translateX(-30px); opacity: 0; }
.slide-right-enter-from { transform: translateX(-30px); opacity: 0; }
.slide-right-leave-to   { transform: translateX(30px); opacity: 0; }

/* ---- 选项 ---- */
.options {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.opt {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
  padding: 13px 14px;
  border: 1.5px solid #F0E0E8;
  border-radius: 14px;
  background: #FFFAFC;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.34,1.56,0.64,1);
  font-family: inherit;
  position: relative;
}
.opt::before {
  content: '';
  position: absolute;
  left: 0; top: 8px; bottom: 8px;
  width: 0;
  background: var(--pink);
  border-radius: 0 3px 3px 0;
  transition: width 0.2s ease;
}
.opt:active { transform: scale(0.985); }
.opt--pick {
  border-color: var(--pink);
  background: #FFF0F5;
  box-shadow: 0 2px 16px rgba(255,107,157,0.12);
  padding-left: 20px;
}
.opt--pick::before {
  width: 3px;
}
.opt-mark {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #F8ECF2;
  color: var(--pink);
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 1px;
}
.opt--pick .opt-mark {
  background: var(--pink);
  color: #fff;
}
.opt-text {
  font-size: 14.5px;
  color: var(--text);
  line-height: 1.5;
}

/* ---- 底部操作 ---- */
.card-actions {
  margin-top: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 32px;
}
.act-prev {
  border: none; background: #F5EEF2;
  font-size: 14px; font-weight: 600;
  color: var(--text-light); cursor: pointer;
  padding: 12px 20px; border-radius: 20px;
  min-height: 44px; display: inline-flex; align-items: center;
}
.act-prev:active { background: #ECE0E6; }
.act-prev.invisible { visibility: hidden; }
.act-hint {
  font-size: 12px;
  color: #c0a8b4;
}

/* ---- 闺蜜吐槽区 ---- */
.roast-zone {
  padding: 16px 16px 0;
  max-width: 440px;
  margin: 0 auto;
}
.roast-zone-title {
  font-size: 12px;
  font-weight: 600;
  color: #C8A8B8;
  text-align: center;
  margin-bottom: 8px;
  letter-spacing: 1px;
  text-transform: uppercase;
}
.roast-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.roast-bubble {
  display: flex;
  align-items: center;
  gap: 8px;
  background: white;
  padding: 8px 14px;
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(180,150,160,0.06);
  max-height: 60px;
  overflow: hidden;
  animation-name: roastFade;
  animation-duration: 5s;
  animation-timing-function: ease-in;
  animation-fill-mode: forwards;
}
.roast-bubble--new {
  box-shadow: 0 2px 12px rgba(255,107,157,0.12);
}
@keyframes roastFade {
  0%   { opacity: 1; }
  60%  { opacity: 0.6; }
  100% { opacity: 0; }
}

/* 气泡进入 + 离开 + 平移 */
.bubble-enter-active {
  animation: bubbleIn 0.35s ease;
}
.bubble-leave-active {
  transition: max-height 0.4s ease, padding 0.4s ease, margin 0.4s ease, opacity 0.3s ease;
  max-height: 0 !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  margin-bottom: 0 !important;
  opacity: 0;
}
.bubble-move {
  transition: transform 0.4s ease;
}
@keyframes bubbleIn {
  from { transform: translateY(10px) scale(0.9); opacity: 0; }
  to   { transform: translateY(0) scale(1); opacity: 1; }
}
.roast-bubble-avatar {
  font-size: 20px;
  flex-shrink: 0;
}
.roast-bubble-text {
  font-size: 13px;
  color: var(--text);
  line-height: 1.4;
}

/* ---- 加分题 ---- */
.bonus-pulse { animation: soft-pulse 1.8s ease-in-out infinite; }
@keyframes soft-pulse {
  0%,100%{transform:scale(1)}50%{transform:scale(1.1)}
}
.bonus-chip {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(135deg,#FF6B9D,#FF4785);
  padding: 3px 12px;
  border-radius: 10px;
  letter-spacing: 1px;
}
.bonus-tip {
  font-size: 13px;
  color: var(--text-light);
  margin: 6px 0 16px;
}
.bonus-score {
  font-size: 44px;
  font-weight: 900;
  color: var(--pink);
}
.bonus-score small { font-size: 18px; color: var(--text-light); font-weight: 500; }
.bonus-range {
  width: 100%;
  margin: 12px 0 4px;
  -webkit-appearance: none;
  height: 6px;
  border-radius: 6px;
  background: linear-gradient(90deg,#F0E0E8,#FF6B9D);
  outline: none;
}
.bonus-range::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 28px; height: 28px;
  border-radius: 50%;
  background: #fff;
  border: 3px solid var(--pink);
  box-shadow: 0 2px 10px rgba(255,107,157,0.25);
  cursor: pointer;
}
.bonus-labels {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: var(--text-light);
  margin-bottom: 20px;
  padding: 0 4px;
}
.bonus-cta {
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 14px;
  background: linear-gradient(135deg,#FF6B9D,#FF4785);
  color: #fff;
  font-size: 17px;
  font-weight: 700;
  cursor: pointer;
  font-family: inherit;
  margin-bottom: 12px;
}
.bonus-back {
  border: none;
  background: none;
  font-size: 13px;
  color: #C0A8B8;
  cursor: pointer;
  padding: 4px;
  font-family: inherit;
  transition: color 0.2s;
}
.bonus-back:active { color: var(--pink); }
/* ---- 完成 ---- */
.finish {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 55vh;
}
.finish-emoji { font-size: 56px; animation: soft-pulse 1.2s ease-in-out infinite; }
.finish h2 { font-size: 22px; color: var(--text); margin: 8px 0 4px; }
.finish p  { font-size: 14px; color: var(--text-light); }
</style>
