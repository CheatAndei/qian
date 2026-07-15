<template>
  <div class="home">
    <span class="hp-grid" aria-hidden="true"></span>

    <!-- 抬头 -->
    <header class="hp-bar">
      <span class="hp-live"><i></i> 匹配中</span>
      <span class="hp-dev mono">MATCH · 关系档案</span>
      <span class="hp-sig"><Icon icon="mdi:heart-pulse" /></span>
    </header>

    <main class="hp-intro">
      <span class="hp-badge">双人契合度匹配仪</span>
      <h1>你俩的契合度<br /><em>有多高？</em></h1>
      <p>选好双方人格，匹配仪秒算你们的默契指数与五维契合。</p>
    </main>

    <!-- 已带入提示 -->
    <transition name="fade">
      <div class="carry" v-if="carriedBf || carriedGf">
        <Icon icon="mdi:check-circle" />
        <span>已带入：<b v-if="carriedBf">他 · {{ bfName }}</b><b v-if="carriedBf && carriedGf"> ＋ </b><b v-if="carriedGf">她 · {{ gfName }}</b>，补齐另一边即可匹配</span>
      </div>
    </transition>

    <!-- 双档案选择 -->
    <section class="files">
      <!-- 他 -->
      <div class="file his" :class="{ done: selBf }">
        <div class="file-head">
          <span class="file-role"><Icon icon="mdi:account-outline" /> 他的画像</span>
          <a class="file-link" :href="bfTestUrl" target="_blank" rel="noopener noreferrer">去测男友画像 <Icon icon="mdi:arrow-right-thin" /></a>
        </div>
        <div class="grid">
          <button v-for="t in bfTags" :key="t.key" class="tag" :class="{ on: selBf === t.key }" @click="selBf = t.key">
            <span class="tag-icon">{{ t.icon }}</span>
            <span class="tag-name">{{ t.name }}</span>
          </button>
        </div>
      </div>

      <!-- 匹配连接 -->
      <div class="connector" :class="{ live: selBf && selGf }">
        <span class="conn-line l"></span>
        <span class="conn-core"><Icon icon="mdi:heart-pulse" /></span>
        <span class="conn-line r"></span>
      </div>

      <!-- 她 -->
      <div class="file hers" :class="{ done: selGf }">
        <div class="file-head">
          <span class="file-role"><Icon icon="mdi:account-heart-outline" /> 她的人设</span>
          <a class="file-link" :href="gfTestUrl" target="_blank" rel="noopener noreferrer">去测女友人设 <Icon icon="mdi:arrow-right-thin" /></a>
        </div>
        <div class="grid">
          <button v-for="t in gfTags" :key="t.key" class="tag" :class="{ on: selGf === t.key }" @click="selGf = t.key">
            <span class="tag-icon">{{ t.icon }}</span>
            <span class="tag-name">{{ t.name }}</span>
          </button>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <button class="cta" :class="{ ready: selBf && selGf }" :disabled="!selBf || !selGf" @click="go">
      <Icon :icon="selBf && selGf ? 'mdi:flask-outline' : 'mdi:gesture-tap-button'" />
      {{ selBf && selGf ? '开始匹配' : '请选好双方人格' }}
    </button>
    <p class="hp-note">* 娱乐测试，结果由 AI 生成，仅供参考。</p>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { bfTags, gfTags } from '../data/compatibility.js'
import Icon from '../components/Icon.vue'

const router = useRouter()
const route = useRoute()
const bfTestUrl = import.meta.env.VITE_BFTEST_URL || '/'
const gfTestUrl = import.meta.env.VITE_GFTEST_URL || '/'

const selBf = ref(null)
const selGf = ref(null)
const carriedBf = ref(false)
const carriedGf = ref(false)

const bfName = computed(() => bfTags.find((t) => t.key === selBf.value)?.name || '')
const gfName = computed(() => gfTags.find((t) => t.key === selGf.value)?.name || '')

// 读取从 bf/gf 带入的人格（query → search → cookie → localStorage）
function readCookie(name) {
  const m = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'))
  return m ? m[1] : null
}
function readIncoming(side) {
  let v = route.query[side]
  if (!v && typeof window !== 'undefined') v = new URLSearchParams(window.location.search).get(side)
  if (!v) v = readCookie('xpytt_' + side)
  if (!v) { try { v = localStorage.getItem('xpytt_persona_' + side) } catch (_) {} }
  if (!v) return null
  try { v = decodeURIComponent(v) } catch (_) {}
  return v
}

onMounted(() => {
  const ib = readIncoming('bf')
  if (ib && bfTags.some((t) => t.key === ib)) { selBf.value = ib; carriedBf.value = true }
  const ig = readIncoming('gf')
  if (ig && gfTags.some((t) => t.key === ig)) { selGf.value = ig; carriedGf.value = true }
})

function go() {
  if (!selBf.value || !selGf.value) return
  router.push({ path: '/result', query: { bf: selBf.value, gf: selGf.value } })
}
</script>

