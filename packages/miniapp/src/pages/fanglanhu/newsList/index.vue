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
            <span class="ic-baseline-arrow-back-ios absolute left-24" @click="handleBack"></span>
            <span class="text-30 leading-42rpx font-800">景区资讯</span>
          </view>
        </n-height>
      </view>
    </n-position>
    <view class="w-full px-20rpx pt-180rpx box-border">
      <view class="w-full rounded-12rpx bg-white">
        <n-list
          ref="list"
          bg-type="none"
          height="window-!180rpx"
          :auto-update="true"
          @down="getNewsList"
          @up="getNewsList"
        >
          <n-list-cell v-for="(item, index) in data" :key="index">
            <view
              @click="handleClick(item)"
              class="w-full px-20rpx py-35rpx box-border flex justify-between"
            >
              <view
                class="w-212 h-150 rounded-6rpx bg-cover bg-center"
                :style="{ backgroundImage: `url(${getImage(item.coverImage)})` }"
              ></view>
              <view class="">
                <view class="w-410 text-32 leading-45rpx font-500 text-#3e3e3e u-line-2">{{
                  getText(item.title)
                }}</view>
                <view class="mt-10rpx text-24 leading-32rpx text-#909090">{{
                  dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss')
                }}</view>
              </view>
            </view>
          </n-list-cell>
        </n-list>
      </view>
    </view>
  </view>
</template>

<script setup>
import dayjs from 'dayjs'
import { getText, getImage } from '@/service/util'
import { fetchNewsList } from '@/api/news'
const { getMenu } = useStore('scenic')
const data = ref([])
const isLoaded = ref(false)
const list = ref()
const getNewsList = async (cp) => {
  const menuObj = await getMenu('news')
  const ins = list.value
  const params = {
    pageSize: 10,
    pageNum: cp,
    status: 1,
    menuId: menuObj.id,
  }
  fetchNewsList(params).then((res) => {
    if (cp === 1) {
      data.value = res.list
    } else {
      data.value = data.value.concat(res.list)
    }
    ins.nEndSuccess(!!res.nextPage)
    isLoaded.value = true
  })
}
// ----------顶部导航后退--------------
const handleBack = () => {
  uni.navigateBack()
}
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
</script>

<style lang="scss" scoped></style>
