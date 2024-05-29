<template>
  <n-waterfall
    ref="list"
    bg-type="inverse"
    :auto-update="true"
    :column-count="2"
    left-gap="20rpx"
    right-gap="20rpx"
    column-gap="10rpx"
    height="window"
    @down="toLoadData"
    @up="toLoadData"
  >
    <!-- <view slot="header" style="height: 20rpx"></view> -->
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
            v-if="idx === 0"
            :style="block.style"
            :class="block.class"
            class="w-full h-180 rounded-10rpx bg flex relative mb-3 relative overflow-hidden"
          >
            <div class="absolute opacity-10" :class="block.bgPos">
              <image :src="block.icon" mode="scaleToFill" class="w-330 h-330" />
            </div>
            <div class="absolute top-27 right-8">
              <image lazy-load :src="block.icon" mode="scaleToFill" class="w-120 h-120" />
            </div>
            <view class="flex-1 pt-40rpx pl-20rpx text-32 relative">
              {{ block.name }}

              <view class="text-26 text-gray mt-8rpx">{{ block.des }}</view>
            </view>
          </div>
          <div
            v-else
            class="rounded-10rpx overflow-hidden bg-white mb-20rpx shadow-md"
            @click="goPage(item)"
          >
            <image lazy-load :src="item.cover" class="w-345 block" mode="widthFix"></image>
            <div class="p-20rpx py-15rpx">{{ getText(item.title) }}</div>
          </div>
        </div>
      </template>
      <template #right="{ rights }">
        <div v-for="(item, idx) in rights" :key="idx">
          <div
            class="rounded-10rpx overflow-hidden bg-white mb-20rpx shadow-md"
            @click="goPage(item)"
          >
            <image lazy-load :src="item.cover" class="w-345 block" mode="widthFix"></image>
            <div class="p-20rpx py-15rpx">{{ getText(item.title) }}</div>
          </div>
        </div>
      </template>
    </n-waterfall-view>
  </n-waterfall>
</template>

<script setup>
import { cultureApi as api } from '@/api/culture'
import $t from '@/service/i18n'
import { getText } from '@/service/util'
const { getMenu } = useStore('scenic')
const menuId = ref({})
const block = {
  name: $t('Culture'),
  des: $t('CultureDes'),
  bgPos: 'left-100 -top-50',
  class: 'rounded-20rpx rounded-tl-none',
  style: { background: '#E7F3FF' },
  icon: '/static/index/b4.png',
  url: `/pages/culture/index`,
}

const list = ref()
const water = ref()
const toLoadData = async (cp) => {
  menuId.value = await getMenu('culture')
  const ins = list.value
  console.log('%c [ cp ]-55', 'font-size:13px; background:pink; color:#bf2c9f;', cp)
  api.getList({ pageSize: 10, pageNum: 1, menuId: menuId.value.id }).then((res) => {
    console.log('%c [ res ]-58', 'font-size:13px; background:pink; color:#bf2c9f;', res)
    if (cp === 1) {
      const listData = res.list
      listData.unshift({})
      water.value.clear()
      water.value.set(res.list)
    } else {
      water.value.concat(res.list)
    }

    ins.nEndSuccess(!!res.nextPage)
  })
}

function goPage(item) {
  navigateTo({
    url: `culture/detail?id=${item.id}`,
  })
}
const { currentScenic } = useStore('scenic')
onShareAppMessage(() => {
  return {
    title: getText(currentScenic.value.name),
    path: `/pages/common/culrure/index`,
  }
})
</script>

<style lang=""></style>
