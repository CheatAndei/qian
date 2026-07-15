<template>
  <div class="result" v-if="result">
    <span class="r-grain" aria-hidden="true"></span>

    <!-- 成绩单 -->
    <section class="report rise" style="animation-delay: 40ms">
      <div class="report-head">
        <span class="report-org mono"><Icon icon="mdi:certificate-outline" /> 男友资格考试 · 成绩单</span>
        <span class="report-no mono">2026</span>
      </div>

      <div class="report-grade">
        <span class="grade-badge">{{ result.grade }}</span>
        <h1 class="report-title">{{ result.title }}</h1>
        <p class="report-sub">{{ result.subtitle }}</p>
      </div>

      <div class="report-score">
        <span class="score-num mono">{{ disp }}</span>
        <span class="score-max mono">/100</span>
        <span class="score-rule"></span>
      </div>
      <div class="report-breakdown mono">
        <span>客观题 {{ objective }}</span><i>+</i><span>主观加分 {{ bonus }}</span>
      </div>

      <!-- 合格 / 重修 印章 -->
      <div class="report-stamp" :class="[pass ? 'pass' : 'fail', { pressed }]">
        <span><b>{{ pass ? '合格' : '重修' }}</b><i class="mono">{{ pass ? 'PASS' : 'RETAKE' }} · {{ total }}</i></span>
      </div>
    </section>

    <!-- 男友画像（试卷档案风） -->
    <section class="portrait rise" style="animation-delay: 140ms" v-if="topTag">
      <p class="block-label mono"><Icon icon="mdi:account-search-outline" /> 男友画像 · 档案</p>
      <div class="portrait-card">
        <span class="portrait-mark"><Icon icon="mdi:account-search-outline" /></span>
        <div class="portrait-info">
          <strong>{{ topTag.name }}</strong>
          <small>{{ topTag.desc }}</small>
        </div>
        <span class="portrait-seal"><Icon icon="mdi:seal-variant" /></span>
      </div>
    </section>

    <!-- 免费操作 -->
    <div class="actions rise" style="animation-delay: 220ms">
      <button class="act retake" @click="retake"><Icon icon="mdi:restart" /> 重新考试</button>
      <button class="act share" @click="showShare = true"><Icon icon="mdi:image-outline" /> 生成成绩单</button>
    </div>

    <!-- 深度档案（锁） -->
    <section class="deep rise" style="animation-delay: 300ms">
      <p class="block-label mono"><Icon icon="mdi:file-lock-outline" /> 深度档案 · 相处观察</p>
      <div class="deep-wrap">
        <div class="deep-content" :class="{ 'is-locked': !unlocked }" :aria-hidden="!unlocked">
          <div class="comment-card">
            <div class="dimension-pills">
              <span>主维度 · {{ deepReport.primary.name }} {{ deepReport.primary.score }}</span>
              <span>次维度 · {{ deepReport.secondary.name }} {{ deepReport.secondary.score }}</span>
            </div>
            <p>{{ deepReport.summary }}</p>
            <ul class="evidence-list" v-if="deepReport.evidence.length">
              <li v-for="item in deepReport.evidence" :key="item">{{ item }}</li>
            </ul>
            <p class="deep-advice">下一步：{{ deepReport.advice }}</p>
            <small class="deep-note">{{ deepReport.note }}</small>
            <div class="tags">
              <span v-for="t in cleanTags" :key="t" class="tag">{{ t }}</span>
            </div>
          </div>
        </div>
        <div v-if="!unlocked" class="deep-lock">
          <span class="deep-lock-icon"><Icon icon="mdi:lock-outline" /></span>
          <strong>完整评审档案已生成</strong>
          <p>主次维度 · 答题证据 · 相处建议</p>
          <button @click="showCard = true"><Icon icon="mdi:key-variant" /> 输入兑换码解锁</button>
          <small>1.9元·15测万能卡，首次激活后同浏览器通用</small>
        </div>
      </div>
      <CardInput :show="showCard" product="bftest" @close="showCard = false" @unlocked="onUnlocked" />
    </section>

    <!-- 引流 -->
    <section class="convert rise" style="animation-delay: 360ms">
      <p class="convert-hint mono">下一场考试</p>
      <button class="convert-btn" @click="goNextProduct">
        <span class="convert-ic"><Icon icon="mdi:heart-multiple-outline" /></span>
        <span class="convert-tx">
          <strong>测测你俩的契合度</strong>
          <small>批完他这张卷，再看看你俩能不能走到最后</small>
        </span>
        <Icon class="convert-arr" icon="mdi:chevron-right" />
      </button>
    </section>

    <MoreTests current="bftest" />
    <p class="disclaimer">* 本测试由 AI 生成，仅供娱乐参考，不构成心理判断或现实关系建议。</p>

    <!-- 分享成绩单 -->
    <transition name="ov">
      <div v-if="showShare" class="sh-overlay" @click="showShare = false">
        <div class="sh-modal" @click.stop>
          <div class="sh-card" ref="shareCardRef">
            <div class="sh-head mono"><span>男友资格考试 · 成绩单</span><b>2026</b></div>
            <div class="sh-grade-row">
              <span class="sh-grade">{{ result.grade }}</span>
              <span class="sh-stamp" :class="pass ? 'pass' : 'fail'">{{ pass ? '合格' : '重修' }}</span>
            </div>
            <h2 class="sh-title">{{ result.title }}</h2>
            <div class="sh-score mono">{{ total }}<small>/100</small></div>
            <div class="sh-portrait" v-if="topTag">
              <Icon icon="mdi:account-search-outline" />
              <span>{{ topTag.name }}</span>
            </div>
            <p class="sh-comment">{{ topTag?.desc || result.subtitle }}</p>
            <div class="sh-foot">
              <span class="sh-seal"><Icon icon="mdi:certificate-outline" /></span>
              <div class="sh-brand">
                <p>男友资格考试 · 2026</p>
                <p class="sh-brand-sub mono">扫码测测你的男友能考几分</p>
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
import gsap from 'gsap'
import Icon from '../components/Icon.vue'
import { buildDeepReport, getResult, computeTopTag } from '../data/questions.js'

