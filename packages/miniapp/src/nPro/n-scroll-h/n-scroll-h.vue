<template>
  <scroll-view
    :scroll="false"
    :scroll-x="true"
    :scroll-left="leftPx"
    :scroll-with-animation="true"
    :show-scrollbar="false"
    :class="['n-bg-' + bgType]"
    :style="mrScrollStyle"
  >
    <view class="n-flex-row n-wrap-nowrap" :style="contentStyle">
      <slot></slot>
    </view>
  </scroll-view>
</template>

<script setup>
/**
 * scroll-h
 * @description 横向滚动
 * @property {String} bgType = [nav|primary|success|warning|error|light|dark|inverse|custom|link|none|page|hover|mask|mask-dark|border|border-light|border-dark|gradient] 背景主题
 * @property {String} width 自定义宽度
 * @property {String} height 自定义高度
 * @property {String} left scroll-left
 * @property {String} boxStyle 外层样式
 * @property {String} contentStyle 内容样式。如果vue页面下无法滚动（内容有压缩），请设置内容总宽度
 */
import { computed } from 'vue'
import { getPx } from '../utils/system.js'
import { makeProps } from '../utils/props.js'

const props = defineProps(
  makeProps([
    'bgType',
    ['width', '750rpx'],
    ['height', '260rpx'],
    ['left', '0'],
    'boxStyle',
    'contentStyle',
  ])
)

const leftPx = computed(() => {
  return getPx(props.left)
})
const mrScrollStyle = computed(() => {
  let _style = 'width:' + props.width + ';'
  _style += 'height:' + props.height + ';'
  // #ifdef APP-NVUE
  _style += `flex-direction:row;`
  // #endif
  return _style + props.boxStyle
})
</script>

<style lang="scss" scoped></style>
