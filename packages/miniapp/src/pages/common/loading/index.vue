<template>
  <view class="w-full h-full bg-white flex justify-center items-center">
    <view class="w-74rpx h-100rpx">
      <image src="/static/loading.755707c3.gif" mode="scaleToFill" class="w-full h-full" />
    </view>
  </view>
</template>

<script setup>
const { isLoading } = useStore('scenic')
watch(isLoading, (newData, oldData) => {
  if (newData === false) {
    navigateTo({ url: 'index/index' })
  }
})
</script>

<style></style>
