<template>
  <div class="result">
    <span class="r-grid" aria-hidden="true"></span>

    <!-- 缺参提示 -->
    <div v-if="error" class="empty">
      <span class="empty-ic"><Icon icon="mdi:magnify" /></span>
      <h2>还没选择双方人格</h2>
      <p>请从首页选好他和她的人格，再来看契合度档案。</p>
      <button class="empty-btn" @click="goHome"><Icon icon="mdi:restart" /> 回首页</button>
    </div>

    <template v-if="result">
      <!-- 档案抬头 -->
      <header class="r-bar rise" style="animation-delay: 40ms">
        <span class="r-org mono"><Icon icon="mdi:heart-pulse" /> 关系契合档案</span>
        <span class="r-no mono">MATCH 2026</span>
      </header>

      <!-- 匹配主卡 -->
      <section class="match rise" style="animation-delay: 100ms">
        <div class="match-dual">
          <div class="who his">
            <span class="who-ic">{{ result.bfTag.icon }}</span>
            <b>{{ result.bfTag.name }}</b>
          </div>
          <div class="match-link" :class="{ live: true }">
            <span class="ml-line l"></span>
            <span class="ml-core"><Icon icon="mdi:heart-pulse" /></span>
            <span class="ml-line r"></span>
          </div>
          <div class="who hers">
            <span class="who-ic">{{ result.gfTag.icon }}</span>
            <b>{{ result.gfTag.name }}</b>
          </div>
        </div>

        <div class="match-score">
          <span class="ms-num mono">{{ disp }}</span>
          <span class="ms-unit">契合度</span>
        </div>
        <div class="match-meta">
          <span class="ms-grade">{{ grade }}</span>
          <span class="ms-cp">CP · {{ cpName }}</span>
        </div>
        <p class="match-sub">{{ subtitle }}</p>
      </section>

      <!-- 五维契合 -->
      <section class="block rise" style="animation-delay: 180ms">
        <p class="block-label mono"><Icon icon="mdi:chart-arc" /> 五维契合分析</p>
        <div class="dims">
          <div class="dim" v-for="d in result.dims" :key="d.label">
            <span class="dim-label">{{ d.label }}</span>
            <span class="dim-track"><i :style="{ width: d.val + '%', background: dimColor(d.val) }"></i></span>
            <b class="dim-val mono">{{ d.val }}</b>
          </div>
        </div>
      </section>

      <!-- 关系评注 -->
      <section class="block rise" style="animation-delay: 240ms">
        <p class="block-label mono"><Icon icon="mdi:comment-quote-outline" /> 关系评注</p>
        <div class="note-card">
          <p>{{ desc }}</p>
          <div class="tags"><span v-for="t in tags" :key="t" class="tag">{{ t }}</span></div>
        </div>
      </section>

      <!-- 相处建议 -->
      <section class="block rise" style="animation-delay: 300ms" v-if="tips.length">
        <p class="block-label mono"><Icon icon="mdi:lightbulb-on-outline" /> 相处建议</p>
        <ol class="tips">
          <li v-for="(tip, i) in tips" :key="i"><span class="tip-num mono">{{ i + 1 }}</span><span>{{ tip }}</span></li>
        </ol>
      </section>

      <!-- 雷区预警 -->
      <section class="block rise" style="animation-delay: 340ms" v-if="warn">
        <div class="warn-card"><Icon icon="mdi:alert-circle-outline" /><p>{{ warn }}</p></div>
      </section>

      <!-- 闺蜜锐评 -->
      <section class="block rise" style="animation-delay: 380ms" v-if="roast">
        <p class="block-label mono"><Icon icon="mdi:comment-quote-outline" /> 闺蜜锐评</p>
        <div class="roast-card"><p>{{ roast }}</p></div>
      </section>

      <!-- 操作 -->
      <div class="actions rise" style="animation-delay: 420ms">
        <button class="act retake" @click="goHome"><Icon icon="mdi:restart" /> 重新匹配</button>
        <button class="act share" @click="showShare = true"><Icon icon="mdi:image-outline" /> 生成契合卡</button>
      </div>

      <MoreTests current="cptest" />
    <p class="disclaimer">* 本测试由 AI 生成，仅供娱乐参考。</p>

      <!-- 分享契合卡 -->
      <transition name="ov">
        <div v-if="showShare" class="sh-overlay" @click="showShare = false">
          <div class="sh-modal" @click.stop>
            <div class="sh-card" ref="shareCardRef">
              <div class="sh-head mono"><span>关系契合档案</span><b>MATCH 2026</b></div>
              <div class="sh-dual">
                <span class="sh-ic">{{ result.bfTag.icon }}</span>
                <span class="sh-x">×</span>
                <span class="sh-ic">{{ result.gfTag.icon }}</span>
              </div>
              <div class="sh-score mono">{{ result.score }}<small>契合度</small></div>
              <div class="sh-cp">{{ grade }} · CP「{{ cpName }}」</div>
              <ul class="sh-dims">
                <li v-for="d in result.dims" :key="d.label"><span>{{ d.label }}</span><span class="sh-bar"><i :style="{ width: d.val + '%' }"></i></span><b class="mono">{{ d.val }}</b></li>
              </ul>
              <div class="sh-foot">
                <span class="sh-seal"><Icon icon="mdi:heart-pulse" /></span>
                <div class="sh-brand"><p>契合度测试 · 2026</p><p class="sh-brand-sub mono">扫码测测你俩的契合度</p></div>
              </div>
            </div>
            <div class="sh-acts">
              <button class="sh-save" @click="saveCard"><Icon icon="mdi:download" /> 保存图片</button>
              <button class="sh-close" @click="showShare = false">关闭</button>
            </div>
          </div>
        </div>
      </transition>
    </template>
  </div>
