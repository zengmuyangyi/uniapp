<template>
  <!-- #ifdef APP-NVUE -->
  <!-- end的时候，依然触发了scroll事件，直接使用dom滚动，不再使用scroll-left.scroll-view容易引起抖动.部分极限环境下有bug
	<scroll-view v-if="platform=='ios'" ref="ngallery" class="n-flex-row" :scroll-with-animation="true" :scroll-left="toLeft" :scroll-x="true" scroll-direction="horizontal" :show-scrollbar="false" @scrollend="ended" :style="mrBoxStyle">
		<slot></slot>
	</scroll-view>
	-->
  <!-- Android下 scroll-view 不支持使用bindingX。所以使用 scroller。但是没有scrollend事件，没有scroll-left属性 -->
  <scroller
    ref="ngallery"
    class="n-flex-row"
    :scroll-with-animation="true"
    scroll-direction="horizontal"
    :show-scrollbar="false"
    :style="mrBoxStyle"
    @scroll="onScroll"
  >
    <view ref="ngalleryleft" style="width: 0; height: 0"></view>
    <slot></slot>
  </scroller>
  <!-- #endif -->
  <!-- #ifndef APP-NVUE -->
  <scroll-view
    ref="ngallery"
    class="n-flex-row"
    :enable-flex="true"
    :scroll-with-animation="true"
    :scroll-x="true"
    :scroll-y="false"
    :scroll-left="toLeft"
    :style="mrBoxStyle"
    @scroll="onScroll"
  >
    <!-- #ifndef H5 -->
    <slot></slot>
    <!-- #endif -->
    <!-- #ifdef H5 -->
    <view class="n-flex-row n-wrap-nowrap n-shrink-0">
      <slot></slot>
    </view>
    <!-- #endif -->
  </scroll-view>
  <!-- #endif -->
</template>

<script setup>
/**
 * 连续滚动的画廊，采用scroll-view实现。
 * 特点：连续滚动；居中放大（中心点可变）
 */
// #ifdef APP-NVUE
const bindingX = uni.requireNativePlugin('bindingx')
const dom = uni.requireNativePlugin('dom')
// #endif

