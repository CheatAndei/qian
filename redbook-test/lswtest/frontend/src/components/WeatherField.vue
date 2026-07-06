<template>
  <div class="wf" ref="root">
    <svg class="wf-svg" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <radialGradient id="wf-glow" cx="64%" cy="30%" r="70%">
          <stop offset="0%" stop-color="var(--accent)" stop-opacity="0.16" />
          <stop offset="100%" stop-color="var(--accent)" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="320" height="200" fill="url(#wf-glow)" />

      <!-- 等压线：两组前后衔接，整体横向缓慢漂移 -->
      <g class="wf-iso" :class="{ paused: reduced }">
        <g v-for="shift in [0, 320]" :key="shift" :transform="`translate(${shift} 0)`">
          <path v-for="(d, i) in isobars" :key="i" :d="d" class="wf-line"
            :style="{ opacity: 0.16 + i * 0.12 }" />
        </g>
      </g>

      <!-- 等压中心标记 -->
      <g class="wf-center">
        <circle cx="206" cy="74" r="3.2" fill="var(--accent)" />
        <circle cx="206" cy="74" r="9" class="wf-ping" />
      </g>
    </svg>

    <!-- 飘动的云 -->
    <span class="wf-cloud c1"><Icon icon="mdi:weather-partly-cloudy" /></span>
    <span class="wf-cloud c2"><Icon icon="mdi:weather-windy" /></span>

    <!-- 雨丝（低压一侧） -->
    <span v-for="n in 5" :key="n" class="wf-rain" :style="rainStyle(n)"></span>

    <!-- 风向标 -->
    <div class="wf-vane">
      <svg viewBox="0 0 48 48" class="wf-dial">
        <circle cx="24" cy="24" r="21" class="wf-dial-ring" />
        <line v-for="t in 12" :key="t" class="wf-tick"
          :x1="24 + 17 * Math.cos((t * 30 - 90) * Math.PI / 180)"
          :y1="24 + 17 * Math.sin((t * 30 - 90) * Math.PI / 180)"
          :x2="24 + 20 * Math.cos((t * 30 - 90) * Math.PI / 180)"
          :y2="24 + 20 * Math.sin((t * 30 - 90) * Math.PI / 180)" />
      </svg>
      <span class="wf-needle" ref="needle"><Icon icon="mdi:navigation-variant" /></span>
    </div>

    <!-- 读数 -->
    <div class="wf-read">
      <span class="wf-read-row mono"><i>PRESS</i><b>{{ pressure }}</b><u>hPa</u></span>
      <span class="wf-read-row mono"><i>WIND</i><b>{{ wind }}</b><u>kt</u></span>
    </div>
    <span class="wf-tag mono">关系气压实况 · 关系气象站</span>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'

const root = ref(null)
const needle = ref(null)
const pressure = ref(1014)
const wind = ref(12)

const isobars = [
  'M -10 64 C 60 40, 130 92, 200 66 S 330 44, 340 70',
  'M -10 96 C 70 76, 140 120, 210 96 S 330 80, 340 104',
  'M -10 132 C 60 116, 140 156, 214 132 S 330 120, 340 142',
  'M -10 38 C 80 24, 150 58, 220 36 S 330 20, 340 40',
]

const reduced =
  typeof window !== 'undefined' && window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function rainStyle(n) {
  const left = 18 + n * 9
  return {
    left: left + '%',
    animationDelay: (n * 0.34).toFixed(2) + 's',
    animationDuration: (1.5 + (n % 3) * 0.35).toFixed(2) + 's',
  }
}

let tween, clock
onMounted(() => {
  if (reduced) return
  // 风向标缓慢来回摆动
  tween = gsap.to(needle.value, {
    rotation: 38,
    transformOrigin: '50% 50%',
    duration: 3.2,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
  })
  // 读数轻微跳动
  clock = setInterval(() => {
    pressure.value = 1006 + Math.floor(Math.random() * 18)
    wind.value = 7 + Math.floor(Math.random() * 14)
  }, 1600)
})
onBeforeUnmount(() => {
  tween && tween.kill()
  clock && clearInterval(clock)
})
</script>

<style scoped>
.wf {
  position: relative;
  width: 100%;
  height: 196px;
  border-radius: 16px;
  overflow: hidden;
  background:
    radial-gradient(140% 120% at 70% 0%, color-mix(in srgb, var(--accent-2) 14%, transparent), transparent 60%),
    var(--bg-raise);
}
.wf-svg { position: absolute; inset: 0; width: 100%; height: 100%; }
.wf-line { fill: none; stroke: var(--ink); stroke-width: 1.1; vector-effect: non-scaling-stroke; }
.wf-iso { animation: wf-drift 18s linear infinite; }
.wf-iso.paused { animation: none; }
@keyframes wf-drift { to { transform: translateX(-320px); } }
.wf-ping { fill: none; stroke: var(--accent); stroke-width: 1.4; transform-origin: 206px 74px; animation: wf-ping 2.6s ease-out infinite; }
@keyframes wf-ping { 0% { transform: scale(0.4); opacity: 0.9; } 100% { transform: scale(2.6); opacity: 0; } }

.wf-cloud { position: absolute; color: var(--ink-2); opacity: 0.5; font-size: 30px; }
.wf-cloud.c1 { top: 16px; left: -16%; animation: wf-float 14s linear infinite; }
.wf-cloud.c2 { top: 38px; left: -30%; font-size: 22px; opacity: 0.35; animation: wf-float 21s linear infinite 2s; }
@keyframes wf-float { from { transform: translateX(0); } to { transform: translateX(360px); } }

.wf-rain { position: absolute; top: 96px; width: 1.4px; height: 12px; border-radius: 2px;
  background: linear-gradient(var(--accent-2), transparent); opacity: 0.5; animation: wf-fall linear infinite; }
@keyframes wf-fall { 0% { transform: translateY(-6px); opacity: 0; } 30% { opacity: 0.6; } 100% { transform: translateY(46px); opacity: 0; } }

.wf-vane { position: absolute; right: 14px; top: 14px; width: 48px; height: 48px; }
.wf-dial { position: absolute; inset: 0; }
.wf-dial-ring { fill: color-mix(in srgb, var(--bg) 55%, transparent); stroke: var(--line-strong); stroke-width: 1; }
.wf-tick { stroke: var(--ink-3); stroke-width: 1; }
.wf-needle { position: absolute; inset: 0; display: grid; place-items: center; color: var(--accent); font-size: 22px; }

.wf-read { position: absolute; left: 14px; bottom: 32px; display: flex; flex-direction: column; gap: 4px; }
.wf-read-row { display: inline-flex; align-items: baseline; gap: 6px; font-size: 11px; color: var(--ink-3); }
.wf-read-row b { font-size: 20px; color: var(--ink); font-weight: 800; }
.wf-read-row i { font-style: normal; letter-spacing: 1px; }
.wf-read-row u { text-decoration: none; }
.wf-tag { position: absolute; left: 14px; bottom: 12px; font-size: 10px; color: var(--ink-3); letter-spacing: 0.4px; }

@media (prefers-reduced-motion: reduce) {
  .wf-iso, .wf-cloud, .wf-rain, .wf-ping { animation: none !important; }
}
</style>
