<template>
  <div class="result" v-if="report">
    <!-- 顶部状态 -->
    <header class="r-status">
      <span class="rec"><i></i> 监测完成</span>
      <span class="mono code">报告 {{ report.band.code }}</span>
    </header>

    <!-- 脑区扫描 -->
    <section class="scan" v-motion="{ initial: { opacity: 0, scale: 0.94 }, enter: { opacity: 1, scale: 1, transition: { delay: 80, type: 'spring', stiffness: 160, damping: 20 } } }">
      <span class="bracket tl"></span><span class="bracket tr"></span>
      <span class="bracket bl"></span><span class="bracket br"></span>
      <span class="scan-line"></span>
      <Icon class="brain" icon="mdi:brain" :style="{ color: report.band.accent }" />
      <span
        v-for="(n, i) in NODES"
        :key="i"
        class="node"
        :class="{ on: i < activeNodes }"
        :style="{ left: n.x + '%', top: n.y + '%', background: report.band.accent, animationDelay: i * 0.16 + 's' }"
      ></span>
      <span class="scan-tag mono">脑区活跃热区</span>
    </section>

    <!-- 指数 -->
    <section class="index">
      <div class="gauge">
        <svg viewBox="0 0 130 130">
          <circle cx="65" cy="65" r="56" class="gauge-bg" />
          <circle
            cx="65" cy="65" r="56"
            class="gauge-fill"
            :stroke="report.band.accent"
            :stroke-dasharray="circ"
            :stroke-dashoffset="dashOffset"
            transform="rotate(-90 65 65)"
          />
        </svg>
        <div class="gauge-center">
          <span class="gauge-num mono" :style="{ color: report.band.accent }">{{ disp }}</span>
          <span class="gauge-unit">恋爱脑指数 %</span>
        </div>
      </div>
    </section>

    <!-- 人设 -->
    <section class="persona" v-motion="{ initial: { opacity: 0, y: 16 }, enter: { opacity: 1, y: 0, transition: { delay: 300 } } }">
      <h1 class="persona-name" :style="{ color: report.band.accent }">{{ report.band.name }}</h1>
      <span class="persona-aka">{{ report.band.aka }}</span>
      <p class="persona-verdict">{{ report.band.verdict }}</p>
      <div class="tags">
        <span v-for="t in report.band.tags" :key="t" class="tag">{{ t }}</span>
      </div>
    </section>

    <!-- 实时脑波 -->
    <section class="wave-card" v-motion="{ initial: { opacity: 0, y: 16 }, enter: { opacity: 1, y: 0, transition: { delay: 380 } } }">
      <div class="wave-top">
        <span class="mono ch">实时脑波 · 振幅随指数</span>
        <span class="mono amp">GAIN {{ (report.index / 50 + 0.3).toFixed(1) }}×</span>
      </div>
      <EegWave :amplitude="waveAmp" :color="report.band.accent" :height="92" :speed="waveSpeed" />
    </section>

    <!-- 操作 -->
    <div class="actions">
      <button class="act share" @click="showShare = true" :style="{ background: `linear-gradient(135deg, ${report.band.accent}, #ff5c84)` }">
        <Icon icon="mdi:image-outline" /> 生成监测卡
      </button>
      <button class="act retake" @click="retake">
        <Icon icon="mdi:restart" /> 重新检测
      </button>
    </div>

    <!-- 深度报告（锁） -->
    <DeepReport :report="report.band.deep" :dims="report.dims" :accent="report.band.accent" product="lovetest" />

    <!-- 引流 -->
    <section class="convert">
      <p class="convert-hint mono">下一项检测</p>
      <button class="convert-btn" @click="goNext">
        <span class="convert-ic"><Icon icon="mdi:radar" /></span>
        <span class="convert-tx">
          <strong>情感信号雷达</strong>
          <small>测完上头程度，再扫一下你现在的情感状态 →</small>
        </span>
        <Icon class="convert-arr" icon="mdi:chevron-right" />
      </button>
    </section>

    <MoreTests current="lovetest" />
    <p class="disclaimer">本测试由 AI 生成，仅供娱乐参考，不构成专业心理或医学建议。</p>

    <!-- 分享卡 -->
    <transition name="ov">
      <div v-if="showShare" class="sh-overlay" @click="showShare = false">
        <div class="sh-modal" @click.stop>
        <div class="sh-card" ref="shareCardRef">
          <span class="bracket tl"></span><span class="bracket tr"></span>
          <span class="bracket bl"></span><span class="bracket br"></span>
          <div class="sh-head">
            <span class="rec"><i></i> REC</span>
            <span class="mono">{{ report.band.code }}</span>
          </div>
          <p class="sh-kicker mono">恋爱脑活跃度监测</p>
          <div class="sh-index mono" :style="{ color: report.band.accent }">
            {{ report.index }}<small>%</small>
          </div>
          <h2 class="sh-name" :style="{ color: report.band.accent }">{{ report.band.name }}</h2>
          <span class="sh-aka">{{ report.band.aka }}</span>
          <p class="sh-verdict">{{ report.band.verdict }}</p>
          <div class="sh-tags">
            <span v-for="t in report.band.tags" :key="t">{{ t }}</span>
          </div>
          <div class="sh-foot">
            <span class="sh-mark"><Icon icon="mdi:heart-pulse" /></span>
            <div class="sh-brand">
              <p>小红书搜「恋爱脑监测」</p>
              <p class="sh-brand-sub mono">测测你为他上头到第几级</p>
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
import { computeReport } from '../data/quiz.js'
import EegWave from '../components/EegWave.vue'
import DeepReport from '../components/DeepReport.vue'

