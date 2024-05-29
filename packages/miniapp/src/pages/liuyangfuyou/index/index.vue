<template>
  <view class="relative bg-gray-200 min-h-100vh">
    <web-view :src="url" style="height: 100%; width: 100%"> </web-view>
  </view>
</template>

<script setup>
const goShare = () => {
  uni.navigateTo({
    url: '/pages/liuyangfuyou/share/index',
  })
}
const url = ref('https://sndh.lyfy666.com/www/liuyang/#/mainPage')
function uuid(len, radix) {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  const uuid = []
  radix = radix || chars.length
  if (len) {
    for (let i = 0; i < len; i++) {
      uuid[i] = chars[0 | (Math.random() * radix)]
    }
  } else {
    let r
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'
    for (let i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16)
        uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r]
      }
    }
  }
  return uuid.join('')
}
const openId = uuid()
console.log('&&&', openId)
uni.onBeaconUpdate((e) => {
  console.log('蓝牙设备更新', e)
  uni.sendSocketMessage({
    data: JSON.stringify(e),
    success: () => {
      console.log('信息发送成功')
    },
    fail: () => {
      console.log('信息发送失败')
    },
  })
})
uni.onSocketOpen(() => {
  console.log('websocket连接已打开')
})
uni.onSocketError(() => {
  console.log('WebSocket连接打开失败，请检查！')
})
onLoad((options) => {
  if (options?.nodeId) {
    url.value = url.value + `?userId=${openId}&redirect=inNavi&nodeId=${options.nodeId}`
  } else {
    url.value = url.value + `?userId=${openId}`
  }
  // uni.showToast({
  //   title: JSON.stringify(options),
  //   icon: 'none',
  // })
  // console.log('***', options)
})
onShow(() => {
  uni.connectSocket({
    url: `wss://sndh.lyfy666.com:18443/sinan/api/v1/client/message/ws/send?app_id=b1de3f23-2e2b-4971-9f4b-72b399d033fa&open_id=${openId}`,
    success: () => {
      console.log('websocket链接成功')
    },
    fail: () => {
      console.log('websocket链接失败')
    },
  })
  uni.startBeaconDiscovery({
    uuids: ['348f94f9-f4cc-a728-dffb-73538b563317', 'FDA50693-A4E2-4FB1-AFCF-C6EB07647825'],
    success: (res) => {
      console.log('蓝牙获取成功', res)
    },
    fail: (err) => {
      console.log('蓝牙获取失败', err)
    },
  })
})
onHide(() => {
  uni.stopBeaconDiscovery()
  uni.closeSocket()
})
onShareAppMessage(() => {
  const project = UNI_PROJECT || 'default'
  return {
    title: '浏阳妇幼保健院',
    path: `/pages/${project}/index/index`,
  }
})
</script>
