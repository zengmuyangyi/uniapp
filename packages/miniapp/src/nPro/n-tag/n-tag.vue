<template>
  <view
    :class="[
      'n-flex-row',
      'n-justify-center',
      'n-align-center',
      'n-height-' + height,
      'n-bg-' + mrBgType,
      'n-border-' + mrBorder,
      'n-radius-' + radius,
      disabled && 'n-disabled',
    ]"
    :style="mrBoxStyle"
    @tap.stop="toSelect"
  >
    <slot>
      <text :class="['n-size-' + textSize, 'n-color-' + mrTextType]" :style="mrTextStyle">{{
        text
      }}</text>
    </slot>
    <slot name="extra"></slot>
  </view>
</template>

<script setup>
/**
 * tag
 * @description 标签
 * @property {Number, String} text 文字内容
 * @property {String, Number} value 唯一值
 * @property {Boolean} selected = [true|false] 是否选中/活跃
 * @property {Boolean} disabled = [true|false] 是否禁用
 * @property {String} bgType = [nav|primary|success|warning|error|light|dark|inverse|custom|link|none|page|hover|mask|mask-dark|border|border-light|border-dark|gradient] 背景主题
 * @property {String} selectedbgType = [nav|primary|success|warning|error|light|dark|inverse|custom|link|none|page|hover|mask|mask-dark|border|border-light|border-dark|gradient] 选中时背景主题
 * @property {String} textType = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 文字颜色主题
 * @property {String} selectedTextType = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 选中时文字颜色主题
 * @property {String} disabledTextType = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 禁用时文字颜色主题
 * @property {String} textSize = [ss|s|base|l|ll] 文字尺寸主题
 * @property {String} height = [ss|s|base|l|ll] 高度主题
 * @property {String} border = [all-light|all-dark|all-primary|all-success|all-warning|all-error|all-inverse|all-custom|all-link|top-light|top-dark|top-primary|top-success|top-warning|top-error|top-inverse|top-custom|top-link|right-light|right-dark|right-primary|right-success|right-warning|right-error|right-inverse|right-custom|right-link|bottom-light|bottom-dark|bottom-primary|bottom-success|bottom-warning|bottom-error|bottom-inverse|bottom-custom|bottom-link|left-light|left-dark|left-primary|left-success|left-warning|left-error|left-inverse|left-custom|left-link|none] 边框主题
 * @property {String} selectedBorder = [all-light|all-dark|all-primary|all-success|all-warning|all-error|all-inverse|all-custom|all-link|top-light|top-dark|top-primary|top-success|top-warning|top-error|top-inverse|top-custom|top-link|right-light|right-dark|right-primary|right-success|right-warning|right-error|right-inverse|right-custom|right-link|bottom-light|bottom-dark|bottom-primary|bottom-success|bottom-warning|bottom-error|bottom-inverse|bottom-custom|bottom-link|left-light|left-dark|left-primary|left-success|left-warning|left-error|left-inverse|left-custom|left-link|none] 选中时边框主题
 * @property {String} radius = [ss|s|base|l|ll|none] 圆角主题
 * @property {String} space 左右两侧的padding
 * @property {String} textStyle 文字样式
 * @property {String} selectedTextStyle 选中时文字样式
 * @property {String} disabledTextStyle 禁用时文字样式
 * @property {String} boxStyle 外层样式
 * @property {String} selectedBoxStyle 选中时文字样式
 * @property {String} disabledBoxStyle 禁用时文字样式
 * @event {Function} tagClicked 点击事件
 */
import { computed } from 'vue'
import { makeProps } from '../utils/props.js'

const props = defineProps(
  makeProps([
    ['text', '', [Number, String]],
    ['value', '', [Number, String]],
    ['selected', false],
    ['disabled', false],
    'bgType',
    'selectedBgType',
    ['textType', 'text'],
    ['selectedTextType', 'text'],
    ['disabledTextType', 'disabled'],
    ['textSize', 'base'],
    ['height', 'base'],
    ['border', 'all'],
    ['selectedBorder', 'all'],
    ['radius', 'base'],
    ['space', '16rpx'],
    'textStyle',
    'selectedTextStyle',
    'disabledTextStyle',
    'boxStyle',
    'selectedBoxStyle',
    'disabledBoxStyle',
  ])
)
const emit = defineEmits(['tagClicked'])

const mrBorder = computed(() => {
  return props.selected ? props.selectedBorder : props.border
})
const mrBgType = computed(() => {
  return props.selected ? props.selectedBgType : props.bgType
})
const mrTextType = computed(() => {
  if (props.selected) {
    if (props.disabled) {
      if (props.disabledTextType) {
        return props.disabledTextType
      }
      return props.selectedBgType ? 'inverse' : ''
    }
    if (props.selectedTextType) {
      return props.selectedTextType
    }
    return props.selectedBgType ? 'inverse' : ''
  }
  if (props.disabled) {
    if (props.disabledTextType) {
      return props.disabledTextType
    }
    return props.bgType ? 'inverse' : ''
  }
  if (props.textType) {
    return props.textType
  }
  return props.bgType ? 'inverse' : ''
})
const mrBoxStyle = computed(() => {
  let _style = `padding-left:${props.space};padding-right:${props.space};`
  _style += props.boxStyle
  if (props.selected) {
    _style += props.selectedBoxStyle
  }
  if (props.disabled) {
    _style += props.disabledBoxStyle
  }
  return _style
})
const mrTextStyle = computed(() => {
  let _style = props.textStyle
  if (props.selected) {
    _style += props.selectedTextStyle
  }
  if (props.disabled) {
    _style += props.disabledTextStyle
  }
  return _style
})

function toSelect(e) {
  if (!props.disabled) {
    emit('tagClicked', {
      selected: props.selected,
      value: props.value,
    })
  }
  e.stopPropagation && e.stopPropagation()
}
</script>

<style lang="scss" scoped></style>
