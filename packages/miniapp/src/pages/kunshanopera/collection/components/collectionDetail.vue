<template>
  <view class="relative" id="collectionDetail">
    <n-list
      v-if="data[currentData]"
      bg-type="inverse"
      :down="null"
      :up="null"
      height="screen-!80rpx"
    >
      <n-list-cell>
        <div
          @click="handleClick(formatImage(data[currentData]?.image))"
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
            <swiper-item
              v-for="(item, index) in formatImage(data[currentData]?.image)"
              :key="index"
            >
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
          <view class="px-30rpx text-34 font-600 leading-48rpx">{{
            getText(data[currentData]?.name)
          }}</view>
          <luch-audio
            v-if="getText(data[currentData]?.video)"
            v-model:play="audioPlay"
            :autoplay="isAutoplay"
            :name="getText(data[currentData]?.name)"
            :src="getText(data[currentData]?.video)"
            audioStyle="bwg"
            :isPlay="isPlay"
            @onEnded="endAudio"
            @onPause="pauseAudio"
            @onPlay="playAudio"
          ></luch-audio>
          <view class="px-30rpx">
            <view class="text-34 leading-48rpx font-600 mb-20rpx">文物详情</view>
            <mp-html
              class="text-28 leading-55rpx"
              :content="getText(data[currentData]?.detail)"
            ></mp-html>
          </view>
        </view>
      </n-list-cell>
    </n-list>
    <blank v-else></blank>
  </view>
</template>

<script setup>
import { getText, formatImage } from '@/service/util'
import { getCurrentInstance, inject } from 'vue'

// --------------------------数据获取------------------
const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  currentData: {
    type: Number,
    default: () => 0,
  },
  isPlay: {
    type: Boolean,
    default: () => true,
  },
})
const { indicatorDots, autoplay, interval, duration } = {
  indicatorDots: false,
  autoplay: true,
  interval: 3000,
  duration: 500,
}
const handleClick = (data) => {
  if (data?.length) {
    uni.previewImage({
      urls: data,
    })
  }
}
const listHeight = inject('heightList')
const { proxy } = getCurrentInstance()
// 获取列表高度
nextTick(() => {
  const query = uni.createSelectorQuery().in(proxy)
  query
    .select('#collectionDetail')
    .boundingClientRect((data) => {
      console.log('%c [ data ]-48', 'font-size:13px; background:pink; color:#bf2c9f;', data)
      listHeight.value[2] = data.height + 150
    })
    .exec()
})
watch(
  () => props.currentData,
  (newVal) => {
    const query = uni.createSelectorQuery().in(proxy)
    query
      .select('#collectionDetail')
      .boundingClientRect((data) => {
        console.log('%c [ data ]-48', 'font-size:13px; background:pink; color:#bf2c9f;', data)
        listHeight.value[2] = data.height
      })
      .exec()
  }
)
const endAudio = inject('endAudio')
const pauseAudio = inject('pauseAudio')
const playAudio = inject('playAudio')
const isAutoplay = inject('isAutoplay')
</script>
