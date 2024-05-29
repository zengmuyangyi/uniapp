<template>
  <view
    :class="[
      'n-flex-row',
      'n-align-center',
      'n-bg-' + bgType,
      'n-border-' + border,
      'n-radius-' + radius,
    ]"
    :style="boxStyle"
  >
    <view
      v-if="indexOfDays !== -1"
      :class="[
        'n-flex-row',
        'n-justify-center',
        'n-align-center',
        'n-height-' + itemHeight,
        'n-bg-' + itemBgType,
        'n-border-' + itemBorder,
        'n-radius-' + itemRadius,
      ]"
      :style="mrItemBoxStyle"
    >
      <text :class="['n-color-' + itemTextType, 'n-size-' + itemTextSize]" :style="itemTextStyle">{{
        countDownData.day
      }}</text>
    </view>
    <view
      v-if="indexOfDays !== -1"
      class="n-flex-row n-justify-center n-align-center"
      :style="mrIndicatorBoxStyle"
    >
      <text
        :class="['n-color-' + indicatorTextType, 'n-size-' + indicatorTextSize]"
        :style="indicatorTextStyle"
        >{{ getDot(indexOfDays, indexOfHours) }}</text
      >
    </view>
    <view
      v-if="indexOfHours !== -1"
      :class="[
        'n-flex-row',
        'n-justify-center',
        'n-align-center',
        'n-height-' + itemHeight,
        'n-bg-' + itemBgType,
        'n-border-' + itemBorder,
        'n-radius-' + itemRadius,
      ]"
      :style="mrItemBoxStyle"
    >
      <text :class="['n-color-' + itemTextType, 'n-size-' + itemTextSize]" :style="itemTextStyle">{{
        countDownData.hour
      }}</text>
    </view>
    <view
      v-if="indexOfHours !== -1"
      class="n-flex-row n-justify-center n-align-center"
      :style="mrIndicatorBoxStyle"
    >
      <text
        :class="['n-color-' + indicatorTextType, 'n-size-' + indicatorTextSize]"
        :style="indicatorTextStyle"
        >{{ getDot(indexOfHours, indexOfMinutes) }}</text
      >
    </view>
    <view
      v-if="indexOfMinutes !== -1"
      :class="[
        'n-flex-row',
        'n-justify-center',
        'n-align-center',
        'n-height-' + itemHeight,
        'n-bg-' + itemBgType,
        'n-border-' + itemBorder,
        'n-radius-' + itemRadius,
      ]"
      :style="mrItemBoxStyle"
    >
      <text :class="['n-color-' + itemTextType, 'n-size-' + itemTextSize]" :style="itemTextStyle">{{
        countDownData.minute
      }}</text>
    </view>
    <view
      v-if="indexOfMinutes !== -1 && getDot(indexOfMinutes, indexOfSeconds)"
      class="n-flex-row n-justify-center n-align-center"
      :style="mrIndicatorBoxStyle"
    >
      <text
        :class="['n-color-' + indicatorTextType, 'n-size-' + indicatorTextSize]"
        :style="indicatorTextStyle"
        >{{ getDot(indexOfMinutes, indexOfSeconds) }}</text
      >
    </view>
    <view
      v-if="indexOfSeconds !== -1"
      :class="[
        'n-flex-row',
        'n-justify-center',
        'n-align-center',
        'n-height-' + itemHeight,
        'n-bg-' + itemBgType,
        'n-border-' + itemBorder,
        'n-radius-' + itemRadius,
      ]"
      :style="mrItemBoxStyle"
    >
      <text :class="['n-color-' + itemTextType, 'n-size-' + itemTextSize]" :style="itemTextStyle">{{
        countDownData.second
      }}</text>
    </view>
    <view
      v-if="indexOfSeconds !== -1 && getDot(indexOfSeconds, -1)"
      class="n-flex-row n-justify-center n-align-center"
      :style="mrIndicatorBoxStyle"
    >
      <text
        :class="['n-color-' + indicatorTextType, 'n-size-' + indicatorTextSize]"
        :style="indicatorTextStyle"
        >{{ getDot(indexOfSeconds, -1) }}</text
      >
    </view>
  </view>
</template>

<script setup>
/**
 * countdown
 * @description 倒计时。支持自定义
 * @property {Number} time 目标时间戳
 * @property {Number} interval 计时周期
 * @property {String} tpl 内容显示格式
 * @property {String} bgType = [nav|primary|success|warning|error|light|dark|inverse|custom|link|none|page|hover|mask|mask-dark|border|border-light|border-dark|gradient] 背景主题
 * @property {String} border = [all-light|all-dark|all-primary|all-success|all-warning|all-error|all-inverse|all-custom|all-link|top-light|top-dark|top-primary|top-success|top-warning|top-error|top-inverse|top-custom|top-link|right-light|right-dark|right-primary|right-success|right-warning|right-error|right-inverse|right-custom|right-link|bottom-light|bottom-dark|bottom-primary|bottom-success|bottom-warning|bottom-error|bottom-inverse|bottom-custom|bottom-link|left-light|left-dark|left-primary|left-success|left-warning|left-error|left-inverse|left-custom|left-link|none] 边框主题
 * @property {String} radius = [ss|s|base|l|ll|none] 圆角主题
 * @property {String} itembgType = [nav|primary|success|warning|error|light|dark|inverse|custom|link|none|page|hover|mask|mask-dark|border|border-light|border-dark|gradient] item的背景主题
 * @property {String} itemBorder = [all-light|all-dark|all-primary|all-success|all-warning|all-error|all-inverse|all-custom|all-link|top-light|top-dark|top-primary|top-success|top-warning|top-error|top-inverse|top-custom|top-link|right-light|right-dark|right-primary|right-success|right-warning|right-error|right-inverse|right-custom|right-link|bottom-light|bottom-dark|bottom-primary|bottom-success|bottom-warning|bottom-error|bottom-inverse|bottom-custom|bottom-link|left-light|left-dark|left-primary|left-success|left-warning|left-error|left-inverse|left-custom|left-link|none] item的边框主题
 * @property {String} itemRadius = [ss|s|base|l|ll|none] item的圆角主题
 * @property {String} itemTextType = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] item的文字颜色主题
 * @property {String} itemTextSize = [ss|s|base|l|ll] item的文字尺寸主题
 * @property {String} itemHeight = [ss|s|base|l|ll] item的高度主题
 * @property {String} itemWidth item的宽度。0时会有左右各24rpx的padding
 * @property {String} indicatorTextType = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 分隔符的颜色主题
 * @property {String} indicatorTextSize = [ss|s|base|l|ll] 分隔符的尺寸主题
 * @property {String} indicatorWidth 分隔符的宽度
 * @property {String} boxStyle 外层样式
 * @property {String} itemBoxStyle item外层样式
 * @property {String} indicatorBoxStyle 分隔符的外层样式
 * @property {String} itemTextStyle item文字样式
 * @property {String} indicatorTextStyle 分隔符的文字样式
 * @event {Function} completed 倒计时完成事件
 */
