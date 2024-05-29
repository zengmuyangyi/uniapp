<template>
  <div v-if="props.componentStyle === 'default'" class="text-34 ml-3">
    {{ $t('VRTour') }}
  </div>
  <div class="relative overflow-hidden m-3 rounded-3" @click="handleClick">
    <image :src="vr" mode="aspectFill" class="image w-full h-240" />
    <image src="/static/index/vr.png" class="w-120 h-120 icon" mode="scaleToFill" />
  </div>
</template>

<script setup>
import { getImage } from '@/service/util'
import $t from '@/service/i18n'
const { currentScenic } = useStore('scenic')

const panoramic = computed(() => {
  return currentScenic.value.panoramic
})
const vr = computed(() => {
  return currentScenic.value.vr || getImage(currentScenic.value.images)?.split(',')?.[0]
})
const props = defineProps({
  componentStyle: {
    type: String,
    default: () => 'default',
  },
})

const handleClick = () => {
  if (!panoramic.value) {
    uni.showToast({
      title: '暂无',
      icon: 'none',
    })
    return
  }
  navigateTo({ url: 'vr/index' })
}
</script>

<style lang="scss" scoped>
.icon {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.image {
  animation: ani 16s linear infinite reverse both;
  animation-delay: 1s;
}

@keyframes ani {
  0% {
    transform: scale(1.1);
  }
  25% {
    transform: scale(1.5);
  }
  50% {
    transform: translateX(15%) scale(1.5);
  }
  75% {
    transform: translateX(-15%) scale(1.5);
  }
  100% {
    transform: scale(1.1);
  }
}
</style>
