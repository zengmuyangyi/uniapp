<template>
  <view class="mt-40rpx w-full px-40rpx box-border">
    <view class="w-full h-420 rounded-20rpx overflow-hidden">
      <swiper
        indicator-dots
        autoplay
        circular
        indicator-active-color="#fff"
        indicator-color="rgba(255,255,255,0.48)"
        class="w-full h-full"
      >
        <swiper-item v-for="(item, index) in sliderImages" :key="index">
          <view
            class="w-full h-full bg-cover bg-center"
            :style="{ backgroundImage: `url(${getText(item.image)})` }"
          ></view>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>

<script setup>
import { getText } from '@/service/util'
const { sliderImages } = useStore('scenic')
</script>

<style lang="scss" scoped></style>
