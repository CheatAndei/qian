<template>
  <main v-if="result" class="app-shell result-shell">
    <header class="archive-header">
      <button class="back-button" type="button" @click="retest">重新测试</button>
      <span class="duration">档案已生成</span>
    </header>

    <article class="result-card">
      <p class="file-label">信任第一反应</p>
      <h1>{{ result.title }}</h1>
      <div class="type-route" aria-label="主型与副型">
        <div>
          <span>主型</span>
          <strong>{{ result.primaryType.name }}</strong>
        </div>
        <span class="route-arrow" aria-hidden="true">→</span>
        <div>
          <span>副型</span>
          <strong>{{ result.secondaryType.name }}</strong>
        </div>
      </div>

      <p class="result-verdict">{{ result.verdict }}</p>
      <div class="tag-row" aria-label="结果标签">
        <span v-for="tag in result.tags" :key="tag">{{ tag }}</span>
      </div>

      <section class="free-evidence" aria-labelledby="free-evidence-title">
        <div class="section-heading section-heading--compact">
          <p>免费解读</p>
          <h2 id="free-evidence-title">为什么会得到这个结果</h2>
        </div>
        <p>{{ result.primaryType.principle }}</p>
        <p>你的副型是“{{ result.secondaryType.short }}”。这说明第一道安全门之后，你会继续用另一类信号校准关系。</p>
        <ol>
          <li v-for="item in result.evidence" :key="item.order">
            <span>{{ item.order }}</span>
            {{ item.read }}
          </li>
        </ol>
      </section>
    </article>

    <DeepReport v-if="unlocked" :result="result" />
    <section v-else class="unlock-panel" aria-labelledby="unlock-title">
      <p class="file-label">深度报告已封存</p>
      <h2 id="unlock-title">解锁完整证据链与表达话术</h2>
      <ul>
        <li>三项选择的顺序证据</li>
        <li>更适合你的信任建立方式</li>
        <li>易忽略信号与两句可直接使用的话术</li>
      </ul>
      <button ref="unlockButton" class="primary-button primary-button--wide" type="button" @click="showRedeem = true">
        输入万能卡兑换码
      </button>
      <p>1.9 元万能卡可解锁 15 项测试深报</p>
    </section>

    <MoreTests current="trusttest" />
    <CardInput
      :show="showRedeem"
      product="trusttest"
      @close="closeRedeem"
      @unlocked="handleUnlocked"
    />
  </main>
</template>

<script setup>
import { computed, nextTick, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import CardInput from '../components/CardInput.vue'
import DeepReport from '../components/DeepReport.vue'
import MoreTests from '../components/MoreTests.vue'
import { useUnlock } from '../composables/useUnlock.js'
import { deriveTrustResult } from '../data/trustModel.js'

const STORAGE_KEY = 'trusttest_selection'
const router = useRouter()
const showRedeem = ref(false)
const unlockButton = ref(null)
const selection = ref(readSelection())
const result = computed(() => deriveTrustResult(selection.value))
const { unlocked, refresh } = useUnlock('trusttest')

onMounted(() => {
  if (!result.value) router.replace('/')
})

function readSelection() {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '[]')
  } catch (_) {
    return []
  }
}

function retest() {
  sessionStorage.removeItem(STORAGE_KEY)
  router.push('/')
}

function handleUnlocked() {
  refresh()
  showRedeem.value = false
}

async function closeRedeem() {
  showRedeem.value = false
  await nextTick()
  unlockButton.value?.focus()
}
</script>
