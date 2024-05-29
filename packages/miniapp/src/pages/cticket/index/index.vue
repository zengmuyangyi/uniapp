<template>
  <div class="min-h-100vh bg-#f2f6fe text-#3e3e3e">
    <div>
      <banner></banner>

      <div class="p-20rpx">
        <button class="uni-btn md primary" @click="foobarHandler">我的订单</button>
      </div>
    </div>

    <div class="p-10px">
      <scenicList></scenicList>
    </div>

    <ticketList></ticketList>

    <div class="h-40rpx"></div>
  </div>
</template>

<script setup>
import banner from './banner.vue'
import scenicList from './scenicList.vue'
import ticketList from './ticketList.vue'

const currentScenic = ref()
provide('currentScenic', currentScenic)

const foobarHandler = () => {
  console.log('跳转我的订单页面')
  uni.navigateTo({
    url: '/pages/cticket/myOrder/index',
  })
}
// TODO: [x] 隐藏登录按钮，每次进入自动登录
// TODO: [x] 我的订单路由
// TODO: [ ] “更多日期”找个vue3下能用的小程序日历组件
// TODO: [ ] 二维码转图片
// TODO: [ ] 订单中多个二维码swipe切换
</script>

<style lang="scss"></style>
