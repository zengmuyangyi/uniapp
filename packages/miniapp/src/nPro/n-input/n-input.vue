<template>
  <view
    :class="[
      'n-flex-row',
      'n-align-center',
      'n-wrap-nowrap',
      'n-bg-' + bgType,
      'n-height-' + height,
      'n-radius-' + radius,
      'n-border-' + border,
    ]"
    :style="boxStyle"
    bubble="true"
    @click="toDetail"
  >
    <n-icon
      v-if="icon && icon.length > 0"
      :name="icon"
      :type="iconType"
      :size="iconSize"
      :iconStyle="iconStyle"
      :boxStyle="'margin-right:' + space + ';' + iconBoxStyle"
      @iconClicked="toDetail"
    ></n-icon>
    <slot name="label">
      <text
        v-if="label && label.length > 0"
        :class="['n-color-' + labelType, 'n-size-' + labelSize]"
        :style="'margin-right:' + space + ';' + labelStyle"
        >{{ label || '' }}</text
      >
    </slot>
    <!-- #ifndef APP-NVUE -->
    <view
      :class="['n-flex-1', 'n-position-relative', 'n-height-' + height]"
      :style="inputBoxHeightStyle"
    >
      <view
        :class="['n-flex-row', 'n-align-center', 'n-input-place', 'n-input-place-' + valueAlign]"
      >
        <text
          v-if="showPlaceholder"
          :class="['n-size-' + placeSize, 'n-color-' + placeType]"
          :style="placeStyle"
          >{{ placeholder || '' }}</text
        >
      </view>
      <view class="n-flex-row n-align-center n-input-input">
        <input
          v-if="inputVisible"
          :disabled="disabled"
          :focus="focus"
          :type="type"
          :cursor-spacing="cursorSpacing"
          :adjust-position="adjust"
          :confirm-type="confirmType"
          :maxlength="maxlength"
          :value="inputValue || ''"
          :password="password"
          :class="['n-color-' + valueType, 'n-size-' + valueSize]"
          :style="'text-align:' + valueAlign + ';' + valueStyle"
          @input="handleInputedText"
          @confirm="handleConfirmText"
          @focus="toFocus"
          @blur="toBlur"
          @keyboardheightchange="toChangeKb"
        />
        <text
          v-else
          :class="['n-color-' + valueType, 'n-size-' + valueSize]"
          :style="'text-align:' + valueAlign + ';' + valueStyle"
          >{{ inputValue || '' }}</text
        >
      </view>
    </view>
    <!-- #endif -->
    <!-- #ifdef APP-NVUE -->
    <view class="n-flex-1 n-position-relative">
      <view
        :class="['n-flex-row', 'n-align-center', 'n-input-place', 'n-input-place-' + valueAlign]"
      >
        <text
          v-if="showPlaceholder"
          :class="['n-size-' + placeSize, 'n-color-' + placeType]"
          :style="placeStyle"
          >{{ placeholder || '' }}</text
        >
      </view>
      <input
        ref="ninput"
        v-if="isPassword"
        :disabled="disabled"
        :focus="focus"
        :cursor-spacing="cursorSpacing"
        :adjust-position="adjust"
        :confirm-type="confirmType"
        :maxlength="maxlength"
        :value="inputValue || ''"
        :password="password"
        :class="['n-color-' + valueType, 'n-size-' + valueSize]"
        :style="'text-align:' + valueAlign + ';' + valueStyle"
        @input="handleInputedText"
        @confirm="handleConfirmText"
        @focus="toFocus"
        @blur="toBlur"
        @keyboardheightchange="toChangeKb"
      />
      <input
        ref="ninput1"
        v-else
        :disabled="disabled"
        :focus="focus"
        :type="type"
        :cursor-spacing="cursorSpacing"
        :adjust-position="adjust"
        :confirm-type="confirmType"
        :maxlength="maxlength"
        :value="inputValue || ''"
        :class="['n-color-' + valueType, 'n-size-' + valueSize]"
        :style="'text-align:' + valueAlign + ';' + valueStyle"
        @input="handleInputedText"
        @confirm="handleConfirmText"
        @focus="toFocus"
        @blur="toBlur"
        @keyboardheightchange="toChangeKb"
      />
    </view>
    <!-- #endif -->
    <slot name="extra"></slot>
    <n-icon
      v-if="indicator && indicator.length > 0"
      :name="indicator"
      :type="indicatorType"
      :size="indicatorSize"
      :iconStyle="indicatorStyle"
      :boxStyle="'margin-left:' + space + ';' + indicatorBoxStyle"
      @iconClicked="rightTapped"
    ></n-icon>
  </view>
