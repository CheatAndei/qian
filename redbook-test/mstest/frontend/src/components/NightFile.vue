<template>
  <div class="nf" ref="root">
    <svg class="nf-svg" viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <radialGradient id="nf-glow" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stop-color="var(--red)" stop-opacity="0.12" />
          <stop offset="100%" stop-color="var(--red)" stop-opacity="0" />
        </radialGradient>
        <filter id="nf-blur">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>
      <rect x="0" y="0" width="320" height="180" fill="url(#nf-glow)" />
      <!-- 保密线 -->
      <line v-for="l in 3" :key="l" class="nf-line" :x1="8" :y1="26 + l * 22" :x2="176" :y2="26 + l * 22" />
      <!-- 隐去的信息 -->
      <g :opacity="masked ? 0.35 : 1">
        <text x="18" y="76" class="nf-tx">反差人格档案</text>
        <text x="18" y="96" class="nf-tx nf-tx-ds" font-size="8">CONTEXT PROFILE · 无需填写姓名</text>
      </g>
      <!-- 红烛芯 / 微光 -->
      <circle cx="282" cy="104" r="14" class="nf-core" />
      <circle cx="282" cy="104" r="22" class="nf-aura" :class="{ on: coreAlive }" />
      <!-- 扫瞄线 -->
      <line class="nf-scan" :class="{ paused: reduced }" x1="0" :y1="scanY" x2="320" :y2="scanY" />
    </svg>
    <span class="nf-tag mono">隐藏反差值 · 4 维场景模型</span>
    <span class="nf-drp"><Icon icon="mdi:moon-waning-crescent" /></span>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Icon from './Icon.vue'

const root = ref(null)
const masked = ref(true)
const coreAlive = ref(false)
const scanY = ref(40)
const v = ref(40)
const dir = ref(1)

const reduced =
  typeof window !== 'undefined' && window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

let t1, t2
onMounted(() => {
  if (reduced) {
    masked.value = false
    coreAlive.value = true
    return
  }
  t1 = setTimeout(() => (masked.value = false), 400)
  t2 = setInterval(() => {
    v.value += dir.value * 1.2
    if (v.value > 115) dir.value = -1
    if (v.value < 38) dir.value = 1
    scanY.value = Math.round(v.value)
    coreAlive.value = Math.random() > 0.4
  }, 80)
})
onBeforeUnmount(() => { clearTimeout(t1); clearInterval(t2) })
</script>

<style scoped>
.nf {
  position: relative;
  width: 100%;
  height: 196px;
  border-radius: 14px;
  overflow: hidden;
  background:
    radial-gradient(140% 120% at 50% 40%, color-mix(in srgb, var(--red) 10%, transparent), transparent 60%),
    var(--surface);
}
.nf-svg { position: absolute; inset: 0; width: 100%; height: 100%; }
.nf-line { stroke: color-mix(in srgb, var(--ink-2) 40%, transparent); stroke-width: 1; stroke-dasharray: 4 6; }
.nf-tx { fill: var(--ink-2); font-family: var(--mono); font-size: 9px; letter-spacing: 1px; }
.nf-tx-ds { fill: var(--red); opacity: 0.7; }
.nf-core { fill: var(--red); filter: url(#nf-blur); }
.nf-aura { fill: none; stroke: var(--red); stroke-width: 1; opacity: 0; transition: opacity 0.6s ease; }
.nf-aura.on { opacity: 0.5; animation: nf-glow 2.2s ease-in-out infinite; }
@keyframes nf-glow { 0%, 100% { r: 22; stroke-width: 1; } 50% { r: 26; stroke-width: 2; } }
.nf-scan { stroke: var(--red); stroke-width: 0.8; opacity: 0.3; animation: nf-move 2.8s ease-in-out infinite; }
.nf-scan.paused { animation: none; }
@keyframes nf-move { 0%, 100% { opacity: 0.15; } 50% { opacity: 0.45; } }

.nf-tag { position: absolute; left: 14px; bottom: 10px; font-size: 10px; color: var(--ink-3); letter-spacing: 0.5px; }
.nf-drp { position: absolute; right: 12px; bottom: 10px; font-size: 18px; color: var(--red); opacity: 0.5; }
@media (prefers-reduced-motion: reduce) {
  .nf-aura.on, .nf-scan { animation: none !important; }
  .nf-aura.on { opacity: 0.5; }
  .nf-scan { opacity: 0.3; }
}
</style>
