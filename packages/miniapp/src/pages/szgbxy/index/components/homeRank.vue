<template>
  <view class="w-full mt-64rpx">
    <view class="flex items-center mb-30rpx px-20rpx">
      <image
        src="https://pqntourism.pcleartv.cn/FkKfbpXV5Xz_RJnilFxTmLQ2RB2s"
        mode="scaleToFill"
        class="w-38 h-38 mr-12rpx"
      />
      <view class="text-32 leading-45rpx font-600">排名展示</view>
    </view>
    <view class="w-full px-20rpx box-border">
      <n-tabs-h
        :value="currentType"
        :is-tap="true"
        :items="typeList"
        :delay="50"
        space="50rpx"
        indicator-height="5rpx"
        textType="nav-title"
        textStyle="font-size: 26rpx; line-height: 37rpx;"
        active-text-type="szgbxy"
        activeTextStyle="font-weight: 600"
        width="0"
        left="0rpx"
        right="40rpx"
        indicator-width="82rpx"
        indicatorRadius="0"
        indicatorStyle="bottom: 10rpx"
        indicator-type="szgbxy"
        @change="toChangeTab"
      ></n-tabs-h>
    </view>
    <view
      class="mt-30rpx w-full px-20rpx pt-40rpx box-border bg-no-repeat"
      style="
        background-image: url(https://pqntourism.pcleartv.cn/Frwe2zr77qSwegejYkw2JKcur9tT);
        background-size: 100% 388rpx;
      "
    >
      <view class="w-full bg-white rounded-8rpx pt-30rpx pb-38rpx">
        <view class="flex items-center pl-50rpx mb-22rpx">
          <view class="text-24 leading-40rpx tracking-1rpx text-#6b6b6b yahei">排名</view>
          <view class="text-24 leading-40rpx tracking-1rpx ml-38rpx text-#6b6b6b yahei"
            >课程/单位名称</view
          >
        </view>
        <view class="w-full text-30 h-60 yahei">正在建设中，敬请期待</view>
        <view
          v-for="(item, index) in data"
          :key="index"
          class="flex items-center pl-46rpx pr-30rpx"
          :class="index ? 'mt-30rpx' : ''"
        >
          <image :src="rangeIcon[index]" mode="scaleToFill" class="w-60 h-60 mr-34rpx" />
          <view class="w-540 truncate text-26 leading-40rpx tracking-1rpx yahei">{{
            item.title
          }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
const currentType = ref(0)
const typeList = ref(['课程点击排名', '单位学习排名'])
//------------------Tab 切换------------------
const toChangeTab = async (i) => {
  currentType.value = i
}
const rangeIcon = ref([
  'https://pqntourism.pcleartv.cn/FsI4BYfeC0v9P9mDWGgrzQwVZje0',
  'https://pqntourism.pcleartv.cn/Fo6XDUwljaY9c-ED_yWYmVnU9A6d',
  'https://pqntourism.pcleartv.cn/FoX_T6LtHQiqhmrKzycXM-sZas7f',
])
const data = ref([])
</script>

<style lang="scss" scoped></style>
