<template>
  <view class="w-750 flex-1">
    <n-height height="screen-!status-!nav">
      <web-view :src="val" style="height: 100%; width: 100%" />
    </n-height>
  </view>
</template>

<script setup>
import { getBaseUrl } from '@/service/util'
const longitude = ref(120.943603)
const latitude = ref(40.779632)
const val = getBaseUrl() + 'frontend/map_new/index.html#/'

const mapRef = ref()

onMounted(() => {
  console.log('%c [ mapRef ]-23', 'font-size:13px; background:pink; color:#bf2c9f;', mapRef.value)
})
</script>

<style></style>
