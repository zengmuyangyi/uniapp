<template>
  <n-height height="window" class="text-white">
    <image
      class="w-full h-full absolute top-0 left-0 opacity-80"
      src="https://pqntourism.pcleartv.cn/weatherbg.jpg"
      mode="aspectFill"
    />

    <div class="w-690 absolute ab-center">
      <div
        class="h-234 rounded-30rpx white-bg p-40rpx text-34 flex flex-col justify-between content-between"
      >
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <span class="ic-round-location-on"></span> {{ data.liveData.province }}，{{
              data.liveData.city
            }}
          </div>
          <div class="flex items-center">
            <span :class="getImage(data.liveData.weather)" class="mr-18rpx"> </span
            >{{ data.liveData.weather }}
          </div>
        </div>

        <div class="flex justify-between items-center">
          <div class="text-120">24℃</div>
          <div class="text-right">
            {{ data.windpower.text }}{{ data.windpower.data }}<br />
            {{ data.humidity.text }} {{ data.humidity.data }}
          </div>
        </div>
      </div>

      <div class="pt-60rpx px-80rpx white-bg rounded-30rpx mt-37rpx text-34">
        <div v-for="(item, index) in forecast" :key="index" class="flex justify-between pb-50rpx">
          <div>{{ index === 0 ? '今天' : week[item.week] }}</div>
          <div class="flex items-center w-160">
            <span :class="getImage(item.dayweather)" class="mr-18rpx"></span>{{ item.dayweather }}
          </div>
          <div>{{ item.daytemp }}℃</div>
        </div>
      </div>
    </div>

    <!-- <div class="h-full w-full absolute top-0 left-0">
      <div class="absolute left-60 right-60" style="top: 20%">
        <div class="text-center text-50 font-bold mb-10 flex justify-center items-center">
          <span class="ic-baseline-location-on text-60 mr-3"></span>{{ data.City }}
        </div>
        <div class="flex items-start justify-between">
          <div class="flex flex-1 justify-between items-center mr-3">
            <div class="text-60 font-normal">
              {{ data.TempDes_1 }}℃<span class="ml-2" style="font-size: 0.6em">{{
                data.WeatherDes_1
              }}</span>
              <div class="mt-2 flex items-center" style="font-size: 0.6em">
                <span class="ph-wind mr-2"></span> {{ data.WindDirect_1 }}
              </div>
            </div>
          </div>

          <image class="w-264 h-216" :src="data.WeatherIcon_1" mode="scaleToFill" />
        </div>
      </div>
    </div> -->

    <!-- <div
      class="absolute right-30 left-30 flex items-center justify-around bg-white bg-opacity-10 p-2 rounded-2"
      style="bottom: 10%; backdrop-filter: blur(6px)"
    >
      <div>
        <div class="mb-3">{{ day1 }}</div>

        <div class="flex items-start">
          <image class="w-71 h-59 mr-2" :src="data.WeatherIcon_1" mode="scaleToFill" />
          {{ data.WeatherDes_1 }}
        </div>

        <div class="text-center">{{ data.TempDes_1 }}℃~{{ data.TempDes_Low_1 }}℃</div>
      </div>

      <div class="border border-l-gray-300 border-r-gray-400 h-100 opacity-30"></div>

      <div>
        <div class="mb-3">{{ day2 }}</div>

        <div class="flex items-start">
          <image class="w-71 h-59 mr-2" :src="data.WeatherIcon_2" mode="scaleToFill" />
          {{ data.WeatherDes_2 }}
        </div>

        <div class="text-center">{{ data.TempDes_2 }}℃~{{ data.TempDes_Low_2 }}℃</div>
      </div>

      <div class="border border-l-gray-300 border-r-gray-400 h-100 opacity-30"></div>

      <div>
        <div class="mb-3">{{ day3 }}</div>

        <div class="flex items-start">
          <image class="w-71 h-59 mr-2" :src="data.WeatherIcon_3" mode="scaleToFill" />
          {{ data.WeatherDes_3 }}
        </div>

        <div class="text-center">{{ data.TempDes_3 }}℃~{{ data.TempDes_Low_3 }}℃</div>
      </div>
    </div> -->

    <n-position pos="top" box-style="width:750rpx;">
      <div class="text-white">
        <n-height height="status"></n-height>
        <n-height height="nav">
          <div class="flex h-full w-full items-center px-3 justify-center">
            <span class="ic-baseline-arrow-back-ios absolute left-24" @click="handleBack"></span>
          </div>
        </n-height>
      </div>
    </n-position>
  </n-height>
</template>

<script setup>
import AMapWX from '@/service/amap-wx.130'
import { getWeather } from '@/api/weather'
import getImage from './weatherImage'
const week = ['', '周一', '周二', '周三', '周四', '周五', '周六', '周日']

const handleBack = () => {
  uni.navigateBack()
}

const data = ref({
  liveData: {},
  windpower: {},
  humidity: {},
})

const forecast = ref([])

onLoad(() => {
  const { extConfig } = useStore('scenic')

  const cityCode = {
    huluguzhen: '211403',
    yunmengshan: '410622',
    zhumadian: '411700',
    luyao: '610830',
    donganhu: '510108',
  }

  const city = cityCode[extConfig.value.project]
  const myAmapFun = new AMapWX({ key: '02524c7e0e235b38df05914cc0a95876' })

  const getWeatherData = async () => {
    const res = await getWeather('成华区')
    console.log('####', res)
  }
  getWeatherData()

  myAmapFun.getWeather({
    type: 'forecast',
    city,
    success: function (data) {
      forecast.value = data.forecast.casts
      //成功回调
    },
    fail: function (info) {
      //失败回调
      console.log(info)
    },
  })

  myAmapFun.getWeather({
    city,
    success: function (val) {
      data.value = val
      console.log('%c [ 实时天气 ]-120', 'font-size:13px; background:pink; color:#bf2c9f;', val)
      //成功回调
    },
    fail: function (info) {
      //失败回调
      console.log(info)
    },
  })
})
</script>

<style lang="scss">
.ab-center {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
