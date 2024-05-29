<template>
  <view
    class="n-flex-row n-overflow-hidden"
    :style="mrItemStyle + mrFirstMargin + mrLastMargin + aniStyle"
    @tap="clicked"
  >
    <view ref="ngalleryitem" class="n-overflow-hidden" :style="mrItemStyle">
      <slot></slot>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, inject, watch } from 'vue'

const index = ref(0)
const isFirst = ref(false)
const isLast = ref(false)
const aniStyle = ref('')
const ngalleryitem = ref(null)

const nGallery = inject('nGallery')

const mrItemStyle = computed(() => {
  if (!nGallery) {
    return ''
  }
  return nGallery.mrItemStyle.value
})
const mrFirstMargin = computed(() => {
  if (!nGallery) {
    return ''
  }
  return isFirst.value ? nGallery.firstMargin.value : ''
})
const mrLastMargin = computed(() => {
  if (!nGallery) {
    return ''
  }
  return isLast.value ? nGallery.lastMargin.value : ''
})

// 不需要放到onMounted里面
index.value = nGallery.children.value.length
// we push template-ref into parent
// 2. 我们可以直接通过provide，把对应的方法提交过去，这样可以在父组件中直接调用
nGallery.pushChild({ index: index.value, ngalleryitem: ngalleryitem, fitStyles: fitStyles })

// 1. 我们可以watch provide中的值，通过provide来触发自组件更新
watch(nGallery.initTime, () => {
  initLayout()
})

function clicked() {
  nGallery.emitEvent(index.value)
}
function initLayout() {
  if (index.value === 0) {
    isFirst.value = true
  }
  if (index.value === nGallery.children.value.length - 1) {
    isLast.value = true
  }
}
function fitStyles(num) {
  if (index.value == num) {
    aniStyle.value = 'transition-property:transform;transform:scale(1,1);transition-duration:200ms;'
  } else {
    aniStyle.value = `transition-property:transform;transform:scale(${0.92},${0.86});transition-duration:200ms;`
  }
}
</script>

<style lang="scss" scoped></style>
