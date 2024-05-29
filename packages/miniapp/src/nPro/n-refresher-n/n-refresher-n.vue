<template>
  <refresh
    class="n-refresher n-flex-row n-justify-center"
    :display="refreshing ? 'show' : 'hide'"
    :style="boxStyle"
    @refresh="onRefresh"
    @pullingdown="onPullingDown"
  >
    <view ref="ncycle" class="n-cycle-container">
      <view ref="ncover1" class="n-u-cover n-u-c1">
        <view class="n-u-cover-cycle n-u-cover1"></view>
      </view>
      <view ref="ncover2" class="n-u-cover n-u-c2">
        <view ref="ncovercycle" class="n-u-cover-cycle"></view>
      </view>
    </view>
    <image ref="narrow" class="n-arrow-down" :src="downIcon" mode="aspectFill"></image>
    <text class="n-u-txt" :style="textStyle">{{ refresherText }}</text>
  </refresh>
</template>

<script setup>
/**
 * n-refresher-n
 * @description 下拉刷新组件
 * @property {String} scrollRef 对应的list/scroll的ref
 * @property {Number} maxTime 超时时间。0表示不会超时
 * @property {String} mainText 下拉文字提示
 * @property {String} pullingText 满足是否刷新时文字提示
 * @property {String} refreshingText 刷新时文字提示
 * @property {String} downIcon 下拉的图标
 * @property {String} boxStyle 外层样式
 * @property {String} textStyle 更多文字样式
 * @event {Function} refresh 刷新事件
 * @event {Function} pullingDown 下拉刷新事件
 */
import { ref, computed, onUnmounted } from 'vue'
// #ifdef APP-NVUE
const animation = uni.requireNativePlugin('animation')
const bindingX = uni.requireNativePlugin('bindingx')
// #endif

import { getPlatform } from '../utils/system.js'

const HEIGHT_RPX = 140
const HEIGHT = uni.upx2px(140)

const props = defineProps({
  /**
   * 对应的list/scroll的ref
   */
  scrollRef: {
    type: Object,
    default: () => {
      return {}
    },
  },
  /**
   * 超时时间。0表示不会超时
   */
  maxTime: {
    type: Number,
    default: 0,
  },
  /**
   * 下拉文字提示
   */
  mainText: {
    type: String,
    default: '下拉触发刷新...',
  },
  /**
   * 满足是否刷新时文字提示
   */
  pullingText: {
    type: String,
    default: '释放即可刷新...',
  },
  /**
   * 刷新时文字提示
   */
  refreshingText: {
    type: String,
    default: '正在努力加载...',
  },
  /**
   * 下拉的图标
   */
  downIcon: {
    type: String,
    default: '/static/ui/down.png',
  },
  /**
   * 外层样式
   */
  boxStyle: {
    type: String,
    default: '',
  },
  /**
   * 加载文字样式
   */
  textStyle: {
    type: String,
    default: '',
  },
})
const emit = defineEmits(['refresh', 'pullingDown', 'timeout'])
defineExpose({
  cancel,
})

let bindingToken = null
let roundingToken = null
let timeoutSto = null
const isAndroid = getPlatform() === 'android'
const refreshing = ref(false)
const couldUnLash = ref(false)
const ncovercycle = ref(null)
const ncover1 = ref(null)
const ncover2 = ref(null)
const ncycle = ref(null)
const narrow = ref(null)

const refresherText = computed(() => {
  return refreshing.value ? props.refreshingText : pText.value
})
const pText = computed(() => {
  return couldUnLash.value ? props.pullingText : props.mainText
})

animationBinding()

onUnmounted(() => {
  bindingsDestroy()
})

function onRefresh(event) {
  // console.log('on refresh')
  // onRefresh means holding the refresh-component when u are not pulling the refresher
  // 在onRefresh阶段，再次下拉不会二次触发onRefresh，不需要做保护
  emit('refresh', event)
  refreshing.value = true
  cycleGoRound()
  if (props.maxTime <= 0) return
  timeoutSto && clearTimeout(timeoutSto)
  timeoutSto = setTimeout(() => {
    emit('timeout')
    cancel()
  }, props.maxTime)
}
/**
 * 取消 refreshing
 */
function cancel() {
  refreshing.value = false
  timeoutSto && clearTimeout(timeoutSto)
  roundingDestroy()
}
/**
 * 下拉事件. when pulling from bottom to up for load more, it will also be called
 */
