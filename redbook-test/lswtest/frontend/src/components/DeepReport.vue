<template>
  <section class="dr"><div class="dr-head"><span class="dr-kicker mono">WEATHER REPORT</span><h2>深度关系天气报</h2></div><div class="dr-wrap" style="min-height: 520px"><div v-if="unlocked" class="dr-content"><div class="dr-card"><p class="dr-label">四维倾向（按理论上限）</p><PentRadar :values="radarValues" :labels="radarLabels" :color="accent" /></div><div class="dr-card"><p class="dr-label">观察结论</p><p class="dr-text">{{ report.summary }}</p><p class="dr-forecast">{{ report.forecast }}</p><p class="dr-text">{{ report.blend }}</p></div><div class="dr-card" v-if="report.evidence?.length"><p class="dr-label">答案证据</p><ul class="dr-list"><li v-for="(item, i) in report.evidence" :key="i"><Icon icon="mdi:message-text-outline" /><span>{{ item.text }}<small v-if="item.read"> · {{ item.read }}</small></span></li></ul></div><div class="dr-card"><p class="dr-label">容易耗损的地方</p><ul class="dr-list warn"><li v-for="(w, i) in report.warnings" :key="i"><Icon icon="mdi:alert-octagon-outline" /><span>{{ w }}</span></li></ul></div><div class="dr-card"><p class="dr-label">低压力练习</p><ul class="dr-list ok"><li v-for="(a, i) in report.advice" :key="i"><Icon icon="mdi:check-decagram-outline" /><span>{{ a }}</span></li></ul></div></div><div class="dr-lock" v-if="!unlocked"><span class="dr-lock-icon"><Icon icon="mdi:lock-outline" /></span><p class="dr-lock-title">深度天气报未解锁</p><p class="dr-lock-desc">答案证据 · 主次倾向 · 低压力沟通练习</p><button class="dr-lock-btn" @click="showCard = true"><Icon icon="mdi:key-variant" /><span>输入兑换码解锁</span></button><p class="dr-lock-sub">已购买？输入兑换码即可解锁全部测试</p></div></div><CardInput :show="showCard" product="lswtest" @close="showCard = false" @unlocked="onUnlocked" /></section>
</template>
<script setup>
import { ref, computed } from 'vue'
import PentRadar from './PentRadar.vue'
import CardInput from './CardInput.vue'
import { useUnlock } from '../composables/useUnlock.js'
import { RADAR_DIMS, DIM_LABELS } from '../data/quiz.js'
const props = defineProps({ report: { type: Object, required: true }, dims: { type: Object, required: true }, accent: { type: String, default: '#B96F61' } })
const { unlocked, refresh } = useUnlock('lswtest')
const showCard = ref(false)
const radarValues = computed(() => RADAR_DIMS.map((key) => props.dims[key] ?? 0))
const radarLabels = RADAR_DIMS.map((key) => DIM_LABELS[key])
function onUnlocked() { refresh() }
</script>
