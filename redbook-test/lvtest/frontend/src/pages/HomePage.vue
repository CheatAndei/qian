<template>
  <div class="home">
    <header class="status" v-motion="{ initial: { opacity: 0, y: -10 }, enter: { opacity: 1, y: 0, transition: { delay: 60 } } }">
      <span class="rec"><i class="rec-dot"></i> 升温中</span>
      <span class="dev mono">INTIMACY LV</span>
      <span class="sig"><Icon icon="mdi:heart-multiple-outline" /></span>
    </header>

    <section class="radar-wrap" v-motion="{ initial: { opacity: 0, scale: 0.92 }, enter: { opacity: 1, scale: 1, transition: { delay: 140, type: 'spring', stiffness: 160, damping: 20 } } }">
      <RadarScope :size="280" :labels="labels" />
      <p class="radar-cap mono">SYNC · 正在校准你们的亲密层级</p>
    </section>

    <div class="hero">
      <span class="badge">情侣互动状态测试</span>
      <h1>你们现在<br /><em>谁在靠近谁？</em></h1>
      <p>20 题看你们的亲密温度、默契节奏和稳定承接，给关系一个等级刻度。</p>
    </div>

    <div class="specs">
      <div class="spec"><Icon icon="mdi:timer-sand" /><em>用时</em><b>约 3 分钟</b></div>
      <div class="spec"><Icon icon="mdi:format-list-numbered" /><em>题量</em><b>20 项</b></div>
      <div class="spec"><Icon icon="mdi:heart-multiple-outline" /><em>输出</em><b>Lv 等级卡</b></div>
    </div>

    <button class="cta" @click="start">
      <span class="cta-ring"></span>
      <Icon icon="mdi:heart-multiple-outline" />
      <span>开始观察</span>
    </button>
    <p class="proof mono">20 个互动场景 · 主结果免费 · 深报查看答案证据</p>

    <p class="note">本测试由 AI 生成，仅供娱乐参考，不构成现实关系判断或专业建议。</p>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import RadarScope from '../components/RadarScope.vue'
import { archetypes, ARCHETYPE_ORDER } from '../data/quiz.js'

const router = useRouter()
const labels = ARCHETYPE_ORDER.map((k) => archetypes[k].name)

function start() {
  router.push('/quiz')
}
</script>

<style scoped>
.home { min-height: 100dvh; display: flex; flex-direction: column; align-items: center; padding: 14px 20px 32px; }
.status { width: 100%; display: flex; align-items: center; justify-content: space-between; font-size: 11px; color: var(--ink-2); padding: 4px 2px 8px; }
.rec { display: inline-flex; align-items: center; gap: 6px; color: var(--accent); font-weight: 700; letter-spacing: 1px; }
.rec-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 8px var(--accent); animation: blink 1.3s steps(1) infinite; }
@keyframes blink { 0%, 60% { opacity: 1; } 61%, 100% { opacity: 0.2; } }
.dev { letter-spacing: 2px; color: var(--ink-3); }
.sig { display: inline-flex; font-size: 16px; color: var(--accent); }
.radar-wrap { margin-top: 6px; text-align: center; }
.radar-cap { font-size: 11px; color: var(--ink-3); letter-spacing: 1px; margin-top: 14px; }
.hero { text-align: center; margin: 24px 0 4px; }
.badge { display: inline-block; font-size: 12px; font-weight: 700; letter-spacing: 3px; color: var(--accent); border: 1px solid var(--accent-soft); background: var(--accent-soft); padding: 4px 14px; border-radius: 20px; }
.hero h1 { font-size: 36px; font-weight: 900; line-height: 1.2; color: var(--ink); margin: 16px 0 12px; letter-spacing: 1px; }
.hero h1 em { font-style: normal; color: var(--accent); text-shadow: 0 0 24px var(--accent-soft); }
.hero p { font-size: 13.5px; line-height: 1.7; color: var(--ink-2); }
.specs { display: flex; gap: 10px; width: 100%; margin: 26px 0 0; }
.spec { flex: 1; background: var(--bg-panel); border: 1px solid var(--line); border-radius: 14px; padding: 14px 8px; display: flex; flex-direction: column; align-items: center; gap: 4px; }
.spec :deep(svg) { font-size: 20px; color: var(--accent); }
.spec em { font-style: normal; font-size: 11px; color: var(--ink-3); margin-top: 2px; }
.spec b { font-size: 13px; color: var(--ink); font-weight: 700; }
.cta { position: relative; width: 100%; margin-top: 30px; padding: 18px; border: none; border-radius: 16px; background: linear-gradient(135deg, var(--accent), var(--accent-2)); color: #180911; font-size: 19px; font-weight: 800; letter-spacing: 2px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 9px; box-shadow: 0 12px 36px var(--accent-soft); overflow: hidden; }
.cta:active { transform: scale(0.97); }
.cta :deep(svg) { font-size: 22px; }
.cta-ring { position: absolute; inset: 0; border-radius: 16px; border: 2px solid rgba(255, 255, 255, 0.5); opacity: 0; animation: ctaRing 2.6s ease-out infinite; }
@keyframes ctaRing { 0% { opacity: 0.45; transform: scale(0.96); } 70%, 100% { opacity: 0; transform: scale(1.04); } }
.proof { font-size: 12px; color: var(--ink-3); margin-top: 14px; }
.proof b { color: var(--ink-2); }
.note { margin-top: auto; padding-top: 28px; font-size: 11px; color: var(--ink-3); text-align: center; line-height: 1.6; }
</style>

