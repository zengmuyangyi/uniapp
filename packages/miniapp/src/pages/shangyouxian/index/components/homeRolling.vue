<template>
  <view class="mt-18rpx w-full px-20rpx">
    <view
      class="w-full h-100 pl-35rpx pr-23rpx box-border flex items-center rounded-24rpx bg-white overflow-hidden"
      style="box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1)"
    >
      <view class="flex-shrink-0">
        <view class="text-28 font-bold tracking-2rpx leading-36rpx">旅游</view>
        <view class="text-#299627 text-28 font-bold tracking-2rpx leading-36rpx">贴士</view>
      </view>
      <view class="ml-30rpx mr-20rpx w-2 h-42 flex-shrink-0 bg-#d9d9d9"></view>
      <view class="w-570 truncate h-100 text-32 text-#666">
        <swiper
          autoplay
          circular
          vertical
          disable-touch
          style="height: 100rpx"
          class="n-flex-1 w-full"
        >
          <swiper-item v-for="(item, idx) in hints" :key="idx" class="n-flex-row n-align-center">
            <view
              @click="showCurrentAnnouncement(item)"
              class="w-570 truncate leading-45rpx text-32 text-#666"
              >{{ getText(item.title) }}</view
            >
          </swiper-item>
        </swiper>
      </view>
      <view class="flex-shrink-0 w-42 h-42 ml-7rpx">
        <image
          src="/static/index/shangyouxian/rolling.png"
          mode="scaleToFill"
          class="w-full h-full"
        />
      </view>
    </view>
    <n-popup :show="show" pos="center" width="710rpx" height="560rpx">
      <view class="bg-white rounded-24rpx p-8rpx h-full box-border">
        <view
          class="w-full h-full border-2rpx rounded-24rpx flex flex-col justify-between items-center pt-35rpx pb-40rpx box-border border-#9dc374"
        >
          <view>
            <span
              class="text-36 font-800 leading-50rpx truncate relative w-600 text-center text-#333"
              >{{ getText(currentAnnouncement.title) }}
              <view
                class="w-full h-18 bg-opacity-20 absolute bottom-0 left-0 rounded-10rpx bg-#299627"
              ></view>
            </span>
          </view>
          <view class="w-600 max-h-280">
            <scroll-view scroll-y class="max-h-280">
              <mp-html
                :content="getText(currentAnnouncement.content)"
                class="text-30 leading-60rpx text-#666"
              ></mp-html>
            </scroll-view>
          </view>
          <view
            @click="show = false"
            class="w-620 rounded-10rpx h-96 text-center leading-96rpx text-white font-800 text-36 bg-#79b872"
            >确定</view
          >
        </view>
      </view>
    </n-popup>
  </view>
</template>

<script setup>
import { fetchAnnouncement } from '@/api/scenic'
import { getText } from '@/service/util'
const show = ref(false)
const currentAnnouncement = ref({})
const hints = ref([])
async function getAnnouncement() {
  const res = await fetchAnnouncement()
  console.log('&&&&', res.list)
  hints.value = res.list
}
const showCurrentAnnouncement = (item) => {
  show.value = true
  currentAnnouncement.value = item
}

getAnnouncement()
</script>
