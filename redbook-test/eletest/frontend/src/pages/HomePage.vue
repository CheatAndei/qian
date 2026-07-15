<template>
  <div class="hp battery">
    <span class="hp-orb" aria-hidden="true"></span>
    <span class="hp-grain" aria-hidden="true"></span>

    <header class="hp-status rise" style="animation-delay: 40ms">
      <span class="hp-live"><i></i> 充电中</span>
      <span class="hp-dev mono">ELE · BATTERY</span>
      <span class="hp-sig"><Icon icon="mdi:flash" /></span>
    </header>
    <div class="hp-ticker rise" style="animation-delay: 80ms" aria-hidden="true">
      <div class="hp-ticker-row">
        <span v-for="n in 2" :key="n" class="mono">社交电池地图 · 陌生局 / 熟人局 / 线上局 / 独处回血 · 测耗电源与恢复方式 · 20 项检测 · 主结果免费 · </span>
      </div>
    </div>

    <section class="hp-stage rise" style="animation-delay: 130ms">
      <div class="hp-stage-head">
        <span class="mono">社交电量实时检测</span>
        <span class="mono hp-stage-code">PWR · SOCIAL</span>
      </div>
      <BatteryField />
    </section>

    <div class="hp-stats">
      <div class="hp-stat rise" style="animation-delay: 230ms"><b class="mono">{{ statA }}</b><em>电池类型</em></div>
      <div class="hp-stat rise" style="animation-delay: 290ms"><b class="mono">{{ statB }}</b><em>检测项</em></div>
      <div class="hp-stat rise" style="animation-delay: 350ms"><b class="mono">100<small>%</small></b><em>满格续航</em></div>
    </div>

    <main class="hp-hero">
      <span class="hp-badge rise" style="animation-delay: 320ms">社交电池地图</span>
      <h1>
        <span class="rise" style="animation-delay: 380ms">社交电量</span>
        <em class="rise" style="animation-delay: 460ms">你是哪种续航</em>
      </h1>
      <p class="rise" style="animation-delay: 560ms">
        20 个社交场景，测出你在哪种连接里有电、什么最耗电、怎样恢复。没有高低，只是供电方式不同。
      </p>
    </main>

    <div class="hp-specs">
      <div class="hp-spec rise" style="animation-delay: 620ms"><Icon icon="mdi:battery-high" /><em>类型</em><b>四种电池</b></div>
      <div class="hp-spec rise" style="animation-delay: 680ms"><Icon icon="mdi:lightning-bolt" /><em>输出</em><b>电量 + 路线</b></div>
      <div class="hp-spec rise" style="animation-delay: 740ms"><Icon icon="mdi:map-marker-distance" /><em>报告</em><b>回血方式</b></div>
    </div>

    <button class="hp-cta rise" style="animation-delay: 800ms" @click="start">
      <span class="hp-cta-ring"></span>
      <span class="hp-cta-label">检测电量</span>
      <span class="hp-cta-ic"><Icon icon="mdi:arrow-right-thin" /></span>
    </button>
    <p class="hp-proof mono rise" style="animation-delay: 860ms">20 个场景免费生成主结果 · 万能卡解锁深报</p>
    <p class="hp-note rise" style="animation-delay: 900ms">本测试仅供娱乐和轻量自我观察，不构成专业心理咨询、医学建议或现实关系判断。</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import gsap from 'gsap'
import BatteryField from '../components/BatteryField.vue'

const router = useRouter()
const statA = ref(4)
const statB = ref(20)

const reduced =
  typeof window !== 'undefined' && window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

onMounted(() => {
  if (reduced) return
  const s = { a: 0, b: 0 }
  statA.value = 0
  statB.value = 0
  gsap.to(s, { a: 4, b: 20, duration: 1.1, ease: 'power2.out', delay: 0.4,
    onUpdate: () => { statA.value = Math.round(s.a); statB.value = Math.round(s.b) } })
})

function start() { router.push('/quiz') }
</script>

<style scoped>
.hp { position: relative; min-height: 100dvh; padding: 12px 20px 34px; display: flex; flex-direction: column; align-items: stretch; overflow: hidden; }
.hp-orb { position: absolute; top: -90px; right: -70px; width: 280px; height: 280px; border-radius: 50%;
  background: radial-gradient(circle, color-mix(in srgb, var(--accent) 24%, transparent), transparent 65%); pointer-events: none; z-index: 0; }
.hp-grain { position: absolute; inset: 0; pointer-events: none; z-index: 0; opacity: 0.4;
  background-image: radial-gradient(color-mix(in srgb, var(--ink) 12%, transparent) 0.5px, transparent 0.5px); background-size: 4px 4px; }
.hp > *:not(.hp-orb):not(.hp-grain) { position: relative; z-index: 1; }

.rise { opacity: 0; animation: hp-rise 0.7s cubic-bezier(0.32, 0.72, 0, 1) forwards; }
@keyframes hp-rise { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }

