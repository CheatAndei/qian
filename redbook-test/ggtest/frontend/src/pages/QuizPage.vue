<template>
  <div class="quiz">
    <!-- 顶栏 -->
    <header class="topbar">
      <button class="exit" @click="handleExit" aria-label="退出">
        <Icon icon="mdi:close" />
      </button>
      <div class="track">
        <div class="track-fill" :style="{ width: progressPct + '%' }">
          <span class="track-glow"></span>
        </div>
      </div>
      <span class="counter mono">{{ pad(currentNo) }}/{{ pad(total) }}</span>
    </header>

    <!-- 题目 -->
    <main class="body" v-if="!finished">
      <transition :name="slideDir" mode="out-in">
        <div class="card" :key="currentIdx">
          <div class="card-spec">
            <span class="spec-dot"></span>
            <span class="mono">{{ currentQ.spec }}</span>
          </div>
          <p class="card-no mono">同频项 {{ pad(currentNo) }}</p>
          <h2 class="card-q">{{ currentQ.prompt }}</h2>

          <div class="opts">
            <button
              v-for="(opt, i) in currentQ.options"
              :key="i"
              class="opt"
              :class="{ 'is-pick': selected === i }"
              @click="selectOption(i)"
            >
              <span class="opt-key mono">{{ ['A', 'B', 'C', 'D'][i] }}</span>
              <span class="opt-text">{{ opt.text }}</span>
              <Icon v-if="selected === i" class="opt-check" icon="mdi:check-circle" />
            </button>
          </div>

          <!-- 读数反馈 -->
          <div class="readout" :class="{ show: selected !== null }">
            <Icon icon="mdi:pulse" />
            <span class="mono">{{ readoutText }}</span>
          </div>

          <div class="card-foot">
            <button class="prev" :class="{ hide: currentIdx === 0 }" @click="goPrev">
              <Icon icon="mdi:chevron-left" /> 上一项
            </button>
            <span class="hint" v-if="selected === null">选择后自动进入下一项</span>
          </div>
        </div>
      </transition>
    </main>

    <!-- 贴底实时监测带 -->
    <footer class="monitor-band" :class="{ 'is-react': flash }" v-if="!finished">
      <div class="mb-top">
        <span class="mono mb-label"><span class="mb-dot"></span>同频波形 · 双频比对</span>
        <span class="mono mb-res">共振 {{ resonance }}%</span>
      </div>
      <TwinWave :sync="bandSync" :amplitude="bandAmp" :height="58" :speed="5" />
    </footer>

    <!-- 采集完成 -->
    <div class="finish" v-if="finished">
      <div class="finish-ring">
        <Icon icon="mdi:account-multiple-outline" />
      </div>
      <h2>采集完成</h2>
      <p class="mono">正在比对你们的同频报告…</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import gsap from 'gsap'
import { questions } from '../data/quiz.js'
import TwinWave from '../components/TwinWave.vue'

const router = useRouter()

const currentIdx = ref(0)
const answersMap = ref({})
const selected = ref(null)
const slideDir = ref('slide-left')
const finished = ref(false)
const readoutText = ref('')
const bandSync = ref(0.4) // 双波同步度（GSAP 驱动，答题时锁相跳动）
const bandAmp = ref(0.6)
const flash = ref(false)
let tl = null
let lock = false

const total = questions.length

function clampScore(s) {
  return Math.max(0, Math.min(3, s))
}
function syncOf(score) {
  return 0.22 + (clampScore(score) / 3) * 0.74
}
const resonance = computed(() => Math.round(bandSync.value * 100))

// 答题反应：jolt=true 时两波先猛地锁相靠拢、振幅过冲，再回落到该分数基线
function reactTo(score, jolt) {
  const target = syncOf(score)
  if (tl) tl.kill()
  const o = { s: bandSync.value, a: bandAmp.value }
  const upd = () => {
    bandSync.value = o.s
    bandAmp.value = o.a
  }
  if (jolt) {
    flash.value = true
    setTimeout(() => (flash.value = false), 620)
    tl = gsap
      .timeline()
      .to(o, { s: Math.min(1, target + 0.28), a: 0.95, duration: 0.14, ease: 'power3.out', onUpdate: upd })
      .to(o, { s: target, a: 0.62, duration: 0.62, ease: 'power2.out', onUpdate: upd })
  } else {
    bandSync.value = target
    bandAmp.value = 0.62
  }
}

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

