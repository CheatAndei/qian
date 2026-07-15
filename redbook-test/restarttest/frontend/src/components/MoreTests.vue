<template>
  <section class="mt">
    <div class="mt-head">
      <p class="mt-label">继续测 · 先看免费结果</p>
      <p class="mt-note">1.9元万能卡 · 同一浏览器解锁15项深报</p>
    </div>
    <div id="more-tests-list" class="mt-grid">
      <a
        v-for="(t, index) in visibleTests"
        :key="t.slug"
        class="mt-card"
        :href="t.url"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span class="mt-dot" :style="{ background: t.accent }"></span>
        <span class="mt-body">
          <span class="mt-title">
            <b>{{ t.name }}</b>
            <em v-if="index === 0" class="mt-rec">推荐</em>
          </span>
          <i>{{ t.tag }}</i>
        </span>
        <svg class="mt-arr" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M4 10h11m-4-4 4 4-4 4" />
        </svg>
      </a>
    </div>
    <button
      v-if="orderedOthers.length > PREVIEW_COUNT"
      class="mt-toggle"
      type="button"
      :aria-expanded="expanded"
      aria-controls="more-tests-list"
      @click="expanded = !expanded"
    >
      {{ expanded ? '收起' : '查看全部' }}
      <svg class="mt-chevron" :class="{ 'is-open': expanded }" viewBox="0 0 20 20" aria-hidden="true">
        <path d="m5 8 5 5 5-5" />
      </svg>
    </button>
  </section>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({ current: { type: String, default: '' } })

const ALL_TESTS = [
  { slug: 'cptest', name: 'CP 契合度', tag: '你俩有多配', url: 'https://cp.xpytt.com', accent: '#E85D75' },
  { slug: 'lvtest', name: '亲密状态', tag: '谁在靠近谁', url: 'https://lv.xpytt.com', accent: '#FF7AA2' },
  { slug: 'citytest', name: '城市磁场测试', tag: '哪座城市最像你', url: 'https://city.xpytt.com', accent: '#76D7FF' },
  { slug: 'bftest', name: '男友资格考试', tag: '他能考几分', url: 'https://bf.xpytt.com', accent: '#D7263D' },
  { slug: 'gftest', name: '恋爱风格测试', tag: '你怎么进入关系', url: 'https://gf.xpytt.com', accent: '#E84576' },
  { slug: 'mstest', name: '隐藏反差值', tag: '外表与内心温差', url: 'https://ms.xpytt.com', accent: '#B8404E' },
  { slug: 'lovetest', name: '心动投入度', tag: '投入与自我保留', url: 'https://lt.xpytt.com', accent: '#FF3B6B' },
  { slug: 'shiptest', name: '情感信号雷达', tag: '看清当前互动状态', url: 'https://sp.xpytt.com', accent: '#2BC98A' },
  { slug: 'ggtest', name: '友情同频度', tag: '默契也尊重差异', url: 'https://gg.xpytt.com', accent: '#C9518A' },
  { slug: 'lswtest', name: '关系靠近方式', tag: '你的默认关系天气', url: 'https://lsw.xpytt.com', accent: '#B96F61' },
  { slug: 'emotest', name: '情绪后台占用', tag: '哪些进程没关', url: 'https://emo.xpytt.com', accent: '#DDB95B' },
  { slug: 'eletest', name: '社交电量', tag: '社交电池地图', url: 'https://ele.xpytt.com', accent: '#A4C95A' },
  { slug: 'trusttest', name: '信任第一反应', tag: '你先依据什么', url: 'https://trust.xpytt.com', accent: '#6E4AE2' },
  { slug: 'last8test', name: '手机最后8%', tag: '有限资源先做什么', url: 'https://last8.xpytt.com', accent: '#E94B4B' },
  { slug: 'restarttest', name: '人生重启能力栈', tag: '清零后先保留什么', url: 'https://restart.xpytt.com', accent: '#B7D400' },
]

