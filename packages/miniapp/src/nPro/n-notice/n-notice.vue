<template>
  <view
    v-if="showing"
    :class="[
      'n-flex-row',
      'n-align-center',
      'n-noticebar',
      'n-bg-' + bgType,
      'n-height-' + height,
      'n-border-' + border,
      'n-radius-' + radius,
    ]"
    :style="boxStyle"
    bubble="true"
    @tap.stop="noticeBarClicked"
  >
    <n-icon
      v-if="icon"
      :name="icon"
      :type="iconType"
      :size="iconSize"
      :iconStyle="iconStyle"
      :boxStyle="'margin-right:' + space + ';' + iconBoxStyle"
      @iconClicked="noticeBarClicked"
    ></n-icon>
    <text
      :class="['n-flex-1', 'n-lines-1', 'n-size-' + textSize, 'n-color-' + textType]"
      :style="textStyle"
      >{{ text }}</text
    >
    <n-icon
      v-if="indicator"
      :name="indicator"
      :type="indicatorType"
      :size="indicatorSize"
      :iconStyle="indicatorStyle"
      :boxStyle="'margin-left:' + space + ';' + indicatorBoxStyle"
      @iconClicked="indicatorClicked"
    ></n-icon>
  </view>
</template>

<script setup>
/**
 * n-notice
 * @description 提示组件
 * @property {String} icon 左侧图标
 * @property {String} text 文字内容
 * @property {String} indicator 右侧图标
 * @property {String} bgType = [nav|primary|success|warning|error|light|dark|inverse|custom|link|none|page|hover|mask|mask-dark|border|border-light|border-dark|gradient] 背景主题
 * @property {String} height = [ss|s|base|l|ll] 高度主题
 * @property {String} border = [all-light|all-dark|all-primary|all-success|all-warning|all-error|all-inverse|all-custom|all-link|top-light|top-dark|top-primary|top-success|top-warning|top-error|top-inverse|top-custom|top-link|right-light|right-dark|right-primary|right-success|right-warning|right-error|right-inverse|right-custom|right-link|bottom-light|bottom-dark|bottom-primary|bottom-success|bottom-warning|bottom-error|bottom-inverse|bottom-custom|bottom-link|left-light|left-dark|left-primary|left-success|left-warning|left-error|left-inverse|left-custom|left-link|none] 边框主题
 * @property {String} radius = [ss|s|base|l|ll|none] 圆角主题
 * @property {String} textType = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 文字颜色主题
 * @property {String} textSize = [ss|s|base|l|ll] 文字尺寸主题
 * @property {String} iconType = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 图标主题
 * @property {String} iconSize = [ss|s|base|l|ll] 图标尺寸主题
 * @property {String} iconStyle 图标样式
 * @property {String} indicatorType = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 右侧图标颜色主题
 * @property {String} indicatorSize = [ss|s|base|l|ll] 右侧图标尺寸主题
 * @property {String} indicatorStyle 右侧图标样式
 * @property {String} space 间距
 * @property {String} textStyle 文字样式
 * @property {String} boxStyle 外层样式
 * @property {String} iconBoxStyle 图标外层样式
 * @property {String} indicatorBoxStyle 右侧图标外层样式
 * @property {Boolean} closable = [true|false] 是否可以关闭
 */
import { ref } from 'vue'
import { makeProps } from '../utils/props.js'

const props = defineProps(
  makeProps([
    ['show', false],
    'icon',
    'text',
    'indicator',
    'bgType',
    ['height', 'base'],
    'border',
    'radius',
    ['textType', 'text'],
    ['textSize', 'base'],
    ['iconType', 'text'],
    ['iconSize', 'l'],
    'iconStyle',
    ['indicatorType', 'text'],
    ['indicatorSize', 'l'],
    'indicatorStyle',
    ['space', '12rpx'],
    'textStyle',
    'boxStyle',
    'iconBoxStyle',
    'indicatorBoxStyle',
    ['closable', false],
  ])
)
const emit = defineEmits(['noticeClicked', 'indicatorClicked'])
defineExpose({
  show,
  hide,
})

const showing = ref(props.show)

function show() {
  showing.value = true
}
function hide() {
  showing.value = false
}
function noticeBarClicked(e) {
  e.stopPropagation && e.stopPropagation()
  emit('noticeClicked')
}
function indicatorClicked() {
  if (props.closable) {
    showing.value = false
  } else {
    emit('indicatorClicked')
  }
}
</script>

<style lang="scss" scoped>
.n-noticebar {
  padding-left: 32rpx;
  padding-right: 32rpx;
}
</style>
