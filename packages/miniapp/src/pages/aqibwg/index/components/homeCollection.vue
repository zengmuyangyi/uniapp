<template>
  <view class="w-full px-30rpx mt-60rpx box-border">
    <view class="w-full flex justify-between items-center">
      <view class="text-38 leading-55rpx font-bold text-#3b220e siyuan_st">馆藏珍品</view>
      <view @click="handleList" class="flex items-center">
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
    <view class="w-full flex overflow-y-auto mt-30rpx">
      <view
        v-for="(item, index) in data"
        :key="index"
        @click="handleDetail(item)"
        class="w-500 h-300 rounded-16rpx overflow-hidden bg-cover bg-center flex-shrink-0 mr-30rpx"
        :style="{ backgroundImage: `url(${item.cover})` }"
      ></view>
    </view>
  </view>
</template>

<script setup>
import { cultureApi } from '@/api/culture'
const { getMenu } = useStore('scenic')
const data = ref([])
const getCulturalRelicList = async () => {
  const menuObj = await getMenu('culturalRelic')
  const params = {
    pageSize: 0,
    pageNum: 0,
    status: 1,
    menuId: menuObj.id,
    isRecommend: 1,
  }
  const res = await cultureApi.getList(params)
  data.value = res.list
}
getCulturalRelicList()
const handleList = () => {
  uni.switchTab({
    url: '/pages/aqibwg/culturalRelicList/index',
  })
}
const handleDetail = (item) => {
  uni.navigateTo({
    url: `/pages/aqibwg/culturalRelic/index?id=${item.id}`,
  })
}
</script>

<style lang="scss" scoped></style>
