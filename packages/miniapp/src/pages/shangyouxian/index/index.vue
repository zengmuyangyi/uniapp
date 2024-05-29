<template>
  <view class="h-full relative">
    <view v-if="isLoading">
      <Loading></Loading>
    </view>
    <view v-else class="h-full">
      <n-list
        :down="null"
        :up="null"
        height="window"
        bg-type="shangyouxian"
        box-style="width:100%; height: 100%"
      >
        <n-list-cell>
          <homeBanner></homeBanner>
        </n-list-cell>
        <n-list-cell>
          <view class="absolute top-486 w-full">
            <homeButton></homeButton>
            <homeRolling></homeRolling>
            <homeProject :topData="topData"></homeProject>
          </view>
        </n-list-cell>
      </n-list>
    </view>
  </view>
</template>

<script setup>
import homeBanner from './components/homeBanner.vue'
import homeButton from './components/homeButton.vue'
import homeRolling from './components/homeRolling.vue'
import homeProject from './components/homeProject.vue'
import Loading from '@/components/loading.vue'
import { fetchMapPOIType, newFetchMapPOIList } from '@/api/map'
import { provide } from 'vue'
const POIType = ref({})
provide('POIType', POIType)
const topData = ref([])
fetchMapPOIType().then(async (res) => {
  res.list.forEach((item) => {
    POIType.value[item.name.cn] = item.id
  })
  const params = {
    pageSize: 0,
    pageNum: 0,
    status: 1,
    recommend: 1,
    typeId: POIType.value['游玩项目'],
  }
  const topRes = await newFetchMapPOIList(params)
  topData.value = topRes.list
})
const { isLoading } = useStore('scenic')
onShareAppMessage(() => {
  const project = UNI_PROJECT || 'default'
  return {
    title: getText(currentScenic.value.name),
    path: `/pages/${project}/index/index`,
  }
})
</script>

<style scoped lang="scss"></style>
