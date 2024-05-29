<template>
  <!-- #ifndef APP-NVUE -->
  <scroll-view
    :class="'n-bg-' + bgType"
    :style="mrBoxStyle"
    :upper-threshold="upperThreshold"
    :lower-threshold="lowerThreshold"
    :scroll-into-view="nCurrentView"
    :scroll-top="nScrollTop"
    :scroll-with-animation="scrollWithAnimation"
    :scroll-y="pagerState.scrollable"
    :show-scrollbar="showScrollbar"
    :enable-back-to-top="enableBackToTop"
    :refresher-enabled="refresherEnabled"
    :refresher-threshold="refresherThreshold"
    :refresher-default-style="refresherDefaultStyle"
    :refresher-background="refresherBackground"
    :refresher-triggered="refresherTriggered"
    :enable-flex="enableFlex"
    :scroll-anchoring="scrollAnchoring"
    @scroll="nScroll"
    @touchstart="nTouchstartEvent"
    @touchmove="nTouchmoveEvent"
    @touchend="nTouchendEvent"
    @touchcancel="nTouchendEvent"
    @scrolltoupper="onScrollToUpper"
    @scrolltolower="onScrollToLower"
    @refresherpulling="onRefresherPulling"
    @refresherrefresh="onRefresherRefresh"
    @refresherrestore="onRefresherRestore"
    @refresherabort="onRefresherAbort"
  >
    <!-- #endif -->
    <!-- #ifdef APP-NVUE -->
    <waterfall
      :class="['n-flex-1', 'n-bg-' + bgType]"
      :style="mrBoxStyle"
      :ref="setListRef"
      :show-scrollbar="showScrollbar"
      :column-count="columnCount"
      :column-width="columnWidthPx"
      :column-gap="columnGapPx"
      :left-gap="leftGapPx"
      :right-gap="rightGapPx"
      :loadmoreoffset="pagerState.up.use && !useLoading ? loadMoreOffset : 0"
      @loadmore="nMoreLoad"
      @scroll="nScroll"
    >
      <n-refresher-n
        v-if="pagerState.down.use"
        ref="nrefresher"
        :scrollRef="scrollRef"
        :mainText="refreshMainText"
        :pullingText="pullingText"
        :refreshingText="refreshingText"
        :boxStyle="refreshStyle"
        :textStyle="refreshTextStyle"
        @refresh="nRefresh"
      ></n-refresher-n>
      <slot name="header"></slot>
      <slot></slot>
      <slot name="footer"></slot>
      <!-- in android, we must put loading in the last, or it will not trigger loading next page. -->
      <!-- it's the same in loadMore with loadMoreOffset -->
      <!-- or we could put the foot-token after loading -->
      <header v-if="pagerState.up.use && !useLoading">
        <n-loader
          :isLoading="pagerState.isUpLoading"
          :hasMore="pagerState.hasMore"
          :showNoMore="showNoMore"
          :mainText="loadMainText"
          :loadingText="loadingText"
          :noMoreText="noMoreText"
          :loadingSrc="loadingSrc"
          :boxStyle="loadingStyle"
          :imgStyle="loadingImgStyle"
          :textStyle="loadingTextStyle"
        ></n-loader>
      </header>
      <n-loader-n
        v-if="pagerState.up.use && useLoading"
        ref="n-loader"
        :hasMore="pagerState.hasMore"
        :showNoMore="showNoMore"
        :mainText="loadMainText"
        :loadingText="loadingText"
        :noMoreText="noMoreText"
        :loadingSrc="loadingSrc"
        :boxStyle="loadingStyle"
        :imgStyle="loadingImgStyle"
        :textStyle="loadingTextStyle"
        @loading="nLoad"
      ></n-loader-n>
    </waterfall>
    <!-- #endif -->
    <!-- #ifndef APP-NVUE -->
    <view :style="nMrScrollContentStyle">
      <view v-if="pagerState.down.use" :style="nMrRefreshStyle">
        <n-refresher
          :refreshing="pagerState.isDownLoading"
          :couldUnLash="nCouldUnLash"
          :rate="nDownRate"
          :mainText="refreshMainText"
          :pullingText="pullingText"
          :refreshingText="refreshingText"
          :boxStyle="refreshStyle"
          :textStyle="refreshTextStyle"
        ></n-refresher>
      </view>
      <view id="n-list-top" ref="n-list-top"></view>
      <slot name="header"></slot>
      <!-- content of scroll -->
      <slot></slot>
      <slot name="footer"></slot>
      <view id="n-list-bottom" ref="n-list-bottom"></view>
      <n-loader
        v-if="pagerState.up.use"
        :isLoading="pagerState.isUpLoading"
        :hasMore="pagerState.hasMore"
        :showNoMore="showNoMore"
        :mainText="loadMainText"
        :loadingText="loadingText"
        :noMoreText="noMoreText"
        :loadingSrc="loadingSrc"
        :boxStyle="loadingStyle"
        :imgStyle="loadingImgStyle"
        :textStyle="loadingTextStyle"
      ></n-loader>
    </view>
  </scroll-view>
  <!-- #endif -->
