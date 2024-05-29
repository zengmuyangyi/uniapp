<template>
  <view class="mx-4 rounded-xl overflow-hidden">
    <swiper
      indicator-dots
      autoplay
      indicator-color="rgba(185, 185, 185, .4)"
      indicator-active-color="#fff"
      circular
      style="height: 372rpx"
    >
      <swiper-item v-for="(item, index) in sliderImages" :key="index" @click="goPage(item)">
        <image :src="getImage(item.image)" mode="aspectFill" class="w-full h-372rpx" />

        <view
          class="absolute w-full flex justify-end items-center bottom-16 pr-5 box-border text-white"
          style="font-family: '宋体'"
        >
          <view class="mr-2 leading-28rpx">{{ getText(item.name) }}</view>
          <image src="/static/index/dianya/next.png" mode="scaleToFill" class="w-28 h-28" />
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script setup>
import { getText, getImage } from '@/service/util'

const { sliderImages } = useStore('scenic')

const currentImage = ref(0)
const handleChange = (e) => {
  currentImage.value = e.target.current
}

const { indicatorDots, autoplay, interval, duration } = {
  indicatorDots: true,
  autoplay: true,
  interval: 3000,
  duration: 500,
}
const goPage = (item) => {
  if (item.url) {
    if (item.url.indexOf('小程序') > -1) {
      uni.navigateToMiniProgram({
        shortLink: item.url,
        success(res) {
          console.log(res)
        },
      })
    } else if (item.url.indexOf('?') > -1) {
      const temp = item.url.split('?')
      uni.navigateTo({
        url: `/pages/common/webLink/index?title=${getText(item.name)}&url=${temp[0]}&${temp[1]}`,
      })
    } else {
      uni.navigateTo({
        url: `/pages/common/webLink/index?title=${getText(item.name)}&url=${item.url}`,
      })
    }
  } else {
    uni.showToast({ title: '暂未配置', icon: 'none' })
  }
}
</script>

<style scoped lang="scss">
::v-deep .uni-swiper-dots {
  left: 40px;
  bottom: 18px;
  .uni-swiper-dot {
    height: 5px;
    width: 5px;
    margin-right: 5px;
  }
  .uni-swiper-dot-active {
    width: 18px;
    border-radius: 5px;
  }
}
</style>
