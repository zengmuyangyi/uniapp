<template>
  <div
    class="p-10 w-full box-border bg-transparent absolute top-40 left-0 transition duration-500 z-3001"
  >
    <div class="p-10 w-full box-border bg-white rounded-3xl flex flex-col items-center">
      <div class="font-bold">{{ getText(data.name) }}</div>
      <div class="w-full h-200 mt-10 bg-gray-300">
        <van-swipe class="w-full h-full" :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="(item, index) in imgList" :key="index">
            <img :src="item" class="w-full h-full" alt="" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="w-full flex mt-10">
        <div
          v-for="(item, index) in data.tag || data.tags"
          :key="index"
          class="w-60 h-28 rounded-xl px-10 text-white text-12 text-center leading-28 mr-5"
          :style="{ backgroundColor: color[index] }"
        >
          {{ item }}
        </div>
      </div>
      <div
        class="mt-10 w-full text-gray-500 text-14 h-190 overflow-hidden overflow-y-scroll"
        v-html="getText(data.introduction)"
      ></div>
      <!-- <div
        v-if="getText(data.voiceIntroduction)"
        class="mt-10 w-full flex justify-center items-centers border-t border-t-gray-300 pt-10"
      >
        <div
          class="w-50 h-50 rounded-full border-blue border-solid flex items-center justify-center overflow-hidden"
          @click="playAudio"
        >
          <div
            class="w-40 h-40 text-blue-400"
            :class="isPlay ? 'i-ic-baseline-pause' : 'i-ic-baseline-play-arrow'"
          ></div>
          <div v-show="isPlay" class="w-40 h-40 text-blue-400 i-ic-baseline-pause"></div>
          <div v-show="!isPlay" class="w-40 h-40 text-blue-400 i-ic-baseline-play-arrow"></div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { getText, getImage } from '@/utils'
import { inject } from 'vue'
const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
  introductionVisible: {
    type: Boolean,
    default: () => false,
  },
})
const imgList = ref([])
const color = ref(['red', 'green', 'skyblue', 'orange'])

const handleShow = inject('handleShow')
const audio = ref(null)
const isPlay = ref(false)
// 开启播放讲解
function playAudio() {
  isPlay.value = !isPlay.value
}
watch(props, (newVal) => {
  let temp
  if (getText(newVal.data.images)) {
    temp = getText(newVal.data.cover)
      ? getText(newVal.data.cover) + ',' + getText(newVal.data.images)
      : getText(newVal.data.images)
  } else {
    temp = getText(newVal.data.cover)
  }
  getText(newVal.data.images)
  imgList.value = temp.split(',')
  if (!newVal.introductionVisible) {
    isPlay.value = false
    audio.value.pause()
  }
})
</script>
