<template>
  <view
    class="w-full h-full bg-contain"
    style="background-image: url(https://pqntourism.pcleartv.cn/FjdXH06StXmVTxHzy5tu6Txv1aOM)"
  >
    <view
      class="w-full h-full bg-no-repeat"
      style="
        background-image: url(https://pqntourism.pcleartv.cn/FvYMnGGvFsY5a4-I-ADD1Svpv4tg);
        background-size: 207rpx 106rpx;
        background-position: right bottom;
      "
    >
      <!-- 顶部导航栏 -->
      <n-position pos="top" box-style="width:750rpx;">
        <view class="bg-transparent">
          <n-height height="status"></n-height>
          <n-height height="nav">
            <view class="flex h-full w-full items-center px-3 justify-center">
              <span
                class="ic-baseline-arrow-back-ios absolute left-24 text-#3b220e"
                @click="handleBack"
              ></span>
              <span class="text-32 font-bold leading-46rpx text-center text-#3b220e siyuan_st"
                >展览介绍</span
              >
            </view>
          </n-height>
        </view>
      </n-position>

      <view
        class="px-30rpx w-full h-full bg-no-repeat pt-180rpx box-border"
        style="
          background-image: url(https://pqntourism.pcleartv.cn/FuTKpvREyaWMztaVBWmfgX0Um6P4);
          background-size: 448rpx 693rpx;
        "
      >
        <view class="w-full flex overflow-x-auto">
          <view
            v-for="(item, index) in typeList"
            :key="index"
            class="h-100 w-50% flex justify-center items-center"
            @click="changeType(index)"
          >
            <view class="text-32 leading-46rpx font-bold text-#3b220e siyuan_st"
              >{{ getText(item.name) }}
              <view v-if="currentType === index" class="w-full h-4 mt-12rpx bg-#3b220e"></view>
            </view>
          </view>
        </view>
        <n-list
          ref="list"
          bg-type="none"
          height="window-!280rpx"
          :auto-update="true"
          @down="getIndoorList"
          @up="getIndoorList"
        >
          <n-list-cell v-for="(item, index) in data" :key="index">
            <view
              class="w-full h-500 rounded-16rpx overflow-hidden mb-30rpx bg-#BFAB93"
              @click="handleDetail(item)"
            >
              <view
                class="w-full h-366 bg-cover bg-center"
                :style="{ backgroundImage: `url(${getText(item.cover)})` }"
              ></view>
              <view
                class="mt-23rpx w-full px-30rpx box-border truncate text-30 leading-42rpx font-400 tracking-1rpx text-#3b220e"
                >{{ getText(item.name) }}</view
              >
              <view
                class="mt-14rpx w-full px-30rpx box-border text-24 leading-33rpx tracking-1rpx font-400 truncate text-#3b220e"
                >{{ getText(item.description) }}</view
              >
            </view>
          </n-list-cell>
        </n-list>
      </view>
    </view>
  </view>
</template>

<script setup>
import { getText } from '@/service/util'
import { newFetchMapPOIList, fetchMapPOITypeNew } from '@/api/map'
const { getMenu } = useStore('scenic')
const data = ref([])
const list = ref()
const typeList = ref([])
const currentType = ref(0)
const getMapPOIType = async () => {
  const menuObj = await getMenu('indoorMap')
  const params = {
    pageSize: 0,
    pageNum: 0,
    status: 1,
    menuId: menuObj.id,
  }
  const res = await fetchMapPOITypeNew(params)
  typeList.value = res.list
  getIndoorList(1)
}
getMapPOIType()
const changeType = (index) => {
  currentType.value = index
  list.value.nRefresh()
}
const getIndoorList = async (cp) => {
  const menuObj = await getMenu('indoorMap')
  const params = {
    pageSize: 10,
    pageNum: cp,
    status: 1,
    menuId: menuObj.id,
    typeId: typeList.value[currentType.value]?.id,
  }
  const res = await newFetchMapPOIList(params)
  if (cp === 1) {
    data.value = res.list
  } else {
    data.value = data.value.concat(res.list)
  }
  list.value.nEndSuccess(!!res.nextPage)
}
// ----------顶部导航后退--------------
const handleBack = () => {
  uni.navigateBack()
}
const handleDetail = (item) => {
  if (item.url) {
    navigateTo({
      url: `webLink/index?url=${item.url}&title=${getText(item.name)}`,
    })
  } else {
    uni.navigateTo({
      url: `/pages/aqibwg/pavilion/index?id=${item.id}`,
    })
  }
}
</script>

<style lang="scss" scoped></style>
