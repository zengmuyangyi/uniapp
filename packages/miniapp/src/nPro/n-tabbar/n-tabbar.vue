<template>
  <view class="n-tab-page n-flex-column" :style="{ top: topPx + 'px' }">
    <view
      class="n-tab-page-container n-flex-row"
      ref="ntabbarcontainer"
      :style="mrTabContainerStyle + noWeexTransform"
    >
      <slot></slot>
    </view>
    <view v-if="isSeize">
      <view :style="{ height: tabHeightPx + 'px' }"></view>
      <n-height height="x" v-if="considerXBar" bgType="none"></n-height>
    </view>
    <!-- tabs bg -->
    <slot name="bg">
      <view v-if="tabStyle.image" class="n-tabs-img" :style="tabStyle.imageBoxStyle || ''">
        <image :src="tabStyle.image" :style="tabStyle.imageStyle || ''" mode="aspectFill"></image>
        <n-height
          height="x"
          v-if="considerXBar && !tabStyle.imageWidthXBar"
          :bgType="xBarBgType"
          :boxStyle="xBarStyle"
        ></n-height>
      </view>
    </slot>
    <slot name="tabs">
      <view class="n-tabs n-flex-column" :style="tabStyle.boxStyle || ''">
        <view class="n-tabs-items n-flex-row" :style="tabStyle.tabsStyle || ''">
          <view
            bubble="true"
            class="n-tabs-item n-flex-column n-flex-1 n-align-center n-justify-between"
            v-for="(item, idx) in tabs"
            :key="idx"
            :style="mrItemStyle"
            @tap="setPage(idx)"
          >
            <view
              v-if="!item.isHump"
              class="n-tabs-item-icon n-flex-row n-justify-center n-align-center"
              :style="'width:' + (item.iconBoxWidth || mrIconWidth) + ';'"
            >
              <image
                :src="currentPage === idx ? item.selectedIcon : item.icon"
                :style="
                  currentPage === idx
                    ? (tabStyle.selectedIconStyle || '') + (item.selectedIconStyle || '')
                    : (tabStyle.iconStyle || '') + (item.iconStyle || '')
                "
              ></image>
              <view
                v-if="item.badge"
                class="n-tabs-item-badge"
                :style="(tabStyle.badgeStyle || '') + (item.badgeStyle || '')"
              >
                <text
                  class="n-tabs-item-badge-text"
                  :style="(tabStyle.badgeTextStyle || '') + (item.badgeTextStyle || '')"
                  >{{ item.badge }}</text
                >
              </view>
              <view
                v-if="item.dot && !item.badge"
                class="n-tabs-item-dot"
                :style="(tabStyle.dotStyle || '') + (item.dotStyle || '')"
              ></view>
            </view>
            <text
              v-if="!item.isHump"
              :class="['n-tabs-item-text', currentPage === idx && 'n-tabs-item-text-selected']"
              :style="
                currentPage === idx
                  ? (tabStyle.selectedTitleStyle || '') + (item.selectedTitleStyle || '')
                  : (tabStyle.titleStyle || '') + (item.titleStyle || '')
              "
              >{{ currentPage === idx ? item.selectedTitle : item.title }}</text
            >
          </view>
        </view>
        <n-height
          height="x"
          v-if="considerXBar && !tabStyle.imageWidthXBar"
          :bgType="xBarBgType"
          :boxStyle="xBarStyle"
        ></n-height>
      </view>
      <!-- hump -->
      <view
        bubble="true"
        v-if="hasHump"
        class="n-tabs-hump n-flex-column n-align-center n-justify-center"
        :style="mrHumpStyle || ''"
        @tap="setPage(humpIndex)"
      >
        <view
          class="n-tabs-item-icon n-flex-row n-justify-center n-align-center"
          :style="'width:' + (humpItem.iconBoxWidth || mrIconWidth) + ';'"
        >
          <image
            :src="currentPage === humpIndex ? humpItem.selectedIcon : humpItem.icon"
            :style="
              currentPage === humpIndex
                ? (tabStyle.selectedIconStyle || '') + (humpItem.selectedIconStyle || '')
                : (tabStyle.iconStyle || '') + (humpItem.iconStyle || '')
            "
          ></image>
          <view
            v-if="humpItem.badge"
            class="n-tabs-item-badge"
            :style="(tabStyle.badgeStyle || '') + (humpItem.badgeStyle || '')"
          >
            <text
              class="n-tabs-item-badge-text"
              :style="(tabStyle.badgeTextStyle || '') + (humpItem.badgeTextStyle || '')"
              >{{ humpItem.badge }}</text
            >
          </view>
          <view
            v-if="humpItem.dot && !humpItem.badge"
            class="n-tabs-item-dot"
            :style="(tabStyle.dotStyle || '') + (humpItem.dotStyle || '')"
          ></view>
        </view>
        <text
          v-if="humpItem.title"
          :class="['n-tabs-item-text', currentPage === humpIndex && 'n-tabs-item-text-selected']"
          :style="
            currentPage === humpIndex
              ? (tabStyle.selectedTitleStyle || '') + (humpItem.selectedTitleStyle || '')
              : (tabStyle.titleStyle || '') + (humpItem.titleStyle || '')
          "
          >{{ currentPage === humpIndex ? humpItem.selectedTitle : humpItem.title }}</text
        >
      </view>
    </slot>
  </view>
