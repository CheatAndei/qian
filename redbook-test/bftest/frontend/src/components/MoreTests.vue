<template>
  <section class="mt">
    <p class="mt-label">更多测试 · 挑一个发给朋友</p>
    <div class="mt-grid">
      <a v-for="t in others" :key="t.slug" class="mt-card" :href="t.url" target="_blank" rel="noopener noreferrer">
        <span class="mt-dot" :style="{ background: t.accent }"></span>
        <span class="mt-body">
          <b>{{ t.name }}</b>
          <i>{{ t.tag }}</i>
        </span>
        <span class="mt-arr">→</span>
      </a>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({ current: { type: String, default: '' } })

const ALL_TESTS = [
  { slug: 'cptest', name: 'CP 契合度', tag: '你俩有多配', url: 'https://cp.xpytt.com', accent: '#E85D75' },
  { slug: 'lvtest', name: '亲密度等级', tag: '你们到第几级', url: 'https://lv.xpytt.com', accent: '#FF7AA2' },
  { slug: 'citytest', name: '城市磁场测试', tag: '哪座城市最像你', url: 'https://city.xpytt.com', accent: '#76D7FF' },
  { slug: 'bftest', name: '男友资格考试', tag: '他能考几分', url: 'https://bf.xpytt.com', accent: '#D7263D' },
  { slug: 'gftest', name: '恋爱人格测试', tag: '你是哪种女友', url: 'https://gf.xpytt.com', accent: '#E84576' },
  { slug: 'mstest', name: '闷骚指数', tag: '外冷内热档案', url: 'https://ms.xpytt.com', accent: '#B8404E' },
  { slug: 'lovetest', name: '恋爱脑指数', tag: '情感监测仪', url: 'https://lt.xpytt.com', accent: '#FF3B6B' },
  { slug: 'shiptest', name: '单身暧昧状态', tag: '情感雷达', url: 'https://sp.xpytt.com', accent: '#2BC98A' },
  { slug: 'ggtest', name: '闺蜜默契度', tag: '双频共振', url: 'https://gg.xpytt.com', accent: '#C9518A' },
  { slug: 'lswtest', name: '依恋类型', tag: '关系气象站', url: 'https://lsw.xpytt.com', accent: '#B96F61' },
  { slug: 'emotest', name: '情绪内耗指数', tag: '后台任务管理器', url: 'https://emo.xpytt.com', accent: '#DDB95B' },
  { slug: 'eletest', name: '社交电量', tag: '社交电池地图', url: 'https://ele.xpytt.com', accent: '#A4C95A' },
]
const others = computed(() => ALL_TESTS.filter((t) => t.slug !== props.current))
</script>

<style scoped>
.mt { margin-top: 26px; }
.mt-label { font-size: 11px; letter-spacing: 0.5px; color: color-mix(in srgb, currentColor 55%, transparent); text-align: center; margin-bottom: 12px; }
.mt-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.mt-card {
  display: flex; align-items: center; gap: 9px;
  padding: 11px 12px;
  border: 1px solid color-mix(in srgb, currentColor 16%, transparent);
  background: color-mix(in srgb, currentColor 4%, transparent);
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  transition: border-color 0.2s ease, transform 0.2s ease;
}
.mt-card:active { transform: scale(0.97); }
.mt-dot { width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0; }
.mt-body { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 1px; }
.mt-body b { font-size: 12.5px; font-weight: 800; color: currentColor; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.mt-body i { font-style: normal; font-size: 10.5px; color: color-mix(in srgb, currentColor 55%, transparent); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.mt-arr { font-size: 14px; color: color-mix(in srgb, currentColor 35%, transparent); flex-shrink: 0; }
</style>

