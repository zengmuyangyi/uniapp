<template>
  <view
    :class="[
      'n-flex-row',
      'n-align-' + align,
      'n-justify-center',
      'n-overflow-hidden',
      'n-position-relative',
    ]"
    :style="boxStyle"
  >
    <view
      :class="['n-bg-' + bgType]"
      :style="'width:' + width + 'rpx;height:' + height + 'rpx;' + barStyle"
    >
      <view
        ref="nbar"
        :class="['n-bg-' + activeBgType]"
        :style="'height:' + height + 'rpx;' + activeBarStyle + barAni"
      ></view>
    </view>
    <view
      ref="nbar1"
      class="n-position-absolute"
      :style="indicatorStyle + ind1Ani"
      @touchstart="toPan"
      @touchmove="onMove"
      @touchend="onEnd"
      @touchcancel="onCancel"
    >
      <slot>
        <view
          class="n-bg-inverse n-border-all"
          style="width: 54rpx; height: 54rpx; border-radius: 54rpx"
        ></view>
      </slot>
    </view>
    <view
      v-if="range"
      ref="nbar2"
      class="n-position-absolute"
      :style="indicator2Style + ind2Ani"
      @touchstart="toPan2"
      @touchmove="onMove2"
      @touchend="onEnd2"
      @touchcancel="onCancel2"
    >
      <slot name="other">
        <view
          class="n-bg-inverse n-border-all"
          style="width: 54rpx; height: 54rpx; border-radius: 54rpx"
        ></view>
      </slot>
    </view>
  </view>
</template>

<script setup>
import { ref, watch, computed, onUnmounted } from 'vue'
import { getPlatform, getPx } from '../utils/system.js'
import { getTouchPoint } from '../utils/element.js'

// #ifdef APP-NVUE
let iosHack1 = null
let iosHack2 = null
let bindToken = null
let bindToken2 = null
const animation = uni.requireNativePlugin('animation')
const bindingX = uni.requireNativePlugin('bindingx')
// #endif

import { makeProps } from '../utils/props.js'

const props = defineProps(
  makeProps([
    ['value', 0],
    ['value2', 0],
    ['min', 0],
    ['max', 10],
    ['range', false],
    ['width', 520],
    ['height', 4],
    ['align', 'center'],
    ['duration', 20],
    ['lastAdjust', 20],
    ['bgType', 'middle'],
    ['activeBgType', 'primary'],
    'boxStyle',
    'barStyle',
    'activeBarStyle',
    ['indicatorStyle', 'left:0;top:0;'],
    ['indicator2Style', 'left:0;top:0;'],
  ])
)
const emit = defineEmits(['change', 'change1', 'change2'])

let initTimer = null
let time = 0
let start = null
let start2 = null
const platform = getPlatform()

const inValue = ref(0)
const inValue2 = ref(10)
const inMoving = ref(false)
const ind1Style = ref('')
const ind2Style = ref('')
const x1 = ref(0)
const x2 = ref(0)
const ind1Ani = ref('')
const ind2Ani = ref('')
const barAni = ref('')

const nbar = ref(null)
const nbar1 = ref(null)
const nbar2 = ref(null)

const widthPx = computed(() => {
  return getPx(props.width)
})
watch(
  () => props.value,
  (newV) => {
    if (inMoving.value) return
    if (newV == inValue.value) return
    inValue.value = newV
    initTimer && clearTimeout(initTimer)
    initTimer = null
    toInit()
  }
)
watch(
  () => props.value2,
  (newV) => {
    if (inMoving.value) return
    if (newV == inValue2.value) return
    inValue2.value = newV
    initTimer && clearTimeout(initTimer)
    initTimer = null
    toInit()
  }
)
created()

function created() {
  inValue.value = props.value
  inValue2.value = props.value2
  inMoving.value = false
  // #ifndef APP-NVUE
  toInit()
  // #endif
  // #ifdef APP-NVUE
  initTimer = setTimeout(() => {
    toInit()
  }, 10)

  if (platform === 'ios') {
    setTimeout(() => {
      iosHack1 = bindingX.bind({
        eventType: 'pan',
        anchor: nbar1.value.ref,
        props: [
          {
            element: nbar1.value.ref,
            property: 'transform.translateX',
            expression: 'x+0',
          },
        ],
      })
      if (props.range) {
        iosHack2 = bindingX.bind({
          eventType: 'pan',
          anchor: nbar2.value.ref,
          props: [
            {
              element: nbar2.value.ref,
              property: 'transform.translateX',
              expression: 'x+0',
            },
          ],
        })
      }
    }, 10)
  }
  // #endif
}

