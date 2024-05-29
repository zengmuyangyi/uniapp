<template>
  <view class="relative bg-gray-200 h-full">
    <web-view :src="url" style="height: 100%; width: 100%"> </web-view>
  </view>
</template>

<script setup>
const url = ref('')
onLoad((options) => {
  url.value = options.url
  uni.setNavigationBarTitle({ title: options.title })
})
</script>

<style scoped lang="scss"></style>
