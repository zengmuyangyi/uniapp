<template>
  <view
    :class="[
      'n-bg-' + bgType,
      'n-flex-' + flex,
      'n-justify-' + justify,
      'n-align-' + align,
      'n-border-' + border,
      'n-radius-' + radius,
    ]"
    :style="'height:' + heightPx + 'px;' + boxStyle"
  >
    <slot></slot>
  </view>
</template>

<script setup>
/**
 * height
 * @description 高度
 * @property {String} flex 布局方式
 * @property {String} justify justify主题
 * @property {String} align align主题
 * @property {String} bgType = [nav|primary|success|warning|error|light|dark|inverse|custom|link|none|page|hover|mask|mask-dark|border|border-light|border-dark|gradient] 背景主题
 * @property {String} border = [all-light|all-dark|all-primary|all-success|all-warning|all-error|all-inverse|all-custom|all-link|top-light|top-dark|top-primary|top-success|top-warning|top-error|top-inverse|top-custom|top-link|right-light|right-dark|right-primary|right-success|right-warning|right-error|right-inverse|right-custom|right-link|bottom-light|bottom-dark|bottom-primary|bottom-success|bottom-warning|bottom-error|bottom-inverse|bottom-custom|bottom-link|left-light|left-dark|left-primary|left-success|left-warning|left-error|left-inverse|left-custom|left-link|none] 边框主题
 * @property {String} radius = [ss|s|base|l|ll|none] 圆角主题
 * @property {String} height 链式高度：status-nav-32rpx
 * @property {String} boxStyle 外层样式
 */
import { computed } from 'vue'
import { makeProps } from '../utils/props.js'
import { getHeight } from '../utils/system.js'

const props = defineProps(
  makeProps([
    ['flex', 'column'],
    'justify',
    'align',
    'bgType',
    'border',
    'radius',
    ['height', '0'],
    'boxStyle',
  ])
)

const heightPx = computed(() => {
  return getHeight(props.height)
})
</script>

<style></style>
