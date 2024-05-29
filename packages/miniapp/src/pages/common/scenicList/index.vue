<template>
  <div class="">
    <view v-if="project.project === 'liubangguli' || project.project === 'leifengmuseum'">
      <view class="px-4 pt-4 pb-4">
        <view class="w-full h-70 flex items-center">
          <n-search
            v-model:value="keyword"
            height="70"
            bgType="liubang"
            class="flex-1"
            placeholder="请输入景点名称"
          >
          </n-search>
        </view>
      </view>
      <n-tabs-h
        :value="current"
        :is-tap="true"
        :items="tabs"
        :delay="50"
        space="30rpx"
        indicator-height="12rpx"
        textType="nav-title"
        active-text-type="nav-title"
        activeTextStyle="font-weight: 600"
        width="0"
        left="32rpx"
        right="32rpx"
        indicator-width="0"
        indicatorRadius="0"
        indicatorStyle="bottom: 10rpx"
        indicator-type="liubang-indicator"
        @change="toChangeTab"
      ></n-tabs-h>
      <n-list
        class="bg-white"
        :use-loading="true"
        bg-type="inverse"
        :down="null"
        :up="null"
        height="window-!220rpx"
      >
        <n-list-cell v-for="(item, index) in currentItems" :key="index">
          <view class="w-full py-35rpx px-4 box-border" @click="goDetail(item)">
            <view class="w-full flex items-center overflow-hidden">
              <view
                class="w-174 h-150 mr-38rpx bg-cover bg-center flex-shrink-0 bg-gray-200"
                :style="{ backgroundImage: `url(${getImage(item.cover)})` }"
                ><view
                  v-if="!getImage(item.cover)"
                  class="w-full text-center leading-150rpx text-24 font-600"
                >
                  暂无封面
                </view></view
              >
              <view class="flex-1 flex flex-col justify-between h-150">
                <view class="text-32 font-600 leading-45rpx">{{ getText(item.name) }}</view>
                <view class="flex items-center">
                  <view
                    v-for="(child, childIndex) in item.tags"
                    :key="childIndex"
                    class="px-7rpx py-4rpx border-1 border-solid mr-14rpx text-22 leading-30rpx"
                    :style="{ borderColor: colorTag[childIndex], color: colorTag[childIndex] }"
                    >{{ child }}</view
                  >
                </view>
                <view class="text-28 text-#7a7a7a leading-40rpx truncate w-450">{{
                  getText(item.description)
                }}</view>
              </view>
            </view>
          </view>
        </n-list-cell>
        <blank v-if="!currentItems.length && isLoaded"></blank>
      </n-list>
    </view>
    <view v-else-if="project.project === 'shangyouxian'" class="bg-#f5f5f5">
      <view class="bg-white px-20rpx">
        <view class="w-full h-80 flex items-center rounded-50rpx bg-#f4f5f7">
          <n-search
            v-model:value="keyword"
            height="80"
            bgType="liubang"
            class="flex-1"
            placeholder="请输入景点名称"
          >
          </n-search>
        </view>
        <n-tabs-h
          :value="current"
          :is-tap="true"
          :items="tabs"
          :delay="50"
          space="30rpx"
          indicator-height="12rpx"
          textType="nav-title"
          active-text-type="nav-title"
          activeTextStyle="font-weight: 600"
          width="0"
          left="23rpx"
          right="23rpx"
          indicator-width="0"
          indicatorRadius="10rpx"
          indicatorStyle="bottom: 15rpx"
          indicator-type="shangyouxian2"
          @change="toChangeTab"
        ></n-tabs-h>
      </view>
      <view class="p-20rpx">
        <view
          class="w-full bg-white rounded-24rpx"
          style="box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1)"
        >
          <n-list
            :use-loading="true"
            bg-type="none"
            :down="null"
            :up="null"
            height="window-!220rpx"
          >
            <n-list-cell v-for="(item, index) in currentItems" :key="index">
              <view class="w-full py-35rpx px-4 box-border" @click="goDetail(item)">
                <view class="w-full flex overflow-hidden">
                  <view
                    class="w-165 h-220 mr-28rpx bg-cover bg-center flex-shrink-0 bg-gray-100"
                    :style="{ backgroundImage: `url(${getImage(item.cover)})` }"
                    ><view
                      v-if="!getImage(item.cover)"
                      class="w-full text-center leading-150rpx text-24 font-600"
                    >
                      暂无封面
                    </view></view
                  >
                  <view class="flex-1">
                    <view class="text-32 font-600 leading-45rpx">{{ getText(item.name) }}</view>
                    <view class="flex items-center mt-14rpx">
                      <view
                        v-for="(child, childIndex) in item.tags"
                        :key="childIndex"
                        class="px-14rpx border-1 border-solid mr-8rpx text-24 leading-34rpx"
                        :style="{
                          borderColor: colorTag2[childIndex],
                          color: colorTag2[childIndex],
                        }"
                        >{{ child }}</view
                      >
                    </view>
                    <view
                      class="text-24 text-#666 leading-34rpx truncate w-450 truncate mt-20rpx"
                      >{{ getText(item.description) }}</view
                    >
                  </view>
                </view>
              </view>
            </n-list-cell>
            <blank v-if="!currentItems.length && isLoaded"></blank>
          </n-list>
        </view>
      </view>
    </view>
    <view
      v-else-if="project.project === 'fanglanhu'"
      class="w-full min-h-100vh bg-contain bg-no-repeat relative bg-#f6f8fb"
      style="background-image: url('https://pqntourism.pcleartv.cn/Fi1gQJUkPrdNTODjJzovU7SfDdHN')"
    >
      <!-- 顶部导航栏 -->
      <n-position pos="top" box-style="width:750rpx;">
        <view class="bg-transparent">
          <n-height height="status"></n-height>
          <n-height height="nav">
            <view class="flex h-full w-full items-center px-3 justify-center">
              <span class="ic-baseline-arrow-back-ios absolute left-24" @click="handleBack"></span>
              <span class="text-30 leading-42rpx font-800">景点列表</span>
            </view>
          </n-height>
        </view>
      </n-position>
      <view class="w-full pt-180rpx box-border">
        <view class="w-full box-border px-20rpx">
          <view class="w-full h-80 flex items-center rounded-50rpx bg-white mb-30rpx">
            <n-search
              v-model:value="keyword"
              height="80"
              bgType="liubang"
              class="flex-1"
              placeholder="请输入景点名称"
            >
            </n-search>
          </view>
        </view>
        <n-tabs-h
          :value="current"
          :is-tap="true"
          :items="tabs"
          :delay="50"
          bgType="none"
          space="20rpx"
          indicator-height="12rpx"
          textType="fanglanhu"
          textStyle="font-weight: 600; font-size: 24rpx; line-height: 36rpx"
          itemStyle="background: #fff; padding: 10rpx 32rpx; border-radius: 28rpx;"
          active-text-type="inverse"
          activeTextStyle="font-weight: 600; font-size: 12px; line-height: 36rpx"
          activeItemStyle="background: linear-gradient(315deg, #1DDBF5 0%, #4D91FF 100%);"
          width="0"
          height="56rpx"
          left="20rpx"
          right="20rpx"
          indicator-width="0"
          indicatorRadius="10rpx"
          indicatorStyle="bottom: 15rpx"
          indicator-type="none"
          @change="toChangeTab"
        >
        </n-tabs-h>
        <view class="mt-30rpx w-full px-20rpx">
          <view class="w-full bg-white rounded-12rpx overflow-hidden">
            <n-list
              :use-loading="true"
              bg-type="none"
              :down="null"
              :up="null"
              height="window-!220rpx"
            >
              <n-list-cell v-for="(item, index) in currentItems" :key="index">
                <view
                  class="w-full h-220 flex py-35rpx box-border px-20rpx box-border"
                  @click="goDetail(item)"
                >
                  <view
                    class="w-212 h-150 rounded-6rpx bg-cover bg-center bg-#d8d8d8"
                    :style="{ backgroundImage: `url(${getImage(item.cover)})` }"
                  >
                    <view
                      v-if="!getImage(item.cover)"
                      class="w-full text-center leading-150rpx text-24 font-600"
                    >
                      暂无封面
                    </view>
                  </view>
                  <view class="ml-40rpx">
                    <view class="w-400 truncate text-32 leading-45rpx font-500 text-#3e3e3e">{{
                      getText(item.name)
                    }}</view>
                    <view class="flex items-center mt-7rpx">
                      <view
                        v-for="(child, childIndex) in item.tags"
                        :key="childIndex"
                        class="px-10rpx border-1 border-solid mr-8rpx text-20 leading-30rpx rounded-12rpx"
                        :style="{
                          borderColor: colorTag3[childIndex],
                          color: colorTag3[childIndex],
                        }"
                        >{{ child }}</view
                      >
                    </view>
                    <view class="mt-9rpx text-24 w-400 leading-33rpx text-#909090 u-line-2"></view>
                  </view>
                </view>
              </n-list-cell>
              <blank v-if="!currentItems.length && isLoaded"></blank>
            </n-list>
          </view>
        </view>
      </view>
    </view>
    <view v-else>
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

      <div class="mt-2">
        <n-tabs-h
          :value="current"
          :is-tap="true"
          :items="tabs"
          :delay="50"
          space="24rpx"
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
          <div class="px-3 w-full box-border py-30rpx" @click="goDetail(item)">
            <div class="flex w-full box-border bg-white p-3 rounded-2 items-center box-shadow">
              <image
                :src="getImage(item.images)?.split(',')[0] || currentTab.icon"
                mode="aspectFill"
                :style="currentTab?.color ? { background: currentTab?.color } : {}"
                class="w-120 h-120 rounded-2 mr-2 flex-shrink-0 green-bg"
              />
              <div class="flex-1 h-120 flex flex-col justify-between">
                <view>{{ getText(item.name) }}</view>

                <div v-if="item.tags?.length" class="mt-10rpx">
                  <tagGroup v-model="item.tags" color="green"></tagGroup>
                </div>
                <view>
                  <view
                    v-if="item.location"
                    class="flex items-center text-gray-400 text-gray text-24 w-full"
                  >
                    <view class="ic-round-location-on w-30 h-30 flex-shrink-0"></view>
                    <view class="ml-10rpx w-400 truncate">{{ item.location }}</view>
                  </view>
                  <!-- <view
                  v-if="item.bookingInformation"
                  class="flex items-center text-gray-400 text-gray text-24"
                >
                  <view class="ic-baseline-phone-android w-30 h-30 flex-shrink-0"></view>
                  <view class="ml-10rpx w-400 truncate">{{ item.bookingInformation }}</view>
                </view> -->
                </view>
              </div>

              <view
                class="text-60 flex-shrink-0"
                :class="isAqi ? 'ic-baseline-arrow-forward-ios' : 'ic-twotone-play-circle'"
                style="color: #71d167"
              ></view>
            </div>
          </div>
        </n-list-cell>

        <blank v-if="!currentItems.length && isLoaded"></blank>
      </n-list>
    </view>
  </div>
