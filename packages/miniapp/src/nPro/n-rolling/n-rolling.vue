<template>
  <view
    :class="[
      'n-overflow-hidden',
      'n-flex-row',
      'n-align-center',
      'n-wrap-nowrap',
      'n-height-' + height,
    ]"
    :style="boxStyle"
  >
    <slot name="left"></slot>
    <view class="n-flex-row n-align-center n-flex-1 n-wrap-nowrap">
      <!-- #ifndef APP-NVUE -->
      <view :class="['rl-text', rolling && 'rl-rolling']" :style="rolling ? mrRollingStyle : ''">
        <slot>
          <text
            :class="['n-lines-nowrap', 'n-color-' + textType, 'n-size-' + textSize]"
            :style="textStyle"
            >{{ text }}</text
          >
        </slot>
      </view>
      <!-- #endif -->
      <!-- #ifdef APP-NVUE -->
      <view ref="nrollingtext">
        <slot>
          <text
            :class="['n-lines-nowrap', 'n-color-' + textType, 'n-size-' + textSize]"
            :style="textStyle"
            >{{ text }}</text
          >
        </slot>
      </view>
      <!-- #endif -->
    </view>
    <slot name="right"></slot>
  </view>
</template>

<script setup>
/**
 * n-rolling
 * @description 滚动公告
 * @property {Number} times 滚动的次数。默认是0，表示无限滚动
 * @property {Boolean} auto = [true|false] 是否开启自动滚动
 * @property {String} text 公告内容
 * @property {String} textType = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 内容的颜色主题
 * @property {String} textSize = [ss|s|base|l|ll] 内容的尺寸主题
 * @property {String} textStyle 内容的样式
 * @property {String} height = [ss|s|base|l|ll] 高度主题
 * @property {Number} duration 滚动周期
 * @property {String} boxStyle 外层样式
 */
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { animate } from '../utils/animate.js'
import { makeProps } from '../utils/props.js'

const props = defineProps(
  makeProps([
    ['times', 0],
    ['auto', false],
    'text',
    ['textType', 'error'],
    ['textSize', 'base'],
    'textStyle',
    ['height', 'base'],
    ['duration', 8000],
    'boxStyle',
  ])
)

defineExpose({
  start,
  stop,
})

let timer = null
const nrollingtext = ref(null)
const rolling = ref(false)
const inTime = ref(0)

// #ifndef APP-NVUE
const mrRollingStyle = computed(() => {
  return `animation-duration: ${props.duration}ms;`
})
// #endif

onMounted(() => {
  // #ifdef APP-NVUE
  setTimeout(() => {
    props.auto && start()
  }, 0)
  // #endif
  // #ifndef APP-NVUE
  props.auto && start()
  // #endif
})
onUnmounted(() => {
  timer && clearInterval(timer)
})

function start() {
  inTime.value = 0
  rolling.value = true
  // #ifdef APP-NVUE
  toStart()
  // #endif
  // #ifndef APP-NVUE
  timer && clearInterval(timer)
  timer = setInterval(() => {
    inTime.value += 1
    if (inTime.value >= props.times && props.times > 0) {
      rolling.value = false
    }
  }, props.duration)
  // #endif
}
function stop() {
  rolling.value = false
}
// #ifdef APP-NVUE
function toStart() {
  if (!rolling.value) return
  if (inTime.value >= props.times && props.times > 0) return
  const el = nrollingtext.value
  animate(el, {
    styles: {
      transform: 'translateX(100%)',
    },
    duration: 0,
  })
    .then(() => {
      animate(el, {
        styles: {
          transform: 'translateX(-100%)',
        },
        duration: props.duration,
        timingFunction: 'linear',
      })
        .then(() => {
          inTime.value += 1
          toStart()
        })
        .catch((err) => {
          console.log(err)
        })
    })
    .catch((err) => {
      console.log(err)
    })
}
// #endif
</script>

<style lang="scss" scoped>
.rl {
  /* #ifndef APP-NVUE */
  &-text {
    transform: translateX(100%);
  }
  &-rolling {
    animation: rl-rolling 10000ms linear infinite;
  }
  /* #endif */
}
/* #ifndef APP-NVUE */
@keyframes rl-rolling {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}
/* #endif */
</style>
