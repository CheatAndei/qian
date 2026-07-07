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

    <!-- Share section with link -->
    <section class="share-panel">
      <p class="section-label">截图发群对线</p>
      <h2>{{ report.shareText }}</h2>
      <button class="primary-btn" @click="copyShare">
        <span>{{ copied ? '已复制，去发群' : '复制文案发班级群' }}</span>
        <b aria-hidden="true">↗</b>
      </button>
    </section>

    <!-- 果果老师 QR card -->
    <section class="teacher-card">
      <p class="section-label">想测更多？</p>
      <div class="teacher-row">
        <img class="teacher-qr" :src="qrSrc" @error="qrSrc = qrFallback" alt="果果老师微信二维码" />
        <div class="teacher-info">
          <h2>扫码添加果果老师</h2>
          <p>果果老师还有更多好玩的测试，不定期更新。加她微信，下次出新测试第一时间通知你。</p>
          <small>备注「数学课」优先通过</small>
        </div>
      </div>
    </section>

    <!-- 3 Test CTA Buttons -->
    <section class="more-tests-panel">
      <p class="section-label">试试另外三个</p>
      <div class="test-cta-grid">
        <button
          v-for="test in otherTests"
          :key="test.slug"
          class="test-cta-btn"
          :class="{ checked: clickedSet.has(test.slug) }"
          :aria-pressed="clickedSet.has(test.slug)"
          @click="handleTestClick(test)"
        >
          <span class="test-cta-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" v-html="test.iconSvg" />
          </span>
          <div class="test-cta-text">
            <strong>{{ test.title }}</strong>
            <small>{{ test.hook }}</small>
          </div>
          <span class="test-cta-arrow">→</span>
        </button>
      </div>
    </section>

    <!-- 果果老师 QR Modal -->
    <div v-if="showQR" class="qr-overlay" @click.self="closeQR" @keydown.esc="closeQR">
      <div ref="qrDialogRef" class="qr-modal" role="dialog" aria-modal="true" aria-labelledby="qr-title" tabindex="-1">
        <button class="qr-close" @click="closeQR" aria-label="关闭">×</button>
        <img class="qr-big" :src="qrSrc" @error="qrSrc = qrFallback" alt="果果老师微信二维码" />
        <h2 id="qr-title">扫码添加果果老师</h2>
        <p>添加微信，获取更多有意思的测试～</p>
        <small>备注「{{ qrNote }}」优先通过</small>
      </div>
    </div>

    <!-- Special reveal toast -->
    <div v-if="showReward" class="reward-toast" @click="closeReward" @keydown.esc="closeReward">
      <div ref="rewardDialogRef" class="reward-card" role="dialog" aria-modal="true" aria-labelledby="reward-title" tabindex="-1" @click.stop>
        <strong id="reward-title">看出来你很感兴趣</strong>
        <p>送你一个测试——<a :href="'https://'+rewardDomain" target="_blank" rel="noopener noreferrer">{{ rewardDomain }}</a></p>
        <small>添加果果老师，获取更多有意思的测试</small>
        <button class="primary-btn compact" @click.stop="openReward">打开测试</button>
        <button class="ghost-btn compact" @click.stop="closeReward">知道了</button>
      </div>
    </div>

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
import { computed, nextTick, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { computeReport, product } from '../data/quiz'

const route = useRoute()
const router = useRouter()
const copied = ref(false)
const showQR = ref(false)
const showReward = ref(false)
const qrNote = ref('数学课')
const rewardDomain = ref('')
const clickedSet = ref(new Set())
const qrDialogRef = ref(null)
const rewardDialogRef = ref(null)
const qrSrc = ref('/guoguo-qr.jpg')
const qrFallback = 'https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=14&data=https://funmath.xpytt.com'

const iconSvgs = {
  role: '<circle cx="8" cy="8" r="3"/><circle cx="16" cy="8" r="3"/><path d="M3 20c1-4 4-6 5-6s4 2 5 6"/><path d="M11 20c1-4 4-6 5-6s4 2 5 6"/>',
  life: '<path d="M6 3h10l2 2v16H6z"/><path d="M16 3v4h4"/><path d="M9 10h6M9 14h6M9 18h4"/>',
  mbti: '<path d="M12 3a8 8 0 0 0-8 8c0 3 2 5 4 6v3h8v-3c2-1 4-3 4-6a8 8 0 0 0-8-8z"/><path d="M9 21h6"/><path d="M9 11h.01M15 11h.01"/>',
}

const otherTests = [
  { slug: 'role', title: '班级角色鉴定', hook: '你在班里是什么角色？', iconSvg: iconSvgs.role, domain: 'roletest.xpytt.com', note: '班级角色' },
  { slug: 'life', title: '人生剧本生成器', hook: 'AI 写出你的人生剧本', iconSvg: iconSvgs.life, domain: 'lifetest.xpytt.com', note: '人生剧本' },
  { slug: 'mbti', title: '学习人格鉴定', hook: '你的学习DNA是什么？', iconSvg: iconSvgs.mbti, domain: 'studymbti.xpytt.com', note: '学习人格' },
]

const answerMap = computed(() => {
  try { return JSON.parse(decodeURIComponent(route.query.a || '%7B%7D')) } catch (_) { return {} }
})

const report = computed(() => computeReport(answerMap.value))

watch(showQR, async (isOpen) => {
  if (!isOpen) return
  await nextTick()
  qrDialogRef.value?.focus()
})

watch(showReward, async (isOpen) => {
  if (!isOpen) return
  await nextTick()
  rewardDialogRef.value?.focus()
})

function retake() { router.replace('/quiz') }

async function copyShare() {
  const text = `${report.value.shareText}\n我刚测完「数学课生存图鉴」→ funmath.xpytt.com\n你也来测测你是哪种狠人。`
  try { await navigator.clipboard.writeText(text) } catch (_) {}
  copied.value = true
  window.setTimeout(() => { copied.value = false }, 1400)
}

function handleTestClick(test) {
  const wasChecked = clickedSet.value.has(test.slug)

  if (wasChecked) {
    qrNote.value = test.note
    showQR.value = true
    return
  }

  const nextClickedSet = new Set(clickedSet.value)
  nextClickedSet.add(test.slug)
  clickedSet.value = nextClickedSet

  if (nextClickedSet.size === otherTests.length) {
    rewardDomain.value = test.domain
    showReward.value = true
  } else {
    qrNote.value = test.note
    showQR.value = true
  }
}

function closeQR() {
  showQR.value = false
}

function closeReward() {
  showReward.value = false
}

function openReward() {
  window.open('https://' + rewardDomain.value, '_blank', 'noopener,noreferrer')
  closeReward()
}
</script>
