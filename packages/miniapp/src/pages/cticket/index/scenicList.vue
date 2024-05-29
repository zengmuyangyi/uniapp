<template>
  <div>
    <div class="mb-10rpx font-bold text-30rpx">景点列表</div>

    <div class="bg-white p-20rpx rounded-10rpx">
      <scroll-view scroll-with-animation scroll-x>
        <div v-if="scenicList && scenicList.list" class="w-full whitespace-nowrap">
          <div
            v-for="(item, index) in scenicList.list"
            :key="index"
            class="inline-block mr-30rpx"
            @click="current = index"
          >
            <div
              :class="current === index ? 'ring-10rpx ring-green-200' : ''"
              class="w-180rpx h-100rpx bg-contain bg-no-repeat bg-center shadow-md rounded-10rpx m-10rpx overflow-hidden"
              :style="{
                backgroundImage: `url(${blankImage})`,
              }"
            >
              <img v-if="getCover(item)" :src="getCover(item)" class="w-full h-full" />
            </div>
            <div
              :class="current === index ? 'text-green-500' : ''"
              class="text-24rpx mt-16rpx text-center"
            >
              {{ item.name }}
            </div>
          </div>
        </div>
      </scroll-view>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, inject, watch, onMounted } from 'vue'
import cticketApi from '@/api/cticket'
const blankImage =
  'https://pqncdn.cleartv.cn/pres/resources/4c2c0de1f90002c6afe54f66825bc68e_DXzZfW4U_230608184428.png'

const current = ref(0)
const scenicList = ref(null)

function getCover(item) {
  return item.pictures?.[0]?.url
}

const currentScenic = inject('currentScenic', null)
const currentData = computed(() => {
  return scenicList?.value?.list[current.value]
})

watch(
  () => currentData.value,
  (val) => {
    currentScenic.value = val
  },
  { immediate: true }
)

onMounted(() => {
  cticketApi.getScenic().then((res) => {
    if (res?.data?.resCode === 200) {
      const { extraInfo: scenicList_val, ...rest } = res.data
      scenicList.value = scenicList_val
    } else {
      scenicList.value = null
    }
  })
})
</script>

<style lang=""></style>
