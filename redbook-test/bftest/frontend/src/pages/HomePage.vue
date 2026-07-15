<template>
  <div class="hp">
    <span class="hp-grain" aria-hidden="true"></span>

    <!-- 考试抬头条 -->
    <header class="hp-bar rise" style="animation-delay: 40ms">
      <span class="hp-live"><i></i> 阅卷中</span>
      <span class="hp-org mono">男友资格趣味考试 · 2026卷</span>
      <span class="hp-seal"><Icon icon="mdi:certificate-outline" /></span>
    </header>
    <div class="hp-ticker rise" style="animation-delay: 80ms" aria-hidden="true">
      <div class="hp-ticker-row">
        <span v-for="n in 2" :key="n" class="mono">男友资格趣味考试 · 客观 90 + 加分 10 · 满分 100 · 及格 60 · 当场出成绩单 · 主结果免费 · </span>
      </div>
    </div>

    <!-- 动态批卷试卷 -->
    <section class="hp-stage rise" style="animation-delay: 130ms">
      <div class="hp-stage-head">
        <span class="mono"><Icon icon="mdi:file-document-edit-outline" /> 阅卷台 · 实时批改</span>
        <span class="mono hp-stage-code">SUBJECT · BF</span>
      </div>
      <ExamPaper />
    </section>

    <!-- 考试信息读数 -->
    <div class="hp-stats">
      <div class="hp-stat rise" style="animation-delay: 230ms"><b class="mono">{{ statQ }}</b><em>题量</em></div>
      <div class="hp-stat rise" style="animation-delay: 290ms"><b class="mono">{{ statFull }}</b><em>满分</em></div>
      <div class="hp-stat rise" style="animation-delay: 350ms"><b class="mono">60</b><em>及格线</em></div>
    </div>

    <!-- 标题 -->
    <main class="hp-hero">
      <span class="hp-badge rise" style="animation-delay: 320ms"><Icon icon="mdi:clipboard-text-outline" /> 恋爱审判庭 · 姐妹评审团</span>
      <h1>
        <span class="rise" style="animation-delay: 380ms">他到底能不能及格？</span>
        <em class="rise" style="animation-delay: 460ms">这套题，别让他自己阅卷</em>
      </h1>
      <p class="rise" style="animation-delay: 560ms">
        30 道恋爱场景题，逐条批改、当场扣分。客观题之外还有姐妹评审加减分，最后给一张能转发的成绩单。
      </p>
    </main>

    <!-- 考纲说明栏 -->
    <div class="hp-specs">
      <div class="hp-spec rise" style="animation-delay: 620ms"><Icon icon="mdi:trophy-outline" /><em>等级评定</em><b>S 到 D 档</b></div>
      <div class="hp-spec rise" style="animation-delay: 680ms"><Icon icon="mdi:account-search-outline" /><em>男友画像</em><b>优点 + 扣分项</b></div>
      <div class="hp-spec rise" style="animation-delay: 740ms"><Icon icon="mdi:share-variant-outline" /><em>成绩单</em><b>一键生成分享</b></div>
    </div>

    <!-- CTA -->
    <button class="hp-cta rise" style="animation-delay: 800ms" @click="$router.push('/quiz')">
      <span class="hp-cta-ring"></span>
      <span class="hp-cta-label">开始批卷</span>
      <span class="hp-cta-ic"><Icon icon="mdi:pencil" /></span>
    </button>
    <p class="hp-proof mono">31 项场景 · 主结果免费 · 万能卡解锁深报</p>
    <p class="hp-note">* 娱乐测试，结果由 AI 生成，仅供参考，别太较真。</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import Icon from '../components/Icon.vue'
import ExamPaper from '../components/ExamPaper.vue'

const statQ = ref(30)
const statFull = ref(100)

const reduced =
  typeof window !== 'undefined' && window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

onMounted(() => {
  if (reduced) return
  const s = { q: 0, f: 0 }
  statQ.value = 0
  statFull.value = 0
  gsap.to(s, { q: 30, f: 100, duration: 1.1, ease: 'power2.out', delay: 0.4,
    onUpdate: () => { statQ.value = Math.round(s.q); statFull.value = Math.round(s.f) } })
})
</script>

