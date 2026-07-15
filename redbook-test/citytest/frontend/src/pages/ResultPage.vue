<template>
  <div class="result" v-if="report">
    <header class="r-status">
      <span class="rec"><i></i> 偏好定位完成</span>
      <span class="mono code">{{ report.modelVersion }}</span>
    </header>

    <section class="radar-sec" v-motion="{ initial: { opacity: 0, scale: 0.94 }, enter: { opacity: 1, scale: 1, transition: { delay: 80, type: 'spring', stiffness: 160, damping: 20 } } }">
      <RadarScope
        :size="270"
        :labels="report.clusterLabels"
        :blip="report.blip"
        :active-index="report.clusterIndex"
        :color="report.archetype.accent"
      />
      <p class="radar-note mono">32 城 · 10 维偏好 · 6 类城市气质簇</p>
    </section>

    <section class="signal-sec">
      <div class="gauge">
        <svg viewBox="0 0 130 130" aria-hidden="true">
          <circle cx="65" cy="65" r="56" class="gauge-bg" />
          <circle
            cx="65"
            cy="65"
            r="56"
            class="gauge-fill"
            :stroke="report.archetype.accent"
            :stroke-dasharray="circ"
            :stroke-dashoffset="dashOffset"
            transform="rotate(-90 65 65)"
          />
        </svg>
        <div class="gauge-center">
          <span class="gauge-num mono" :style="{ color: report.archetype.accent }">{{ disp }}</span>
          <span class="gauge-unit">适配参考分</span>
        </div>
      </div>
    </section>

    <section class="persona" v-motion="{ initial: { opacity: 0, y: 16 }, enter: { opacity: 1, y: 0, transition: { delay: 260 } } }">
      <span class="persona-sig mono">{{ report.archetype.clusterLabel }}</span>
      <h1 class="persona-name" :style="{ color: report.archetype.accent }">{{ report.archetype.name }}</h1>
      <span class="persona-aka">{{ report.archetype.aka }}</span>
      <p class="persona-verdict">{{ report.archetype.verdict }}</p>
    </section>

    <section class="free-report">
      <div class="free-block">
        <p class="block-label mono">为什么推荐</p>
        <div class="reason-list">
          <article v-for="reason in report.whyMatched" :key="reason.key" class="reason">
            <span class="reason-score mono">{{ reason.closeness }}</span>
            <div>
              <b>{{ reason.label }}</b>
              <p>{{ reason.copy }}</p>
            </div>
          </article>
        </div>
      </div>

      <div class="free-block">
        <p class="block-label mono">现实提醒</p>
        <ul class="reminders">
          <li v-for="(item, index) in report.realityReminders" :key="index">
            <Icon icon="mdi:alert-octagon-outline" />
            <span>{{ item }}</span>
          </li>
        </ul>
      </div>
    </section>

    <section class="alternatives">
      <p class="block-label mono">TOP 3 备选城市</p>
      <div class="alt-grid">
        <article v-for="city in report.alternatives" :key="city.key" class="alt-card">
          <span class="alt-role">{{ city.role }}</span>
          <b>{{ city.name }}</b>
          <small>{{ city.clusterLabel }}</small>
          <strong class="mono">{{ city.fitScore }}</strong>
        </article>
      </div>
    </section>

    <div class="actions">
      <button class="act share" @click="openShare" :style="{ background: `linear-gradient(135deg, ${report.archetype.accent}, var(--accent-2))` }">
        <Icon icon="mdi:image-outline" /> 生成城市卡
      </button>
      <button class="act retake" @click="retake">
        <Icon icon="mdi:restart" /> 重新定位
      </button>
    </div>

    <DeepReport
      :report="report"
      :matches="report.cityMatches"
      :accent="report.archetype.accent"
      product="citytest"
    />

    <section class="convert">
      <p class="convert-hint mono">下一项检测</p>
      <button class="convert-btn" @click="goNext">
        <span class="convert-ic"><Icon icon="mdi:heart-multiple-outline" /></span>
        <span class="convert-tx">
          <strong>情侣互动状态测试</strong>
          <small>城市偏好看完了，再测测你们的亲密协作节奏。</small>
        </span>
        <Icon class="convert-arr" icon="mdi:chevron-right" />
      </button>
    </section>

    <MoreTests current="citytest" />
    <p class="disclaimer">
      结果基于本次答题偏好生成，仅供娱乐和生活方式探索，不构成迁居、求职、购房或旅行建议。成本、岗位和气候请以实时信息为准。
    </p>

    <transition name="ov">
      <div v-if="showShare" class="sh-overlay" @click="showShare = false">
        <div class="sh-modal" @click.stop>
          <div class="sh-card" ref="shareCardRef">
            <span class="bracket tl"></span><span class="bracket tr"></span>
            <span class="bracket bl"></span><span class="bracket br"></span>
            <div class="sh-head">
              <span class="rec"><i></i> CITY ATLAS V2</span>
              <span class="mono">32 CITY POOL</span>
            </div>

            <div class="sh-radar">
              <svg viewBox="0 0 160 160" aria-hidden="true">
                <circle v-for="radius in [28, 50, 72]" :key="radius" cx="80" cy="80" :r="radius" class="sh-ring" />
                <line v-for="(point, index) in miniSpokes" :key="index" x1="80" y1="80" :x2="point.x" :y2="point.y" class="sh-spoke" />
                <circle cx="80" cy="80" r="2.5" :fill="report.archetype.accent" />
                <circle :cx="miniBlip.x" :cy="miniBlip.y" r="6" :fill="report.archetype.accent" />
                <circle :cx="miniBlip.x" :cy="miniBlip.y" r="11" fill="none" :stroke="report.archetype.accent" stroke-opacity="0.5" />
              </svg>
            </div>

            <p class="sh-kicker mono">我的城市偏好主样本</p>
            <h2 class="sh-name" :style="{ color: report.archetype.accent }">{{ report.archetype.name }}</h2>
            <div class="sh-score mono">{{ report.fitScore }}<small>适配参考</small></div>
            <div class="sh-tags">
              <span v-for="reason in report.whyMatched.slice(0, 2)" :key="reason.key">{{ reason.label }}</span>
            </div>
            <p class="sh-reminder">先短住，再决定。结果不替代现实迁居判断。</p>
            <div class="sh-foot">
              <span class="sh-mark"><Icon icon="mdi:crosshairs-gps" /></span>
              <div class="sh-brand">
                <p>城市磁场测试 · 32 城 V2</p>
                <p class="sh-brand-sub mono">测测你的城市偏好样本</p>
              </div>
            </div>
          </div>
          <div class="sh-acts">
            <button class="sh-save" @click="saveCard"><Icon icon="mdi:download" /> 保存图片</button>
            <button class="sh-close" @click="showShare = false">关闭</button>
          </div>
          <p class="save-error" v-if="saveError">{{ saveError }}</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import MoreTests from '../components/MoreTests.vue'
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import gsap from 'gsap'
import { computeReport, decodeAnswers } from '../data/quiz.js'
import RadarScope from '../components/RadarScope.vue'
import DeepReport from '../components/DeepReport.vue'

