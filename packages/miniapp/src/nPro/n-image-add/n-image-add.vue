<template>
  <view
    :class="[
      'n-flex-column',
      'n-align-center',
      'n-justify-center',
      'n-border-' + border,
      'n-radius-' + radius,
      'n-bg-' + bgType,
    ]"
    :style="'height: 200rpx;width: 200rpx;' + boxStyle"
    bubble="true"
    @click="toAdd"
  >
    <n-icon :name="icon" :type="iconType" :iconStyle="iconStyle" @iconClicked="toAdd"></n-icon>
    <view v-if="text && space" :style="{ height: space }"></view>
    <text
      v-if="text"
      :class="['n-color-' + textType, 'n-size-' + textSize]"
      :style="textStyle"
    ></text>
  </view>
</template>

<script setup>
const emit = defineEmits(['add'])
const props = defineProps({
  bgType: {
    type: String,
    default: 'light',
  },
  border: {
    type: String,
    default: '',
  },
  radius: {
    type: String,
    default: 's',
  },
  icon: {
    type: String,
    default: 'add',
  },
  space: {
    type: String,
    default: '',
  },
  text: {
    type: String,
    default: '',
  },
  iconType: {
    type: String,
    default: 'third',
  },
  iconStyle: {
    type: String,
    default: 'font-size:80rpx;',
  },
  textType: {
    type: String,
    default: 'third',
  },
  textSize: {
    type: String,
    default: 'ss',
  },
  textStyle: {
    type: String,
    default: '',
  },
  boxStyle: {
    type: String,
    default: '',
  },
})

function toAdd() {
  emit('add')
}
</script>

<style></style>
