<template>
  <view class="bg-#f7f8fa w-full h-full relative">
    <view class="w-full h-430">
      <video
        :src="getText(videoData.videoUrl)"
        :poster="getImage(videoData.coverImage)"
        class="w-full h-full"
      />
    </view>
    <view class="p-30rpx font-bold border-b-1 border-b-gray-200">{{
      getText(videoData.name)
    }}</view>
    <view class="p-30rpx">
      <mp-html :content="getText(videoData.description)" />
    </view>
  </view>
</template>

<script setup>
import { fetchVideo } from '@/api/video'
import { getText, getImage } from '@/service/util'
import mpHtml from '@/components/mp-html/mp-html.vue'
const videoData = ref({})
const getVideo = async (id) => {
  const res = await fetchVideo(id)
  videoData.value = res
  console.log('$$$', res)
}
onLoad(async (options) => {
  uni.setNavigationBarTitle({ title: options.title })
  await getVideo(options.id - 0)
})
</script>

<style scoped lang="scss"></style>
