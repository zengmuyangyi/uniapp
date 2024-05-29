<template>
  <!-- window-!status-!nav-!136rpx -->
  <n-list v-if="data" bg-type="inverse" :down="null" :up="null" height="window">
    <n-list-cell>
      <div class="px-3 pt-20px">
        <div class="font-bold text-40">{{ getText(data.title) }}</div>
        <div class="text-gray mt-2 border-b pb-2 border-gray-200 text-24">
          <!-- 发布时间：{{ data.publishTime }} -->
        </div>
      </div>
    </n-list-cell>
    <n-list-cell>
      <div class="p-3">
        <mp-html :content="getText(data.content)" />
      </div>
    </n-list-cell>
  </n-list>
</template>

<script setup>
import mpHtml from '@/components/mp-html/mp-html'
import { fetchNews, fetchNewsList } from '@/api/news'
import { getImage, getText } from '@/service/util'
const data = ref()

const pastNews = ref([])
const changeTextColor = ref(true)
const getNewsList = async () => {
  const params = {
    pageSize: 3,
    pageNum: 1,
    recommend: 1,
  }
  const res = await fetchNewsList(params)
  pastNews.value = res.list
  console.log('@@@', res)
}
const timer = setInterval(() => {
  changeTextColor.value = !changeTextColor.value
}, 500)
const goPage = (newsInfo) => {
  navigateTo({
    url: `webLink/index?url=${newsInfo.url}&title=${getText(newsInfo.title)}`,
  })
}
onLoad((option) => {
  console.log('%c [ option ]-32', 'font-size:13px; background:pink; color:#bf2c9f;', option)
  fetchNews(option.id).then((res) => {
    data.value = res

    uni.setNavigationBarTitle({ title: getText(res.title) })
  })
  getNewsList()
})
onUnload(() => {
  clearInterval(timer)
})
</script>

<style lang="scss"></style>
