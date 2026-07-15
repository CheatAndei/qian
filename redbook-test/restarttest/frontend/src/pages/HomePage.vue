<template>
  <main class="home">
    <header class="brand-row">
      <span class="brand-icon"><Icon icon="mdi:restart" /></span>
      <span class="mono">人生重启能力栈</span>
      <span class="status-text mono">存档损坏</span>
    </header>

    <section class="save-panel" aria-label="损坏的人生存档">
      <div class="save-head">
        <span class="mono">SAVE DATA</span>
        <strong>无法恢复</strong>
      </div>
      <div class="lost-grid">
        <div v-for="item in lostItems" :key="item.code" class="lost-item">
          <span class="mono">{{ item.code }}</span>
          <b>{{ item.name }}</b>
          <i>已清零</i>
        </div>
      </div>
    </section>

    <section class="hero">
      <p class="kicker mono">紧急重启协议</p>
      <h1>人生存档损坏</h1>
      <p class="prompt">身份、履历、存款和社交圈都清零，只能按顺序保留 3 项能力。</p>
      <button class="cta" type="button" @click="start">
        <Icon icon="mdi:restart" />
        <span>选择重启能力</span>
      </button>
    </section>

    <div class="facts mono" aria-label="测试说明">
      <span>8 选 3</span>
      <span>约 30 秒</span>
      <span>顺序会改变结果</span>
    </div>

    <p class="note">本测试由 AI 生成，仅供娱乐参考，不构成职业、财务或现实选择建议。</p>
  </main>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const lostItems = [
  { code: 'ID', name: '身份' },
  { code: 'CV', name: '履历' },
  { code: '¥', name: '存款' },
  { code: 'SOC', name: '社交圈' },
]

function start() {
  router.push('/quiz')
}
</script>

<style scoped>
.home {
  display: flex;
  min-height: 100dvh;
  flex-direction: column;
  padding: 18px 18px 28px;
}

.brand-row {
  display: grid;
  grid-template-columns: 36px 1fr auto;
  align-items: center;
  gap: 10px;
  color: var(--ink-2);
  font-size: 11px;
}

.brand-icon {
  display: inline-flex;
  width: 36px;
  height: 36px;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--line-strong);
  border-radius: 10px;
  color: var(--accent);
  font-size: 20px;
}

.status-text {
  color: var(--danger);
}

.save-panel {
  margin-top: 34px;
  border: 1px solid var(--line-strong);
  border-radius: var(--radius);
  background: linear-gradient(145deg, rgba(231, 240, 74, 0.065), rgba(255, 255, 255, 0.015));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
  overflow: hidden;
}

.save-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  border-bottom: 1px solid var(--line);
  color: var(--ink-3);
  font-size: 10px;
}

.save-head strong {
  color: var(--danger);
  font-size: 11px;
}

.lost-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.lost-item {
  display: grid;
  grid-template-columns: 34px 1fr auto;
  align-items: center;
  min-height: 72px;
  padding: 12px;
  border-right: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}

.lost-item:nth-child(2n) {
  border-right: 0;
}

.lost-item:nth-last-child(-n + 2) {
  border-bottom: 0;
}

.lost-item span {
  color: var(--accent);
  font-size: 10px;
}

.lost-item b {
  font-size: 14px;
}

.lost-item i {
  color: var(--ink-3);
  font-size: 10px;
  font-style: normal;
  text-decoration: line-through;
}

.hero {
  margin-top: 38px;
}

.kicker {
  color: var(--accent);
  font-size: 11px;
}

h1 {
  max-width: 8em;
  margin-top: 10px;
  font-size: clamp(38px, 11vw, 52px);
  line-height: 1.03;
  letter-spacing: -0.055em;
}

.prompt {
  max-width: 28em;
  margin-top: 18px;
  color: var(--ink-2);
  font-size: 15px;
  line-height: 1.75;
}

.cta {
  display: flex;
  width: 100%;
  min-height: 56px;
  align-items: center;
  justify-content: center;
  gap: 9px;
  margin-top: 26px;
  border: 0;
  border-radius: var(--radius);
  background: var(--accent);
  color: #171711;
  font-size: 17px;
  font-weight: 900;
  cursor: pointer;
  box-shadow: 0 12px 30px rgba(231, 240, 74, 0.12);
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.cta:active {
  transform: translateY(1px) scale(0.985);
  box-shadow: 0 6px 16px rgba(231, 240, 74, 0.1);
}

.facts {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 16px;
  margin-top: 16px;
  color: var(--ink-3);
  font-size: 10px;
}

.facts span + span::before {
  margin-right: 16px;
  color: var(--line-strong);
  content: '/';
}

.note {
  margin-top: auto;
  padding-top: 34px;
  color: var(--ink-3);
  font-size: 11px;
  line-height: 1.65;
}

@media (max-width: 359px) {
  .home { padding-inline: 14px; }
  .lost-item { grid-template-columns: 28px 1fr; }
  .lost-item i { display: none; }
}
</style>
