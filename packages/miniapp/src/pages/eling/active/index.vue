<template>
  <view class="relative pb-10">
    <view class="mt-60rpx flex flex-col items-center">
      <view class="text-40rpx font-700 text-#0d0d0d">活动管理平台</view>
      <view class="mt-10rpx text-32rpx text-#999">为您的活动申请提供便利</view>
    </view>
    <view
      class="w-630rpx h-300rpx mx-auto mt-60rpx bg-white rounded-30rpx flex items-center"
      style="box-shadow: 0 3px 2px rgba(0, 0, 0, 0.1)"
      @click="goForm"
    >
      <view class="w-176rpx h-176rpx ml-30rpx">
        <image
          src="/static/more/journey/complaints/complaints.png"
          mode="scaleToFill"
          class="w-full h-full"
        />
      </view>
      <view class="ml-30rpx flex flex-col items-stretch">
        <view class="text-40rpx font-bold text-#0d0d0d">活动申请</view>
        <view class="mt-10rpx text-28rpx text-#999">快速申请，方便您的活动开展</view>
      </view>
    </view>
    <view
      class="w-630rpx h-300rpx mx-auto mt-60rpx bg-white rounded-30rpx flex items-center"
      style="box-shadow: 0 3px 2px rgba(0, 0, 0, 0.1)"
      @click="goProgress"
    >
      <view class="w-176rpx h-176rpx ml-30rpx">
        <image
          src="/static/more/journey/complaints/complaints-online.png"
          mode="scaleToFill"
          class="w-full h-full"
        />
      </view>
      <view class="ml-30rpx flex flex-col items-stretch">
        <view class="text-40rpx font-bold text-#0d0d0d">进度查询</view>
        <view class="mt-10rpx text-28rpx text-#999">快速查询，查看活动申请进度</view>
      </view>
    </view>
  </view>
</template>

<script setup>
const goForm = () => {
  uni.navigateTo({ url: `/pages/eling/activeForm/index` })
}
const goProgress = () => {
  uni.navigateTo({ url: '/pages/eling/activeProgress/index' })
}
</script>
