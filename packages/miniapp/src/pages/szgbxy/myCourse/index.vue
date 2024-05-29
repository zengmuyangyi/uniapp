<template>
  <view class="py-30rpx w-full box-border">
    <view class="flex justify-between items-center w-full px-20rpx">
      <view class="text-26 leading-37rpx">{{ typeStr }}</view>
      <view class="flex items-center" @click="handleOpen">
        <view class="text-26 leading-37rpx">筛选</view>
        <image
          src="https://pqntourism.pcleartv.cn/Fpbd1DdCwW03MWA5Gjmqebnejo_1"
          mode="scaleToFill"
          class="w-25 h-25 ml-12rpx"
        />
      </view>
    </view>
    <view class="w-full mt-14rpx">
      <n-list
        ref="list"
        bg-type="none"
        height="window-!20rpx"
        :auto-update="true"
        @down="getCourseList"
        @up="getCourseList"
      >
        <n-list-cell v-for="(item, index) in data" :key="index" class="px-20rpx">
          <view
            class="w-full bg-white rounded-8rpx mb-20rpx overflow-hidden pb-20rpx relative"
            style="box-shadow: 0rpx 2rpx 17rpx 0rpx rgba(179, 179, 179, 0.5)"
          >
            <view
              class="w-full h-280 bg-cover bg-center"
              :style="{ backgroundImage: `url(${item?.cover})` }"
            ></view>
            <view class="px-18rpx w-full">
              <view
                class="mt-17rpx text-28 leading-40rpx font-bold tracking-2rpx w-full truncate yahei"
                >{{ item.courseName }}</view
              >
              <view class="mt-10rpx flex text-24 leading-40rpx yahei">
                <view>时长：{{ Math.floor(item.duration / 60) }}分钟</view>
                <view class="ml-32rpx">学时：{{ item.classHours }}学时</view>
                <view class="ml-32rpx">评分：{{ item.avgScore || 0 }}</view>
              </view>
              <view class="w-full flex justify-between mt-42rpx">
                <view
                  @click="handleCancel(item)"
                  class="w-328 h-80 border-1rpx border-solid border-#d7d7d7 flex justify-center items-center"
                >
                  <view class="text-26 leading-40rpx tracking-1rpx text-#2d2d2d yahei"
                    >取消选课</view
                  >
                </view>
                <view
                  @click="goCourse(item)"
                  class="w-328 h-80 flex justify-center items-center bg-#B10701"
                >
                  <view class="text-26 leading-40rpx tracking-1rpx text-white font-bold yahei"
                    >进入学习</view
                  >
                </view>
              </view>
            </view>
            <view
              class="w-115 h-51 absolute top-0 left-0 bg-green flex justify-center items-center"
              :style="{ background: statusFormat(item.courseStatus, szgbxyStatusObj, 'color') }"
            >
              <view class="text-22 font-600 text-white leading-36rpx">{{
                statusFormat(item.courseStatus, szgbxyStatusObj, 'name') +
                (item.process ? item.process : '')
              }}</view>
            </view>
          </view>
        </n-list-cell>
      </n-list>
    </view>
    <!-- 筛选弹窗 -->
    <uni-popup ref="popup" type="right">
      <view class="w-510 h-100vh bg-white px-32rpx py-40rpx box-border relative">
        <view class="w-full h-full overflow-y-auto">
          <view class="text-26 leading-40rpx font-bold tracking-1rpx mb-20rpx yahei">类别</view>
          <view class="w-full flex flex-wrap justify-between">
            <view
              v-for="(item, index) in typeList"
              :key="index"
              class="w-218 h-80 flex justify-center items-center mb-10rpx"
              :class="params.courseTypeId === item.id ? 'text-white' : 'text-black'"
              :style="{ backgroundColor: params.courseTypeId === item.id ? '#B10701' : '#F7F8FA' }"
              @click="handleTypeClick(item)"
              >{{ item.name }}</view
            >
          </view>
          <view class="mt-87rpx w-full">
            <view class="text-26 leading-40rpx font-bold tracking-1rpx mb-20rpx yahei">年份</view>
            <view class="w-full flex flex-wrap justify-between">
              <view
                v-for="(item, index) in yearList"
                :key="index"
                class="w-218 h-80 flex justify-center items-center mb-10rpx"
                :class="currentYear === index ? 'text-white' : 'text-black'"
                :style="{ backgroundColor: currentYear === index ? '#B10701' : '#F7F8FA' }"
                @click="handleChangeYear(index)"
                >{{ item ? item : '全部' }}</view
              >
            </view>
          </view>
          <view class="mt-87rpx w-full">
            <view class="text-26 leading-40rpx font-bold tracking-1rpx mb-20rpx yahei">状态</view>
            <view class="w-full flex flex-wrap justify-between">
              <view
                v-for="(item, index) in szgbxyStatusObj"
                :key="index"
                class="w-218 h-80 flex justify-center items-center mb-10rpx"
                :class="params.courseStatus === item.status ? 'text-white' : 'text-black'"
                :style="{
                  backgroundColor: params.courseStatus === item.status ? '#B10701' : '#F7F8FA',
                }"
                @click="handleChangeStatus(item)"
                >{{ item.name }}</view
              >
            </view>
          </view>
        </view>
        <view class="w-full flex justify-between fixed bottom-40 left-0 px-32rpx box-border">
          <view
            @click="resetClick"
            class="w-218 h-80 border-1rpx border-solid flex justify-center items-center border-#d7d7d7"
          >
            <view class="text-28 leading-40rpx text-#2d2d2d">重置</view>
          </view>
          <view
            @click="confirmClick"
            class="w-218 h-80 flex justify-center items-center bg-#B10701"
          >
            <view class="text-28 leading-40rpx text-white">确定</view>
          </view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script setup>
