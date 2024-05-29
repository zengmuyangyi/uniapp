<template>
  <view
    v-if="showLoading"
    :class="[
      'n-loading',
      showLoading && needMask && 'n-bg-' + maskType,
      showLoading && needMask && 'n-loading-mask',
    ]"
    @tap.stop="maskClicked"
    :style="maskStyle + cMaskStyle"
  >
    <view
      :class="[
        'n-flex-column',
        'n-align-center',
        'n-justify-center',
        'n-loading-content',
        'n-bg-' + bgType,
      ]"
      :style="boxStyle + mrContentStyle"
    >
      <image
        :src="icon"
        mode="aspectFill"
        class="n-loading-content-image"
        :style="iconStyle"
      ></image>
      <text
        v-if="text"
        :class="[
          'n-lines-1',
          'n-loading-content-text',
          'n-color-' + textType,
          'n-size-' + textSize,
        ]"
        :style="textStyle"
        >{{ text }}</text
      >
    </view>
  </view>
</template>

<script setup>
/**
 * n-loading
 * @description 以私有化配置为主的loading组件
 * @property {String} maskStyle 遮罩层样式
 * @property {String} boxStyle 外层样式
 * @property {String} baseHeight 基准高度
 * @property {String} baseWidth 基准宽度
 * @property {String} height 高度
 * @property {String} width 宽度
 * @event {Function} maskClicked 遮罩层点击事件
 */
import { ref, computed, onUnmounted } from 'vue'
import { getHeight } from '../utils/system.js'
import { makeProps } from '../utils/props.js'

let tid = null
const props = defineProps(
  makeProps([
    'maskStyle',
    'boxStyle',
    ['baseHeight', 'window'],
    ['baseWidth', '750rpx'],
    ['width', '200rpx'],
    ['height', '200rpx'],
  ])
)
const emit = defineEmits(['maskClicked'])
const showLoading = ref(false)
const pos = ref('center')
const offset = ref('0')
const needMask = ref(false)
const maskType = ref('')
const cMaskStyle = ref('')
const bgType = ref('')
const icon = ref('')
const text = ref('')
const iconStyle = ref('')
const textType = ref('')
const textSize = ref('')
const textStyle = ref('')
const contentStyle = ref('')
const delay = ref(10)

const screenHeight = computed(() => {
  return getHeight(props.baseHeight)
})
const screenWidth = computed(() => {
  return getHeight(props.baseWidth)
})
const offsetPx = computed(() => {
  return getHeight(offset.value)
})
const mrContentStyle = computed(() => {
  let style = `left:${screenWidth.value * 0.5}px;`
  if (props.width) {
    style += `width:${props.width};`
  }
  if (props.height) {
    style += `height:${props.height};`
  }
  if (pos.value === 'center') {
    style += 'transform:translate(-50%,-50%);'
    style += `top:${screenHeight.value * 0.5 + offsetPx.value}px;`
  } else if (pos.value === 'bottom') {
    style += 'transform:translateX(-50%);'
    style += `bottom:${offsetPx.value}px;`
  } else {
    style += 'transform:translateX(-50%);'
    style += `top:${offsetPx.value}px;`
  }
  return contentStyle.value + style
})
defineExpose({
  show,
  hide,
})

function show(options) {
  tid && clearTimeout(tid)
  const opts = Object.assign({}, options)
  pos.value = opts.pos || 'center'
  offset.value = opts.offset || '0px'
  needMask.value = typeof opts.needMask === 'boolean' ? opts.needMask : false
  maskType.value = opts.maskType || 'mask'
  cMaskStyle.value = opts.maskStyle || ''
  bgType.value = opts.bgType || 'mask-dark'
  icon.value = opts.icon || '/static/ui/loading.gif'
  text.value = opts.text || ''
  textType.value = opts.textType || 'inverse'
  textSize.value = opts.textSize || 'ss'
  textStyle.value = opts.textStyle || ''
  iconStyle.value = opts.iconStyle || ''
  contentStyle.value = opts.contentStyle || ''
  delay.value = opts.delay || 0
  if (delay.value === 0) {
    showLoading.value = true
  } else {
    tid = setTimeout(() => {
      showLoading.value = true
    }, delay.value)
  }
}
function hide() {
  showLoading.value = false
}
function maskClicked(e) {
  e.stopPropagation && e.stopPropagation()
  needMask.value && emit('maskClicked', {})
}
onUnmounted(() => {
  tid && clearTimeout(tid)
})
</script>

<style lang="scss" scoped>
.n-loading {
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
    border-radius: 20rpx;
    /* #ifndef APP-NVUE */
    z-index: 691;
    /* #endif */

    &-image {
      width: 75rpx;
      height: 75rpx;
    }
    &-text {
      text-align: center;
      color: #ffffff;
      font-size: 24rpx;
      line-height: 30rpx;
      height: 30rpx;
      margin-top: 16rpx;
      width: 140rpx;
    }
  }
}
</style>
