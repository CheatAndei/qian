<template>
  <transition name="ov">
    <div v-if="show" class="ci-overlay" @click="$emit('close')">
      <div class="ci-modal" role="dialog" aria-modal="true" aria-labelledby="card-unlock-title" @click.stop>
        <button class="ci-close" @click="$emit('close')" aria-label="关闭">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        <div class="ci-body">
          <p id="card-unlock-title" class="ci-title">1.9元 · 15测万能卡</p>
          <p class="ci-sub">输入兑换码，解锁全矩阵深度报告</p>
          <label class="ci-label" for="card-unlock-code">兑换码</label>
          <input id="card-unlock-code" ref="inputRef" v-model="code" class="ci-input" placeholder="请输入兑换码" :disabled="loading" @keyup.enter="handleRedeem" autocomplete="off" spellcheck="false" />
          <button class="ci-btn" @click="handleRedeem" :disabled="loading || !code.trim()">
            <span>{{ loading ? '验证中…' : '确认解锁' }}</span>
          </button>
          <p class="ci-msg" v-if="msg" :class="{ 'ci-msg--err': !success }" role="status" aria-live="polite">{{ msg }}</p>
          <p class="ci-tip">未购买？请到小红书店铺购买</p>
          <ul class="ci-notice">
            <li>每码仅可首次激活一次，请在常用浏览器操作</li>
            <li>跨测试解锁状态最长保存365天，以浏览器实际保留为准</li>
            <li>换设备、浏览器或清理数据后，权益可能无法恢复</li>
          </ul>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, nextTick, watch } from 'vue'
const props = defineProps({ show: Boolean, product: { type: String, default: 'eletest' } })
const emit = defineEmits(['close', 'unlocked'])
const RAW_API_BASE = import.meta.env.VITE_API_BASE || '/api'
const API_BASE = RAW_API_BASE.replace(/\/+$/, '')
const ALL_PRODUCTS = ['bftest', 'gftest', 'cptest', 'mstest', 'lovetest', 'shiptest', 'ggtest', 'lswtest', 'emotest', 'eletest', 'citytest', 'lvtest', 'trusttest', 'last8test', 'restarttest']
const code = ref(''); const loading = ref(false); const msg = ref(''); const success = ref(false); const inputRef = ref(null)
watch(() => props.show, async (v) => { if (v) { code.value = ''; msg.value = ''; success.value = false; await nextTick(); inputRef.value?.focus() } })
function readUnlockedState() { try { return JSON.parse(localStorage.getItem('unlocked') || '{}') } catch (_) { return {} } }
function saveSharedUnlockCookie() { const maxAge = 60 * 60 * 24 * 365; document.cookie = 'xpytt_unlocked=1; Max-Age=' + maxAge + '; Path=/; SameSite=Lax; Secure'; document.cookie = 'xpytt_unlocked=1; Max-Age=' + maxAge + '; Path=/; Domain=.xpytt.com; SameSite=Lax; Secure' }
function saveUnlockState(data) { const at = data.unlockedAt || new Date().toISOString(); const unlocks = Array.isArray(data.unlocks) && data.unlocks.length ? data.unlocks : ALL_PRODUCTS; const prev = readUnlockedState(); const next = { ...prev, _version: 1, _source: 'cardkey', _unlockedAt: at }; delete next._cardKey; for (const p of unlocks) next[p] = { unlocked: true, at }; saveSharedUnlockCookie(); try { localStorage.setItem('unlocked', JSON.stringify(next)) } catch (_) {} }
async function handleRedeem() { if (!code.value.trim()) return; loading.value = true; msg.value = ''; success.value = false; try { const res = await fetch(API_BASE + '/cardkey/redeem', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ key: code.value.trim(), product: props.product }) }); const data = await res.json(); if (data.ok) { success.value = true; msg.value = '兑换成功，15项深度报告已解锁'; saveUnlockState(data); setTimeout(() => { emit('unlocked', data); emit('close') }, 700) } else { success.value = false; msg.value = data.message || '兑换失败' } } catch (e) { success.value = false; msg.value = '网络错误，请重试' } finally { loading.value = false } }
</script>