.hp-status { display: flex; align-items: center; justify-content: space-between; font-size: 11px; color: var(--ink-2); padding: 4px 2px 10px; }
.hp-live { display: inline-flex; align-items: center; gap: 6px; color: var(--accent); font-weight: 800; letter-spacing: 1px; }
.hp-live i { width: 7px; height: 7px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 10px var(--accent); animation: hp-blink 1.4s steps(1) infinite; }
@keyframes hp-blink { 0%, 62% { opacity: 1; } 63%, 100% { opacity: 0.25; } }
.hp-dev { letter-spacing: 1.5px; color: var(--ink-3); }
.hp-sig { color: var(--accent-2); font-size: 16px; }

.hp-ticker { overflow: hidden; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); padding: 6px 0; margin-bottom: 16px; -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent); mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent); }
.hp-ticker-row { display: inline-flex; white-space: nowrap; animation: hp-marquee 22s linear infinite; }
.hp-ticker-row span { font-size: 10.5px; color: var(--ink-3); letter-spacing: 0.4px; }
@keyframes hp-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }

.hp-stage { background: var(--bg-panel); border: 1px solid var(--line); border-radius: 20px; padding: 6px; box-shadow: 0 14px 40px color-mix(in srgb, var(--ink) 8%, transparent); }
.hp-stage-head { display: flex; align-items: center; justify-content: space-between; padding: 8px 12px 6px; font-size: 10px; color: var(--ink-3); }
.hp-stage-code { color: var(--accent); letter-spacing: 1px; }

.hp-stats { display: flex; gap: 8px; margin: 14px 0 0; }
.hp-stat { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 2px; padding: 10px 4px; background: var(--bg-panel); border: 1px solid var(--line); border-radius: 13px; }
.hp-stat b { font-size: 24px; font-weight: 900; color: var(--ink); letter-spacing: -0.01em; }
.hp-stat b small { font-size: 14px; color: var(--accent); }
.hp-stat em { font-style: normal; font-size: 10.5px; color: var(--ink-3); }

.hp-hero { margin: 26px 0 0; }
.hp-badge { display: inline-block; font-size: 12px; font-weight: 800; color: var(--accent); background: var(--accent-soft); padding: 5px 13px; border-radius: 999px; }
.hp-hero h1 { font-size: 40px; line-height: 1.1; letter-spacing: -0.02em; margin: 14px 0 12px; }
.hp-hero h1 span, .hp-hero h1 em { display: block; }
.hp-hero h1 em { font-style: normal; color: var(--accent); }
.hp-hero p { color: var(--ink-2); font-size: 14px; line-height: 1.8; text-wrap: pretty; }

.hp-specs { display: flex; gap: 10px; margin: 24px 0 0; }
.hp-spec { flex: 1; background: var(--bg-panel); border: 1px solid var(--line); border-radius: 14px; padding: 13px 8px; display: flex; flex-direction: column; align-items: center; gap: 4px; text-align: center; transition: transform 0.4s cubic-bezier(0.32, 0.72, 0, 1), border-color 0.3s ease; }
.hp-spec:active { transform: translateY(-3px); border-color: var(--accent); }
.hp-spec svg { color: var(--accent); font-size: 20px; }
.hp-spec em { font-style: normal; color: var(--ink-3); font-size: 11px; }
.hp-spec b { font-size: 12px; color: var(--ink); }

.hp-cta { position: relative; width: 100%; height: 60px; border: none; border-radius: 18px; background: var(--ink); color: var(--bg); font-size: 17px; font-weight: 900; display: flex; align-items: center; justify-content: center; gap: 10px; margin-top: 26px; overflow: hidden; transition: transform 0.4s cubic-bezier(0.32, 0.72, 0, 1); }
.hp-cta:active { transform: scale(0.975); }
.hp-cta-ring { position: absolute; left: 50%; top: 50%; width: 16px; height: 16px; border-radius: 50%; background: var(--accent); transform: translate(-50%, -50%); opacity: 0.5; animation: hp-breathe 2.6s ease-out infinite; }
@keyframes hp-breathe { 0% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; } 100% { transform: translate(-50%, -50%) scale(26); opacity: 0; } }
.hp-cta-label, .hp-cta-ic { position: relative; z-index: 1; }
.hp-cta-ic { width: 34px; height: 34px; border-radius: 50%; background: color-mix(in srgb, var(--bg) 22%, transparent); display: grid; place-items: center; font-size: 20px; transition: transform 0.4s cubic-bezier(0.32, 0.72, 0, 1); }
.hp-cta:active .hp-cta-ic { transform: translateX(3px); }

.hp-proof { color: var(--ink-3); font-size: 12px; margin-top: 14px; text-align: center; }
.hp-proof b { color: var(--ink-2); }
.hp-note { color: var(--ink-3); font-size: 11.5px; line-height: 1.6; text-align: center; margin-top: 14px; padding: 0 8px; }

@media (prefers-reduced-motion: reduce) {
  .hp-ticker-row, .hp-live i, .hp-cta-ring { animation: none !important; }
}
</style>
