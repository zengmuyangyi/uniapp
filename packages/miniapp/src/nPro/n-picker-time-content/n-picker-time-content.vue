<template>
  <view :class="['n-picker-box', 'n-flex-column', 'n-bg-' + bgType]" :style="mrBoxStyle">
    <picker-view
      v-if="mode === 'date' || mode === 'yearMonth' || mode === 'dateTime' || mode == 'time'"
      class="n-flex-1"
      :indicator-style="mrIndicatorStyle"
      :value="pickVal"
      @change="bindChange"
    >
      <picker-view-column v-if="mode !== 'time'">
        <view
          class="n-flex-column n-align-center n-justify-center"
          :style="mrItemStyle"
          v-for="(item, index) in items.years"
          :key="index"
        >
          <text
            :class="[
              'n-picker-item-text',
              'n-lines-1',
              'n-color-' + textType,
              'n-size-' + textSize,
            ]"
            :style="textStyle"
            >{{ item }}年</text
          >
        </view>
      </picker-view-column>
      <picker-view-column v-if="mode !== 'time'">
        <view
          class="n-flex-column n-align-center n-justify-center"
          :style="mrItemStyle"
          v-for="(item, index) in items.months"
          :key="index"
        >
          <text
            :class="[
              'n-picker-item-text',
              'n-lines-1',
              'n-color-' + textType,
              'n-size-' + textSize,
            ]"
            :style="textStyle"
            >{{ item }}月</text
          >
        </view>
      </picker-view-column>
      <picker-view-column v-if="(mode === 'date' || mode === 'dateTime') && mode !== 'time'">
        <view
          class="n-flex-column n-align-center n-justify-center"
          :style="mrItemStyle"
          v-for="(item, index) in items.days"
          :key="index"
        >
          <text
            :class="[
              'n-picker-item-text',
              'n-lines-1',
              'n-color-' + textType,
              'n-size-' + textSize,
            ]"
            :style="textStyle"
            >{{ item }}日</text
          >
        </view>
      </picker-view-column>
      <picker-view-column v-if="mode === 'dateTime' || mode === 'time'">
        <view
          class="n-flex-column n-align-center n-justify-center"
          :style="mrItemStyle"
          v-for="(item, index) in items.hours"
          :key="index"
        >
          <text
            :class="[
              'n-picker-item-text',
              'n-lines-1',
              'n-color-' + textType,
              'n-size-' + textSize,
            ]"
            :style="textStyle"
            >{{ item }}时</text
          >
        </view>
      </picker-view-column>
      <picker-view-column v-if="mode === 'dateTime' || mode === 'time'">
        <view
          class="n-flex-column n-align-center n-justify-center"
          :style="mrItemStyle"
          v-for="(item, index) in items.minutes"
          :key="index"
        >
          <text
            :class="[
              'n-picker-item-text',
              'n-lines-1',
              'n-color-' + textType,
              'n-size-' + textSize,
            ]"
            :style="textStyle"
            >{{ item }}分</text
          >
        </view>
      </picker-view-column>
    </picker-view>
    <picker-view
      v-if="mode === 'dateRange' || mode === 'yearMonthRange'"
      class="n-flex-1"
      :indicator-style="mrIndicatorStyle"
      :value="pickVal"
      @change="bindChange"
    >
      <picker-view-column>
        <view
          class="n-flex-column n-align-center n-justify-center"
          :style="mrItemStyle"
          v-for="(item, index) in items.fYears"
          :key="index"
        >
          <text
            :class="[
              'n-picker-item-text',
              'n-lines-1',
              'n-color-' + textType,
              'n-size-' + textSize,
            ]"
            :style="textStyle"
            >{{ item }}</text
          >
        </view>
      </picker-view-column>
      <picker-view-column>
        <view
          class="n-flex-column n-align-center n-justify-center"
          :style="mrItemStyle"
          v-for="(item, index) in items.fMonths"
          :key="index"
        >
          <text
            :class="[
              'n-picker-item-text',
              'n-lines-1',
              'n-color-' + textType,
              'n-size-' + textSize,
            ]"
            :style="textStyle"
            >{{ item }}</text
          >
        </view>
      </picker-view-column>
      <picker-view-column v-if="mode === 'dateRange'">
        <view
          class="n-flex-column n-align-center n-justify-center"
          :style="mrItemStyle"
          v-for="(item, index) in items.fDays"
          :key="index"
        >
          <text
            :class="[
              'n-picker-item-text',
              'n-lines-1',
              'n-color-' + textType,
              'n-size-' + textSize,
            ]"
            :style="textStyle"
            >{{ item }}</text
          >
        </view>
      </picker-view-column>
      <picker-view-column>
        <view class="n-flex-column n-align-center n-justify-center" :style="mrRangeStyle">
          <text
            :class="[
              'n-picker-item-text',
              'n-lines-1',
              'n-color-' + rangeType,
              'n-size-' + rangeSize,
            ]"
            :style="rangeStyle"
            >{{ range }}</text
          >
        </view>
      </picker-view-column>
      <picker-view-column>
        <view
          class="n-flex-column n-align-center n-justify-center"
          :style="mrItemStyle"
          v-for="(item, index) in items.tYears"
          :key="index"
        >
          <text
            :class="[
              'n-picker-item-text',
              'n-lines-1',
              'n-color-' + textType,
              'n-size-' + textSize,
            ]"
            :style="textStyle"
            >{{ item }}</text
          >
        </view>
      </picker-view-column>
      <picker-view-column>
        <view
          class="n-flex-column n-align-center n-justify-center"
          :style="mrItemStyle"
          v-for="(item, index) in items.tMonths"
          :key="index"
        >
          <text
            :class="[
              'n-picker-item-text',
              'n-lines-1',
              'n-color-' + textType,
              'n-size-' + textSize,
            ]"
            :style="textStyle"
            >{{ item }}</text
          >
        </view>
      </picker-view-column>
      <picker-view-column v-if="mode === 'dateRange'">
        <view
          class="n-flex-column n-align-center n-justify-center"
          :style="mrItemStyle"
          v-for="(item, index) in items.tDays"
          :key="index"
        >
          <text
            :class="[
              'n-picker-item-text',
              'n-lines-1',
              'n-color-' + textType,
              'n-size-' + textSize,
            ]"
            :style="textStyle"
            >{{ item }}</text
          >
        </view>
      </picker-view-column>
    </picker-view>
    <picker-view
      v-if="mode === 'timeRange'"
      class="n-flex-1"
      :indicator-style="mrIndicatorStyle"
      :value="pickVal"
      @change="bindChange"
    >
      <picker-view-column>
        <view
          class="n-flex-column n-align-center n-justify-center"
          :style="mrItemStyle"
          v-for="(item, index) in items.fHours"
          :key="index"
        >
          <text
            :class="[
              'n-picker-item-text',
              'n-lines-1',
              'n-color-' + textType,
              'n-size-' + textSize,
            ]"
            :style="textStyle"
            >{{ item }}时</text
          >
        </view>
      </picker-view-column>
      <picker-view-column>
        <view
          class="n-flex-column n-align-center n-justify-center"
          :style="mrItemStyle"
          v-for="(item, index) in items.fMinutes"
          :key="index"
        >
          <text
            :class="[
              'n-picker-item-text',
              'n-lines-1',
              'n-color-' + textType,
              'n-size-' + textSize,
            ]"
            :style="textStyle"
            >{{ item }}分</text
          >
        </view>
      </picker-view-column>
      <picker-view-column>
        <view class="n-flex-column n-align-center n-justify-center" :style="mrRangeStyle">
          <text
            :class="[
              'n-picker-item-text',
              'n-lines-1',
              'n-color-' + rangeType,
              'n-size-' + rangeSize,
            ]"
            :style="rangeStyle"
            >{{ range }}</text
          >
        </view>
      </picker-view-column>
      <picker-view-column>
        <view
          class="n-flex-column n-align-center n-justify-center"
          :style="mrItemStyle"
          v-for="(item, index) in items.tHours"
          :key="index"
        >
          <text
            :class="[
              'n-picker-item-text',
              'n-lines-1',
              'n-color-' + textType,
              'n-size-' + textSize,
            ]"
            :style="textStyle"
            >{{ item }}时</text
          >
        </view>
      </picker-view-column>
      <picker-view-column>
        <view
          class="n-flex-column n-align-center n-justify-center"
          :style="mrItemStyle"
          v-for="(item, index) in items.tMinutes"
          :key="index"
        >
          <text
            :class="[
              'n-picker-item-text',
              'n-lines-1',
              'n-color-' + textType,
              'n-size-' + textSize,
            ]"
            :style="textStyle"
            >{{ item }}分</text
          >
        </view>
      </picker-view-column>
    </picker-view>
  </view>
