<template>
  <div class="min-h-full w-full flex flex-col justify-between bg-#f5f5f5">
    <view class="w-full p-20rpx box-border">
      <uni-forms ref="form" v-model="formData" label-width="75">
        <view
          class="w-full bg-white rounded-24rpx p-40rpx box-border"
          style="box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1)"
        >
          <uni-forms-item
            label="意见或投诉"
            name="ifComplaint"
            :required="true"
            :rules="[{ required: true, errorMessage: '请选择' }]"
          >
            <uni-data-select
              v-model="formData.ifComplaint"
              class="border-0"
              :localdata="isComplaint"
              placeholder="请选择"
            ></uni-data-select>
          </uni-forms-item>
          <view class="w-full h-1 my-30rpx bg-#E8E8E8"></view>
          <uni-forms-item
            label="问题类型"
            name="typeId"
            :required="true"
            :rules="[{ required: true, errorMessage: '请选择类型' }]"
          >
            <uni-data-select
              v-model="formData.typeId"
              class="border-0"
              :localdata="feedbackType"
              placeholder="请选择类型"
            ></uni-data-select>
          </uni-forms-item>
        </view>
        <view
          class="w-full bg-white rounded-24rpx p-40rpx box-border mt-30rpx"
          style="box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1)"
        >
          <uni-forms-item label="问题标题" name="title">
            <uni-easyinput
              v-model="formData.title"
              placeholder-style="text-align: end;color: #CECECE;font-size: 32rpx; line-height: 45rpx"
              :input-border="false"
              type="text"
              placeholder="请输入建议/投诉标题"
            />
          </uni-forms-item>
          <view class="w-full h-1 my-30rpx bg-#E8E8E8"></view>
          <uni-forms-item label="联系人姓名" name="contactName">
            <uni-easyinput
              v-model="formData.contactName"
              placeholder-style="text-align: end;color: #CECECE;font-size: 32rpx; line-height: 45rpx"
              :input-border="false"
              type="text"
              placeholder="请输入联系人姓名"
            />
          </uni-forms-item>
          <view class="w-full h-1 my-30rpx bg-#E8E8E8"></view>
          <uni-forms-item
            label="联系人电话"
            name="concactPhone"
            :rules="[
              {
                errorMessage: '请输入正确的手机号',
                pattern: '^(1[3-9])\\d{9}$',
              },
            ]"
          >
            <uni-easyinput
              v-model="formData.concactPhone"
              placeholder-style="text-align: end;color: #CECECE;font-size: 32rpx; line-height: 45rpx"
              :input-border="false"
              type="text"
              placeholder="请输入联系人电话"
            />
          </uni-forms-item>
        </view>

        <view
          class="w-full bg-white rounded-24rpx p-40rpx box-border mt-30rpx"
          style="box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1)"
        >
          <view class="text-32 leading-45rpx">填写详细内容</view>
          <uni-forms-item label="" name="content">
            <uni-easyinput
              v-model="formData.content"
              :input-border="false"
              type="textarea"
              placeholder="请输入描述"
              placeholder-style="color: #CECECE;font-size: 32rpx; line-height: 45rpx"
            />
          </uni-forms-item>
          <view class="w-full h-1 mt-30rpx"></view>
          <uni-forms-item name="images">
            <div class="flex flex-wrap">
              <div v-for="(img, index) in images" :key="index" class="relative mr-20rpx mb-20rpx">
                <image
                  class="w-140 h-140 bg-gray-100 rounder-10rpx"
                  :src="img"
                  mode="aspectFit"
                  @click="preview(img)"
                />

                <!-- 自定义组件 click 无法触发 -->
                <closeBtn @tap="handleDelete(index)"></closeBtn>
              </div>

              <div
                :class="uploading ? 'pointer-events-none' : ''"
                class="w-190 h-190 flex items-center justify-center bg-#ececec"
                @click="handleChooseImage"
              >
                <div class="text-black">
                  <div v-if="!uploading" class="w-86 h-86">
                    <image
                      src="/pagesCustom/static/image.png"
                      mode="scaleToFill"
                      class="w-full h-full"
                    />
                  </div>
                  <i v-else class="eos-icons-bubble-loading text-size-60"></i>
                </div>
              </div>
            </div>
          </uni-forms-item>
        </view>
      </uni-forms>
    </view>
    <button
      :disabled="loading"
      :loading="loading"
      class="h-146 text-36 font-800 leading-146rpx mt-24rpx text-white rounded-0 w-full"
      :style="{ background: buttonBackground[extConfig.project] }"
      @click="submit"
    >
      提交
    </button>

    <uni-popup ref="popup" type="dialog">
      <uni-popup-dialog
        content="确定删除吗？"
        :duration="2000"
        :before-close="true"
        @close="close"
        @confirm="confirm"
      ></uni-popup-dialog>
    </uni-popup>
  </div>
</template>

