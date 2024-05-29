<template>
  <view class="text-28 w-full p-3 min-h-full box-border relative">
    <view class="flex justify-between items-center">
      <view class="">
        <view class="mt-1">单号：{{ data.orderNo }}</view>
        <view class="mt-1">创建时间： <uni-dateformat :date="data.addTime"></uni-dateformat></view>
      </view>
      <view class="text-#169BD5 text-30">{{ getTag(data.status) }}</view>
    </view>
    <view class="mt-1">姓名：{{ data.personName }}</view>
    <view class="mt-1">手机号：{{ data.phone }}</view>
    <view class="mt-1">遗失位置：{{ data.lostAddress }}</view>
    <view class="mt-1">遗失日期：<uni-dateformat :date="data.lostTime"></uni-dateformat></view>
    <view class="mt-1">物品类型：{{ data.goodsName }}</view>
    <view class="mt-1">物品描述：{{ data.describe }}</view>
    <view class="fixed bottom-10 left-0 w-full flex p-3 box-border">
      <button
        v-if="data.status === 1"
        class="bg-gradient-to-br from-#6ee2f2 to-#396fef h-80 text-30 mt-10px w-full text-white rounded-full"
        @click="found(data.id)"
      >
        确认领回
      </button>
      <button
        v-if="data.status === 0"
        class="bg-gradient-to-br from-#def26e to-#efa639 h-80 text-30 mt-10px w-full text-white rounded-full"
        @click="goForm(data)"
      >
        修改信息
      </button>
    </view>
  </view>
</template>

<script setup>
import { getTag } from '@/service/util'
import { lostFound } from '@/api/lost'
const data = ref({})
const goForm = (formData) => {
  uni.navigateTo({ url: `/pages/eling/lostForm/index?data=${JSON.stringify(formData)}` })
}
const found = async (id) => {
  const params = {
    idList: [id],
    project: UNI_PROJECT,
  }
  const res = lostFound(params)
  if (res.resCode === 200) {
    uni.showToast({
      title: '提交成功',
      mask: true,
    })
    setTimeout(() => {
      uni.navigateBack({
        delta: 1,
      })
    }, 2000)
  } else {
    uni.showToast({
      title: res.errInfo,
      icon: 'error',
      mask: true,
    })
  }
}
onLoad((options) => {
  data.value = JSON.parse(options.data)
})
</script>

<style scoped lang="scss">
.demo {
  color: #efa639;
}
</style>
