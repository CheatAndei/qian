<template>
  <div class="beating-heart" :style="{ fontSize: size + 'px' }">
    <svg viewBox="0 0 100 100" :width="size" :height="size">
      <path
        class="heart-path"
        d="M50,85 C50,85 10,60 10,35 C10,15 28,5 50,28 C72,5 90,15 90,35 C90,60 50,85 50,85 Z"
        :fill="color"
      />
    </svg>
  </div>
</template>

<script setup>
defineProps({
  size: { type: Number, default: 60 },
  color: { type: String, default: '#FF6B9D' }
})
</script>

<style scoped>
.beating-heart {
  display: inline-flex;
  animation: heartbeat 1.2s ease-in-out infinite;
}
.heart-path {
  transform-origin: center;
}
@keyframes heartbeat {
  0%   { transform: scale(1); }
  15%  { transform: scale(1.25); }
  30%  { transform: scale(1); }
  45%  { transform: scale(1.18); }
  60%  { transform: scale(1); }
  100% { transform: scale(1); }
}
</style>
