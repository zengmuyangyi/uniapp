<template>
  <view
    :class="[
      'n-flex-row',
      'n-align-center',
      'n-wrap-nowrap',
      'n-bg-' + bgType,
      'n-border-' + border,
      'n-radius-' + radius,
    ]"
    :style="boxStyle"
  >
    <n-icon
      v-for="(item, idx) in items"
      :key="idx"
      :name="value >= item ? activeIcon || icon : icon"
      :type="value >= item ? activeIconType : iconType"
      :size="iconSize"
      :iconStyle="iconStyle + (value >= item ? activeIconStyle : '')"
      :boxStyle="
        'margin-right:' +
        (item < total ? space : '0') +
        ';' +
        iconBoxStyle +
        (value >= item ? activeIconBoxStyle : '')
      "
      @iconClicked="toChange(item)"
    ></n-icon>
  </view>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  value: {
    type: Number,
    default: 0,
  },
  total: {
    type: Number,
    default: 5,
  },
  bgType: {
    type: String,
    default: '',
  },
  border: {
    type: String,
    default: '',
  },
  radius: {
    type: String,
    default: '',
  },
  iconType: {
    type: String,
    default: 'third',
  },
  iconSize: {
    type: String,
    default: 'base',
  },
  activeIconType: {
    type: String,
    default: 'error',
  },
  icon: {
    type: String,
    default: 'star-solid',
  },
  activeIcon: {
    type: String,
    default: '',
  },
  iconStyle: {
    type: String,
    default: '',
  },
  iconBoxStyle: {
    type: String,
    default: '',
  },
  activeIconStyle: {
    type: String,
    default: '',
  },
  activeIconBoxStyle: {
    type: String,
    default: '',
  },
  space: {
    type: String,
    default: '12rpx',
  },
  boxStyle: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:value'])

const items = computed(() => {
  const arr = []
  for (let i = 1; i <= props.total; i++) {
    arr.push(i)
  }
  return arr
})

function toChange(val) {
  emit('update:value', val)
}
</script>

<style></style>
