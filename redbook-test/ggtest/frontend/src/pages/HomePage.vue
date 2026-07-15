<template>
  <div class="home">
    <!-- 顶部仪器状态条 -->
    <header class="status" v-motion="{ initial: { opacity: 0, y: -10 }, enter: { opacity: 1, y: 0, transition: { delay: 60 } } }">
      <span class="rec"><i class="rec-dot"></i> 检测中</span>
      <span class="dev mono">GG-SYNC</span>
      <span class="sig"><Icon icon="mdi:sync" /></span>
    </header>

    <!-- 双频面板 -->
    <section class="monitor" v-motion="{ initial: { opacity: 0, y: 18 }, enter: { opacity: 1, y: 0, transition: { delay: 140, type: 'spring', stiffness: 180, damping: 22 } } }">
      <div class="monitor-top">
        <span class="mono ch">CH-A 珊瑚 · CH-B 紫</span>
        <span class="mono read"><b>{{ Math.round(syncPct) }}%</b><i>适配度</i></span>
      </div>
      <TwinWave :sync="sync" :amplitude="0.6" :height="124" :speed="5" />
      <div class="monitor-bottom">
        <span class="mono">{{ lockLabel }}</span>
        <span class="mono">相位 {{ phaseLabel }}</span>
        <span class="mono">{{ clock }}</span>
      </div>
    </section>

    <!-- 标题 -->
    <div class="hero">
      <span class="badge" v-motion="{ initial: { opacity: 0, y: 12 }, enter: { opacity: 1, y: 0, transition: { delay: 260 } } }">双频共振 · 友情同频</span>
      <h1 v-motion="{ initial: { opacity: 0, y: 18 }, enter: { opacity: 1, y: 0, transition: { delay: 340, type: 'spring', stiffness: 200 } } }">
        友情<br /><em>同频检测</em>
      </h1>
      <p v-motion="{ initial: { opacity: 0 }, enter: { opacity: 1, transition: { delay: 460 } } }">
        20 个真实友情场景，看看你们如何尊重差异、适配节奏、守住秘密并修复错拍。
      </p>
    </div>

    <!-- 规格 -->
    <div class="specs" v-motion="{ initial: { opacity: 0, y: 16 }, enter: { opacity: 1, y: 0, transition: { delay: 540 } } }">
      <div class="spec">
        <Icon icon="mdi:timer-sand" />
        <em>用时</em><b>约 3 分钟</b>
      </div>
      <div class="spec">
        <Icon icon="mdi:format-list-numbered" />
        <em>题量</em><b>20 项</b>
      </div>
      <div class="spec">
        <Icon icon="mdi:chart-bell-curve-cumulative" />
        <em>输出</em><b>指数 + 图谱</b>
      </div>
    </div>

    <!-- CTA -->
    <button
      class="cta"
      v-motion="{ initial: { opacity: 0, y: 20 }, enter: { opacity: 1, y: 0, transition: { delay: 640, type: 'spring', stiffness: 280, damping: 16 } } }"
      @click="start"
    >
      <span class="cta-ring"></span>
      <Icon icon="mdi:power" />
      <span>开始检测</span>
    </button>
    <p class="proof mono"><b>20 题主结果免费</b> · 万能卡解锁主次维度与答案证据</p>

    <p class="note">本测试由 AI 生成，仅供娱乐参考，不构成专业心理或关系判断。</p>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import TwinWave from '../components/TwinWave.vue'

const router = useRouter()
const sync = ref(0.5)
const syncPct = ref(50)
const clock = ref('00:00:00')
let t1, t2

const reduced =
  typeof window !== 'undefined' && window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function tickClock() {
  const d = new Date()
  clock.value = [d.getHours(), d.getMinutes(), d.getSeconds()]
    .map((n) => String(n).padStart(2, '0'))
    .join(':')
}

const lockLabel = () => (sync.value >= 0.66 ? '多维合拍' : sync.value >= 0.33 ? '正在校频' : '读取场景')
const phaseLabel = () => (sync.value >= 0.95 ? '0°' : `${Math.round((1 - sync.value) * 180)}°`)

onMounted(() => {
  tickClock()
  t1 = setInterval(tickClock, 1000)
  if (reduced) {
    sync.value = 0.92
    syncPct.value = 92
  } else {
    // 呼吸式锁相：sync 在 ~0.25 ↔ ~1 之间缓慢正弦呼吸
    const start = performance.now()
    t2 = setInterval(() => {
      const t = (performance.now() - start) / 1000
      const s = 0.62 + 0.36 * Math.sin(t * 0.55) // 0.26 ~ 0.98
      sync.value = s
      syncPct.value = s * 100
    }, 80)
  }
})
onUnmounted(() => {
  clearInterval(t1)
  clearInterval(t2)
})

