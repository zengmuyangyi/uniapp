<template>
  <view class="mt-17rpx w-full px-43rpx box-border flex items-center justify-between">
    <view
      v-for="(item, index) in buttonList"
      :key="index"
      @click="handleClick(item)"
      class="flex flex-col items-center"
    >
      <image :src="item.icon" mode="scaleToFill" class="w-140 h-140" />
      <view class="mt-22rpx text-28 leading-40rpx tracking-1rpx font-bold text-#3b220e siyuan_st">{{
        item.name
      }}</view>
    </view>
  </view>
</template>

<script setup>
const buttonList = ref([
  {
    name: '票务预约',
    icon: 'https://pqntourism.pcleartv.cn/FoxsqqYwydvLw6V2m3hpFrlRqf6S',
    herf: 'https://pwx.pcleartv.cn/wxauth/wxlogin?projectName=aqibowuguan',
  },
  {
    name: '展馆介绍',
    icon: 'https://pqntourism.pcleartv.cn/Fn_e8rY6FFfFNte5zjMOqIXD7Nd-',
    url: '/pages/aqibwg/introduction/index',
  },
  {
    name: '文创商城',
    icon: 'https://pqntourism.pcleartv.cn/FvxqIcCSfP1ceDI_jjA_sthWcrWy',
    url: '',
  },
  {
    name: '场馆地图',
    icon: 'https://pqntourism.pcleartv.cn/Fq_g-8JPOsE81NlS6BvYlIBJRAhl',
    url: '/pages/aqibwg/map/index',
  },
])
const handleClick = (item) => {
  if (item.url) {
    uni.navigateTo({
      url: item.url,
    })
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
  } else if (item.herf) {
    if (item.herf.indexOf('?') > -1) {
      const temp = item.herf.split('?')
      uni.navigateTo({
        url: `/pages/common/webLink/index?title=${item.name}&url=${temp[0]}&${temp[1]}`,
      })
    } else {
      uni.navigateTo({ url: `/pages/common/webLink/index?title=${item.name}&url=${item.herf}` })
    }
  } else {
    uni.showToast({ title: '建设中, 敬请期待...', icon: 'none' })
  }
}
</script>

<style lang="scss" scoped></style>
