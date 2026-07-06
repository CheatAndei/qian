<template>
  <van-overlay :show="show" @click="$emit('close')" :z-index="200">
    <div class="pay-modal" @click.stop>
      <span class="pay-close" @click="$emit('close')">✕</span>

      <div class="pay-hero">
        <span class="pay-emoji">🔓</span>
        <h3>{{ title }}</h3>
        <p>{{ subtitle }}</p>
      </div>

      <div class="pay-benefits">
        <div class="pay-benefit" v-for="b in benefits" :key="b">
          <span>✅</span> {{ b }}
        </div>
      </div>

      <div class="pay-price">
        <span class="pay-amount">¥{{ amount }}</span>
      </div>

      <button class="pay-btn" @click="handlePay" :disabled="paying">
        {{ paying ? '正在拉起支付...' : `💳 微信/支付宝支付 ¥${amount}` }}
      </button>

      <p class="pay-note" v-if="error">{{ error }}</p>
    </div>
  </van-overlay>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  show: Boolean,
  title: { type: String, default: '解锁完整报告' },
  subtitle: { type: String, default: '' },
  amount: { type: String, default: '1.90' },
  productId: { type: String, default: 'cptest_full' },
  productTitle: { type: String, default: '契合度完整报告' },
  benefits: { type: Array, default: () => [] }
})

const emit = defineEmits(['close', 'paid'])

const paying = ref(false)
const error = ref('')

const API_BASE = import.meta.env.VITE_API_BASE || '/api'

async function handlePay() {
  paying.value = true
  error.value = ''

  try {
    const res = await fetch(`${API_BASE}/payment/create-order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productId: props.productId,
        amount: props.amount,
        title: props.productTitle
      })
    })
    const data = await res.json()

    if (data.ok && data.payUrl) {
      // 跳转到支付页面
      window.location.href = data.payUrl
      // 支付完成后虎皮椒回调 → 用户被重定向到 return_url
      emit('paid', data.orderId)
    } else {
      error.value = data.message || '创建订单失败，请稍后再试'
    }
  } catch (e) {
    error.value = '网络错误，请检查网络后重试'
  } finally {
    paying.value = false
  }
}
</script>

<style scoped>
.pay-modal {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 320px;
  background: #fff;
  border-radius: 22px;
  overflow: hidden;
  box-shadow: 0 16px 48px rgba(0,0,0,0.2);
}
.pay-close {
  position: absolute; top: 14px; right: 16px;
  font-size: 18px; color: #ccc; cursor: pointer; z-index: 1;
}
.pay-hero {
  background: linear-gradient(135deg, #FF6B9D, #FF4785);
  padding: 28px 20px 20px;
  text-align: center;
  color: #fff;
}
.pay-emoji { font-size: 40px; }
.pay-hero h3 { font-size: 20px; margin: 8px 0 4px; font-weight: 800; }
.pay-hero p  { font-size: 13px; opacity: 0.85; margin: 0; }

.pay-benefits {
  padding: 16px 20px 12px;
  display: flex; flex-direction: column; gap: 8px;
}
.pay-benefit {
  font-size: 14px; color: var(--text);
  display: flex; align-items: center; gap: 8px;
}
.pay-benefit span { font-size: 16px; }

.pay-price {
  text-align: center;
  padding: 8px 0 16px;
}
.pay-amount {
  font-size: 36px; font-weight: 900; color: #FF4785;
}
.pay-amount::before { content: '仅需 '; font-size: 14px; font-weight: 400; color: var(--text-light); }

.pay-btn {
  display: block; width: calc(100% - 40px); margin: 0 auto 20px;
  padding: 14px; border: none; border-radius: 50px;
  background: linear-gradient(135deg, #FF6B9D, #FF4785);
  color: #fff; font-size: 16px; font-weight: 700;
  cursor: pointer; font-family: inherit;
  box-shadow: 0 6px 24px rgba(255,71,133,0.3);
}
.pay-btn:active { transform: scale(0.96); }
.pay-btn:disabled { opacity: 0.6; }

.pay-note {
  text-align: center; font-size: 12px; color: #FF4757;
  padding: 0 20px 16px; margin: -8px 0 0;
}
</style>
