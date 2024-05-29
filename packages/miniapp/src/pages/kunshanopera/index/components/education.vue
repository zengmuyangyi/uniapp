<template>
  <view>
    <view class="flex justify-between items-center text-black">
      <view class="siyuan_ht font-bold text-50">场馆活动</view>
      <view @click="goList" class="w-50 h-50">
        <image src="https://pqntourism.pcleartv.cn/Fm05xiZgonmJd0GwKg3L_yuzsFQV" mode="scaleToFill" class="w-full h-full" />
      </view>
    </view>
    <view class="mt-50rpx w-full mb-30rpx">
      <view v-for="item in data" :key="item.id" @click="goDetail(item)" class="w-full mt-60rpx">
        <view class="w-full h-320 relative">
          <view
            class="absolute w-612 h-320 left-50% translate-x--50% top-20"
            style="filter: blur(22rpx); background: rgba(156, 156, 156, 0.75)"
          ></view>
          <view
            class="w-full h-320 bg-cover bg-center absolute top-0 left-0"
            :style="{ backgroundImage: `url(${getImage(item.coverImage)})` }"
          >
          </view>
        </view>
        <view class="w-full truncate text-30 font-bold mt-20rpx siyuan_ht">{{
          getText(item.title)
        }}</view>
        <view class="mt-16rpx text-22 w-full truncate siyuan_ht">{{
          getText(item.introduction)
        }}</view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { getImage, getText } from '@/service/util'
import { fetchNewsType, fetchNewsList } from '@/api/news'
const { getMenu } = useStore('scenic')
const menuId = ref({})
const data = ref([])
const getNewsList = async () => {
  menuId.value = await getMenu('education')
  const params = {
    pageSize: 0,
    pageNum: 0,
    menuId: menuId.value?.id,
    status: 1,
    recommend: 1,
  }
  const res = await fetchNewsList(params)
  console.log('^^^', res)
  data.value = res.list
}
const goList = () => {
  uni.navigateTo({
    url: '/pages/kunshanopera/education/index',
  })
}
const goDetail = (item) => {
  if (item.url) {
    navigateTo({
      url: `webLink/index?url=${item.url}&title=${getText(item.title)}`,
    })
  } else {
    uni.navigateTo({
      url: `/pages/kunshanopera/commonDetail/index?id=${item.id}&title=活动详情`,
    })
  }
}
getNewsList()
</script>
