<template>
  <view
    class="pt-72rpx w-full px-30rpx box-border flex justify-between items-center flex-wrap relative"
  >
    <view
      v-for="(block, index) in blocks"
      :key="index"
      class="h-150 w-150 flex flex-col justify-center items-center"
      @click="goPage(block)"
    >
      <view class="w-88 h-88">
        <image :src="block.icon" mode="scaleToFill" class="w-full h-full" />
      </view>
      <view class="text-#3e3e3e text-26rpx">{{ block.name }}</view>
    </view>
    <view
      v-if="props.componentStyle === 'guyun'"
      class="absolute w-67 h-9 translate-y--1/2 right-0 block-ornament"
    ></view>
    <view
      v-if="props.componentStyle === 'guyun'"
      class="absolute w-142 h-44 right-60rpx bottom-10rpx block-ornament-full"
    ></view>
  </view>
</template>

<script setup>
import { fetchMapPOIType } from '@/api/map'
import $t from '@/service/i18n'
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
const props = defineProps({
  componentStyle: {
    type: String,
    default: () => '',
  },
})
// 新闻类型code映射类型id
const newsType = inject('newsType', '')
const blocks = computed(() => {
  console.log('@@@', props)
  return [
    {
      id: 1,
      name: $t('News'),
      icon: `/static/index/${props.componentStyle}/dynamic.png`,
      url: `newsList/index?id=${newsType.value.dongtai || ''}&title=${$t('News')}`,
    },
    {
      id: 2,
      name: $t('Activity'),
      icon: `/static/index/${props.componentStyle}/activity.png`,
      url: `newsList/index?id=${newsType.value.huodong || ''}&title=${$t('Activity')}`,
    },
    {
      id: 3,
      name: $t('Photos'),
      icon: `/static/index/${props.componentStyle}/photo.png`,
      url: `photos/index?title=${$t('Photos')}`,
    },
    {
      id: 4,
      name: $t('Strategy'),
      icon: `/static/index/${props.componentStyle}/strategy.png`,
      url: `newsList/index?id=${newsType.value.gonglue || ''}&title=${$t('Strategy')}`,
    },
    {
      id: 5,
      name: $t('Video'),
      icon: `/static/index/${props.componentStyle}/service.png`,
      url: `video/videoList`,
    },
    {
      id: 6,
      name: $t('Food'),
      icon: `/static/index/${props.componentStyle}/food.png`,
      map: { index: typeMap.value['餐饮'] },
    },
    {
      id: 7,
      name: $t('Culture'),
      icon: `/static/index/${props.componentStyle}/culture.png`,
      url: `culture/index`,
    },
    {
      id: 8,
      name: $t('Hotel'),
      icon: `/static/index/${props.componentStyle}/hotel.png`,
      map: { index: typeMap.value['住宿'] },
    },
    // { id: 9, name: 'vr导览', icon: '/static/index/vrtour.png', url: '/pages/vr/index' },
    // { id: 10, name: '更多', icon: '/static/index/more.png' },
  ]
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
  } else {
    navigateTo({ url: item.url })
  }
}
</script>

<style scoped lang="scss">
.block-ornament {
  background-image: url('@/static/index/block-ornament.png');
  background-size: contain;
  top: 50%;
}
.block-ornament-full {
  background-image: url('@/static/index/block-ornament-full.png');
  background-size: contain;
}
</style>