<style scoped>
.home {
  --paper: #f3efe6;
  --surface: #fffdf8;
  --ink: #211d1a;
  --ink-2: #6f665d;
  --ink-3: #a097;
  --his: #d7263d;
  --hers: #e84576;
  --match: #c79a2e;
  --line: rgba(33, 29, 26, 0.12);
  --mono: 'SFMono-Regular', ui-monospace, 'JetBrains Mono', Consolas, monospace;
  position: relative;
  min-height: 100vh;
  max-width: 480px;
  margin: 0 auto;
  background: var(--paper);
  padding: 12px 20px 36px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.mono { font-family: var(--mono); font-variant-numeric: tabular-nums; letter-spacing: 0.3px; }
.hp-grid { position: absolute; inset: 0; pointer-events: none; z-index: 0; opacity: 0.5;
  background-image: linear-gradient(rgba(33, 29, 26, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(33, 29, 26, 0.04) 1px, transparent 1px);
  background-size: 26px 26px; -webkit-mask-image: linear-gradient(180deg, #000, transparent 40%); mask-image: linear-gradient(180deg, #000, transparent 40%); }
.home > *:not(.hp-grid) { position: relative; z-index: 1; }

.hp-bar { display: flex; align-items: center; justify-content: space-between; font-size: 11px; color: var(--ink-2); padding: 4px 2px 12px; }
.hp-live { display: inline-flex; align-items: center; gap: 6px; color: var(--match); font-weight: 800; letter-spacing: 1px; }
.hp-live i { width: 7px; height: 7px; border-radius: 50%; background: var(--match); box-shadow: 0 0 8px var(--match); animation: blink 1.4s steps(1) infinite; }
@keyframes blink { 0%, 62% { opacity: 1; } 63%, 100% { opacity: 0.25; } }
.hp-dev { letter-spacing: 1px; color: var(--ink-3); font-size: 10.5px; }
.hp-sig { color: var(--hers); font-size: 17px; }

.hp-intro { text-align: center; margin: 8px 0 0; }
.hp-badge { display: inline-block; font-size: 12px; font-weight: 800; color: #fff; background: var(--ink); padding: 5px 14px; border-radius: 999px; letter-spacing: 0.5px; }
.hp-intro h1 { font-size: 38px; font-weight: 900; line-height: 1.12; letter-spacing: -0.02em; margin: 14px 0 10px; color: var(--ink); }
.hp-intro h1 em { font-style: normal; background: linear-gradient(90deg, var(--his), var(--hers)); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
.hp-intro p { font-size: 13.5px; color: var(--ink-2); line-height: 1.7; }

.carry { display: flex; align-items: center; gap: 8px; margin: 16px 0 0; padding: 11px 14px; background: color-mix(in srgb, var(--match) 12%, var(--surface)); border: 1px solid color-mix(in srgb, var(--match) 40%, transparent); border-radius: 12px; font-size: 12.5px; color: var(--ink); }
.carry svg { color: var(--match); font-size: 18px; flex-shrink: 0; }
.carry b { font-weight: 800; }
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.files { margin-top: 18px; }
.file { background: var(--surface); border: 1px solid var(--line); border-radius: 16px; padding: 14px; transition: border-color 0.3s ease, box-shadow 0.3s ease; }
.file.his { border-top: 3px solid var(--his); }
.file.hers { border-top: 3px solid var(--hers); }
.file.his.done { box-shadow: 0 6px 22px color-mix(in srgb, var(--his) 16%, transparent); border-color: color-mix(in srgb, var(--his) 40%, var(--line)); }
.file.hers.done { box-shadow: 0 6px 22px color-mix(in srgb, var(--hers) 16%, transparent); border-color: color-mix(in srgb, var(--hers) 40%, var(--line)); }
.file-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
.file-role { display: inline-flex; align-items: center; gap: 5px; font-size: 14px; font-weight: 800; color: var(--ink); }
.his .file-role svg { color: var(--his); }
.hers .file-role svg { color: var(--hers); }
.file-link { display: inline-flex; align-items: center; gap: 2px; font-size: 11.5px; color: var(--ink-3); text-decoration: none; font-weight: 600; }

.grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
.tag { display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 12px 4px; border: 1.5px solid var(--line); border-radius: 12px; background: var(--paper); cursor: pointer; font-family: inherit; transition: all 0.18s; }
.tag:active { transform: scale(0.95); }
.tag-icon { font-size: 24px; line-height: 1; transition: transform 0.2s; }
.tag-name { font-size: 11px; font-weight: 600; color: var(--ink); }
.his .tag.on { border-color: var(--his); background: color-mix(in srgb, var(--his) 8%, #fff); }
.hers .tag.on { border-color: var(--hers); background: color-mix(in srgb, var(--hers) 8%, #fff); }
.tag.on .tag-icon { transform: scale(1.15); }

.connector { display: flex; align-items: center; gap: 8px; padding: 14px 24px; }
.conn-line { flex: 1; height: 2px; background: var(--line); border-radius: 2px; transition: background 0.3s; }
.connector.live .conn-line.l { background: linear-gradient(90deg, var(--his), var(--match)); }
.connector.live .conn-line.r { background: linear-gradient(90deg, var(--match), var(--hers)); }
.conn-core { width: 40px; height: 40px; border-radius: 50%; border: 1.5px solid var(--line); background: var(--surface); display: grid; place-items: center; color: var(--ink-3); font-size: 20px; transition: all 0.3s; }
.connector.live .conn-core { border-color: var(--match); color: var(--match); animation: pulse 1.4s ease-in-out infinite; }
@keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.12); } }

.cta { width: 100%; height: 56px; margin-top: 22px; border: none; border-radius: 14px; font-size: 17px; font-weight: 900; font-family: inherit; display: flex; align-items: center; justify-content: center; gap: 8px; background: #e6ddcf; color: var(--ink-3); transition: all 0.25s; }
.cta.ready { background: linear-gradient(90deg, var(--his), var(--hers)); color: #fff; box-shadow: 0 12px 30px color-mix(in srgb, var(--hers) 30%, transparent); }
.cta:active.ready { transform: scale(0.98); }
.cta:disabled { cursor: not-allowed; }
.hp-note { text-align: center; font-size: 11.5px; color: var(--ink-3); margin-top: 14px; }

@media (prefers-reduced-motion: reduce) {
  .hp-live i, .connector.live .conn-core { animation: none !important; }
}
</style>
