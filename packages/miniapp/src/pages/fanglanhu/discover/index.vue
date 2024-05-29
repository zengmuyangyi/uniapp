<template>
  <view
    class="w-full min-h-100vh bg-contain bg-no-repeat relative bg-#f6f8fb"
    style="background-image: url('https://pqntourism.pcleartv.cn/Fi1gQJUkPrdNTODjJzovU7SfDdHN')"
  >
    <!-- 顶部导航栏 -->
    <n-position pos="top" box-style="width:750rpx;">
      <view class="bg-transparent">
        <n-height height="status"></n-height>
        <n-height height="nav">
          <view class="flex h-full w-full items-center px-3 justify-center">
            <span class="text-30 leading-42rpx font-800">发现</span>
          </view>
        </n-height>
      </view>
    </n-position>
    <view class="w-full px-20rpx pt-180rpx box-border">
      <view class="w-full flex overflow-x-auto">
        <view
          v-for="(item, index) in typeList"
          :key="item.id"
          class="px-28rpx py-10rpx rounded-28rpx text-26 font-600 leading-36rpx flex-shrink-0"
          :class="index ? 'ml-20rpx' : ''"
          :style="{
            background:
              currentType === index ? 'linear-gradient( 315deg, #1DDBF5 0%, #4D91FF 100%)' : '#fff',
            color: currentType === index ? '#fff' : '#777',
          }"
          @click="handleClick(index)"
          >{{ getText(item.name) }}</view
        >
      </view>
      <view class="my-10rpx w-full">
        <n-waterfall
          ref="list"
          bg-type="none"
          :auto-update="true"
          :column-count="2"
          height="window-!240rpx"
          column-gap="20rpx"
          @down="getNewsList"
          @up="getNewsList"
        >
          <n-waterfall-view ref="water" column-gap="20rpx" :calculator="null">
            <template #left="{ lefts }">
              <view v-for="(item, idx) in lefts" :key="idx" @click="goDetail(item)">
                <view class="bg-white rounded-8rpx w-full overflow-hidden pb-20rpx mt-20rpx">
                  <image :src="getImage(item.coverImage)" mode="widthFix" class="w-full" />
                  <view
                    class="mt-20rpx w-full px-24rpx box-border text-26 font-800 leading-36rpx"
                    >{{ getText(item.title) }}</view
                  >
                  <view
                    class="mt-24rpx w-full px-24rpx box-border flex justify-end items-center text-#656565"
                  >
                    <view class="w-36 h-36 ic-baseline-access-time"></view>
                    <view class="ml-9rpx text-22 leading-36rpx">{{
                      dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss')
                    }}</view>
                  </view>
                </view>
              </view>
            </template>
            <template #right="{ rights }">
              <view v-for="(item, idx) in rights" :key="idx" @click="goDetail(item)">
                <view class="bg-white rounded-8rpx w-full overflow-hidden pb-20rpx mt-20rpx">
                  <image :src="getImage(item.coverImage)" mode="widthFix" class="w-full" />
                  <view
                    class="mt-20rpx w-full px-24rpx box-border text-26 font-800 leading-36rpx"
                    >{{ getText(item.title) }}</view
                  >
                  <view
                    class="mt-24rpx w-full px-24rpx box-border flex justify-end items-center text-#656565"
                  >
                    <view class="w-36 h-36 ic-baseline-access-time"></view>
                    <view class="ml-9rpx text-22 leading-36rpx">{{
                      dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss')
                    }}</view>
                  </view>
                </view>
              </view>
            </template>
          </n-waterfall-view>
        </n-waterfall>
      </view>
    </view>
  </view>
</template>

<script setup>
import { fetchNewsTypeNew, fetchNewsList } from '@/api/news'
import { getImage, getText } from '@/service/util'
import dayjs from 'dayjs'
const { getMenu } = useStore('scenic')
const currentType = ref(0)
const typeList = ref([])
const getNewsTypeList = async () => {
  const menuObj = await getMenu('huadu')
  const params = {
    pageSize: 0,
    pageNum: 0,
    status: 1,
    menuId: menuObj.id,
  }
  const res = await fetchNewsTypeNew(params)
  console.log('%%%', res)
  typeList.value = res.list
}
// ---------------------------获取发现列表----------------------
const list = ref()
const water = ref()
const getNewsList = async (cp) => {
  if (!typeList.value[currentType.value]?.id) return
  const ins = list.value
  const params = {
    pageNum: cp,
    pageSize: 10,
    status: 1,
    typeId: typeList.value[currentType.value]?.id,
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
// ----------------------------点击切换类型-------------------
const handleClick = (index) => {
  if (currentType === index) return
  currentType.value = index
  list.value.nRefresh()
}
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
