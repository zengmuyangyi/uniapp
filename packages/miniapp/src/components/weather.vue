<template>
  <view class="w-full px-30rpx my-20rpx box-border" @click="goDetail">
    <view
      class="w-full h-174 py-30rpx pl-30rpx box-border flex flex-col justify-between text-white weather"
    >
      <view class="text-26 flex items-center">
        <view class="leading-37rpx">当前天气</view>
        <view class="w-1 h-20 bg-white ml-12rpx mr-20rpx"></view>
        <image
          src="https://pqntourism.pcleartv.cn/Fr0xdspr15Xq0r5sZWoGWyqeBRkC"
          mode="scaleToFill"
          class="w-21 h-26 mr-11rpx"
        />
        <view v-if="locationInfo?.addressComponent" class="leading-37rpx"
          >{{ locationInfo?.addressComponent?.province }}，{{
            locationInfo?.addressComponent?.township
          }}</view
        >
      </view>
      <view class="flex">
        <image
          src="https://pqntourism.pcleartv.cn/Fopx-YewHBUx3EYAgETBZ5ce0Fm1"
          mode="scaleToFill"
          class="w-67 h-60 mr-11rpx"
        />
        <view class="text-68 leading-68rpx font-bold mr-15rpx siyuan_ht">{{
          weatherInfo.temp
        }}</view>
        <view class="text-22 flex flex-col justify-between">
          <view class="leading-30rpx">{{ weatherInfo.text }}</view>
          <view class="leading-30rpx">℃</view>
        </view>
        <view class="ml-86rpx text-22 flex flex-col justify-between">
          <view class="leading-30rpx"
            >湿度：<text class="font-bold">{{ weatherInfo.humidity }}%</text></view
          >
          <view class="leading-30rpx"
            >风速：<text class="font-bold"
              >{{ weatherInfo.windDir + weatherInfo.windScale }}级</text
            ></view
          >
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
const { weatherInfo, locationInfo } = useStore('scenic')
const goDetail = () => {
  uni.navigateTo({
    url: '/pages/common/weather/index',
  })
}
</script>

<style scoped lang="scss">
.weather {
  background-image: url('https://pqntourism.pcleartv.cn/FpKkEoTEEIKnGR5cPLT5mNWBp-O0');
  background-size: 100% 100%;
}
</style>
