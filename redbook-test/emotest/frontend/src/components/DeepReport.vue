<template>
  <section class="dr">
    <div class="dr-head">
      <span class="dr-kicker mono">TASK REPORT</span>
      <h2>深度后台报告</h2>
    </div>
    <div class="dr-wrap" style="min-height: 520px">
      <div v-if="unlocked" class="dr-content">
        <div class="dr-card">
          <p class="dr-label">维度图谱</p>
          <PentRadar :values="radarValues" :labels="radarLabels" :color="accent" />
        </div>
        <div class="dr-card">
          <p class="dr-label">主次耗损机制</p>
          <p class="dr-text">主维度：{{ report.primaryLabel }} · 次维度：{{ report.secondaryLabel }}</p>
          <p class="dr-text">{{ report.summary }}</p>
          <p class="dr-forecast">{{ report.forecast }}</p>
        </div>
        <div class="dr-card">
          <p class="dr-label">答案证据</p>
          <ul class="dr-list ok">
            <li v-for="(item, index) in report.evidence" :key="index">
              <Icon icon="mdi:checkbox-marked-circle-outline" />
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>
        <div class="dr-card">
          <p class="dr-label">恢复证据</p>
          <ul class="dr-list ok">
            <li v-for="(item, index) in report.recoveryEvidence" :key="index">
              <Icon icon="mdi:leaf-circle-outline" />
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>
        <div class="dr-card">
          <p class="dr-label">容易耗损的地方</p>
          <ul class="dr-list warn">
            <li v-for="(item, index) in report.warnings" :key="index">
              <Icon icon="mdi:alert-octagon-outline" />
              <span>{{ item }}</span>
            </li>
          </ul>
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
        <p class="dr-lock-title">深度后台报告未解锁</p>
        <p class="dr-lock-desc">主次机制 · 答案证据 · 恢复策略</p>
        <button class="dr-lock-btn" @click="showCard = true">
          <Icon icon="mdi:key-variant" />
          <span>输入兑换码解锁</span>
        </button>
        <p class="dr-lock-sub">已购买？输入兑换码即可解锁全部测试</p>
      </div>
    </div>
    <CardInput
      :show="showCard"
      product="emotest"
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
  accent: { type: String, default: '#DDB95B' },
})
const { unlocked, refresh } = useUnlock('emotest')
const showCard = ref(false)
const radarValues = computed(() => RADAR_DIMS.map((key) => props.dims[key] ?? 0))
const radarLabels = RADAR_DIMS.map((key) => DIM_LABELS[key])

function onUnlocked() {
  refresh()
}
</script>
