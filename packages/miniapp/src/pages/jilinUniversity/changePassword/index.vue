<template>
  <view class="w-full min-h-100vh bg-#f6f8f7">
    <uni-forms ref="form" v-model="formData" label-width="75">
      <view class="w-full h-120 px-40rpx box-border flex justify-between items-center">
        <view class="text-28 font-400 leading-40rpx tracking-1rpx">账号</view>
        <view class="text-28 font-400 leading-40rpx tracking-1rpx">{{
          formData.accountnumber
        }}</view>
      </view>
      <view class="w-full h-120 px-40rpx box-border flex justify-between items-center">
        <view class="text-28 font-400 leading-40rpx tracking-1rpx">头像</view>
        <view
          @click="changeHeadImage"
          class="w-88 h-88 rounded-full bg-cover bg-center"
          :class="uploading ? 'pointer-events-none' : ''"
          :style="{
            backgroundImage: `url(${
              formData.headImage || 'https://pqntourism.pcleartv.cn/Fs7BhGhRZZhTB0IDBbjXC65iMcyj'
            })`,
          }"
        >
          <view
            class="w-full h-full bg-black bg-opacity-58 rounded-full flex justify-center items-center"
          >
            <i v-if="uploading" class="eos-icons-bubble-loading text-size-40"></i>
            <image
              v-else
              src="https://pqntourism.pcleartv.cn/FjB31RvBmIqbSKfsBlYvMHjEF4bV"
              mode="scaleToFill"
              class="w-34 h-34"
            />
          </view>
        </view>
      </view>
      <view class="w-full h-120 px-40rpx box-border flex justify-between items-center">
        <uni-forms-item
          label="旧密码"
          name="oldPassword"
          :required="true"
          :rules="[{ required: true, errorMessage: '请输入旧密码' }]"
        >
          <uni-easyinput
            type="password"
            v-model="formData.oldPassword"
            :inputBorder="false"
            placeholder-style="text-align: end;color: #CECECE;font-size: 32rpx; line-height: 45rpx"
            placeholder="请输入旧密码"
          ></uni-easyinput>
        </uni-forms-item>
      </view>
      <view class="w-full h-120 px-40rpx box-border flex justify-between items-center">
        <uni-forms-item
          label="新密码"
          name="newPassword"
          :required="true"
          :rules="[{ required: true, errorMessage: '请输入新密码' }]"
        >
          <uni-easyinput
            type="password"
            v-model="formData.newPassword"
            :inputBorder="false"
            placeholder-style="text-align: end;color: #CECECE;font-size: 32rpx; line-height: 45rpx"
            placeholder="请输入新密码"
          ></uni-easyinput>
        </uni-forms-item>
      </view>
      <view class="w-full h-120 px-40rpx box-border flex justify-between items-center">
        <uni-forms-item
          label="确认密码"
          name="confirmPassword"
          :required="true"
          :rules="[
            { required: true, errorMessage: '请输入确认密码', validateFunction: confirmPassword },
          ]"
        >
          <uni-easyinput
            type="password"
            v-model="formData.confirmPassword"
            :inputBorder="false"
            placeholder-style="text-align: end;color: #CECECE;font-size: 32rpx; line-height: 45rpx"
            placeholder="请再次输入新的密码"
          ></uni-easyinput>
        </uni-forms-item>
      </view>
    </uni-forms>
    <view @click="submit" class="fixed w-full h-90 px-40rpx bottom-30 left-0">
      <view class="w-full h-full flex justify-center items-center bg-#0052D9">
        <view class="font-600 text-white text-30 leading-42rpx">确定</view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { updatePassword } from '@/api/szgbxy'
const { userInfo } = useStore('szgbxy')
const form = ref()
const formData = ref({
  accountnumber: userInfo.value.loginName,
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
  headImage: userInfo.value.headImage,
})
const confirmPassword = (cb, e) => {
  if (e === formData.value.newPassword) {
    if (e === formData.value.oldPassword) {
      cb.errorMessage = '新密码与旧密码一致'
      return false
    } else {
      return true
    }
  } else {
    cb.errorMessage = '两次密码不一致'
    return false
  }
}
const uploading = ref(false)
const changeHeadImage = () => {
  uni.chooseImage({
    count: 1,
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      console.log('%c [ res ]-172', 'font-size:13px; background:pink; color:#bf2c9f;', res)
      const tempFilePaths = res.tempFilePaths
      uploading.value = true
      uni.uploadFile({
        url: 'https://pres.cleartv.cn/upload',
        fileType: 'image',
        filePath: tempFilePaths[0],
        name: 'file',
        success: (res) => {
          const data = JSON.parse(res.data)

          // form.value.setValue('image', data.data.url)
          formData.value.headImage = data.data.url

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
          console.log('%%%%', formData)
        },
      })
    },
  })
}
const submit = () => {
  form.value
    .validate()
    .then((res) => {
      const params = {
        oldLoginPassword: res.oldPassword,
        loginPassword: res.newPassword,
        headImage: formData.value.headImage,
      }
      updatePassword(params)
        .then((res) => {
          uni.showToast({
            title: '密码修改成功',
            icon: 'none',
          })
          setTimeout(() => {
            uni.navigateBack({
              delta: 1,
            })
          }, 2000)
        })
        .catch((err) => {
          uni.showToast({
            title: err.data.msg,
            icon: 'none',
          })
        })
      console.log('表单数据信息：', res)
    })
    .catch((err) => {
      console.log('表单错误信息：', err)
    })
}
</script>

<style lang="scss" scoped>
:deep(.uni-forms-item) {
  margin-bottom: 0;
  width: 100%;
}
:deep(.uni-easyinput__content) {
  background-color: transparent !important;
}
:deep(.uni-input-input) {
  text-align: end;
}
</style>
