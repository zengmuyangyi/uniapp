<template>
  <view class="relative mt-46rpx">
    <view class="ml-30rpx text-34 font-600 mb-27rpx">游玩攻略</view>
    <view class="mx-30rpx">
      <scroll-view scroll-x>
        <view class="flex">
          <view
            v-for="item in data"
            :key="item.id"
            :style="{ backgroundImage: `url(${getImage(item.coverImage)})` }"
            class="w-270 h-180 mr-26rpx overflow-hidden flex-shrink-0 rounded-md bg-gray-300 relative bg-cover bg-center"
            @click="goDetail(item)"
          >
            <view
              class="w-full h-44 bg-black bg-opacity-40 absolute bottom-0 left-0 px-20rpx box-border text-white text-24 leading-44rpx truncate"
              >{{ getText(item.title) }}</view
            >
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script setup>
import { fetchNewsList, fetchNewsType } from '@/api/news'
import { getText, getImage } from '@/service/util'
const data = ref([])
onMounted(async () => {
  const newsType = ref({})

  await fetchNewsType().then((res) => {
    console.log('$$$', res)
    res.list.forEach((item) => {
      newsType.value[item.code] = item.id
    })
  })

  const res = await fetchNewsList({
    pageNum: 0,
    pageSize: 0,
    status: 1,
    typeId: newsType.value.gonglue,
  })
  data.value = res.list
})
const goDetail = (item) => {
  navigateTo({ url: `news/index?id=${item.id}` })
}
</script>
