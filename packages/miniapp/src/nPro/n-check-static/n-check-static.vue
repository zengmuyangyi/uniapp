<template>
  <view
    :class="[
      flex === 'row' ? 'n-flex-column' : 'n-flex-row',
      flex === 'row' ? 'n-justify-center' : 'n-align-center',
      'n-border-' + border,
      'n-radius-' + radius,
    ]"
    :style="boxStyle"
  >
    <view
      v-for="(item, idx) in updatedItems"
      :key="idx"
      :class="[
        'n-flex-row',
        'n-align-center',
        'n-wrap-nowrap',
        'n-height-' + height,
        'n-radius-' + itemRadius,
        item['n-checked'] ? 'n-border-' + checkedItemBorder : 'n-border-' + itemBorder,
      ]"
      :style="
        'margin-right:' +
        (flex === 'column' && idx !== updatedItems.length - 1 ? itemSpace : '0') +
        ';' +
        itemBoxStyle +
        (item['n-checked'] ? checkedItemBoxStyle : '')
      "
      bubble="true"
      @tap.stop="toUpdateCheck(idx)"
    >
      <n-icon
        v-if="direction === 'left'"
        :name="item['n-checked'] ? checkedIcon : icon"
        :type="
          disabled || item.disabled
            ? disabledIconType
            : item['n-checked']
            ? checkedIconType
            : iconType
        "
        :size="iconSize"
        :iconStyle="
          iconStyle +
          (item['n-checked'] ? checkedIconStyle : '') +
          (disabled || item.disabled ? disabledIconStyle : '')
        "
        :boxStyle="'margin-right:' + space + ';' + iconBoxStyle"
        @iconClicked="toUpdateCheck(idx)"
      ></n-icon>
      <view :style="isBetween ? 'flex:1;' : ''">
        <text
          :class="[
            'n-color-' +
              (disabled || item.disabled
                ? disabledTextType
                : item['n-checked']
                ? checkedTextType
                : textType),
            'n-size-' + textSize,
          ]"
          :style="
            textStyle +
            (item['n-checked'] ? checkedTextStyle : '') +
            (disabled || item.disabled ? disabledTextStyle : '')
          "
          >{{ item.text }}</text
        >
      </view>
      <n-icon
        v-if="direction === 'right'"
        :name="item['n-checked'] ? checkedIcon : icon"
        :type="
          disabled || item.disabled
            ? disabledIconType
            : item['n-checked']
            ? checkedIconType
            : iconType
        "
        :size="iconSize"
        :iconStyle="
          iconStyle +
          (item['n-checked'] ? checkedIconStyle : '') +
          (disabled || item.disabled ? disabledIconStyle : '')
        "
        :boxStyle="'margin-left:' + space + ';' + iconBoxStyle"
        @iconClicked="toUpdateCheck(idx)"
      ></n-icon>
    </view>
  </view>
</template>

<script setup>
/**
 * check-static
 * @description 单多选，支持样式有限
 * @property {String} icon 未选中时图标
 * @property {String} checkedIcon 选中时图标
 * @property {String} direction 图标左右位置
 * @property {String} flex 选项布局方式
 * @property {Boolean} isBetween = [true|false] flex为row时，图标与文字是否space-between
 * @property {Array} items items内容
 * @property {Array} value 选中的值
 * @property {Number} limits 限制最多可选数量。0表示不限制
 * @property {Boolean} leastOne = [true|false] limits为1时是否允许取消当前选择，也就是是否允许一个也不选
 * @property {Boolean} disabled = [true|false] 全部禁用
 * @property {String} textLabel text内容的字段
 * @property {String} textFormat 格式化输出，允许输出多个字段内容，比如 '{name} (ID:{id})'
 * @property {String} valueLabel 唯一值的字段
 * @property {String} disabledLabel 禁用的字段
 * @property {String} boxStyle 外层样式
 * @property {String} itemBoxStyle 选项外层样式
 * @property {String} checkedItemBoxStyle 选项选中时样式
 * @property {String} itemSpace flex为column时各选项的间距
 * @property {String} textType = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 文字颜色主题
 * @property {String} checkedTextType = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 选中时文字颜色主题
 * @property {String} disabledTextType = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 禁用时文字颜色主题
 * @property {String} iconType = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 图标颜色主题
 * @property {String} checkedIconType = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 选中时图标颜色主题
 * @property {String} disabledIconType = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 禁用时图标颜色主题
 * @property {String} textSize = [ss|s|base|l|ll] 文字尺寸主题
 * @property {String} height = [ss|s|base|l|ll] 选项高度主题
 * @property {String} space 文字与图标的间距
 * @property {String} border 外层边框主题
 * @property {String} radius 外层圆角主题
 * @property {String} itemRadius 选项圆角主题
 * @property {String} itemBorder 选项边框主题
 * @property {String} checkedItemBorder 选项选中时边框主题
 * @property {String} textStyle 文字样式
 * @property {String} disabledTextStyle  禁用时文字样式
 * @property {String} checkedTextStyle 选中时文字样式
 * @property {String} iconSize = [ss|s|base|l|ll] 图标尺寸主题
 * @property {String} iconStyle 图标样式
 * @property {String} iconBoxStyle 图标外层样式
 * @property {String} disabledIconStyle 禁用时图标样式
 * @property {String} checkedIconStyle 选中时图标样式
 */
