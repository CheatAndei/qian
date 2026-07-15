<template>
  <div class="result" v-if="report">
    <span class="r-noise" aria-hidden="true"></span>

    <!-- 加密档案抬头 -->
    <header class="r-bar rise" style="animation-delay: 40ms">
      <span class="r-org mono"><Icon icon="mdi:file-hidden" /> 反差档案 · 本地生成</span>
      <span class="r-no mono">{{ report.modelVersion }}</span>
    </header>

    <!-- 人设揭示 -->
    <section class="reveal rise" style="animation-delay: 100ms">
      <div class="rv-head">
        <span class="rv-level mono">{{ gradeLabel }}</span>
        <span class="rv-idx mono">隐藏反差值 {{ total }}</span>
      </div>
      <h1 class="rv-name">{{ topTag.name }}</h1>
      <p class="rv-desc">{{ topTag.desc }}</p>
      <div class="rv-dims">
        <span>{{ report.primary.label }} {{ report.primary.value }}</span>
        <span>{{ report.secondary.label }} {{ report.secondary.value }}</span>
      </div>
      <div class="rv-seal"><Icon icon="mdi:shield-moon-outline" /></div>
    </section>

    <!-- 免费操作 -->
    <div class="actions rise" style="animation-delay: 160ms">
      <button class="act retake" @click="retake"><Icon icon="mdi:restart" /> 重新测试</button>
      <button class="act share" @click="openShare"><Icon icon="mdi:image-outline" /> 生成反差卡</button>
    </div>

    <!-- 深度档案（锁） -->
    <section class="deep rise" style="animation-delay: 220ms">
      <p class="block-label mono"><Icon icon="mdi:file-lock-outline" /> 反差人格深报</p>
      <div class="deep-wrap">
        <div class="deep-content" :class="{ 'is-locked': !unlocked }" :aria-hidden="!unlocked">
          <section class="deep-block">
            <p class="block-label mono"><Icon icon="mdi:comment-quote-outline" /> 结论边界</p>
            <div class="note-card"><p>{{ report.summary }}</p></div>
          </section>
          <section class="deep-block">
            <p class="block-label mono"><Icon icon="mdi:tune-variant" /> 四维画像</p>
            <div class="dimension-list">
              <div v-for="dimension in report.dimensions" :key="dimension.key" class="dimension-row">
                <div class="dimension-head"><b>{{ dimension.label }}</b><span class="mono">{{ dimension.value }}</span></div>
                <div class="dimension-track"><i :style="{ width: dimension.value + '%' }"></i></div>
                <p>{{ dimension.copy }}</p>
              </div>
            </div>
          </section>
          <section class="deep-block">
            <p class="block-label mono"><Icon icon="mdi:text-box-search-outline" /> 答题证据</p>
            <div class="evidence-list">
              <article v-for="item in report.evidence" :key="item.questionId" class="evidence-card">
                <span class="mono">第 {{ item.questionId }} 项</span>
                <b>{{ item.answer }}</b>
                <p>{{ item.insight }}</p>
              </article>
            </div>
          </section>
          <section class="deep-block">
            <p class="block-label mono"><Icon icon="mdi:alert-circle-outline" /> 可能被误解的地方</p>
            <ul class="deep-list"><li v-for="(item, index) in report.watchouts" :key="index">{{ item }}</li></ul>
          </section>
          <section class="deep-block">
            <p class="block-label mono"><Icon icon="mdi:compass-outline" /> 可尝试的小动作</p>
            <ol class="suggestion-list"><li v-for="(item, index) in report.suggestions" :key="index"><span class="mono">{{ index + 1 }}</span><p>{{ item }}</p></li></ol>
          </section>
        </div>
        <div v-if="!unlocked" class="deep-lock">
          <span class="deep-lock-icon"><Icon icon="mdi:lock-outline" /></span>
          <strong>反差人格深报已生成</strong>
          <p>四维画像 · 答题证据 · 表达建议</p>
          <button @click="showCard = true"><Icon icon="mdi:key-variant" /> 输入兑换码解锁</button>
          <small>1.9元·15测万能卡，首次激活后同浏览器通用</small>
        </div>
      </div>
      <CardInput :show="showCard" product="mstest" @close="showCard = false" @unlocked="onUnlocked" />
    </section>

    <!-- 引流 -->
    <section class="convert rise" style="animation-delay: 340ms">
      <p class="convert-hint mono">看完反差，再看看你俩</p>
      <button class="convert-btn" @click="goNext"><span class="convert-ic"><Icon icon="mdi:heart-pulse" /></span><span class="convert-tx"><strong>测测你俩的契合度</strong><small>看看你和另一个人的匹配指数</small></span><Icon class="convert-arr" icon="mdi:chevron-right" /></button>
    </section>

    <MoreTests current="mstest" />
    <p class="disclaimer">结果仅基于本次选择生成，用于娱乐和自我观察，不代表心理测量、人格诊断或他人真实评价。</p>

    <!-- 分享档案卡 -->
    <transition name="ov"><div v-if="showShare" class="sh-overlay" @click="showShare = false"><div class="sh-modal" @click.stop><div class="sh-card" ref="shareCardRef">
      <div class="sh-head mono"><span>隐藏反差值 · 场景档案</span><b>FILE MS · V2</b></div>
      <div class="sh-badge mono">隐藏反差值 {{ total }}</div>
      <h2 class="sh-name">{{ topTag.name }}</h2>
      <p class="sh-desc">{{ topTag.desc }}</p>
      <p class="sh-note">主维度 · {{ report.primary.label }}。不同场景里的你，都是真实的一部分。</p>
      <div class="sh-foot"><span class="sh-seal"><Icon icon="mdi:shield-moon-outline" /></span><div class="sh-brand"><p>隐藏反差值测试</p><p class="sh-brand-sub mono">30 道情境 + 1 道自评</p></div></div>
    </div><div class="sh-acts"><button class="sh-save" @click="saveCard"><Icon icon="mdi:download" /> 保存图片</button><button class="sh-close" @click="showShare = false">关闭</button></div><p v-if="saveError" class="save-error">{{ saveError }}</p></div></div></transition>
  </div>
