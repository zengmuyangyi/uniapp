<template>
  <view class="relative bg-gray-200 h-full">
    <web-view :src="url" style="height: 100%; width: 100%"> </web-view>
  </view>
</template>

<script setup>
const url = ref('')
import { getMallH5BaseUrl } from '@/service/util'
onLoad((options) => {
  const keys = Object.keys(options)
  const mallH5Baseurl = getMallH5BaseUrl()
  keys.forEach((key) => {
    if (key !== 'title' && key !== 'url') {
      if (url.value) {
        url.value = url.value + '&' + key + '=' + options[key]
      } else {
        url.value = options.url + '?' + key + '=' + options[key]
      }
    }
  })
  if (!url.value) {
    url.value = options.url
  }
  if (options.time) {
    /*
    if (options.goOrder) {
      url.value = `https://malldev.pcleartv.cn/frontend/mall-mobile/?v=${options.time}&openId=${options.openId}#/pages/default/userland/myOrder/index?status=`
    } else {
      url.value = `https://malldev.pcleartv.cn/frontend/mall-mobile/?v=${options.time}&openId=${options.openId}#/`
    }
  */
    if (options.goOrder) {
      /*
      url.value = `https://malldev.pcleartv.cn/frontend/mall-mobile/?v=${options.time}&openId=${options.openId}&code=${options.code}&project=${options.project}#/pages/default/userland/myOrder/index?status=`
      */
      url.value = `${mallH5Baseurl}?v=${options.time}&openId=${options.openId}&code=${options.code}&project=${options.project}#/pages/default/userland/myOrder/index?status=`
      // url.value = `https://malldev.pcleartv.cn/frontend/mall-mobile/?v=${options.time}&openId=${options.openId}&code=${options.code}&project=${options.project}#/pages/default/userland/myOrder/index?status=`
    } else {
      url.value = `${mallH5Baseurl}?v=${options.time}&openId=${options.openId}&code=${options.code}&project=${options.project}#/`
      // url.value = `https://malldev.pcleartv.cn/frontend/mall-mobile/?v=${options.time}&openId=${options.openId}&code=${options.code}&project=${options.project}#/`
    }
  }
  console.log('@@@', url.value)
  if (options.title) {
    uni.setNavigationBarTitle({ title: options.title })
  }
})
</script>

<style scoped lang="scss"></style>
