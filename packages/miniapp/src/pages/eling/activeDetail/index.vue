<template>
  <view class="w-full min-h-full box-border px-3 py-5 text-30 relative">
    <view class="mb-4">主题活动：{{ data?.title }}</view>
    <view class="mb-4">活动开始时间：<uni-dateformat :date="data.beginDate"></uni-dateformat></view>
    <view class="mb-4">活动结束时间：<uni-dateformat :date="data.endDate"></uni-dateformat></view>
    <view class="mb-4">参与人数：{{ data.participantsNum }}</view>
    <view class="mb-4">申请人姓名：{{ data.name }}</view>
    <view class="mb-4">申请人电话：{{ data.phone }}</view>
    <view class="mb-4">审核状态：<myTag :status="data.status"></myTag></view>
    <view class="mb-4">附件文件：</view>
    <view
      v-for="(item, index) in data.url"
      :key="index"
      class="flex items-center justify-between text-gray-400 mt-2"
    >
      <view class="truncate">{{ index + 1 + '.' + item.name }}</view>
    </view>
    <view class="absolute bottom-80 w-full flex justify-around items-center">
      <button
        @click="goForm(data)"
        :disabled="data.status !== 'Canceled' && data.status !== 'Refused'"
        size="mini"
        type="primary"
      >
        编辑
      </button>
      <button :disabled="data.status !== 'Wait-Approval'" @click="withdraw" size="mini" type="warn">
        撤回
      </button>
    </view>
    <uni-popup ref="popup" type="dialog">
      <uni-popup-dialog
        content="确定撤回吗？"
        :duration="2000"
        :before-close="true"
        @close="close"
        @confirm="confirm"
      ></uni-popup-dialog>
    </uni-popup>
  </view>
</template>

<script setup>
import { cancelActive } from '@/api/active'
import myTag from '@/components/tag/tag.vue'
const data = ref({})
onLoad((options) => {
  console.log('@@@', JSON.parse(options.data))
  data.value = JSON.parse(options.data)
})
// 确认撤回
const popup = ref()
const withdraw = () => {
  popup.value.open()
}
const close = () => {
  popup.value.close()
}
const confirm = async () => {
  const params = {
    id: data.value.id,
  }
  cancelActive(params)
    .then(
      (res) => {
        uni.showToast({
          title: '撤回成功',
        })
      },
      (err) => {
        uni.showToast({
          title: '撤回失败',
        })
      }
    )
    .finally(() => {
      popup.value.close()
      setTimeout(() => {
        uni.navigateBack({
          delta: 2,
        })
      }, 500)
    })
}
// 修改
const goForm = (formData) => {
  uni.navigateTo({ url: `/pages/eling/activeForm/index?data=${JSON.stringify(formData)}` })
}
</script>
