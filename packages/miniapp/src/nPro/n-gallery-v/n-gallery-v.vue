<template>
  <!-- #ifdef APP-NVUE -->
  <!-- ios下可以使用scroll-view，有end事件和scroll-left，不过在某些极限左右滑动操作下，容易引起一直在end，以及抖动情况。。需要延时处理end事件。所以现在统一使用scroller -->
  <!-- Android下 scroll-view 不支持使用bindingX。所以使用 scroller。但是没有scrollend事件，没有scroll-left属性 -->
  <scroller
    ref="ngalleryv"
    class="n-flex-column n-align-center"
    :scroll-with-animation="true"
    scroll-direction="vertical"
    :show-scrollbar="false"
    :style="mrBoxStyle"
    @scroll="onScroll"
  >
    <view ref="ngallerytop" style="width: 1px; height: 0"></view>
    <slot></slot>
  </scroller>
  <!-- #endif -->
  <!-- #ifndef APP-NVUE -->
  <scroll-view
    ref="ngalleryv"
    class="n-flex-column n-align-center"
    :enable-flex="true"
    :scroll-with-animation="true"
    :scroll-top="toLeft"
    :scroll-y="true"
    :show-scrollbar="false"
    :style="mrBoxStyle"
    @scroll="onScroll"
  >
    <slot></slot>
  </scroll-view>
  <!-- #endif -->
</template>

<script setup>
/**
 * 连续滚动的画廊，采用scroll-view实现。
 * 特点：连续滚动；居中放大（中心点可变）
 */
import { computed, ref, provide, onMounted, onUnmounted, watch } from 'vue'
import { makeProps } from '../utils/props.js'

// #ifdef APP-NVUE
const bindingX = uni.requireNativePlugin('bindingx')
const dom = uni.requireNativePlugin('dom')
// #endif

import { getPlatform, getPx, getRatio } from '../utils/system.js'

const props = defineProps(
  makeProps([
    ['scrollHeight', '750rpx'],
    ['width', '750rpx'],
    ['height', '360rpx'],
    ['widthScale', 0.7],
    ['heightScale', 0.8],
    ['scaleFactor', 0.5],
    ['space', '0'],
    ['top', '0'],
    ['bottom', '0'],
    'boxStyle',
    'itemStyle',
    ['updateTime', 0],
  ])
)
const emit = defineEmits(['change', 'selected'])

const platform = getPlatform()
let scrollTimer = null
let bindToken = null
const toLeft = ref(0)
const children = ref([])
const ngallerytop = ref(null)
const ngalleryv = ref(null)

const mrBoxStyle = computed(() => {
  return `width:${widthPx.value}px;height:${props.scrollHeight};` + props.boxStyle
})
const widthPx = computed(() => {
  return getPx(props.width)
})
const heightPx = computed(() => {
  return getPx(props.height)
})
const maxApartPx = computed(() => {
  return (heightPx.value + itemHeightPx.value) * (props.scaleFactor > 0 ? props.scaleFactor : 0.5)
})
const itemWidthPx = computed(() => {
  return widthPx.value * props.widthScale
})
const itemHeightPx = computed(() => {
  return heightPx.value * props.heightScale
})
const firstMargin = computed(() => {
  const w = heightPx.value * (1 - props.heightScale) * 0.5
  return `margin-top:${w}px;`
})
const lastMargin = computed(() => {
  const w = heightPx.value * (1 - props.heightScale) * 0.5
  return `margin-bottom:${w}px;`
})
const mrItemStyle = computed(() => {
  return props.itemStyle + `width:${itemWidthPx.value}px;height:${itemHeightPx.value}px;`
})

provide('nGalleryV', {
  children,
  firstMargin,
  lastMargin,
  mrItemStyle,
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
})

function pushChild(vm) {
  children.value.push(vm)
}
function emitEvent(val) {
  emit('selected', val)
}
function initLayout(delay = false) {
  if (children.value.length === 0) return
  for (const i in children.value) {
    const _child = children.value[i]
    _child.initLayout()
  }
  // #ifdef APP-NVUE
  if (platform === 'ios' || !delay) {
    bindScroll()
    dom.scrollToElement(ngallerytop.value, { offset: 1 })
    return
  }
  setTimeout(() => {
    bindScroll()
  }, 50)
  setTimeout(() => {
    // 初始化排版
    dom.scrollToElement(ngallerytop.value, { offset: 1 })
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
  // Android下scroller没有scrollend事件，我们在scroll中模拟ended，返回内容是e.contentOffset.x
  // #ifdef APP-NVUE
  const scrollX = Math.abs(e.contentOffset.y)
  toCenterItem(scrollX)
  return
  // #endif
  // #ifndef APP-NVUE
  const sX = e.detail.scrollTop
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
  const _props = []
  for (const i in children.value) {
    const _child = children.value[i]
    let exp = `abs((${heightPx.value * 0.5 + _child.index * itemHeightPx.value} - (y + ${
      heightPx.value * 0.5
    })) / ${maxApartPx.value}) > 1 ? (${props.widthScale},${props.heightScale}) : abs(cos(abs((${
      heightPx.value * 0.5 + _child.index * itemHeightPx.value
    } - (y + ${heightPx.value * 0.5})) / ${maxApartPx.value})*(3.14/4)))`
    _props.push({
      element: _child.ngalleryvitem.ref,
      property: 'transform.scale', //动画属性
      expression: exp,
    })
  }
  const bind = bindingX.bind(
    {
      eventType: 'scroll',
      anchor: ngalleryv.value.ref,
      props: _props,
    },
    (state) => {
      // console.log(state)
    }
  )
  bindToken = bind.token
}
function toCenterItem(scrollX) {
  const number = Math.round(scrollX / itemHeightPx.value)
  emit('change', number)
  const oldLeft = toLeft.value
  const newLeft = number * itemHeightPx.value
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
  dom.scrollToElement(ngallerytop.value, { offset: newLeft })
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