<script setup>
import { addFeedback } from '@/api/user'
import { fetchFeedbackDepartment, fetchFeedbackType } from '@/api/feedback'
import debounce from 'lodash/debounce'
import { getText, getExtConfig } from '@/service/util'
const { userInfo } = useStore('user')
const extConfig = getExtConfig()
const feedbackDepartment = ref([])
const feedbackType = ref([])
const isComplaint = ref([
  {
    value: 0,
    text: '意见',
  },
  {
    value: 1,
    text: '投诉',
  },
])
const getFeedbackType = async () => {
  const departmentRes = await fetchFeedbackDepartment({ pageSize: 0, pageNum: 0, status: 1 })
  departmentRes.list.forEach((item) => {
    feedbackDepartment.value.push({
      value: item.id,
      text: getText(item.name),
    })
  })
  console.log('&&&', feedbackDepartment.value)
  const typeRes = await fetchFeedbackType({ pageSize: 0, pageNum: 0, status: 1 })
  typeRes.list.forEach((item) => {
    feedbackType.value.push({
      value: item.id,
      text: getText(item.name),
    })
  })
  console.log('@@@', feedbackType.value)
}
getFeedbackType()
const formData = reactive({
  concactPhone: '',
  contactName: '',
  content: '',
  images: '',
  title: '',
  checkStatus: '',
  ifComplaint: '',
  departmentId: '',
  typeId: '',
  userId: '',
})
// ------------------------------------------照片上传----------------------------------------------------
const images = ref([])
const uploading = ref(false)

const handleChooseImage = () => {
  uni.chooseImage({
    count: 1,
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      console.log('%c [ res ]-172', 'font-size:13px; background:pink; color:#bf2c9f;', res)
      const tempFilePaths = res.tempFilePaths

      // images.value.push(tempFilePaths[0])

      uploading.value = true
      uni.uploadFile({
        url: 'https://pres.cleartv.cn/upload',
        fileType: 'image',
        filePath: tempFilePaths[0],
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
  form.value.setValue('images', images.value.join(','))
  popup.value.close()
}

const form = ref()

const loading = ref(false)
// 防抖，防止多次点击
const submit = debounce(
  async () => {
    form.value
      .validate()
      .then((res) => {
        loading.value = true
        res.checkStatus = 0
        res.userId = userInfo.value.phoneNumber
        console.log('表单数据信息：', res)
        addFeedback(res)
          .then((res) => {
            reset()
            console.log('^^^', res)
            uni.showToast({
              title: '提交成功',
              icon: 'none',
            })
            setTimeout(() => {
              uni.navigateBack({
                delta: 1,
              })
            }, 500)
            // eslint-disable-next-line max-nested-callbacks
          })
          .finally(() => {
            loading.value = false
          })
      })
      .catch((err) => {
        console.log('表单错误信息：', err)
      })
  },
  1000,
  {
    leading: true,
  }
)

const reset = () => {
  form.value.clearValidate()

  Object.assign(formData, {
    concactPhone: '',
    contactName: '',
    content: '',
    images: '',
    title: '',
    checkStatus: 0,
    ifComplaint: '',
    departmentId: '',
    typeId: '',
    userId: '',
  })

  images.value = []
  form.value.setValue('images', images.value.join(','))
}
const buttonBackground = {
  kunshanopera: '#D4B685',
  baoquan: 'linear-gradient(135deg, #C5DDA3 0%, #87BE60 100%)',
  shangyouxian: '#79B872',
  liubangguli: 'linear-gradient(135deg, #cb7176 0%, #aa272e 100%)',
}
</script>

<style lang="scss" scoped>
::v-deep .uni-icons {
  color: #cecece !important;
  font-size: 30rpx !important;
  margin-left: 10rpx;
}
::v-deep .uni-forms-item {
  margin-bottom: 0;
}
::v-deep .uni-forms-item__label {
  text {
    font-size: 32rpx;
    line-height: 45rpx;
  }
}
::v-deep .uni-easyinput__content-input {
  font-size: 32rpx;
  line-height: 45rpx;
  color: #000;
}
::v-deep .uni-easyinput__content-textarea {
  font-size: 32rpx;
  line-height: 45rpx;
  color: #000;
}
::v-deep .uni-select__input-placeholder {
  font-size: 32rpx;
  line-height: 45rpx;
  color: #cecece;
}
::v-deep .uni-select {
  border: 0;
  .uni-select__input-box {
    justify-content: flex-end;
    .uni-select__input-placeholder {
      width: auto;
    }
  }
}
::v-deep .uni-stat__actived {
  .uni-select {
    .uni-select__input-box {
      .uni-select__input-text {
        font-size: 32rpx;
        line-height: 45rpx;
        color: #000;
      }
    }
  }
}
::v-deep .uni-select__input-text {
  width: auto;
}
::v-deep .uni-easyinput__content-input {
  text-align: end !important;
}
</style>
