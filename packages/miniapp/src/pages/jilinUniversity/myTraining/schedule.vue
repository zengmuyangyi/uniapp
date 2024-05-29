<template>
  <view class="w-full px-40rpx box-border">
    <view class="flex items-center mt-34rpx">
      <image
        src="https://pqntourism.pcleartv.cn/FhVSmeQ-oUi4wpF89WejFDy2oEA2"
        mode="scaleToFill"
        class="w-32 h-32 mr-8rpx"
      />
      <view class="text-32 font-600 leading-45rpx">时间安排</view>
    </view>
    <view v-if="data.length" class="mt-34rpx">
      <view class="w-full">
        <uni-grid :column="6" :show-border="true" :highlight="false" :square="false" class="w-full">
          <uni-grid-item v-for="(item, index) in tabList" :key="index">
            <view class="w-full h-128 flex justify-center items-center bg-#0052D9">
              <view
                class="text-24 font-800 text-white leading-30rpx tracking-1rpx w-104 text-center"
                >{{ item }}</view
              >
            </view>
          </uni-grid-item>
        </uni-grid>
        <uni-grid
          v-for="(item, index) in data"
          :key="index"
          :column="6"
          :show-border="true"
          border-color="#0052D9"
          :highlight="false"
          :square="false"
          class="w-full"
        >
          <uni-grid-item>
            <view class="w-full h-360 flex justify-center items-center bg-#c0d2f1">
              <view class="w-112 text-center text-24 leading-26rpx tracking-1rpx"
                >第{{ index + 1 }}节课</view
              >
            </view>
          </uni-grid-item>
          <uni-grid-item>
            <view class="w-full h-360 flex justify-center items-center bg-white">
              <view class="w-112 text-center text-24 leading-26rpx tracking-1rpx">{{
                item.className
              }}</view>
            </view>
          </uni-grid-item>
          <uni-grid-item>
            <view class="w-full h-360 flex justify-center items-center bg-white">
              <view class="w-112 text-center text-24 leading-26rpx tracking-1rpx">{{
                item.classStartTime
              }}</view>
            </view>
          </uni-grid-item>
          <uni-grid-item>
            <view class="w-full h-360 flex justify-center items-center bg-white">
              <view class="w-112 text-center text-24 leading-26rpx tracking-1rpx">{{
                item.classEndTime
              }}</view>
            </view>
          </uni-grid-item>
          <uni-grid-item>
            <view class="w-full h-360 flex justify-center items-center bg-white">
              <view class="w-112 text-center text-24 leading-26rpx tracking-1rpx">{{
                item.classAddress
              }}</view>
            </view>
          </uni-grid-item>
          <uni-grid-item>
            <view class="w-full h-360 flex justify-center items-center bg-white">
              <view class="w-112 text-center text-24 leading-26rpx tracking-1rpx">
                {{ item.y || '/' }}排{{ item.seatName || '/' }} 座
              </view>
            </view>
          </uni-grid-item>
        </uni-grid>
      </view>
    </view>
    <blank v-else></blank>
  </view>
</template>

<script setup>
import { fetchTrainClass } from '@/api/szgbxy'
const tabList = ref(['', '课程名称', '课程开始时间', '课程结束时间', '培训地点', '座位号'])
const data = ref([])
onLoad((options) => {
  fetchTrainClass(options.id - 0).then((res) => {
    data.value = res
    console.log('&&&', res)
  })
})
</script>

<style lang="scss" scoped>
::v-deep .uni-grid {
  flex-wrap: nowrap;
}
</style>
