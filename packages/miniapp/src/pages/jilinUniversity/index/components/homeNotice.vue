<template>
  <view class="mt-30rpx px-20rpx h-158 w-full box-border">
    <view
      class="w-full h-full bg-white rounded-8rpx pl-15rpx pr-20rpx box-border flex items-center justify-between"
      style="box-shadow: 0px 2px 17px 0px rgba(179, 179, 179, 0.5)"
    >
      <image
        src="https://pqntourism.pcleartv.cn/FjO5Bus6N4U5v4PHjHsVkgZbE0RH"
        mode="scaleToFill"
        class="w-100 h-100"
      />
      <view class="ml-20rpx w-475 h-100 overflow-y-auto">
        <swiper
          autoplay
          circular
          vertical
          next-margin="-20rpx"
          :display-multiple-items="2"
          class="w-full h-full"
        >
          <swiper-item v-for="(item, index) in data" :key="index">
            <view @click="handleClick(item)" class="text-26 leading-35rpx truncate yahei">{{
              item.name
            }}</view>
          </swiper-item>
        </swiper>
      </view>
      <image
        @click="goList"
        src="https://pqntourism.pcleartv.cn/FkC5kzILzzlB7-5l0gCbxAstlEz0"
        mode="scaleToFill"
        class="ml-40rpx w-40 h-40"
      />
    </view>
  </view>
</template>

<script setup>
import { fetchNotice } from '@/api/szgbxy'
const data = ref([])
const params = {
  pageNum: 1,
  pageSize: 10,
}
fetchNotice(params).then((res) => {
  data.value = res.records
})
const goList = () => {
  uni.navigateTo({
    url: '/pages/jilinUniversity/notice/list',
  })
}
const handleClick = (item) => {
  uni.navigateTo({
    url: `/pages/jilinUniversity/notice/detail?id=${item.id}`,
  })
}
</script>

<style lang="scss" scoped></style>