const router = useRouter()
const route = useRoute()

const objective = Number(route.query.objective) || 0
const bonus = Number(route.query.bonus) || 0
const total = Number(route.query.total) || objective + bonus
const answersRaw = route.query.answers

let answers = []
try { answers = JSON.parse(answersRaw) || [] } catch (e) { answers = [] }

if (!answers.length && route.query.debug) {
  const tag = route.query.debug
  answers = Array.from({ length: 20 }, (_, i) => ({ questionId: i + 1, score: 2, tags: [tag], text: 'debug' }))
}

const result = computed(() => getResult(total))
const topTag = computed(() => computeTopTag(answers))
const deepReport = computed(() => buildDeepReport(answers))
const pass = computed(() => total >= 60)

// 数据文案保留，展示时剥离 emoji
function stripEmoji(s) {
  return String(s || '').replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2190}-\u{21FF}\u{2B00}-\u{2BFF}️‍]/gu, '').trim()
}
const cleanTags = computed(() => (result.value?.tags || []).map(stripEmoji).filter(Boolean))

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
  unlocked.value = isProductUnlocked('bftest')
}

function onUnlocked() {
  refreshUnlock()
}

const disp = ref(total)
const pressed = ref(false)

const reduced =
  typeof window !== 'undefined' && window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

onMounted(() => {
  refreshUnlock()
  if (!route.query.total && answers.length === 0) {
    router.replace('/')
    return
  }
  if (reduced) { pressed.value = true; return }
  disp.value = 0
  const s = { v: 0 }
  gsap.to(s, { v: total, duration: 1.5, ease: 'power2.out', delay: 0.3, onUpdate: () => (disp.value = Math.round(s.v)) })
  setTimeout(() => (pressed.value = true), 1500)
})

function retake() { router.replace('/quiz') }

// 连贯：把男友画像带去 cptest 匹配
function persistPersona(side, key) {
  if (!key) return
  const enc = encodeURIComponent(key)
  try { localStorage.setItem(`xpytt_persona_${side}`, key) } catch (_) {}
  const maxAge = 60 * 60 * 24 * 180
  document.cookie = `xpytt_${side}=${enc}; Max-Age=${maxAge}; Path=/; SameSite=Lax`
  document.cookie = `xpytt_${side}=${enc}; Max-Age=${maxAge}; Path=/; Domain=.xpytt.com; SameSite=Lax`
}

const cpBase = import.meta.env.VITE_NEXT_PRODUCT_URL || 'https://cp.xpytt.com'
function goNextProduct() {
  const key = topTag.value?.key
  persistPersona('bf', key)
  const url = key ? `${cpBase}#/?bf=${encodeURIComponent(key)}` : cpBase
  window.open(url, '_blank', 'noopener,noreferrer')
}

