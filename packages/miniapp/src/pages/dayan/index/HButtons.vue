<template>
  <scroll-view scroll-x class="mt-30rpx px-30rpx w-full box-border">
    <view class="flex gap-17rpx w-full">
      <Hbutton
        v-for="(item, index) in btns"
        :key="index"
        :item="item"
        class="flex-shrink-0"
        @tap="handleClick(item)"
      ></Hbutton>
    </view>
  </scroll-view>
</template>

<script setup>
import Hbutton from './Hbutton.vue'
import { fetchMapPOIType } from '@/api/map'
// POI类型code映射类型id
const POIType = inject('POIType', '')

const btns = computed(() => {
  return [
    {
      name: '云游',
      icon: 'yunyou',
      url: `/pagesShangyou/pages/scenicList/index?typeId=${POIType.value['景点']}`,
    },
    {
      name: '云居',
      icon: 'yunju',
      url: `/pagesShangyou/pages/foodList/index?typeId=${POIType.value['美食']}`,
    },
    {
      name: '云耕',
      icon: 'yungeng',
      map: { index: typeMap.value['农场'] },
    },
    {
      name: '云铺',
      icon: 'yunpu',
      map: { index: typeMap.value['店铺'] },
    },
    {
      name: '云学',
      icon: 'yunxue',
      map: { index: typeMap.value['研学'] },
    },
    {
      name: '云停',
      icon: 'yunting',
      href: 'http://parkx290x259c-https-webpark.park.bluecardsoft.com/webpark/view/wx/index_barcode.html',
    },
    {
      name: '天气',
      icon: 'weather',
      url: '/pages/common/weather/index',
    },
    {
      name: '导览',
      icon: 'tour',
      map: { index: 0 },
    },
  ]
})

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

const { mapData } = useStore('app')
function handleClick(item) {
  console.log('%c [ item ]-49', 'font-size:13px; background:pink; color:#bf2c9f;', item)
  if (item.url) {
    uni.navigateTo({
      url: item.url,
    })
  } else if (item.href) {
    if (UNI_PLATFORM === 'h5') {
      location.href = item.href
    } else {
      uni.navigateTo({
        url: `/pages/common/webLink/index?url=${item.href}&title=${item.name}`,
      })
    }
  } else if (item.map) {
    mapData.value = {
      type: 'tab',
      value: item.map.index,
    }

    navigateTo({ url: '/pages/common/map/index' })
  } else {
    uni.showToast({
      title: '敬请期待',
      icon: 'none',
      mask: true,
    })
  }
}
</script>

<style lang=""></style>
