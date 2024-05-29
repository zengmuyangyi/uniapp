<template>
  <view class="n-position-relative n-flex-row n-justify-center" :style="boxStyle">
    <view
      v-for="(item, index) in ranges"
      :key="index"
      class="n-position-relative"
      :style="
        mrItemStyle +
        (codeArr.length + 1 == item ? activeItemStyle : '') +
        (index != ranges.length - 1 ? 'margin-right:' + space + ';' : '')
      "
    >
      <view v-if="mode === 'middle' && codeIndex <= item" :style="mrMiddleStyle"></view>
      <view
        v-if="mode === 'bottom'"
        :style="mrBottomStyle + (codeArr.length + 1 == item ? activeLineStyle : '')"
      ></view>
      <view
        v-if="mode === 'box' && codeArr.length + 1 == item && cursor"
        class="n-one-cursor"
        :style="mrCursorStyle"
      ></view>
      <!-- #ifdef APP-NVUE -->
      <view
        v-if="password"
        :class="['n-position-absolute', codeArr.length >= item ? 'n-opacity-1' : 'n-opacity-0']"
        :style="mrDotStyle"
      ></view>
      <!-- #endif -->
      <!-- #ifndef APP-NVUE -->
      <view
        v-if="password && codeArr.length >= item"
        class="n-position-absolute"
        :style="mrDotStyle"
      ></view>
      <!-- #endif -->
      <text
        v-if="!password"
        class="n-text-align-center"
        :style="'line-height:' + width + ';' + valueStyle"
        >{{ codeArr[index] ? codeArr[index] : '' }}</text
      >
    </view>
    <!-- #ifdef APP-NVUE -->
    <input
      ref="ninput"
      :disabled="disabled"
      type="number"
      :adjust-position="adjust"
      :value="inputValue"
      :focus="focus"
      :maxlength="maxlength"
      class="n-one-hide-input"
      :style="{ height: width }"
      @input="getVal"
      @blur="toBlur"
      @focus="toFocus"
      @confirm="toConfirm"
      @keyboardheightchange="toKbChange"
    />
    <!-- #endif -->
    <!-- #ifndef APP-NVUE -->
    <input
      v-if="inputVisible"
      :disabled="disabled"
      type="number"
      :adjust-position="adjust"
      :value="inputValue"
      :focus="focus"
      :maxlength="maxlength"
      class="n-one-hide-input"
      :style="{ height: width }"
      @input="getVal"
      @blur="toBlur"
      @focus="toFocus"
      @confirm="toConfirm"
      @keyboardheightchange="toKbChange"
    />
    <!-- #endif -->
  </view>
</template>

<script setup>
/**
 * n-input-one
 * @description 验证码/支付密码框
 * @property {String} value 值
 * @property {Boolean} inputVisible = [true|false] 是否隐藏input
 * @property {Number} maxlength 最大长度。4/5/6
 * @property {Boolean} password = [true|false] 是否密码
 * @property {Boolean} cursor = [true|false] 是否带有光标
 * @property {Boolean} focus = [true|false] 是否focus
 * @property {Boolean} disabled = [true|false] 是否禁用
 * @property {String} mode middle-中间线, bottom-下划线, box-方框
 * @property {Boolean} adjust = [true|false] adjust-position控制
 * @property {String} width 自定义height/width
 * @property {String} space 间隙
 * @property {String} dotStyle password时圆点的样式 default: 'width:16rpx;height:16rpx;border-radius:16rpx;background-color:#000000;'
 * @property {String} lineStyle middle或bottom时线条的样式 default: 'width:80rpx;height:8rpx;border-radius:12rpx;background-color:#000000;'
 * @property {String} activeLineStyle 当前输入框线条的样式
 * @property {String} cursorStyle 光标的样式 default: 'width:1px;height:42rpx;background-color:#8F9CFF;'
 * @property {String} valueStyle 值的样式 default: 'font-size:70rpx;font-weight:700;color:#000000;'
 * @property {String} boxStyle 外层样式
 * @property {String} itemStyle 输入框样式
 * @property {String} activeItemStyle 当前输入框的样式
 */
import { computed, ref, watch } from 'vue'
import { makeProps } from '../utils/props.js'

