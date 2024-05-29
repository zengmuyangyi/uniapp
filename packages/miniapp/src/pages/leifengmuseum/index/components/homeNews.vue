<template>
  <view class="w-full px-40rpx box-border mt-60rpx">
    <view class="w-full flex justify-between items-center">
      <view class="font-500 leading-48rpx text-#3b2f2f" :class="mode ? 'text-48' : 'text-34'"
        >资讯发布</view
      >
      <view class="flex items-center" @click="handleList">
        <view class="font-500 leading-40rpx text-#8b0500" :class="mode ? 'text-34' : 'text-28'"
          >全部</view
        >
        <image
          src="https://pqntourism.pcleartv.cn/FkTtOGoQFfgAA-K3Ati-V657tVjG"
          mode="scaleToFill"
          class="ml-15rpx"
          :class="mode ? 'w-18 h-29' : 'w-12 h-20'"
        />
      </view>
    </view>
    <view
      class="w-full bg-white rounded-18rpx my-20rpx"
      style="box-shadow: 0px 2px 14px 0px rgba(0, 0, 0, 0.04)"
    >
      <view
        v-for="(item, index) in data"
        :key="index"
        class="w-full px-28rpx py-24rpx box-border flex flex-col justify-between"
        :class="mode ? 'h-260' : 'h-180'"
        @click="handleClick(item)"
      >
        <view
          class="font-400 w-full text-#3b2f2f u-line-2"
          :class="mode ? 'text-40 leading-60rpx' : 'text-30 leading-42rpx'"
          >{{ getText(item.title) }}</view
        >
        <view
          class="font-500 text-#7e7e7e"
          :class="mode ? 'text-32 leading-45rpx' : 'text-26 leading-27rpx'"
          >{{ item.author || '雷锋纪念馆' }} |
          {{ dayjs(item.createTime).format('YYYY-MM-DD') }}</view
        >
      </view>
      <blank v-if="!data.length"></blank>
    </view>
  </view>
</template>

<script setup>
import { fetchNewsList } from '@/api/news'
import { getText } from '@/service/util'
import dayjs from 'dayjs'
const { mode } = useStore('user')
const data = ref([])
const parmas = {
  pageSize: 0,
  pageNum: 0,
  status: 1,
  recommend: 1,
}
fetchNewsList(parmas).then((res) => {
  data.value = res.list
  console.log('&&&', res)
})
const handleClick = (item) => {
  if (item.url) {
    navigateTo({
      url: `webLink/index?url=${item.url}&title=${getText(item.title)}`,
    })
  } else {
    navigateTo({
      url: `news/index?id=${item.id}`,
    })
  }
}
const handleList = () => {
  uni.navigateTo({
    url: `/pages/leifengmuseum/newsList/index`,
  })
}
</script>

<style lang="scss" scoped></style>
