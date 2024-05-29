<template>
  <view>
    <view v-for="(item, index) in data" :key="index" @click="goDetail(item)">
      <view class="w-full p-3 box-border flex">
        <view class="w-250 h-200 mr-2 flex-shrink-0">
          <image
            :src="getImage(item?.detail?.cover) || getImage(item?.detail?.coverImage)"
            mode="scaleToFill"
            class="w-full h-full"
          />
        </view>
        <view class="font-bold">{{
          getText(item?.detail?.title) || getText(item?.detail?.name)
        }}</view>
      </view>
      <view class="w-full h-1 bg-gray-300"></view>
    </view>
    <blank v-if="!data.length"></blank>
  </view>
</template>

<script setup>
import { fetchMyCollect } from '@/api/collect'
import { fetchMapPOI } from '@/api/map'
import { getImage, getText, navigateTo, getExtConfig } from '@/service/util'
const data = ref([])
const getMyCollect = async () => {
  uni.showLoading({
    title: '数据加载中',
  })
  const res = await fetchMyCollect()
  console.log('@@@', res)
  if (res?.MAP_POI?.length) {
    res.MAP_POI.forEach(async (item) => {
      const temp = await fetchMapPOI(item.collectId)
      item.detail = temp
      data.value.push(item)
    })
  }
  uni.hideLoading()
}
const goDetail = (item) => {
  navigateTo({
    url: `scenic/index?id=${item.collectId}`,
  })
}
getMyCollect()
</script>
