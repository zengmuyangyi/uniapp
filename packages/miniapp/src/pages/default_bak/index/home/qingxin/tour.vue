<template>
  <view class="w-full py-15rpx bg-#f6f6f6">
    <view class="w-full bg-white p-30rpx box-border">
      <view class="text-36 font-bold tracking-3rpx">{{ $t('GuideTour') }}</view>
      <view
        class="w-full h-310 bg-contain mt-26rpx rounded-16rpx overflow-hidden"
        :style="{ backgroundImage: `url(${tour.img})` }"
        @click="goTour"
      >
        <view class="w-full h-86 bg-white bg-opacity-80 flex items-center px-20rpx">
          <view
            v-for="(tag, index) in tags"
            :key="index"
            class="h-40 rounded-28rpx mr-20rpx flex items-center mr-8rpx px-20rpx"
            style="background: linear-gradient(90deg, #71d167 0%, #0caf83 100%)"
          >
            <view class="w-30 h-30 flex justify-center items-center">
              <image :src="tag.tagImg" mode="scaleToFill" class="w-full h-full" />
            </view>
            <view class="text-white text-24 leading-30rpx">{{ tag.name }}</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import $t from '@/service/i18n'
const props = defineProps({
  componentStyle: {
    type: String,
    default: () => '',
  },
})
const tags = computed(() => {
  return [
    {
      name: $t('Scenic'),
      tagImg: '/static/index/qingxin/tour-tag1.png',
    },
    {
      name: $t('SmartGuides'),
      tagImg: '/static/index/qingxin/tour-tag2.png',
    },
    {
      name: $t('SmartGuidesDes'),
      tagImg: '/static/index/qingxin/tour-tag3.png',
    },
  ]
})
const { programTree } = useStore('scenic')
const tour = computed(() => {
  const data = programTree.value[0].children.find((i) => i.code === 'tour')
  return data
})
const goTour = () => {
  navigateTo({ url: 'map/index' })
}
</script>

<style lang="scss" scoped></style>
