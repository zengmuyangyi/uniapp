<template>
  <scroll-view
    ref="nscroll"
    id="nscroll"
    :scroll-y="true"
    :scroll-top="scrollTop"
    :scroll-with-animation="true"
    :show-scrollbar="false"
    :class="['n-bg-' + bgType, 'n-tabs-scroll']"
    :style="mrScrollStyle"
  >
    <view class="n-tabs" :style="mrTabsStyle">
      <view
        v-if="hasIndicator && !hoverTop"
        :class="[
          'n-tab-item-indicator',
          'n-bg-' + (indicatorType && indicatorType.length > 0 ? indicatorType : 'text'),
        ]"
        :style="mrIndStyle"
      >
        <slot name="indicator"></slot>
      </view>
      <view :style="{ height: top }"></view>
      <view
        v-for="(item, index) in items"
        :key="index"
        :ref="(el) => setTabRefs(el, index)"
        :id="'item' + index"
        class="n-flex-row n-align-center"
        :style="mrItemStyle + (index === value ? activeItemStyle : '')"
        @click="changeTab(index)"
      >
        <text
          :class="[
            'n-color-' + (index === value ? activeTextType : textType),
            'n-size-' + (index === value ? activeTextSize : textSize),
          ]"
          :style="textStyle + (index === value ? activeTextStyle : '')"
          >{{ textLabel ? item[textLabel] : item }}</text
        >
      </view>
      <view :style="{ height: bottom }"></view>
      <view
        v-if="hasIndicator && hoverTop"
        :class="[
          'n-tab-item-indicator',
          'n-bg-' + (indicatorType && indicatorType.length > 0 ? indicatorType : 'text'),
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
 * tabs-v
 * @description 竖向tabs。item有固定高度和动态高度两种
 * @property {Array} items tabs内容
 * @property {Number} value 当前index
 * @property {String} textLabel 文字内容的字段
 * @property {String} scrollSize scroll的自定义高度
 * @property {String} justify = [start|center|end] center或者end的时候，请注意items的数量不要超过总尺寸
 * @property {String} textSize = [ss|s|base|l|ll] 文字尺寸主题
 * @property {String} activeTextSize = [ss|s|base|l|ll] 当前项文字尺寸主题
 * @property {String} bgType = [nav|primary|success|warning|error|light|dark|inverse|custom|link|none|page|hover|mask|mask-dark|border|border-light|border-dark|gradient] 背景主题
 * @property {String} textType = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 文字颜色主题
 * @property {String} activeTextType = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 当前项文字颜色主题
 * @property {String} height = [0] tab项的自定义高度。0的时候，自适应高度
 * @value 0 自适应高度
 * @property {String} width tab项的自定义宽度
 * @property {String} top 顶部空白占位
 * @property {String} bottom 底部空白占位
 * @property {Boolean} animated = [true|false] indicator移动时是否有动画效果
 * @property {Boolean} hasIndicator = [true|false] 是否有指示器
 * @property {String} indicatorType = [nav-title|nav-icon|nav-item|primary|success|warning|error|inverse|custom|link|text|second|third|forth|place|disabled] 指示器背景主题
 * @property {String} indicatorWidth 指示器自定义宽度
 * @property {String} indicatorHeight = [0] 指示器自定义高度。0的时候动态高度，自适应高度
 * @value 0 自适应高度
 * @property {String} indicatorRadius 指示器自定义圆角
 * @property {String} indicatorLeft 指示器与左侧的距离
 * @property {String} boxStyle 外层样式。也是scroll的样式
 * @property {String} textStyle 文字样式
 * @property {String} activeTextStyle 当前项的文字样式
 * @property {String} itemStyle tab项的样式
 * @property {String} activeItemStyle 当前tab项的样式
 * @property {String} indicatorStyle 指示器的样式
 * @property {Number} updateTime 通过改变该值触发位置的重新计算。主要是为了兼容各大平台位置获取的时机问题。在弹层里面，items能够很快拿到，但是不一定位置信息就可以立马拿到
 * @property {Number} delay 延迟获取元素内容，只影响mounted里面的调用，-1表示不延迟。其他情况使用updateTime
 * @property {Number} updateDelay 延迟获取元素内容，只影响items改变时的调用，-1表示不延迟。其他情况使用updateTime
 * @property {Boolean} indicator = [true|false]是否在最上层
 * @event {Function} change 点击标签时触发
 */
