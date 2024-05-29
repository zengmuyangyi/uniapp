<template>
  <view :class="['n-bg-' + bgType, 'n-border-' + border, 'n-radius-' + radius]" :style="boxStyle">
    <view v-if="column === 0" class="n-flex-row n-wrap-wrap" :style="dyBoxStyle">
      <view
        v-for="(item, idx) in updatedItems"
        :key="idx"
        :style="{
          'margin-right': idx !== updatedItems.length - 1 ? columnSpace : '0',
          'margin-bottom': rowSpace,
        }"
      >
        <n-tag
          :text="item[tl]"
          :value="item[vl]"
          :disabled="disabled || item[dl]"
          :selected="item['n-checked']"
          :bgType="tagBgType"
          :selectedBgType="tagSelectedBgType"
          :textType="tagTextType"
          :selectedTextType="tagSelectedTextType"
          :height="tagHeight"
          :textSize="tagTextSize"
          :border="tagBorder"
          :selectedBorder="tagSelectedBorder"
          :radius="tagRadius"
          :space="tagSpace"
          :textStyle="textStyle"
          :selectedTextStyle="selectedTextStyle"
          :disabledTextStyle="disabledTextStyle"
          :boxStyle="tagStyle"
          :selectedBoxStyle="selectedTagStyle"
          :disabledBoxStyle="disabledTagStyle"
          @tagClicked="toUpdateItemCheck(idx)"
        ></n-tag>
      </view>
    </view>
    <view v-if="column !== 0">
      <view
        v-for="(rows, index) in chunkedItems"
        :key="index"
        class="n-flex-row n-wrap-nowrap"
        :style="{ 'margin-bottom': index !== chunkedItems.length - 1 ? rowSpace : '0' }"
      >
        <view
          v-for="(item, idx) in rows"
          :key="idx"
          class="n-flex-1"
          :style="{ 'margin-right': idx !== rows.length - 1 ? columnSpace : '0' }"
        >
          <n-tag
            v-if="item"
            :text="item[tl]"
            :value="item[vl]"
            :disabled="disabled || item[dl]"
            :selected="item['n-checked']"
            :bgType="tagBgType"
            :selectedBgType="tagSelectedBgType"
            :textType="tagTextType"
            :selectedTextType="tagSelectedTextType"
            :height="tagHeight"
            :textSize="tagTextSize"
            :border="tagBorder"
            :selectedBorder="tagSelectedBorder"
            :radius="tagRadius"
            :space="tagSpace"
            :textStyle="textStyle"
            :selectedTextStyle="selectedTextStyle"
            :disabledTextStyle="disabledTextStyle"
            :boxStyle="tagStyle"
            :selectedBoxStyle="selectedTagStyle"
            :disabledBoxStyle="disabledTagStyle"
            @tagClicked="toUpdateItemCheck(index * column + idx)"
          ></n-tag>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
/**
 * tag-group
 * @description 标签群
 * @property {Array} items 标签群内容
 * @property {Array} value 当前选中值
 * @property {Number} limits 限制最大选择数。0表示不限制
 * @property {Boolean} leastOne = [true|false] limits为1时是否允许取消当前选择，也就是是否允许一个也不选
 * @property {Number} column 每一行多少个tag。0表示动态宽度，其余就是等宽
 * @property {String} rowSpace 标签之间的竖向距离
 * @property {String} columnSpace 标签之间的横向距离
 * @property {Boolean} disabled = [true|false] 是否全部禁用
 * @property {String} textLabel 文字内容的字段
 * @property {String} valueLabel 唯一值的字段
 * @property {String} disabledLabel 禁用的字段
 * @property {String} bgType = [nav|primary|success|warning|error|light|dark|inverse|custom|link|none|page|hover|mask|mask-dark|border|border-light|border-dark|gradient] 背景主题
 * @property {String} border = [all-light|all-dark|all-primary|all-success|all-warning|all-error|all-inverse|all-custom|all-link|top-light|top-dark|top-primary|top-success|top-warning|top-error|top-inverse|top-custom|top-link|right-light|right-dark|right-primary|right-success|right-warning|right-error|right-inverse|right-custom|right-link|bottom-light|bottom-dark|bottom-primary|bottom-success|bottom-warning|bottom-error|bottom-inverse|bottom-custom|bottom-link|left-light|left-dark|left-primary|left-success|left-warning|left-error|left-inverse|left-custom|left-link|none] 边框主题
 * @property {String} radius = [ss|s|base|l|ll|none] 圆角主题
 * @property {String} boxStyle 外层样式
 * @property {String} dyBoxStyle column为0时，标签群的样式
 * @property {String} tagbgType = [nav|primary|success|warning|error|light|dark|inverse|custom|link|none|page|hover|mask|mask-dark|border|border-light|border-dark|gradient] tag的背景主题
 * @property {String} tagSelectedbgType = [nav|primary|success|warning|error|light|dark|inverse|custom|link|none|page|hover|mask|mask-dark|border|border-light|border-dark|gradient] 选中时tag的背景主题
 * @property {String} tagTextType = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] tag的文字颜色主题
 * @property {String} tagSelectedTextType = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 选中时tag的文字颜色主题
 * @property {String} tagTextSize = [ss|s|base|l|ll] tag的文字尺寸主题
 * @property {String} tagHeight tag的高度主题
 * @property {String} tagBorder tag的边框主题
 * @property {String} tagSelectedBorder 选中时tag的边框主题
 * @property {String} tagRadius tag的圆角主题
 * @property {String} tagSpace tag的左右padding
 * @property {String} textStyle tag的文字样式
 * @property {String} selectedTextStyle 选中时tag的文字样式
 * @property {String} disabledTextStyle 禁用时tag的文字样式
 * @property {String} tagStyle tag的外层样式
 * @property {String} selectedTagStyle 选中时tag的外层样式
 * @property {String} disabledTagStyle 禁用时tag的外层样式
 * @event {Function} overed 超出限制最大选择数limits触发
 * @event {Function} input 输入事件
 * @event {Function} change 更改事件
 */
