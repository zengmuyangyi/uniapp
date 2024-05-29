<template>
  <view class="n-position-relative n-overflow-hidden" :style="mrBoxStyle">
    <view ref="ncontainer" class="n-flex-row n-wrap-nowrap" :style="mrContainerStyle + noWeexAni">
      <slot></slot>
    </view>
  </view>
</template>

<script setup>
/**
 * n-tab-container
 * @description 可切换的盒子.如果没有overflow hidden，在某些情况下会溢出内容，比如自定义tabbar
 * @property {String} width 内容宽度rpx
 * @property {Number} current 当前位置索引
 */
import { ref, computed, watch, onMounted } from 'vue'
// #ifdef APP-NVUE
const animation = uni.requireNativePlugin('animation')
// #endif

import {
  getPx,
  getXBarHeight,
  getHeight,
  getStatusBarHeight,
  getNavBarHeight,
} from '../utils/system.js'
import { makeProps } from '../utils/props.js'

const props = defineProps(
  makeProps([
    ['width', '750rpx'],
    ['current', 0],
    ['number', 2],
    ['animated', true],
    ['duration', 300],
    ['timeFunction', 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'],
    'boxStyle',
    'containerStyle',
  ])
)

const noWeexAni = ref('')
const ncontainer = ref(null)

const mrBoxStyle = computed(() => {
  return props.boxStyle + `width: ${props.width};`
})
const mrContainerStyle = computed(() => {
  return props.containerStyle + `width: ${parseFloat(props.width) * props.number}rpx;`
})

onMounted(() => {
  // #ifndef APP-NVUE
  toCurrentIndex(props.current)
  // #endif
  // #ifdef APP-NVUE
  setTimeout(() => {
    toCurrentIndex(props.current)
  }, 0)
  // #endif
})

watch(
  () => props.current,
  (newV) => {
    toCurrentIndex(newV)
  }
)

function toCurrentIndex(i) {
  const { duration, timingFunction } = props
  const computedDur = props.animated ? duration : 0.00001
  const dist = props.current * parseFloat(props.width)
  // #ifdef APP-NVUE
  const containerEl = ncontainer.value
  animation.transition(
    containerEl,
    {
      styles: {
        transform: `translateX(${-dist}rpx)`,
      },
      duration: computedDur,
      timingFunction,
      delay: 0,
    },
    () => {}
  )
  // #endif
  // #ifndef APP-NVUE
  noWeexAni.value = `transition-property:transform;transition-duration:${computedDur}ms;transform:translateX(${-dist}rpx);transition-timing-function:${timingFunction};`
  // #endif
}
</script>

<style></style>
