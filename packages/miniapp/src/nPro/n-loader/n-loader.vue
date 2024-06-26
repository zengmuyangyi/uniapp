<template>
  <view
    :class="['n-loading', 'n-flex-' + flex, 'n-align-center', 'n-justify-center']"
    :style="boxStyle"
  >
    <view v-if="hasMore && isLoading" class="n-flex-column n-align-center">
      <image class="n-loading-img" :src="loadingSrc" mode="aspectFill" :style="imgStyle"></image>
      <text class="n-loading-text" :style="textStyle">{{ loadText }}</text>
    </view>
    <text v-if="!hasMore && showNoMore" class="n-loading-text" :style="textStyle">{{
      loadText
    }}</text>
  </view>
</template>

<script setup>
/**
 * n-loader
 * @description 自定义的加载组件
 * @property {String} mainText 可以继续加载时的文字提示
 * @property {String} loadingText 正在加载时的文字提示
 * @property {String} noMoreText 没有更多时的文字提示
 * @property {Boolean} isLoading = [true|false] 是否正在加载
 * @property {String} loadingSrc 加载中的gif图片
 * @property {Boolean} hasMore = [true|false] 是否还有更多
 * @property {Boolean} showNoMore = [true|false] 是否展示没有更多
 * @property {String} flex 内容的布局方式
 * @property {String} boxStyle 外层样式
 * @property {String} imgStyle 加载图标样式
 * @property {String} textStyle 加载文字样式
 */
import { computed } from 'vue'

const props = defineProps({
  /**
   * 可以继续加载时的文字提示
   */
  mainText: {
    type: String,
    default: '继续加载更多',
  },
  /**
   * 正在加载时的文字提示
   */
  loadingText: {
    type: String,
    default: '正在加载',
  },
  /**
   * 没有更多时的文字提示
   */
  noMoreText: {
    type: String,
    default: '没有更多啦',
  },
  /**
   * 是否正在加载
   */
  isLoading: {
    type: Boolean,
    default: false,
  },
  /**
   * 加载中的gif图片
   */
  loadingSrc: {
    type: String,
    default: '/static/ui/loading-small.gif',
  },
  /**
   * 是否还有更多
   */
  hasMore: {
    type: Boolean,
    default: true,
  },
  /**
   * 是否展示没有更多
   */
  showNoMore: {
    type: Boolean,
    default: true,
  },
  /**
   * 内容的布局方式
   */
  flex: {
    type: String,
    default: 'column',
  },
  /**
   * 外层样式
   */
  boxStyle: {
    type: String,
    default: '',
  },
  /**
   * 图标样式
   */
  imgStyle: {
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

const loadText = computed(() => {
  if (!props.hasMore) {
    return props.noMoreText
  }
  return props.isLoading ? props.loadingText : props.mainText
})
</script>

<style lang="scss" scoped>
.n-loading {
  // width: 750rpx;
  padding: 20rpx;
  height: 120rpx;

  &-img {
    width: 40rpx;
    height: 40rpx;
  }
  &-text {
    font-size: 28rpx;
    color: #666666;
    line-height: 40rpx;
    padding-left: 12rpx;
    padding-right: 12rpx;
  }
}
</style>
