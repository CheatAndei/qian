<template>
  <div class="quiz">
    <header class="topbar">
      <button class="exit" @click="handleExit" aria-label="退出"><Icon icon="mdi:close-thick" /></button>
      <div class="track"><div class="track-fill" :style="{ width: progressPct + '%' }"></div></div>
      <span class="counter mono">{{ currentNo }}<i>/{{ totalQuestions }}</i></span>
    </header>

    <main class="body" v-if="!finished">
      <transition :name="slideDir" mode="out-in">
        <div class="zine" :key="currentIdx">
          <!-- 普通题 -->
          <template v-if="!isBonus">
            <div class="zine-head">
              <span class="zine-q mono">本期第 {{ currentIdx + 1 }} 问</span>
              <span class="zine-tape"></span>
            </div>
            <h2 class="zine-question">{{ neutralizeText(currentQ.question) }}</h2>

            <div class="picks">
              <button
                v-for="(opt, i) in currentQ.options"
                :key="i"
                class="pick"
                :class="{ 'is-pick': selected === i }"
                @click="selectOption(i)"
              >
                <span class="pick-key mono">{{ ['A', 'B', 'C', 'D'][i] }}</span>
                <span class="pick-text">{{ neutralizeText(opt.text) }}</span>
                <Icon v-if="selected === i" class="pick-on" icon="mdi:check-circle" />
              </button>
            </div>

            <div class="zine-foot">
              <button class="prev" :class="{ hide: currentIdx === 0 }" @click="goPrev"><Icon icon="mdi:chevron-left" /> 上一页</button>
              <span class="hint mono" v-if="selected === null">选完自动翻页</span>
            </div>
          </template>

          <!-- 加分题 -->
          <template v-else>
            <div class="zine-head">
              <span class="zine-q mono">读者自评</span>
              <span class="zine-tape"></span>
            </div>
            <h2 class="zine-question">{{ bonusQ.question }}</h2>
            <p class="bonus-tip">{{ bonusQ.subtitle }}</p>

            <div class="bonus-read">
              <span class="bonus-num mono">{{ bonusScore }}</span><i class="mono">/10</i>
              <span class="bonus-mood mono">{{ bonusMood }}</span>
            </div>
            <input type="range" min="0" max="10" v-model.number="bonusScore" class="bonus-range" />
            <div class="bonus-scale mono"><span>0</span><span>5</span><span>10</span></div>

            <button class="bonus-cta" @click="submitBonus"><Icon icon="mdi:camera-iris" /> 冲洗我的风格刊</button>
            <button class="bonus-back" @click="goPrev">再斟酌一下</button>
          </template>
        </div>
      </transition>

      <!-- 编辑部批注 -->
      <div class="notes" v-if="roastHistory.length">
        <p class="notes-title mono"><Icon icon="mdi:comment-quote-outline" /> 编辑部批注</p>
        <TransitionGroup name="note" tag="div" class="notes-list">
          <div
            v-for="(item, idx) in roastHistory"
            :key="item.id"
            class="note-item"
            :class="['m-' + item.cls, { 'is-new': idx === roastHistory.length - 1 }]"
          >
            <Icon class="note-ic" :icon="item.icon" />
            <span class="note-text">{{ neutralizeText(item.text) }}</span>
          </div>
        </TransitionGroup>
      </div>
    </main>

    <div class="finish" v-else>
      <div class="finish-ring"><Icon icon="mdi:camera-iris" /></div>
      <h2>拍立得冲洗中</h2>
      <p class="mono">正在为你排版本期风格刊…</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import gsap from 'gsap'
import Icon from '../components/Icon.vue'
import { questions, bonusQuestion, neutralizeText } from '../data/questions.js'

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

function stripEmoji(s) {
  return String(s || '').replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2190}-\u{21FF}\u{2B00}-\u{2BFF}️‍]/gu, '').trim()
}

const fallback = {
  3: ['这条很加分', '人设立住了'],
  2: ['还不错，收录', '有点意思'],
  1: ['编辑挑眉，存疑', '差点意思'],
  0: ['这条得退回重写', '红线预警'],
}
const markByScore = {
  3: { icon: 'mdi:star-four-points-outline', cls: 'ok' },
  2: { icon: 'mdi:check-circle', cls: 'ok' },
  1: { icon: 'mdi:pencil', cls: 'warn' },
  0: { icon: 'mdi:comment-quote-outline', cls: 'bad' },
}