const currentQ = computed(() => {
  const q = questions[currentIdx.value]
  return { ...q, options: getShuffled(q) }
})
const currentNo = computed(() => currentIdx.value + 1)
const progressPct = computed(() => (currentIdx.value / total) * 100)

function pad(n) {
  return String(n).padStart(2, '0')
}

function restoreSelected() {
  const prev = answersMap.value[currentQ.value.id]
  if (prev) {
    selected.value = currentQ.value.options.findIndex((o) => o.text === prev.text)
    readoutText.value = prev.read || ''
    reactTo(prev.score, false)
  } else {
    selected.value = null
    readoutText.value = ''
    bandSync.value = 0.4
    bandAmp.value = 0.6
  }
}
restoreSelected()

function selectOption(i) {
  if (lock) return
  lock = true
  selected.value = i
  const opt = currentQ.value.options[i]
  readoutText.value = opt.read || ''
  reactTo(opt.score, true)
  answersMap.value[currentQ.value.id] = {
    score: opt.score,
    dims: opt.dims || {},
    text: opt.text,
    read: opt.read,
  }
  setTimeout(() => goNext(), 520)
}

function goNext() {
  if (currentIdx.value < total - 1) {
    slideDir.value = 'slide-left'
    currentIdx.value++
    restoreSelected()
    lock = false
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } else {
    submit()
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
    if (!window.confirm('确定要退出吗？已采集的数据不会保存。')) {
      lock = false
      return
    }
  }
  router.replace('/')
}

function submit() {
  const answerList = questions.map((q) => answersMap.value[q.id]).filter(Boolean)
  finished.value = true
  setTimeout(() => {
    router.push({ path: '/result', query: { a: JSON.stringify(answerList) } })
  }, 1100)
}
</script>

<style scoped>
.quiz {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
}

/* 顶栏 */
.topbar {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: rgba(24, 19, 32, 0.86);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--line);
}
.exit {
  width: 40px;
  height: 40px;
  border: 1px solid var(--line);
  background: var(--bg-panel);
  color: var(--ink-2);
  border-radius: 11px;
  font-size: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
}
.track {
  flex: 1;
  height: 6px;
  background: var(--bg-raise);
  border-radius: 6px;
  overflow: hidden;
}
.track-fill {
  position: relative;
  height: 100%;
  background: linear-gradient(90deg, var(--accent), var(--accent-2));
  border-radius: 6px;
  transition: width 0.4s cubic-bezier(0.34, 1.4, 0.6, 1);
  overflow: hidden;
}
.track-glow {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.55), transparent);
  animation: glow 1.8s linear infinite;
}
@keyframes glow {
  from { transform: translateX(-100%); }
  to { transform: translateX(100%); }
}
.counter {
  font-size: 13px;
  font-weight: 700;
  color: var(--accent);
  min-width: 50px;
  text-align: right;
}

/* 卡片 */
.body {
  flex: 1 1 auto;
  width: 100%;
  padding: 18px 16px 14px;
  max-width: 440px;
  margin: 0 auto;
}

