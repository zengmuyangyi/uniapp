<template>
  <view class="w-full box-border px-3">
    <n-list
      ref="list"
      bg-type="none"
      height="window"
      :auto-update="true"
      @down="getLostList"
      @up="getLostList"
    >
      <n-list-cell v-for="(item, index) in data" :key="index">
        <view @click="goDeatil(item)" class="mt-3 flex justify-between items-center">
          <view class="text-28">
            <view class="mt-1">单号：{{ item.orderNo }}</view>
            <view class="mt-1"
              >创建时间： <uni-dateformat :date="item.addTime"></uni-dateformat
            ></view>
          </view>
          <view class="text-#169BD5 text-30">{{ getTag(item.status) }}</view>
        </view>
      </n-list-cell>
      <blank v-if="!data.length"></blank>
    </n-list>
  </view>
</template>

<script setup>
import { fetchMyLostList } from '@/api/lost'
import { getTag } from '@/service/util'
const data = ref([])
const list = ref()
const getLostList = async (cp) => {
  console.log('###', cp)
  const params = {
    pageSize: 10,
    pageNum: cp,
  }
  const res = await fetchMyLostList(params)
  console.log('$$$', res)
  if (cp === 1) {
    data.value = res.list
  } else {
    data.value = data.value.concat(res.list)
  }
  list.value.nEndSuccess(!!res.nextPage)
}
const goDeatil = (item) => {
  console.log('%%%')
  uni.navigateTo({ url: `/pages/eling/lostDetail/index?data=${JSON.stringify(item)}` })
}
onShow(() => {
  getLostList(1)
})
</script>
