<template>
  <main class="quiz shell">
    <header class="quiz-top">
      <button class="icon-btn" @click="goHome" aria-label="返回首页">‹</button>
      <div class="progress" aria-label="答题进度">
        <span :style="{ width: progress + '%' }"></span>
      </div>
      <strong>{{ currentIndex + 1 }}/{{ questions.length }}</strong>
    </header>

    <transition :name="slideName" mode="out-in">
      <section class="question-card" :key="current.id">
        <span class="dim">{{ currentDim.name }}</span>
        <h1>{{ current.prompt }}</h1>
        <div class="options">
          <button
            v-for="option in scaleOptions"
            :key="option.label"
            class="option"
            :class="{ active: answerMap[current.id] === option.score }"
            :disabled="isMoving"
            @click="choose(option)"
          >
            <span>
              <strong>{{ option.label }}</strong>
              <small>{{ option.note }}</small>
            </span>
            <b>{{ optionMark(option.score) }}</b>
          </button>
        </div>
      </section>
    </transition>

    <footer class="quiz-actions">
      <button class="ghost-btn" :disabled="currentIndex === 0" @click="prev">上一题</button>
      <p class="auto-tip">{{ currentIndex === questions.length - 1 ? '点击答案后生成报告' : '点击答案后自动进入下一题' }}</p>
    </footer>
  </main>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { questions, dimensions } from '../data/quiz'

const router = useRouter()
const currentIndex = ref(0)
const answerMap = ref({})
const isMoving = ref(false)
const slideName = ref('question-forward')

const current = computed(() => questions[currentIndex.value])
const currentDim = computed(() => dimensions[current.value.dim])
const scaleOptions = computed(() => current.value.options)
const progress = computed(() => Math.round(((currentIndex.value + 1) / questions.length) * 100))

function optionMark(score) {
  return ['A', 'B', 'C', 'D'][score] || ''
}

function choose(option) {
  if (isMoving.value) return
  slideName.value = 'question-forward'
  answerMap.value = { ...answerMap.value, [current.value.id]: option.score }
  isMoving.value = true
  window.setTimeout(() => {
    next()
    isMoving.value = false
  }, 240)
}

function prev() {
  if (isMoving.value) return
  slideName.value = 'question-back'
  if (currentIndex.value > 0) currentIndex.value -= 1
}

function next() {
  if (answerMap.value[current.value.id] === undefined) return
  if (currentIndex.value < questions.length - 1) {
    currentIndex.value += 1
    return
  }
  router.push({ path: '/result', query: { a: encodeURIComponent(JSON.stringify(answerMap.value)) } })
}

function goHome() {
  router.push('/')
}
</script>
