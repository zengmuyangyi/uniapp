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
                >藏馆文物</span
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
        <n-waterfall
          ref="list"
          bg-type="none"
          :auto-update="true"
          :column-count="2"
          height="window-!180rpx"
          column-gap="30rpx"
          @down="getPavilionRelic"
          @up="getPavilionRelic"
        >
          <n-waterfall-view ref="water" column-gap="30rpx" :calculator="null">
            <template #left="{ lefts }">
              <view
                v-for="(item, idx) in lefts"
                :key="idx"
                class="mb-30rpx"
                @click="goDetail(item)"
              >
                <view
                  class="w-330 rounded-16rpx overflow-hidden"
                  style="
                    background-image: url(https://pqntourism.pcleartv.cn/FjVL9xi2rlxKFFjNwEPX4sAEE_vO);
                  "
                >
                  <image lazy-load :src="item.cover" mode="widthFix" class="w-full" />
                  <view
                    class="w-full px-24rpx py-26rpx box-border bg-cover bg-center"
                    style="
                      background-image: url(https://pqntourism.pcleartv.cn/FjVL9xi2rlxKFFjNwEPX4sAEE_vO);
                    "
                  >
                    <view class="w-full truncate text-26 font-400 leading-37rpx tracking-1rpx">{{
                      getText(item.title)
                    }}</view>
                  </view>
                </view>
              </view>
            </template>
            <template #right="{ rights }">
              <view
                v-for="(item, idx) in rights"
                :key="idx"
                class="mb-30rpx"
                @click="goDetail(item)"
              >
                <view
                  class="w-330 rounded-16rpx overflow-hidden"
                  style="
                    background-image: url(https://pqntourism.pcleartv.cn/FjVL9xi2rlxKFFjNwEPX4sAEE_vO);
                  "
                >
                  <image lazy-load :src="item.cover" mode="widthFix" class="w-full" />
                  <view
                    class="w-full px-24rpx py-26rpx box-border bg-cover bg-center"
                    style="
                      background-image: url(https://pqntourism.pcleartv.cn/FjVL9xi2rlxKFFjNwEPX4sAEE_vO);
                    "
                  >
                    <view class="w-full truncate text-26 font-400 leading-37rpx tracking-1rpx">{{
                      getText(item.title)
                    }}</view>
                  </view>
                </view>
              </view>
            </template>
          </n-waterfall-view>
        </n-waterfall>
      </view>
    </view>
  </view>
</template>

<script setup>
import { getText } from '@/service/util'
import { cultureApi } from '@/api/culture'
const poi = ref(0)
const water = ref()
const list = ref()
const getPavilionRelic = async (cp) => {
  const params = {
    pageSize: 10,
    pageNum: cp,
    poi: poi.value,
    status: 1,
  }
  const res = await cultureApi.getList(params)
  if (cp === 1) {
    water.value.clear()
    water.value.set(res.list)
  } else {
    water.value.concat(res.list)
  }
  list.value.nEndSuccess(!!res.nextPage)
}
const goDetail = (item) => {
  uni.navigateTo({ url: `/pages/aqibwg/culturalRelic/index?id=${item.id}` })
}
// ----------顶部导航后退--------------
const handleBack = () => {
  uni.navigateBack()
}
onLoad((options) => {
  console.log('@@@', options)
  poi.value = options.poi
})
</script>
