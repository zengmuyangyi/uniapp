<template>
  <view
    :class="mode ? 'px-0' : 'px-36rpx'"
    class="mt-40rpx w-full box-border flex justify-between items-center"
  >
    <uni-grid v-if="mode" :column="2" class="w-full" :showBorder="false" :square="false">
      <uni-grid-item v-for="(item, index) in buttonList" :key="index">
        <view class="flex flex-col items-center mb-30rpx" @click="handleClick(item)">
          <image :src="item.icon" mode="scaleToFill" class="w-138 h-138" />
          <view class="font-500 leading-32rpx text-34 text-#463f3f">{{ item.name }}</view>
        </view>
      </uni-grid-item>
    </uni-grid>
    <uni-grid v-else :column="4" class="w-full" :showBorder="false" :square="false">
      <uni-grid-item v-for="(item, index) in buttonList" :key="index">
        <view class="flex flex-col items-center" @click="handleClick(item)">
          <image :src="item.icon" mode="scaleToFill" class="w-138 h-138" />
          <view class="font-500 leading-32rpx text-30 text-#463f3f">{{ item.name }}</view>
        </view>
      </uni-grid-item>
    </uni-grid>
  </view>
</template>

<script setup>
const { mode, isLogin } = useStore('user')
const buttonList = ref([
  {
    name: '景区介绍',
    icon: 'https://pqntourism.pcleartv.cn/FuiyVE81YS-s7nWw7BloHfggr_ps',
    url: '/pages/common/scenic/index',
  },
  {
    name: '个人预约',
    icon: 'https://pqntourism.pcleartv.cn/FgVB8jFzH6j0Hzrr8kQgqQa6wKPI',
    shortLink: 'orderPackages/pages/BatchTicketOrderLf',
  },
  {
    name: '团队预约',
    icon: 'https://pqntourism.pcleartv.cn/FtVJzx31VfEem3JCndjTSTVIY-BR',
    shortLink: 'pages/LfOrder',
  },
  {
    name: '我的预约',
    icon: 'https://pqntourism.pcleartv.cn/Fmysxh4OSfXIxEmBmgkous4KlyLO',
    shortLink: 'pages/MyOrders1',
  },
])
const handleClick = (item) => {
  if (item.map) {
    mapData.value = {
      type: 'tab',
      value: item.map.index,
    }
    navigateTo({ url: 'map/index' })
  } else if (item.herf) {
    if (item.herf.indexOf('?') > -1) {
      const temp = item.herf.split('?')
      uni.navigateTo({
        url: `/pages/common/webLink/index?title=${item.name}&url=${temp[0]}&${temp[1]}`,
      })
    } else {
      uni.navigateTo({ url: `/pages/common/webLink/index?title=${item.name}&url=${item.herf}` })
    }
  } else if (item.shortLink) {
    if (item.shortLink.indexOf('小程序') > -1) {
      uni.navigateToMiniProgram({
        shortLink: item.shortLink,
        success(res) {
          console.log(res)
        },
      })
    } else {
      uni.navigateToMiniProgram({
        appId: 'wx34c0c5be57217aae',
        path: item.shortLink,
        success(res) {
          console.log(res)
        },
      })
    }
  } else if (item.url) {
    uni.navigateTo({ url: item.url })
  } else {
    uni.showToast({ title: '正在建设中，敬请期待', icon: 'none' })
  }
}
</script>

<style lang="scss" scoped></style>
