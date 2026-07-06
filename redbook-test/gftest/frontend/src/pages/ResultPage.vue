<template>
  <div class="result" v-if="topTag">
    <span class="r-halftone" aria-hidden="true"></span>

    <!-- 杂志人格卡 -->
    <section class="zcard rise" style="animation-delay: 40ms">
      <div class="zcard-head">
        <span class="zcard-pub mono"><Icon icon="mdi:newspaper-variant-outline" /> 恋爱人格 · 本期人设</span>
        <span class="zcard-issue mono">ISSUE 2026</span>
      </div>
      <span class="zcard-grade">本期评级 {{ grade.label }}</span>
      <h1 class="zcard-name">{{ topTag.name }}</h1>
      <p class="zcard-tag">{{ topTag.desc }}</p>
      <span class="zcard-sticker"><Icon icon="mdi:account-heart-outline" /></span>
    </section>

    <!-- 五维人格雷达 -->
    <section class="block rise" style="animation-delay: 140ms">
      <p class="block-label mono"><Icon icon="mdi:chart-arc" /> 五维人格雷达</p>
      <div class="radar-wrap">
        <PersonaRadar :dims="dims" :order="DIM_ORDER" />
      </div>
    </section>

    <!-- 人格标签贴纸 -->
    <section class="block rise" style="animation-delay: 220ms" v-if="cleanTags.length">
      <p class="block-label mono"><Icon icon="mdi:tag-heart-outline" /> 本期人设标签</p>
      <div class="stickers">
        <span v-for="(t, i) in cleanTags" :key="t" class="sticker" :class="'s-' + (i % 4)">{{ t }}</span>
      </div>
    </section>

    <!-- 编辑评语 -->
    <section class="block rise" style="animation-delay: 300ms">
      <p class="block-label mono"><Icon icon="mdi:comment-quote-outline" /> 编辑手记</p>
      <div class="editor-card">
        <p>{{ cleanDesc }}</p>
      </div>
    </section>

    <!-- 操作 -->
    <div class="actions rise" style="animation-delay: 380ms">
      <button class="act retake" @click="retake"><Icon icon="mdi:restart" /> 重新测</button>
      <button class="act share" @click="showShare = true"><Icon icon="mdi:image-outline" /> 生成人格刊</button>
    </div>

    <!-- 连贯引流：带人设去测契合度 -->
    <section class="convert rise" style="animation-delay: 440ms">
      <p class="convert-hint mono">带着「{{ topTag.name }}」去测你俩</p>
      <button class="convert-btn" @click="goMatch">
        <span class="convert-ic"><Icon icon="mdi:heart-multiple-outline" /></span>
        <span class="convert-tx">
          <strong>测测你俩的契合度</strong>
          <small>已自动带入你的人设，去匹配他的画像，秒算默契指数</small>
        </span>
        <Icon class="convert-arr" icon="mdi:chevron-right" />
      </button>
    </section>

    <MoreTests current="gftest" />
    <p class="disclaimer">* 本测试由 AI 生成，仅供娱乐参考，不代表真实情况。</p>

    <!-- 分享人格刊 -->
    <transition name="ov">
      <div v-if="showShare" class="sh-overlay" @click="showShare = false">
        <div class="sh-modal" @click.stop>
          <div class="sh-card" ref="shareCardRef">
            <span class="sh-halftone" aria-hidden="true"></span>
            <div class="sh-head mono"><span>LOVE PERSONA</span><b>ISSUE 2026</b></div>
            <span class="sh-grade">本期评级 {{ grade.label }}</span>
            <h2 class="sh-name">{{ topTag.name }}</h2>
            <p class="sh-tagline">{{ topTag.desc }}</p>
            <ul class="sh-dims">
              <li v-for="k in DIM_ORDER" :key="k">
                <span>{{ k }}</span>
                <span class="sh-bar"><i :style="{ width: (dims[k] || 50) + '%' }"></i></span>
                <b class="mono">{{ Math.round(dims[k] || 50) }}</b>
              </li>
            </ul>
            <div class="sh-stickers">
              <span v-for="t in cleanTags.slice(0, 3)" :key="t">{{ t }}</span>
            </div>
            <div class="sh-foot">
              <span class="sh-seal"><Icon icon="mdi:account-heart-outline" /></span>
              <div class="sh-brand">
                <p>恋爱人格 · LOVE PERSONA</p>
                <p class="sh-brand-sub mono">扫码测你是哪种恋爱人格</p>
              </div>
            </div>
          </div>
          <div class="sh-acts">
            <button class="sh-save" @click="saveCard"><Icon icon="mdi:download" /> 保存图片</button>
            <button class="sh-close" @click="showShare = false">关闭</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import MoreTests from '../components/MoreTests.vue'
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Icon from '../components/Icon.vue'
import PersonaRadar from '../components/PersonaRadar.vue'
import { computeTopTag, computeDimensions, getResult } from '../data/questions.js'

