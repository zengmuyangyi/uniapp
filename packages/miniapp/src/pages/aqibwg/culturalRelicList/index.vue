<template>
  <view
    class="w-full h-full bg-white bg-contain"
    style="background-image: url(https://pqntourism.pcleartv.cn/FjdXH06StXmVTxHzy5tu6Txv1aOM)"
  >
    <!-- 顶部导航栏 -->
    <n-position pos="top" box-style="width:750rpx;">
      <view class="bg-transparent">
        <n-height height="status"></n-height>
        <n-height height="nav">
          <view class="flex h-full w-full items-center px-3 justify-center">
            <span class="text-32 font-bold leading-46rpx text-center text-#3b220e siyuan_st"
              >馆藏珍品</span
            >
          </view>
        </n-height>
      </view>
    </n-position>
    <view
      class="w-full h-full bg-no-repeat pt-180rpx px-30rpx box-border"
      style="
        background-image: url(https://pqntourism.pcleartv.cn/FuTKpvREyaWMztaVBWmfgX0Um6P4);
        background-size: 448rpx 693rpx;
      "
    >
      <view
        class="w-full h-84 rounded-42rpx bg-black bg-opacity-30 px-30rpx box-border flex items-center"
      >
        <image
          src="https://pqntourism.pcleartv.cn/FmzSeiH-BSjp256PUsDL9lzAHQYV"
          mode="scaleToFill"
          class="w-30 h-30 mr-20rpx"
        />
        <input
          class="flex-1"
          type="text"
          placeholder="请输入关键词"
          placeholderStyle="font-size: 26rpx;font-weight: 400;color: #FFF;line-height: 37rpx;"
          style="font-size: 26rpx; font-weight: 400; color: #fff; line-height: 37rpx"
          @confirm="handleSearch"
        />
      </view>
      <view class="mt-30rpx w-full">
        <n-waterfall
          ref="list"
          bg-type="none"
          :auto-update="true"
          :column-count="2"
          height="window-!500rpx"
          column-gap="30rpx"
          @down="getculturalRelicList"
          @up="getculturalRelicList"
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
import { cultureApi } from '@/api/culture'
import { getText, getImage } from '@/service/util'
const { getMenu } = useStore('scenic')
const water = ref()
const list = ref()
const cultureTitle = ref('')
const getculturalRelicList = async (cp) => {
  const menuObj = getMenu('culturalRelic')
  const params = {
    pageSize: 10,
    pageNum: cp,
    menuId: menuObj.id,
    status: 1,
    title: cultureTitle.value,
  }
  const res = await cultureApi.getList(params)
  console.log('@@@', res)
  if (cp === 1) {
    water.value.clear()
    water.value.set(res.list)
  } else {
    water.value.concat(res.list)
  }
  list.value.nEndSuccess(!!res.nextPage)
}
const handleSearch = (e) => {
  cultureTitle.value = e.detail.value.trim()
  list.value.nRefresh()
  getculturalRelicList(1)
}
const goDetail = (item) => {
  uni.navigateTo({ url: `/pages/aqibwg/culturalRelic/index?id=${item.id}` })
}
// getFloors()

onShow(() => {
  const curPages = getCurrentPages()[0] // 获取当前页面实例
  if (typeof curPages.getTabBar === 'function' && curPages.getTabBar()) {
    curPages.getTabBar().setData({
      selected: 2, // 表示当前菜单的索引，该值在不同的页面表示不同
    })
  }
})
</script>
