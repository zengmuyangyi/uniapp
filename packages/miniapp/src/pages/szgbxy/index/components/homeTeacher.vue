<template>
  <view class="w-full px-20rpx mt-64rpx box-border">
    <view class="flex items-center">
      <image
        src="https://pqntourism.pcleartv.cn/FkKfbpXV5Xz_RJnilFxTmLQ2RB2s"
        mode="scaleToFill"
        class="w-38 h-38 mr-12rpx"
      />
      <view class="text-32 leading-45rpx font-600">师资力量</view>
    </view>
    <image
      src="https://pqntourism.pcleartv.cn/FoTVaAKlAhgIkI5o8Fry2_23C04p"
      mode="scaleToFill"
      class="w-full h-240 mt-20rpx"
      @click="handleClick"
    />
  </view>
</template>

<script setup>
const handleClick = () => {
  uni.showToast({
    title: '正在建设中，敬请期待...',
    icon: 'none',
  })
}
</script>

<style lang="scss" scoped></style>
