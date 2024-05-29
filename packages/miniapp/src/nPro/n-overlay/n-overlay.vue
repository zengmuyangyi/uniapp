<template>
  <view
    :class="['n-overlay', 'n-bg-' + bgType]"
    v-if="helpShow"
    ref="noverlay"
    @touchmove.stop="toPrevent"
    @click.stop="overlayClose"
    :style="overlayStyle + noWeexTransition"
  >
    <slot></slot>
  </view>
</template>

<script setup>
/**
 * n-overlay
 * @description 遮罩层
 * @property {Boolean} show = [true|false] 是否打开
 * @property {Boolean} hasAnimation = [true|false] 是否有动画
 * @property {Number} duration 动画周期
 * @property {Array} timingFunction 动画函数
 * @property {String} bgType = [nav|primary|success|warning|error|light|dark|inverse|custom|link|none|page|hover|mask|mask-dark|border|border-light|border-dark|gradient] 背景主题
 * @property {String} bg 自定义背景色
 * @property {Boolean} canAutoClose = [true|false] 点击之后是否自动关闭overlay
 * @property {String} left 与屏幕左侧距离
 * @property {String} top 与屏幕顶部距离
 * @property {String} right 与屏幕右侧距离
 * @property {String} bottom 与屏幕底部距离
 * @property {String} boxStyle 外层样式。比如设置z-index
 * @event {Function} overlayClicked 点击事件
 * @event {Function} overlayClicking 点击中事件
 */
import { ref, watch, computed } from 'vue'
import { makeProps } from '../utils/props.js'
// #ifdef APP-NVUE
const animation = uni.requireNativePlugin('animation')
// #endif
import { getPx, getHeight } from '../utils/system.js'

const props = defineProps(
  makeProps([
    ['show', false],
    ['hasAnimation', true],
    ['duration', 400],
    ['timingFunction', ['ease-in', 'ease-out']],
    ['bgType', 'mask'],
    'bg',
    ['canAutoClose', true],
    ['left', '0'],
    ['right', '0'],
    ['top', '0'],
    ['bottom', '0'],
    'boxStyle',
  ])
)
const emit = defineEmits(['overlayClicked', 'overlayClicking'])
defineExpose({
  showOverlay,
  hideOverlay,
})

const helpShow = ref(false)
const noWeexTransition = ref('')
const autoClosed = ref(false)
const noverlay = ref(null)

const overlayStyle = computed(() => {
  let _style = 'opacity:' + (props.hasAnimation ? 0 : 1) + ';'
  if (props.bg) {
    _style += `background-color:${props.bg};`
  }
  _style += `left:${leftPx.value}px;top:${topPx.value}px;right:${rightPx.value}px;bottom:${bottomPx.value}px;`
  return _style + props.boxStyle
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
    toHackShow(props.hasAnimation, newV)
  }
)

// ref api to open
function showOverlay() {
  helpShow.value = true
}
// ref api to hide
function hideOverlay() {
  helpShow.value = false
}
// show prop to control the switch state
function toHackShow(hasAni, toShow) {
  if (!hasAni) {
    // 没有动画效果，直接开关就好
    toShow && (autoClosed.value = true)
    helpShow.value = toShow
    return
  }
  if (toShow) {
    autoClosed.value = false
    helpShow.value = true
    // 为了显示动画，v-if控制的组件，延时执行动画
    setTimeout(() => {
      appearOverlay(true)
    }, 40)
  } else {
    // 关闭动画，直接执行，不过需要执行动画完之后再关闭
    appearOverlay(false)
  }
}
// 点击关闭，执行完关闭动画之后发送关闭事件通知
function overlayClose(e) {
  props.canAutoClose ? appearOverlay(false, props.duration, true) : emit('overlayClicked', {})
  e.stopPropagation && e.stopPropagation()
}
function appearOverlay(bool, duration = props.duration, fromOverlay = false) {
  // #ifdef APP-NVUE
  weexAppearOverlay(bool, duration, fromOverlay)
  // #endif
  // #ifndef APP-NVUE
  noWeexAppearOverlay(bool, duration, fromOverlay)
  // #endif
}
// #ifndef APP-NVUE
// fromOverlay means if clicked the overlay to close
function noWeexAppearOverlay(bool, duration = props.duration, fromOverlay = false) {
  const { hasAnimation, timingFunction, canAutoClose } = props
  // 如果是手动。这里是有动画的情况，没有动画的已经被拦截执行
  if (!fromOverlay) {
    if (!bool && autoClosed.value) {
      // 已经关闭了overlay，不需要再延迟执行
      helpShow.value = false
    } else {
      let _style = 'opacity:' + (bool ? 1 : 0) + ';'
      const ani = timingFunction[bool ? 0 : 1]
      _style += 'transition: all ' + duration + 'ms' + ' ' + ani + ';'
      noWeexTransition.value = _style
      // 动画执行完毕之后再确认关闭
      if (!bool) {
        setTimeout(() => {
          helpShow.value = false
        }, duration)
      }
    }
  } else {
    // 点击了overlay. 而且全是允许关闭overlay的情况，不允许的已经在overlayClose中拦截
    emit('overlayClicking', {})
    if (hasAnimation) {
      let _style = 'opacity:0;'
      const ani = timingFunction[bool ? 0 : 1]
      _style += 'transition: all ' + duration + 'ms' + ' ' + ani + ';'
      noWeexTransition.value = _style
      autoClosed.value = true
      // 动画执行完毕之后再通知
      setTimeout(() => {
        emit('overlayClicked', {})
      }, duration)
    } else {
      // 虽然是要关闭，但是这种情况已经失去了意义，我们不再关闭，用户可以手动关闭
      emit('overlayClicked', {})
    }
  }
}
// #endif
// #ifdef APP-NVUE
// fromOverlay means if clicked the overlay to close
function weexAppearOverlay(bool, duration = props.duration, fromOverlay = false) {
  const { hasAnimation, timingFunction, canAutoClose } = props
  if (fromOverlay) {
    // overlay clicked, and can auto close, and is to close
    emit('overlayClicking', {})
    if (hasAnimation) {
      const overlayEl = noverlay.value
      animation.transition(
        overlayEl,
        {
          styles: {
            opacity: bool ? 1 : 0,
          },
          duration,
          timingFunction: timingFunction[bool ? 0 : 1],
          delay: 0,
        },
        () => {
          emit('overlayClicked', {})
        }
      )
      autoClosed.value = true
    } else {
      // 这里不关闭，虽然要求是关闭
      emit('overlayClicked', {})
    }
  } else {
    if (!bool && autoClosed.value) {
      // 已经关闭了overlay，不需要再延迟执行
      helpShow.value = false
    } else {
      const overlayEl = noverlay.value
      animation.transition(
        overlayEl,
        {
          styles: {
            opacity: bool ? 1 : 0,
          },
          duration,
          timingFunction: timingFunction[bool ? 0 : 1],
          delay: 0,
        },
        () => {
          if (!bool) {
            helpShow.value = false
          }
        }
      )
    }
  }
}
// #endif
function toPrevent(e) {
  e && e.stopPropagation && e.stopPropagation()
}
</script>

<style lang="scss" scoped>
.n-overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  /* #ifndef APP-NVUE */
  z-index: 686;
  /* #endif */
}
</style>
