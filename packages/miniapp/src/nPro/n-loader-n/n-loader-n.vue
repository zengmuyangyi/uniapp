<template>
  <loading
    :class="['n-loading', 'n-flex-' + flex, 'n-align-center', flex === 'row' && 'n-justify-center']"
    @loading="onloading"
    :display="isLoading ? 'show' : 'hide'"
    :style="boxStyle"
  >
    <image
      v-if="hasMore && isLoading"
      class="n-loading-img"
      :src="loadingSrc"
      mode="aspectFill"
      :style="imgStyle"
    ></image>
    <text v-if="isLoading || (!hasMore && showNoMore)" class="n-loading-text" :style="textStyle">{{
      loadText
    }}</text>
    <text v-if="!isLoading && hasMore" class="n-loading-text" :style="textStyle">{{
      mainText
    }}</text>
  </loading>
</template>

<script setup>
/**
 * n-loader-n
 * @description 自定义的加载组件
 * @property {Number}  maxTime 超时时间，0表示不限制
 * @property {String} mainText 可以上提时的文字提示
 * @property {String} loadingText 加载中的文字提示
 * @property {String} noMoreText 没有更多时的文字提示
 * @property {Boolean} hasMore = [true|false] 是否还有更多
 * @property {Boolean} showNoMore = [true|false] 是否展示没有更多
 * @property {String} loadingSrc 加载中的gif图片
 * @property {String} flex 内容的布局方式
 * @property {String} boxStyle 外层样式
 * @property {String} imgStyle 加载图标样式
 * @property {String} textStyle 加载文字样式
 */
import { ref, computed, onUnmounted } from 'vue'
let loadTimeOut = null

const props = defineProps({
  /**
   * 超时时间，0表示不限制
   */
  maxTime: {
    type: Number,
    default: 0,
  },
  /**
   * 可以上提时的文字提示
   */
  mainText: {
    type: String,
    default: '继续上拉加载更多',
  },
  /**
   * 加载中的文字提示
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
   * 加载中的gif图片
   */
  loadingSrc: {
    type: String,
    default: '/static/ui/loading-small.gif',
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
const emit = defineEmits(['loading', 'timeout'])

const isLoading = ref(false)

const loadText = computed(() => {
  if (!props.hasMore) {
    return props.noMoreText
  }
  return isLoading.value ? props.loadingText : props.mainText
})

// onLoading意味着触发了上提加载，正在请求数据
function onloading(e) {
  // console.log("正在加载")
  isLoading.value = true
  emit('loading')
  if (!props.hasMore) return
  if (props.maxTime <= 0) return
  loadTimeOut && clearTimeout(loadTimeOut)
  loadTimeOut = setTimeout(() => {
    emit('timeout')
    cancel()
  }, props.maxTime)
}
function cancel() {
  isLoading.value = false
  loadTimeOut && clearTimeout(loadTimeOut)
  loadTimeOut = null
}
onUnmounted(() => {
  loadTimeOut && clearTimeout(loadTimeOut)
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
