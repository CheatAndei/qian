// 读取解锁状态（MVP 门禁，与 cptest 一致：localStorage + 共享 cookie）
import { ref } from 'vue'

const ALL_PRODUCTS = ['bftest', 'gftest', 'cptest', 'mstest', 'lovetest', 'shiptest', 'ggtest', 'lswtest', 'emotest', 'eletest', 'citytest', 'lvtest']

export function isUnlocked(product) {
  try {
    const unlocked = JSON.parse(localStorage.getItem('unlocked') || '{}')
    if (unlocked[product]?.unlocked || unlocked[product]) return true
  } catch (_) {}
  return document.cookie.split('; ').includes('xpytt_unlocked=1')
}

export function useUnlock(product) {
  const unlocked = ref(isUnlocked(product))
  const refresh = () => {
    unlocked.value = isUnlocked(product)
  }
  return { unlocked, refresh, ALL_PRODUCTS }
}