const props = defineProps(
  makeProps([
    'value',
    ['inputVisible', true],
    ['maxlength', 4],
    ['password', false],
    ['cursor', false],
    ['focus', false],
    ['disabled', false],
    ['mode', 'middle'],
    ['adjust', true],
    ['width', '100rpx'],
    ['space', '12rpx'],
    ['dotStyle', 'width:16rpx;height:16rpx;border-radius:16rpx;background-color:#000000;'],
    ['lineStyle', 'width:80rpx;height:8rpx;border-radius:12rpx;background-color:#000000;'],
    'activeLineStyle',
    ['cursorStyle', 'width:1px;height:42rpx;background-color:#8F9CFF;'],
    ['valueStyle', 'font-size:70rpx;font-weight:700;color:#000000;'],
    'boxStyle',
    'itemStyle',
    'activeItemStyle',
  ])
)
const emit = defineEmits([
  'update:value',
  'finish',
  'keyboardHeightChange',
  'blur',
  'focus',
  'confirm',
])

const ranges = ref([])
const inputValue = ref(props.value)
const codeIndex = ref(1)
const codeArr = ref([])
const ninput = ref(null)

defineExpose({
  nFocus,
  nBlur,
  clear,
})
toMakeAndCheck(props.value)

watch(
  () => props.maxlength,
  (newV) => {
    let _ranges = []
    for (let i = 1; i <= newV; i++) {
      _ranges.push(i)
    }
    ranges.value = _ranges
  },
  { immediate: true }
)
watch(
  () => props.value,
  (newV) => {
    if (newV !== inputValue.value) {
      inputValue.value = newV
      toMakeAndCheck(newV)
    }
  },
  { immediate: true }
)

const widthUnit = computed(() => {
  if (props.width.indexOf('rpx') >= 0 || props.width.indexOf('upx') >= 0) {
    return 'rpx'
  }
  return 'px'
})
const mrItemStyle = computed(() => {
  let _style = `width:${props.width};height:${props.width};`
  if (props.mode === 'box') {
    _style += `border-radius:0;border-width:1px;border-style:solid;border-color:#000000;`
  }
  return _style + props.itemStyle
})
const mrCursorStyle = computed(() => {
  const iw = parseFloat(props.width)
  const _style = `left:${iw * 0.5}${widthUnit.value};top:${iw * 0.5}${widthUnit.value};`
  return _style + props.cursorStyle
})
const mrMiddleStyle = computed(() => {
  const iw = parseFloat(props.width)
  let _style = `position:absolute;left:${iw * 0.5}${widthUnit.value};top:${iw * 0.5}${
    widthUnit.value
  };`
  _style += `transform:translate(-50%,-50%);`
  return _style + props.lineStyle
})
const mrBottomStyle = computed(() => {
  const iw = parseFloat(props.width)
  let _style = `position:absolute;left:${iw * 0.5}${widthUnit.value};bottom:0;`
  _style += `transform:translateX(-50%);`
  return _style + props.lineStyle
})
const mrDotStyle = computed(() => {
  const iw = parseFloat(props.width)
  let _style = `left:${iw * 0.5}${widthUnit.value};top:${iw * 0.5}${widthUnit.value};`
  _style += `transform:translate(-50%,-50%);`
  return _style + props.dotStyle
})

function getVal(e) {
  const val = e.detail.value
  inputValue.value = val
  emit('update:value', val)
  toMakeAndCheck(val)
}
function toMakeAndCheck(val) {
  const arr = val.split('')
  codeIndex.value = arr.length + 1
  codeArr.value = arr
  if (codeIndex.value > props.maxlength) {
    emit('finish', codeArr.value.join(''))
  }
}
// refs 时不再提供 v-model 支持
// 支持使用refs来设置value
// 没有提供数据保护与检测，自己在外面对数据进行检测保护
function set(val) {
  inputValue.value = val
  toMakeAndCheck(val)
}
// 支持使用refs来清空
function clear() {
  inputValue.value = ''
  codeArr.value = []
  codeIndex.value = 1
}
function nFocus() {
  // #ifdef APP-NVUE
  ninput.value && ninput.value.focus()
  // #endif
}
function nBlur() {
  // #ifdef APP-NVUE
  ninput.value && ninput.value.blur()
  // #endif
}
function toBlur(e) {
  emit('blur', e)
}
function toFocus(e) {
  emit('focus', e)
}
function toConfirm(e) {
  emit('confirm', e.detail.value)
}
function toKbChange(e) {
  emit('keyboardHeightChange', e)
}
</script>

<style lang="scss" scoped>
.n-one {
  &-cursor {
    position: absolute;
    transform: translate(-50%, -50%);
    /* #ifndef APP-NVUE */
    animation: shaking 1s infinite ease;
    /* #endif */
  }
  /* #ifndef APP-NVUE */
  @keyframes shaking {
    0% {
      opacity: 0.2;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 0.2;
    }
  }
  /* #endif */
  &-hide-input {
    position: absolute;
    top: 0;
    left: -750rpx;
    width: 1500rpx;
    text-align: left;
    opacity: 1;
    background-color: transparent;
  }
}
</style>
