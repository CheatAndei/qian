<template>
  <div class="result" v-if="topTag">
    <span class="r-noise" aria-hidden="true"></span>

    <!-- 加密档案抬头 -->
    <header class="r-bar rise" style="animation-delay: 40ms">
      <span class="r-org mono"><Icon icon="mdi:file-hidden" /> 匿名档案 · 仅供本人</span>
      <span class="r-no mono">FILE · MS · 2026</span>
    </header>

    <!-- 人设揭示 -->
    <section class="reveal rise" style="animation-delay: 100ms">
      <div class="rv-head">
        <span class="rv-level mono">等级 · {{ gradeLabel }}</span>
        <span class="rv-idx mono">闷骚指数 {{ total }}</span>
      </div>
      <h1 class="rv-name">{{ topTag.name }}</h1>
      <p class="rv-desc">{{ topTag.desc }}</p>
      <div class="rv-seal"><Icon icon="mdi:shield-moon-outline" /></div>
    </section>

    <!-- 档案评注 -->
    <section class="block rise" style="animation-delay: 160ms">
      <p class="block-label mono"><Icon icon="mdi:comment-quote-outline" /> 档案评注</p>
      <div class="note-card"><p>{{ cleanDesc }}</p></div>
    </section>

    <!-- 标签 -->
    <section class="block rise" style="animation-delay: 220ms" v-if="cleanTags.length">
      <p class="block-label mono"><Icon icon="mdi:bookmark-outline" /> 探测标签</p>
      <div class="tags"><span v-for="t in cleanTags" :key="t" class="tag">{{ t }}</span></div>
    </section>

    <!-- 操作 -->
    <div class="actions rise" style="animation-delay: 280ms">
      <button class="act retake" @click="retake"><Icon icon="mdi:restart" /> 重新探测</button>
      <button class="act share" @click="showShare = true"><Icon icon="mdi:image-outline" /> 生成档案卡</button>
    </div>

    <!-- 引流 -->
    <section class="convert rise" style="animation-delay: 340ms">
      <p class="convert-hint mono">测完闷骚，看看你俩</p>
      <button class="convert-btn" @click="goNext"><span class="convert-ic"><Icon icon="mdi:heart-pulse" /></span><span class="convert-tx"><strong>测测你俩的契合度</strong><small>看看你和另一个人的匹配指数</small></span><Icon class="convert-arr" icon="mdi:chevron-right" /></button>
    </section>

    <MoreTests current="mstest" />
    <p class="disclaimer">* 本测试由 AI 生成，仅供娱乐参考。</p>

    <!-- 分享档案卡 -->
    <transition name="ov"><div v-if="showShare" class="sh-overlay" @click="showShare = false"><div class="sh-modal" @click.stop><div class="sh-card" ref="shareCardRef">
      <div class="sh-head mono"><span>外冷内热 · 匿名档案</span><b>FILE MS · 2026</b></div>
      <div class="sh-badge mono">闷骚指数 {{ total }}</div>
      <h2 class="sh-name">{{ topTag.name }}</h2>
      <p class="sh-desc">{{ topTag.desc }}</p>
      <p class="sh-note">{{ cleanDesc.slice(0, 120) }}</p>
      <div class="sh-foot"><span class="sh-seal"><Icon icon="mdi:shield-moon-outline" /></span><div class="sh-brand"><p>闷骚指数测试</p><p class="sh-brand-sub mono">仅供娱乐，匿名测试</p></div></div>
    </div><div class="sh-acts"><button class="sh-save" @click="saveCard"><Icon icon="mdi:download" /> 保存图片</button><button class="sh-close" @click="showShare = false">关闭</button></div></div></div></transition>
  </div>
</template>

<script setup>
import MoreTests from '../components/MoreTests.vue'
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Icon from '../components/Icon.vue'
import { getResult, computeTopTag } from '../data/questions.js'

