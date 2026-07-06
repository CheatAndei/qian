<template>
  <div class="tm" ref="root">
    <!-- 顶部：总占用 -->
    <div class="tm-head">
      <div class="tm-load">
        <span class="tm-load-num mono">{{ load }}</span>
        <span class="tm-load-unit mono">% 后台占用</span>
      </div>
      <div class="tm-temp mono"><Icon icon="mdi:thermometer" /> {{ temp }}°</div>
    </div>
    <div class="tm-bar"><span :style="{ width: load + '%' }"></span></div>

    <!-- 进程列表 -->
    <ul class="tm-list">
      <li v-for="(p, i) in procs" :key="p.name">
        <span class="tm-dot" :style="{ background: p.color }"></span>
        <span class="tm-name mono">{{ p.name }}</span>
        <span class="tm-track"><i :style="{ width: bars[i] + '%', background: p.color }"></i></span>
        <span class="tm-pct mono">{{ bars[i] }}</span>
      </li>
    </ul>

    <!-- 扫描线 -->
    <span class="tm-scan" :class="{ paused: reduced }"></span>
    <span class="tm-tag mono">PROCESS MONITOR · 实时采样</span>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const root = ref(null)
const load = ref(48)
const temp = ref(41)

const procs = [
  { name: 'rumination.bg', color: '#DDB95B' },
  { name: 'self_blame.svc', color: '#C66B5F' },
  { name: 'anticipation.exe', color: '#92A47C' },
  { name: 'suppression.tmp', color: '#9A8FB0' },
  { name: 'recovery.daemon', color: '#7FA8B8' },
]
const bars = ref([62, 38, 47, 29, 71])

const reduced =
  typeof window !== 'undefined' && window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

let clock
function jitter(v, lo, hi) {
  const next = v + (Math.random() * 16 - 8)
  return Math.max(lo, Math.min(hi, Math.round(next)))
}
onMounted(() => {
  if (reduced) return
  clock = setInterval(() => {
    bars.value = bars.value.map((b) => jitter(b, 14, 92))
    load.value = Math.round(bars.value.reduce((a, b) => a + b, 0) / bars.value.length)
    temp.value = 36 + Math.floor(Math.random() * 12)
  }, 900)
})
onBeforeUnmount(() => clock && clearInterval(clock))
</script>

<style scoped>
.tm {
  position: relative;
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  padding: 14px 14px 28px;
  background:
    radial-gradient(120% 80% at 100% 0%, color-mix(in srgb, var(--accent) 12%, transparent), transparent 55%),
    var(--bg-raise);
}
.tm-head { display: flex; align-items: flex-end; justify-content: space-between; }
.tm-load { display: flex; align-items: baseline; gap: 7px; }
.tm-load-num { font-size: 40px; font-weight: 900; line-height: 1; color: var(--accent); letter-spacing: -0.02em; }
.tm-load-unit { font-size: 11px; color: var(--ink-3); }
.tm-temp { display: inline-flex; align-items: center; gap: 3px; font-size: 12px; color: var(--warn); }
.tm-bar { height: 6px; border-radius: 99px; background: color-mix(in srgb, var(--ink) 12%, transparent); margin: 10px 0 14px; overflow: hidden; }
.tm-bar span { display: block; height: 100%; border-radius: inherit; background: linear-gradient(90deg, var(--accent-2), var(--accent)); transition: width 0.8s cubic-bezier(0.32, 0.72, 0, 1); }

.tm-list { list-style: none; display: flex; flex-direction: column; gap: 9px; }
.tm-list li { display: grid; grid-template-columns: 8px 116px 1fr 28px; align-items: center; gap: 9px; }
.tm-dot { width: 7px; height: 7px; border-radius: 50%; }
.tm-name { font-size: 11.5px; color: var(--ink-2); }
.tm-track { height: 7px; border-radius: 99px; background: color-mix(in srgb, var(--ink) 10%, transparent); overflow: hidden; }
.tm-track i { display: block; height: 100%; border-radius: inherit; transition: width 0.8s cubic-bezier(0.32, 0.72, 0, 1); }
.tm-pct { font-size: 11px; color: var(--ink-3); text-align: right; }

.tm-scan { position: absolute; left: 0; right: 0; top: 0; height: 38%;
  background: linear-gradient(180deg, transparent, color-mix(in srgb, var(--accent) 10%, transparent), transparent);
  pointer-events: none; animation: tm-sweep 3.4s ease-in-out infinite; }
.tm-scan.paused { animation: none; opacity: 0; }
@keyframes tm-sweep { 0% { transform: translateY(-40%); } 100% { transform: translateY(280%); } }

.tm-tag { position: absolute; left: 14px; bottom: 10px; font-size: 10px; color: var(--ink-3); letter-spacing: 0.5px; }

@media (prefers-reduced-motion: reduce) {
  .tm-scan { animation: none !important; opacity: 0; }
}
</style>
