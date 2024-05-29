<template>
  <view>
    <view class="flex items-center ml-30rpx mt-65rpx relative">
      <view class="w-74 h-74 mr-8rpx">
        <image src="/static/ui/index-title.png" mode="scaleToFill" class="w-full h-full" />
      </view>
      <view class="title text-50rpx translate-y--19rpx font-style">{{ $t('Common') }}</view>
      <view class="bottom-10rpx left-148rpx absolute w-262 h-44">
        <image src="/static/ui/index-title-bg.png" class="w-full h-full" mode="scaleToFill" />
      </view>
    </view>
    <view class="mt-32rpx px-30rpx flex justify-between items-center">
      <view
        v-for="(item, index) in btn.children"
        :key="index"
        class="w-115 h-248 box-border flex justify-center items-center bg-cover font-style"
        :style="{ backgroundImage: `url(${item.img})` }"
        @click="goPage(item)"
      >
        <view class="w-30 text-45rpx text-white text-start leading-46rpx">{{
          getText(JSON.parse(item.name))
        }}</view>
      </view>
    </view>
  </view>
</template>

<script setup>
import $t from '@/service/i18n'
import { getText } from '@/service/util'
const { programTree } = useStore('scenic')
const btn = computed(() => {
  const data = programTree.value[0].children.find((i) => i.name.en === 'Common')
  return data
})
const goPage = (item) => {
  console.log('%c [ item ]-76', 'font-size:13px; background:pink; color:#bf2c9f;', item.code)
  navigateTo({ url: item.code })
}
</script>

<style scoped lang="scss"></style>
