<template>
  <view class="px-30rpx relative box-border w-full">
    <view
      v-for="(item, index) in audioList"
      :key="index"
      class="flex justify-between items-center py-30rpx w-full border-b border-b-1 border-b-#f6f6f6"
    >
      <view
        class="w-150 h-150 bg-gray-200 rounded-10rpx bg-cover"
        :style="{ backgroundImage: `url(${getImage(item.cover)})` }"
      ></view>
      <view class="w-450 h-150">
        <view class="font-bold text-30rpx truncate">{{ getText(item.name) }}</view>
        <view class="mt-10rpx text-24 text-#707070 u-line-3">{{ getText(item.description) }}</view>
      </view>
      <view
        class="w-50 h-50 text-#0789d5"
        :class="currentAudio === item.id ? 'ic-baseline-pause' : 'ic-baseline-play-arrow'"
        @click="controlAudio(item, index)"
      ></view>
    </view>
    <view class="fixed w-full h-100 bottom-40 left-0 px-30rpx box-border">
      <view
        class="flex justify-between items-center px-50rpx h-80 w-full rounded-14rpx bg-white box-border shadow-md shadow-gray-300"
      >
        <view
          class="ic-outline-skip-previous w-50 h-50 text-#0789d5"
          @click="changeAudio(currentIndex - 1)"
        ></view>
        <view
          class="w-100 h-100 rounded-full bg-white flex items-center justify-center shadow-md shadow-gray-300"
          @click="controlAudio(audioList[currentIndex], currentIndex)"
        >
          <view class="w-85 h-85 rounded-full bg-#0789d5 flex justify-center items-center">
            <view
              class="text-white w-60 h-60"
              :class="isPlay ? 'ic-baseline-pause' : 'ic-baseline-play-arrow'"
            ></view>
          </view>
        </view>
        <view
          class="ic-outline-skip-next w-50 h-50 text-#0789d5"
          @click="changeAudio(currentIndex + 1)"
        ></view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { fetchMapPOIList } from '@/api/map'
import { getText, getImage } from '@/service/util'
const audioList = ref([])
const getMapPOIList = async () => {
  const res = await fetchMapPOIList({ typeId: '' })
  audioList.value = res.list.filter((item) => {
    if (getText(item.voiceIntroduction).length) {
      return item
    }
  })
}
// 语音文件
const innerAudioContext = uni.createInnerAudioContext()
const currentAudio = ref(0)
const currentIndex = ref(0)
const isPlay = ref(false)
const controlAudio = (data, index) => {
  if (currentAudio.value === data.id) {
    currentAudio.value = 0
    innerAudioContext.pause()
    isPlay.value = false
  } else {
    currentIndex.value = index
    currentAudio.value = data.id
    innerAudioContext.src = getText(data.voiceIntroduction)
    innerAudioContext.play()
    isPlay.value = true
  }
}
// 播放结束
innerAudioContext.onEnded(() => {
  if (audioList.value[currentIndex.value + 1]) {
    controlAudio(audioList.value[currentIndex.value + 1], currentIndex.value + 1)
  } else {
    currentAudio.value = 0
  }
})
// 更换播放
const changeAudio = (current) => {
  if (audioList.value[current]) {
    controlAudio(audioList.value[current], current)
  }
}
onMounted(async () => {
  await getMapPOIList()
})
</script>

<style scoped lang="scss"></style>
