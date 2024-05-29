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
        <view class="bg-white pt-40rpx w-full box-border">
          <view class="px-30rpx text-34 font-600 leading-48rpx">{{ getText(data.name) }}</view>
          <luch-audio
            v-if="getText(data.video)"
            v-model:play="audioPlay"
            :autoplay="true"
            :name="getText(data.name)"
            :src="getText(data.video)"
            audioStyle="bwg"
          ></luch-audio>
          <view class="px-30rpx">
            <view class="text-34 leading-48rpx font-600 mt-40rpx mb-20rpx">文物详情</view>
            <mp-html class="text-28 leading-55rpx" :content="getText(data.detail)"></mp-html>
          </view>
        </view>
      </n-list-cell>
    </n-list>
    <view
      @click="goTour"
      class="fixed bottom-110 right-0 h-82 pl-37rpx pr-23rpx flex items-center rounded-lt-41rpx rounded-lb-41rpx bg-black bg-opacity-40"
    >
      <view
        class="w-34 h-40 bg-center bg-cover"
        style="background-image: url('https://pqntourism.pcleartv.cn/FvLG40WolgrkTdBORFB4PFZ_3zBJ')"
      ></view>
      <view class="ml-14rpx text-white text-32 leading-45rpx">导览</view>
    </view>
    <!-- <view
      class="fixed right-20 bottom-200 rounded-20rpx overflow-hidden border-1 border-solid text-white bg-#d5b686"
      style="border-color: #d5b586; box-shadow: 0 1rpx 2rpx 1rpx rgba(144, 144, 150, 0.2)"
      @click="goTour"
    >
      <view class="w-90 h-90 text-center leading-90rpx text-40 font-bold">3D</view>
    </view> -->
  </view>
</template>

<script setup>
import { getText } from '@/service/util'
import { fetchCollectionDetail } from '@/api/collection'

// --------------------------数据获取------------------
const data = ref({})
const images = ref([])
watchEffect(() => {
  const imageList = data.value.image
  console.log('%c [ imageList ]-141', 'font-size:13px; background:pink; color:#bf2c9f;', imageList)
  images.value = imageList ? imageList?.split(',') : []
})
const { indicatorDots, autoplay, interval, duration } = {
  indicatorDots: false,
  autoplay: true,
  interval: 3000,
  duration: 500,
}
onLoad((options) => {
  console.log('%%%%%', options)
  if (options?.q) {
    const q = decodeURIComponent(options.q)
    const tempArr = q.split('id=')
    console.log('@@@@', tempArr)
    fetchCollectionDetail(tempArr[1] - 0).then((res) => {
      data.value = res
    })
  }
  if (options?.id) {
    fetchCollectionDetail(options.id - 0).then((res) => {
      data.value = res
    })
  }
})
const handleClick = () => {
  uni.previewImage({
    urls: images.value,
  })
}
const goTour = () => {
  uni.switchTab({ url: '/pages/kunshanopera/tour/index' })
}
</script>
