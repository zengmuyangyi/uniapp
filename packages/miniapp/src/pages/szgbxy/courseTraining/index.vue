<template>
  <view class="py-40rpx w-full box-border">
    <view class="w-full px-20rpx box-border">
      <view class="w-full h-90 rounded-8rpx border-2rpx border-solid border-#c30801">
        <uni-search-bar
          v-model="params.trainName"
          cancel-button="none"
          placeholder="请输入课程名称"
          bg-color="#fff"
          style="padding: 0; height: 100%"
          @confirm="handleSearch"
        ></uni-search-bar>
      </view>
    </view>
    <view class="w-full px-20rpx box-border">
      <view class="flex justify-between items-center w-full mt-28rpx">
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
    </view>
    <view class="w-full mt-14rpx">
      <n-list
        ref="list"
        bg-type="none"
        height="window-!150rpx"
        :auto-update="true"
        @down="getCourseList"
        @up="getCourseList"
      >
        <n-list-cell v-for="(item, index) in data" :key="index" class="px-20rpx">
          <view
            class="w-full bg-white rounded-8rpx mb-20rpx overflow-hidden pb-30rpx"
            style="box-shadow: 0rpx 2rpx 17rpx 0rpx rgba(179, 179, 179, 0.5)"
            @click="goCourse(item)"
          >
            <view
              class="w-full h-280 bg-cover bg-center flex"
              :style="{
                backgroundImage: `url(${
                  item.cover || 'https://pqntourism.pcleartv.cn/FvmifyB3WxGWHLuleWMH-y5aoHoU'
                })`,
              }"
            >
              <div
                v-if="!item.cover"
                class="flex-1 p-40rpx pb-100rpx flex justify-center items-center text-#feeea9 text-40rpx text-center"
              >
                {{ item.name }}
              </div>
            </view>

            <view class="px-18rpx w-full">
              <view
                class="mt-17rpx text-28 leading-40rpx font-bold tracking-2rpx w-full u-line-2 yahei"
                >{{ item.name }}</view
              >
              <view class="mt-10rpx text-24 leading-40rpx tracking-1rpx yahei"
                >开班时间：{{ item.trainStartDate + '-' + item.trainEndDate }}</view
              >
              <view class="mt-10rpx text-24 leading-40rpx tracking-1rpx yahei"
                >承办机构：{{ item.promiseOrganization }}</view
              >
              <view class="t-10rpx text-24 leading-40rpx tracking-1rpx flex items-center yahei">
                <view
                  >总学时：<span class="text-#B10701">{{ item.classHours }}</span
                  >学时</view
                >
                <view class="ml-32rpx"
                  >课程总数：<span class="text-#B10701">{{ item.classNums }}</span></view
                >
                <view class="ml-32rpx"
                  >报名人数：<span class="text-#B10701">{{ item.actuallySignUpNum }}</span></view
                >
              </view>
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
              :class="params.trainType === item.id ? 'text-white' : 'text-black'"
              :style="{ backgroundColor: params.trainType === item.id ? '#B10701' : '#F7F8FA' }"
              @click="handleTypeClick(item)"
              >{{ item.name }}</view
            >
          </view>
          <!-- <view class="mt-87rpx w-full">
            <view class="text-26 leading-40rpx font-bold tracking-1rpx mb-20rpx yahei">年份</view>
            <view class="w-full flex flex-wrap justify-between">
              <view
                v-for="(item, index) in yearList"
                :key="index"
                class="w-218 h-80 flex justify-center items-center"
                :class="currentYear === index ? 'text-white' : 'text-black'"
                :style="{ backgroundColor: currentYear === index ? '#B10701' : '#F7F8FA' }"
                @click="handleChangeYear(index)"
                >{{ item }}</view
              >
            </view>
          </view> -->
        </view>
        <view class="w-full flex justify-between fixed bottom-40 left-0 px-32rpx box-border">
          <view
            class="w-218 h-80 border-1rpx border-solid flex justify-center items-center border-#d7d7d7"
            @click="resetClick"
          >
            <view class="text-28 leading-40rpx text-#2d2d2d">重置</view>
          </view>
          <view
            class="w-218 h-80 flex justify-center items-center bg-#B10701"
            @click="confirmClick"
          >
            <view class="text-28 leading-40rpx text-white">确定</view>
          </view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script setup>
import { fetchTrainList } from '@/api/szgbxy'
const defaultParams = () => {
  return {
    // year: '',
    trainType: '',
    trainName: '',
    pageSize: 10,
    pageNum: 1,
  }
}
const params = ref(defaultParams())
const data = ref([])
const list = ref()
const getCourseList = async (cp) => {
  params.value.pageNum = cp
  const res = await fetchTrainList(params.value)
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
  const obj = typeList.value.find((item) => item.id === params.value.trainType)
  // return yearList.value[currentYear.value] + '/' + obj.name
  return obj.name
})
const handleSearch = (e) => {
  params.value.trainName = e.value
  list.value.nRefresh()
}
const typeList = ref([
  {
    name: '全部',
    id: '',
  },
  {
    name: '党校主体班次',
    id: 1,
  },
  {
    name: '专题培训班',
    id: 2,
  },
  {
    name: '专题研修班',
    id: 3,
  },
  {
    name: '菜单式“讲座”',
    id: 4,
  },
  {
    name: '领导干部上讲台',
    id: 5,
  },
])

// --------------------点击父级类别----------------
const handleTypeClick = (item) => {
  params.value.trainType = item.id
}
// --------------年代数据------------
// const yearList = ref([2024, 2023, 2022, 2021])
// const currentYear = ref(0)
// const handleChangeYear = (index) => {
//   currentYear.value = index
// }
// ------------弹窗-----------
const popup = ref()
const handleOpen = () => {
  popup.value.open()
}
// -------------------------进入课程详情---------------
const goCourse = (item) => {
  uni.navigateTo({
    url: `/pages/szgbxy/myTraining/detail?id=${item.id}`,
  })
}
// -------------------------重置筛选------------------
const resetClick = () => {
  // currentYear.value = 0
  params.value = defaultParams()
  uni.showLoading({
    title: '加载中',
    mask: true,
  })
  list.value.nRefresh()
  popup.value.close()
}
// ---------------------------确定筛选-----------------
const confirmClick = () => {
  console.log('***', params.value)
  uni.showLoading({
    title: '加载中',
    mask: true,
  })
  list.value.nRefresh()
  popup.value.close()
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
:deep(.uni-searchbar__box) {
  justify-content: start;
}
</style>