import { ref, computed, watch } from 'vue'
import { arrayChunk } from '../utils/utils.js'
import { makeProps } from '../utils/props.js'

const props = defineProps(
  makeProps([
    ['items', []],
    ['value', []],
    ['limits', 0],
    ['leastOne', false],
    ['column', 0],
    ['rowSpace', '16rpx'],
    ['columnSpace', '16rpx'],
    ['disabled', false],
    'textLabel',
    'valueLabel',
    'disabledLabel',
    'bgType',
    'border',
    'radius',
    'boxStyle',
    'dyBoxStyle',
    'tagBgType',
    'tagSelectedBgType',
    ['tagTextType', 'text'],
    ['tagSelectedTextType', 'text'],
    ['tagTextSize', 'base'],
    ['tagHeight', 'base'],
    ['tagBorder', 'all'],
    ['tagSelectedBorder', 'all'],
    ['tagRadius', 'base'],
    ['tagSpace', '16rpx'],
    'textStyle',
    'selectedTextStyle',
    'disabledTextStyle',
    'tagStyle',
    'selectedTagStyle',
    'disabledTagStyle',
    ['updateTime', 0],
  ])
)
const emit = defineEmits(['update:value', 'change', 'overed'])

const updatedItems = ref([])

const tl = computed(() => {
  return props.textLabel || 'title'
})
const vl = computed(() => {
  return props.valueLabel || 'value'
})
const dl = computed(() => {
  return props.disabledLabel || 'disabled'
})
const chunkedItems = computed(() => {
  if (props.column === 0) {
    return updatedItems.value
  }
  const _length = updatedItems.value.length
  const _array = arrayChunk(updatedItems.value, props.column)
  const mod = _length % props.column
  if (mod !== 0) {
    const _size = Math.ceil(_length / props.column)
    const lastIndex = _size - 1
    for (let i = 0; i < props.column - mod; i++) {
      _array[lastIndex].push(null)
    }
  }
  return _array
})

toGenerateUpdatedItems()

watch(
  () => props.items,
  () => {
    toGenerateUpdatedItems()
  }
)
watch(
  () => props.updateTime,
  () => {
    toGenerateUpdatedItems()
  }
)

function toUpdateItemCheck(idx) {
  const item = updatedItems.value[idx]
  const isToCheck = !item['n-checked']
  // > 1 的多选，多选时不让选择
  if (props.limits > 1 && isToCheck) {
    // 这一行代码限制了我们必须绑定v-model，或者必须在外面更新value。否则limits会不起作用
    // 当然，我们可以通过直接从 updatedItems上面来获取已经选择的数目，避免用户没有更新value
    if (props.value && props.value.length >= props.limits) {
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
      _vals.push(item[vl.value])
    }
  })
  // just for v-model
  emit('update:value', _vals)
  emit('change', { vals: _vals, index: idx })
}
function toGenerateUpdatedItems() {
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
      if (props.textLabel) {
        upList.push({
          [props.textLabel]: item[props.textLabel],
          [props.valueLabel]: item[props.valueLabel],
          [props.disabledLabel]: item[props.disabledLabel],
          'n-checked': flag,
        })
      } else {
        upList.push({
          title: item,
          value: item,
          disabled: false,
          'n-checked': flag,
        })
      }
    })
  updatedItems.value = upList
}
</script>

<style lang="scss" scoped></style>
