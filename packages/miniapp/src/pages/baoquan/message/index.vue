<template>
  <view class="w-full min-h-100vh box-border relative bg-#f5f5f5">
    <view class="bg-white w-full p-2 box-border mt-3">
      <uni-easyinput
        type="textarea"
        v-model="messageVal"
        placeholder="您的留言有机会成为精选留言~"
        :trim="true"
        :styles="{
          borderColor: 'transparent',
        }"
      ></uni-easyinput>
      <view class="mt-15rpx">
        <div class="flex flex-wrap">
          <div v-for="(img, index) in images" :key="index" class="relative mr-20rpx mb-20rpx">
            <image
              class="w-218 h-218 bg-gray-100"
              :src="img"
              mode="aspectFit"
              @click="preview(img)"
            />

            <!-- 自定义组件 click 无法触发 -->
            <closeBtn @tap="handleDelete(index)"></closeBtn>
          </div>

          <div
            v-show="images.length < 9"
            :class="uploading ? 'pointer-events-none' : ''"
            class="w-218 h-218 flex items-center justify-center bg-#ececec"
            @click="handleChooseImage"
          >
            <div class="text-black">
              <div v-if="!uploading" class="w-60 h-60">
                <image
                  src="https://pqntourism.pcleartv.cn/FrIEDx6ldLvR2wuXm55fUz6GzLOA"
                  mode="scaleToFill"
                  class="w-full h-full"
                />
              </div>
              <i v-else class="eos-icons-bubble-loading text-size-60"></i>
            </div>
          </div>
        </div>
      </view>
    </view>
    <button
      :disabled="loading"
      :loading="loading"
      class="w-full h-120 text-center leading-120rpx text-34 font-600 text-white fixed bottom-0 left-0"
      style="background-image: linear-gradient(90deg, #c5dda3 0%, #85be60 100%)"
      @click="submit"
    >
      提交留言
    </button>
    <!-- <view
      @click="submit"
      class="w-full h-120 text-center leading-120rpx text-34 font-600 text-white fixed bottom-0 left-0"
      style="background-image: linear-gradient(90deg, #c5dda3 0%, #85be60 100%)"
      >提交留言</view
    > -->
    <uni-popup ref="popup" type="dialog">
      <uni-popup-dialog
        content="确定删除吗？"
        :duration="2000"
        :before-close="true"
        @close="close"
        @confirm="confirm"
      ></uni-popup-dialog>
    </uni-popup>
    <uni-popup ref="popupSubmit">
      <view class="w-600 rounded-20rpx box-border bg-white">
        <view class="flex flex-col justify-center items-center h-400 w-full box-border px-10">
          <icon type="success" :size="40" color="" />
          <view class="my-4 text-30">提交成功!</view>
          <view class="text-center">我们将对评论内容进行审核，通过后将在评论区显示</view>
        </view>
        <view class="w-full h-1 green-bg"></view>
        <view
          @click="closeSubmit"
          class="w-full h-100 text-center leading-100rpx text-30 font-bold text-#71d167"
          >确定</view
        >
      </view>
    </uni-popup>
  </view>
</template>

<script setup>
import debounce from 'lodash/debounce'
import { addPoiMessage } from '@/api/message'
const params = {
  id: '',
  poiId: '',
  status: 0,
  type: '',
  content: '',
  image: '',
  isOnline: 0,
}
const loading = ref(false)
const messageVal = ref('')
const popupSubmit = ref()
// ------------------------------------------照片上传----------------------------------------------------
const images = ref([])
const uploading = ref(false)

const handleChooseImage = () => {
  uni.chooseImage({
    count: 9,
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      console.log('%c [ res ]-172', 'font-size:13px; background:pink; color:#bf2c9f;', res)
      const tempFilePaths = res.tempFilePaths

      // images.value.push(tempFilePaths[0])

      uploading.value = true
      tempFilePaths.forEach((item) => {
        uni.uploadFile({
          url: 'https://pres.cleartv.cn/upload',
          fileType: 'image',
          filePath: item,
          name: 'file',
          success: (res) => {
            const data = JSON.parse(res.data)
            images.value.push(data.data.url)

            uni.showToast({
              title: '上传成功',
              icon: 'none',
            })
          },
          fail: () => {
            uni.showToast({
              title: '上传失败',
              icon: 'none',
            })
          },
          complete: () => {
            uploading.value = false
          },
        })
      })
    },
  })
}

const preview = (url) => {
  uni.previewImage({
    current: url, // 当前显示图片的http链接
    urls: [url], // 需要预览的图片http链接列表
  })
}

// 确认删除
const popup = ref()
const currentDelIndex = ref()
const handleDelete = (index) => {
  popup.value.open()

  currentDelIndex.value = index
}

const close = () => {
  popup.value.close()
}

const confirm = () => {
  images.value.splice(currentDelIndex.value, 1)
  popup.value.close()
}
// ------------------------表单提交-------------------
const submit = debounce(() => {
  if (messageVal.value) {
    loading.value = true
    params.content = messageVal.value
    params.image = images.value.join(',')
    addPoiMessage(params)
      .then(
        (res) => {
          popupSubmit.value.open()
        },
        (err) => {
          console.log('err', err)
          uni.showToast({
            title: err.data.errInfo,
            icon: 'none',
          })
        }
      )
      .finally(() => {
        loading.value = false
      })
    console.log('****', params)
  } else {
    uni.showToast({ title: '请填写留言', icon: 'none' })
  }
}, 500)
const closeSubmit = () => {
  messageVal.value = ''
  images.value = []
  popupSubmit.value.close()
}
onLoad((options) => {
  params.poiId = options.poiId - 0
  params.type = options.type
})
</script>
