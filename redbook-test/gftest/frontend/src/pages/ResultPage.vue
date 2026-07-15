<template>
  <div class="result" v-if="topTag">
    <span class="r-halftone" aria-hidden="true"></span>

    <!-- 杂志风格卡 -->
    <section class="zcard rise" style="animation-delay: 40ms">
      <div class="zcard-head">
        <span class="zcard-pub mono"><Icon icon="mdi:newspaper-variant-outline" /> 恋爱风格 · 本期档案</span>
        <span class="zcard-issue mono">ISSUE 2026</span>
      </div>
      <span class="zcard-grade">本期评级 {{ grade.label }}</span>
      <h1 class="zcard-name">{{ topTag.name }}</h1>
      <p class="zcard-tag">{{ topTag.desc }}</p>
      <span class="zcard-sticker"><Icon icon="mdi:account-heart-outline" /></span>
    </section>

    <!-- 免费操作 -->
    <div class="actions rise" style="animation-delay: 140ms">
      <button class="act retake" @click="retake"><Icon icon="mdi:restart" /> 重新测</button>
      <button class="act share" @click="showShare = true"><Icon icon="mdi:image-outline" /> 生成风格刊</button>
    </div>

    <!-- 深度风格刊（锁） -->
    <section class="deep rise" style="animation-delay: 220ms">
      <p class="block-label mono"><Icon icon="mdi:file-lock-outline" /> 深度风格刊</p>
      <div class="deep-wrap">
        <div class="deep-content" :class="{ 'is-locked': !unlocked }" :aria-hidden="!unlocked">
          <section class="deep-block">
            <p class="block-label mono"><Icon icon="mdi:chart-arc" /> 五维风格雷达</p>
            <div class="radar-wrap">
              <PersonaRadar :dims="dims" :order="DIM_ORDER" />
            </div>
          </section>
          <section class="deep-block">
            <p class="block-label mono"><Icon icon="mdi:chart-box-outline" /> 本次主次维度</p>
            <div class="dimension-card">
              <div class="dimension-pills">
                <span>主维度 · {{ deepReport.primary.name }} {{ deepReport.primary.score }}</span>
                <span>次维度 · {{ deepReport.secondary.name }} {{ deepReport.secondary.score }}</span>
              </div>
              <p>{{ deepReport.summary }}</p>
            </div>
          </section>
          <section class="deep-block" v-if="deepReport.evidence.length">
            <p class="block-label mono"><Icon icon="mdi:text-box-search-outline" /> 答题证据</p>
            <ul class="evidence-list">
              <li v-for="item in deepReport.evidence" :key="item">{{ item }}</li>
            </ul>
          </section>
          <section class="deep-block" v-if="cleanTags.length">
            <p class="block-label mono"><Icon icon="mdi:tag-heart-outline" /> 本期风格标签</p>
            <div class="stickers">
              <span v-for="(t, i) in cleanTags" :key="t" class="sticker" :class="'s-' + (i % 4)">{{ t }}</span>
            </div>
          </section>
          <section class="deep-block">
            <p class="block-label mono"><Icon icon="mdi:comment-quote-outline" /> 编辑手记</p>
            <div class="editor-card">
              <p>{{ cleanDesc }}</p>
              <p class="editor-advice">下一步：{{ deepReport.advice }}</p>
              <small>{{ deepReport.note }}</small>
            </div>
          </section>
        </div>
        <div v-if="!unlocked" class="deep-lock">
          <span class="deep-lock-icon"><Icon icon="mdi:lock-outline" /></span>
          <strong>完整风格刊已生成</strong>
          <p>五维雷达 · 主次维度 · 答题证据 · 编辑手记</p>
          <button @click="showCard = true"><Icon icon="mdi:key-variant" /> 输入兑换码解锁</button>
          <small>1.9元·15测万能卡，首次激活后同浏览器通用</small>
        </div>
      </div>
      <CardInput :show="showCard" product="gftest" @close="showCard = false" @unlocked="onUnlocked" />
    </section>

    <!-- 连贯引流：带人设去测契合度 -->
    <section class="convert rise" style="animation-delay: 440ms">
      <p class="convert-hint mono">带着「{{ topTag.name }}」去测你俩</p>
      <button class="convert-btn" @click="goMatch">
        <span class="convert-ic"><Icon icon="mdi:heart-multiple-outline" /></span>
        <span class="convert-tx">
          <strong>测测你俩的契合度</strong>
          <small>已自动带入你的风格，去匹配 TA 的画像，计算互动默契</small>
        </span>
        <Icon class="convert-arr" icon="mdi:chevron-right" />
      </button>
    </section>

    <MoreTests current="gftest" />
    <p class="disclaimer">* 本测试由 AI 生成，仅供娱乐参考，不构成心理判断或现实关系建议。</p>

    <!-- 分享风格刊 -->
    <transition name="ov">
      <div v-if="showShare" class="sh-overlay" @click="showShare = false">
        <div class="sh-modal" @click.stop>
          <div class="sh-card" ref="shareCardRef">
            <span class="sh-halftone" aria-hidden="true"></span>
            <div class="sh-head mono"><span>LOVE STYLE</span><b>ISSUE 2026</b></div>
            <span class="sh-grade">本期评级 {{ grade.label }}</span>
            <h2 class="sh-name">{{ topTag.name }}</h2>
            <p class="sh-tagline">{{ topTag.desc }}</p>
            <p class="sh-preview mono">五维图谱与编辑手记已生成</p>
            <div class="sh-foot">
              <span class="sh-seal"><Icon icon="mdi:account-heart-outline" /></span>
              <div class="sh-brand">
                <p>恋爱风格 · LOVE STYLE</p>
                <p class="sh-brand-sub mono">扫码测你是哪种恋爱风格</p>
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
import CardInput from '../components/CardInput.vue'
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Icon from '../components/Icon.vue'
import PersonaRadar from '../components/PersonaRadar.vue'
import { buildDeepReport, computeTopTag, computeDimensions, getResult } from '../data/questions.js'

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
const deepReport = computed(() => buildDeepReport(answers))
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
const showCard = ref(false)
const unlocked = ref(false)

