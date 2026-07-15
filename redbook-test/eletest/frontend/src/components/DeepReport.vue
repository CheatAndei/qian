<template>
  <section class="dr">
    <div class="dr-head">
      <span class="dr-kicker mono">BATTERY MAP</span>
      <h2>深度电池报告</h2>
    </div>
    <div class="dr-wrap" style="min-height: 520px">
      <div v-if="unlocked" class="dr-content">
        <div class="dr-card">
          <p class="dr-label">场景能量图谱</p>
          <PentRadar :values="radarValues" :labels="radarLabels" :color="accent" />
        </div>
        <div class="dr-card">
          <p class="dr-label">观察结论</p>
          <p class="dr-text">{{ report.summary }}</p>
          <p class="dr-forecast">{{ report.forecast }}</p>
        </div>
        <div class="dr-card">
          <p class="dr-label">最高耗电源</p>
          <p class="dr-text">{{ report.highestDrain }}</p>
        </div>
        <div class="dr-card">
          <p class="dr-label">容易耗损的地方</p>
          <ul class="dr-list warn">
            <li v-for="(warning, index) in report.warnings" :key="index">
              <Icon icon="mdi:alert-octagon-outline" />
              <span>{{ warning }}</span>
            </li>
          </ul>
        </div>
        <div class="dr-card">
          <p class="dr-label">回血菜单</p>
          <ul class="dr-list ok">
            <li v-for="(item, index) in report.recoveryMenu" :key="index">
              <Icon icon="mdi:check-decagram-outline" />
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>
        <div class="dr-card">
          <p class="dr-label">拒绝话术</p>
          <p class="dr-text">“{{ report.refusalScript }}”</p>
          <p class="dr-label">社交预算</p>
          <p class="dr-forecast">{{ report.socialBudget }}</p>
        </div>
        <div class="dr-card">
          <p class="dr-label">低压力练习</p>
          <ul class="dr-list ok">
            <li v-for="(item, index) in report.advice" :key="index">
              <Icon icon="mdi:check-decagram-outline" />
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div v-if="!unlocked" class="dr-lock">
        <span class="dr-lock-icon"><Icon icon="mdi:lock-outline" /></span>
        <p class="dr-lock-title">深度电池报告未解锁</p>
        <p class="dr-lock-desc">最高耗电源 · 回血菜单 · 拒绝话术</p>
        <button class="dr-lock-btn" @click="showCard = true">
          <Icon icon="mdi:key-variant" />
          <span>输入兑换码解锁</span>
        </button>
        <p class="dr-lock-sub">已购买？输入兑换码即可解锁全部测试</p>
      </div>
    </div>
    <CardInput
      :show="showCard"
      product="eletest"
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
  report: { type: Object, required: true },
  dims: { type: Object, required: true },
  accent: { type: String, default: '#A4C95A' },
})
const { unlocked, refresh } = useUnlock('eletest')
const showCard = ref(false)
const radarValues = computed(() => RADAR_DIMS.map((key) => props.dims[key] ?? 0))
const radarLabels = RADAR_DIMS.map((key) => DIM_LABELS[key])

function onUnlocked() {
  refresh()
}
</script>