async function saveCard() {
  if (!shareCardRef.value) return
  try {
    const { default: html2canvas } = await import('html2canvas')
    const canvas = await html2canvas(shareCardRef.value, { scale: 2, backgroundColor: '#fffdf7', useCORS: true })
    const link = document.createElement('a')
    link.download = '男友资格考试-成绩单.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  } catch (e) {
    alert('保存失败，请截图保存。')
  }
}
</script>

<style scoped>
.result {
  --paper: #f6f2e9;
  --surface: #fffdf7;
  --ink: #2a2622;
  --ink-2: #6f665d;
  --ink-3: #9a9087;
  --red: #d7263d;
  --red-deep: #c0202e;
  --red-soft: rgba(215, 38, 61, 0.1);
  --line: rgba(42, 38, 34, 0.12);
  --line-strong: rgba(42, 38, 34, 0.22);
  --ok: #2f9e44;
  --mono: 'SFMono-Regular', ui-monospace, 'JetBrains Mono', Consolas, monospace;
  position: relative;
  min-height: 100vh;
  max-width: 480px;
  margin: 0 auto;
  background: var(--paper);
  padding: 14px 16px 36px;
  overflow: hidden;
}
.mono { font-family: var(--mono); font-variant-numeric: tabular-nums; letter-spacing: 0.3px; }
.r-grain { position: absolute; inset: 0; pointer-events: none; z-index: 0; opacity: 0.5;
  background-image: radial-gradient(rgba(42, 38, 34, 0.06) 0.5px, transparent 0.5px); background-size: 4px 4px; }
.result > *:not(.r-grain) { position: relative; z-index: 1; }

.rise { opacity: 0; animation: r-rise 0.6s cubic-bezier(0.32, 0.72, 0, 1) forwards; }
@keyframes r-rise { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }

/* 成绩单 */
.report {
  position: relative;
  background:
    repeating-linear-gradient(180deg, transparent 0 33px, rgba(42, 38, 34, 0.045) 33px 34px),
    var(--surface);
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 18px 18px 24px;
  box-shadow: 0 14px 36px rgba(42, 38, 34, 0.1);
  overflow: hidden;
}
.report::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 5px; background: var(--red); }
.report-head { display: flex; align-items: center; justify-content: space-between; padding-left: 8px; }
.report-org { font-size: 11px; color: var(--ink-2); display: inline-flex; align-items: center; gap: 5px; }
.report-org svg { color: var(--red); font-size: 15px; }
.report-no { font-size: 10px; color: var(--ink-3); border: 1px solid var(--line); padding: 2px 7px; border-radius: 4px; }
.report-grade { padding-left: 8px; margin-top: 14px; }
.grade-badge { display: inline-block; font-size: 12px; font-weight: 800; color: var(--red-deep); background: var(--red-soft); padding: 3px 12px; border-radius: 6px; letter-spacing: 1px; }
.report-title { font-size: 26px; font-weight: 900; color: var(--ink); margin: 10px 0 4px; line-height: 1.2; }
.report-sub { font-size: 13.5px; color: var(--ink-2); }
.report-score { display: flex; align-items: baseline; gap: 4px; padding-left: 8px; margin-top: 16px; position: relative; }
.score-num { font-size: 68px; font-weight: 900; color: var(--red); line-height: 0.9; letter-spacing: -0.03em; }
.score-max { font-size: 20px; color: var(--ink-3); }
.score-rule { position: absolute; left: 8px; bottom: -4px; width: 120px; height: 3px; background: var(--red); border-radius: 2px; transform: rotate(-1.5deg); opacity: 0.85; }
.report-breakdown { display: flex; gap: 8px; padding-left: 8px; margin-top: 14px; font-size: 12px; color: var(--ink-2); }
.report-breakdown i { color: var(--ink-3); }

.report-stamp { position: absolute; right: 14px; top: 64px; width: 84px; height: 84px; border-radius: 50%; border: 3px solid var(--red); color: var(--red); display: grid; place-items: center; text-align: center; transform: rotate(-13deg) scale(2.4); opacity: 0; z-index: 2; }
.report-stamp.pass { border-color: var(--ok); color: var(--ok); }
.report-stamp.pressed { animation: stamp-press 0.5s cubic-bezier(0.2, 1.4, 0.3, 1) forwards; }
@keyframes stamp-press { 0% { transform: rotate(-13deg) scale(2.4); opacity: 0; } 60% { opacity: 0.95; } 100% { transform: rotate(-13deg) scale(1); opacity: 0.9; } }
.report-stamp b { display: block; font-size: 22px; font-weight: 900; letter-spacing: 2px; }
.report-stamp i { font-style: normal; font-size: 8.5px; letter-spacing: 0.5px; }

