<template>
  <view class="bg-#f2f2f2 min-h-full">
    <view class="flex p-4 justify-around items-center text-white">
      <view
        @click="goForm"
        class="w-320 h-200 rounded-lg text-center leading-200rpx"
        style="background-color: rgba(2, 167, 240, 0.8)"
        >挂失申请</view
      >
      <view
        @click="goProgress"
        class="w-320 h-200 rounded-lg text-center leading-200rpx"
        style="background-color: rgba(2, 167, 240, 0.8)"
        >进度查询</view
      >
    </view>
    <view class="mt-5 bg-white p-4">
      <view class="w-full font-700 text-center">失物招领公告</view>
      <view v-if="currentScenic.phone" class="w-full text-center text-28 mt-1"
        >景区热线：{{ currentScenic.phone }}</view
      >
      <n-list
        ref="list"
        bg-type="none"
        height="window-!status-!nav-!tab"
        :auto-update="true"
        @down="getLostList"
        @up="getLostList"
      >
        <n-list-cell v-for="(item, index) in data" :key="index">
          <view class="text-28 mt-3">
            <view class="mt-1">物品类型：{{ item.goodsName }}</view>
            <view class="mt-1"
              >遗失时间： <uni-dateformat :date="item.lostTime"></uni-dateformat
            ></view>
            <view class="mt-1">详细描述：{{ item.describe }}</view>
            <view class="mt-1">联系方式：{{ item.phone }}</view>
            <view class="w-full h-1 bg-gray-300 mt-3"></view>
          </view>
        </n-list-cell>
        <blank v-if="!data.length"></blank>
      </n-list>
    </view>
  </view>
</template>

<script setup>
import { fetchLostList } from '@/api/lost'
const { currentScenic } = useStore('scenic')
const { isLogin = {} } = useStore('user')
console.log('%%%', isLogin)
const data = ref([])
const list = ref()
const getLostList = async (cp) => {
  console.log('###', cp)
  const params = {
    pageSize: 10,
    pageNum: cp,
    status: 1,
  }
  const res = await fetchLostList(params)
  console.log('$$$', res)
  if (cp === 1) {
    data.value = res.list
  } else {
    data.value = data.value.concat(res.list)
  }
  list.value.nEndSuccess(!!res.nextPage)
}
const goForm = () => {
  if (isLogin.value) {
    uni.navigateTo({ url: '/pages/eling/lostForm/index' })
  } else {
    uni.navigateTo({ url: '/pages/common/login/index' })
  }
}
const goProgress = () => {
  uni.navigateTo({ url: '/pages/eling/lostProgress/index' })
}
</script>
