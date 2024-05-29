<template>
  <n-list
    ref="list"
    bg-type="none"
    height="screen"
    :auto-update="true"
    @down="getAnnouncementList"
    @up="getAnnouncementList"
  >
    <n-list-cell v-for="(item, index) in data" :key="index">
      <view
        class="px-30rpx mb-4 w-full h-100 box-border shadow shadow-lg flex flex-col justify-center"
        @click="goDetail(item)"
      >
        <view class="flex items-center overflow-hidden">
          <view class="w-30 h-30 bg-cover flex-shrink-0 mr-20rpx">
            <image src="/static/ui/announce.png" mode="scaleToFill" class="w-full h-full" />
          </view>
          <view class="truncate">
            <view class="w-full text-30 font-bold truncate">{{ getText(item.title) }}</view>
          </view>
        </view>

        <view class="text-gray-400 text-gray text-24 mt-2 flex items-center">
          <view class="ic-baseline-access-alarm w-30 h-30"></view>
          <view class="ml-14rpx">{{ item.createTime }}</view>
        </view>
      </view>
    </n-list-cell>
  </n-list>
</template>

<script setup>
import { getText } from '@/service/util'
import { fetchAnnouncementList } from '@/api/scenic'
const data = ref([])
const isLoaded = ref(false)
const list = ref()
const getAnnouncementList = (cp) => {
  const params = {
    pageSize: 10,
    pageNum: cp,
    status: 1,
  }
  fetchAnnouncementList(params).then((res) => {
    console.log('%c [ 公告 ]-60', 'font-size:13px; background:pink; color:#bf2c9f;', res)
    if (cp === 1) {
      data.value = res.list
    } else {
      data.value = data.value.concat(res.list)
    }
    list.value.nEndSuccess(!!res.nextPage)
    isLoaded.value = true
  })
}
const goDetail = (item) => {
  uni.navigateTo({
    url: `/pages/baoquan/notice/index?id=${item.id}`,
  })
}
</script>
