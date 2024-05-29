<template>
  <view class="w-full px-20rpx box-border flex justify-between items-center">
    <view
      v-for="(item, index) in tabList"
      :key="index"
      class="w-230 h-158 bg-cover bg-center flex flex-col justify-center items-center"
      style="
        background-image: url('https://pqntourism.pcleartv.cn/FoFTKMdgRxi_0kk47LhKSK8ruEnz');
        backdrop-filter: blur(8px);
      "
      @click="handleClick(item)"
    >
      <image :src="item.icon" mode="scaleToFill" class="w-60 h-60" />
      <view class="text-28 font-bold mt-20rpx text-white siyuan_ht">{{ item.name }}</view>
    </view>
  </view>
</template>

<script setup>
const tabList = ref([
  {
    name: '票务预定',
    icon: 'https://pqntourism.pcleartv.cn/FtXmTWwZ3SzNipDVOdxm9NrVR134',
  },
  {
    name: '智慧导览',
    icon: 'https://pqntourism.pcleartv.cn/Fg0nOlaFyIFh60VHxC3paUUNXvO8',
    url: '/pages/common/map/index',
  },
  {
    name: '游记攻略',
    icon: 'https://pqntourism.pcleartv.cn/Fiub1zx1EFS_6QAECTrsFOy8Uowj',
    url: '/pages/fanglanhu/strategy/list',
  },
])
const handleClick = (item) => {
  if (item.url) {
    uni.navigateTo({
      url: item.url,
    })
  } else if (item.herf) {
    if (item.herf.indexOf('小程序') > -1) {
      uni.navigateToMiniProgram({
        shortLink: item.herf,
        success(res) {
          console.log(res)
        },
      })
    } else if (item.herf.indexOf('?') > -1) {
      const temp = item.herf.split('?')
      uni.navigateTo({
        url: `/pages/common/webLink/index?title=${item.name}&url=${temp[0]}&${temp[1]}`,
      })
    } else {
      uni.navigateTo({ url: `/pages/common/webLink/index?title=${item.name}&url=${item.herf}` })
    }
  } else {
    uni.showToast({ title: '敬请期待', icon: 'none' })
  }
}
</script>

<style lang="scss" scoped></style>
