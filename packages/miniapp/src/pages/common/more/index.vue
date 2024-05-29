<template>
  <view class="bg-white p-30rpx">
    <view v-for="(item, index) in buttonList" :key="index" class="my-30rpx">
      <view class="font-bold">{{ item.title }}</view>
      <view class="flex justify-start items-center flex-wrap">
        <view
          v-for="(block, child) in item.children"
          :key="child"
          class="h-150 flex flex-col justify-center items-center mt-10rpx"
          style="width: 25%"
          @click="goPage(block)"
        >
          <view class="w-86 h-86">
            <image :src="block.icon" mode="scaleToFill" class="w-full h-full" />
          </view>
          <view class="text-24 mt-10rpx text-gray-500">{{ block.name }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { fetchMapPOIType } from '@/api/map'
import { fetchNewsTypeNew } from '@/api/news'
import $t from '@/service/i18n'
import { getExtConfig, getText } from '@/service/util'
const { currentScenic } = useStore('scenic')
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
const newsType = ref([])
const typeNews = computed(() => {
  const news = {}
  newsType.value.forEach((item) => {
    news[item.code] = item.id
  })

  return news
})
const getNewsType = async () => {
  const params = {
    pageSize: 0,
    pageNum: 0,
    status: 1,
  }
  const res = await fetchNewsTypeNew(params)
  newsType.value = res.list
}
getPOIType()
getNewsType()
const buttonList = computed(() => {
  console.log('&&&', typeNews)
  const temp = [
    {
      id: 1,
      title: $t('Travel'),
      children: [
        {
          id: 1,
          name: $t('Scenic'),
          icon: `https://pqntourism.pcleartv.cn/FrkpYDyNvvMmFioC7UFGmBviP4Pf`,
          url: `scenic/index`,
        },
        {
          id: 2,
          name: $t('Hotel'),
          icon: `https://pqntourism.pcleartv.cn/Fs1kqfwL2uGO2K2HAea4ZDdeSw5n`,
          map: { index: typeMap.value['住宿'] },
        },
        {
          id: 3,
          name: $t('Food'),
          icon: `https://pqntourism.pcleartv.cn/FueDuec35nxzp5lpOz7l9mk_9NqM`,
          map: { index: typeMap.value['餐饮'] },
        },
        {
          id: 4,
          name: $t('SuggestedLine'),
          icon: `https://pqntourism.pcleartv.cn/Fg78vJ9zhJAxk-hCd8U7LiFcelGi`,
          url: `suggestedLine/index`,
        },
        {
          id: 5,
          name: $t('TrafficGuidance'),
          icon: `https://pqntourism.pcleartv.cn/Fl_htD9jmNbrWg0Ulcfz_vuLVQKC`,
          url:
            extConfig.project === 'baoquan'
              ? `newsList/index?id=${typeNews.value.jiaotong}&title=交通指引`
              : `news/index?id=116`,
        },
        {
          id: 6,
          name: $t('Park'),
          icon: `https://pqntourism.pcleartv.cn/FrYhzGd4C2R_dGVdF-7JqEnMLX0L`,
          map: { index: typeMap.value['停车场'] },
        },
        {
          id: 7,
          name: $t('Toilet'),
          icon: `https://pqntourism.pcleartv.cn/FnJuBNwEChUt9toTnQfX5w32Wpnb`,
          map: { index: typeMap.value['卫生间'] },
        },
        {
          id: 8,
          name: $t('Shopping'),
          icon: `https://pqntourism.pcleartv.cn/Fu1vPAxf5MpY78MfFzzq_qzJk8uv`,
          url: `culture/index`,
        },
      ],
    },
    {
      id: 2,
      title: $t('Conetnt'),
      children: [
        {
          id: 1,
          name: $t('NewsMore'),
          icon: `https://pqntourism.pcleartv.cn/FusfK1XyC8DYu7kGHtxwweZw6Hn0`,
          url: `newsList/index?id=${typeNews.value.dongtai}`,
        },
        {
          id: 2,
          name: $t('VideoMore'),
          icon: `https://pqntourism.pcleartv.cn/FixcF1MZxaz6FyS2ZoXOsNp_kVbE`,
          url: `video/videoList`,
        },
        {
          id: 3,
          name: $t('Photo'),
          icon: `https://pqntourism.pcleartv.cn/FhOa1fZAbq-Z41qHsWETl3Dr11WC`,
          url: `photos/index?title=${$t('Photos')}`,
        },
      ],
    },
    {
      id: 3,
      title: $t('Convenience'),
      children: [
        {
          id: 1,
          name: $t('WeatherForecast'),
          icon: `https://pqntourism.pcleartv.cn/Fumkc4InhU50uQHkPj5mV6Tu18vE`,
          url: `weather/index`,
        },
        {
          id: 2,
          name: $t('Air'),
          icon: `https://pqntourism.pcleartv.cn/FhmYofacs4pYx-IlVuc4MqCye0Mw`,
          url: `air/index`,
        },
      ],
    },
  ]
  if (extConfig.project === 'baoquan') {
    temp.push({
      id: 4,
      title: $t('Service'),
      children: [
        {
          id: 1,
          name: $t('ConsulteService'),
          icon: `https://pqntourism.pcleartv.cn/FkCXIzcSvWD8hTltjaw56-aKnOAf`,
          url: `helpStyle/index`,
        },
        {
          id: 2,
          name: $t('CustomerService'),
          icon: `https://pqntourism.pcleartv.cn/FkgxX0najsR1J52ki5dVBcd3rTMp`,
          url: `/pagesCustom/pages/serviceAi/index`,
        },
        {
          id: 3,
          name: $t('Announcement'),
          icon: `https://pqntourism.pcleartv.cn/FhkqJGQji9PGqvNgdQwLBbv_3rcT`,
          url: `/pages/baoquan/noticeList/index`,
        },
      ],
    })
  } else {
    temp.push({
      id: 4,
      title: $t('Service'),
      children: [
        {
          id: 1,
          name: $t('Feedback'),
          icon: `https://pqntourism.pcleartv.cn/FkCXIzcSvWD8hTltjaw56-aKnOAf`,
          url: `feedback/index`,
        },
        {
          id: 2,
          name: $t('CustomerService'),
          icon: `https://pqntourism.pcleartv.cn/FkgxX0najsR1J52ki5dVBcd3rTMp`,
          url: `serviceAi/index`,
        },
      ],
    })
  }
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
  } else {
    navigateTo({ url: item.url })
  }
}
</script>

<style scoped lang="scss"></style>
