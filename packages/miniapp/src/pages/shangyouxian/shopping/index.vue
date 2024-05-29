<template>
  <view
    v-if="false"
    id="testView"
    class="relative bg-gray-200 h-full flex justify-center items-center homeBg"
  >
    <view class="text-40 font-bold siyuan_ht">敬请期待...</view>
  </view>
  <div>
    <web-view :src="webviewSrc" style="height: 100%; width: 100%"></web-view>
  </div>
</template>

<script setup>
import { getMallH5BaseUrl } from '@/service/util'
// const webviewSrc = 'https://malldev.pcleartv.cn/frontend/mall-mobile/#/?projectName=demo'
/*
const webviewSrcBase = 'http://192.168.0.68:5173/#/'
*/
// const url = ref('')
// const webviewSrcBase = 'https://malldev.pcleartv.cn/frontend/mall-mobile/#/'

const webviewSrc = ref('')
/*
onShow(() => {
  const shopCode = uni.getStorageSync('shopCode')
  console.log('shopCode', shopCode)
  webviewSrc.value = webviewSrcBase + '?code=' + shopCode + '&project=' + 'demo'
})
*/
import { getCode } from '@/api/user'
import { to } from '@/service/util'
import { getShopCodeProject } from '@/service/util'
const { userInfo } = useStore('user')
onLoad(async (options) => {
  uni.setNavigationBarTitle({ title: '' })
  let codeProjectUrl = ''
  const project = getShopCodeProject()
  // ${options.project}可能获取到shangyouxian，给它写死为demo
  if (options.code) {
    codeProjectUrl = `&code=${options.code}&project=${project}`
  }
  // 若是支付完成的跳转，先获取登录的code，设置好codeProjectUrl
  if (options.goOrder && !options.code) {
    console.log('获取到登录code', code)
    if (!userInfo.value?.openId) {
      uni.showToast({
        title: '请先登录',
        icon: 'none',
      })
      return
    }
    const [wxErr, shopCodeStruct] = await to(getCode())
    const { code } = shopCodeStruct
    if (wxErr) {
      console.log(
        '%c [ 微信登录失败 ]-23',
        'font-size:13px; background:pink; color:#bf2c9f;',
        wxErr
      )
    }
    if (!code) {
      uni.showToast({
        title: '获取code失败',
        icon: 'none',
      })
      return
    }
    uni.setStorageSync('shopCode', code) // + '?code=' + code + '&project=' + project
    codeProjectUrl = `&code=${code}&project=${project}` // 写死demo
  }
  const mallH5url = getMallH5BaseUrl()
  // 确保codeProjectUrl有值后跳转
  if (options.goOrder) {
    // webviewSrc.value = `https://malldev.pcleartv.cn/frontend/mall-mobile/?v=${options.time}${codeProjectUrl}#/pages/default/userland/myOrder/index?status=`
    webviewSrc.value = `${mallH5url}?v=${options.time}${codeProjectUrl}#/pages/default/userland/myOrder/index?status=`
  } else {
    // webviewSrc.value = `https://malldev.pcleartv.cn/frontend/mall-mobile/?v=${options.time}&openId=${options.openId}${codeProjectUrl}#/`
    webviewSrc.value = `${mallH5url}?v=${options.time}&openId=${options.openId}${codeProjectUrl}#/`
  }
  console.log('shopping内嵌地址为', webviewSrc.value)
})

onShow(() => {
  uni.setNavigationBarTitle({ title: '' })
})
</script>
