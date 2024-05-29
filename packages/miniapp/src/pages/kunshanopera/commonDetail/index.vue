<template>
  <view class="relative">
    <n-list bg-type="inverse" :down="null" :up="null" height="window">
      <n-list-cell>
        <div
          @click="handleClick"
          class="h-400 flex w-full justify-center items-end bg-white relative"
        >
          <swiper
            style="height: 400rpx; width: 100%"
            circular
            :indicator-dots="indicatorDots"
            :autoplay="autoplay"
            :interval="interval"
            :duration="duration"
            @change="handleChange"
          >
            <swiper-item v-for="(item, index) in images" :key="index">
              <view
                class="w-full h-400 bg-contain bg-center bg-no-repeat"
                :style="{ backgroundImage: `url(${item})` }"
              ></view>
            </swiper-item>
          </swiper>
          <view
            class="bg-black bg-opacity-20 rounded-30rpx py-11rpx text-white text-28 pl-25rpx pr-30rpx absolute bottom-10 left-50% translate-x--50% flex items-center"
          >
            <image src="/static/ui/eye.png" mode="scaleToFill" class="w-44 h-33 mr-18rpx" />
            <view class="font-600 leading-40rpx">查看大图</view>
          </view>
        </div>
      </n-list-cell>
      <n-list-cell>
        <view class="bg-white pt-40rpx px-30rpx w-full box-border">
          <view class="text-34 font-600 leading-48rpx">{{ getText(data.title) }}</view>
          <view class="mt-20rpx">
            <mp-html class="text-28 leading-55rpx" :content="getText(data.content)"></mp-html>
          </view>
        </view>
      </n-list-cell>
    </n-list>
  </view>
</template>

<script setup>
import { getImage, getText } from '@/service/util'
import { fetchNews } from '@/api/news'
const data = ref({})
const images = ref([])
watchEffect(() => {
  const imageList = getImage(data.value.coverImage)
  console.log('%c [ imageList ]-141', 'font-size:13px; background:pink; color:#bf2c9f;', imageList)
  images.value = imageList ? imageList?.split(',') : []
})
const { indicatorDots, autoplay, interval, duration } = {
  indicatorDots: false,
  autoplay: true,
  interval: 3000,
  duration: 500,
}
const handleClick = () => {
  uni.previewImage({
    urls: images.value,
  })
}
onLoad((options) => {
  if (options.title) {
    uni.setNavigationBarTitle({ title: options.title })
  }
  fetchNews(options.id).then((res) => {
    console.log('***', res)
    data.value = res
  })
})
</script>
