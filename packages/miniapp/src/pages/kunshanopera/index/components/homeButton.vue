<template>
  <view class="w-full">
    <view
      @click="goBookPage"
      class="w-full h-220 flex justify-between items-center px-30rpx py-45rpx box-border bg-#eaeaea"
    >
      <view class="w-360 flex flex-col justify-between h-full">
        <view class="siyuan_ht text-32 leading-48rpx font-bold truncate">{{
          getText(currentScenic.name)
        }}</view>
        <view class="w-full text-24 leading-36rpx siyuan_ht truncate">{{
          currentScenic.openTime
        }}</view>
        <view class="w-full truncate siyuan_ht text-24 leading-36rpx text-#737373">{{
          getText(currentScenic.address)
        }}</view>
      </view>
      <view class="flex-shrink-0 flex items-center">
        <view class="siyuan_ht text-32 leading-48rpx font-bold">立即预约</view>
        <image
          src="https://pqntourism.pcleartv.cn/Fm05xiZgonmJd0GwKg3L_yuzsFQV"
          mode="scaleToFill"
          class="w-28 h-28 ml-10rpx"
        />
      </view>
    </view>
    <view class="mt-40rpx w-full flex justify-between items-center">
      <view @click="goIntroduction" class="w-420 h-170 relative">
        <image
          src="https://pqntourism.pcleartv.cn/FqpOjDIv5tZFQVmbn1sSwgtf17-9"
          mode="scaleToFill"
          class="w-full h-full box-border"
        />
        <view class="absolute w-full h-full top-0 left-0 px-30rpx py-32rpx box-border">
          <view class="flex items-center">
            <view class="siyuan_ht text-32 leading-48rpx font-bold">博物馆概况</view>
            <image
              src="https://pqntourism.pcleartv.cn/Fm05xiZgonmJd0GwKg3L_yuzsFQV"
              mode="scaleToFill"
              class="w-28 h-28 ml-10rpx"
            />
          </view>
          <view class="mt-20rpx text-22 leading-33rpx siyuan_ht">关于博物馆的相关信息</view>
        </view>
      </view>
      <view @click="goTransport" class="w-227 h-170 relative">
        <image
          src="https://pqntourism.pcleartv.cn/FvZJFxaPb1Ny9cUff30EUXsKrBzU"
          mode="scaleToFill"
          class="w-full h-full"
        />
        <view class="absolute w-full h-full top-0 left-0 pl-25rpx py-32rpx box-border">
          <view class="flex items-center">
            <view class="siyuan_ht text-32 leading-48rpx font-bold">交通指引</view>
            <image
              src="https://pqntourism.pcleartv.cn/Fm05xiZgonmJd0GwKg3L_yuzsFQV"
              mode="scaleToFill"
              class="w-28 h-28 ml-10rpx"
            />
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import $t from '@/service/i18n'
import { getText, navigateTo } from '@/service/util'
const { currentScenic } = useStore('scenic')
const newsType = inject('newsType', '')
const goBookPage = () => {
  navigateTo({ url: '/pages/kunshanopera/bookPage/index' })
}
const goIntroduction = () => {
  navigateTo({ url: '/pages/kunshanopera/introduction/index' })
}
const goTransport = () => {
  navigateTo({ url: `newsList/index?id=${newsType.value.gonglue || ''}&title=${$t('Strategy')}` })
}
</script>

<style scoped lang="scss"></style>
