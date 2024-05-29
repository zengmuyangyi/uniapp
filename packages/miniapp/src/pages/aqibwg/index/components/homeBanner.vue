<template>
  <view class="w-full h-628">
    <uni-swiper-dot :info="sliderImages" :current="current" mode="round" :dotsStyles="dotStyle">
      <swiper autoplay circular style="height: 628rpx" @change="handleChange">
        <swiper-item v-for="(item, index) in sliderImages" :key="index">
          <view
            class="w-full h-628 bg-cover bg-center"
            :style="{ backgroundImage: `url(${getText(item.image)})` }"
          ></view>
        </swiper-item>
      </swiper>
    </uni-swiper-dot>
  </view>
</template>

<script setup>
import { getText } from '@/service/util'
const dotStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.28)',
  border: '1px rgba(255, 255, 255, 0.28) solid',
  selectedBackgroundColor: 'rgba(255, 255, 255, 1)',
  selectedBorder: '1px rgba(255, 255, 255, 1) solid',
  bottom: 70,
}
const { sliderImages, extConfig } = useStore('scenic')
const current = ref(0)
const handleChange = (e) => {
  current.value = e.detail.current
}
</script>

<style lang="scss" scoped></style>