const router = useRouter()
const route = useRoute()
const rawAnswers = typeof route.query.a === 'string' ? route.query.a : ''
const decoded = decodeAnswers(rawAnswers)
const report = computed(() => (decoded.ok ? computeReport(decoded.optionIds) : null))

const disp = ref(0)
const circ = 2 * Math.PI * 56
const dashOffset = computed(() => (report.value ? circ - (disp.value / 100) * circ : circ))
const showShare = ref(false)
const saveError = ref('')
const shareCardRef = ref(null)

const miniSpokes = Array.from({ length: 6 }, (_, index) => {
  const angle = ((-90 + index * 60) * Math.PI) / 180
  return { x: 80 + 72 * Math.cos(angle), y: 80 + 72 * Math.sin(angle) }
})
const miniBlip = computed(() => {
  if (!report.value) return { x: 80, y: 80 }
  const angle = (report.value.blip.angle * Math.PI) / 180
  const radius = (report.value.blip.radius / 100) * 72
  return { x: 80 + radius * Math.cos(angle), y: 80 + radius * Math.sin(angle) }
})

onMounted(() => {
  if (!report.value) {
    router.replace('/quiz')
    return
  }
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  if (reduced) {
    disp.value = report.value.fitScore
    return
  }
  const proxy = { value: 0 }
  gsap.to(proxy, {
    value: report.value.fitScore,
    duration: 1.35,
    ease: 'power2.out',
    delay: 0.25,
    onUpdate: () => {
      disp.value = Math.round(proxy.value)
    },
  })
})

function retake() {
  router.replace('/quiz')
}

function openShare() {
  saveError.value = ''
  showShare.value = true
}

const nextProductUrl = import.meta.env.VITE_NEXT_PRODUCT_URL || 'https://lv.xpytt.com'
function goNext() {
  window.open(nextProductUrl, '_blank', 'noopener,noreferrer')
}

async function saveCard() {
  if (!shareCardRef.value) return
  saveError.value = ''
  try {
    const { default: html2canvas } = await import('html2canvas')
    const canvas = await html2canvas(shareCardRef.value, {
      scale: 2,
      backgroundColor: '#101611',
      useCORS: true,
    })
    const link = document.createElement('a')
    link.download = '城市偏好卡.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  } catch (_) {
    saveError.value = '图片保存失败，请直接截图保存。'
  }
}
</script>

