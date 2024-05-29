<template>
  <view
    :ref="(el) => elRefs.set(el)"
    class="n-position-relative n-overflow-hidden"
    :style="mrStyle + boxStyle"
    @verticalpan="onPan"
  >
    <slot></slot>
  </view>
</template>

<script setup>
import { ref, toRefs, watch, computed, onMounted, onUnmounted, provide } from 'vue'
import { makeProps } from '../utils/props.js'

// #ifdef APP-NVUE
const bindingX = uni.requireNativePlugin('bindingx')
// #endif

import { getPx } from '../utils/system.js'

const props = defineProps(
  makeProps([
    ['width', '750rpx'],
    ['height', '360rpx'],
    ['itemWidth', '600rpx'],
    ['itemHeight', '360rpx'],
    ['left', '0'],
    ['right', '0'],
    ['space', '64rpx'],
    ['current', 0],
    ['autoPlay', false],
    ['interval', 2000],
    ['circular', false],
    ['center', false],
    ['scale', 0.62],
    ['duration', 300],
    ['timingFunction', 'ease-in-out'],
    ['updateTime', 0],
    'boxStyle',
  ])
)
const emit = defineEmits(['change'])

let bindToken = null

const children = []
// 内部的current记录，不依赖外部设置current
const inCurrent = ref(0)
// 是否处于自动调整阶段.自动调整阶段，手势无效
const inMoving = ref(false)
// linkage的时候需要外部调用
const playTimer = ref(null)
// 以及swiper-item里面使用
const { center, duration, linear, circular, scale, timingFunction } = toRefs(props)
import { useElRefs } from '../utils/element.js'
const elRefs = useElRefs()

const leftPx = computed(() => {
  return getPx(props.left)
})
const rightPx = computed(() => {
  return getPx(props.right)
})
const spacePx = computed(() => {
  return getPx(props.space)
})
const widthPx = computed(() => {
  return getPx(props.width)
})
const heightPx = computed(() => {
  return getPx(props.height)
})
const itemWidthPx = computed(() => {
  return getPx(props.itemWidth)
})
const itemHeightPx = computed(() => {
  return getPx(props.itemHeight)
})
const mrStyle = computed(() => {
  return `width:${widthPx.value}px;height:${heightPx.value}px;`
})

defineExpose({
  inMoving,
  inCurrent,
  children,
  playTimer,
  toAdjust,
})
provide('nSwiperV', {
  children,
  inMoving,
  inCurrent,
  center,
  duration,
  linear,
  circular,
  scale,
  timingFunction,
  leftPx,
  spacePx,
  widthPx,
  itemWidthPx,
  heightPx,
  itemHeightPx,
  pushChild,
  emitChange,
})
onMounted(() => {
  if (children.length > 0) {
    console.log('mounted')
    if (props.circular) {
      console.log('circular')
      toAdjust(0, 1000, true)
      return
    }
    toAdjust()
  }
})
watch(
  () => props.updateTime,
  () => {
    if (props.circular) {
      toAdjust(0, 1000, true)
      return
    }
    toAdjust()
  }
)
// we can not watch inMoving.value or ()=>inMoving
watch(inMoving, (newV) => {
  // console.log(newV)
  if (!newV && props.autoPlay && props.circular) {
    playTimer.value && clearInterval(playTimer.value)
    playTimer.value = setInterval(() => {
      toAdjust(-50, 40)
    }, props.interval)
  }
})

function pushChild(vm) {
  children.push(vm)
}
function emitChange(i) {
  emit('change', i)
}
/**
 * 请注意：
 * swiper-v在Android下不能使用在 scroll/list 中，无法触发手势。iOS下没有问题
 */
function toAdjust(x = 0, time = 1000, init) {
  const length = children.length
  if (length === 0) return
  inMoving.value = true
  children.forEach((val) => {
    val.toAdjust(x, time, init)
  })
}
function onPan(e) {
  if (inMoving.value) return
  playTimer.value && clearInterval(playTimer.value)
  playTimer.value = null
  inMoving.value = true
  const propsx = []
  const current = inCurrent.value
  children.forEach((val) => {
    propsx.push({
      element: val.nswipervitem.el.ref,
      property: 'transform.scale', //动画属性
      expression: val.getScaleExp(current), // `${exp}`
    })
    propsx.push({
      element: val.nswipervitem.el.ref,
      property: 'transform.translateY', //动画属性
      expression: val.getExp(current), // `x>=0?min(x, ${maxX}):max(x, -${maxX})`
    })
  })
  const startTime = Date.now()
  const bind = bindingX.bind(
    {
      eventType: 'pan',
      anchor: elRefs.el.ref,
      props: propsx,
    },
    (state) => {
      // console.log(state)
      const endTime = Date.now()
      if (state.state == 'end') {
        toAdjust(state.deltaY, endTime - startTime)
        bindingX.unbind({
          eventType: 'pan',
          token: bindToken,
        })
        bindToken = 0
      }
    }
  )
  bindToken = bind.token
}

onUnmounted(() => {
  if (bindToken) {
    bindingX.unbind({
      eventType: 'pan',
      token: bindToken,
    })
    bindToken = 0
  }
})
</script>

<style></style>
