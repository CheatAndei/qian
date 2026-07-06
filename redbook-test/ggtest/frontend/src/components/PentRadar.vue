<template>
  <div class="radar">
    <svg :viewBox="`0 0 ${SIZE} ${SIZE}`" class="radar-svg">
      <!-- 网格环 -->
      <polygon
        v-for="(ring, ri) in rings"
        :key="'r' + ri"
        :points="ring"
        class="radar-ring"
      />
      <!-- 轴线 -->
      <line
        v-for="(p, i) in axisPoints"
        :key="'a' + i"
        :x1="C"
        :y1="C"
        :x2="p.x"
        :y2="p.y"
        class="radar-axis"
      />
      <!-- 数据面 -->
      <polygon :points="dataPoints" class="radar-area" :style="areaStyle" />
      <!-- 顶点 -->
      <circle
        v-for="(p, i) in dataVerts"
        :key="'v' + i"
        :cx="p.x"
        :cy="p.y"
        r="3.2"
        class="radar-vert"
        :style="{ fill: color }"
      />
    </svg>
    <!-- 维度标签 -->
    <span
      v-for="(p, i) in labelPoints"
      :key="'l' + i"
      class="radar-label"
      :style="{ left: p.x + 'px', top: p.y + 'px', transform: p.t }"
    >
      <em>{{ labels[i] }}</em>
      <b class="mono" :style="{ color }">{{ values[i] }}</b>
    </span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  values: { type: Array, required: true }, // [0..100] × 5
  labels: { type: Array, required: true },
  color: { type: String, default: '#FF6F61' },
})

const SIZE = 240
const C = SIZE / 2
const R = 84
const N = 5

// 每个轴的角度（从正上方开始，顺时针）
function angle(i) {
  return -Math.PI / 2 + (i * 2 * Math.PI) / N
}
function pt(i, radius) {
  return { x: C + radius * Math.cos(angle(i)), y: C + radius * Math.sin(angle(i)) }
}

const axisPoints = computed(() => Array.from({ length: N }, (_, i) => pt(i, R)))

const rings = computed(() =>
  [0.25, 0.5, 0.75, 1].map((f) =>
    Array.from({ length: N }, (_, i) => {
      const p = pt(i, R * f)
      return `${p.x},${p.y}`
    }).join(' ')
  )
)

const dataVerts = computed(() =>
  props.values.map((v, i) => pt(i, R * (Math.max(0, Math.min(100, v)) / 100)))
)
const dataPoints = computed(() => dataVerts.value.map((p) => `${p.x},${p.y}`).join(' '))

const areaStyle = computed(() => ({
  fill: props.color + '2e',
  stroke: props.color,
}))

const labelPoints = computed(() =>
  Array.from({ length: N }, (_, i) => {
    const p = pt(i, R + 22)
    // 根据方位微调对齐
    let tx = '-50%'
    if (p.x > C + 4) tx = '-10%'
    if (p.x < C - 4) tx = '-90%'
    return { x: p.x, y: p.y, t: `translate(${tx}, -50%)` }
  })
)
</script>

<style scoped>
.radar {
  position: relative;
  width: 240px;
  height: 240px;
  margin: 0 auto;
}
.radar-svg {
  width: 100%;
  height: 100%;
  overflow: visible;
}
.radar-ring {
  fill: none;
  stroke: rgba(255, 255, 255, 0.1);
  stroke-width: 1;
}
.radar-axis {
  stroke: rgba(255, 255, 255, 0.12);
  stroke-width: 1;
}
.radar-area {
  stroke-width: 2;
  stroke-linejoin: round;
  transform-origin: 120px 120px;
  animation: radarIn 0.9s cubic-bezier(0.34, 1.4, 0.5, 1) both;
}
.radar-vert {
  animation: radarIn 0.9s cubic-bezier(0.34, 1.4, 0.5, 1) both;
}
@keyframes radarIn {
  from { transform: scale(0.05); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
.radar-label {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1px;
  width: 60px;
  text-align: center;
  pointer-events: none;
}
.radar-label em {
  font-style: normal;
  font-size: 11px;
  color: var(--ink-2);
  white-space: nowrap;
}
.radar-label b {
  font-size: 13px;
  font-weight: 700;
}
</style>
