<template>
  <view class="relative min-h-full bg-gray-200">
    <uni-collapse accordion>
      <uni-collapse-item v-for="(item, index) in data" :key="index" :title="getText(item.question)">
        <view class="px-4 py-2 text-26 text-gray-400">{{ getText(item.answer) }}</view>
      </uni-collapse-item>
    </uni-collapse>
    <view
      class="w-100 h-100 rounded-full shadow-xl bg-white absolute right-30 bottom-80 flex flex-col justify-center items-center"
      style="box-shadow: 30px"
      @click="callService"
    >
      <view class="ic-baseline-local-phone text-#1988ac w-40 h-40"></view>
      <view class="text-26 text-#1988ac">电话</view>
    </view>
  </view>
</template>

<script setup>
import { fetchHelpList } from '@/api/help'
import { getText } from '@/service/util'
const { currentScenic } = useStore('scenic')
const data = ref([])
const callService = () => {
  if (currentScenic.value.phone) {
    uni.makePhoneCall({
      phoneNumber: currentScenic.value.phone,
    })
  } else {
    uni.showToast({
      title: '暂无景区电话',
      icon: 'none',
    })
  }
}
onLoad((options) => {
  const params = {
    pageSize: 0,
    pageNum: 0,
    typeId: options.typeId ? options.typeId : '',
    status: 1,
  }
  fetchHelpList(params).then(
    (res) => {
      data.value = res.list
    },
    (err) => {
      uni.showToast({
        title: err.data.errInfo,
        icon: 'none',
      })
    }
  )
})
</script>
