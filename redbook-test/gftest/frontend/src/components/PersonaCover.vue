<template>
  <div class="pc" ref="root">
    <!-- 品红印刷点 -->
    <span class="pc-halftone" aria-hidden="true"></span>

    <!-- 刊头 -->
    <div class="pc-masthead">
      <span class="pc-issue mono">ISSUE · 2026</span>
      <h2 class="pc-name">LOVE<br /><em>PERSONA</em></h2>
      <span class="pc-tagline mono">恋爱人格 · 本期特辑</span>
    </div>

    <!-- 拍立得封面人物 -->
    <div class="pc-polaroid">
      <div class="pc-photo">
        <Icon icon="mdi:account-heart-outline" />
        <span class="pc-flash" :class="{ on: developed }"></span>
      </div>
      <span class="pc-caption mono">COVER · 你是谁</span>
    </div>

    <!-- 漂浮人格贴纸 -->
    <span
      v-for="(s, i) in stickers"
      :key="i"
      class="pc-sticker"
      :class="'s-' + (i % 4)"
      :style="stickerStyle(i)"
    >{{ s }}</span>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const root = ref(null)
const developed = ref(true)

// 人格贴纸（人设名，作为杂志贴纸；非装饰 emoji）
const stickers = ['女王范', '温柔', '猫系', '撩人精', '事业型', '粘人精', '小恶魔', '戏精']

const positions = [
  { top: 8, left: 6, rot: -8 },
  { top: 20, left: 70, rot: 7 },
  { top: 44, left: 4, rot: 6 },
  { top: 58, left: 74, rot: -6 },
  { top: 74, left: 14, rot: -4 },
  { top: 80, left: 58, rot: 8 },
  { top: 34, left: 40, rot: -5 },
  { top: 66, left: 40, rot: 5 },
]

const reduced =
  typeof window !== 'undefined' && window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function stickerStyle(i) {
  const p = positions[i] || { top: 50, left: 50, rot: 0 }
  return {
    top: p.top + '%',
    left: p.left + '%',
    '--rot': p.rot + 'deg',
    animationDelay: (i * 0.4).toFixed(2) + 's',
    animationDuration: (3.6 + (i % 3) * 0.8).toFixed(2) + 's',
  }
}

let t
onMounted(() => {
  if (reduced) return
  developed.value = false
  t = setTimeout(() => (developed.value = true), 400)
})
onBeforeUnmount(() => clearTimeout(t))
</script>

<style scoped>
.pc {
  position: relative;
  width: 100%;
  height: 280px;
  border-radius: 14px;
  overflow: hidden;
  background:
    radial-gradient(120% 100% at 80% 10%, color-mix(in srgb, var(--magenta, #e84576) 14%, transparent), transparent 55%),
    var(--mag-white, #faf6ef);
}
.pc-halftone { position: absolute; inset: 0; pointer-events: none; opacity: 0.5;
  background-image: radial-gradient(color-mix(in srgb, var(--magenta, #e84576) 26%, transparent) 1px, transparent 1.4px);
  background-size: 11px 11px; -webkit-mask-image: linear-gradient(135deg, #000, transparent 60%); mask-image: linear-gradient(135deg, #000, transparent 60%); }

.pc-masthead { position: absolute; left: 16px; top: 16px; z-index: 2; }
.pc-issue { font-size: 10px; color: var(--ink-2, #8a8076); letter-spacing: 1px; }
.pc-name { font-size: 38px; font-weight: 900; line-height: 0.92; letter-spacing: -0.02em; color: var(--ink, #1a1714); margin: 6px 0; }
.pc-name em { font-style: italic; color: var(--magenta, #e84576); }
.pc-tagline { font-size: 10px; color: var(--ink-2, #8a8076); letter-spacing: 0.5px; }

.pc-polaroid { position: absolute; right: 14px; bottom: 14px; z-index: 2; background: #fff; padding: 8px 8px 6px; border-radius: 4px; box-shadow: 0 8px 22px rgba(26, 23, 20, 0.18); transform: rotate(4deg); }
.pc-photo { position: relative; width: 88px; height: 88px; border-radius: 3px; display: grid; place-items: center;
  background: linear-gradient(150deg, color-mix(in srgb, var(--magenta, #e84576) 20%, #fff), color-mix(in srgb, var(--magenta, #e84576) 8%, #fff));
  color: var(--magenta, #e84576); font-size: 44px; overflow: hidden; }
.pc-flash { position: absolute; inset: 0; background: #fff; opacity: 0; }
.pc-flash.on { animation: pc-develop 1.1s ease forwards; }
@keyframes pc-develop { 0% { opacity: 1; } 100% { opacity: 0; } }
.pc-caption { display: block; text-align: center; font-size: 8.5px; color: var(--ink-2, #8a8076); margin-top: 5px; letter-spacing: 0.5px; }

.pc-sticker { position: absolute; z-index: 1; font-size: 11px; font-weight: 800; color: var(--ink, #1a1714);
  background: #fff; border: 1.5px solid var(--ink, #1a1714); padding: 3px 9px; border-radius: 999px;
  transform: rotate(var(--rot)); box-shadow: 2px 2px 0 rgba(26, 23, 20, 0.12);
  animation: pc-float ease-in-out infinite; }
.pc-sticker.s-0 { border-color: var(--magenta, #e84576); color: var(--magenta, #e84576); }
.pc-sticker.s-1 { border-color: #f4c430; }
.pc-sticker.s-2 { border-color: #3aa6b9; }
.pc-sticker.s-3 { border-color: #5fa85f; }
@keyframes pc-float {
  0%, 100% { transform: rotate(var(--rot)) translateY(0); }
  50% { transform: rotate(var(--rot)) translateY(-6px); }
}

@media (prefers-reduced-motion: reduce) {
  .pc-sticker, .pc-flash.on { animation: none !important; }
  .pc-flash.on { opacity: 0; }
}
</style>
