<template>
  <view class="w-full px-30rpx box-border mt-46rpx">
    <view class="text-34 font-600">景区资讯</view>
    <view
      @click="goDetail(item)"
      v-for="item in data"
      :key="item.id"
      class="py-24rpx flex w-full border-b border-b-#f1f1f1"
    >
      <view
        class="w-174 h-150 flex-shrink-0 bg-gray-300 bg-cover bg-center"
        :style="{ backgroundImage: `url(${getImage(item.coverImage)})` }"
      >
      </view>
      <view class="ml-38rpx">
        <view class="text-30 font-600 leading-42rpx w-450">{{
          textOmission(7, getText(item.title))
        }}</view>
        <view class="mt-16rpx text-28 leading-40rpx w-450 text-#7a7a7a">{{
          textOmission(20, getText(item.indroduction))
        }}</view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { fetchNewsList, fetchNewsType } from '@/api/news'
import { getText, getImage, textOmission } from '@/service/util'
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
    recommend: 1,
    typeId: newsType.value.dongtai,
  })
  data.value = res.list
})
const goDetail = (item) => {
  navigateTo({ url: `news/index?id=${item.id}` })
}
</script>