</template>

<script setup>
import MoreTests from '../components/MoreTests.vue'
import CardInput from '../components/CardInput.vue'
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Icon from '../components/Icon.vue'
import { buildContrastReport } from '../data/questions.js'

const router = useRouter(); const route = useRoute()
let answers = []
try { answers = JSON.parse(route.query.answers) || [] } catch (e) { answers = [] }

const bonus = Number(route.query.bonus)
const report = computed(() => buildContrastReport(answers, Number.isFinite(bonus) ? bonus : 5))
const total = computed(() => report.value?.hiddenScore || 0)
const topTag = computed(() => report.value?.archetype || null)
const gradeLabel = computed(() => report.value?.band.grade || '')

const showShare = ref(false); const shareCardRef = ref(null)
const showCard = ref(false); const unlocked = ref(false)
const saveError = ref('')

function isProductUnlocked(product) {
  try {
    const state = JSON.parse(localStorage.getItem('unlocked') || '{}')
    if (state === true || state?.[product]?.unlocked || state?.[product]) return true
  } catch (_) {}
  return document.cookie.split(';').some((item) => item.trim() === 'xpytt_unlocked=1')
}

function refreshUnlock() { unlocked.value = isProductUnlocked('mstest') }
function onUnlocked() { refreshUnlock() }

onMounted(() => {
  refreshUnlock()
  if (!report.value) router.replace('/quiz')
})

function retake() { router.replace('/quiz') }
function openShare() { saveError.value = ''; showShare.value = true }
const nextUrl = import.meta.env.VITE_NEXT_PRODUCT_URL || 'https://cp.xpytt.com'
function goNext() { window.open(nextUrl, '_blank', 'noopener,noreferrer') }

async function saveCard() {
  if (!shareCardRef.value) return
  saveError.value = ''
  try {
    const { default: html2canvas } = await import('html2canvas')
    const canvas = await html2canvas(shareCardRef.value, { scale: 2, backgroundColor: '#0d0c0f', useCORS: true })
    const link = document.createElement('a'); link.download = '隐藏反差值档案.png'
    link.href = canvas.toDataURL('image/png'); link.click()
  } catch (e) { saveError.value = '图片保存失败，请直接截图保存。' }
}
</script>

