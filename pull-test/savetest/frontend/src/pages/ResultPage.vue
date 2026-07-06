<template>
  <main class="result shell" v-if="report">
    <section class="score-card">
      <span class="section-label">{{ product.resultTitle }}</span>
      <div class="score-row">
        <div>
          <strong>{{ report.total }}</strong>
          <span>/ {{ report.maxTotal }} 分</span>
        </div>
        <p>{{ report.level.name }}</p>
      </div>
      <div class="meter">
        <span :style="{ width: report.pct + '%' }"></span>
      </div>
      <p class="level-tone">{{ report.level.tone }}</p>
    </section>

    <section class="cta-panel">
      <h2>建议做一次老师解读</h2>
      <p>先判断最该补的 1 到 2 个短板，再决定班型和训练顺序。</p>
      <button class="primary-btn" @click="showScan = true">
        <span>扫码预约解读</span>
        <b aria-hidden="true">⌁</b>
      </button>
    </section>

    <section class="analysis-panel">
      <p class="section-label">主要趋势</p>
      <article v-for="item in report.topDimensions" :key="item.key" class="trend">
        <header>
          <strong>{{ item.name }}</strong>
          <span>{{ item.score }}/{{ item.max }}</span>
        </header>
        <div class="thin-meter"><span :style="{ width: item.pct + '%' }"></span></div>
        <p>{{ item.risk }}</p>
        <small>{{ item.advice }}</small>
      </article>
    </section>

    <section class="dimension-list">
      <p class="section-label">完整维度</p>
      <div v-for="item in report.dimensions" :key="item.key" class="dim-row">
        <span>{{ item.name }}</span>
        <div><i :style="{ width: item.pct + '%' }"></i></div>
        <b>{{ item.pct }}%</b>
      </div>
    </section>

    <div class="tail-actions">
      <button class="ghost-btn" @click="retake">重新测试</button>
      <button class="ghost-btn" @click="openNext">{{ product.nextLabel }}</button>
    </div>

    <p class="disclaimer">{{ product.disclaimer }}</p>

    <div v-if="showScan" class="scan-overlay" @click.self="showScan = false">
      <div class="scan-modal">
        <button class="close" @click="showScan = false" aria-label="关闭">×</button>
        <h2>添加果果老师微信</h2>
        <p>扫码添加好友，把测试结果发给老师，领取一次学习问题解读。</p>
        <img class="wechat-card" :src="qrImage" alt="果果老师微信好友二维码" />
        <button class="primary-btn compact" @click="openConsult">{{ consultUrl ? '打开预约链接' : '我已保存微信' }}</button>
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { computeReport, product } from '../data/quiz'

const route = useRoute()
const router = useRouter()
const showScan = ref(false)

const answerMap = computed(() => {
  try {
    return JSON.parse(decodeURIComponent(route.query.a || '%7B%7D'))
  } catch (_) {
    return {}
  }
})

const report = computed(() => computeReport(answerMap.value))
const consultUrl = import.meta.env.VITE_CONSULT_URL || ''
const qrTarget = import.meta.env.VITE_QR_TARGET || consultUrl
const qrImage = computed(() => {
  return import.meta.env.VITE_QR_IMAGE || (qrTarget ? `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=14&data=${encodeURIComponent(qrTarget)}` : '/wechat.jpg')
})

function retake() {
  router.replace('/quiz')
}

function openConsult() {
  if (!consultUrl) {
    showScan.value = false
    return
  }
  window.open(consultUrl, '_blank', 'noopener,noreferrer')
}

function openNext() {
  const nextUrl = import.meta.env.VITE_NEXT_URL || product.nextUrl
  window.open(nextUrl, '_blank', 'noopener,noreferrer')
}
</script>
