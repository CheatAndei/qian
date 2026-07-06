<template>
  <div class="hp">
    <span class="hp-halftone" aria-hidden="true"></span>

    <!-- 刊头 -->
    <header class="hp-masthead rise" style="animation-delay: 40ms">
      <span class="hp-live"><i></i> 出刊中</span>
      <span class="hp-pub mono">LOVE PERSONA · 恋爱人格</span>
      <span class="hp-sig"><Icon icon="mdi:newspaper-variant-outline" /></span>
    </header>
    <div class="hp-ticker rise" style="animation-delay: 80ms" aria-hidden="true">
      <div class="hp-ticker-row">
        <span v-for="n in 2" :key="n" class="mono">本期特辑 · 12 种恋爱人格 · 女王范 / 温柔 / 猫系 / 撩人精 / 事业型 · 五维人格雷达 · 主结果免费 · </span>
      </div>
    </div>

    <!-- 杂志封面 -->
    <section class="hp-stage rise" style="animation-delay: 130ms">
      <PersonaCover />
    </section>

    <!-- 读数 -->
    <div class="hp-stats">
      <div class="hp-stat rise" style="animation-delay: 230ms"><b class="mono">{{ statA }}</b><em>种人格</em></div>
      <div class="hp-stat rise" style="animation-delay: 290ms"><b class="mono">{{ statB }}</b><em>道题目</em></div>
      <div class="hp-stat rise" style="animation-delay: 350ms"><b class="mono">5</b><em>维档案</em></div>
    </div>

    <!-- 标题 -->
    <main class="hp-hero">
      <span class="hp-badge rise" style="animation-delay: 320ms"><Icon icon="mdi:bookmark-outline" /> 本期人格特辑</span>
      <h1>
        <span class="rise" style="animation-delay: 380ms">你是哪种</span>
        <em class="rise" style="animation-delay: 460ms">恋爱人格？</em>
      </h1>
      <p class="rise" style="animation-delay: 560ms">
        30 道恋爱场景，拍下你在亲密关系里的真实样子。生成一张专属人格刊，附五维雷达和人设标签，发给他、发给闺蜜都好看。
      </p>
    </main>

    <!-- 栏目 -->
    <div class="hp-specs">
      <div class="hp-spec rise" style="animation-delay: 620ms"><Icon icon="mdi:account-heart-outline" /><em>人设</em><b>12 款档案</b></div>
      <div class="hp-spec rise" style="animation-delay: 680ms"><Icon icon="mdi:chart-arc" /><em>雷达</em><b>五维人格</b></div>
      <div class="hp-spec rise" style="animation-delay: 740ms"><Icon icon="mdi:camera-iris" /><em>分享</em><b>杂志人格卡</b></div>
    </div>

    <!-- CTA -->
    <button class="hp-cta rise" style="animation-delay: 800ms" @click="$router.push('/quiz')">
      <span class="hp-cta-ring"></span>
      <span class="hp-cta-label">翻开本期测试</span>
      <span class="hp-cta-ic"><Icon icon="mdi:book-open-page-variant-outline" /></span>
    </button>
    <p class="hp-proof mono">已有不少女生收录进本期人格刊</p>
    <p class="hp-note">* 娱乐测试，结果由 AI 生成，仅供参考，别太较真。</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import Icon from '../components/Icon.vue'
import PersonaCover from '../components/PersonaCover.vue'

const statA = ref(12)
const statB = ref(30)

const reduced =
  typeof window !== 'undefined' && window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

onMounted(() => {
  if (reduced) return
  const s = { a: 0, b: 0 }
  statA.value = 0
  statB.value = 0
  gsap.to(s, { a: 12, b: 30, duration: 1.1, ease: 'power2.out', delay: 0.4,
    onUpdate: () => { statA.value = Math.round(s.a); statB.value = Math.round(s.b) } })
})
</script>

<style scoped>
.hp {
  --mag-white: #faf6ef;
  --surface: #ffffff;
  --ink: #1a1714;
  --ink-2: #8a8076;
  --ink-3: #b3a89c;
  --magenta: #e84576;
  --magenta-deep: #c9356a;
  --magenta-soft: rgba(232, 69, 118, 0.1);
  --line: rgba(26, 23, 20, 0.12);
  --mono: 'SFMono-Regular', ui-monospace, 'JetBrains Mono', Consolas, monospace;
  position: relative;
  min-height: 100dvh;
  max-width: 480px;
  margin: 0 auto;
  background: var(--mag-white);
  padding: 12px 20px 34px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.mono { font-family: var(--mono); font-variant-numeric: tabular-nums; letter-spacing: 0.3px; }
.hp-halftone { position: absolute; inset: 0; pointer-events: none; z-index: 0; opacity: 0.4;
  background-image: radial-gradient(color-mix(in srgb, var(--magenta) 22%, transparent) 0.7px, transparent 0.7px); background-size: 8px 8px;
  -webkit-mask-image: linear-gradient(180deg, #000 0%, transparent 38%); mask-image: linear-gradient(180deg, #000 0%, transparent 38%); }
.hp > *:not(.hp-halftone) { position: relative; z-index: 1; }

.rise { opacity: 0; animation: hp-rise 0.7s cubic-bezier(0.32, 0.72, 0, 1) forwards; }
@keyframes hp-rise { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }

.hp-masthead { display: flex; align-items: center; justify-content: space-between; font-size: 11px; color: var(--ink-2); padding: 4px 2px 10px; }
.hp-live { display: inline-flex; align-items: center; gap: 6px; color: var(--magenta); font-weight: 800; letter-spacing: 1px; }
.hp-live i { width: 7px; height: 7px; border-radius: 50%; background: var(--magenta); box-shadow: 0 0 10px var(--magenta); animation: hp-blink 1.4s steps(1) infinite; }
@keyframes hp-blink { 0%, 62% { opacity: 1; } 63%, 100% { opacity: 0.25; } }
.hp-pub { letter-spacing: 0.5px; color: var(--ink-3); font-size: 10px; }
.hp-sig { color: var(--magenta); font-size: 17px; }

.hp-ticker { overflow: hidden; border-top: 1.5px solid var(--ink); border-bottom: 1.5px solid var(--ink); padding: 6px 0; margin-bottom: 16px; -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent); mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent); }
.hp-ticker-row { display: inline-flex; white-space: nowrap; animation: hp-marquee 23s linear infinite; }
.hp-ticker-row span { font-size: 10.5px; color: var(--ink-2); letter-spacing: 0.4px; font-weight: 600; }
@keyframes hp-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }

.hp-stage { border: 1.5px solid var(--ink); border-radius: 16px; padding: 5px; box-shadow: 6px 6px 0 var(--magenta-soft); }

.hp-stats { display: flex; gap: 8px; margin: 16px 0 0; }
.hp-stat { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 2px; padding: 10px 4px; background: var(--surface); border: 1.5px solid var(--ink); border-radius: 12px; }
.hp-stat b { font-size: 24px; font-weight: 900; color: var(--ink); letter-spacing: -0.01em; }
.hp-stat em { font-style: normal; font-size: 10.5px; color: var(--ink-2); }

.hp-hero { margin: 26px 0 0; }
.hp-badge { display: inline-flex; align-items: center; gap: 5px; font-size: 12px; font-weight: 800; color: #fff; background: var(--magenta); padding: 5px 13px; border-radius: 4px; transform: rotate(-1.5deg); }
.hp-hero h1 { font-size: 46px; line-height: 1.02; letter-spacing: -0.03em; margin: 16px 0 14px; font-weight: 900; }
.hp-hero h1 span, .hp-hero h1 em { display: block; }
.hp-hero h1 em { font-style: italic; color: var(--magenta); }
.hp-hero p { color: var(--ink-2); font-size: 14px; line-height: 1.8; text-wrap: pretty; }

.hp-specs { display: flex; gap: 10px; margin: 24px 0 0; }
.hp-spec { flex: 1; background: var(--surface); border: 1.5px solid var(--ink); border-radius: 12px; padding: 13px 8px; display: flex; flex-direction: column; align-items: center; gap: 4px; text-align: center; transition: transform 0.4s cubic-bezier(0.32, 0.72, 0, 1), box-shadow 0.3s ease; }
.hp-spec:active { transform: translateY(-3px); box-shadow: 3px 3px 0 var(--magenta); }
.hp-spec svg { color: var(--magenta); font-size: 20px; }
.hp-spec em { font-style: normal; color: var(--ink-2); font-size: 11px; }
.hp-spec b { font-size: 12px; color: var(--ink); }

.hp-cta { position: relative; width: 100%; height: 60px; border: none; border-radius: 14px; background: var(--ink); color: var(--mag-white); font-size: 17px; font-weight: 900; display: flex; align-items: center; justify-content: center; gap: 10px; margin-top: 26px; overflow: hidden; box-shadow: 5px 5px 0 var(--magenta); transition: transform 0.4s cubic-bezier(0.32, 0.72, 0, 1), box-shadow 0.3s ease; }
.hp-cta:active { transform: translate(2px, 2px); box-shadow: 2px 2px 0 var(--magenta); }
.hp-cta-ring { position: absolute; left: 50%; top: 50%; width: 16px; height: 16px; border-radius: 50%; background: var(--magenta); transform: translate(-50%, -50%); opacity: 0.5; animation: hp-breathe 2.6s ease-out infinite; }
@keyframes hp-breathe { 0% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; } 100% { transform: translate(-50%, -50%) scale(26); opacity: 0; } }
.hp-cta-label, .hp-cta-ic { position: relative; z-index: 1; }
.hp-cta-ic { width: 34px; height: 34px; border-radius: 50%; background: rgba(255, 255, 255, 0.18); display: grid; place-items: center; font-size: 19px; transition: transform 0.4s cubic-bezier(0.32, 0.72, 0, 1); }
.hp-cta:active .hp-cta-ic { transform: rotate(8deg); }

.hp-proof { color: var(--ink-3); font-size: 12px; margin-top: 14px; text-align: center; }
.hp-note { color: var(--ink-3); font-size: 11.5px; line-height: 1.6; text-align: center; margin-top: 12px; padding: 0 8px; }

@media (prefers-reduced-motion: reduce) {
  .hp-ticker-row, .hp-live i, .hp-cta-ring { animation: none !important; }
  .rise { animation-delay: 0ms !important; }
}
</style>