.block-label { font-size: 11px; color: var(--ink-3); display: flex; align-items: center; gap: 5px; margin: 22px 0 10px; padding-left: 4px; }
.block-label svg { color: var(--red); font-size: 14px; }

/* 画像档案 */
.portrait-card { display: flex; align-items: center; gap: 14px; background: var(--surface); border: 1px solid var(--line); border-left: 3px solid var(--red); border-radius: 14px; padding: 16px; position: relative; }
.portrait-mark { width: 52px; height: 52px; border-radius: 12px; background: var(--red-soft); color: var(--red); display: grid; place-items: center; font-size: 28px; flex-shrink: 0; }
.portrait-info { flex: 1; }
.portrait-info strong { display: block; font-size: 18px; color: var(--ink); margin-bottom: 3px; }
.portrait-info small { font-size: 12.5px; color: var(--ink-2); line-height: 1.5; }
.portrait-seal { color: var(--red); opacity: 0.5; font-size: 26px; }

/* 评语 */
.comment-card { background: var(--surface); border: 1px solid var(--line); border-radius: 14px; padding: 18px 16px; position: relative; }
.comment-card p { font-size: 14.5px; line-height: 1.7; color: var(--ink); }
.tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px; }
.tag { font-size: 12px; color: var(--red-deep); background: var(--red-soft); border-radius: 999px; padding: 4px 11px; font-weight: 600; }

