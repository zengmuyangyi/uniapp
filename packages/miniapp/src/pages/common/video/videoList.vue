<template>
  <view class="relative">
    <view class="px-30rpx pb-0 bg-#f7f8fa relative w-full box-border">
      <view class="relative">
        <n-list
          ref="nListRef"
          :auto-update="true"
          bg-type="none"
          height="window"
          class="w-full"
          @up="getVideoList"
          @down="getVideoList"
        >
          <n-list-cell class="w-full h-full">
            <view
              v-for="(item, index) in videoList"
              :key="index"
              class="h-480 w-full bg-gray-300 rounded-xl overflow-hidden my-30rpx"
              @click="goDetail(item)"
            >
              <view
                class="w-full h-380 bg-cover flex justify-center items-center"
                :style="{ backgroundImage: `url(${getImage(item.coverImage)})` }"
              >
                <image src="/static/ui/video.png" mode="scaleToFill" class="w-80 h-80" />
              </view>
              <view class="w-full h-100 bg-white leading-100rpx pl-30rpx font-bold">{{
                getText(item.name)
              }}</view>
            </view>
          </n-list-cell>
        </n-list>
      </view>
    </view>
  </view>
</template>

<script setup>
import { fetchVideoList } from '@/api/video'
import { getText, getImage } from '@/service/util'
const typeId = ref('')
const nListRef = ref()
const videoList = ref([])
const getVideoList = async (cp) => {
  const params = {
    pageSize: 10,
    pageNum: cp,
    status: 1,
    typeId: typeId.value,
  }
  const res = await fetchVideoList(params)
  if (cp === 1) {
    videoList.value = res.list
  } else {
    videoList.value = videoList.value.concat(res.list)
  }
  nListRef.value.nEndSuccess(!!res.nextPage)
}
const goDetail = (data) => {
  navigateTo({ url: `video/videoDetail?id=${data.id}&title=${getText(data.name)}` })
}
onLoad((options) => {
  console.log(options)
  if (options.typeId) {
    typeId.value = options.typeId - 0
  }
  if (options.title) {
    uni.setNavigationBarTitle({ title: options.title })
  }
})
</script>

<style scoped lang="scss"></style>
