<template>
  <div class="sparkles" :style="{ width: area + 'px', height: area + 'px' }">
    <span
      v-for="s in sparkles"
      :key="s.id"
      class="sparkle"
      :style="{
        left: s.x + '%',
        top: s.y + '%',
        fontSize: s.size + 'px',
        animationDelay: s.delay + 's',
        animationDuration: s.dur + 's'
      }"
    >{{ s.emoji }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  count: { type: Number, default: 10 },
  area: { type: Number, default: 200 }
})

const sparkles = computed(() =>
  Array.from({ length: props.count }, (_, i) => ({
    id: i,
    x: Math.random() * 90,
    y: Math.random() * 90,
    size: 12 + Math.random() * 16,
    delay: Math.random() * 2,
    dur: 1.5 + Math.random() * 3,
    emoji: ['💘','💝','💗','💖','💕','👑'][i % 6]
  }))
)
</script>

<style scoped>
.sparkles {
  position: relative;
  pointer-events: none;
}
.sparkle {
  position: absolute;
  animation: twinkle ease-in-out infinite;
  opacity: 0;
}
@keyframes twinkle {
  0%, 100% { opacity: 0; transform: scale(0.5) rotate(0deg); }
  50%      { opacity: 1; transform: scale(1.2) rotate(15deg); }
}
</style>