function toPan(e) {
  if (inMoving.value) return
  time = Date.now()
  inMoving.value = true
  start = getTouchPoint(e)
  // #ifdef APP-NVUE
  const barRef = nbar1.value.ref
  const propsx = [
    {
      element: barRef,
      property: 'transform.translateX',
      expression: `min(${widthPx.value}, max(x+${x1.value}, 0))`,
    },
    {
      element: nbar.value.ref,
      property: 'width',
      expression: props.range
        ? `${x2.value} - min(${widthPx.value}, max(x+${x1.value}, 0))`
        : `min(${widthPx.value}, max(x+${x1.value}, 0))`,
    },
  ]
  if (props.range) {
    propsx.push({
      element: nbar.value.ref,
      property: 'transform.translateX',
      expression: `min(${widthPx.value}, max(x+${x1.value}, 0))`,
    })
  }
  const bind = bindingX.bind(
    {
      eventType: 'pan',
      anchor: barRef,
      props: propsx,
    },
    (e) => {
      if (e.state === 'end' || e.state === 'cancel' || e.state === 'exit') {
        x1.value = Math.min(widthPx.value, Math.max(e.deltaX + x1.value, 0))
        unbind()
        toEmit(1, x1.value, true)
      }
    }
  )
  bindToken = bind.token
  // #endif
}
function toPan2(e) {
  if (inMoving.value) return
  time = Date.now()
  inMoving.value = true
  start2 = getTouchPoint(e)
  // #ifdef APP-NVUE
  const barRef = nbar2.value.ref
  const props = [
    {
      element: barRef,
      property: 'transform.translateX',
      expression: `min(${widthPx.value}, max(x+${x2.value}, 0))`,
    },
    {
      element: nbar.value.ref,
      property: 'width',
      expression: `min(${widthPx.value}, max(x+${x2.value}, 0)) - ${x1.value}`,
    },
  ]
  const bind = bindingX.bind(
    {
      eventType: 'pan',
      anchor: barRef,
      props: props,
    },
    (e) => {
      if (e.state === 'end' || e.state === 'cancel' || e.state === 'exit') {
        x2.value = Math.min(widthPx.value, Math.max(e.deltaX + x2.value, 0))
        unbind()
        toEmit(2, x2.value, true)
      }
    }
  )
  bindToken2 = bind.token
  // #endif
}
function onMove(e) {
  const now = getTouchPoint(e)
  // #ifdef APP-NVUE
  const offset = now.sX - start.sX
  // #endif
  // #ifndef APP-NVUE
  const offset = now.x - start.x
  // #endif

  // #ifndef APP-NVUE
  ind1Ani.value = `transform:translateX(${Math.min(
    widthPx.value,
    Math.max(x1.value + offset, 0)
  )}px);`
  let barA = `width:${
    props.range
      ? x2.value - Math.min(widthPx.value, Math.max(offset + x1.value, 0))
      : Math.min(widthPx.value, Math.max(offset + x1.value, 0))
  }px;`
  if (props.range) {
    barA += `transform:translateX(${Math.min(widthPx.value, Math.max(offset + x1.value, 0))}px);`
  }
  barAni.value = barA
  // #endif
  const t = Date.now()
  let v1 = props.min + ((props.max - props.min) * (x1.value + offset)) / widthPx.value
  if (t - time >= props.duration) {
    time = Date.now()
    toEmit(1, x1.value + offset)
  }
}
function onMove2(e) {
  const now = getTouchPoint(e)
  // #ifdef APP-NVUE
  const offset = now.sX - start2.sX
  // #endif
  // #ifndef APP-NVUE
  const offset = now.x - start2.x
  // #endif

  // #ifndef APP-NVUE
  ind2Ani.value = `transform:translateX(${Math.min(
    widthPx.value,
    Math.max(offset + x2.value, 0)
  )}px);`
  barAni.value =
    barAni.value + `width:${Math.min(widthPx.value, Math.max(offset + x2.value, 0)) - x1.value}px;`
  // #endif
  const t = Date.now()
  let v2 = props.min + ((props.max - props.min) * (x2.value + offset)) / widthPx.value
  if (t - time >= props.duration) {
    time = Date.now()
    toEmit(2, x2.value + offset)
  }
}
function onEnd(e) {
  // #ifndef APP-NVUE
  const now = getTouchPoint(e)
  const offset = now.x - start.x
  inMoving.value = false
  x1.value = Math.min(widthPx.value, Math.max(offset + x1.value, 0))
  toEmit(1, x1.value, true)
  // #endif
}
function onEnd2(e) {
  // #ifndef APP-NVUE
  inMoving.value = false
  const now = getTouchPoint(e)
  const offset = now.x - start2.x
  x2.value = Math.min(widthPx.value, Math.max(offset + x2.value, 0))
  toEmit(2, x2.value, true)
  // #endif
}
function onCancel(e) {
  // #ifndef APP-NVUE
  onEnd(e)
  // #endif
}
function onCancel2(e) {
  // #ifndef APP-NVUE
  onEnd2(e)
  // #endif
}
function toEmit(i, x, end) {
  // 请自行修正数据的可靠性
  let v = props.min + ((props.max - props.min) * x) / widthPx.value
  if (v <= props.min) {
    v = props.min
  } else if (v >= props.max) {
    v = props.max
  } else {
    v = Math.round(v)
  }
  if (end && props.lastAdjust) {
    if (i == 1) {
      inValue.value = v
    } else {
      inValue2.value = v
    }
    toInit()
  }
  if ((end && props.lastAdjust) || !end) {
    if (props.range) {
      emit('change' + i, v)
      return
    }
    emit('change', v)
  }
}
function unbind() {
  inMoving.value = false
  // #ifdef APP-NVUE
  bindToken &&
    bindingX.unbind({
      token: bindToken,
      eventType: 'pan',
    })
  bindToken = null
  bindToken2 &&
    bindingX.unbind({
      token: bindToken2,
      eventType: 'pan',
    })
  bindToken2 = null
  // #endif
}
function toInit() {
  const x11 = (widthPx.value * (inValue.value - props.min)) / (props.max - props.min)
  let x22 = 0
  if (props.range) {
    x22 = (widthPx.value * (inValue2.value - props.min)) / (props.max - props.min)
  }
  x1.value = x11
  x2.value = x22
  // #ifdef APP-NVUE
  animation.transition(
    nbar.value,
    {
      styles: {
        width: `${props.range ? x22 - x11 : x11}px`,
        transform: `translateX(${props.range ? x11 : 0}px)`,
      },
      duration: 0,
      delay: 0,
    },
    () => {
      initTimer && clearTimeout(initTimer)
      initTimer = null
    }
  )
  animation.transition(nbar1.value, {
    styles: { transform: `translateX(${x11}px)` },
    duration: 0,
    delay: 0,
  })
  if (props.range) {
    animation.transition(nbar2.value, {
      styles: { transform: `translateX(${x22}px)` },
      duration: 0,
      delay: 0,
    })
  }
  // #endif
  // #ifndef APP-NVUE
  barAni.value = `width:${props.range ? x22 - x11 : x11}px;transform:translateX(${
    props.range ? x11 : 0
  }px);`
  ind1Ani.value = `transform:translateX(${x11}px);`
  ind2Ani.value = `transform:translateX(${x22}px);`
  // #endif
}

onUnmounted(() => {
  // #ifdef APP-NVUE
  bindToken &&
    bindingX.unbind({
      token: bindToken,
      eventType: 'pan',
    })
  bindToken2 &&
    bindingX.unbind({
      token: bindToken2,
      eventType: 'pan',
    })
  if (iosHack1) {
    bindingX.unbind({
      token: iosHack1.token,
      eventType: 'pan',
    })
  }
  if (iosHack2) {
    bindingX.unbind({
      token: iosHack2.token,
      eventType: 'pan',
    })
  }
  // #endif
  initTimer && clearTimeout(initTimer)
})
</script>

<style></style>
