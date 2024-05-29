<template>
  <view
    class="w-full h-full bg-contain"
    style="background-image: url(https://pqntourism.pcleartv.cn/FjdXH06StXmVTxHzy5tu6Txv1aOM)"
  >
    <view
      class="w-full h-full bg-no-repeat"
      style="
        background-image: url(https://pqntourism.pcleartv.cn/FvYMnGGvFsY5a4-I-ADD1Svpv4tg);
        background-size: 207rpx 106rpx;
        background-position: right bottom;
      "
    >
      <!-- 顶部导航栏 -->
      <n-position pos="top" box-style="width:750rpx;">
        <view class="bg-transparent">
          <n-height height="status"></n-height>
          <n-height height="nav">
            <view class="flex h-full w-full items-center px-3 justify-center">
              <span
                class="ic-baseline-arrow-back-ios absolute left-24 text-#3b220e"
                @click="handleBack"
              ></span>
              <span class="text-32 font-bold leading-46rpx text-center text-#3b220e siyuan_st"
                >馆藏珍品</span
              >
            </view>
          </n-height>
        </view>
      </n-position>
      <view
        class="w-full h-full bg-no-repeat pt-180rpx box-border"
        style="
          background-image: url(https://pqntourism.pcleartv.cn/FuTKpvREyaWMztaVBWmfgX0Um6P4);
          background-size: 448rpx 693rpx;
        "
      >
        <n-list
          :down="null"
          :up="null"
          height="window-!180rpx"
          bg-type="none"
          box-style="width:100%; height: 100%"
        >
          <n-list-cell>
            <view class="w-full px-30rpx box-border h-400 rounded-16rpx overflow-hidden relative">
              <swiper class="w-full h-full" @change="changeImage">
                <swiper-item
                  v-for="(image, index) in data.images ? formatImage(data.images) : data.cover"
                  :key="index"
                >
                  <view
                    class="w-full h-full bg-cover bg-center"
                    :style="{ backgroundImage: `url(${image})` }"
                  >
                  </view>
                </swiper-item>
              </swiper>

              <view
                class="absolute bottom-30 left-50% translate-x--50% w-230 h-62 bg-black bg-opacity-20 rounded-31rpx flex justify-center items-center"
                @click="handleClick"
              >
                <image
                  src="https://pqntourism.pcleartv.cn/FvsuU98eosY3Lfq1tukXy_G3qQ4F"
                  mode="scaleToFill"
                  class="w-44 h-33 mr-18rpx"
                />
                <view class="text-26 leading-37rpx text-white font-600">查看大图</view>
              </view>
            </view>
          </n-list-cell>
          <n-list-cell>
            <view
              class="mt-30rpx text-38 font-bold leading-55rpx tracking-1rpx px-30rpx box-border text-#3b220e siyuan_st"
              >{{ getText(data.title) }}</view
            >
          </n-list-cell>
          <n-list-cell v-if="getText(data.voiceIntroduction)">
            <view
              class="mt-30rpx text-32 font-bold leading-46rpx px-30rpx box-border text-#3b220e siyuan_st"
              >听讲解</view
            >
            <view class="w-full mt-6rpx px-30rpx box-border">
              <luch-audio
                v-model:play="audioPlay"
                :autoplay="true"
                :name="getText(data.title)"
                :src="getText(data.voiceIntroduction)"
                :poster="data.cover"
                audio-style="aqibwg"
              ></luch-audio>
              <view class="w-full h-1 mt-76rpx bg-#979797"></view>
            </view>
          </n-list-cell>
          <n-list-cell>
            <view class="w-full px-30rpx box-border mt-33rpx">
              <view class="text-32 font-bold leading-46rpx text-#3b220e siyuan_st">文物详情</view>
              <mpHtml
                :content="getText(data.content)"
                class="mt-20rpx text-26 leading-42rpx font-400 text-#3b220e"
              ></mpHtml>
            </view>
          </n-list-cell>
        </n-list>
      </view>
    </view>
  </view>
</template>

<script setup>
import { cultureApi } from '@/api/culture'
import { formatImage, getText } from '@/service/util'
import mpHtml from '@/components/mp-html/mp-html'
const data = ref({})
const currentImage = ref(0)
const getDetail = async (id) => {
  const res = await cultureApi.getItem({ id: id })
  console.log('@@@', res)
  data.value = res
}
// ----------顶部导航后退--------------
const handleBack = () => {
  uni.navigateBack()
}
const changeImage = (e) => {
  currentImage.value = e.detail.current
}
// --------------图片预览--------------------
const handleClick = () => {
  uni.previewImage({
    current: currentImage.value,
    urls: data.value.images ? formatImage(data.value.images) : data.value.cover,
  })
}
onLoad((options) => {
  getDetail(options.id - 0)
})
</script>
