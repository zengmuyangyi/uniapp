<template>
  <view class="relative bg-gray-200 h-full"> 正在支付... </view>
</template>

<script setup>
import { getShopCodeProject } from '@/service/util'
const { userInfo } = useStore('user')
onLoad((options) => {
  if (!options.payparams) return
  const params = JSON.parse(decodeURIComponent(options.payparams))
  setTimeout(() => {
    uni.requestPayment({
      provider: 'wxpay',
      timeStamp: params.timestamp + '',
      nonceStr: params.nonceStr,
      package: params.package,
      signType: params.signType,
      paySign: params.paySign,
      success: function (res) {
        console.log('success:' + JSON.stringify(res))
        uni.navigateTo({
          url: `/pages/shangyouxian/shopping/index?time=${Date.now()}&openId=${
            userInfo.value?.openId
          }&goOrder=yes`,
        })
      },
      fail: function (err) {
        console.log('fail:' + JSON.stringify(err))
      },
    })
  }, 200)
})
</script>

<style scoped lang="scss"></style>
