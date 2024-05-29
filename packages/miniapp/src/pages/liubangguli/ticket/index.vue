<template>
  <view class="w-full min-h-100vh flex flex-col justify-center items-center bg-#f1f1f1">
    <view class="w-500 h-500 bg-white">
      <image
        :src="currentScenic.gzCode"
        mode="scaleToFill"
        show-menu-by-longpress="true"
        class="w-full h-full"
      />
    </view>
    <view class="mt-3 font-bold text-36 siyuan_ht">请长按识别二维码进入公众号购票</view>
  </view>
</template>

<script setup>
const { currentScenic } = useStore('scenic')
</script>
