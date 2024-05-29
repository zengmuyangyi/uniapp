<template>
  <div v-if="data" class="relative">
    <n-list bg-type="inverse" :down="null" :up="null" height="window" @scroll="handleScroll">
      <n-list-cell>
        <div style="height: 600rpx" class="h-600 flex w-full justify-center items-end bg-gray-100">
          <swiper
            v-if="images.length"
            style="height: 600rpx; width: 100%"
            circular
            :indicator-dots="indicatorDots"
            :autoplay="autoplay"
            :interval="interval"
            :duration="duration"
            @change="handleChange"
          >
            <swiper-item v-for="(item, index) in images" :key="index">
              <image :src="item" mode="aspectFill" class="w-full h-600" />
            </swiper-item>
          </swiper>

          <blank v-else hide-text></blank>
        </div>
      </n-list-cell>
      <n-list-cell>
        <div class="relative">
          <div class="bg-white rounded-3 text-40 font-bold -mt-3 p-3 flex justify-between">
            {{ getText(data.name) }}
            <button
              plain
              open-type="share"
              class="w-56 h-48 p-0 m-0"
              style="
                border: none;
                background: url(https://pqntourism.pcleartv.cn/share.png) no-repeat center center;
                background-size: 100% 100%;
              "
            >
              <!-- <image src="/static/ui/share.png" class="w-56 h-48"></image> -->
            </button>
          </div>
        </div>
      </n-list-cell>
      <n-list-cell>
        <div class="p-3 pt-0">
          <div class="mb-3">
            <luch-audio
              v-if="getText(data.voiceIntroduction)"
              v-model:play="audioPlay"
              :autoplay="true"
              :src="getText(data.voiceIntroduction)"
            ></luch-audio>
          </div>

          <div v-if="data.openTime" class="font-bold mb-1 py-3">
            <div class="flex items-center text-30 mb-25rpx">
              <!-- <span class="text-yellow-500 ic-baseline-access-time-filled mr-1"></span> -->
              开放时间
            </div>

            <div class="text-gray-500 font-normal text-26">
              {{ data.openTime }}
            </div>
          </div>

          <div v-if="data.phone" class="font-bold mb-1 py-3">
            <div class="flex items-center text-30 mb-25rpx">
              <!-- <span class="text-yellow-500 ic-baseline-local-phone mr-1"></span> -->
              联系电话
            </div>

            <div class="text-gray-500 font-normal text-26">
              {{ data.phone }}
            </div>
          </div>

          <div v-if="data.address" class="font-bold mb-1 py-3">
            <div class="flex items-center text-30 mb-25rpx">
              <!-- <span class="text-yellow-500 ic-round-location-on mr-1"></span> -->
              地理位置
            </div>

            <div class="text-gray-500 font-normal text-26">
              {{ getText(data.address) }}
            </div>
          </div>

          <div class="py-3">
            <div class="font-bold flex items-center text-30 mb-25rpx">
              <!-- <span class="text-yellow-500 ic-baseline-info mr-1"></span> -->
              景点介绍
            </div>

            <mp-html class="text-gray-600" :content="getText(data.introduction)" />
          </div>

          <div class="relative overflow-hidden rounded-3" @click="goMap(data)">
            <image :src="vr" mode="aspectFill" class="image w-full h-240 block" />

            <div v-if="currentId" class="green-bg icon px-2 py-1 rounded-2">
              <div class="majesticons-map-marker-area mr-2"></div>
              查看地图
            </div>
            <div v-else class="green-bg px-2 py-1 rounded-2 icon">
              <div class="majesticons-map-marker-area mr-2"></div>
              景区导览
            </div>
          </div>
        </div>
      </n-list-cell>

      <n-list-cell>
        <div class="h-100"></div>
      </n-list-cell>
    </n-list>

    <n-position pos="top" box-style="width:750rpx;">
      <div class="bg-blue text-white" :style="{ background: `rgba(234, 179, 8,${opacity})` }">
        <n-height height="status"></n-height>
        <n-height height="nav">
          <div class="flex h-full w-full items-center px-3 justify-center text-shadow-sm">
            <span class="ic-baseline-arrow-back-ios absolute left-24" @click="handleBack"></span>
            <span :style="{ opacity: opacity }">{{ getText(data.name) }}</span>
          </div>
        </n-height>
      </div>
    </n-position>
    <view
      v-if="data.buyUrl"
      class="fixed bottom-0 w-full h-100 bg-#1988ac"
      @click="goBuyUrl(data.buyUrl)"
    >
      <view class="w-full h-full flex justify-center items-center text-white">
        <view class="ic-outline-shopping-cart w-40 h-40"></view>
        <view class="ml-2 text-30">预定</view>
      </view>
    </view>
  </div>
</template>

<script setup>
// import singleData from './data'
import { fetchMapPOI } from '@/api/map'
import { getHeight } from '@/nPro/utils/system.js'
import { getImage, getText } from '@/service/util'
// import $t from '@/service/i18n'

const { currentScenic } = useStore('scenic')

const panoramic = computed(() => {
  return currentScenic.value.panoramic
})

const vr = computed(() => {
  return currentScenic.value.vr || getImage(currentScenic.value.images)?.split(',')?.[0]
})

const currentId = ref()
const singleInfo = ref({})
const data = computed(() => {
  return currentId.value ? singleInfo.value : currentScenic.value
})

const scollTop = ref(0)
const opacity = computed(() => {
  const op = scollTop.value / (getHeight('status-nav') + 100)
  return op > 1 ? 1 : op
})

const current = ref(0)

const handleChange = (e) => {
  current.value = e.target?.current || 0
}

const images = ref([])
watchEffect(() => {
  const imageList = getImage(data.value.images)
  console.log('%c [ imageList ]-141', 'font-size:13px; background:pink; color:#bf2c9f;', imageList)
  images.value = imageList ? imageList?.split(',') : []
})

const audioPlay = ref(true)

const { indicatorDots, autoplay, interval, duration } = {
  indicatorDots: false,
  autoplay: true,
  interval: 3000,
  duration: 500,
}

const handleBack = () => {
  uni.navigateBack()
}

onLoad(async (options) => {
  console.log('%c [ options ]-95', 'font-size:13px; background:pink; color:#bf2c9f;', options)

  if (options?.id) {
    currentId.value = options?.id - 0
    const res = await fetchMapPOI(currentId.value)
    console.log('&&&', res)
    singleInfo.value = res
  }
})

const handleScroll = (e) => {
  scollTop.value = e.detail.scrollTop
}

const { mapData } = useStore('app')

const goMap = () => {
  mapData.value = {
    type: 'point',
    value: data.value.id,
  }

  navigateTo({ url: 'map/index' })
}

const handleShare = () => {
  uni.share({
    provider: 'weixin',
    scene: 'WXSceneSession',
    type: 1,
    success: function (res) {
      console.log('success:' + JSON.stringify(res))
    },
    fail: function (err) {
      console.log('fail:' + JSON.stringify(err))
    },
  })
}

onShareAppMessage(() => {
  return {
    title: getText(data.value.name),
    path: `pages/scenic/index${currentId.value ? '?id=' + currentId.value : ''}`,
  }
})
// 购票链接
const goBuyUrl = (path) => {
  uni.navigateToMiniProgram({
    shortLink: path,
    success(res) {
      console.log(res)
    },
  })
}
</script>

<style lang="scss" scoped>
.icon {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
