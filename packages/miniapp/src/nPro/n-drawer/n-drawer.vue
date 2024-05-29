<template>
  <view bubble="true">
    <view
      v-if="hasOverlay"
      ref="npopooverlay"
      :class="['n-popo-over', 'n-bg-' + overlay.bgType]"
      @tap.stop="overlayClose"
      :style="mrOverlayStyle + overlayNoWeexAni"
    >
      <slot name="overlay"></slot>
    </view>
    <view
      ref="npopo"
      bubble="true"
      @touchstart="onAllTouchStart"
      @touchmove="onAllTouchMove"
      @touchcancel="onAllTouchCancel"
      @touchend="onAllTouchEnd"
      @tap.stop="toPrevent"
      :class="['n-flex-column', 'n-popo', 'n-bg-' + bgType]"
      :style="boxStyle + mrPopStyle + noWeexAni"
    >
      <view
        v-if="!allowAll"
        ref="npopostand"
        @touchstart="onStandTouchStart"
        @touchmove="onStandTouchMove"
        @touchcancel="onStandTouchCancel"
        @touchend="onStandTouchEnd"
        @tap.stop="toPrevent"
      >
        <slot name="standout"></slot>
      </view>
      <slot></slot>
    </view>
  </view>
</template>

<script setup>
/**
 * n-drawer
 * @description 可跟手拖动的抽屉。
 * @property {String} pos 出现位置
 * @property {String} bgType = [nav|primary|success|warning|error|light|dark|inverse|custom|link|none|page|hover|mask|mask-dark|border|border-light|border-dark|gradient] 内容背景主题
 * @property {Number} duration 打开/关闭的动画周期
 * @property {Boolean} auto = [true|false] 停止手势后是否自动打开
 * @property {Boolean} allowAll = [true|false] 是否手势加在整个内容上
 * @property {Boolean} allowSwipe = [true|false] 是否允许swipe动作来打开/关闭
 * @property {Boolean} hasOverlay = [true|false] 是否存在遮罩层
 * @property {Object} overlay 遮罩层的整体设置 timingFunction: ['ease-in', 'ease-out'],duration: 300,bg: '',bgType: 'mask'
 * @property {Object} animation 打开/关闭动画 timingFunction: 'ease-in-out'
 * @property {String} baseWidth 基准宽度
 * @property {String} width 内容的宽度
 * @property {String} baseHeight 基准高度
 * @property {String} height 内容高度
 * @property {String} standout 内容露出的高度
 * @property {String} leftOffset 内容左侧偏移量，-1表示居中
 * @property {String} rightOffset 内容右侧偏移量，-1表示居中
 * @property {String} bottomOffset 内容底部偏移量，-1表示居中
 * @property {String} topOffset 内容顶部偏移量，-1表示居中
 * @property {String} left 遮罩左侧偏移量
 * @property {String} top 遮罩顶部偏移量
 * @property {String} right 遮罩右侧偏移量
 * @property {String} bottom 遮罩底部偏移量
 * @property {Boolean} initWithAni = [true|false] 是否具备初始动画
 * @property {Number} initDelay 初始动画的延时
 * @property {Number} initDuration 初始动画周期
 * @property {Number} openRate 多少比例自动打开
 * @property {Number} closeRate 多少比例自动关闭
 * @property {Number} delay 关闭时有个delay 否则Android下点击事件存在问题
 * @property {String} overlayStyle 遮罩层的外层样式 MP/H5可设置z-index
 * @property {String} boxStyle 内容外层样式 MP/H5可设置z-index
 * @event {Function} start 触摸开始事件
 * @event {Function} end 触摸结束事件
 * @event {Function} overlayClicked 遮罩层点击事件
 */

//
// 问题：
// android下面未打开时无法响应点击事件,打开一次之后才能响应。open/close的bindingx的时候android加一个延时
// android下，内容里有list，且list可滚动的时候，android无法绑定pan手势.可以往list滚动事件绑定相关方面考虑
// 也可以这个时候关闭的时候不用跟手，直接判断条件是关闭还是打开
// drawer里面的内容实现点击打开drawer本身，因为touch以及click冲突，会导致打开异常-就是遮罩层不一定会显示
// 也有可能手势关闭的时候闪烁一下（内部状态发生了1次突变引起的.打开-关闭-打开）.暂时不建议点击drawer打开drawer
//

import { computed, onMounted, onUnmounted, ref } from 'vue'
import { makeProps } from '../utils/props.js'

// #ifdef APP-NVUE
const animation = uni.requireNativePlugin('animation')
const bindingX = uni.requireNativePlugin('bindingx')
// #endif

import { getTouchPoint } from '../utils/element.js'
import { getHeight, getPx, getPlatform } from '../utils/system.js'

let iosHack = null
let platform = ''

