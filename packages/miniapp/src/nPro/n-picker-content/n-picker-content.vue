<template>
  <view :class="['n-picker-box', 'n-flex-column', 'n-bg-' + bgType]" :style="mrBoxStyle">
    <picker-view
      v-if="mode === 's3' || mode === 's2' || mode === 's1'"
      class="n-flex-1"
      :indicator-style="mrIndicatorStyle"
      :value="pickVal"
      @change="bindChange"
    >
      <picker-view-column>
        <view
          class="n-flex-column n-align-center n-justify-center"
          :style="mrItemStyle"
          v-for="(item, index) in items.p || []"
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
            >{{ item[pl] }}</text
          >
        </view>
      </picker-view-column>
      <picker-view-column v-if="mode === 's2' || mode === 's3'">
        <view
          class="n-flex-column n-align-center n-justify-center"
          :style="mrItemStyle"
          v-for="(item, index) in items.c || []"
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
            >{{ item[cl] }}</text
          >
        </view>
      </picker-view-column>
      <picker-view-column v-if="mode === 's3'">
        <view
          class="n-flex-column n-align-center n-justify-center"
          :style="mrItemStyle"
          v-for="(item, index) in items.a || []"
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
            >{{ item[al] }}</text
          >
        </view>
      </picker-view-column>
    </picker-view>
  </view>
</template>

<script setup>
/**
 * n-picker-content
 * @description 选择器内容
 * @property {String} mode ['s3', 's2', 's1']
 * @property {Array} value 值，不是索引
 * @property {String} bgType = [nav|primary|success|warning|error|light|dark|inverse|custom|link|none|page|hover|mask|mask-dark|border|border-light|border-dark|gradient] 背景主题
 * @property {String} textType = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 选择项文字颜色主题
 * @property {String} textSize = [ss|s|base|l|ll] 选择项文字尺寸主题
 * @property {String} height 自定义的高度
 * @property {String} itemHeight 选择项自定义的高度
 * @property {String} boxStyle 外层样式
 * @property {String} itemStyle 选择项的外层样式
 * @property {String} textStyle 选择项的文字样式
 * @property {String} indicatorStyle indicator-style
 * @property {Array} selections 选择的内容
 * @property {Object} labelProps 对应选择内容的字段
 */
import { ref, computed, watch, nextTick } from 'vue'
import { makeProps } from '../utils/props.js'
import { getPx } from '../utils/system.js'

