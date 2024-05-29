<template>
  <div
    class="min-h-100vh bg-no-repeat bg-cover bg-top pb-50rpx"
    :style="{ backgroundImage: `url(${imgs.bg})` }"
  >
    <div class="py-30rpx">
      <homeSearch></homeSearch>
    </div>

    <homeBanner></homeBanner>

    <homeRolling></homeRolling>

    <div
      class="w-692 h-130 flex-center bg-cover bg-top m-auto mt-30rpx text-white text-38"
      :style="{ backgroundImage: `url(${imgs.btnBg})` }"
      @click="navigateTo({ url: '/pages/common/newsList/index?id=20' })"
    >
      旅行月历- <span class="text-#EABE6D">12月</span>
    </div>

    <HButtons></HButtons>

    <div class="h-107 text-center relative mt-23rpx">
      <image class="w-444 h-107" :src="imgs.txt"></image>
      <image class="absolute w-177 h-106 left-38 -top-16" :src="imgs.he1"></image>
      <image class="absolute w-150 h-173 right-23 -top-1" :src="imgs.he2"></image>
    </div>

    <footerBlocks></footerBlocks>
  </div>
</template>

<script setup>
import imgs from './imgs'
import homeSearch from './homeSearch.vue'
import homeBanner from './homeBanner.vue'
import homeRolling from './homeRolling.vue'
import HButtons from './HButtons.vue'
import footerBlocks from './footerBlocks.vue'

import { navigateTo } from '@/service/util'
import { fetchMapPOIType } from '@/api/map'

const POIType = ref({})
provide('POIType', POIType)

fetchMapPOIType().then(async (res) => {
  res.list.forEach((item) => {
    POIType.value[item.name.cn] = item.id
  })
})
</script>

<style lang=""></style>
