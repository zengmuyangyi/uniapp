<template>
  <view
    :class="[
      'n-bg-' + bgType,
      'n-border-' + border,
      'n-radius-' + radius,
      'n-position-relative',
      'n-overflow-hidden',
      'coll-box',
    ]"
    :style="aniStyle + boxStyle"
  >
    <!-- #ifdef APP-NVUE -->
    <view
      id="ncollbody"
      ref="ncollbody"
      class="n-position-absolute"
      :style="'left:0;top:' + th + 'px;' + bodyStyle"
    >
      <slot name="body"></slot>
    </view>
    <view
      id="ncollhead"
      ref="ncollhead"
      class="n-position-relative"
      :style="headStyle"
      @click="toHeadClick"
    >
      <slot name="head"></slot>
      <n-icon
        id="ncollicon"
        ref="ncollicon"
        :name="icon"
        :type="iconType"
        :size="iconSize"
        :iconStyle="iconStyle"
        :boxStyle="'position:absolute;' + iconBoxStyle"
      ></n-icon>
    </view>
    <!-- #endif -->
    <!-- #ifndef APP-NVUE -->
    <view
      id="ncollhead"
      ref="ncollhead"
      class="n-position-relative"
      :style="'z-index:2;' + headStyle"
      @click="toHeadClick"
    >
      <slot name="head"></slot>
      <n-icon
        id="ncollicon"
        ref="ncollicon"
        :name="icon"
        :type="iconType"
        :size="iconSize"
        :iconStyle="iconStyle"
        :boxStyle="iconAniStyle + 'position:absolute;' + iconBoxStyle"
      ></n-icon>
    </view>
    <view id="ncollbody" ref="ncollbody" :style="'z-index:1;' + bodyAniStyle + bodyStyle">
      <slot name="body"></slot>
    </view>
    <!-- #endif -->
  </view>
</template>

<script setup>
/**
 * n-collapse
 * @description 展开/收起
 * @property {String} value 唯一值
 * @property {String} current 当前值
 * @property {Number} duration 动画周期
 * @property {String} timingFunction 动画效果
 * @property {String} bgType = [nav|primary|success|warning|error|light|dark|inverse|custom|link|none|page|hover|mask|mask-dark|border|border-light|border-dark|gradient] 背景主题
 * @property {String} border = [all-light|all-dark|all-primary|all-success|all-warning|all-error|all-inverse|all-custom|all-link|top-light|top-dark|top-primary|top-success|top-warning|top-error|top-inverse|top-custom|top-link|right-light|right-dark|right-primary|right-success|right-warning|right-error|right-inverse|right-custom|right-link|bottom-light|bottom-dark|bottom-primary|bottom-success|bottom-warning|bottom-error|bottom-inverse|bottom-custom|bottom-link|left-light|left-dark|left-primary|left-success|left-warning|left-error|left-inverse|left-custom|left-link|none] 边框主题
 * @property {String} radius = [ss|s|base|l|ll|none] 圆角主题
 * @property {String} bodyHeight 收展区的高度。不设置会自动获取
 * @property {String} boxStyle 外层样式
 * @property {String} headStyle head样式
 * @property {String} bodyStyle body样式
 */
import { watch, computed, ref, onMounted } from 'vue'
import { makeProps } from '../utils/props.js'
// #ifdef APP-NVUE
const dom = uni.requireNativePlugin('dom')
const animation = uni.requireNativePlugin('animation')
// #endif

import { getElSize } from '../utils/element.js'
import { getPx } from '../utils/system.js'

const props = defineProps(
  makeProps([
    ['value', '', [String, Number]],
    ['current', '', [String, Number]],
    ['duration', 300],
    ['timingFunction', 'ease'],
    'bgType',
    'border',
    'radius',
    ['auto', false],
    'headHeight',
    ['bodyHeight', 'auto'],
    'boxStyle',
    'headStyle',
    'bodyStyle',
    'icon',
    ['iconType', 'third'],
    ['iconSize', 'base'],
    'iconStyle',
    ['iconBoxStyle', 'right:32rpx;'],
  ])
)
const emit = defineEmits(['toggle'])

