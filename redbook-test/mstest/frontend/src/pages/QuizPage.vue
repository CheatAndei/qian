<template>
  <div class="quiz">
    <header class="topbar"><button class="exit" @click="handleExit" aria-label="退出"><Icon icon="mdi:close-thick" /></button><div class="track"><div class="track-fill" :style="{ width: progressPct + '%' }"></div></div><span class="counter mono">{{ currentNo }}<i>/{{ totalQuestions }}</i></span></header>
    <main class="body" v-if="!finished">
      <transition :name="slideDir" mode="out-in"><div class="dossier" :key="currentIdx">
        <template v-if="!isBonus">
          <div class="dos-head"><span class="dos-q mono">探测第 {{ currentIdx + 1 }} 项</span><span class="dos-lvl mono">深度 · 3 级</span></div>
          <h2 class="dos-question">{{ currentQ.question }}</h2>
          <div class="picks">
            <button v-for="(opt, i) in currentQ.options" :key="i" class="pick" :class="{ 'is-pick': selected === i }" @click="selectOption(i)">
              <span class="pick-key mono">{{ ['A', 'B', 'C', 'D'][i] }}</span><span class="pick-text">{{ opt.text }}</span>
              <Icon v-if="selected === i" class="pick-on" icon="mdi:check-circle" />
            </button>
          </div>
          <div class="dos-foot"><button class="prev" :class="{ hide: currentIdx === 0 }" @click="goPrev"><Icon icon="mdi:chevron-left" /> 上一项</button><span class="hint mono" v-if="selected === null">选择后自动进入下一项</span></div>
        </template>
        <template v-else>
          <div class="dos-head"><span class="dos-q mono">自评项</span><span class="dos-lvl mono">自由 · 0–10</span></div>
          <h2 class="dos-question">{{ bonusQ.question }}</h2><p class="bonus-tip">{{ bonusQ.subtitle }}</p>
          <div class="bonus-read"><span class="bonus-num mono">{{ bonusScore }}</span><i class="mono">/10</i><span class="bonus-mood mono">{{ bonusMood }}</span></div>
          <input type="range" min="0" max="10" v-model.number="bonusScore" class="bonus-range" /><div class="bonus-scale mono"><span>0</span><span>5</span><span>10</span></div>
          <button class="bonus-cta" @click="submitBonus"><Icon icon="mdi:file-hidden" /> 加密生成档案</button><button class="bonus-back" @click="goPrev">再想一下</button>
        </template>
      </div></transition>
      <div class="notes" v-if="roastHistory.length"><p class="notes-title mono"><Icon icon="mdi:comment-quote-outline" /> 探测批注</p><TransitionGroup name="note" tag="div" class="notes-list"><div v-for="(item, idx) in roastHistory" :key="item.id" class="note-item" :class="['m-' + item.cls, { 'is-new': idx === roastHistory.length - 1 }]"><Icon class="note-ic" :icon="item.icon" /><span class="note-text">{{ item.text }}</span></div></TransitionGroup></div>
    </main>
    <div class="finish" v-else><div class="finish-ring"><Icon icon="mdi:file-hidden" /></div><h2>探测完成</h2><p class="mono">正在加密生成你的匿名档案…</p></div>
  </div>
