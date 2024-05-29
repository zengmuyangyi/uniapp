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
            <view class="w-full h-full box-border">
              <n-list
                ref="list"
                bg-type="none"
                height="window-!140rpx"
                :auto-update="true"
                @down="getNewsList"
                @up="getNewsList"
              >
                <n-list-cell>
                  <view class="flex flex-wrap justify-between w-full px-40rpx box-border">
                    <view
                      v-for="(item, index) in typeData[parentIndex]?.data"
                      :key="index"
                      @click="goDetail(item)"
                      class="mb-60rpx w-full"
                    >
                      <view
                        class="w-full h-376 bg-cover bg-center relative"
                        :style="{ backgroundImage: `url(${getImage(item.coverImage)})` }"
                      >
                        <view
                          class="w-612 h-383 top-13 left-50% translate-x--50% absolute z--1"
                          style="background-color: rgba(156, 156, 156, 0.75); filter: blur(22px)"
                        ></view>
                      </view>
                      <view class="mt-24rpx text-30 font-bold truncate w-full siyuan_ht">{{
                        getText(item.title)
                      }}</view>
                      <view class="mt-16rpx w-full truncate text-22 siyuan_ht">{{
                        getText(item.indroduction)
                      }}</view>
                    </view>
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
import { fetchNewsTypeNew, fetchNewsList } from '@/api/news'
import { getText, getImage } from '@/service/util'
const { getMenu } = useStore('scenic')
const menuId = ref({})
const isLoading = ref(true)
const typeData = ref([])
const current = ref(0)
const getNews = async () => {
  menuId.value = await getMenu('exhibition')
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
const getNewsList = (cp) => {
  const params = {
    pageNum: cp,
    pageSize: 10,
    typeId: typeData.value[current.value].id,
    status: 1,
  }
  fetchNewsList(params).then((res) => {
    console.log('%c [ 新闻 ]-50', 'font-size:13px; background:pink; color:#bf2c9f;', res)
    if (cp === 1) {
      typeData.value[current.value].data = res.list
    } else {
      typeData.value[current.value].data = typeData.value[current.value].data.concat(res.list)
    }
    list.value[current.value].nEndSuccess(!!res.nextPage)

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
      url: `/pages/kunshanopera/commonDetail/index?id=${item.id}&title=展览详情`,
      // url: `/pages/kunshanopera/collection/index?id=${item.id}&title=展览详情`,
    })
  }
}
getNews()
// ------------------------连接websocket-----------------------
// const { userInfo } = useStore('user')
// watchEffect(() => {
//   if (userInfo.value?.openId) {
//     console.log('openId', userInfo.value?.openId)
//     uni.connectSocket({
//       url: `wss://ly2.pcleartv.cn/sinan/api/v1/client/message/ws/send?app_id=a6c00228-674c-422b-a9c2-d58f6396b441&open_id=${userInfo.value?.openId}`,
//       header: {
//         'content-type': 'application/json',
//       },
//       method: 'GET',
//       success: (e) => {
//         console.log('websocket连接成功', e)
//       },
//       fail: (e) => {
//         console.log('&&&&', e)
//       },
//     })
//   }
// })
// uni.onSocketOpen(function (res) {
//   console.log('WebSocket连接已打开！')
// })
// uni.onSocketError(function (res) {
//   console.log('WebSocket连接打开失败，请检查！', res)
// })
// onShow(() => {
//   setInterval(() => {
//     uni.sendSocketMessage({
//       data: '发送的信息',
//       success: () => {
//         console.log('信息发送成功')
//       },
//       fail: (fail) => {
//         console.log('信息发送失败', fail)
//       },
//     })
//   }, 2000)
// })
// onHide(() => {
//   uni.stopBeaconDiscovery({
//     success: () => {
//       console.log('已停止搜索蓝牙设备')
//     },
//   })
// })
</script>
