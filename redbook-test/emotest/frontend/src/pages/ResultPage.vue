<template>
  <div class="result tasks" v-if="report"><header class="r-status"><span class="rec"><i></i> 报告完成</span><span class="mono code">{{ report.band.code }}</span></header><section class="result-hero" v-motion="{ initial: { opacity: 0, y: 16 }, enter: { opacity: 1, y: 0, transition: { delay: 80 } } }"><div class="result-mark"><Icon icon="mdi:brain" /></div><div class="score mono" :style="{ color: report.band.accent }">{{ disp }}<small v-if="showPercent">%</small></div><p>内耗指数</p></section><section class="persona"><h1 :style="{ color: report.band.accent }">{{ report.band.name }}</h1><span>{{ report.band.aka }}</span><p>{{ report.band.verdict }}</p><div class="tags"><b v-for="tag in report.band.tags" :key="tag">{{ tag }}</b></div></section><div class="actions"><button class="act share" @click="showShare = true"><Icon icon="mdi:image-outline" /> 生成结果卡</button><button class="act retake" @click="retake"><Icon icon="mdi:restart" /> 重新扫描</button></div><DeepReport :report="report.band.deep" :dims="report.dims" :accent="report.band.accent" /><section class="convert"><p class="mono">下一站</p><button @click="goNext"><span><Icon icon="mdi:heart-pulse" /></span><div><strong>社交电量测试</strong><small>后台降载后，顺手看看社交电池还剩多少</small></div><Icon icon="mdi:chevron-right" /></button></section><MoreTests current="emotest" />
    <p class="disclaimer">本测试仅供娱乐和轻量自我观察，不构成专业心理咨询、医学建议或现实关系判断。</p><transition name="ov"><div v-if="showShare" class="sh-overlay" @click="showShare = false"><div class="sh-modal" @click.stop><div class="sh-card" ref="shareCardRef"><div class="sh-head"><span>情绪后台任务报告</span><b class="mono">{{ report.band.code }}</b></div><div class="sh-score mono" :style="{ color: report.band.accent }">{{ report.index }}<small v-if="showPercent">%</small></div><h2 :style="{ color: report.band.accent }">{{ report.band.name }}</h2><p class="sh-aka">{{ report.band.aka }}</p><p class="sh-verdict">{{ report.band.verdict }}</p><div class="sh-tags"><span v-for="tag in report.band.tags" :key="tag">{{ tag }}</span></div><footer><Icon icon="mdi:brain" /><div><p>小红书搜「情绪后台占用」</p><small>看看你的后台进程占用多少</small></div></footer></div><div class="sh-acts"><button @click="saveCard"><Icon icon="mdi:download" /> 保存图片</button><button @click="showShare = false">关闭</button></div></div></div></transition></div>
</template>
<script setup>
import MoreTests from '../components/MoreTests.vue'
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import gsap from 'gsap'
import { computeReport } from '../data/quiz.js'
import DeepReport from '../components/DeepReport.vue'
const router = useRouter(); const route = useRoute(); let answers = []
try { answers = JSON.parse(route.query.a || '[]') } catch (_) { answers = [] }
const report = computed(() => (answers.length ? computeReport(answers) : null))
const showPercent = computed(() => 'emotest' !== 'lswtest')
const disp = ref(0); const showShare = ref(false); const shareCardRef = ref(null)
onMounted(() => { if (!report.value) { router.replace('/'); return } const state = { value: 0 }; gsap.to(state, { value: report.value.index, duration: 1.25, ease: 'power2.out', delay: 0.18, onUpdate: () => (disp.value = Math.round(state.value)) }) })
function retake() { router.replace('/quiz') }
const nextProductUrl = import.meta.env.VITE_NEXT_PRODUCT_URL || '/'
function goNext() { window.open(nextProductUrl, '_blank', 'noopener,noreferrer') }
async function saveCard() { if (!shareCardRef.value) return; try { const { default: html2canvas } = await import('html2canvas'); const canvas = await html2canvas(shareCardRef.value, { scale: 2, backgroundColor: '#181A17', useCORS: true }); const link = document.createElement('a'); link.download = '情绪内耗报告.png'; link.href = canvas.toDataURL('image/png'); link.click() } catch (_) { alert('保存失败，请截图保存。') } }
</script>
