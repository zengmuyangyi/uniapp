<template>
  <view :style="boxStyle">
    <view v-if="fixed && isSeize" :style="{ height: seizeHeight + 'px', width: '750rpx' }"></view>
    <view
      :class="['n-bg-' + bgType, 'n-border-' + border, 'n-nav-box', fixed && 'n-nav-fixed']"
      :style="statusNavStyle"
      @tap.stop="toPrevent"
    >
      <view v-if="includeStatus" :style="{ width: '750rpx', height: statusHeight + 'px' }"></view>
      <view class="n-flex-row n-wrap-nowrap n-align-center" :style="'width:750rpx;' + mrNavStyle">
        <view
          :class="[
            'n-flex-row',
            'n-wrap-nowrap',
            'n-justify-start',
            'n-align-center',
            'n-nav-lefts',
            leftBgType && 'n-bg-' + leftBgType,
          ]"
          :style="leftStyle"
        >
          <slot name="left">
            <view
              v-if="lefts && lefts.length > 0"
              v-for="(left, idx) in lefts"
              :key="idx"
              :class="[
                'n-position-relative',
                'n-flex-row',
                'n-align-center',
                left.bgType && 'n-bg-' + left.bgType,
              ]"
              :style="leftItemStyle + (left.style || '')"
              bubble="true"
              @tap="goLeft(idx)"
            >
              <n-icon
                v-if="left.icon"
                :name="left.icon"
                :type="left.iconType || itemIconType"
                :size="left.iconSize || itemIconSize"
                :iconStyle="itemIconStyle + (left.iconStyle || '')"
                @iconClicked="goLeft(idx)"
              ></n-icon>
              <text
                v-if="left.text"
                :class="[
                  'n-color-' + (left.textType || itemTextType),
                  'n-size-' + (left.textSize || itemTextSize),
                ]"
                :style="itemTextStyle + (left.textStyle || '')"
                >{{ left.text }}</text
              >
              <n-badge
                v-if="left.badge"
                :size="left.badge.size || badgeConfig.size || '12rpx'"
                :bgType="left.badge.bgType || badgeConfig.bgType || 'error'"
                :text="left.badge.text || ''"
                :border="left.badge.border || badgeConfig.border || 'none'"
                :textType="left.badge.textType || badgeConfig.textType || 'inverse'"
                :textSize="left.badge.textSize || badgeConfig.textSize || 'ss'"
                :textStyle="left.badge.textStyle || badgeConfig.textStyle || ''"
                :boxStyle="left.badge.boxStyle || badgeConfig.boxStyle || ''"
              ></n-badge>
            </view>
          </slot>
        </view>
        <view
          class="n-flex-row n-wrap-nowrap n-align-center n-justify-center n-flex-1 n-nav-title"
          :style="centerStyle"
        >
          <slot name="center">
            <text
              v-if="title"
              :class="[
                'n-lines-1',
                'n-nav-title-text',
                'n-color-' + titleType,
                'n-size-' + titleSize,
              ]"
              :style="titleStyle"
              @tap.stop="clickCenter"
              >{{ title }}</text
            >
            <n-icon
              v-if="icon"
              :name="icon"
              :type="iconType"
              :size="iconSize"
              :iconStyle="iconStyle"
              @iconClicked="clickCenter"
            ></n-icon>
          </slot>
        </view>
        <view
          :class="[
            'n-flex-row',
            'n-align-center',
            'n-wrap-nowrap',
            'n-justify-end',
            'n-nav-rights',
            rightBgType && 'n-bg-' + rightBgType,
          ]"
          :style="rightStyle"
        >
          <slot name="right">
            <view
              v-if="rights && rights.length > 0"
              v-for="(right, idx) in rights"
              :key="idx"
              :class="[
                'n-position-relative',
                'n-flex-row',
                'n-align-center',
                'n-wrap-nowrap',
                'n-justify-end',
                right.bgType && 'n-bg-' + right.bgType,
              ]"
              :style="rightItemStyle + (right.style || '')"
              bubble="true"
              @tap="goRight(idx)"
            >
              <n-icon
                v-if="right.icon"
                :name="right.icon"
                :type="right.iconType || itemIconType"
                :size="right.iconSize || itemIconSize"
                :iconStyle="itemIconStyle + (right.iconStyle || '')"
                @iconClicked="goRight(idx)"
              ></n-icon>
              <text
                v-if="right.text"
                :class="[
                  'n-color-' + (right.textType || itemTextType),
                  'n-size-' + (right.textSize || itemTextSize),
                ]"
                :style="itemTextStyle + (right.textStyle || '')"
                >{{ right.text }}</text
              >
              <n-badge
                v-if="right.badge"
                :size="right.badge.size || badgeConfig.size || '12rpx'"
                :bgType="right.badge.bgType || badgeConfig.bgType || 'error'"
                :text="right.badge.text || ''"
                :border="right.badge.border || badgeConfig.border || 'none'"
                :textType="right.badge.textType || badgeConfig.textType || 'inverse'"
                :textSize="right.badge.textSize || badgeConfig.textSize || 'ss'"
                :textStyle="right.badge.textStyle || badgeConfig.textStyle || ''"
                :boxStyle="right.badge.boxStyle || badgeConfig.boxStyle || ''"
              ></n-badge>
            </view>
          </slot>
        </view>
      </view>
      <slot name="extra"></slot>
    </view>
  </view>
</template>

