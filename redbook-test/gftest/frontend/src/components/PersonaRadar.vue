<template>
  <div class="pr" ref="root">
    <svg :viewBox="`0 0 ${SZ} ${SZ}`" class="pr-svg" aria-hidden="true">
      <!-- 网格五边形 -->
      <polygon v-for="(r, i) in rings" :key="'r' + i" :points="ringPoints(r)" class="pr-grid" />
      <!-- 轴线 -->
      <line v-for="(p, i) in axisPts" :key="'a' + i" :x1="CX" :y1="CY" :x2="p.x" :y2="p.y" class="pr-axis" />
      <!-- 数据多边形 -->
      <polygon :points="dataPoints" class="pr-area" :style="{ transform: `scale(${scale})`, transformOrigin: `${CX}px ${CY}px` }" />
      <!-- 数据点 -->
      <circle v-for="(p, i) in dataPts" :key="'d' + i" :cx="p.x" :cy="p.y" r="3" class="pr-dot"
        :style="{ opacity: scale }" />
    </svg>
    <!-- 维度标签 -->
    <span v-for="(lab, i) in labels" :key="'l' + i" class="pr-label" :style="labelStyle(i)">
      <b>{{ lab }}</b><i class="mono">{{ vals[i] }}</i>
    </span>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'

const props = defineProps({
  dims: { type: Object, required: true }, // { 体贴度: 70, ... }
  order: { type: Array, default: () => ['体贴度', '浪漫度', '安全感', '趣味度', '坦诚度'] },
})

const SZ = 220
const CX = SZ / 2
const CY = SZ / 2
const R = 78
const rings = [1, 0.66, 0.33]
const N = 5

const labels = computed(() => props.order)
const vals = computed(() => props.order.map((k) => Math.round(props.dims[k] ?? 50)))

const root = ref(null)
const scale = ref(1)

function pt(i, radius) {
  const ang = (-90 + (360 / N) * i) * (Math.PI / 180)
  return { x: CX + radius * Math.cos(ang), y: CY + radius * Math.sin(ang) }
}
function ringPoints(scaleR) {
  return Array.from({ length: N }, (_, i) => { const p = pt(i, R * scaleR); return `${p.x},${p.y}` }).join(' ')
}
const axisPts = computed(() => Array.from({ length: N }, (_, i) => pt(i, R)))
const dataPts = computed(() => vals.value.map((v, i) => pt(i, (Math.max(5, Math.min(100, v)) / 100) * R)))
const dataPoints = computed(() => dataPts.value.map((p) => `${p.x},${p.y}`).join(' '))

function labelStyle(i) {
  const p = pt(i, R + 22)
  return { left: (p.x / SZ) * 100 + '%', top: (p.y / SZ) * 100 + '%' }
}

const reduced =
  typeof window !== 'undefined' && window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

let tween
onMounted(() => {
  if (reduced) { scale.value = 1; return }
  scale.value = 0
  const s = { v: 0 }
  tween = gsap.to(s, { v: 1, duration: 0.9, ease: 'back.out(1.5)', delay: 0.3, onUpdate: () => (scale.value = s.v) })
})
onBeforeUnmount(() => tween && tween.kill())
</script>

<style scoped>
.pr { position: relative; width: 100%; max-width: 240px; aspect-ratio: 1; margin: 0 auto; }
.pr-svg { width: 100%; height: 100%; overflow: visible; }
.pr-grid { fill: none; stroke: rgba(26, 23, 20, 0.12); stroke-width: 1; }
.pr-axis { stroke: rgba(26, 23, 20, 0.1); stroke-width: 1; }
.pr-area { fill: color-mix(in srgb, var(--magenta, #e84576) 26%, transparent); stroke: var(--magenta, #e84576); stroke-width: 2; stroke-linejoin: round; }
.pr-dot { fill: var(--magenta, #e84576); }
.pr-label { position: absolute; transform: translate(-50%, -50%); text-align: center; line-height: 1.1; white-space: nowrap; }
.pr-label b { display: block; font-size: 11px; font-weight: 800; color: var(--ink, #1a1714); }
.pr-label i { font-style: normal; font-size: 11px; color: var(--magenta, #e84576); font-weight: 700; }
@media (prefers-reduced-motion: reduce) {
  .pr-area, .pr-dot { transform: none !important; opacity: 1 !important; }
}
</style>
