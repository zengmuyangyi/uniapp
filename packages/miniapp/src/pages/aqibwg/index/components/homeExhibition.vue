<template>
  <view
    class="mt-100rpx w-full px-30rpx pb-28rpx box-border bg-no-repeat"
    style="
      background-image: url(https://pqntourism.pcleartv.cn/Fk8E3TzVKrpErF8DwOBrK6QhOMF5);
      background-size: 152rpx 242rpx;
      background-position: right bottom;
    "
  >
    <view class="w-full flex justify-between items-center">
      <view class="text-38 leading-55rpx font-bold text-#3b220e siyuan_st">展览陈设</view>
      <view @click="handleClick" class="flex items-center">
        <view class="text-28 leading-40rpx tracking-1rpx font-bold text-#3b220e siyuan_st"
          >全部</view
        >
        <image
          src="https://pqntourism.pcleartv.cn/FuUBzh0mQsaw3o0dc76ptMBGp9hO"
          mode="scaleToFill"
          class="w-14 h-24 ml-10rpx"
        />
      </view>
    </view>
    <view class="mt-30rpx w-full h-348 rounded-16rpx overflow-hidden">
      <swiper class="w-full h-full">
        <swiper-item v-for="(item, index) in data" :key="index">
          <view
            @click="handleDetail(item)"
            class="w-full h-full bg-cover bg-center"
            :style="{ backgroundImage: `url(${getText(item.cover)})` }"
          ></view>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>

<script setup>
import { newFetchMapPOIList } from '@/api/map'
import { fetchNewsList } from '@/api/news'
import { getText } from '@/service/util'
const { getMenu } = useStore('scenic')
const data = ref([])
const getExhibitionList = async () => {
  const menuObj = await getMenu('indoorMap')
  const params = {
    pageSize: 0,
    pageNum: 0,
    status: 1,
    recommend: 1,
    menuId: menuObj.id,
  }
  const res = await newFetchMapPOIList(params)
  console.log('&&&', res)
  data.value = res.list
}
getExhibitionList()
const handleClick = () => {
  uni.navigateTo({
    url: '/pages/aqibwg/pavilionList/index',
  })
}
const handleDetail = (item) => {
  if (item.url) {
    navigateTo({
      url: `webLink/index?url=${item.url}&title=${getText(item.title)}`,
    })
  } else {
    uni.navigateTo({
      url: `/pages/aqibwg/pavilion/index?id=${item.id}`,
    })
  }
}
</script>

<style lang="scss" scoped></style>
