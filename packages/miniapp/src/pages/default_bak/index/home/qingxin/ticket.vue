<template>
  <view v-if="currentScenic.ticketUrl" class="p-30rpx w-full box-border">
    <view
      class="w-full h-170 rounded-26rpx overflow-hidden p-10rpx box-border bg-cover"
      :style="{ backgroundImage: `url(${ticket.img})` }"
      @click="goPage(currentScenic.ticketUrl)"
    >
      <view
        class="w-full h-full border-2 border-solid border-white rounded-24rpx box-border flex justify-center items-center"
      >
        <view class="flex items-center text-white text-46">
          <view class="tracking-9rpx">{{ $t('BuyTicket') }}</view>
          <view class="ml-57rpx w-50 h-50">
            <image src="/static/index/next.png" mode="scaleToFill" class="w-full h-full" />
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
const { programTree, currentScenic } = useStore('scenic')
const ticket = computed(() => {
  const data = programTree.value[0].children.find((i) => i.code === 'ticket')
  return data
})
const goPage = (path) => {
  uni.navigateToMiniProgram({
    shortLink: path,
    success(res) {
      console.log(res)
    },
  })
}
</script>

<style lang="scss" scoped></style>
