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
          <homeButton></homeButton>
        </n-list-cell>
        <n-list-cell>
          <weather></weather>
        </n-list-cell>
        <n-list-cell>
          <homeRolling :component-style="'dianya'"></homeRolling>
        </n-list-cell>
        <n-list-cell>
          <homeTabList :component-style="'dianya'"></homeTabList>
        </n-list-cell>
      </n-list>
    </view>
  </view>
</template>

<script setup>
import Loading from '@/components/loading.vue'
import homeRolling from '@/components/homeRolling/homeRolling_default.vue'
import homeTabList from '@/components/homeTabList/homeTabList_default.vue'
import weather from '@/components/weather.vue'

import homeBanner from '@/components/homeBanner/homeBanner_dianya.vue'
import homeButton from '@/components/homeButton/homeButton_dianya.vue'

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
::v-deep .uni-swiper__dots-box {
  justify-content: start !important;
  margin-left: 10px;
}
</style>
