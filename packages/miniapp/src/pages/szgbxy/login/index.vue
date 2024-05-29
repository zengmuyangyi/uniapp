<template>
  <view class="w-full">
    <view class="w-full h-538">
      <image
        src="https://pqntourism.pcleartv.cn/FpMd2hh506UO2h02g475WLOAxJbG"
        mode="scaleToFill"
        class="w-full h-full"
      />
    </view>
    <accountForm v-if="currentType === 'USERNAME'"></accountForm>
    <phoneForm v-else></phoneForm>
    <view class="flex justify-center items-center mt-40rpx">
      <view
        @click="handleClick('USERNAME')"
        class="text-26 font-400 leading-40rpx tracking-2rpx"
        :style="{ color: currentType === 'USERNAME' ? '#B10701' : '#000' }"
        >账号密码登录</view
      >
      <view class="mx-34rpx w-1 h-29 bg-black"></view>
      <view
        @click="handleClick('MOBILE')"
        class="text-26 font-400 leading-40rpx tracking-2rpx"
        :style="{ color: currentType === 'MOBILE' ? '#B10701' : '#000' }"
        >短信验证码登录</view
      >
    </view>
  </view>
</template>

<script setup>
import accountForm from './components/accountForm.vue'
import phoneForm from './components/phoneForm.vue'
const currentType = ref('USERNAME')
const handleClick = (type) => {
  currentType.value = type
}
provide('identityType', currentType)
</script>

<style lang="scss" scoped>
:deep(.uni-forms-item) {
  margin-bottom: 0;
  width: 100%;
}
:deep(.uni-forms-item__label) {
  display: none;
}
</style>
