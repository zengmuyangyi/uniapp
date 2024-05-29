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
    <n-picker-time-content
      :mode="mode"
      :value="value"
      :useCurrent="useCurrent"
      :start="start"
      :end="end"
      :includeBefore="includeBefore"
      :includeAfter="includeAfter"
      :range="range"
      :bgType="bgType"
      :textType="textType"
      :textSize="textSize"
      :height="height"
      :itemHeight="itemHeight"
      :boxStyle="boxStyle"
      :itemStyle="itemStyle"
      :textStyle="textStyle"
      :indicatorStyle="indicatorStyle"
      :rangeType="rangeType"
      :rangeSize="rangeSize"
      :rangeStyle="rangeStyle"
      :rangeBoxStyle="rangeBoxStyle"
      @inited="pickerInited"
      @change="pickerChanged"
    ></n-picker-time-content>
  </n-popup-always>
</template>

<script setup>
/**
 * n-picker-time
 * @description 时间选择器
 * @property {Boolean} useCurrent = [true|false] 是否使用当前时间
 * @property {String} start 年份的开始
 * @property {String} end 年份的结束
 * @property {Boolean} includeBefore = [true|false] 是否允许以前的年份。仅仅只是用在带年份选择的mode上
 * @property {Boolean} includeAfter = [true|false] 是否允许以后的年份
 * @property {String} range 范围选择时中间的分割器
 * @property {String} bgType = [nav|primary|success|warning|error|light|dark|inverse|custom|link|none|page|hover|mask|mask-dark|border|border-light|border-dark|gradient] content的背景主题
 * @property {String} textType = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 选择项文字颜色主题
 * @property {String} textSize = [ss|s|base|l|ll] 选择项文字尺寸主题
 * @property {String} height content的自定义高度
 * @property {String} itemHeight 选择项的自定义高度
 * @property {String} boxStyle content的外层样式
 * @property {String} itemStyle 选择项的外层样式
 * @property {String} textStyle 选择项的文字样式
 * @property {String} indicatorStyle content的indicator-style
 * @property {String} rangeType = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 范围分割器的颜色主题
 * @property {String} rangeSize = [ss|s|base|l|ll] 范围分割器的尺寸主题
 * @property {String} rangeStyle 范围分割器的样式
 * @property {String} rangeBoxStyle 范围分割器的外层样式
 * @event {Function} confirm 确认事件
 * @event {Function} cancel 取消事件
 */
import { ref } from 'vue'
import { makeProps } from '../utils/props.js'

const props = defineProps(
  makeProps([
    ['show', false],
    ['mode', 'date'],
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
    ['bgType', 'inverse'],
    ['textType', 'text'],
    ['textSize', 'base'],
    ['height', '500rpx'],
    ['itemHeight', '100rpx'],
    'boxStyle',
    'itemStyle',
    'textStyle',
    'indicatorStyle',
    ['range', '-'],
    ['rangeType', 'text'],
    ['rangeSize', 'base'],
    'rangeStyle',
    'rangeBoxStyle',
    ['value', [0, 0, 0, 0, 0, 0, 0]],
    ['useCurrent', false],
    ['start', '1970'],
    ['end', new Date().getFullYear() + ''],
    ['includeBefore', true],
    ['includeAfter', true],
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
  result.value = JSON.parse(JSON.stringify(val))
}
function pickerChanged(val) {
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
