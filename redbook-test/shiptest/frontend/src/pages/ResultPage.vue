<template>
  <div class="result" v-if="report">
    <header class="r-status">
      <span class="rec"><i></i> 扫描完成</span>
      <span class="mono code">坐标 {{ coord }}</span>
    </header>

    <!-- 雷达定位 -->
    <section class="radar-sec" v-motion="{ initial: { opacity: 0, scale: 0.94 }, enter: { opacity: 1, scale: 1, transition: { delay: 80, type: 'spring', stiffness: 160, damping: 20 } } }">
      <RadarScope :size="270" :labels="labels" :blip="report.blip" :active-index="activeIndex" :color="report.archetype.accent" />
    </section>

    <!-- 信号强度 -->
    <section class="signal-sec">
      <div class="gauge">
        <svg viewBox="0 0 130 130">
          <circle cx="65" cy="65" r="56" class="gauge-bg" />
          <circle
            cx="65" cy="65" r="56"
            class="gauge-fill"
            :stroke="report.archetype.accent"
            :stroke-dasharray="circ"
            :stroke-dashoffset="dashOffset"
            transform="rotate(-90 65 65)"
          />
        </svg>
        <div class="gauge-center">
          <span class="gauge-num mono" :style="{ color: report.archetype.accent }">{{ disp }}</span>
          <span class="gauge-unit">情感信号强度 %</span>
        </div>
      </div>
    </section>

    <!-- 状态人设 -->
    <section class="persona" v-motion="{ initial: { opacity: 0, y: 16 }, enter: { opacity: 1, y: 0, transition: { delay: 300 } } }">
      <span class="persona-sig mono">{{ report.archetype.signalLabel }}</span>
      <h1 class="persona-name" :style="{ color: report.archetype.accent }">{{ report.archetype.name }}</h1>
      <span class="persona-aka">{{ report.archetype.aka }}</span>
      <p class="persona-verdict">{{ report.archetype.verdict }}</p>
      <div class="tags">
        <span v-for="t in report.archetype.tags" :key="t" class="tag">{{ t }}</span>
      </div>
    </section>

    <div class="actions">
      <button class="act share" @click="showShare = true" :style="{ background: `linear-gradient(135deg, ${report.archetype.accent}, #25c489)` }">
        <Icon icon="mdi:image-outline" /> 生成信号卡
      </button>
      <button class="act retake" @click="retake">
        <Icon icon="mdi:restart" /> 重新扫描
      </button>
    </div>

    <DeepReport
      :report="report.archetype.deep"
      :distribution="report.distribution"
      :top-key="report.key"
      :accent="report.archetype.accent"
      product="shiptest"
    />

    <section class="convert">
      <p class="convert-hint mono">下一项检测</p>
      <button class="convert-btn" @click="goNext">
        <span class="convert-ic"><Icon icon="mdi:heart-multiple-outline" /></span>
        <span class="convert-tx">
          <strong>CP 契合度测试</strong>
          <small>看清自己的状态了，要不要测测你俩到底合不合？→</small>
        </span>
        <Icon class="convert-arr" icon="mdi:chevron-right" />
      </button>
    </section>

    <MoreTests current="shiptest" />
    <p class="disclaimer">本测试由 AI 生成，仅供娱乐参考，不构成任何专业情感或心理建议。</p>

    <!-- 分享卡 -->
    <transition name="ov">
      <div v-if="showShare" class="sh-overlay" @click="showShare = false">
        <div class="sh-modal" @click.stop>
          <div class="sh-card" ref="shareCardRef">
            <span class="bracket tl"></span><span class="bracket tr"></span>
            <span class="bracket bl"></span><span class="bracket br"></span>
            <div class="sh-head">
              <span class="rec"><i></i> RADAR</span>
              <span class="mono">坐标 {{ coord }}</span>
            </div>

            <!-- 静态迷你雷达（纯 SVG，html2canvas 友好） -->
            <div class="sh-radar">
              <svg viewBox="0 0 160 160">
                <circle v-for="r in [28, 50, 72]" :key="r" cx="80" cy="80" :r="r" class="sh-ring" />
                <line v-for="(p, i) in miniSpokes" :key="i" x1="80" y1="80" :x2="p.x" :y2="p.y" class="sh-spoke" />
                <circle cx="80" cy="80" r="2.5" :fill="report.archetype.accent" />
                <circle :cx="miniBlip.x" :cy="miniBlip.y" r="6" :fill="report.archetype.accent" />
                <circle :cx="miniBlip.x" :cy="miniBlip.y" r="11" fill="none" :stroke="report.archetype.accent" stroke-opacity="0.5" />
              </svg>
            </div>

            <p class="sh-kicker mono">情感信号雷达 · 信号强度 {{ report.signal }}%</p>
            <h2 class="sh-name" :style="{ color: report.archetype.accent }">{{ report.archetype.name }}</h2>
            <span class="sh-aka">{{ report.archetype.aka }}</span>
            <p class="sh-verdict">{{ report.archetype.verdict }}</p>
            <div class="sh-tags">
              <span v-for="t in report.archetype.tags" :key="t">{{ t }}</span>
            </div>
            <div class="sh-foot">
              <span class="sh-mark"><Icon icon="mdi:radar" /></span>
              <div class="sh-brand">
                <p>小红书搜「情感信号雷达」</p>
                <p class="sh-brand-sub mono">扫一下你现在是什么状态</p>
              </div>
            </div>
          </div>
          <div class="sh-acts">
            <button class="sh-save" @click="saveCard"><Icon icon="mdi:download" /> 保存图片</button>
            <button class="sh-close" @click="showShare = false">关闭</button>
          </div>
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
import { computeReport, archetypes, ARCHETYPE_ORDER } from '../data/quiz.js'
import RadarScope from '../components/RadarScope.vue'
import DeepReport from '../components/DeepReport.vue'

