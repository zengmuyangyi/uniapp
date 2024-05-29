<template lang="">
  <div class="flex flex-wrap">
    <tag v-for="(t, i) in modelValue.slice(0, 4)" :key="i" :color="color ? color : getColor(i)">{{
      t
    }}</tag>
  </div>
</template>

<script setup>
defineProps({
  color: {
    type: String,
    default: '',
  },
  modelValue: {
    type: Array,
    default: () => [],
  },
  max: {
    type: Number,
    default: 4,
  },
})

const colors = ['blue', 'red', 'green', 'yellow']

const getColor = (i) => {
  const idx = i < 4 ? i : i % 4

  return colors[idx]
}
</script>

<style lang=""></style>
