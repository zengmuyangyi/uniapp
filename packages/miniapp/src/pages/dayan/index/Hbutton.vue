<template>
  <div
    class="w-100 h-240 bg-no-repeat bg-contain flex items-center flex-col"
    :style="{ backgroundImage: `url(${imgs.hbutton})` }"
  >
    <image class="w-80 h-80 mt-14rpx" :src="imgs[item.icon]" />

    <div class="w-27 text-center text-white leading-2em">
      {{ item.name }}
    </div>
  </div>
</template>

<script setup>
import imgs from './imgs'

defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
})
</script>

<style lang=""></style>
