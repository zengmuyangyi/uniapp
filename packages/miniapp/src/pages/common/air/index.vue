<template>
  <view class="w-full h-full">
    <n-position pos="top" box-style="width:750rpx;">
      <view class="text-white" style="background-color: #2ebe79">
        <n-height height="status"></n-height>
        <n-height height="nav">
          <div class="flex h-full w-full items-center px-3 text-shadow-sm box-border">
            <span class="ic-baseline-arrow-back-ios text-40 mr-2" @click="handleBack"></span>
            <span>空气质量</span>
          </div>
        </n-height>
      </view>
    </n-position>
    <view
      class="w-full flex justify-center items-center flex-col text-white"
      style="height: calc(100% - 450rpx)"
      :style="{ backgroundColor: airData.bgColor }"
    >
      <view class="text-160">{{ airData.aqi }}</view>
      <view class="text-50">{{ airData.category }}</view>
      <view class="mt-20rpx"
        >{{
          airData.pubTime?.getHours() > 0
            ? airData.pubTime?.getHours()
            : '0' + airData.pubTime?.getHours()
        }}:{{
          airData.pubTime?.getMinutes() > 0
            ? airData.pubTime?.getMinutes()
            : '0' + airData.pubTime?.getMinutes()
        }}更新</view
      >
    </view>
    <view class="w-full h-450rpx px-50rpx py-100rpx box-border flex justify-between items-center">
      <view class="h-full flex flex-col items-center justify-between" style="width: 30%">
        <view class="text-center flex flex-col justify-between" style="height: 40%">
          <view class="text-28 text-gray-400">PM2.5</view>
          <view>{{ airData.pm2p5 }}</view>
        </view>
        <view class="text-center flex flex-col justify-between" style="height: 40%">
          <view class="text-28 text-gray-400">二氧化氮</view>
          <view>{{ airData.no2 }}</view>
        </view>
      </view>
      <view class="w-1 h-80 border-1 border-solid border-#f2f2f2"></view>
      <view class="h-full flex flex-col items-center justify-between" style="width: 30%">
        <view class="text-center flex flex-col justify-between" style="height: 40%">
          <view class="text-28 text-gray-400">PM10</view>
          <view>{{ airData.pm10 }}</view>
        </view>
        <view class="text-center flex flex-col justify-between" style="height: 40%">
          <view class="text-28 text-gray-400">二氧化硫</view>
          <view>{{ airData.so2 }}</view>
        </view>
      </view>
      <view class="w-1 h-80 border-1 border-solid border-#f2f2f2"></view>
      <view class="h-full flex flex-col items-center justify-between" style="width: 30%">
        <view class="text-center flex flex-col justify-between" style="height: 40%">
          <view class="text-28 text-gray-400">一氧化碳</view>
          <view>{{ airData.co }}</view>
        </view>
        <view class="text-center flex flex-col justify-between" style="height: 40%">
          <view class="text-28 text-gray-400">臭氧</view>
          <view>{{ airData.o3 }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
const { currentScenic } = useStore('scenic')
const handleBack = () => {
  uni.navigateBack()
}
const airData = ref({})
const bgColor = ref([
  {
    name: '优',
    bgColor: '#2ebe79',
  },
  {
    name: '良',
    bgColor: '#fbc968',
  },
  {
    name: '轻度污染',
    bgColor: '#ffa623',
  },
  {
    name: '中度污染',
    bgColor: '#d82727',
  },
  {
    name: '重度污染',
    bgColor: '#a719a7',
  },
  {
    name: '严重污染',
    bgColor: '#8E236B',
  },
])
uni.request({
  url: 'https://api.qweather.com/v7/air/now',
  data: {
    key: 'fb71c34f508d4bc48cc78ae6341d2002',
    location: `${currentScenic.value.lng},${currentScenic.value.lat}`,
    method: 'GET',
  },
  success: function (res) {
    if (res.data.code === '200') {
      bgColor.value.forEach((item) => {
        if (item.name === res.data.now.category) {
          res.data.now.bgColor = item.bgColor
          res.data.now.pubTime = new Date(res.data.now.pubTime)
        }
      })
      console.log('$$$', res)
      airData.value = res.data.now
    }
  },
  fail: function (err) {
    console.log('###', err)
  },
})
</script>

<style scoped lang="scss"></style>