</template>

<script setup>
/**
 * n-picker-time-content
 * @descriptions
 * @property {String} mode ['date'/年月日, 'dateTime'/年月日时分, 'yearMonth'/年月,
 * 'time'/时分, 'dateRange'/年月日, 'yearMonthRange'/年月, 'timeRange'/时分]
 * @property {Array} value 值，不是索引
 * @property {Boolean} useCurrent = [true|false] 是否使用当前时间
 * @property {String} start 年份year的开始
 * @property {String} end 年份year的结束
 * @property {Boolean} includeBefore = [true|false] 是否允许以前的时间，仅仅只是用在带年份选择的mode上
 * @property {Boolean} includeAfter = [true|false] 是否允许未来的时间
 * @property {String} range 范围选择分隔符
 * @property {String} bgType = [nav|primary|success|warning|error|light|dark|inverse|custom|link|none|page|hover|mask|mask-dark|border|border-light|border-dark|gradient] 背景色主题
 * @property {String} textType = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 选择项的文字颜色主题
 * @property {String} textSize = [ss|s|base|l|ll] 选择项的文字尺寸主题
 * @property {String} height 自定义高度
 * @property {String} itemHeight 选择项的自定义高度
 * @property {String} boxStyle 外层样式
 * @property {String} itemStyle 选择项的外层样式
 * @property {String} textStyle 选择项的文字样式
 * @property {String} indicatorStyle ndicator-style
 * @property {String} rangeType = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 范围分隔符的颜色主题
 * @property {String} rangeSize = [ss|s|base|l|ll] 范围分隔符的尺寸主题
 * @property {String} rangeBoxStyle 范围分隔符的外层样式
 * @property {String} rangeStyle 范围分隔符的样式
 */
