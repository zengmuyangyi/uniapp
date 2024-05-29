<template>
  <view class="w-full p-3 box-border">
    <view
      v-for="item in data"
      :key="item.id"
      :style="{ backgroundImage: `url(${item.picture})` }"
      class="w-full h-148 rounded-md overflow-hidden mb-3 flex items-center box-border px-3 bg-cover bg-no-repeat bg-center"
      @click="goHelpList(item)"
    >
      <view class="text-white text-32 truncate">#{{ getText(item.name) }}</view>
    </view>
  </view>
</template>

<script setup>
import { fetchHelpType } from '@/api/help'
import { getText } from '@/service/util'
const data = ref([])
const params = {
  pageSize: 0,
  pageNum: 0,
  status: 1,
}
fetchHelpType(params).then(
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
const goHelpList = (item) => {
  navigateTo({
    url: `help/index?typeId=${item.id}`,
  })
}
</script>
