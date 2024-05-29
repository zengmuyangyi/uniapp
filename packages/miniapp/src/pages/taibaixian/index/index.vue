<template>
  <view class="bg-#F8F5F8 h-full">
    <view v-if="isLoading">
      <Loading></Loading>
    </view>
    <n-list
      :down="null"
      :up="null"
      :height="screen"
      bg-type="none"
      box-style="width: 100%; height: 100%"
    >
      <n-list-cell>
        <homeBannerLY :component-style="'contracted'"></homeBannerLY>
      </n-list-cell>
      <n-list-cell>
        <homeButton :component-style="'contracted'"></homeButton>
      </n-list-cell>
      <n-list-cell>
        <homeRolling :component-style="'contracted'"></homeRolling>
      </n-list-cell>
      <n-list-cell>
        <homeBlocks :component-style="'contracted'"></homeBlocks>
      </n-list-cell>
      <n-list-cell>
        <homeVR :component-style="'contracted'"></homeVR>
      </n-list-cell>
      <n-list-cell>
        <homeTabList :component-style="'contracted'"></homeTabList>
      </n-list-cell>
    </n-list>
  </view>
</template>

<script setup>
import Loading from '@/components/loading.vue'
import homeBannerLY from '@/components/homeBanner/homeBanner_guyun.vue'
import homeButton from '@/components/homeButton/homeButton_contracted.vue'
import homeRolling from '@/components/homeRolling/homeRolling_default.vue'
import homeBlocks from '@/components/homeBlocks/homeBlocks_default.vue'
import homeVR from '@/components/homeVR/homeVR_default.vue'
import homeTabList from '@/components/homeTabList/homeTabList_default.vue'

import { fetchNewsType } from '@/api/news'
import { getText } from '@/service/util'
const { isLoading } = useStore('scenic')
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

<style scoped lang="scss"></style>
