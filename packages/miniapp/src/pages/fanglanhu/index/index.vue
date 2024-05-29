<template>
  <view class="relative h-full bg-#f6f8fb" @touchstart="touchstart" @touchend="touchend">
    <view v-if="isLoading">
      <Loading></Loading>
    </view>
    <view v-else class="h-full">
      <n-list
        :down="null"
        :up="null"
        height="screen"
        bg-type="none"
        box-style="width:100%; height: 100%"
      >
        <n-list-cell>
          <view style="height: calc()" :style="{ height: `calc(1042rpx + ${downHeight}px)` }">
            <homeBanner></homeBanner>
          </view>
        </n-list-cell>
        <n-list-cell>
          <view
            class="absolute left-0 w-full overflow-y-auto transition-all duration-500"
            :style="{ top: `calc(740rpx + ${downHeight}px)` }"
          >
            <homeBlock></homeBlock>
            <homeButton></homeButton>
            <view class="bg-white">
              <homeMerchant></homeMerchant>
              <!-- 芳兰湖优惠游 -->
              <view class="w-full px-20rpx my-50rpx box-border">
                <image
                  src="https://pqntourism.pcleartv.cn/FncUbIaAEGqJ2ZXfEMocPr3x1H99"
                  mode="scaleToFill"
                  class="w-full h-158"
                />
              </view>
              <homeRecommend></homeRecommend>
            </view>
          </view>
        </n-list-cell>
      </n-list>
    </view>
  </view>
</template>

<script setup>
import homeBanner from './components/homeBanner.vue'
import homeBlock from './components/homeBlock.vue'
import homeButton from './components/homeButton.vue'
import homeMerchant from './components/homeMerchant.vue'
import homeRecommend from './components/homeRecommend.vue'
import { fetchMapPOIType } from '@/api/map'
const POIType = ref({})
provide('POIType', POIType)
fetchMapPOIType().then((res) => {
  res.list.forEach((item) => {
    POIType.value[item.name.cn] = item.id
  })
})
const isTop = ref(true)
const downHeight = ref(0)
const startHeight = ref(0)
const endHeight = ref(0)
// const touchmove = (e) => {
//   if (isTop.value) {
//     console.log('@@@')
//     if (e.touches[0].clientY - startHeight.value > 400) {
//       downHeight.value = 400
//     } else if (e.touches[0].clientY - startHeight.value < 0) {
//       downHeight.value = 0
//     } else {
//       downHeight.value = e.touches[0].clientY - startHeight.value
//     }
//   }
// }
const touchstart = (e) => {
  console.log('^^^', e)
  startHeight.value = e.touches[0].clientY
  if (e.target.offsetTop) {
    isTop.value = false
  } else {
    isTop.value = true
  }
}
const touchend = (e) => {
  endHeight.value = e.changedTouches[0].clientY
  if (isTop.value && endHeight.value - startHeight.value > 200) {
    downHeight.value = 400
  } else if (startHeight.value - endHeight.value > 50 && isTop.value) {
    downHeight.value = 0
  }
}
</script>

<style lang="scss" scoped></style>