import { ref, computed, watch, nextTick } from 'vue'
import dateMaker from './date.js'

import { getPx } from '../utils/system.js'
import { makeProps } from '../utils/props.js'

const props = defineProps(
  makeProps([
    ['mode', 'date'],
    ['value', [0, 0, 0, 0, 0, 0, 0]],
    ['useCurrent', false],
    ['start', '1970'],
    ['end', new Date().getFullYear() + ''],
    ['includeBefore', true],
    ['includeAfter', true],
    ['range', '-'],
    ['bgType', 'inverse'],
    ['textType', 'text'],
    ['textSize', 'base'],
    ['height', '500rpx'],
    ['itemHeight', '100rpx'],
    'boxStyle',
    'itemStyle',
    'textStyle',
    'indicatorStyle',
    ['rangeType', 'text'],
    ['rangeSize', 'base'],
    'rangeBoxStyle',
    'rangeStyle',
  ])
)
const emit = defineEmits(['inited', 'change'])

const heightPx = computed(() => {
  return getPx(props.height)
})
const itemHeightPx = computed(() => {
  return getPx(props.itemHeight)
})
const mrBoxStyle = computed(() => {
  return `height:${heightPx.value}px;` + props.boxStyle
})
const mrIndicatorStyle = computed(() => {
  return `height:${itemHeightPx.value}px;` + props.indicatorStyle
})
const mrItemStyle = computed(() => {
  return `height:${itemHeightPx.value}px;` + props.itemStyle
})
const mrRangeStyle = computed(() => {
  return `height:${itemHeightPx.value}px;` + props.rangeBoxStyle
})

const items = ref({})
const checkArr = ref([])
const checkValue = ref([])
const pickVal = ref([])
const resultStr = ref('')
let now = new Date()

initData()

watch(
  () => props.mode,
  () => {
    initData()
  }
)
watch(
  () => props.show,
  (newV) => {
    if (newV) {
      if (!props.includeBefore || !props.includeAfter) {
        initData() // re-init
      }
    }
  }
)