<style scoped>
.ci-overlay { position: fixed; inset: 0; z-index: 999; background: rgba(0,0,0,.55); display: grid; place-items: center; padding: 18px; animation: ci-fade-in .22s ease both; }
@keyframes ci-fade-in { from { opacity: 0; } to { opacity: 1; } }
.ov-enter-active { transition: opacity .24s ease; }
.ov-leave-active { transition: opacity .18s ease; }
.ov-enter-from,.ov-leave-to { opacity: 0; }
.ci-modal { position: relative; width: 330px; max-width: 100%; background: #fff; border-radius: 18px; padding: 28px 24px 22px; box-shadow: 0 20px 50px rgba(0,0,0,.35); animation: ci-pop .3s cubic-bezier(.2,1,.3,1) both; }
@keyframes ci-pop { from { transform: scale(.92) translateY(12px); opacity: 0; } to { transform: none; opacity: 1; } }
.ci-close { position: absolute; top: 6px; right: 6px; width: 44px; height: 44px; border: none; background: transparent; color: #777; border-radius: 10px; font-size: 17px; display: flex; align-items: center; justify-content: center; cursor: pointer; }
.ci-close:hover { background: rgba(0,0,0,.04); color: #666; }
.ci-title { font-size: 18px; line-height: 1.35; font-weight: 800; color: #1a1a1a; margin-bottom: 5px; text-wrap: balance; }
.ci-sub { font-size: 13px; color: #777; margin-bottom: 18px; }
.ci-label { display: block; margin: 0 0 7px; color: #444; font-size: 12px; font-weight: 700; }
.ci-input { width: 100%; padding: 14px 16px; background: #f5f3f0; border: 1.5px solid #e0dbd4; border-radius: 12px; font-size: 18px; text-align: center; letter-spacing: 2px; color: #1a1a1a; outline: none; box-sizing: border-box; font-family: ui-monospace, 'SFMono-Regular', Consolas, monospace; }
.ci-input::placeholder { color: #bbb; letter-spacing: 0; font-family: system-ui, -apple-system, sans-serif; font-size: 14px; }
.ci-input:focus { border-color: #999; }
.ci-close:focus-visible, .ci-input:focus-visible, .ci-btn:focus-visible { outline: 3px solid rgba(26,26,26,.32); outline-offset: 2px; }
.ci-btn { display: flex; align-items: center; justify-content: center; width: 100%; margin-top: 14px; padding: 14px; border: none; border-radius: 12px; background: #1a1a1a; color: #fff; font-size: 15px; font-weight: 800; cursor: pointer; font-family: inherit; }
.ci-btn:active { transform: scale(.98); }
.ci-btn:disabled { opacity: .35; }
.ci-msg { text-align: center; font-size: 13px; font-weight: 600; margin-top: 12px; color: #2f9e44; }
.ci-msg--err { color: #d7263d; }
.ci-tip { text-align: center; font-size: 12px; font-weight: 600; color: #666; margin-top: 14px; line-height: 1.5; }
.ci-notice { list-style: none; margin: 10px 0 0; padding: 10px 12px; border-radius: 10px; background: #f6f4f1; color: #8a847d; font-size: 11px; line-height: 1.5; text-align: left; }
.ci-notice li { position: relative; padding-left: 10px; }
.ci-notice li + li { margin-top: 4px; }
.ci-notice li::before { content: '·'; position: absolute; left: 0; font-weight: 800; }
@media (prefers-reduced-motion: reduce) {
  .ci-overlay, .ci-modal { animation: none; }
  .ov-enter-active, .ov-leave-active { transition: none; }
}
</style>
