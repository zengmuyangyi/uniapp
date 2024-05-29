<template>
  <scroll-view
    ref="nscroll"
    id="nscroll"
    :scroll-x="true"
    :scroll-left="scrollLeft"
    :scroll-with-animation="true"
    :show-scrollbar="false"
    :class="['n-bg-' + bgType, 'n-border-' + border, 'n-flex-row', 'n-tabs-scroll']"
    :style="mrScrollStyle"
  >
    <view class="n-flex-column n-position-relative">
      <view
        v-if="hasIndicator && !hoverTop"
        ref="nunderline"
        :class="[
          absIndicator && 'n-tab-item-underline',
          'n-bg-' + indicatorType,
          isTap ? 'n-tab-item-animation' : '',
        ]"
        :style="mrIndStyle"
      >
        <slot name="indicator"></slot>
      </view>
      <view :class="['n-flex-row', 'n-justify-' + justify, 'n-wrap-nowrap']" :style="mrTabsStyle">
        <!-- #ifndef APP-NVUE -->
        <view :style="{ width: left, 'flex-shrink': 0 }"></view>
        <!-- #endif -->
        <!-- #ifdef APP-NVUE -->
        <view :style="{ width: left }"></view>
        <!-- #endif -->
        <view
          v-for="(item, index) in items"
          :key="index"
          :ref="(el) => setTabRefs(el, index)"
          :id="'item' + index"
          class="n-flex-column n-justify-center n-align-center n-position-relative"
          :style="
            mrItemStyle +
            (index === value ? activeItemStyle : '') +
            (index === items.length - 1 ? 'margin-right:0;' : '')
          "
          @click="changeTab(index)"
        >
          <text
            :class="[
              'n-color-' + (index === value ? activeTextType : textType),
              'n-size-' + (index === value ? activeTextSize : textSize),
            ]"
            :style="mrTextStyle + (index === value ? activeTextStyle : '')"
            >{{ textLabel ? item[textLabel] : item }}</text
          >
          <n-badge
            v-if="item.badge"
            :size="item.badge.size || badgeConfig.size || '12rpx'"
            :bgType="item.badge.bgType || badgeConfig.bgType || 'error'"
            :text="item.badge.text || ''"
            :border="item.badge.border || badgeConfig.border || 'none'"
            :textType="item.badge.textType || badgeConfig.textType || 'inverse'"
            :textSize="item.badge.textSize || badgeConfig.textSize || 'ss'"
            :textStyle="item.badge.textStyle || badgeConfig.textStyle || ''"
            :boxStyle="item.badge.boxStyle || badgeConfig.boxStyle || ''"
          ></n-badge>
        </view>
        <!-- #ifndef APP-NVUE -->
        <view :style="{ width: right, 'flex-shrink': 0 }"></view>
        <!-- #endif -->
        <!-- #ifdef APP-NVUE -->
        <view :style="{ width: right }"></view>
        <!-- #endif -->
      </view>
      <view
        v-if="hasIndicator && hoverTop"
        ref="nunderline"
        :class="[
          absIndicator && 'n-tab-item-underline',
          'n-bg-' + indicatorType,
          isTap ? 'n-tab-item-animation' : '',
        ]"
        :style="mrIndStyle"
      >
        <slot name="indicator"></slot>
      </view>
    </view>
  </scroll-view>
</template>

