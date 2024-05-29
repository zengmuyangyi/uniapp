<template>
  <div class="">
    <div class="px-3">
      <div class="flex w-full items-center">
        <n-search v-model:value="keyword" class="flex-1" placeholder="请输入景点名称"> </n-search>

        <div
          class="green-bg h-70 flex w-120 items-center justify-center text-white rounded-35rpx text-26 ml-34rpx"
          @click="handleSearch"
        >
          搜索
        </div>
      </div>
    </div>

    <div class="mt-2 shadow-2xl shadow-current">
      <n-tabs-h
        :value="current"
        :is-tap="true"
        :items="tabs"
        :delay="50"
        left="24rpx"
        space="24rpx"
        right="24rpx"
        indicator-height="6rpx"
        active-text-type="primary"
        width="0"
        indicator-width="0"
        indicator-type="success"
        @change="toChangeTab"
      ></n-tabs-h>
    </div>

    <n-list
      class="bg-white"
      :use-loading="true"
      bg-type="inverse"
      :down="null"
      :up="null"
      height="window-!176rpx"
    >
      <n-list-cell v-for="(item, index) in currentItems" :key="index">
        <div class="px-3 py-30rpx" @click="goDetail(item)">
          <div class="flex bg-white p-3 rounded-2 items-center box-shadow">
            <image
              :src="getImage(item.images)?.split(',')[0] || currentTab.icon"
              mode="aspectFill"
              :style="currentTab?.color ? { background: currentTab?.color } : {}"
              class="w-120 h-120 rounded-2 mr-2 green-bg"
            />
            <div class="flex-1 h-120">
              {{ getText(item.name) }}
            </div>

            <span class="text-60 ic-twotone-play-circle" style="color: #71d167"></span>
          </div>
        </div>
      </n-list-cell>

      <blank v-if="!currentItems.length && isLoaded"></blank>
    </n-list>
  </div>
</template>

<script setup>
import { getText, getImage } from '@/service/util'
import { fetchMapPOIType, fetchMapPOIList } from '@/api/map'

const current = ref(0)
const tabs = ref([])
const tabList = ref([])
const isLoaded = ref(false)
const isSearching = ref(false)

const typeIdMap = ref({})
const searchResult = ref([])

async function getTypeList() {
  const res = await fetchMapPOIType()
  console.log('%c [ 类型列表 ]-75', 'font-size:13px; background:pink; color:#bf2c9f;', res.list)
  tabList.value = res.list
  tabs.value = res.list.map((i) => getText(i.name))
}

async function getPOIList({ typeId, name }) {
  // uni.showLoading({
  //   title: '加载中',
  //   mask: true,
  // })

  const res = await fetchMapPOIList({ typeId, name })

  // uni.hideLoading()
  console.log('%c [ POI列表 ]-83', 'font-size:13px; background:pink; color:#bf2c9f;', res)

  if (typeId && !name) {
    typeIdMap.value[typeId] = res.list
  }

  if (name) {
    searchResult.value = res.list
  }

  return res.list
}

// -----------------当前类型POI列表------------
// const currentItems = computed(() => {
//   const typeId = tabList.value[current.value]?.id

//   const tabData = typeIdMap.value[typeId] || []

//   return keyword.value ? searchResult.value : tabData
// })
const currentItems = ref([])
const getTabData = () => {
  const typeId = tabList.value[current.value]?.id

  const tabData = typeIdMap.value[typeId] || []

  return tabData
}
const currentTab = computed(() => {
  return tabList.value[current.value]
})

//------------------Tab 切换------------------
const toChangeTab = async (i) => {
  current.value = i

  if (keyword.value) {
    await getPOIList({ typeId: tabList.value[i].id, name: keyword.value })
    currentItems.value = searchResult.value
    return
  }

  if (!typeIdMap.value[tabList.value[i].id]) {
    await getPOIList({ typeId: tabList.value[i].id })
  }

  currentItems.value = getTabData()
}

// ------------------ 搜索 ------------------
const keyword = ref('')
const handleSearch = async () => {
  if (!keyword.value) {
    return (currentItems.value = getTabData())
  }

  await getPOIList({ typeId: tabList.value[current.value].id, name: keyword.value })
  currentItems.value = searchResult.value
}

const goDetail = (item) => {
  navigateTo({
    url: `scenic/index?id=${item.id}`,
  })
}

onMounted(async () => {
  await getTypeList()

  await getPOIList({ typeId: tabList.value[0].id })

  currentItems.value = getTabData()
  isLoaded.value = true
})
</script>

<style lang=""></style>
