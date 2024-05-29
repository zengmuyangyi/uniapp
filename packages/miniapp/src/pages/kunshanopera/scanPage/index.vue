<template>
  <view></view>
</template>
<script setup>
const on = ref(true)
onShow(() => {
  if (on.value) {
    uni.scanCode({
      success: (e) => {
        const tempArr = e.result.split('?')
        uni.navigateTo({
          url: '/pages/kunshanopera/patrimonyDetail/index?' + tempArr[1],
        })
      },
      fail: () => {
        console.log('扫码失败')
        uni.switchTab({
          url: '/pages/kunshanopera/index/index',
        })
      },
    })
  }
})
onHide(() => {
  on.value = !on.value
})
</script>
