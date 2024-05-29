<template>
  <view class="w-full relative h-full">
    <swiper
      autoplay
      circular
      indicator-dots
      indicator-color="rgba(255, 255, 255, 0.58)"
      indicator-active-color="#fff"
      style="height: 100%"
    >
      <swiper-item v-for="(item, index) in sliderImages" :key="index">
        <view
          v-if="getText(item.video)"
          class="w-full h-full box-border bg-black"
          style="padding-top: 8%"
        >
          <video
            :src="getText(item.video)"
            controls
            show-center-play-btn
            enable-play-gesture
            play-btn-position="center"
            :enable-progress-gesture="false"
            class="w-full"
            style="height: 90%"
          />
        </view>
        <image v-else :src="getImage(item.image)" mode="aspectFill" class="w-full h-full" />
      </swiper-item>
    </swiper>
    <image
      class="w-206 h-44 absolute top-105 left-38"
      src="https://pqntourism.pcleartv.cn/Fuu3tapeUIejyxsZIyCK2kY0evwK"
      mode="aspectFill"
    />
    <view
      class="w-full h-155 absolute bottom--20"
      style="
        background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #f6f8fb 81%, #f6f8fb 100%);
      "
    ></view>
  </view>
</template>

<script setup>
import { getImage, getText } from '@/service/util'
const { sliderImages } = useStore('scenic')
</script>

<style lang="scss" scoped></style>