</template>

<script setup>
/**
 * n-waterfall
 * @description 瀑布
 * @property {Boolean} useLoading = [true|false] 是否启用loading组件，而不是loadmoreofset触发
 * @property {Number} loadMoreOffset 使用loadmoreofset时的触发偏移量
 * @property {String, Number} columnCount 每一行的栏目数
 * @property {String} columnWidth 每一栏的宽度
 * @property {String} columnGap 栏目之间的间距
 * @property {String} leftGap 内容距离左侧的间距
 * @property {String} rightGap 内容距离右侧的间距
 * @property {Boolean} autoUpdate = [true|false] 是否自动加载第一页数据
 * @property {Object} down 下拉刷新的配置
 * @property {Object} up 上提加载的配置
 * @event {Function} scroll list 滚动时的 scroll 事件的监听
 * @event {Function} down 下拉刷新事件
 * @event {Function} up 上提加载事件
 * @event {Function} inited 初始化
 */
import { computed, watch, ref } from 'vue'

import { getPx, getHeight } from '../utils/system.js'
import { makeProps } from '../utils/props.js'

import { useScrollTo } from '../n-list/useScrollTo.js'
import { useScroll } from '../n-list/useScroll.js'
import { usePager } from '../n-list/usePager.js'

const props = defineProps(
  makeProps([
    ['enableBackToTop', false],
    ['useLoading', false],
    ['loadMoreOffset', 60],
    ['columnCount', 'auto', [String, Number]],
    ['columnWidth', 'auto'],
    ['columnGap', '0'],
    ['leftGap', '0'],
    ['rightGap', '0'],
    ['autoUpdate', false],
    ['down', { use: true, offset: uni.upx2px(140), inRate: 0.8, outRate: 0.2 }],
    ['up', { use: true, offset: 80 }],
    ['showScrollbar', true],
    ['bgType', 'page'],
    ['position', 'static'],
    ['top', '0'],
    ['bottom', '0'],
    'boxStyle',
    ['height', 'window-!status-!nav'],
    'reverse',
    ['loadMainText', '继续加载更多'],
    ['loadingText', '正在加载'],
    ['noMoreText', '没有更多啦'],
    ['showNoMore', true],
    ['loadingSrc', '/static/ui/loading-small.gif'],
    'loadingStyle',
    'loadingImgStyle',
    'loadingTextStyle',
    ['refreshMainText', '下拉即可刷新...'],
    ['pullingText', '释放即可刷新...'],
    ['refreshingText', '正在努力加载...'],
    'refreshStyle',
    'refreshTextStyle',
    ['upperThreshold', 50],
    ['lowerThreshold', 50],
    ['scrollWithAnimation', true],
    ['refresherEnabled', false],
    ['refresherThreshold', 45],
    ['refresherDefaultStyle', 'black'],
    ['refresherBackground', '#FFFFFF'],
    ['refresherTriggered', false],
    ['enableFlex', false],
    ['scrollAnchoring', false],
  ])
)
const emit = defineEmits([
  'inited',
  'scroll',
  'down',
  'up',
  'upper',
  'lower',
  'pulling',
  'refresh',
  'restore',
  'abort',
])

