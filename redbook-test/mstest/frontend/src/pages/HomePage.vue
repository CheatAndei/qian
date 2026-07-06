<template>
  <div class="hp">
    <span class="hp-noise" aria-hidden="true"></span>
    <header class="hp-bar rise" style="animation-delay: 40ms"><span class="hp-live"><i></i> 夜间</span><span class="hp-org mono">匿名档案 · 外冷内热</span><span class="hp-sig"><Icon icon="mdi:moon-waning-crescent" /></span></header>
    <div class="hp-ticker rise" style="animation-delay: 80ms" aria-hidden="true"><div class="hp-ticker-row"><span v-for="n in 2" :key="n" class="mono">外冷内热档案 · 闷骚指数测试 · 人前正经人后狂野 · 30 项深度探测 · 匿名报告 · 主结果免费 · </span></div></div>
    <section class="hp-stage rise" style="animation-delay: 130ms">
      <div class="hp-stage-head"><span class="mono"><Icon icon="mdi:file-hidden" /> 夜间档案 · 身份加密</span><span class="mono hp-stage-code">FILE · MS</span></div>
      <NightFile />
    </section>
    <div class="hp-stats">
      <div class="hp-stat rise" style="animation-delay: 230ms"><b class="mono">{{ statA }}</b><em>种人设</em></div>
      <div class="hp-stat rise" style="animation-delay: 290ms"><b class="mono">{{ statB }}</b><em>项探测</em></div>
      <div class="hp-stat rise" style="animation-delay: 350ms"><b class="mono">{{ pct }}<small>%</small></b><em>闷骚度上限</em></div>
    </div>
    <main class="hp-hero"><span class="hp-badge rise" style="animation-delay: 320ms">匿名夜间指数</span><h1><span class="rise" style="animation-delay: 380ms">你的闷骚指数</span><em class="rise" style="animation-delay: 460ms">有多高？</em></h1><p class="rise" style="animation-delay: 560ms">人前正经、人后狂野？30 项匿名深度探测，生成只有你能看的外冷内热档案。本报告加密保存，不发给任何人。</p></main>
    <div class="hp-specs">
      <div class="hp-spec rise" style="animation-delay: 620ms"><Icon icon="mdi:account-question-outline" /><em>人设</em><b>8 种类型</b></div>
      <div class="hp-spec rise" style="animation-delay: 680ms"><Icon icon="mdi:shield-moon-outline" /><em>档案</em><b>加密仅本人</b></div>
      <div class="hp-spec rise" style="animation-delay: 740ms"><Icon icon="mdi:share-variant-outline" /><em>分享</em><b>匿名档案卡</b></div>
    </div>
    <button class="hp-cta rise" style="animation-delay: 800ms" @click="$router.push('/quiz')"><span class="hp-cta-ring"></span><span class="hp-cta-label">开启夜间档案</span><span class="hp-cta-ic"><Icon icon="mdi:moon-waning-crescent" /></span></button>
    <p class="hp-proof mono">{{ proof }}</p>
    <p class="hp-note">* 娱乐测试，结果由 AI 生成，仅供参考。匿名档案，放心作答。</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import Icon from '../components/Icon.vue'
import NightFile from '../components/NightFile.vue'

const statA = ref(8); const statB = ref(30); const pct = ref(100)
const proofs = ['已有暗夜匿名者解锁了这本档案', '不少人在凌晨偷偷完成测试', '深夜活跃指数最高的测试之一']
const proof = ref(proofs[Math.floor(Math.random() * proofs.length)])
const reduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
onMounted(() => {
  if (reduced) return
  const s = { a: 0, b: 0, p: 0 }
  statA.value = 0; statB.value = 0; pct.value = 0
  gsap.to(s, { a: 8, b: 30, p: 100, duration: 1.1, ease: 'power2.out', delay: 0.4,
    onUpdate: () => { statA.value = Math.round(s.a); statB.value = Math.round(s.b); pct.value = Math.round(s.p) } })
})
</script>

