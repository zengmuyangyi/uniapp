<template>
  <view>
    <view
      v-if="hasOverlay"
      ref="npopooverlay"
      :class="['n-popo-over', 'n-bg-' + overlay.bgType]"
      @touchmove.stop="toPrevent"
      @tap.stop="overlayClose"
      :style="mrOverlayStyle + overlayNoWeexAni"
    >
      <slot name="overlay"></slot>
    </view>
    <view
      ref="npopo"
      @touchmove.stop="toPrevent"
      @tap.stop="toPrevent"
      :class="['n-popo', 'n-flex-column', 'n-bg-' + bgType]"
      :style="boxStyle + mrPopStyle + noWeexAni"
    >
      <slot></slot>
    </view>
  </view>
</template>

<script setup>
/*
 * n-popup-always
 * @description 高性能只渲染一次的popup
 * @property {Boolean} show = [true|false] 是否打开/展示
 * @property {String} pos 定位位置
 * @property {String} bgType = [nav|primary|success|warning|error|light|dark|inverse|custom|link|none|page|hover|mask|mask-dark|border|border-light|border-dark|gradient] 背景主题
 * @property {Number} duration 动画周期
 * @property {Object} overlay 遮罩层设置
 * @property {Object} ani 动画函数animation
 * @property {String} baseHeight 基准高度
 * @property {String} baseWidth 基准宽度
 * @property {String} width 自定义宽度
 * @property {String} height 自定义高度
 * @property {String} standout 提前显示在可见屏幕内的高度
 * @property {Boolean} hasOverlay = [true|false] 是否具备遮罩层
 * @property {String} leftOffset 内容与屏幕左侧的距离
 * @property {String} rightOffset 内容与屏幕右侧的距离
 * @property {String} bottomOffset 内容与屏幕底部的距离
 * @property {String} topOffset 内容与屏幕顶部的距离
 * @property {String} left 遮罩与屏幕左侧的距离
 * @property {String} top 遮罩与屏幕顶部的距离
 * @property {String} right 遮罩与屏幕右侧的距离
 * @property {String} bottom 遮罩与屏幕底部的距离
 * @property {Boolean} initWithAni = [true|false] 是否具备初始动画
 * @property {Number} initDelay 初始动画的延时
 * @property {Number} initDuration 初始动画周期
 * @property {String} boxStyle 内容外层样式
 * @event {Function} overlayClicked 遮罩层点击事件
 */
import { ref, watch, computed, onMounted } from 'vue'
// #ifdef APP-NVUE
const animation = uni.requireNativePlugin('animation')
// #endif
import { makeProps } from '../utils/props.js'

import { getHeight, getPx } from '../utils/system.js'

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
    ['standout', '0'],
    ['leftOffset', '-1'],
    ['rightOffset', '-1'],
    ['bottomOffset', '-1'],
    ['topOffset', '-1'],
    ['left', '0'],
    ['right', '0'],
    ['top', '0'],
    ['bottom', '0'],
    ['initWithAni', true],
    ['initDelay', 200],
    ['initDuration', 300],
    'boxStyle',
  ])
)
const emit = defineEmits(['overlayClicked'])

const overlayShow = ref(false)
const helpShow = ref(false)
const noWeexAni = ref('')
const overlayNoWeexAni = ref('')
const isShow = ref(false)
const npopo = ref(null)
const npopooverlay = ref(null)

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
  const pos = props.pos
  // center/top-center/left-center/bottom-center/right-center/scale-center
  if (pos.endsWith('center')) {
    if (pos === 'center' || pos === 'scale-center') {
      // opacity
      style['left'] = (screenWidth.value - widthPx.value) * 0.5 + 'px'
      if (topOffsetPx.value < 0 && bottomOffsetPx.value < 0) {
        style['top'] = (screenHeight.value - heightPx.value) * 0.5 + 'px'
      } else {
        if (topOffsetPx.value >= 0) {
          style['top'] = (screenHeight.value - heightPx.value) * 0.5 + topOffsetPx.value + 'px'
        } else if (bottomOffsetPx.value >= 0) {
          style['top'] = (screenHeight.value - heightPx.value) * 0.5 - bottomOffsetPx.value + 'px'
        }
      }
      if (pos === 'center') {
        style['opacity'] = 0
        style['transform'] = 'scale(0,0)'
      }
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
const overlayHeight = computed(() => {
  return screenHeight.value - topPx.value - bottomPx.value
})
const mrOverlayStyle = computed(() => {
  return `left:${leftPx.value}px;top:${topPx.value}px;right:${rightPx.value}px;`
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
const standoutPx = computed(() => {
  return getHeight(props.standout)
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

onMounted(() => {
  if (standoutPx.value <= 0) return
  if (props.initDelay >= 0) {
    setTimeout(() => {
      initShow()
    }, props.initDelay)
    return
  }
  initShow()
})

// 组件创建后增加显示动画效果
function initShow() {
  let dur = 0
  if (props.initWithAni) {
    dur = props.initDuration || 0
  }
  // #ifndef APP-NVUE
  noWeexAni.value = `transition-property: transform;transition-duration:${dur}ms;transition-timing-function: ${
    props.ani.timingFunction
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
    timingFunction: props.ani.timingFunction,
  })
  // #endif
}
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
  let styles = {}
  if (props.pos === 'center') {
    styles = { opacity: bool ? 1 : 0 }
    bool &&
      animation.transition(popupEl, { styles: { transform: 'scale(1,1)' }, duration: 0, delay: 0 })
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
      !bool &&
        props.pos === 'center' &&
        animation.transition(popupEl, {
          styles: { transform: 'scale(0,0)' },
          duration: 0,
          delay: 0,
        })
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
  _style += 'transition-timing-function:' + props.ani.timingFunction + ';'
  if (props.pos === 'center') {
    _style += bool ? 'transform: scale(1,1);' : ''
    _style += 'transition-property:opacity;'
    _style += 'opacity:' + (bool ? 1 : 0) + ';'
  } else {
    _style += 'transition-property:transform;'
    _style += 'transform:' + getTransform(props.pos, !bool) + ';'
  }
  noWeexAni.value = _style
  /*
		setTimeout(()=>{
			!bool && (noWeexAni='')
		}, duration)
		*/
  // overlay
  if (!props.hasOverlay) return
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
function getTransform(pos, toClose) {
  let _size = standoutPx.value
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
.n-popo {
  position: fixed;
  width: 750rpx;
  /* #ifndef APP-NVUE */
  z-index: 671;
  /* #endif */

  &-over {
    position: fixed;
    opacity: 0;
    height: 0px;
    /* #ifndef APP-NVUE */
    z-index: 670;
    /* #endif */
  }
}
</style>
