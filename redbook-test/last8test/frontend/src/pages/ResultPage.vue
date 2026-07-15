<template>
  <main v-if="result" class="result-page shell">
    <header class="system-bar">
      <button class="back-button" type="button" @click="retake">重新选择</button>
      <div class="battery-status" aria-label="测试完成，电量8%">
        <span>排序完成</span>
        <div class="battery is-charging" aria-hidden="true"><i></i></div>
        <strong>8%</strong>
      </div>
    </header>

    <section ref="resultCardRef" class="result-card" aria-labelledby="result-title">
      <div class="result-topline">
        <span>LAST 8 RESULT</span>
        <span>{{ selection.join(' / ') }}</span>
      </div>

      <div class="route-visual" aria-label="主型和副型">
        <div>
          <small>主型</small>
          <strong>{{ result.primary.name }}</strong>
        </div>
        <span aria-hidden="true">→</span>
        <div>
          <small>副型</small>
          <strong>{{ result.secondary.name }}</strong>
        </div>
      </div>

      <p class="result-kicker">你在低电量下的行动路线</p>
      <h1 id="result-title">{{ result.title }}</h1>
      <p class="conclusion">{{ result.conclusion }}</p>

      <div class="tag-list" aria-label="结果标签">
        <span v-for="tag in result.tags" :key="tag">{{ tag }}</span>
      </div>

      <div class="evidence-block">
        <h2>排序证据</h2>
        <ul>
          <li v-for="item in result.evidence" :key="item">{{ item }}</li>
        </ul>
      </div>

      <p class="card-note">情境选择只能反映此刻的排序倾向，不代表固定人格。</p>
    </section>

    <div class="result-actions">
      <button class="save-button" type="button" :disabled="saving" @click="saveImage">
        {{ saving ? '正在生成' : '保存结果图' }}
      </button>
      <button class="retake-button" type="button" @click="retake">再测一次</button>
    </div>
    <p class="save-status" aria-live="polite">{{ saveStatus }}</p>

    <DeepReport :report="result.deep" />
    <MoreTests current="last8test" />

    <footer class="result-footer">
      AI生成，仅供娱乐参考，不构成专业心理咨询、医学建议或现实决策依据。
    </footer>
  </main>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import DeepReport from '../components/DeepReport.vue'
import MoreTests from '../components/MoreTests.vue'
import { classifySelection } from '../data/model.js'

const route = useRoute()
const router = useRouter()
const selection = computed(() => {
  const raw = typeof route.query.s === 'string' ? route.query.s : ''
  return raw.split(',').filter(Boolean)
})
const result = computed(() => classifySelection(selection.value))
const resultCardRef = ref(null)
const saving = ref(false)
const saveStatus = ref('')

onMounted(() => {
  if (!result.value) router.replace('/')
})

function retake() {
  router.replace('/')
}

async function saveImage() {
  if (!resultCardRef.value || saving.value) return
  saving.value = true
  saveStatus.value = ''
  try {
    const { default: html2canvas } = await import('html2canvas')
    const canvas = await html2canvas(resultCardRef.value, {
      scale: 2,
      backgroundColor: '#1c1e1f',
      useCORS: true,
    })
    const link = document.createElement('a')
    link.download = `手机最后8%-${result.value.title}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
    saveStatus.value = '结果图已生成。如果没有自动保存，请使用系统截图。'
  } catch (_) {
    saveStatus.value = '图片生成失败，请直接使用系统截图保存。'
  } finally {
    saving.value = false
  }
}
</script>

<style scoped>
.result-page { padding-bottom: max(36px, env(safe-area-inset-bottom)); }

.back-button {
  min-height: 44px;
  margin-left: -10px;
  padding: 0 10px;
  border: 0;
  background: transparent;
  color: var(--text-secondary);
  font-size: 12px;
}

.result-card {
  position: relative;
  overflow: hidden;
  margin-top: 14px;
  padding: 20px;
  border: 1px solid var(--line-strong);
  border-radius: var(--radius-panel);
  background:
    radial-gradient(circle at 100% 0%, rgb(93 210 133 / 12%), transparent 32%),
    linear-gradient(155deg, #202223, #191b1c);
  box-shadow: 0 24px 70px rgb(0 0 0 / 26%);
}

.result-card::after {
  content: '';
  position: absolute;
  right: -34px;
  bottom: -58px;
  width: 150px;
  height: 150px;
  border: 28px solid rgb(229 82 82 / 8%);
  border-radius: 50%;
  pointer-events: none;
}

.result-topline {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  color: var(--text-muted);
  font: 700 10px/1.4 var(--font-mono);
  letter-spacing: 0.09em;
}

.route-visual {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 11px;
  margin-top: 24px;
}

.route-visual div {
  padding: 13px;
  border: 1px solid var(--line);
  border-radius: var(--radius-control);
  background: rgb(12 13 13 / 22%);
}

.route-visual small,
.route-visual strong { display: block; }
.route-visual small { color: var(--text-muted); font-size: 10px; }
.route-visual strong { margin-top: 3px; font-size: 14px; }
.route-visual > span { color: var(--charge); font: 750 18px/1 var(--font-mono); }

.result-kicker {
  margin: 28px 0 5px;
  color: var(--charge);
  font: 750 11px/1.4 var(--font-mono);
  letter-spacing: 0.08em;
}

h1 { margin: 0; font-size: clamp(30px, 8vw, 40px); line-height: 1.18; letter-spacing: -0.035em; }

.conclusion {
  max-width: 36em;
  margin: 14px 0 0;
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.75;
}

.tag-list { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 18px; }
.tag-list span {
  padding: 7px 10px;
  border: 1px solid rgb(93 210 133 / 28%);
  border-radius: var(--radius-control);
  background: rgb(93 210 133 / 6%);
  color: #9ce3b4;
  font-size: 11px;
  font-weight: 700;
}

.evidence-block {
  position: relative;
  z-index: 1;
  margin-top: 22px;
  padding-top: 16px;
  border-top: 1px solid var(--line);
}
.evidence-block h2 { margin: 0; font-size: 13px; }
.evidence-block ul { display: grid; gap: 7px; margin: 9px 0 0; padding-left: 18px; }
.evidence-block li { color: var(--text-secondary); font-size: 12.5px; line-height: 1.55; }
.evidence-block li::marker { color: var(--warning); }

.card-note { margin: 18px 0 0; color: var(--text-muted); font-size: 10px; line-height: 1.5; }

.result-actions {
  display: grid;
  grid-template-columns: 1fr 0.46fr;
  gap: 9px;
  margin-top: 12px;
}
.result-actions button {
  min-height: 48px;
  border-radius: var(--radius-control);
  font-size: 13px;
  font-weight: 800;
}
.save-button { border: 1px solid var(--charge); background: var(--charge); color: #102016; }
.retake-button { border: 1px solid var(--line-strong); background: transparent; color: var(--text-secondary); }
.save-button:disabled { opacity: 0.55; cursor: wait; }
.save-status { min-height: 18px; margin: 6px 2px 0; color: var(--text-muted); font-size: 10.5px; }

.result-footer {
  margin-top: 28px;
  padding-top: 15px;
  border-top: 1px solid var(--line);
  color: var(--text-muted);
  font-size: 10.5px;
  line-height: 1.65;
  text-align: center;
}
</style>