const props = defineProps(
  makeProps([
    ['pos', 'bottom'],
    'bgType',
    ['duration', 300],
    ['auto', true],
    ['allowAll', true],
    ['allowSwipe', true],
    ['onlySwipe', false],
    ['hasOverlay', true],
    ['overlay', { timingFunction: ['ease-in', 'ease-out'], duration: 300, bg: '', bgType: 'mask' }],
    ['baseHeight', 'screen'],
    ['height', '0'],
    ['standout', '0'],
    ['leftOffset', '-1'],
    ['rightOffset', '-1'],
    ['bottomOffset', '-1'],
    ['topOffset', '-1'],
    ['baseWidth', '750rpx'],
    ['width', '750rpx'],
    ['animation', { timingFunction: 'ease-in-out' }],
    ['initWithAni', true],
    ['initDelay', 200],
    ['initDuration', 300],
    ['left', '0'],
    ['right', '0'],
    ['top', '0'],
    ['bottom', '0'],
    ['openRate', 0.5],
    ['closeRate', 0.5],
    ['delay', 150],
    'overlayStyle',
    'boxStyle',
  ])
)
const emit = defineEmits(['start', 'end', 'overlayClicked', 'open', 'close'])

defineExpose({
  show,
  hide,
})

const overlayNoWeexAni = ref('')
const noWeexAni = ref('')
const isShow = ref(false)
const lastOffset = ref(0)
const startPoint = ref(null)
const nStartPoint = ref(null)
const nBindRes = ref(null)
const npopooverlay = ref(null)
const npopo = ref(null)
const npopostand = ref(null)

const screenHeight = computed(() => {
  return getHeight(props.baseHeight)
})
const screenWidth = computed(() => {
  return getPx(props.baseWidth)
})
const overlayHeight = computed(() => {
  return screenHeight.value - topPx.value - bottomPx.value
})
const mrOverlayStyle = computed(() => {
  let style = `left:${leftPx.value}px;top:${topPx.value}px;right:${rightPx.value}px;`
  return style + props.overlayStyle
})
const mrPopStyle = computed(() => {
  let style = {
    width: `${widthPx.value}px`,
    height: `${heightPx.value}px`,
  }
  // top: left/right-width-height-top  bottom: left/right-width-height-bottom
  if (props.pos === 'top' || props.pos === 'bottom') {
    if (leftOffsetPx.value < 0 && rightOffsetPx.value < 0) {
      style['left'] =
        (screenWidth.value - leftPx.value - rightPx.value - widthPx.value) * 0.5 + 'px'
    } else {
      if (leftOffsetPx.value >= 0) {
        style['left'] = leftPx.value + leftOffsetPx.value + 'px'
      } else if (rightOffsetPx.value >= 0) {
        style['right'] = rightPx.value + rightOffsetPx.value + 'px'
      }
    }
    style[props.pos] = -heightPx.value + 'px'
  }
  if (props.pos === 'left' || props.pos === 'right') {
    if (topOffsetPx.value < 0 && bottomOffsetPx.value < 0) {
      style['top'] =
        (screenHeight.value - topPx.value - bottomPx.value - heightPx.value) * 0.5 + 'px'
    } else {
      if (topOffsetPx.value >= 0) {
        style['top'] = topPx.value + topOffsetPx.value + 'px'
      } else if (bottomOffsetPx.value >= 0) {
        style['bottom'] = bottomPx.value + bottomOffsetPx.value + 'px'
      }
    }
    style[props.pos] = -widthPx.value + 'px'
  }
  let _style = ''
  for (const i in style) {
    _style += i + ':' + style[i] + ';'
  }
  return _style
})
const heightPx = computed(() => {
  const h = getHeight(props.height)
  if (h > 1) {
    return h
  }
  if (h <= 0) {
    return (
      screenHeight.value -
      topPx.value -
      bottomPx.value -
      (topOffsetPx.value >= 0 ? topOffsetPx.value : 0) -
      (bottomOffsetPx.value >= 0 ? bottomOffsetPx.value : 0)
    )
  }
  return screenHeight.value * h
})
const widthPx = computed(() => {
  const w = getPx(props.width)
  if (w <= 0) {
    return (
      screenWidth.value -
      leftPx.value -
      rightPx.value -
      (leftOffsetPx.value >= 0 ? leftOffsetPx.value : 0) -
      (rightOffsetPx.value >= 0 ? rightOffsetPx.value : 0)
    )
  }
  return w
})
const standoutPx = computed(() => {
  return getHeight(props.standout)
})
const leftOffsetPx = computed(() => {
  if (props.leftOffset === '-1') return -1
  return getPx(props.leftOffset)
})
const topOffsetPx = computed(() => {
  if (props.topOffset === '-1') return -1
  return getHeight(props.topOffset)
})
const rightOffsetPx = computed(() => {
  if (props.rightOffset === '-1') return -1
  return getPx(props.rightOffset)
})
const bottomOffsetPx = computed(() => {
  if (props.bottomOffset === '-1') return -1
  return getHeight(props.bottomOffset)
})
const leftPx = computed(() => {
  return getPx(props.left)
})
const topPx = computed(() => {
  return getHeight(props.top)
})
const rightPx = computed(() => {
  return getPx(props.right)
})
const bottomPx = computed(() => {
  return getHeight(props.bottom)
})

