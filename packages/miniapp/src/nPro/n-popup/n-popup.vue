<template>
  <view>
    <view>
      <n-overlay
        :show="hasOverlay && overlayShow"
        :bgType="overlay.bgType"
        :bg="overlay.bg"
        :duration="overlay.duration"
        :hasAnimation="overlay.hasAnimation"
        :timingFunction="overlay.timingFunction"
        :canAutoClose="false"
        :left="left"
        :top="top"
        :right="right"
        :bottom="bottom"
        :boxStyle="overlayStyle"
        @overlayClicked="overlayClicked"
      ></n-overlay>
    </view>
    <view
      ref="npopup"
      v-if="helpShow"
      @touchmove.stop="toPrevent"
      @click.stop="toPrevent"
      :class="['n-popup', 'n-flex-column', 'n-bg-' + bgType]"
      :style="boxStyle + mrPopStyle + noWeexAni"
    >
      <slot></slot>
    </view>
  </view>
</template>

<script setup>
/**
 * n-popup
 * @description 受v-if控制，重新渲染的popup
 * @property {Boolean} show = [true|false] 是否显示/打开
 * @property {String} pos 定位位置
 * @property {String} bgType = [nav|primary|success|warning|error|light|dark|inverse|custom|link|none|page|hover|mask|mask-dark|border|border-light|border-dark|gradient] 背景主题
 * @property {Number} duration 动画周期
 * @property {Boolean} hasOverlay = [true|false] 是否有overlay
 * @property {Object} overlay 遮罩层设置
 * @property {Object} ani 动画函数animation
 * @property {String} baseWidth 基准宽度
 * @property {String} baseHeight 基准高度
 * @property {String} width 自定义宽度
 * @property {String} height 自定义高度
 * @property {String} leftOffset 内容与屏幕左侧的偏移量
 * @property {String} rightOffset 内容与屏幕右侧的偏移量
 * @property {String} bottomOffset 内容与屏幕底部的偏移量
 * @property {String} topOffset 内容与屏幕顶部的偏移量
 * @property {String} left 遮罩与屏幕左侧的偏移量
 * @property {String} top 遮罩与屏幕顶部的偏移量
 * @property {String} right 遮罩与屏幕右侧的偏移量
 * @property {String} bottom 遮罩与屏幕底部的偏移量
 * @property {Number} delay 确保存在动画 需要加延时
 * @property {String} boxStyle 内容外层样式
 * @property {String} overlayStyle overlay的外层样式
 * @event {Function} overlayClicked 遮罩层点击事件
 */
import { ref, watch, computed, nextTick } from 'vue'
// #ifdef APP-NVUE
const animation = uni.requireNativePlugin('animation')
// #endif

import { getHeight, getPx } from '../utils/system.js'
import { makeProps } from '../utils/props.js'

const props = defineProps(
  makeProps([
    ['show', false],
    ['pos', 'bottom'],
    'bgType',
    ['duration', 300],
    ['hasOverlay', true],
    [
      'overlay',
      {
        hasAnimation: true,
        timingFunction: ['ease-in', 'ease-out'],
        duration: 300,
        bg: '',
        bgType: 'mask',
      },
    ],
    ['ani', { timingFunction: 'ease-out' }],
    ['baseWidth', '750rpx'],
    ['baseHeight', 'window'],
    ['width', '750rpx'],
    ['height', '0'],
    ['leftOffset', '-1'],
    ['rightOffset', '-1'],
    ['bottomOffset', '-1'],
    ['topOffset', '-1'],
    ['left', '0'],
    ['right', '0'],
    ['top', '0'],
    ['bottom', '0'],
    ['delay', 10],
    'boxStyle',
    'overlayStyle',
  ])
)
const emit = defineEmits(['overlayClicked'])

const overlayShow = ref(false)
const helpShow = ref(false)
const noWeexAni = ref('')
const isShow = ref(false)
const npopup = ref(null)

