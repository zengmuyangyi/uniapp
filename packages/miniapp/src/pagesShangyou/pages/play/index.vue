<template>
  <view class="p-20rpx bg-#f5f5f5">
    <n-list
      ref="list"
      bg-type="inverse"
      height="window"
      boxStyle="box-shadow: 0rpx 2rpx 8rpx 0px rgba(0,0,0,0.1); border-radius: 24rpx 24rpx 24rpx 24rpx"
      :auto-update="true"
      @down="getMapPOIList"
      @up="getMapPOIList"
    >
      <n-list-cell v-for="item in data" :key="item.id">
        <view @click="goDetail(item)" class="w-full pl-45rpx pr-75rpx pt-40rpx box-border flex">
          <view
            class="w-165 h-220 flex-shrink-0 mr-28rpx rounded-10rpx bg-cover bg-center"
            :style="{ backgroundImage: `url(${getImage(item.cover)})` }"
          ></view>
          <view class="flex-1 flex flex-col justify-between">
            <view class="text-32 font-600 leading-45rpx">{{ getText(item.name) }}</view>
            <view class="flex mt-15rpx" v-if="item.tag">
              <view
                v-for="(tag, index) in item.tags"
                :key="index"
                class="border-2 rounded-2rpx py-1rpx px-14rpx mr-8rpx"
                :style="{ borderColor: `${index ? '#ff7f19' : '#79b872'}` }"
              >
                <view
                  class="text-center leading-36rpx text-24"
                  :style="{ color: `${index ? '#ff7f19' : '#79b872'}` }"
                  >{{ tag }}</view
                >
              </view>
            </view>
            <view
              v-if="item.location"
              class="mt-20rpx truncate text-24 leading-34rpx w-400 text-#666"
              >地理位置：{{ item.location }}</view
            >
            <view v-if="item.price" class="text-#FF7F19 text-32 font-600 mt-24rpx">
              ￥<span class="text-44">{{ item.price }}</span>
            </view>
          </view>
        </view>
      </n-list-cell>
    </n-list>
  </view>
</template>

<script setup>
import { getText, getImage } from '@/service/util'
import { newFetchMapPOIList } from '@/api/map'
const data = ref([])
const isLoaded = ref(false)
const typeId = ref(0)
const list = ref()
const goDetail = (item) => {
  uni.navigateTo({
    url: `/pages/common/scenic/index?id=${item.id}`,
  })
}
const getMapPOIList = (cp) => {
  const ins = list.value
  const params = {
    pageSize: 10,
    pageNum: cp,
    status: 1,
    typeId: typeId.value ? typeId.value : '',
  }
  newFetchMapPOIList(params).then((res) => {
    res.list.forEach((item) => {
      item.tags = item.tag.split(',')
    })
    console.log('%c [ POI ]-40', 'font-size:13px; background:pink; color:#bf2c9f;', res)
    if (cp === 1) {
      data.value = res.list
    } else {
      data.value = data.value.concat(res.list)
    }
    ins.nEndSuccess(!!res.nextPage)
    isLoaded.value = true
  })
}
onLoad((options) => {
  if (options.typeId) {
    typeId.value = options.typeId - 0
  }
})
</script>
