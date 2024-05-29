<template>
  <view
    class="n-flex-row n-justify-center n-overflow-hidden"
    :style="mrItemStyle + mrFirstMargin + mrLastMargin + aniStyle"
    @tap="clicked"
  >
    <view ref="ngalleryvitem" class="n-overflow-hidden" :style="mrItemStyle">
      <slot></slot>
    </view>
  </view>
</template>

<script setup>
import { inject, computed, ref } from 'vue'

const index = ref(0)
const isFirst = ref(false)
const isLast = ref(false)
const aniStyle = ref('')
const ngalleryvitem = ref(null)

const nGalleryV = inject('nGalleryV')

index.value = nGalleryV.children.value.length
nGalleryV.pushChild({ index: index.value, ngalleryvitem: ngalleryvitem, initLayout, fitStyles })

const mrItemStyle = computed(() => {
  return nGalleryV.mrItemStyle.value
})
const mrFirstMargin = computed(() => {
  return isFirst.value ? nGalleryV.firstMargin.value : ''
})
const mrLastMargin = computed(() => {
  return isLast.value ? nGalleryV.lastMargin.value : ''
})

function clicked() {
  nGalleryV.emitEvent(index.value)
}
function initLayout() {
  if (index.value === 0) {
    isFirst.value = true
  }
  if (index.value === nGalleryV.children.value.length - 1) {
    isLast.value = true
  }
}
function fitStyles(num) {
  if (index.value == num) {
    aniStyle.value = 'transition-property:transform;transform:scale(1,1);transition-duration:200ms;'
  } else {
    aniStyle.value = `transition-property:transform;transform:scale(${0.86},${0.92});transition-duration:200ms;`
  }
}
</script>

<style lang="scss" scoped></style>
