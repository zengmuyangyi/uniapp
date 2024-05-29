<template>
  <view class="n-flex-row n-align-center n-wrap-nowrap" :style="boxStyle">
    <view
      :class="[
        'n-stepper-action',
        'n-flex-row',
        'n-align-center',
        'n-justify-center',
        'n-bg-' + minusBgType,
        'n-border-' + border,
        'n-radius-' + radius,
        (disabled || isLess) && 'n-disabled',
        disabled || isLess ? '' : 'n-hover-' + hover + '-n',
      ]"
      :hover-class="'n-hover-' + hover"
      :style="mrMinusBoxStyle"
      bubble="true"
      @click="minusClicked"
    >
      <n-icon
        :name="minus"
        :type="minusType"
        :iconStyle="mrMinusStyle"
        @iconClicked="minusClicked"
      ></n-icon>
    </view>
    <input
      :class="[
        'n-stepper-input',
        'n-size-' + valueSize,
        'n-color-' + valueType,
        'n-border-' + valueBorder,
        'n-radius-' + valueRadius,
      ]"
      type="digit"
      :style="mrValueStyle"
      :disabled="disabled || readOnly"
      :value="value"
      @input="onInput"
      @blur="onBlur"
    />
    <view
      :class="[
        'n-stepper-action',
        'n-flex-row',
        'n-align-center',
        'n-justify-center',
        'n-bg-' + plusBgType,
        'n-border-' + border,
        'n-radius-' + radius,
        (disabled || isOver) && 'n-disabled',
      ]"
      :hover-class="'n-hover-' + hover"
      :style="mrPlusBoxStyle"
      bubble="true"
      @click="plusClicked"
    >
      <n-icon
        :name="plus"
        :type="plusType"
        :iconStyle="mrPlusStyle"
        @iconClicked="plusClicked"
      ></n-icon>
    </view>
  </view>
</template>

<script setup>
/**
 * n-stepper
 * @description 步进器
 * @property {Number} min 最小值
 * @property {Number} max 最大值
 * @property {Number} step 步进长度/步长
 * @property {Number} value 值
 * @property {Boolean} disabled = [true|false] 是否禁用
 * @property {Boolean} readOnly = [true|false] 输入框是否只读
 * @property {String} minus 左侧减少的图标
 * @property {String} plus 右侧增加的图标
 * @property {String} radius = [ss|s|base|l|ll|none] 加减按钮的圆角主题
 * @property  {String} border = [all-light|all-dark|all-primary|all-success|all-warning|all-error|all-inverse|all-custom|all-link|top-light|top-dark|top-primary|top-success|top-warning|top-error|top-inverse|top-custom|top-link|right-light|right-dark|right-primary|right-success|right-warning|right-error|right-inverse|right-custom|right-link|bottom-light|bottom-dark|bottom-primary|bottom-success|bottom-warning|bottom-error|bottom-inverse|bottom-custom|bottom-link|left-light|left-dark|left-primary|left-success|left-warning|left-error|left-inverse|left-custom|left-link|none] 加减按钮的边框主题
 * @property {String} minusbgType = [nav|primary|success|warning|error|light|dark|inverse|custom|link|none|page|hover|mask|mask-dark|border|border-light|border-dark|gradient] 左侧减按钮的背景主题
 * @property {String} plusbgType = [nav|primary|success|warning|error|light|dark|inverse|custom|link|none|page|hover|mask|mask-dark|border|border-light|border-dark|gradient] 右侧加按钮的背景主题
 * @property {String} hover = [opacity|bg|bg-dark|bg-opacity|none] 加减按钮的hover主题
 * @property {String} valueType = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 中间值的颜色主题
 * @property {String} valueSize = [ss|s|base|l|ll] 中间值的尺寸主题
 * @property {String} valueRadius = [ss|s|base|l|ll|none] 中间值的圆角主题
 * @property  {String} valueBorder = [all-light|all-dark|all-primary|all-success|all-warning|all-error|all-inverse|all-custom|all-link|top-light|top-dark|top-primary|top-success|top-warning|top-error|top-inverse|top-custom|top-link|right-light|right-dark|right-primary|right-success|right-warning|right-error|right-inverse|right-custom|right-link|bottom-light|bottom-dark|bottom-primary|bottom-success|bottom-warning|bottom-error|bottom-inverse|bottom-custom|bottom-link|left-light|left-dark|left-primary|left-success|left-warning|left-error|left-inverse|left-custom|left-link|none] 中间值的边框主题
 * @property {String} valueStyle 值的样式
 * @property {String} valueDisabledStyle 禁用时值的样式
 * @property {String} minusType = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 减少图标的颜色主题
 * @property {String} minusStyle 减少图标的样式
 * @property {String} minusDisabledStyle 禁用时减少图标的样式
 * @property {String} minusBoxStyle 减少图标的外层样式
 * @property {String} minusBoxDisabledStyle 禁用时减少图标的外层样式
 * @property {String} plusType = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 增加图标的颜色主题
 * @property {String} plusStyle 增加图标的样式
 * @property {String} plusDisabledStyle 禁用时增加图标的样式
 * @property {String} plusBoxStyle 增加图标的外层样式
 * @property {String} plusBoxDisabledStyle 禁用时增加图标的外层样式
 * @property {String} boxStyle 外层样式
 * @event {Function} less 超出最小范围时触发
 * @event {Function} input 输入事件
 * @event {Function} change 更改事件
 * @event {Function} over 超出最大范围时触发
 */