</template>

<script setup>
import MoreTests from '../components/MoreTests.vue'
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Icon from '../components/Icon.vue'
import gsap from 'gsap'
import { compute } from '../data/compatibility.js'

const router = useRouter()
const route = useRoute()

const error = ref(false)
const result = ref(null)
const showShare = ref(false)
const shareCardRef = ref(null)

const bf = route.query.bf || ''
const gf = route.query.gf || ''

if (!isUnlocked('cptest')) {
  router.replace('/')
} else if (bf && gf) {
  result.value = compute(bf, gf)
} else {
  error.value = true
}

function isUnlocked(product) {
  try {
    const unlocked = JSON.parse(localStorage.getItem('unlocked') || '{}')
    if (unlocked[product]?.unlocked || unlocked[product]) return true
  } catch (_) {}
  return document.cookie.split('; ').includes('xpytt_unlocked=1')
}

function stripEmoji(s) {
  return String(s || '').replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2190}-\u{21FF}\u{2B00}-\u{2BFF}#️‍]/gu, '').trim()
}
const grade = computed(() => stripEmoji(result.value?.grade))
const cpName = computed(() => stripEmoji(result.value?.cpName))
const subtitle = computed(() => stripEmoji(result.value?.subtitle))
const desc = computed(() => result.value?.desc || '')
const tags = computed(() => (result.value?.tags || []).map(stripEmoji).filter(Boolean))
const tips = computed(() => (result.value?.tips || []).map((t) => String(t)).filter(Boolean))
const warn = computed(() => stripEmoji(result.value?.warn))
const roast = computed(() => result.value?.roast || '')

const disp = ref(result.value?.score ?? 0)
const reduced =
  typeof window !== 'undefined' && window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

onMounted(() => {
  if (!result.value || reduced) return
  const target = result.value.score
  disp.value = 0
  const s = { v: 0 }
  gsap.to(s, { v: target, duration: 1.4, ease: 'power2.out', delay: 0.25, onUpdate: () => (disp.value = Math.round(s.v)) })
})

function dimColor(v) {
  if (v >= 80) return '#2f9e44'
  if (v >= 60) return '#c79a2e'
  if (v >= 40) return '#e84576'
  return '#a097'
}
function goHome() { router.replace('/') }

async function saveCard() {
  if (!shareCardRef.value) return
  try {
    const { default: html2canvas } = await import('html2canvas')
    const canvas = await html2canvas(shareCardRef.value, { scale: 2, backgroundColor: '#fffdf8', useCORS: true })
    const link = document.createElement('a')
    link.download = '契合度档案.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  } catch (e) {
    alert('保存失败，请截图保存。')
  }
}
</script>

