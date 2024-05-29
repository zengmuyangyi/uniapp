<template>
  <view class="p-20rpx w-full box-border">
    <view
      class="w-full bg-white rounded-24rpx pt-10px pb-35rpx pr-25rpx pl-30rpx box-border"
      style="box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1)"
    >
      <view class="flex justify-between items-center">
        <view class="text-36 font-800 leading-50rpx relative text-#333"
          >人气排行榜<view
            class="absolute w-180 h-18 left-0 bottom-0 bg-opacity-20 bg-#299627"
          ></view
        ></view>
        <view @click="goMore" class="flex items-center">
          <view class="text-28 font-500 leading-40rpx text-#666">更多</view>
          <image src="/static/index/shangyouxian/more.png" mode="scaleToFill" class="w-20 h-20" />
        </view>
      </view>
      <view class="mt-26rpx">
        <view
          @click="goDetail(item)"
          v-for="(item, index) in topData"
          :key="index"
          class="pl-14rpx flex w-full box-border mb-28rpx"
        >
          <view
            class="w-165 h-220 flex-shrink-0 mr-28rpx rounded-10rpx relative bg-cover bg-center"
            :style="{ backgroundImage: `url(${getImage(item.cover)})` }"
          >
            <view v-if="!index" class="w-15 h-15 absolute left--12 top--6">
              <image
                src="/static/index/shangyouxian/topPart1.png"
                mode="scaleToFill"
                class="w-full h-full"
              />
            </view>
            <view
              v-if="!index"
              class="pr-17rpx pl-7rpx pb-8rpx pt-2rpx absolute left--15 top-23 topBox"
            >
              <view class="text-24 text-white font-600 leading-30rpx">好评最高</view>
            </view>
          </view>
          <view class="flex flex-col justify-between h-235">
            <view class="text-32 font-600 leading-45rpx">{{ getText(item.name) }}</view>
            <view class="text-24 leading-28rpx text-#666 u-line-3">{{
              getText(item.description)
            }}</view>
            <view class="text-#FF7F19 text-32 font-600"
              >￥<span class="text-44">{{ item.price }}</span></view
            >
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { getImage, getText } from '@/service/util'
// POI类型code映射类型id
const POIType = inject('POIType', '')
defineProps({
  topData: {
    type: Array,
    default: [],
  },
})
const goDetail = (item) => {
  uni.navigateTo({
    url: `/pages/common/scenic/index?id=${item.id}`,
  })
}
const goMore = () => {
  uni.navigateTo({
    url: `/pagesShangyou/pages/play/index?typeId=${POIType.value['娱乐']}`,
  })
}
</script>

<style scoped lang="scss">
.topBox {
  background-image: url('@/static/index/shangyouxian/topPart2.png');
  background-size: 100% 100%;
}
</style>
