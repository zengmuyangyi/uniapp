<template>
  <view
    :class="['n-justify-center', 'n-align-center', 'n-bg-' + bgType, 'n-border-' + border]"
    :style="mrBoxStyle"
  >
    <text :class="['n-color-' + textType, 'n-size-' + textSize]" :style="textStyle">{{
      text
    }}</text>
  </view>
</template>

<script setup>
/**
 * badge 角标
 * @description 角标，支持文字/圆角/背景等
 * @property  {String} size = [ss|s|base|l|ll] 圆点样式的直径大小，不是圆点时需要设置为0
 * @property  {String} bgType = [nav|primary|success|warning|error|light|dark|inverse|custom|link|none|page|hover|mask|mask-dark|border|border-light|border-dark|gradient] 背景主题
 * @property  {String} text 文字内容
 * @property  {String} border = [all-light|all-dark|all-primary|all-success|all-warning|all-error|all-inverse|all-custom|all-link|top-light|top-dark|top-primary|top-success|top-warning|top-error|top-inverse|top-custom|top-link|right-light|right-dark|right-primary|right-success|right-warning|right-error|right-inverse|right-custom|right-link|bottom-light|bottom-dark|bottom-primary|bottom-success|bottom-warning|bottom-error|bottom-inverse|bottom-custom|bottom-link|left-light|left-dark|left-primary|left-success|left-warning|left-error|left-inverse|left-custom|left-link|none] 边框主题
 * @property  {String} textType = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 文字颜色主题
 * @property  {String} textSize = [ss|s|base|l|ll] 文字尺寸主题
 * @property  {String} textStyle 文字样式
 * @property  {String} boxStyle 外层样式
 */
import { makeProps } from '../utils/props.js'
import { computed } from 'vue'

const props = defineProps(
  makeProps([
    ['size', '12rpx'],
    ['bgType', 'error'],
    ['text', '', [String, Number]],
    'border',
    ['textType', 'inverse'],
    ['textSize', 'ss'],
    'textStyle',
    'boxStyle',
  ])
)

const mrBoxStyle = computed(() => {
  if (!props.size || props.size.length === 0 || parseInt(props.size) === 0) {
    return props.boxStyle
  }
  return `width:${props.size};height:${props.size};border-radius:${props.size};` + props.boxStyle
})
</script>

<style lang="scss" scoped></style>