<style scoped>
.result {
  --paper: #f3efe6;
  --surface: #fffdf8;
  --ink: #211d1a;
  --ink-2: #6f665d;
  --ink-3: #a39a90;
  --his: #d7263d;
  --hers: #e84576;
  --match: #c79a2e;
  --ok: #2f9e44;
  --line: rgba(33, 29, 26, 0.12);
  --line-strong: rgba(33, 29, 26, 0.2);
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
.r-grid { position: absolute; inset: 0; pointer-events: none; z-index: 0; opacity: 0.5;
  background-image: linear-gradient(rgba(33, 29, 26, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(33, 29, 26, 0.04) 1px, transparent 1px);
  background-size: 26px 26px; -webkit-mask-image: linear-gradient(180deg, #000, transparent 36%); mask-image: linear-gradient(180deg, #000, transparent 36%); }
.result > *:not(.r-grid) { position: relative; z-index: 1; }

.rise { opacity: 0; animation: r-rise 0.6s cubic-bezier(0.32, 0.72, 0, 1) forwards; }
@keyframes r-rise { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }

.empty { min-height: 80vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; gap: 8px; }
.empty-ic { width: 64px; height: 64px; border-radius: 50%; border: 1px solid var(--line); display: grid; place-items: center; color: var(--ink-3); font-size: 32px; }
.empty h2 { font-size: 20px; color: var(--ink); margin-top: 8px; }
.empty p { font-size: 13.5px; color: var(--ink-2); line-height: 1.6; padding: 0 24px; }
.empty-btn { margin-top: 14px; border: none; border-radius: 999px; background: var(--ink); color: #fff; padding: 12px 22px; display: inline-flex; align-items: center; gap: 6px; font-weight: 800; }

.r-bar { display: flex; align-items: center; justify-content: space-between; font-size: 11px; color: var(--ink-2); padding: 2px 4px 12px; }
.r-org { display: inline-flex; align-items: center; gap: 5px; }
.r-org svg { color: var(--hers); font-size: 15px; }
.r-no { color: var(--ink-3); letter-spacing: 1px; }

/* 匹配主卡 */
.match { background: var(--surface); border: 1px solid var(--line); border-radius: 18px; padding: 22px 18px; text-align: center; box-shadow: 0 14px 36px rgba(33, 29, 26, 0.08); }
.match-dual { display: flex; align-items: center; justify-content: center; gap: 6px; }
.who { display: flex; flex-direction: column; align-items: center; gap: 6px; width: 92px; }
.who-ic { width: 56px; height: 56px; border-radius: 50%; display: grid; place-items: center; font-size: 30px; border: 2px solid; }
.who.his .who-ic { border-color: var(--his); background: color-mix(in srgb, var(--his) 8%, #fff); }
.who.hers .who-ic { border-color: var(--hers); background: color-mix(in srgb, var(--hers) 8%, #fff); }
.who b { font-size: 13px; color: var(--ink); }
.match-link { flex: 1; display: flex; align-items: center; gap: 5px; }
.ml-line { flex: 1; height: 2px; }
.ml-line.l { background: linear-gradient(90deg, var(--his), var(--match)); }
.ml-line.r { background: linear-gradient(90deg, var(--match), var(--hers)); }
.ml-core { width: 34px; height: 34px; border-radius: 50%; border: 1.5px solid var(--match); color: var(--match); display: grid; place-items: center; font-size: 17px; animation: pulse 1.4s ease-in-out infinite; }
@keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.12); } }

.match-score { display: flex; align-items: baseline; justify-content: center; gap: 6px; margin-top: 20px; }
.ms-num { font-size: 70px; font-weight: 900; line-height: 0.9; letter-spacing: -0.03em; background: linear-gradient(90deg, var(--his), var(--hers)); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
.ms-unit { font-size: 14px; color: var(--ink-3); }
.match-meta { display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 12px; }
.ms-grade { font-size: 12px; font-weight: 800; color: #fff; background: var(--ink); padding: 3px 12px; border-radius: 6px; }
.ms-cp { font-size: 13px; font-weight: 800; color: var(--hers); }
.match-sub { font-size: 13px; color: var(--ink-2); margin-top: 10px; line-height: 1.5; }

.block { margin-top: 20px; }
.block-label { font-size: 11px; color: var(--ink-3); display: flex; align-items: center; gap: 5px; margin-bottom: 10px; padding-left: 2px; }
.block-label svg { color: var(--hers); font-size: 14px; }

.dims { background: var(--surface); border: 1px solid var(--line); border-radius: 14px; padding: 16px; display: flex; flex-direction: column; gap: 11px; }
.dim { display: grid; grid-template-columns: 64px 1fr 30px; align-items: center; gap: 10px; }
.dim-label { font-size: 12.5px; color: var(--ink); font-weight: 600; }
.dim-track { height: 9px; background: #ece4d6; border-radius: 99px; overflow: hidden; }
.dim-track i { display: block; height: 100%; border-radius: inherit; transition: width 1s cubic-bezier(0.32, 0.72, 0, 1); }
.dim-val { font-size: 12px; color: var(--ink-2); text-align: right; }

.note-card, .roast-card { background: var(--surface); border: 1px solid var(--line); border-radius: 14px; padding: 18px 16px; }
.note-card p { font-size: 14.5px; line-height: 1.75; color: var(--ink); }
.tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px; }
.tag { font-size: 12px; color: var(--hers); background: color-mix(in srgb, var(--hers) 10%, transparent); border-radius: 999px; padding: 4px 11px; font-weight: 700; }
.roast-card p { font-size: 14px; font-style: italic; line-height: 1.7; color: var(--ink-2); }

.tips { list-style: none; background: var(--surface); border: 1px solid var(--line); border-radius: 14px; padding: 16px; display: flex; flex-direction: column; gap: 12px; }
.tips li { display: flex; gap: 10px; align-items: flex-start; font-size: 14px; line-height: 1.6; color: var(--ink); }
.tip-num { flex-shrink: 0; width: 24px; height: 24px; border-radius: 50%; background: var(--match); color: #fff; font-size: 12px; font-weight: 800; display: grid; place-items: center; }

.warn-card { display: flex; gap: 10px; align-items: flex-start; background: color-mix(in srgb, var(--match) 10%, var(--surface)); border: 1px solid color-mix(in srgb, var(--match) 36%, transparent); border-radius: 14px; padding: 16px; }
.warn-card svg { color: var(--match); font-size: 20px; flex-shrink: 0; }
.warn-card p { font-size: 13.5px; line-height: 1.65; color: var(--ink); }

.actions { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 22px; }
.act { height: 50px; border: none; border-radius: 13px; display: flex; align-items: center; justify-content: center; gap: 7px; font-size: 15px; font-weight: 800; }
.act:active { transform: scale(0.97); }
.retake { background: #e6ddcf; color: var(--ink); }
.share { background: linear-gradient(90deg, var(--his), var(--hers)); color: #fff; box-shadow: 0 10px 24px color-mix(in srgb, var(--hers) 26%, transparent); }

.disclaimer { text-align: center; font-size: 12px; color: var(--ink-3); padding: 22px 16px 0; }

/* 分享契合卡 */
.sh-overlay { position: fixed; inset: 0; z-index: 200; background: rgba(33, 29, 26, 0.55); display: grid; place-items: center; padding: 18px; }
.sh-modal { width: min(350px, 100%); }
.sh-card { position: relative; background: var(--surface); border: 1px solid var(--line-strong); border-radius: 18px; padding: 22px 20px; text-align: center; overflow: hidden; }
.sh-card::before { content: ''; position: absolute; left: 0; right: 0; top: 0; height: 4px; background: linear-gradient(90deg, var(--his), var(--hers)); }
.sh-head { display: flex; align-items: center; justify-content: space-between; font-size: 10.5px; color: var(--ink-2); }
.sh-dual { display: flex; align-items: center; justify-content: center; gap: 14px; margin-top: 18px; }
.sh-ic { font-size: 40px; }
.sh-x { font-size: 16px; color: var(--ink-3); }
.sh-score { font-size: 56px; font-weight: 900; line-height: 1; margin-top: 12px; background: linear-gradient(90deg, var(--his), var(--hers)); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
.sh-score small { font-size: 14px; color: var(--ink-3); -webkit-text-fill-color: var(--ink-3); margin-left: 4px; }
.sh-cp { font-size: 13px; font-weight: 800; color: var(--ink); margin-top: 8px; }
.sh-dims { list-style: none; margin: 16px 0 0; display: flex; flex-direction: column; gap: 6px; text-align: left; }
.sh-dims li { display: grid; grid-template-columns: 56px 1fr 26px; align-items: center; gap: 8px; font-size: 11px; color: var(--ink-2); }
.sh-bar { height: 7px; background: #ece4d6; border-radius: 99px; overflow: hidden; }
.sh-bar i { display: block; height: 100%; background: var(--hers); border-radius: inherit; }
.sh-dims b { font-size: 11px; color: var(--hers); text-align: right; }
.sh-foot { display: flex; align-items: center; gap: 10px; border-top: 1px solid var(--line); margin-top: 16px; padding-top: 14px; text-align: left; }
.sh-seal { width: 38px; height: 38px; border-radius: 10px; background: color-mix(in srgb, var(--hers) 12%, transparent); color: var(--hers); display: grid; place-items: center; font-size: 22px; }
.sh-brand p { font-size: 13px; font-weight: 800; color: var(--ink); margin: 0; }
.sh-brand-sub { font-size: 10.5px; color: var(--ink-3) !important; font-weight: 400 !important; margin-top: 2px !important; }
.sh-acts { display: grid; grid-template-columns: 1fr 86px; gap: 10px; margin-top: 12px; }
.sh-acts button { height: 46px; border: none; border-radius: 12px; font-size: 15px; font-weight: 800; display: flex; align-items: center; justify-content: center; gap: 6px; }
.sh-save { background: var(--ink); color: #fff; }
.sh-close { background: var(--surface); color: var(--ink); border: 1px solid var(--line); }
.ov-enter-active, .ov-leave-active { transition: opacity 0.24s ease; }
.ov-enter-from, .ov-leave-to { opacity: 0; }

@media (prefers-reduced-motion: reduce) {
  .ml-core { animation: none !important; }
}
</style>
