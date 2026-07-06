<template>
  <div class="tw" :style="{ height: height + 'px' }">
    <svg :viewBox="`0 0 ${W} ${H}`" preserveAspectRatio="none" class="tw-svg">
      <!-- 中线 -->
      <line :x1="0" :y1="H / 2" :x2="W" :y2="H / 2" class="tw-base" />

      <!-- violet 波（频率 B） -->
      <g>
        <path
          :d="pathB"
          class="tw-trace"
          :style="{ stroke: color2, filter: `drop-shadow(0 0 6px ${color2}aa)` }"
        />
        <animateTransform
          v-if="!reduced"
          attributeName="transform"
          type="translate"
          :from="`0 0`"
          :to="`${-W} 0`"
          :dur="`${speed * 1.06}s`"
          repeatCount="indefinite"
        />
      </g>

      <!-- 珊瑚 波（频率 A） -->
      <g>
        <path
          :d="pathA"
          class="tw-trace"
          :style="{ stroke: color1, filter: `drop-shadow(0 0 6px ${color1}aa)` }"
        />
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

      <!-- 锁相游标 -->
      <line :x1="W / 2" :y1="6" :x2="W / 2" :y2="H - 6" class="tw-now" :style="{ stroke: lockColor }" />
    </svg>

    <!-- 共振指示点（sync 越高越亮） -->
    <span
      class="tw-lock"
      :style="{ background: lockColor, boxShadow: `0 0 10px ${lockColor}`, opacity: 0.4 + clampedSync * 0.6 }"
    ></span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  // 0..1：1=完全同相重叠（共振），越小相位差/垂直错开越大
  sync: { type: Number, default: 1 },
  color1: { type: String, default: '#FF6F61' }, // 珊瑚
  color2: { type: String, default: '#8B7BFF' }, // violet
  height: { type: Number, default: 120 },
  speed: { type: Number, default: 5 }, // 一个屏宽滚完的秒数（越小越快）
  amplitude: { type: Number, default: 0.6 }, // 0..1
})

// SVG 内部坐标系：宽 480，单位统一，平移 -W 无缝循环
const W = 480
const H = 120
const CYCLES = 3 // 在一个屏宽 W 内放 3 个完整基频周期（保证 -W 平移无缝）

const reduced =
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const clampedSync = computed(() => Math.max(0, Math.min(1, props.sync)))

const lockColor = computed(() => (clampedSync.value >= 0.6 ? props.color1 : props.color2))

// 采样生成一条波形路径：覆盖 2 屏宽（平移 -W 无缝衔接）。
// 不再是单一正弦——叠加二次谐波 + 横向振幅包络（周期均整除 W，保持无缝），
// 让每一段波形形态/高低都不一样，去掉"死循环"观感。
// phase 为相位偏移（弧度），yShift 为垂直基线偏移（像素）
function sinePath(phase, yShift, amp) {
  const mid = H / 2 + yShift
  const A = amp * (H / 2 - 12)
  const k = (CYCLES * 2 * Math.PI) / W // 基频角频率
  const step = 5
  const end = 2 * W
  let d = ''
  for (let x = 0; x <= end; x += step) {
    // 横向包络：左右起伏（周期 W）+ 二次起伏，让波峰有高有低
    const env = 0.74 + 0.2 * Math.sin((2 * Math.PI * x) / W + 0.4) + 0.06 * Math.sin((4 * Math.PI * x) / W)
    // 基频 + 二次谐波，波形不再是教科书正弦
    const s = (Math.sin(k * x + phase) + 0.3 * Math.sin(2 * k * x + phase * 1.4)) / 1.3
    const y = mid + A * env * s
    d += (x === 0 ? 'M ' : 'L ') + x.toFixed(1) + ' ' + y.toFixed(2) + ' '
  }
  return d
}

// sync=1：两波同相、同基线（完全重叠 → 共振）
// sync→0：相位差拉大到接近反相（π），垂直错开拉大
const amp = computed(() => Math.max(0.12, Math.min(1, props.amplitude)))
const phaseGap = computed(() => (1 - clampedSync.value) * Math.PI) // 0..π
const vGap = computed(() => (1 - clampedSync.value) * 22) // 0..22px 垂直错开

const pathA = computed(() => sinePath(0, -vGap.value, amp.value))
const pathB = computed(() => sinePath(phaseGap.value, vGap.value, amp.value))
</script>

<style scoped>
.tw {
  position: relative;
  width: 100%;
  overflow: hidden;
}
.tw-svg {
  width: 100%;
  height: 100%;
  display: block;
}
.tw-base {
  stroke: rgba(255, 255, 255, 0.08);
  stroke-width: 1;
  stroke-dasharray: 4 6;
}
.tw-trace {
  fill: none;
  stroke-width: 2.4;
  stroke-linecap: round;
  stroke-linejoin: round;
  vector-effect: non-scaling-stroke;
}
.tw-now {
  stroke-width: 1.5;
  opacity: 0.45;
}
.tw-lock {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  animation: lockPulse 1.5s ease-in-out infinite;
}
@keyframes lockPulse {
  0%, 100% { transform: translate(-50%, -50%) scale(0.85); }
  50% { transform: translate(-50%, -50%) scale(1.2); }
}
</style>