import { provide, ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { makeProps } from '../utils/props.js'
import { getPlatform, getPx, getRatio } from '../utils/system.js'

const props = defineProps(
  makeProps([
    ['width', '750rpx'],
    ['height', '360rpx'],
    ['widthScale', 0.7],
    ['heightScale', 0.8],
    ['scaleFactor', 0.5],
    ['space', '0'],
    ['left', '0'],
    ['right', '0'],
    'boxStyle',
    'itemStyle',
    ['updateTime', 0],
  ])
)
const emit = defineEmits(['selected', 'change'])

let scrollTimer = null
let endTimer = null
let bindToken = null
const platform = getPlatform()
const current = ref(0)
const toLeft = ref(0)
const children = ref([])
const initTime = ref(0)
const ngallery = ref(null)
const ngalleryleft = ref(null)

const mrBoxStyle = computed(() => {
  return props.boxStyle + `width:${widthPx.value}px;height:${heightPx.value}px;`
})
const widthPx = computed(() => {
  return getPx(props.width)
})
const widthRpx = computed(() => {
  if (
    props.width.indexOf('rpx') > 0 ||
    props.width.indexOf('upx') > 0 ||
    props.width.indexOf('px') < 0
  ) {
    return parseFloat(props.width)
  }
  return getRatio() * parseFloat(props.width)
})
const heightPx = computed(() => {
  return getPx(props.height)
})
const maxApartPx = computed(() => {
  return (widthPx.value + itemWidthPx.value) * (props.scaleFactor > 0 ? props.scaleFactor : 0.5)
})
const maxApartRpx = computed(() => {
  return (widthRpx.value + itemWidthRpx.value) * (props.scaleFactor > 0 ? props.scaleFactor : 0.5)
})
const itemWidthPx = computed(() => {
  return widthPx.value * props.widthScale
})
const itemWidthRpx = computed(() => {
  return widthRpx.value * props.widthScale
})
const itemHeightPx = computed(() => {
  return heightPx.value * props.heightScale
})
const firstMargin = computed(() => {
  const w = widthPx.value * (1 - props.widthScale) * 0.5
  return `margin-left:${w}px;`
})
const lastMargin = computed(() => {
  const w = widthPx.value * (1 - props.widthScale) * 0.5
  return `margin-right:${w}px;`
})
const mrItemStyle = computed(() => {
  return props.itemStyle + `width:${itemWidthPx.value}px;height:${itemHeightPx.value}px;`
})

provide('nGallery', {
  initTime,
  firstMargin,
  lastMargin,
  mrItemStyle,
  children,
  pushChild,
  emitEvent,
})
watch(
  () => props.updateTime,
  () => {
    initLayout()
  }
)
onMounted(() => {
  initLayout(true)
})
onUnmounted(() => {
  unbind()
  scrollTimer && clearTimeout(scrollTimer)
  endTimer && clearTimeout(endTimer)
})
function pushChild(vm) {
  children.value.push(vm)
}
function emitEvent(val) {
  emit('selected', val)
}
function initLayout(delay = false) {
  if (children.value.length === 0) return
  // we watch initTime to init child layout
  initTime.value = initTime.value + 1
  // #ifdef APP-NVUE
  if (platform === 'ios' || !delay) {
    bindScroll()
    dom.scrollToElement(ngalleryleft.value, { offset: 1 })
    return
  }
  setTimeout(() => {
    bindScroll()
  }, 50)
  setTimeout(() => {
    // 初始化排版
    dom.scrollToElement(ngalleryleft.value, { offset: 1 })
  }, 60)
  // #endif
  // #ifndef APP-NVUE
  if (!delay) {
    toLeft.value = 1
    return
  }
  setTimeout(() => {
    toLeft.value = 1
  }, 60)
  // #endif
}
function ended(e) {
  // console.log('ended', e)
  // Android下scroller没有scrollend事件，我们在scroll中模拟ended，返回内容是e.contentOffset.x
  // #ifdef APP-NVUE
  const scrollX = Math.abs(e.contentOffset.x)
  // const scrollX = Math.abs(e.contentOffset.x)
  toCenterItem(scrollX)
  return
  // #endif
  // #ifndef APP-NVUE
  const sX = e.detail.scrollLeft
  toCenterItem(sX)
  // #endif
}
// android下没有scrollend事件，只好使用scroll事件来做判断
function onScroll(e) {
  scrollTimer && clearTimeout(scrollTimer)
  scrollTimer = null
  scrollTimer = setTimeout(() => {
    ended(e)
  }, 100)
  // #ifndef APP-NVUE
  // 我们暂时不适配跟随滚动的放大/缩小
  // #endif
}
// we must bind it in parent
// 不然，一个个绑定的时候后面的会覆盖掉前面的
function bindScroll() {
  unbind()
  // console.log('bind xxxxx', children.value)
  const _props = []
  for (const i in children.value) {
    const _child = children.value[i]
    // 注意：这个表达式里面，iOS下的x是rpx，但是在Android下却是px，很操蛋的东西
    // ios下对应scroll-view，Android下对应scroller
    let exp = `abs((${widthPx.value * 0.5 + _child.index * itemWidthPx.value} - (x + ${
      widthPx.value * 0.5
    })) / ${maxApartPx.value}) > 1 ? (${props.widthScale},${props.heightScale}) : abs(cos(abs((${
      widthPx.value * 0.5 + _child.index * itemWidthPx.value
    } - (x + ${widthPx.value * 0.5})) / ${maxApartPx.value})*(3.14/4)))`
    // #ifdef APP-NVUE
    if (platform === 'ios') {
      // exp = `abs((${widthRpx.value * 0.5 + _child.index * itemWidthRpx.value} - (x + ${widthRpx.value * 0.5})) / ${maxApartRpx.value}) > 1 ? (${props.widthScale},${props.heightScale}) : abs(cos(abs((${widthRpx.value * 0.5 + _child.index * itemWidthRpx.value} - (x + ${widthRpx.value * 0.5})) / ${maxApartRpx.value})*(3.14/4)))`
    }
    // #endif
    _props.push({
      element: _child.ngalleryitem.ref, // 这里响应性没有了? children.value的缘故？
      property: 'transform.scale', //动画属性
      expression: exp,
    })
  }
  // console.log('bind: ', _props)
  const bind = bindingX.bind(
    {
      eventType: 'scroll',
      anchor: ngallery.value.ref,
      props: _props,
    },
    (state) => {
      // console.log(state)
    }
  )
  bindToken = bind.token
}
function toCenterItem(scrollX) {
  const number = Math.round(scrollX / itemWidthPx.value)
  emit('change', number)
  const oldLeft = toLeft.value
  const newLeft = number * itemWidthPx.value
  // #ifndef APP-NVUE
  // 非nvue-app下，当前我们仅在这里调整item的样式
  for (const i in children.value) {
    const _child = children.value[i]
    _child.fitStyles(number)
  }
  // #endif
  // 很小时允许不滚动，防止抖动
  if (Math.abs(newLeft - scrollX) <= 2) {
    return
  }
  // #ifdef APP-NVUE
  dom.scrollToElement(ngalleryleft.value, { offset: newLeft })
  return
  // #endif
  if (oldLeft != newLeft) {
    toLeft.value = newLeft
    return
  }
  // 相等的时候设置不会引起滚动,需要特殊处理
  if (oldLeft === newLeft) {
    toLeft.value = 0
    toLeft.value = newLeft + 0.1
    // Tag:
    // 中间不断滑动又停止又滑动，快速动作时会引起死循环，一直在end
    // 突然停住的时候会死循环
    // solve the bug via a timeout
  }
}
function unbind() {
  if (bindToken) {
    bindingX.unbind({
      eventType: 'scroll',
      token: bindToken,
    })
    bindToken = 0
  }
}
</script>

<style lang="scss" scoped></style>