function onPullingDown(event) {
  // console.log('on puling down')
  // it means the refresh-component is pulling-down
  emit('pullingDown', event)
  // TODO:
  // console.log(event.pullingDistance)
  const pd = event.pullingDistance // * (isAndroid ? -1 : 1);
  // console.log(pd)
  // 暂时未开放下拉多少可以触发释放下拉的回掉
  pd > (isAndroid ? HEIGHT + 140 : HEIGHT)
    ? (couldUnLash.value = true)
    : (couldUnLash.value = false)
  //console.log(couldUnLash)
  if (refreshing.value && pd < 20) {
    timeoutSto && clearTimeout(timeoutSto)
    refreshing.value = false
    roundingDestroy()
  }
}
/**
 * 注册 bindingx
 */
function animationBinding() {
  setTimeout(() => {
    // console.log(props.scrollRef, props.scrollRef.ref)
    // 注意：props传递过来之后，不需要props.scrollRef.value.ref
    const scroller = props.scrollRef.ref
    const cover2 = ncover2.value.ref
    const coverCycle = ncovercycle.value.ref
    const bindingResult = bindingX.bind(
      {
        eventType: 'scroll',
        anchor: scroller,
        props: [
          {
            element: cover2,
            property: 'transform.rotateZ',
            expression: 'y>-140?(y%75/150*-360):156',
          },
          {
            element: coverCycle,
            property: 'opacity',
            expression: 'y<-75 ?1:0',
          },
        ],
      },
      (e) => {}
    )
    bindingToken = bindingResult.token
  }, 300)
}
/**
 * 旋转动作
 */
function cycleGoRound() {
  const cycle = ncycle.value.ref
  arrowShow(false)
  if (!cycle) {
    return
  }
  // console.log('cycle')
  const roundingResult = bindingX.bind(
    {
      eventType: 'timing',
      props: [
        {
          element: cycle,
          property: 'transform.rotateZ',
          expression: 't*0.72',
        },
      ],
    },
    (e) => {}
  )
  roundingToken = roundingResult.token
}
/**
 * 箭头显隐控制
 */
function arrowShow(_show = true) {
  const arrow = narrow.value
  arrow &&
    animation.transition(
      arrow,
      {
        styles: {
          opacity: _show ? 1 : 0,
          transform: _show ? 'scale(1)' : 'scale(0.5)',
        },
        duration: 300,
        delay: 0,
      },
      () => {}
    )
}
/**
 * 完整 bindingx 销毁
 */
function bindingsDestroy() {
  if (bindingToken) {
    bindingX &&
      bindingX.unbind({
        eventType: 'scroll',
        token: bindingToken,
      })
    bindingToken = 0
  }
  roundingDestroy()
}
/**
 * 旋转 bindingx 销毁
 */
function roundingDestroy() {
  if (roundingToken) {
    bindingX &&
      bindingX.unbind({
        eventType: 'timing',
        token: roundingToken,
      })
    roundingToken = 0
  }
  arrowShow(true)
}
</script>

<style lang="scss" scoped>
.n-refresher {
  height: 140rpx;
  // width: 750rpx;
  padding-top: 50rpx;
}

.n-cycle-container {
  position: relative;
  width: 60rpx;
  height: 60rpx;
}

.n-u {
  &-cover {
    position: absolute;
    width: 30rpx;
    height: 60rpx;
    top: 0;
    // background-color: #ffffff;
    overflow: hidden;
    right: 0;
    &-cycle {
      position: absolute;
      width: 60rpx;
      height: 60rpx;
      /* #ifndef APP-NVUE */
      box-sizing: border-box;
      /* #endif */
      right: 0;
      top: 0;
      border-width: 2rpx;
      border-color: #666666;
      border-style: solid;
      border-radius: 30rpx;
      opacity: 0;
    }
  }
  &-cover1 {
    opacity: 1;
  }
  &-c1 {
    z-index: 1;
  }
  &-c2 {
    z-index: 2;
    transform-origin: left center;
    transform: rotateZ(0deg);
  }
}
.n-indicator {
  margin-right: 20rpx;
  height: 60rpx;
  width: 60rpx;
  color: #666666;
}

.n-arrow-down {
  position: relative;
  top: 15rpx;
  left: -45rpx;
  width: 30rpx;
  height: 30rpx;
}

.n-u-txt {
  font-size: 24rpx;
  line-height: 40rpx;
  color: #999999;
  margin-top: 10rpx;
  margin-left: 10rpx;
  height: 40rpx;
  lines: 1;
}
</style>