<style scoped>
.result { min-height: 100dvh; padding-bottom: 38px; }
.r-status { display: flex; align-items: center; justify-content: space-between; padding: 14px 18px 8px; font-size: 11px; }
.rec { display: inline-flex; align-items: center; gap: 6px; color: var(--accent); font-weight: 700; letter-spacing: 1px; }
.rec i { width: 7px; height: 7px; border-radius: 50%; background: currentColor; box-shadow: 0 0 8px currentColor; }
.code { color: var(--ink-3); letter-spacing: 1px; }
.radar-sec { padding: 6px 0 0; text-align: center; }
.radar-note { margin-top: 10px; color: var(--ink-3); font-size: 10px; letter-spacing: 1px; }
.signal-sec { display: flex; justify-content: center; margin-top: 10px; }
.gauge { position: relative; width: 146px; height: 146px; }
.gauge svg { width: 100%; height: 100%; }
.gauge-bg { fill: none; stroke: var(--bg-raise); stroke-width: 9; }
.gauge-fill { fill: none; stroke-width: 9; stroke-linecap: round; transition: stroke-dashoffset 0.1s linear; filter: drop-shadow(0 0 6px currentColor); }
.gauge-center { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; }
.gauge-num { font-size: 44px; font-weight: 850; line-height: 1; }
.gauge-unit { margin-top: 4px; color: var(--ink-3); font-size: 11px; }
.persona { padding: 16px 24px 0; text-align: center; }
.persona-sig { color: var(--accent); font-size: 11px; letter-spacing: 1px; }
.persona-name { margin-top: 5px; font-size: 34px; font-weight: 900; letter-spacing: 1px; }
.persona-aka { display: inline-block; margin-top: 8px; padding: 3px 12px; border: 1px solid var(--line); border-radius: 20px; color: var(--ink-2); font-size: 12px; }
.persona-verdict { margin-top: 13px; color: var(--ink); font-size: 14px; line-height: 1.75; text-wrap: pretty; }
.free-report, .alternatives { padding: 24px 16px 0; }
.free-report { display: flex; flex-direction: column; gap: 18px; }
.block-label { margin-bottom: 10px; color: var(--ink-3); font-size: 10.5px; letter-spacing: 1.5px; }
.reason-list { display: flex; flex-direction: column; gap: 9px; }
.reason { display: flex; align-items: flex-start; gap: 11px; padding: 14px; border: 1px solid var(--line); border-radius: 14px; background: var(--bg-panel); }
.reason-score { flex: 0 0 38px; height: 38px; display: grid; place-items: center; border-radius: 10px; background: var(--accent-soft); color: var(--accent); font-size: 12px; font-weight: 800; }
.reason b { display: block; color: var(--ink); font-size: 13px; }
.reason p { margin-top: 2px; color: var(--ink-2); font-size: 12px; line-height: 1.55; }
.reminders { list-style: none; padding: 15px; border: 1px solid rgba(247, 177, 88, 0.2); border-radius: 14px; background: rgba(247, 177, 88, 0.06); display: flex; flex-direction: column; gap: 10px; }
.reminders li { display: flex; align-items: flex-start; gap: 9px; color: var(--ink); font-size: 12.5px; line-height: 1.6; }
.reminders :deep(svg) { flex-shrink: 0; margin-top: 2px; color: var(--warn); font-size: 17px; }
.alt-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
.alt-card { position: relative; min-width: 0; padding: 13px 9px 12px; border: 1px solid var(--line); border-radius: 13px; background: var(--bg-panel); display: flex; flex-direction: column; align-items: flex-start; }
.alt-role { color: var(--ink-3); font-size: 9px; }
.alt-card b { margin-top: 8px; color: var(--ink); font-size: 15px; }
.alt-card small { width: 100%; margin-top: 2px; overflow: hidden; color: var(--ink-3); font-size: 9.5px; white-space: nowrap; text-overflow: ellipsis; }
.alt-card strong { position: absolute; top: 11px; right: 9px; color: var(--accent); font-size: 11px; }
.actions { display: flex; gap: 10px; padding: 24px 16px 0; }
.act { flex: 1; min-height: 50px; border: none; border-radius: 15px; display: inline-flex; align-items: center; justify-content: center; gap: 6px; font-family: inherit; font-size: 15px; font-weight: 750; cursor: pointer; transition: transform 0.18s ease; }
.act:active { transform: scale(0.97); }
.act:focus-visible { outline: 3px solid var(--accent-soft); outline-offset: 2px; }
.act :deep(svg) { font-size: 18px; }
.act.share { color: #071913; box-shadow: 0 8px 24px rgba(82, 214, 182, 0.24); }
.act.retake { border: 1px solid var(--line); background: var(--bg-raise); color: var(--ink); }
.convert { padding: 28px 16px 0; }
.convert-hint { margin-bottom: 10px; color: var(--ink-3); font-size: 11px; letter-spacing: 2px; text-align: center; }
.convert-btn { width: 100%; padding: 16px; border: 1px solid var(--line-strong); border-radius: 16px; background: var(--bg-panel); display: flex; align-items: center; gap: 12px; text-align: left; cursor: pointer; }
.convert-btn:active { transform: scale(0.98); }
.convert-ic { flex-shrink: 0; width: 44px; height: 44px; border-radius: 12px; background: rgba(255, 122, 162, 0.12); color: #ff7aa2; display: flex; align-items: center; justify-content: center; font-size: 24px; }
.convert-tx { flex: 1; display: flex; flex-direction: column; gap: 3px; }
.convert-tx strong { color: var(--ink); font-size: 16px; }
.convert-tx small { color: var(--ink-2); font-size: 12px; line-height: 1.4; }
.convert-arr { color: var(--ink-3); font-size: 22px; }
.disclaimer { padding: 28px 24px 0; color: var(--ink-3); font-size: 10.5px; line-height: 1.65; text-align: center; }
.sh-overlay { position: fixed; inset: 0; z-index: 100; padding: 18px; background: rgba(4, 6, 12, 0.75); backdrop-filter: blur(4px); display: grid; place-items: center; overflow-y: auto; }
.ov-enter-active, .ov-leave-active { transition: opacity 0.26s ease; }
.ov-enter-from, .ov-leave-to { opacity: 0; }
.sh-modal { width: min(330px, 100%); }
.sh-card { position: relative; padding: 20px 22px; overflow: hidden; border: 1px solid var(--line-strong); border-radius: 20px; background: linear-gradient(180deg, #162119, #101611); }
.bracket { position: absolute; width: 18px; height: 18px; border: 2px solid var(--accent); opacity: 0.55; }
.bracket.tl { top: 10px; left: 10px; border-right: none; border-bottom: none; }
.bracket.tr { top: 10px; right: 10px; border-left: none; border-bottom: none; }
.bracket.bl { bottom: 10px; left: 10px; border-right: none; border-top: none; }
.bracket.br { right: 10px; bottom: 10px; border-left: none; border-top: none; }
.sh-head { display: flex; align-items: center; justify-content: space-between; color: var(--ink-3); font-size: 10px; }
.sh-radar { width: 132px; margin: 10px auto 0; }
.sh-radar svg { width: 100%; }
.sh-ring { fill: none; stroke: rgba(255,255,255,0.14); stroke-width: 1; }
.sh-spoke { stroke: rgba(255,255,255,0.08); stroke-width: 1; }
.sh-kicker { color: var(--ink-2); font-size: 10px; letter-spacing: 1px; text-align: center; }
.sh-name { margin-top: 4px; font-size: 34px; text-align: center; }
.sh-score { margin-top: 5px; color: var(--ink); font-size: 24px; font-weight: 850; text-align: center; }
.sh-score small { margin-left: 5px; color: var(--ink-3); font-size: 10px; font-weight: 500; }
.sh-tags { margin-top: 10px; display: flex; justify-content: center; gap: 7px; }
.sh-tags span { padding: 4px 9px; border-radius: 20px; background: var(--accent-soft); color: var(--accent); font-size: 10.5px; }
.sh-reminder { margin-top: 12px; color: var(--ink-2); font-size: 11px; line-height: 1.55; text-align: center; }
.sh-foot { margin-top: 15px; padding-top: 13px; border-top: 1px solid var(--line); display: flex; align-items: center; gap: 9px; }
.sh-mark { width: 36px; height: 36px; border-radius: 10px; background: var(--accent-soft); color: var(--accent); display: grid; place-items: center; font-size: 20px; }
.sh-brand p { color: var(--ink); font-size: 12px; font-weight: 750; }
.sh-brand .sh-brand-sub { margin-top: 1px; color: var(--ink-3); font-size: 9.5px; font-weight: 400; }
.sh-acts { margin-top: 10px; display: grid; grid-template-columns: 1fr 84px; gap: 9px; }
.sh-acts button { height: 46px; border: none; border-radius: 12px; font-family: inherit; font-size: 14px; font-weight: 750; }
.sh-save { background: var(--accent); color: #071913; }
.sh-close { border: 1px solid var(--line) !important; background: var(--bg-panel); color: var(--ink); }
.save-error { margin-top: 8px; color: #ff9baa; font-size: 11px; text-align: center; }
</style>
