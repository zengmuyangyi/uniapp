<template>
  <view
    :class="[fixed ? 'n-position-fixed' : 'n-position-absolute', 'n-bg-' + bgType, 'np-index']"
    :style="mrBoxStyle"
  >
    <slot></slot>
  </view>
</template>

<script setup>
/**
 * position
 * @description 便捷定位盒子
 * @property {Boolean} fixed = [true|false] 是否fixed定位
 * @property {String} pos 定位的位置
 * @property {String} offset 定位的偏移量
 * @property {String} bgType = [nav|primary|success|warning|error|light|dark|inverse|custom|link|none|page|hover|mask|mask-dark|border|border-light|border-dark|gradient] 背景主题
 * @property {String} boxStyle 外层样式
 */
import { computed } from 'vue'
import { getHeight } from '../utils/system.js'

const props = defineProps({
  /**
   * 是否fixed定位
   */
  fixed: {
    type: Boolean,
    default: false,
  },
  /**
   * 定位的位置
   */
  pos: {
    type: String,
    default: 'bottom',
  },
  /**
   * 定位的偏移量
   */
  offset: {
    type: String,
    default: '0px',
  },
  /**
   * 背景主题
   */
  bgType: {
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

const offsetPx = computed(() => {
  return getHeight(props.offset)
})
const mrBoxStyle = computed(() => {
  return (
    (props.pos === 'top' ? `top:${offsetPx.value}px;` : `bottom:${offsetPx.value}px;`) +
    props.boxStyle
  )
})
</script>

<style lang="scss" scoped>
.np-index {
  /* #ifndef APP-NVUE */
  z-index: 10060;
  /* #endif */
}
</style>
