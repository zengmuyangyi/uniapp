<template>
  <loading v-show="isLoading"></loading>
  <n-list v-show="!isLoading" bg-type="inverse" :down="null" :up="null" height="window">
    <n-list-cell>
      <view class="px-2 pb-5">
        <map
          class="h-480rpx w-full"
          :show-location="true"
          :longitude="lng"
          :latitude="lat"
          :scale="14"
          :markers="markers"
        ></map>
        <view class="my-2">当前位置（仅供参考）</view>
        <view class="flex items-center">
          <view class="ic-baseline-location-on bg-blue-500"></view>
          <view class="text-40">{{ myLocationDesc.name + myLocationDesc.desc }}</view>
        </view>
        <view class="my-2">离我最近</view>
        <view v-for="(item, index) in markers" :key="index" class="flex justify-between my-2">
          <view>{{ item.name }}</view>
          <view class="flex items-center" @click="planRoute(item)">
            <view>到这去</view>
            <view class="ic-sharp-near-me text-blue-300"></view>
          </view>
        </view>
        <view class="flex justify-around mt-10">
          <view
            v-for="(item, index) in phoneList"
            :key="index"
            class="flex flex-col items-center"
            @click="makePhone(item)"
          >
            <view class="bg-gray-200 rounded-full w-200 h-200 flex justify-center items-center">
              <view class="w-100 h-100" :class="item.icon + ' ' + item.color"></view>
            </view>
            <h2 class="text-red-500">{{ item.title }}</h2>
            <h4 class="text-red-500">呼叫{{ item.phone }}</h4>
          </view>
        </view>
      </view>
    </n-list-cell>
  </n-list>
</template>

<script setup>
import AMapWX from '@/service/amap-wx.130'
let myAmapFun
const lng = ref(0)
const lat = ref(0)
const isLoading = ref(true)
const querytypes = ref([
  {
    id: 1,
    querytype: '090000',
    iconPath: '/static/more/journey/rescue/doctor.png',
  },
  {
    id: 2,
    querytype: '130501',
    iconPath: '/static/more/journey/rescue/police.png',
  },
])
const markers = ref([])
const myLocationDesc = ref({})
const getMap = (location) => {
  // includePoints.value[0] = { latitude: lat.value, longitude: lng.value }
  myAmapFun = new AMapWX({
    key: '02524c7e0e235b38df05914cc0a95876',
  })
  uni.getLocation({
    type: 'gcj02',
    success: ({ longitude, latitude }) => {
      querytypes.value.forEach((item) => {
        myAmapFun.getPoiAround({
          location: longitude + ',' + latitude,
          querytypes: item.querytype,
          iconPathSelected: item.iconPath,
          iconPath: item.iconPath,
          success: function (data) {
            const temp = data.markers.splice(0, 2)
            temp.forEach((item) => {
              item.width = 35
              item.height = 35
            })
            markers.value = [...markers.value, ...temp]
            isLoading.value = false
          },
          fail: function (info) {
            isLoading.value = false
            uni.showToast({
              title: info,
              icon: 'error',
              mask: true,
            })
            console.log(info)
          },
        })
      })
      lng.value = longitude
      lat.value = latitude
      myAmapFun.getRegeo({
        location: longitude + ',' + latitude,
        success: function (data) {
          myLocationDesc.value = data[0]
        },
      })
    },
    fail: (error) => {},
  })
}
const planRoute = (item) => {
  uni.navigateTo({
    url: `/pages/common/location/index?latitude=${item.latitude}&longitude=${item.longitude}&name=${item.name}`,
  })
}
const phoneList = ref([
  { title: '道路救援', phone: '12122', icon: 'ic-outline-local-police', color: 'text-red-400' },
  {
    title: '当地医院',
    phone: '0371-56181799',
    icon: 'ic-outline-local-hospital',
    color: 'text-teal-400',
  },
])
const makePhone = (item) => {
  uni.makePhoneCall({
    phoneNumber: item.phone,
  })
}
getMap()
</script>

<style scoped lang="scss">
a {
  text-decoration: none;
}
</style>
