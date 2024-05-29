<template>
  <!-- #ifndef APP-NVUE -->
  <scroll-view
    v-if="hasScroll"
    :class="['n-bg-' + bgType]"
    :style="reverse + mrBoxStyle"
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
    @scrolltoupper="onScrollToUpper"
    @scrolltolower="onScrollToLower"
    @refresherpulling="onRefresherPulling"
    @refresherrefresh="onRefresherRefresh"
    @refresherrestore="onRefresherRestore"
    @refresherabort="onRefresherAbort"
  >
    <!-- #endif -->
    <!-- #ifdef APP-NVUE -->
    <list
      :class="['n-flex-1', 'n-bg-' + bgType]"
      :id="listId"
      :bounce="bounce"
      :style="reverse + mrBoxStyle"
      :ref="setListRef"
      :scrollable="scrollable"
      :pagingEnabled="pagingEnabled"
      :enable-back-to-top="enableBackToTop"
      :show-scrollbar="showScrollbar"
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
        :boxStyle="reverse + refreshStyle"
        :textStyle="refreshTextStyle"
        @refresh="nRefresh"
      ></n-refresher-n>
      <slot></slot>
      <slot name="token"></slot>
      <!-- in android, we must put loading in the last, or it will not trigger loading next page. -->
      <!-- it's the same in loadMore with loadMoreOffset -->
      <cell v-if="pagerState.up.use && !useLoading">
        <n-loader
          :isLoading="pagerState.isUpLoading"
          :hasMore="pagerState.hasMore"
          :showNoMore="showNoMore"
          :mainText="loadMainText"
          :loadingText="loadingText"
          :noMoreText="noMoreText"
          :loadingSrc="loadingSrc"
          :boxStyle="reverse + loadingStyle"
          :imgStyle="loadingImgStyle"
          :textStyle="loadingTextStyle"
        ></n-loader>
      </cell>
      <n-loader-n
        v-if="pagerState.up.use && useLoading"
        ref="nloader"
        :hasMore="pagerState.hasMore"
        :showNoMore="showNoMore"
        :mainText="loadMainText"
        :loadingText="loadingText"
        :noMoreText="noMoreText"
        :loadingSrc="loadingSrc"
        :boxStyle="reverse + loadingStyle"
        :imgStyle="loadingImgStyle"
        :textStyle="loadingTextStyle"
        @loading="nLoad"
      ></n-loader-n>
    </list>
    <!-- #endif -->
    <!-- #ifndef APP-NVUE -->
    <view
      :style="nMrScrollContentStyle"
      @touchstart="nTouchstartEvent"
      @touchmove="nTouchmoveEvent"
      @touchend="nTouchendEvent"
      @touchcancel="nTouchendEvent"
    >
      <view v-if="pagerState.down.use" :style="nMrRefreshStyle">
        <n-refresher
          :refreshing="pagerState.isDownLoading"
          :couldUnLash="nCouldUnLash"
          :rate="nDownRate"
          :mainText="refreshMainText"
          :pullingText="pullingText"
          :refreshingText="refreshingText"
          :boxStyle="reverse + refreshStyle"
          :textStyle="refreshTextStyle"
        ></n-refresher>
      </view>
      <view id="nlisttop"></view>
      <!-- content of scroll -->
      <slot></slot>
      <slot name="token"></slot>
      <view id="nlistbottom"></view>
      <n-loader
        v-if="pagerState.up.use"
        :isLoading="pagerState.isUpLoading"
        :hasMore="pagerState.hasMore"
        :showNoMore="showNoMore"
        :mainText="loadMainText"
        :loadingText="loadingText"
        :noMoreText="noMoreText"
        :loadingSrc="loadingSrc"
        :boxStyle="reverse + loadingStyle"
        :imgStyle="loadingImgStyle"
        :textStyle="loadingTextStyle"
      ></n-loader>
    </view>
  </scroll-view>
  <!-- #endif -->
  <!-- 没有scroll，仅仅只是使用页面滚动 -->
  <!-- #ifndef APP-NVUE -->
  <view v-if="!hasScroll">
    <view id="nlisttop"></view>
    <!-- content of scroll -->
    <slot></slot>
    <slot name="token"></slot>
    <view id="nlistbottom"></view>
    <n-loader
      v-if="pagerState.up.use"
      :isLoading="pagerState.isUpLoading"
      :hasMore="pagerState.hasMore"
      :showNoMore="showNoMore"
      :mainText="loadMainText"
      :loadingText="loadingText"
      :noMoreText="noMoreText"
      :loadingSrc="loadingSrc"
      :boxStyle="reverse + loadingStyle"
      :imgStyle="loadingImgStyle"
      :textStyle="loadingTextStyle"
    ></n-loader>
  </view>
  <!-- #endif -->
