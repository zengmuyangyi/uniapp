<template>
  <view class="p-20rpx bg-#f5f5f5">
    <n-list
      ref="list"
      bg-type="inverse"
      height="window"
      boxStyle="box-shadow: 0rpx 2rpx 8rpx 0px rgba(0,0,0,0.1); border-radius: 24rpx 24rpx 24rpx 24rpx; padding-top: 40rpx"
      :auto-update="true"
      @down="getMapPOIList"
      @up="getMapPOIList"
    >
      <n-list-cell v-for="item in data" :key="item.id">
        <view @click="goDetail(item)" class="w-full mb-35rpx px-30rpx">
          <view
            class="w-full h-384 rounded-20rpx relative bg-cover bg-center"
            :style="{ backgroundImage: `url(${getImage(item.cover)})` }"
          >
            <image
              v-if="item.tag"
              src="/static/index/shangyouxian/topPart1.png"
              mode="scaleToFill"
              class="w-20 h-15 absolute top-13 left--16"
            />
            <view
              v-if="item.tag"
              class="pr-17rpx pl-7rpx pb-8rpx pt-2rpx box-border text-white text-26 leading-30rpx font-600 absolute top-26 left--20 tagBox"
              >{{ item.tags[0] }}</view
            >
          </view>
          <view class="mt-20rpx text-32 font-600 leading-45rpx truncate w-full">{{
            getText(item.name)
          }}</view>
        </view>
      </n-list-cell>
      <blank v-if="!data.length && isLoaded"></blank>
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
const name = ref('')
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
    name: name.value ? name.value : '',
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
  if (options.name) {
    name.value = options.name
  }
})
</script>

<style scoped lang="scss">
.tagBox {
  background-image: url('@/static/index/shangyouxian/topPart2.png');
  background-size: 100% 100%;
}
</style>