const screenHeight = computed(() => {
  return getHeight(props.baseHeight)
})
const screenWidth = computed(() => {
  return getHeight(props.baseWidth)
})
const mrPopStyle = computed(() => {
  let style = {
    width: `${widthPx.value}px`,
    height: `${heightPx.value}px`,
  }
  // center/top-center/left-center/bottom-center/right-center/scale-center
  const pos = props.pos
  if (pos.endsWith('center')) {
    if (pos === 'center' || pos === 'scale-center') {
      if (topOffsetPx.value < 0 && bottomOffsetPx.value < 0) {
        style['top'] = (screenHeight.value - heightPx.value) * 0.5 + 'px'
      } else {
        if (topOffsetPx.value >= 0) {
          style['top'] = (screenHeight.value - heightPx.value) * 0.5 + topOffsetPx.value + 'px'
        } else if (bottomOffsetPx.value >= 0) {
          style['top'] = (screenHeight.value - heightPx.value) * 0.5 - bottomOffsetPx.value + 'px'
        }
      }
      if (leftOffsetPx.value < 0 && rightOffsetPx.value < 0) {
        style['left'] = (screenWidth.value - widthPx.value) * 0.5 + 'px'
      } else {
        if (leftOffsetPx.value >= 0) {
          style['left'] = (screenWidth.value - widthPx.value) * 0.5 + leftOffsetPx.value + 'px'
        } else if (rightOffsetPx.value >= 0) {
          style['left'] = (screenWidth.value - widthPx.value) * 0.5 - rightOffsetPx.value + 'px'
        }
      }
      pos === 'center' && (style['opacity'] = 0)
      pos === 'scale-center' && (style['transform'] = 'scale(0,0)')
    } else if (pos === 'left-center' || pos === 'right-center') {
      if (topOffsetPx.value < 0 && bottomOffsetPx.value < 0) {
        style['top'] = (screenHeight.value - heightPx.value) * 0.5 + 'px'
      } else {
        if (topOffsetPx.value >= 0) {
          style['top'] = (screenHeight.value - heightPx.value) * 0.5 + topOffsetPx.value + 'px'
        } else if (bottomOffsetPx.value >= 0) {
          style['top'] = (screenHeight.value - heightPx.value) * 0.5 - bottomOffsetPx.value + 'px'
        }
      }
      pos === 'left-center' && (style['left'] = -widthPx.value + 'px')
      pos === 'right-center' && (style['right'] = -widthPx.value + 'px')
    } else if (pos === 'top-center' || pos === 'bottom-center') {
      style['left'] = (screenWidth.value - widthPx.value) * 0.5 + 'px'
      pos === 'top-center' && (style['top'] = -heightPx.value + 'px')
      pos === 'bottom-center' && (style['bottom'] = -heightPx.value + 'px')
    }
  }
  // top: left/right-width-height-top  bottom: left/right-width-height-bottom
  if (pos === 'top' || pos === 'bottom') {
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
    pos === 'top' && (style['top'] = -heightPx.value + 'px')
    pos === 'bottom' && (style['bottom'] = -heightPx.value + 'px')
  }
  if (pos === 'left' || pos === 'right') {
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
    pos === 'left' && (style['left'] = -widthPx.value + 'px')
    pos === 'right' && (style['right'] = -widthPx.value + 'px')
  }
  let _style = ''
  for (const i in style) {
    _style += i + ':' + style[i] + ';'
  }
  return _style
})
const heightPx = computed(() => {
  if (props.height * 1 > 0 && props.height * 1 <= 1) {
    return screenHeight.value * (props.height * 1)
  }
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
const leftOffsetPx = computed(() => {
  return props.leftOffset === '-1' ? -1 : getPx(props.leftOffset)
})
const topOffsetPx = computed(() => {
  return props.topOffset === '-1' ? -1 : getHeight(props.topOffset)
})
const rightOffsetPx = computed(() => {
  return props.rightOffset === '-1' ? -1 : getPx(props.rightOffset)
})
const bottomOffsetPx = computed(() => {
  return props.bottomOffset === '-1' ? -1 : getHeight(props.bottomOffset)
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

watch(
  () => props.show,
  (newV) => {
    toHackShow(newV)
  }
)

function toHackShow(bool) {
  if (bool) {
    // 先渲染元素
    overlayShow.value = true
    // TODO:
    // 调整一下逻辑，利用 nextTick 之类的
    // 必须确保overlay先于popup-content渲染，将popup-content移入下一个loop
    // app端不能同一个loop同步执行，否则overlay始终在最上层
    // 为了能够获取到元素，且实现动画
    nextTick(() => {
      helpShow.value = true
      nextTick(() => {
        setTimeout(() => {
          appearPopup(bool)
        }, props.delay)
      })
    })
  } else {
    // 关闭动画需要执行动画之后再关闭v-if
    overlayShow.value = false
    appearPopup(bool)
  }
}
// since we can not auto close the overlay in popup, the event is just overlayClicked.
// and we do not close the popup auto, so we could use it as a modal
function overlayClicked() {
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
function weexAppearPopup(bool, duration = props.duration) {
  isShow.value = bool
  const popupEl = npopup.value
  if (!popupEl) {
    return
  }
  let styles = {}
  if (props.pos === 'center') {
    styles = { opacity: bool ? 1 : 0 }
  } else {
    styles = { transform: getTransform(props.pos, !bool) }
  }
  animation.transition(
    popupEl,
    {
      styles: styles,
      duration,
      delay: 0,
      ...props.ani,
    },
    () => {
      if (!bool) {
        helpShow.value = false
      }
    }
  )
}
function noWeexAppearPopup(bool, duration = props.duration) {
  isShow.value = bool
  let _style = 'transition-duration:' + duration + 'ms;'
  _style += 'transition-timing-function:' + props.ani.timingFunction + ';'
  if (props.pos === 'center') {
    _style += 'transition-property:opacity;'
    _style += 'opacity:' + (bool ? 1 : 0) + ';'
  } else {
    _style += 'transition-property:transform;'
    _style += 'transform:' + getTransform(props.pos, !bool) + ';'
  }
  noWeexAni.value = _style
  setTimeout(() => {
    if (!bool) {
      helpShow.value = false
    }
  }, duration)
}
function getTransform(pos, toClose) {
  let _size = 0
  let _transform = ''
  switch (pos) {
    case 'top':
      if (!toClose) {
        _size = heightPx.value + topPx.value + (topOffsetPx.value >= 0 ? topOffsetPx.value : 0)
      }
      _transform = `translateY(${_size}px)`
      break
    case 'bottom':
      if (!toClose) {
        _size =
          heightPx.value + bottomPx.value + (bottomOffsetPx.value >= 0 ? bottomOffsetPx.value : 0)
      }
      _transform = `translateY(-${_size}px)`
      break
    case 'left':
      if (!toClose) {
        _size = widthPx.value + leftPx.value + (leftOffsetPx.value >= 0 ? leftOffsetPx.value : 0)
      }
      _transform = `translateX(${_size}px)`
      break
    case 'right':
      if (!toClose) {
        _size = widthPx.value + rightPx.value + (rightOffsetPx.value >= 0 ? rightOffsetPx.value : 0)
      }
      _transform = `translateX(-${_size}px)`
      break
    case 'scale-center':
      _transform = toClose ? 'scale(0,0)' : 'scale(1,1)'
      break
    case 'left-center':
      if (!toClose) {
        _size = (screenWidth.value + widthPx.value) * 0.5
      }
      _transform = `translateX(${_size}px)`
      break
    case 'right-center':
      if (!toClose) {
        _size = (screenWidth.value + widthPx.value) * 0.5
      }
      _transform = `translateX(-${_size}px)`
      break
    case 'top-center':
      if (!toClose) {
        if (topOffsetPx.value < 0 && bottomOffsetPx.value < 0) {
          _size = (screenHeight.value + heightPx.value) * 0.5
        } else {
          if (topOffsetPx.value >= 0) {
            _size = (screenHeight.value + heightPx.value) * 0.5 + topOffsetPx.value
          } else if (bottomOffsetPx.value >= 0) {
            _size = (screenHeight.value + heightPx.value) * 0.5 - bottomOffsetPx.value
          }
        }
      }
      _transform = `translateY(${_size}px)`
      break
    case 'bottom-center':
      if (!toClose) {
        if (topOffsetPx.value < 0 && bottomOffsetPx.value < 0) {
          _size = (screenHeight.value + heightPx.value) * 0.5
        } else {
          if (topOffsetPx.value >= 0) {
            _size = (screenHeight.value + heightPx.value) * 0.5 - topOffsetPx.value
          } else if (bottomOffsetPx.value >= 0) {
            _size = (screenHeight.value + heightPx.value) * 0.5 + bottomOffsetPx.value
          }
        }
      }
      _transform = `translateY(-${_size}px)`
      break
  }
  return _transform
}
function toPrevent(e) {
  e.stopPropagation && e.stopPropagation()
}
</script>

<style lang="scss" scoped>
.n-popup {
  position: fixed;
  width: 750rpx;
  /* #ifndef APP-NVUE */
  z-index: 687;
  /* #endif */
}
</style>
