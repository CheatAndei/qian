<template>
  <div class="level-field" :style="{ width: size + 'px', height: size + 'px' }">
    <svg :viewBox="`0 0 ${size} ${size}`" class="level-svg" aria-hidden="true">
      <circle :cx="C" :cy="C" :r="outerR" class="outer" />
      <circle v-for="(r, i) in rings" :key="r" :cx="C" :cy="C" :r="r" class="ring" :class="{ active: activeIndex >= i }" :style="{ stroke: activeIndex >= i ? color : '' }" />
      <path v-for="(arc, i) in arcs" :key="'a' + i" :d="arc" class="arc" :style="{ stroke: i <= activeIndex ? color : '' }" />
      <line v-for="(p, i) in spokes" :key="'s' + i" :x1="C" :y1="C" :x2="p.x" :y2="p.y" class="spoke" />
      <circle :cx="C" :cy="C" r="34" class="core" />
      <circle :cx="C" :cy="C" r="25" class="core-glow" :style="{ fill: color }" />
      <circle v-if="blip" :cx="blipPos.x" :cy="blipPos.y" r="7" class="point" :style="{ fill: color }" />
      <circle v-if="blip" :cx="blipPos.x" :cy="blipPos.y" r="15" class="point-ring" :style="{ stroke: color }" />
    </svg>

    <div class="level-center">
      <span class="mono">INTIMACY</span>
      <b>{{ activeLabel }}</b>
    </div>

    <template v-if="labels.length">
      <span
        v-for="(l, i) in labelPos"
        :key="'l' + i"
        class="level-label"
        :class="{ active: activeIndex === i }"
        :style="{ left: l.x + 'px', top: l.y + 'px', color: activeIndex === i ? color : '' }"
      >{{ labels[i] }}</span>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  size: { type: Number, default: 260 },
  color: { type: String, default: '#FF7AA2' },
  labels: { type: Array, default: () => [] },
  blip: { type: Object, default: null },
  activeIndex: { type: Number, default: -1 },
  pad: { type: Number, default: 30 },
})

const C = computed(() => props.size / 2)
const outerR = computed(() => props.size / 2 - props.pad)
const rings = computed(() => [0.28, 0.44, 0.6, 0.76, 0.9].map((f) => outerR.value * f))

function polar(angleDeg, radius) {
  const a = (angleDeg * Math.PI) / 180
  return { x: C.value + radius * Math.cos(a), y: C.value + radius * Math.sin(a) }
}

function arcPath(start, end, radius) {
  const s = polar(start, radius)
  const e = polar(end, radius)
  const large = end - start > 180 ? 1 : 0
  return `M ${s.x} ${s.y} A ${radius} ${radius} 0 ${large} 1 ${e.x} ${e.y}`
}

const arcs = computed(() =>
  Array.from({ length: 6 }, (_, i) => arcPath(-86 + i * 58, -40 + i * 58, outerR.value - i * 7))
)
const spokes = computed(() =>
  Array.from({ length: 6 }, (_, i) => polar(-90 + i * 60, outerR.value))
)
const labelPos = computed(() =>
  Array.from({ length: 6 }, (_, i) => {
    const p = polar(-90 + i * 60, outerR.value + 18)
    return { x: p.x, y: p.y }
  })
)
const blipPos = computed(() => {
  if (!props.blip) return { x: C.value, y: C.value }
  return polar(props.blip.angle, (props.blip.radius / 100) * outerR.value)
})
const activeLabel = computed(() => (props.activeIndex >= 0 ? `Lv.${props.activeIndex + 1}` : 'Lv.?'))
</script>

<style scoped>
.level-field {
  position: relative;
  margin: 0 auto;
  border-radius: 50%;
  background:
    radial-gradient(circle at 50% 50%, rgba(255, 122, 162, 0.11), transparent 42%),
    radial-gradient(circle at 72% 24%, rgba(143, 227, 197, 0.06), transparent 30%);
}
.level-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
.outer,
.ring {
  fill: none;
  stroke: rgba(255, 255, 255, 0.1);
  stroke-width: 1;
}
.ring.active {
  opacity: 0.64;
  filter: drop-shadow(0 0 6px currentColor);
}
.arc {
  fill: none;
  stroke: rgba(255, 255, 255, 0.13);
  stroke-width: 5;
  stroke-linecap: round;
  stroke-dasharray: 1 10;
  animation: arcBreathe 2.8s ease-in-out infinite;
}
@keyframes arcBreathe {
  50% { opacity: 0.45; }
}
.spoke {
  stroke: rgba(255, 255, 255, 0.06);
  stroke-width: 1;
}
.core {
  fill: var(--bg-panel);
  stroke: var(--line-strong);
}
.core-glow {
  opacity: 0.18;
  animation: corePulse 2.2s ease-in-out infinite;
}
@keyframes corePulse {
  50% { transform-box: fill-box; transform-origin: center; transform: scale(1.18); opacity: 0.3; }
}
.point {
  filter: drop-shadow(0 0 12px currentColor);
}
.point-ring {
  fill: none;
  stroke-width: 1.5;
  animation: ringOut 1.8s ease-out infinite;
}
@keyframes ringOut {
  from { transform-box: fill-box; transform-origin: center; transform: scale(0.7); opacity: 0.8; }
  to { transform-box: fill-box; transform-origin: center; transform: scale(2.1); opacity: 0; }
}
.level-center {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}
.level-center span {
  font-size: 10px;
  color: var(--ink-3);
  letter-spacing: 1.6px;
}
.level-center b {
  font-size: 34px;
  line-height: 1.1;
  color: var(--ink);
}
.level-label {
  position: absolute;
  max-width: 74px;
  transform: translate(-50%, -50%);
  font-size: 10.5px;
  line-height: 1.2;
  color: var(--ink-3);
  text-align: center;
  pointer-events: none;
}
.level-label.active {
  font-weight: 800;
}
</style>