const router = useRouter()
const route = useRoute()

// 脑区节点坐标（百分比）
const NODES = [
  { x: 38, y: 32 }, { x: 56, y: 28 }, { x: 30, y: 48 }, { x: 62, y: 46 },
  { x: 46, y: 40 }, { x: 70, y: 58 }, { x: 40, y: 62 }, { x: 54, y: 64 },
]

let answers = []
try {
  answers = JSON.parse(route.query.a || '[]')
} catch (_) {
  answers = []
}

const report = computed(() => (answers.length ? computeReport(answers) : null))

const activeNodes = computed(() =>
  report.value ? Math.round((report.value.index / 100) * NODES.length) : 0
)
const waveAmp = computed(() => (report.value ? 0.18 + (report.value.index / 100) * 0.72 : 0.4))
const waveSpeed = computed(() => (report.value ? 5.2 - (report.value.index / 100) * 2.4 : 4))

// 计数 + 环
const disp = ref(0)
const circ = 2 * Math.PI * 56
const dashOffset = computed(() =>
  report.value ? circ - (disp.value / 100) * circ : circ
)

const showShare = ref(false)
const shareCardRef = ref(null)

onMounted(() => {
  if (!report.value) {
    router.replace('/')
    return
  }
  const proxy = { v: 0 }
  gsap.to(proxy, {
    v: report.value.index,
    duration: 1.5,
    ease: 'power2.out',
    delay: 0.25,
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
      backgroundColor: '#0B0E14',
      useCORS: true,
    })
    const link = document.createElement('a')
    link.download = '恋爱脑监测卡.png'
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

/* 状态 */
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
  color: var(--ok);
  font-weight: 700;
  letter-spacing: 1px;
}
.rec i {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--ok);
  box-shadow: 0 0 8px var(--ok);
}
.code {
  color: var(--ink-3);
  letter-spacing: 2px;
}

