<template>
  <view
    class="w-full h-128 bg-contain bg-no-repeat flex justify-center pt-23rpx box-border"
    style="background-image: url(https://pqntourism.pcleartv.cn/FiLfTE7E4ODepYjd3Gd3uq8Q-DtG)"
  >
    <view class="w-540 h-58 flex items-center justify-between px-16rpx box-border noticeBox">
      <image
        src="https://pqntourism.pcleartv.cn/FjDgTDs-xW5JJi9gbz74x88L-gv_"
        mode="scaleToFill"
        class="w-26 h-26"
      />
      <view class="w-450 h-33">
        <swiper autoplay circular vertical class="w-full h-full">
          <swiper-item v-for="(item, index) in hints" :key="index">
            <view
              @click="handleClick(item)"
              class="truncate text-24 leading-33rpx tracking-1rpx w-full text-#3b220e"
              >{{ getText(item.title) }}</view
            >
          </swiper-item>
        </swiper>
      </view>
      <image
        src="https://pqntourism.pcleartv.cn/FoOw5dEs3adxzqu5E4ddxFQQOo88"
        mode="scaleToFill"
        class="w-12 h-18"
      />
    </view>
  </view>
</template>

<script setup>
import { fetchAnnouncement } from '@/api/scenic'
import { getText } from '@/service/util'
const hints = ref([])
async function getAnnouncement() {
  const res = await fetchAnnouncement()
  // console.log('&&&&', res.list)
  hints.value = res.list
}
const handleClick = (item) => {
  uni.navigateTo({
    url: `/pages/baoquan/notice/index?id=${item.id}`,
  })
}
getAnnouncement()
</script>

<style lang="scss" scoped>
.noticeBox {
  background: linear-gradient(
    270deg,
    rgba(123, 96, 49, 0) 0%,
    rgba(123, 96, 49, 0.36) 50%,
    rgba(123, 96, 49, 0) 100%
  );
}
</style>
