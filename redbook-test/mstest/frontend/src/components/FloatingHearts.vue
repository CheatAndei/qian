<template>
  <div class="floating-hearts">
    <span
      v-for="h in hearts"
      :key="h.id"
      class="fh"
      :style="{
        left: h.x + '%',
        fontSize: h.size + 'px',
        animationDelay: h.delay + 's',
        animationDuration: h.dur + 's',
        opacity: h.opacity
      }"
    >💕</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  count: { type: Number, default: 6 }
})

const hearts = computed(() =>
  Array.from({ length: props.count }, (_, i) => ({
    id: i,
    x: 5 + Math.random() * 90,
    size: 16 + Math.random() * 20,
    delay: Math.random() * 4,
    dur: 4 + Math.random() * 5,
    opacity: 0.15 + Math.random() * 0.2
  }))
)
</script>

<style scoped>
.floating-hearts {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}
.fh {
  position: absolute;
  bottom: -30px;
  animation: float-up linear infinite;
}
@keyframes float-up {
  0%   { transform: translateY(0) rotate(0deg) scale(0.8); }
  50%  { transform: translateY(-50vh) rotate(15deg) scale(1); }
  100% { transform: translateY(-105vh) rotate(-10deg) scale(0.6); }
}
</style>