const router = useRouter()
const route = useRoute()

const DIM_ORDER = ['体贴度', '浪漫度', '安全感', '趣味度', '坦诚度']

const total = Number(route.query.total) || 0
let answers = []
try { answers = JSON.parse(route.query.answers) || [] } catch (e) { answers = [] }
if (!answers.length && route.query.debug) {
  answers = Array.from({ length: 16 }, (_, i) => ({ questionId: i + 1, score: 2, tags: [route.query.debug], text: 'debug' }))
}

const topTag = computed(() => (answers.length ? computeTopTag(answers) : null))
const dims = computed(() => computeDimensions(answers))
const grade = computed(() => {
  const r = getResult(total)
  return { label: r.grade, raw: r }
})

function stripEmoji(s) {
  return String(s || '').replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2190}-\u{21FF}\u{2B00}-\u{2BFF}#️‍]/gu, '').trim()
}
const cleanDesc = computed(() => getResult(total).description)
const cleanTags = computed(() => (getResult(total).tags || []).map(stripEmoji).filter(Boolean))

const showShare = ref(false)
const shareCardRef = ref(null)

if (!answers.length && !route.query.debug) {
  router.replace('/')
}

// 连贯：把女友人设带去 cptest
function persistPersona(side, key) {
  if (!key) return
  const enc = encodeURIComponent(key)
  try { localStorage.setItem(`xpytt_persona_${side}`, key) } catch (_) {}
  const maxAge = 60 * 60 * 24 * 180
  document.cookie = `xpytt_${side}=${enc}; Max-Age=${maxAge}; Path=/; SameSite=Lax`
  document.cookie = `xpytt_${side}=${enc}; Max-Age=${maxAge}; Path=/; Domain=.xpytt.com; SameSite=Lax`
}

const cpBase = import.meta.env.VITE_NEXT_PRODUCT_URL || 'https://cp.xpytt.com'
function goMatch() {
  const key = topTag.value?.key
  persistPersona('gf', key)
  const url = key ? `${cpBase}#/?gf=${encodeURIComponent(key)}` : cpBase
  window.open(url, '_blank', 'noopener,noreferrer')
}

function retake() { router.replace('/quiz') }

async function saveCard() {
  if (!shareCardRef.value) return
  try {
    const { default: html2canvas } = await import('html2canvas')
    const canvas = await html2canvas(shareCardRef.value, { scale: 2, backgroundColor: '#faf6ef', useCORS: true })
    const link = document.createElement('a')
    link.download = '恋爱人格刊.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  } catch (e) {
    alert('保存失败，请截图保存。')
  }
}
</script>

