<template>
  <view
    :class="[
      'n-flex-row',
      'n-wrap-nowrap',
      'n-bg-' + bgType,
      'n-border-' + border,
      'n-radius-' + radius,
    ]"
    :style="boxStyle"
  >
    <slot name="left"></slot>
    <view class="n-timeline-center n-flex-column n-align-center" :style="centerStyle">
      <view :class="['n-timeline-line', 'n-bg-' + lineBgType]" :style="lineStyle"></view>
      <slot name="badge"></slot>
    </view>
    <slot name="right"></slot>
  </view>
</template>

<script setup>
/**
 * timeline-item
 * @description 时间轴
 * @property {String} bgType = [nav|primary|success|warning|error|light|dark|inverse|custom|link|none|page|hover|mask|mask-dark|border|border-light|border-dark|gradient] 背景主题
 * @property {String} border = [all-light|all-dark|all-primary|all-success|all-warning|all-error|all-inverse|all-custom|all-link|top-light|top-dark|top-primary|top-success|top-warning|top-error|top-inverse|top-custom|top-link|right-light|right-dark|right-primary|right-success|right-warning|right-error|right-inverse|right-custom|right-link|bottom-light|bottom-dark|bottom-primary|bottom-success|bottom-warning|bottom-error|bottom-inverse|bottom-custom|bottom-link|left-light|left-dark|left-primary|left-success|left-warning|left-error|left-inverse|left-custom|left-link|none] 边框主题
 * @property {String} radius = [ss|s|base|l|ll|none] 圆角主题
 * @property {String} centerStyle 中间线外层样式
 * @property {String} linebgType = [nav|primary|success|warning|error|light|dark|inverse|custom|link|none|page|hover|mask|mask-dark|border|border-light|border-dark|gradient] 中间线背景主题
 * @property {String} lineStyle 中间线样式
 * @property {String} boxStyle 外层样式
 */
const props = defineProps({
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
   * 中间线外层样式
   */
  centerStyle: {
    type: String,
    default: '',
  },
  /**
   * 中间线背景主题
   */
  lineBgType: {
    type: String,
    default: 'border',
  },
  /**
   * 中间线样式
   */
  lineStyle: {
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
</script>

<style lang="scss" scoped>
.n-timeline {
  &-center {
    position: relative;
  }
  &-line {
    flex: 1;
    width: 1px;
  }
}
</style>
