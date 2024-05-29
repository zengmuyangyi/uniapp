<template>
  <view class="h-full">
    <view v-if="isLoading">
      <Loading></Loading>
    </view>
    <view class="h-full bg-white">
      <n-list
        :down="null"
        :up="null"
        :height="screen"
        bg-type="none"
        box-style="width:100%; height: 100%"
      >
        <n-list-cell>
          <homeBanner_bwg></homeBanner_bwg>
        </n-list-cell>
        <n-list-cell>
          <view class="w-full overflow-hidden homeBg">
            <view class="mt-38rpx w-full px-40rpx box-border">
              <homeButton></homeButton>
            </view>
            <!-- <view class="mt-8 w-full px-4 box-border"> <patrimony></patrimony></view> -->
            <view class="mt-75rpx w-full px-40rpx box-border"><exhibit></exhibit></view>
            <view class="w-full mt-100rpx px-40rpx box-border"><education></education></view>
          </view>
        </n-list-cell>
      </n-list>
    </view>
  </view>
</template>

<script setup>
import Loading from '@/components/loading.vue'
import homeBanner_bwg from '@/components/homeBanner/homeBanner_bwg.vue'
// import patrimony from './components/patrimony.vue'
import exhibit from './components/exhibit.vue'
import education from './components/education.vue'
import homeButton from './components/homeButton.vue'

import { fetchNewsType } from '@/api/news'
import { getText } from '@/service/util'

const { isLoading } = useStore('scenic')

console.log(UNI_PLATFORM)

// setTabbar()

const newsType = ref({})
// 新闻类型id映射表
provide('newsType', newsType)

fetchNewsType().then((res) => {
  res.list.forEach((item) => {
    newsType.value[item.code] = item.id
  })
})

const { currentScenic } = useStore('scenic')
onShareAppMessage(() => {
  const project = UNI_PROJECT || 'default'
  return {
    title: getText(currentScenic.value.name),
    path: `/pages/${project}/index/index`,
  }
})
</script>

<style scoped lang="scss">
.homeBg {
  background-image: url('https://pqntourism.pcleartv.cn/Fmtwn57LNdyiDvOXP5eSzJhvrnnL');
  background-size: 100% 506px;
}
</style>