<script setup>
/**
 * n-tabs-h
 * @description 横向tabs。item/indicator有固定宽度和动态宽度两种
 * @property {Array} items tabs内容
 * @property {Number} value 当前index
 * @property {Number} last 联动时需要。因为scroll的过程中，current就会发生变化，我们需要用另外一个来记录
 * @property {String} textLabel 文字内容的字段
 * @property {Number} offset 联动时swiper的偏移量。px. swiperScroll dx
 * @property {String} swiperWidth swiper的宽度。联动时需要
 * @property {Boolean} isTap = [true|false] 是否是点击tab。不联动时一直设置为true
 * @property {String} justify = [start|center|end] center或者end的时候，请注意items的数量不要超过总尺寸
 * @property {String} scrollSize scroll的自定义宽度
 * @property {String} textSize = [ss|s|base|l|ll] 文字的尺寸主题
 * @property {String} activeTextSize = [ss|s|base|l|ll] 当前项文字的尺寸主题
 * @property {String} bgType = [nav|primary|success|warning|error|light|dark|inverse|custom|link|none|page|hover|mask|mask-dark|border|border-light|border-dark|gradient] 背景主题
 * @property {String} textType = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 文字颜色主题
 * @property {String} activeTextType = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 当前项的文字颜色主题
 * @property {String} height 自定义高度
 * @property {String} width = [0] tab项的宽度。0的时候，自适应宽度
 * @value 0 自适应宽度
 * @property {String} left 左侧空白占位
 * @property {String} right 右侧空白占位
 * @property {String} space 各个tab之间的间隙
 * @property {String} border = [all-light|all-dark|all-primary|all-success|all-warning|all-error|all-inverse|all-custom|all-link|top-light|top-dark|top-primary|top-success|top-warning|top-error|top-inverse|top-custom|top-link|right-light|right-dark|right-primary|right-success|right-warning|right-error|right-inverse|right-custom|right-link|bottom-light|bottom-dark|bottom-primary|bottom-success|bottom-warning|bottom-error|bottom-inverse|bottom-custom|bottom-link|left-light|left-dark|left-primary|left-success|left-warning|left-error|left-inverse|left-custom|left-link|none] 边框主题
 * @property {Boolean} hasIndicator = [true|false] 是否有底下指示器
 * @property {String} indicatorType = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 指示器的背景主题
 * @property {String} indicatorWidth = [0] 指示器的自定义宽度。0的时候动态宽度，自适应宽度
 * @value 0 自适应宽度
 * @property {String} indicatorHeight 指示器的自定义高度
 * @property {String} indicatorRadius 指示器的自定义圆角
 * @property {Boolean} absIndicator = [true|false] indicator是否绝对定位
 * @property {String} absIndicator indicator是否绝对定位
 * @property {String} boxStyle 外层样式，也是scroll的样式
 * @property {String} tabsStyle tabs的内容样式
 * @property {String} textStyle 文字样式
 * @property {String} activeTextStyle 当前项的文字样式
 * @property {String} itemStyle tab项的样式
 * @property {String} activeItemStyle 当前项的tab样式
 * @property {String} indicatorStyle 指示器的样式
 * @property {Number} updateTime 通过改变该值触发位置的重新计算。主要是为了兼容各大平台位置获取的时机问题。在弹层里面，items能够很快拿到，但是不一定位置信息就可以立马拿到
 * @property {Number} delay 延迟获取元素内容，只影响mounted里面的调用，-1表示不延迟。其他情况使用updateTime
 * @property {Number} updateDelay 延迟获取元素内容，只影响items改变时的调用，-1表示不延迟。其他情况使用updateTime
 * @property {Boolean} hoverTop = [true|false] indicator是否在最上层
 * @event {Function} change 点击标签时触发
 */
import { computed, ref, watch, onMounted, nextTick, getCurrentInstance } from 'vue'
// #ifdef APP-NVUE
const dom = uni.requireNativePlugin('dom')
const animation = uni.requireNativePlugin('animation')
// #endif
import { getPx } from '../utils/system.js'
import { makeProps } from '../utils/props.js'

const props = defineProps(
  makeProps([
    ['items', []],
    ['value', 0],
    ['last', 0],
    'textLabel',
    ['offset', 0],
    ['swiperWidth', '750rpx'],
    ['isTap', true],
    ['justify', 'start'],
    ['scrollSize', '750rpx'],
    ['textSize', 'base'],
    ['activeTextSize', 'base'],
    ['bgType', 'inverse'],
    ['textType', 'text'],
    ['activeTextType', 'primary'],
    ['height', '80rpx'],
    ['width', '120rpx'],
    ['left', '0'],
    ['right', '0'],
    ['space', '0px'],
    'border',
    ['badgeConfig', {}],
    ['hasIndicator', true],
    ['indicatorType', 'primary'],
    ['indicatorWidth', '80rpx'],
    ['indicatorHeight', '5rpx'],
    ['indicatorRadius', '4rpx'],
    ['absIndicator', true],
    'boxStyle',
    'tabsStyle',
    'textStyle',
    'activeTextStyle',
    'itemStyle',
    'activeItemStyle',
    'indicatorStyle',
    ['updateTime', 0],
    ['delay', -1],
    ['updateDelay', -1],
    ['hoverTop', false],
  ])
)
const emit = defineEmits(['update:value', 'change'])

const dyIndicatorWidth = ref(0)
const dyIndicatorLeft = ref(0)
const dyItems = ref({})
const scrollLeft = ref(0)
const nunderline = ref(null)
const nscroll = ref(null)

let timer = null
const tabRefs = {}
const { proxy } = getCurrentInstance()

function setTabRefs(el, idx) {
  if (el) {
    tabRefs['item' + idx] = el
  }
}

