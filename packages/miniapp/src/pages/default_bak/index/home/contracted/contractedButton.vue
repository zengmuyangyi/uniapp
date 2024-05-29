<template>
  <view
    class="w-full px-30rpx box-border flex justify-between items-center flex-wrap relative bg-white"
  >
    <view
      v-for="(block, index) in blocks"
      :key="index"
      class="h-120 w-120 flex flex-col justify-center items-center my-30rpx"
      @click="goPage(block)"
    >
      <view class="w-88 h-88">
        <image :src="block.icon" mode="scaleToFill" class="w-full h-full" />
      </view>
      <view class="text-#3e3e3e text-24">{{ block.name }}</view>
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
const { currentScenic } = useStore('scenic')
const blocks = computed(() => {
  return [
    {
      id: 1,
      name: $t('Guide'),
      icon: `/static/index/${props.componentStyle}/guide.png`,
      map: { index: 0 },
    },
    {
      id: 2,
      name: $t('POI'),
      icon: `/static/index/${props.componentStyle}/POI.png`,
      url: `scenicList/index`,
    },
    {
      id: 3,
      name: $t('Ticket'),
      icon: `/static/index/${props.componentStyle}/ticket.png`,
      herf: currentScenic.value.ticketUrl,
    },
    {
      id: 4,
      name: $t('Audio'),
      icon: `/static/index/${props.componentStyle}/audio.png`,
      url: 'audio/index',
    },
    {
      id: 5,
      name: $t('Video'),
      icon: `/static/index/${props.componentStyle}/video.png`,
      url: 'video/videoList',
    },
    {
      id: 4,
      name: $t('DaYunHui'),
      icon: `/static/index/${props.componentStyle}/dayunhui.png`,
      url: `newsList/index?id=${newsType.value.dayunhui || ''}&title=${$t(
        'DaYunHui'
      )}&type=contracted`,
    },
    {
      id: 5,
      name: $t('Live'),
      icon: `/static/index/${props.componentStyle}/live-show.png`,
      url: `weather/index`,
    },
    {
      id: 6,
      name: $t('Hotel'),
      icon: `/static/index/${props.componentStyle}/hotel.png`,
      map: { index: typeMap.value['住宿'] },
    },
    {
      id: 7,
      name: $t('Food'),
      icon: `/static/index/${props.componentStyle}/food.png`,
      map: { index: typeMap.value['餐饮'] },
    },
    {
      id: 8,
      name: $t('More'),
      icon: `/static/index/${props.componentStyle}/more.png`,
      url: 'more/index',
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
  } else if (item.herf) {
    uni.navigateToMiniProgram({
      shortLink: item.herf,
      success(res) {
        console.log(res)
      },
    })
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