</template>

<script setup>
/**
 * n-list
 * @description 滚动列表
 * @property {Boolean} useLoading = [true|false] 是否启用loading组件，而不是loadmoreoffset触发
 * @property {Boolean} showScrollbar = [true|false] 是否显示scrollbar
 * @property {String} bgType = [nav|primary|success|warning|error|light|dark|inverse|custom|link|none|page|hover|mask|mask-dark|border|border-light|border-dark|gradient] 背景主题
 * @property {String} position 定位
 * @property {String} top 定位的top
 * @property {String} bottom 定位的bottom
 * @property {String} boxStyle 外层样式
 * @property {String} height 只开放非nvue-app下设置高度，nvue-app通过flex来实现高度继承
 * @property {String} reverse 颠倒列表的样式
 * @property {String} loadMainText 可以继续加载时的文字提示
 * @property {String} loadingText 正在加载时的文字提示
 * @property {String} noMoreText 没有更多时的文字提示
 * @property {Boolean} showNoMore = [true|false] 是否展示没有更多
 * @property {String} loadingSrc 加载中的gif图片
 * @property {String} loadingStyle loading的外层样式
 * @property {String} refreshMainText 下拉时提示文字
 * @property {String} pullingText 下拉时提示文字
 * @property {String} refreshingText 正在刷新的提示文字
 * @property {String} refreshStyle 刷新组件的外层样式
 * @property {Number} loadMoreOffset 使用loadmoreoffset时的触发偏移量
 * @property {Boolean} autoUpdate = [true|false] 是否自动加载第一页数据
 * @property {Object} down 上提加载的配置
 * @property {Object} up 上提加载的配置
 * @event {Function} scroll list 滚动时的 scroll 事件的监听
 * @event {Function} down 下拉刷新事件
 * @event {Function} up 上提加载事件
 * @event {Function} inited 初始化
 */
import { computed, watch, ref } from 'vue'

import { getHeight } from '../utils/system.js'
import { makeProps } from '../utils/props.js'

import { useScrollTo } from './useScrollTo.js'
import { useScroll } from './useScroll.js'
import { usePager } from './usePager.js'

const props = defineProps(
  makeProps([
    ['scrollable', true],
    ['enableBackToTop', false],
    ['useLoading', false],
    ['loadMoreOffset', 60],
    ['pagingEnabled', false],
    ['bounce', true],
    ['autoUpdate', false],
    ['down', { use: true, offset: uni.upx2px(140), inRate: 0.8, outRate: 0.2 }],
    ['up', { use: true, offset: 80 }],
    ['hasScroll', true],
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
    ['isParent', false],
    ['isChild', false],
    ['headerHeight', 0],
    ['listId', ''],
    ['parentId', ''],
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
  'toggle',
  'move',
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
  setSpecialEffects,
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
  // #ifdef APP-NVUE
  setSpecialEffects,
  // #endif
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

created()

function created() {
  // config the down/up
  // #ifndef APP-NVUE
  pagerState.down = Object.assign(
    { use: true, offset: uni.upx2px(140), inRate: 0.8, outRate: 0.2 },
    props.down || { use: false }
  )
  pagerState.up = Object.assign({ use: true, offset: 80 }, props.up || { use: false })
  pagerState.scrollable = props.scrollable
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

watch(
  () => props.down,
  (newV) => {
    // #ifndef APP-NVUE
    pagerState.down = Object.assign(
      { use: true, offset: uni.upx2px(140), inRate: 0.8, outRate: 0.2 },
      newV || { use: false }
    )
    // #endif
    // #ifdef APP-NVUE
    pagerState.down = Object.assign(newV || { use: false })
    // #endif
  }
)
watch(
  () => props.up,
  (newV) => {
    // #ifndef APP-NVUE
    pagerState.up = Object.assign({ use: true, offset: 80 }, newV || { use: false })
    // #endif
    // #ifdef APP-NVUE
    pagerState.up = Object.assign(newV || { use: false })
    // #endif
  }
)
// #ifndef APP-NVUE
watch(
  () => props.scrollable,
  (newV) => {
    pagerState.scrollable = newV
  }
)
watch(
  () => pagerState.scrollable,
  (newV) => {
    emit('toggle', newV)
  }
)
// #endif
</script>

<style lang="scss" scoped></style>
