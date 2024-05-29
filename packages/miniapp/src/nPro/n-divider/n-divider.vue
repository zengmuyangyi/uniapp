<template>
  <view :class="['n-bg-' + boxBgType]" :style="mrBoxStyle">
    <view :class="['n-bg-' + bgType]" :style="mrDividerStyle"></view>
  </view>
</template>

<script setup>
/**
 * divider
 * @description 线条分割器
 * @property {Boolean} vertical = [true|false] 是否竖向
 * @property {String} bgType = [nav|primary|success|warning|error|light|dark|inverse|custom|link|none|page|hover|mask|mask-dark|border|border-light|border-dark|gradient] 分割线背景主题
 * @property {String} boxbgType = [nav|primary|success|warning|error|light|dark|inverse|custom|link|none|page|hover|mask|mask-dark|border|border-light|border-dark|gradient] 外层背景主题
 * @property {String} boxBg 外层背景色
 * @property {String} bg 分割线背景色
 * @property {String} left 分割线左侧间距
 * @property {String} right 分割线右侧间距
 * @property {String} width 分割线宽度
 * @property {String} height 分割线高度
 */
import { computed } from 'vue'
import { makeProps } from '../utils/props.js'

const props = defineProps(
  makeProps([
    ['vertical', false],
    ['bgType', 'border'],
    'boxBgType',
    'boxBg',
    'bg',
    ['left', '0'],
    ['right', '0'],
    ['width', '1px'],
    ['height', '1px'],
  ])
)

const mrBoxStyle = computed(() => {
  if (props.boxBg && props.boxBg.length > 0) {
    return `background-color:${props.boxBg};`
  }
  return ''
})

const mrDividerStyle = computed(() => {
  let _style = `height:${props.height};margin-left:${props.left};margin-right:${props.right};`
  if (props.bg && props.bg.length > 0) {
    _style += `background-color:${props.bg};`
  }
  if (props.vertical) {
    _style += `width:${props.width};`
  }
  return _style
})
</script>

<style lang="scss"></style>