import { computed, watch, ref } from 'vue'
import { makeProps } from '../utils/props.js'

const props = defineProps(
  makeProps([
    ['min', 1],
    ['max', 100],
    ['step', 1],
    ['value', 1, [String, Number]],
    ['disabled', false],
    ['readOnly', true],
    ['minus', 'minus-bold'],
    ['plus', 'add-bold'],
    'border',
    ['radius', 's'],
    'minusBgType',
    'plusBgType',
    ['hover', 'opacity'],
    ['valueType', 'text'],
    ['valueSize', 'l'],
    'valueBorder',
    'valueRadius',
    'valueStyle',
    'valueDisabledStyle',
    ['minusType', 'text'],
    'minusStyle',
    'minusDisabledStyle',
    'minusBoxStyle',
    'minusBoxDisabledStyle',
    ['plusType', 'text'],
    'plusStyle',
    'plusDisabledStyle',
    'plusBoxStyle',
    'plusBoxDisabledStyle',
    'boxStyle',
  ])
)
const emit = defineEmits(['update:value', 'change', 'less', 'over'])

const isLess = ref(false)
const isOver = ref(false)

const mrValueStyle = computed(() => {
  let _style = props.valueStyle
  if (props.disabled || props.readOnly) {
    _style += props.valueDisabledStyle
  }
  return _style
})
const mrMinusBoxStyle = computed(() => {
  let _style = props.minusBoxStyle
  if (props.disabled || isLess.value) {
    _style += props.minusBoxDisabledStyle
  }
  return _style
})
const mrMinusStyle = computed(() => {
  let _style = props.minusStyle
  if (props.disabled || isLess.value) {
    _style += props.minusDisabledStyle
  }
  return _style
})
const mrPlusBoxStyle = computed(() => {
  let _style = props.plusBoxStyle
  if (props.disabled || isOver.value) {
    _style += props.plusBoxDisabledStyle
  }
  return _style
})
const mrPlusStyle = computed(() => {
  let _style = props.plusStyle
  if (props.disabled || isOver.value) {
    _style += props.plusDisabledStyle
  }
  return _style
})
// 具备多少位小数点
const stepFixNum = computed(() => {
  return props.step.toString().split('.')[1] ? props.step.toString().split('.')[1].length : 0
})

if (props.disabled) {
  isLess.value = true
  isOver.value = true
}

watch(
  () => props.value,
  (newV) => {
    if (newV <= props.min) {
      isLess.value = true
    } else if (newV >= props.max) {
      isOver.value = true
    } else {
      isLess.value = false
      isOver.value = false
    }
  }
)

function minusClicked() {
  if (props.disabled) {
    return
  }
  const isMinOver = props.value <= props.min
  if (isMinOver) {
    emit('less', props.value)
  } else {
    let nowNum = (props.value || 0) * 1 - props.step
    if (isNaN(nowNum)) {
      nowNum = props.min
    }
    if (nowNum <= props.min) {
      nowNum = props.min
    }
    if (stepFixNum.value > 0) {
      nowNum = nowNum.toFixed(stepFixNum.value) * 1
    }
    emit('update:value', nowNum)
    emit('change', nowNum)
  }
}
function plusClicked() {
  if (props.disabled) {
    return
  }
  const isMaxOver = props.value >= props.max
  if (isMaxOver) {
    emit('over', props.value)
  } else {
    let nowNum = (props.value || 0) * 1 + props.step
    if (isNaN(nowNum)) {
      nowNum = props.max
    }
    if (nowNum >= props.max) {
      nowNum = props.max
    }
    if (stepFixNum.value > 0) {
      nowNum = nowNum.toFixed(stepFixNum.value) * 1
    }
    emit('update:value', nowNum)
    emit('change', nowNum)
  }
}
function onInput(e) {
  correctInputValue(e.detail.value)
}
function onBlur(e) {
  correctInputValue(e.detail.value)
}
function correctInputValue(v) {
  let vInt = parseFloat(v, 10)
  if (isNaN(vInt)) {
    emit('update:value', '')
    emit('change', '')
    return
  }
  if (vInt >= props.min && vInt <= props.max) {
    if (stepFixNum.value > 0) {
      vInt = vInt.toFixed(stepFixNum.value) * 1
    }
    emit('update:value', vInt)
    emit('change', vInt)
  } else if (vInt < props.min) {
    emit('update:value', props.min)
    emit('change', props.min)
  } else {
    emit('update:value', props.max)
    emit('change', props.max)
  }
}
</script>

<style lang="scss" scoped>
.n-stepper {
  &-action {
    width: 60rpx;
    height: 60rpx;
  }
  &-input {
    border-width: 0;
    text-align: center;
    width: 90rpx;
    height: 60rpx;
  }
}
</style>
