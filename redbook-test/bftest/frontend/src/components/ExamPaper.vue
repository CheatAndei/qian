<template>
  <div class="ep" ref="root">
    <!-- 试卷抬头 -->
    <div class="ep-head">
      <span class="ep-kicker mono">男友资格 · 标准答卷</span>
      <span class="ep-no mono">NO.2026</span>
    </div>

    <!-- 红笔分数（右上角批改） -->
    <div class="ep-score">
      <span class="ep-score-num mono">{{ score }}</span>
      <span class="ep-score-unit">分</span>
      <span class="ep-score-line"></span>
    </div>

    <!-- 题目逐行批改 -->
    <ul class="ep-rows">
      <li v-for="(r, i) in rows" :key="i" class="ep-row" :style="{ '--d': i * 0.22 + 's' }">
        <span class="ep-num mono">{{ i + 1 }}</span>
        <span class="ep-q">{{ r.q }}</span>
        <svg class="ep-mark" :class="[r.ok ? 'ok' : 'no', { go: marked }]" viewBox="0 0 32 32" aria-hidden="true">
          <path v-if="r.ok" class="ep-stroke" d="M6 17 L13 24 L27 7" />
          <template v-else>
            <path class="ep-stroke" d="M9 9 L23 23" />
            <path class="ep-stroke ep-stroke-2" d="M23 9 L9 23" />
          </template>
        </svg>
      </li>
    </ul>

    <!-- 红笔批注 -->
    <div class="ep-comment">
      <svg class="ep-wave" :class="{ go: marked }" viewBox="0 0 220 8" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 4 Q 11 0 22 4 T 44 4 T 66 4 T 88 4 T 110 4 T 132 4 T 154 4 T 176 4 T 198 4 T 220 4" />
      </svg>
      <span class="ep-comment-tx">阅卷批注：嘴甜能加分，行动还得练</span>
    </div>

    <!-- 合格章 -->
    <div class="ep-stamp" :class="{ pressed }">
      <span class="ep-stamp-in">
        <b>合格</b>
        <i class="mono">PASS · 72</i>
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'

const root = ref(null)
const score = ref(72)
const marked = ref(false)
const pressed = ref(false)

const rows = [
  { q: '记得纪念日与重要日子', ok: true },
  { q: '吵架时先冷静再沟通', ok: true },
  { q: '从不已读不回', ok: false },
  { q: '在意你的情绪变化', ok: true },
  { q: '该花钱时不抠门', ok: false },
]

const reduced =
  typeof window !== 'undefined' && window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

let tween, t1, t2
onMounted(() => {
  if (reduced) { marked.value = true; pressed.value = true; return }
  score.value = 0
  const s = { v: 0 }
  tween = gsap.to(s, { v: 72, duration: 1.4, ease: 'power2.out', delay: 0.35,
    onUpdate: () => { score.value = Math.round(s.v) } })
  t1 = setTimeout(() => (marked.value = true), 250)
  t2 = setTimeout(() => (pressed.value = true), 1500)
})
onBeforeUnmount(() => {
  tween && tween.kill()
  clearTimeout(t1); clearTimeout(t2)
})
</script>

<style scoped>
.ep {
  --paper: #fffdf7;
  --ink: #2a2622;
  --ink-2: #8c8278;
  --red: #d7263d;
  --red-deep: #c0202e;
  --rule: rgba(42, 38, 34, 0.07);
  position: relative;
  width: 100%;
  border-radius: 14px;
  padding: 16px 16px 18px;
  background:
    repeating-linear-gradient(180deg, transparent 0 27px, var(--rule) 27px 28px),
    var(--paper);
  box-shadow: inset 0 0 0 1px rgba(42, 38, 34, 0.06);
  overflow: hidden;
}
/* 装订孔 + 红色密封边 */
.ep::before {
  content: '';
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 4px;
  background: var(--red);
  opacity: 0.85;
}

.ep-head { display: flex; align-items: center; justify-content: space-between; padding-left: 8px; }
.ep-kicker { font-size: 11px; color: var(--ink-2); letter-spacing: 0.5px; }
.ep-no { font-size: 10px; color: var(--ink-2); border: 1px solid var(--rule); padding: 2px 6px; border-radius: 4px; }

.ep-score { position: absolute; right: 14px; top: 34px; text-align: right; z-index: 3; }
.ep-score-num { font-size: 44px; font-weight: 900; color: var(--red); line-height: 1; letter-spacing: -0.02em; }
.ep-score-unit { font-size: 14px; color: var(--red); margin-left: 2px; }
.ep-score-line { display: block; height: 2px; width: 64px; margin-left: auto; margin-top: 2px;
  background: var(--red); border-radius: 2px; transform: rotate(-2deg); opacity: 0.8; }

.ep-rows { list-style: none; margin: 18px 0 0; padding-left: 8px; display: flex; flex-direction: column; }
.ep-row { display: flex; align-items: center; gap: 9px; height: 28px; }
.ep-num { width: 16px; font-size: 11px; color: var(--ink-2); }
.ep-q { flex: 1; font-size: 13.5px; color: var(--ink); }
.ep-mark { width: 24px; height: 24px; flex-shrink: 0; }
.ep-stroke { fill: none; stroke: var(--red); stroke-width: 3; stroke-linecap: round; stroke-linejoin: round;
  stroke-dasharray: 48; stroke-dashoffset: 48; }
.ep-mark.no .ep-stroke { stroke: var(--ink-2); }
.ep-mark.go .ep-stroke { animation: ep-draw 0.4s ease forwards; animation-delay: var(--d); }
.ep-mark.go .ep-stroke-2 { animation-delay: calc(var(--d) + 0.12s); }
@keyframes ep-draw { to { stroke-dashoffset: 0; } }

.ep-comment { position: relative; margin: 14px 0 0; padding-left: 8px; }
.ep-comment-tx { font-size: 12.5px; color: var(--red-deep); font-style: italic; }
.ep-wave { position: absolute; left: 6px; bottom: -6px; width: 190px; height: 8px; }
.ep-wave path { fill: none; stroke: var(--red); stroke-width: 2; stroke-linecap: round;
  stroke-dasharray: 460; stroke-dashoffset: 460; }
.ep-wave.go path { animation: ep-draw-wave 0.9s ease forwards 0.6s; }
@keyframes ep-draw-wave { to { stroke-dashoffset: 0; } }

.ep-stamp { position: absolute; right: 16px; bottom: 14px; width: 76px; height: 76px; border-radius: 50%;
  border: 3px solid var(--red); color: var(--red); display: grid; place-items: center;
  transform: rotate(-14deg) scale(2.4); opacity: 0; transition: none; z-index: 2; }
.ep-stamp.pressed { animation: ep-press 0.5s cubic-bezier(0.2, 1.4, 0.3, 1) forwards; }
@keyframes ep-press {
  0% { transform: rotate(-14deg) scale(2.4); opacity: 0; }
  60% { opacity: 0.95; }
  100% { transform: rotate(-14deg) scale(1); opacity: 0.9; }
}
.ep-stamp-in { text-align: center; }
.ep-stamp-in b { display: block; font-size: 22px; font-weight: 900; letter-spacing: 2px; }
.ep-stamp-in i { font-style: normal; font-size: 9px; letter-spacing: 1px; }

@media (prefers-reduced-motion: reduce) {
  .ep-mark.go .ep-stroke, .ep-wave.go path { animation: none !important; stroke-dashoffset: 0 !important; }
  .ep-stamp.pressed { animation: none !important; transform: rotate(-14deg) scale(1); opacity: 0.9; }
}
</style>
