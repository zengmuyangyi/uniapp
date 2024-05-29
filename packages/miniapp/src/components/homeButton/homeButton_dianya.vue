<template>
  <view class="w-full flex items-center mt-34rpx button-bg">
    <view class="w-full px-30rpx box-border">
      <view class="w-full h-380 flex items-center flex-wrap button-bg-border">
        <view
          class="w-25% flex flex-col items-center"
          v-for="(item, index) in buttonList"
          :key="index"
          @click="goPage(item)"
        >
          <image :src="item.icon" mode="scaleToFill" class="w-96 h-96" />
          <view class="mt-1 text-28">{{ item.name }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import $t from '@/service/i18n'
import { fetchMapPOIType } from '@/api/map'
import { getText } from '@/service/util'

const typeList = ref([])
const typeMap = computed(() => {
  const map = {}
  typeList.value.forEach((item, index) => {
    map[item.name.cn] = index
  })

  return map
})
async function getPOIType() {
  const res = await fetchMapPOIType()
  typeList.value = res.list
}
getPOIType()
const { currentScenic } = useStore('scenic')
const buttonList = computed(() => {
  const temp = [
    {
      icon: `/static/index/dianya/scenic.png`,
      name: $t('ScenicSpot'),
      url: `scenicList/index?current=${typeMap.value['景点']}`,
    },
    {
      icon: `/static/index/dianya/visit-project.png`,
      name: $t('PlayPoint'),
      url: `scenicList/index?current=${typeMap.value['游玩项目']}`,
    },
    {
      icon: `/static/index/dianya/ticket.png`,
      name: $t('Ticket'),
      herf: currentScenic.value.ticketUrl,
    },
    {
      icon: `/static/index/dianya/vr.png`,
      name: $t('VRTour'),
      url: 'vr/index',
    },
    {
      icon: `/static/index/dianya/hotel.png`,
      name: $t('HotelFacility'),
      url: `scenicList/index?current=${typeMap.value['住宿']}`,
    },
    {
      icon: `/static/index/dianya/food.png`,
      name: $t('Food'),
      url: `scenicList/index?current=${typeMap.value['餐饮']}`,
    },
    {
      icon: `/static/index/dianya/service.png`,
      name: $t('Feedback'),
      url: '/pagesCustom/pages/feedbackFirst/index',
    },
    {
      icon: `/static/index/dianya/more.png`,
      name: $t('More'),
      url: 'more/index',
    },
  ]
  return temp
})
const { mapData } = useStore('app')
const goPage = (item) => {
  console.log('%c [ item ]-74', 'font-size:13px; background:pink; color:#bf2c9f;', item)

  if (item.map) {
    mapData.value = {
      type: 'tab',
      value: item.map.index,
    }

    navigateTo({ url: 'map/index' })
  } else if (item.herf) {
    if (item.herf.indexOf('小程序') > -1) {
      uni.navigateToMiniProgram({
        shortLink: item.herf,
        success(res) {
          console.log(res)
        },
      })
    } else {
      if (item.herf.indexOf('?') > -1) {
        const temp = item.herf.split('?')
        uni.navigateTo({
          url: `/pages/common/webLink/index?title=${item.name}&url=${temp[0]}&${temp[1]}`,
        })
      } else {
        uni.navigateTo({ url: `/pages/common/webLink/index?title=${item.name}&url=${item.herf}` })
      }
    }
  } else if (item.url) {
    navigateTo({ url: item.url })
  } else {
    uni.showToast({ title: '暂未配置', icon: 'error' })
  }
}
</script>

<style scoped lang="scss">
.button-bg {
  background-image: url('https://pqntourism.pcleartv.cn/FkNAE9nXAM3YwyCPLQHSxxTjfLR6');
  background-size: contain;
  background-repeat: no-repeat;
  background-position-x: right;
  &-border {
    background-image: url('@/static/index/dianya/button-bg.png');
    background-size: contain;
  }
}
</style>
