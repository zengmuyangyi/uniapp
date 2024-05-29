<template>
  <view class="relative text-white">
    <!-- <view
      v-if="extConfig.project === 'aqibwg'"
      class="absolute text-40 left-40 font-bold z-9999 text-white bg-black bg-opacity-30"
      style="top: 40%"
      >阿鲁科尔沁旗博物馆</view
    > -->
    <swiper
      :style="props.componentStyle === 'contracted' ? 'height: 500rpx' : 'height: 443rpx'"
      circular
      :indicator-dots="indicatorDots"
      :autoplay="autoplay"
      :interval="interval"
      :duration="duration"
      @change="handleChange"
    >
      <swiper-item v-for="(item, index) in sliderImages" :key="index">
        <image :src="getImage(item.image)" mode="aspectFill" class="w-full h-full" />
      </swiper-item>
    </swiper>
    <view v-if="extConfig.project === 'liubangguli'" class="absolute w-170 h-40 top-115 left-45">
      <image
        src="https://pqntourism.pcleartv.cn/FvI_txewVI21674wT1NjeBExyB4D"
        mode="scaleToFill"
        class="w-full h-full"
      />
    </view>
  </view>
</template>

<script setup>
import { getImage } from '@/service/util'
const { sliderImages, extConfig } = useStore('scenic')
const props = defineProps({
  componentStyle: {
    type: String,
    default: () => '',
  },
})
const currentImage = ref(0)
const handleChange = (e) => {
  currentImage.value = e.target.current
}

const { indicatorDots, autoplay, interval, duration } = {
  indicatorDots: false,
  autoplay: true,
  interval: 3000,
  duration: 500,
}
</script>

<style lang="scss" scoped>
.black-bg {
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 99%);
}
</style>
