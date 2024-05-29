<template>
  <n-list
    ref="list"
    bg-type="none"
    height="window"
    :auto-update="true"
    @down="getNewsList"
    @up="getNewsList"
  >
    <n-list-cell v-if="loop.length">
      <swiper style="height: 400rpx" autoplay circular>
        <swiper-item v-for="(item, index) in loop" :key="index" @click="goDetail(item)">
          <image :src="getImage(item.coverImage)" mode="scaleToFill" class="w-full h-full" />
        </swiper-item>
      </swiper>
    </n-list-cell>
    <n-list-cell v-for="(item, index) in data" :key="index">
      <view v-if="type === 'contracted'" class="p-3 relative" @click="goDetail(item)">
        <view class="w-full rounded-2xl px-3 py-5 box-border flex flex-col justify-between">
          <view class="font-bold">{{ getText(item.title) }}</view>
          <view class="flex justify-between items-center w-full mt-30rpx">
            <view
              class="w-150 h-150 bg-gray-200 bg-cover bg-center rounded-md"
              :style="{ backgroundImage: `url(${getImage(item.coverImage)})` }"
            ></view>
            <view class="h-150 w-480 text-28 text-gray-400 u-line-4">{{
              getText(item.indroduction)
            }}</view>
          </view>
        </view>
      </view>
      <view v-else class="px-3 pt-4 relative" @click="goDetail(item)">
        <div class="flex h-210 box-shadow rounded-20rpx overflow-hidden relative">
          <image
            v-if="extConfig.project !== 'luyao'"
            lazy-load
            :src="getImage(item.coverImage)"
            mode="aspectFill"
            class="w-240 h-210"
          />
          <view
            class="flex-1 flex flex-col justify-between content-between overflow-hidden ml-35rpx"
          >
            <view class="pt-24rpx pr-20rpx">
              <view class="w-full text-30">{{ getText(item.title) }}</view>
            </view>

            <div class="text-gray-400 flex items-center pb-24rpx justify-end">
              <span class="flex text-24 mr-3 text-gray">
                {{ item.publishTime }}
              </span>
            </div>
          </view>
          <image
            v-if="extConfig.project === 'luyao'"
            lazy-load
            :src="getImage(item.coverImage)"
            mode="aspectFill"
            class="w-240 h-210"
          />
        </div>
      </view>
    </n-list-cell>
    <blank v-if="!data.length && isLoaded"></blank>
  </n-list>
</template>

<script setup>
import { fetchNewsList } from '@/api/news'
import { getText, getImage } from '@/service/util'
import $t from '@/service/i18n'
import { getExtConfig } from '@/service/util'
const extConfig = ref(getExtConfig())

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
const type = ref('')

const list = ref()
const getNewsList = async (cp) => {
  const ins = list.value
  const params = {
    ...page.value,
    pageNum: cp,
    typeId: currentId.value ? currentId.value - 0 : '',
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
const loop = ref([])
const getRecommendNews = async () => {
  const params = {
    pageNum: 0,
    pageSize: 0,
    top: 1,
    typeId: currentId.value ? currentId.value - 0 : '',
  }
  const res = await fetchNewsList(params)
  loop.value = res.list
  console.log('@@@', res)
}

const currentId = ref(0)
onLoad((options) => {
  console.log('%c [ options ]-44', 'font-size:13px; background:pink; color:#bf2c9f;', options)
  uni.setNavigationBarTitle({
    title: options.title || $t('NewsList'),
  })
  if (options.type) {
    type.value = options.type
  }

  currentId.value = options.id
  getRecommendNews()
})
</script>

<style lang="scss" scoped></style>
