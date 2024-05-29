<template>
  <view class="n-position-relative" :style="boxStyle">
    <image
      class="n-position-absolute"
      :style="'left:0;top:0;right:0;bottom:0;' + imageStyle"
      :src="src"
      :mode="mode || 'scaleToFill'"
      @error="emit('error')"
      @load="emit('load')"
    />
    <slot></slot>
  </view>
</template>

<script setup>
/**
 * bg-view
 * @description 带背景的View.用于快速设置图片背景
 * @property {String} src 背景图
 * @property {String} boxStyle 图片宽高设置
 * @property {String} imageStyle 图片宽高设置
 */
import { makeProps } from '../utils/props.js'

const props = defineProps(makeProps(['src', ['mode', 'scaleToFill'], 'boxStyle', 'imageStyle']))
const emit = defineEmits(['error', 'load'])
</script>

<style lang="less" scoped></style>
