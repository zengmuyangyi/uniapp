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
            <span class="ic-round-location-on"></span>
            {{ cityInfo?.addressComponent?.province }}，{{ cityInfo?.addressComponent?.township }}
          </div>
          <div class="flex items-center">
            <span :class="getImage(dataNew.text)" class="mr-18rpx"> </span>{{ dataNew.text }}
          </div>
        </div>

        <div class="flex justify-between items-center">
          <div class="text-120">{{ dataNew.temp }}℃</div>
          <div class="text-right">
            风力 {{ dataNew.windScale }}级<br />
            湿度 {{ dataNew.humidity }}%
          </div>
        </div>
      </div>

      <div class="pt-60rpx px-80rpx white-bg rounded-30rpx mt-37rpx text-34">
        <div
          v-for="(item, index) in forecastNew"
          :key="index"
          class="flex justify-between pb-50rpx"
        >
          <div>{{ index === 0 ? '今天' : week[item.week] }}</div>
          <div class="flex items-center">
            <span :class="getImage(item.textDay)" class="mr-18rpx"></span>{{ item.textDay }}
          </div>
          <div>{{ item.tempMin + '~' + item.tempMax }}℃</div>
        </div>
      </div>
    </div>

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
import { getMyWeather, getCityInfo } from '@/api/weather'
import getImage from './weatherImage'
const week = ['', '周一', '周二', '周三', '周四', '周五', '周六', '周日']
const { currentScenic } = useStore('scenic')
const handleBack = () => {
  uni.navigateBack()
}

const cityInfo = ref({})
const dataNew = ref({})
const forecastNew = ref([])

onLoad(() => {
  getMyWeather('now', currentScenic.value.lng + ',' + currentScenic.value.lat).then(
    (res) => {
      dataNew.value = res.data.now
    },
    (err) => {
      uni.showToast({
        title: '获取天气失败',
        icon: 'none',
        mask: true,
      })
    }
  )
  getMyWeather('7d', currentScenic.value.lng + ',' + currentScenic.value.lat).then(
    (res) => {
      const nowDay = new Date()
      res.data.daily.forEach((item, index) => {
        item.week =
          nowDay.getDay() + index > 7 ? nowDay.getDay() + index - 7 : nowDay.getDay() + index
      })
      forecastNew.value = res.data.daily.slice(0, 4)
      console.log('###', forecastNew)
    },
    (err) => {
      uni.showToast({
        title: '获取天气失败',
        icon: 'none',
        mask: true,
      })
    }
  )
  getCityInfo(currentScenic.value.lng + ',' + currentScenic.value.lat).then(
    (res) => {
      cityInfo.value = res.data.regeocode
    },
    (err) => {
      uni.showToast({
        title: '获取位置失败',
        icon: 'none',
        mask: true,
      })
    }
  )
})
</script>

<style lang="scss">
.ab-center {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
