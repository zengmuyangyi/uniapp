<template>
  <view class="w-full pb-20rpx relative">
    <view
      class="w-full h-450 bg-cover bg-center flex"
      :style="{
        backgroundImage: `url(${
          data.cover || 'https://pqntourism.pcleartv.cn/Fmi-DdWPi7YA4Q2N5-zZcF20gV4d'
        })`,
      }"
    >
      <div
        v-if="!data.cover"
        class="flex-1 p-40rpx pb-100rpx flex justify-center items-center text-#feeea9 text-50rpx text-center"
      >
        {{ data.name }}
      </div>
    </view>

    <view class="w-full px-40rpx box-border">
      <view class="mt-26rpx text-34 font-600 leading-48rpx">{{ data.name }}</view>
      <view class="flex items-center mt-46rpx">
        <image
          src="https://pqntourism.pcleartv.cn/FlnT48WaslJX0nwQAemuOtEyjYME"
          mode="scaleToFill"
          class="w-32 h-32 mr-8rpx"
        />
        <view class="text-32 font-600 leading-45rpx">培训班基本情况</view>
      </view>
      <view class="mt-20rpx text-28 leading-40rpx font-400 tracking-2rpx"
        >开班时间：{{ data.trainStartDate + '-' + data.trainEndDate }}</view
      >
      <view class="mt-20rpx text-28 leading-40rpx font-400 tracking-2rpx"
        >承办机构：{{ data.promiseOrganization }}</view
      >
      <view class="mt-20rpx text-28 leading-40rpx font-400 tracking-2rpx flex items-center">
        <view class="mr-20rpx"
          >总学时：<span class="text-#0052D9">{{ data.classHours }}</span></view
        >
        <view class="mr-20rpx"
          >培训班进度：<span class="text-#0052D9">{{
            data.endedClassNums + '/' + data.classNums
          }}</span></view
        >
      </view>
      <view class="mt-20rpx text-28 leading-40rpx font-400 tracking-2rpx flex items-center">
        <view class="mr-20rpx"
          >课程总数：<span class="text-#0052D9">{{ data.classNums }}</span></view
        >
        <view class="mr-20rpx"
          >已签到课程数：<span class="text-#0052D9">{{ data.isSignUpClassNums }}</span></view
        >
      </view>
      <view class="w-full mt-50rpx">
        <uni-grid
          :column="3"
          :show-border="false"
          :highlight="false"
          :square="false"
          class="w-full"
        >
          <uni-grid-item v-for="(item, index) in tabList" :key="index">
            <view class="flex flex-col items-center" @click="handleClick(item)">
              <image :src="item.icon" mode="scaleToFill" class="w-100 h-100 mb-13rpx" />
              <view class="text-28 font-400 leading-40rpx tracking-2rpx">{{ item.name }}</view>
            </view>
          </uni-grid-item>
        </uni-grid>
      </view>
      <view class="mt-100rpx flex items-center">
        <image
          src="https://pqntourism.pcleartv.cn/FgP84T2iCgiwP9dwQfaKsqkPfRlH"
          mode="scaleToFill"
          class="w-32 h-32 mr-8rpx"
        />
        <view class="text-32 font-600 leading-45rpx">培训内容</view>
      </view>
      <view class="mt-20rpx text-28 leading-40rpx font-400 tracking-2rpx">{{
        data.trainContent
      }}</view>
    </view>
    <view class="h-140 w-full"></view>
    <view v-if="showBack" @click="goBack" class="fixed top-30 left-20">
      <view
        class="text-40 text-white font-400 leading-30rpx tracking-1rpx ic-outline-arrow-back-ios"
      ></view>
    </view>
    <view class="w-full flex justify-center px-40rpx box-border fixed bottom-20">
      <view @click="goAttendance" class="w-full h-100 flex justify-center items-center bg-#0052D9">
        <view class="text-32 text-white font-400 leading-50rpx tracking-1rpx">去签到</view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { fetchTrain, fetchTrainClass } from '@/api/szgbxy'
import dayjs from 'dayjs'
const data = ref({})
const classList = ref([])
const showBack = ref(false)
const tabList = computed(() => {
  if (data.value.trainType === 4) {
    return [
      {
        name: '查看课表',
        icon: 'https://pqntourism.pcleartv.cn/Fp4qgBdn4Hw30XGgDttd655FNO50',
        url: `/pages/jilinUniversity/myTraining/schedule?id=${data.value?.id}`,
      },
      {
        name: '我的签到情况',
        icon: 'https://pqntourism.pcleartv.cn/Fo-RsBjgaMdUEv5clJKrm7brVeHs',
        url: `/pages/jilinUniversity/myTraining/signIn?id=${data.value?.id}`,
      },
    ]
  }
  return [
    {
      name: '查看课表',
      icon: 'https://pqntourism.pcleartv.cn/Fp4qgBdn4Hw30XGgDttd655FNO50',
      url: `/pages/jilinUniversity/myTraining/schedule?id=${data.value?.id}`,
    },
    {
      name: '我的签到情况',
      icon: 'https://pqntourism.pcleartv.cn/Fo-RsBjgaMdUEv5clJKrm7brVeHs',
      url: `/pages/jilinUniversity/myTraining/signIn?id=${data.value?.id}`,
    },
    {
      name: '培训文档上传',
      icon: 'https://pqntourism.pcleartv.cn/FkVfkm_oeljY-w4fQku7lG8gNgOQ',
      url: `/pages/jilinUniversity/myTraining/upload?id=${data.value?.id}&status=${getStatus(
        data.value?.trainStartDate,
        data.value?.trainEndDate
      )}`,
    },
  ]
})
const handleClick = (item) => {
  uni.navigateTo({
    url: item.url,
  })
}
function getStatus(startTime, endTime) {
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
const getTrain = async (id) => {
  const res = await fetchTrain(id)
  data.value = res
  console.log('%%%', res)
}
const goAttendance = () => {
  uni.navigateTo({
    url: `/pages/jilinUniversity/attendance/index?trainId=${data.value?.id}&classId=${classList.value[0]?.classId}`,
  })
}
const goBack = () => {
  uni.switchTab({
    url: '/pages/jilinUniversity/index/index',
  })
}
onLoad((options) => {
  if (options.showBack) {
    showBack.value = true
  }
  getTrain(options.id - 0)
  fetchTrainClass(options.id - 0).then((res) => {
    classList.value = res
  })
})
</script>

<style lang="scss" scoped></style>
