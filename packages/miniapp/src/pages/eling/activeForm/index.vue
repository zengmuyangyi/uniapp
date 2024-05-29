<template>
  <div class="min-h-full bg-gradient-to-br from-#6ee2f2 to-#396fef p-20rpx">
    <div class="bg-white px-36rpx py-50rpx rounded-10rpx">
      <uni-forms ref="form" v-model="formData" label-position="top" label-width="200">
        <uni-forms-item
          label="活动主题"
          name="title"
          :required="true"
          :rules="[{ required: true, errorMessage: '请填写' }]"
        >
          <uni-easyinput v-model="formData.title" type="text" placeholder="请输入活动主题" />
        </uni-forms-item>

        <uni-forms-item
          label="活动开始时间"
          name="beginDate"
          :required="true"
          :rules="[{ required: true, errorMessage: '请选择活动开始时间' }]"
        >
          <uni-datetime-picker
            type="datetime"
            return-type="date"
            v-model="formData.beginDate"
            placeholder="请选择活动开始时间"
          />
        </uni-forms-item>
        <uni-forms-item
          label="活动结束时间"
          name="endDate"
          :required="true"
          :rules="[{ required: true, errorMessage: '请选择活动结束时间' }]"
        >
          <uni-datetime-picker
            type="datetime"
            return-type="date"
            v-model="formData.endDate"
            placeholder="请选择活动结束时间"
          />
        </uni-forms-item>
        <uni-forms-item
          label="人数"
          name="participantsNum"
          :required="true"
          :rules="[{ required: true, errorMessage: '请填写' }]"
        >
          <uni-easyinput
            v-model="formData.participantsNum"
            type="number"
            placeholder="请输入活动人数"
          />
        </uni-forms-item>
        <uni-forms-item
          label="申请人姓名"
          name="name"
          :required="true"
          :rules="[{ required: true, errorMessage: '请填写' }]"
        >
          <uni-easyinput v-model="formData.name" type="text" placeholder="请输入申请人姓名" />
        </uni-forms-item>

        <uni-forms-item
          label="申请人电话"
          name="phone"
          :required="true"
          :rules="[
            {
              errorMessage: '请输入正确的手机号',
              pattern: '^(1[3-9])\\d{9}$',
            },
          ]"
        >
          <uni-easyinput v-model="formData.phone" type="text" placeholder="请输入申请人电话" />
        </uni-forms-item>

        <uni-forms-item
          :required="true"
          :rules="[
            {
              errorMessage: '请输入正确的手机号',
              pattern: '^(1[3-9])\\d{9}$',
            },
          ]"
          label="上传附件"
          name="file"
        >
          <button :loading="uploading" type="primary" size="mini" @click="handleChooseFile">
            文件上传
          </button>
          <view class="text-#02A7F0 text-28" @click="downLoadFile">申请书模板下载</view>
          <view
            v-for="(item, index) in file"
            :key="index"
            class="flex items-center justify-between text-gray-400 mt-2"
          >
            <view class="truncate">{{ index + 1 + '.' + item.name }}</view>
            <view @click="handleDelete(item)" class="ic-baseline-close flex-shrink-0"></view>
          </view>
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
import { addActive, updateActive } from '@/api/active'
import debounce from 'lodash/debounce'

const formData = reactive({
  title: '',
  reserveDate: '',
  participantsNum: '',
  phone: '',
  name: '',
  project: UNI_PROJECT,
  beginDate: '',
  endDate: '',
  url: '',
  id: '',
})
const edit = ref('add')
// ------------------------------------------文件上传----------------------------------------------------
const file = ref([])
const uploading = ref(false)

const handleChooseFile = () => {
  wx.chooseMessageFile({
    count: 9,
    type: 'all',
    success: (res) => {
      console.log('res', res)
      const tempFilePaths = res.tempFiles[0]
      uploading.value = true
      uni.uploadFile({
        url: 'https://pres.cleartv.cn/upload',
        filePath: tempFilePaths.path,
        name: 'file',
        success: (res) => {
          console.log('%c [ res ]-172', 'font-size:13px; background:pink; color:#bf2c9f;', res)
          const data = JSON.parse(res.data)
          tempFilePaths.path = data.data.url
          file.value.push(tempFilePaths)
          console.log('%%%', file.value)
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

// const preview = (url) => {
//   uni.previewImage({
//     current: url, // 当前显示图片的http链接
//     urls: [url], // 需要预览的图片http链接列表
//   })
// }

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
  file.value.splice(currentDelIndex.value, 1)
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
        if (!file.value?.length) {
          uni.showToast({
            title: '请上传文件',
            icon: 'error',
          })
          return
        } else {
          formData.url = JSON.stringify(file.value)
        }
        console.log('表单数据信息：', formData)
        loading.value = true
        const action = edit.value === 'add' ? addActive : updateActive
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
    title: '',
    reserveDate: '',
    participantsNum: '',
    phone: '',
    name: '',
    project: UNI_PROJECT,
    beginDate: '',
    endDate: '',
    url: '',
    id: '',
  })

  file.value = []
}
// ---------------------------------文件下载-------------------------------
const { currentScenic } = useStore('scenic')
const downLoadFile = () => {
  uni.showLoading({
    title: '下载中',
  })
  uni.downloadFile({
    url: currentScenic.value.templateUrl,
    success: (res) => {
      uni.hideLoading()
      uni.openDocument({
        filePath: res.tempFilePath,
        showMenu: true,
      })
    },
    fail: (error) => {
      uni.hideLoading()
      uni.showToast({
        title: '下载失败',
        icon: 'none',
      })
    },
  })
}
onLoad((options) => {
  if (options.data) {
    const keys = Object.keys(formData)
    const temp = JSON.parse(options.data)
    console.log('%%%', temp)
    keys.forEach((key) => {
      if (key === 'url') {
        file.value = JSON.parse(JSON.stringify(temp[key]))
      } else {
        formData[key] = temp[key]
      }
    })
    edit.value = 'update'
  }
})
</script>

<style lang=""></style>
