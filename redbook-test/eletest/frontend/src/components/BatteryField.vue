<template>
  <div class="bf" ref="root">
    <!-- 大电池 -->
    <div class="bf-batt">
      <div class="bf-cells">
        <span v-for="n in 10" :key="n" class="bf-cell" :class="{ on: n <= litCells }"></span>
        <span class="bf-flow" :class="{ paused: reduced }"></span>
      </div>
      <span class="bf-cap"></span>
      <span class="bf-bolt"><Icon icon="mdi:flash" /></span>
    </div>

    <!-- 读数 -->
    <div class="bf-read">
      <span class="bf-pct mono">{{ pct }}<small>%</small></span>
      <span class="bf-state mono">{{ pct >= 60 ? '外放供电' : pct >= 30 ? '稳定巡航' : '省电模式' }}</span>
    </div>

    <!-- 充电路线 -->
    <svg class="bf-route" viewBox="0 0 320 56" preserveAspectRatio="none" aria-hidden="true">
      <path d="M 8 40 L 70 40 L 104 16 L 168 16 L 202 40 L 264 40 L 312 22" class="bf-path" />
      <path d="M 8 40 L 70 40 L 104 16 L 168 16 L 202 40 L 264 40 L 312 22" class="bf-path bf-path-dash" :class="{ paused: reduced }" />
      <g v-for="(s, i) in stops" :key="i">
        <circle :cx="s.x" :cy="s.y" r="4.5" class="bf-stop" :style="{ animationDelay: i * 0.5 + 's' }" />
      </g>
    </svg>
    <span class="bf-tag mono">社交电池地图 · 充电路线</span>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const root = ref(null)
const pct = ref(64)
const litCells = computed(() => Math.max(1, Math.round((pct.value / 100) * 10)))

const stops = [
  { x: 70, y: 40 }, { x: 104, y: 16 }, { x: 168, y: 16 }, { x: 202, y: 40 }, { x: 264, y: 40 },
]

const reduced =
  typeof window !== 'undefined' && window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

let clock
onMounted(() => {
  if (reduced) return
  clock = setInterval(() => {
    pct.value = 34 + Math.floor(Math.random() * 60)
  }, 1700)
})
onBeforeUnmount(() => clock && clearInterval(clock))
</script>

<style scoped>
.bf {
  position: relative;
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  padding: 20px 16px 26px;
  background:
    radial-gradient(120% 90% at 30% 0%, color-mix(in srgb, var(--accent) 16%, transparent), transparent 58%),
    var(--bg-raise);
}
.bf-batt { position: relative; display: flex; align-items: center; height: 64px; }
.bf-cells { position: relative; flex: 1; height: 100%; border: 2px solid var(--ink); border-radius: 12px;
  background: color-mix(in srgb, var(--bg) 60%, transparent); display: flex; gap: 4px; padding: 6px; overflow: hidden; }
.bf-cell { flex: 1; border-radius: 4px; background: color-mix(in srgb, var(--ink) 9%, transparent); transition: background 0.5s ease; }
.bf-cell.on { background: linear-gradient(180deg, var(--accent), color-mix(in srgb, var(--accent) 70%, var(--ink))); }
.bf-flow { position: absolute; top: 0; bottom: 0; width: 42%;
  background: linear-gradient(90deg, transparent, color-mix(in srgb, #fff 55%, transparent), transparent);
  mix-blend-mode: soft-light; animation: bf-charge 2.4s linear infinite; }
.bf-flow.paused { animation: none; opacity: 0; }
@keyframes bf-charge { 0% { transform: translateX(-120%); } 100% { transform: translateX(280%); } }
.bf-cap { width: 6px; height: 24px; border-radius: 0 4px 4px 0; background: var(--ink); margin-left: 3px; }
.bf-bolt { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--bg); font-size: 26px;
  filter: drop-shadow(0 0 6px color-mix(in srgb, var(--accent) 70%, transparent)); animation: bf-pulse 1.8s ease-in-out infinite; }
@keyframes bf-pulse { 0%, 100% { opacity: 0.65; } 50% { opacity: 1; } }

.bf-read { display: flex; align-items: baseline; justify-content: space-between; margin: 14px 2px 8px; }
.bf-pct { font-size: 38px; font-weight: 900; line-height: 1; color: var(--accent); letter-spacing: -0.02em; }
.bf-pct small { font-size: 16px; }
.bf-state { font-size: 12px; color: var(--ink-2); }

.bf-route { width: 100%; height: 54px; }
.bf-path { fill: none; stroke: var(--line-strong); stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.bf-path-dash { stroke: var(--accent); stroke-dasharray: 8 10; animation: bf-dash 1.1s linear infinite; }
.bf-path-dash.paused { animation: none; }
@keyframes bf-dash { to { stroke-dashoffset: -18; } }
.bf-stop { fill: var(--bg); stroke: var(--accent); stroke-width: 2; animation: bf-blip 2.5s ease-out infinite; }
@keyframes bf-blip { 0%, 70% { r: 4.5; opacity: 1; } 85% { r: 6.5; opacity: 0.6; } 100% { r: 4.5; opacity: 1; } }

.bf-tag { position: absolute; left: 16px; bottom: 9px; font-size: 10px; color: var(--ink-3); letter-spacing: 0.5px; }

@media (prefers-reduced-motion: reduce) {
  .bf-flow, .bf-bolt, .bf-path-dash, .bf-stop { animation: none !important; }
}
</style>
