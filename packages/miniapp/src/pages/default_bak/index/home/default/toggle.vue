<template>
  <n-position
    pos="top"
    offset="status"
    class="flex justify-center z-999"
    box-style="left:20rpx; margin-top:20rpx"
  >
    <div
      class="rounded-27 text-white rounde-2 text-26 h-54 w-182 flex justify-center items-center border border-white"
      @click="setLanguage(language === 'cn' ? languageList[1]?.code : languageList[0]?.code)"
    >
      {{ $t('toggle') }}
      <span class="ml-10rpx">
        {{ language === 'cn' ? languageList[1]?.name : languageList[0]?.code }}
      </span>
    </div>
  </n-position>
</template>

<script setup>
import $t from '@/service/i18n'
const { language, languageList, setLanguage } = useStore('scenic')
</script>
