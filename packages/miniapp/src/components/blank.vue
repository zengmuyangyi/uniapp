<template>
  <n-list-cell>
    <div class="w-full h-80vh flex flex-col justify-center items-center text-gray">
      <image class="h-210 w-210" src="/static/ui/blank2.png" mode="heightFix" />
      <span v-if="!hideText" class="mt-24rpx text-30 text-#b3b3b3">{{ $t('NoData') }}</span>
    </div>
    <!-- <div class="flex flex-col justify-center items-center text-gray p-5">
      <image class="h-350 w-350" src="/static/ui/blank.png" mode="heightFix" />
      <span v-if="!hideText" class="-mt-100rpx text-24">{{ $t('NoData') }}</span>
    </div> -->
  </n-list-cell>
</template>

<script setup>
import $t from '@/service/i18n'

defineProps({
  hideText: {
    type: Boolean,
    default: false,
  },
})
</script>

<style lang=""></style>