import { computed, onMounted, ref } from 'vue'
import { makeProps } from '../utils/props.js'

const props = defineProps(
  makeProps([
    ['time', 0],
    ['interval', 1000],
    ['tpl', '{h}:{m}:{s}'],
    'bgType',
    'border',
    'radius',
    'itemBgType',
    'itemBorder',
    'itemRadius',
    ['itemTextType', 'text'],
    ['itemTextSize', 'l'],
    ['itemHeight', 'base'],
    ['itemWidth', '0'],
    ['indicatorTextType', 'text'],
    ['indicatorTextSize', 'l'],
    ['indicatorWidth', '60rpx'],
    'boxStyle',
    'itemBoxStyle',
    'indicatorBoxStyle',
    'itemTextStyle',
    'indicatorTextStyle',
  ])
)
const emit = defineEmits(['completed'])

const NOW_DATE = ref(Date.now())
const completed = ref(false)
const indexOfDays = ref(-1)
const indexOfHours = ref(-1)
const indexOfMinutes = ref(-1)
const indexOfSeconds = ref(-1)

onMounted(() => {
  setInterval(() => {
    NOW_DATE.value = Date.now()
  }, props.interval)
  indexOfDays.value = props.tpl.indexOf('d')
  indexOfHours.value = props.tpl.indexOf('h')
  indexOfMinutes.value = props.tpl.indexOf('m')
  indexOfSeconds.value = props.tpl.indexOf('s')
})

const countDownData = computed(() => {
  const timeSpacing = props.time - NOW_DATE.value
  if (timeSpacing < 0) {
    if (completed.value === false) {
      emit('completed')
    }
    setCompleted()
    return {
      day: '00',
      hour: '00',
      minute: '00',
      second: '00',
    }
  }
  let day = 0
  let hour = 0
  let minute = 0
  let second = 0
  if (indexOfDays.value !== -1) {
    day = Math.floor(timeSpacing / (24 * 60 * 60 * 1000))
    hour = Math.floor((timeSpacing % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000))
  } else {
    day = 0
    hour = Math.floor(timeSpacing / (60 * 60 * 1000))
  }
  if (indexOfHours.value !== -1) {
    hour = Math.floor((timeSpacing - day * 24 * 60 * 60 * 1000) / (60 * 60 * 1000))
    minute = Math.floor(
      ((timeSpacing - day * 24 * 60 * 60 * 1000) % (60 * 60 * 1000)) / (60 * 1000)
    )
  } else {
    hour = 0
    minute = Math.floor((timeSpacing - day * 24 * 60 * 60 * 1000) / (60 * 1000))
  }
  if (indexOfMinutes.value !== -1) {
    minute = Math.floor(
      (timeSpacing - day * 24 * 60 * 60 * 1000 - hour * 60 * 60 * 1000) / (60 * 1000)
    )
    second = Math.floor(
      ((timeSpacing - day * 24 * 60 * 60 * 1000 - hour * 60 * 60 * 1000) % (60 * 1000)) / 1000
    )
  } else {
    minute = 0
    second = Math.floor((timeSpacing - day * 24 * 60 * 60 * 1000 - hour * 60 * 60 * 1000) / 1000)
  }
  return {
    day: day < 10 ? '0' + day : '' + day,
    hour: hour < 10 ? '0' + hour : '' + hour,
    minute: minute < 10 ? '0' + minute : '' + minute,
    second: second < 10 ? '0' + second : '' + second,
  }
})

const mrItemBoxStyle = computed(() => {
  const _width = parseFloat(props.itemWidth)
  let _style = ''
  if (_width <= 0) {
    _style += `padding-left:24rpx;padding-right:24rpx;`
  } else {
    _style += `width:${props.itemWidth};`
  }
  return _style + props.itemBoxStyle
})

const mrIndicatorBoxStyle = computed(() => {
  let _style = ''
  if (props.indicatorWidth && props.indicatorWidth.length > 0) {
    _style = `width:${props.indicatorWidth};`
  }
  return _style + props.indicatorBoxStyle
})

function setCompleted() {
  completed.value = true
}

function getDot(prevTagIndex, nextTagIndex = -1) {
  if (nextTagIndex === -1) {
    return props.tpl.slice(prevTagIndex + 2)
  }
  return props.tpl.slice(prevTagIndex + 2, nextTagIndex - 1)
}
</script>

<style lang="scss" scoped></style>
