<template>
  <div class="eeg" :style="{ height: height + 'px' }">
    <svg :viewBox="`0 0 ${W} ${H}`" preserveAspectRatio="none" class="eeg-svg">
      <line :x1="0" :y1="H / 2" :x2="W" :y2="H / 2" class="eeg-base" />
      <g>
        <path :d="d" class="eeg-trace" :style="{ stroke: color, filter: `drop-shadow(0 0 6px ${color}aa)` }" />
        <animateTransform
          v-if="!reduced"
          attributeName="transform"
          type="translate"
          :from="`0 0`"
          :to="`${-W} 0`"
          :dur="`${speed}s`"
          repeatCount="indefinite"
        />
      </g>
      <line :x1="W - 1.5" :y1="6" :x2="W - 1.5" :y2="H - 6" class="eeg-now" :style="{ stroke: color }" />
    </svg>
    <span class="eeg-cursor" :style="{ background: color, boxShadow: `0 0 10px ${color}` }"></span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  amplitude: { type: Number, default: 0.55 }, // 0..1
  color: { type: String, default: '#16E0FF' },
  height: { type: Number, default: 110 },
  speed: { type: Number, default: 4.6 }, // 一个屏宽滚完的秒数
})

const W = 480
const H = 120
const MID = 60

const reduced =
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// 一个周期 W 内的不规则心跳：间距不等、振幅不一，制造"非循环"观感
// （周期仍为 W → 平移 -W 无缝衔接，但一屏之内每一拍都不一样）
const BEATS = [
  { cx: 50, a: 0.9 },
  { cx: 146, a: 1.15 },
  { cx: 236, a: 0.62 }, // 偏弱一拍
  { cx: 318, a: 1.0 },
  { cx: 410, a: 0.82 },
]

function g(t, s) {
  return Math.exp(-(t * t) / (2 * s * s))
}
// ECG 形态：P 波 + QRS 尖峰 + T 波（负=向上）
function beatOffset(t, a) {
  return (
    a *
    (-6 * g(t + 24, 7) + 5 * g(t + 5, 3) - 34 * g(t, 2.3) + 11 * g(t - 6, 3.2) - 9 * g(t - 26, 8))
  )
}

const d = computed(() => {
  const amp = Math.max(0.08, Math.min(1, props.amplitude))
  const step = 4
  const end = 2 * W // 覆盖 2 屏宽，平移 -W 无缝循环
  let path = ''
  for (let x = 0; x <= end; x += step) {
    // 轻微基线漂移（周期 W，保持无缝）——让等电位段不再是死直线
    let y = MID + 2.6 * Math.sin((2 * Math.PI * x) / W + 0.6) + 1.2 * Math.sin((6 * Math.PI * x) / W)
    for (const b of BEATS) {
      for (let k = -1; k <= 2; k++) {
        const t = x - (b.cx + k * W)
        if (t > -60 && t < 60) y += beatOffset(t, b.a) * amp
      }
    }
    path += (x === 0 ? 'M ' : 'L ') + x.toFixed(1) + ' ' + y.toFixed(2) + ' '
  }
  return path
})
</script>

<style scoped>
.eeg {
  position: relative;
  width: 100%;
  overflow: hidden;
}
.eeg-svg {
  width: 100%;
  height: 100%;
  display: block;
}
.eeg-base {
  stroke: rgba(255, 255, 255, 0.08);
  stroke-width: 1;
  stroke-dasharray: 4 6;
}
.eeg-trace {
  fill: none;
  stroke-width: 2.2;
  stroke-linecap: round;
  stroke-linejoin: round;
  vector-effect: non-scaling-stroke;
  transition: stroke 0.45s ease;
}
.eeg-now {
  stroke-width: 1.5;
  opacity: 0.5;
}
.eeg-cursor {
  position: absolute;
  top: 6px;
  bottom: 6px;
  right: 0;
  width: 2px;
  border-radius: 2px;
  animation: cursorPulse 1.4s ease-in-out infinite;
}
@keyframes cursorPulse {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
}
</style>