function start() {
  router.push('/quiz')
}
</script>

<style scoped>
.home {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 14px 20px 32px;
}

/* 状态条 */
.status {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 11px;
  color: var(--ink-2);
  padding: 4px 2px 12px;
}
.rec {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--accent);
  font-weight: 700;
  letter-spacing: 1px;
}
.rec-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 8px var(--accent);
  animation: blink 1.3s steps(1) infinite;
}
@keyframes blink {
  0%, 60% { opacity: 1; }
  61%, 100% { opacity: 0.2; }
}
.dev {
  letter-spacing: 2px;
  color: var(--ink-3);
}
.sig {
  display: inline-flex;
  font-size: 16px;
  color: var(--accent-2);
}

/* 双频面板 */
.monitor {
  width: 100%;
  background: linear-gradient(180deg, #1d1530, #17111f);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 12px 14px 10px;
  box-shadow: inset 0 0 40px rgba(139, 123, 255, 0.05), 0 10px 30px rgba(0, 0, 0, 0.4);
}
.monitor-top,
.monitor-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 11px;
  color: var(--ink-3);
}
.monitor-top {
  margin-bottom: 4px;
}
.monitor-bottom {
  margin-top: 4px;
  gap: 10px;
}
.ch {
  color: var(--accent-2);
  opacity: 0.85;
  letter-spacing: 1px;
}
.read {
  display: inline-flex;
  align-items: baseline;
  gap: 5px;
}
.read b {
  font-size: 17px;
  color: var(--ink);
  font-weight: 700;
}
.read i {
  font-style: normal;
  font-size: 10px;
  color: var(--ink-3);
}

/* 标题 */
.hero {
  text-align: center;
  margin: 30px 0 4px;
}
.badge {
  display: inline-block;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 3px;
  color: var(--accent);
  border: 1px solid var(--accent-soft);
  background: var(--accent-soft);
  padding: 4px 14px;
  border-radius: 20px;
}
.hero h1 {
  font-size: 38px;
  font-weight: 900;
  line-height: 1.18;
  color: var(--ink);
  margin: 16px 0 12px;
  letter-spacing: 1px;
}
.hero h1 em {
  font-style: normal;
  color: var(--accent);
  text-shadow: 0 0 24px rgba(255, 111, 97, 0.4);
}
.hero p {
  font-size: 13.5px;
  line-height: 1.7;
  color: var(--ink-2);
}

/* 规格 */
.specs {
  display: flex;
  gap: 10px;
  width: 100%;
  margin: 26px 0 0;
}
.spec {
  flex: 1;
  background: var(--bg-panel);
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 14px 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}
.spec :deep(svg) {
  font-size: 20px;
  color: var(--accent-2);
}
.spec em {
  font-style: normal;
  font-size: 11px;
  color: var(--ink-3);
  margin-top: 2px;
}
.spec b {
  font-size: 13px;
  color: var(--ink);
  font-weight: 700;
}

/* CTA */
.cta {
  position: relative;
  width: 100%;
  margin-top: 30px;
  padding: 18px;
  border: none;
  border-radius: 16px;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  color: #fff;
  font-size: 19px;
  font-weight: 800;
  letter-spacing: 2px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  box-shadow: 0 12px 36px rgba(139, 123, 255, 0.34);
  transition: transform 0.16s cubic-bezier(0.34, 1.56, 0.64, 1);
  overflow: hidden;
}
.cta:active {
  transform: scale(0.97);
}
.cta :deep(svg) {
  font-size: 22px;
}
.cta-ring {
  position: absolute;
  inset: 0;
  border-radius: 16px;
  border: 2px solid rgba(255, 255, 255, 0.5);
  opacity: 0;
  animation: ctaRing 2.6s ease-out infinite;
}
@keyframes ctaRing {
  0% { opacity: 0.5; transform: scale(0.96); }
  70%, 100% { opacity: 0; transform: scale(1.04); }
}
.proof {
  font-size: 12px;
  color: var(--ink-3);
  margin-top: 14px;
}
.proof b {
  color: var(--ink-2);
}
.note {
  margin-top: auto;
  padding-top: 28px;
  font-size: 11px;
  color: var(--ink-3);
  text-align: center;
  line-height: 1.6;
}
</style>
