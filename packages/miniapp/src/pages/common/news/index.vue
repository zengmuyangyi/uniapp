<template>
  <!-- window-!status-!nav-!136rpx -->
  <n-list v-if="data" bg-type="inverse" :down="null" :up="null" height="screen">
    <n-list-cell>
      <div class="px-3 pt-20px">
        <div class="font-bold text-40">{{ getText(data.title) }}</div>
        <div class="text-gray mt-2 border-b pb-2 border-gray-200 text-24">
          发布时间：{{ dayjs(data.createTime).format('YYYY-MM-DD') }}
        </div>
      </div>
    </n-list-cell>
    <n-list-cell>
      <div class="p-3 pb-20">
        <mp-html :content="getText(data.content)" />
      </div>
    </n-list-cell>
    <n-list-cell v-if="pastNews.length">
      <view class="px-3">
        <view class="w-full box-border h-150 flex justify-center items-center">
          <view class="w-50 h-1 bg-black mx-10rpx"></view>
          <view class="font-bold text-28"
            >往期精彩<text :style="{ color: `${changeTextColor ? 'skyblue' : 'purple'}` }"
              >推荐</text
            ></view
          >
          <view class="w-50 h-1 bg-black mx-10rpx"></view>
        </view>
        <view
          v-for="(news, index) in pastNews"
          :key="index"
          class="w-full py-2 h-160"
          @click="goPage(news)"
        >
          <view
            class="w-full h-full box-border rounded-2xl bg-cover bg-center overflow-hidden"
            :style="{ backgroundImage: `url(${getImage(news.coverImage)})` }"
          >
            <view class="w-full h-full bg-black bg-opacity-50 p-3 box-border">
              <view
                class="w-full h-full border-4 border-white rounded-2xl box-border flex justify-center items-center text-center"
                ><view class="text-white text-30 mx-4 u-line-2">{{
                  getText(news.title)
                }}</view></view
              >
            </view>
          </view>
        </view>
      </view>
    </n-list-cell>
  </n-list>
</template>

<script setup>
import mpHtml from '@/components/mp-html/mp-html'
import { fetchNews, fetchNewsList } from '@/api/news'
import { getImage, getText } from '@/service/util'
import dayjs from 'dayjs'
const data = ref()

const pastNews = ref([])
const changeTextColor = ref(true)
const getNewsList = async () => {
  const params = {
    pageSize: 3,
    pageNum: 1,
    recommend: 1,
    menuId: data.value?.id,
  }
  const res = await fetchNewsList(params)
  pastNews.value = res.list
  console.log('@@@', res)
}
const timer = setInterval(() => {
  changeTextColor.value = !changeTextColor.value
}, 500)
const goPage = (newsInfo) => {
  if (newsInfo.url) {
    navigateTo({
      url: `webLink/index?url=${newsInfo.url}&title=${getText(newsInfo.title)}`,
    })
  } else {
    uni.pageScrollTo({
      scrollTop: 0,
    })
    uni.setNavigationBarTitle({ title: getText(newsInfo.title) })
    data.value = newsInfo
  }
}
onLoad((option) => {
  console.log('%c [ option ]-32', 'font-size:13px; background:pink; color:#bf2c9f;', option)
  fetchNews(option.id).then((res) => {
    data.value = res

    uni.setNavigationBarTitle({ title: getText(res.title) })

    getNewsList()
  })
})
onUnload(() => {
  clearInterval(timer)
})
</script>

<style lang="scss"></style>
