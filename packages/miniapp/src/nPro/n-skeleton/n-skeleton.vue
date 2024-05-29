<template>
  <view
    id="nske"
    ref="nske"
    :class="['n-flex-' + flex, 'n-align-' + align, 'n-justify-' + justify, animate && 'ske-ani']"
    :style="boxStyle"
  >
    <view
      v-if="avatar"
      :style="{
        width: avatarWidth,
        height: avatarHeight,
        'border-radius': avatarRadius,
        'background-color': bg,
      }"
    ></view>
    <view v-if="showSpaceN" :style="spaceN"></view>
    <view
      v-if="hasRows"
      :class="['n-flex-column', 'n-align-' + rowsAlign, 'n-justify-' + rowsJustify]"
      :style="rowsStyle"
    >
      <view
        v-for="(item, idx) in rowItems"
        :key="idx"
        :style="{
          'margin-bottom': idx == rowItems.length - 1 ? '0' : rowsSpace,
          width: item.width,
          height: item.height,
          'background-color': bg,
          'border-radius': rowsRadius,
        }"
      ></view>
    </view>
    <view v-if="showSpaceM" :style="spaceM"></view>
    <view
      v-if="indicator"
      :style="{
        width: indicatorWidth,
        height: indicatorHeight,
        'border-radius': indicatorRadius,
        'background-color': bg,
      }"
    ></view>
  </view>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { animate } from '../utils/animate.js'
import { makeProps } from '../utils/props.js'

const props = defineProps(
  makeProps([
    ['flex', 'row'],
    ['align', 'center'],
    ['justify', 'center'],
    ['space', '24rpx'],
    ['bg', '#CCC8C8'],
    ['avatar', true],
    ['avatarWidth', '120rpx'],
    ['avatarHeight', '120rpx'],
    ['avatarRadius', '12rpx'],
    ['rows', 2],
    ['rowsWidth', ['400rpx']],
    ['rowsHeight', ['12rpx']],
    ['rowsRadius', '12rpx'],
    ['rowsAlign', 'center'],
    ['rowsJustify', 'center'],
    ['rowsSpace', '20rpx'],
    'rowsStyle',
    ['indicator', true],
    ['indicatorWidth', '120rpx'],
    ['indicatorHeight', '120rpx'],
    ['indicatorRadius', '12rpx'],
    ['animate', true],
    'boxStyle',
  ])
)

const nske = ref(null)

const hasRows = computed(() => {
  return props.rows > 0
})
const rowItems = computed(() => {
  const its = []
  const wl = props.rowsWidth.length
  const hl = props.rowsHeight.length
  for (let i = 0; i < props.rows; i++) {
    its.push({
      width: props.rowsWidth[i] || props.rowsWidth[wl - 1] || 0,
      height: props.rowsHeight[i] || props.rowsHeight[hl - 1] || 0,
    })
  }
  return its
})
const showSpaceN = computed(() => {
  return props.avatar && hasRows.value
})
const showSpaceM = computed(() => {
  return (props.avatar || hasRows.value) && props.indicator
})
const spaceN = computed(() => {
  if (props.flex == 'row') {
    return `width: ${props.space};`
  }
  return `height: ${props.space};`
})
const spaceM = computed(() => {
  if (props.flex == 'row') {
    return `width: ${props.space};`
  }
  return `height: ${props.space};`
})

onMounted(() => {
  // #ifdef APP-NVUE
  setTimeout(() => {
    props.animate && toAnimate()
  }, 0)
  // #endif
})

function toAnimate() {
  // #ifdef APP-NVUE
  const el = nske.value
  animate(el, {
    styles: {
      opacity: 0.6,
    },
    duration: 400,
    timingFunction: 'ease-in-out',
  })
    .then(() => {
      animate(el, {
        styles: {
          opacity: 1,
        },
        duration: 400,
        timingFunction: 'ease-in-out',
      })
        .then(() => {
          toAnimate()
        })
        .catch((err) => {
          console.log(err)
        })
    })
    .catch((err) => {
      console.log(err)
    })
  // #endif
}
</script>

<style lang="scss" scoped>
.ske {
  &-ani {
    /* #ifndef APP-NVUE */
    animation: timing-opa ease-in-out 0.8s infinite;
    /* #endif */
  }
}
/* #ifndef APP-NVUE */
@keyframes timing-opa {
  50% {
    opacity: 0.6;
  }
}
/* #endif */
</style>
