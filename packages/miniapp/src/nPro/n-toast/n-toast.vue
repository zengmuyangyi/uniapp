<template>
  <view
    v-if="state.showing"
    :class="[
      'n-toast',
      state.needMask && 'n-toast-mask',
      state.needMask && 'n-bg-' + state.maskType,
    ]"
    @click.stop="toPrevent"
    :style="boxStyle + state.maskStyle"
  >
    <view v-if="state.mode === 'big'" class="n-toast-content" :style="mrContentStyle">
      <view
        :class="[
          'n-toast-content-box',
          'n-flex-column',
          'n-align-center',
          'n-justify-center',
          'n-bg-' + state.bgType,
        ]"
        :style="state.contentStyle"
      >
        <n-icon
          v-if="state.icon"
          :name="state.icon"
          :type="state.iconType"
          :size="state.iconSize"
          :iconStyle="'font-size:60rpx;' + state.iconStyle"
        ></n-icon>
        <text
          v-if="state.text"
          :class="[
            'n-toast-content-text',
            'n-lines-2',
            'n-color-' + state.textType,
            'n-size-' + state.textSize,
          ]"
          :style="state.textStyle"
          >{{ state.text }}</text
        >
      </view>
    </view>
    <view v-else class="n-toast-small n-flex-row n-justify-center" :style="mrContentStyle">
      <view
        :class="['n-toast-small-box', 'n-flex-row', 'n-align-center', 'n-bg-' + state.bgType]"
        :style="state.contentStyle"
      >
        <view v-if="state.icon" style="margin-right: 24rpx">
          <n-icon
            :name="state.icon"
            :type="state.iconType"
            :size="state.iconSize"
            :iconStyle="state.iconStyle"
          ></n-icon>
        </view>
        <text
          v-if="state.text"
          :class="[
            'n-toast-small-text',
            'n-flex-1',
            'n-lines-2',
            'n-color-' + state.textType,
            'n-size-' + state.textSize,
          ]"
          :style="state.textStyle"
          >{{ state.text }}</text
        >
      </view>
    </view>
  </view>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { getHeight } from '../utils/system.js'

defineExpose({
  show,
})

const props = defineProps({
  /**
   * 外层样式
   */
  boxStyle: {
    type: String,
    default: '',
  },
  /**
   * 基准宽度
   */
  baseWidth: {
    type: String,
    default: '750rpx',
  },
  /**
   * 基准高度
   */
  baseHeight: {
    type: String,
    default: 'window',
  },
})

let tid = null
const state = reactive({
  needMask: false,
  maskType: 'mask',
  maskStyle: '',
  pos: 'center', // top/center/bottom
  offset: '0', // status/nav-status/status-nav/x/...
  mode: 'small', // big/small. big is big icon, small is small icon
  type: '',
  bgType: '',
  icon: '',
  text: '',
  textType: 'inverse',
  textSize: 'base',
  iconType: 'inverse',
  iconSize: 'll',
  contentStyle: '',
  iconStyle: '',
  textStyle: '',
  showing: false,
})

const screenHeight = computed(() => {
  return getHeight(props.baseHeight)
})
const screenWidth = computed(() => {
  return getHeight(props.baseWidth)
})
const offsetPx = computed(() => {
  return getHeight(state.offset)
})
const mrContentStyle = computed(() => {
  let style = `left:${screenWidth.value * 0.5}px;`
  if (state.pos === 'center') {
    const h = screenHeight.value * 0.5 + offsetPx.value
    style += `top:${h}px;transform:translate(-50%, -50%);`
  } else if (state.pos === 'bottom') {
    style += `bottom:${offsetPx.value}px;transform:translateX(-50%);`
  } else {
    style += `top:${offsetPx.value}px;transform:translateX(-50%);`
  }
  return style
})

