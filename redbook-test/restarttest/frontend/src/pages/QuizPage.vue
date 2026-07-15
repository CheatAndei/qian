<template>
  <div class="quiz">
    <header class="topbar">
      <button class="exit" type="button" aria-label="退出测试" @click="handleExit">
        <Icon icon="mdi:close" />
      </button>
      <span class="mono">能力保留顺序</span>
      <strong class="mono">{{ selectedKeys.length }}/3</strong>
    </header>

    <main class="body">
      <section class="prompt-block">
        <p class="mono">只看第一反应</p>
        <h1>只能按顺序保留 3 项能力</h1>
        <span>先选的能力权重更高。点击已选项可撤回。</span>
      </section>

      <section class="save-slots" aria-label="已选择的三项能力" aria-live="polite">
        <div v-for="(slot, index) in slots" :key="index" class="slot" :class="{ filled: slot }">
          <span class="slot-no mono">{{ index + 1 }}</span>
          <template v-if="slot">
            <b>{{ slot.short }}</b>
            <small>{{ categories[slot.category].name }}</small>
          </template>
          <template v-else>
            <b>等待写入</b>
            <small>能力槽为空</small>
          </template>
        </div>
      </section>

      <section class="options" aria-label="可保留的能力">
        <button
          v-for="choice in choices"
          :key="choice.key"
          type="button"
          class="option"
          :class="{ selected: selectedKeys.includes(choice.key) }"
          :aria-pressed="selectedKeys.includes(choice.key)"
          :disabled="selectedKeys.length === 3 && !selectedKeys.includes(choice.key)"
          @click="toggleChoice(choice.key)"
        >
          <span class="option-key mono">{{ choice.key }}</span>
          <span class="option-text">{{ choice.text }}</span>
          <span v-if="selectedKeys.includes(choice.key)" class="order mono">{{ selectedKeys.indexOf(choice.key) + 1 }}</span>
        </button>
      </section>
    </main>

    <footer class="submit-bar">
      <p v-if="selectedKeys.length < 3">还需选择 {{ 3 - selectedKeys.length }} 项</p>
      <p v-else>顺序已写入，可以生成结果</p>
      <button type="button" :disabled="selectedKeys.length !== 3" @click="submit">
        读取重启模型
        <Icon icon="mdi:chevron-right" />
      </button>
    </footer>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { categories, choices, computeRestartResult } from '../data/quiz.js'

const router = useRouter()
const selectedKeys = ref([])
const slots = computed(() => Array.from({ length: 3 }, (_, index) => {
  const key = selectedKeys.value[index]
  return choices.find((choice) => choice.key === key) || null
}))

function toggleChoice(key) {
  const index = selectedKeys.value.indexOf(key)
  if (index >= 0) {
    selectedKeys.value.splice(index, 1)
    return
  }
  if (selectedKeys.value.length < 3) selectedKeys.value.push(key)
}

function submit() {
  const selection = [...selectedKeys.value]
  if (!computeRestartResult(selection)) return
  router.push({ path: '/result', query: { s: selection.join(',') } })
}

function handleExit() {
  if (selectedKeys.value.length && !window.confirm('退出后，本次选择顺序不会保存。确定退出吗？')) return
  router.replace('/')
}
</script>

<style scoped>
.quiz {
  min-height: 100dvh;
  padding-bottom: 112px;
}

.topbar {
  position: sticky;
  top: 0;
  z-index: 10;
  display: grid;
  grid-template-columns: 44px 1fr 44px;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  border-bottom: 1px solid var(--line);
  background: rgba(21, 21, 18, 0.94);
  backdrop-filter: blur(14px);
}

.topbar > span {
  color: var(--ink-2);
  font-size: 11px;
  text-align: center;
}

.topbar strong {
  color: var(--accent);
  font-size: 12px;
  text-align: right;
}

.exit {
  display: inline-flex;
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--line);
  border-radius: 11px;
  background: var(--panel);
  color: var(--ink-2);
  cursor: pointer;
}

.body {
  padding: 24px 16px;
}

.prompt-block p {
  color: var(--accent);
  font-size: 10px;
}

.prompt-block h1 {
  margin-top: 7px;
  font-size: 28px;
  line-height: 1.18;
  letter-spacing: -0.035em;
}

.prompt-block span {
  display: block;
  margin-top: 10px;
  color: var(--ink-3);
  font-size: 12px;
}

.save-slots {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-top: 22px;
}

.slot {
  position: relative;
  min-height: 90px;
  padding: 28px 10px 10px;
  border: 1px dashed var(--line);
  border-radius: var(--radius);
  background: rgba(255, 255, 255, 0.015);
}

.slot.filled {
  border-style: solid;
  border-color: var(--line-strong);
  background: var(--accent-soft);
}

.slot-no {
  position: absolute;
  top: 8px;
  left: 10px;
  color: var(--accent);
  font-size: 10px;
}

.slot b,
.slot small {
  display: block;
}

.slot b {
  font-size: 12px;
  line-height: 1.35;
}

.slot small {
  margin-top: 5px;
  color: var(--ink-3);
  font-size: 9px;
}

.options {
  display: grid;
  gap: 9px;
  margin-top: 24px;
}

.option {
  display: grid;
  grid-template-columns: 36px 1fr 30px;
  min-height: 62px;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 9px 12px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--panel);
  color: var(--ink);
  text-align: left;
  cursor: pointer;
  transition: transform 0.16s ease, border-color 0.16s ease, background 0.16s ease;
}

.option:hover:not(:disabled) {
  border-color: rgba(231, 240, 74, 0.28);
}

.option:active:not(:disabled) {
  transform: translateY(1px) scale(0.99);
}

.option.selected {
  border-color: var(--accent);
  background: var(--accent-soft);
}

.option:disabled {
  opacity: 0.36;
  cursor: not-allowed;
}

.option-key {
  display: inline-flex;
  width: 34px;
  height: 34px;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--line);
  border-radius: 9px;
  color: var(--accent);
  font-size: 12px;
}

.option-text {
  font-size: 14px;
  line-height: 1.45;
}

.order {
  display: inline-flex;
  width: 28px;
  height: 28px;
  align-items: center;
  justify-content: center;
  justify-self: end;
  border-radius: 50%;
  background: var(--accent);
  color: #171711;
  font-size: 11px;
  font-weight: 900;
}

.submit-bar {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  padding: 10px 16px calc(12px + env(safe-area-inset-bottom));
  border-top: 1px solid var(--line);
  background: rgba(15, 15, 13, 0.96);
  backdrop-filter: blur(14px);
}

.submit-bar p {
  margin-bottom: 7px;
  color: var(--ink-3);
  font-size: 10px;
  text-align: center;
}

.submit-bar button {
  display: flex;
  width: 100%;
  min-height: 50px;
  align-items: center;
  justify-content: center;
  gap: 7px;
  border: 0;
  border-radius: var(--radius);
  background: var(--accent);
  color: #171711;
  font-weight: 900;
  cursor: pointer;
}

.submit-bar button:disabled {
  background: var(--panel-raised);
  color: var(--ink-3);
  cursor: not-allowed;
}
</style>