</template>

<script setup>
/**
 * n-input
 * @description
 * @property {Array} format 自定义格式，每一段的长度:[3, 4, 4]
 * @property {String} separator 自定义格式的分割器
 * @property {Boolean} inputVisible = [true|false] 是否隐藏input
 * @property {String} type = [text|number|idcard|digit|tel] input的type
 * @value text 文本输入键盘
 * @value number 数字输入键盘 均支持，App平台、H5平台 3.1.22 以下版本 vue 页面在 iOS 平台显示的键盘包含负数和小数。
 * @value idcard 身份证输入键盘 微信、支付宝、百度、QQ小程序
 * @value digit 带小数点的数字键盘 均支持，App平台、H5平台 vue 页面在 iOS 平台显示的键盘包含负数。
 * @value tel 电话输入键盘 仅App的nvue页面支持
 * @property {Number} maxlength 最大输入
 * @property {Boolean} isPassword = [true|false] 是否用于密码输入框。 主要是为了兼容iOS下type与password共存时type不起作用
 * @property {Boolean} password = [true|false] 是否密码
 * @property {Boolean} focus = [true|false] 是否聚焦
 * @property {Boolean} disabled = [true|false] 是否禁用
 * @property {String} icon 左侧图标
 * @property {String} label 左侧label文字
 * @property {String} value 值
 * @property {String} placeholder placeholder
 * @property {String} indicator 右侧图标
 * @property {String} valueAlign 文字排版
 * @property {String} bgType = [nav|primary|success|warning|error|light|dark|inverse|custom|link|none|page|hover|mask|mask-dark|border|border-light|border-dark|gradient] 背景主题
 * @property {String} height = [ss|s|base|l|ll] 高度主题
 * @property {String} border = [all-light|all-dark|all-primary|all-success|all-warning|all-error|all-inverse|all-custom|all-link|top-light|top-dark|top-primary|top-success|top-warning|top-error|top-inverse|top-custom|top-link|right-light|right-dark|right-primary|right-success|right-warning|right-error|right-inverse|right-custom|right-link|bottom-light|bottom-dark|bottom-primary|bottom-success|bottom-warning|bottom-error|bottom-inverse|bottom-custom|bottom-link|left-light|left-dark|left-primary|left-success|left-warning|left-error|left-inverse|left-custom|left-link|none] 边框主题
 * @property {String} radius = [ss|s|base|l|ll|none] 圆角主题
 * @property {String} valueType = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 值颜色主题
 * @property {String} valueSize = [ss|s|base|l|ll] 值尺寸主题
 * @property {String} iconType = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 图标颜色主题
 * @property {String} iconSize = [ss|s|base|l|ll] 图标尺寸主题
 * @property {String} labelType = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] label颜色主题
 * @property {String} labelSize = [ss|s|base|l|ll] label尺寸主题
 * @property {String} indicatorType = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 右侧图标颜色主题
 * @property {String} indicatorSize = [ss|s|base|l|ll] 右侧图标尺寸主题
 * @property {String} placeType = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] placeholder颜色主题
 * @property {String} placeSize = [ss|s|base|l|ll] placeholder尺寸主题
 * @property {Boolean} adjust = [true|false] 键盘adjust-position弹出方式
 * @property {Number} cursorSpacing 指定光标与键盘的距离，单位 px 。取 input 距离底部的距离和 cursor-spacing 指定的距离的最小值作为光标与键盘的距离
 * @property {String} confirmType confirm-type
 * @property {String} iconStyle 图标样式
 * @property {String} iconBoxStyle 图标外层样式
 * @property {String} labelStyle label样式
 * @property {String} valueStyle 值样式
 * @property {String} indicatorStyle 右侧图标样式
 * @property {String} indicatorBoxStyle 右侧图标外层样式
 * @property {String} boxStyle 外层样式
 * @property {String} space 内部各元素之间的空隙
 * @property {String} placeStyle placeholder的样式
 */
import { computed, ref, watch } from 'vue'
import { makeProps } from '../utils/props.js'
import { cssToJs } from '../utils/utils.js'

