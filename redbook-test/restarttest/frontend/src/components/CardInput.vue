<template>
  <transition name="fade">
    <div v-if="show" class="overlay" @click="$emit('close')">
      <div class="modal" role="dialog" aria-modal="true" aria-labelledby="redeem-title" @click.stop @keydown.esc="$emit('close')">
        <button class="close" type="button" aria-label="关闭兑换码输入框" @click="$emit('close')">
          <Icon icon="mdi:close" />
        </button>
      <p id="redeem-title" class="title">1.9元 · 15测万能卡</p>
        <p class="sub">输入兑换码，解锁全矩阵深度报告</p>
        <label for="restart-card-key">兑换码</label>
        <input
          id="restart-card-key"
          ref="inputRef"
          v-model="code"
          placeholder="请输入兑换码"
          :disabled="loading"
          autocomplete="off"
          spellcheck="false"
          @keyup.enter="handleRedeem"
        />
        <button class="redeem" type="button" :disabled="loading || !code.trim()" @click="handleRedeem">
          {{ loading ? '验证中...' : '确认解锁' }}
        </button>
        <p v-if="msg" class="message" :class="{ error: !success }" role="status">{{ msg }}</p>
        <p class="tip">未购买？请到小红书店铺购买</p>
        <ul class="notice">
          <li>每码仅可首次激活一次，请在常用浏览器操作</li>
          <li>同一浏览器的解锁状态最长保存 365 天</li>
          <li>换设备、换浏览器或清理数据后，权益可能无法恢复</li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { nextTick, ref, watch } from 'vue'

const props = defineProps({
  show: Boolean,
  product: { type: String, default: 'restarttest' },
})
const emit = defineEmits(['close', 'unlocked'])

const RAW_API_BASE = import.meta.env.VITE_API_BASE || '/api'
const API_BASE = RAW_API_BASE.replace(/\/+$/, '')
const ALL_PRODUCTS = ['bftest', 'gftest', 'cptest', 'mstest', 'lovetest', 'shiptest', 'ggtest', 'lswtest', 'emotest', 'eletest', 'citytest', 'lvtest', 'trusttest', 'last8test', 'restarttest']

const code = ref('')
const loading = ref(false)
const msg = ref('')
const success = ref(false)
const inputRef = ref(null)

watch(() => props.show, async (visible) => {
  if (!visible) return
  code.value = ''
  msg.value = ''
  success.value = false
  await nextTick()
  inputRef.value?.focus()
})

function readUnlockedState() {
  try {
    return JSON.parse(localStorage.getItem('unlocked') || '{}')
  } catch (_) {
    return {}
  }
}

function saveSharedUnlockCookie() {
  const maxAge = 60 * 60 * 24 * 365
  document.cookie = `xpytt_unlocked=1; Max-Age=${maxAge}; Path=/; SameSite=Lax; Secure`
  document.cookie = `xpytt_unlocked=1; Max-Age=${maxAge}; Path=/; Domain=.xpytt.com; SameSite=Lax; Secure`
}

function saveUnlockState(data) {
  const at = data.unlockedAt || new Date().toISOString()
  const unlocks = Array.isArray(data.unlocks) && data.unlocks.length ? data.unlocks : ALL_PRODUCTS
  const previous = readUnlockedState()
  const next = { ...previous, _version: 1, _source: 'cardkey', _unlockedAt: at }
  delete next._cardKey
  for (const product of unlocks) next[product] = { unlocked: true, at }
  saveSharedUnlockCookie()
  try {
    localStorage.setItem('unlocked', JSON.stringify(next))
  } catch (_) {}
}

async function handleRedeem() {
  if (!code.value.trim() || loading.value) return
  loading.value = true
  msg.value = ''
  success.value = false
  try {
    const response = await fetch(`${API_BASE}/cardkey/redeem`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: code.value.trim(), product: props.product }),
    })
    const data = await response.json()
    if (!data.ok) {
      msg.value = data.message || '兑换失败'
      return
    }
    success.value = true
    msg.value = '兑换成功，15 项深度报告已解锁'
    saveUnlockState(data)
    window.setTimeout(() => {
      emit('unlocked', data)
      emit('close')
    }, 700)
  } catch (_) {
    msg.value = '网络错误，请重试'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  z-index: 999;
  display: grid;
  place-items: center;
  padding: 18px;
  background: rgba(5, 5, 4, 0.82);
  backdrop-filter: blur(8px);
}

.modal {
  position: relative;
  width: 100%;
  max-width: 340px;
  padding: 26px 22px 20px;
  border: 1px solid var(--line-strong);
  border-radius: var(--radius);
  background: #1d1d19;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.42);
}

.close {
  position: absolute;
  top: 8px;
  right: 8px;
  display: inline-flex;
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 10px;
  background: transparent;
  color: var(--ink-3);
  cursor: pointer;
}

.title {
  padding-right: 38px;
  font-size: 19px;
  font-weight: 900;
}

.sub {
  margin-top: 5px;
  color: var(--ink-2);
  font-size: 12px;
}

label {
  display: block;
  margin-top: 20px;
  margin-bottom: 7px;
  color: var(--ink-2);
  font-size: 12px;
  font-weight: 700;
}

input {
  width: 100%;
  min-height: 50px;
  padding: 0 14px;
  border: 1px solid var(--line);
  border-radius: 11px;
  background: #11110f;
  color: var(--ink);
  font-family: var(--mono);
  font-size: 17px;
  letter-spacing: 0.12em;
  text-align: center;
}

input::placeholder {
  color: var(--ink-3);
  font-family: var(--sans);
  font-size: 13px;
  letter-spacing: 0;
}

.redeem {
  width: 100%;
  min-height: 50px;
  margin-top: 12px;
  border: 0;
  border-radius: 11px;
  background: var(--accent);
  color: #171711;
  font-weight: 900;
  cursor: pointer;
}

.redeem:disabled {
  background: var(--panel-raised);
  color: var(--ink-3);
  cursor: not-allowed;
}

.message,
.tip {
  margin-top: 12px;
  color: var(--accent);
  font-size: 12px;
  text-align: center;
}

.message.error {
  color: var(--danger);
}

.tip {
  color: var(--ink-2);
}

.notice {
  display: grid;
  gap: 5px;
  margin-top: 12px;
  padding: 11px 12px 11px 28px;
  border-radius: 10px;
  background: #161613;
  color: var(--ink-3);
  font-size: 10px;
  line-height: 1.5;
}
</style>
