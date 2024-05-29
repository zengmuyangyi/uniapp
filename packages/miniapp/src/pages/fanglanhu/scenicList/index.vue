<template>
  <view
    class="w-full min-h-100vh bg-contain bg-no-repeat relative bg-#f6f8fb"
    style="background-image: url('https://pqntourism.pcleartv.cn/Fi1gQJUkPrdNTODjJzovU7SfDdHN')"
  >
    <!-- 顶部导航栏 -->
    <n-position pos="top" box-style="width:750rpx;">
      <view class="bg-transparent">
        <n-height height="status"></n-height>
        <n-height height="nav">
          <view class="flex h-full w-full items-center px-3 justify-center">
            <span class="ic-baseline-arrow-back-ios absolute left-24" @click="handleBack"></span>
            <span class="text-30 leading-42rpx font-800">景区景点</span>
          </view>
        </n-height>
      </view>
    </n-position>
    <view class="w-full px-20rpx pt-180rpx box-border">
      <n-list
        ref="list"
        bg-type="none"
        height="window-!180rpx"
        :auto-update="true"
        @down="getMapPOIList"
        @up="getMapPOIList"
      >
        <n-list-cell v-for="(item, index) in data" :key="index">
          <view
            class="w-full bg-white h-446 rounded-12rpx overflow-hidden relative"
            :class="index ? 'mt-20rpx' : ''"
            @click="goDetail(item)"
          >
            <view
              class="w-full h-348 bg-cover bg-center"
              :style="{ backgroundImage: `url(${getImage(item.cover)})` }"
            ></view>
            <view
              class="w-full px-24rpx box-border mt-25rpx truncate text-28 font-800 leading-36rpx"
              >{{ getText(item.name) }}</view
            >
            <view
              v-if="item.tag"
              class="px-13rpx pt-4rpx pb-10rpx text-23 font-600 text-white leading-36rpx absolute top-0 left-0"
              style="
                background-image: url('https://pqntourism.pcleartv.cn/Fp_N5s__FrzGq9jEzYOzlE90k2NT');
                background-size: 100% 100%;
              "
              >{{ formatImage(item.tag)?.[0] }}</view
            >
          </view>
        </n-list-cell>

        <blank v-if="!data.length && isLoaded"></blank>
      </n-list>
    </view>
  </view>
</template>

<script setup>
import { newFetchMapPOIList } from '@/api/map'
import { getImage, getText, formatImage } from '@/service/util'
const typeId = ref(0)
const data = ref([])
const isLoaded = ref(false)
const list = ref()
const getMapPOIList = (cp) => {
  const ins = list.value
  const params = {
    pageSize: 10,
    pageNum: cp,
    status: 1,
    typeId: typeId.value,
  }
  newFetchMapPOIList(params).then((res) => {
    if (cp === 1) {
      data.value = res.list
    } else {
      data.value = data.value.concat(res.list)
    }
    ins.nEndSuccess(!!res.nextPage)
    isLoaded.value = true
  })
}
const goDetail = (item) => {
  navigateTo({
    url: `scenic/index?id=${item.id}&title=${getText(item.name)}`,
  })
}
// ----------顶部导航后退--------------
const handleBack = () => {
  uni.navigateBack()
}
onLoad((options) => {
  typeId.value = options.typeId - 0
})
</script>

<style lang="scss" scoped></style>
