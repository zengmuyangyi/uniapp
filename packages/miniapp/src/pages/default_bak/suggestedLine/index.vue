<template>
  <view>
    <n-position pos="top" box-style="width:750rpx;">
      <div class="bg-blue text-white" :style="{ background: `rgba(8, 138, 213,${opacity})` }">
        <n-height height="status"></n-height>
        <n-height height="nav">
          <div class="flex h-full w-full items-center px-3 justify-center text-shadow-sm">
            <span class="ic-baseline-arrow-back-ios absolute left-24" @click="handleBack"></span>
            <span :style="{ opacity: opacity }">{{ $t('SuggestedLine') }}</span>
          </div>
        </n-height>
      </div>
    </n-position>
    <n-list bg-type="inverse" :down="null" :up="null" height="window" @scroll="handleScroll">
      <n-list-cell>
        <view style="height: 400rpx" class="h-600 flex w-full justify-center items-end bg-gray-100">
          <view v-if="images?.length" class="h-400rpx w-full relative">
            <image :src="images[0]" mode="aspectFill" class="w-full h-full" />
            <view
              class="absolute w-full h-150 bottom-0 px-50rpx box-border"
              style="background-image: linear-gradient(180deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1))"
            >
              <view class="flex justify-between items-center h-full">
                <view class="w-170 h-1 bg-white"></view>
                <view class="text-white text-45">{{ $t('GreetSuggestedLine') }}</view>
                <view class="w-170 h-1 bg-white"></view>
              </view>
            </view>
          </view>

          <blank v-else hide-text></blank>
        </view>
      </n-list-cell>
      <n-list-cell>
        <view class="relative">
          <view class="bg-white rounded-3 text-40 font-bold -mt-3 p-3">
            <view
              class="w-full h-600 bg-white rounded-3 overflow-hidden shadow-xl"
              @click="goMap(0)"
            >
              <view
                class="w-full h-350 bg-cover relative"
                :style="{
                  backgroundImage: `url(${getImage(firstLine?.templateMapRoute?.coverImage)})`,
                }"
              >
                <view class="text-white absolute bottom-0 p-3">
                  <view class="text-32 font-500">{{
                    getText(firstLine?.templateMapRoute?.name)
                  }}</view>
                  <view class="text-26 mt-2 truncate font-300"
                    >{{ firstLine?.poi?.length }}{{ $t('spots') }}·{{
                      $t('EntireLength') + firstLine.templateMapRoute?.length + $t('Meters')
                    }}·{{
                      $t('VisitTime') + firstLine.templateMapRoute?.duration + $t('Minutes')
                    }}</view
                  >
                </view>
              </view>
              <scroll-view
                class="w-full box-border p-4 overflow-hidden"
                scroll-x="true"
                style="white-space: nowrap; -webkit-scrollbar: "
              >
                <view class="flex items-center">
                  <view
                    v-for="(item, index) in firstLine.poi"
                    :key="index"
                    class="w-200 mr-3 flex-shrink-0"
                  >
                    <view class="w-full h-150 rounded-md overflow-hidden">
                      <image :src="getImage(item.cover)" mode="scaleToFill" class="w-full h-full" />
                    </view>
                    <view class="text-28 font-500 mt-1 truncate w-full">{{
                      getText(item.name)
                    }}</view>
                  </view>
                </view>
              </scroll-view>
            </view>
            <view
              v-for="(item, index) in lineList"
              :key="index"
              class="w-full h-350 bg-cover relative mt-4 rounded-3"
              :style="{
                backgroundImage: `url(${getImage(item.templateMapRoute.coverImage)})`,
              }"
              @click="goMap(index)"
            >
              <view class="text-white absolute bottom-0 p-3">
                <view class="text-32 font-500">{{ getText(item.templateMapRoute.name) }}</view>
                <view class="text-26 mt-2 truncate font-300"
                  >{{ item.poi?.length }}{{ $t('spots') }}·{{
                    $t('EntireLength') + item.templateMapRoute?.length + $t('Meters')
                  }}·{{ $t('VisitTime') + item.templateMapRoute?.duration + $t('Minutes') }}</view
                >
              </view>
            </view>
          </view>
        </view>
      </n-list-cell>
    </n-list>
  </view>
</template>

<script setup>
import { fetchMapPath } from '@/api/map'
import { getHeight } from '@/nPro/utils/system'
import { getImage, getText, parseObject } from '@/service/util'
import $t from '@/service/i18n'
const { currentScenic } = useStore('scenic')
const images = ref([])
const lineList = ref([])
const firstLine = ref({})
watchEffect(() => {
  const imageList = getImage(currentScenic.value.images)
  console.log('%c [ imageList ]-141', 'font-size:13px; background:pink; color:#bf2c9f;', imageList)
  images.value = imageList ? imageList?.split(',') : []
})
const scollTop = ref(0)
const opacity = computed(() => {
  const op = scollTop.value / (getHeight('status-nav') + 100)
  return op > 1 ? 1 : op
})
const handleBack = () => {
  uni.navigateBack()
}
const handleScroll = (e) => {
  scollTop.value = e.detail.scrollTop
}
const getMapPathList = async () => {
  const res = await fetchMapPath()
  res.list.forEach((point) => {
    point.poi &&
      point.poi.forEach((item) => {
        parseObject(item)
      })
    point.poi = point.poi || []
    parseObject(point.templateMapRoute)
  })
  lineList.value = res.list
  firstLine.value = res.list[0]
  console.log('%%%', firstLine.value)
}
getMapPathList()

const { mapData } = useStore('app')

const goMap = (index) => {
  mapData.value = {
    type: 'path',
    value: index,
  }

  navigateTo({ url: 'map/index' })
}
</script>

<style scoped lang="scss"></style>