<style scoped>
.hp {
  --paper: #f6f2e9;
  --surface: #fffdf7;
  --ink: #2a2622;
  --ink-2: #6f665d;
  --ink-3: #9a9087;
  --red: #d7263d;
  --red-deep: #c0202e;
  --red-soft: rgba(215, 38, 61, 0.1);
  --line: rgba(42, 38, 34, 0.12);
  --line-strong: rgba(42, 38, 34, 0.22);
  --ok: #2f9e44;
  --mono: 'SFMono-Regular', ui-monospace, 'JetBrains Mono', 'Cascadia Code', Consolas, monospace;
  position: relative;
  min-height: 100dvh;
  max-width: 480px;
  margin: 0 auto;
  padding: 12px 20px 34px;
  background: var(--paper);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.hp :deep(.mono) { font-family: var(--mono); font-variant-numeric: tabular-nums; letter-spacing: 0.3px; }
.hp-grain { position: absolute; inset: 0; pointer-events: none; z-index: 0; opacity: 0.5;
  background-image: radial-gradient(rgba(42, 38, 34, 0.06) 0.5px, transparent 0.5px); background-size: 4px 4px; }
.hp > *:not(.hp-grain) { position: relative; z-index: 1; }

.rise { opacity: 0; animation: hp-rise 0.7s cubic-bezier(0.32, 0.72, 0, 1) forwards; }
@keyframes hp-rise { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }

.hp-bar { display: flex; align-items: center; justify-content: space-between; font-size: 11px; color: var(--ink-2); padding: 4px 2px 10px; }
.hp-live { display: inline-flex; align-items: center; gap: 6px; color: var(--red); font-weight: 800; letter-spacing: 1px; }
.hp-live i { width: 7px; height: 7px; border-radius: 50%; background: var(--red); box-shadow: 0 0 8px var(--red); animation: hp-blink 1.4s steps(1) infinite; }
@keyframes hp-blink { 0%, 62% { opacity: 1; } 63%, 100% { opacity: 0.25; } }
.hp-org { letter-spacing: 0.5px; color: var(--ink-3); font-size: 10.5px; }
.hp-seal { color: var(--red); font-size: 17px; }

.hp-ticker { overflow: hidden; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); padding: 6px 0; margin-bottom: 16px; -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent); mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent); }
.hp-ticker-row { display: inline-flex; white-space: nowrap; animation: hp-marquee 24s linear infinite; }
.hp-ticker-row span { font-size: 10.5px; color: var(--ink-3); letter-spacing: 0.4px; }
@keyframes hp-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }

.hp-stage { background: var(--surface); border: 1px solid var(--line); border-radius: 18px; padding: 6px; box-shadow: 0 14px 36px rgba(42, 38, 34, 0.1); }
.hp-stage-head { display: flex; align-items: center; justify-content: space-between; padding: 8px 12px 6px; font-size: 10px; color: var(--ink-3); }
.hp-stage-head .mono { display: inline-flex; align-items: center; gap: 4px; }
.hp-stage-code { color: var(--red); letter-spacing: 1px; }

.hp-stats { display: flex; gap: 8px; margin: 14px 0 0; }
.hp-stat { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 2px; padding: 10px 4px; background: var(--surface); border: 1px solid var(--line); border-radius: 13px; }
.hp-stat b { font-size: 24px; font-weight: 900; color: var(--ink); letter-spacing: -0.01em; }
.hp-stat em { font-style: normal; font-size: 10.5px; color: var(--ink-3); }

.hp-hero { margin: 26px 0 0; }
.hp-badge { display: inline-flex; align-items: center; gap: 5px; font-size: 12px; font-weight: 800; color: var(--red-deep); background: var(--red-soft); padding: 5px 13px; border-radius: 999px; }
.hp-hero h1 { font-size: 36px; line-height: 1.16; letter-spacing: -0.02em; margin: 14px 0 12px; }
.hp-hero h1 span, .hp-hero h1 em { display: block; }
.hp-hero h1 em { font-style: normal; color: var(--red); font-size: 26px; margin-top: 4px; }
.hp-hero p { color: var(--ink-2); font-size: 14px; line-height: 1.8; text-wrap: pretty; }

.hp-specs { display: flex; gap: 10px; margin: 24px 0 0; }
.hp-spec { flex: 1; background: var(--surface); border: 1px solid var(--line); border-radius: 14px; padding: 13px 8px; display: flex; flex-direction: column; align-items: center; gap: 4px; text-align: center; transition: transform 0.4s cubic-bezier(0.32, 0.72, 0, 1), border-color 0.3s ease; }
.hp-spec:active { transform: translateY(-3px); border-color: var(--red); }
.hp-spec svg { color: var(--red); font-size: 20px; }
.hp-spec em { font-style: normal; color: var(--ink-3); font-size: 11px; }
.hp-spec b { font-size: 12px; color: var(--ink); }

.hp-cta { position: relative; width: 100%; height: 60px; border: none; border-radius: 16px; background: var(--red); color: #fff; font-size: 17px; font-weight: 900; display: flex; align-items: center; justify-content: center; gap: 10px; margin-top: 26px; overflow: hidden; box-shadow: 0 12px 28px rgba(215, 38, 61, 0.3); transition: transform 0.4s cubic-bezier(0.32, 0.72, 0, 1); }
.hp-cta:active { transform: scale(0.975); }
.hp-cta-ring { position: absolute; left: 50%; top: 50%; width: 16px; height: 16px; border-radius: 50%; background: #fff; transform: translate(-50%, -50%); opacity: 0.35; animation: hp-breathe 2.6s ease-out infinite; }
@keyframes hp-breathe { 0% { transform: translate(-50%, -50%) scale(1); opacity: 0.35; } 100% { transform: translate(-50%, -50%) scale(26); opacity: 0; } }
.hp-cta-label, .hp-cta-ic { position: relative; z-index: 1; }
.hp-cta-ic { width: 34px; height: 34px; border-radius: 50%; background: rgba(255, 255, 255, 0.2); display: grid; place-items: center; font-size: 19px; transition: transform 0.4s cubic-bezier(0.32, 0.72, 0, 1); }
.hp-cta:active .hp-cta-ic { transform: rotate(-12deg); }

.hp-proof { color: var(--ink-3); font-size: 12px; margin-top: 14px; text-align: center; }
.hp-note { color: var(--ink-3); font-size: 11.5px; line-height: 1.6; text-align: center; margin-top: 12px; padding: 0 8px; }

@media (prefers-reduced-motion: reduce) {
  .hp-ticker-row, .hp-live i, .hp-cta-ring { animation: none !important; }
  .rise { animation-delay: 0ms !important; }
}
</style>