/* 贴底实时监测带 */
.monitor-band {
  border-top: 1px solid var(--line);
  background: linear-gradient(180deg, rgba(255, 111, 97, 0.015), rgba(139, 123, 255, 0.06));
  padding: 9px 16px calc(10px + env(safe-area-inset-bottom));
  transition: background 0.4s ease, border-color 0.4s ease;
}
.monitor-band.is-react {
  border-top-color: var(--accent);
  background: linear-gradient(180deg, rgba(255, 111, 97, 0.05), rgba(139, 123, 255, 0.14));
  animation: bandKick 0.6s ease;
}
@keyframes bandKick {
  0% { box-shadow: inset 0 14px 26px -14px rgba(255, 111, 97, 0); }
  22% { box-shadow: inset 0 14px 26px -10px rgba(255, 111, 97, 0.38); }
  100% { box-shadow: inset 0 14px 26px -14px rgba(255, 111, 97, 0); }
}
.mb-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 11px;
  margin-bottom: 2px;
}
.mb-label {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--ink-2);
}
.mb-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 6px var(--accent);
}
.mb-res {
  color: var(--accent);
  font-weight: 700;
}
.card {
  background: var(--bg-panel);
  border: 1px solid var(--line);
  border-radius: 20px;
  padding: 22px 18px 18px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
}
.card-spec {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 11px;
  color: var(--accent-2);
  letter-spacing: 1px;
}
.spec-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent-2);
  box-shadow: 0 0 8px var(--accent-2);
}
.card-no {
  font-size: 12px;
  color: var(--ink-3);
  margin: 12px 0 6px;
  letter-spacing: 1px;
}
.card-q {
  font-size: 20px;
  font-weight: 800;
  line-height: 1.5;
  color: var(--ink);
  margin-bottom: 20px;
}

/* 选项 */
.opts {
  display: flex;
  flex-direction: column;
  gap: 9px;
}
.opt {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  min-height: 52px;
  padding: 13px 14px;
  border: 1px solid var(--line-strong);
  border-radius: 13px;
  background: var(--bg);
  text-align: left;
  cursor: pointer;
  transition: border-color 0.18s, background 0.18s, transform 0.12s;
}
.opt:active {
  transform: scale(0.99);
}
.opt-key {
  flex-shrink: 0;
  width: 26px;
  height: 26px;
  border-radius: 8px;
  background: var(--bg-raise);
  color: var(--ink-2);
  font-size: 13px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}
.opt-text {
  flex: 1;
  font-size: 14.5px;
  line-height: 1.45;
  color: var(--ink);
}
.opt-check {
  flex-shrink: 0;
  font-size: 20px;
  color: var(--accent);
}
.opt.is-pick {
  border-color: var(--accent);
  background: var(--accent-soft);
  box-shadow: 0 0 0 1px var(--accent) inset, 0 6px 18px rgba(255, 111, 97, 0.16);
}
.opt.is-pick .opt-key {
  background: var(--accent);
  color: #fff;
}

/* 读数 */
.readout {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 14px;
  padding: 0 4px;
  height: 0;
  opacity: 0;
  overflow: hidden;
  transition: opacity 0.3s ease, height 0.3s ease;
  color: var(--accent-2);
  font-size: 12.5px;
}
.readout.show {
  height: 20px;
  opacity: 1;
}
.readout :deep(svg) {
  font-size: 16px;
}

/* 底部 */
.card-foot {
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 36px;
}
.prev {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  border: 1px solid var(--line);
  background: var(--bg-raise);
  color: var(--ink-2);
  font-size: 13px;
  font-weight: 600;
  padding: 9px 16px 9px 10px;
  border-radius: 20px;
  cursor: pointer;
}
.prev.hide {
  visibility: hidden;
}
.prev :deep(svg) {
  font-size: 18px;
}
.hint {
  font-size: 12px;
  color: var(--ink-3);
}

/* 滑动过渡 */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.28s ease;
}
.slide-left-enter-from { transform: translateX(28px); opacity: 0; }
.slide-left-leave-to { transform: translateX(-28px); opacity: 0; }
.slide-right-enter-from { transform: translateX(-28px); opacity: 0; }
.slide-right-leave-to { transform: translateX(28px); opacity: 0; }

/* 完成 */
.finish {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 70dvh;
  gap: 6px;
}
.finish-ring {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  border: 2px solid var(--accent-soft);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  color: var(--accent);
  margin-bottom: 14px;
  animation: finishPulse 1.4s ease-in-out infinite;
}
@keyframes finishPulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(255, 111, 97, 0.3); }
  50% { box-shadow: 0 0 0 14px rgba(255, 111, 97, 0); }
}
.finish h2 {
  font-size: 22px;
  color: var(--ink);
}
.finish p {
  font-size: 13px;
  color: var(--ink-2);
}
</style>