import { watch, ref, computed } from 'vue'
import { makeProps } from '../utils/props.js'

const props = defineProps(
  makeProps([
    ['icon', 'circle'],
    ['checkedIcon', 'radio-solid'],
    ['direction', 'left'],
    ['flex', 'row'],
    ['isBetween', false],
    ['items', []],
    ['value', []],
    ['limits', 0],
    ['leastOne', false],
    ['disabled', false],
    'textLabel',
    'textFormat',
    'valueLabel',
    'disabledLabel',
    'boxStyle',
    'itemBoxStyle',
    'checkedItemBoxStyle',
    ['itemSpace', '16rpx'],
    ['textType', 'text'],
    ['checkedTextType', 'text'],
    ['disabledTextType', 'disabled'],
    ['iconType', 'text'],
    ['checkedIconType', 'text'],
    ['disabledIconType', 'disabled'],
    ['textSize', 'base'],
    ['height', 'base'],
    ['space', '12rpx'],
    'border',
    'radius',
    'itemRadius',
    'itemBorder',
    'checkedItemBorder',
    'textStyle',
    'disabledTextStyle',
    'checkedTextStyle',
    ['iconSize', 'l'],
    'iconStyle',
    'iconBoxStyle',
    'disabledIconStyle',
    'checkedIconStyle',
  ])
)
const emit = defineEmits(['update:value', 'overed', 'change', 'checkClicked'])

let updatedItems = ref([])
toUpdateItems()

function refresh() {
  toUpdateItems()
}

function toUpdateCheck(idx) {
  if (props.disabled || updatedItems.value[idx]['disabled']) {
    emit('checkClicked', idx)
    return
  }
  const item = updatedItems.value[idx]
  const isToCheck = !item['n-checked']
  if (props.limits > 0 && isToCheck) {
    // limits 为 1 的时候，允许直接选择另一项
    if (props.value && props.value.length >= props.limits && props.limits !== 1) {
      emit('overed')
      return
    }
  }
  // 单选时，选择另外一个，直接取消上一个的选择
  if (props.limits === 1 && isToCheck && props.value.length === 1) {
    updatedItems.value.forEach((item) => {
      item['n-checked'] = false
    })
  }
  if (props.limits === 1 && props.leastOne) {
    item['n-checked'] = true
  } else {
    item['n-checked'] = isToCheck
  }
  const _vals = []
  updatedItems.value.forEach((item) => {
    if (item['n-checked']) {
      _vals.push(item['value'])
    }
  })
  // just for v-model
  emit('update:value', _vals)
  emit('change', _vals)
}

function toUpdateItems() {
  const upList = []
  props.items &&
    props.items.forEach((item, i) => {
      // judge if checked
      const itemValue = props.valueLabel ? item[props.valueLabel] : item
      let flag = false
      for (const i in props.value || []) {
        const _val = props.value[i]
        if (_val === itemValue) {
          flag = true
          break
        }
      }
      if (props.textFormat) {
        const text_str = props.textFormat.replace(/{\w+}/g, (result) => {
          const key = result.substring(1, result.length - 1)
          const _str = item[key]
          return _str || ''
        })
        upList.push({
          text: text_str,
          value: item[props.valueLabel],
          disabled: item[props.disabledLabel],
          'n-checked': flag,
        })
      } else {
        if (props.textLabel) {
          upList.push({
            text: item[props.textLabel],
            value: item[props.valueLabel],
            disabled: item[props.disabledLabel],
            'n-checked': flag,
          })
        } else {
          upList.push({
            text: item,
            value: item,
            disabled: false,
            'n-checked': flag,
          })
        }
      }
    })
  updatedItems.value = upList
}

watch(
  () => props.items,
  () => {
    toUpdateItems()
  }
)
</script>

<style lang="scss" scoped></style>
