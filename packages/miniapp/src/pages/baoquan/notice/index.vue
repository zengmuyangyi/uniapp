<template>
  <n-list v-if="data" bg-type="inverse" :down="null" :up="null" height="screen">
    <n-list-cell>
      <div class="px-3 pt-20px">
        <div class="font-bold text-40">{{ getText(data.title) }}</div>
        <div class="text-gray mt-2 border-b pb-2 border-gray-200 text-24">
          发布时间：{{ data.createTime }}
        </div>
      </div>
    </n-list-cell>
    <n-list-cell>
      <div class="p-3 pb-20">
        <mp-html :content="getText(data.content)" />
      </div>
    </n-list-cell>
  </n-list>
</template>

<script setup>
import mpHtml from '@/components/mp-html/mp-html'
import { fetchAnnouncementDetail } from '@/api/scenic'
import { getImage, getText } from '@/service/util'
const data = ref({})
onLoad((options) => {
  if (options.id) {
    fetchAnnouncementDetail(options.id).then(
      (res) => {
        data.value = res
        uni.setNavigationBarTitle({ title: getText(res.title) })
        console.log('%%%%%', res)
      },
      (err) => {
        console.log(err)
      }
    )
  }
})
</script>
