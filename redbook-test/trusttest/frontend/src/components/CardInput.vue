<template>
  <transition name="modal-fade">
    <div
      v-if="show"
      class="modal-backdrop"
      @click.self="closeModal"
      @keydown.esc="closeModal"
    >
      <section
        ref="dialogRef"
        class="redeem-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="redeem-title"
        tabindex="-1"
        @keydown.tab="keepFocusInside"
      >
        <button class="dialog-close" type="button" aria-label="关闭兑换码窗口" @click="closeModal">
          关闭
        </button>
        <p class="dialog-kicker">15测万能卡兑换</p>
        <h2 id="redeem-title">1.9元 · 解锁15项深度报告</h2>
        <p class="dialog-copy">每码仅可首次激活一次。建议在常用浏览器兑换并及时保存结果。</p>

        <form class="redeem-form" @submit.prevent="handleRedeem">
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
            placeholder="输入店铺发放的兑换码"
          />
          <button class="primary-button" type="submit" :disabled="loading || !code.trim()">
            {{ loading ? '正在核验' : '确认解锁' }}
          </button>
        </form>

        <p v-if="message" class="form-message" :class="{ 'is-error': !success }" role="status">
          {{ message }}
        </p>
        <ul class="redeem-notes">
          <li>同一浏览器可读取全矩阵解锁状态</li>
          <li>换设备、清理数据后，权益可能无法自动恢复</li>
          <li>虚拟内容兑换后不支持无理由退款</li>
        </ul>
      </section>
    </div>
  </transition>
</template>

<script setup>
import { nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { ALL_PRODUCTS } from '../composables/useUnlock.js'

const props = defineProps({
  show: Boolean,
  product: { type: String, default: 'trusttest' },
})
const emit = defineEmits(['close', 'unlocked'])

const RAW_API_BASE = import.meta.env.VITE_API_BASE || '/api'
const API_BASE = RAW_API_BASE.replace(/\/+$/, '')
const code = ref('')
const loading = ref(false)
const message = ref('')
const success = ref(false)
const inputRef = ref(null)
const dialogRef = ref(null)

watch(() => props.show, async (visible) => {
  document.body.style.overflow = visible ? 'hidden' : ''
  if (!visible) return
  code.value = ''
  message.value = ''
  success.value = false
  await nextTick()
  inputRef.value?.focus()
})

onBeforeUnmount(() => { document.body.style.overflow = '' })

function closeModal() {
  if (!loading.value) emit('close')
}

function keepFocusInside(event) {
  const focusable = [...(dialogRef.value?.querySelectorAll('button:not(:disabled), input:not(:disabled)') || [])]
  if (!focusable.length) return
  const first = focusable[0]
  const last = focusable[focusable.length - 1]
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  }
}

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
  const unlockedAt = data.unlockedAt || new Date().toISOString()
  const serverProducts = Array.isArray(data.unlocks) ? data.unlocks : []
  const products = [...new Set([...ALL_PRODUCTS, ...serverProducts])]
  const next = {
    ...readUnlocks(),
    _version: 1,
    _source: 'cardkey',
    _unlockedAt: unlockedAt,
  }
  delete next._cardKey
  for (const product of products) next[product] = { unlocked: true, at: unlockedAt }
  saveSharedCookie()
  try {
    localStorage.setItem('unlocked', JSON.stringify(next))
  } catch (_) {
    // Cookie 仍可维持当前域名下的共享解锁状态。
  }
}

async function handleRedeem() {
  const key = code.value.trim()
  if (!key || loading.value) return
  loading.value = true
  message.value = ''
  success.value = false

  try {
    const response = await fetch(`${API_BASE}/cardkey/redeem`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, product: props.product }),
    })
    let data
    try {
      data = await response.json()
    } catch (_) {
      throw new Error('服务暂时不可用，请稍后重试')
    }
    if (!response.ok || !data.ok) {
      throw new Error(data.message || '兑换失败，请检查兑换码')
    }
    saveUnlockState(data)
    success.value = true
    message.value = '兑换成功，15 项深度报告已在当前浏览器解锁'
    window.setTimeout(() => {
      emit('unlocked', data)
      emit('close')
    }, 550)
  } catch (error) {
    message.value = error instanceof Error ? error.message : '网络异常，请稍后重试'
  } finally {
    loading.value = false
  }
}
</script>
