<template>
  <div class="flex flex-col items-center justify-center h-full">
    <img class="w-100 h-100 rounded-full mb-2" :src="currentScenic.logo" alt="景区logo" />
    <div class="text-50 font-bold mb-3">{{ getText(currentScenic.name) }}</div>
    <div class="text-28">申请获取以下权限</div>
    <div class="text-24 text-gray">获取您的手机号，作为用户身份凭证</div>

    <div class="flex flex-col w-full justify-center items-center mt-10">
      <button
        class="bg-blue text-white text-center w-400 rounded"
        open-type="getPhoneNumber"
        @getphonenumber="getPhoneNumber"
      >
        登录
      </button>
      <div class="border border-gray text-gray py-2 text-center w-400 rounded mt-3">取消</div>
    </div>
  </div>
</template>

<script setup>
import { login, getUserInfo, setPhone } from '@/api/user'
import { getText } from '@/service/util'

const { currentScenic, extConfig } = useStore('scenic')
console.log(
  '%c [ currentScenic ]-19',
  'font-size:13px; background:pink; color:#bf2c9f;',
  currentScenic
)

wx.login({
  success(res) {
    console.log('%c [ login res ]-44', 'font-size:13px; background:pink; color:#bf2c9f;', res)
    if (res.code) {
      login({ code: res.code, project: extConfig.value.project }).then(async (res) => {
        console.log('%c [ 登录结果 ]-51', 'font-size:13px; background:pink; color:#bf2c9f;', res)
        uni.setStorageSync('token', res.token)
      })
    } else {
      console.log('登录失败！' + res.errMsg)
    }
  },
})

function getPhoneNumber(e) {
  console.log('%c [ 获取电话 ]-50', 'font-size:13px; background:pink; color:#bf2c9f;', e)

  if (!e.detail.encryptedData) {
    uni.showToast({
      title: '获取手机号失败，无法登录',
      icon: 'none',
    })
  }

  getUserInfo().then(async (res) => {
    console.log('%c [ 用户信息 ]-75', 'font-size:13px; background:pink; color:#bf2c9f;', res)
    if (res.phoneNumber) {
      setTimeout(() => {
        navigateTo({
          url: `mine/index`,
        })
      }, 1000)
    } else {
      await setPhone({
        phoneData: e.detail.encryptedData,
        phoneIv: e.detail.iv,
      })

      setTimeout(() => {
        navigateTo({
          url: `mine/index`,
        })
      }, 1000)
    }
  })
}
</script>

<style lang=""></style>
