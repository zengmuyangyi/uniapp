<template>
  <div v-if="data" class="p-20rpx">
    <div class="bg-#FDF6EC p-30rpx">
      <div class="text-#B10701 text-34rpx">
        {{ data.name }}
      </div>
      <div class="mt-10rpx text-28rpx">时间：{{ data.createTime }}</div>
    </div>

    <div class="my-20rpx">
      <mp-html :content="data.description"></mp-html>
    </div>

    <div v-if="data.downloadUrl" class="mt-100rpx">
      <div class="text-32rpx mb-28rpx">附件材料</div>

      <a
        class="bg-#F5F5F5 p-20rpx block flex items-center decoration-none"
        :download="data.name"
        :href="data.downloadUrl"
      >
        <img
          class="w-40 h-48 mr-20rpx"
          src="https://pqntourism.pcleartv.cn/FjTAy3ZBkhBuojfKZUcQlMnLYGH-"
          alt=""
        />
        {{ data.name }}
      </a>
    </div>
  </div>
</template>

<script setup>
import { fetchNoticeDetail } from '@/api/szgbxy'
const data = ref(null)
onLoad((options) => {
  fetchNoticeDetail(options.id).then((res) => {
    data.value = res
  })
})
</script>

<style lang=""></style>