function show(info, cInterval = null, cFinish = null, errorOptions = null) {
  tid && clearTimeout(tid)
  if (state.showing) {
    state.showing = false
  }
  let _interval = 2000 // default 2000
  let _finish = null
  let _info = {}
  // Error
  if (info && info.message) {
    let _msg = info.message
    if (info.fileName) {
      _msg += ' ' + info.fileName
    }
    if (info.lineNumber) {
      _msg += ' ' + info.lineNumber
    }
    _info['text'] = _msg
    if (!errorOptions || typeof errorOptions != 'object') {
      _info = {
        text: _msg,
        type: 'error',
        bgType: 'error',
        icon: 'error',
        pos: 'center',
        offset: '0',
      }
    } else {
      _info = Object.assign({}, { text: _msg }, errorOptions)
    }
  } else {
    _info = Object.assign({}, info || {})
  }
  if (_info.interval) {
    _interval = _info.interval
  } else if (_info.interval === 0) {
    _interval = 0
  }
  delete _info.interval
  if (_info.finish) {
    _finish = _info.finish
    delete _info.finish
  }
  if (typeof _info.needMask === 'boolean') {
    state.needMask = _info.needMask
    delete _info.needMask
  } else {
    state.needMask = false
  }
  if (_info.mode) {
    state.mode = _info.mode
    delete _info.mode
  } else {
    state.mode = 'small'
  }
  if (_info.contentStyle) {
    state.contentStyle = _info.contentStyle
    delete _info.contentStyle
  } else {
    // reset to clear the before-set
    state.contentStyle = ''
  }
  if (_info.iconStyle) {
    state.iconStyle = _info.iconStyle
    delete _info.iconStyle
  } else {
    state.iconStyle = ''
  }
  if (_info.iconType) {
    state.iconType = _info.iconType
    delete _info.iconType
  } else {
    state.iconType = 'inverse'
  }
  if (_info.iconSize) {
    state.iconSize = _info.iconSize
    delete _info.iconSize
  } else {
    state.iconSize = 'll'
  }
  if (_info.textStyle) {
    state.textStyle = _info.textStyle
    delete _info.textStyle
  } else {
    state.textStyle = ''
  }
  if (_info.textType) {
    state.textType = _info.textType
    delete _info.textType
  } else {
    state.textType = 'inverse'
  }
  if (_info.textSize) {
    state.textSize = _info.textSize
    delete _info.textSize
  } else {
    state.textSize = 'base'
  }
  // type/bgType/icon/text/pos/offset
  for (const i in _info) {
    state[i] = _info[i]
  }
  if (!state.type) {
    state.type = 'default'
  }
  if (!_info.bgType) {
    state.bgType = state.type
    if (state.type === 'default') {
      state.bgType = 'mask-dark'
    }
  }
  if (!_info.icon) {
    state.icon = 'toast-' + state.type
  }
  if (!_info.pos) {
    state.pos = 'center'
  }
  if (
    typeof _info.offset === 'undefined' ||
    (typeof _info.offset === 'string' && _info.offset.length === 0)
  ) {
    state.offset = '0'
  }
  if (cInterval) {
    _interval = cInterval
  }
  if (cFinish) {
    _finish = cFinish
  }
  state.showing = true
  tid = setTimeout(() => {
    state.showing = false
    _finish && _finish()
  }, _interval)
}
function toPrevent(e) {
  e.stopPropagation && e.stopPropagation()
}
</script>

<style lang="scss" scoped>
.n-toast {
  position: relative;

  &-mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    /* #ifndef APP-NVUE */
    z-index: 690;
    /* #endif */
  }
  &-content {
    position: fixed;
    /* #ifndef APP-NVUE */
    z-index: 691;
    /* #endif */

    &-box {
      border-radius: 20rpx;
      width: 250rpx;
      height: 250rpx;
    }
    &-text {
      text-align: center;
      line-height: 42rpx;
      margin-top: 20rpx;
      width: 200rpx;
    }
  }
  &-small {
    position: fixed;
    /* #ifndef APP-NVUE */
    z-index: 691;
    /* #endif */
    width: 600rpx;

    &-box {
      border-radius: 20rpx;
      max-width: 600rpx;
      padding: 32rpx;
    }
    &-text {
      line-height: 42rpx;
    }
  }
}
</style>
