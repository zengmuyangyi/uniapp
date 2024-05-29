<template>
  <view class="w-full px-40rpx box-border">
    <view class="flex items-center mt-34rpx">
      <image
        src="https://pqntourism.pcleartv.cn/Fl6p9LxUmvj30-MGVF9jSXpuCWHy"
        mode="scaleToFill"
        class="w-32 h-32 mr-8rpx"
      />
      <view class="text-32 font-600 leading-45rpx">培训文档上传</view>
    </view>
    <view class="w-full mt-37rpx">
      <view
        @click="chooseFile(1)"
        class="w-full h-300 border-2rpx border-solid flex flex-col justify-center items-center bg-#c0d2f1 border-#0052D9"
      >
        <image
          src="https://pqntourism.pcleartv.cn/Fu6Z4L_rpK8L3Uv_aJa3qaqeeIDo"
          mode="scaleToFill"
          class="w-72 h-55 mb-45rpx"
        />
        <view class="w-571 text-center text-26 font-400 leading-40rpx tracking-1rpx text-#0052D9"
          >培训前三带来（学员可上传问题、案例、调研课题等前三带来的文档）</view
        >
      </view>
      <view v-if="fileList.problem.length" class="mt-26rpx w-full">
        <view class="text-26 leading-26rpx font-400 tracking-1rpx mb-26rpx">上传的文档：</view>
        <view
          v-for="(item, index) in fileList.problem"
          :key="index"
          class="w-full h-130 border-1rpx bg-white border-solid px-20rpx box-border flex items-center mb-18rpx border-#e4e4e4"
        >
          <image
            src="https://pqntourism.pcleartv.cn/Fpq50PQ91KQiHwYh-GMVJB1NdedZ"
            mode="scaleToFill"
            class="w-60 h-60"
          />
          <view class="ml-20rpx">
            <view class="text-26 font-400 leading-26rpx tracking-1rpx">{{ item.fileName }}</view>
            <view class="mt-11rpx text-24 leading-26rpx font-400 tracking-1rpx text-#606060"
              >{{ item.size }}MB</view
            >
          </view>
        </view>
      </view>
    </view>
    <view class="w-full mt-100rpx">
      <view
        @click="chooseFile(2)"
        class="w-full h-300 border-2rpx border-solid flex flex-col justify-center items-center"
        :class="canLoad ? '' : 'pointer-events-none'"
        :style="{
          backgroundColor: canLoad ? '#c0d2f1' : '#fff',
          borderColor: canLoad ? '#0052D9' : '#BFBFBF',
        }"
      >
        <image
          :src="
            canLoad
              ? 'https://pqntourism.pcleartv.cn/Fu6Z4L_rpK8L3Uv_aJa3qaqeeIDo'
              : 'https://pqntourism.pcleartv.cn/Fg7gRlFROGcTY41RqSH0ZJ98-jS4'
          "
          mode="scaleToFill"
          class="w-72 h-55 mb-45rpx"
        />
        <view
          class="w-532 text-center text-26 font-400 leading-40rpx tracking-1rpx"
          :style="{ color: canLoad ? '#0052D9' : '#BFBFBF' }"
          >培训后调研报告（学员可上传培训后的调研报告文档）</view
        >
        <view
          v-if="!canLoad"
          class="mt-34rpx text-26 leading-26rpx tracking-1rpx font-400 text-#bfbfbf"
          >注：培训结束后开放上传</view
        >
      </view>
      <view v-if="fileList.report.length" class="mt-26rpx w-full">
        <view class="text-26 leading-26rpx font-400 tracking-1rpx mb-26rpx">上传的文档：</view>
        <view
          v-for="(item, index) in fileList.report"
          :key="index"
          class="w-full h-130 border-1rpx bg-white border-solid px-20rpx box-border flex items-center mb-18rpx border-#e4e4e4"
        >
          <image
            src="https://pqntourism.pcleartv.cn/Fpq50PQ91KQiHwYh-GMVJB1NdedZ"
            mode="scaleToFill"
            class="w-60 h-60"
          />
          <view class="ml-20rpx">
            <view class="text-26 font-400 leading-26rpx tracking-1rpx">{{ item.fileName }}</view>
            <view class="mt-11rpx text-24 leading-26rpx font-400 tracking-1rpx text-#606060">{{
              item.size
            }}</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { addTrainFile } from '@/api/szgbxy'
const canLoad = ref(false)
const trainId = ref(0)
const fileList = ref({
  problem: [],
  report: [],
})
const chooseFile = (typeId) => {
  // #ifdef H5
  h5ChooseFile(typeId)
  // #endif
}
const uploadFile = (params) => {
  addTrainFile(params)
    .then((res) => {
      uni.hideLoading()
      uni.showToast({
        title: '上传成功',
        icon: 'none',
      })
    })
    .catch((err) => {
      uni.hideLoading()
      uni.showToast({
        title: '上传失败',
        icon: 'none',
      })
    })
}
const h5ChooseFile = (typeId) => {
  uni.chooseFile({
    count: 1,
    type: 'all',
    success: (res) => {
      console.log('***', res)
      const tempFilePath = res.tempFilePaths[0]
      const tempFile = {
        fileName: res.tempFiles[0].name,
        size: (res.tempFiles[0].size / 1024 / 1024).toFixed(2),
        downloadUrl: '',
        fileType: typeId,
        trainId: trainId.value,
      }
      console.log('###', tempFile)
      uni.showLoading({
        title: '上传中',
        mask: true,
      })
      uni.uploadFile({
        url: 'http://www.szgx.suzhou.gov.cn/upload',
        filePath: tempFilePath,
        name: 'file',
        success: (res) => {
          const data = JSON.parse(res.data)
          tempFile.downloadUrl = data.data.url
          if (typeId === 1) {
            fileList.value.problem.push(tempFile)
          } else {
            fileList.value.report.push(tempFile)
          }
          console.log('@@@', fileList)
          uploadFile(tempFile)
        },
        fail: () => {
          uni.hideLoading()
          uni.showToast({
            title: '上传失败',
            icon: 'none',
          })
        },
        complete: () => {},
      })
    },
  })
}
onLoad((options) => {
  if (Number(options.status) === 3) {
    canLoad.value = true
  }
  trainId.value = Number(options.id)
})
</script>

<style lang="scss" scoped></style>
