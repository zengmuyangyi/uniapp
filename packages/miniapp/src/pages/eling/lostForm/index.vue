<template>
  <div class="min-h-full bg-gradient-to-br from-#6ee2f2 to-#396fef p-20rpx">
    <div class="bg-white px-36rpx py-50rpx rounded-10rpx">
      <uni-forms ref="form" v-model="formData" label-position="top" label-width="200">
        <uni-forms-item
          label="姓名"
          name="personName"
          :required="true"
          :rules="[{ required: true, errorMessage: '请填写' }]"
        >
          <uni-easyinput v-model="formData.personName" type="text" placeholder="请输入姓名" />
        </uni-forms-item>

        <uni-forms-item
          label="联系方式"
          name="phone"
          :required="true"
          :rules="[
            {
              errorMessage: '请输入正确的手机号',
              pattern: '^(1[3-9])\\d{9}$',
            },
          ]"
        >
          <uni-easyinput v-model="formData.phone" type="text" placeholder="请输入联系方式" />
        </uni-forms-item>
        <uni-forms-item
          label="遗失位置"
          name="lostAddress"
          :required="true"
          :rules="[{ required: true, errorMessage: '请输入' }]"
        >
          <uni-easyinput v-model="formData.lostAddress" type="text" placeholder="请输入遗失位置" />
        </uni-forms-item>
        <uni-forms-item
          label="遗失日期"
          name="lostTime"
          :required="true"
          :rules="[{ required: true, errorMessage: '请选择遗失日期' }]"
        >
          <uni-datetime-picker
            type="datetime"
            return-type="date"
            v-model="formData.lostTime"
            placeholder="请选择遗失日期"
          />
        </uni-forms-item>
        <uni-forms-item
          label="物品类型"
          name="goodsName"
          :required="true"
          :rules="[{ required: true, errorMessage: '请输入' }]"
        >
          <uni-easyinput v-model="formData.goodsName" type="text" placeholder="请输入物品类型" />
        </uni-forms-item>
        <uni-forms-item
          label="物品描述"
          name="describe"
          :required="true"
          :rules="[{ required: true, errorMessage: '请输入' }]"
        >
          <uni-easyinput v-model="formData.describe" type="textarea" placeholder="请输入物品描述" />
        </uni-forms-item>

        <uni-forms-item label="图片（选填，提供问题照片）" name="images">
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
              class="w-140 h-140 border-1 border-gray-200 rounded-10rpx flex items-center justify-center"
              @click="handleChooseImage"
            >
              <div class="text-gray-400">
                <i v-if="!uploading" class="ic-baseline-camera-alt text-size-60"></i>
                <i v-else class="eos-icons-bubble-loading text-size-40"></i>
              </div>
            </div>
          </div>
        </uni-forms-item>
      </uni-forms>

      <button
        :disabled="loading"
        :loading="loading"
        class="bg-gradient-to-br from-#6ee2f2 to-#396fef h-80 text-30 mt-10px text-white rounded-full"
        @click="submit"
      >
        提交
      </button>
    </div>

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
import { addLost, updateLost } from '@/api/lost'
import debounce from 'lodash/debounce'

const formData = reactive({
  phone: '',
  describe: '',
  // images: '',
  personName: '',
  lostAddress: '',
  lostTime: '',
  goodsName: '',
  project: UNI_PROJECT,
  status: '0',
  detail: '',
})
const edit = ref('add')

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
        console.log('表单数据信息：', formData)
        loading.value = true
        const action = edit.value === 'add' ? addLost : updateLost
        action(formData)
          .then((res) => {
            console.log('###', res)
            reset()

            uni.showToast({
              title: '提交成功',
              icon: 'none',
            })

            // eslint-disable-next-line max-nested-callbacks
            setTimeout(() => {
              uni.navigateBack({
                delta: 1,
              })
            }, 500)
          })
          .finally(() => {
            loading.value = false
          })
      })
      .catch((err) => {
        console.log('表单错误信息：', err)
      })
  },
  500,
  {
    leading: true,
  }
)

const reset = () => {
  form.value.clearValidate()

  Object.assign(formData, {
    phone: '',
    describe: '',
    // images: '',
    personName: '',
    lostAddress: '',
    lostTime: '',
    goodsName: '',
    project: UNI_PROJECT,
    status: '0',
    detail: '',
  })

  images.value = []
  form.value.setValue('images', images.value.join(','))
}
onLoad((options) => {
  if (options.data) {
    const keys = Object.keys(formData)
    const temp = JSON.parse(options.data)
    keys.forEach((key) => {
      formData[key] = temp[key]
    })
    edit.value = 'update'
  }
})
</script>

<style lang=""></style>
