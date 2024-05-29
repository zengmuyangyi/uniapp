<template>
  <!-- <view class="w-full min-h-100vh flex flex-col justify-center items-center bg-#FAC858">
    <view class="text-white text-36 font-bold siyuan_ht">分享位置</view>
    <view class="text-white text-36 font-bold mt-16rpx siyuan_ht">浏阳妇幼保健院</view>
    <view
      class="w-580 h-500 bg-white mt-44rpx bg-cover bg-center"
      :style="{ backgroundImage: `url(${logo})` }"
    ></view>
    <view class="text-white text-36 font-bold mt-22rpx siyuan_ht">您选择的位置</view>
    <view class="text-#FF354A text-36 font-bold mt-25rpx siyuan_ht">{{ name }}</view>
    <view class="text-white text-36 font-bold mt-17rpx siyuan_ht">所在楼层：{{ floorName }}</view>
    <button
      open-type="share"
      class="mt-44rpx w-590 h-130 rounded-20rpx bg-white flex justify-center items-center"
    >
      <view class="w-60 h-60 ic-round-emergency-share"></view>
      <view class="text-36 font-bold ml-36rpx text-#3d3d3d siyuan_ht">发送给微信好友</view>
    </button>
  </view> -->
  <view
    class="w-full h-full p-30rpx box-border"
    style="background: linear-gradient(to bottom, #40c191 0%, #8dd6b9 100%)"
  >
    <view class="w-full h-full bg-white flex flex-col items-center rounded-14rpx pt-65rpx relative">
      <view class="text-42 font-600 leading-59rpx tracking-2rpx">浏阳妇幼保健院</view>
      <view
        class="w-292 h-292 bg-cover bg-center mt-77rpx"
        :style="{
          backgroundImage: `url(${
            logo || 'https://pqntourism.pcleartv.cn/Fl4_J8gvKM2KYFtRpYUN75EEocYI'
          })`,
        }"
      ></view>
      <view class="mt-73rpx text-30 leading-42rpx tracking-1rpx text-#787878"
        >您选择的位置：{{ name }}</view
      >
      <view class="mt-24rpx text-30 leading-42rpx tracking-1rpx text-#787878"
        >所在楼层：{{ floorName }}</view
      >
      <button
        open-type="share"
        class="fixed bottom-60 left-50% translate-x--50% w-554 h-84 rounded-42rpx flex justify-center items-center text-32 leading-45rpx text-white font-600 tracking-1rpx"
        style="background: linear-gradient(315deg, #ff8400 0%, #ffa958 100%)"
      >
        发送给微信好友
      </button>
    </view>
  </view>
</template>

<script setup>
const name = ref('')
const logo = ref('')
const floorName = ref('')
const nodeId = ref('')
onShareAppMessage(() => {
  const project = UNI_PROJECT || 'default'
  return {
    title: '急诊诊室',
    path: `/pages/${project}/index/index?nodeId=${nodeId.value}`,
  }
})
onLoad((options) => {
  name.value = options?.name
  logo.value = options?.logo
  floorName.value = options?.floorName
  nodeId.value = options?.nodeId
})
</script>
