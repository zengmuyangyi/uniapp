<template>
  <main class="w-375 h-100vh flex flex-col relative overflow-hidden" @click="postMessage">
    <van-tabs
      v-if="styleProjectList.includes(route.query.project)"
      v-model:active="active"
      line-height="0px"
      style="padding: 10px 0"
      title-inactive-color="#000"
      @change="showTabPoints"
    >
      <van-tab v-for="(item, index) in tabs" :key="index" title-style="padding: 0 15px">
        <template #title>
          <div class="flex flex-col items-center">
            <div class="w-25 h-25">
              <img
                :src="active === index ? item.selectedIcon : item.originalIcon"
                class="w-full h-full"
                alt=""
              />
            </div>
            <div class="leading-37rpx" :class="active === index ? 'font-600' : ''">
              {{ getText(item.name) }}
            </div>
          </div>
        </template>
      </van-tab>
    </van-tabs>
    <van-tabs v-else v-model:active="active" @change="showTabPoints">
      <van-tab v-for="(item, index) in tabs" :key="index">
        <template #title>
          <div class="flex items-center">
            <span :class="item.icon" class="mr-5 text-16px"></span>{{ getText(item.name) }}
          </div>
        </template>
      </van-tab>
    </van-tabs>
    <div class="flex-1 relative overflow-hidden">
      <div id="container" class="h-100vh"></div>
      <div
        class="space-x-8 absolute top-0 left-0 w-full bg-opacity-50 bg-gray-500 h-30 flex justify-between items-center z-3000"
        v-show="isShow"
        @click="closeListen"
      >
        <span class="ic-sharp-audiotrack text-white leading-normal flex-shrink-0"></span>
        <span class="text-white leading-normal truncate">{{ message }}</span>
        <span class="i-ic-baseline-close text-white leading-normal flex-shrink-0"></span>
      </div>
    </div>

    <ScenicCard
      :class="scenicInfoVisible ? 'translate-y-0' : 'translate-y-150%'"
      :data="currentScenic"
      :myLng="myLng"
      :myLat="myLat"
    ></ScenicCard>

    <PathSwiper
      @change="handlePathChange"
      :class="pathInfoVisible ? 'translate-y-0' : 'translate-y-150%'"
      :index="currentPath"
      :data="pathList"
    ></PathSwiper>
    <Sidebar :scenicSpot="scenicSpot"></Sidebar>
    <Introduction
      :data="currentIntroduction"
      :introductionVisible="introductionVisible"
      :class="introductionVisible ? 'translate-y-0' : 'translate-y--150%'"
    ></Introduction>
    <Mask v-show="introductionVisible"></Mask>

    <!-- <div
      v-if="route.query.project === 'huluguzhen'"
      class="absolute right-10 top-50 bg-black bg-opacity-38 rounded-4rpx z-2000 box-border p-4 text-white flex flex-col items-center"
    >
      <van-switch v-model="checked" size="22px" @change="handleChange" />
      <view class="text-16 text-white mt-2">热力图</view>
    </div> -->

    <!-- <div
      v-show="!(pathInfoVisible || scenicInfoVisible)"
      class="bg-white w-30 h-30 absolute bottom-10 left-10 text-base flex justify-center items-center"
      id="left-position"
    >
      <span class="i-ic-baseline-my-location text-black text-7xl"></span>
    </div> -->

    <div
      v-show="!(pathInfoVisible || scenicInfoVisible) && !noLocation.includes(route.query.project)"
      class="bg-white w-30 h-30 absolute bottom-10 right-10 text-base flex justify-center items-center z-2100"
      id="left-position"
      @click="toNavigationPage"
    >
      <span class="i-ic-round-content-paste-search text-blue-500 text-7xl"></span>
    </div>
    <div
      v-show="!(pathInfoVisible || scenicInfoVisible) && route.query.project === 'leifengmuseum'"
      class="bg-white rounded-4rpx p-8 flex flex-col justify-between items-center py-7rpx absolute right-10 bottom-120 z-9999"
      @click="toNavigationPage"
    >
      <img
        src="https://pqntourism.pcleartv.cn/Fji3wWLRX-e4t33qxjUfwllZTbQK"
        class="w-25 h-25"
        alt=""
      />
      <div class="font-500 text-#b1b1b1 text-12">搜索</div>
    </div>
    <div
      v-show="!(pathInfoVisible || scenicInfoVisible) && !noLocation.includes(route.query.project)"
      class="bg-white w-30 h-30 absolute bottom-10 left-10 text-base flex justify-center items-center z-2100"
      id="left-position"
      @click="showMyLocation"
    >
      <span
        :style="{ color: `${isLocationOpen ? '#f97316' : '#3b82f6'}` }"
        class="i-ic-baseline-my-location text-7xl text-orange-500"
      ></span>
    </div>
    <van-popup ref="indoorPop" v-model:show="showIndoorPop" round position="bottom" closeable>
      <div class="bg-white w-100vw">
        <div class="text-black text-16 font-600 text-center leading-50 w-100% h-50">
          {{ getText(currentScenic.name) + $t('indoorScenic') }}
        </div>
        <van-tree-select
          v-model:active-id="activeId"
          v-model:main-active-index="activeIndex"
          :items="indoorArr"
          v-on:click-nav="onClickNav"
          v-on:click-item="onClickItem"
        />
      </div>
    </van-popup>
    <van-popup ref="mapPop" v-model:show="showMapPop" round position="bottom">
      <div class="w-100vw bg-white px-17 pt-23 pb-44 box-border siyuan_ht">
        <div class="text-15 font-bold">选择切换的地图</div>
        <div class="overflow-x-scroll w-full">
          <div class="mt-18 flex items-center">
            <div
              v-for="item in mapList"
              :key="item.id"
              class="flex flex-col items-center flex-shrink-0 mr-13 flex-shrink-0"
              @click="handleClick(item)"
            >
              <div
                class="w-105 h-102 bg-cover bg-center"
                :class="mapInfo.id === item.id ? 'border-2 border-#65cef2' : ''"
                :style="{ backgroundImage: `url(${item.cover})` }"
              ></div>
              <div
                class="mt-9 text-13"
                :class="mapInfo.id === item.id ? 'text-#65cef2 font-bold' : ''"
              >
                {{ getText(item.name) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-popup>
  </main>
</template>

<script setup>
/* eslint-disable no-undef */
import Introduction from '@/components/Introduction.vue'
import Mask from '@/components/mask.vue'
import useIndex from './useIndex'
import { navigateTo } from '@/utils/index'
// import useMap from './useMap'
import { useRoute } from 'vue-router'
import $t from '@/utils/i18n'
import { onMounted } from 'vue'
// ----------------------------顶部导航公用项目-----------------------------
const styleProjectList = ['nalati', 'shangyouxian', 'dayan', 'fanglanhu', 'leifengmuseum']
const noLocation = ['nalati', 'leifengmuseum']
const route = useRoute()
const {
  myLng,
  myLat,
  active,
  tabs,
  getText,
  scenicSpot,
  pathInfoVisible,
  scenicInfoVisible,
  introductionVisible,
  showTabPoints,

  currentPath,
  currentScenic,

  pathList,
  handlePathChange,
  togglePath,
  toggleIntroduction,
  currentIntroduction,
  getLocation,
  showPoint,
  indoorClick,
  initFirst,
  mapList,
  mapInfo,
  switchMap,
  setHeatMap,
  checked,
} = useIndex()

const handleChange = (e) => {
  setHeatMap(e)
}
const isShow = ref(false)
const message = ref({})
const audio = new Audio()
// 开启播放讲解
function playAudio() {
  audio.src = getText(currentScenic.value.voiceIntroduction)
  // audio.loop = 'loop'
  audio.play()
}
// 关闭播放讲解
function closeListen() {
  isShow.value = false
  if (audio.pause) {
    audio.pause()
  }
}
audio.addEventListener('ended', () => {
  console.log('&&&')
  isShow.value = false
})
// 显示顶部提示及播放讲解
const handleShow = (changeVal) => {
  isShow.value = changeVal.value
  if (changeVal.value) {
    // 播放防抖
    if (audio.pause) {
      audio.pause()
    }
    if (getText(currentScenic.value.voiceIntroduction)) {
      message.value = $t('messagePlay') + getText(currentScenic.value.name)
      playAudio()
    } else {
      message.value = $t('messageNo')
    }
  } else {
    audio.pause()
  }
}

// 跳转至智能导览页
function toNavigationPage() {
  if (route.query.project === 'zhumadian') {
    navigateTo({ url: '/pages/scenicList/index?title=景区景点&id=5' })
  } else {
    uni.navigateTo({ url: '/pages/common/scenicList/index' })
  }
}
provide('isShow', isShow)
provide('handleShow', handleShow)
provide('togglePath', togglePath)
provide('toggleIntroduction', toggleIntroduction)
provide('closeListen', closeListen)

const isLocationOpen = ref(false)
const locationTimer = ref()
const showMyLocation = () => {
  isLocationOpen.value = !isLocationOpen.value
  initFirst()
  // if (isLocationOpen.value) {
  //   navigator.geolocation.watchPosition((position) => {
  //     const lat = position.coords.latitude
  //     const lng = position.coords.longitude
  //     console.log('&&&', position)
  //   })
  // } else {
  //   navigator.geolocation.clearWatch()
  // }
  locationTimer.value = setInterval(() => {
    if (isLocationOpen.value) {
      getLocation()
    } else {
      clearInterval(locationTimer.value)
    }
  }, 1000)
}
// ---------------------那拉提定制功能--------------------------
const mapPop = ref()
const showMapPop = ref(false)
const showMap = () => {
  showMapPop.value = true
}
provide('showMap', showMap)
const handleClick = async (item) => {
  await switchMap(item)
  showMapPop.value = false
}
// ----------------------嵌套传递消息--------------------------
window.onmessage = async (event) => {
  if (event.data.type === 'singlePoint') {
    console.log('已收到消息', event.data.data)
    await showPoint(event.data.data)
    const data = {
      value: true,
    }
    if (currentScenic.value) {
      handleShow(data)
    }
  }
}
// -----------------------黄鹤楼定制功能------------------------
const indoorPop = ref()
const showIndoorPop = ref(false)
const activeId = ref(9999)
const activeIndex = ref(0)
const indoorArr = ref([])
const showIndoor = () => {
  showIndoorPop.value = true
  indoorArr.value = []
  const floors = currentScenic.value.floors.split(',')
  floors.forEach((item, index) => {
    indoorArr.value[index] = {
      text: item,
      children: [],
    }
    currentScenic.value.childList.forEach((child) => {
      if (child.floor === item) {
        indoorArr.value[index].children.push({
          text: getText(child.name),
          id: child.id,
        })
      }
    })
  })
}
provide('showIndoor', showIndoor)
// 点击室内景点弹层的左侧栏
const onClickNav = (index) => {
  console.log(index)
}
// 点击室内景点弹层的右侧栏
const onClickItem = (item) => {
  console.log(item)
  indoorClick(item.id)
  showIndoorPop.value = false
}
onUnmounted(() => {
  clearInterval(locationTimer.value)
})
</script>

<style lang="scss" scoped>
:deep .van-tabs__line {
  background: #1989fa;
}

#left-position {
  border-radius: 0.4rem;
}
</style>
