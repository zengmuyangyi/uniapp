<template>
  <view
    class="w-full pt-80rpx box-border bg-no-repeat"
    style="
      background-image: url(https://pqntourism.pcleartv.cn/Fgw_Kbj-EmtxEibacz5n8AOUPZfS);
      background-size: 100% 446rpx;
    "
  >
    <image
      src="https://pqntourism.pcleartv.cn/Fm0KNI7HqxGwTPbjgYq9TbQm-_n_"
      mode="scaleToFill"
      class="w-332 h-42 ml-27rpx"
    />
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
