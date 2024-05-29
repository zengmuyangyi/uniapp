<template>
  <view class="bg-#f5f5f5 min-h-full w-full p-20rpx">
    <view
      class="bg-white pt-40rpx px-30rpx w-full box-border flex justify-between flex-wrap rounded-24rpx"
      style="box-shadow: 0 2rpx 8rpx 0 rgba(0, 0, 0, 0.1)"
    >
      <view
        class="w-310 mb-40rpx"
        v-for="(item, index) in data"
        :key="index"
        @click="handleClick(item)"
      >
        <view
          class="w-full h-310 rounded-10rpx bg-cover bg-center"
          :style="{ backgroundImage: `url(${getImage(item.cover)})` }"
        ></view>
        <view class="mt-20rpx w-full truncate text-28 leading-40rpx font-600">{{
          getText(item.name)
        }}</view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { fetchMapPOIChildren } from '@/api/map'
import { getImage, getText } from '@/service/util'
const data = ref([])
const handleClick = (item) => {
  const images = getImage(item.images)
  uni.previewImage({
    urls: images.split(','),
  })
}
onLoad((options) => {
  const params = {
    status: 1,
    pageSize: 0,
    pageNum: 0,
    parentId: options.parentId - 0,
  }
  fetchMapPOIChildren(params).then((res) => {
    console.log('^^^^^^', res)
    data.value = res.list
  })
})
</script>
