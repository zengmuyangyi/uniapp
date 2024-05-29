<template>
  <view class="h-100vh overflow-x-auto relative">
    <view
      class="fixed right-30 top-50 bg-black bg-opacity-38 rounded-4rpx z-2000 box-border pb-20rpx text-white flex flex-col items-center"
    >
      <switch
        :checked="isHeat"
        color="#1988ac"
        style="transform: scale(0.6)"
        @change="handleChange"
      />
      <view class="text-22 text-white">热力图</view>
    </view>
    <image
      v-if="isHeat"
      src="https://pqntourism.pcleartv.cn/FuPjaYnP-yhpr9-mBZYyBgedW8uJ"
      mode="heightFix"
      class="h-full"
    />
    <image
      v-else
      src="https://pqntourism.pcleartv.cn/FsEYWeNN0yFCUVNM40A1grbDWJen"
      mode="heightFix"
      class="h-full"
    />
  </view>
</template>

<script setup>
const isHeat = ref(false)
const handleChange = (e) => {
  console.log('^^^', e)
  isHeat.value = e.detail.value
}
</script>

<style lang="scss" scoped></style>