const props = defineProps(
  makeProps([
    ['format', []],
    ['separator', ' '],
    ['inputVisible', true],
    ['type', 'text'],
    ['maxlength', 140],
    ['isPassword', false],
    ['password', false],
    ['focus', false],
    ['disabled', false],
    'icon',
    'label',
    'value',
    ['placeholder', '请输入内容'],
    'indicator',
    ['valueAlign', 'left'],
    'bgType',
    ['height', 'base'],
    'border',
    'radius',
    ['valueType', 'text'],
    ['valueSize', 'base'],
    ['iconType', 'text'],
    ['iconSize', 'l'],
    ['labelType', 'text'],
    ['labelSize', 'base'],
    ['indicatorType', 'text'],
    ['indicatorSize', 'l'],
    ['placeType', 'place'],
    ['placeSize', 'base'],
    ['adjust', true],
    ['cursorSpacing', 0],
    ['confirmType', 'done'],
    'iconStyle',
    'iconBoxStyle',
    'labelStyle',
    'valueStyle',
    'indicatorStyle',
    'indicatorBoxStyle',
    'boxStyle',
    ['space', '12rpx'],
    'placeStyle',
  ])
)
const emit = defineEmits([
  'keyboardHeightChange',
  'update:value',
  'formated',
  'confirm',
  'indicatorClicked',
  'inputClicked',
  'focus',
  'blur',
])
defineExpose({
  nFocus,
  nBlur,
})

const inputValue = ref(props.value || '')
const formatRawValue = ref(props.value || '')
const ninput = ref(null)
const ninput1 = ref(null)

// #ifndef APP-NVUE
const inputBoxHeightStyle = computed(() => {
  if (props.boxStyle && props.boxStyle.length >= 10) {
    const cssJs = cssToJs(props.boxStyle)
    if (cssJs.height) {
      return `height:${cssJs.height};`
    }
  }
  return ''
})
// #endif
const formatable = computed(() => {
  return props.separator && props.separator.length > 0 && props.format && props.format.length > 0
})
const showPlaceholder = computed(() => {
  if (!inputValue.value) {
    return true
  }
  const inStr = inputValue.value + ''
  if (inStr && inStr.length > 0) {
    return false
  }
  return true
})

if (formatable.value) {
  inputValue.value = toFormatText(props.value)
}

watch(
  () => props.value,
  (newV) => {
    if (formatable.value) {
      if (formatRawValue.value !== newV) {
        formatRawValue.value = newV
        inputValue.value = toFormatText(newV)
      }
    } else {
      // change when not the same
      if (inputValue.value !== newV) {
        inputValue.value = newV
      }
    }
  }
)

function toFocus(e) {
  emit('focus', e)
}
function toBlur(e) {
  emit('blur', e)
}
function nFocus() {
  // #ifdef APP-NVUE
  ninput.value && ninput.value.focus()
  ninput1.value && ninput1.value.focus()
  // #endif
}
function nBlur() {
  // #ifdef APP-NVUE
  ninput.value && ninput.value.blur()
  ninput1.value && ninput1.value.blur()
  // #endif
}
function toChangeKb(e) {
  emit('keyboardHeightChange', e)
}
function handleInputedText(e) {
  const _val = e.detail.value || ''
  if (formatable.value) {
    inputValue.value = toFormatText(_val)
    formatRawValue.value = inputValue.value.split(props.separator).join('')
    emit('update:value', formatRawValue.value)
    emit('formated', inputValue.value)
  } else {
    inputValue.value = e.detail.value
    emit('update:value', e.detail.value)
  }
}
function handleConfirmText(e) {
  emit('confirm', e.detail.value)
}
function rightTapped() {
  emit('indicatorClicked')
}
function toDetail() {
  props.disabled && emit('inputClicked')
}
// 这个格式化 使得我们不能输入 separator
function toFormatText(val) {
  let _val = val
  if (formatable.value) {
    const oldVal = val.split(props.separator).join('')
    const valLength = oldVal.length
    const formatLength = props.format.length
    let position = 0
    const valArr = []
    for (const i in props.format) {
      const length = props.format[i]
      if (valLength > position + length) {
        valArr.push(oldVal.substr(position, length))
        position += length
      } else {
        valArr.push(oldVal.substr(position))
        break
      }
    }
    _val = valArr.join(props.separator)
    if (_val.length > props.maxlength) {
      _val = oldVal
    }
  }
  return _val
}
</script>

<style lang="scss" scoped>
.n-input {
  &-place {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;

    &-left {
      justify-content: flex-start;
    }
    &-center {
      justify-content: center;
    }
    &-right {
      justify-content: flex-end;
    }
  }
  &-input {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }
}
</style>
