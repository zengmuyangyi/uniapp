<template>
  <div
    class="absolute bottom-0 bg-white transition duration-500 delay-500 w-full overflow-hidden z-2000"
  >
    <van-swipe ref="swiper" :autoplay="0" @change="handleChange">
      <van-swipe-item v-for="(item, index) in data" :key="index">
        <div class="flex h-full p-10">
          <div
            class="bg-cover w-100 h-100 rounded-5 mr-5"
            :style="{ backgroundImage: `url(${getText(item.templateMapRoute.coverImage)})` }"
          ></div>
          <div class="flex-1 text-14">
            <div class="text-16">{{ getText(item.templateMapRoute.name) }}</div>
            <div class="mt-10">{{ $t('via') }}</div>
            <div>
              {{ $t('entire') }}
              <span class="text-yellow-600"
                >{{ item.templateMapRoute.length }}{{ $t('meters') }}</span
              >
              {{ $t('visitTime') }}
              <span class="text-yellow-600"
                >{{ item.templateMapRoute.duration }}{{ $t('minutes') }}</span
              >
            </div>
          </div>
        </div>
      </van-swipe-item>

      <template #indicator="{ active, total }">
        <div class="absolute right-0 bottom-0 bg-black bg-opacity-30 text-white p-3 px-10">
          {{ active + 1 }} / {{ total }}
        </div>
      </template>
    </van-swipe>
  </div>
</template>

<script setup>
import { getText } from '@/utils'
import { nextTick } from 'vue'
import $t from '@/utils/i18n'

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  index: {
    type: Number,
    default: 0,
  },
})

const swiper = ref(null)

watch(
  () => props.index,
  (val) => {
    nextTick(() => {
      swiper.value.swipeTo(val)
    })
  },
  {
    immediate: true,
  }
)

const emit = defineEmits(['change'])
const handleChange = (e) => {
  emit('change', e)
}
</script>

<style lang=""></style>
