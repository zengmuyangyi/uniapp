<template>
  <view class="h-full">
    <view v-if="isLoading">
      <Loading></Loading>
    </view>
    <view v-else class="h-full">
      <guyun v-if="data.title === 'guyun'"></guyun>
      <qingxin v-else-if="data.title === 'qingxin'"></qingxin>
      <contracted v-else-if="data.title === 'contracted'"></contracted>
      <defaultStyle v-else></defaultStyle>
    </view>
  </view>
</template>

<script setup>
import defaultStyle from './home/default.vue'
import guyun from './home/guyun.vue'
import qingxin from './home/qingxin.vue'
import contracted from './home/contracted.vue'
import Loading from '@/components/loading.vue'

import { fetchNewsType } from '@/api/news'
import { getText } from '@/service/util'

const { programTree, isLoading } = useStore('scenic')
const data = computed(() => {
  return programTree.value[0]
})
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
  return {
    title: getText(currentScenic.value.name),
    path: '/pages/index/index',
  }
})
</script>

<style scoped lang="scss"></style>