const mrIndStyle = computed(() => {
  let _style = `border-radius:${props.indicatorRadius};`
  _style += `height:${props.indicatorHeight};`
  // #ifndef APP-NVUE
  _style += `width:${dyIndicatorWidth.value}px;`
  _style += `left:${dyIndicatorLeft.value}px;`
  // #endif
  return _style + props.indicatorStyle
})
const spacePx = computed(() => {
  return getPx(props.space)
})
const scrollSizePx = computed(() => {
  return getPx(props.scrollSize)
})
const widthPx = computed(() => {
  return getPx(props.width)
})
const heightPx = computed(() => {
  return getPx(props.height)
})
const fixedInd = computed(() => {
  const indW = parseInt(props.indicatorWidth)
  if (indW > 0) {
    return true
  }
  const iw = parseInt(props.width)
  if (iw > 0) {
    return true
  }
  return false
})
const fixedIndWidth = computed(() => {
  const indW = parseInt(props.indicatorWidth)
  if (indW > 0) {
    return props.indicatorWidth
  }
  const iw = parseInt(props.width)
  if (iw > 0) {
    return props.width
  }
  return '0'
})
const fixedIndWidthPx = computed(() => {
  return getPx(fixedIndWidth.value)
})
const mrScrollStyle = computed(() => {
  return 'width:' + scrollSizePx.value + 'px;' + props.boxStyle
})
const mrTabsStyle = computed(() => {
  let _style = ''
  if (props.justify != 'start') {
    _style += 'width:' + scrollSizePx.value + 'px;'
  }
  return _style + props.tabsStyle
})
const mrItemStyle = computed(() => {
  let _style = `height:${heightPx.value}px;`
  const w = parseInt(props.width)
  if (w > 0) {
    _style += `width:${widthPx.value}px;margin-right:${spacePx.value}px;`
  } else {
    _style += `margin-right:${spacePx.value}px;`
  }
  return _style + props.itemStyle
})
const mrTextStyle = computed(() => {
  let stl = props.textStyle
  // #ifndef APP-NVUE
  stl = 'white-space: nowrap;' + props.textStyle
  // #endif
  return stl
})
const swiperWidthPx = computed(() => {
  return getPx(props.swiperWidth)
})

onMounted(async () => {
  if (props.delay >= 0) {
    setTimeout(async () => {
      await toCacheItemsSize()
      toCurrentIndex(props.value, true)
    }, props.delay)
  } else {
    await toCacheItemsSize()
    toCurrentIndex(props.value, true)
  }
})

watch(
  () => props.value,
  (newV) => {
    // #ifdef APP-NVUE
    toCurrentIndex(newV)
    // #endif
    // #ifndef APP-NVUE
    // 否则在点击过程中可能响应不正确
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      toCurrentIndex(newV)
      timer = null
    }, 0)
    // #endif
  }
)
watch(
  () => props.items,
  () => {
    // 清缓存
    dyItems.value = {}
    nextTick(async () => {
      if (props.updateDelay >= 0) {
        setTimeout(async () => {
          await toCacheItemsSize()
          toCurrentIndex(props.value, true)
        }, props.updateDelay)
      } else {
        await toCacheItemsSize()
        toCurrentIndex(props.value, true)
      }
    })
  }
)
watch(
  () => props.offset,
  (newV) => {
    toHandleSwiperScroll(newV)
  }
)
watch(
  () => props.updateTime,
  async () => {
    dyItems.value = {}
    await toCacheItemsSize()
    toCurrentIndex(props.value, true)
  }
)

