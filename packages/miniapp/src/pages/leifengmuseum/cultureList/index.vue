<template>
  <!-- <view class="w-full h-full bg-gray-100">
    <n-position pos="top" box-style="width:750rpx;">
      <view class="bg-transparent">
        <n-height height="status"></n-height>
        <n-height height="nav">
          <view class="flex h-full w-full items-center px-3 justify-center">
            <span class="ic-baseline-arrow-back-ios absolute left-24" @click="handleBack"></span>
            <span class="text-38 leading-42rpx font-500">景区文创</span>
          </view>
        </n-height>
      </view>
    </n-position>
    <view class="w-full pt-180rpx box-border">
      <n-waterfall
        ref="list"
        bg-type="none"
        :auto-update="true"
        :column-count="2"
        left-gap="40rpx"
        right-gap="40rpx"
        column-gap="30rpx"
        height="window"
        @down="getCultureList"
        @up="getCultureList"
      >
        <n-waterfall-view
          ref="water"
          left-gap="40rpx"
          right-gap="40rpx"
          column-gap="30rpx"
          :calculator="null"
        >
          <template #left="{ lefts }">
            <view v-for="(item, idx) in lefts" :key="idx" class="mb-30rpx" @click="goPage(item)">
              <view
                class="bg-white rounded-14rpx overflow-hidden"
                style="box-shadow: 0rpx 2rpx 14rpx 0rpx rgba(0, 0, 0, 0.04)"
              >
                <image lazy-load :src="item.cover" class="w-320 block" mode="widthFix"></image>
                <view
                  class="w-320 px-30rpx py-24rpx box-border truncate text-34 leading-42rpx font-500 text-#3b2f2f"
                  >{{ getText(item.title) }}</view
                >
              </view>
            </view>
          </template>
          <template #right="{ rights }">
            <view v-for="(item, idx) in rights" :key="idx" class="mb-30rpx" @click="goPage(item)">
              <view
                class="bg-white rounded-14rpx overflow-hidden"
                style="box-shadow: 0rpx 2rpx 14rpx 0rpx rgba(0, 0, 0, 0.04)"
              >
                <image lazy-load :src="item.cover" class="w-320 block" mode="widthFix"></image>
                <view
                  class="w-320 px-30rpx py-24rpx box-border truncate text-34 leading-42rpx font-500 text-#3b2f2f"
                  >{{ getText(item.title) }}</view
                >
              </view>
            </view>
          </template>
        </n-waterfall-view>
      </n-waterfall>
    </view>
  </view> -->
  <view class="w-full h-full flex justify-center items-center text-50 font-600 tracking-4rpx"
    >敬请期待</view
  >
</template>

<script setup>
import { cultureApi } from '@/api/culture'
import { getText } from '@/service/util'
const { getMenu } = useStore('scenic')
const list = ref()
const water = ref()
const getCultureList = async (cp) => {
  const menuObj = await getMenu('culture')
  const ins = list.value
  const params = {
    pageSize: 10,
    pageNum: cp,
    menuId: menuObj.id,
  }
  const res = await cultureApi.getList(params)
  if (cp === 1) {
    water.value.clear()
    water.value.set(res.list)
  } else {
    water.value.concat(res.list)
  }
  ins.nEndSuccess(!!res.nextPage)
}
// ----------顶部导航后退--------------
const handleBack = () => {
  uni.navigateBack()
}
function goPage(item) {
  navigateTo({
    url: `culture/detail?id=${item.id}`,
  })
}
</script>

<style lang="scss" scoped></style>
