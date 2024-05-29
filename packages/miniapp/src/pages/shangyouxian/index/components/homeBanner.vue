<template>
  <view class="w-full h-552 relative">
    <image
      src="https://pqntourism.pcleartv.cn/FtZaMFpwZI64PS69a04bgyNoR2hm"
      mode="scaleToFill"
      class="w-full h-full"
    />
    <view class="absolute top-88 left-32 flex items-center">
      <view class="w-68 text-24 text-#275900">
        <view class="font-500 leading-28rpx">{{ weatherInfo?.text }}</view>
        <view class="font-500 leading-28rpx">{{ weatherInfo?.temp }}℃</view>
      </view>
      <view
        class="ml-26rpx w-490 h-64 bg-white rounded-57rpx border-1 px-26rpx box-border flex items-center border-#e7e7e7"
      >
        <view class="w-44 h-42">
          <image
            src="/static/index/shangyouxian/search.png"
            mode="scaleToFill"
            class="w-full h-full"
          />
        </view>
        <view class="ml-14rpx flex-1">
          <input
            type="text"
            placeholder="搜索热门景区"
            placeholder-style="color: '#999'; font-size: 24rpx"
            @confirm="handleSearch"
          />
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { getMyWeather } from '@/api/weather'
const { currentScenic } = useStore('scenic')
const weatherInfo = ref({})
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
const handleSearch = (e) => {
  uni.navigateTo({
    url: `/pagesShangyou/pages/scenicList/index?name=${e.detail.value}`,
  })
  console.log('%%%', e)
}
</script>
