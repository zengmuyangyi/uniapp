<template>
  <span
    class="inline-block p-1 px-2 text-20 mr-1 rounded mb-1"
    :style="{ color: val, background: bg }"
  >
    <slot></slot>
  </span>
</template>

<script setup>
import Color from 'color'
const props = defineProps({
  color: {
    type: String,
    default: 'blue',
  },
})

const { color } = toRefs(props)

const colorString = {
  blue: '#2D7EAB',
  red: '#C42C6D',
  yellow: '#ea9a21',
  green: '#7ec52b',
}

const val = computed(() => {
  return colorString[color.value]
})

const bg = computed(() => {
  return Color(colorString[color.value]).alpha(0.2).rgb().string()
})
</script>

<style lang=""></style>