function isProductUnlocked(product) {
  try {
    const state = JSON.parse(localStorage.getItem('unlocked') || '{}')
    if (state === true || state?.[product]?.unlocked || state?.[product]) return true
  } catch (_) {}
  return document.cookie.split(';').some((item) => item.trim() === 'xpytt_unlocked=1')
}

function refreshUnlock() {
  unlocked.value = isProductUnlocked('gftest')
}

function onUnlocked() {
  refreshUnlock()
}

onMounted(refreshUnlock)

if (!answers.length && !route.query.debug) {
  router.replace('/')
}

// 连贯：把恋爱风格带去 cptest
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
    link.download = '恋爱风格刊.png'
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

/* 杂志风格卡 */
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
.dimension-card, .evidence-list { background: var(--surface); border: 1.5px solid var(--ink); border-radius: 14px; padding: 15px; }
.dimension-pills { display: flex; flex-wrap: wrap; gap: 7px; margin-bottom: 10px; }
.dimension-pills span { border: 1px solid var(--magenta); border-radius: 999px; padding: 4px 9px; color: var(--magenta); font-size: 11.5px; font-weight: 800; }
.dimension-card p, .evidence-list li { font-size: 13px; line-height: 1.65; color: var(--ink); }
.evidence-list { list-style: none; display: grid; gap: 9px; }
.evidence-list li::before { content: '↳'; color: var(--magenta); font-weight: 900; margin-right: 6px; }
.editor-card .editor-advice { margin-top: 10px; padding-top: 10px; border-top: 1px solid var(--line); color: var(--magenta-deep); font-weight: 700; }
.editor-card small { display: block; margin-top: 10px; color: var(--ink-3); font-size: 10.5px; line-height: 1.55; }

/* 深度风格刊 */
.deep { margin-top: 24px; }
.deep > .block-label { margin-bottom: 12px; }
.deep-wrap { position: relative; min-height: 760px; }
.deep-content { transition: filter 0.35s ease, opacity 0.35s ease; }
.deep-content.is-locked { filter: blur(9px) saturate(0.7); opacity: 0.68; pointer-events: none; user-select: none; }
.deep-block + .deep-block { margin-top: 22px; }
.deep-lock { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 24px; text-align: center; border: 1.5px solid var(--ink); border-radius: 16px; background: rgba(250, 246, 239, 0.84); backdrop-filter: blur(2px); }
.deep-lock-icon { display: grid; place-items: center; width: 46px; height: 46px; border-radius: 12px; background: var(--magenta-soft); color: var(--magenta); font-size: 25px; border: 1.5px solid var(--magenta); transform: rotate(-2deg); }
.deep-lock strong { margin-top: 11px; color: var(--ink); font-size: 18px; }
.deep-lock p { margin-top: 6px; color: var(--ink-2); font-size: 12.5px; }
.deep-lock button { display: inline-flex; align-items: center; justify-content: center; gap: 7px; margin-top: 18px; padding: 13px 23px; border: none; border-radius: 12px; background: var(--ink); color: var(--mag-white); font: inherit; font-size: 14px; font-weight: 800; box-shadow: 4px 4px 0 var(--magenta); }
.deep-lock button:active { transform: translate(2px, 2px); box-shadow: 2px 2px 0 var(--magenta); }
.deep-lock small { margin-top: 11px; color: var(--ink-3); font-size: 10.5px; }

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

/* 分享风格刊 */
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
.sh-preview { margin-top: 16px; border: 1.5px dashed var(--magenta); border-radius: 10px; padding: 10px 12px; color: var(--magenta); font-size: 10.5px; letter-spacing: 0.5px; text-align: center; }
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
