<template>
  <view class="w-full min-h-100vh bg-#f6f8f7">
    <view class="bg-white">
      <view class="w-full h-120 px-40rpx box-border flex justify-between items-center">
        <view class="text-28 font-400 leading-40rpx tracking-1rpx">头像</view>
        <view
          class="w-88 h-88 rounded-full bg-cover bg-center"
          :style="{
            backgroundImage: `url(${
              userInfo.headImage || 'https://pqntourism.pcleartv.cn/FmVsOQTkf4VJ2CcQPwXOqSMdb_Z4'
            })`,
          }"
        ></view>
      </view>
      <view class="w-full h-120 px-40rpx box-border flex justify-between items-center">
        <view class="text-28 font-400 leading-40rpx tracking-1rpx">姓名</view>
        <view class="text-28 font-400 leading-40rpx tracking-1rpx">{{ userInfo.name }}</view>
      </view>
      <view class="w-full h-120 px-40rpx box-border flex justify-between items-center">
        <view class="text-28 font-400 leading-40rpx tracking-1rpx">性别</view>
        <view class="text-28 font-400 leading-40rpx tracking-1rpx">{{
          userInfo.sex === 1 ? '男' : '女'
        }}</view>
      </view>
      <view class="w-full h-120 px-40rpx box-border flex justify-between items-center">
        <view class="text-28 font-400 leading-40rpx tracking-1rpx">学历</view>
        <view class="text-28 font-400 leading-40rpx tracking-1rpx">{{ userInfo.degree }}</view>
      </view>
      <view class="w-full h-120 px-40rpx box-border flex justify-between items-center">
        <view class="text-28 font-400 leading-40rpx tracking-1rpx">政治面貌</view>
        <view class="text-28 font-400 leading-40rpx tracking-1rpx">{{
          userInfo.politicCountenance
        }}</view>
      </view>
    </view>
    <view class="mt-20rpx bg-white">
      <view class="w-full h-120 px-40rpx box-border flex justify-between items-center">
        <view class="text-28 font-400 leading-40rpx tracking-1rpx">职级</view>
        <view class="text-28 font-400 leading-40rpx tracking-1rpx">{{ userInfo.officeRank }}</view>
      </view>
      <view class="w-full h-120 px-40rpx box-border flex justify-between items-center">
        <view class="text-28 font-400 leading-40rpx tracking-1rpx">所属单位</view>
        <view class="text-28 font-400 leading-40rpx tracking-1rpx">{{
          userInfo.organizationName
        }}</view>
      </view>
    </view>
    <view class="mt-20rpx bg-white">
      <view class="w-full h-120 px-40rpx box-border flex justify-between items-center">
        <view class="text-28 font-400 leading-40rpx tracking-1rpx">手机号</view>
        <view class="text-28 font-400 leading-40rpx tracking-1rpx">{{
          phoneHandel(userInfo.phone)
        }}</view>
      </view>
      <view class="w-full h-120 px-40rpx box-border flex justify-between items-center">
        <view class="text-28 font-400 leading-40rpx tracking-1rpx">账号</view>
        <view class="text-28 font-400 leading-40rpx tracking-1rpx">{{ userInfo.loginName }}</view>
      </view>
      <view
        @click="changePassword"
        class="w-full h-120 px-40rpx box-border flex justify-between items-center"
      >
        <view class="text-28 font-400 leading-40rpx tracking-1rpx">修改登录密码</view>
        <view class="ic-baseline-keyboard-arrow-right w-50 h-50"></view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { phoneHandel } from '@/service/util'
const { userInfo } = useStore('szgbxy')
const changePassword = () => {
  uni.navigateTo({
    url: '/pages/szgbxy/changePassword/index',
  })
}
</script>

<style lang="scss" scoped></style>
