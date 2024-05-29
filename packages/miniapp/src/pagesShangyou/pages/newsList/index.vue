<template>
  <view class="p-20rpx bg-#f5f5f5">
    <n-list
      ref="list"
      bg-type="inverse"
      height="window"
      boxStyle="box-shadow: 0rpx 2rpx 8rpx 0px rgba(0,0,0,0.1); border-radius: 24rpx 24rpx 24rpx 24rpx"
      :auto-update="true"
      @down="getNewsList"
      @up="getNewsList"
    >
      <n-list-cell v-for="item in data" :key="item.id">
        <view @click="goDetail(item)" class="w-full pl-45rpx pr-65rpx pt-40rpx box-border flex">
          <view
            class="w-165 h-220 flex-shrink-0 mr-28rpx rounded-10rpx bg-cover bg-center"
            :style="{ backgroundImage: `url(${getImage(item.coverImage)})` }"
          ></view>
          <view>
            <view class="text-32 font-600 leading-45rpx">{{ getText(item.title) }}</view>
            <view class="mt-14rpx text-26 leading-30rpx u-line-3 text-#666">{{
              getText(item.indroduction)
            }}</view>
          </view>
        </view>
      </n-list-cell>
      <blank v-if="!data.length && isLoaded"></blank>
    </n-list>
  </view>
</template>

<script setup>
import { getText, getImage } from '@/service/util'
import { fetchNewsList } from '@/api/news'
const { getMenu } = useStore('scenic')
const goDetail = (item) => {
  if (item.url) {
    navigateTo({
      url: `webLink/index?url=${item.url}&title=${getText(item.title)}`,
    })
  } else {
    navigateTo({
      url: `news/index?id=${item.id}`,
    })
  }
}
const page = ref({
  pageNum: 1,
  pageSize: 10,
})
const data = ref([])
const isLoaded = ref(false)
const list = ref()
const menuId = ref({})
const getNewsList = async (cp) => {
  menuId.value = await getMenu('news')
  const ins = list.value
  const params = {
    ...page.value,
    pageNum: cp,
    status: 1,
    menuId: menuId.value?.id,
  }
  fetchNewsList(params).then((res) => {
    console.log('%c [ 新闻 ]-50', 'font-size:13px; background:pink; color:#bf2c9f;', res)
    if (cp === 1) {
      data.value = res.list
    } else {
      data.value = data.value.concat(res.list)
    }

    ins.nEndSuccess(!!res.nextPage)

    isLoaded.value = true
  })
}
</script>

<style lang="scss" scoped></style>
