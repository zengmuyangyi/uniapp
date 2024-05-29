<template>
  <view id="homeList3" class="mx-3 pt-40rpx">
    <view
      v-for="(item, index) in list"
      :key="index"
      class="flex h-210 mb-50rpx box-shadow rounded-20rpx overflow-hidden relative"
      @click="handleClick(item)"
    >
      <image :src="getImage(item.coverImage)" mode="aspectFill" class="w-240 h-210 mr-35rpx" />
      <view class="flex-1 flex flex-col justify-between content-between overflow-hidden">
        <view class="pt-28rpx pr-20rpx">
          <view class="w-full overflow-hidden whitespace-nowrap" style="text-overflow: ellipsis">
            {{ getText(item.title) }}
          </view>
          <view class="flex flex-wrap mt-8rpx">
            <tagGroup v-model="item.tags" color="blue"></tagGroup>
          </view>
        </view>

        <div class="text-gray-400 flex items-center pb-24rpx justify-end">
          <span class="flex text-24 mr-3 text-gray">
            {{ item.publishTime }}
          </span>
        </div>
      </view>
    </view>
    <blank v-if="!list.length && isLoaded"></blank>
  </view>
</template>

<script setup>
import { fetchNewsList } from '@/api/news'
import { getText, getImage } from '@/service/util'
import { getCurrentInstance } from 'vue'

const list = ref([])
const isLoaded = ref(false)

const { proxy } = getCurrentInstance()
const listHeight = inject('heightList')
const tabsCode = inject('tabsCode')

onMounted(async () => {
  const res = await fetchNewsList({ pageNum: 1, pageSize: 5, hot: 1 })
  list.value = res.list
  isLoaded.value = true

  nextTick(() => {
    const query = uni.createSelectorQuery().in(proxy)

    query
      .select('#homeList3')
      .boundingClientRect((data) => {
        tabsCode.value.forEach((item, index) => {
          if (item === 'hotList') {
            listHeight.value[index] = data.height
          }
        })
      })
      .exec()
  })
})

function handleClick(params) {
  console.log('%c [ params ]-72', 'font-size:13px; background:pink; color:#bf2c9f;', params)
  if (params.url) {
    navigateTo({
      url: `webLink/index?url=${params.url}&title=${getText(params.title)}`,
    })
  } else {
    navigateTo({
      url: `news/index?id=${params.id}`,
    })
  }
}
</script>

<style lang=""></style>
