<template>
  <div class="quiz tasks">
    <header class="topbar"><button class="exit" @click="handleExit" aria-label="退出"><Icon icon="mdi:close" /></button><div class="track"><div class="track-fill" :style="{ width: progressPct + '%' }"><span></span></div></div><span class="counter mono">{{ pad(currentNo) }}/{{ pad(total) }}</span></header>
    <main class="body" v-if="!finished"><transition :name="slideDir" mode="out-in"><div class="q-card" :key="currentIdx"><div class="q-spec"><span></span><b class="mono">{{ currentQ.spec }}</b></div><p class="q-no mono">扫描项 {{ pad(currentNo) }}</p><h2>{{ currentQ.prompt }}</h2><div class="opts"><button v-for="(opt, i) in currentQ.options" :key="i" class="opt" :class="{ 'is-pick': selected === i }" @click="selectOption(i)"><span class="opt-key mono">{{ ['A', 'B', 'C', 'D'][i] }}</span><span class="opt-text">{{ opt.text }}</span><Icon v-if="selected === i" icon="mdi:check-circle" /></button></div><div class="readout" :class="{ show: selected !== null }"><Icon icon="mdi:pulse" /><span class="mono">{{ readoutText }}</span></div><div class="card-foot"><button class="prev" :class="{ hide: currentIdx === 0 }" @click="goPrev"><Icon icon="mdi:chevron-left" /> 上一项</button><span class="hint" v-if="selected === null">选择后自动进入下一项</span></div></div></transition></main>
    <footer class="meter-band" :class="{ 'is-react': flash }" v-if="!finished"><div class="mb-top"><span class="mono"><i></i>后台占用</span><b class="mono">{{ meterValue }}</b></div><div class="mb-line"><span :style="{ width: meterValue }"></span></div></footer>
    <div class="finish" v-if="finished"><div class="finish-ring"><Icon icon="mdi:brain" /></div><h2>采集完成</h2><p class="mono">正在整理后台任务…</p></div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import gsap from 'gsap'
import { questions } from '../data/quiz.js'
const router = useRouter()
const currentIdx = ref(0)
const answersMap = ref({})
const selected = ref(null)
const slideDir = ref('slide-left')
const finished = ref(false)
const readoutText = ref('')
const meter = ref(34)
const flash = ref(false)
let meterTween = null
let lock = false
const total = questions.length
const currentNo = computed(() => currentIdx.value + 1)
const progressPct = computed(() => (currentIdx.value / total) * 100)
const meterValue = computed(() => `${Math.round(meter.value)}%`)
function pad(n) { return String(n).padStart(2, '0') }
function shuffle(arr) { const next = [...arr]; for (let i = next.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [next[i], next[j]] = [next[j], next[i]] } return next }
const shuffledCache = {}
function getShuffled(q) { if (!shuffledCache[q.id]) shuffledCache[q.id] = shuffle(q.options); return shuffledCache[q.id] }
const currentQ = computed(() => { const q = questions[currentIdx.value]; return { ...q, options: getShuffled(q) } })
function reactTo(score, jolt) { if (meterTween) meterTween.kill(); const target = 18 + Math.max(0, Math.min(3, score)) * 24; if (jolt) { flash.value = true; setTimeout(() => (flash.value = false), 520); const state = { v: meter.value }; meterTween = gsap.timeline().to(state, { v: Math.min(100, target + 16), duration: 0.14, ease: 'power3.out', onUpdate: () => (meter.value = state.v) }).to(state, { v: target, duration: 0.5, ease: 'power2.out', onUpdate: () => (meter.value = state.v) }) } else meter.value = target }
function restoreSelected() { const prev = answersMap.value[currentQ.value.id]; if (prev) { selected.value = currentQ.value.options.findIndex((o) => o.text === prev.text); readoutText.value = prev.read || ''; reactTo(prev.score, false) } else { selected.value = null; readoutText.value = ''; meter.value = 34 } }
restoreSelected()
function selectOption(i) { if (lock) return; lock = true; selected.value = i; const opt = currentQ.value.options[i]; readoutText.value = opt.read || ''; reactTo(opt.score, true); answersMap.value[currentQ.value.id] = { score: opt.score, dims: opt.dims || {}, text: opt.text, read: opt.read }; setTimeout(() => goNext(), 520) }
function goNext() { if (currentIdx.value < total - 1) { slideDir.value = 'slide-left'; currentIdx.value++; restoreSelected(); lock = false; window.scrollTo({ top: 0, behavior: 'smooth' }) } else submit() }
function goPrev() { if (currentIdx.value === 0) return; slideDir.value = 'slide-right'; currentIdx.value--; restoreSelected(); lock = false; window.scrollTo({ top: 0, behavior: 'smooth' }) }
function handleExit() { if (Object.keys(answersMap.value).length > 0 && !window.confirm('确定要退出吗？已选择的内容不会保存。')) { lock = false; return } router.replace('/') }
function submit() { const answerList = questions.map((q) => answersMap.value[q.id]).filter(Boolean); finished.value = true; setTimeout(() => router.push({ path: '/result', query: { a: JSON.stringify(answerList) } }), 900) }
</script>