import { fetchMyCourse, fetchCourseType, signUpCancel } from '@/api/szgbxy'
import { statusFormat } from '@/service/util'
import { szgbxyStatusObj } from '@/service/const'
const defaultParams = () => {
  return {
    courseYear: '',
    courseTypeId: '',
    pageSize: 10,
    pageNum: 1,
    courseStatus: '',
  }
}
const params = ref(defaultParams())
const data = ref([])
const list = ref()
const typeList = ref([
  {
    name: '全部',
    id: '',
  },
])
fetchCourseType({ parentId: 0 }).then((res) => {
  typeList.value = [...typeList.value, ...res]
  list.value.nRefresh()
})
const getCourseList = async (cp) => {
  params.value.pageNum = cp
  params.value.courseYear = yearList.value[currentYear.value]
  const res = await fetchMyCourse(params.value)
  console.log('&&&', res)
  if (cp === 1) {
    data.value = res.records
  } else {
    data.value = data.value.concat(res.records)
  }
  uni.hideLoading()
  list.value.nEndSuccess(!!(res.pages > cp))
}
const typeStr = computed(() => {
  const obj = typeList.value.find((item) => item.id === params.value.courseTypeId)
  return (
    (yearList.value[currentYear.value] ? yearList.value[currentYear.value] : '全部') +
    '/' +
    statusFormat(params.value.courseStatus, szgbxyStatusObj, 'name') +
    '/' +
    obj.name
  )
})
// --------------------点击父级类别----------------
const handleTypeClick = (item) => {
  params.value.courseTypeId = item.id
}
// --------------年代数据------------
const yearList = ref(['', 2024, 2023, 2022, 2021])
const currentYear = ref(0)
const handleChangeYear = (index) => {
  currentYear.value = index
}
// ----------------------------状态筛选------------------------
const handleChangeStatus = (item) => {
  params.value.courseStatus = item.status
}
// ------------弹窗-----------
const popup = ref()
const handleOpen = () => {
  popup.value.open()
}
// -------------------------重置筛选------------------
const resetClick = () => {
  uni.showLoading({
    title: '加载中',
    mask: true,
  })
  currentYear.value = 0
  params.value = defaultParams()
  list.value.nRefresh()
  popup.value.close()
}
// ---------------------------确定筛选-----------------
const confirmClick = () => {
  uni.showLoading({
    title: '加载中',
    mask: true,
  })
  list.value.nRefresh()
  popup.value.close()
}
// ---------------------------取消报名课程------------------
const handleCancel = (item) => {
  signUpCancel(item.id)
    .then((res) => {
      uni.showToast({
        title: '取消成功',
        icon: 'none',
      })
      uni.showLoading({
        title: '加载中',
        mask: true,
      })
      list.value.nRefresh()
    })
    .catch((err) => {
      uni.showToast({
        title: err.data.msg,
        icon: 'none',
      })
    })
}
// ------------------------ 进入培训详情-----------------
const goCourse = (item) => {
  uni.navigateTo({
    url: `/pages/szgbxy/course/index?id=${item.id}`,
  })
}
// ---------------------------返回该页面----------------
onShow(() => {
  uni.showLoading({
    title: '加载中',
    mask: true,
  })
  list.value.nRefresh()
})
</script>

<style lang="scss" scoped>
:deep(.uni-searchbar__box) {
  height: 100%;
}
:deep(.uni-popup__wrapper) {
  padding-top: 0 !important;
}
</style>
