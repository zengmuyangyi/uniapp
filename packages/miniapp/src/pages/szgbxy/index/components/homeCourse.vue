<template>
  <view class="mt-40rpx w-full px-20rpx box-border">
    <view class="w-full flex justify-between items-center mb-30rpx">
      <view class="flex items-center">
        <image
          src="https://pqntourism.pcleartv.cn/FkKfbpXV5Xz_RJnilFxTmLQ2RB2s"
          mode="scaleToFill"
          class="w-38 h-38 mr-12rpx"
        />
        <view class="text-32 leading-45rpx font-600">精品课程推荐</view>
      </view>
      <view class="flex items-center">
        <view
          class="text-30 leading-42rpx font-400 text-#b10701"
          @click="goTo('/pages/szgbxy/courseOnline/index?isTop=1')"
          >更多</view
        >
        <image
          src="https://pqntourism.pcleartv.cn/Fux8rQApkiD7u83tuQ-uemwDjNdv"
          mode="scaleToFill"
          class="ml-12rpx w-12 h-20"
        />
      </view>
    </view>
    <n-tabs-h
      :value="currentType"
      :is-tap="true"
      :items="typeList"
      :delay="50"
      space="50rpx"
      indicator-height="5rpx"
      text-type="nav-title"
      text-style="font-size: 26rpx; line-height: 37rpx;"
      active-text-type="szgbxy"
      active-text-style="font-weight: 600"
      width="0"
      left="0rpx"
      right="40rpx"
      indicator-width="0"
      indicator-radius="0"
      indicator-style="bottom: 10rpx"
      indicator-type="szgbxy"
      @change="toChangeTab"
    ></n-tabs-h>
    <view class="mt-30rpx w-full flex flex-wrap justify-between">
      <view
        v-for="(item, index) in data"
        :key="index"
        class="w-345 h-408 bg-white rounded-8rpx overflow-hidden mb-20rpx"
        style="box-shadow: 0px 2px 17px 0px rgba(179, 179, 179, 0.5)"
        @click="handleClick(item)"
      >
        <view
          class="w-full h-240 bg-cover bg-center"
          :style="{ backgroundImage: `url(${item.cover})` }"
        ></view>
        <view class="px-18rpx w-full box-border mt-16rpx">
          <view class="w-full font-bold text-26 leading-40rpx tracking-1rpx u-line-2 yahei">{{
            item.name
          }}</view>
        </view>
        <view class="w-full px-18rpx box-border mt-16rpx flex items-center justify-between">
          <view class="text-24 leading-40rpx tracking-1rpx w-200 truncate yahei"
            ><span v-for="(i, k) in item.courseTeacherVOList" :key="k" class="mr-5rpx">{{
              i.name
            }}</span></view
          >
          <view class="text-24 leading-40rpx tracking-1rpx yahei">{{ item.classHours }}学时</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { fetchTopCourse, fetchCourseType } from '@/api/szgbxy'
const currentType = ref(0)
const courseType = ref([])
const data = ref([])

const typeList = computed(() => {
  const temp = courseType.value?.map((item) => {
    return item.name
  })
  return temp
})
//------------------Tab 切换------------------
const toChangeTab = async (i) => {
  currentType.value = i
  getTopCourse()
}
const params = {
  parentId: 0,
}
fetchCourseType(params).then((res) => {
  courseType.value = res
  getTopCourse()
})
const getTopCourse = async () => {
  const params = {
    pageNum: 1,
    pageSize: 6,
    courseTypeId: courseType.value[currentType.value]?.id,
  }
  const res = await fetchTopCourse(params)
  data.value = res.records
}
const handleClick = (item) => {
  uni.navigateTo({
    url: `/pages/szgbxy/course/index?id=${item.id}`,
  })
}

function goTo(url) {
  uni.navigateTo({
    url,
  })
}
</script>

<style lang="scss" scoped></style>