import { computed, ref, watch, onMounted, nextTick, getCurrentInstance } from 'vue'
// #ifdef APP-NVUE
const dom = uni.requireNativePlugin('dom')
const animation = uni.requireNativePlugin('animation')
// #endif
import { makeProps } from '../utils/props.js'

const props = defineProps(
  makeProps([
    ['items', []],
    ['value', 0],
    'textLabel',
    ['justify', 'flex-start'],
    ['scrollSize', '750rpx'],
    ['textSize', 'base'],
    ['activeTextSize', 'base'],
    ['bgType', 'inverse'],
    ['textType', 'text'],
    ['activeTextType', 'primary'],
    ['height', '80rpx'],
    ['width', '120rpx'],
    'border',
    ['top', '0'],
    ['bottom', '0'],
    ['animated', true],
    ['hasIndicator', true],
    ['indicatorType', 'primary'],
    ['indicatorWidth', '5rpx'],
    ['indicatorHeight', '40rpx'],
    ['indicatorRadius', '4rpx'],
    ['indicatorLeft', '6rpx'],
    'boxStyle',
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

let timer = null
const tabRefs = {}
const { proxy } = getCurrentInstance()

const dyIndicatorHeight = ref(0)
const dyIndicatorTop = ref(0)
const dyItems = ref({})
const scrollTop = ref(0)
const firstTop = ref(0)
const nscroll = ref(null)

function setTabRefs(el, idx) {
  if (el) {
    tabRefs['item' + idx] = el
  }
}

const mrIndStyle = computed(() => {
  let _style = `width:${props.indicatorWidth};border-radius:${props.indicatorRadius};`
  _style += `top:${dyIndicatorTop.value}px;`
  _style += `height:${dyIndicatorHeight.value}px;`
  _style += `left:${props.indicatorLeft};`
  if (!props.animated) {
    _style += 'transition-duration: 0ms;'
  }
  return _style + props.indicatorStyle
})
const scrollSizePx = computed(() => {
  if (props.scrollSize.indexOf('rpx') > 0) {
    return uni.upx2px(parseInt(props.scrollSize || 0))
  }
  return parseInt(props.scrollSize || 0)
})
const fixedInd = computed(() => {
  const indH = parseInt(props.indicatorHeight)
  if (indH > 0) {
    return true
  }
  return false
})
const fixedIndHeight = computed(() => {
  const indH = parseInt(props.indicatorHeight)
  if (indH > 0) {
    return props.indicatorHeight
  }
  return '0'
})
const fixedIndHeightPx = computed(() => {
  const indH = parseInt(fixedIndHeight.value)
  return uni.upx2px(indH)
})
const mrScrollStyle = computed(() => {
  let _style = ''
  _style += 'height:' + props.scrollSize + ';'
  _style += 'width:' + props.width + ';'
  // #ifdef APP-NVUE
  _style += `flex-direction:column;justify-content:${props.justify};`
  // #endif
  return _style + props.boxStyle
})
const mrTabsStyle = computed(() => {
  let _style = `flex-direction:column;justify-content:${props.justify};`
  // 只有在column排布的时候center或者end才需要设置高度，而且这个时候注意，内容不要超过实际高度
  if (
    props.justify === 'center' ||
    props.justify === 'flex-end' ||
    props.justify === 'space-between'
  ) {
    _style += 'height:' + props.scrollSize + ';'
  }
  return _style
})
const mrItemStyle = computed(() => {
  let _style = `width:${props.width};`
  const h = parseInt(props.height)
  if (h > 0) {
    _style += `height:${props.height};`
  }
  return _style + props.itemStyle
})

onMounted(async () => {
  if (props.delay >= 0) {
    setTimeout(async () => {
      await toCacheItemsSize()
      toCurrentIndex(props.value)
    }, props.delay)
  } else {
    await toCacheItemsSize()
    toCurrentIndex(props.value)
  }
})

watch(
  () => props.value,
  (newV) => {
    toCurrentIndex(newV)
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
          toCurrentIndex(props.value)
        }, props.updateDelay)
      } else {
        await toCacheItemsSize()
        toCurrentIndex(props.value)
      }
    })
  }
)
watch(
  () => props.updateTime,
  async () => {
    dyItems.value = {}
    await toCacheItemsSize()
    toCurrentIndex(props.value)
  }
)

