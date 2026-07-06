<template>
  <div ref="container" class="lottie-player"></div>
</template>

<script setup>
import { ref, onMounted, watch, onBeforeUnmount } from 'vue'
import lottie from 'lottie-web'

const props = defineProps({
  animationData: { type: Object, required: true }
})

const container = ref(null)
let anim = null

function load() {
  if (!container.value || !props.animationData) return
  if (anim) anim.destroy()
  anim = lottie.loadAnimation({
    container: container.value,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData: props.animationData
  })
}

onMounted(load)
watch(() => props.animationData, load)
onBeforeUnmount(() => { if (anim) anim.destroy() })
</script>

<style scoped>
.lottie-player {
  width: 100%;
  height: 100%;
}
</style>