const router = useRouter()
const route = useRoute()

const labels = ARCHETYPE_ORDER.map((k) => archetypes[k].name)

let answers = []
try {
  answers = JSON.parse(route.query.a || '[]')
} catch (_) {
  answers = []
}

const report = computed(() => (answers.length ? computeReport(answers) : null))
const activeIndex = computed(() => (report.value ? ARCHETYPE_ORDER.indexOf(report.value.key) : -1))
const coord = computed(() =>
  report.value ? `${pad(report.value.invest)}·${pad(report.value.recip)}` : '00·00'
)
function pad(n) {
  return String(Math.round(n)).padStart(2, '0')
}

// 信号强度计数 + 环
const disp = ref(0)
const circ = 2 * Math.PI * 56
const dashOffset = computed(() => (report.value ? circ - (disp.value / 100) * circ : circ))

// 分享卡迷你雷达
const miniSpokes = computed(() =>
  Array.from({ length: 6 }, (_, i) => {
    const a = ((-90 + i * 60) * Math.PI) / 180
    return { x: 80 + 72 * Math.cos(a), y: 80 + 72 * Math.sin(a) }
  })
)
const miniBlip = computed(() => {
  if (!report.value) return { x: 80, y: 80 }
  const a = (report.value.blip.angle * Math.PI) / 180
  const r = (report.value.blip.radius / 100) * 72
  return { x: 80 + r * Math.cos(a), y: 80 + r * Math.sin(a) }
})

const showShare = ref(false)
const shareCardRef = ref(null)

onMounted(() => {
  if (!report.value) {
    router.replace('/')
    return
  }
  const proxy = { v: 0 }
  gsap.to(proxy, {
    v: report.value.signal,
    duration: 1.4,
    ease: 'power2.out',
    delay: 0.3,
    onUpdate: () => {
      disp.value = Math.round(proxy.v)
    },
  })
})

function retake() {
  router.replace('/quiz')
}

