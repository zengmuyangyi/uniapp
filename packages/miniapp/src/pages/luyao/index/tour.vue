<template>
  <view class="w-750 flex-1">
    <n-height height="screen-!status-!nav">
      <web-view src="http://localhost:5173/" style="height: 100%; width: 100%" />
    </n-height>
  </view>
</template>

<script setup>
const longitude = ref(120.943603)
const latitude = ref(40.779632)

const mapRef = ref()

onMounted(() => {
  console.log('%c [ mapRef ]-23', 'font-size:13px; background:pink; color:#bf2c9f;', mapRef.value)
})
</script>

<style></style>
