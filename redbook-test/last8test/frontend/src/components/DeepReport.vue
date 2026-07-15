<template>
  <section class="deep-report" aria-labelledby="deep-title">
    <div class="deep-heading">
      <p>完整报告</p>
      <h2 id="deep-title">你的决策减载说明书</h2>
    </div>

    <div class="deep-wrap">
      <div v-if="unlocked" class="deep-content">
        <article>
          <h3>行动排序依据</h3>
          <ol>
            <li v-for="item in report.actionBasis" :key="item">{{ item }}</li>
          </ol>
        </article>

        <article>
          <h3>经常被推迟的需求</h3>
          <p>{{ report.delayedNeed }}</p>
        </article>

        <article>
          <h3>决策过载三步清单</h3>
          <ol class="steps">
            <li v-for="item in report.overloadChecklist" :key="item">{{ item }}</li>
          </ol>
        </article>
      </div>

      <div v-if="!unlocked" class="deep-lock">
        <span class="lock-mark" aria-hidden="true">LOCKED</span>
        <h3>完整深报尚未解锁</h3>
        <p>行动依据、被推迟的需求、决策过载三步清单</p>
        <button type="button" @click="showCard = true">输入兑换码</button>
        <small>1.9元万能卡，同一浏览器解锁15项测试深报</small>
      </div>
    </div>

    <CardInput
      :show="showCard"
      product="last8test"
      @close="showCard = false"
      @unlocked="handleUnlocked"
    />
  </section>
</template>

<script setup>
import { ref } from 'vue'
import CardInput from './CardInput.vue'
import { useUnlock } from '../composables/useUnlock.js'

defineProps({
  report: { type: Object, required: true },
})

const { unlocked, refresh } = useUnlock('last8test')
const showCard = ref(false)

function handleUnlocked() {
  refresh()
}
</script>

<style scoped>
.deep-report { margin-top: 28px; }

.deep-heading { margin-bottom: 14px; }
.deep-heading p {
  margin: 0 0 4px;
  color: var(--charge);
  font: 700 11px/1.4 var(--font-mono);
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.deep-heading h2 { margin: 0; font-size: 23px; line-height: 1.25; }

.deep-wrap { position: relative; min-height: 470px; }
.deep-content { display: grid; gap: 12px; }
article {
  padding: 18px;
  border: 1px solid var(--line);
  border-radius: var(--radius-panel);
  background: var(--surface);
}

h3 { margin: 0 0 12px; font-size: 15px; }
p, li { color: var(--text-secondary); font-size: 13.5px; line-height: 1.72; }
article p { margin: 0; }
ol { display: grid; gap: 9px; margin: 0; padding-left: 20px; }
.steps li::marker { color: var(--charge); font-weight: 800; }

.deep-lock {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 26px;
  border: 1px solid var(--line-strong);
  border-radius: var(--radius-panel);
  background: rgb(20 21 22 / 91%);
  text-align: center;
}
.lock-mark {
  display: grid;
  place-items: center;
  width: 72px;
  height: 42px;
  border: 1px solid var(--charge);
  border-radius: var(--radius-control);
  color: var(--charge);
  font: 800 10px/1 var(--font-mono);
  letter-spacing: 0.12em;
}
.deep-lock h3 { margin: 16px 0 0; font-size: 20px; }
.deep-lock p { max-width: 270px; margin: 8px 0 0; }
.deep-lock button {
  min-width: 176px;
  min-height: 48px;
  margin-top: 20px;
  border: 1px solid var(--charge);
  border-radius: var(--radius-control);
  background: var(--charge);
  color: #102016;
  font-weight: 850;
}
.deep-lock small { margin-top: 10px; color: var(--text-muted); font-size: 11px; line-height: 1.5; }
</style>