</template>

<script setup>
/**
 * n-tabbar
 * @description 自定义tabbar
 * @property {Array} tabs tabs的内容以及个性化的配置。isHump表示是否凸起,noPage表示点击当前tab时不切换，依然停留在原tab内容。hump具备humpStyle,hump有humpBottom(就是距离底部的距离px)。icon,selectedIcon,title,selectedTitle,badge,dot,isHump,noPage,humpStyle,humpBottom,iconStyle,selectedIconStyle,titleStyle,selectedTitleStyle,badgeStyle,badgeTextStyle,dotStyle,iconBoxWidth
 * @property {Number} duration 页面切换的动画周期
 * @property {String} timingFunction 页面切换的动画函数
 * @property {String} top 距离顶部的距离
 * @property {Boolean} isSeize = [true|false] tabs以及xbar的高度是否有占位
 * @property {Boolean} type = [true|false] considerXBar
 * @property {String} xBarbgType = [nav|primary|success|warning|error|light|dark|inverse|custom|link|none|page|hover|mask|mask-dark|border|border-light|border-dark|gradient] xbar的背景主题
 * @property {String} xBarStyle xbar的样式
 * @event {Function} tabClicked 点击事件
 */
import { ref, computed } from 'vue'
// #ifdef APP-NVUE
const animation = uni.requireNativePlugin('animation')
// #endif

import {
  getPx,
  getXBarHeight,
  getHeight,
  getStatusBarHeight,
  getNavBarHeight,
} from '../utils/system.js'
import { makeProps } from '../utils/props.js'

