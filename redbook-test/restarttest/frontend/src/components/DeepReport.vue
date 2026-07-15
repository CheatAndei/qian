<template>
  <section class="report-section">
    <header>
      <p class="mono">DEEP REPORT</p>
      <h2>人生重启深报</h2>
    </header>

    <div class="report-wrap">
      <div v-if="unlocked" class="report-content">
        <article class="report-card">
          <div class="card-title"><Icon icon="mdi:restart" /><h3>重启顺序</h3></div>
          <ol class="order-list">
            <li v-for="(item, index) in report.order" :key="item">
              <span class="mono">{{ index + 1 }}</span>
              <p>{{ item }}</p>
            </li>
          </ol>
        </article>

        <article class="report-card">
          <div class="card-title"><Icon icon="mdi:shield-key-outline" /><h3>资源不足时的取舍</h3></div>
          <p>{{ report.tradeoff }}</p>
        </article>

        <article class="report-card">
          <div class="card-title"><Icon icon="mdi:alert-octagon-outline" /><h3>容易过度依赖的能力</h3></div>
          <p>{{ report.overuse }}</p>
        </article>

        <article class="report-card action-card">
          <div class="card-title"><Icon icon="mdi:check-decagram-outline" /><h3>7 天微行动</h3></div>
          <div class="day-grid">
            <div v-for="(item, index) in report.sevenDay" :key="item">
              <span class="mono">D{{ index + 1 }}</span>
              <p>{{ item }}</p>
            </div>
          </div>
        </article>
      </div>

      <div v-if="!unlocked" class="lock-layer">
        <span class="lock-icon"><Icon icon="mdi:lock-outline" /></span>
        <h3>人生重启深报未解锁</h3>
        <p>查看重启顺序、资源取舍、能力盲区和 7 天微行动</p>
        <button type="button" @click="showCard = true">
          <Icon icon="mdi:key-variant" />
          输入兑换码解锁
        </button>
        <small>一张万能卡解锁全部 15 项测试深报</small>
      </div>
    </div>

    <CardInput :show="showCard" :product="product" @close="showCard = false" @unlocked="onUnlocked" />
  </section>
</template>

<script setup>
import { ref } from 'vue'
import CardInput from './CardInput.vue'
import { useUnlock } from '../composables/useUnlock.js'

const props = defineProps({
  report: { type: Object, required: true },
  product: { type: String, default: 'restarttest' },
})

const { unlocked, refresh } = useUnlock(props.product)
const showCard = ref(false)

function onUnlocked() {
  refresh()
}
</script>

<style scoped>
.report-section {
  margin-top: 36px;
}

header {
  margin-bottom: 14px;
}

header p {
  color: var(--accent);
  font-size: 10px;
}

header h2 {
  margin-top: 4px;
  font-size: 20px;
}

.report-wrap {
  position: relative;
  min-height: 650px;
}

.report-content {
  display: grid;
  gap: 10px;
  transition: filter 0.28s ease;
}

.report-card {
  padding: 17px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--panel);
}

.card-title {
  display: flex;
  align-items: center;
  gap: 9px;
  color: var(--accent);
}

.card-title :deep(svg) {
  font-size: 19px;
}

.card-title h3 {
  color: var(--ink);
  font-size: 14px;
}

.report-card > p {
  margin-top: 12px;
  color: var(--ink-2);
  font-size: 13px;
  line-height: 1.75;
}

.order-list {
  display: grid;
  gap: 9px;
  margin-top: 13px;
  list-style: none;
}

.order-list li {
  display: grid;
  grid-template-columns: 24px 1fr;
  gap: 9px;
  padding: 9px 0;
  border-bottom: 1px solid var(--line);
}

.order-list li:last-child {
  border-bottom: 0;
}

.order-list span,
.day-grid span {
  color: var(--accent);
  font-size: 10px;
}

.order-list p,
.day-grid p {
  color: var(--ink-2);
  font-size: 12px;
  line-height: 1.55;
}

.day-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-top: 13px;
}

.day-grid div {
  min-height: 78px;
  padding: 11px;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.018);
}

.day-grid p {
  margin-top: 7px;
}

.day-grid div:last-child {
  grid-column: 1 / -1;
}

.lock-layer {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 28px;
  border: 1px solid var(--line-strong);
  border-radius: var(--radius);
  background: linear-gradient(180deg, rgba(21, 21, 18, 0.62), rgba(15, 15, 13, 0.94));
  text-align: center;
}

.lock-icon {
  display: inline-flex;
  color: var(--accent);
  font-size: 34px;
}

.lock-layer h3 {
  margin-top: 9px;
  font-size: 18px;
}

.lock-layer p {
  max-width: 250px;
  margin-top: 8px;
  color: var(--ink-2);
  font-size: 12px;
  line-height: 1.65;
}

.lock-layer button {
  display: inline-flex;
  min-height: 48px;
  align-items: center;
  justify-content: center;
  gap: 7px;
  margin-top: 20px;
  padding: 0 22px;
  border: 0;
  border-radius: var(--radius);
  background: var(--accent);
  color: #171711;
  font-weight: 900;
  cursor: pointer;
}

.lock-layer small {
  margin-top: 11px;
  color: var(--ink-3);
  font-size: 10px;
}
</style>
