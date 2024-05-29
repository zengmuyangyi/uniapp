<template>
  <!-- #ifndef APP-NVUE -->
  <view
    :class="[
      'n-bg-' + bgType,
      'n-flex-' + flex,
      'n-justify-' + justify,
      'n-align-' + align,
      'n-border-' + border,
      'n-radius-' + radius,
    ]"
    :style="boxStyle"
    @click="toI"
  >
    <!-- #endif -->
    <!-- #ifdef APP-NVUE -->
    <header
      :class="[
        'n-bg-' + bgType,
        'n-flex-' + flex,
        'n-justify-' + justify,
        'n-align-' + align,
        'n-border-' + border,
        'n-radius-' + radius,
      ]"
      :style="boxStyle"
      bubble="true"
      @click="toI"
    >
      <!-- #endif -->
      <slot></slot>
      <!-- #ifdef APP-NVUE -->
    </header>
    <!-- #endif -->
    <!-- #ifndef APP-NVUE -->
  </view>
  <!-- #endif -->
</template>

<script setup>
const emit = defineEmits(['headerClicked'])
const props = defineProps({
  /**
   * 布局方式
   */
  flex: {
    type: String,
    default: '',
  },
  /**
   * justify主题
   */
  justify: {
    type: String,
    default: '',
  },
  /**
   * align主题
   */
  align: {
    type: String,
    default: '',
  },
  /**
   * 背景主题
   */
  bgType: {
    type: String,
    default: '',
  },
  /**
   * 边框主题
   */
  border: {
    type: String,
    default: '',
  },
  /**
   * 圆角主题
   */
  radius: {
    type: String,
    default: '',
  },
  /**
   * 外层样式
   */
  boxStyle: {
    type: String,
    default: '',
  },
})

function toI(e) {
  // e && e.stopPropagation && e.stopPropagation()
  emit('headerClicked', e)
}
</script>

<style lang="scss" scoped></style>
