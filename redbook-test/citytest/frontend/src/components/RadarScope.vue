<template>
  <div class="city-field" :style="{ width: size + 'px', height: size + 'px' }">
    <svg :viewBox="`0 0 ${size} ${size}`" class="field-svg" aria-hidden="true">
      <defs>
        <pattern id="city-grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M 24 0 L 0 0 0 24" class="grid-line" />
        </pattern>
      </defs>
      <rect :width="size" :height="size" rx="30" class="panel" />
      <rect :x="pad" :y="pad" :width="size - pad * 2" :height="size - pad * 2" rx="22" fill="url(#city-grid)" class="map-grid" />
      <path :d="routePath" class="route-shadow" />
      <path :d="routePath" class="route" />
      <line v-for="(axis, i) in axes" :key="'a' + i" v-bind="axis" class="axis" />
      <circle v-for="(n, i) in nodes" :key="'n' + i" :cx="n.x" :cy="n.y" :r="activeIndex === i ? 6 : 4" class="node" :class="{ active: activeIndex === i }" :style="{ fill: activeIndex === i ? color : '' }" />
      <circle :cx="C" :cy="C" r="2.5" class="hub" :style="{ fill: color }" />
      <circle v-if="blip" :cx="blipPos.x" :cy="blipPos.y" r="7" class="pin" :style="{ fill: color }" />
      <circle v-if="blip" :cx="blipPos.x" :cy="blipPos.y" r="15" class="pin-ring" :style="{ stroke: color }" />
    </svg>

    <span class="scan-line" :style="{ background: `linear-gradient(90deg, transparent, ${color}55, transparent)` }"></span>

    <template v-if="displayLabels.length">
      <span
        v-for="(l, i) in labelPos"
        :key="'l' + i"
        class="city-label"
        :class="{ active: activeIndex === i }"
        :style="{ left: l.x + 'px', top: l.y + 'px', color: activeIndex === i ? color : '' }"
      >{{ displayLabels[i] }}</span>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  size: { type: Number, default: 260 },
  color: { type: String, default: '#52D6B6' },
  labels: { type: Array, default: () => [] },
  blip: { type: Object, default: null },
  activeIndex: { type: Number, default: -1 },
  pad: { type: Number, default: 28 },
})

const C = computed(() => props.size / 2)
const inner = computed(() => props.size - props.pad * 2)
// 雷达始终表达 6 个宏观城市气质簇，不承载 32 个城市节点。
const displayLabels = computed(() => props.labels.slice(0, 6))

const nodes = computed(() => {
  const p = props.pad
  const s = inner.value
  return [
    { x: p + s * 0.48, y: p + s * 0.18 },
    { x: p + s * 0.2, y: p + s * 0.38 },
    { x: p + s * 0.68, y: p + s * 0.35 },
    { x: p + s * 0.82, y: p + s * 0.58 },
    { x: p + s * 0.34, y: p + s * 0.72 },
    { x: p + s * 0.58, y: p + s * 0.86 },
  ]
})

const axes = computed(() => {
  const p = props.pad
  const s = inner.value
  return [
    { x1: p + s * 0.08, y1: p + s * 0.5, x2: p + s * 0.92, y2: p + s * 0.5 },
    { x1: p + s * 0.5, y1: p + s * 0.08, x2: p + s * 0.5, y2: p + s * 0.92 },
  ]
})

const routePath = computed(() => {
  const pts = nodes.value
  return `M ${pts[1].x} ${pts[1].y} C ${pts[0].x} ${pts[0].y}, ${pts[2].x} ${pts[2].y}, ${pts[3].x} ${pts[3].y} S ${pts[5].x} ${pts[5].y}, ${pts[4].x} ${pts[4].y}`
})

const labelPos = computed(() => {
  const pts = nodes.value
  return pts.map((p, i) => ({
    x: p.x + (i % 2 ? -18 : 18),
    y: p.y + (i < 3 ? -18 : 18),
  }))
})

const blipPos = computed(() => {
  if (!props.blip) return { x: C.value, y: C.value }
  const a = (props.blip.angle * Math.PI) / 180
  const r = (props.blip.radius / 100) * (inner.value * 0.42)
  return { x: C.value + r * Math.cos(a), y: C.value + r * Math.sin(a) }
})
</script>

<style scoped>
.city-field {
  position: relative;
  margin: 0 auto;
  border-radius: 30px;
  overflow: hidden;
  background:
    radial-gradient(circle at 50% 18%, rgba(82, 214, 182, 0.1), transparent 38%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.025), rgba(255, 255, 255, 0)),
    var(--bg-panel);
  border: 1px solid var(--line);
}
.field-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
.panel {
  fill: transparent;
}
.grid-line {
  fill: none;
  stroke: rgba(255, 255, 255, 0.035);
  stroke-width: 1;
}
.map-grid {
  opacity: 0.72;
}
.axis {
  stroke: rgba(255, 255, 255, 0.09);
  stroke-width: 1;
  stroke-dasharray: 4 8;
}
.route-shadow {
  fill: none;
  stroke: rgba(0, 0, 0, 0.28);
  stroke-width: 10;
  stroke-linecap: round;
}
.route {
  fill: none;
  stroke: rgba(247, 177, 88, 0.72);
  stroke-width: 3;
  stroke-linecap: round;
  stroke-dasharray: 12 10;
  animation: routeMove 5s linear infinite;
}
@keyframes routeMove {
  to { stroke-dashoffset: -44; }
}
.node {
  fill: rgba(255, 255, 255, 0.2);
  stroke: rgba(255, 255, 255, 0.42);
  stroke-width: 1;
}
.node.active,
.pin {
  filter: drop-shadow(0 0 10px currentColor);
}
.hub {
  filter: drop-shadow(0 0 8px currentColor);
}
.pin-ring {
  fill: none;
  stroke-width: 1.5;
  opacity: 0.72;
  animation: pinPing 1.8s ease-out infinite;
}
@keyframes pinPing {
  from { transform-box: fill-box; transform-origin: center; transform: scale(0.72); opacity: 0.72; }
  to { transform-box: fill-box; transform-origin: center; transform: scale(2); opacity: 0; }
}
.scan-line {
  position: absolute;
  left: -30%;
  right: -30%;
  top: 0;
  height: 1px;
  animation: scanY 3.4s ease-in-out infinite;
}
@keyframes scanY {
  0%, 100% { transform: translateY(28px); opacity: 0; }
  15%, 80% { opacity: 1; }
  50% { transform: translateY(232px); }
}
.city-label {
  position: absolute;
  max-width: 70px;
  transform: translate(-50%, -50%);
  font-size: 10.5px;
  line-height: 1.2;
  color: var(--ink-3);
  text-align: center;
  pointer-events: none;
}
.city-label.active {
  font-weight: 800;
}
</style>
