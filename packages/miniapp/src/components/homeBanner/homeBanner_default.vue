<template>
  <view class="relative text-white">
    <swiper
      style="height: 766rpx"
      circular
      :indicator-dots="indicatorDots"
      :autoplay="autoplay"
      :interval="interval"
      :duration="duration"
      @change="handleChange"
    >
      <swiper-item v-for="(item, index) in sliderImages" :key="index">
        <image :src="getImage(item.image)" mode="aspectFill" class="w-full h-766" />
      </swiper-item>
    </swiper>

    <div class="absolute w-full h-full black-bg top-0 left-0 pointer-events-none"></div>
    <div
      class="absolute w-full h-50rpx bg-white bottom--1 left-0 pointer-events-none rounded-tl-50rpx rounded-tr-50rpx"
    ></div>

    <div class="absolute top-247 whitespace-nowrap text-size-80 pl-30rpx text-shadow-lg">
      {{ getText(currentScenic.name) }}
      <div class="text-26">
        {{ getText(sliderImages[currentImage]?.name) }}
      </div>
    </div>

    <!-- <div
      class="left-30rpx right-40rpx h-80rpx bg-white bg-opacity-45 rounded-40rpx top-426 absolute text-26rpx text-white items-center flex"
    >
      <span class="ic-sharp-search mr-2 text-55 ml-3"></span>景区、资讯、攻略
    </div> -->

    <scroll-view :scroll-x="true" class="absolute top-567 w-full flex">
      <view class="whitespace-nowrap pl-20rpx">
        <view
          v-for="(module, index) in navModules"
          :key="index"
          class="inline-block mr-40rpx text-size-26"
          @click="goPage(module)"
        >
          <div class="flex flex-col justify-center items-center">
            <div
              class="flex justify-center items-center w-50 rounded-30rpx mb-18rpx w-80 h-80"
              :style="{ background: `${module.color}` }"
            >
              <span :class="module.icon"></span>
            </div>

            {{ module.name }}
          </div>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { fetchMapPOIType } from '@/api/map'
import $t from '@/service/i18n'
import { getText, getImage } from '@/service/util'

const { currentScenic, sliderImages } = useStore('scenic')

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

const currentImage = ref(0)
const handleChange = (e) => {
  currentImage.value = e.target.current
}

const { indicatorDots, autoplay, interval, duration } = {
  indicatorDots: false,
  autoplay: true,
  interval: 3000,
  duration: 500,
}

const randomColor = [
  'linear-gradient(180deg, #F8CA68 0%, #F0B05C 100%)',
  'linear-gradient(180deg, #94CCF9 0%, #7DC1FC 100%)',
  'linear-gradient(180deg, #F8915D 0%, #F1733F 100%)',
  'linear-gradient(180deg, #85E4CF 0%, #6AD3BC 100%)',
  'linear-gradient(180deg, #6F90FE 0%, #5C6FC5 100%)',
  'linear-gradient(180deg, #85E4CF 0%, #6AD3BC 100%)',
  'linear-gradient(180deg, #F8CA68 0%, #F0B05C 100%)',
  'linear-gradient(180deg, #B77A5D 0%, #876452 100%)',
]

const { mapData } = useStore('app')

const goPage = (item) => {
  console.log('%c [ item ]-74', 'font-size:13px; background:pink; color:#bf2c9f;', item)

  if (item.map) {
    mapData.value = {
      type: 'tab',
      value: item.map.index,
      heat: item.map.heat,
    }

    navigateTo({ url: 'map/index' })
  } else {
    navigateTo({ url: item.url })
  }
}

// 新闻类型code映射类型id
const newsType = inject('newsType', '')
const { extConfig } = useStore('scenic')
const navModules = computed(() => {
  const nav =
    extConfig.value.project === 'yunmengshan'
      ? [
          {
            name: $t('News'),
            icon: 'ic-round-newspaper',
            url: `newsList/index?id=${newsType.value.dongtai || ''}&title=${$t('News')}`,
          },
          {
            name: $t('Activity'),
            icon: 'ic-round-stars',
            url: `newsList/index?id=${newsType.value.huodong || ''}&title=${$t('Activity')}`,
          },
          {
            name: $t('Photos'),
            icon: 'ic-sharp-photo-library',
            url: `photos/index?title=${$t('Photos')}`,
          },
          {
            name: $t('Strategy'),
            icon: 'ic-round-book',
            url: `newsList/index?id=${newsType.value.gonglue || ''}&title=${$t('Strategy')}`,
          },
          {
            name: $t('Services'),
            icon: 'ic-outline-wheelchair-pickup',
            map: { index: typeMap.value['卫生间'] },
          },
        ]
      : [
          {
            name: $t('Hotel'),
            icon: 'ic-sharp-home-work',
            map: { index: typeMap.value['住宿'] },
          },
          {
            name: $t('Food'),
            icon: 'ic-round-fastfood',
            map: { index: typeMap.value['餐饮'] },
          },
          {
            name: $t('Party'),
            icon: 'ic-round-mic-external-on',
            map: { index: typeMap.value['娱乐'] },
          },
          {
            name: '热力图',
            icon: 'ic-baseline-people',
            // map: { index: 0, heat: 1 },
            url: '/pages/huluguzhen/map/index',
          },
          {
            name: $t('Strategy'),
            icon: 'ic-round-book',
            url: `newsList/index?id=${newsType.value.gonglue || ''}&title=${$t('Strategy')}`,
          },
          {
            name: $t('Photos'),
            icon: 'ic-sharp-photo-library',
            url: `photos/index?title=${$t('Photos')}`,
          },
          {
            name: $t('News'),
            icon: 'ic-round-newspaper',
            url: `newsList/index?id=${newsType.value.dongtai || ''}&title=${$t('News')}`,
          },
          {
            name: $t('Activity'),
            icon: 'ic-round-stars',
            url: `newsList/index?id=${newsType.value.huodong || ''}&title=${$t('Activity')}`,
          },
          // {
          //   name: '满意度调查',
          //   icon: 'ic-baseline-attach-email',
          //   url: '',
          // },
        ]

  nav.forEach((item, index) => {
    const idx = index < 10 ? index : index % 10
    item.color = randomColor[idx]
  })

  return nav
})
</script>

<style lang="scss" scoped>
.black-bg {
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 99%);
}
</style>
