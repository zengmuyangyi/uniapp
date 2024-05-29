<template>
  <view class="w-full min-h-100vh relative bg-#f8f8f8">
    <n-tabs-h
      space="130rpx"
      :value="current"
      :is-tap="true"
      :hover-top="false"
      :items="tabs"
      :delay="50"
      bg-type="inverse"
      text-size="s"
      text-type="kunshan-tab"
      text-style="line-height: 40rpx"
      active-text-size="s"
      active-text-type="nav-title"
      active-text-style=";font-weight: 600"
      left="65rpx"
      right="65rpx"
      height="80rpx"
      justify="center"
      indicator-type="kunshan"
      indicator-width="50rpx"
      indicator-height="7rpx"
      indicator-style="border-radius: 4rpx"
      @change="toChangeTab"
    ></n-tabs-h>
    <swiper
      :current="current"
      :style="{ height: `${height || 0}px` }"
      @change="toSwiperChange"
      class="mt-30rpx bg-white"
    >
      <swiper-item>
        <exhibitDetail></exhibitDetail>
      </swiper-item>
      <swiper-item>
        <collectionList
          :data="collectionData"
          :currentData="currentDetail"
          :isPlay="isPlay"
        ></collectionList>
      </swiper-item>
      <swiper-item>
        <collectionDetail
          :data="collectionData"
          :currentData="currentDetail"
          :isPlay="isPlay"
        ></collectionDetail>
      </swiper-item>
    </swiper>
  </view>
</template>

<script setup>
import exhibitDetail from './components/exhibitDetail.vue'
import collectionList from './components/collectionList.vue'
import collectionDetail from './components/collectionDetail.vue'
import { fetchCollectionList } from '@/api/collection'
import { provide } from 'vue'
const tabs = ref(['展厅介绍', '藏品列表', '藏品详情'])
const current = ref(0)
function toChangeTab(i) {
  current.value = i
}
function toSwiperChange(e) {
  current.value = e.detail.current
}
const heightList = ref([0, 0, 0])
provide('heightList', heightList)
const height = computed(() => {
  return heightList.value[current.value]
})
// -------------------------------获取藏品列表-----------------------
const collectionData = ref([])
const currentDetail = ref(0)
const isPlay = ref(false)
const isAutoplay = ref(false)
const exhibitionAutoplay = ref(false)
const isExhibitionPlay = ref(false)
const getCollectionList = async (id) => {
  const params = {
    pageSize: 0,
    pageNum: 0,
    isMobileShow: 1,
    exhibitionHall: id,
  }
  const res = await fetchCollectionList(params)
  collectionData.value = res.list
  console.log('%c [ 藏品列表 ]-48', 'font-size:13px; background:pink; color:#bf2c9f;', res.list)
}
// -------------------------点击列表，切换播放------------------------
const changeCurrent = (e) => {
  if (currentDetail.value === e) {
    isPlay.value = !isPlay.value
  } else {
    isPlay.value = true
  }
  if (isPlay.value) {
    isAutoplay.value = true
  } else {
    isAutoplay.value = false
  }
  currentDetail.value = e
}
provide('changeCurrent', changeCurrent)
// ---------------------------播放下一个----------------------
const endAudio = () => {
  if (currentDetail.value + 1 < collectionData.value?.length) {
    currentDetail.value++
  } else {
    isPlay.value = false
    isAutoplay.value = false
  }
}
provide('endAudio', endAudio)
// ------------------------详情暂停播放-----------------------
const pauseAudio = () => {
  isPlay.value = false
  isAutoplay.value = false
}
provide('pauseAudio', pauseAudio)
// ---------------------------详情开始播放-----------------------
const playAudio = () => {
  isPlay.value = true
  isAutoplay.value = true
  exhibitionAutoplay.value = false
  isExhibitionPlay.value = false
}
// -----------------------展厅详情播放----------------
const exhibitionPlay = () => {
  console.log('&&&&')
  exhibitionAutoplay.value = true
  isExhibitionPlay.value = true
  pauseAudio()
}
provide('playAudio', playAudio)
onLoad((options) => {
  if (options.id) {
    getCollectionList(options.id)
  }
  if (options.current - 0) {
    current.value = options.current - 0
  } else {
    current.value = 0
    exhibitionPlay()
  }
})
// -------------是否自动播放---------------------
const changeAutoplay = () => {
  isAutoplay.value = !isAutoplay.value
  if (isAutoplay.value) {
    isPlay.value = true
  } else {
    isPlay.value = false
  }
}
provide('changeAutoplay', changeAutoplay)
provide('isAutoplay', isAutoplay)
provide('exhibitionAutoplay', exhibitionAutoplay)
provide('exhibitionPlay', exhibitionPlay)
provide('isExhibitionPlay', isExhibitionPlay)
</script>