function changeTab(index, animated = true) {
  emit('change', index)
}
async function toCurrentIndex(index) {
  let nowHeight = 0
  let _top = 0
  let indHeight = 0
  let indTop = 0
  let scrollT = 0
  const cachedScroll = dyItems.value['scroll']
  if (cachedScroll) {
    scrollT = cachedScroll.top
  } else {
    try {
      const res = await getElSize(-100)
      scrollT = res.top
      dyItems.value['scroll'] = { top: scrollT }
    } catch (e) {
      //TODO handle the exception
    }
  }
  const cached = dyItems.value['item' + index]
  if (cached) {
    _top = cached.top
    nowHeight = cached.height
    indHeight = cached.ind
    indTop = cached.indTop
  } else {
    try {
      const result = await getElSize(index)
      _top = result.top - scrollT
      nowHeight = result.height
      if (fixedInd.value) {
        indHeight = fixedIndHeightPx.value
      } else {
        indHeight = nowHeight
      }
      indTop = _top + (nowHeight - indHeight) * 0.5
      // into cache
      dyItems.value['item' + index] = {
        height: nowHeight,
        top: _top,
        ind: indHeight,
        indTop: indTop,
      }
    } catch (e) {
      //TODO handle the exception
    }
  }
  const _height = _top + nowHeight
  // 移动indicator
  dyIndicatorHeight.value = indHeight
  dyIndicatorTop.value = indTop
  // 居中
  const scrollHeight = scrollSizePx.value
  const offset = _height - nowHeight / 2 - scrollHeight / 2
  if (offset > 0) {
    // #ifdef APP-NVUE
    const refName = 'item' + index
    const el = tabRefs[refName]
    dom.scrollToElement(el, {
      offset: -0.5 * scrollHeight + nowHeight * 0.5,
      animated: true,
    })
    // #endif
    // #ifndef APP-NVUE
    scrollTop.value = offset
    // #endif
  } else {
    if (scrollTop.value === 0) {
      scrollTop.value = 0.1
    } else {
      scrollTop.value = 0
    }
  }
}
async function toCacheItemsSize() {
  let scrollT = 0
  try {
    const res = await getElSize(-100)
    scrollT = res.top
    dyItems.value['scroll'] = { top: scrollT }
  } catch (e) {
    //TODO handle the exception
  }
  for (const i in props.items) {
    try {
      const result = await getElSize(i)
      let indHeight = result.height
      if (fixedInd.value) {
        indHeight = fixedIndHeightPx.value
      }
      const top = result.top - scrollT
      dyItems.value['item' + i] = {
        height: result.height,
        top: top,
        ind: indHeight,
        indTop: top + (result.height - indHeight) * 0.5,
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
  -webkit-appearance: none;
  background: transparent;
}
/* #endif */

.n-tabs {
  position: relative;
}
.n-tab-item {
  &-indicator {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 0;
    overflow: hidden;
    transition-property: height, top;
    transition-duration: 200ms;
    transition-timing-function: ease;
  }
}
</style>
