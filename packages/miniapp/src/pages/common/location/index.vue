<template>
  <div class="min-h-full flex justify-center items-center">正在跳转，请稍候</div>
</template>

<script setup>
const needBack = ref(false)
onLoad((options) => {
  console.log('%c [ options ]-10', 'font-size:13px; background:pink; color:#bf2c9f;', options)
  const { longitude, latitude, name } = options

  // eslint-disable-next-line no-undef
  // const plugin = requirePlugin('routePlan')
  // const key = 'HH6BZ-UGZED-MCP4H-PPXH3-JKBDH-EGF5L' //使用在腾讯位置服务申请的key
  // const referer = getText(currentScenic.value.name) //调用插件的app的名称
  // const endPoint = JSON.stringify({
  //   name,
  //   latitude: Number(latitude),
  //   longitude: Number(longitude),
  // })
  // wx.navigateTo({
  //   url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint,
  // })

  uni.openLocation({
    latitude: Number(latitude),
    longitude: Number(longitude),
    scale: 18,
    name,
    complete: () => {
      needBack.value = true
    },
  })
})

onShow(() => {
  if (needBack.value) {
    uni.navigateBack()
  }
})
</script>

<style lang=""></style>