<script setup>
/**
 * n-navbar
 * @description 自定义导航栏
 * @property {Array}  lefts 左侧item集
 * @property {String} title 标题
 * @property {String} icon 标题右侧图标
 * @property {Array} rights 右侧item集
 * @property {String} bgType = [nav|primary|success|warning|error|light|dark|inverse|custom|link|none|page|hover|mask|mask-dark|border|border-light|border-dark|gradient] 背景主题
 * @property {String} border = [all-light|all-dark|all-primary|all-success|all-warning|all-error|all-inverse|all-custom|all-link|top-light|top-dark|top-primary|top-success|top-warning|top-error|top-inverse|top-custom|top-link|right-light|right-dark|right-primary|right-success|right-warning|right-error|right-inverse|right-custom|right-link|bottom-light|bottom-dark|bottom-primary|bottom-success|bottom-warning|bottom-error|bottom-inverse|bottom-custom|bottom-link|left-light|left-dark|left-primary|left-success|left-warning|left-error|left-inverse|left-custom|left-link|none] 边框主题
 * @property {String} titleType = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 标题颜色主题
 * @property {String} titleSize = [ss|s|base|l|ll] 标题尺寸主题
 * @property {String} titleStyle 标题样式
 * @property {String} iconType = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 标题图标颜色主题
 * @property {String} iconSize = [ss|s|base|l|ll] 标题图标尺寸主题
 * @property {String} iconStyle 标题图标样式
 * @property {String} itemIconType = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] item图标颜色主题
 * @property {String} itemIconSize = [ss|s|base|l|ll] item图标尺寸主题
 * @property {String} itemIconStyle item图标样式
 * @property {String} itemTextType = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] item文字颜色主题
 * @property {String} itemTextSize = [ss|s|base|l|ll] item文字尺寸主题
 * @property {String} itemTextStyle item文字样式
 * @property {Number} height 自定义px高度
 * @property {Boolean} includeStatus = [true|false] 是否包含状态栏
 * @property {Boolean} isSeize = [true|false] 是否占位
 * @property {Boolean} fixed = [true|false] 是否fixed定位
 * @property {String} leftStyle lefts整体样式
 * @property {String} leftbgType = [nav|primary|success|warning|error|light|dark|inverse|custom|link|none|page|hover|mask|mask-dark|border|border-light|border-dark|gradient] lefts整体的背景主题
 * @property {String} leftItemStyle lefts中item的样式
 * @property {String} rightStyle rights整体样式
 * @property {String} rightbgType = [nav|primary|success|warning|error|light|dark|inverse|custom|link|none|page|hover|mask|mask-dark|border|border-light|border-dark|gradient] rights整体背景主题
 * @property {String} rightItemStyle rights中item的样式
 * @property {String} centerStyle 中间title外层的样式
 * @property {String} boxStyle 外层样式
 * @property {String} statusNavStyle status与nav的外层样式
 * @property {String} navStyle nav的外层样式
 * @property {Object} badgeConfig badge整体设置
 * @event {Function} leftAction 左点击事件
 * @event {Function} centerAction 中点击事件
 * @event {Function} rightAction 右点击事件
 */
import { computed } from 'vue'
import { getStatusBarHeight } from '../utils/system.js'
import { makeProps } from '../utils/props.js'

const props = defineProps(
  makeProps([
    ['lefts', []],
    'title',
    'icon',
    ['rights', []],
    ['bgType', 'nav'],
    'border',
    ['titleType', 'nav-title'],
    ['titleSize', 'nav-title'],
    'titleStyle',
    ['iconType', 'nav-title'],
    ['iconSize', 'nav-title'],
    'iconStyle',
    ['itemIconType', 'nav-icon'],
    ['itemIconSize', 'nav-icon'],
    'itemIconStyle',
    ['itemTextType', 'nav-item'],
    ['itemTextSize', 'nav-item'],
    'itemTextStyle',
    ['height', 44],
    ['includeStatus', true],
    ['isSeize', true],
    ['fixed', true],
    ['enableBack', false],
    'leftStyle',
    'leftBgType',
    'leftItemStyle',
    'rightStyle',
    'rightBgType',
    'rightItemStyle',
    'centerStyle',
    'boxStyle',
    'statusNavStyle',
    'navStyle',
    ['badgeConfig', {}],
  ])
)
const emit = defineEmits(['leftAction', 'centerAction', 'rightAction'])

const statusHeight = computed(() => {
  if (props.includeStatus) {
    return getStatusBarHeight()
  }
  return 0
})
const seizeHeight = computed(() => {
  return statusHeight.value + props.height
})
const mrNavStyle = computed(() => {
  let _style = 'height:' + props.height + 'px;'
  return _style + props.navStyle
})

function goLeft(i) {
  emit('leftAction', i)
  if (i == 0 && props.enableBack) {
    uni.navigateBack({
      delta: 1,
    })
  }
}
function clickCenter(e) {
  e && e.stopPropagation && e.stopPropagation()
  emit('centerAction')
}
function goRight(i) {
  emit('rightAction', i)
}
function toPrevent(e) {
  e && e.stopPropagation && e.stopPropagation()
}
</script>

<style lang="scss" scoped>
.n-nav {
  &-box {
    width: 750rpx;
    left: 0;
    top: 0;
    /* #ifndef APP-NVUE */
    z-index: 600;
    /* #endif */
  }
  &-fixed {
    position: fixed;
  }
  &-lefts {
    padding-left: 30rpx;
    width: 200rpx;
  }
  &-title {
    &-text {
      // max-width: 350rpx;
    }
  }
  &-rights {
    padding-right: 30rpx;
    width: 200rpx;
  }
}
</style>
