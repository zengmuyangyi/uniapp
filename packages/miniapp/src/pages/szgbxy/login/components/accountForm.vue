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
          :rules="[{ required: true, errorMessage: '请输入账号或手机号' }]"
        >
          <uni-easyinput
            type="text"
            :trim="true"
            v-model="formData.identifier"
            :inputBorder="false"
            placeholder-style="color: #a5a5a5;font-size: 26rpx; line-height: 40rpx"
            placeholder="请输入账号或手机号"
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
          :rules="[{ required: true, errorMessage: '请输入密码' }]"
        >
          <uni-easyinput
            type="password"
            v-model="formData.credential"
            :inputBorder="false"
            :trim="true"
            placeholder-style="color: #a5a5a5;font-size: 26rpx; line-height: 40rpx"
            placeholder="请输入密码"
          ></uni-easyinput>
        </uni-forms-item>
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
const { setToken } = useStore('szgbxy')
const identityType = inject('identityType')
const formData = ref({
  identifier: '',
  credential: '',
})
const form = ref()
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