</template>

<script setup>
import { getText, getImage, getExtConfig } from '@/service/util'
import { fetchMapPOIType, fetchMapPOIList } from '@/api/map'
import { watch } from 'vue'

const project = getExtConfig()
const colorTag = ['#aa272e', '#000', '#aa272e', '#000']
const colorTag2 = ['#79B872', '#FF7F19']
const colorTag3 = ['#FF7426', '#459CFD', '#22C991']

// 定制标识，阿旗博物馆
const isAqi = UNI_PROJECT === 'aqibwg'

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
  res.list.forEach((item) => {
    item.tags = item.tag?.split(',').filter(Boolean)
  })
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
const timer = ref(null)
watch(keyword, (newVal) => {
  if (timer.value) {
    clearInterval(timer.value)
    timer.value = setTimeout(() => {
      handleSearch()
    }, 600)
  } else {
    timer.value = setTimeout(() => {
      handleSearch()
    }, 600)
  }
})
const handleSearch = async () => {
  console.log('********', keyword.value)
  if (!keyword.value) {
    return (currentItems.value = getTabData())
  }

  await getPOIList({ typeId: tabList.value[current.value].id, name: keyword.value })
  currentItems.value = searchResult.value
}

const goDetail = (item) => {
  if (tabList.value[current.value]?.name.cn === '美食') {
    navigateTo({
      url: `scenic/index?id=${item.id}&type=food&title=${getText(item.name)}`,
    })
  } else {
    navigateTo({
      url: `scenic/index?id=${item.id}&title=${getText(item.name)}`,
    })
  }
}

onLoad(async (options) => {
  await getTypeList()
  if (options.current) {
    current.value = options.current - 0
    await getPOIList({ typeId: tabList.value[current.value].id })
  } else {
    await getPOIList({ typeId: tabList.value[0].id })
  }

  currentItems.value = getTabData()
  isLoaded.value = true
})

// ----------顶部导航后退--------------
const handleBack = () => {
  uni.navigateBack()
}
</script>

<style lang=""></style>
