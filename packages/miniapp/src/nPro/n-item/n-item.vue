<template>
  <view
    :class="[
      'n-flex-column',
      'n-align-center',
      'n-justify-center',
      'n-position-relative',
      'n-bg-' + bgType,
      'n-border-' + border,
      'n-radius-' + radius,
      'n-hover-' + hover + '-n',
    ]"
    :hover-class="'n-hover-' + hover"
    :style="boxStyle"
    bubble="true"
    @tap="toSelect"
  >
    <n-icon
      v-if="isIcon && icon"
      :name="icon"
      :type="iconType"
      :size="iconSize"
      :iconStyle="iconStyle"
      :boxStyle="iconBoxStyle"
      @iconClicked="toSelect"
    ></n-icon>
    <text
      v-if="!isIcon && icon"
      :class="['n-color-' + iconType, 'n-size-' + iconSize]"
      :style="iconStyle"
      >{{ icon }}</text
    >
    <text
      :class="['n-color-' + textType, 'n-size-' + textSize]"
      :style="'margin-top:' + space + ';' + textStyle"
      >{{ text }}</text
    >
    <slot></slot>
  </view>
</template>

<script setup>
/**
 * item
 * @description 简单的item展示
 * @property {String} icon 图标/图片/文字
 * @property {Boolean} isIcon = [true|false] 是否是图标
 * @property {String} text 文字
 * @property {String} space 图标与文字的间距
 * @property {String} bgType = [nav|primary|success|warning|error|light|dark|inverse|custom|link|none|page|hover|mask|mask-dark|border|border-light|border-dark|gradient] 背景主题
 * @property {String} border = [all-light|all-dark|all-primary|all-success|all-warning|all-error|all-inverse|all-custom|all-link|top-light|top-dark|top-primary|top-success|top-warning|top-error|top-inverse|top-custom|top-link|right-light|right-dark|right-primary|right-success|right-warning|right-error|right-inverse|right-custom|right-link|bottom-light|bottom-dark|bottom-primary|bottom-success|bottom-warning|bottom-error|bottom-inverse|bottom-custom|bottom-link|left-light|left-dark|left-primary|left-success|left-warning|left-error|left-inverse|left-custom|left-link|none] 边框主题
 * @property {String} radius = [ss|s|base|l|ll|none] 圆角主题
 * @property {String} hover = [opacity|bg|bg-dark|bg-opacity|none] hover主题
 * @property {String} iconType = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 图标颜色主题
 * @property {String} iconSize = [ss|s|base|l|ll] 图标尺寸主题
 * @property {String} iconStyle 图标样式
 * @property {String} iconBoxStyle 图标外层样式
 * @property {String} textType = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 文字颜色主题
 * @property {String} textSize = [ss|s|base|l|ll] 文字尺寸主题
 * @property {String} textStyle 文字样式
 * @property {String} boxStyle 外层样式
 * @event {Function} itemClicked 点击事件
 */
const emit = defineEmits(['itemClicked'])
const props = defineProps({
  /**
   * 图标/图片/文字
   */
  icon: {
    type: String,
    default: '',
  },
  /**
   * 是否是图标
   */
  isIcon: {
    type: Boolean,
    default: true,
  },
  /**
   * 文字
   */
  text: {
    type: String,
    default: '',
  },
  /**
   * 图标与文字的间距
   */
  space: {
    type: String,
    default: '12rpx',
  },
  /**
   * 背景主题
   */
  bgType: {
    type: String,
    default: '',
  },
  /**
   * 边框主题
   */
  border: {
    type: String,
    default: '',
  },
  /**
   * 圆角主题
   */
  radius: {
    type: String,
    default: '',
  },
  /**
   * hover主题
   */
  hover: {
    type: String,
    default: 'opacity',
  },
  /**
   * 图标颜色主题
   */
  iconType: {
    type: String,
    default: 'text',
  },
  /**
   * 图标尺寸主题
   */
  iconSize: {
    type: String,
    default: 'll',
  },
  /**
   * 图标样式
   */
  iconStyle: {
    type: String,
    default: '',
  },
  /**
   * 图标外层样式
   */
  iconBoxStyle: {
    type: String,
    default: '',
  },
  /**
   * 文字颜色主题
   */
  textType: {
    type: String,
    default: 'second',
  },
  /**
   * 文字尺寸主题
   */
  textSize: {
    type: String,
    default: 'base',
  },
  /**
   * 文字样式
   */
  textStyle: {
    type: String,
    default: '',
  },
  /**
   * 外层样式
   */
  boxStyle: {
    type: String,
    default: '',
  },
})

function toSelect() {
  emit('itemClicked')
}
</script>

<style lang="scss"></style>
