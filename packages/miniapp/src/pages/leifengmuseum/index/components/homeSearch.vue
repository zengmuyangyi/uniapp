<template>
  <view class="pt-109rpx w-full px-38rpx box-border flex flex-col items-center">
    <image
      src="https://pqntourism.pcleartv.cn/FgFdEGDebxHq8npZw5K6AG3zRBZ4"
      mode="scaleToFill"
      class="w-202 h-54"
    />
    <!-- <image
      src="https://pqntourism.pcleartv.cn/FokDEEVzr6qKZhfKZYvDD6Oqe62o"
      mode="scaleToFill"
      class="w-100 h-70"
    /> -->
    <view class="w-full flex items-center mt-44rpx">
      <view
        :class="mode ? 'h-80' : 'h-66'"
        class="flex-1 bg-white rounded-full px-30rpx box-border flex items-center"
      >
        <image
          src="https://pqntourism.pcleartv.cn/Fqa3RsaNsLrJZZ5cYJ583NHUxhKE"
          mode="scaleToFill"
          class="w-32 h-32 mr-19rpx"
        />
        <input
          class="flex-1"
          type="text"
          placeholder="搜索新闻"
          :placeholderStyle="`font-size: ${
            mode ? '34rpx' : '30rpx'
          };color: #999; font-weight: 500;line-height: ${mode ? '48rpx' : '32rpx'}`"
          @confirm="search"
        />
      </view>
      <view @click="handleClick" class="flex items-center ml-28rpx flex-shrink-0">
        <view
          class="text-32 font-500 text-#8b0500"
          :style="{ lineHeight: mode ? '45rpx' : '35rpx' }"
          :class="mode ? '' : ''"
          >{{ mode ? '普通模式' : '适老模式' }}</view
        >
        <image
          src="https://pqntourism.pcleartv.cn/FpPzNAusqGnerpvOqZdWx7gUmmKl"
          mode="scaleToFill"
          class="w-28 h-24 ml-14rpx"
        />
      </view>
    </view>
  </view>
</template>

<script setup>
const { mode, setMode } = useStore('user')
const search = (e) => {
  if (e.detail.value.trim()) {
    uni.navigateTo({
      url: `/pages/leifengmuseum/newsList/index?name=${e.detail.value.trim()}`,
    })
  } else {
    uni.showToast({ title: '请输入正确的查询内容', icon: 'none' })
  }
}
const handleClick = () => {
  setMode(!mode.value)
}
</script>

<style lang="scss" scoped></style>