<style scoped>
.result { --bg:#0d0c0f;--surface:#16141a;--ink:#e8e2dc;--ink-2:#978e84;--ink-3:#6b6260;--red:#b8404e;--red-soft:rgba(184,64,78,.14);--glow:#c28e44;--line:rgba(232,226,220,.09);--line-strong:rgba(232,226,220,.16);--mono:'SFMono-Regular',ui-monospace,'JetBrains Mono',Consolas,monospace;position:relative;min-height:100dvh;max-width:480px;margin:0 auto;background:var(--bg);padding:14px 16px 36px;overflow:hidden }
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
.rv-dims{display:flex;flex-wrap:wrap;gap:6px;margin-top:14px;max-width:76%}.rv-dims span{padding:4px 9px;border:1px solid var(--line);border-radius:7px;background:rgba(255,255,255,.025);font-size:10.5px;color:var(--glow);font-weight:750}
.rv-seal{position:absolute;right:14px;bottom:14px;width:60px;height:60px;border-radius:50%;border:1.5px solid var(--red);color:var(--red);display:grid;place-items:center;font-size:30px;opacity:.7;transform:rotate(8deg)}
.block{margin-top:20px}.block-label{font-size:11px;color:var(--ink-3);display:flex;align-items:center;gap:5px;margin-bottom:10px;padding-left:2px}.block-label svg{color:var(--red)}
.note-card{background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:18px 16px}.note-card p{font-size:14.5px;line-height:1.75;color:var(--ink)}
.tags{display:flex;flex-wrap:wrap;gap:8px}.tag{font-size:12px;color:var(--glow);background:rgba(194,142,68,.12);border-radius:999px;padding:5px 12px;font-weight:700}
.deep{margin-top:22px}.deep>.block-label{margin-bottom:10px}.deep-wrap{position:relative;min-height:300px}.deep-content{transition:filter .35s ease,opacity .35s ease}.deep-content.is-locked{filter:blur(8px) saturate(.65);opacity:.62;pointer-events:none;user-select:none}.deep-block+.deep-block{margin-top:20px}
.deep-lock{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:22px;text-align:center;border:1px solid var(--line-strong);border-radius:15px;background:rgba(13,12,15,.84);backdrop-filter:blur(2px)}
.deep-lock-icon{display:grid;place-items:center;width:44px;height:44px;border-radius:50%;border:1px solid var(--red);background:var(--red-soft);color:var(--red);font-size:24px}.deep-lock strong{margin-top:11px;color:var(--ink);font-size:17px}.deep-lock p{margin-top:6px;color:var(--ink-2);font-size:12.5px}.deep-lock button{display:inline-flex;align-items:center;justify-content:center;gap:7px;margin-top:17px;padding:13px 22px;border:1px solid var(--red);border-radius:12px;background:linear-gradient(135deg,var(--red),#91313c);color:var(--ink);font:inherit;font-size:14px;font-weight:800;box-shadow:0 9px 24px rgba(184,64,78,.22)}.deep-lock button:active{transform:scale(.97)}.deep-lock small{margin-top:10px;color:var(--ink-3);font-size:10.5px}
.dimension-list{display:flex;flex-direction:column;gap:14px}.dimension-head{display:flex;align-items:center;justify-content:space-between}.dimension-head b{font-size:13px;color:var(--ink)}.dimension-head span{font-size:12px;color:var(--glow);font-weight:800}.dimension-track{height:7px;margin-top:7px;border-radius:8px;background:#201c24;overflow:hidden}.dimension-track i{display:block;height:100%;border-radius:inherit;background:linear-gradient(90deg,var(--red),var(--glow))}.dimension-row>p{margin-top:6px;font-size:11.5px;line-height:1.55;color:var(--ink-2)}
.evidence-list{display:flex;flex-direction:column;gap:9px}.evidence-card{padding:13px 14px;border:1px solid var(--line);border-radius:11px;background:var(--surface)}.evidence-card>span{font-size:9.5px;color:var(--red)}.evidence-card>b{display:block;margin-top:4px;font-size:13px;line-height:1.5;color:var(--ink)}.evidence-card>p{margin-top:4px;font-size:11.5px;line-height:1.55;color:var(--ink-2)}
.deep-list{margin:0;padding-left:18px;display:flex;flex-direction:column;gap:9px}.deep-list li{font-size:13px;line-height:1.65;color:var(--ink)}.suggestion-list{list-style:none;display:flex;flex-direction:column;gap:10px}.suggestion-list li{display:flex;align-items:flex-start;gap:9px}.suggestion-list span{flex:0 0 25px;width:25px;height:25px;display:grid;place-items:center;border-radius:7px;background:var(--red-soft);color:var(--red);font-size:10px;font-weight:800}.suggestion-list p{padding-top:1px;font-size:13px;line-height:1.65;color:var(--ink)}
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
.save-error{margin-top:8px;text-align:center;color:#d78b91;font-size:11.5px}
.ov-enter-active,.ov-leave-active{transition:opacity .24s ease}.ov-enter-from,.ov-leave-to{opacity:0}
@media(prefers-reduced-motion:reduce){.rv-seal{transform:rotate(8deg)}}
</style>