/* 深度档案 */
.deep { margin-top: 22px; }
.deep .block-label { margin-top: 0; }
.deep-wrap { position: relative; min-height: 430px; }
.deep-content { transition: filter 0.35s ease, opacity 0.35s ease; }
.deep-content.is-locked { filter: blur(8px) saturate(0.65); opacity: 0.72; pointer-events: none; user-select: none; }
.deep-lock { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 22px; text-align: center; border: 1px solid var(--line); border-radius: 14px; background: rgba(246, 242, 233, 0.84); backdrop-filter: blur(2px); }
.deep-lock-icon { display: grid; place-items: center; width: 42px; height: 42px; border-radius: 12px; background: var(--red-soft); color: var(--red); font-size: 23px; }
.deep-lock strong { margin-top: 10px; color: var(--ink); font-size: 17px; }
.deep-lock p { margin-top: 5px; color: var(--ink-2); font-size: 12.5px; }
.deep-lock button { display: inline-flex; align-items: center; justify-content: center; gap: 7px; margin-top: 16px; padding: 12px 22px; border: none; border-radius: 12px; background: var(--red); color: #fff; font: inherit; font-size: 14px; font-weight: 800; box-shadow: 0 9px 22px rgba(215, 38, 61, 0.22); }
.deep-lock button:active { transform: scale(0.97); }
.deep-lock small { margin-top: 10px; color: var(--ink-3); font-size: 10.5px; }
.dimension-pills { display: flex; flex-wrap: wrap; gap: 7px; margin-bottom: 12px; }
.dimension-pills span { padding: 4px 9px; border-radius: 999px; border: 1px solid var(--red); color: var(--red-deep); background: var(--red-soft); font-size: 11px; font-weight: 800; }
.evidence-list { list-style: none; display: grid; gap: 8px; margin-top: 13px; padding-top: 12px; border-top: 1px solid var(--line); }
.evidence-list li { color: var(--ink-2); font-size: 12.5px; line-height: 1.55; }
.evidence-list li::before { content: '↳'; color: var(--red); font-weight: 900; margin-right: 6px; }
.comment-card .deep-advice { margin-top: 13px; color: var(--red-deep); font-weight: 700; }
.deep-note { display: block; margin-top: 10px; color: var(--ink-3); font-size: 10.5px; line-height: 1.5; }

/* 操作 */
.actions { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 22px; }
.act { height: 50px; border: none; border-radius: 14px; display: flex; align-items: center; justify-content: center; gap: 7px; font-size: 15px; font-weight: 800; }
.act:active { transform: scale(0.97); }
.retake { background: #efe8da; color: var(--ink); }
.share { background: var(--red); color: #fff; box-shadow: 0 10px 24px rgba(215, 38, 61, 0.26); }

/* 引流 */
.convert { margin-top: 20px; }
.convert-hint { font-size: 11px; color: var(--ink-3); text-align: center; margin-bottom: 8px; }
.convert-btn { width: 100%; border: 1px solid var(--line); background: var(--surface); border-radius: 16px; padding: 14px; display: grid; grid-template-columns: 44px 1fr 22px; align-items: center; gap: 11px; text-align: left; font-family: inherit; }
.convert-btn:active { transform: scale(0.98); }
.convert-ic { width: 44px; height: 44px; border-radius: 50%; background: var(--red-soft); color: var(--red); display: grid; place-items: center; font-size: 22px; }
.convert-tx strong { display: block; font-size: 15px; color: var(--ink); }
.convert-tx small { display: block; font-size: 12px; color: var(--ink-2); line-height: 1.45; margin-top: 2px; }
.convert-arr { color: var(--ink-3); font-size: 20px; }

.disclaimer { text-align: center; font-size: 12px; color: var(--ink-3); padding: 22px 16px 0; }

/* 分享成绩单 */
.sh-overlay { position: fixed; inset: 0; z-index: 200; background: rgba(42, 38, 34, 0.55); display: grid; place-items: center; padding: 18px; }
.sh-modal { width: min(350px, 100%); }
.sh-card { background: var(--surface); border: 1px solid var(--line-strong); border-radius: 18px; padding: 22px 20px; position: relative; overflow: hidden;
  background-image: repeating-linear-gradient(180deg, transparent 0 30px, rgba(42, 38, 34, 0.04) 30px 31px); }
.sh-card::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 5px; background: var(--red); }
.sh-head { display: flex; align-items: center; justify-content: space-between; font-size: 10.5px; color: var(--ink-2); padding-left: 8px; }
.sh-grade-row { display: flex; align-items: center; gap: 10px; padding-left: 8px; margin-top: 14px; }
.sh-grade { font-size: 12px; font-weight: 800; color: var(--red-deep); background: var(--red-soft); padding: 3px 11px; border-radius: 6px; }
.sh-stamp { font-size: 13px; font-weight: 900; border: 2px solid var(--red); color: var(--red); border-radius: 8px; padding: 2px 10px; transform: rotate(-6deg); letter-spacing: 1px; }
.sh-stamp.pass { border-color: var(--ok); color: var(--ok); }
.sh-title { font-size: 24px; font-weight: 900; color: var(--ink); padding-left: 8px; margin: 12px 0 0; }
.sh-score { font-size: 60px; font-weight: 900; color: var(--red); padding-left: 8px; line-height: 1; margin-top: 6px; }
.sh-score small { font-size: 18px; color: var(--ink-3); }
.sh-portrait { display: inline-flex; align-items: center; gap: 6px; margin: 14px 0 0 8px; font-size: 14px; font-weight: 700; color: var(--ink); }
.sh-portrait svg { color: var(--red); font-size: 18px; }
.sh-comment { font-size: 13px; line-height: 1.65; color: var(--ink); margin: 12px 8px 0; }
.sh-foot { display: flex; align-items: center; gap: 10px; border-top: 1px solid var(--line); margin: 16px 0 0 8px; padding-top: 14px; }
.sh-seal { color: var(--red); font-size: 28px; }
.sh-brand p { font-size: 13px; font-weight: 700; color: var(--ink); margin: 0; }
.sh-brand-sub { font-size: 10.5px; color: var(--ink-3) !important; font-weight: 400 !important; margin-top: 2px !important; }
.sh-acts { display: grid; grid-template-columns: 1fr 86px; gap: 10px; margin-top: 12px; }
.sh-acts button { height: 46px; border: none; border-radius: 12px; font-size: 15px; font-weight: 800; display: flex; align-items: center; justify-content: center; gap: 6px; }
.sh-save { background: var(--red); color: #fff; }
.sh-close { background: var(--surface); color: var(--ink); border: 1px solid var(--line); }
.ov-enter-active, .ov-leave-active { transition: opacity 0.24s ease; }
.ov-enter-from, .ov-leave-to { opacity: 0; }

@media (prefers-reduced-motion: reduce) {
  .report-stamp.pressed { animation: none !important; transform: rotate(-13deg) scale(1); opacity: 0.9; }
}
</style>
