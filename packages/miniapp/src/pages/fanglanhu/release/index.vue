<template>
  <view class="w-full min-h-100vh box-border relative">
    <view class="p-20rpx w-full box-border">
      <uni-forms ref="form" v-model="formData">
        <uni-forms-item v-if="type === 'image'" name="images">
          <view class="flex flex-wrap">
            <view
              v-for="(img, index) in images"
              :key="index"
              class="relative mb-20rpx"
              :class="index % 3 ? 'ml-20rpx' : ''"
            >
              <image
                class="w-220 h-220 bg-gray-100"
                :src="img"
                mode="aspectFit"
                @click="preview(img)"
              />

              <!-- 自定义组件 click 无法触发 -->
              <closeBtn @tap="handleDelete(index)"></closeBtn>
            </view>
            <view
              v-show="images.length < imageNum"
              :class="uploading ? 'pointer-events-none' : ''"
              class="w-220 h-220 flex items-center justify-center bg-#ececec"
              @click="handleChooseImage"
            >
              <view class="text-black">
                <view v-if="!uploading" class="w-38 h-38">
                  <image
                    src="https://pqntourism.pcleartv.cn/FisJqOcCxWD0OP2PO6v-QJz5Imhk"
                    mode="scaleToFill"
                    class="w-full h-full"
                  />
                </view>
                <i v-else class="eos-icons-bubble-loading text-size-60"></i>
              </view>
            </view>
          </view>
        </uni-forms-item>
        <uni-forms-item v-else name="video">
          <view
            v-if="videoUrl"
            class="w-220 h-220 relative bg-cover bg-center"
            :style="{ backgroundImage: `url(${videoPoster})` }"
          >
            <view
              @click="previewVido"
              class="w-full h-64 absolute bottom-0 left-0 bg-black bg-opacity-47 text-center leading-64rpx text-white text-26"
              >预览</view
            >
            <!-- 自定义组件 click 无法触发 -->
            <closeBtn @tap.stop="handleDelete()"></closeBtn>
          </view>
          <view
            v-else
            :class="videoUploading ? 'pointer-events-none' : ''"
            class="w-220 h-220 flex items-center justify-center bg-#ececec"
            @click="handleChooseVideo"
          >
            <view class="text-black">
              <view v-if="!videoUploading" class="w-38 h-38">
                <image
                  src="https://pqntourism.pcleartv.cn/FisJqOcCxWD0OP2PO6v-QJz5Imhk"
                  mode="scaleToFill"
                  class="w-full h-full"
                />
              </view>
              <i v-else class="eos-icons-bubble-loading text-size-60"></i>
            </view>
          </view>
        </uni-forms-item>
        <view class="mt-40rpx">
          <uni-forms-item name="title">
            <uni-easyinput
              v-model="formData.title"
              placeholder-style="color: #ccc;font-size: 30rpx; line-height: 42rpx"
              :input-border="false"
              type="text"
              placeholder="请输入标题"
            />
          </uni-forms-item>
        </view>
        <uni-forms-item name="content">
          <uni-easyinput
            v-model="formData.content"
            :input-border="false"
            type="textarea"
            placeholder="请输入要发表的内容"
            placeholder-style="color: #ccc;font-size: 30rpx; line-height: 42rpx"
          />
        </uni-forms-item>
      </uni-forms>
    </view>
    <uni-popup ref="popup" type="dialog">
      <uni-popup-dialog
        content="确定删除吗？"
        :duration="2000"
        :before-close="true"
        @close="close"
        @confirm="confirm"
      ></uni-popup-dialog>
    </uni-popup>
    <video
      :src="videoUrl"
      id="videoId"
      @fullscreenchange="fullscreenchange"
      class="w-0 h-0"
    ></video>
  </view>
</template>

<script setup>
const formData = reactive({
  content: '',
  images: '',
  title: '',
  cover: '',
  video: '',
})
// ------------------------------------------视频上传---------------------------------------------
const videoUploading = ref(false)
const videoUrl = ref('')
const videoPoster = ref('')
const handleChooseVideo = () => {
  uni.chooseMedia({
    count: 1,
    mediaType: ['video'],
    sourceType: ['album', 'camera'],
    compressed: true,
    maxDuration: 30,
    success: (res) => {
      console.log('%c [ res ]-162', 'font-size:13px; background:pink; color:#bf2c9f;', res)
      videoUploading.value = true
      uni.uploadFile({
        url: 'https://pres.cleartv.cn/upload',
        fileType: 'image',
        filePath: res.tempFiles[0].thumbTempFilePath,
        name: 'poster',
        success: (res) => {
          const data = JSON.parse(res.data)
          console.log('***', data)
          videoPoster.value = data.data.url
          form.value.setValue('cover', data.data.url)
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
      })
      uni.uploadFile({
        url: 'https://pres.cleartv.cn/upload',
        fileType: 'video',
        filePath: res.tempFiles[0].tempFilePath,
        name: 'video',
        success: (res) => {
          const data = JSON.parse(res.data)
          videoUrl.value = data.data.url
          console.log('***', data)
          form.value.setValue('video', data.data.url)

          uni.showToast({
            title: '上传成功',
            icon: 'none',
          })
          console.log('%%%', form)
        },
        fail: () => {
          uni.showToast({
            title: '上传失败',
            icon: 'none',
          })
        },
        complete: () => {
          videoUploading.value = false
        },
      })
    },
  })
}
const videoContext = uni.createVideoContext('videoId')
const previewVido = () => {
  videoContext.requestFullScreen()
}
const fullscreenchange = () => {
  videoContext.pause()
}
// ------------------------------------------照片上传----------------------------------------------------
const images = ref([])
const uploading = ref(false)

const handleChooseImage = () => {
  uni.chooseImage({
    count: imageNum.value,
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
            form.value.setValue('images', images.value.join(','))

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

  if (type.value === 'image') {
    currentDelIndex.value = index
  }
}

const close = () => {
  popup.value.close()
}

const confirm = () => {
  if (type.value === 'video') {
    videoPoster.value = ''
    videoUrl.value = ''
    form.value.setValue('video', videoUrl.value)
    form.value.setValue('cover', videoPoster.value)
  } else {
    images.value.splice(currentDelIndex.value, 1)
    form.value.setValue('images', images.value.join(','))
  }
  popup.value.close()
}
const form = ref()
const loading = ref(false)
const type = ref('')
const imageNum = ref(1)
onLoad((options) => {
  type.value = options.type
  if (options.type === 'image') {
    imageNum.value = 9
  } else {
    imageNum.value = 1
  }
  uni.setNavigationBarTitle({
    title: options.title,
  })
})
</script>

<style lang="scss" scoped>
:deep(.uni-easyinput__content-input) {
  padding-left: 0 !important;
}
</style>
