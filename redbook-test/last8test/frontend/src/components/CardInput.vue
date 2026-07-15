<template>
  <transition name="modal-fade">
    <div
      v-if="show"
      class="card-overlay"
      @click.self="emit('close')"
      @keydown.esc="emit('close')"
    >
      <section
        ref="dialogRef"
        class="card-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="card-title"
        tabindex="-1"
      >
        <button class="dialog-close" type="button" aria-label="关闭兑换码窗口" @click="emit('close')">×</button>

        <p class="dialog-price">1.9元 · 15测万能卡</p>
        <h2 id="card-title">解锁15项深度报告</h2>
        <p class="dialog-copy">输入店铺发放的兑换码。本次激活会在当前浏览器保存解锁状态。</p>

        <form @submit.prevent="redeem">
          <label for="card-code">兑换码</label>
          <input
            id="card-code"
            ref="inputRef"
            v-model="code"
            type="text"
            inputmode="text"
            autocomplete="off"
            spellcheck="false"
            :disabled="loading"
            aria-describedby="card-help card-message"
          />
          <p id="card-help" class="input-help">请原样输入，字母不区分大小写。</p>
          <button class="redeem-button" type="submit" :disabled="loading || !code.trim()">
            {{ loading ? '正在验证' : '确认解锁' }}
          </button>
        </form>

        <p id="card-message" class="card-message" :class="{ error: message && !success }" aria-live="polite">
          {{ message }}
        </p>

        <ul class="card-notice">
          <li>每码仅能首次激活一次，请在常用浏览器兑换。</li>
          <li>更换设备、清理浏览器数据后，权益可能无法恢复。</li>
          <li>未购买可返回小红书店铺购买完整报告兑换码。</li>
        </ul>
      </section>
    </div>
  </transition>
</template>

<script setup>
import { nextTick, ref, watch } from 'vue'
import { ALL_PRODUCTS } from '../composables/useUnlock.js'

const props = defineProps({
  show: Boolean,
  product: { type: String, default: 'last8test' },
})
const emit = defineEmits(['close', 'unlocked'])

const API_BASE = (import.meta.env.VITE_API_BASE || '/api').replace(/\/+$/, '')
const code = ref('')
const loading = ref(false)
const message = ref('')
const success = ref(false)
const inputRef = ref(null)
const dialogRef = ref(null)

watch(
  () => props.show,
  async (visible) => {
    if (!visible) return
    code.value = ''
    message.value = ''
    success.value = false
    await nextTick()
    dialogRef.value?.focus()
    inputRef.value?.focus()
  },
)

function readUnlocks() {
  try {
    return JSON.parse(localStorage.getItem('unlocked') || '{}')
  } catch (_) {
    return {}
  }
}

function saveSharedCookie() {
  const maxAge = 60 * 60 * 24 * 365
  document.cookie = `xpytt_unlocked=1; Max-Age=${maxAge}; Path=/; SameSite=Lax; Secure`
  document.cookie = `xpytt_unlocked=1; Max-Age=${maxAge}; Path=/; Domain=.xpytt.com; SameSite=Lax; Secure`
}

function saveUnlockState(data) {
  const at = data.unlockedAt || new Date().toISOString()
  const serverProducts = Array.isArray(data.unlocks) ? data.unlocks : []
  const products = [...new Set([...ALL_PRODUCTS, ...serverProducts])]
  const next = {
    ...readUnlocks(),
    _version: 1,
    _source: 'cardkey',
    _unlockedAt: at,
  }
  delete next._cardKey

  for (const product of products) next[product] = { unlocked: true, at }
  saveSharedCookie()
  try {
    localStorage.setItem('unlocked', JSON.stringify(next))
  } catch (_) {
    // Cookie remains as the cross-product MVP fallback.
  }
}

async function redeem() {
  if (!code.value.trim() || loading.value) return
  loading.value = true
  message.value = ''
  success.value = false

  try {
    const response = await fetch(`${API_BASE}/cardkey/redeem`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: code.value.trim(), product: props.product }),
    })
    const data = await response.json()
    if (!response.ok || !data.ok) {
      message.value = data.message || '兑换失败，请检查兑换码后重试。'
      return
    }

    saveUnlockState(data)
    success.value = true
    message.value = '兑换成功，15项深度报告已解锁。'
    window.setTimeout(() => {
      emit('unlocked', data)
      emit('close')
    }, 650)
  } catch (_) {
    message.value = '网络连接失败，请稍后重试。'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.card-overlay {
  position: fixed;
  inset: 0;
  z-index: 30;
  display: grid;
  place-items: center;
  padding: 18px;
  background: rgb(6 7 7 / 78%);
}

.card-dialog {
  position: relative;
  width: min(100%, 380px);
  max-height: calc(100dvh - 36px);
  overflow-y: auto;
  padding: 28px 22px 22px;
  border: 1px solid var(--line-strong);
  border-radius: var(--radius-panel);
  background: var(--surface-raised);
  box-shadow: 0 28px 72px rgb(0 0 0 / 45%);
  outline: none;
}

.dialog-close {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 44px;
  min-height: 44px;
  border: 0;
  background: transparent;
  color: var(--text-muted);
  font: 400 28px/1 var(--font-sans);
}

.dialog-price {
  margin: 0 48px 5px 0;
  color: var(--charge);
  font: 750 13px/1.4 var(--font-mono);
  letter-spacing: 0.08em;
}

h2 {
  margin: 0;
  font-size: 23px;
  line-height: 1.25;
}

.dialog-copy {
  margin: 9px 0 20px;
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.65;
}

form {
  display: grid;
  gap: 8px;
}

label {
  color: var(--text-primary);
  font-size: 13px;
  font-weight: 700;
}

input {
  width: 100%;
  min-height: 48px;
  box-sizing: border-box;
  border: 1px solid var(--line-strong);
  border-radius: var(--radius-control);
  background: var(--surface);
  color: var(--text-primary);
  padding: 10px 13px;
  font: 700 17px/1.3 var(--font-mono);
  letter-spacing: 0.08em;
  text-align: center;
}

input:focus-visible {
  border-color: var(--charge);
  outline: 3px solid rgb(93 210 133 / 22%);
}

.input-help {
  margin: 0 0 4px;
  color: var(--text-muted);
  font-size: 12px;
}

.redeem-button {
  width: 100%;
  min-height: 48px;
  border: 1px solid var(--charge);
  border-radius: var(--radius-control);
  background: var(--charge);
  color: #102016;
  font-weight: 850;
}

.redeem-button:disabled {
  border-color: var(--line-strong);
  background: var(--surface-soft);
  color: var(--text-muted);
  cursor: not-allowed;
}

.card-message {
  min-height: 20px;
  margin: 12px 0 0;
  color: var(--charge);
  font-size: 13px;
  text-align: center;
}

.card-message.error { color: var(--warning); }

.card-notice {
  margin: 12px 0 0;
  padding: 13px 13px 13px 30px;
  border-radius: var(--radius-control);
  background: var(--surface-soft);
  color: var(--text-muted);
  font-size: 11px;
  line-height: 1.6;
}

.modal-fade-enter-active,
.modal-fade-leave-active { transition: opacity 180ms ease; }
.modal-fade-enter-from,
.modal-fade-leave-to { opacity: 0; }

@media (prefers-reduced-motion: reduce) {
  .modal-fade-enter-active,
  .modal-fade-leave-active { transition: none; }
}
</style>