defineExpose({
  open,
  close,
})

const isOpen = ref(false)
const tch = ref(0)
const bch = ref(0)
const aniStyle = ref('')
const iconAniStyle = ref('')
const bodyAniStyle = ref('')
const ncollicon = ref(null)
const ncollhead = ref(null)
const ncollbody = ref(null)

const th = computed(() => {
  if (props.headHeight == 'auto') {
    return tch.value
  }
  if (props.headHeight) {
    return getPx(props.headHeight)
  }
  return tch.value
})

const bh = computed(() => {
  if (props.bodyHeight == 'auto') {
    return bch.value
  }
  if (props.bodyHeight) {
    return getPx(props.bodyHeight)
  }
  return bch.value
})

watch(
  () => props.current,
  (newV) => {
    newV === props.value ? open() : close()
  }
)

onMounted(() => {
  // #ifdef APP-NVUE
  setTimeout(() => {
    init()
  }, 50)
  // #endif
  // #ifndef APP-NVUE
  init()
  aniStyle.value = `transition-duration: ${props.duration}ms;transition-timing-function: ${props.timingFunction};`
  // #endif
})

function open() {
  isOpen.value = true
  // #ifdef APP-NVUE
  aniStyle.value = `transition-duration: ${props.duration}ms;transition-timing-function: ${
    props.timingFunction
  };height:${bh.value + th.value}px;`
  // #endif
  toToggle(true)
}

function close() {
  isOpen.value = false
  // #ifdef APP-NVUE
  if (!tch.value && (!props.headHeight || props.headHeight == 'auto')) {
    aniStyle.value = `transition-duration: ${props.duration}ms;transition-timing-function: ${props.timingFunction};`
  } else {
    aniStyle.value = `transition-duration: ${props.duration}ms;transition-timing-function: ${props.timingFunction};height:${th.value}px;`
  }
  // #endif
  toToggle(false)
}

function toHeadClick() {
  emit('toggle', isOpen.value)
  if (props.auto) {
    isOpen.value ? close() : open()
  }
}

async function init() {
  // #ifdef APP-NVUE
  if (!tch.value && (!props.headHeight || props.headHeight == 'auto')) {
    try {
      const npxorp = await getElSize('ncollhead', true)
      tch.value = npxorp.height
    } catch (e) {
      //TODO handle the exception
      return
    }
  }
  if (!bch.value && (!props.bodyHeight || props.bodyHeight == 'auto')) {
    try {
      const npxorp = await getElSize('ncollbody', true)
      bch.value = npxorp.height
    } catch (e) {
      //TODO handle the exception
      return
    }
  }
  // #endif
  props.current === props.value && props.value ? open() : close()
}

function toToggle(open) {
  // #ifndef APP-NVUE
  let style = `transition-property:all;transform:${
    open ? 'translateY(0%)' : 'translateY(-100%)'
  };transition-duration:${props.duration}ms;transition-timing-function:${props.timingFunction};`
  bodyAniStyle.value = style + `height:${open ? props.bodyHeight : '0'};`
  // #endif
  // #ifdef APP-NVUE
  animation.transition(
    ncollbody.value,
    {
      styles: {
        transform: open ? 'translateY(0%)' : 'translateY(-100%)',
      },
      duration: props.duration,
      delay: 0,
      timingFunction: props.timingFunction,
    },
    () => {}
  )
  animation.transition(
    ncollicon.value,
    {
      styles: {
        transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
      },
      duration: props.duration,
      delay: 0,
      timingFunction: props.timingFunction,
    },
    () => {}
  )
  // #endif
}
</script>

<style lang="scss" scoped>
.coll {
  &-box {
    transition-property: height;
    transition-duration: 300ms;
    transition-timing-function: ease;
  }
}
</style>
