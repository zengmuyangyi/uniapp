<template>
  <view class="p-20rpx w-full box-border">
    <view
      class="w-full h-220 mb-30rpx rounded-24rpx flex items-center pl-47rpx bg-#eff5ff"
      style="box-shadow: 0 2rpx 8rpx 0 rgba(0, 0, 0, 0.1)"
      @click="goForm"
    >
      <view class="w-126 h-126">
        <image src="/pagesShangyou/static/tousu.png" mode="scaleToFill" class="w-full h-full" />
      </view>
      <view class="ml-48rpx">
        <view class="text-36 leading-50rpx font-800 text-#688eb7">{{
          extConfig.project === 'fanglanhu' ? '留言反馈' : '在线投诉'
        }}</view>
        <view class="mt-20rpx leading-42rpx text-30 text-#688eb7">快速建议，多谢您的建议</view>
      </view>
    </view>
    <view
      class="w-full h-220 mb-30rpx rounded-24rpx flex items-center pl-47rpx bg-#FFF7EF"
      style="box-shadow: 0 2rpx 8rpx 0 rgba(0, 0, 0, 0.1)"
      @click="makePhone"
    >
      <view class="w-126 h-126">
        <image src="/pagesShangyou/static/phone.png" mode="scaleToFill" class="w-full h-full" />
      </view>
      <view class="ml-48rpx">
        <view class="text-36 leading-50rpx font-800 text-#FFA73F">电话投诉</view>
        <view class="mt-20rpx leading-42rpx text-30 text-#FFA73F">一键拨打，官方为您服务</view>
      </view>
    </view>
    <view
      class="w-full h-220 mb-30rpx rounded-24rpx flex items-center pl-47rpx bg-#FFF0EF"
      style="box-shadow: 0 2rpx 8rpx 0 rgba(0, 0, 0, 0.1)"
      @click="goProgress"
    >
      <view class="w-126 h-126">
        <image src="/pagesShangyou/static/process.png" mode="scaleToFill" class="w-full h-full" />
      </view>
      <view class="ml-48rpx">
        <view class="text-36 leading-50rpx font-800 text-#EC5E3F">进度查询</view>
        <view class="mt-20rpx leading-42rpx text-30 text-#EC5E3F">快速查询，查看投诉进度</view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { getExtConfig } from '@/service/util'
const extConfig = getExtConfig()
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
    uni.redirectTo({
      url: '/pages/common/login/index?from=/pagesShangyou/pages/feedbackFirst/index',
    })
  }
})
</script>