const props = defineProps(
  makeProps([
    ['tabs', []],
    [
      'tabStyle',
      {
        iconStyle: 'font-size: 20px;color: #333232;',
        selectedIconStyle: 'font-size: 20px;color: #01A9F0;',
        titleStyle: '',
        selectedTitleStyle: '',
        boxStyle: '',
        tabsStyle: '',
        itemStyle: '',
        height: 50,
        badgeStyle: '',
        badgeTextStyle: '',
        dotStyle: '',
        iconBoxWidth: '46px',
        image: null,
        imageStyle: '',
        imageBoxStyle: '',
        imageWidthXBar: false,
      },
    ],
    ['duration', 300],
    ['timingFunction', 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'],
    ['top', '0'],
    ['isSeize', true],
    ['considerXBar', true],
    ['xBarBgType', 'inverse'],
    'xBarStyle',
  ])
)
const emit = defineEmits(['tabClicked'])

const defaultTabHeight = 50
const defaultIconBoxWidth = '46px'

const currentPage = ref(0)
const noWeexTransform = ref('')
const ntabbarcontainer = ref(null)

const mrHumpStyle = computed(() => {
  if (!humpItem.value) return ''
  let btm = humpItem.value.humpBottom || 12
  if (props.considerXBar) {
    btm += getXBarHeight()
  }
  const style = humpItem.value.humpStyle || ''
  return style + `bottom:${btm}px;`
})
const hasHump = computed(() => {
  for (const i in props.tabs) {
    if (props.tabs[i].isHump) {
      return true
    }
  }
  return false
})
const humpItem = computed(() => {
  for (const i in props.tabs) {
    if (props.tabs[i].isHump) {
      return props.tabs[i]
    }
  }
  return null
})
const humpIndex = computed(() => {
  return parseInt((props.tabs.length - 1) * 0.5)
})
const noPageIndex = computed(() => {
  for (const i in props.tabs) {
    if (props.tabs[i].noPage) {
      return i * 1
    }
  }
  return -1
})
const topPx = computed(() => {
  return getHeight(props.top)
})
const tabHeightPx = computed(() => {
  if (props.tabStyle && props.tabStyle.height) {
    return props.tabStyle.height // uni.upx2px(tabStyle.height)
  }
  return defaultTabHeight // uni.upx2px(defaultTabHeight)
})
const mrTabContainerStyle = computed(() => {
  // 增加多屏下宽度的设置
  // 如果不根据屏数增加宽度，安卓下会不出现内容
  let _length = props.tabs.length || 1
  if (noPageIndex.value >= 0) {
    _length -= 1
  }
  const width = (_length || 1) * 750
  let _style = `width:${width}rpx;`
  return _style
})
const mrItemStyle = computed(() => {
  const _height = tabHeightPx.value
  return (props.tabStyle.itemStyle || '') + `height:${_height}px;`
})
const mrIconWidth = computed(() => {
  if (props.tabStyle && props.tabStyle.iconBoxWidth) {
    return props.tabStyle.iconBoxWidth
  }
  return defaultIconBoxWidth
})

function next() {
  let page = currentPage.value
  if (page < props.tabs.length - 1) {
    page++
  }
  setPage(page)
}
function prev() {
  let page = currentPage.value
  if (page > 0) {
    page--
  }
  setPage(page)
}
function setPage(page, animated = true) {
  if (page === noPageIndex.value) {
    emit('tabClicked', { page })
    return
  }
  currentPage.value = page
  _animateTransformX(page, animated)
  emit('tabClicked', {
    page,
  })
}
function _animateTransformX(page, animated) {
  let fakePage = page
  if (noPageIndex.value >= 0) {
    if (page > noPageIndex.value) {
      fakePage -= 1
    }
  }
  const { duration, timingFunction } = props
  const computedDur = animated ? duration : 0.00001
  // #ifdef APP-NVUE
  const containerEl = ntabbarcontainer.value
  const _w = uni.upx2px(750)
  const dist = fakePage * _w
  animation.transition(
    containerEl,
    {
      styles: {
        transform: `translateX(${-dist}px)`,
      },
      duration: computedDur,
      timingFunction,
      delay: 0,
    },
    () => {}
  )
  // #endif
  // #ifndef APP-NVUE
  const _tx = fakePage * 750 * -1
  noWeexTransform.value = `transition-property:transform;transition-duration:${computedDur}ms;transform:translateX(${_tx}rpx);transition-timing-function:${timingFunction};`
  // #endif
}
</script>

<style lang="scss" scoped>
.n-tab-page {
  // position: absolute;
  // 我们使用fixed，
  // 因为absolute时，在mp端高度受外层影响.
  // 外层高度不设置时是0，会导致在MP-IOS端isSeize下的内容排在最顶部，从而产生遮挡问题
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  &-container {
    width: 750rpx;
    flex: 1;
    position: relative;
  }
}
.n-tabs {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 750rpx;

  &-img {
    position: fixed;
    width: 750rpx;
    left: 0;
    bottom: 0;
  }
  &-items {
    width: 750rpx;
    // background-color: #FFFFFF;
  }
  &-hump {
    position: fixed;
    left: 375rpx;
    bottom: 0;
    transform: translateX(-50%);
  }
  &-item {
    padding: 5px;

    &-icon {
      position: relative;
    }
    &-text {
      font-size: 13px;
      color: #333232;

      &-selected {
        color: #01a9f0;
      }
    }
    &-badge {
      position: absolute;
      right: 0;
      top: -2px;
      &-text {
        color: #ff0000;
        font-size: 12px;
      }
    }
    &-dot {
      position: absolute;
      right: 6px;
      top: 2px;
      width: 6px;
      height: 6px;
      border-radius: 6px;
      background-color: #ff0000;
    }
  }
}
</style>
