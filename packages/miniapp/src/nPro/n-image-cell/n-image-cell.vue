<template>
  <view
    :class="['n-position-relative', 'n-flex-column', 'n-justify-end']"
    :style="'width:216rpx;height:216rpx;' + boxStyle"
  >
    <image
      :src="src"
      :class="['n-radius-' + radius]"
      :style="'width:200rpx;height:200rpx;' + imageStyle"
      mode="aspectFill"
      @click="toPreview"
    ></image>
    <view
      :class="[
        'n-position-absolute',
        'n-flex-column',
        'n-justify-center',
        'n-align-center',
        'n-radius-' + iconRadius,
        'n-border-' + iconBorder,
        'n-bg-' + iconBgType,
      ]"
      :style="'right:0;top:0;width:36rpx;height:36rpx;' + iconBoxStyle"
      bubble="true"
      @click.stop="toDelete"
    >
      <n-icon
        :name="icon"
        :type="iconType"
        :size="iconSize"
        :iconStyle="iconStyle"
        @iconClicked="toDelete"
      ></n-icon>
    </view>
  </view>
</template>

<script setup>
const emit = defineEmits(['delete', 'preview'])
const props = defineProps({
  src: {
    type: String,
    default: '',
  },
  radius: {
    type: String,
    default: 's',
  },
  imageStyle: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: 'close',
  },
  iconType: {
    type: String,
    default: 'inverse',
  },
  iconSize: {
    type: String,
    default: 'ss',
  },
  iconRadius: {
    type: String,
    default: 'll',
  },
  iconBorder: {
    type: String,
    default: '',
  },
  iconBgType: {
    type: String,
    default: 'mask-dark',
  },
  iconStyle: {
    type: String,
    default: '',
  },
  iconBoxStyle: {
    type: String,
    default: '',
  },
  boxStyle: {
    type: String,
    default: '',
  },
})

function toDelete(e) {
  e && e.stopPropagation && e.stopPropagation()
  emit('delete', props.src)
}
function toPreview() {
  emit('preview', props.src)
}
</script>

<style></style>
