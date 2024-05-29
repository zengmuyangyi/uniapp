<template>
  <view style="height: 100vh">
    <chat
      bind:queryCallback="getQueryCallback"
      bind:openWebview="openWebview"
      bind:openMiniProgram="openMiniProgram"
    />
  </view>
</template>

<script setup>
import { getExtConfig } from '@/service/util'
const extConfig = getExtConfig()
const { userInfo, isLogin } = useStore('user')
const appidList = {
  baoquan: 'QfjFX29zdB5ppobDxX1Z0fCQyXWEJa',
  fanglanhu: 'u2CK1c0gfSE2KwkjWCdL4w2L2pdZWv',
}
// #ifdef MP-WEIXIN
// 智能客服插件初始化
const plugin = requirePlugin('chatbot')
console.log('%%%%', plugin)
plugin.init({
  appid: appidList[extConfig.project], //智能客服平台申请的appID
  openid: userInfo.value?.openId, //用户的openId
  anonymous: true,
  success: () => {},
  fail: (err) => {
    console.log('@@@', err)
  },
  background: '#edf4fa', //页面背景颜色
  guideList: ['景区的特色景点有哪些'], //底部默认问题推荐
  navHeight: 0,
  robotHeader: 'https://pqntourism.pcleartv.cn/FqXQBa6-oEwP0wxV4E1GYOsGAA3P', //客服头像
  textToSpeech: false,
})
// #endif
onLoad(() => {
  if (!isLogin.value) {
    uni.navigateTo({ url: `/pages/common/login/index?from=/pagesCustom/pages/serviceAi/index` })
  }
})
</script>

<style scoped lang="scss">
::v-deep .chat--container {
  display: flex;
  flex-direction: column;
}
::v-deep movable-area {
  flex: 1 1 0%;
}
::v-deep .chatBase--userHeader {
  background: transparent !important;
}
::v-deep .chatBase--right-content {
  background: #ffde77 !important;
}
::v-deep .chatBase--right-arrow {
  border-left: 6px solid #ffde77 !important;
}
::v-deep rich-text {
  font-size: 12px !important;
}
::v-deep .textCard--have_options_title {
  font-size: 12px !important;
}
::v-deep .swiperContent--swiperContentView {
  background: #edf4fa !important;
}
::v-deep .operateCard--operateCard {
  background: #edf4fa !important;
}
::v-deep .operateCard--bottomView {
  background: #edf4fa !important;
}
</style>
