<template>
  <view class="n-flex-row n-wrap-nowrap" :style="boxStyle">
    <view :style="{ width: leftGap }"></view>
    <view class="n-flex-column n-flex-1">
      <slot name="left" :lefts="leftItems"></slot>
    </view>
    <view :style="{ width: columnGap }"></view>
    <view class="n-flex-column n-flex-1">
      <slot name="right" :rights="rightItems"></slot>
    </view>
    <view :style="{ width: rightGap }"></view>
  </view>
</template>

<script setup>
/**
 * n-waterfall-view
 * @description vue页面高性能瀑布。支持左右两列.头条小程序不支持作用域插槽,头条小程序直接写
 * @property {String} idLabel item的唯一值键
 * @property {Function} calculator 高度计算方法.不使用自动计算高度的，体验太差.高度难以确定的，根据元素内容预估高度即可.不提供就直接是左右各一个排下去
 * @property {String} columnGap 栏目之间的间距
 * @property {String} leftGap 内容距离左侧的间距
 * @property {String} rightGap 内容距离右侧的间距
 */
import { ref } from 'vue'
import { makeProps } from '../utils/props.js'

defineExpose({
  set,
  concat,
  remove,
  modify,
  clear,
  clearCache,
})

const props = defineProps(
  makeProps([
    ['idLabel', 'id'],
    ['calculator', null, Function],
    ['columnGap', '0'],
    ['leftGap', '0'],
    ['rightGap', '0'],
    'boxStyle',
  ])
)

const cached = ref({})
const leftItems = ref([])
const rightItems = ref([])
const leftH = ref(0)
const rightH = ref(0)

function clearCache(id) {
  if (typeof id === 'undefined') {
    delete cached.value['i_' + id]
    return
  }
  cached.value = {}
}
function clear() {
  leftItems.value = []
  rightItems.value = []
  leftH.value = 0
  rightH.value = 0
}
// 重新生成布局
function set(arr) {
  toGenerateItems(arr)
}
// 追加内容
function concat(arr) {
  toGenerateItems(arr)
}
// waterfall里面很少涉及移除内容，也不建议
function remove(id) {
  let idx = leftItems.value.findIndex((val) => {
    val[props.idLabel] === id
  })
  if (idx >= 0) {
    leftItems.value.splice(idx, 1)
    const h = leftH.value - (cached.value['i_' + id] || 0)
    delete cached.value['i_' + id]
    leftH.value = h >= 0 ? h : 0
    return
  }
  idx = rightItems.value.findIndex((val) => {
    val[props.idLabel] === id
  })
  if (idx >= 0) {
    rightItems.value.splice(idx, 1)
    const h = rightH.value - (cached.value['i_' + id] || 0)
    delete cached.value['i_' + id]
    rightH.value = h >= 0 ? h : 0
  }
}
// 在MP端，哪怕我们直接使用的items里面的对象
// 在作用域插槽下取得的值也不是那个对象
// (实际上，MP上哪怕是props传递过去的对象，传过去之后修改某个属性，也不会同步到原对象)
// 在这里，我们只改变插槽内的内容，外部内容用户自己处理
// waterfall只用来展示/不对数据进行修改/或者修改之后不影响样式宽高 是比较好的
function modify(id, key, value) {
  let idx = leftItems.value.findIndex((val) => {
    val[props.idLabel] === id
  })
  if (idx >= 0) {
    const theI = leftItems.value[idx]
    theI[key] = value
    return
  }
  idx = rightItems.value.findIndex((val) => {
    val[props.idLabel] === id
  })
  if (idx >= 0) {
    rightItems.value[idx][key] = value
  }
}
async function toGenerateItems(arr) {
  if (arr.length === 0) return
  console.log(
    '%c [ props.calculator ]-121',
    'font-size:13px; background:pink; color:#bf2c9f;',
    props.calculator
  )
  if (props.calculator) {
    for (const i in arr) {
      const theI = arr[i]
      const id = theI[props.idLabel]
      let h = 0
      const _cached = cached.value['i_' + id]
      if (!_cached || _cached.h === 0) {
        const _cal = props.calculator(theI)
        h = _cal.h
        cached.value['i_' + id] = _cal
        theI.mH = h
        theI.m = { ..._cal }
      } else {
        h = _cached.h
        theI.mH = h
        theI.m = { ..._cached }
      }
      if (leftH.value <= rightH.value) {
        leftItems.value.push(theI)
        leftH.value += h
      } else {
        rightItems.value.push(theI)
        rightH.value += h
      }
    }
    return
  }
  // 不提供计算器，直接左右左右...
  for (const i in arr) {
    if (leftItems.value.length <= rightItems.value.length) {
      leftItems.value.push(arr[i])
    } else {
      rightItems.value.push(arr[i])
    }
  }
}
</script>

<style lang="scss" scoped>
.n-water {
  white-space: nowrap;

  &-column {
    display: inline;
  }
}
</style>
