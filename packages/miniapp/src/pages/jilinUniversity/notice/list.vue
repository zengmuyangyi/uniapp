<template>
  <view class="w-full">
    <uni-grid :column="2" :show-border="false" :highlight="false" :square="false" class="w-full">
      <uni-grid-item v-for="(item, index) in tabList" :key="index">
        <view
          class="h-90 w-full flex justify-center items-center relative"
          @click="handleChange(item)"
        >
          <view
            class="text-28 font-600 leading-40rpx"
            :style="{ color: currentTab === item.id ? '#0052D9' : '#000' }"
            >{{ item.name }}</view
          >
          <view
            v-if="currentTab === item.id"
            class="absolute w-36 h-5 bottom-14 left-50% translate-x--50% bg-#0052D9"
          ></view>
        </view>
      </uni-grid-item>
    </uni-grid>
    <n-list
      ref="list"
      bg-type="none"
      height="window-!90rpx"
      :auto-update="true"
      @down="getNoticeList"
      @up="getNoticeList"
    >
      <n-list-cell v-for="(item, index) in data" :key="index">
        <view class="px-40rpx py-30rpx" @click="goDetail(item.id)">
          <view class="text-30 font-400 leading-44rpx">{{ item.name }}</view>
          <view class="mt-10rpx text-24 leading-40rpx tracking-1rpx text-#737373 yahei">{{
            item.createTime
          }}</view>
        </view>
      </n-list-cell>
      <blank v-if="!data.length"></blank>
    </n-list>
  </view>
</template>

<script setup>
import { fetchNotice } from '@/api/szgbxy'
const currentTab = ref(1)
const tabList = ref([
  {
    id: 1,
    name: '通知',
  },
  {
    id: 2,
    name: '政策',
  },
])
const handleChange = (item) => {
  currentTab.value = item.id
  getNoticeList(1)
}
const data = ref([])
const list = ref()
const getNoticeList = async (cp) => {
  const params = {
    pageSize: 10,
    pageNum: cp,
    categoryId: currentTab.value,
  }
  const res = await fetchNotice(params)
  console.log('@@@', res)
  if (cp === 1) {
    data.value = res.records
  } else {
    data.value = data.value.concat(res.records)
  }
  list.value.nEndSuccess(!!(res.pages - cp > 0))
}

function goDetail(id) {
  uni.navigateTo({
    url: `/pages/jilinUniversity/notice/detail?id=${id}`,
  })
}
</script>

<style lang="scss" scoped></style>
