<template>
  <view class="">
    <view class="flex justify-between items-center">
      <view class="siyuan_ht font-bold text-50">当前展览</view>
      <view @click="goList" class="w-50 h-50">
        <image
          src="https://pqntourism.pcleartv.cn/Fm05xiZgonmJd0GwKg3L_yuzsFQV"
          mode="scaleToFill"
          class="w-full h-full"
        />
      </view>
    </view>
    <view class="mt-50rpx w-full">
      <scroll-view scroll-x :show-scrollbar="false">
        <view class="flex">
          <view
            v-for="item in data"
            :key="item.id"
            @click="goDetail(item)"
            class="w-594 mr-40rpx flex-shrink-0"
          >
            <view class="w-full h-320 relative">
              <view
                class="w-full h-full bg-cover bg-center"
                :style="{ backgroundImage: `url(${getImage(item.coverImage)})` }"
              >
              </view>
            </view>
            <view class="mt-20rpx text-30 font-bold truncate siyuan_ht">{{
              getText(item.title)
            }}</view>
            <view class="mt-16rpx w-full truncate text-22 siyuan_ht">{{
              getText(item.indroduction)
            }}</view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script setup>
import { getImage, getText } from '@/service/util'
import { fetchNewsTypeNew, fetchNewsList } from '@/api/news'
const { getMenu } = useStore('scenic')
const menuId = ref({})
const data = ref([])
const getNewsList = async () => {
  menuId.value = await getMenu('exhibition')
  const typeParams = {
    pageSize: 0,
    pageNum: 0,
    status: 1,
  }
  const typeRes = await fetchNewsTypeNew(typeParams)
  const typeObj = typeRes.list.find((item) => item.code === 'present')
  const params = {
    pageSize: 0,
    pageNum: 0,
    menuId: menuId.value?.id,
    typeId: typeObj.id,
    status: 1,
    recommend: 1,
  }
  const res = await fetchNewsList(params)
  console.log('^^^', res)
  data.value = res.list
}
const goList = () => {
  uni.switchTab({
    url: '/pages/kunshanopera/exhibit/index',
  })
}
const goDetail = (item) => {
  if (item.url) {
    navigateTo({
      url: `webLink/index?url=${item.url}&title=${getText(item.title)}`,
    })
  } else {
    uni.navigateTo({
      url: `/pages/kunshanopera/commonDetail/index?id=${item.id}&title=展览详情`,
    })
  }
}
getNewsList()
</script>