const PREVIEW_COUNT = 4
const DEFAULT_ORDER = ['trusttest', 'last8test', 'restarttest', 'cptest']
const RECOMMENDATION_ORDER = {
  bftest: ['trusttest', 'cptest', 'lvtest', 'gftest'],
  gftest: ['trusttest', 'lovetest', 'lswtest', 'cptest'],
  cptest: ['trusttest', 'lvtest', 'shiptest', 'lswtest'],
  mstest: ['last8test', 'shiptest', 'gftest', 'eletest'],
  lovetest: ['trusttest', 'lswtest', 'shiptest', 'emotest'],
  shiptest: ['trusttest', 'cptest', 'lswtest', 'lovetest'],
  ggtest: ['last8test', 'eletest', 'emotest', 'gftest'],
  lswtest: ['trusttest', 'lovetest', 'emotest', 'shiptest'],
  emotest: ['last8test', 'restarttest', 'eletest', 'lswtest'],
  eletest: ['last8test', 'restarttest', 'emotest', 'ggtest'],
  citytest: ['restarttest', 'last8test', 'eletest', 'emotest'],
  lvtest: ['trusttest', 'cptest', 'lswtest', 'shiptest'],
  trusttest: ['last8test', 'restarttest', 'shiptest', 'lswtest'],
  last8test: ['restarttest', 'trusttest', 'eletest', 'emotest'],
  restarttest: ['last8test', 'citytest', 'eletest', 'emotest'],
}

const expanded = ref(false)
const orderedOthers = computed(() => {
  const order = RECOMMENDATION_ORDER[props.current] || DEFAULT_ORDER
  const rank = new Map(order.map((slug, index) => [slug, index]))
  return ALL_TESTS
    .filter((test) => test.slug !== props.current)
    .sort((a, b) => (rank.get(a.slug) ?? 99) - (rank.get(b.slug) ?? 99))
})
const visibleTests = computed(() => (
  expanded.value ? orderedOthers.value : orderedOthers.value.slice(0, PREVIEW_COUNT)
))

watch(() => props.current, () => { expanded.value = false })
</script>

<style scoped>
.mt { margin-top: 26px; }
.mt-head { text-align: center; margin-bottom: 12px; }
.mt-label { margin: 0; font-size: 12px; font-weight: 750; letter-spacing: 0.35px; color: color-mix(in srgb, currentColor 72%, transparent); }
.mt-note { margin: 4px 0 0; font-size: 10.5px; line-height: 1.45; color: color-mix(in srgb, currentColor 48%, transparent); }
.mt-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.mt-card {
  display: flex; align-items: center; gap: 9px;
  padding: 11px 12px;
  border: 1px solid color-mix(in srgb, currentColor 16%, transparent);
  background: color-mix(in srgb, currentColor 4%, transparent);
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  transition: border-color 0.2s ease, background 0.2s ease, transform 0.2s ease;
}
.mt-card:hover { border-color: color-mix(in srgb, currentColor 28%, transparent); background: color-mix(in srgb, currentColor 7%, transparent); }
.mt-card:focus-visible, .mt-toggle:focus-visible { outline: 2px solid color-mix(in srgb, currentColor 55%, transparent); outline-offset: 3px; }
.mt-card:active { transform: scale(0.97); }
.mt-dot { width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0; }
.mt-body { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 1px; }
.mt-title { min-width: 0; display: flex; align-items: center; gap: 5px; }
.mt-body b { font-size: 12.5px; font-weight: 800; color: currentColor; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.mt-body i { font-style: normal; font-size: 10.5px; color: color-mix(in srgb, currentColor 55%, transparent); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.mt-rec { flex-shrink: 0; padding: 1px 4px; border-radius: 3px; background: color-mix(in srgb, currentColor 10%, transparent); font-size: 8px; line-height: 1.4; font-style: normal; font-weight: 700; color: color-mix(in srgb, currentColor 68%, transparent); }
.mt-arr { width: 18px; height: 18px; color: color-mix(in srgb, currentColor 45%, transparent); flex-shrink: 0; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
.mt-toggle {
  display: flex; align-items: center; justify-content: center; gap: 5px;
  width: 100%; min-height: 44px; margin-top: 10px; padding: 8px;
  border: 0; background: transparent; color: color-mix(in srgb, currentColor 58%, transparent);
  font: inherit; font-size: 11px; cursor: pointer;
  transition: color 0.2s ease, transform 0.2s ease;
}
.mt-toggle:hover { color: color-mix(in srgb, currentColor 78%, transparent); }
.mt-toggle:active { transform: translateY(1px); }
.mt-chevron { display: inline-block; width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; transition: transform 0.2s ease; }
.mt-chevron.is-open { transform: rotate(180deg); }
@media (prefers-reduced-motion: reduce) {
  .mt-card, .mt-toggle, .mt-chevron { transition: none; }
}
</style>
