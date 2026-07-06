<template>
  <div class="quiz">
    <!-- 顶栏 -->
    <header class="topbar">
      <button class="exit" @click="handleExit" aria-label="退出"><Icon icon="mdi:close-thick" /></button>
      <div class="track"><div class="track-fill" :style="{ width: progressPct + '%' }"></div></div>
      <span class="counter mono">{{ currentNo }}<i>/{{ totalQuestions }}</i></span>
    </header>

    <!-- 题目区 -->
    <main class="body" v-if="!finished">
      <transition :name="slideDir" mode="out-in">
        <div class="paper" :key="currentIdx">
          <!-- 普通题 -->
          <template v-if="!isBonus">
            <div class="paper-head">
              <span class="paper-q mono">第 {{ currentIdx + 1 }} 题</span>
              <span class="paper-sub mono">客观题 · 3 分</span>
            </div>
            <h2 class="paper-question">{{ currentQ.question }}</h2>

            <div class="sheet">
              <button
                v-for="(opt, i) in currentQ.options"
                :key="i"
                class="row"
                :class="{ 'is-pick': selected === i }"
                @click="selectOption(i)"
              >
                <span class="bubble mono">{{ ['A', 'B', 'C', 'D'][i] }}</span>
                <span class="row-text">{{ opt.text }}</span>
                <Icon v-if="selected === i" class="row-check" icon="mdi:check-bold" />
              </button>
            </div>

            <div class="paper-foot">
              <button class="prev" :class="{ hide: currentIdx === 0 }" @click="goPrev"><Icon icon="mdi:chevron-left" /> 上一题</button>
              <span class="hint mono" v-if="selected === null">选完自动批下一题</span>
            </div>
          </template>

          <!-- 加分题 -->
          <template v-else>
            <div class="paper-head">
              <span class="paper-q mono">加分题</span>
              <span class="paper-sub mono">姐妹评审 · 0–10 分</span>
            </div>
            <h2 class="paper-question">{{ bonusQ.question }}</h2>
            <p class="bonus-tip">{{ bonusQ.subtitle }}</p>

            <div class="bonus-read">
              <span class="bonus-num mono">{{ bonusScore }}</span><i class="mono">/10</i>
              <span class="bonus-mood mono">{{ bonusMood }}</span>
            </div>
            <input type="range" min="0" max="10" v-model.number="bonusScore" class="bonus-range" />
            <div class="bonus-scale mono"><span>0</span><span>5</span><span>10</span></div>

            <button class="bonus-cta" @click="submitBonus">
              <Icon icon="mdi:seal-variant" /> 提交最终得分
            </button>
            <button class="bonus-back" @click="goPrev">再斟酌一下</button>
          </template>
        </div>
      </transition>

      <!-- 阅卷批注（原闺蜜吐槽） -->
      <div class="roast" v-if="roastHistory.length">
        <p class="roast-title mono"><Icon icon="mdi:comment-quote-outline" /> 阅卷批注</p>
        <TransitionGroup name="bubble" tag="div" class="roast-list">
          <div
            v-for="(item, idx) in roastHistory"
            :key="item.id"
            class="roast-item"
            :class="['m-' + item.cls, { 'is-new': idx === roastHistory.length - 1 }]"
          >
            <Icon class="roast-ic" :icon="item.icon" />
            <span class="roast-text">{{ item.text }}</span>
          </div>
        </TransitionGroup>
      </div>
    </main>

    <!-- 交卷过渡 -->
    <div class="finish" v-else>
      <div class="finish-ring"><Icon icon="mdi:file-document-edit-outline" /></div>
      <h2>交卷成功</h2>
      <p class="mono">红笔已就位，正在批改…</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import gsap from 'gsap'
import Icon from '../components/Icon.vue'
import { questions, bonusQuestion } from '../data/questions.js'

const router = useRouter()

const currentIdx = ref(0)
const answersMap = ref({})
const selected = ref(null)
const slideDir = ref('slide-left')
const finished = ref(false)
const bonusScore = ref(5)

