<template>
  <view class="relative text-white px-30rpx">
    <!-- <uni-swiper-dot
      mode="round"
      :info="sliderImages"
      :current="currentImage"
      :dotsStyles="{
        backgroundColor: 'rgba(255, 255, 255, .4)',
        selectedBackgroundColor: '#fff',
        border: '0px',
        selectedBorder: '0px',
      }"
    > -->
    <swiper
      style="height: 450rpx"
      :autoplay="autoplay"
      :interval="interval"
      :duration="duration"
      :indicator-dots="indicatorDots"
      indicator-color="rgba(255, 255, 255, .4)"
      indicator-active-color="#fff"
      @change="handleChange"
    >
      <swiper-item v-for="(item, index) in sliderImages" :key="index">
        <view class="w-full h-full relative" @click="goPage(item)">
          <image :src="getImage(item.image)" mode="aspectFill" class="w-full h-full rounded-lg" />
          <view
            class="absolute w-full flex justify-end items-center bottom-16 pr-5 box-border"
            style="font-family: '宋体'"
          >
            <view class="mr-2 leading-28rpx">{{ getText(item.name) }}</view>
            <image src="/static/index/dianya/next.png" mode="scaleToFill" class="w-28 h-28" />
          </view>
        </view>
      </swiper-item>
    </swiper>
    <!-- </uni-swiper-dot> -->
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
    } else {
      if (item.url.indexOf('?') > -1) {
        const temp = item.url.split('?')
        uni.navigateTo({
          url: `/pages/common/webLink/index?title=${getText(item.name)}&url=${temp[0]}&${temp[1]}`,
        })
      } else {
        uni.navigateTo({
          url: `/pages/common/webLink/index?title=${getText(item.name)}&url=${item.url}`,
        })
      }
    }
  } else {
    uni.showToast({ title: '暂未配置', icon: 'none' })
  }
}
</script>

<style scoped lang="scss"></style>
