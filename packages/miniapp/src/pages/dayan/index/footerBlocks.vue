<template>
  <view class="pb-80rpx hua-bg pt-60rpx flex justify-center">
    <swiper
      circular
      style="background-color: transparent; width: 650rpx; height: 340rpx"
      previous-margin="180rpx"
      next-margin="180rpx"
      class="flex justify-center"
      @change="changePage"
    >
      <swiper-item v-for="(item, index) in list" :key="index" @click="goStyleList(item)">
        <view class="w-full h-full flex justify-center">
          <view
            class="w-270rpx h-full flex justify-center items-center rounded-10rpx overflow-hidden transition-all duration-500"
            :class="currentPage === index ? 'scale-100' : 'scale-76'"
          >
            <view class="w-270rpx h-340rpx bg-contain relative">
              <image :src="getImage(item.coverImage)" mode="scaleToFill" class="w-full h-full" />

              <div
                class="absolute flex-center w-full left-0 bottom-0 bg-white bg-opacity-40 py-10rpx text-28 text-white dropback"
              >
                {{ getText(item.title) }}
              </div>
            </view>
          </view>
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script setup>
import { getText, getImage } from '@/service/util'
import { fetchNewsList } from '@/api/news'
const list = ref([])
const params = {
  pageNum: 0,
  pageSize: 0,
  typeId: 23,
}

fetchNewsList(params).then((res) => {
  console.log('%c [ 新闻 ]-50', 'font-size:13px; background:pink; color:#bf2c9f;', res)
  list.value = res.list
})
const currentPage = ref(0)
const changePage = (e) => {
  console.log('&&&', e)
  currentPage.value = e.detail.current
}
const goStyleList = (data) => {
  uni.navigateTo({ url: `/pages/common/news/index?id=${data.id}` })
}
</script>

<style scoped lang="scss">
::v-deep .uni-swiper-slides {
  inset: 0px 120px;
}
.hua-bg {
  background-image: url('https://pqntourism.pcleartv.cn/FrwdZ-5ZB0mDPHjEGjWGKdlzHNWg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: 0 45px;
}

.dropback {
  background-color: rgba(255, 255, 255, 0.33);
  backdrop-filter: blur(5rpx);
}
</style>