<style scoped>
.result {
  --mag-white: #faf6ef;
  --surface: #ffffff;
  --ink: #1a1714;
  --ink-2: #8a8076;
  --ink-3: #b3a89c;
  --magenta: #e84576;
  --magenta-deep: #c9356a;
  --magenta-soft: rgba(232, 69, 118, 0.1);
  --line: rgba(26, 23, 20, 0.14);
  --yellow: #f4c430;
  --blue: #3aa6b9;
  --green: #5fa85f;
  --mono: 'SFMono-Regular', ui-monospace, 'JetBrains Mono', Consolas, monospace;
  position: relative;
  min-height: 100vh;
  max-width: 480px;
  margin: 0 auto;
  background: var(--mag-white);
  padding: 14px 16px 36px;
  overflow: hidden;
}
.mono { font-family: var(--mono); font-variant-numeric: tabular-nums; letter-spacing: 0.3px; }
.r-halftone { position: absolute; inset: 0; pointer-events: none; z-index: 0; opacity: 0.4;
  background-image: radial-gradient(color-mix(in srgb, var(--magenta) 20%, transparent) 0.7px, transparent 0.7px); background-size: 8px 8px;
  -webkit-mask-image: linear-gradient(180deg, #000 0%, transparent 30%); mask-image: linear-gradient(180deg, #000 0%, transparent 30%); }
.result > *:not(.r-halftone) { position: relative; z-index: 1; }

.rise { opacity: 0; animation: r-rise 0.6s cubic-bezier(0.32, 0.72, 0, 1) forwards; }
@keyframes r-rise { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }

/* 杂志人格卡 */
.zcard { position: relative; background: var(--surface); border: 1.5px solid var(--ink); border-radius: 16px; padding: 18px; box-shadow: 6px 6px 0 var(--magenta); overflow: hidden; }
.zcard-head { display: flex; align-items: center; justify-content: space-between; font-size: 10.5px; color: var(--ink-2); }
.zcard-pub { display: inline-flex; align-items: center; gap: 5px; }
.zcard-pub svg { color: var(--magenta); font-size: 14px; }
.zcard-grade { display: inline-block; font-size: 11px; font-weight: 800; color: #fff; background: var(--magenta); padding: 3px 11px; border-radius: 4px; margin-top: 14px; transform: rotate(-1.5deg); }
.zcard-name { font-size: 40px; font-weight: 900; color: var(--ink); line-height: 1.04; letter-spacing: -0.02em; margin: 12px 0 6px; }
.zcard-tag { font-size: 14px; color: var(--ink-2); line-height: 1.5; max-width: 78%; }
.zcard-sticker { position: absolute; right: 14px; bottom: 12px; width: 60px; height: 60px; border-radius: 14px; background: var(--magenta-soft); color: var(--magenta); display: grid; place-items: center; font-size: 32px; transform: rotate(6deg); border: 1.5px solid var(--magenta); }

.block { margin-top: 22px; }
.block-label { font-size: 11px; color: var(--ink-3); display: flex; align-items: center; gap: 5px; margin-bottom: 12px; padding-left: 2px; }
.block-label svg { color: var(--magenta); font-size: 14px; }
.radar-wrap { background: var(--surface); border: 1.5px solid var(--ink); border-radius: 16px; padding: 26px 16px 18px; }

.stickers { display: flex; flex-wrap: wrap; gap: 9px; }
.sticker { font-size: 12.5px; font-weight: 800; color: var(--ink); background: var(--surface); border: 1.5px solid var(--ink); padding: 6px 12px; border-radius: 999px; box-shadow: 2px 2px 0 var(--magenta-soft); }
.sticker.s-0 { border-color: var(--magenta); color: var(--magenta); }
.sticker.s-1 { border-color: var(--yellow); }
.sticker.s-2 { border-color: var(--blue); }
.sticker.s-3 { border-color: var(--green); }

.editor-card { background: var(--surface); border: 1.5px solid var(--ink); border-radius: 14px; padding: 18px 16px; }
.editor-card p { font-size: 14.5px; line-height: 1.75; color: var(--ink); }

.actions { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 22px; }
.act { height: 50px; border: none; border-radius: 13px; display: flex; align-items: center; justify-content: center; gap: 7px; font-size: 15px; font-weight: 800; }
.act:active { transform: scale(0.97); }
.retake { background: #efe8da; color: var(--ink); }
.share { background: var(--ink); color: var(--mag-white); box-shadow: 4px 4px 0 var(--magenta); }

.convert { margin-top: 20px; }
.convert-hint { font-size: 11px; color: var(--ink-3); text-align: center; margin-bottom: 8px; }
.convert-btn { width: 100%; border: 1.5px solid var(--ink); background: var(--surface); border-radius: 14px; padding: 14px; display: grid; grid-template-columns: 44px 1fr 22px; align-items: center; gap: 11px; text-align: left; font-family: inherit; box-shadow: 4px 4px 0 var(--magenta-soft); }
.convert-btn:active { transform: translate(2px, 2px); box-shadow: 2px 2px 0 var(--magenta-soft); }
.convert-ic { width: 44px; height: 44px; border-radius: 12px; background: var(--magenta); color: #fff; display: grid; place-items: center; font-size: 22px; }
.convert-tx strong { display: block; font-size: 15px; color: var(--ink); }
.convert-tx small { display: block; font-size: 12px; color: var(--ink-2); line-height: 1.45; margin-top: 2px; }
.convert-arr { color: var(--ink-3); font-size: 20px; }

.disclaimer { text-align: center; font-size: 12px; color: var(--ink-3); padding: 22px 16px 0; }

/* 分享人格刊 */
.sh-overlay { position: fixed; inset: 0; z-index: 200; background: rgba(26, 23, 20, 0.55); display: grid; place-items: center; padding: 18px; }
.sh-modal { width: min(350px, 100%); }
.sh-card { position: relative; background: var(--mag-white); border: 1.5px solid var(--ink); border-radius: 16px; padding: 22px 20px; overflow: hidden; box-shadow: 6px 6px 0 var(--magenta); }
.sh-halftone { position: absolute; inset: 0; pointer-events: none; opacity: 0.4;
  background-image: radial-gradient(color-mix(in srgb, var(--magenta) 22%, transparent) 0.8px, transparent 1px); background-size: 9px 9px;
  -webkit-mask-image: linear-gradient(160deg, #000, transparent 55%); mask-image: linear-gradient(160deg, #000, transparent 55%); }
.sh-card > * { position: relative; }
.sh-head { display: flex; align-items: center; justify-content: space-between; font-size: 10.5px; color: var(--ink-2); font-weight: 700; }
.sh-grade { display: inline-block; font-size: 11px; font-weight: 800; color: #fff; background: var(--magenta); padding: 3px 11px; border-radius: 4px; margin-top: 14px; transform: rotate(-1.5deg); }
.sh-name { font-size: 34px; font-weight: 900; color: var(--ink); line-height: 1.05; margin: 12px 0 6px; }
.sh-tagline { font-size: 13px; color: var(--ink-2); line-height: 1.5; }
.sh-dims { list-style: none; margin: 16px 0 0; display: flex; flex-direction: column; gap: 7px; }
.sh-dims li { display: grid; grid-template-columns: 52px 1fr 26px; align-items: center; gap: 8px; font-size: 11px; color: var(--ink-2); }
.sh-bar { height: 7px; background: #ece4d6; border-radius: 99px; overflow: hidden; }
.sh-bar i { display: block; height: 100%; background: var(--magenta); border-radius: inherit; }
.sh-dims b { font-size: 11px; color: var(--magenta); text-align: right; }
.sh-stickers { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 14px; }
.sh-stickers span { font-size: 11px; font-weight: 700; color: var(--magenta); border: 1.5px solid var(--magenta); border-radius: 999px; padding: 3px 9px; }
.sh-foot { display: flex; align-items: center; gap: 10px; border-top: 1.5px solid var(--line); margin-top: 16px; padding-top: 14px; }
.sh-seal { width: 38px; height: 38px; border-radius: 10px; background: var(--magenta-soft); color: var(--magenta); display: grid; place-items: center; font-size: 22px; }
.sh-brand p { font-size: 13px; font-weight: 800; color: var(--ink); margin: 0; }
.sh-brand-sub { font-size: 10.5px; color: var(--ink-3) !important; font-weight: 400 !important; margin-top: 2px !important; }
.sh-acts { display: grid; grid-template-columns: 1fr 86px; gap: 10px; margin-top: 12px; }
.sh-acts button { height: 46px; border: none; border-radius: 12px; font-size: 15px; font-weight: 800; display: flex; align-items: center; justify-content: center; gap: 6px; }
.sh-save { background: var(--ink); color: var(--mag-white); }
.sh-close { background: var(--surface); color: var(--ink); border: 1.5px solid var(--ink); }
.ov-enter-active, .ov-leave-active { transition: opacity 0.24s ease; }
.ov-enter-from, .ov-leave-to { opacity: 0; }
</style>
