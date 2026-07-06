<template>
  <section class="dr">
    <div class="dr-head">
      <span class="dr-kicker mono">{{ copy.kicker }}</span>
      <h2 class="dr-title">{{ copy.title }}</h2>
    </div>

    <div class="dr-wrap">
      <div class="dr-content" :class="{ 'is-locked': !unlocked }" :aria-hidden="!unlocked">
        <!-- 倾向分布 -->
        <div class="dr-card">
          <p class="dr-card-label">{{ copy.distribution }}</p>
          <div class="bars">
            <div class="bar-row" v-for="d in distribution" :key="d.key">
              <span class="bar-name">{{ d.name }}</span>
              <div class="bar-track">
                <div
                  class="bar-fill"
                  :style="{ width: d.pct + '%', background: d.key === topKey ? accent : 'rgba(255,255,255,0.18)' }"
                ></div>
              </div>
              <span class="bar-pct mono" :style="{ color: d.key === topKey ? accent : 'var(--ink-3)' }">{{ d.pct }}%</span>
            </div>
          </div>
        </div>

        <!-- 匹配解读 -->
        <div class="dr-card">
          <p class="dr-card-label">{{ copy.analysis }}</p>
          <p class="dr-text">{{ report.summary }}</p>
          <p class="dr-forecast">{{ report.forecast }}</p>
        </div>

        <!-- 踩坑提醒 -->
        <div class="dr-card">
          <p class="dr-card-label">{{ copy.warning }}</p>
          <ul class="dr-list dr-list--warn">
            <li v-for="(w, i) in report.warnings" :key="i">
              <Icon icon="mdi:alert-octagon-outline" />
              <span>{{ w }}</span>
            </li>
          </ul>
        </div>

        <!-- 落地建议 -->
        <div class="dr-card">
          <p class="dr-card-label">{{ copy.advice }}</p>
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
        <p class="dr-lock-title">{{ copy.lockTitle }}</p>
        <p class="dr-lock-desc">{{ copy.lockDesc }}</p>
        <button class="dr-lock-btn" @click="showCard = true">
          <Icon icon="mdi:key-variant" />
          <span>输入兑换码解锁</span>
        </button>
        <p class="dr-lock-sub">已购买？输入兑换码即可解锁全部测试</p>
      </div>
    </div>

    <CardInput :show="showCard" :product="product" @close="showCard = false" @unlocked="onUnlocked" />
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import CardInput from './CardInput.vue'
import { useUnlock } from '../composables/useUnlock.js'

const props = defineProps({
  report: { type: Object, required: true }, // archetype.deep
  distribution: { type: Array, default: () => [] },
  topKey: { type: String, default: '' },
  accent: { type: String, default: '#36F1A6' },
  product: { type: String, default: 'shiptest' },
})

const { unlocked, refresh } = useUnlock(props.product)
const showCard = ref(false)
const copy = computed(() => ({
  kicker: 'CITY REPORT',
  title: '城市偏好深报',
  distribution: '目的地倾向占比',
  analysis: '城市匹配解读',
  warning: '踩坑提醒',
  advice: '落地建议',
  lockTitle: '城市偏好深报未解锁',
  lockDesc: '倾向占比 · 城市解读 · 踩坑与落地建议',
}))
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
  margin-bottom: 14px;
}
.bars {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.bar-row {
  display: flex;
  align-items: center;
  gap: 10px;
}
.bar-name {
  width: 72px;
  font-size: 12.5px;
  color: var(--ink);
  flex-shrink: 0;
}
.bar-track {
  flex: 1;
  height: 8px;
  background: var(--bg-raise);
  border-radius: 8px;
  overflow: hidden;
}
.bar-fill {
  height: 100%;
  border-radius: 8px;
  transition: width 1s cubic-bezier(0.34, 1.4, 0.6, 1);
  min-width: 3px;
}
.bar-pct {
  width: 38px;
  text-align: right;
  font-size: 12px;
  font-weight: 700;
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
  color: var(--accent);
}
.dr-lock {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 24px;
  background: radial-gradient(120% 80% at 50% 40%, rgba(16, 22, 17, 0.55), rgba(16, 22, 17, 0.88));
  border-radius: var(--radius);
}
.dr-lock-icon {
  font-size: 34px;
  color: var(--accent);
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
  color: #071913;
  font-size: 15px;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(54, 241, 166, 0.3);
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
