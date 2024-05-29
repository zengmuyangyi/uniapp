<template>
  <view
    class="min-h-100vh w-full"
    style="
      background-image: url(https://pqntourism.pcleartv.cn/FhzMOzzuUauNPtCCusxxpU5Rw5Uw);
      background-size: 100% 100%;
    "
  >
    <view class="w-full px-20rpx pt-40rpx box-border bg-no-repeat">
      <view
        v-for="(item, index) in buttonList"
        :key="index"
        class="w-full h-190 rounded-16rpx mb-27rpx pl-34rpx pr-50rpx box-border flex justify-between items-center"
        style="background: linear-gradient(134deg, #ffffff 0%, #fff8f8 100%)"
        @click="handleClick(item)"
      >
        <image :src="item.icon" mode="scaleToFill" class="w-100 h-100" />
        <view class="mx-36rpx flex-1">
          <view class="text-32 font-bold leading-48rpx tracking-1rpx text-#401010">{{
            item.name
          }}</view>
          <!-- <view class="mt-7rpx text-24 leading-33rpx tracking-1rpx text-#7b6b6b">{{
            item.description
          }}</view> -->
        </view>
        <image
          src="https://pqntourism.pcleartv.cn/FlLTcHwebggiYh07VGuGCJQ-eElt"
          mode="scaleToFill"
          class="w-40 h-40"
        />
      </view>
    </view>
  </view>
</template>

<script setup>
const buttonList = ref([
  {
    name: '培训资源库',
    description: '这里是集中培训班介绍',
    icon: 'https://pqntourism.pcleartv.cn/Fk2knvW6PnXadDvTUWGsMF4CFrBr',
    url: '/pages/jilinUniversity/courseTraining/index',
  },
  {
    name: '课程资源库',
    description: '这里是线上课程库介绍',
    icon: 'https://pqntourism.pcleartv.cn/FnXY01YoeOzCBrEHJcExkQxkec2f',
    url: '/pages/jilinUniversity/courseOnline/index',
  },
  {
    name: '线上直播课',
    description: '这里是线上直播课介绍',
    icon: 'https://pqntourism.pcleartv.cn/Fn7wkA6W_WJDJIOsRYi06gYq7k99',
  },
  // {
  //   name: '线上图书馆',
  //   description: '这里是线上图书馆介绍',
  //   icon: 'https://pqntourism.pcleartv.cn/FtxNgHrzWrXKpM-8ksTrVxcwfgoQ',
  // },
])
const handleClick = (item) => {
  if (item.url) {
    uni.navigateTo({
      url: item.url,
    })
  } else {
    uni.showToast({
      title: '正在建设中，敬请期待...',
      icon: 'none',
    })
  }
}
</script>

<style lang="scss" scoped></style>
