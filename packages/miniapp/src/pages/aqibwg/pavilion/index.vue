<template>
  <view
    class="w-full h-full bg-contain"
    style="background-image: url(https://pqntourism.pcleartv.cn/FjdXH06StXmVTxHzy5tu6Txv1aOM)"
  >
    <view
      class="w-full h-full bg-no-repeat"
      style="
        background-image: url(https://pqntourism.pcleartv.cn/FvYMnGGvFsY5a4-I-ADD1Svpv4tg);
        background-size: 207rpx 106rpx;
        background-position: right bottom;
      "
    >
      <!-- 顶部导航栏 -->
      <n-position pos="top" box-style="width:750rpx;">
        <view class="bg-transparent">
          <n-height height="status"></n-height>
          <n-height height="nav">
            <view class="flex h-full w-full items-center px-3 justify-center">
              <span
                class="ic-baseline-arrow-back-ios absolute left-24 text-#3b220e"
                @click="handleBack"
              ></span>
              <span class="text-32 font-bold leading-46rpx text-center text-#3b220e siyuan_st"
                >展览详情</span
              >
            </view>
          </n-height>
        </view>
      </n-position>
      <view
        class="px-30rpx w-full h-full bg-no-repeat pt-180rpx box-border"
        style="
          background-image: url(https://pqntourism.pcleartv.cn/FuTKpvREyaWMztaVBWmfgX0Um6P4);
          background-size: 448rpx 693rpx;
        "
      >
        <view class="w-full box-border flex">
          <view class="w-255 mr-30rpx flex-shrink-0">
            <image :src="getText(pavilionDetail.cover)" mode="widthFix" class="w-full" />
          </view>
          <view class="text-32 font-bold">{{ getText(pavilionDetail.name) }}</view>
        </view>
        <view class="mt-20rpx py-30rpx w-full relative">
          <view
            :class="isPickUp ? 'h-200' : 'h-auto'"
            class="w-full px-30rpx box-border overflow-hidden"
          >
            <mpHtml :content="getText(pavilionDetail.introduction)"></mpHtml>
          </view>
          <view
            @click="changeContent"
            class="w-full h-70 bottom-0 flex justify-center items-center text-#871C22"
            style="background: linear-gradient(180deg, rgba(241, 232, 221, 0.78) 0%, #f1e8dd 100%)"
            :class="isPickUp ? 'absolute' : 'relative'"
          >
            <view class="text-28">{{ isPickUp ? '展开' : '收起' }}</view>
            <view
              :class="
                isPickUp ? 'ic-baseline-keyboard-arrow-down' : 'ic-baseline-keyboard-arrow-up'
              "
            ></view>
          </view>
        </view>
        <view class="mt-20rpx w-full box-border">
          <view class="flex justify-between items-center">
            <view class="flex items-center">
              <view class="w-8 h-35 bg-#bfab93"></view>
              <view class="text-32 font-bold ml-22rpx">相关展品</view>
            </view>
            <view @click="goRelicList" class="text-#BD9F78 flex items-center">
              <view class="text-28">全部 {{ culturalRelic.total }}</view>
              <view class="ic-baseline-keyboard-arrow-right"></view>
            </view>
          </view>
          <view class="my-30rpx w-full overflow-hidden">
            <scroll-view scroll-x>
              <view class="flex">
                <view
                  v-for="(item, index) in culturalRelic.list"
                  :key="index"
                  class="flex flex-col items-center mr-30rpx"
                  @click="goDetail(item)"
                >
                  <view
                    class="w-260 h-320 rounded-12rpx overflow-hidden bg-center bg-cover"
                    :style="{ backgroundImage: `url(${item.cover})` }"
                  >
                  </view>
                  <view class="text-28 font-bold mt-16rpx">{{ getText(item.title) }}</view>
                </view>
              </view>
            </scroll-view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { getText } from '@/service/util'
import { fetchMapPOI } from '@/api/map.js'
import { cultureApi } from '@/api/culture'
import mpHtml from '@/components/mp-html/mp-html'
const pavilionDetail = ref({})
const culturalRelic = ref({})
const isPickUp = ref(true)
const changeContent = () => {
  isPickUp.value = !isPickUp.value
}
const getMapPOI = async (id) => {
  const res = await fetchMapPOI(id)
  pavilionDetail.value = res
  console.log('@@@', res)
  const params = {
    pageSize: 0,
    pageNum: 0,
    poi: res.id,
    status: 1,
  }
  const culturalRelicRes = await cultureApi.getList(params)
  culturalRelic.value = culturalRelicRes
  console.log('###', culturalRelicRes)
}
const goDetail = (item) => {
  uni.navigateTo({ url: `/pages/aqibwg/culturalRelic/index?id=${item.id}` })
}
// ----------顶部导航后退--------------
const handleBack = () => {
  uni.navigateBack()
}
onLoad((options) => {
  console.log('&&&', options.id)
  getMapPOI(options.id - 0)
})
const goRelicList = () => {
  uni.navigateTo({ url: `/pages/aqibwg/pavilionRelic/index?poi=${pavilionDetail.value.id}` })
}
</script>
