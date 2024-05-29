<template>
  <div class="min-h-full bg-gradient-to-br from-#6ee2f2 to-#396fef p-20rpx">
    <div class="bg-white px-36rpx py-50rpx rounded-10rpx">
      <uni-forms ref="form" v-model="formData" label-position="top" label-width="200">
        <uni-forms-item
          label="姓名"
          name="name"
          :required="true"
          :rules="[{ required: true, errorMessage: '请填写姓名' }]"
        >
          <uni-easyinput v-model="formData.name" type="text" placeholder="请输入活动主题姓名" />
        </uni-forms-item>

        <uni-forms-item
          label="电话"
          name="phone"
          :required="true"
          :rules="[
            {
              errorMessage: '请输入正确的手机号',
              pattern: '^(1[3-9])\\d{9}$',
            },
          ]"
        >
          <uni-easyinput v-model="formData.phone" type="text" placeholder="请输入电话" />
        </uni-forms-item>
        <uni-forms-item
          label="身份证号码"
          name="identity"
          :required="true"
          :rules="[
            {
              errorMessage: '请输入正确的身份证号',
              pattern: '(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)',
            },
          ]"
        >
          <uni-easyinput v-model="formData.identity" type="text" placeholder="请输入身份证号码" />
        </uni-forms-item>

        <uni-forms-item
          label="预定时间"
          name="beginDate"
          :required="true"
          :rules="[{ required: true, errorMessage: '请选择预定时间' }]"
        >
          <uni-datetime-picker
            type="datetime"
            return-type="date"
            v-model="formData.beginDate"
            placeholder="请选择预定时间"
          />
        </uni-forms-item>
        <uni-forms-item
          label="预定数量"
          name="participantsNum"
          :required="true"
          :rules="[{ required: true, errorMessage: '请填写' }]"
        >
          <uni-easyinput
            v-model="formData.participantsNum"
            type="number"
            placeholder="请输入预定数量"
          />
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
  </div>
</template>

<script setup>
import { addActive, updateActive } from '@/api/active'
import debounce from 'lodash/debounce'

const formData = reactive({
  name: '',
  phone: '',
  identity: '',
  beginDate: '',
  participantsNum: 0,
  project: UNI_PROJECT,
  id: '',
})
const edit = ref('add')

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
    name: '',
    phone: '',
    identity: '',
    beginDate: '',
    participantsNum: 0,
    project: UNI_PROJECT,
    id: '',
  })
}
onLoad((options) => {
  if (options.data) {
    const keys = Object.keys(formData)
    const temp = JSON.parse(options.data)
    console.log('%%%', temp)
    keys.forEach((key) => {
      formData[key] = temp[key]
    })
    edit.value = 'update'
  }
})
</script>

<style lang=""></style>
