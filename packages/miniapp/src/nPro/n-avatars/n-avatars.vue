<template>
  <view
    :class="['n-flex-row', 'n-align-center', 'n-position-relative']"
    :style="mrBoxStyle + boxStyle"
    bubble="true"
  >
    <image
      v-for="(item, idx) in updatedItems"
      :key="idx"
      :src="label ? item[label] : item"
      :style="mrItemStyle(idx) + itemStyle"
      mode="aspectFill"
      @click.stop="toItem($event, item)"
    ></image>
  </view>
</template>

<script setup>
/**
 * n-avatars
 * @description 头像群
 * @property {Array} items 头像内容
 * @property {String} label 允许指定头像在内容中的字段
 * @property {Boolean} reverse = [true|false] 是否左侧图标在上面
 * @property {string} size 头像的大小
 * @property {String} space 头像之间的间距
 * @property {String} itemStyle 头像的外层样式
 * @property {String} boxStyle 外层样式
 * @event {Function} itemClicked 点击事件
 */
import { makeProps } from '../utils/props.js'
import { computed } from 'vue'

const props = defineProps(
  makeProps([
    ['items', []],
    'label',
    ['reverse', false],
    ['size', '66rpx'],
    ['space', '-16rpx'],
    'itemStyle',
    'boxStyle',
  ])
)
const emit = defineEmits(['itemClicked'])

const inReverse = computed(() => {
  return props.reverse && parseInt(props.space) < 0
})

const updatedItems = computed(() => {
  if (inReverse) {
    return props.items.slice().reverse()
  } else {
    return props.items
  }
})

const sizeNum = computed(() => {
  return parseFloat(props.size)
})
const spaceNum = computed(() => {
  return parseFloat(props.space)
})
const spaceUnit = computed(() => {
  if (props.space.indexOf('rpx') >= 0 || props.space.indexOf('upx') >= 0) {
    return 'rpx'
  }
  return 'px'
})
const mrBoxStyle = computed(() => {
  if (inReverse.value) {
    return `width:${(sizeNum.value + spaceNum.value) * props.items.length - spaceNum.value}${
      spaceUnit.value
    };height:${props.size};`
  }
  return ''
})

function mrItemStyle(idx) {
  let style = `width:${props.size};height:${props.size};border-radius:${props.size};`
  if (inReverse.value) {
    style += `position:absolute;right:${idx * (sizeNum.value + spaceNum.value)}${spaceUnit.value};`
  } else {
    style += idx > 0 ? `margin-left:${props.space};` : 'margin-left:0;'
  }
  return style
}

function toItem(e, val) {
  e && (e['item'] = val)
  emit('itemClicked', e)
  e && e.stopPropagation && e.stopPropagation()
}
</script>

<style></style>
