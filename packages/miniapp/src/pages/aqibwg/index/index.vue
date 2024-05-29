<template>
  <view class="h-full">
    <view v-if="isLoading">
      <Loading></Loading>
    </view>
    <view v-else class="h-full">
      <n-list
        :down="null"
        :up="null"
        :height="screen"
        bg-type="none"
        box-style="width:100%; height: 100%"
      >
        <n-list-cell>
          <homeBanner></homeBanner>
        </n-list-cell>
        <n-list-cell>
          <view
            class="w-full bg-contain bg-white rounded-t-24rpx overflow-hidden translate-y--108rpx pb-90rpx"
            style="
              background-image: url(https://pqntourism.pcleartv.cn/FjdXH06StXmVTxHzy5tu6Txv1aOM);
            "
          >
            <homeNotice></homeNotice>
            <homeButton></homeButton>
            <homeCollection></homeCollection>
            <homeActivity></homeActivity>
            <homeCulture></homeCulture>
            <homeExhibition></homeExhibition>
            <homeRecommend></homeRecommend>
          </view>
        </n-list-cell>
      </n-list>
    </view>
  </view>
</template>

<script setup>
import Loading from '@/components/loading.vue'
import homeBanner from './components/homeBanner.vue'
import homeNotice from './components/homeNotice.vue'
import homeButton from './components/homeButton.vue'
import homeCollection from './components/homeCollection.vue'
import homeActivity from './components/homeActivity.vue'
import homeCulture from './components/homeCulture.vue'
import homeExhibition from './components/homeExhibition.vue'
import homeRecommend from './components/homeRecommend.vue'

import { fetchNewsType } from '@/api/news'
import { getText } from '@/service/util'

const { isLoading } = useStore('scenic')

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

onShow(() => {
  const curPages = getCurrentPages()[0] // 获取当前页面实例
  if (typeof curPages.getTabBar === 'function' && curPages.getTabBar()) {
    curPages.getTabBar().setData({
      selected: 0, // 表示当前菜单的索引，该值在不同的页面表示不同
    })
  }
})
</script>

<style scoped lang="scss"></style>
