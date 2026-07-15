import { ref } from 'vue'

export const ALL_PRODUCTS = [
  'bftest', 'gftest', 'cptest', 'mstest',
  'lovetest', 'shiptest', 'ggtest', 'lswtest',
  'emotest', 'eletest', 'citytest', 'lvtest',
  'trusttest', 'last8test', 'restarttest',
]

export function isUnlocked(product) {
  try {
    const unlocked = JSON.parse(localStorage.getItem('unlocked') || '{}')
    if (unlocked[product]?.unlocked || unlocked[product] === true) return true
  } catch (_) {
    // 无法读取本地状态时继续检查共享 cookie。
  }
  return document.cookie.split('; ').includes('xpytt_unlocked=1')
}

export function useUnlock(product) {
  const unlocked = ref(isUnlocked(product))
  const refresh = () => { unlocked.value = isUnlocked(product) }
  return { unlocked, refresh, ALL_PRODUCTS }
}
