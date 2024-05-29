<template>
  <view class="relative text-white">
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
  </view>
</template>

<script setup>
import { getImage } from '@/service/util'

const { sliderImages } = useStore('scenic')
const props = defineProps({
  componentStyle: {
    type: String,
    default: () => '',
  },
})
console.log('%%%%', props.componentStyle === 'contracted')
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
