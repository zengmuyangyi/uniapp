<template>
  <view id="collectionList" class="w-full bg-white">
    <n-list bg-type="inverse" :down="null" :up="null" height="window">
      <n-list-cell v-for="(item, index) in data" :key="item.id">
        <view v-if="index" class="w-full px-50rpx box-border">
          <view class="h-1 bg-#e8e8e8"></view>
        </view>
        <view class="w-full px-50rpx py-30rpx box-border flex justify-between items-center">
          <view
            class="w-160 h-160 flex-shrink-0 bg-center bg-cover"
            :style="{ backgroundImage: `url(${item.cover})` }"
          ></view>
          <view class="flex-1 h-160 mx-20rpx">
            <view class="text-30 font-600 leading-42rpx">{{ getText(item.name) }}</view>
            <!-- <view class="mt-20rpx flex items-center">
              <image
                src="https://pqntourism.pcleartv.cn/Fs6PWy-uDSI9f2mR-xb7FzAynUz9"
                mode="scaleToFill"
                class="w-28 h-28 mr-10rpx"
              />
              <view class="text-26 leading-37rpx text-#747474">时长{{ item.duration }}</view>
            </view> -->
          </view>
          <view @click="changeCurrent(index)" class="w-75 h-75 flex-shrink-0">
            <image
              v-if="data[currentData]?.id === item.id && isPlay"
              src="https://pqntourism.pcleartv.cn/Fu9ZrbDBArKhVCQZMjrA9Aoc0fYk"
              mode="scaleToFill"
              class="w-full h-full"
            />
            <image
              v-else
              src="https://pqntourism.pcleartv.cn/FiZGN7fDEIxBSyfIQXhbBYtoK27w"
              mode="scaleToFill"
              class="w-full h-full"
            />
          </view>
        </view>
      </n-list-cell>
      <blank v-if="!data?.length"></blank>
    </n-list>
    <view
      @click="changeAutoplay"
      class="fixed top-900 right-0 h-82 pl-37rpx pr-23rpx flex items-center rounded-lt-41rpx rounded-lb-41rpx bg-black bg-opacity-40"
    >
      <view
        class="w-32 h-32 bg-center bg-cover"
        style="background-image: url('https://pqntourism.pcleartv.cn/Fnzh_bNTRHNGcRRfpQcqFUE2_9es')"
      ></view>
      <view class="ml-14rpx text-white text-32 leading-45rpx">{{
        isAutoplay ? '关闭讲解' : '打开讲解'
      }}</view>
    </view>
    <!-- <view
      class="fixed right-20 top-800 rounded-20rpx overflow-hidden border-1 border-solid"
      style="border-color: #d5b586; box-shadow: 0 1rpx 2rpx 1rpx rgba(144, 144, 150, 0.2)"
      :style="{
        backgroundColor: isAutoplay ? '#d5b686' : '#fff',
        color: isAutoplay ? '#fff' : '#d5b686',
      }"
      @click="changeAutoplay"
    >
      <view class="w-90 h-90 text-center leading-90rpx text-40 font-bold">听</view>
    </view> -->
  </view>
</template>

<script setup>
import { getImage, getText } from '@/service/util'
import { getCurrentInstance } from 'vue'
defineProps({
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
const listHeight = inject('heightList')
const { proxy } = getCurrentInstance()
// 获取列表高度
nextTick(() => {
  const query = uni.createSelectorQuery().in(proxy)
  query
    .select('#collectionList')
    .boundingClientRect((data) => {
      console.log('%c [ data ]-48', 'font-size:13px; background:pink; color:#bf2c9f;', data)
      listHeight.value[1] = data.height
    })
    .exec()
})
const changeCurrent = inject('changeCurrent')
const isAutoplay = inject('isAutoplay')
const changeAutoplay = inject('changeAutoplay')
</script>
