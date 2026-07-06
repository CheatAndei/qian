<template>
  <section class="dr">
    <div class="dr-head">
      <span class="dr-kicker mono">DEEP SYNC</span>
      <h2 class="dr-title">深度同频报告</h2>
    </div>

    <div class="dr-wrap">
      <!-- 报告主体（锁定时模糊 + 禁交互） -->
      <div class="dr-content" :class="{ 'is-locked': !unlocked }" :aria-hidden="!unlocked">
        <!-- 五维图谱 -->
        <div class="dr-card">
          <p class="dr-card-label">同频五维图谱</p>
          <PentRadar :values="radarValues" :labels="radarLabels" :color="accent" />
        </div>

        <!-- 同频结论 -->
        <div class="dr-card">
          <p class="dr-card-label">同频结论</p>
          <p class="dr-text">{{ report.summary }}</p>
          <p class="dr-forecast">{{ report.forecast }}</p>
        </div>

        <!-- 关系避雷 -->
        <div class="dr-card">
          <p class="dr-card-label">关系避雷</p>
          <ul class="dr-list dr-list--warn">
            <li v-for="(w, i) in report.warnings" :key="i">
              <Icon icon="mdi:alert-octagon-outline" />
              <span>{{ w }}</span>
            </li>
          </ul>
        </div>

        <!-- 维系建议 -->
        <div class="dr-card">
          <p class="dr-card-label">维系建议</p>
          <ul class="dr-list dr-list--ok">
            <li v-for="(a, i) in report.advice" :key="i">
              <Icon icon="mdi:check-decagram-outline" />
              <span>{{ a }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- 锁层 -->
      <div class="dr-lock" v-if="!unlocked">
        <span class="dr-lock-icon"><Icon icon="mdi:lock-outline" /></span>
        <p class="dr-lock-title">深度报告未解锁</p>
        <p class="dr-lock-desc">五维图谱 · 关系避雷 · 专属维系方案</p>
        <button class="dr-lock-btn" @click="showCard = true">
          <Icon icon="mdi:key-variant" />
          <span>输入兑换码解锁</span>
        </button>
        <p class="dr-lock-sub">已购买？输入兑换码即可解锁全部测试</p>
      </div>
    </div>

    <CardInput
      :show="showCard"
      :product="product"
      @close="showCard = false"
      @unlocked="onUnlocked"
    />
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import PentRadar from './PentRadar.vue'
import CardInput from './CardInput.vue'
import { useUnlock } from '../composables/useUnlock.js'
import { RADAR_DIMS, DIM_LABELS } from '../data/quiz.js'

const props = defineProps({
  report: { type: Object, required: true }, // band.deep
  dims: { type: Object, required: true }, // {worldview, rhythm, ...}
  accent: { type: String, default: '#FF6F61' },
  product: { type: String, default: 'ggtest' },
})

const { unlocked, refresh } = useUnlock(props.product)
const showCard = ref(false)

const radarValues = computed(() => RADAR_DIMS.map((k) => props.dims[k] ?? 0))
const radarLabels = RADAR_DIMS.map((k) => DIM_LABELS[k])

function onUnlocked() {
  refresh()
}
</script>

<style scoped>
.dr {
  padding: 28px 16px 0;
}
.dr-head {
  text-align: center;
  margin-bottom: 16px;
}
.dr-kicker {
  font-size: 11px;
  letter-spacing: 3px;
  color: var(--accent);
}
.dr-title {
  font-size: 20px;
  font-weight: 800;
  color: var(--ink);
  margin-top: 2px;
}
.dr-wrap {
  position: relative;
}
.dr-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: filter 0.4s ease;
}
.dr-content.is-locked {
  filter: blur(9px) saturate(0.7);
  pointer-events: none;
  user-select: none;
}
.dr-card {
  background: var(--bg-panel);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 18px 16px;
}
.dr-card-label {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1px;
  color: var(--ink-2);
  margin-bottom: 12px;
}
.dr-text {
  font-size: 14px;
  line-height: 1.75;
  color: var(--ink);
}
.dr-forecast {
  font-size: 13px;
  line-height: 1.7;
  color: var(--ink-2);
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px dashed var(--line);
}
.dr-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 11px;
}
.dr-list li {
  display: flex;
  align-items: flex-start;
  gap: 9px;
  font-size: 13.5px;
  line-height: 1.6;
  color: var(--ink);
}
.dr-list :deep(svg) {
  flex-shrink: 0;
  font-size: 17px;
  margin-top: 1px;
}
.dr-list--warn :deep(svg) {
  color: var(--warn);
}
.dr-list--ok :deep(svg) {
  color: var(--ok);
}

/* 锁层 */
.dr-lock {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 24px;
  background: radial-gradient(120% 80% at 50% 40%, rgba(24, 19, 32, 0.55), rgba(24, 19, 32, 0.88));
  border-radius: var(--radius);
}
.dr-lock-icon {
  font-size: 34px;
  color: var(--accent-2);
  display: inline-flex;
}
.dr-lock-title {
  font-size: 18px;
  font-weight: 800;
  color: var(--ink);
  margin-top: 8px;
}
.dr-lock-desc {
  font-size: 12.5px;
  color: var(--ink-2);
  margin-top: 6px;
}
.dr-lock-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin-top: 18px;
  padding: 13px 26px;
  border: none;
  border-radius: 50px;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  color: #fff;
  font-size: 15px;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(139, 123, 255, 0.34);
}
.dr-lock-btn:active {
  transform: scale(0.96);
}
.dr-lock-btn :deep(svg) {
  font-size: 18px;
}
.dr-lock-sub {
  font-size: 11px;
  color: var(--ink-3);
  margin-top: 12px;
}
</style>
