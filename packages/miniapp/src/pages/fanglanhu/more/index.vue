<template>
  <view class="bg-white">
    <view v-for="(item, index) in buttonList" :key="index" class="mt-30rpx">
      <view class="font-bold text-34 leading-48rpx ml-40rpx mb-20rpx">{{ item.title }}</view>
      <view class="w-full flex flex-wrap">
        <view
          v-for="(child, idx) in item.children"
          :key="idx"
          class="h-200 w-25vw flex flex-col justify-center items-center"
          @click="goPage(child)"
        >
          <image :src="child.icon" mode="scaleToFill" class="w-70 h-70" />
          <view class="mt-15rpx text-26 leading-37rpx font-500">{{ child.name }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { fetchMapPOIType } from '@/api/map'
import { fetchVideoType } from '@/api/video'
import $t from '@/service/i18n'
const typeList = ref([])
const typeMap = computed(() => {
  const map = {}
  typeList.value.forEach((item, index) => {
    map[item.name.cn] = index
  })

  return map
})
fetchMapPOIType().then((res) => {
  typeList.value = res.list
})
const videoTypeList = ref([])
const typeVideo = computed(() => {
  const video = {}
  videoTypeList.value.forEach((item) => {
    video[item.name.cn] = item.id
  })

  return video
})
fetchVideoType({
  pageSize: 0,
  pageNum: 0,
  status: 1,
}).then((res) => {
  videoTypeList.value = res.list
})
const buttonList = computed(() => {
  const temp = [
    {
      id: 1,
      title: $t('Travel'),
      children: [
        {
          id: 1,
          name: $t('Toilet'),
          icon: 'https://pqntourism.pcleartv.cn/FnCycQKriwOOLL3VXC4kFzOHxXPe',
          map: { index: typeMap.value['卫生间'] },
        },
        {
          id: 2,
          name: $t('Park'),
          icon: `https://pqntourism.pcleartv.cn/FiDiaM_Vub5o77MC5qRaoQtkc0Co`,
          map: { index: typeMap.value['停车场'] },
        },
        {
          id: 3,
          name: '游玩路线',
          icon: `https://pqntourism.pcleartv.cn/FpmEZ6JWJmC73KzdVjZdWpS30tY5`,
          url: `suggestedLine/index`,
        },
        {
          id: 3,
          name: '景区购物',
          icon: `https://pqntourism.pcleartv.cn/FnWmIYuHc-RTWfvL5dKcc4Tdux3w`,
          // url: `suggestedLine/index`,
        },
      ],
    },
    {
      id: 2,
      title: $t('Conetnt'),
      children: [
        {
          id: 1,
          name: '精彩花絮',
          icon: 'https://pqntourism.pcleartv.cn/FrlLZbVGERWtWEiTbuK1NkgVsj_f',
          url: `video/videoList?typeId=${typeVideo.value['精彩花絮']}&title=精彩花絮`,
        },
        {
          id: 2,
          name: '宣传视频',
          icon: 'https://pqntourism.pcleartv.cn/Flmt9YfP1jhocCJiOb5hEGBCF3yW',
          url: `video/videoList?typeId=${typeVideo.value['宣传视频']}&title=宣传视频`,
        },
        {
          id: 3,
          name: '美景相册',
          icon: `https://pqntourism.pcleartv.cn/Ft83KzqobR9xsRYAnTAvQVSPRYM4`,
          url: `photos/index?title=美景相册`,
        },
      ],
    },
    {
      id: 3,
      title: $t('Service'),
      children: [
        {
          id: 1,
          name: $t('Feedback'),
          icon: `https://pqntourism.pcleartv.cn/Fk0MXCF3y5E9Nm1QSrOshqxg5btk`,
          url: `/pagesShangyou/pages/feedbackFirst/index`,
        },
        {
          id: 2,
          name: $t('CustomerService'),
          icon: `https://pqntourism.pcleartv.cn/FkIaeT-I0wRY0BROJxpFATWOHxEJ`,
          url: `/pagesCustom/pages/serviceAi/index`,
        },
      ],
    },
  ]
  return temp
})
const { mapData } = useStore('app')
const goPage = (item) => {
  console.log('%c [ item ]-74', 'font-size:13px; background:pink; color:#bf2c9f;', item)

  if (item.map) {
    mapData.value = {
      type: 'tab',
      value: item.map.index,
    }

    uni.navigateTo({
      url: '/pages/common/map/index',
    })
  } else if (item.url) {
    navigateTo({ url: item.url })
  } else if (item.href) {
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
  } else {
    uni.showToast({ title: '敬请期待', icon: 'none' })
  }
}
</script>

<style lang="scss" scoped></style>