const router = useRouter(); const route = useRoute()
const total = Number(route.query.total) || 0
let answers = []
try { answers = JSON.parse(route.query.answers) || [] } catch (e) { answers = [] }

const topTag = computed(() => answers.length ? computeTopTag(answers) : null)
const grade = computed(() => getResult(total))
const gradeLabel = computed(() => grade.value?.grade)

function stripEmoji(s) { return String(s || '').replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2190}-\u{21FF}\u{2B00}-\u{2BFF}#️‍]/gu, '').trim() }
const cleanDesc = computed(() => grade.value?.description || '')
const cleanTags = computed(() => (grade.value?.tags || []).map(stripEmoji).filter(Boolean))

const showShare = ref(false); const shareCardRef = ref(null)

if (!answers.length) { router.replace('/') }

function retake() { router.replace('/quiz') }
const nextUrl = import.meta.env.VITE_NEXT_PRODUCT_URL || 'https://cp.xpytt.com'
function goNext() { window.open(nextUrl, '_blank', 'noopener,noreferrer') }

async function saveCard() {
  if (!shareCardRef.value) return
  try {
    const { default: html2canvas } = await import('html2canvas')
    const canvas = await html2canvas(shareCardRef.value, { scale: 2, backgroundColor: '#0d0c0f', useCORS: true })
    const link = document.createElement('a'); link.download = '外冷内热档案.png'
    link.href = canvas.toDataURL('image/png'); link.click()
  } catch (e) { alert('保存失败，请截图保存。') }
}
</script>

