<template>
  <view
    :ref="(el) => elRefs.set(el)"
    class="n-position-relative n-overflow-hidden"
    :style="mrStyle + boxStyle"
    @horizontalpan="onPan"
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
    ['linkage', null, Object],
    ['width', '750rpx'],
    ['height', '360rpx'],
    ['itemWidth', '600rpx'],
    ['itemHeight', '360rpx'],
    ['left', '0'],
    ['right', '0'],
    ['space', '64rpx'],
    ['lock', false],
    ['current', 0],
    ['autoPlay', false],
    ['interval', 2000],
    ['circular', false],
    ['center', false],
    ['scale', 0.62],
    ['percent', 0.4],
    ['duration', 300],
    ['silence', false],
    ['baseWidth', '0'],
    ['times', 1.5],
    ['linear', true],
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
// linkage的时候需要外部调用
// 以及swiper-item里面使用
const { linkage, lock, center, duration, linear, circular, scale, percent, timingFunction } =
  toRefs(props)

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
// 滑动多少距离算一个完整的item
const baseWidthPx = computed(() => {
  if (!props.baseWidth || props.baseWidth == 0) {
    return itemWidthPx.value + spacePx.value
  }
  return getPx(props.baseWidth)
})
// 单次滑动最大可滑动的距离，防止出现大规模的空白
const maxX = computed(() => {
  return baseWidthPx.value * props.times
})

defineExpose({
  inMoving,
  inCurrent,
  children,
  lock,
  playTimer,
  itemWidthPx,
  toAdjust,
  toPrev,
  toNext,
})
provide('nSwiper', {
  children,
  inMoving,
  inCurrent,
  center,
  duration,
  linear,
  circular,
  scale,
  percent,
  timingFunction,
  leftPx,
  spacePx,
  widthPx,
  itemWidthPx,
  itemHeightPx,
  baseWidthPx,
  maxX,
  pushChild,
  emitChange,
})

onMounted(() => {
  if (children.length > 0) {
    if (props.current >= children.length) {
      inCurrent.value = children.length - 1
    } else {
      inCurrent.value = props.current
    }
    if (props.circular) {
      toAdjust(0, 1000, true)
      return
    }
    // toAdjust()
    toPosition(inCurrent.value, props.current, props.silence)
  }
})
watch(
  () => props.updateTime,
  () => {
    if (props.circular) {
      toAdjust(0, 1000, true)
      return
    }
    // toAdjust()
    toPosition(inCurrent.value, props.current, props.silence)
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
watch(
  () => props.current,
  (newV) => {
    if (children.length == 0) return
    if (newV != inCurrent.value && !props.circular) {
      toPosition(inCurrent.value, newV)
    }
  }
)

function pushChild(vm) {
  children.push(vm)
}
function emitChange(i) {
  emit('change', i)
}
/**
 * 在某些情况下可能被锁住，可以用这个来解锁
 * 比如：iOS下bindingx可能存在bug，无法回调，这个时候就会锁住
 * 我们可以考虑在外面加一个条件来触发解锁。比如双swiper的时候，外面的swiper触发来就解锁
 */
function unLock() {
  inMoving.value = false
}
function toPrev() {
  toAdjust(50, 40)
}
function toNext() {
  toAdjust(-50, 40)
}
function toPosition(current, dest, silence = false) {
  const length = children.length
  if (length === 0) return
  let _dest = dest
  if (dest >= length) {
    _dest = length - 1
  }
  inMoving.value = true
  children.forEach((val) => {
    val.toPosition(current, _dest, silence)
  })
}
function toAdjust(x = 0, time = 1000, init) {
  const length = children.length
  if (length === 0) return
  if (inCurrent.value >= length) {
    inCurrent.value = length - 1
  }
  inMoving.value = true
  children.forEach((val) => {
    val.toAdjust(x, time, init)
  })
}
function onPan(e) {
  if (inMoving.value || props.lock) return
  playTimer.value && clearInterval(playTimer.value)
  playTimer.value = null
  inMoving.value = true
  let propsx = []
  const current = inCurrent.value
  children.forEach((val) => {
    propsx.push({
      element: val.nswiperitem.el.ref,
      property: 'transform.scale', //动画属性
      expression: val.getScaleExp(current), // `${exp}`
    })
    propsx.push({
      element: val.nswiperitem.el.ref,
      property: 'transform.translateX', //动画属性
      expression: val.getExp(current), // `x>=0?min(x, ${maxX}):max(x, -${maxX})`
    })
  })
  let factor = 1
  if (linkage.value) {
    factor = linkage.value.itemWidthPx / itemWidthPx.value
    propsx = propsx.concat(toGetLinkageProps(factor))
  }
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
        toAdjust(state.deltaX, endTime - startTime)
        if (linkage.value) {
          linkage.value.toAdjust(state.deltaX * factor, endTime - startTime)
        }
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
/**
 * @param {Object} factor
 * can change property here?
 */
function toGetLinkageProps(factor) {
  if (linkage.value.inMoving || linkage.value.lock) return
  linkage.value.playTimer && clearInterval(linkage.value.playTimer)
  linkage.value.playTimer = null
  linkage.value.inMoving = true
  const propsx = []
  const current = linkage.value.inCurrent
  linkage.value.children.forEach((val) => {
    propsx.push({
      element: val.nswiperitem.el.ref,
      property: 'transform.scale', //动画属性
      expression: val.getScaleExp(current, factor), // `${exp}`
    })
    propsx.push({
      element: val.nswiperitem.el.ref,
      property: 'transform.translateX', //动画属性
      expression: val.getExp(current, factor), // `x>=0?min(x, ${maxX}):max(x, -${maxX})`
    })
  })
  // console.log(linkage)
  return propsx
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
