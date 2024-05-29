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
          <homeBannerLY :component-style="'guyun'"></homeBannerLY>
        </n-list-cell>
        <n-list-cell>
          <homeRolling :component-style="'qingxin'"></homeRolling>
        </n-list-cell>
        <n-list-cell>
          <homeBlocksLY :component-style="'qingxin'"></homeBlocksLY>
        </n-list-cell>
        <n-list-cell>
          <ticket></ticket>
        </n-list-cell>
        <n-list-cell>
          <tour :component-style="'qingxin'"></tour>
        </n-list-cell>
        <n-list-cell>
          <homeTabList :component-style="'qingxin'"></homeTabList>
        </n-list-cell>
      </n-list>
    </view>
  </view>
</template>

<script setup>
import Loading from '@/components/loading.vue'
import homeRolling from '@/components/homeRolling/homeRolling_default.vue'
import homeTabList from '@/components/homeTabList/homeTabList_default.vue'

import homeBannerLY from '@/components/homeBanner/homeBanner_guyun.vue'
import homeBlocksLY from '@/components/homeBlocks/homeBlocks_guyun.vue'
import ticket from '@/components/ticket/ticket_qingxin.vue'
import tour from '@/components/tour/tour_qingxin.vue'

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

<style scoped lang="scss"></style>