const bonusMood = computed(() => {
  if (bonusScore.value <= 3) return '再想想'
  if (bonusScore.value <= 5) return '还行吧'
  if (bonusScore.value <= 7) return '不错哦'
  if (bonusScore.value <= 9) return '很满意'
  return '满分'
})
const roastHistory = ref([])
let roastId = 0
let lock = false

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
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
const currentNo = computed(() => (isBonus.value ? 'B' : currentIdx.value + 1))
const progressPct = computed(() => (currentIdx.value / (questions.length + 1)) * 100)

function restoreSelected() {
  if (isBonus.value) { selected.value = null; return }
  const prev = answersMap.value[currentQ.value.id]
  selected.value = prev ? currentQ.value.options.findIndex((o) => o.text === prev.text) : null
}
restoreSelected()

// 去 emoji 渲染（数据层文案保留，展示时剥离 emoji）
function stripEmoji(s) {
  return String(s || '').replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2190}-\u{21FF}\u{2B00}-\u{2BFF}️‍]/gu, '').trim()
}

const fallback = {
  3: ['哟，还挺会嘛', '满分操作'],
  2: ['还行还行，及格线以上', '有点东西'],
  1: ['啧…勉强给个同情分', '有点危险'],
  0: ['姐妹你认真的吗', '下一个更乖'],
}
// 按得分映射红笔标记
const markByScore = {
  3: { icon: 'mdi:check-circle', cls: 'ok' },
  2: { icon: 'mdi:check-bold', cls: 'ok' },
  1: { icon: 'mdi:alert-circle-outline', cls: 'warn' },
  0: { icon: 'mdi:flag-variant-outline', cls: 'bad' },
}

