<template>
  <view
    :class="[
      'n-flex-row',
      'n-align-center',
      'n-justify-between',
      'n-bg-' + bgType,
      'n-height-' + height,
      'n-hover-' + hover + '-n',
    ]"
    :style="boxStyle"
    :hover-class="'n-hover-' + hover"
  >
    <view class="n-flex-row n-align-center" :style="leftStyle" bubble="true" @tap="leftClicked">
      <n-icon
        v-if="leftIcon1 && leftIcon1.length > 0"
        :name="leftIcon1"
        :type="leftIcon1Type"
        :size="leftIcon1Size"
        :iconStyle="leftIcon1Style"
        @iconClicked="leftClicked"
      ></n-icon>
      <text :class="['n-size-' + title1Size, 'n-color-' + title1Type]" :style="mrTitle1Style">{{
        title1
      }}</text>
      <n-icon
        v-if="leftIcon2 && leftIcon2.length > 0"
        :name="leftIcon2"
        :type="leftIcon2Type"
        :size="leftIcon2Size"
        :iconStyle="leftIcon2Style"
        @iconClicked="leftClicked"
      ></n-icon>
    </view>
    <view class="n-flex-row n-align-center" :style="centerStyle" bubble="true" @tap="centerClicked">
      <n-icon
        v-if="centerIcon1 && centerIcon1.length > 0"
        :name="centerIcon1"
        :type="centerIcon1Type"
        :size="centerIcon1Size"
        :iconStyle="centerIcon1Style"
        @iconClicked="centerClicked"
      ></n-icon>
      <text :class="['n-size-' + title2Size, 'n-color-' + title2Type]" :style="mrTitle2Style">{{
        title2
      }}</text>
      <n-icon
        v-if="centerIcon2 && centerIcon2.length > 0"
        :name="centerIcon2"
        :type="centerIcon2Type"
        :size="centerIcon2Size"
        :iconStyle="centerIcon2Style"
        @iconClicked="centerClicked"
      ></n-icon>
    </view>
    <view class="n-flex-row n-align-center" :style="rightStyle" bubble="true" @tap="rightClicked">
      <n-icon
        v-if="rightIcon1 && rightIcon1.length > 0"
        :name="rightIcon1"
        :type="rightIcon1Type"
        :size="rightIcon1Size"
        :iconStyle="rightIcon1Style"
        @iconClicked="rightClicked"
      ></n-icon>
      <text :class="['n-size-' + title3Size, 'n-color-' + title3Type]" :style="mrTitle3Style">{{
        title3
      }}</text>
      <n-icon
        v-if="rightIcon2 && rightIcon2.length > 0"
        :name="rightIcon2"
        :type="rightIcon2Type"
        :size="rightIcon2Size"
        :iconStyle="rightIcon2Style"
        @iconClicked="rightClicked"
      ></n-icon>
      <slot></slot>
    </view>
    <slot name="extra"></slot>
  </view>
</template>

