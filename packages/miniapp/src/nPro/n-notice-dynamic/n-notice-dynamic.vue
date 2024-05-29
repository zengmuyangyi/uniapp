<template>
  <view
    ref="nnotice"
    v-if="showing"
    :hack="hackShow"
    :class="['n-notice', 'n-flex-row', 'n-align-center', 'n-justify-center', 'n-bg-' + mrBgType]"
    :style="mrBoxStyle + noWeexAnimation"
  >
    <slot>
      <n-icon
        :name="mrIcon"
        :iconStyle="iconStyle"
        :type="iconType"
        :size="iconSize"
        :boxStyle="iconBoxStyle"
      ></n-icon>
      <text :class="['n-size-' + textSize, 'n-color-' + textType]" :style="mrTextStyle">{{
        text
      }}</text>
    </slot>
  </view>
</template>

<script setup>
/**
 * n-notice-dynamic
 * @description 动态提示
 * @event {Function} close 关闭事件
 */
import { ref, computed } from 'vue'
// #ifdef APP-NVUE
const animation = uni.requireNativePlugin('animation')
// #endif
import { getHeight, getScreenHeight } from '../utils/system.js'

defineExpose({
  show,
  hide,
})

let hideTimer = null

const showing = ref(false)
const pos = ref('top') // top/bottom/top-center/bottom-center
const offset = ref('status-nav') // status/nav/status-nav/status-nav-xxx/number/rpx/px/x-xxx
const type = ref('primary')
const bgType = ref('primary')
const bg = ref('')
const text = ref('欢迎使用nPro')
const textType = ref('inverse')
const textSize = ref('base')
const textStyle = ref('')
const icon = ref('')
const iconType = ref('inverse')
const iconSize = ref('ll')
const iconBoxStyle = ref('')
const iconStyle = ref('')
const height = ref('44px')
const boxStyle = ref('')
const duration = ref(2400)
const animationType = ref('ease-out')
const space = ref('12rpx')
const noWeexAnimation = ref('')
const nnotice = ref(null)

const emit = defineEmits(['close'])

const screenHeight = computed(() => {
  return getScreenHeight()
})
const offsetPx = computed(() => {
  return getHeight(offset.value)
})
const heightPx = computed(() => {
  return getHeight(height.value)
})
const hackShow = computed(() => {
  handleHackShow()
  return showing.value
})
const mrBgType = computed(() => {
  return bgType.value ? bgType.value : type.value
})
const mrIcon = computed(() => {
  if (icon.value) return icon.value
  return 'toast-' + type.value
})
const mrTextStyle = computed(() => {
  return `margin-left:${space.value};` + textStyle.value
})
const mrBoxStyle = computed(() => {
  let style = ''
  style += `height:${heightPx.value}px;`
  if (pos.value === 'top') {
    style += `top:${-heightPx.value}px;`
  } else if (pos.value === 'bottom') {
    style += `bottom:${-heightPx.value}px;`
  } else if (pos.value === 'center' || pos.value === 'top-center' || pos.value === 'center-top') {
    style += `top:${-heightPx}px;`
  } else if (pos.value === 'bottom-center' || pos.value === 'center-bottom') {
    style += `bottom:${-heightPx.value}px;`
  } else {
    style += `top:${-heightPx.value}px;`
  }
  if (bg.value) {
    style += `background-color:${bg.value};`
  }
  return style + boxStyle.value
})

function show(info) {
  pos.value = info.pos || 'top' // top/bottom/top-center/bottom-center
  offset.value = info.offset || 'status-nav' // status/nav/status-nav/status-nav-xxx/number/rpx/px/x-xxx
  type.value = info.type || 'primary'
  bgType.value = info.bgType || 'primary'
  bg.value = info.bg || ''
  text.value = info.text || ''
  textType.value = info.textType || 'inverse'
  textSize.value = info.textSize || 'base'
  textStyle.value = info.textStyle || ''
  icon.value = info.icon || ''
  iconType.value = info.iconType || 'inverse'
  iconSize.value = info.iconSize || 'll'
  iconBoxStyle.value = info.iconBoxStyle || ''
  iconStyle.value = info.iconStyle || ''
  height.value = info.height || '44px'
  boxStyle.value = info.boxStyle || ''
  duration.value = info.duration || 2400
  animationType.value = info.animation || info.animationType || 'ease-out'
  space.value = info.space || '12rpx'

  showing.value = true
  if (!duration.value) return
  hideTimer && clearTimeout(hideTimer)
  hideTimer = setTimeout(() => {
    hide()
  }, duration.value)
}
function handleHackShow() {
  // since we used v-if, the element may not exist
  setTimeout(() => {
    appearPopup(showing.value)
  }, 50)
}
function hide() {
  appearPopup(false, 300)
}
function appearPopup(bool, duration = 300) {
  // #ifdef APP-NVUE
  weexAppearPopup(bool, duration)
  // #endif
  // #ifndef APP-NVUE
  noWeexAppearPopup(bool, duration)
  // #endif
}
// #ifndef APP-NVUE
function noWeexAppearPopup(bool, duration = 300) {
  // add css transition properties
  let _style = 'transform:' + getTransform(!bool) + ';'
  _style += 'transition: all ' + duration + 'ms ' + animationType.value + ';'
  noWeexAnimation.value = _style

  setTimeout(() => {
    if (!bool) {
      showing.value = false
      emit('close')
    }
  }, duration)
}
// #endif
// #ifdef APP-NVUE
function weexAppearPopup(bool, duration = 300) {
  const popupEl = nnotice.value
  if (!popupEl) {
    return
  }
  animation.transition(
    popupEl,
    {
      styles: {
        transform: getTransform(!bool),
      },
      duration,
      delay: 0,
      timingFunction: animationType.value,
    },
    () => {
      if (!bool) {
        showing.value = false
        emit('close')
      }
    }
  )
}
// #endif
function getTransform(toClose) {
  let _size = 0
  if (!toClose) {
    if (
      pos.value === 'center' ||
      pos.value === 'top-center' ||
      pos.value === 'center-top' ||
      pos.value === 'bottom-center' ||
      pos.value === 'center-bottom'
    ) {
      _size = screenHeight.value * 0.5 - heightPx.value * 0.5 + offsetPx.value
    } else {
      _size = heightPx.value + offsetPx.value
    }
  }
  if (
    pos.value === 'top' ||
    pos.value === 'center' ||
    pos.value === 'center-top' ||
    pos.value === 'top-center'
  ) {
    return `translateY(${_size}px)`
  }
  return `translateY(${-_size}px)`
}
</script>

<style lang="scss" scoped>
.n-notice {
  position: fixed;
  left: 0;
  right: 0;
}
</style>
