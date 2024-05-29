<template>
  <view bubble="true" @click="toDetail">
    <view
      v-if="position === 'left' && fixIcon"
      :class="[
        'n-search',
        'n-bg-' + bgType,
        'n-border-' + border,
        'n-radius-' + radius,
        'n-height-' + height,
        'n-flex-row',
        'n-align-center',
      ]"
      :style="boxStyle"
    >
      <n-icon
        v-if="icon && icon.length > 0"
        :name="icon"
        :type="showPlaceholder ? placeIconType : iconType"
        :size="iconSize"
        :icon-style="iconStyle"
        :box-style="'margin-right:' + iconTextSpace + ';'"
        @iconClicked="toDetail"
      ></n-icon>
      <view
        :class="['n-flex-1', 'n-position-relative', 'n-height-' + height]"
        :style="mrFixBoxStyle"
      >
        <view :class="['n-search-place', 'n-flex-row', 'n-align-center']" :style="placeBoxStyle">
          <text
            :class="['n-flex-1', 'n-color-' + placeType, 'n-size-' + placeSize]"
            :style="placeStyle"
            >{{ showPlaceholder ? placeholder : '' }}</text
          >
        </view>
        <view :class="['n-search-input', 'n-flex-row', 'n-align-center']" :style="valueBoxStyle">
          <input
            ref="ninput"
            :disabled="disabled"
            :value="inputValue"
            :focus="focus"
            :cursor-spacing="cursorSpacing"
            :adjust-position="adjust"
            :confirm-type="confirmType"
            :class="['n-flex-1', 'n-color-' + valueType, 'n-size-' + valueSize]"
            :style="valueStyle"
            @input="toInput"
            @confirm="toConfirm"
            @focus="toFocus"
            @blur="toBlur"
            @keyboardheightchange="toChangeKb"
          />
        </view>
      </view>
      <slot name="extra"></slot>
    </view>
    <view
      v-else
      :class="[
        'n-search',
        'n-bg-' + bgType,
        'n-border-' + border,
        'n-radius-' + radius,
        'n-height-' + height,
        'n-align-center',
        'n-wrap-nowrap',
      ]"
      :style="mrBoxStyle"
    >
      <view
        :class="['n-search-place', 'n-flex-row', 'n-align-center', 'n-search-place-' + position]"
        :style="mrPlaceBoxStyle"
      >
        <view
          v-if="showPlaceholder && icon && icon.length > 0"
          :style="{ 'margin-right': iconTextSpace }"
        >
          <n-icon
            :name="icon"
            :type="placeIconType"
            :size="iconSize"
            :icon-style="iconStyle"
            @iconClicked="toDetail"
          ></n-icon>
        </view>
        <text :class="['n-color-' + placeType, 'n-size-' + placeSize]" :style="placeStyle">{{
          showPlaceholder ? placeholder : ''
        }}</text>
      </view>
      <view :class="['n-search-input', 'n-flex-row', 'n-align-center']" :style="mrValueBoxStyle">
        <input
          ref="ninput1"
          :disabled="disabled"
          :value="inputValue"
          :focus="focus"
          :cursor-spacing="cursorSpacing"
          :adjust-position="adjust"
          :confirm-type="confirmType"
          :class="[
            'n-flex-1',
            'n-search-input-' + position,
            'n-color-' + valueType,
            'n-size-' + valueSize,
          ]"
          :style="valueStyle"
          @input="toInput"
          @confirm="toConfirm"
          @focus="toFocus"
          @blur="toBlur"
          @keyboardheightchange="toChangeKb"
        />
        <slot name="extra"></slot>
      </view>
    </view>
  </view>
</template>

