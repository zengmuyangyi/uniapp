<template>
  <view class="relative">
    <n-list bg-type="inverse" :down="null" :up="null" height="window">
      <n-list-cell>
        <view class="w-full h-400">
          <swiper
            v-if="images.length"
            style="height: 400rpx; width: 100%"
            circular
            :indicator-dots="indicatorDots"
            :autoplay="autoplay"
            :interval="interval"
            :duration="duration"
          >
            <swiper-item v-for="(item, index) in images" :key="index">
              <image :src="item" mode="aspectFill" class="w-full h-400" />
            </swiper-item>
          </swiper>

          <blank v-else hide-text></blank>
        </view>
      </n-list-cell>
      <n-list-cell>
        <view class="mt-40rpx px-30rpx w-full box-border">
          <view class="text-34 leading-48rpx font-600 mb-20rpx">开放时间</view>
          <view class="text-28 leading-55rpx text-#7a7a7a">{{ currentScenic?.openTime }}</view>
        </view>
      </n-list-cell>
      <n-list-cell>
        <view class="mt-50rpx px-30rpx w-full box-border">
          <view class="text-34 leading-48rpx font-600 mb-20rpx">联系电话</view>
          <view class="text-28 leading-55rpx text-#7a7a7a">{{ currentScenic?.phone }}</view>
        </view>
      </n-list-cell>
      <n-list-cell>
        <view class="mt-50rpx px-30rpx w-full box-border">
          <view class="text-34 leading-48rpx font-600 mb-20rpx">地理位置</view>
          <view class="text-28 text-#7a7a7a flex w-full justify-between items-center">
            <view class="leading-55rpx">{{ getText(currentScenic.address) }}</view>
            <view @click="goLocation" class="flex items-center">
              <view class="w-42 h-42 text-black ic-baseline-map"></view>
              <view class="text-black font-600 leading-55rpx ml-6rpx">导航</view>
            </view>
          </view>
        </view>
      </n-list-cell>
      <n-list-cell>
        <view class="mt-50rpx px-30rpx w-full box-border">
          <view class="text-34 leading-48rpx font-600 mb-20rpx">详情介绍</view>
          <mp-html
            class="text-28 leading-55rpx text-#7a7a7a"
            :content="getText(currentScenic.introduction)"
          ></mp-html>
        </view>
      </n-list-cell>
    </n-list>
  </view>
</template>

<script setup>
import { getText, getImage } from '@/service/util'
const { currentScenic } = useStore('scenic')
const images = ref([])
watchEffect(() => {
  const imageList = getImage(currentScenic.value.images)
  console.log('%c [ imageList ]-141', 'font-size:13px; background:pink; color:#bf2c9f;', imageList)
  images.value = imageList ? imageList?.split(',') : []
})
const audioPlay = ref(true)

const { indicatorDots, autoplay, interval, duration } = {
  indicatorDots: true,
  autoplay: true,
  interval: 3000,
  duration: 500,
}
const goLocation = () => {
  navigateTo({
    url: `location/index?longitude=${currentScenic.value?.lng}&latitude=${
      currentScenic.value?.lat
    }&name=${getText(currentScenic.value?.name)}`,
  })
}
onLoad(() => {
  uni.setNavigationBarTitle({ title: getText(currentScenic.value?.name) })
})
</script>
