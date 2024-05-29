<template>
  <n-list
    ref="list"
    bg-type="none"
    height="window"
    :auto-update="true"
    @down="getActiveList"
    @up="getActiveList"
  >
    <n-list-cell v-for="(item, index) in data" :key="index">
      <view class="flex justify-between items-center px-3">
        <view class="text-28 mt-3 box-border">
          <view class="mt-1">活动主题：{{ item?.title }}</view>
          <view class="mt-1"
            >提交时间： <uni-dateformat :date="item?.updateTime"></uni-dateformat
          ></view>
          <view class="mt-1">审核状态：<myTag :status="item?.status"></myTag></view>
        </view>
        <view @click="goDetail(item)" class="flex-shrink-0 text-32 text-#02A7F0">详情</view>
      </view>
      <view class="w-full h-1 bg-gray-300 mt-3"></view>
    </n-list-cell>
    <blank v-if="!data.length"></blank>
  </n-list>
</template>

<script setup>
import { fetchMyActive } from '@/api/active'
import myTag from '@/components/tag/tag.vue'
const data = ref([])
const list = ref()
const getActiveList = async (cp) => {
  console.log('###', cp)
  const params = {
    pageSize: 10,
    pageNum: cp,
  }
  const res = await fetchMyActive(params)
  console.log('$$$', res)
  if (cp === 1) {
    data.value = res.list
  } else {
    data.value = data.value.concat(res.list)
  }
  list.value.nEndSuccess(!!res.nextPage)
}
const goDetail = (item) => {
  uni.navigateTo({ url: `/pages/eling/activeDetail/index?data=${JSON.stringify(item)}` })
}
</script>
