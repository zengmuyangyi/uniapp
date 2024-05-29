<template>
  <view class="h-full">
    <view v-if="isLoading">
      <Loading></Loading>
    </view>
    <view v-else class="h-full">
      <view class="bg-#white h-full">
        <n-list
          :down="null"
          :up="null"
          :height="scrollH"
          bg-type="none"
          box-style="width:100%; height: 100%"
        >
          <n-list-cell>
            <homeBanner></homeBanner>
          </n-list-cell>
          <n-list-cell>
            <toggle></toggle>
          </n-list-cell>
          <n-list-cell>
            <homeBlocks></homeBlocks>
          </n-list-cell>
          <n-list-cell>
            <homeVR></homeVR>
          </n-list-cell>
          <n-list-cell>
            <homeRolling></homeRolling>
          </n-list-cell>
          <n-list-cell>
            <homeTabList></homeTabList>
          </n-list-cell>
        </n-list>
      </view>
    </view>
  </view>
</template>

<script setup>
import Loading from '@/components/loading.vue'
import homeBanner from '@/components/homeBanner/homeBanner_default.vue'
import homeRolling from '@/components/homeRolling/homeRolling_default.vue'
import homeTabList from '@/components/homeTabList/homeTabList_default.vue'
import homeBlocks from '@/components/homeBlocks/homeBlocks_default.vue'
import homeVR from '@/components/homeVR/homeVR_default.vue'
import toggle from '@/components/languageToggle/languageToggle_default.vue'

import { fetchNewsType } from '@/api/news'
import { getText } from '@/service/util'

const { isLoading } = useStore('scenic')

console.log(UNI_PLATFORM)
const scrollH = computed(() => {
  return UNI_PLATFORM === 'h5' ? 'window-nav' : 'window'
})

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
