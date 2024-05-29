<template>
  <n-list
    ref="list"
    bg-type="none"
    height="window"
    :auto-update="true"
    @down="getTicketList"
    @up="getTicketList"
  >
    <n-list-cell v-for="(item, index) in data" :key="index">
      <view class="px-3 pt-4 relative" @click="goTicket(item)">
        <div class="flex h-210 box-shadow rounded-20rpx overflow-hidden relative">
          <image lazy-load :src="item.cover" mode="aspectFill" class="w-240 h-210" />
          <view class="flex-1 flex flex-col content-between overflow-hidden ml-35rpx mr-10rpx">
            <view class="pt-24rpx pr-20rpx">
              <view class="w-full text-30">{{ getText(item.name) }}</view>
            </view>
            <view
              class="h-120 w-full text-28 mt-1 text-gray-400 overflow-hidden text-24 u-line-3"
              >{{ getText(item.introduction) }}</view
            >
          </view>
        </div>
      </view>
    </n-list-cell>
    <blank v-if="!data.length && isLoaded"></blank>
  </n-list>
</template>

<script setup>
import { getText } from '@/service/util'
import { fetchTicketList } from '@/api/ticket.js'
const data = ref([])
const list = ref()
const isLoaded = ref(false)
const getTicketList = (cp) => {
  const params = {
    pageSize: 10,
    pageNum: cp,
  }
  fetchTicketList(params).then((res) => {
    console.log('%c [ 票务 ]-50', 'font-size:13px; background:pink; color:#bf2c9f;', res)
    if (cp === 1) {
      data.value = res.list
    } else {
      data.value = data.value.concat(res.list)
    }

    list.value.nEndSuccess(!!res.nextPage)

    isLoaded.value = true
  })
}
const goTicket = (item) => {
  if (item.url.indexOf('小程序') > -1) {
    uni.navigateToMiniProgram({
      shortLink: item.url,
      success(res) {
        console.log(res)
      },
    })
  } else {
    if (item.url.indexOf('?') > -1) {
      const temp = item.url.split('?')
      uni.navigateTo({
        url: `/pages/common/webLink/index?title=${getText(item.name)}&url=${temp[0]}&${temp[1]}`,
      })
    } else {
      uni.navigateTo({
        url: `/pages/common/webLink/index?title=${getText(item.name)}&url=${item.url}`,
      })
    }
  }
}
</script>
