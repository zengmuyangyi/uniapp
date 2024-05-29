<template>
  <view class="h-full">
    <view class="w-full h-full relative bg-no-repeat">
      <view class="w-full h-full bg-no-repeat">
        <n-list :down="null" :up="null" height="screen-!80rpx" bg-type="none">
          <n-list-cell>
            <view class="w-full flex flex-col items-center">
              <view class="text-36 leading-50rpx font-600 mt-100rpx">{{
                data?.trainName || '未报名课程'
              }}</view>
              <view
                class="mt-20rpx text-34 font-400 leading-48rpx text-center w-full px-40rpx box-border"
                >{{ data?.className || '未报名课程' }}</view
              >
              <view
                @click="handleClick"
                class="mt-50rpx w-270 h-270 flex justify-center items-center bg-cover bg-center rounded-full"
                style="
                  background: linear-gradient(180deg, #014dfe 0%, #1e87ef 100%);
                  box-shadow: 0rpx 6rpx 27rpx 3rpx rgba(0, 82, 217, 0.14);
                "
              >
                <view
                  v-if="data?.isSignUp"
                  class="text-36 text-white font-600 leading-50rpx tracking-1rpx"
                  >已签到</view
                >
                <view
                  v-else-if="!isInArea"
                  class="text-36 text-white font-600 leading-50rpx tracking-1rpx"
                  >不在签到范围</view
                >
                <view v-else class="text-36 text-white font-600 leading-50rpx tracking-1rpx">{{
                  getStatus(data?.classCanSignUpStartTime, data?.classCanSignUpEndTime) === 2
                    ? '上课签到'
                    : '未到签到时间'
                }}</view>
              </view>
              <view class="mt-10rpx text-28 leading-40rpx font-400 tracking-2rpx">{{
                dayjs(dayTime).format('YYYY年MM月DD日 HH:mm:ss')
              }}</view>
              <view class="mt-50rpx w-650">
                <view class="text-28 font-400 leading-72rpx tracking-2rpx">签到说明：</view>
                <view class="text-28 font-400 leading-72rpx tracking-2rpx"
                  >1、签到需调用位置信息，请确保定位服务已打开</view
                >
                <view class="text-28 font-400 leading-72rpx tracking-2rpx"
                  >2、请在规定时间内签到，签到时间范围：</view
                >
                <view
                  v-if="data?.classCanSignUpStartTime"
                  class="text-28 font-400 leading-72rpx tracking-2rpx text-#1A80F0"
                  >{{
                    dayjs(data.classCanSignUpStartTime).format('YYYY年MM月DD日 HH:mm:ss') +
                    '-' +
                    dayjs(data.classCanSignUpEndTime).format('HH:mm:ss')
                  }}</view
                >
                <view
                  v-else-if="data?.classStartTime"
                  class="text-28 font-400 leading-72rpx tracking-2rpx text-#1A80F0"
                  >{{
                    dayjs(dayjs(data.classStartTime).unix() - 60 * 60 * 1000).format(
                      'YYYY年MM月DD日 HH:mm:ss'
                    ) +
                    '-' +
                    dayjs(dayjs(data.classStartTime).unix() + 30 * 60 * 1000).format('HH:mm:ss')
                  }}</view
                >
                <view v-else class="text-28 font-400 leading-72rpx tracking-2rpx text-#1A80F0"
                  >您未报名该课程</view
                >
              </view>
              <view @click="handleDetail" class="w-full flex justify-center mt-40rpx">
                <view
                  class="w-300 h-80 flex justify-center items-center"
                  style="background: linear-gradient(90deg, #014dfe 0%, #1e87ef 100%)"
                >
                  <view class="text-32 text-white font-400 leading-50rpx tracking-1rpx"
                    >查看培训班详情</view
                  >
                </view>
              </view>
            </view>
          </n-list-cell>
        </n-list>
      </view>
    </view>
  </view>
</template>

<script setup>
import { fetchTrainClass, signInClass } from '@/api/szgbxy'
import { getDistance } from '@/service/util'
import dayjs from 'dayjs'
const dayTime = ref(new Date())
const data = ref({})
const trainId = ref(0)
const classId = ref(0)
const isInArea = ref(false)
const handleClick = () => {
  if (!isInArea.value) {
    uni.showToast({
      title: '不在签到范围',
      icon: 'none',
    })
    return
  }
  if (data.value?.isSignUp) {
    uni.showToast({
      title: '请勿重复签到',
      icon: 'none',
    })
    return
  }
  if (getStatus(data.value?.classCanSignUpStartTime, data.value?.classCanSignUpEndTime) === 2) {
    uni.showLoading({
      title: '签到中...',
      mask: true,
    })
    const params = {
      trainId: trainId.value,
      classId: classId.value,
    }
    signInClass(params)
      .then((res) => {
        uni.showToast({
          title: '签到成功',
          icon: 'none',
        })
        fetchTrainClass(trainId.value).then((res) => {
          data.value = res.find((item) => item.classId === classId.value)
        })
      })
      .catch((err) => {
        uni.showToast({
          title: err.data.msg,
          icon: 'none',
        })
      })
      .complete(() => {
        uni.hideLoading()
      })
  } else {
    uni.showToast({
      title: '未到签到时间',
      icon: 'none',
    })
    return
  }
}
function getStatus(startTime, endTime) {
  if (!startTime && !data.value?.classStartTime) return 1
  if (!startTime || !endTime) {
    if (dayjs(Date.now()).unix() < dayjs(data.value.classStartTime).unix() - 60 * 60 * 1000) {
      return 1
    } else if (
      dayjs(Date.now()).unix() > dayjs(data.value.classStartTime).unix() - 60 * 60 * 1000 &&
      dayjs(Date.now()) < dayjs(data.value.classStartTime).unix() + 30 * 60 * 1000
    ) {
      return 2
    }
    return 3
  }
  if (dayjs(Date.now()).unix() < dayjs(startTime).unix()) {
    return 1
  } else if (
    dayjs(Date.now()).unix() > dayjs(startTime).unix() &&
    dayjs(Date.now()) < dayjs(endTime)
  ) {
    return 2
  }
  return 3
}
setInterval(() => {
  dayTime.value = new Date()
}, 1000)
const handleDetail = () => {
  uni.navigateTo({
    url: `/pages/jilinUniversity/myTraining/detail?id=${trainId.value}&showBack=1`,
  })
}
onLoad((options) => {
  trainId.value = Number(options.trainId)
  classId.value = Number(options.classId)
})
onShow(() => {
  uni.showLoading({
    title: '位置获取中，请稍候...',
    mask: true,
  })
  fetchTrainClass(trainId.value).then((res) => {
    if (!res.length) {
      uni.hideLoading()
      uni.showToast({
        title: '您未报名该课程',
        icon: 'none',
      })
      return
    }
    data.value = res.find((item) => item.classId === classId.value)
    uni.getLocation({
      success: (res) => {
        console.log(
          '###',
          getDistance(
            { lat1: res.latitude, lng1: res.longitude },
            { lat2: data.value.latitude, lng2: data.value.longitude }
          )
        )
        if (
          getDistance(
            { lat1: res.latitude, lng1: res.longitude },
            { lat2: data.value.latitude, lng2: data.value.longitude }
          ) > 5000
        ) {
          isInArea.value = false

          uni.hideLoading()
          uni.showToast({
            title: '您未在课程签到范围',
            icon: 'none',
          })
        } else {
          isInArea.value = true
          uni.hideLoading()
          uni.showToast({
            title: '位置获取成功',
            icon: 'none',
          })
        }
      },
      fail: (err) => {
        uni.hideLoading()
        uni.showToast({
          title: '获取位置信息失败，请检查设备是否开启定位服务',
          icon: 'none',
        })
      },
    })
    console.log('@@@', data)
  })
})
</script>

<style lang="scss" scoped></style>
