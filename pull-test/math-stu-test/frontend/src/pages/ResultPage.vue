<template>
  <main class="result shell" v-if="report">
    <section class="score-card result-hero">
      <span class="section-label">{{ product.resultTitle }}</span>
      <div class="score-ring">
        <svg viewBox="0 0 120 120" class="ring-svg">
          <circle cx="60" cy="60" r="52" class="ring-track" />
          <circle cx="60" cy="60" r="52" class="ring-fill" :style="{ strokeDashoffset: 327 - (327 * report.pct / 100) }" />
        </svg>
        <div class="ring-center">
          <strong>{{ report.total }}</strong>
          <span>/ {{ report.maxTotal }}</span>
        </div>
      </div>
      <div class="badge">{{ report.level.badge }}</div>
      <p class="level-name">{{ report.level.name }}</p>
      <p class="level-tone">{{ report.level.tone }}</p>
    </section>

    <section class="share-panel">
      <p class="section-label">截图发群对线</p>
      <h2>{{ report.shareText }}</h2>
      <button class="primary-btn" @click="copyShare">
        <span>{{ copied ? '已复制，去发群' : '复制文案发班级群' }}</span>
        <b aria-hidden="true">↗</b>
      </button>
    </section>

    <section class="teacher-card">
      <p class="section-label">想测更多？</p>
      <div class="teacher-row">
        <img class="teacher-qr" src="/guoguo-qr.jpg" alt="果果老师微信二维码" />
        <div class="teacher-info">
          <h2>扫码添加果果老师</h2>
          <p>果果老师还有更多好玩的测试，不定期更新。加她微信，下次出新测试第一时间通知你。</p>
          <small>备注「数学课」优先通过</small>
        </div>
      </div>
    </section>

    <section class="analysis-panel">
      <p class="section-label">你的两项最强生存技能</p>
      <article v-for="item in report.topDimensions" :key="item.key" class="trend">
        <header><strong>{{ item.name }}</strong><span>{{ item.score }}/{{ item.max }}</span></header>
        <div class="thin-meter"><span :style="{ width: item.pct + '%' }"></span></div>
        <p>{{ item.risk }}</p>
        <small>{{ item.advice }}</small>
      </article>
    </section>

    <section class="dimension-list">
      <p class="section-label">完整人设雷达</p>
      <div v-for="item in report.dimensions" :key="item.key" class="dim-row">
        <span>{{ item.name }}</span>
        <div><i :style="{ width: item.pct + '%' }"></i></div>
        <b>{{ item.pct }}%</b>
      </div>
    </section>

    <div class="tail-actions">
      <button class="ghost-btn" @click="retake">再测一次</button>
      <button class="ghost-btn" @click="copyShare">发给同学对线</button>
    </div>

    <p class="disclaimer">{{ product.disclaimer }}</p>
  </main>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { computeReport, product } from '../data/quiz'

const route = useRoute()
const router = useRouter()
const copied = ref(false)

const answerMap = computed(() => {
  try { return JSON.parse(decodeURIComponent(route.query.a || '%7B%7D')) } catch (_) { return {} }
})

const report = computed(() => computeReport(answerMap.value))

function retake() { router.replace('/quiz') }

async function copyShare() {
  const text = `${report.value.shareText}\n我刚测完「数学课生存图鉴」，你也来测测你是哪种狠人。`
  try { await navigator.clipboard.writeText(text) } catch (_) {}
  copied.value = true
  window.setTimeout(() => { copied.value = false }, 1400)
}
</script>
