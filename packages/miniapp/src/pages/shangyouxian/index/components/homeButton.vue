<template>
  <view class="px-20rpx w-full box-border">
    <view
      class="w-full h-180 bg-white rounded-24rpx px-8rpx py-9rpx box-border"
      style="box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1)"
    >
      <view class="w-full h-full rounded-24rpx border-2 pt-14rpx pb-28rpx border-#9dc374">
        <uni-row class="w-full h-full">
          <uni-col v-for="item in firstButton" :key="item.id" :span="8">
            <view class="flex flex-col items-center" @click="goPage(item)">
              <view class="w-76 h-76">
                <image :src="item.icon" mode="scaleToFill" class="w-full h-full" />
              </view>
              <view class="text-28 leading-40rpx font-bold tracking-2rpx siyuan_st">{{
                item.title
              }}</view>
            </view>
          </uni-col>
        </uni-row>
      </view>
    </view>
    <view
      class="mt-18rpx w-full bg-white rounded-24rpx py-30rpx box-border"
      style="box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1)"
    >
      <uni-row class="w-full h-full">
        <uni-col v-for="item in secondButton" :key="item.id" :span="8">
          <view
            v-if="item.title !== '线上商城'"
            class="flex flex-col items-center"
            :class="item.id < 4 ? '' : 'mt-6'"
            @click="goPage(item)"
          >
            <view class="w-72 h-72">
              <image :src="item.icon" mode="scaleToFill" class="w-full h-full" />
            </view>
            <view class="text-24 leading-40rpx font-bold tracking-2rpx siyuan_st">{{
              item.title
            }}</view>
          </view>
          <div
            v-else
            class="flex flex-col items-center"
            :class="item.id < 4 ? '' : 'mt-6'"
            @click="doShopLogin(item)"
          >
            <view class="w-72 h-72">
              <image :src="item.icon" mode="scaleToFill" class="w-full h-full" />
            </view>
            <view class="text-24 leading-40rpx font-bold tracking-2rpx siyuan_st"> 线上商城 </view>
          </div>
        </uni-col>
      </uni-row>
    </view>
  </view>
</template>

<script setup>
const { userInfo } = useStore('user')
import { getCode } from '@/api/user'
import { to } from '@/service/util'
import { getShopCodeProject } from '@/service/util'
// https://tourismbackenddev.pcleartv.cn/doc.html#/微信接口/微信小程序认证接口/getCodeUsingPOST
const doShopLogin = async (item) => {
  if (!userInfo.value?.openId) {
    uni.showToast({
      title: '请先登录',
      icon: 'none',
    })
    return
  }
  const [wxErr, shopCodeStruct] = await to(getCode())
  const { code } = shopCodeStruct
  if (wxErr) {
    console.log('%c [ 微信登录失败 ]-23', 'font-size:13px; background:pink; color:#bf2c9f;', wxErr)
  }
  if (!code) {
    uni.showToast({
      title: '获取code失败',
      icon: 'none',
    })
    return
  }
  console.log('获取到登录code', code)
  const project = getShopCodeProject() // 'demo'
  // const baseTabUrl = '/pages/shangyouxian/shopping/index'
  uni.setStorageSync('shopCode', code) // + '?code=' + code + '&project=' + project
  // uni.navigateTo({ url: baseTabUrl })
  // 'http://192.168.0.68:5173/#/pages/default/login/index&code=' + code + '&project=' + project
  /*
  const nurl = `/pages/common/webLink/index?time=${Date.now()}&openId=${
    userInfo.value?.openId
  }&code=${code}&project=${project}`
  */
  const nurl = `/pages/shangyouxian/shopping/index?time=${Date.now()}&openId=${
    userInfo.value?.openId
  }&code=${code}&project=${project}`
  uni.navigateTo({
    url: nurl,
  })
}
// POI类型code映射类型id
const POIType = inject('POIType', '')
const firstButton = ref([
  {
    id: 1,
    title: '走进园村',
    icon: '/static/index/shangyouxian/introduction.png',
    url: '/pages/common/scenic/index?title=走进园村',
  },
  {
    id: 2,
    title: '导游导览',
    icon: '/static/index/shangyouxian/tour.png',
    url: '/pages/common/map/index',
  },
  {
    id: 3,
    title: '上犹文旅',
    icon: '/static/index/shangyouxian/shangyou.png',
    url: '/pagesShangyou/pages/newsList/index',
  },
])
const secondButton = computed(() => {
  return [
    {
      id: 1,
      title: '门票预定',
      icon: '/static/index/shangyouxian/ticket.png',
      herf: 'https://pwx.pcleartv.cn/wxauth/wxlogin?projectName=shangyouyuancun&scenics=1',
    },
    {
      id: 2,
      title: '民宿预定',
      icon: '/static/index/shangyouxian/hotel.png',
      herf: 'https://pwx.pcleartv.cn/wxauth/wxlogin?projectName=shangyouyuancun&scenics=2,3,4,5,6',
    },
    {
      id: 3,
      title: '美食推荐',
      icon: '/static/index/shangyouxian/food.png',
      url: `/pagesShangyou/pages/foodList/index?typeId=${POIType.value['美食']}`,
    },
    {
      id: 4,
      title: '线上商城',
      icon: '/static/index/shangyouxian/shopping.png',
      myUrl: '',
      /*
      myUrl: `https://malldev.pcleartv.cn/frontend/mall-mobile/?v=${Date.now()}#/index?openId=${
        userInfo.value?.openId
      }`,
      */
    },
    {
      id: 5,
      title: '周边景点',
      icon: '/static/index/shangyouxian/scenic.png',
      url: `/pagesShangyou/pages/scenicList/index?typeId=${POIType.value['景点']}`,
    },
    {
      id: 6,
      title: '投诉建议',
      icon: '/static/index/shangyouxian/feedback.png',
      url: `/pagesShangyou/pages/feedbackFirst/index`,
    },
  ]
})
const goPage = (item) => {
  if (item.url) {
    uni.navigateTo({
      url: item.url,
    })
  } else if (item.herf) {
    if (item.herf.indexOf('小程序') > -1) {
      uni.navigateToMiniProgram({
        shortLink: item.herf,
        success(res) {
          console.log(res)
        },
      })
    } else if (item.herf.indexOf('?') > -1) {
      const temp = item.herf.split('?')
      uni.navigateTo({
        url: `/pages/common/webLink/index?title=${item.name}&url=${temp[0]}&${temp[1]}`,
      })
    } else {
      uni.navigateTo({ url: `/pages/common/webLink/index?title=${item.name}&url=${item.herf}` })
    }
  } else if (item.tab) {
    uni.switchTab({
      url: item.tab,
    })
  } else if (item.myUrl) {
    if (userInfo.value?.openId) {
      uni.navigateTo({
        url: `/pages/common/webLink/index?time=${Date.now()}&openId=${userInfo.value?.openId}`,
      })
    } else {
      uni.showToast({
        title: '请先登录',
        icon: 'none',
      })
    }
  } else {
    uni.showToast({ title: '暂未配置', icon: 'none' })
  }
}
</script>
