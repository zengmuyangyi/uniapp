<template>
  <view class="w-full px-40rpx box-border mt-34rpx">
    <uni-forms ref="form" v-model="formData" label-width="0" validateTrigger="blur">
      <view
        class="w-full h-90 flex items-center"
        style="box-shadow: inset 0rpx -1rpx 0rpx 0rpx rgba(190, 190, 190, 0.5)"
      >
        <image
          src="https://pqntourism.pcleartv.cn/FraGHuzDR2LkIOVnJU4c-Czkdq5D"
          mode="scaleToFill"
          class="w-46 h-46 flex-shrink-0"
        />
        <uni-forms-item
          name="identifier"
          :required="true"
          :rules="[
            { required: true, errorMessage: '请输入手机号', validateFunction: validatePhone },
          ]"
        >
          <uni-easyinput
            type="number"
            :trim="true"
            v-model="formData.identifier"
            :inputBorder="false"
            placeholder-style="color: #a5a5a5;font-size: 26rpx; line-height: 40rpx"
            placeholder="请输入手机号"
          ></uni-easyinput>
        </uni-forms-item>
      </view>
      <view
        class="w-full h-90 flex items-center mt-20rpx"
        style="box-shadow: inset 0rpx -1rpx 0rpx 0rpx rgba(190, 190, 190, 0.5)"
      >
        <image
          src="https://pqntourism.pcleartv.cn/FtIv-aWStkfKf_nNwbB6T8bmhX-B"
          mode="scaleToFill"
          class="w-46 h-46 flex-shrink-0"
        />
        <uni-forms-item
          name="credential"
          :required="true"
          :rules="[{ required: true, errorMessage: '请输入验证码' }]"
        >
          <uni-easyinput
            type="text"
            v-model="formData.credential"
            :inputBorder="false"
            :trim="true"
            placeholder-style="color: #a5a5a5;font-size: 26rpx; line-height: 40rpx"
            placeholder="请输入短信验证码"
          ></uni-easyinput>
        </uni-forms-item>
        <view class="w-1 h-29 bg-#818181"></view>
        <view
          @click="getCode"
          class="w-136 ml-20rpx flex-shrink-0 flex justify-center"
          :class="countdown ? 'pointer-events-none' : ''"
        >
          <view class="text-26 leading-40rpx font-400 text-#818181">{{
            countdown ? countdown + 's' : '获取验证码'
          }}</view>
        </view>
      </view>
    </uni-forms>
    <view
      @click="handleSubmit"
      class="w-full h-90 flex justify-center items-center mt-54rpx bg-#b10701"
    >
      <view class="text-30 font-600 leading-42rpx text-white tracking-20rpx">登录</view>
    </view>
  </view>
</template>

<script setup>
import { authSmsSend } from '@/api/szgbxy'
const { setToken } = useStore('szgbxy')
const identityType = inject('identityType')
const phoneValidator =
  /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
const form = ref()
const formData = ref({
  identifier: '',
  credential: '',
})
const validatePhone = (cb, e) => {
  if (!e) {
    cb.errorMessage = '请输入手机号'
    return false
  }
  if (!phoneValidator.test(e)) {
    cb.errorMessage = '请输入正确的手机号'
    return false
  }
  return true
}
const countdown = ref(0)
const timer = ref(null)
const getCode = () => {
  if (!phoneValidator.test(formData.value.identifier) || countdown.value) return
  countdown.value = 60
  const params = {
    identitySource: 'APP',
    phone: formData.value.identifier,
  }
  authSmsSend(params).then(
    (res) => {
      uni.showToast({
        title: '短信已发送，注意查收...',
        icon: 'none',
      })
      console.log('&&&', res)
      timer.value = setInterval(() => {
        if (countdown.value) {
          countdown.value--
        } else {
          timer.value = null
        }
      }, 1000)
    },
    (err) => {
      uni.showToast({
        title: err.data.msg,
        icon: 'none',
      })
      console.log('err', err)
      countdown.value = 0
    }
  )
}
const handleSubmit = () => {
  form.value
    .validate()
    .then((res) => {
      const params = {
        ...res,
        identityType: identityType.value,
      }
      console.log('表单数据信息：', params)
      setToken(params)
    })
    .catch((err) => {
      console.log('表单错误信息：', err)
    })
}
</script>

<style lang="scss" scoped></style>