const scrollRef = ref(null)
const nrefresher = ref(null)
const nloader = ref(null)

function setListRef(el) {
  if (el) {
    scrollRef.value = el
  }
}

const { nCurrentView, nScrollTop, nScrollTo, nScrollToTop, nScrollToBottom } = useScrollTo()
// #ifdef APP-NVUE
const {
  pagerState,
  nInitContentList,
  nScroll,
  nLoad,
  nReload,
  nResetLoadmore,
  nMoreLoad,
  nRefresh,
  nEndSuccess,
  nEndError,
} = usePager(props, emit, scrollRef, nrefresher, nloader, nCurrentView)
// #endif
// #ifndef APP-NVUE
const {
  pagerState,
  nInitContentList,
  nScroll,
  nLoad,
  nReload,
  nRefresh,
  nEndSuccess,
  nEndError,
  nTouchstartEvent,
  nTouchmoveEvent,
  nTouchendEvent,
} = usePager(props, emit, scrollRef, nrefresher, nloader, nCurrentView)
// #endif
const {
  onScrollToUpper,
  onScrollToLower,
  onRefresherPulling,
  onRefresherRefresh,
  onRefresherRestore,
  onRefresherAbort,
} = useScroll(emit)

defineExpose({
  nLoad,
  nReload,
  nRefresh,
  nEndSuccess,
  nEndError,
  nScrollTo,
  nScrollToTop,
  nScrollToBottom,
})

const mrBoxStyle = computed(() => {
  // #ifdef APP-NVUE
  if (props.position != 'absolute' && props.position != 'fixed') {
    return props.boxStyle
  }
  // #endif
  let _style = ''
  // #ifndef APP-NVUE
  if (props.height != '-1') {
    _style += 'height:' + getHeight(props.height) + 'px;'
  }
  // #endif
  if (props.top != '-1') {
    _style += 'top:' + getHeight(props.top) + 'px;'
  }
  if (props.bottom != '-1') {
    _style += 'bottom:' + getHeight(props.bottom) + 'px;'
  }
  return _style + props.boxStyle
})
// #ifndef APP-NVUE
const nMrScrollContentStyle = computed(() => {
  let _style = 'position: relative;'
  _style += pagerState.isDownReset
    ? 'transition-property: transform; transition-duration: 300ms;'
    : ''
  _style += pagerState.downHeight > 0 ? `transform: translateY(${pagerState.downHeight}px);` : ''
  return _style
})
const nMrRefreshStyle = computed(() => {
  return 'position: absolute; transform: translate(-50%,-100%); left:50%;'
})
const nCouldUnLash = computed(() => {
  return pagerState.downHeight >= (pagerState.down.offset || 80)
})
const nDownRate = computed(() => {
  return pagerState.downHeight / (pagerState.down.offset || 80)
})
// #endif
const columnWidthPx = computed(() => {
  if (props.columnWidth === 'auto') {
    return 'auto'
  }
  return getPx(props.columnWidth)
})
const columnGapPx = computed(() => {
  return getPx(props.columnGap)
})
const leftGapPx = computed(() => {
  return getPx(props.leftGap)
})
const rightGapPx = computed(() => {
  return getPx(props.rightGap)
})

created()

function created() {
  // config the down/up
  // #ifndef APP-NVUE
  pagerState.down = Object.assign(
    { use: true, offset: uni.upx2px(140), inRate: 0.8, outRate: 0.2 },
    props.down || { use: false }
  )
  pagerState.up = Object.assign({ use: true, offset: 80 }, props.up || { use: false })
  // #endif
  // #ifdef APP-NVUE
  pagerState.down = Object.assign(props.down || { use: false })
  pagerState.up = Object.assign(props.up || { use: false })
  // #endif

  setTimeout(() => {
    emit('inited')
  }, 0)
  if (props.autoUpdate) {
    setTimeout(() => {
      // to refresh data
      nInitContentList()
    }, 10)
  }
}
</script>

<style lang="scss" scoped></style>
