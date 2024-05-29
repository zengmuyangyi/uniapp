<template>
  <view class="relative">
    <swiper
      style="height: 566rpx"
      circular
      :indicator-dots="indicatorDots"
      :autoplay="autoplay"
      :interval="interval"
      :duration="duration"
      @change="handleChange"
    >
      <swiper-item v-for="(item, index) in sliderImages" :key="index">
        <image :src="getImage(item.image)" mode="aspectFill" class="w-full h-566" />
      </swiper-item>
    </swiper>
    <view
      class="absolute w-full h-140 top-0"
      style="
        background-image: linear-gradient(180deg, rgba(0, 0, 0, 0.12) 0%, rgba(0, 0, 0, 0) 100%);
      "
    ></view>
    <view
      class="absolute w-full h-235 bottom-0"
      style="
        background-image: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.62) 100%);
      "
    ></view>
  </view>
</template>

<script setup>
import { getText, getImage } from '@/service/util'
const { currentScenic, sliderImages } = useStore('scenic')
const { indicatorDots, autoplay, interval, duration } = {
  indicatorDots: false,
  autoplay: true,
  interval: 5000,
  duration: 500,
}
const currentImage = ref(0)
const handleChange = (e) => {
  currentImage.value = e.target.current
}
</script>

<style lang="scss"></style>