function changeTab(index) {
  emit('change', index)
}
async function toCurrentIndex(index, isInit = false) {
  let nowWidth = 0
  let _left = 0
  let indWidth = 0
  let indLeft = 0
  let scrollL = 0
  // first to get scroll position
  const cachedScroll = dyItems.value['scroll']
  if (cachedScroll) {
    scrollL = cachedScroll.left
  } else {
    try {
      const res = await getElSize(-100)
      scrollL = res.left
      dyItems.value['scroll'] = { left: scrollL }
    } catch (e) {
      //TODO handle the exception
    }
  }
  const cached = dyItems.value['item' + index]
  if (cached) {
    _left = cached.left
    nowWidth = cached.width
    indWidth = cached.ind
    indLeft = cached.indLeft
  } else {
    try {
      const result = await getElSize(index)
      _left = result.left - scrollL
      nowWidth = result.width
      if (fixedInd.value) {
        indWidth = fixedIndWidthPx.value
      } else {
        indWidth = nowWidth
      }
      indLeft = _left + (nowWidth - indWidth) * 0.5
      // into cache
      dyItems.value['item' + index] = {
        width: nowWidth,
        left: _left,
        ind: indWidth,
        indLeft: indLeft,
      }
    } catch (e) {
      //TODO handle the exception
    }
  }
  const _width = _left + nowWidth + spacePx.value
  // 移动indicator
  dyIndicatorWidth.value = indWidth
  dyIndicatorLeft.value = indLeft
  // #ifdef APP-NVUE
  const indEl = nunderline.value
  if (isInit) {
    // ios下刚打开时发现总是靠最左侧。去掉duration就好了
    animation.transition(indEl, {
      styles: {
        width: `${dyIndicatorWidth.value}px`,
        transform: `translateX(${dyIndicatorLeft.value}px)`,
      },
      duration: 0,
    })
  } else {
    animation.transition(indEl, {
      styles: {
        width: `${dyIndicatorWidth.value}px`,
        transform: `translateX(${dyIndicatorLeft.value}px)`,
      },
      duration: 200,
    })
  }
  // #endif
  // 居中当前item
  const scrollWidth = scrollSizePx.value
  const offset = _width - (nowWidth / 2 + spacePx.value) - scrollWidth / 2
  if (offset > 0) {
    // app端scrollTo会导致右边已经不足以居中的时候也居中，需要额外判断右边剩下的长度
    // 我们这里采用dom.scrollToElement. dom.scrollToElement是滑动到最左侧
    // #ifdef APP-NVUE
    const refName = 'item' + index
    const el = tabRefs[refName]
    dom.scrollToElement(el, {
      offset: -0.5 * scrollWidth + nowWidth * 0.5,
      animated: true,
    })
    // #endif
    // #ifndef APP-NVUE
    scrollLeft.value = offset
    // #endif
  } else {
    if (scrollLeft.value === 0) {
      scrollLeft.value = 0.1
    } else {
      scrollLeft.value = 0
    }
  }
}
async function toHandleSwiperScroll(dx) {
  // 在mp-wx里面scroll的过程中，实际上也会引起current的变化，所以不能通过value来获取当前的tab
  // const nowIndex = props.value
  const nowIndex = props.last
  let nextIndex = nowIndex
  // 至少 1px 才做判断
  if (dx > -1 && dx < 1) return
  if (dx > 0) {
    nextIndex += 1
  } else if (dx < 0) {
    nextIndex -= 1
  }
  const pg = Math.abs(swiperWidthPx.value / dx)
  if (nextIndex >= props.items.length || nextIndex < 0 || nowIndex === nextIndex) {
    return
  }
  const theItem = dyItems.value['item' + nowIndex]
  const nextItem = dyItems.value['item' + nextIndex]

  dyIndicatorLeft.value = theItem.indLeft + (nextItem.indLeft - theItem.indLeft) / pg
  dyIndicatorWidth.value = theItem.ind + (nextItem.ind - theItem.ind) / pg

  // #ifdef APP-NVUE
  const indEl = nunderline.value
  animation.transition(indEl, {
    styles: {
      width: `${dyIndicatorWidth.value}px`,
      transform: `translateX(${dyIndicatorLeft.value}px)`,
    },
  })
  // #endif
}
async function toCacheItemsSize() {
  let scrollL = 0
  try {
    const res = await getElSize(-100)
    scrollL = res.left
    dyItems.value['scroll'] = { left: scrollL }
  } catch (e) {
    //TODO handle the exception
  }
  for (const i in props.items) {
    try {
      const result = await getElSize(i)
      let indWidth = result.width
      if (fixedInd.value) {
        indWidth = fixedIndWidthPx.value
      }
      dyItems.value['item' + i] = {
        width: result.width,
        left: result.left - scrollL,
        ind: indWidth,
        indLeft: result.left - scrollL + (result.width - indWidth) * 0.5,
      }
    } catch (e) {
      //TODO handle the exception
    }
  }
}
function getElSize(index) {
  return new Promise((res, rej) => {
    // #ifndef APP-NVUE
    let idName = '#item' + index
    if (index === -100) {
      idName = '#nscroll'
    }
    const el = uni.createSelectorQuery().in(proxy).select(idName)
    el.fields(
      {
        size: true,
        rect: true,
      },
      (data) => {
        if (data) {
          res(data)
        } else {
          rej({})
        }
      }
    ).exec()
    // #endif
    // #ifdef APP-NVUE
    let refName = 'item' + index
    let _el = null
    if (index === -100) {
      _el = nscroll.value
    } else {
      _el = tabRefs[refName]
    }
    dom.getComponentRect(_el, (data) => {
      if (data.result) {
        res(data.size)
      } else {
        rej({})
      }
    })
    // #endif
  })
}
</script>

<style lang="scss" scoped>
/* #ifndef APP-NVUE */
.n-tabs-scroll ::-webkit-scrollbar {
  display: none;
  width: 0 !important;
  height: 0 !important;
  color: transparent;
  -webkit-appearance: none;
  background: transparent;
}
/* #endif */

.n-tab-item {
  &-underline {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
  }
  &-animation {
    /* #ifndef APP-NVUE */
    transition-property: left, width;
    transition-duration: 0.2s;
    transition-timing-function: ease;
    /* #endif */
  }
  &-noani {
    transition-duration: 0s;
  }
}
</style>
