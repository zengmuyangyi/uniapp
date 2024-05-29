<template>
  <view class="h-full">
    <view v-show="isLoading">
      <Loading></Loading>
    </view>
    <view v-show="!isLoading" class="relative h-full bg-#f8f8f8">
      <view class="fixed left-0 top-0 bg-white w-full text-30 siyuan_st z-999">
        <n-tabs-h
          space="5rpx"
          :value="current"
          :is-tap="true"
          :hover-top="false"
          :items="tabs"
          :delay="50"
          text-style=""
          text-type="kunshan-text"
          active-text-type="nav-title"
          active-text-style="font-weight: bold;"
          justify="center"
          width="245rpx"
          :height="'100rpx'"
          indicator-type="kunshan"
          indicatorRadius="0rpx"
          indicator-width="50rpx"
          indicator-height="7rpx"
          :indicator-style="'bottom: 0rpx'"
          @change="toChangeTab"
        ></n-tabs-h>
      </view>
      <view class="relative mt-130rpx h-full">
        <swiper :current="current" style="width: 100%; height: 100%" @change="toSwiperChange">
          <swiper-item v-for="(parentItem, parentIndex) in typeData" :key="parentItem.id">
            <view class="w-full h-full box-border p-40rpx">
              <n-list
                ref="list"
                bg-type="none"
                height="window-!140rpx"
                :auto-update="true"
                @down="getNewsList"
                @up="getNewsList"
              >
                <n-list-cell v-for="(item, index) in typeData[parentIndex]?.data" :key="index">
                  <view @click="goDetail(item)" class="mb-60rpx w-full">
                    <view class="w-full h-320 relative">
                      <view
                        class="w-612 h-320 top-20 left-50% translate-x--50% absolute z-1"
                        style="background-color: rgba(156, 156, 156, 0.75); filter: blur(22px)"
                      ></view>
                      <view
                        class="w-full h-320 bg-cover bg-center absolute top-0 left-0 z-999"
                        :style="{ backgroundImage: `url(${getImage(item.coverImage)})` }"
                      >
                      </view>
                    </view>
                    <view class="mt-20rpx text-30 font-bold truncate w-full siyuan_ht">{{
                      getText(item.title)
                    }}</view>
                    <view class="mt-16rpx w-full truncate text-22 siyuan_ht">{{
                      getText(item.indroduction)
                    }}</view>
                  </view>
                </n-list-cell>
                <blank v-if="!typeData[current]?.data?.length && isLoaded"></blank>
              </n-list>
            </view>
          </swiper-item>
        </swiper>
      </view>
    </view>
  </view>
</template>

<script setup>
import Loading from '@/components/loading.vue'
import { fetchNewsList, fetchNewsTypeNew } from '@/api/news'
import { getText, getImage } from '@/service/util'

const { getMenu } = useStore('scenic')
const menuId = ref({})
const isLoading = ref(true)
const typeData = ref([])
const current = ref(0)
const getNews = async () => {
  menuId.value = await getMenu('education')
  const typeParams = {
    pageSize: 0,
    pageNum: 0,
    status: 1,
    menuId: menuId.value?.id,
  }
  const typeRes = await fetchNewsTypeNew(typeParams)
  typeData.value = typeRes.list
  isLoading.value = false
}
const tabs = computed(() => {
  return typeData.value?.map((i) => getText(i.name))
})
const toChangeTab = (i) => {
  current.value = i
  list.value[current.value].nEndSuccess(true)
  if (!typeData.value[current.value].data?.length) {
    getNewsList(1)
  }
}
const toSwiperChange = (e) => {
  current.value = e.detail.current
  list.value[current.value].nEndSuccess(true)
  if (!typeData.value[current.value].data?.length) {
    getNewsList(1)
  }
}
const list = ref()
const data = ref([])
const isLoaded = ref(false)
const getNewsList = async (cp) => {
  menuId.value = await getMenu('education')
  const params = {
    pageNum: cp,
    pageSize: 10,
    status: 1,
    typeId: typeData.value[current.value].id ? typeData.value[current.value].id : '',
    menuId: menuId.value?.id,
  }
  fetchNewsList(params).then((res) => {
    console.log('%c [ 新闻 ]-50', 'font-size:13px; background:pink; color:#bf2c9f;', res)
    if (cp === 1) {
      typeData.value[current.value].data = res.list
    } else {
      typeData.value[current.value].data = typeData.value[current.value].data.concat(res.list)
    }
    list.value?.[current.value].nEndSuccess(!!res.nextPage)

    isLoaded.value = true
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
getNews()
</script>
