<template>
  <view>
    <view class="flex justify-between items-center common-color">
      <view class="siyuan_st font-bold text-34">馆藏精品</view>
      <view @click="goList" class="flex items-center text-26">
        <view class="">更多</view>
        <view class="ic-round-keyboard-arrow-right"></view>
      </view>
    </view>
    <view class="mt-3 w-full">
      <scroll-view scroll-x>
        <view class="flex">
          <view
            v-for="item in data"
            :key="item.id"
            class="w-614 h-260 rounded-12rpx mr-3 overflow-hidden flex-shrink-0 relative bg-cover bg-center"
            :style="{ backgroundImage: `url(${item.cover})` }"
            @click="goDetail(item)"
          >
            <view class="absolute right-15 bottom-15 text-end w-300">
              <view class="siyuan_st text-30 font-bold text-white">{{ getText(item.title) }}</view>
              <view class="mt-2 text-24 text-white truncate">{{ getText(item.description) }}</view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script setup>
import { cultureApi } from '@/api/culture'
import { getText } from '@/service/util'
const { getMenu } = useStore('scenic')
const menuId = ref({})
const data = ref([])
const getCulture = async () => {
  menuId.value = await getMenu('culturalRelic')
  const params = {
    pageSize: 4,
    pageNum: 1,
    menuId: menuId.value?.id,
    status: 1,
  }
  const res = await cultureApi.getList(params)
  data.value = res.list
}
const goList = () => {
  uni.navigateTo({
    url: '/pages/kunshanopera/patrimonyList/index',
  })
}
const goDetail = (item) => {
  uni.navigateTo({
    url: `/pages/kunshanopera/patrimonyDetail/index?id=${item.id}`,
  })
}
getCulture()
</script>