function selectOption(i) {
  if (lock) return
  lock = true
  selected.value = i
  nextTick(() => {
    const el = document.querySelector('.row.is-pick')
    if (el) gsap.from(el, { scale: 0.97, duration: 0.35, ease: 'back.out(2)' })
  })
  const opt = currentQ.value.options[i]
  answersMap.value[currentQ.value.id] = {
    questionId: currentQ.value.id,
    score: opt.score,
    tags: opt.tags || [],
    text: opt.text,
  }
  const text = stripEmoji(opt.roast || (fallback[opt.score] || fallback[1])[0])
  const mark = markByScore[opt.score] || markByScore[1]
  const id = ++roastId
  roastHistory.value.push({ id, text, icon: mark.icon, cls: mark.cls })
  if (roastHistory.value.length > 3) roastHistory.value.shift()
  setTimeout(() => {
    roastHistory.value = roastHistory.value.filter((r) => r.id !== id)
  }, 5200)
  nextTick(() => {
    const items = document.querySelectorAll('.roast-item.is-new')
    const last = items[items.length - 1]
    if (last) gsap.from(last, { opacity: 0, y: 18, scale: 0.85, duration: 0.4, ease: 'back.out(1.7)' })
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
    if (!window.confirm('确定要退出吗？已答的题目不会保存。')) return
  }
  router.replace('/')
}

function submitBonus() {
  const objectiveScore = Object.values(answersMap.value).reduce((sum, a) => sum + (a.score || 0), 0)
  const total = objectiveScore + bonusScore.value
  const answerList = Object.values(answersMap.value)
  finished.value = true
  setTimeout(() => {
    router.push({
      path: '/result',
      query: { objective: objectiveScore, bonus: bonusScore.value, total, answers: JSON.stringify(answerList) },
    })
  }, 1000)
}
</script>

<style scoped>
.quiz {
  --paper: #f6f2e9;
  --surface: #fffdf7;
  --ink: #2a2622;
  --ink-2: #6f665d;
  --ink-3: #9a9087;
  --red: #d7263d;
  --red-deep: #c0202e;
  --red-soft: rgba(215, 38, 61, 0.1);
  --line: rgba(42, 38, 34, 0.12);
  --ok: #2f9e44;
  --warn: #d98a00;
  --mono: 'SFMono-Regular', ui-monospace, 'JetBrains Mono', Consolas, monospace;
  min-height: 100vh;
  max-width: 480px;
  margin: 0 auto;
  background: var(--paper);
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}
.mono { font-family: var(--mono); font-variant-numeric: tabular-nums; letter-spacing: 0.3px; }

.topbar { position: sticky; top: 0; z-index: 10; display: flex; align-items: center; gap: 12px; padding: 12px 16px; background: color-mix(in srgb, var(--paper) 90%, transparent); backdrop-filter: blur(10px); border-bottom: 1px solid var(--line); }
.exit { width: 40px; height: 40px; border: 1px solid var(--line); background: var(--surface); color: var(--ink-2); border-radius: 11px; font-size: 16px; display: grid; place-items: center; }
.track { flex: 1; height: 8px; border-radius: 99px; background: #e7e0d3; overflow: hidden; }
.track-fill { height: 100%; background: var(--red); border-radius: inherit; transition: width 0.35s ease; }
.counter { font-size: 14px; color: var(--ink); font-weight: 800; flex-shrink: 0; white-space: nowrap; }
.counter i { font-style: normal; color: var(--ink-3); font-size: 12px; font-weight: 400; }

.body { flex: 1; padding: 18px 16px 40px; }
.paper {
  background:
    repeating-linear-gradient(180deg, transparent 0 31px, rgba(42, 38, 34, 0.05) 31px 32px),
    var(--surface);
  border: 1px solid var(--line);
  border-radius: 16px;
  padding: 20px 18px 22px;
  position: relative;
  box-shadow: 0 10px 30px rgba(42, 38, 34, 0.08);
}
.paper::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 4px; background: var(--red); opacity: 0.85; border-radius: 16px 0 0 16px; }
.paper-head { display: flex; align-items: baseline; justify-content: space-between; padding-left: 8px; }
.paper-q { font-size: 12px; color: var(--red); font-weight: 800; letter-spacing: 0.5px; }
.paper-sub { font-size: 10.5px; color: var(--ink-3); }
.paper-question { font-size: 20px; font-weight: 800; color: var(--ink); line-height: 1.5; margin: 12px 0 20px; padding-left: 8px; }

.sheet { display: flex; flex-direction: column; gap: 10px; }
.row { display: flex; align-items: center; gap: 12px; width: 100%; padding: 13px 14px; border: 1.5px solid var(--line); border-radius: 13px; background: var(--paper); text-align: left; font-family: inherit; transition: border-color 0.2s, background 0.2s; }
.row:active { transform: scale(0.99); }
.row.is-pick { border-color: var(--red); background: var(--red-soft); }
.bubble { width: 28px; height: 28px; border-radius: 50%; border: 1.5px solid var(--line); color: var(--ink-2); font-size: 12px; font-weight: 800; display: grid; place-items: center; flex-shrink: 0; transition: all 0.2s; }
.row.is-pick .bubble { background: var(--red); border-color: var(--red); color: #fff; }
.row-text { flex: 1; font-size: 14.5px; color: var(--ink); line-height: 1.5; }
.row-check { color: var(--red); font-size: 18px; flex-shrink: 0; }

.paper-foot { display: flex; align-items: center; justify-content: space-between; margin-top: 18px; padding-left: 8px; min-height: 36px; }
.prev { border: none; background: #efe8da; color: var(--ink-2); display: inline-flex; align-items: center; gap: 3px; font-size: 13px; font-weight: 600; padding: 9px 16px; border-radius: 18px; }
.prev.hide { visibility: hidden; }
.hint { font-size: 11px; color: var(--ink-3); }

/* 加分题 */
.bonus-tip { font-size: 13px; color: var(--ink-2); margin: 6px 0 16px; padding-left: 8px; }
.bonus-read { display: flex; align-items: baseline; gap: 6px; padding-left: 8px; }
.bonus-num { font-size: 44px; font-weight: 900; color: var(--red); line-height: 1; }
.bonus-read i { font-style: normal; font-size: 16px; color: var(--ink-3); }
.bonus-mood { margin-left: auto; align-self: center; font-size: 13px; color: var(--ink-2); border: 1px solid var(--line); padding: 3px 12px; border-radius: 99px; }
.bonus-range { width: 100%; margin: 14px 0 4px; -webkit-appearance: none; appearance: none; height: 6px; border-radius: 6px; background: linear-gradient(90deg, #e7e0d3, var(--red)); outline: none; }
.bonus-range::-webkit-slider-thumb { -webkit-appearance: none; width: 28px; height: 28px; border-radius: 50%; background: #fff; border: 3px solid var(--red); box-shadow: 0 2px 10px rgba(215, 38, 61, 0.25); cursor: pointer; }
.bonus-scale { display: flex; justify-content: space-between; font-size: 11px; color: var(--ink-3); margin-bottom: 20px; padding: 0 4px; }
.bonus-cta { width: 100%; height: 52px; border: none; border-radius: 14px; background: var(--red); color: #fff; font-size: 16px; font-weight: 800; display: flex; align-items: center; justify-content: center; gap: 8px; box-shadow: 0 10px 24px rgba(215, 38, 61, 0.28); margin-bottom: 10px; }
.bonus-cta:active { transform: scale(0.98); }
.bonus-back { border: none; background: none; font-size: 13px; color: var(--ink-3); padding: 4px; font-family: inherit; }

/* 阅卷批注 */
.roast { padding: 16px 8px 0; }
.roast-title { font-size: 11px; color: var(--ink-3); letter-spacing: 0.5px; display: flex; align-items: center; gap: 5px; margin-bottom: 8px; }
.roast-list { display: flex; flex-direction: column; gap: 6px; }
.roast-item { display: flex; align-items: center; gap: 9px; background: var(--surface); border: 1px solid var(--line); padding: 9px 13px; border-radius: 12px; max-height: 60px; overflow: hidden; animation: roastFade 5s ease-in forwards; }
.roast-ic { font-size: 18px; flex-shrink: 0; }
.m-ok .roast-ic { color: var(--ok); }
.m-warn .roast-ic { color: var(--warn); }
.m-bad .roast-ic { color: var(--red); }
.roast-text { font-size: 13px; color: var(--ink); line-height: 1.4; }
@keyframes roastFade { 0% { opacity: 1; } 64% { opacity: 0.7; } 100% { opacity: 0; } }
.bubble-enter-active { animation: bubbleIn 0.35s ease; }
.bubble-leave-active { transition: max-height 0.4s ease, padding 0.4s ease, margin 0.4s ease, opacity 0.3s ease; max-height: 0 !important; padding-top: 0 !important; padding-bottom: 0 !important; margin-bottom: 0 !important; opacity: 0; }
.bubble-move { transition: transform 0.4s ease; }
@keyframes bubbleIn { from { transform: translateY(10px) scale(0.9); opacity: 0; } to { transform: translateY(0) scale(1); opacity: 1; } }

/* 滑动过渡 */
.slide-left-enter-active, .slide-left-leave-active, .slide-right-enter-active, .slide-right-leave-active { transition: all 0.28s ease; }
.slide-left-enter-from { transform: translateX(28px); opacity: 0; }
.slide-left-leave-to { transform: translateX(-28px); opacity: 0; }
.slide-right-enter-from { transform: translateX(-28px); opacity: 0; }
.slide-right-leave-to { transform: translateX(28px); opacity: 0; }

/* 完成 */
.finish { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 60vh; gap: 10px; }
.finish-ring { width: 84px; height: 84px; border-radius: 50%; border: 1px solid var(--line); background: var(--surface); display: grid; place-items: center; color: var(--red); font-size: 40px; }
.finish h2 { font-size: 22px; color: var(--ink); }
.finish p { font-size: 13px; color: var(--ink-2); }

@media (prefers-reduced-motion: reduce) {
  .roast-item { animation: none !important; }
}
</style>
