<template>
  <view class="w-full">
    <video :src="getText(currentScenic.videoIntroduction)" autoplay class="w-full" />
  </view>
</template>

<script setup>
import { getText } from '@/service/util'
const { currentScenic } = useStore('scenic')
</script>