const props = defineProps(
  makeProps([
    ['mode', 's1'],
    ['value', [0, 0, 0]],
    ['bgType', 'inverse'],
    ['textType', 'inverse'],
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
const pl = computed(() => {
  return props.labelProps.s1 && props.labelProps.s1.label
})
const cl = computed(() => {
  return props.labelProps.s2 && props.labelProps.s2.label
})
const al = computed(() => {
  return props.labelProps.s3 && props.labelProps.s3.label
})
const pv = computed(() => {
  return props.labelProps.s1 && props.labelProps.s1.value
})
const cv = computed(() => {
  return props.labelProps.s2 && props.labelProps.s2.value
})
const av = computed(() => {
  return props.labelProps.s3 && props.labelProps.s3.value
})
const cTag = computed(() => {
  return props.labelProps.s2 && props.labelProps.s2.tag
})
const aTag = computed(() => {
  return props.labelProps.s3 && props.labelProps.s3.tag
})

const items = ref({})
const checkArr = ref([])
const checkValue = ref('')
const pickVal = ref([])
const resultStr = ref('')

watch(
  () => props.mode,
  () => {
    initData()
  }
)
watch(
  () => props.selections,
  () => {
    initData()
  }
)

initData()

function initData() {
  let data = {}
  const mode = props.mode
  let province, city, area
  // index of value
  let dVal = []
  if (mode === 's1' || mode === 's2' || mode === 's3') {
    // props.selections.length === 0 暂时不判断是否为空
    if (!props.selections) {
      return
    }
  }
  switch (mode) {
    case 's3':
      dVal = getSelectionsIndex(props.value)
      const cs = (props.selections[dVal[0]] || {})[cTag.value] || []
      const ass = (cs[dVal[1]] || {})[aTag.value] || []
      data = {
        p: props.selections || [],
        c: cs,
        a: ass,
      }
      break
    case 's2':
      dVal = getSelectionsIndex(props.value)
      data = {
        p: props.selections || [],
        c: (props.selections[dVal[0]] || {})[cTag.value] || [],
      }
      break
    case 's1':
      dVal = getSelectionsIndex(props.value)
      data = { p: props.selections || [] }
      break
  }
  items.value = data
  switch (mode) {
    case 's3':
      province = data.p[dVal[0]] || {}
      city = data.c[dVal[1]] || {}
      area = data.a[dVal[2]] || {}
      checkArr.value = [province[pl.value], city[cl.value], area[al.value]]
      checkValue.value = [province[pv.value], city[cv.value], area[av.value]]
      resultStr.value = province[pl.value] + city[cl.value] + area[al.value]
      break
    case 's2':
      province = data.p[dVal[0]] || {}
      city = data.c[dVal[1]] || {}
      checkArr.value = [province[pl.value], city[cl.value]]
      checkValue.value = [province[pv.value], city[cv.value]]
      resultStr.value = province[pl.value] + city[cl.value]
      break
    case 's1':
      province = data.p[dVal[0]] || data.p[data.p.length - 1] || {}
      checkArr.value = province[pl.value]
      checkValue.value = province[pv.value]
      resultStr.value = province[pl.value]
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
  // #ifdef APP-NVUE
  setTimeout(() => {
    pickVal.value = dVal
  }, 50)
  // #endif
}
/**
 * @param {Object} val
 * 在直接初始化的时候，就会触发bindchange。这时候用户还没有操作
 */
function bindChange(val) {
  let arr = Object.assign([], val.detail.value)
  let province, city, area
  let _checkArr = checkArr.value
  const mode = props.mode
  switch (mode) {
    case 's3':
      province = (items.value.p[arr[0]] || {})[pl.value]
      city = (items.value.c[arr[1]] || {})[cl.value]
      area = (items.value.a[arr[2]] || {})[al.value]
      if (province != _checkArr[0]) {
        items.value.c = (items.value.p[arr[0]] || {})[cTag.value]
        items.value.a = (items.value.c[arr[1]] || {})[aTag.value]
        arr[1] = 0
        arr[2] = 0
        city = (items.value.c[arr[1]] || {})[cl.value]
        area = (items.value.a[arr[2]] || {})[al.value]
      }
      if (city != _checkArr[1]) {
        items.value.a = (items.value.c[arr[1]] || {})[aTag.value]
        arr[2] = 0
        area = (items.value.a[arr[2]] || {})[al.value]
      }
      checkArr.value = [province, city, area]
      checkValue.value = [
        (items.value.p[arr[0]] || {})[pv.value],
        (items.value.c[arr[1]] || {})[cv.value],
        (items.value.a[arr[2]] || {})[av.value],
      ]
      resultStr.value = province + city + area
      break
    case 's2':
      province = (items.value.p[arr[0]] || {})[pl.value]
      city = (items.value.c[arr[1]] || {})[cl.value]
      if (province != _checkArr[0]) {
        items.value.c = (items.value.p[arr[0]] || {})[cTag.value]
        arr[1] = 0
        city = (items.value.c[arr[1]] || {})[cl.value]
      }
      checkArr.value = [province, city]
      checkValue.value = [
        (items.value.p[arr[0]] || {})[pv.value],
        (items.value.c[arr[1]] || {})[cv.value],
      ]
      resultStr.value = province + city
      break
    case 's1':
      province = items.value.p[arr[0]] || items.value.p[items.value.p.length - 1] || {}
      checkArr.value = province[pl.value]
      checkValue.value = province[pv.value]
      resultStr.value = province[pl.value]
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
function getSelectionsIndex(val) {
  // to get index of the defaultValue in selections for s1/s1/s3 mode
  if (props.mode === 's3') {
    let p = val[0]
    let c = val[1]
    let a = val[2]
    const ps = props.selections
    let cs = []
    let ass = []
    let pf = false
    let cf = false
    let af = false
    for (let i = 0; i < ps.length; i++) {
      const _p = ps[i]
      if (_p[pv.value] === p) {
        pf = true
        p = i
        cs = _p[cTag.value]
        break
      }
    }
    if (!pf) {
      return [0, 0, 0]
    }
    for (let i = 0; i < cs.length; i++) {
      const _c = cs[i]
      if (_c[cv.value] === c) {
        cf = true
        c = i
        ass = _c[aTag.value]
        break
      }
    }
    if (!cf) {
      return [p, 0, 0]
    }
    for (let i = 0; i < ass.length; i++) {
      const _a = ass[i]
      if (_a[av.value] === a) {
        af = true
        a = i
        break
      }
    }
    if (!af) {
      return [p, c, 0]
    }
    return [p, c, a]
  } else if (props.mode === 's2') {
    let p = val[0]
    let c = val[1]
    const ps = props.selections
    let cs = []
    let pf = false
    let cf = false
    for (let i = 0; i < ps.length; i++) {
      const _p = ps[i]
      if (_p[pv.value] === p) {
        pf = true
        p = i
        cs = _p[cTag.value]
        break
      }
    }
    if (!pf) {
      return [0, 0]
    }
    for (let i = 0; i < cs.length; i++) {
      const _c = cs[i]
      if (_c[cv.value] === c) {
        cf = true
        c = i
        break
      }
    }
    if (!cf) {
      return [p, 0]
    }
    return [p, c]
  } else {
    let p = val[0]
    const ps = props.selections
    let pf = false
    for (let i = 0; i < ps.length; i++) {
      const _p = ps[i]
      if (_p[pv.value] === p) {
        pf = true
        p = i
        break
      }
    }
    if (!pf) {
      return [0]
    }
    return [p]
  }
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