<script setup>
/**
 * title
 * @description 标题栏
 * @property {String} title1 左侧标题
 * @property {String} title2 中间标题
 * @property {String} title3 右侧标题
 * @property {String} leftIcon1 左侧图标1
 * @property {String} leftIcon2 左侧图标2
 * @property {String} centerIcon1 中间图标1
 * @property {String} centerIcon2 中间图标2
 * @property {String} rightIcon1 右侧图标1
 * @property {String} rightIcon2 右侧图标2
 * @property {String} space icon-text-icon之间的间距
 * @property {String} height = [ss|s|base|l|ll] 高度主题
 * @property {String} hover = [opacity|bg|bg-dark|bg-opacity|none] hover主题
 * @property {String} bgType = [nav|primary|success|warning|error|light|dark|inverse|custom|link|none|page|hover|mask|mask-dark|border|border-light|border-dark|gradient] 背景主题
 * @property {String} title1Type = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 标题1的颜色主题
 * @property {String} title1Size = [ss|s|base|l|ll] 标题1的尺寸主题
 * @property {String} title1Style 标题1的样式
 * @property {String} title2Type = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 标题2的颜色主题
 * @property {String} title2Size = [ss|s|base|l|ll] 标题2的尺寸主题
 * @property {String} title2Style 标题2的样式
 * @property {String} title3Type = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 标题3的颜色主题
 * @property {String} title3Size = [ss|s|base|l|ll] 标题3的尺寸主题
 * @property {String} title3Style 标题3的样式
 * @property {String} leftIcon1Type = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 左侧图标1的颜色主题
 * @property {String} leftIcon1Size = [ss|s|base|l|ll] 左侧图标1的尺寸主题
 * @property {String} leftIcon1Style 左侧图标1的样式
 * @property {String} leftIcon2Type = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 左侧图标2的颜色主题
 * @property {String} leftIcon2Size = [ss|s|base|l|ll] 左侧图标2的尺寸主题
 * @property {String} leftIcon2Style 左侧图标2的样式
 * @property {String} centerIcon1Type = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 中间图标1的颜色主题
 * @property {String} centerIcon1Size = [ss|s|base|l|ll] 中间图标1的尺寸主题
 * @property {String} centerIcon1Style 中间图标1的样式
 * @property {String} centerIcon2Type = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 中间图标2的颜色主题
 * @property {String} centerIcon2Size = [ss|s|base|l|ll] 中间图标2的尺寸主题
 * @property {String} centerIcon2Style 中间图标2的样式
 * @property {String} rightIcon1Type = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 右侧图标1的颜色主题
 * @property {String} rightIcon1Size = [ss|s|base|l|ll] 右侧图标1的尺寸主题
 * @property {String} rightIcon1Style 右侧图标1的样式
 * @property {String} rightIcon2Type = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 右侧图标2的颜色主题
 * @property {String} rightIcon2Size = [ss|s|base|l|ll] 右侧图标2的尺寸主题
 * @property {String} rightIcon2Style 右侧图标2的样式
 * @property {String} boxStyle 外层样式
 * @property {String} leftStyle 左侧样式
 * @property {String} centerStyle 中间样式
 * @property {String} rightStyle 右侧样式
 * @event {Function} leftClicked 左点击事件
 * @event {Function} centerClicked 中点击事件
 * @event {Function} rightClicked 右点击事件
 */
import { computed } from 'vue'
import { makeProps } from '../utils/props.js'

const props = defineProps(
  makeProps([
    'title1',
    'title2',
    'title3',
    'leftIcon1',
    'leftIcon2',
    'centerIcon1',
    'centerIcon2',
    'rightIcon1',
    'rightIcon2',
    ['space', '12rpx'],
    ['height', 'l'],
    'hover',
    'bgType',
    ['title1Type', 'text'],
    ['title1Size', 'base'],
    'title1Style',
    ['title2Type', 'second'],
    ['title2Size', 'base'],
    'title2Style',
    ['title3Type', 'third'],
    ['title3Size', 'base'],
    'title3Style',
    ['leftIcon1Type', 'text'],
    ['leftIcon1Size', 'base'],
    'leftIcon1Style',
    ['leftIcon2Type', 'text'],
    ['leftIcon2Size', 'base'],
    'leftIcon2Style',
    ['centerIcon1Type', 'second'],
    ['centerIcon1Size', 'base'],
    'centerIcon1Style',
    ['centerIcon2Type', 'second'],
    ['centerIcon2Size', 'base'],
    'centerIcon2Style',
    ['rightIcon1Type', 'third'],
    ['rightIcon1Size', 'base'],
    'rightIcon1Style',
    ['rightIcon2Type', 'third'],
    ['rightIcon2Size', 'base'],
    'rightIcon2Style',
    'boxStyle',
    'leftStyle',
    'centerStyle',
    'rightStyle',
  ])
)
const emit = defineEmits(['leftClicked', 'centerClicked', 'rightClicked'])

const mrTitle1Style = computed(() => {
  let style = ''
  if (props.title1) {
    if (props.leftIcon1) {
      style += `margin-left:${props.space};`
    }
    if (props.leftIcon2) {
      style += `margin-right:${props.space};`
    }
  }
  return style + props.title1Style
})
const mrTitle2Style = computed(() => {
  let style = ''
  if (props.title2) {
    if (props.centerIcon1) {
      style += `margin-left:${props.space};`
    }
    if (props.centerIcon2) {
      style += `margin-right:${props.space};`
    }
  }
  return style + props.title2Style
})
const mrTitle3Style = computed(() => {
  let style = ''
  if (props.title3) {
    if (props.rightIcon1) {
      style += `margin-left:${props.space};`
    }
    if (props.rightIcon2) {
      style += `margin-right:${props.space};`
    }
  }
  return style + props.title3Style
})

function leftClicked() {
  emit('leftClicked')
}
function centerClicked() {
  emit('centerClicked')
}
function rightClicked() {
  emit('rightClicked')
}
</script>

<style lang="scss" scoped></style>
