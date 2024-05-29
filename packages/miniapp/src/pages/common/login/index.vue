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
      <div
        class="border border-gray text-gray py-2 text-center w-400 rounded mt-3"
        @click="handleBack"
      >
        取消
      </div>
    </div>
  </div>
</template>

<script setup>
import { getText, navigateTo } from '@/service/util'
import { onLoad } from '@dcloudio/uni-app'
import { getExtConfig } from '@/service/util'

const extConfig = getExtConfig()
const { currentScenic } = useStore('scenic')
const { setPhone } = useStore('user')
async function getPhoneNumber(e) {
  console.log('%c [ 获取电话 ]-50', 'font-size:13px; background:pink; color:#bf2c9f;', e)

  if (!e.detail.encryptedData) {
    uni.showToast({
      title: '获取手机号失败，无法登录',
      icon: 'none',
    })
    return
  }

  await setPhone(e)

  setTimeout(() => {
    handleBack()
  }, 1000)
}

function handleBack() {
  // uni.navigateBack({
  //   delta: 1,
  // })
  if (extConfig.project === 'eling') {
    navigateTo({
      url: fromUrl.value || '/pages/eling/mine/index',
    })
  } else if (extConfig.project === 'kunshanopera') {
    uni.navigateBack({
      delta: 1,
    })
  } else {
    navigateTo({
      url: fromUrl.value || `mine/index`,
    })
  }
}

const fromUrl = ref('')
onLoad((option) => {
  fromUrl.value = option.from
})
</script>

<style lang=""></style>
