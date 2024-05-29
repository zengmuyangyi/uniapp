<template>
  <view id="homeList2" class="mx-3 pt-40rpx">
    <view
      v-for="(item, index) in list"
      :key="index"
      class="flex h-210 mb-50rpx box-shadow rounded-20rpx overflow-hidden relative"
      @click="goDetail(item)"
    >
      <image :src="getImage(item.cover)" mode="aspectFill" class="w-240 h-210 mr-35rpx" />
      <view class="flex-1 flex flex-col justify-between content-between overflow-hidden">
        <view class="pt-48rpx pr-20rpx">
          <view class="w-full overflow-hidden whitespace-nowrap text-ellipsis font-bold text-30">{{
            getText(item.name)
          }}</view>
        </view>

        <!-- <div class="text-gray-400 flex items-center">
          <span class="flex items-center text-24 mr-3 text-red-400">
            <span class="ic-twotone-favorite mr-1"></span> {{ item.fav }}人喜欢
          </span>
        </div> -->
      </view>

      <div
        :style="{ background: getColor(index) }"
        class="absolute h-48 text-white text-26 green-bg flex justify-center items-center px-20rpx right-0 rounded-bl-20rpx"
      >
        {{ index + 1 }}
      </div>
    </view>
    <blank v-if="!list.length && isLoaded"></blank>
  </view>
</template>

<script setup>
import { fetchMapPOIList } from '@/api/map'
import { getText, getImage } from '@/service/util'
import { getCurrentInstance, inject, nextTick } from 'vue'

const list = ref([])
const isLoaded = ref(false)

const { proxy } = getCurrentInstance()
const listHeight = inject('heightList')
const tabsCode = inject('tabsCode')

const getColor = (i) => {
  const colors = [
    'linear-gradient(90deg, #f2d23e 0%, #ffb735 100%)',
    'linear-gradient(90deg, #a1b0c4 0%, #becada 100%)',
    '#cea784',
    '#cccccc',
  ]

  return i < 3 ? colors[i] : colors[3]
}

onMounted(async () => {
  const { list: listData } = await fetchMapPOIList({ recommend: 1 })
  list.value = listData
  isLoaded.value = true

  // 获取列表高度
  nextTick(() => {
    const query = uni.createSelectorQuery().in(proxy)

    query
      .select('#homeList2')
      .boundingClientRect((data) => {
        tabsCode.value.forEach((item, index) => {
          if (item === 'recommendList') {
            listHeight.value[index] = data.height
          }
        })
      })
      .exec()
  })
})

// const { tempScenic } = useStore('scenic')
const goDetail = (item) => {
  // tempScenic.value = item // TODO 需要后台改成按ID查询

  navigateTo({
    url: `scenic/index?id=${item.id}`,
  })
}
</script>

<style lang=""></style>
