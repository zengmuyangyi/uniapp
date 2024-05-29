<template>
  <view
    :class="[
      'n-position-relative',
      'n-bg-' + bgType,
      'n-border-' + border,
      'n-radius-' + radius,
      'n-flex-' + flex,
      'n-align-' + align,
      'n-justify-' + justify,
      'n-ms-' + ms,
      'n-sizing-' + sizing,
      'n-shadow-' + shadow,
    ]"
    :style="boxStyle"
    :hover-class="'n-hover-' + hover"
  >
    <view
      :class="[
        'n-position-absolute',
        'n-bg-' + bgBgType,
        'n-border-' + bgBorder,
        'n-radius-' + bgRadius,
        'n-sizing-' + sizing,
        'n-zindex-' + zIndex,
      ]"
      :style="bgStyle"
    >
      <slot name="bg">
        <image
          v-if="src"
          :src="src"
          class="n-position-absolute n-0"
          :mode="mode || 'aspectFill'"
          @error="emit('error')"
          @load="emit('load')"
        ></image>
      </slot>
    </view>
    <slot></slot>
  </view>
</template>

<script setup>
/**
 * view
 * description 可以带背景层的view
 */
import { computed } from 'vue'

const props = defineProps({
  ms: {
    type: String,
    default: '',
  },
  sizing: {
    type: String,
    default: 'border',
  },
  hover: {
    type: String,
    default: '',
  },
  shadow: {
    type: String,
    default: '',
  },
  src: {
    type: String,
    default: '',
  },
  flex: {
    type: String,
    default: '',
  },
  align: {
    type: String,
    default: '',
  },
  justify: {
    type: String,
    default: '',
  },
  border: {
    type: String,
    default: '',
  },
  radius: {
    type: String,
    default: '',
  },
  bgType: {
    type: String,
    default: '',
  },
  zIndex: {
    type: Number,
    default: 2,
  },
  left: {
    type: String,
    default: '0',
  },
  top: {
    type: String,
    default: '0',
  },
  right: {
    type: String,
    default: '0',
  },
  bottom: {
    type: String,
    default: '0',
  },
  bgBorder: {
    type: String,
    default: '',
  },
  bgRadius: {
    type: String,
    default: '',
  },
  bgBgType: {
    type: String,
    default: '',
  },
  bgStyle: {
    type: String,
    default: '',
  },
  boxStyle: {
    type: String,
    default: '',
  },
})
const emit = defineEmits(['error', 'load'])

const bgStyle = computed(() => {
  return `left: ${props.left};top: ${props.top};right: ${props.right};bottom: ${props.bottom};`
})
</script>

<style></style>
