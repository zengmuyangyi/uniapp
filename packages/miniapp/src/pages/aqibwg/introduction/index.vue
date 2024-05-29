<template>
  <view
    class="w-full h-full bg-contain"
    style="background-image: url(https://pqntourism.pcleartv.cn/FjdXH06StXmVTxHzy5tu6Txv1aOM)"
  >
    <!-- 顶部导航栏 -->
    <n-position pos="top" box-style="width:750rpx;">
      <view class="bg-transparent">
        <n-height height="status"></n-height>
        <n-height height="nav">
          <view class="flex h-full w-full items-center px-3 justify-center">
            <span
              class="ic-baseline-arrow-back-ios absolute left-24 text-white"
              @click="handleBack"
            ></span>
            <span class="text-32 font-bold leading-46rpx text-center text-white siyuan_st"
              >展馆介绍</span
            >
          </view>
        </n-height>
      </view>
    </n-position>
    <n-list
      :down="null"
      :up="null"
      height="window"
      bg-type="none"
      box-style="width:100%; height: 100%"
    >
      <n-list-cell>
        <view class="w-full h-580">
          <uni-swiper-dot
            :info="formatImage(getText(currentScenic.images))"
            :current="current"
            mode="round"
            :dotsStyles="dotStyle"
          >
            <swiper autoplay circular style="height: 580rpx" @change="handleChange">
              <swiper-item
                v-for="(item, index) in formatImage(getText(currentScenic.images))"
                :key="index"
              >
                <view
                  class="w-full h-580 bg-cover bg-center"
                  :style="{ backgroundImage: `url(${item})` }"
                ></view>
              </swiper-item>
            </swiper>
          </uni-swiper-dot>
        </view>
      </n-list-cell>
      <n-list-cell>
        <view
          class="w-full bg-contain bg-white rounded-t-24rpx overflow-hidden translate-y--60rpx overflow-hidden"
          style="background-image: url(https://pqntourism.pcleartv.cn/FjdXH06StXmVTxHzy5tu6Txv1aOM)"
        >
          <view
            class="w-full bg-no-repeat px-30rpx pt-80rpx"
            style="
              background-image: url(https://pqntourism.pcleartv.cn/FogfnhEJqAmig7F2SuYrLDkX0Amk);
              background-size: 450rpx 130rpx;
            "
          >
            <view class="text-38 leading-55rpx tracking-1rpx font-bold text-#3b220e siyuan_st">{{
              getText(currentScenic.name)
            }}</view>
            <view class="mt-30rpx">
              <view class="flex items-center">
                <image
                  src="https://pqntourism.pcleartv.cn/FrlAvir_19OAGMejykx-IN13uJUf"
                  mode="scaleToFill"
                  class="w-40 h-40 mr-12rpx flex-shrink-0"
                />
                <view class="text-32 font-bold leading-46rpx text-#3b220e siyuan_st">展馆地址</view>
              </view>
              <view class="mt-18rpx">
                <view class="text-25 leading-36rpx tracking-1rpx font-400 text-#3b220e">{{
                  getText(currentScenic.address)
                }}</view>
              </view>
            </view>
            <view class="mt-60rpx">
              <view class="flex items-center">
                <image
                  src="https://pqntourism.pcleartv.cn/Fm_0xJEQbO9blZLw7A8_88Rx3Rq3"
                  mode="scaleToFill"
                  class="w-40 h-40 mr-12rpx flex-shrink-0"
                />
                <view class="text-32 font-bold leading-46rpx text-#3b220e siyuan_st">联系电话</view>
              </view>
              <view class="mt-18rpx">
                <view class="text-25 leading-36rpx tracking-1rpx font-400 text-#3b220e">{{
                  currentScenic.phone
                }}</view>
              </view>
            </view>
            <view class="mt-60rpx">
              <view class="flex items-center">
                <image
                  src="https://pqntourism.pcleartv.cn/FsChV06KHbxoNB3fXt0sI6DpZz2Z"
                  mode="scaleToFill"
                  class="w-40 h-40 mr-12rpx flex-shrink-0"
                />
                <view class="text-32 font-bold leading-46rpx text-#3b220e siyuan_st">开放时间</view>
              </view>
              <view class="mt-18rpx">
                <view class="text-25 leading-36rpx tracking-1rpx font-400 text-#3b220e">{{
                  currentScenic.openTime
                }}</view>
              </view>
            </view>
            <view class="mt-60rpx">
              <view class="flex items-center">
                <image
                  src="https://pqntourism.pcleartv.cn/Fot_cRNOPe4Wf9EpghFd_KF0Oh3P"
                  mode="scaleToFill"
                  class="w-40 h-40 mr-12rpx flex-shrink-0"
                />
                <view class="text-32 font-bold leading-46rpx text-#3b220e siyuan_st">交通路线</view>
              </view>
              <view class="mt-18rpx">
                <view class="text-25 leading-36rpx tracking-1rpx font-400 text-#3b220e">{{
                  getText(currentScenic.trafficWay)
                }}</view>
              </view>
            </view>
            <view class="w-full h-1 mt-60rpx mb-45rpx bg-#979797"></view>
            <view class="text-32 font-bold leading-46rpx text-#3b220e siyuan_st">场馆介绍</view>
            <mpHtml
              :content="getText(currentScenic.introduction)"
              class="mt-20rpx text-25 leading-42rpx font-400 text-#3b220e"
            ></mpHtml>
          </view>
        </view>
      </n-list-cell>
    </n-list>
  </view>
</template>

<script setup>
import { getText, formatImage } from '@/service/util'
const dotStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.28)',
  border: '1px rgba(255, 255, 255, 0.28) solid',
  selectedBackgroundColor: 'rgba(255, 255, 255, 1)',
  selectedBorder: '1px rgba(255, 255, 255, 1) solid',
  bottom: 45,
}
const { currentScenic } = useStore('scenic')
const current = ref(0)
const handleChange = (e) => {
  current.value = e.detail.current
}
// ----------顶部导航后退--------------
const handleBack = () => {
  uni.navigateBack()
}
</script>

<style lang="scss" scoped></style>