// 组件创建后增加显示动画效果
function initShow() {
  let dur = 0
  if (props.initWithAni) {
    dur = props.initDuration || 0
  }
  // #ifndef APP-NVUE
  noWeexAni.value = `transition-property: transform;transition-duration:${dur}ms;transition-timing-function: ${
    props.animation.timingFunction
  };transform:translate${props.pos == 'top' || props.pos == 'bottom' ? 'Y' : 'X'}(${
    props.pos == 'top' || props.pos == 'left' ? standoutPx.value : -1 * standoutPx.value
  }px);`
  // #endif
  // #ifdef APP-NVUE
  animation.transition(npopo.value, {
    styles: {
      transform: `translate${props.pos == 'top' || props.pos == 'bottom' ? 'Y' : 'X'}(${
        props.pos == 'top' || props.pos == 'left' ? standoutPx.value : -1 * standoutPx.value
      }px)`,
    },
    delay: 0,
    duration: dur,
    timingFunction: props.animation.timingFunction,
  })
  // #endif
}
// ref method to open
function show(duration) {
  toHackShow(true, typeof duration === 'undefined' ? props.duration : duration)
}
// ref method to close
function hide(duration) {
  toHackShow(false, typeof duration === 'undefined' ? props.duration : duration)
}
function onAllTouchStart(e) {
  props.allowAll && onTouchStart(e)
}
function onAllTouchMove(e) {
  // #ifndef APP-NVUE
  props.allowAll && onTouchMove(e)
  // #endif
}
function onAllTouchEnd(e) {
  props.allowAll && onTouchEnd(e)
}
function onAllTouchCancel(e) {
  props.allowAll && onTouchCancel(e)
}
function onStandTouchStart(e) {
  onTouchStart(e)
}
function onStandTouchMove(e) {
  // #ifndef APP-NVUE
  onTouchMove(e)
  // #endif
}
function onStandTouchEnd(e) {
  // #ifndef APP-NVUE
  onTouchEnd(e)
  // #endif
}
function onStandTouchCancel(e) {
  onTouchCancel(e)
}
function onTouchStart(e) {
  emit('start')
  // #ifdef APP-NVUE
  isShow.value ? closeWithDrag() : openWithDrag()
  nStartPoint.value = getTouchPoint(e)
  // #endif
  // #ifndef APP-NVUE
  startPoint.value = getTouchPoint(e)
  // #endif
}
// #ifndef APP-NVUE
function onTouchMove(e) {
  if (!startPoint.value) return
  const nowPoint = getTouchPoint(e)
  const maxSize = getTransformSize(props.pos, false)
  const moveSize = maxSize - standoutPx.value
  let offsetY = nowPoint.y - startPoint.value.y
  let offsetX = nowPoint.x - startPoint.value.x
  if (!props.auto) {
    offsetY += lastOffset.value
    offsetX += lastOffset.value
  }
  if (!isShow.value) {
    if (props.pos === 'top') {
      if (offsetY > 0) {
        offsetY += standoutPx.value
        const y = offsetY >= maxSize ? maxSize : offsetY
        noWeexAni.value = `transition-property: transform; transform: translateY(${y}px); transition-duration: 0ms;`
        if (props.hasOverlay) {
          overlayNoWeexAni.value = `transition-property:opacity; transition-duration: 0ms;opacity:${
            (y - standoutPx.value) / moveSize
          };height:${overlayHeight.value}px;`
        }
      } else {
      }
    } else if (props.pos === 'bottom') {
      if (offsetY >= 0) {
      } else {
        offsetY += -1 * standoutPx.value
        const y = -offsetY >= maxSize ? -1 * maxSize : offsetY
        noWeexAni.value = `transition-property: transform; transform: translateY(${y}px); transition-duration: 0ms;`
        if (props.hasOverlay) {
          overlayNoWeexAni.value = `transition-property:opacity; transition-duration: 0ms;opacity:${
            (-y - standoutPx.value) / moveSize
          };height:${overlayHeight.value}px;`
        }
      }
    } else if (props.pos === 'left') {
      if (offsetX > 0) {
        offsetX += standoutPx.value
        const x = offsetX >= maxSize ? maxSize : offsetX
        noWeexAni.value = `transition-property: transform; transform: translateX(${x}px); transition-duration: 0ms;`
        if (props.hasOverlay) {
          overlayNoWeexAni.value = `transition-property:opacity; transition-duration: 0ms;opacity:${
            (x - standoutPx.value) / moveSize
          };height:${overlayHeight.value}px;`
        }
      } else {
      }
    } else if (props.pos === 'right') {
      if (offsetX < 0) {
        offsetX += -1 * standoutPx.value
        const x = -offsetX >= maxSize ? -1 * maxSize : offsetX
        noWeexAni.value = `transition-property: transform; transform: translateX(${x}px); transition-duration: 0ms;`
        if (props.hasOverlay) {
          overlayNoWeexAni.value = `transition-property:opacity; transition-duration: 0ms;opacity:${
            (-x - standoutPx.value) / moveSize
          };height:${overlayHeight.value}px;`
        }
      } else {
      }
    }
  } else {
    if (props.pos === 'top') {
      if (offsetY <= 0) {
        const y = -offsetY + standoutPx.value >= maxSize ? standoutPx.value : maxSize + offsetY
        // in H5: we must use 0ms and not 0, or it will hold 300ms. i.e 0 can not change 300ms into 0, must use 0ms
        noWeexAni.value = `transition-property: transform; transform: translateY(${y}px); transition-duration: 0ms;`
        if (props.hasOverlay) {
          overlayNoWeexAni.value = `transition-property:opacity; transition-duration: 0ms;opacity:${
            (y - standoutPx.value) / moveSize
          };height:${overlayHeight.value}px;`
        }
      } else {
      }
    } else if (props.pos === 'bottom') {
      if (offsetY <= 0) {
      } else {
        const y = offsetY + standoutPx.value >= maxSize ? -standoutPx.value : -maxSize + offsetY
        noWeexAni.value = `transition-property: transform; transform: translateY(${y}px); transition-duration: 0ms;`
        if (props.hasOverlay) {
          overlayNoWeexAni.value = `transition-property:opacity; transition-duration: 0ms;opacity:${
            (-y - standoutPx.value) / moveSize
          };height:${overlayHeight.value}px;`
        }
      }
    } else if (props.pos === 'left') {
      if (offsetX <= 0) {
        const x = -offsetX + standoutPx.value >= maxSize ? standoutPx.value : offsetX + maxSize
        noWeexAni.value = `transition-property: transform; transform: translateX(${x}px); transition-duration: 0ms;`
        if (props.hasOverlay) {
          overlayNoWeexAni.value = `transition-property:opacity; transition-duration: 0ms;opacity:${
            (x - standoutPx.value) / moveSize
          };height:${overlayHeight.value}px;`
        }
      } else {
      }
    } else if (props.pos === 'right') {
      if (offsetX > 0) {
        const x = offsetX + standoutPx.value >= maxSize ? -standoutPx.value : offsetX - maxSize
        noWeexAni.value = `transition-property: transform; transform: translateX(${x}px); transition-duration: 0ms;`
        if (props.hasOverlay) {
          overlayNoWeexAni.value = `transition-property:opacity; transition-duration: 0ms;opacity:${
            (-x - standoutPx.value) / moveSize
          };height:${overlayHeight.value}px;`
        }
      } else {
      }
    }
  }
}
// #endif
function onTouchEnd(e) {
  console.log('touchend')
  // #ifdef APP-NVUE
  if (platform == 'ios') return
  if (!nStartPoint.value) return
  if (!isShow.value) return
  //
  // 当快速滑动的时候，可能会导致没有触发pan，从而
  //
  // nvue下内部包含list的时候，android无法获取到正常的pan绑定
  // 所以touchend之后会发现bindingx的状态还是start，正常应该是end（先返回状态，然后是end事件）
  // nBindRes = (state: res.state, token: result.token)
  //
  if (!nBindRes.value || nBindRes.value.state == 'end') return
  const token = nBindRes.value.token
  nBindRes.value = null
  const nNowPoint = getTouchPoint(e)
  const nx = nNowPoint.x - nStartPoint.value.x
  const ny = nNowPoint.y - nStartPoint.value.y
  nStartPoint.value = null
  if (token) {
    bindingX.unbind({
      token: token,
      eventType: 'pan',
    })
  }
  if (!props.auto) {
    return
  }
  const offset = props.pos === 'top' || props.pos === 'bottom' ? ny : nx
  const offsetAbs = Math.abs(offset)
  const nMaxSize = getTransformSize(props.pos, false)
  const nMoveSize = nMaxSize - standoutPx.value
  const nCloseLimit = props.closeRate * nMoveSize
  console.log('close in end', offsetAbs, offset, offsetAbs >= nCloseLimit)
  if (offsetAbs >= nCloseLimit) {
    if ((props.pos === 'top' || props.pos === 'left') && offset < 0) {
      toHackShow(false)
      return
    }
    if ((props.pos === 'bottom' || props.pos === 'right') && offset > 0) {
      toHackShow(false)
      return
    }
  }
  toHackShow(true)
  // #endif

  // #ifndef APP-NVUE
  if (!startPoint.value) return
  const nowPoint = getTouchPoint(e)
  // 需要减去standout的高度
  const maxSize = getTransformSize(props.pos, false)
  const moveSize = maxSize - standoutPx.value
  const openLimit = props.openRate * moveSize
  const closeLimit = props.closeRate * moveSize
  const offsetY = nowPoint.y - startPoint.value.y
  const offsetYAbs = Math.abs(offsetY)
  // console.log(offsetYAbs)
  if (offsetYAbs < 1) {
    // 初步判断：点击的事件不需要重新走一遍
    return
  }
  // MP/H5下先检测到touchend，然后才会是click。touch在一定时间内是click
  // 所以click以及touchend会存在冲突：点击standout弹出内容，有可能遮罩层是隐藏的.同时执行了touchend后面的内容以及click的show
  //
  const offsetX = nowPoint.x - startPoint.value.x
  const offsetXAbs = Math.abs(offsetX)
  if (!props.auto) {
    let lOff =
      lastOffset.value + (props.pos === 'bottom' || props.pos === 'top' ? offsetY : offsetX)
    if (props.pos === 'bottom' || props.pos === 'right') {
      if (lOff >= 0) {
        lOff = 0
      } else if (-1 * lOff >= moveSize) {
        lOff = -1 * moveSize
      }
    } else if (props.pos === 'left' || props.pos === 'top') {
      if (lOff <= 0) {
        lOff = 0
      } else if (lOff >= moveSize) {
        lOff = moveSize
      }
    }
    lastOffset.value = lOff
    emit('end', { offset: lastOffset.value, max: moveSize })
    return
  }
  if (!isShow.value) {
    // noWeexAni = ""
    if (props.pos === 'bottom' || props.pos === 'top') {
      if (offsetYAbs >= openLimit) {
        if (props.pos === 'top' && offsetY > 0) {
          toHackShow(true)
          return
        }
        if (props.pos === 'bottom' && offsetY < 0) {
          toHackShow(true)
          return
        }
      }
      toHackShow(false)
    } else if (props.pos === 'left' || props.pos === 'right') {
      if (offsetXAbs >= openLimit) {
        if (props.pos === 'left' && offsetX > 0) {
          toHackShow(true)
          return
        }
        if (props.pos === 'right' && offsetX < 0) {
          toHackShow(true)
          return
        }
      }
      toHackShow(false)
    }
  } else {
    // noWeexAni = ""
    if (props.pos === 'bottom' || props.pos === 'top') {
      if (offsetYAbs >= closeLimit) {
        if (props.pos === 'top' && offsetY < 0) {
          toHackShow(false)
          return
        }
        if (props.pos === 'bottom' && offsetY > 0) {
          toHackShow(false)
          return
        }
      }
      toHackShow(true)
    } else if (props.pos === 'left' || props.pos === 'right') {
      if (offsetXAbs >= closeLimit) {
        if (props.pos === 'left' && offsetX < 0) {
          toHackShow(false)
          return
        }
        if (props.pos === 'right' && offsetX > 0) {
          toHackShow(false)
          return
        }
      }
      toHackShow(true)
    }
  }
  // #endif
}
function onTouchCancel(e) {
  // 直接关闭
  toHackShow(false)
}
// #ifdef APP-NVUE
function openWithDrag() {
  console.log('open with bind')
  const maxSize = getTransformSize(props.pos, false)
  const moveSize = maxSize - standoutPx.value
  const openLimit = props.openRate * moveSize
  let standEl = npopo.value.ref
  if (!props.allowAll) {
    standEl = npopostand.value.ref
  }
  const popoEl = npopo.value.ref
  const overEl = props.hasOverlay ? npopooverlay.value.ref : null
  let exp = ''
  let overExp = ''
  let offsetExp = props.pos === 'top' || props.pos === 'bottom' ? 'y' : 'x'
  if (!props.auto) {
    offsetExp =
      props.pos === 'top' || props.pos === 'bottom'
        ? `(${lastOffset.value} + y)`
        : `(${lastOffset.value} + x)`
  }
  if (props.pos === 'bottom' || props.pos === 'right') {
    const newOffsetExp = `(${offsetExp} - ${standoutPx.value})`
    // exp = `(${offsetExp} >= 0) ? 0 : ((${offsetExp} > (-${maxSize})) ? (${offsetExp}+0) : (-${maxSize}))`
    exp = `(${offsetExp} >= 0) ? (-${standoutPx.value}) : ((${newOffsetExp} > (-${maxSize})) ? ${newOffsetExp} : (-${maxSize}))`
    overExp = `(${offsetExp} >= 0) ? 0 : ((${newOffsetExp} > (-${maxSize})) ? ((-1*${offsetExp}) * ${
      1 / moveSize
    }) : (1+0))`
  } else if (props.pos === 'top' || props.pos === 'left') {
    const newOffsetExp = `(${offsetExp} + ${standoutPx.value})`
    // exp = `(${offsetExp} > 0) ? ((${offsetExp} > ${maxSize}) ? ${maxSize} : (${offsetExp}+0)) : 0`
    exp = `(${offsetExp} > 0) ? ((${newOffsetExp} > ${maxSize}) ? ${maxSize} : ${newOffsetExp}) : (${standoutPx.value}+0)`
    overExp = `(${offsetExp} > 0) ? ((${newOffsetExp} > ${maxSize}) ? (1+0) : (${offsetExp} * ${
      1 / moveSize
    })) : 0`
  }
  const xprops = [
    {
      element: popoEl,
      property:
        props.pos === 'top' || props.pos === 'bottom'
          ? 'transform.translateY'
          : 'transform.translateX',
      expression: exp,
    },
  ]
  if (props.hasOverlay) {
    xprops.push({
      element: overEl,
      property: 'opacity',
      expression: overExp,
    })
    animation.transition(npopooverlay.value, {
      styles: { height: `${overlayHeight.value}px` },
      duration: 0,
      delay: 0,
    })
  }
  if (platform != 'ios') {
    setTimeout(() => {
      const result = bindingX.bind(
        {
          eventType: 'pan',
          anchor: standEl,
          props: xprops,
        },
        (res) => {
          if (res.state === 'end' && !isShow.value) {
            if (result) {
              bindingX.unbind({
                token: result.token,
                eventType: 'pan',
              })
            }
            if (!props.auto) {
              let lOff =
                lastOffset.value +
                (props.pos === 'top' || props.pos === 'bottom' ? res.deltaY : res.deltaX)
              if (props.pos === 'bottom' || props.pos === 'right') {
                if (lOff >= 0) {
                  lOff = 0
                } else if (-1 * lOff >= moveSize) {
                  lOff = -1 * moveSize
                }
              } else if (props.pos === 'top' || props.pos === 'left') {
                if (lOff <= 0) {
                  lOff = 0
                } else if (lOff >= moveSize) {
                  lOff = moveSize
                }
              }
              lastOffset.value = lOff
              emit('end', { offset: lastOffset.value, max: moveSize })
              return
            }
            const offset = props.pos === 'top' || props.pos === 'bottom' ? res.deltaY : res.deltaX
            const offsetAbs = Math.abs(offset)
            console.log('open', offsetAbs)
            if (offsetAbs >= openLimit) {
              if ((props.pos === 'top' || props.pos === 'left') && offset > 0) {
                toHackShow(true)
                return
              }
              if ((props.pos === 'bottom' || props.pos === 'right') && offset < 0) {
                toHackShow(true)
                return
              }
            }
            toHackShow(false)
          }
        }
      )
    }, props.delay)
  } else {
    const result = bindingX.bind(
      {
        eventType: 'pan',
        anchor: standEl,
        props: xprops,
      },
      (res) => {
        if (res.state === 'end' && !isShow.value) {
          if (result) {
            bindingX.unbind({
              token: result.token,
              eventType: 'pan',
            })
          }
          if (!props.auto) {
            let lOff =
              lastOffset.value +
              (props.pos === 'top' || props.pos === 'bottom' ? res.deltaY : res.deltaX)
            if (props.pos === 'bottom' || props.pos === 'right') {
              if (lOff >= 0) {
                lOff = 0
              } else if (-1 * lOff >= moveSize) {
                lOff = -1 * moveSize
              }
            } else if (props.pos === 'top' || props.pos === 'left') {
              if (lOff <= 0) {
                lOff = 0
              } else if (lOff >= moveSize) {
                lOff = moveSize
              }
            }
            lastOffset.value = lOff
            emit('end', { offset: lastOffset.value, max: moveSize })
            return
          }
          const offset = props.pos === 'top' || props.pos === 'bottom' ? res.deltaY : res.deltaX
          const offsetAbs = Math.abs(offset)
          console.log('ios open', offsetAbs)
          if (offsetAbs >= openLimit) {
            if ((props.pos === 'top' || props.pos === 'left') && offset > 0) {
              toHackShow(true)
              return
            }
            if ((props.pos === 'bottom' || props.pos === 'right') && offset < 0) {
              toHackShow(true)
              return
            }
          }
          toHackShow(false)
        }
      }
    )
  }
}
function closeWithDrag() {
  console.log('close with bind')
  const maxSize = getTransformSize(props.pos, false)
  const moveSize = maxSize - standoutPx.value
  const closeLimit = props.closeRate * moveSize
  let standEl = npopo.value.ref
  if (!props.allowAll) {
    standEl = npopostand.value.ref
  }
  const popoEl = npopo.value.ref
  const overEl = props.hasOverlay ? npopooverlay.value.ref : null
  let exp = ''
  let overExp = ''
  if (props.pos === 'bottom') {
    exp = `(y >= 0) ? ((y < ${maxSize - standoutPx.value}) ? (y - ${maxSize}) : (-${
      standoutPx.value
    })) : (-${maxSize})`
    overExp = `(y >= 0) ? ((y < ${maxSize - standoutPx.value}) ? ((${moveSize} - y) * ${
      1 / moveSize
    }) : 0) : (1+0)`
  } else if (props.pos === 'top') {
    exp = `(y >= 0) ? ${maxSize} : ((y > (-${maxSize}+${standoutPx.value})) ? (${maxSize} + y) : (${standoutPx.value}+0))`
    overExp = `(y >= 0) ? (1+0) : ((y > (-${maxSize}+${standoutPx.value})) ? ((${moveSize} + y) * ${
      1 / moveSize
    }) : 0)`
  } else if (props.pos === 'left') {
    exp = `(x >= 0) ? ${maxSize} : ((x > (-${maxSize}+${standoutPx.value})) ? (${maxSize} + x) : (${standoutPx.value}+0))`
    overExp = `(x >= 0) ? (1+0) : ((x > (-${maxSize}+${standoutPx.value})) ? ((${moveSize} + x) * ${
      1 / moveSize
    }) : 0)`
  } else if (props.pos === 'right') {
    exp = `(x >= 0) ? ((x < ${maxSize - standoutPx.value}) ? (x - ${maxSize}) : (-${
      standoutPx.value
    })) : (-${maxSize})`
    overExp = `(x >= 0) ? ((x < ${maxSize - standoutPx.value}) ? ((${moveSize}-x) * ${
      1 / moveSize
    }) : 0) : (1+0)`
  }
  const xprops = [
    {
      element: popoEl,
      property:
        props.pos === 'top' || props.pos === 'bottom'
          ? 'transform.translateY'
          : 'transform.translateX',
      expression: exp,
    },
  ]
  if (props.hasOverlay) {
    xprops.push({
      element: overEl,
      property: 'opacity',
      expression: overExp,
    })
  }
  if (platform != 'ios') {
    setTimeout(() => {
      const result = bindingX.bind(
        {
          eventType: 'pan',
          anchor: standEl,
          props: xprops,
        },
        (res) => {
          console.log('bind', res)
          nBindRes.value = { state: res.state, token: result && result.token }
          if (res.state === 'end' && isShow.value) {
            if (result) {
              bindingX.unbind({
                token: result.token,
                eventType: 'pan',
              })
            }
            if (!props.auto) {
              return
            }
            const offset = props.pos === 'top' || props.pos === 'bottom' ? res.deltaY : res.deltaX
            const offsetAbs = Math.abs(offset)
            console.log('close', offsetAbs)
            if (offsetAbs >= closeLimit) {
              if ((props.pos === 'top' || props.pos === 'left') && offset < 0) {
                toHackShow(false)
                return
              }
              if ((props.pos === 'bottom' || props.pos === 'right') && offset > 0) {
                toHackShow(false)
                return
              }
            }
            toHackShow(true)
          }
        }
      )
      console.log('close bind result', result)
    }, props.delay)
  } else {
    const result = bindingX.bind(
      {
        eventType: 'pan',
        anchor: standEl,
        props: xprops,
      },
      (res) => {
        if (res.state === 'end' && isShow.value) {
          if (result) {
            bindingX.unbind({
              token: result.token,
              eventType: 'pan',
            })
          }
          if (!props.auto) {
            return
          }
          const offset = props.pos === 'top' || props.pos === 'bottom' ? res.deltaY : res.deltaX
          const offsetAbs = Math.abs(offset)
          console.log('ios close', offsetAbs)
          if (offsetAbs >= closeLimit) {
            if ((props.pos === 'top' || props.pos === 'left') && offset < 0) {
              toHackShow(false)
              return
            }
            if ((props.pos === 'bottom' || props.pos === 'right') && offset > 0) {
              toHackShow(false)
              return
            }
          }
          toHackShow(true)
        }
      }
    )
  }
}
// #endif
function toHackShow(bool) {
  appearPopup(bool)
}
function overlayClose(e) {
  e.stopPropagation && e.stopPropagation()
  isShow.value && emit('overlayClicked', {})
}
function appearPopup(bool, duration = props.duration) {
  // #ifdef APP-NVUE
  weexAppearPopup(bool, duration)
  // #endif
  // #ifndef APP-NVUE
  noWeexAppearPopup(bool, duration)
  // #endif
}
// #ifdef APP-NVUE
function weexAppearPopup(bool, duration = props.duration) {
  isShow.value = bool
  const popupEl = npopo.value
  if (!popupEl) {
    return
  }
  const styles = { transform: getTransform(props.pos, !bool) }
  animation.transition(
    popupEl,
    {
      styles: styles,
      duration,
      delay: 0,
      ...props.animation,
    },
    () => {
      bool ? emit('open') : emit('close')
    }
  )
  // overlay
  if (!props.hasOverlay) return
  const popupOverEl = npopooverlay.value
  if (!popupOverEl) return
  bool &&
    animation.transition(popupOverEl, {
      styles: { height: `${overlayHeight.value}px` },
      duration: 0,
      delay: 0,
    })
  animation.transition(
    popupOverEl,
    {
      styles: { opacity: bool ? 1 : 0 },
      duration: props.overlay.duration,
      delay: 0,
      timingFunction: bool ? props.overlay.timingFunction[0] : props.overlay.timingFunction[1],
    },
    () => {
      !bool &&
        animation.transition(popupOverEl, { styles: { height: '0px' }, duration: 0, delay: 0 })
    }
  )
}
// #endif
// #ifndef APP-NVUE
function noWeexAppearPopup(bool, duration = props.duration) {
  isShow.value = bool
  let _style = 'transition-duration:' + duration + 'ms;'
  _style += 'transition-timing-function:' + props.animation.timingFunction + ';'
  _style += 'transition-property:transform;'
  _style += 'transform:' + getTransform(props.pos, !bool) + ';'
  noWeexAni.value = _style

  setTimeout(() => {
    bool ? emit('open') : emit('close')
  }, duration)
  // overlay
  let _oStyle = 'transition-duration:' + props.overlay.duration + 'ms;'
  bool && (_oStyle += `height:${overlayHeight.value}px;`)
  _oStyle +=
    'transition-timing-function:' +
    (bool ? props.overlay.timingFunction[0] : props.overlay.timingFunction[1]) +
    ';'
  _oStyle += 'transition-property:opacity;'
  _oStyle += 'opacity:' + (bool ? 1 : 0) + ';'
  overlayNoWeexAni.value = _oStyle
  setTimeout(() => {
    !bool && (overlayNoWeexAni.value = '')
  }, props.overlay.duration)
}
// #endif
function getTransformSize(pos, toClose) {
  let _size = standoutPx.value
  let _transform = ''
  switch (pos) {
    case 'top':
      if (!toClose) {
        _size = heightPx.value + topPx.value + (topOffsetPx.value >= 0 ? topOffsetPx.value : 0)
      }
      break
    case 'bottom':
      if (!toClose) {
        _size =
          heightPx.value + bottomPx.value + (bottomOffsetPx.value >= 0 ? bottomOffsetPx.value : 0)
      }
      break
    case 'left':
      if (!toClose) {
        _size = widthPx.value + leftPx.value + (leftOffsetPx.value >= 0 ? leftOffsetPx.value : 0)
      }
      break
    case 'right':
      if (!toClose) {
        _size = widthPx.value + rightPx.value + (rightOffsetPx.value >= 0 ? rightOffsetPx.value : 0)
      }
      break
  }
  return _size
}
function getTransform(pos, toClose) {
  let _size = getTransformSize(pos, toClose)
  let _transform = ''
  switch (pos) {
    case 'top':
      _transform = `translateY(${_size}px)`
      break
    case 'bottom':
      _transform = `translateY(-${_size}px)`
      break
    case 'left':
      _transform = `translateX(${_size}px)`
      break
    case 'right':
      _transform = `translateX(-${_size}px)`
      break
  }
  return _transform
}
function toPrevent(e) {
  e.stopPropagation && e.stopPropagation()
}
// #ifdef APP-NVUE
function iosHackHandler() {
  platform = getPlatform()
  if (platform != 'ios') {
    return
  }
  // 1. 修复iOS下手势跟随第一次不跟的问题；
  setTimeout(() => {
    iosHack = bindingX.bind({
      eventType: 'pan',
      anchor: props.allowAll ? npopo.value.ref : npopostand.value.ref,
      props: [
        {
          element: npopo.value.ref,
          property: 'transform.translateY',
          expression: 'y+0',
        },
      ],
    })
  }, 10)
}
// #endif

// run when setup
// #ifdef APP-NVUE
iosHackHandler()
// #endif
onMounted(() => {
  if (props.initDelay >= 0) {
    setTimeout(() => {
      initShow()
    }, props.initDelay)
    return
  }
  initShow()
})
onUnmounted(() => {
  // #ifdef APP-NVUE
  if (iosHack) {
    bindingX.unbind({
      token: iosHack.token,
      eventType: 'pan',
    })
  }
  // #endif
})
</script>

<style lang="scss" scoped>
.n-popo {
  position: fixed;
  width: 750rpx;
  /* #ifndef APP-NVUE */
  z-index: 681;
  /* #endif */

  &-over {
    position: fixed;
    opacity: 0;
    height: 0px;
    /* #ifndef APP-NVUE */
    z-index: 680;
    /* #endif */
  }
}
</style>