function selectOption(i) {
  if (lock) return
  lock = true
  selected.value = i
  nextTick(() => {
    const el = document.querySelector('.pick.is-pick')
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
    const items = document.querySelectorAll('.note-item.is-new')
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
  --mag-white: #faf6ef;
  --surface: #ffffff;
  --ink: #1a1714;
  --ink-2: #8a8076;
  --ink-3: #b3a89c;
  --magenta: #e84576;
  --magenta-deep: #c9356a;
  --magenta-soft: rgba(232, 69, 118, 0.1);
  --line: rgba(26, 23, 20, 0.14);
  --yellow: #f4c430;
  --mono: 'SFMono-Regular', ui-monospace, 'JetBrains Mono', Consolas, monospace;
  min-height: 100vh;
  max-width: 480px;
  margin: 0 auto;
  background: var(--mag-white);
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}
.mono { font-family: var(--mono); font-variant-numeric: tabular-nums; letter-spacing: 0.3px; }

.topbar { position: sticky; top: 0; z-index: 10; display: flex; align-items: center; gap: 12px; padding: 12px 16px; background: color-mix(in srgb, var(--mag-white) 90%, transparent); backdrop-filter: blur(10px); border-bottom: 1.5px solid var(--ink); }
.exit { width: 40px; height: 40px; border: 1.5px solid var(--ink); background: var(--surface); color: var(--ink); border-radius: 11px; font-size: 16px; display: grid; place-items: center; }
.track { flex: 1; height: 8px; border-radius: 99px; background: #ece4d6; border: 1px solid var(--line); overflow: hidden; }
.track-fill { height: 100%; background: var(--magenta); border-radius: inherit; transition: width 0.35s ease; }
.counter { font-size: 14px; color: var(--ink); font-weight: 800; flex-shrink: 0; white-space: nowrap; }
.counter i { font-style: normal; color: var(--ink-3); font-size: 12px; font-weight: 400; }

.body { flex: 1; padding: 18px 16px 40px; }
.zine { background: var(--surface); border: 1.5px solid var(--ink); border-radius: 14px; padding: 20px 18px 22px; position: relative; box-shadow: 5px 5px 0 var(--magenta-soft); }
.zine-head { display: flex; align-items: center; gap: 10px; }
.zine-q { font-size: 12px; color: #fff; background: var(--magenta); padding: 3px 11px; border-radius: 4px; font-weight: 800; transform: rotate(-1.5deg); }
.zine-tape { flex: 1; height: 14px; background: repeating-linear-gradient(45deg, var(--yellow) 0 6px, transparent 6px 12px); opacity: 0.5; border-radius: 2px; }
.zine-question { font-size: 21px; font-weight: 800; color: var(--ink); line-height: 1.45; margin: 14px 0 20px; }

.picks { display: flex; flex-direction: column; gap: 10px; }
.pick { display: flex; align-items: center; gap: 12px; width: 100%; padding: 13px 14px; border: 1.5px solid var(--line); border-radius: 12px; background: var(--mag-white); text-align: left; font-family: inherit; transition: border-color 0.2s, background 0.2s, box-shadow 0.2s; }
.pick:active { transform: scale(0.99); }
.pick.is-pick { border-color: var(--magenta); background: var(--magenta-soft); box-shadow: 3px 3px 0 var(--magenta-soft); }
.pick-key { width: 28px; height: 28px; border-radius: 8px; border: 1.5px solid var(--line); color: var(--ink-2); font-size: 12px; font-weight: 800; display: grid; place-items: center; flex-shrink: 0; transition: all 0.2s; }
.pick.is-pick .pick-key { background: var(--magenta); border-color: var(--magenta); color: #fff; }
.pick-text { flex: 1; font-size: 14.5px; color: var(--ink); line-height: 1.5; }
.pick-on { color: var(--magenta); font-size: 18px; flex-shrink: 0; }

.zine-foot { display: flex; align-items: center; justify-content: space-between; margin-top: 18px; min-height: 36px; }
.prev { border: none; background: #efe8da; color: var(--ink-2); display: inline-flex; align-items: center; gap: 3px; font-size: 13px; font-weight: 600; padding: 9px 16px; border-radius: 18px; }
.prev.hide { visibility: hidden; }
.hint { font-size: 11px; color: var(--ink-3); }

.bonus-tip { font-size: 13px; color: var(--ink-2); margin: 10px 0 16px; }
.bonus-read { display: flex; align-items: baseline; gap: 6px; }
.bonus-num { font-size: 44px; font-weight: 900; color: var(--magenta); line-height: 1; }
.bonus-read i { font-style: normal; font-size: 16px; color: var(--ink-3); }
.bonus-mood { margin-left: auto; align-self: center; font-size: 13px; color: var(--ink-2); border: 1.5px solid var(--ink); padding: 3px 12px; border-radius: 99px; }
.bonus-range { width: 100%; margin: 14px 0 4px; -webkit-appearance: none; appearance: none; height: 6px; border-radius: 6px; background: linear-gradient(90deg, #ece4d6, var(--magenta)); outline: none; }
.bonus-range::-webkit-slider-thumb { -webkit-appearance: none; width: 28px; height: 28px; border-radius: 50%; background: #fff; border: 3px solid var(--magenta); box-shadow: 0 2px 10px rgba(232, 69, 118, 0.25); cursor: pointer; }
.bonus-scale { display: flex; justify-content: space-between; font-size: 11px; color: var(--ink-3); margin-bottom: 20px; padding: 0 4px; }
.bonus-cta { width: 100%; height: 52px; border: none; border-radius: 13px; background: var(--ink); color: var(--mag-white); font-size: 16px; font-weight: 800; display: flex; align-items: center; justify-content: center; gap: 8px; box-shadow: 4px 4px 0 var(--magenta); margin-bottom: 10px; }
.bonus-cta:active { transform: translate(2px, 2px); box-shadow: 2px 2px 0 var(--magenta); }
.bonus-back { border: none; background: none; font-size: 13px; color: var(--ink-3); padding: 4px; font-family: inherit; }

.notes { padding: 16px 8px 0; }
.notes-title { font-size: 11px; color: var(--ink-3); letter-spacing: 0.5px; display: flex; align-items: center; gap: 5px; margin-bottom: 8px; }
.notes-list { display: flex; flex-direction: column; gap: 6px; }
.note-item { display: flex; align-items: center; gap: 9px; background: var(--surface); border: 1.5px solid var(--line); padding: 9px 13px; border-radius: 10px; max-height: 60px; overflow: hidden; animation: noteFade 5s ease-in forwards; }
.note-ic { font-size: 18px; flex-shrink: 0; }
.m-ok .note-ic { color: var(--magenta); }
.m-warn .note-ic { color: var(--ink); }
.m-bad .note-ic { color: var(--magenta-deep); }
.note-text { font-size: 13px; color: var(--ink); line-height: 1.4; }
@keyframes noteFade { 0% { opacity: 1; } 64% { opacity: 0.7; } 100% { opacity: 0; } }
.note-enter-active { animation: noteIn 0.35s ease; }
.note-leave-active { transition: max-height 0.4s ease, padding 0.4s ease, margin 0.4s ease, opacity 0.3s ease; max-height: 0 !important; padding-top: 0 !important; padding-bottom: 0 !important; margin-bottom: 0 !important; opacity: 0; }
.note-move { transition: transform 0.4s ease; }
@keyframes noteIn { from { transform: translateY(10px) scale(0.9); opacity: 0; } to { transform: translateY(0) scale(1); opacity: 1; } }

.slide-left-enter-active, .slide-left-leave-active, .slide-right-enter-active, .slide-right-leave-active { transition: all 0.28s ease; }
.slide-left-enter-from { transform: translateX(28px); opacity: 0; }
.slide-left-leave-to { transform: translateX(-28px); opacity: 0; }
.slide-right-enter-from { transform: translateX(-28px); opacity: 0; }
.slide-right-leave-to { transform: translateX(28px); opacity: 0; }

.finish { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 60vh; gap: 10px; }
.finish-ring { width: 84px; height: 84px; border-radius: 50%; border: 1.5px solid var(--ink); background: var(--surface); display: grid; place-items: center; color: var(--magenta); font-size: 40px; }
.finish h2 { font-size: 22px; color: var(--ink); }
.finish p { font-size: 13px; color: var(--ink-2); }

@media (prefers-reduced-motion: reduce) {
  .note-item { animation: none !important; }
}
</style>
