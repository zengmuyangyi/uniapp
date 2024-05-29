<template>
  <view
    :class="['n-flex-row', 'n-align-center', 'n-bg-' + bgType]"
    :style="boxStyle + 'width:' + width + ';' + 'height:' + height + ';'"
  >
    <view
      :class="['n-bg-' + progressBgType]"
      :style="progressStyle + 'height:' + progressHeight + ';' + runStyle"
    ></view>
  </view>
</template>

<script setup>
/**
 * progress
 * @description 进度条
 * @property {Number} progress 进度。0-1
 * @property {String} width  自定义宽度
 * @property {String} height 自定义高度
 * @property {String} bgType = [nav|primary|success|warning|error|light|dark|inverse|custom|link|none|page|hover|mask|mask-dark|border|border-light|border-dark|gradient] 背景主题
 * @property {String} progressHeight 进度条的自定义高度
 * @property {String} progressBgType进度条的背景主题
 * @property {String} boxStyle 外层样式
 * @property {String} progressStyle 进度条的样式
 */
import { computed } from 'vue'

const props = defineProps({
  /**
   * 进度。0-1
   */
  progress: {
    type: Number,
    default: 0,
  },
  /**
   * 自定义宽度
   */
  width: {
    type: String,
    default: '600rpx',
  },
  /**
   * 自定义高度
   */
  height: {
    type: String,
    default: '12rpx',
  },
  /**
   * 背景主题
   */
  bgType: {
    type: String,
    default: 'light',
  },
  /**
   * 进度条的自定义高度
   */
  progressHeight: {
    type: String,
    default: '12rpx',
  },
  /**
   * 进度条的背景主题
   */
  progressBgType: {
    type: String,
    default: 'primary',
  },
  /**
   * 外层样式
   */
  boxStyle: {
    type: String,
    default: '',
  },
  /**
   * 进度条的样式
   */
  progressStyle: {
    type: String,
    default: '',
  },
})

const runStyle = computed(() => {
  if (props.progress === 0) {
    return 'width: 0;'
  }
  if (props.progress >= 1) {
    return `width:${props.width};`
  }
  if (props.width.indexOf('rpx') >= 0 || props.width.indexOf('upx') >= 0) {
    const w = parseFloat(props.width) * props.progress
    return `width:${w}rpx;`
  }
  const w = parseFloat(props.width) * props.progress
  return `width:${w}px;`
})
</script>

<style lang="scss" scoped></style>