<style scoped>
.hp { --bg: #0d0c0f; --surface: #16141a; --ink: #e8e2dc; --ink-2: #978e84; --ink-3: #6b6260; --red: #b8404e; --red-soft: rgba(184, 64, 78, 0.14); --glow: #c28e44; --line: rgba(232, 226, 220, 0.09); --line-strong: rgba(232, 226, 220, 0.16); --mono: 'SFMono-Regular', ui-monospace, 'JetBrains Mono', Consolas, monospace; position: relative; min-height: 100dvh; max-width: 480px; margin: 0 auto; background: var(--bg); padding: 12px 20px 34px; display: flex; flex-direction: column; overflow: hidden; }
.mono { font-family: var(--mono); font-variant-numeric: tabular-nums; letter-spacing: 0.3px; }
.hp-noise { position: absolute; inset: 0; pointer-events: none; z-index: 0; opacity: 0.6; background-image: radial-gradient(rgba(232, 226, 220, 0.05) 0.4px, transparent 0.6px); background-size: 3px 3px; }
.hp > *:not(.hp-noise) { position: relative; z-index: 1; }
.rise { opacity: 0; animation: hp-rise 0.7s cubic-bezier(0.32, 0.72, 0, 1) forwards; }
@keyframes hp-rise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
.hp-bar { display: flex; align-items: center; justify-content: space-between; font-size: 11px; color: var(--ink-2); padding: 4px 2px 12px; }
.hp-live { display: inline-flex; align-items: center; gap: 6px; color: var(--glow); font-weight: 800; letter-spacing: 1px; }
.hp-live i { width: 7px; height: 7px; border-radius: 50%; background: var(--glow); box-shadow: 0 0 10px var(--glow); animation: hp-blink 1.4s steps(1) infinite; }
@keyframes hp-blink { 0%, 62% { opacity: 1; } 63%, 100% { opacity: 0.25; } }
.hp-org { letter-spacing: 0.5px; color: var(--ink-3); font-size: 10.5px; }
.hp-sig { color: var(--red); font-size: 17px; }
.hp-ticker { overflow: hidden; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); padding: 6px 0; margin-bottom: 16px; -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent); mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent); }
.hp-ticker-row { display: inline-flex; white-space: nowrap; animation: hp-marquee 23s linear infinite; }
.hp-ticker-row span { font-size: 10.5px; color: var(--ink-3); letter-spacing: 0.4px; font-weight: 600; }
@keyframes hp-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
.hp-stage { background: var(--surface); border: 1px solid var(--line); border-radius: 16px; padding: 6px; box-shadow: 0 14px 40px rgba(0, 0, 0, 0.4); }
.hp-stage-head { display: flex; align-items: center; justify-content: space-between; padding: 8px 12px 6px; font-size: 10px; color: var(--ink-3); }
.hp-stage-head .mono { display: inline-flex; align-items: center; gap: 4px; }
.hp-stage-head svg { color: var(--red); }
.hp-stage-code { color: var(--red); letter-spacing: 1px; }
.hp-stats { display: flex; gap: 8px; margin: 14px 0 0; }
.hp-stat { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 2px; padding: 10px 4px; background: var(--surface); border: 1px solid var(--line); border-radius: 13px; }
.hp-stat b { font-size: 24px; font-weight: 900; color: var(--ink); letter-spacing: -0.01em; }
.hp-stat b small { font-size: 14px; color: var(--red); }
.hp-stat em { font-style: normal; font-size: 10.5px; color: var(--ink-3); }
.hp-hero { margin: 26px 0 0; }
.hp-badge { display: inline-flex; align-items: center; gap: 5px; font-size: 12px; font-weight: 800; color: var(--glow); background: rgba(194, 142, 68, 0.12); padding: 5px 13px; border-radius: 999px; }
.hp-hero h1 { font-size: 40px; line-height: 1.1; letter-spacing: -0.02em; margin: 14px 0 12px; color: var(--ink); }
.hp-hero h1 span, .hp-hero h1 em { display: block; }
.hp-hero h1 em { font-style: normal; color: var(--red); }
.hp-hero p { color: var(--ink-2); font-size: 14px; line-height: 1.8; text-wrap: pretty; }
.hp-specs { display: flex; gap: 10px; margin: 24px 0 0; }
.hp-spec { flex: 1; background: var(--surface); border: 1px solid var(--line); border-radius: 14px; padding: 13px 8px; display: flex; flex-direction: column; align-items: center; gap: 4px; text-align: center; transition: transform 0.4s cubic-bezier(0.32, 0.72, 0, 1), border-color 0.3s ease; }
.hp-spec:active { transform: translateY(-3px); border-color: var(--red); }
.hp-spec svg { color: var(--red); font-size: 20px; }
.hp-spec em { font-style: normal; color: var(--ink-3); font-size: 11px; }
.hp-spec b { font-size: 12px; color: var(--ink); }
.hp-cta { position: relative; width: 100%; height: 60px; border: none; border-radius: 16px; background: linear-gradient(135deg, var(--red), #9b3540); color: var(--ink); font-size: 17px; font-weight: 900; display: flex; align-items: center; justify-content: center; gap: 10px; margin-top: 26px; overflow: hidden; transition: transform 0.4s cubic-bezier(0.32, 0.72, 0, 1); }
.hp-cta:active { transform: scale(0.975); }
.hp-cta-ring { position: absolute; left: 50%; top: 50%; width: 16px; height: 16px; border-radius: 50%; background: var(--glow); transform: translate(-50%, -50%); opacity: 0.4; animation: hp-breathe 2.6s ease-out infinite; }
@keyframes hp-breathe { 0% { transform: translate(-50%, -50%) scale(1); opacity: 0.4; } 100% { transform: translate(-50%, -50%) scale(26); opacity: 0; } }
.hp-cta-label, .hp-cta-ic { position: relative; z-index: 1; }
.hp-cta-ic { width: 34px; height: 34px; border-radius: 50%; background: rgba(0, 0, 0, 0.2); display: grid; place-items: center; font-size: 19px; transition: transform 0.4s cubic-bezier(0.32, 0.72, 0, 1); }
.hp-cta:active .hp-cta-ic { transform: rotate(-12deg); }
.hp-proof { color: var(--ink-3); font-size: 12px; margin-top: 14px; text-align: center; }
.hp-note { color: var(--ink-3); font-size: 11.5px; line-height: 1.6; text-align: center; margin-top: 12px; padding: 0 8px; }
@media (prefers-reduced-motion: reduce) { .hp-ticker-row, .hp-live i, .hp-cta-ring { animation: none !important; } .rise { animation-delay: 0ms !important; } }
</style>
