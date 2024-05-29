<template>
  <n-popup-always :show="show" pos="bottom" height="600rpx" @overlayClicked="toCancel">
    <slot name="header">
      <view
        :class="[
          'n-picker-header',
          'n-flex-row',
          'n-align-center',
          'n-justify-center',
          'n-bg-' + headerBgType,
          'n-border-' + headerBorder,
          'n-radius-' + headerRadius,
        ]"
        :style="headerStyle"
      >
        <text
          :class="['n-color-' + cancelType, 'n-size-' + cancelSize]"
          :style="cancelStyle"
          @tap="toCancel"
          >{{ cancelText }}</text
        >
        <text
          :class="[
            'n-flex-1',
            'n-color-' + titleType,
            'n-size-' + titleSize,
            'n-text-align-center',
          ]"
          :style="titleStyle"
          >{{ title }}</text
        >
        <text
          :class="['n-color-' + confirmType, 'n-size-' + confirmSize]"
          :style="confirmStyle"
          @tap="toConfirm"
          >{{ confirmText }}</text
        >
      </view>
    </slot>
    <n-picker-content
      :mode="mode"
      :selections="selections"
      :labelProps="labelProps"
      :value="value"
      :bgType="bgType"
      :textType="textType"
      :textSize="textSize"
      :height="height"
      :itemHeight="itemHeight"
      :boxStyle="boxStyle"
      :itemStyle="itemStyle"
      :textStyle="textStyle"
      :indicatorStyle="indicatorStyle"
      @inited="pickerInited"
      @change="pickerChanged"
    ></n-picker-content>
  </n-popup-always>
</template>

<script setup>
/**
 * n-picker
 * @description 选择器
 * @property {Boolean} show = [true|false] 是否打开/显示
 * @property {String} mode s1/s2/s3
 * @property {String} cancelText 左侧取消文字
 * @property {String} confirmText 右侧确认文字
 * @property {String} title 中间标题
 * @property {String} cancelType = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 取消文字颜色主题
 * @property {String} cancelSize = [ss|s|base|l|ll] 取消文字尺寸主题
 * @property {String} cancelStyle 取消文字样式
 * @property {String} confirmType = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 确认文字颜色主题
 * @property {String} confirmSize = [ss|s|base|l|ll] 确认文字尺寸主题
 * @property {String} confirmStyle 确认文字样式
 * @property {String} titleType = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 标题颜色主题
 * @property {String} titleSize = [ss|s|base|l|ll] 标题尺寸主题
 * @property {String} titleStyle 标题样式
 * @property {String} headerBorder = [all-light|all-dark|all-primary|all-success|all-warning|all-error|all-inverse|all-custom|all-link|top-light|top-dark|top-primary|top-success|top-warning|top-error|top-inverse|top-custom|top-link|right-light|right-dark|right-primary|right-success|right-warning|right-error|right-inverse|right-custom|right-link|bottom-light|bottom-dark|bottom-primary|bottom-success|bottom-warning|bottom-error|bottom-inverse|bottom-custom|bottom-link|left-light|left-dark|left-primary|left-success|left-warning|left-error|left-inverse|left-custom|left-link|none] 头部的边框主题
 * @property {String} headerRadius = [ss|s|base|l|ll|none] 头部的圆角主题
 * @property {String} headerbgType = [nav|primary|success|warning|error|light|dark|inverse|custom|link|none|page|hover|mask|mask-dark|border|border-light|border-dark|gradient] 头部的背景主题
 * @property {String} headerStyle 头部样式
 * @property {Array}  value 值，不是索引
 * @property {String} bgType = [nav|primary|success|warning|error|light|dark|inverse|custom|link|none|page|hover|mask|mask-dark|border|border-light|border-dark|gradient] content的背景色主题
 * @property {String} textType = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] content的文字颜色主题
 * @property {String} textSize = [ss|s|base|l|ll] content的文字尺寸主题
 * @property {String} height content的自定义高度
 * @property {String} itemHeight 选择item的自定义高度
 * @property {String} boxStyle content的外层样式
 * @property {String} itemStyle 选择item的外层样式
 * @property {String} textStyle 选择item的文字样式
 * @property {String} indicatorStyle content的indicator-style
 * @property {Array} selections 可选择内容
 * @property {Object} labelProps 自定义的相应内容对应字段
 * @event {Function} confirm 确认事件
 * @event {Function} cancel 取消事件
 */
import { ref } from 'vue'
import { makeProps } from '../utils/props.js'

const props = defineProps(
  makeProps([
    ['show', false],
    ['mode', 's1'],
    ['cancelText', '取消'],
    ['confirmText', '确认'],
    'title',
    ['cancelType', 'third'],
    ['cancelSize', 'base'],
    'cancelStyle',
    ['confirmType', 'primary'],
    ['confirmSize', 'base'],
    'confirmStyle',
    ['titleType', 'text'],
    ['titleSize', 'base'],
    'titleStyle',
    ['headerBorder', 'bottom'],
    ['headerRadius', 'top-base'],
    ['headerBgType', 'inverse'],
    'headerStyle',
    ['value', [0, 0, 0, 0, 0, 0, 0]],
    ['bgType', 'inverse'],
    ['textType', 'text'],
    ['textSize', 'base'],
    ['height', '500rpx'],
    ['itemHeight', '100rpx'],
    'boxStyle',
    'itemStyle',
    'textStyle',
    'indicatorStyle',
    ['selections', []],
    [
      'labelProps',
      {
        s1: { label: 'name', value: 'id' },
        s2: { label: 'name', value: 'id', tag: 'c' },
        s3: { label: 'name', value: 'id', tag: 'a' },
      },
    ],
  ])
)
const emit = defineEmits(['confirm', 'cancel'])

const result = ref(null)

function toConfirm() {
  emit('confirm', result.value)
}
function toCancel() {
  emit('cancel')
}
function pickerInited(val) {
  // console.log(val)
  result.value = JSON.parse(JSON.stringify(val))
}
function pickerChanged(val) {
  // console.log(val)
  result.value = JSON.parse(JSON.stringify(val))
}
</script>

<style lang="scss" scoped>
.n-picker {
  &-header {
    height: 100rpx;
    width: 750rpx;
    padding-left: 32rpx;
    padding-right: 32rpx;
  }
}
</style>
