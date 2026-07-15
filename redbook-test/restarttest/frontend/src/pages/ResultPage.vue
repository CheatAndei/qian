<template>
  <main v-if="report" class="result">
    <header class="result-head">
      <span class="result-status"><Icon icon="mdi:check-circle" /> 存档读取成功</span>
      <span class="mono">{{ report.primary.short }} &gt; {{ report.secondary.short }}</span>
    </header>

    <section class="stack-panel">
      <p class="mono">你的重启顺序</p>
      <ol class="stack-list">
        <li v-for="(choice, index) in report.selection" :key="choice.key">
          <span class="slot-no mono">{{ index + 1 }}</span>
          <span class="choice-key mono">{{ choice.key }}</span>
          <span class="choice-copy">
            <b>{{ choice.short }}</b>
            <small>{{ categories[choice.category].name }}</small>
          </span>
        </li>
      </ol>
    </section>

    <section class="persona">
      <p class="model mono">{{ report.primary.name }} / {{ report.secondary.name }}</p>
      <h1>{{ report.name }}</h1>
      <p class="summary">{{ report.summary }}</p>
      <div class="tags">
        <span v-for="tag in report.tags" :key="tag">{{ tag }}</span>
      </div>
    </section>

    <section class="evidence">
      <h2>你的选择证据</h2>
      <div v-for="(item, index) in report.evidence" :key="item" class="evidence-row">
        <span class="mono">0{{ index + 1 }}</span>
        <p>{{ item }}</p>
      </div>
    </section>

    <div class="actions">
      <button class="primary" type="button" @click="showShare = true">
        <Icon icon="mdi:image-outline" />
        生成结果卡
      </button>
      <button type="button" @click="retake">
        <Icon icon="mdi:restart" />
        重新选择
      </button>
    </div>

    <DeepReport :report="report.deep" product="restarttest" />

    <section class="next-test">
      <p class="mono">下一项测试</p>
      <button type="button" @click="goNext">
        <span>
          <b>城市磁场测试</b>
          <small>重启以后，哪座城市更适合接住你？</small>
        </span>
        <Icon icon="mdi:chevron-right" />
      </button>
    </section>

    <MoreTests current="restarttest" />
    <p class="disclaimer">本测试由 AI 生成，仅供娱乐参考，不构成职业、财务或现实选择建议。</p>

    <transition name="fade">
      <div v-if="showShare" class="share-overlay" @click="showShare = false">
        <div ref="shareModalRef" class="share-modal" role="dialog" aria-modal="true" aria-label="人生重启能力栈结果卡" tabindex="-1" @click.stop @keydown.esc="showShare = false">
          <div ref="shareCardRef" class="share-card">
            <div class="share-top">
              <span class="brand-mark"><Icon icon="mdi:restart" /></span>
              <span class="mono">人生重启能力栈</span>
            </div>
            <p class="share-label mono">重启模型</p>
            <h2>{{ report.name }}</h2>
            <p class="share-summary">{{ report.summary }}</p>
            <ol>
              <li v-for="(choice, index) in report.selection" :key="choice.key">
                <span class="mono">{{ index + 1 }}</span>
                <b>{{ choice.text }}</b>
              </li>
            </ol>
            <div class="share-tags">
              <span v-for="tag in report.tags" :key="tag">{{ tag }}</span>
            </div>
            <p class="share-foot">小红书搜「人生重启能力栈」</p>
          </div>
          <div class="share-actions">
            <button class="save" type="button" @click="saveCard"><Icon icon="mdi:download" /> 保存图片</button>
            <button type="button" @click="showShare = false">关闭</button>
          </div>
        </div>
      </div>
    </transition>
  </main>
</template>

<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import DeepReport from '../components/DeepReport.vue'
import MoreTests from '../components/MoreTests.vue'
import { categories, computeRestartResult } from '../data/quiz.js'

const route = useRoute()
const router = useRouter()
const showShare = ref(false)
const shareCardRef = ref(null)
const shareModalRef = ref(null)

const selection = computed(() => typeof route.query.s === 'string' ? route.query.s.split(',') : [])
const report = computed(() => computeRestartResult(selection.value))

if (!report.value) router.replace('/')

watch(showShare, async (visible) => {
  if (!visible) return
  await nextTick()
  shareModalRef.value?.focus()
})

function retake() {
  router.replace('/quiz')
}

const nextProductUrl = import.meta.env.VITE_NEXT_PRODUCT_URL || 'https://city.xpytt.com'
function goNext() {
  window.open(nextProductUrl, '_blank', 'noopener,noreferrer')
}

async function saveCard() {
  if (!shareCardRef.value) return
  try {
    const { default: html2canvas } = await import('html2canvas')
    const canvas = await html2canvas(shareCardRef.value, {
      scale: 2,
      backgroundColor: '#151512',
      useCORS: true,
    })
    const link = document.createElement('a')
    link.download = '人生重启能力栈.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  } catch (_) {
    window.alert('保存失败，请直接截图保存。')
  }
}
</script>

<style scoped>
.result {
  min-height: 100dvh;
  padding: 0 16px 34px;
}

.result-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 58px;
  border-bottom: 1px solid var(--line);
  color: var(--ink-3);
  font-size: 10px;
}

.result-status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--accent);
  font-weight: 800;
}

.stack-panel {
  margin-top: 22px;
  padding: 16px;
  border: 1px solid var(--line-strong);
  border-radius: var(--radius);
  background: var(--accent-soft);
}

