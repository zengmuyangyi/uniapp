<template>
  <view class="relative pb-10">
    <view class="mt-60rpx flex flex-col items-center">
      <view class="text-40rpx font-700 text-#0d0d0d">投诉管理平台</view>
      <view class="mt-10rpx text-32rpx text-#999">为您的旅游提供品质保障</view>
    </view>
    <view
      class="w-630rpx h-300rpx mx-auto mt-60rpx bg-white rounded-30rpx flex items-center"
      style="box-shadow: 0 3px 2px rgba(0, 0, 0, 0.1)"
      @click="goForm"
    >
      <view class="w-176rpx h-176rpx ml-30rpx">
        <image
          src="/pagesCustom/static/complaints/complaints.png"
          mode="scaleToFill"
          class="w-full h-full"
        />
      </view>
      <view class="ml-30rpx flex flex-col items-stretch">
        <view class="text-40rpx font-bold text-#0d0d0d">建议反馈</view>
        <view class="mt-10rpx text-28rpx text-#999">快速建议，多谢您的建议</view>
      </view>
    </view>
    <view
      class="w-630rpx h-300rpx mx-auto mt-60rpx bg-white rounded-30rpx flex items-center"
      style="box-shadow: 0 3px 2px rgba(0, 0, 0, 0.1)"
      @click="goProgress"
    >
      <view class="w-176rpx h-176rpx ml-30rpx">
        <image
          src="/pagesCustom/static/complaints/complaints-online.png"
          mode="scaleToFill"
          class="w-full h-full"
        />
      </view>
      <view class="ml-30rpx flex flex-col items-stretch">
        <view class="text-40rpx font-bold text-#0d0d0d">进度查询</view>
        <view class="mt-10rpx text-28rpx text-#999">快速查询，查看投诉进度</view>
      </view>
    </view>
    <view
      class="w-630rpx h-300rpx mx-auto mt-60rpx bg-white rounded-30rpx flex items-center"
      style="box-shadow: 0 3px 2px rgba(0, 0, 0, 0.1)"
      @click="makePhone"
    >
      <view class="w-176rpx h-176rpx ml-30rpx">
        <image
          src="/pagesCustom/static/complaints/phone.png"
          mode="scaleToFill"
          class="w-full h-full"
        />
      </view>
      <view class="ml-30rpx flex flex-col items-stretch">
        <view class="text-40rpx font-bold text-#0d0d0d">电话投诉</view>
        <view class="mt-10rpx text-28rpx text-#999">一键拨打，官方为您服务</view>
      </view>
    </view>
  </view>
</template>

<script setup>
const { currentScenic } = useStore('scenic')
const { isLogin } = useStore('user')
const goForm = () => {
  uni.navigateTo({ url: `/pagesCustom/pages/feedback/index` })
}
const goProgress = () => {
  uni.navigateTo({ url: '/pagesCustom/pages/feedbackProgress/index' })
}
const makePhone = () => {
  uni.makePhoneCall({
    phoneNumber: currentScenic.value?.complainPhone,
  })
}
onLoad((options) => {
  if (!isLogin.value) {
    uni.redirectTo({ url: '/pages/common/login/index' })
  }
})
</script>
