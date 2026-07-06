<template>
  <main class="home shell">
    <section class="hero-panel">
      <div class="topline">
        <span>{{ product.audience }}</span>
        <span>{{ product.subject }}</span>
      </div>
      <h1>{{ product.title }}</h1>
      <p class="intro">{{ product.intro }}</p>

      <div class="diagnostic-strip" aria-hidden="true">
        <span class="scan-dot"></span>
        <div class="signal-lines">
          <i></i><i></i><i></i><i></i>
        </div>
        <em>学习信号采集中</em>
      </div>

      <div class="facts" aria-label="测试信息">
        <div>
          <strong>{{ product.questionCount }}</strong>
          <span>题观察</span>
        </div>
        <div>
          <strong>{{ product.minutes }}</strong>
          <span>完成</span>
        </div>
        <div>
          <strong>6 项</strong>
          <span>趋势</span>
        </div>
      </div>

      <button class="primary-btn" @click="start">
        <span>{{ product.primaryCta }}</span>
        <b aria-hidden="true">→</b>
      </button>
    </section>

    <section class="mini-report">
      <p class="section-label">会看什么</p>
      <div class="risk-grid">
        <span v-for="item in dimNames" :key="item">{{ item }}</span>
      </div>
      <p class="quiet">结果页会给出总风险、最高风险维度和扫码预约解读入口。</p>
    </section>

    <p class="disclaimer">{{ product.disclaimer }}</p>
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { product, dimensions } from '../data/quiz'

const router = useRouter()
const dimNames = computed(() => Object.values(dimensions).map((item) => item.name))

function start() {
  router.push('/quiz')
}
</script>
