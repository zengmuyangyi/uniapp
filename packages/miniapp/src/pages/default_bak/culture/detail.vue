<template>
  <n-list v-if="data" bg-type="inverse" :down="null" :up="null" height="window">
    <n-list-cell>
      <div class="relative">
        <image :src="data.cover" class="w-full block mb-20rpx" mode="widthFix"></image>
        <div class="px-20rpx text-center absolute w-full top-50% text-white text-shadow-md">
          <div class="font-bold text-60">{{ getText(data.title) }}</div>
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
import { cultureApi } from '@/api/culture'
import mpHtml from '@/components/mp-html/mp-html'
import { getText } from '@/service/util'
const data = ref()

onLoad((option) => {
  cultureApi.getItem({ id: option.id }).then((res) => {
    data.value = res

    uni.setNavigationBarTitle({ title: getText(res.title) })
  })
})
</script>

<style lang=""></style>
