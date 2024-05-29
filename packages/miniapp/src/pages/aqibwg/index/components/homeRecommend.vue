<template>
  <view
    class="mt-25rpx w-full bg-no-repeat px-30rpx box-border"
    style="
      background-image: url(https://pqntourism.pcleartv.cn/FkypYWE-CSPF0IYxhcRrLg8v5JGE);
      background-size: 78rpx 114rpx;
    "
  >
    <view class="pt-47rpx text-38 leading-55rpx font-bold text-#3b220e siyuan_st">精彩推荐</view>
    <view class="mt-30rpx w-full">
      <n-waterfall
        ref="list"
        bg-type="none"
        :auto-update="true"
        :column-count="2"
        height="window-!200rpx"
        column-gap="30rpx"
        :down="{ use: false }"
        @down="getNewsList"
        @up="getNewsList"
      >
        <n-waterfall-view ref="water" column-gap="30rpx" :calculator="null">
          <template #left="{ lefts }">
            <view v-for="(item, idx) in lefts" :key="idx" class="mb-30rpx" @click="goDetail(item)">
              <view
                class="w-330 rounded-16rpx overflow-hidden"
                style="
                  background-image: url(https://pqntourism.pcleartv.cn/FjVL9xi2rlxKFFjNwEPX4sAEE_vO);
                "
              >
                <image :src="getImage(item.coverImage)" mode="widthFix" class="w-full" />
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
            <view v-for="(item, idx) in rights" :key="idx" class="mb-30rpx" @click="goDetail(item)">
              <view
                class="w-330 rounded-16rpx overflow-hidden"
                style="
                  background-image: url(https://pqntourism.pcleartv.cn/FjVL9xi2rlxKFFjNwEPX4sAEE_vO);
                "
              >
                <image :src="getImage(item.coverImage)" mode="widthFix" class="w-full" />
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
</template>

<script setup>
import { fetchNewsList } from '@/api/news'
import { getImage, getText } from '@/service/util'
const { getMenu } = useStore('scenic')
// ---------------------------获取精品推荐列表----------------------
const list = ref()
const water = ref()
const getNewsList = async (cp) => {
  const menuObj = await getMenu('news')
  const params = {
    pageNum: cp,
    pageSize: 10,
    status: 1,
    menuId: menuObj.id,
    recommend: 1,
  }
  const res = await fetchNewsList(params)
  if (cp === 1) {
    water.value.clear()
    water.value.set(res.list)
  } else {
    water.value.concat(res.list)
  }
  list.value.nEndSuccess(!!res.nextPage)
}
const goDetail = (item) => {
  if (item.url) {
    navigateTo({
      url: `webLink/index?url=${item.url}&title=${getText(item.title)}`,
    })
  } else {
    navigateTo({
      url: `news/index?id=${item.id}`,
    })
  }
}
</script>

<style lang="scss" scoped></style>