<style scoped>
.result { --bg:#0d0c0f;--surface:#16141a;--ink:#e8e2dc;--ink-2:#978e84;--ink-3:#6b6260;--red:#b8404e;--red-soft:rgba(184,64,78,.14);--glow:#c28e44;--line:rgba(232,226,220,.09);--line-strong:rgba(232,226,220,.16);--mono:'SFMono-Regular',ui-monospace,'JetBrains Mono',Consolas,monospace;position:relative;min-height:100vh;max-width:480px;margin:0 auto;background:var(--bg);padding:14px 16px 36px;overflow:hidden }
.mono{font-family:var(--mono);font-variant-numeric:tabular-nums;letter-spacing:.3px}
.r-noise{position:absolute;inset:0;pointer-events:none;z-index:0;opacity:.5;background-image:radial-gradient(rgba(232,226,220,.05) .4px,transparent .6px);background-size:3px 3px}
.result>*:not(.r-noise){position:relative;z-index:1}
.rise{opacity:0;animation:r-rise .6s cubic-bezier(.32,.72,0,1) forwards}@keyframes r-rise{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
.r-bar{display:flex;align-items:center;justify-content:space-between;font-size:11px;color:var(--ink-2);padding:2px 4px 14px}.r-org{display:inline-flex;align-items:center;gap:5px}.r-org svg{color:var(--red)}.r-no{color:var(--ink-3)}
.reveal{position:relative;background:var(--surface);border:1px solid var(--line);border-radius:16px;padding:22px 18px;box-shadow:0 10px 30px rgba(0,0,0,.3);overflow:hidden}
.reveal::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--red),var(--glow))}
.rv-head{display:flex;align-items:baseline;justify-content:space-between}.rv-level{font-size:11px;color:var(--glow);font-weight:800}.rv-idx{font-size:13px;color:var(--red);font-weight:800}
.rv-name{font-size:44px;font-weight:900;color:var(--ink);line-height:1.06;margin:16px 0 8px;letter-spacing:-.02em}
.rv-desc{font-size:14px;color:var(--ink-2);line-height:1.6;max-width:70%}
.rv-seal{position:absolute;right:14px;bottom:14px;width:60px;height:60px;border-radius:50%;border:1.5px solid var(--red);color:var(--red);display:grid;place-items:center;font-size:30px;opacity:.7;transform:rotate(8deg)}
.block{margin-top:20px}.block-label{font-size:11px;color:var(--ink-3);display:flex;align-items:center;gap:5px;margin-bottom:10px;padding-left:2px}.block-label svg{color:var(--red)}
.note-card{background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:18px 16px}.note-card p{font-size:14.5px;line-height:1.75;color:var(--ink)}
.tags{display:flex;flex-wrap:wrap;gap:8px}.tag{font-size:12px;color:var(--glow);background:rgba(194,142,68,.12);border-radius:999px;padding:5px 12px;font-weight:700}
.actions{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:22px}
.act{height:50px;border:none;border-radius:13px;display:flex;align-items:center;justify-content:center;gap:7px;font-size:15px;font-weight:800}.act:active{transform:scale(.97)}
.retake{background:#201c24;color:var(--ink)}.share{background:linear-gradient(135deg,var(--red),#9b3540);color:var(--ink)}
.convert{margin-top:20px}.convert-hint{font-size:11px;color:var(--ink-3);text-align:center;margin-bottom:8px}
.convert-btn{width:100%;border:1px solid var(--line);background:var(--surface);border-radius:14px;padding:14px;display:grid;grid-template-columns:44px 1fr 22px;align-items:center;gap:11px;text-align:left;font-family:inherit}.convert-btn:active{transform:scale(.98)}
.convert-ic{width:44px;height:44px;border-radius:12px;background:var(--red-soft);color:var(--red);display:grid;place-items:center;font-size:22px}
.convert-tx strong{display:block;font-size:15px;color:var(--ink)}.convert-tx small{display:block;font-size:12px;color:var(--ink-2);line-height:1.45;margin-top:2px}.convert-arr{color:var(--ink-3);font-size:20px}
.disclaimer{text-align:center;font-size:12px;color:var(--ink-3);padding:22px 16px 0}
.sh-overlay{position:fixed;inset:0;z-index:200;background:rgba(13,12,15,.75);display:grid;place-items:center;padding:18px}
.sh-modal{width:min(340px,100%)}
.sh-card{position:relative;background:var(--bg);border:1px solid var(--line-strong);border-radius:18px;padding:24px 20px;overflow:hidden}
.sh-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--red),var(--glow))}
.sh-head{display:flex;align-items:center;justify-content:space-between;font-size:10.5px;color:var(--ink-2)}
.sh-badge{display:inline-block;font-size:13px;font-weight:800;color:var(--red);border:1px solid var(--red);padding:4px 12px;border-radius:999px;margin-top:18px}
.sh-name{font-size:36px;font-weight:900;color:var(--ink);margin:14px 0 8px}.sh-desc{font-size:13.5px;color:var(--ink-2);line-height:1.5}
.sh-note{font-size:12.5px;color:var(--ink-2);line-height:1.65;margin:12px 0 0;opacity:.85}
.sh-foot{display:flex;align-items:center;gap:10px;border-top:1px solid var(--line);margin-top:16px;padding-top:14px}
.sh-seal{width:38px;height:38px;border-radius:10px;background:var(--red-soft);color:var(--red);display:grid;place-items:center;font-size:22px}
.sh-brand p{font-size:13px;font-weight:800;color:var(--ink);margin:0}.sh-brand-sub{font-size:10.5px;color:var(--ink-3)!important;font-weight:400!important;margin-top:2px!important}
.sh-acts{display:grid;grid-template-columns:1fr 86px;gap:10px;margin-top:12px}.sh-acts button{height:46px;border:none;border-radius:12px;font-size:15px;font-weight:800;display:flex;align-items:center;justify-content:center;gap:6px}
.sh-save{background:var(--red);color:var(--ink)}.sh-close{background:var(--surface);color:var(--ink);border:1px solid var(--line)}
.ov-enter-active,.ov-leave-active{transition:opacity .24s ease}.ov-enter-from,.ov-leave-to{opacity:0}
@media(prefers-reduced-motion:reduce){.rv-seal{transform:rotate(8deg)}}
</style>
