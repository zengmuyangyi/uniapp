<template>
  <view
    class="w-full pt-80rpx box-border bg-no-repeat"
    style="
      background-image: url(https://pqntourism.pcleartv.cn/Fvf0ZQK-5dZSAviIVy6ThMXLpCLd);
      background-size: 100% 446rpx;
    "
  >
    <view class="text-34 font-600 text-white leading-48rpx ml-27rpx">吉林大学安全教育系统</view>
    <view class="w-full px-20rpx mt-44rpx box-border">
      <view class="w-full h-366">
        <swiper autoplay circular class="w-full h-full">
          <swiper-item v-for="(item, index) in data" :key="index">
            <view
              class="w-full h-full bg-cover bg-center"
              :style="{ backgroundImage: `url(${item.image})` }"
            ></view>
          </swiper-item>
        </swiper>
      </view>
    </view>
  </view>
</template>

<script setup>
import { fetchBanner } from '@/api/szgbxy'
const data = ref([])
const params = {
  pageNum: 1,
  pageSize: 10,
}
fetchBanner(params).then((res) => {
  data.value = res.records
})
</script>

<style lang="scss" scoped></style>