/* 脑区扫描 */
.scan {
  position: relative;
  width: calc(100% - 36px);
  max-width: 320px;
  aspect-ratio: 1.45 / 1;
  margin: 6px auto 0;
  background: radial-gradient(120% 100% at 50% 30%, rgba(22, 224, 255, 0.06), transparent 70%);
  border: 1px solid var(--line);
  border-radius: 18px;
  overflow: hidden;
}
.bracket {
  position: absolute;
  width: 16px;
  height: 16px;
  border: 2px solid var(--trace);
  opacity: 0.6;
}
.bracket.tl { top: 8px; left: 8px; border-right: none; border-bottom: none; }
.bracket.tr { top: 8px; right: 8px; border-left: none; border-bottom: none; }
.bracket.bl { bottom: 8px; left: 8px; border-right: none; border-top: none; }
.bracket.br { bottom: 8px; right: 8px; border-left: none; border-top: none; }
.scan-line {
  position: absolute;
  left: 0;
  right: 0;
  height: 36px;
  top: -36px;
  background: linear-gradient(180deg, transparent, rgba(22, 224, 255, 0.16), transparent);
  animation: scanMove 3s ease-in-out infinite;
}
@keyframes scanMove {
  0% { top: -36px; }
  100% { top: 100%; }
}
.brain {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 120px;
  opacity: 0.22;
  filter: drop-shadow(0 0 16px currentColor);
}
.node {
  position: absolute;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  transform: translate(-50%, -50%) scale(0.5);
  opacity: 0;
  transition: opacity 0.4s;
}
.node.on {
  opacity: 1;
  animation: nodePulse 1.8s ease-in-out infinite;
  box-shadow: 0 0 10px currentColor;
}
@keyframes nodePulse {
  0%, 100% { transform: translate(-50%, -50%) scale(0.7); opacity: 0.55; }
  50% { transform: translate(-50%, -50%) scale(1.15); opacity: 1; }
}
.scan-tag {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 11px;
  color: var(--ink-3);
  letter-spacing: 1px;
}

/* 指数 */
.index {
  display: flex;
  justify-content: center;
  margin-top: 18px;
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
  font-size: 46px;
  font-weight: 800;
  line-height: 1;
}
.gauge-unit {
  font-size: 11px;
  color: var(--ink-3);
  margin-top: 4px;
  letter-spacing: 0.5px;
}

/* 人设 */
.persona {
  text-align: center;
  padding: 22px 24px 0;
}
.persona-name {
  font-size: 30px;
  font-weight: 900;
  letter-spacing: 1px;
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

/* 脑波卡 */
.wave-card {
  margin: 22px 16px 0;
  background: var(--bg-panel);
  border: 1px solid var(--line);
  border-radius: 16px;
  padding: 12px 14px;
}
.wave-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 11px;
  margin-bottom: 4px;
}
.wave-top .ch {
  color: var(--ink-2);
}
.wave-top .amp {
  color: var(--ink-3);
}

/* 操作 */
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
  color: #fff;
  box-shadow: 0 8px 24px rgba(255, 59, 107, 0.28);
}
.act.retake {
  background: var(--bg-raise);
  border: 1px solid var(--line);
  color: var(--ink);
}

/* 引流 */
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
  background: rgba(54, 241, 166, 0.1);
  color: #36F1A6;
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
  background: rgba(4, 6, 10, 0.7);
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
  background: linear-gradient(180deg, #0d131e, #0a0e15);
  border: 1px solid var(--line-strong);
  border-radius: 20px;
  padding: 22px 22px 20px;
  overflow: hidden;
}
.sh-card .bracket {
  width: 18px;
  height: 18px;
}
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
.sh-kicker {
  font-size: 11px;
  letter-spacing: 2px;
  color: var(--ink-2);
  text-align: center;
  margin-top: 16px;
}
.sh-index {
  text-align: center;
  font-size: 64px;
  font-weight: 800;
  line-height: 1;
  margin-top: 6px;
  text-shadow: 0 0 30px currentColor;
}
.sh-index small {
  font-size: 22px;
}
.sh-name {
  text-align: center;
  font-size: 26px;
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
  margin-top: 20px;
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
  color: #0B0E14;
}
.sh-close {
  background: rgba(255, 255, 255, 0.1);
  color: var(--ink);
}
</style>
