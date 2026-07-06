<template>
  <svg
    v-if="data"
    class="icon"
    :viewBox="`0 0 ${data.w} ${data.h}`"
    width="1em"
    height="1em"
    fill="currentColor"
    aria-hidden="true"
    v-html="data.b"
  />
</template>

<script setup>
import { computed } from 'vue'
import ICONS from '../icons/data.js'

const props = defineProps({
  // 兼容 iconify 写法：icon="mdi:waveform"，也支持 name="waveform"
  icon: { type: String, default: '' },
  name: { type: String, default: '' },
})

const key = computed(() => (props.name || props.icon).replace(/^mdi:/, ''))
const data = computed(() => ICONS[key.value] || null)
</script>

<style scoped>
.icon {
  display: inline-block;
  vertical-align: -0.125em;
  flex-shrink: 0;
}
</style>
