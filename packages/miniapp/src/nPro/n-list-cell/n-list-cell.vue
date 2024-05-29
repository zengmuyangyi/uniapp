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
    :hover-class="'n-hover-' + hover"
    :style="boxStyle"
    @click="toI"
  >
    <!-- #endif -->
    <!-- #ifdef APP-NVUE -->
    <cell
      :class="[
        'n-bg-' + bgType,
        'n-flex-' + flex,
        'n-justify-' + justify,
        'n-align-' + align,
        'n-border-' + border,
        'n-radius-' + radius,
        'n-hover-' + hover + '-n',
      ]"
      :style="boxStyle"
      bubble="true"
      @click="toI"
    >
      <!-- #endif -->
      <slot></slot>
      <!-- #ifdef APP-NVUE -->
    </cell>
    <!-- #endif -->
    <!-- #ifndef APP-NVUE -->
  </view>
  <!-- #endif -->
</template>

<script setup>
const emit = defineEmits(['cellClicked'])
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
  /**
   * 按下效果
   */
  hover: {
    type: String,
    default: '',
  },
})

function toI(e) {
  // e && e.stopPropagation && e.stopPropagation()
  emit('cellClicked', e)
}
</script>

<style lang="scss" scoped></style>
