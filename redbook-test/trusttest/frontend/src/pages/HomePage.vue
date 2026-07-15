<template>
  <main class="app-shell quiz-shell">
    <header class="archive-header">
      <a class="wordmark" href="#/" aria-label="信任档案室首页">
        <span class="archive-mark" aria-hidden="true"><i></i><i></i><i></i></span>
        <span>信任档案室</span>
      </a>
      <span class="duration">约 30 秒</span>
    </header>

    <section class="question-panel" aria-labelledby="question-title">
      <p class="file-label">记忆恢复记录</p>
      <h1 id="question-title">醒来后，你失去了关于所有人的记忆。</h1>
      <p class="question-copy">8 个人都说认识你，但你只能按先后联系 3 个。你会先找谁？</p>

      <div class="selection-ledger" aria-label="已选择的联系顺序">
        <span v-for="slot in MAX_SELECTIONS" :key="slot" :class="{ filled: selected[slot - 1] }">
          <b>{{ slot }}</b>
          {{ selected[slot - 1] || '待选' }}
        </span>
      </div>

      <div class="option-grid" role="group" aria-describedby="selection-help">
        <button
          v-for="option in TRUST_OPTIONS"
          :key="option.id"
          class="option-button"
          :class="{ selected: isSelected(option.id) }"
          type="button"
          :aria-pressed="isSelected(option.id)"
          :disabled="selected.length === MAX_SELECTIONS && !isSelected(option.id)"
          @click="toggleOption(option.id)"
        >
          <span class="option-letter">{{ option.id }}</span>
          <span>{{ option.text }}</span>
          <span v-if="selectionOrder(option.id)" class="selection-order" aria-hidden="true">
            {{ selectionOrder(option.id) }}
          </span>
        </button>
      </div>

      <p id="selection-help" class="selection-help" aria-live="polite">
        {{ selectionHint }}
      </p>

      <div class="quiz-actions">
        <button v-if="selected.length" class="text-button" type="button" @click="clearSelection">重新选择</button>
        <button class="primary-button primary-button--wide" type="button" :disabled="selected.length !== MAX_SELECTIONS" @click="showResult">
          查看我的信任反应
        </button>
      </div>
      <p class="micro-disclaimer">按直觉排序，不冒充 MBTI 或专业心理测评。结果仅供娱乐参考。</p>
    </section>
  </main>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { MAX_SELECTIONS, TRUST_OPTIONS, deriveTrustResult } from '../data/trustModel.js'

const STORAGE_KEY = 'trusttest_selection'
const router = useRouter()
const selected = ref(readDraft())

const selectionHint = computed(() => {
  const remaining = MAX_SELECTIONS - selected.value.length
  if (remaining === 0) return '顺序已记录。你也可以点已选项移除后重选。'
  return `还可选择 ${remaining} 位。先后顺序会影响结果。`
})

function readDraft() {
  try {
    const draft = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '[]')
    const knownIds = new Set(TRUST_OPTIONS.map((option) => option.id))
    if (!Array.isArray(draft) || draft.length > MAX_SELECTIONS || new Set(draft).size !== draft.length) return []
    return draft.every((id) => knownIds.has(id)) ? draft : []
  } catch (_) {
    return []
  }
}

function persist() {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(selected.value))
}

function isSelected(id) {
  return selected.value.includes(id)
}

function selectionOrder(id) {
  const index = selected.value.indexOf(id)
  return index === -1 ? 0 : index + 1
}

function toggleOption(id) {
  const index = selected.value.indexOf(id)
  if (index !== -1) selected.value.splice(index, 1)
  else if (selected.value.length < MAX_SELECTIONS) selected.value.push(id)
  persist()
}

function clearSelection() {
  selected.value = []
  persist()
}

function showResult() {
  if (!deriveTrustResult(selected.value)) return
  persist()
  router.push('/result')
}
</script>
