<template>
  <div v-if="currentScenic">
    <div class="relative">
      <div
        class="bg-no-repeat bg-contain bg-white bg-center"
        style="
          background-image: url(https://pqncdn.cleartv.cn/pres/resources/4c2c0de1f90002c6afe54f66825bc68e_DXzZfW4U_230608184428.png);
        "
      >
        <swiper
          style="height: 400rpx"
          circular
          :indicator-dots="state.indicatorDots"
          :autoplay="state.autoplay"
          :interval="state.interval"
          :duration="state.duration"
        >
          <swiper-item v-for="(item, index) in pictures" :key="index">
            <image :src="item.url" mode="aspectFill" class="w-full h-400" />
          </swiper-item>
        </swiper>
      </div>

      <!-- <div class="absolute w-full h-full black-bg top-0 left-0 pointer-events-none"></div> -->
      <div
        style="box-shadow: 0px -5px 5px rgba(0, 0, 0, 0.1)"
        class="absolute w-full h-20rpx bg-white bottom--1 left-0 pointer-events-none rounded-tl-20rpx rounded-tr-20rpx"
      ></div>
    </div>

    <div class="bg-white leading-2em px-20rpx">
      <div class="font-bold">
        {{ currentScenic.name }}
      </div>

      <div class="text-24rpx">
        <div class="flex items-center">
          <span class="ic-baseline-location-on text-green-500 mr-10rpx"></span>
          {{ currentScenic.address }}
        </div>

        <div class="flex items-center">
          <span class="ic-baseline-alarm text-green-500 mr-10rpx"></span>
          {{ currentScenic.opening_time || '全时段开放' }}
        </div>
      </div>
    </div>

    <div class="h-20rpx bg-white pointer-events-none rounded-bl-20rpx rounded-br-20rpx"></div>
  </div>
</template>

<script setup>
const currentScenic = inject('currentScenic', null)
const state = reactive({
  indicatorDots: false,
  autoplay: true,
  interval: 3000,
  duration: 500,
})

const pictures = computed(() => {
  return currentScenic.value.pictures || []
})
</script>

<style lang=""></style>