const nextProductUrl = import.meta.env.VITE_NEXT_PRODUCT_URL || '/'
function goNext() {
  window.open(nextProductUrl, '_blank', 'noopener,noreferrer')
}

async function saveCard() {
  if (!shareCardRef.value) return
  try {
    const { default: html2canvas } = await import('html2canvas')
    const canvas = await html2canvas(shareCardRef.value, {
      scale: 2,
      backgroundColor: '#0A1020',
      useCORS: true,
    })
    const link = document.createElement('a')
    link.download = '情感信号卡.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  } catch (e) {
    alert('保存失败，请截图保存。')
  }
}
</script>

<style scoped>
.result {
  min-height: 100dvh;
  padding-bottom: 36px;
}
.r-status {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 18px 8px;
  font-size: 11px;
}
.rec {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--accent);
  font-weight: 700;
  letter-spacing: 1px;
}
.rec i {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 8px var(--accent);
}
.code {
  color: var(--ink-3);
  letter-spacing: 2px;
}
.radar-sec {
  padding: 6px 0 0;
}
.signal-sec {
  display: flex;
  justify-content: center;
  margin-top: 8px;
}
.gauge {
  position: relative;
  width: 150px;
  height: 150px;
}
.gauge svg {
  width: 100%;
  height: 100%;
}
.gauge-bg {
  fill: none;
  stroke: var(--bg-raise);
  stroke-width: 9;
}
.gauge-fill {
  fill: none;
  stroke-width: 9;
  stroke-linecap: round;
  transition: stroke-dashoffset 0.1s linear;
  filter: drop-shadow(0 0 6px currentColor);
}
.gauge-center {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.gauge-num {
  font-size: 44px;
  font-weight: 800;
  line-height: 1;
}
.gauge-unit {
  font-size: 11px;
  color: var(--ink-3);
  margin-top: 4px;
}
.persona {
  text-align: center;
  padding: 18px 24px 0;
}
.persona-sig {
  font-size: 11px;
  color: var(--accent);
  letter-spacing: 1px;
}
.persona-name {
  font-size: 30px;
  font-weight: 900;
  letter-spacing: 1px;
  margin-top: 6px;
}
.persona-aka {
  display: inline-block;
  font-size: 12px;
  color: var(--ink-2);
  border: 1px solid var(--line);
  border-radius: 20px;
  padding: 3px 12px;
  margin-top: 8px;
}
.persona-verdict {
  font-size: 14px;
  line-height: 1.75;
  color: var(--ink);
  margin-top: 14px;
}
.tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-top: 14px;
}
.tag {
  font-size: 12.5px;
  font-weight: 600;
  color: var(--ink-2);
  background: var(--bg-panel);
  border: 1px solid var(--line);
  padding: 5px 12px;
  border-radius: 20px;
}
.actions {
  display: flex;
  gap: 10px;
  padding: 24px 16px 0;
}
.act {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 15px;
  border: none;
  border-radius: 15px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.16s;
}
.act:active {
  transform: scale(0.96);
}
.act :deep(svg) {
  font-size: 18px;
}
.act.share {
  color: #04140d;
  box-shadow: 0 8px 24px rgba(54, 241, 166, 0.26);
}
.act.retake {
  background: var(--bg-raise);
  border: 1px solid var(--line);
  color: var(--ink);
}
.convert {
  padding: 28px 16px 0;
}
.convert-hint {
  font-size: 11px;
  color: var(--ink-3);
  letter-spacing: 2px;
  text-align: center;
  margin-bottom: 10px;
}
.convert-btn {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border: 1px solid var(--line-strong);
  border-radius: 16px;
  background: var(--bg-panel);
  cursor: pointer;
  text-align: left;
  transition: transform 0.16s, border-color 0.2s;
}
.convert-btn:active {
  transform: scale(0.98);
}
.convert-ic {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: rgba(255, 92, 122, 0.12);
  color: #FF5C7A;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
}
.convert-tx {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.convert-tx strong {
  font-size: 16px;
  color: var(--ink);
}
.convert-tx small {
  font-size: 12px;
  color: var(--ink-2);
  line-height: 1.4;
}
.convert-arr {
  font-size: 22px;
  color: var(--ink-3);
}
.disclaimer {
  text-align: center;
  font-size: 11px;
  color: var(--ink-3);
  padding: 28px 24px 0;
  line-height: 1.6;
}

/* 分享卡 */
.sh-overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: rgba(4, 6, 12, 0.72);
  backdrop-filter: blur(4px);
}
.ov-enter-active,
.ov-leave-active {
  transition: opacity 0.26s ease;
}
.ov-enter-from,
.ov-leave-to {
  opacity: 0;
}
.sh-modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 320px;
}
.sh-card {
  position: relative;
  background: linear-gradient(180deg, #0c1424, #0a0f1c);
  border: 1px solid var(--line-strong);
  border-radius: 20px;
  padding: 20px 22px 20px;
  overflow: hidden;
}
.bracket {
  position: absolute;
  width: 18px;
  height: 18px;
  border: 2px solid var(--accent);
  opacity: 0.55;
}
.bracket.tl { top: 10px; left: 10px; border-right: none; border-bottom: none; }
.bracket.tr { top: 10px; right: 10px; border-left: none; border-bottom: none; }
.bracket.bl { bottom: 10px; left: 10px; border-right: none; border-top: none; }
.bracket.br { bottom: 10px; right: 10px; border-left: none; border-top: none; }
.sh-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 11px;
  color: var(--ink-3);
}
.sh-head .rec {
  color: var(--accent);
}
.sh-head .rec i {
  background: var(--accent);
  box-shadow: 0 0 8px var(--accent);
}
.sh-radar {
  width: 150px;
  margin: 12px auto 4px;
}
.sh-radar svg {
  width: 100%;
}
.sh-ring {
  fill: none;
  stroke: rgba(255, 255, 255, 0.14);
  stroke-width: 1;
}
.sh-spoke {
  stroke: rgba(255, 255, 255, 0.08);
  stroke-width: 1;
}
.sh-kicker {
  font-size: 11px;
  letter-spacing: 1px;
  color: var(--ink-2);
  text-align: center;
  margin-top: 4px;
}
.sh-name {
  text-align: center;
  font-size: 28px;
  font-weight: 900;
  margin-top: 8px;
}
.sh-aka {
  display: block;
  text-align: center;
  font-size: 12px;
  color: var(--ink-2);
  margin-top: 4px;
}
.sh-verdict {
  font-size: 13px;
  line-height: 1.7;
  color: var(--ink);
  text-align: center;
  margin-top: 14px;
}
.sh-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 7px;
  margin-top: 14px;
}
.sh-tags span {
  font-size: 11.5px;
  color: var(--ink-2);
  border: 1px solid var(--line);
  border-radius: 20px;
  padding: 4px 11px;
}
.sh-foot {
  display: flex;
  align-items: center;
  gap: 11px;
  margin-top: 18px;
  padding-top: 16px;
  border-top: 1px solid var(--line);
}
.sh-mark {
  width: 42px;
  height: 42px;
  border-radius: 11px;
  background: var(--accent-soft);
  color: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  flex-shrink: 0;
}
.sh-brand p {
  font-size: 12.5px;
  font-weight: 700;
  color: var(--ink);
}
.sh-brand-sub {
  font-size: 10.5px !important;
  font-weight: 400 !important;
  color: var(--ink-3) !important;
  margin-top: 2px;
}
.sh-acts {
  display: flex;
  gap: 10px;
  margin-top: 14px;
}
.sh-save,
.sh-close {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 13px;
  border-radius: 13px;
  border: none;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
}
.sh-save {
  background: #fff;
  color: #0A1020;
}
.sh-close {
  background: rgba(255, 255, 255, 0.1);
  color: var(--ink);
}
</style>
