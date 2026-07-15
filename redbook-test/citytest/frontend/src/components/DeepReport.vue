<template>
  <section class="dr">
    <div class="dr-head">
      <span class="dr-kicker mono">CITY REPORT · V2</span>
      <h2 class="dr-title">城市偏好深报</h2>
    </div>

    <div class="dr-wrap">
      <div v-if="unlocked" class="dr-content">
        <div class="dr-card">
          <p class="dr-card-label">4 城适配参考</p>
          <div class="matches">
            <div class="match-row" v-for="match in visibleMatches" :key="match.key">
              <div class="match-copy">
                <b>{{ match.name }}</b>
                <span>{{ match.role }} · {{ match.clusterLabel }}</span>
              </div>
              <div class="match-track">
                <i :style="{ width: match.fitScore + '%', background: match.key === report.key ? accent : 'rgba(255,255,255,0.22)' }"></i>
              </div>
              <strong class="mono" :style="{ color: match.key === report.key ? accent : 'var(--ink-2)' }">{{ match.fitScore }}</strong>
            </div>
          </div>
          <p class="dr-footnote">分数是本模型的偏好接近度，不代表城市质量或现实适居排名。</p>
        </div>

        <div class="dr-card">
          <p class="dr-card-label">为什么匹配</p>
          <ul class="dr-list dr-list--ok">
            <li v-for="item in report.whyMatched" :key="item.key">
              <Icon icon="mdi:check-decagram-outline" />
              <span><b>{{ item.label }}</b>{{ item.copy }}</span>
            </li>
          </ul>
        </div>

        <div class="dr-card">
          <p class="dr-card-label">可能不合拍</p>
          <ul class="dr-list dr-list--warn">
            <li v-for="(item, index) in report.realityReminders" :key="index">
              <Icon icon="mdi:alert-octagon-outline" />
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>

        <div class="dr-card">
          <p class="dr-card-label">短住验证清单</p>
          <ol class="check-list">
            <li v-for="(item, index) in report.shortStayChecks" :key="index">
              <span class="mono">{{ String(index + 1).padStart(2, '0') }}</span>
              <p>{{ item }}</p>
            </li>
          </ol>
        </div>
      </div>

      <div class="dr-lock" v-if="!unlocked">
        <span class="dr-lock-icon"><Icon icon="mdi:lock-outline" /></span>
        <p class="dr-lock-title">城市偏好深报未解锁</p>
        <p class="dr-lock-desc">4 城对照 · 匹配理由 · 现实提醒 · 短住验证</p>
        <button class="dr-lock-btn" @click="showCard = true">
          <Icon icon="mdi:key-variant" />
          <span>输入兑换码解锁</span>
        </button>
        <p class="dr-lock-sub">一码解锁商品页列明的 15 项完整报告</p>
      </div>
    </div>

    <CardInput :show="showCard" :product="product" @close="showCard = false" @unlocked="onUnlocked" />
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import CardInput from './CardInput.vue'
import { useUnlock } from '../composables/useUnlock.js'

const props = defineProps({
  report: { type: Object, required: true },
  matches: { type: Array, default: () => [] },
  accent: { type: String, default: '#52D6B6' },
  product: { type: String, default: 'citytest' },
})

const { unlocked, refresh } = useUnlock(props.product)
const showCard = ref(false)
const visibleMatches = computed(() => props.matches.slice(0, 4))

function onUnlocked() {
  refresh()
}
</script>

<style scoped>
.dr { padding: 30px 16px 0; }
.dr-head { text-align: center; margin-bottom: 16px; }
.dr-kicker { font-size: 10.5px; letter-spacing: 2.5px; color: var(--accent); }
.dr-title { margin-top: 3px; font-size: 20px; font-weight: 850; color: var(--ink); }
.dr-wrap { position: relative; min-height: 620px; }
.dr-content { display: flex; flex-direction: column; gap: 12px; transition: filter 0.4s ease, opacity 0.4s ease; }
.dr-content.is-locked { filter: blur(9px) saturate(0.7); opacity: 0.72; pointer-events: none; user-select: none; }
.dr-card { background: var(--bg-panel); border: 1px solid var(--line); border-radius: var(--radius); padding: 18px 16px; }
.dr-card-label { margin-bottom: 14px; color: var(--ink-2); font-size: 12px; font-weight: 750; letter-spacing: 1px; }
.matches { display: flex; flex-direction: column; gap: 12px; }
.match-row { display: grid; grid-template-columns: 78px 1fr 28px; align-items: center; gap: 10px; }
.match-copy { min-width: 0; display: flex; flex-direction: column; gap: 1px; }
.match-copy b { color: var(--ink); font-size: 13px; }
.match-copy span { color: var(--ink-3); font-size: 9.5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.match-track { height: 8px; overflow: hidden; border-radius: 8px; background: var(--bg-raise); }
.match-track i { display: block; height: 100%; border-radius: inherit; }
.match-row strong { text-align: right; font-size: 12px; }
.dr-footnote { margin-top: 13px; padding-top: 11px; border-top: 1px dashed var(--line); color: var(--ink-3); font-size: 10.5px; line-height: 1.55; }
.dr-list { list-style: none; display: flex; flex-direction: column; gap: 11px; }
.dr-list li { display: flex; align-items: flex-start; gap: 9px; color: var(--ink); font-size: 13.5px; line-height: 1.65; }
.dr-list li b { display: block; margin-bottom: 1px; color: var(--ink-2); font-size: 11px; letter-spacing: 0.5px; }
.dr-list :deep(svg) { flex-shrink: 0; margin-top: 2px; font-size: 17px; }
.dr-list--warn :deep(svg) { color: var(--warn); }
.dr-list--ok :deep(svg) { color: var(--accent); }
.check-list { list-style: none; display: flex; flex-direction: column; gap: 12px; }
.check-list li { display: flex; align-items: flex-start; gap: 10px; }
.check-list span { flex: 0 0 28px; width: 28px; height: 28px; display: grid; place-items: center; border-radius: 8px; background: var(--accent-soft); color: var(--accent); font-size: 10px; font-weight: 800; }
.check-list p { padding-top: 2px; color: var(--ink); font-size: 13.5px; line-height: 1.65; }
.dr-lock {
  position: absolute;
  inset: 0;
  z-index: 2;
  min-height: 620px;
  padding: 26px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: radial-gradient(95% 50% at 50% 46%, rgba(16, 22, 17, 0.62), rgba(16, 22, 17, 0.92));
  border: 1px solid var(--line);
  border-radius: var(--radius);
}
.dr-lock-icon { display: inline-flex; color: var(--accent); font-size: 34px; }
.dr-lock-title { margin-top: 8px; color: var(--ink); font-size: 18px; font-weight: 850; }
.dr-lock-desc { margin-top: 6px; color: var(--ink-2); font-size: 12.5px; line-height: 1.6; }
.dr-lock-btn { margin-top: 18px; padding: 13px 26px; border: none; border-radius: 50px; background: linear-gradient(135deg, var(--accent), var(--accent-2)); color: #071913; display: inline-flex; align-items: center; gap: 7px; font-family: inherit; font-size: 15px; font-weight: 850; cursor: pointer; box-shadow: 0 10px 30px rgba(54, 241, 166, 0.28); }
.dr-lock-btn:active { transform: scale(0.96); }
.dr-lock-btn:focus-visible { outline: 3px solid var(--accent-soft); outline-offset: 3px; }
.dr-lock-sub { margin-top: 12px; color: var(--ink-3); font-size: 11px; }
</style>
