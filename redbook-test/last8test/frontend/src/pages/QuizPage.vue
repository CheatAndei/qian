<template>
  <main class="quiz-page shell">
    <header class="system-bar" aria-label="低电量状态">
      <span class="system-name">LAST 8</span>
      <div class="battery-status">
        <span>低电量</span>
        <div class="battery" aria-hidden="true"><i></i></div>
        <strong>8%</strong>
      </div>
    </header>

    <section class="question-panel" aria-labelledby="question-title">
      <div class="charge-visual" aria-hidden="true">
        <span class="charge-number">8</span>
        <span class="charge-percent">%</span>
      </div>

      <p class="question-label">今晚的最后一点电量</p>
      <h1 id="question-title">手机只剩8%电，今晚这8件事只够完成3件。你会按什么顺序做？</h1>
      <p class="question-help">依次选择3项。第一项决定主型，之后最早出现的不同方向决定副型。</p>

      <div class="selection-readout" aria-live="polite">
        <span v-for="slot in 3" :key="slot" :class="{ filled: selection[slot - 1] }">
          <b>{{ slot }}</b>
          {{ optionText(selection[slot - 1]) || '待选择' }}
        </span>
      </div>

      <div class="option-list" role="group" aria-label="可选择的8件事">
        <button
          v-for="option in OPTIONS"
          :key="option.id"
          type="button"
          class="option-button"
          :class="{ selected: selection.includes(option.id) }"
          :aria-pressed="selection.includes(option.id)"
          :disabled="selection.length === 3 && !selection.includes(option.id)"
          @click="toggle(option.id)"
        >
          <span class="option-id">{{ option.id }}</span>
          <span class="option-text">{{ option.text }}</span>
          <span v-if="selection.includes(option.id)" class="option-order" aria-hidden="true">
            {{ selection.indexOf(option.id) + 1 }}
          </span>
        </button>
      </div>

      <div class="quiz-actions">
        <button class="reset-button" type="button" :disabled="selection.length === 0" @click="reset">
          清空顺序
        </button>
        <button class="result-button" type="button" :disabled="selection.length !== 3" @click="showResult">
          查看我的排序结果
        </button>
      </div>
    </section>

    <footer class="quiz-footer">
      <p>免费查看结论与证据，1.9元万能卡解锁15项测试深报。</p>
      <p>AI生成，仅供娱乐参考，不构成专业心理判断或现实决策建议。</p>
    </footer>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { OPTIONS } from '../data/model.js'

const router = useRouter()
const selection = ref([])
const optionById = new Map(OPTIONS.map((option) => [option.id, option]))

function optionText(id) {
  return id ? optionById.get(id)?.text : ''
}

function toggle(id) {
  const currentIndex = selection.value.indexOf(id)
  if (currentIndex >= 0) {
    selection.value = selection.value.filter((item) => item !== id)
    return
  }
  if (selection.value.length < 3) selection.value = [...selection.value, id]
}

function reset() {
  selection.value = []
}

function showResult() {
  if (selection.value.length !== 3) return
  router.push({ path: '/result', query: { s: selection.value.join(',') } })
}
</script>

<style scoped>
.quiz-page { padding-bottom: max(28px, env(safe-area-inset-bottom)); }

.question-panel { padding: 18px 0 0; }

.charge-visual {
  display: flex;
  align-items: flex-start;
  width: max-content;
  margin-bottom: 18px;
  color: var(--warning);
  font-family: var(--font-mono);
}

.charge-number {
  font-size: clamp(70px, 25vw, 112px);
  font-weight: 850;
  line-height: 0.8;
  letter-spacing: -0.1em;
}

.charge-percent {
  margin: 1px 0 0 10px;
  font-size: 27px;
  font-weight: 750;
}

.question-label {
  margin: 0 0 7px;
  color: var(--charge);
  font: 750 12px/1.4 var(--font-mono);
  letter-spacing: 0.1em;
}

h1 {
  max-width: 16em;
  margin: 0;
  font-size: clamp(25px, 7.1vw, 34px);
  line-height: 1.28;
  letter-spacing: -0.025em;
  text-wrap: balance;
}

.question-help {
  max-width: 40em;
  margin: 12px 0 0;
  color: var(--text-secondary);
  font-size: 13px;
  line-height: 1.65;
}

.selection-readout {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 7px;
  margin-top: 20px;
}

.selection-readout span {
  min-width: 0;
  padding: 9px;
  overflow: hidden;
  border: 1px dashed var(--line-strong);
  border-radius: var(--radius-control);
  color: var(--text-muted);
  font-size: 10px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.selection-readout span.filled {
  border-style: solid;
  border-color: rgb(93 210 133 / 45%);
  color: var(--text-secondary);
  background: rgb(93 210 133 / 6%);
}

.selection-readout b {
  display: inline-grid;
  place-items: center;
  width: 18px;
  height: 18px;
  margin-right: 3px;
  border-radius: 50%;
  background: var(--surface-soft);
  color: var(--text-muted);
  font: 750 10px/1 var(--font-mono);
}

.filled b { background: var(--charge); color: #102016; }

.option-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 9px;
  margin-top: 12px;
}

.option-button {
  display: grid;
  grid-template-columns: 30px 1fr 24px;
  align-items: center;
  min-height: 70px;
  padding: 10px 11px;
  border: 1px solid var(--line);
  border-radius: var(--radius-control);
  background: var(--surface);
  color: var(--text-primary);
  text-align: left;
}

.option-button:hover:not(:disabled) {
  border-color: var(--line-strong);
  background: var(--surface-raised);
}

.option-button.selected {
  border-color: var(--charge);
  background: rgb(93 210 133 / 8%);
}

.option-button:disabled { opacity: 0.42; cursor: not-allowed; }

.option-id {
  color: var(--text-muted);
  font: 800 14px/1 var(--font-mono);
}

.option-text {
  font-size: 13px;
  font-weight: 650;
  line-height: 1.4;
}

.option-order {
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--charge);
  color: #102016;
  font: 850 11px/1 var(--font-mono);
}

.quiz-actions {
  display: grid;
  grid-template-columns: 0.42fr 1fr;
  gap: 9px;
  margin-top: 14px;
}

.reset-button,
.result-button {
  min-height: 50px;
  border-radius: var(--radius-control);
  font-size: 14px;
  font-weight: 800;
}

.reset-button {
  border: 1px solid var(--line-strong);
  background: transparent;
  color: var(--text-secondary);
}

.result-button {
  border: 1px solid var(--charge);
  background: var(--charge);
  color: #102016;
}

.reset-button:disabled,
.result-button:disabled {
  border-color: var(--line);
  background: var(--surface-soft);
  color: var(--text-muted);
  cursor: not-allowed;
}

.quiz-footer {
  margin-top: 22px;
  padding-top: 15px;
  border-top: 1px solid var(--line);
}

.quiz-footer p { margin: 0; color: var(--text-muted); font-size: 10.5px; line-height: 1.65; }
.quiz-footer p + p { margin-top: 3px; }

@media (max-width: 390px) {
  .option-list { grid-template-columns: 1fr; }
  .option-button { min-height: 58px; }
}
</style>
