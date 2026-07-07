<template>
  <main class="home shell">
    <section ref="heroRef" class="hero-panel math-hero">
      <div class="float-field" aria-hidden="true">
        <span ref="floatWords" class="float-word" v-for="(w, i) in ['不会','蒙C','抄了','稳了']" :key="i" :style="{ '--i': i }">{{ w }}</span>
        <div ref="coreRef" class="glow-core">π</div>
      </div>

      <div ref="toplineRef" class="topline">
        <span>{{ product.audience }}</span>
        <span>{{ product.minutes }}</span>
      </div>
      <h1 ref="titleRef">{{ product.title }}</h1>
      <p ref="introRef" class="intro">{{ product.intro }}</p>

      <div ref="scanRef" class="diagnostic-strip persona-scanner" aria-hidden="true">
        <span class="scan-orb"><i></i></span>
        <div class="scan-readout">
          <em data-text="人设正在解析中">人设正在解析中</em>
          <div class="scan-wave"><i></i><i></i><i></i><i></i><i></i></div>
        </div>
        <div class="scan-tags"><b>摸鱼</b><b>蒙题</b><b>翻车</b></div>
      </div>

      <div ref="factsRef" class="facts" aria-label="测试信息">
        <div v-for="(f, i) in facts" :key="i" :ref="el => factEls[i] = el">
          <strong>{{ f.value }}</strong><span>{{ f.label }}</span>
        </div>
      </div>

      <button ref="btnRef" class="primary-btn" @click="start">
        <span>{{ product.primaryCta }}</span>
        <b aria-hidden="true">→</b>
      </button>
    </section>

    <section ref="miniRef" class="mini-report">
      <p class="section-label">会测出什么</p>
      <div class="risk-grid">
        <span v-for="item in dimNames" :key="item">{{ item }}</span>
      </div>
      <p class="quiet">测完得到你的人设标签 + 两项最强能力 + 专属锐评。截图发同学群对线。</p>
    </section>

    <section ref="viralRef" class="viral-card">
      <strong>分享即开团</strong>
      <p>测完截图发班级群，看看谁跟你是同一款数学课人设。对线越多，段子越密。</p>
    </section>

    <p class="disclaimer">{{ product.disclaimer }}</p>
  </main>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { product, dimensions } from '../data/quiz'
import gsap from 'gsap'

const router = useRouter()
const dimNames = computed(() => Object.values(dimensions).map((item) => item.name))

const facts = [
  { value: product.questionCount, label: '道灵魂拷问' },
  { value: 36, label: '搞笑值上限' },
  { value: '5 款', label: '人设' },
]

const heroRef = ref(null)
const coreRef = ref(null)
const floatWords = ref([])
const toplineRef = ref(null)
const titleRef = ref(null)
const introRef = ref(null)
const scanRef = ref(null)
const factsRef = ref(null)
const factEls = ref([])
const btnRef = ref(null)
const miniRef = ref(null)
const viralRef = ref(null)

let motionContext = null

function driftFloatWord(el, index) {
  if (!heroRef.value) return
  const heroBounds = heroRef.value.getBoundingClientRect()
  const wordBounds = el.getBoundingClientRect()
  const pad = 16
  const maxX = Math.max(0, heroBounds.width - wordBounds.width - pad * 2)
  const maxY = Math.max(0, heroBounds.height - wordBounds.height - pad * 2)

  gsap.to(el, {
    x: gsap.utils.random(0, maxX),
    y: gsap.utils.random(0, maxY),
    rotation: gsap.utils.random(-16, 16),
    duration: gsap.utils.random(2.2, 4.2),
    ease: 'sine.inOut',
    delay: index * 0.18,
    overwrite: 'auto',
    onComplete: () => driftFloatWord(el, index),
  })
}

function start() { router.push('/quiz') }

onMounted(() => {
  motionContext = gsap.context(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from(heroRef.value, { y: 48, opacity: 0, duration: 0.75 }, 0)
      tl.from(coreRef.value, { scale: 0, opacity: 0, duration: 0.7, ease: 'back.out(1.8)' }, 0.1)
      tl.from(floatWords.value, {
        y: () => gsap.utils.random(-40, 40),
        x: () => gsap.utils.random(-50, 50),
        opacity: 0, scale: 0.3, duration: 0.65, stagger: 0.1, ease: 'back.out(1.6)',
      }, 0.2)
      tl.from(toplineRef.value, { y: 16, opacity: 0, duration: 0.45 }, 0.45)
      tl.from(titleRef.value, { y: 32, opacity: 0, duration: 0.6 }, 0.55)
      tl.from(introRef.value, { y: 20, opacity: 0, duration: 0.5 }, 0.7)
      tl.from(scanRef.value, { scaleX: 0.8, opacity: 0, duration: 0.5 }, 0.85)
      tl.from(factEls.value, { y: 24, opacity: 0, scale: 0.85, duration: 0.5, stagger: 0.08, ease: 'back.out(1.4)' }, 1.0)
      tl.from(btnRef.value, { y: 18, opacity: 0, scale: 0.9, duration: 0.55, ease: 'back.out(1.7)' }, 1.2)
      tl.from(miniRef.value, { y: 32, opacity: 0, duration: 0.55 }, 1.4)
      tl.from(viralRef.value, { y: 24, opacity: 0, duration: 0.5 }, 1.55)

      tl.add(() => {
        floatWords.value.forEach((el, index) => driftFloatWord(el, index))
      }, 0.9)

      gsap.to(coreRef.value, {
        scale: 1.08,
        boxShadow: '0 0 0 20px rgba(217, 174, 116, 0), 0 0 50px rgba(185, 137, 255, 0.24)',
        duration: 2.8, repeat: -1, yoyo: true, ease: 'sine.inOut',
      })
    })

    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set([
        heroRef.value, coreRef.value, ...floatWords.value,
        toplineRef.value, titleRef.value, introRef.value,
        scanRef.value, ...factEls.value, btnRef.value,
        miniRef.value, viralRef.value,
      ], { opacity: 1, clearProps: 'all' })
    })
  }, heroRef.value)
})

onUnmounted(() => {
  motionContext?.revert()
})
</script>
