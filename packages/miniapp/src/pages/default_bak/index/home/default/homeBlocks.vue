<template>
  <div v-if="props.componentStyle === 'default'" class="text-34 ml-30rpx">
    {{ $t('Common') }}
  </div>
  <div class="flex flex-wrap justify-between m-30rpx">
    <div
      v-for="(block, index) in blocks"
      :key="index"
      :style="block.style"
      :class="block.class"
      class="w-330 h-180 rounded-3 bg flex relative mb-3 relative overflow-hidden"
      @click="goPage(block)"
    >
      <div
        v-if="props.componentStyle === 'default'"
        class="absolute opacity-10"
        :class="block.bgPos"
      >
        <image :src="block.icon" mode="scaleToFill" class="w-330 h-330" />
      </div>
      <div v-if="props.componentStyle === 'default'" class="absolute top-27 right-8">
        <image :src="block.icon" mode="scaleToFill" class="w-120 h-120" />
      </div>
      <image
        v-else-if="props.componentStyle === 'contracted'"
        class="w-full h-full absolute"
        :src="block.icon"
        mode="scaleToFill"
      />
      <view
        class="flex-1 pt-40rpx pl-20rpx text-32 relative"
        :style="{ color: `${props.componentStyle === 'contracted' ? block.color : 'black'}` }"
      >
        {{ block.name }}

        <view
          class="text-26 text-gray mt-8rpx"
          :style="{ color: `${props.componentStyle === 'contracted' ? block.color : 'black'}` }"
          >{{ block.des }}</view
        >
      </view>
    </div>
  </div>
</template>

<script setup>
import $t from '@/service/i18n'
import Color from 'color'

const colors = ['#feefd9', '#fee0d9', '#d8fafe', '#edfed9']
const { extConfig, currentScenic } = useStore('scenic')
const props = defineProps({
  componentStyle: {
    type: String,
    default: () => '',
  },
})

// 新闻类型code映射类型id
const newsType = inject('newsType', '')
const blocks = computed(() => {
  const data =
    props.componentStyle === 'contracted'
      ? [
          {
            name: $t('Introduction'),
            des: $t('ChengduToCreate'),
            class: 'rounded-20rpx rounded-br-none',
            bgPos: 'left-88 -top-100',
            style: { background: '#ECEDFF' },
            icon: 'https://pqntourism.pcleartv.cn/FkYc2gixzkui945rteMv6Jia0-Yg',
            url: 'scenic/index',
            color: '#105fae',
          },
          {
            name: $t('ScenicList'),
            des: $t('SmartGuidesDes'),
            icon: 'https://pqntourism.pcleartv.cn/Fo2rTgWhAGmr54LYEguOJoL7HgP5',
            bgPos: 'left-126 -top-100',
            class: 'rounded-20rpx rounded-bl-none',
            style: { background: '#E0FBFF' },
            url: 'scenicList/index',
            color: '#ac2917',
          },
          {
            name: $t('WeatherForecast'),
            des: $t('WeatherForecastDes'),
            bgPos: 'left-100 -top-100',
            class: 'rounded-20rpx rounded-tr-none',
            style: { background: '#FDEDEA' },
            icon: 'https://pqntourism.pcleartv.cn/FpZmqgUW7PWX3dqY9BxbS9509bc_',
            url: 'weather/index',
            color: '#129c2f',
          },
          {
            name: $t('TrafficGuidance'),
            des: $t('TrafficGuidanceDes'),
            icon: 'https://pqntourism.pcleartv.cn/Fr9ZJHzwdlTItnfXLsW0JeqW2wPg',
            bgPos: 'left-126 -top-100',
            class: 'rounded-20rpx rounded-bl-none',
            style: { background: '#E0FBFF' },
            url: 'news/index?id=116',
            color: '#ab8307',
          },
        ]
      : [
          {
            name: $t('Introduction'),
            des: currentScenic.value.level + 'A ' + $t('IntroductionDes'),
            class: 'rounded-20rpx rounded-br-none',
            bgPos: 'left-88 -top-100',
            style: { background: '#ECEDFF' },
            icon: 'https://pqntourism.pcleartv.cn/FvZLkhuCT1Qw91SG4-xUnfAf1TT3',
            url: 'scenic/index',
          },
          {
            name: $t('SmartGuides'),
            des: $t('SmartGuidesDes'),
            icon: 'https://pqntourism.pcleartv.cn/FsEfXivUrMhuOBQwmce32KPlmfK_',
            bgPos: 'left-126 -top-100',
            class: 'rounded-20rpx rounded-bl-none',
            style: { background: '#E0FBFF' },
            url: 'scenicList/index',
          },
          {
            name: $t('WeatherForecast'),
            des: $t('WeatherForecastDes'),
            bgPos: 'left-100 -top-100',
            class: 'rounded-20rpx rounded-tr-none',
            style: { background: '#FDEDEA' },
            icon: 'https://pqntourism.pcleartv.cn/FmFKVtc8nQepfcwLRUUO0GE-jJBf',
            url: 'weather/index',
          },
        ]
  if (props.componentStyle === 'default') {
    data.push(
      extConfig.value.project === 'yunmengshan'
        ? {
            name: $t('Culture'),
            des: $t('CultureDes'),
            bgPos: 'left-100 -top-50',
            class: 'rounded-20rpx rounded-tl-none',
            style: { background: '#E7F3FF' },
            icon: 'https://pqntourism.pcleartv.cn/Fi3PqC_Oc2zhNp_Y8iJVc-VMwMdL',
            url: `culture/index`,
          }
        : {
            name: $t('SpecialEevents'),
            des: $t('SpecialEeventsDes'),
            bgPos: 'left-100 -top-50',
            class: 'rounded-20rpx rounded-tl-none',
            style: { background: '#E7F3FF' },
            icon: 'https://pqntourism.pcleartv.cn/Fi3PqC_Oc2zhNp_Y8iJVc-VMwMdL',
            url: `newsList/index?id=${newsType.value.zhuanti || ''}&title=${$t('SpecialEevents')}`,
          }
    )
    data.forEach((b, index) => {
      b.from = colors[index]
      b.to = Color(colors[index]).lighten(0.05).rgb().string()
      b.color = Color(colors[index]).darken(0.55).rgb().string()
      b.border = Color(colors[index]).darken(0.4).alpha(0.4).rgb().string()
    })
  }

  return data
})

const goPage = (item) => {
  console.log('%c [ item ]-76', 'font-size:13px; background:pink; color:#bf2c9f;', item)
  navigateTo({ url: item.url })
}
</script>

<style lang="scss" scoped></style>
