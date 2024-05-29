<template>
  <view
    class="w-full px-30rpx box-border flex justify-start items-center flex-wrap relative bg-white"
  >
    <view v-for="(block, index) in blocks" :key="index" style="width: 20%">
      <view
        class="h-120 w-120 flex flex-col justify-center items-center my-30rpx"
        @click="goPage(block)"
      >
        <view class="w-88 h-88">
          <image :src="block.icon" mode="scaleToFill" class="w-full h-full" />
        </view>
        <view class="text-#3e3e3e text-24">{{ block.name }}</view>
      </view>
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
import { getExtConfig } from '@/service/util'
import { fetchMapPOIType } from '@/api/map'
import $t from '@/service/i18n'
const extConfig = getExtConfig()
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
  console.log('@@@', extConfig.project === 'donganhu')
  if (extConfig.project === 'donganhu') {
    return [
      {
        id: 1,
        name: $t('Guide'),
        icon: `https://pqntourism.pcleartv.cn/FjWUipHWhO1yyUAXuI1uM6BiHn14`,
        map: { index: 0 },
      },
      {
        id: 2,
        name: $t('POI'),
        icon: `https://pqntourism.pcleartv.cn/Fqd8uUCF_CD4jZ5SpGTsPso64QHC`,
        url: `scenicList/index`,
      },
      {
        id: 3,
        name: $t('Ticket'),
        icon: `https://pqntourism.pcleartv.cn/FgFUfIyMH_Q6QSLDdHkzccIch1YG`,
        herf: currentScenic.value.ticketUrl,
      },
      {
        id: 4,
        name: $t('Audio'),
        icon: `https://pqntourism.pcleartv.cn/FpFnZQl8LX6Rvj5p93ZEDRcA7fbb`,
        url: 'audio/index',
      },
      {
        id: 5,
        name: $t('Video'),
        icon: `https://pqntourism.pcleartv.cn/FiVmi_LiNc4K2APma4ImiMyoJ54k`,
        url: 'video/videoList',
      },
      {
        id: 6,
        name: $t('DaYunHui'),
        icon: `https://pqntourism.pcleartv.cn/FjVkREVq8MCYidVEHzjH0qSo5CxZ`,
        url: `newsList/index?id=${newsType.value.dayunhui || ''}&title=${$t('DaYunHui')}`,
      },
      {
        id: 7,
        name: $t('Live'),
        icon: `https://pqntourism.pcleartv.cn/FgXBSKfQyFEcKgKVaaZUaOHq54ci`,
        url: `weather/index`,
      },
      {
        id: 8,
        name: $t('Hotel'),
        icon: `https://pqntourism.pcleartv.cn/Fu-QhKaoZ5uDxrgJ-0a2NgpYZR6D`,
        map: { index: typeMap.value['住宿'] },
      },
      {
        id: 9,
        name: $t('Food'),
        icon: `https://pqntourism.pcleartv.cn/FqyPwabaX7qgQV0ro9fDnDVO4XHR`,
        map: { index: typeMap.value['餐饮'] },
      },
      {
        id: 10,
        name: $t('More'),
        icon: `https://pqntourism.pcleartv.cn/FnqWSeRNjqljcsi4PCARP6EHqGAg`,
        url: 'more/index',
      },
      // { id: 9, name: 'vr导览', icon: '/static/index/vrtour.png', url: '/pages/vr/index' },
      // { id: 10, name: '更多', icon: '/static/index/more.png' },
    ]
  } else if (extConfig.project === 'liubangguli') {
    return [
      {
        id: 1,
        name: $t('TicketLiu'),
        icon: `https://pqntourism.pcleartv.cn/FgFUfIyMH_Q6QSLDdHkzccIch1YG`,
        url: '/pages/liubangguli/ticket/index',
      },
      {
        id: 2,
        name: $t('GuideLiu'),
        icon: `https://pqntourism.pcleartv.cn/FpFnZQl8LX6Rvj5p93ZEDRcA7fbb`,
        herf: 'https://pwx.cleartv.cn/wxauth/wxlogin?projectName=liubangguli&entry=guide',
      },
      {
        id: 3,
        name: $t('ScenicSpot'),
        icon: `https://pqntourism.pcleartv.cn/FjWUipHWhO1yyUAXuI1uM6BiHn14`,
        url: `scenicList/index?current=${typeMap.value['景点']}`,
      },
      {
        id: 4,
        name: $t('HotelLiu'),
        icon: `https://pqntourism.pcleartv.cn/Fu-QhKaoZ5uDxrgJ-0a2NgpYZR6D`,
        herf: `#小程序://携程旅行订酒店机票火车汽车门票/7CGUICMdcEdnfVx`,
      },
      {
        id: 5,
        name: $t('Culture'),
        icon: `https://pqntourism.pcleartv.cn/FnqWSeRNjqljcsi4PCARP6EHqGAg`,
        url: 'culture/index',
      },
    ]
  } else {
    return [
      {
        id: 1,
        name: $t('Guide'),
        icon: `https://pqntourism.pcleartv.cn/FjWUipHWhO1yyUAXuI1uM6BiHn14`,
        map: { index: 0 },
      },
      {
        id: 2,
        name: $t('POI'),
        icon: `https://pqntourism.pcleartv.cn/Fqd8uUCF_CD4jZ5SpGTsPso64QHC`,
        url: `scenicList/index`,
      },
      {
        id: 3,
        name: $t('Ticket'),
        icon: `https://pqntourism.pcleartv.cn/FgFUfIyMH_Q6QSLDdHkzccIch1YG`,
        herf: currentScenic.value.ticketUrl,
      },
      {
        id: 4,
        name: $t('Audio'),
        icon: `https://pqntourism.pcleartv.cn/FpFnZQl8LX6Rvj5p93ZEDRcA7fbb`,
        url: 'audio/index',
      },
      {
        id: 5,
        name: $t('Video'),
        icon: `https://pqntourism.pcleartv.cn/FiVmi_LiNc4K2APma4ImiMyoJ54k`,
        url: 'video/videoList',
      },
      {
        id: 6,
        name: $t('Live'),
        icon: `https://pqntourism.pcleartv.cn/FgXBSKfQyFEcKgKVaaZUaOHq54ci`,
        url: `weather/index`,
      },
      {
        id: 7,
        name: $t('Hotel'),
        icon: `https://pqntourism.pcleartv.cn/Fu-QhKaoZ5uDxrgJ-0a2NgpYZR6D`,
        map: { index: typeMap.value['住宿'] },
      },
      {
        id: 8,
        name: $t('Food'),
        icon: `https://pqntourism.pcleartv.cn/FqyPwabaX7qgQV0ro9fDnDVO4XHR`,
        map: { index: typeMap.value['餐饮'] },
      },
      {
        id: 9,
        name: $t('More'),
        icon: `https://pqntourism.pcleartv.cn/FnqWSeRNjqljcsi4PCARP6EHqGAg`,
        url: 'more/index',
      },
      // { id: 9, name: 'vr导览', icon: '/static/index/vrtour.png', url: '/pages/vr/index' },
      // { id: 10, name: '更多', icon: '/static/index/more.png' },
    ]
  }
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
    uni.showToast({ title: '暂未配置', icon: 'none' })
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
