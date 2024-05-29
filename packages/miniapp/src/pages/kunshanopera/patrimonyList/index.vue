<template>
  <view class="h-full">
    <view v-show="isLoading">
      <Loading></Loading>
    </view>
    <view v-show="!isLoading" class="relative h-full bg-#f8f8f8">
      <view class="w-full h-full box-border pt-20rpx">
        <n-waterfall
          ref="list"
          bg-type="none"
          height="window"
          :auto-update="true"
          @down="getCultureList"
          @up="getCultureList"
        >
          <n-waterfall-view
            ref="water"
            left-gap="20rpx"
            right-gap="20rpx"
            column-gap="20rpx"
            :calculator="null"
          >
            <template #left="{ lefts }">
              <div v-for="(item, idx) in lefts" :key="idx">
                <div
                  class="rounded-8rpx overflow-hidden bg-white mb-20rpx"
                  style="box-shadow: 0px 2px 14px 1px rgba(231, 231, 231, 0.5)"
                  @click="goDetail(item)"
                >
                  <image lazy-load :src="item.cover" class="w-345 block" mode="widthFix"></image>
                  <div class="p-20rpx text-28 leading-40rpx font-500 text-#383838 siyuan_ht">
                    {{ getText(item.name) }}
                  </div>
                </div>
              </div>
            </template>
            <template #right="{ rights }">
              <div v-for="(item, idx) in rights" :key="idx">
                <div
                  class="rounded-8rpx overflow-hidden bg-white mb-20rpx"
                  style="box-shadow: 0px 2px 14px 1px rgba(231, 231, 231, 0.5)"
                  @click="goDetail(item)"
                >
                  <image lazy-load :src="item.cover" class="w-345 block" mode="widthFix"></image>
                  <div class="p-20rpx text-28 leading-40rpx font-500 text-#383838 siyuan_ht">
                    {{ getText(item.name) }}
                  </div>
                </div>
              </div>
            </template>
          </n-waterfall-view>
          <blank v-if="!data?.length && isLoaded"></blank>
        </n-waterfall>
      </view>
    </view>
  </view>
</template>

<script setup>
import Loading from '@/components/loading.vue'
import { fetchCollectionList } from '@/api/collection'
import { getText, getImage } from '@/service/util'
const isLoading = ref(true)
const list = ref()
const data = ref([])
const isLoaded = ref(false)
const water = ref()
const getCultureList = async (cp) => {
  const params = {
    pageNum: cp,
    pageSize: 10,
    isMobileShow: 1,
  }
  fetchCollectionList(params).then((res) => {
    console.log('%c [ 文物 ]-50', 'font-size:13px; background:pink; color:#bf2c9f;', res)
    if (cp === 1) {
      data.value = res.list
      water.value.clear()
      water.value.set(res.list)
    } else {
      water.value.concat(res.list)
    }
    list.value.nEndSuccess(!!res.nextPage)

    isLoaded.value = true
    isLoading.value = false
  })
}
const goDetail = (item) => {
  uni.navigateTo({
    url: `/pages/kunshanopera/patrimonyDetail/index?data=${JSON.stringify(item)}`,
  })
}
</script>