</template>
<script setup>
import { ref, computed, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import gsap from 'gsap'
import Icon from '../components/Icon.vue'
import { questions, bonusQuestion } from '../data/questions.js'
const router = useRouter() ; const currentIdx=ref(0); const answersMap=ref({}); const selected=ref(null); const slideDir=ref('slide-left'); const finished=ref(false); const bonusScore=ref(5)
const bonusMood = computed(() => { if (bonusScore.value <= 3) return '保守'; if (bonusScore.value <= 5) return '中庸'; if (bonusScore.value <= 7) return '坦率'; if (bonusScore.value <= 9) return '真实'; return '满格' })
const roastHistory=ref([]); let roastId=0, lock=false
function shuffle(arr){ const a=[...arr]; for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]] } return a }
const shuffledCache={}; function getShuffled(q){ if(!shuffledCache[q.id]) shuffledCache[q.id]=shuffle(q.options); return shuffledCache[q.id] }
const totalQuestions=31; const isBonus=computed(()=>currentIdx.value>=questions.length)
const currentQ=computed(()=>{ const q=questions[currentIdx.value]; return{...q,options:getShuffled(q)} })
const bonusQ=bonusQuestion; const currentNo=computed(()=>isBonus.value?'B':currentIdx.value+1); const progressPct=computed(()=>(currentIdx.value/(questions.length+1))*100)
function restoreSelected(){ if(isBonus.value){selected.value=null;return} const prev=answersMap.value[currentQ.value.id]; selected.value=prev?currentQ.value.options.findIndex(o=>o.text===prev.text):null }; restoreSelected()
function stripEmoji(s){ return String(s||'').replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2190}-\u{21FF}\u{2B00}-\u{2BFF}️‍]/gu,'').trim() }
const fallback={3:['这项探测很准','直中要害'],2:['有点意思','记录在案'],1:['存疑','需要更多数据'],0:['此项待复测','数据不足']}
const markByScore={3:{icon:'mdi:star',cls:'ok'},2:{icon:'mdi:check-circle',cls:'ok'},1:{icon:'mdi:eye-outline',cls:'warn'},0:{icon:'mdi:ghost-outline',cls:'bad'}}
function selectOption(i){ if(lock)return; lock=true; selected.value=i; nextTick(()=>{ const el=document.querySelector('.pick.is-pick'); if(el) gsap.from(el,{scale:.97,duration:.35,ease:'back.out(2)'}) }); const opt=currentQ.value.options[i]; answersMap.value[currentQ.value.id]={questionId:currentQ.value.id,score:opt.score,tags:opt.tags||[],text:opt.text}; const text=stripEmoji(opt.roast||(fallback[opt.score]||fallback[1])[0]); const mark=markByScore[opt.score]||markByScore[1]; const id=++roastId; roastHistory.value.push({id,text,icon:mark.icon,cls:mark.cls}); if(roastHistory.value.length>3) roastHistory.value.shift(); setTimeout(()=>{roastHistory.value=roastHistory.value.filter(r=>r.id!==id)},5200); nextTick(()=>{const items=document.querySelectorAll('.note-item.is-new');const last=items[items.length-1];if(last)gsap.from(last,{opacity:0,y:18,scale:.85,duration:.4,ease:'back.out(1.7)'})}); setTimeout(()=>goNext(),450) }
function goNext(){ if(currentIdx.value<questions.length){slideDir.value='slide-left';currentIdx.value++;restoreSelected();lock=false;window.scrollTo({top:0,behavior:'smooth'})} }
function goPrev(){ if(currentIdx.value===0)return;slideDir.value='slide-right';currentIdx.value--;restoreSelected();lock=false;window.scrollTo({top:0,behavior:'smooth'}) }
function handleExit(){ if(Object.keys(answersMap.value).length>0&&!window.confirm('确定要退出吗？已答的题目不会保存。'))return;router.replace('/') }
function submitBonus(){ const objectiveScore=Object.values(answersMap.value).reduce((sum,a)=>sum+(a.score||0),0); const total=objectiveScore+bonusScore.value; const answerList=Object.values(answersMap.value); finished.value=true; setTimeout(()=>router.push({path:'/result',query:{objective:objectiveScore,bonus:bonusScore.value,total,answers:JSON.stringify(answerList)}}),1000) }
</script>
<style scoped>
.quiz { --bg:#0d0c0f;--surface:#16141a;--ink:#e8e2dc;--ink-2:#978e84;--ink-3:#6b6260;--red:#b8404e;--red-soft:rgba(184,64,78,.14);--glow:#c28e44;--line:rgba(232,226,220,.09);--mono:'SFMono-Regular',ui-monospace,'JetBrains Mono',Consolas,monospace;min-height:100vh;max-width:480px;margin:0 auto;background:var(--bg);display:flex;flex-direction:column;overflow-x:hidden }
.mono{font-family:var(--mono);font-variant-numeric:tabular-nums;letter-spacing:.3px}
.topbar{position:sticky;top:0;z-index:10;display:flex;align-items:center;gap:12px;padding:12px 16px;background:color-mix(in srgb,var(--bg) 90%,transparent);backdrop-filter:blur(10px);border-bottom:1px solid var(--line)}
.exit{width:40px;height:40px;border:1px solid var(--line);background:var(--surface);color:var(--ink-2);border-radius:11px;font-size:16px;display:grid;place-items:center}
.track{flex:1;height:8px;border-radius:99px;background:#201c24;overflow:hidden}.track-fill{height:100%;background:linear-gradient(90deg,var(--red),var(--glow));border-radius:inherit;transition:width .35s ease}
.counter{font-size:14px;color:var(--ink);font-weight:800;flex-shrink:0;white-space:nowrap}.counter i{font-style:normal;color:var(--ink-3);font-size:12px;font-weight:400}
.body{flex:1;padding:18px 16px 40px}
.dossier{background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:20px 18px 22px;position:relative;box-shadow:0 10px 30px rgba(0,0,0,.3)}
.dos-head{display:flex;align-items:center;gap:10px}.dos-q{font-size:12px;color:var(--glow);background:rgba(194,142,68,.12);padding:3px 11px;border-radius:6px;font-weight:800}.dos-lvl{font-size:10.5px;color:var(--ink-3)}
.dos-question{font-size:21px;font-weight:800;color:var(--ink);line-height:1.45;margin:14px 0 20px}
.picks{display:flex;flex-direction:column;gap:10px}
.pick{display:flex;align-items:center;gap:12px;width:100%;padding:13px 14px;border:1px solid var(--line);border-radius:12px;background:var(--bg);text-align:left;font-family:inherit;transition:border-color .2s,background .2s}
.pick:active{transform:scale(.99)}.pick.is-pick{border-color:var(--red);background:var(--red-soft)}
.pick-key{width:28px;height:28px;border-radius:8px;border:1px solid var(--line);color:var(--ink-2);font-size:12px;font-weight:800;display:grid;place-items:center;flex-shrink:0;transition:all .2s}
.pick.is-pick .pick-key{background:var(--red);border-color:var(--red);color:#fff}
.pick-text{flex:1;font-size:14.5px;color:var(--ink);line-height:1.5}.pick-on{color:var(--red);font-size:18px;flex-shrink:0}
.dos-foot{display:flex;align-items:center;justify-content:space-between;margin-top:18px;min-height:36px}
.prev{border:none;background:#201c24;color:var(--ink-2);display:inline-flex;align-items:center;gap:3px;font-size:13px;font-weight:600;padding:9px 16px;border-radius:18px}.prev.hide{visibility:hidden}.hint{font-size:11px;color:var(--ink-3)}
.bonus-tip{font-size:13px;color:var(--ink-2);margin:10px 0 16px}.bonus-read{display:flex;align-items:baseline;gap:6px}.bonus-num{font-size:44px;font-weight:900;color:var(--red);line-height:1}.bonus-read i{font-style:normal;font-size:16px;color:var(--ink-3)}.bonus-mood{margin-left:auto;align-self:center;font-size:13px;color:var(--ink-2);border:1px solid var(--line);padding:3px 12px;border-radius:99px}
.bonus-range{width:100%;margin:14px 0 4px;-webkit-appearance:none;appearance:none;height:6px;border-radius:6px;background:linear-gradient(90deg,#201c24,var(--red));outline:none}.bonus-range::-webkit-slider-thumb{-webkit-appearance:none;width:28px;height:28px;border-radius:50%;background:var(--surface);border:3px solid var(--red);box-shadow:0 2px 10px rgba(184,64,78,.25);cursor:pointer}
.bonus-scale{display:flex;justify-content:space-between;font-size:11px;color:var(--ink-3);margin-bottom:20px;padding:0 4px}
.bonus-cta{width:100%;height:52px;border:none;border-radius:13px;background:linear-gradient(135deg,var(--red),#9b3540);color:var(--ink);font-size:16px;font-weight:800;display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:10px}.bonus-cta:active{transform:scale(.98)}.bonus-back{border:none;background:none;font-size:13px;color:var(--ink-3);padding:4px;font-family:inherit}
.notes{padding:16px 8px 0}.notes-title{font-size:11px;color:var(--ink-3);display:flex;align-items:center;gap:5px;margin-bottom:8px}.notes-list{display:flex;flex-direction:column;gap:6px}.note-item{display:flex;align-items:center;gap:9px;background:var(--surface);border:1px solid var(--line);padding:9px 13px;border-radius:10px;max-height:60px;overflow:hidden;animation:noteFade 5s ease-in forwards}.note-ic{font-size:18px;flex-shrink:0}.m-ok .note-ic{color:var(--glow)}.m-warn .note-ic{color:var(--ink-2)}.m-bad .note-ic{color:var(--red)}.note-text{font-size:13px;color:var(--ink);line-height:1.4}@keyframes noteFade{0%{opacity:1}64%{opacity:.7}100%{opacity:0}}.note-enter-active{animation:noteIn .35s ease}.note-leave-active{transition:max-height .4s ease,padding .4s ease,margin .4s ease,opacity .3s ease;max-height:0!important;padding-top:0!important;padding-bottom:0!important;margin-bottom:0!important;opacity:0}.note-move{transition:transform .4s ease}@keyframes noteIn{from{transform:translateY(10px) scale(.9);opacity:0}to{transform:translateY(0) scale(1);opacity:1}}
.slide-left-enter-active,.slide-left-leave-active,.slide-right-enter-active,.slide-right-leave-active{transition:all .28s ease}.slide-left-enter-from{transform:translateX(28px);opacity:0}.slide-left-leave-to{transform:translateX(-28px);opacity:0}.slide-right-enter-from{transform:translateX(-28px);opacity:0}.slide-right-leave-to{transform:translateX(28px);opacity:0}
.finish{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:60vh;gap:10px}.finish-ring{width:84px;height:84px;border-radius:50%;border:1px solid var(--line);background:var(--surface);display:grid;place-items:center;color:var(--red);font-size:40px}.finish h2{font-size:22px;color:var(--ink)}.finish p{font-size:13px;color:var(--ink-2)}
@media(prefers-reduced-motion:reduce){.note-item{animation:none!important}}
</style>
