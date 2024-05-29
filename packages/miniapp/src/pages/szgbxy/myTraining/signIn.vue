<template>
  <view class="w-full px-40rpx box-border">
    <view class="flex items-center mt-34rpx">
      <image
        src="https://pqntourism.pcleartv.cn/Fj4t_f1pOB8IgJhIpVa0ZtGiG8lt"
        mode="scaleToFill"
        class="w-32 h-32 mr-8rpx"
      />
      <view class="text-32 font-600 leading-45rpx">我的签到情况</view>
    </view>
    <view class="mt-34rpx">
      <view class="w-full">
        <uni-grid :column="5" :showBorder="true" :highlight="false" :square="false" class="w-full">
          <uni-grid-item v-for="(item, index) in tabList" :key="index">
            <view class="w-full h-128 flex justify-center items-center bg-#c30801">
              <view
                class="text-24 font-800 text-white leading-30rpx tracking-1rpx w-104 text-center"
                >{{ item }}</view
              >
            </view>
          </uni-grid-item>
        </uni-grid>
        <uni-grid
          :column="5"
          :showBorder="true"
          borderColor="#C30801"
          :highlight="false"
          :square="false"
          class="w-full"
          v-for="(item, index) in data"
          :key="index"
        >
          <uni-grid-item>
            <view class="w-full h-360 flex justify-center items-center bg-#FFF2F2">
              <view class="w-112 text-center text-24 leading-26rpx tracking-1rpx"
                >第{{ index + 1 }}节课</view
              >
            </view>
          </uni-grid-item>
          <uni-grid-item>
            <view class="w-full h-360 flex justify-center items-center bg-white">
              <view class="w-112 text-center text-24 leading-26rpx tracking-1rpx">{{
                item.trainName
              }}</view>
            </view>
          </uni-grid-item>
          <uni-grid-item>
            <view class="w-full h-360 flex justify-center items-center bg-white">
              <view class="w-112 text-center text-24 leading-26rpx tracking-1rpx">{{
                statusFormat(
                  getStatus(item.classStartTime, item.classEndTime),
                  szgbxyStatusObj,
                  'name'
                )
              }}</view>
            </view>
          </uni-grid-item>
          <uni-grid-item>
            <view class="w-full h-360 flex justify-center items-center bg-white">
              <view
                class="w-112 text-center text-24 leading-26rpx tracking-1rpx"
                :style="{ color: item.isSignUp ? '#4A8E20' : '#C30801' }"
                >{{ item.isSignUp ? '已签到' : '未签到' }}</view
              >
            </view>
          </uni-grid-item>
          <uni-grid-item>
            <view class="w-full h-360 flex justify-center items-center bg-white">
              <view class="w-112 text-center text-24 leading-26rpx tracking-1rpx">{{
                item.signUpTime ? item.signUpTime : '/'
              }}</view>
            </view>
          </uni-grid-item>
        </uni-grid>
      </view>
    </view>
  </view>
</template>

<script setup>
import dayjs from 'dayjs'
import { fetchTrainClass } from '@/api/szgbxy'
import { szgbxyStatusObj } from '@/service/const'
import { statusFormat } from '@/service/util'
const tabList = ref(['', '课程名称', '课程进度', '签到情况', '签到时间'])
const data = ref([])
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
onLoad((options) => {
  fetchTrainClass(options.id - 0).then((res) => {
    data.value = res
    console.log('&&&', res)
  })
})
</script>

<style lang="scss" scoped></style>