<script setup>
/**
 * search
 * @description 搜索输入框
 * @property {String,Number} value 值
 * @property {String} icon 图标
 * @property {String} placeholder placeholder
 * @property {String} position 内容位置：left/center
 * @property {Boolean} focus = [true|false] 是否focus
 * @property {Boolean} adjust = [true|false] 键盘弹出方式：adjust-position
 * @property {Number} cursorSpacing 指定光标与键盘的距离，单位 px 。取 input 距离底部的距离和 cursor-spacing 指定的距离的最小值作为光标与键盘的距离
 * @property {Boolean} disabled = [true|false] 是否禁用
 * @property {String} confirmType confirm-type
 * @property {Boolean} fixIcon = [true|false] 是否固定图标。position为left时可以将icon固定在左侧
 * @property {String} iconTextSpace 图标与文字的间距
 * @property {String} bgType = [nav|primary|success|warning|error|light|dark|inverse|custom|link|none|page|hover|mask|mask-dark|border|border-light|border-dark|gradient] 背景色主题
 * @property {String} valueType = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 内容颜色主题
 * @property {String} placeIconType = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] placeholder显示时图标的颜色主题
 * @property {String} iconType = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 图标的颜色主题
 * @property {String} placeType = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] placeholder的颜色主题
 * @property {String} height = [ss|s|base|l|ll] 高度主题
 * @property {String} border = [all-light|all-dark|all-primary|all-success|all-warning|all-error|all-inverse|all-custom|all-link|top-light|top-dark|top-primary|top-success|top-warning|top-error|top-inverse|top-custom|top-link|right-light|right-dark|right-primary|right-success|right-warning|right-error|right-inverse|right-custom|right-link|bottom-light|bottom-dark|bottom-primary|bottom-success|bottom-warning|bottom-error|bottom-inverse|bottom-custom|bottom-link|left-light|left-dark|left-primary|left-success|left-warning|left-error|left-inverse|left-custom|left-link|none] 边框主题
 * @property {String} radius = [ss|s|base|l|ll|none] 圆角主题
 * @property {String} space 左右padding
 * @property {String} valueSize = [ss|s|base|l|ll] 内容的尺寸主题
 * @property {String} iconSize = [ss|s|base|l|ll] 图标的尺寸主题
 * @property {String} placeSize = [ss|s|base|l|ll] placeholder的尺寸主题
 * @property {String} boxStyle 外层样式
 * @property {String} iconStyle 图标样式
 * @property {String} placeStyle placeholder的样式
 * @property {String} valueBoxStyle 内容的外层样式
 * @property {String} valueStyle 内容的样式
 * @property {String} placeBoxStyle placeholder的外层样式
 * @event {Function} input 当键盘输入时，触发input事件
 * @event {Function} confirm 点击完成按钮时触发
 * @event {Function} focus 输入框聚焦时触发
 * @event {Function} blur 输入框失去焦点时触发
 * @event {Function} keyboardHeightChange 键盘高度发生变化的时候触发此事件
 */
import { ref, watch, computed } from 'vue'
import { cssToJs } from '../utils/utils.js'
import { makeProps } from '../utils/props.js'

const props = defineProps(
  makeProps([
    ['value', '', [String, Number]],
    ['icon', 'search'],
    ['placeholder', '输入内容开始搜索'],
    ['position', 'left'],
    ['focus', false],
    ['adjust', true],
    ['cursorSpacing', 0],
    ['disabled', false],
    ['confirmType', 'search'],
    ['fixIcon', false],
    ['iconTextSpace', '12rpx'],
    'bgType',
    ['valueType', 'text'],
    ['placeIconType', 'place'],
    ['iconType', 'text'],
    ['placeType', 'place'],
    ['height', 'base'],
    ['border', 'all'],
    ['radius', 'll'],
    ['space', '32rpx'],
    ['valueSize', 'base'],
    ['iconSize', 'l'],
    ['placeSize', 'base'],
    ['boxStyle', 'padding-left:32rpx;padding-right:32rpx;'],
    'iconStyle',
    'placeStyle',
    'valueBoxStyle',
    'valueStyle',
    'placeBoxStyle',
  ])
)
const emit = defineEmits([
  'update:value',
  'confirm',
  'focus',
  'blur',
  'keyboardHeightChange',
  'searchClicked',
])

const ninput = ref(null)
const ninput1 = ref(null)
const inputValue = ref(props.value)

const showPlaceholder = computed(() => {
  return !inputValue.value || inputValue.value.length === 0
})
const mrBoxStyle = computed(() => {
  return `padding-left:${props.space};padding-right:${props.space};` + props.boxStyle
})
const mrValueBoxStyle = computed(() => {
  return `padding-left:${props.space};padding-right:${props.space};` + props.valueBoxStyle
})
const mrPlaceBoxStyle = computed(() => {
  return `padding-left:${props.space};padding-right:${props.space};` + props.placeBoxStyle
})
const mrFixBoxStyle = computed(() => {
  if (props.fixIcon) {
    if (props.boxStyle && props.boxStyle.length >= 10) {
      const cssJs = cssToJs(props.boxStyle)
      if (cssJs.height) {
        return `height:${cssJs.height};`
      }
    }
  }
  return ''
})

watch(
  () => props.value,
  (newV) => {
    inputValue.value = newV
  }
)

function toInput(e) {
  inputValue.value = e.detail.value
  emit('update:value', e.detail.value)
}
function toConfirm(e) {
  emit('confirm', e.detail.value)
}
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
function toDetail() {
  props.disabled && emit('searchClicked')
}
</script>

<style lang="scss" scoped>
.n-search {
  position: relative;
  /* #ifndef APP-NVUE */
  box-sizing: border-box;
  /* #endif */

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
  }
  &-input {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;

    &-left {
      text-align: left;
    }
    &-center {
      text-align: center;
    }
  }
}
</style>
