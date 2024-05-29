<template>
  <view class="w-full px-20rpx box-border mt-30rpx">
    <view
      class="w-full bg-white rounded-12rpx px-10rpx py-13rpx box-border flex justify-between items-center"
    >
      <view
        v-for="(item, index) in buttonList"
        :key="index"
        class="flex flex-col items-center"
        @click="goPage(item)"
      >
        <image :src="item.icon" mode="scaleToFill" class="w-130 h-130" />
        <view class="text-26 leading-37rpx">{{ item.name }}</view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { computed } from 'vue'

// POI类型code映射类型id
const POIType = inject('POIType', '')
const buttonList = computed(() => {
  return [
    {
      name: '景区景点',
      icon: 'https://pqntourism.pcleartv.cn/FiGaIce7bY3nF_z540BsaVOmbF-U',
      url: `/pages/fanglanhu/scenicList/index?typeId=${POIType.value['景点']}`,
    },
    {
      name: '酒店民宿',
      icon: 'https://pqntourism.pcleartv.cn/FtmZ39rg2qnxoAPkfT1hYIewqOTM',
    },
    {
      name: '慢直播',
      icon: 'https://pqntourism.pcleartv.cn/FvNQHEvJzEXkppYLAdhk8Msc1Ep6',
      herf: 'http://livestream.zmdtvw.cn/appmzb/slowlive.html?id=9',
    },
    {
      name: '景区资讯',
      icon: 'https://pqntourism.pcleartv.cn/FmwgN_UCklxKNN-In3hmFMbUKwRv',
      url: `/pages/fanglanhu/newsList/index`,
    },
    {
      name: '更多',
      icon: 'https://pqntourism.pcleartv.cn/Fshn4TMckFq2eszacFCn-ZFo9xvW',
      url: `/pages/fanglanhu/more/index`,
    },
  ]
})

const goPage = (item) => {
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
