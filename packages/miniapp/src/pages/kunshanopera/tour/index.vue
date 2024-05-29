<template>
  <view id="testView" class="relative bg-gray-200 h-full flex justify-center items-center homeBg">
    <!-- <view class="text-40 font-bold siyuan_ht">敬请期待...</view> -->
    <web-view ref="wbv" :src="url" class="w-full h-full"> </web-view>
  </view>
</template>

<script setup>
const { userInfo, isLogin } = useStore('user')
// 引入定位引擎
import { LocationLib } from '@/service/miniprogram_locationlib_v1.5.0'
// 定位引擎实例
const locationLib = ref(null)
// 定位sdk需要的key, mapId
const key = 'wksN3v5VfZrKwCcQ9dvn'
const mapId = 'ksxqbwg'
// const websocket = new WebSocket(`wss://ly2.pcleartv.cn/sinan/api/v1/client/message/ws/send?app_id=a6c00228-674c-422b-a9c2-d58f6396b441&open_id=xxx`)
// 旅游组网页地址
const url = ref(
  'https://ly2.pcleartv.cn/www/modelBackendPro/#/mobile-view/mainpage2?app_id=a6c00228-674c-422b-a9c2-d58f6396b441'
)
watchEffect(() => {
  if (userInfo.value?.openId) {
    console.log('openId', userInfo.value?.openId)
    // 初始化 locationLib 实例
    locationLib.value = new LocationLib(key, mapId, userInfo.value?.openId)
    // 设置web-view的src，并将openId做为参数传入
    url.value = url.value + `&mapOpenId=${userInfo.value?.openId}`
  }
})
onLoad(() => {
  if (!isLogin.value) {
    navigateTo({ url: 'login/index' })
  }
})
onShow(() => {
  const options = {
    compass: true, //是否开启罗盘，默认true
    uuids: ['FDA50693-B4E2-651C-4F57-C6EB07647825'], //扫描的UUID(必填)
    direction: false, //开启方向回调，需要罗盘开启才能使用 默认 false
    beat: 20, //心跳间隔，默认20秒
  }
  // 在页面onShow时开启定位
  locationLib.value?.start(options)
  // uni.onCompassChange((e) => {
  //   uni.sendSocketMessage({
  //     data: JSON.stringify(e),
  //     fail: () => {
  //       uni.connectSocket({
  //         url: `wss://ly2.pcleartv.cn/sinan/api/v1/client/message/ws/send?app_id=a6c00228-674c-422b-a9c2-d58f6396b441&open_id=${userInfo.value?.openId}`,
  //         success: (e) => {
  //           console.log('websocket连接成功', e)
  //           uni.onSocketOpen(function (res) {
  //             console.log('WebSocket连接已打开！')
  //           })
  //         },
  //         fail: (e) => {
  //           console.log('&&&&', e)
  //         },
  //       })
  //     },
  //   })
  // })
})
onHide(() => {
  // 在页面隐藏时停止定痊
  locationLib.value?.stop()
  console.log('hide')
  // uni.offCompassChange()
})
// setInterval(() => {
//   const position = locationLib.value.getPosition()
//   console.log('%%%%', position)
// }, 1000)
onUnload(() => {
  // 销毁 locationLib
  locationLib.value?.destroy()
})
</script>

<style scoped lang="scss">
.homeBg {
  background-image: url('https://pqntourism.pcleartv.cn/Fmtwn57LNdyiDvOXP5eSzJhvrnnL');
  background-size: 100% 100%;
}

web-view {
  z-index: 10 !important;
}
</style>