function initData() {
  now = new Date()
  let data = {}
  const mode = props.mode
  let year, month, day, hour, minute
  // index of value
  let dVal = []
  switch (mode) {
    case 'dateRange':
    case 'yearMonthRange':
    case 'timeRange':
      data = dateMaker.range.init(
        mode,
        now,
        props.value,
        props.useCurrent,
        props.start,
        props.end,
        props.includeBefore,
        props.includeAfter
      )
      dVal = data.defaultArr
      break
    default:
      data = dateMaker.date.init(
        mode,
        now,
        props.value,
        props.useCurrent,
        props.start,
        props.end,
        props.includeBefore,
        props.includeAfter
      )
      dVal = data.defaultArr
      break
  }
  items.value = data
  switch (mode) {
    case 'dateRange':
      let fYear = data.fYears[dVal[0]] || data.fYears[data.fYears.length - 1]
      let fMonth = data.fMonths[dVal[1]] || data.fMonths[data.fMonths.length - 1]
      let fDay = data.fDays[dVal[2]] || data.fDays[data.fDays.length - 1]
      let tYear = data.tYears[dVal[4]] || data.tYears[data.tYears.length - 1]
      let tMonth = data.tMonths[dVal[5]] || data.tMonths[data.tMonths.length - 1]
      let tDay = data.tDays[dVal[6]] || data.tDays[data.tDays.length - 1]
      checkArr.value = [fYear, fMonth, fDay, tYear, tMonth, tDay]
      resultStr.value = `${
        fYear + '-' + fMonth + '-' + fDay + '至' + tYear + '-' + tMonth + '-' + tDay
      }`
      break
    case 'yearMonthRange':
      let _fYear = data.fYears[dVal[0]] || data.fYears[data.fYears.length - 1]
      let _fMonth = data.fMonths[dVal[1]] || data.fMonths[data.fMonths.length - 1]
      let _tYear = data.tYears[dVal[3]] || data.tYears[data.tYears.length - 1]
      let _tMonth = data.tMonths[dVal[4]] || data.tMonths[data.tMonths.length - 1]
      checkArr.value = [_fYear, _fMonth, _tYear, _tMonth]
      resultStr.value = `${_fYear + '-' + _fMonth + '至' + _tYear + '-' + _tMonth}`
      break
    case 'timeRange':
      break
    case 'date':
      year = data.years[dVal[0]] || data.years[data.years.length - 1]
      month = data.months[dVal[1]] || data.months[data.months.length - 1]
      day = data.days[dVal[2]] || data.days[data.days.length - 1]
      checkArr.value = [year, month, day]
      resultStr.value = `${year + '-' + month + '-' + day}`
      break
    case 'yearMonth':
      year = data.years[dVal[0]] || data.years[data.years.length - 1]
      month = data.months[dVal[1]] || data.months[data.months.length - 1]
      checkArr.value = [year, month]
      resultStr.value = `${year + '-' + month}`
      break
    case 'dateTime':
      year = data.years[dVal[0]] || data.years[data.years.length - 1]
      month = data.months[dVal[1]] || data.months[data.months.length - 1]
      day = data.days[dVal[2]] || data.days[data.days.length - 1]
      hour = data.hours[dVal[3]] || data.hours[data.hours.length - 1]
      minute = data.minutes[dVal[4]] || data.minutes[data.minutes.length - 1]
      resultStr.value = `${year + '-' + month + '-' + day + ' ' + hour + ':' + minute}`
      checkArr.value = [year, month, day, hour, minute]
      break
    case 'time':
      hour = data.hours[dVal[0]] || data.hours[data.hours.length - 1]
      minute = data.minutes[dVal[1]] || data.minutes[data.minutes.length - 1]
      checkArr.value = [hour, minute]
      resultStr.value = `${hour + ':' + minute}`
      break
  }
  emit('inited', {
    checkArr: checkArr.value,
    checkValue: checkValue.value,
    defaultVal: dVal,
    result: resultStr.value,
  })
  // we must set default-data in nextTick, or mp will not show the current index
  // #ifndef APP-NVUE
  nextTick(() => {
    pickVal.value = dVal
  })
  // #endif
  // in android-app, we must set timeout, the nextTick may not correct
  // #ifdef APP-NVUE
  pickVal.value = dVal
  // setTimeout(()=>{
  // pickVal.value = dVal
  // }, 50)
  // #endif
}
function bindChange(val) {
  let arr = Object.assign([], val.detail.value)
  let year = '',
    month = '',
    day = '',
    hour = '',
    minute = ''
  let _checkArr = checkArr.value
  let days = []
  let months = []
  const mode = props.mode
  switch (mode) {
    case 'date':
      year = items.value.years[arr[0]] || items.value.years[items.value.years.length - 1]
      if (year != _checkArr[0]) {
        months = dateMaker.date.initMonths(
          now,
          year,
          items.value.years,
          props.includeBefore,
          props.includeAfter
        )
        items.value.months = months
        // #ifdef APP-NVUE
        if (arr[1] > months.length - 1) {
          arr[1] = months.length - 1
        }
        // #endif
      }
      month = items.value.months[arr[1]] || items.value.months[items.value.months.length - 1]
      if (year != _checkArr[0] || month != _checkArr[1]) {
        days = dateMaker.date.initDays(
          now,
          year,
          month,
          items.value.years,
          items.value.months,
          props.includeBefore,
          props.includeAfter
        )
        items.value.days = days
        // #ifdef APP-NVUE
        if (arr[2] > days.length - 1) {
          arr[2] = days.length - 1
        }
        // #endif
      }
      day = items.value.days[arr[2]] || items.value.days[items.value.days.length - 1]
      checkArr.value = [year, month, day]
      resultStr.value = `${year + '-' + month + '-' + day}`
      break
    case 'yearMonth':
      year = items.value.years[arr[0]] || items.value.years[items.value.years.length - 1]
      if (year != _checkArr[0]) {
        months = dateMaker.date.initMonths(
          now,
          year,
          items.value.years,
          props.includeBefore,
          props.includeAfter
        )
        items.value.months = months
        // #ifdef APP-NVUE
        if (arr[1] > months.length - 1) {
          arr[1] = months.length - 1
        }
        // #endif
      }
      month = items.value.months[arr[1]] || items.value.months[items.value.months.length - 1]
      checkArr.value = [year, month]
      resultStr.value = `${year + '-' + month}`
      break
    case 'dateTime':
      year = items.value.years[arr[0]] || items.value.years[items.value.years.length - 1]
      if (year !== _checkArr[0]) {
        months = dateMaker.date.initMonths(
          now,
          year,
          items.value.years,
          props.includeBefore,
          props.includeAfter
        )
        items.value.months = months
        // #ifdef APP-NVUE
        if (arr[1] > months.length - 1) {
          arr[1] = months.length - 1
        }
        // #endif
      }
      month = items.value.months[arr[1]] || items.value.months[items.value.months.length - 1]
      if (year != _checkArr[0] || month != _checkArr[1]) {
        days = dateMaker.date.initDays(
          now,
          year,
          month,
          items.value.years,
          items.value.months,
          props.includeBefore,
          props.includeAfter
        )
        items.value.days = days
        // #ifdef APP-NVUE
        if (arr[2] > days.length - 1) {
          arr[2] = days.length - 1
        }
        // #endif
      }
      day = items.value.days[arr[2]] || items.value.days[items.value.days.length - 1]
      if (year != _checkArr[0] || month != _checkArr[1] || day != _checkArr[2]) {
        const hms = dateMaker.date.initHoursMinutes(
          now,
          year,
          month,
          day,
          items.value.years,
          items.value.months,
          items.value.days,
          props.includeBefore,
          props.includeAfter
        )
        items.value.hours = hms.hours
        items.value.minutes = hms.minutes
        // #ifdef APP-NVUE
        if (arr[3] > hms.hours.length - 1) {
          arr[3] = hms.hours.length - 1
        }
        // #endif
      }
      hour = items.value.hours[arr[3]] || items.value.hours[items.value.hours.length - 1]
      minute = items.value.minutes[arr[4]] || items.value.minutes[value.items.minutes.length - 1]
      checkArr.value = [year, month, day, hour, minute]
      resultStr.value = `${year + '-' + month + '-' + day + ' ' + hour + ':' + minute}`
      break
    case 'time':
      hour = items.value.hours[arr[0]] || items.value.hours[items.value.hours.length - 1]
      if (hour !== _checkArr[0]) {
        const mns = dateMaker.date.initMinutes(
          now,
          hour,
          items.value.hours,
          props.includeBefore,
          props.includeAfter
        )
        items.value.minutes = mns
        // #ifdef APP-NVUE
        if (arr[1] > mns.length - 1) {
          arr[1] = mns.length - 1
        }
        // #endif
      }
      minute = items.value.minutes[arr[1]] || items.value.minutes[items.value.minutes.length - 1]
      checkArr.value = [hour, minute]
      resultStr.value = `${hour + ':' + minute}`
      break
    case 'dateRange':
      let fYear = items.value.fYears[arr[0]] || items.value.fYears[items.value.fYears.length - 1]
      if (fYear != _checkArr[0]) {
        const drms = dateMaker.date.initMonths(
          now,
          fYear,
          items.value.fYears,
          props.includeBefore,
          props.includeAfter
        )
        items.value.fMonths = drms
        // #ifdef APP-NVUE
        if (arr[1] > drms.length - 1) {
          arr[1] = drms.length - 1
        }
        // #endif
      }
      let fMonth =
        items.value.fMonths[arr[1]] || items.value.fMonths[items.value.fMonths.length - 1]
      if (fYear != _checkArr[0] || fMonth != _checkArr[1]) {
        const drds = dateMaker.date.initDays(
          now,
          fYear,
          fMonth,
          items.value.fYears,
          items.value.fMonths,
          props.includeBefore,
          props.includeAfter
        )
        items.value.fDays = drds
        // #ifdef APP-NVUE
        if (arr[2] > drds.length - 1) {
          arr[2] = drds.length - 1
        }
        // #endif
      }
      let fDay = items.value.fDays[arr[2]] || items.value.fDays[items.value.fDays.length - 1]

      let tYear = items.value.tYears[arr[4]] || items.value.tYears[items.value.tYears.length - 1]
      let tMonth =
        items.value.tMonths[arr[5]] || items.value.tMonths[items.value.tMonths.length - 1]
      let tDay = items.value.tDays[arr[6]] || items.value.tDays[items.value.tDays.length - 1]
      if (fYear != _checkArr[0] || fMonth != _checkArr[1] || fDay != _checkArr[2]) {
        const abc = dateMaker.date.init(
          'date',
          now,
          arr.slice(4),
          false,
          fYear,
          props.end,
          props.includeBefore,
          props.includeAfter
        )
        items.value.tYears = abc.years
        items.value.tMonths = abc.months
        items.value.tDays = abc.days
        arr[4] = abc.defaultArr[0]
        arr[5] = abc.defaultArr[1]
        arr[6] = abc.defaultArr[2]
        tYear = items.value.tYears[arr[4]] || items.value.tYears[items.value.tYears.length - 1]
        tMonth = items.value.tMonths[arr[5]] || items.value.tMonths[items.value.tMonths.length - 1]
        tDay = items.value.tDays[arr[6]] || items.value.tDays[items.value.tDays.length - 1]
      } else {
        if (tYear != _checkArr[4]) {
          const drms = dateMaker.date.initMonths(
            now,
            tYear,
            items.value.tYears,
            props.includeBefore,
            props.includeAfter
          )
          items.value.tMonths = drms
          // #ifdef APP-NVUE
          if (arr[5] > drms.length - 1) {
            arr[5] = drms.length - 1
          }
          // #endif
        }
        tMonth = items.value.tMonths[arr[5]] || items.value.tMonths[items.value.tMonths.length - 1]
        if (tYear != _checkArr[4] || tMonth != _checkArr[5]) {
          const drds = dateMaker.date.initDays(
            now,
            tYear,
            tMonth,
            items.value.tYears,
            items.value.tMonths,
            props.includeBefore,
            props.includeAfter
          )
          items.value.tDays = drds
          // #ifdef APP-NVUE
          if (arr[6] > drds.length - 1) {
            arr[6] = drds.length - 1
          }
          // #endif
        }
        tDay = items.value.tDays[arr[6]] || items.value.tDays[items.value.tDays.length - 1]
      }
      checkArr.value = [fYear, fMonth, fDay, tYear, tMonth, tDay]
      resultStr.value = `${
        fYear + '-' + fMonth + '-' + fDay + '至' + tYear + '-' + tMonth + '-' + tDay
      }`
      break
    case 'yearMonthRange':
      let _fYear = items.value.fYears[arr[0]] || items.value.fYears[items.value.fYears.length - 1]
      if (_fYear != _checkArr[0]) {
        const drms = dateMaker.date.initMonths(
          now,
          _fYear,
          items.value.fYears,
          props.includeBefore,
          props.includeAfter
        )
        items.value.fMonths = drms
        // #ifdef APP-NVUE
        if (arr[1] > drms.length - 1) {
          arr[1] = drms.length - 1
        }
        // #endif
      }
      let _fMonth =
        items.value.fMonths[arr[1]] || items.value.fMonths[items.value.fMonths.length - 1]

      let _tYear = items.value.tYears[arr[3]] || items.value.tYears[items.value.tYears.length - 1]
      let _tMonth =
        items.value.tMonths[arr[4]] || items.value.tMonths[items.value.tMonths.length - 1]
      if (_fYear != _checkArr[0] || _fMonth != _checkArr[1]) {
        const abc = dateMaker.date.init(
          'yearMonth',
          now,
          arr.slice(3),
          false,
          _fYear,
          props.end,
          props.includeBefore,
          props.includeAfter
        )
        items.value.tYears = abc.years
        items.value.tMonths = abc.months
        arr[3] = abc.defaultArr[0]
        arr[4] = abc.defaultArr[1]
        _tYear = items.value.tYears[arr[3]] || items.value.tYears[items.value.tYears.length - 1]
        _tMonth = items.value.tMonths[arr[4]] || items.value.tMonths[items.value.tMonths.length - 1]
      } else {
        if (_tYear != _checkArr[3]) {
          const drms = dateMaker.date.initMonths(
            now,
            _tYear,
            items.value.tYears,
            props.includeBefore,
            props.includeAfter
          )
          items.value.tMonths = drms
          // #ifdef APP-NVUE
          if (arr[4] > drms.length - 1) {
            arr[4] = drms.length - 1
          }
          // #endif
        }
        _tMonth = items.value.tMonths[arr[4]] || items.value.tMonths[items.value.tMonths.length - 1]
      }
      checkArr.value = [_fYear, _fMonth, _tYear, _tMonth]
      resultStr.value = `${_fYear + '-' + _fMonth + '至' + _tYear + '-' + _tMonth}`
      break
    case 'timeRange':
      let fHour = items.value.fHours[arr[0]] || items.value.fHours[items.value.fHours.length - 1]
      if (fHour != _checkArr[0]) {
        const trms = dateMaker.date.initMinutes(
          now,
          fHour,
          items.value.fHours,
          props.includeBefore,
          props.includeAfter
        )
        items.value.fMinutes = trms
        // #ifdef APP-NVUE
        if (arr[1] > trms.length - 1) {
          arr[1] = trms.length - 1
        }
        // #endif
      }
      let fMinute =
        items.value.fMinutes[arr[1]] || items.value.fMinutes[items.value.fMinutes.length - 1]

      let tHour = items.value.tHours[arr[3]] || items.value.tHours[items.value.tHours.length - 1]
      let tMinute =
        items.value.tMinutes[arr[4]] || items.value.tMinutes[items.value.tMinutes.length - 1]
      if (fHour != _checkArr[0] || fMinute != _checkArr[1]) {
        const abc = dateMaker.date.init(
          'time',
          now,
          arr.slice(3),
          false,
          fHour,
          props.end,
          props.includeBefore,
          props.includeAfter
        )
        console.log(abc)
        items.value.tHours = abc.hours
        items.value.tMinutes = abc.minutes
        arr[3] = abc.defaultArr[0]
        arr[4] = abc.defaultArr[1]
        tHour = items.value.tHours[arr[3]] || items.value.tHours[items.value.tHours.length - 1]
        tMinute =
          items.value.tMinutes[arr[4]] || items.value.tMinutes[items.value.tMinutes.length - 1]
      } else {
        if (tHour != _checkArr[3]) {
          const drms = dateMaker.date.initMinutes(
            now,
            tHour,
            items.value.tHours,
            props.includeBefore,
            props.includeAfter
          )
          items.value.tMinutes = drms
          // #ifdef APP-NVUE
          if (arr[4] > drms.length - 1) {
            arr[4] = drms.length - 1
          }
          // #endif
        }
        tMinute =
          items.value.tMinutes[arr[4]] || items.value.tMinutes[items.value.tMinutes.length - 1]
      }
      checkArr.value = [fHour, fMinute, tHour, tMinute]
      resultStr.value = `${fHour + '-' + fMinute + '至' + tHour + '-' + tMinute}`
      break
  }
  pickVal.value = arr
  emit('change', {
    checkArr: checkArr.value,
    checkValue: checkValue.value,
    defaultVal: pickVal.value,
    result: resultStr.value,
  })
  /*
		nextTick(() => {
			pickVal.value = arr
		})*/
}
</script>

<style lang="scss" scoped>
.n-picker {
  &-box {
    overflow: hidden;
  }
  &-item {
    &-text {
      text-align: center;
    }
  }
}
</style>
