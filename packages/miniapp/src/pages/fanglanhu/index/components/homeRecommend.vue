<template>
  <view class="w-full px-20rpx box-border">
    <view class="text-38 font-800 leading-53rpx">精品推荐</view>
    <view class="mt-27rpx flex overflow-x-auto">
      <view
        v-for="(item, index) in typeList"
        :key="index"
        class="px-40rpx py-10rpx rounded-28rpx text-26 leading-36rpx"
        :class="index ? 'ml-20rpx' : ''"
        :style="{
          background:
            currentTab === index ? 'linear-gradient(315deg, #1ddbf5 0%, #4d91ff 100%)' : '#F0F0F0',
          color: currentTab === index ? '#fff' : '#777',
          fontWeight: currentTab === index ? 600 : 400,
        }"
        @click="handleClick(index)"
        >{{ getText(item.name) }}</view
      >
    </view>
    <view class="w-full my-20rpx">
      <n-waterfall
        ref="list"
        bg-type="none"
        :auto-update="true"
        :column-count="2"
        height="window-!200rpx"
        column-gap="20rpx"
        :down="{ use: false }"
        @down="getNewsList"
        @up="getNewsList"
      >
        <n-waterfall-view ref="water" column-gap="20rpx" :calculator="null">
          <template #left="{ lefts }">
            <view v-for="(item, idx) in lefts" :key="idx" @click="goDetail(item)">
              <view class="w-full rounded-8rpx overflow-hidden" :class="idx ? 'mt-20rpx' : ''">
                <image :src="getImage(item.coverImage)" mode="widthFix" class="w-full" />
                <view
                  class="w-full px-24rpx pt-20rpx pb-30rpx box-border text-26 leading-36rpx font-800 tracking-1rpx bg-white"
                  >{{ getText(item.title) }}</view
                >
              </view>
            </view>
          </template>
          <template #right="{ rights }">
            <view v-for="(item, idx) in rights" :key="idx" @click="goDetail(item)">
              <view class="w-full rounded-8rpx overflow-hidden" :class="idx ? 'mt-20rpx' : ''">
                <image :src="getImage(item.coverImage)" mode="widthFix" class="w-full" />
                <view
                  class="w-full px-24rpx pt-20rpx pb-30rpx box-border text-26 leading-36rpx font-800 tracking-1rpx bg-white"
                  >{{ getText(item.title) }}</view
                >
              </view>
            </view>
          </template>
        </n-waterfall-view>
      </n-waterfall>
    </view>
  </view>
</template>

<script setup>
import { fetchNewsTypeNew, fetchNewsList } from '@/api/news'
import { getImage, getText } from '@/service/util'
const { getMenu } = useStore('scenic')
const typeList = ref([{ name: { cn: '热门', en: '' }, hot: 1 }])
const currentTab = ref(0)
const getNewsTypeList = async () => {
  const menuObj = await getMenu('taoyuancity')
  const params = {
    pageNum: 0,
    pageSize: 0,
    status: 1,
    menuId: menuObj.id,
  }
  const res = await fetchNewsTypeNew(params)
  typeList.value = typeList.value.concat(res.list)
}
const handleClick = (index) => {
  currentTab.value = index
  list.value.nRefresh()
}
// ---------------------------获取精品推荐列表----------------------
const list = ref()
const water = ref()
const getNewsList = async (cp) => {
  const menuObj = await getMenu('taoyuancity')
  const ins = list.value
  const params = {
    pageNum: cp,
    pageSize: 10,
    status: 1,
    menuId: menuObj.id,
    hot: typeList.value[currentTab.value]?.hot,
    typeId: typeList.value[currentTab.value]?.id,
  }
  const res = await fetchNewsList(params)
  if (cp === 1) {
    water.value.clear()
    water.value.set(res.list)
  } else {
    water.value.concat(res.list)
  }
  ins.nEndSuccess(!!res.nextPage)
}
onLoad(async () => {
  await getNewsTypeList()
  getNewsList(1)
})
const goDetail = (item) => {
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
</script>

<style lang="scss" scoped></style>