.stack-panel > p {
  color: var(--ink-3);
  font-size: 10px;
}

.stack-list {
  display: grid;
  gap: 8px;
  margin-top: 12px;
  list-style: none;
}

.stack-list li {
  display: grid;
  grid-template-columns: 24px 34px 1fr;
  align-items: center;
  gap: 9px;
  min-height: 52px;
  padding: 7px 10px;
  border: 1px solid var(--line);
  border-radius: 11px;
  background: rgba(15, 15, 13, 0.52);
}

.slot-no {
  color: var(--accent);
  font-size: 10px;
}

.choice-key {
  display: inline-flex;
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--line-strong);
  border-radius: 8px;
  color: var(--accent);
  font-size: 11px;
}

.choice-copy {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
}

.choice-copy b {
  font-size: 13px;
}

.choice-copy small {
  color: var(--ink-3);
  font-size: 10px;
}

.persona {
  padding: 36px 2px 0;
}

.model {
  color: var(--accent);
  font-size: 10px;
}

.persona h1 {
  margin-top: 8px;
  font-size: clamp(38px, 11vw, 50px);
  line-height: 1.06;
  letter-spacing: -0.055em;
}

.summary {
  margin-top: 17px;
  color: var(--ink-2);
  font-size: 14px;
  line-height: 1.75;
}

.tags,
.share-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
}

.tags span,
.share-tags span {
  padding: 5px 9px;
  border: 1px solid var(--line);
  border-radius: 8px;
  color: var(--ink-2);
  font-size: 11px;
}

.evidence {
  margin-top: 34px;
}

.evidence h2 {
  margin-bottom: 8px;
  font-size: 18px;
}

.evidence-row {
  display: grid;
  grid-template-columns: 30px 1fr;
  gap: 10px;
  padding: 14px 0;
  border-bottom: 1px solid var(--line);
}

.evidence-row span {
  color: var(--accent);
  font-size: 10px;
}

.evidence-row p {
  color: var(--ink-2);
  font-size: 13px;
  line-height: 1.65;
}

.actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 24px;
}

.actions button,
.share-actions button {
  display: inline-flex;
  min-height: 48px;
  align-items: center;
  justify-content: center;
  gap: 7px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--panel);
  color: var(--ink);
  font-weight: 800;
  cursor: pointer;
}

.actions .primary,
.share-actions .save {
  border-color: var(--accent);
  background: var(--accent);
  color: #171711;
}

.actions button:active,
.share-actions button:active,
.next-test button:active {
  transform: translateY(1px) scale(0.985);
}

.next-test {
  margin-top: 30px;
}

.next-test > p {
  margin-bottom: 8px;
  color: var(--ink-3);
  font-size: 10px;
}

.next-test button {
  display: grid;
  grid-template-columns: 1fr 24px;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 15px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--panel);
  color: var(--ink);
  text-align: left;
  cursor: pointer;
}

.next-test button span,
.next-test button small {
  display: block;
}

.next-test button small {
  margin-top: 4px;
  color: var(--ink-3);
  font-size: 11px;
}

.disclaimer {
  padding-top: 30px;
  color: var(--ink-3);
  font-size: 10px;
  line-height: 1.65;
  text-align: center;
}

.share-overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: grid;
  place-items: center;
  padding: 16px;
  background: rgba(5, 5, 4, 0.84);
  backdrop-filter: blur(8px);
}

.share-modal {
  width: 100%;
  max-width: 340px;
}

.share-card {
  position: relative;
  overflow: hidden;
  padding: 22px;
  border: 1px solid var(--line-strong);
  border-radius: var(--radius);
  background: radial-gradient(120% 50% at 100% 0%, rgba(231, 240, 74, 0.15), transparent 66%), #151512;
}

.share-card::after {
  position: absolute;
  right: -28px;
  bottom: -38px;
  color: rgba(231, 240, 74, 0.055);
  content: '03';
  font-family: var(--mono);
  font-size: 124px;
  font-weight: 900;
  line-height: 1;
  pointer-events: none;
}

.share-top {
  display: flex;
  align-items: center;
  gap: 9px;
  color: var(--ink-3);
  font-size: 10px;
}

.brand-mark {
  display: inline-flex;
  width: 34px;
  height: 34px;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--line-strong);
  border-radius: 9px;
  color: var(--accent);
  font-size: 19px;
}

.share-label {
  margin-top: 28px;
  color: var(--accent);
  font-size: 10px;
}

.share-card h2 {
  margin-top: 7px;
  font-size: 34px;
  letter-spacing: -0.045em;
}

.share-summary {
  margin-top: 12px;
  color: var(--ink-2);
  font-size: 12px;
  line-height: 1.65;
}

.share-card ol {
  display: grid;
  gap: 7px;
  margin-top: 18px;
  list-style: none;
}

.share-card li {
  display: grid;
  grid-template-columns: 24px 1fr;
  gap: 8px;
  padding: 9px 0;
  border-bottom: 1px solid var(--line);
  font-size: 11px;
}

.share-card li span {
  color: var(--accent);
}

.share-tags {
  position: relative;
  z-index: 1;
}

.share-foot {
  position: relative;
  z-index: 1;
  margin-top: 24px;
  color: var(--ink-3);
  font-size: 10px;
}

.share-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 10px;
}
</style>
