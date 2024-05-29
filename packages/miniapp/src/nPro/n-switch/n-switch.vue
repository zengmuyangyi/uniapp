<template>
  <view
    :class="[value ? 'n-bg-' + onBgType : 'n-bg-' + bgType, disabled && 'n-disabled']"
    :style="mrSwitchStyle"
    @click.stop="handleClick"
  >
    <slot name="on"></slot>
    <view :class="['n-bg-' + animateBgType]" :style="mrAnimateStyle">
      <slot name="off"></slot>
    </view>
    <view :class="['n-bg-' + ballBgType]" :style="mrBallStyle"></view>
  </view>
</template>

<script setup>
/**
 * n-switch
 * @description 开关
 * @property {Boolean} value = [true|false] 值/是否打开
 * @property {Boolean} disabled = [true|false] 是否禁用
 * @property {String} bgType = [nav|primary|success|warning|error|light|dark|inverse|custom|link|none|page|hover|mask|mask-dark|border|border-light|border-dark|gradient] 关闭时的背景主题
 * @property {String} onbgType = [nav|primary|success|warning|error|light|dark|inverse|custom|link|none|page|hover|mask|mask-dark|border|border-light|border-dark|gradient] 打开时的背景主题
 * @property {String} ballbgType = [nav|primary|success|warning|error|light|dark|inverse|custom|link|none|page|hover|mask|mask-dark|border|border-light|border-dark|gradient] 移动球的背景主题
 * @property {String} animatebgType = [nav|primary|success|warning|error|light|dark|inverse|custom|link|none|page|hover|mask|mask-dark|border|border-light|border-dark|gradient] 动画层背景主题
 * @property {String} width 自定义宽度
 * @property {String} height 自定义高度
 * @property {String} ballSize 移动球的自定义宽高
 * @property {String} ballBg 移动球的自定义背景色
 * @property {String} animateBg 动画层的自定义背景色
 * @property {String} bg 关闭时的自定义背景色
 * @property {String} onBg 打开时的自定义背景色
 */
import { computed } from 'vue'
import { makeProps } from '../utils/props.js'

const props = defineProps(
  makeProps([
    ['value', false],
    ['disabled', false],
    ['bgType', 'light'],
    ['value', false],
    ['disabled', false],
    ['bgType', 'light'],
    ['onBgType', 'primary'],
    ['ballBgType', 'inverse'],
    'animateBgType',
    ['width', '102rpx'],
    ['height', '62rpx'],
    ['ballSize', '58rpx'],
    'ballBg',
    'animateBg',
    'bg',
    'onBg',
  ])
)
const emit = defineEmits(['update:value', 'change'])

const switchNormalStyle = computed(() => {
  let _style = `width:${props.width};height:${props.height};position:relative;overflow:hidden;`
  _style += `border-radius:${props.height};`
  if (props.bg) {
    _style += `background-color:${props.bg};`
  }
  return _style
})
const switchOnStyle = computed(() => {
  let _style = ''
  if (props.onBg) {
    _style += `background-color:${props.onBg};`
  }
  return _style
})
const mrSwitchStyle = computed(() => {
  let _style = switchNormalStyle.value
  if (props.value) {
    _style += switchOnStyle.value
  }
  return _style
})
const ballStyle = computed(() => {
  let _style = `width:${props.ballSize};height:${props.ballSize};border-radius:${props.ballSize};`
  if (props.ballBg) {
    _style += `background-color:${props.ballBg};`
  }
  _style += `position:absolute;transition-property:left;transition-duration: 200ms;transition-timing-function:ease;box-shadow:4rpx 4rpx 8rpx rgba(0, 0, 0, 0.2);`
  _style += `left:${ballSpace.value}rpx;top:${ballSpace.value}rpx;`
  return _style
})
const ballOnStyle = computed(() => {
  return `left:${ballOnSpace.value}rpx;`
})
const mrBallStyle = computed(() => {
  return props.value ? ballStyle.value + ballOnStyle.value : ballStyle.value
})
const ballSpace = computed(() => {
  const sh = parseFloat(props.height)
  const bh = parseFloat(props.ballSize)
  return (sh - bh) * 0.5
})
const ballOnSpace = computed(() => {
  const sw = parseFloat(props.width)
  const bw = parseFloat(props.ballSize)
  return sw - bw - ballSpace.value
})
const animateWidth = computed(() => {
  const sw = parseFloat(props.width)
  return sw - ballSpace.value * 2
})
const animateStyle = computed(() => {
  let _style = `position:absolute;transition-property:transform;transition-duration:200ms;transition-timing-function:ease;transform:scale(1);`
  _style += `width:${animateWidth.value}rpx;height:${props.ballSize};border-radius:${props.ballSize};`
  if (props.animateBg && props.animateBg.length > 0) {
    _style += `background-color:${props.animateBg};`
  }
  _style += `left:${ballSpace.value}rpx;top:${ballSpace.value}rpx;`
  return _style
})
const mrAnimateStyle = computed(() => {
  const aniCS = 'transform:scale(0);'
  return props.value ? animateStyle.value + aniCS : animateStyle.value
})

function handleClick(e) {
  if (!props.disabled) {
    emit('update:value', !props.value)
    emit('change', !props.value)
  }
  e.stopPropagation && e.stopPropagation()
}
</script>

<style lang="scss" scoped></style>
