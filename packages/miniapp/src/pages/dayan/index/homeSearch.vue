<template>
  <view class="px-5 py-1 flex items-center">
    <view class="w-68 text-24 text-#275900" @click="handleClick">
      <view class="font-500 leading-28rpx">{{ weatherInfo?.text }}</view>
      <view class="font-500 leading-28rpx">{{ weatherInfo?.temp }}℃</view>
    </view>

    <view class="flex-auto">
      <n-search
        height="s"
        box-style="background-color: rgb(255, 255, 255)"
        bg-type="search"
        value-type="place"
        icon-type="place"
        place-type="place"
        place-icon-type="place"
        placeholder="搜索"
        @confirm="handleSearch"
      ></n-search>
    </view>
  </view>
</template>

<script setup>
import { getMyWeather } from '@/api/weather'
import { navigateTo } from '@/service/util'
const { currentScenic } = useStore('scenic')
const weatherInfo = ref({})

watchEffect(() => {
  getMyWeather('now', currentScenic.value.lng + ',' + currentScenic.value.lat).then(
    (res) => {
      weatherInfo.value = res.data.now
    },
    (err) => {
      uni.showToast({
        title: '获取天气失败',
        icon: 'none',
        mask: true,
      })
    }
  )
})

const handleSearch = (e) => {
  uni.navigateTo({
    url: `/pagesShangyou/pages/scenicList/index?name=${e}`,
  })
}

const handleClick = () => {
  console.log('%c [  ]-53', 'font-size:13px; background:pink; color:#bf2c9f;')

  uni.navigateTo({
    url: `/pages/common/weather/index`,
  })
}
</script>
