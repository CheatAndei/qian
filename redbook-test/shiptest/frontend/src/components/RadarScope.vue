<template>
  <div class="scope" :style="{ width: size + 'px', height: size + 'px' }">
    <!-- 网格环 + 轴 -->
    <svg :viewBox="`0 0 ${size} ${size}`" class="scope-svg">
      <circle v-for="r in ringRadii" :key="r" :cx="C" :cy="C" :r="r" class="ring" />
      <line v-for="(p, i) in spokes" :key="'s' + i" :x1="C" :y1="C" :x2="p.x" :y2="p.y" class="spoke" />
      <circle :cx="C" :cy="C" r="2.5" class="hub" :style="{ fill: color }" />
    </svg>

    <!-- 旋转扫描 -->
    <div class="sweep" :class="{ slow: !!blip }" :style="sweepStyle"></div>

    <!-- 环境噪点 -->
    <span
      v-for="(b, i) in noise"
      :key="'n' + i"
      class="noise"
      :style="{ left: b.x + 'px', top: b.y + 'px', animationDelay: b.d + 's' }"
    ></span>

    <!-- 主信号 blip -->
    <span
      v-if="blip"
      class="blip"
      :style="{ left: blipPos.x + 'px', top: blipPos.y + 'px', background: color, boxShadow: `0 0 14px ${color}` }"
    >
      <span class="blip-ring" :style="{ borderColor: color }"></span>
    </span>

    <!-- 扇区标签 -->
    <template v-if="labels.length">
      <span
        v-for="(l, i) in labelPos"
        :key="'l' + i"
        class="sector"
        :class="{ active: activeIndex === i }"
        :style="{ left: l.x + 'px', top: l.y + 'px', transform: l.t, color: activeIndex === i ? color : '' }"
      >{{ labels[i] }}</span>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  size: { type: Number, default: 260 },
  color: { type: String, default: '#36F1A6' },
  labels: { type: Array, default: () => [] },
  blip: { type: Object, default: null }, // { angle(deg), radius(0-100) }
  activeIndex: { type: Number, default: -1 },
  pad: { type: Number, default: 30 },
})

const C = computed(() => props.size / 2)
const maxR = computed(() => props.size / 2 - props.pad)
const ringRadii = computed(() => [0.34, 0.62, 0.9].map((f) => maxR.value * f))

function polar(angleDeg, radius) {
  const a = (angleDeg * Math.PI) / 180
  return { x: C.value + radius * Math.cos(a), y: C.value + radius * Math.sin(a) }
}

const N = 6
const spokes = computed(() =>
  Array.from({ length: N }, (_, i) => polar(-90 + i * 60, maxR.value))
)
const labelPos = computed(() =>
  Array.from({ length: N }, (_, i) => {
    const p = polar(-90 + i * 60, maxR.value + 16)
    let tx = '-50%'
    if (p.x > C.value + 6) tx = '-6%'
    if (p.x < C.value - 6) tx = '-94%'
    return { x: p.x, y: p.y, t: `translate(${tx}, -50%)` }
  })
)

const blipPos = computed(() => {
  if (!props.blip) return { x: 0, y: 0 }
  return polar(props.blip.angle, (props.blip.radius / 100) * maxR.value)
})

const sweepStyle = computed(() => ({
  background: `conic-gradient(from 0deg, ${props.color}00 0deg, ${props.color}00 290deg, ${props.color}22 340deg, ${props.color}55 360deg)`,
}))

// 固定噪点（不依赖随机，避免 SSR/构建差异）
const noise = computed(() => {
  const seeds = [
    [0.3, 0.4], [0.7, 0.35], [0.55, 0.7], [0.4, 0.6], [0.66, 0.55], [0.32, 0.66],
  ]
  return seeds.map(([fx, fy], i) => ({
    x: fx * props.size,
    y: fy * props.size,
    d: i * 0.5,
  }))
})
</script>

<style scoped>
.scope {
  position: relative;
  margin: 0 auto;
  border-radius: 50%;
  overflow: hidden;
  background: radial-gradient(circle at 50% 50%, rgba(54, 241, 166, 0.06), transparent 62%);
}
.scope-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
.ring {
  fill: none;
  stroke: rgba(255, 255, 255, 0.1);
  stroke-width: 1;
}
.spoke {
  stroke: rgba(255, 255, 255, 0.07);
  stroke-width: 1;
}
.hub {
  filter: drop-shadow(0 0 6px currentColor);
}
.sweep {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  animation: sweepRot 3.2s linear infinite;
}
.sweep.slow {
  animation-duration: 6s;
}
@keyframes sweepRot {
  to { transform: rotate(360deg); }
}
.noise {
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: rgba(54, 241, 166, 0.5);
  transform: translate(-50%, -50%);
  animation: noiseBlink 3.2s ease-in-out infinite;
}
@keyframes noiseBlink {
  0%, 100% { opacity: 0; }
  50% { opacity: 0.6; }
}
.blip {
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
}
.blip-ring {
  position: absolute;
  inset: -6px;
  border: 1.5px solid;
  border-radius: 50%;
  animation: blipPing 1.8s ease-out infinite;
}
@keyframes blipPing {
  0% { transform: scale(0.6); opacity: 0.9; }
  100% { transform: scale(2.4); opacity: 0; }
}
.sector {
  position: absolute;
  font-size: 10.5px;
  color: var(--ink-3);
  white-space: nowrap;
  transition: color 0.3s;
  pointer-events: none;
}
.sector.active {
  font-weight: 800;
}
</style>
