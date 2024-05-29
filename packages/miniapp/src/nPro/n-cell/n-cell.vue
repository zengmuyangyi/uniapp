<template>
  <view
    :class="[
      'n-cell',
      'n-position-relative',
      'n-flex-row',
      'n-align-center',
      'n-wrap-nowrap',
      'n-bg-' + bgType,
      'n-height-' + height,
      'n-radius-' + radius,
      'n-border-' + border,
      'n-hover-' + hover + '-n',
    ]"
    :style="boxStyle"
    :hover-class="'n-hover-' + hover"
    bubble="true"
    @tap.stop="clicked"
  >
    <n-icon
      v-if="icon && icon.length > 0"
      :name="icon"
      :type="iconType"
      :size="iconSize"
      :iconStyle="iconStyle"
      :boxStyle="'margin-right:' + space + ';' + iconBoxStyle"
      @iconClicked="clicked"
    ></n-icon>
    <slot name="label">
      <text
        v-if="title && title.length > 0"
        :class="['n-color-' + titleType, 'n-size-' + titleSize]"
        :style="'margin-right:' + space + ';' + titleStyle"
        >{{ title }}</text
      >
    </slot>
    <slot>
      <text
        :class="[
          'n-text-align-' + valueAlign,
          'n-flex-1',
          'n-lines-' + valueLines,
          'n-color-' + valueType,
          'n-size-' + valueSize,
          'n-lh-' + valueLh,
        ]"
        :style="valueStyle"
        >{{ value }}</text
      >
    </slot>
    <!-- custom right extra view -->
    <slot name="extra"></slot>
    <n-icon
      v-if="indicator && indicator.length > 0"
      :name="indicator"
      :type="indicatorType"
      :size="indicatorSize"
      :iconStyle="indicatorStyle"
      :boxStyle="'margin-left:' + space + ';' + indicatorBoxStyle"
      @iconClicked="clicked"
    ></n-icon>
    <slot name="more"></slot>
  </view>
</template>

<script setup>
/**
 * cell
 * @description 横向单元
 * @property {String} icon 左侧图标
 * @property {String} title 左侧标题
 * @property {String} value 具体/描述内容
 * @property {String} indicator 右侧图标
 * @property {String} bgType = [nav|primary|success|warning|error|light|dark|inverse|custom|link|none|page|hover|mask|mask-dark|border|border-light|border-dark|gradient] 背景主题
 * @property {String} titleType = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 标题颜色主题
 * @property {String} valueType = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 内容颜色主题
 * @property {String} iconType = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 左侧图标颜色主题
 * @property {String} indicatorType = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 右侧图标颜色主题
 * @property {String} titleSize = [ss|s|base|l|ll] 标题尺寸主题
 * @property {String} valueSize = [ss|s|base|l|ll] 内容尺寸主题
 * @property {String} valueAlign 内容排版主题
 * @property {String} valueLines 内容的最大行数
 * @property {String} valueLh 内容的行高
 * @property {String} iconSize = [ss|s|base|l|ll] 左侧图标尺寸主题
 * @property {String} indicatorSize = [ss|s|base|l|ll] 右侧图标尺寸主题
 * @property {String} height = [ss|s|base|l|ll] 高度主题
 * @property {String} radius = [ss|s|base|l|ll|none] 圆角主题
 * @property {String} border = [all-light|all-dark|all-primary|all-success|all-warning|all-error|all-inverse|all-custom|all-link|top-light|top-dark|top-primary|top-success|top-warning|top-error|top-inverse|top-custom|top-link|right-light|right-dark|right-primary|right-success|right-warning|right-error|right-inverse|right-custom|right-link|bottom-light|bottom-dark|bottom-primary|bottom-success|bottom-warning|bottom-error|bottom-inverse|bottom-custom|bottom-link|left-light|left-dark|left-primary|left-success|left-warning|left-error|left-inverse|left-custom|left-link|none] 边框主题
 * @property {String} hover = [opacity|bg|bg-dark|bg-opacity|none] hover点击效果
 * @property {String} space 文字与图标间距
 * @property {String} iconStyle 左侧图标样式
 * @property {String} indicatorStyle 右侧图标样式
 * @property {String} boxStyle 外层样式
 * @property {String} titleStyle 标题样式
 * @property {String} valueStyle 内容样式
 * @property {String} iconBoxStyle 左侧图标外层样式
 * @property {String} indicatorBoxStyle 右侧图标外层样式
 * @event {Function} cellClicked 点击事件
 */
import { makeProps } from '../utils/props.js'

const props = defineProps(
  makeProps([
    'icon',
    'title',
    'value',
    'indicator',
    'bgType',
    ['titleType', 'text'],
    ['valueType', 'second'],
    ['iconType', 'text'],
    ['indicatorType', 'second'],
    ['titleSize', 'base'],
    ['valueSize', 's'],
    ['valueAlign', 'right'],
    ['valueLines', '1'],
    ['valueLh', 's'],
    ['iconSize', 'base'],
    ['indicatorSize', 'base'],
    ['height', 'l'],
    ['radius', 'base'],
    'border',
    ['hover', 'bg'],
    ['space', '12rpx'],
    'iconStyle',
    'indicatorStyle',
    'boxStyle',
    'titleStyle',
    'valueStyle',
    'iconBoxStyle',
    'indicatorBoxStyle',
  ])
)
const emit = defineEmits(['cellClicked'])

function clicked(e) {
  emit('cellClicked', e)
  e && e.stopPropagation && e.stopPropagation()
}
</script>

<style lang="scss" scoped>
.n-cell {
  padding-left: 32rpx;
  padding-right: 32rpx;
}
</style>
