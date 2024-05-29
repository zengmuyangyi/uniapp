<template>
  <view class="bg-#f5f5f5" :class="project === 'dayan' ? '' : 'p-20rpx'">
    <div v-if="project === 'dayan'" class="min-h-100vh">
      <image
        mode="widthFix"
        class="w-full"
        src="https://pqncdn.cleartv.cn/pres/resources/49f4519bd36ea24d135c061f4151f41d_CWkHpxLd_231229185019.png"
        @click="goDetail({})"
      ></image>
    </div>
    <n-list
      v-else
      ref="list"
      bg-type="inverse"
      height="window"
      box-style="box-shadow: 0rpx 2rpx 8rpx 0px rgba(0,0,0,0.1); border-radius: 24rpx 24rpx 24rpx 24rpx"
      :auto-update="true"
      @down="getMapPOIList"
      @up="getMapPOIList"
    >
      <n-list-cell v-for="item in data" :key="item.id">
        <view class="w-full pl-45rpx pr-75rpx pt-40rpx box-border flex" @click="goDetail(item)">
          <view
            class="w-165 h-220 flex-shrink-0 mr-28rpx rounded-10rpx bg-cover bg-center"
            :style="{ backgroundImage: `url(${getImage(item.cover)})` }"
          ></view>
          <view class="flex-1">
            <view class="text-32 font-600 leading-45rpx">{{ getText(item.name) }}</view>
            <view class="flex mt-15rpx">
              <view
                v-for="(tag, index) in item.tag"
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
            <view class="mt-20rpx truncate text-24 leading-34rpx w-400 text-#666"
              >地理位置：{{ item.location }}</view
            >
          </view>
        </view>
      </n-list-cell>
      <blank v-if="!data.length && isLoaded"></blank>
    </n-list>
  </view>
</template>

<script setup>
import { getText, getImage } from '@/service/util'
import { newFetchMapPOIList } from '@/api/map'
const project = UNI_PROJECT
const data = ref([])
const isLoaded = ref(false)
const typeId = ref(0)
const list = ref()
const goDetail = (item) => {
  uni.navigateTo({
    url: `/pages/common/scenic/index?id=${item.id}&type=food`,
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
      item.tag = item.tag.split(',')
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
