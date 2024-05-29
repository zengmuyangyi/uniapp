<template>
  <view>
    <n-tabbar ref="tabbar" :tabs="tabs" :tab-style="tabStyle" @tabClicked="tabbarSwitched">
      <homePage></homePage>

      <tourPage></tourPage>

      <minePage></minePage>
    </n-tabbar>
  </view>
</template>

<script setup>
import homePage from './home.vue'
import tourPage from './tour.vue'
import minePage from './mine.vue'
// wx.login({
//   success(res) {
//     if (res.code) {
//       console.log('%c [ res.code ]-20', 'font-size:13px; background:pink; color:#bf2c9f;', res.code)
//       //发起网络请求
//     } else {
//       console.log('登录失败！' + res.errMsg)
//     }
//   },
// })
const tabs = ref([
  {
    icon: '/static/tabs/album.png',
    selectedIcon: '/static/tabs/albumH.png',
    title: '首页',
    selectedTitle: '首页',
  },
  {
    icon: '/static/tabs/world.png',
    selectedIcon: '/static/tabs/worldH.png',
    title: '导览',
    selectedTitle: '导览',
  },
  {
    icon: '/static/tabs/mine.png',
    selectedIcon: '/static/tabs/mineH.png',
    title: '我的',
    selectedTitle: '我的',
  },
])

const tabStyle = {
  iconStyle: 'width:22px;height:22px;',
  selectedIconStyle: 'width:22px;height:22px;',
  titleStyle: 'font-size:12px;color:#888888;',
  selectedTitleStyle: 'font-size:12px;color:#108EE9;',
  boxStyle: 'background-color: #FFFFFF;',
}

const tabbarSwitched = (val) => {
  const page = val.page
  console.log('%c [ page ]-44', 'font-size:13px; background:pink; color:#bf2c9f;', page)
}
</script>

<style></style>
