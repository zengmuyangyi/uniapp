import { reactive, computed } from 'vue'
import { getPlatform, getHeight } from '../utils/system.js'
// #ifndef APP-NVUE
import { getTouchPoint } from '../utils/element.js'
// #endif

export function usePager(props, emit, scrollRef, refresherRef, loaderRef, currentView) {
  const platform = getPlatform()

  const state = reactive({
    isDownLoading: false, // 是否正在下拉刷新中
    isUpLoading: false, // 是否正在上提加载
    // down
    down: {
      use: true,
      offset: uni.upx2px(140),
      inRate: 0.8, // 下拉的距离小于offset时,改变下拉区域高度比例;0-1,越小,越难拉
      outRate: 0.2, // 下拉的距离大于offset时,改变下拉区域高度比例;0-1,越小,越难拉
    },
    // up
    up: {
      use: true,
      offset: 80,
    },
    hasMore: true,
    // u need to manage the page-state yourself, we do not manage the page-state for u
    currentPage: 0, // start with 0. if > 0, it means data inited
    prePage: 0,

    // #ifndef APP-NVUE
    scrollable: true,
    downHeight: 0,
    startPoint: null,
    lastPoint: null,
    theScrollHeight: 0, // scroll content height
    theScrollTop: 0, // 记录滚动条的位置，并不是用来重置scrolltop
    startTop: 0, // 记录开始时滚动条的位置
    inTouchend: false,
    preScrollY: 0,
    // 节流设置
    fps: 40, // 1s内屏幕刷新的频数
    moveTime: 0,
    moveTimeDiff: 0,
    scrollTopDeviation: 100, // scroll-view滚动到顶部时,此时的scroll-top不一定为0, 此值用于控制最大的误差
    isMoveDown: false,
    downMoveType: 0,
    isDownReset: false, // 下拉刷新，是否显示重置的过渡动画
    // #endif
  })

  const sh = computed(() => {
    return getHeight(props.height)
  })

  // #ifdef APP-NVUE
  function setSpecialEffects(height) {
    scrollRef.value &&
      scrollRef.value.setSpecialEffects &&
      scrollRef.value.setSpecialEffects({
        id: props.parentId,
        headerHeight: height || props.headerHeight,
      })
  }
  function nResetLoadmore() {
    scrollRef.value.resetLoadmore()
  }
  function nScroll(e) {
    emit('scroll', e)
  }
  function nMoreLoad() {
    if (!state.up.use) {
      return
    }
    if (props.useLoading) {
      return
    }
    nLoad()
  }
  function nRefresh() {
    state.prePage = state.currentPage
    state.currentPage = 1
    if (state.down.use) {
      // state.isDownLoading = true
    }
    // remove it out since someone may close refresh, but use the refresh method
    state.isDownLoading = true
    nGetContentList('refresh')
  }
  function nLoad() {
    if (!state.up.use) return
    if (state.isDownLoading) {
      if (platform === 'ios') {
        loaderRef.value && loaderRef.value.cancel()
        return
      }
      setTimeout(() => {
        loaderRef.value && loaderRef.value.cancel()
      }, 0)
      return
    }
    if (state.isUpLoading) {
      return
    }
    if (!state.hasMore) {
      if (platform === 'ios') {
        loaderRef.value && loaderRef.value.cancel()
        return
      }
      setTimeout(() => {
        loaderRef.value && loaderRef.value.cancel()
      }, 0)
      return
    }
    state.prePage = state.currentPage
    state.currentPage += 1

    if (state.up.use) {
      state.isUpLoading = true
    }
    nGetContentList('load')
  }
  function nReload() {
    if (!state.up.use) return
    if (state.isDownLoading) {
      if (platform === 'ios') {
        loaderRef.value && loaderRef.value.cancel()
        return
      }
      setTimeout(() => {
        loaderRef.value && loaderRef.value.cancel()
      }, 0)
      return
    }
    if (state.isUpLoading) {
      return
    }
    state.prePage = state.currentPage
    state.currentPage = 1

    if (state.up.use) {
      state.isUpLoading = true
    }
    nGetContentList('load')
  }
  // default has no more
  // ref method: call when refresh/load success
  function nEndSuccess(hasMore = false) {
    state.hasMore = hasMore || false
    if (state.isDownLoading) {
      refresherRef.value && refresherRef.value.cancel()
      state.isDownLoading = false
      // 重置 loadMore
      nResetLoadmore()
    }
    if (state.isUpLoading) {
      loaderRef.value && loaderRef.value.cancel()
      state.isUpLoading = false
      // 重置 loadMore
      // nResetLoadmore()
    }
  }
  // ref method: call when refresh/load fail
  function nEndError() {
    state.currentPage = state.prePage
    if (state.isDownLoading) {
      refresherRef.value && refresherRef.value.cancel().cancel()
      state.isDownLoading = false
    }
    if (state.isUpLoading) {
      loaderRef.value && loaderRef.value.cancel()
      state.isUpLoading = false
    }
  }
  function nInitContentList() {
    state.prePage = 0
    state.currentPage = 1
    if (state.down.use) {
      state.isDownLoading = true
      nGetContentList('refresh')
    } else {
      if (state.up.use) {
        state.isUpLoading = true
        nGetContentList('load')
      }
    }
  }
  function nGetContentList(type = 'refresh') {
    if (type === 'refresh') {
      emit('down', state.currentPage)
    } else {
      emit('up', state.currentPage)
    }
  }
  // #endif

  // #ifndef APP-NVUE
  // 手指开始触摸屏幕
  function nTouchstartEvent(e) {
    // console.log('start')
    if (props.isChild && !state.scrollable) return
    state.startPoint = getTouchPoint(e)
    state.startTop = state.theScrollTop || 0
    state.lastPoint = state.startPoint
    state.inTouchend = false
  }
  // 手指在屏幕上滑动
  // 注意：是手指位置的变化触发的。在scroll中，手指拖动scroll滚动，其实手指位置不变，scroll的滚动是不会触发touchmove的
  function nTouchmoveEvent(e) {
    // console.log('move')
    if (props.isChild && !state.scrollable) return
    if (!state.down.use && !props.isChild) return
    if (!state.startPoint) return
    // 限制/节流，可以使用时间，也可以使用高度
    // 小于节流时间,则不处理
    const t = new Date().getTime()
    if (state.moveTime && t - state.moveTime < state.moveTimeDiff) {
      return
    } else {
      state.moveTime = t
      state.moveTimeDiff = 1000 / state.fps
    }
    const scrollTop = state.theScrollTop
    const currentPoint = getTouchPoint(e)
    const moveY = currentPoint.y - state.startPoint.y
    // (向下拉&&在顶部) scroll-view在滚动时不会触发touchmove,当触顶/底/左/右时,才会触发touchmove
    // scroll-view滚动到顶部时,scrollTop不一定为0; 在iOS的APP中scrollTop可能为负数,不一定和startTop相等
    if (
      moveY > 0 &&
      (scrollTop <= 0 || (scrollTop <= state.scrollTopDeviation && scrollTop === state.startTop))
    ) {
      if (props.isChild) {
        const diff = currentPoint.y - state.lastPoint.y
        state.downHeight += diff
        // console.log('hello')
        emit('move', state.downHeight)
        state.lastPoint = currentPoint
        return
      }
      // 是否可以下拉
      if (!state.inTouchend && !state.isDownLoading && !state.isUpLoading) {
        let diff = currentPoint.y - state.lastPoint.y // 和上次比,移动的距离 (大于0向下,小于0向上)

        // 下拉距离  < 指定距离
        if (state.downHeight < state.down.offset) {
          if (state.downMoveType !== 1) {
            state.downMoveType = 1 // 加入标记,保证只执行一次
            nDownInOffset() // 进入指定距离范围内那一刻的回调,只执行一次
            state.isMoveDown = true // 标记下拉区域高度改变,在touchend重置回来
          }
          state.downHeight += diff * state.down.inRate // 越往下,高度变化越小

          // 下拉距离 >= 指定距离
        } else {
          if (state.downMoveType !== 2) {
            state.downMoveType = 2 // 加入标记,保证只执行一次
            nDownOutOffset() // 下拉超过指定距离那一刻的回调,只执行一次
            state.isMoveDown = true // 标记下拉区域高度改变,在touchend重置回来
          }
          if (diff > 0) {
            // 向下拉
            state.downHeight += Math.round(diff * state.down.outRate) // 越往下,高度变化越小
          } else {
            // 向上收
            state.downHeight += diff // 向上收回高度,则向上滑多少收多少高度
          }
        }

        const rate = state.downHeight / state.down.offset // 下拉区域当前高度与指定距离的比值
        nOnDownMoving(rate, state.downHeight) // 下拉过程中的回调,一直在执行
      }
    }
    state.lastPoint = currentPoint
  }
  // 手指移开屏幕
  function nTouchendEvent(e) {
    if (props.isChild && !state.scrollable) return
    if (!state.startPoint) return
    // 如果下拉区域高度已改变,则需重置回来
    if (state.isMoveDown) {
      if (state.downHeight >= state.down.offset) {
        // 符合触发刷新的条件
        nTriggerDownScroll()
      } else {
        // 不符合的话 则重置
        state.downHeight = 0
        nEndDownScroll()
      }
      state.downMoveType = 0
      state.isMoveDown = false
    } else if (state.theScrollTop === state.startTop) {
      // 到顶/左/右/底的滑动事件
      const isScrollUp = getTouchPoint(e).y - state.startPoint.y < 0 // 和起点比,移动的距离,大于0向下拉,小于0向上拉
      // 上滑 && 检查并触发上拉
      isScrollUp && nTriggerUpScroll()
    }
  }
  // scrollview滚动事件
  function nScroll(e) {
    emit('scroll', e)
    state.theScrollTop = e.detail.scrollTop
    state.theScrollHeight = e.detail.scrollHeight

    // 向上滑还是向下滑动
    const isScrollUp = e.detail.scrollTop - state.preScrollY > 0
    state.preScrollY = e.detail.scrollTop

    // 上滑 && 检查并触发上拉
    isScrollUp && nTriggerUpScroll()
    if (currentView.value) {
      currentView.value = null
    }
  }
  // 进入下拉区域的那一刻
  function nDownInOffset() {
    state.scrollable = false
    state.isDownReset = false
    state.isDownLoading = false
  }
  // 超出下拉区域的那一刻
  function nDownOutOffset() {
    state.scrollable = false
    state.isDownReset = false
    state.isDownLoading = false
  }
  // 正在下拉的回调
  function nOnDownMoving(rate, downHeight) {}
  function nRefresh() {
    state.prePage = state.currentPage
    state.currentPage = 1
    nGetContentList('refresh')
  }
  function nLoad() {
    state.prePage = state.currentPage
    state.currentPage += 1
    nGetContentList('load')
  }
  function nReload() {
    state.prePage = state.currentPage
    state.currentPage = 1
    nGetContentList('load')
  }
  function nInitContentList() {
    state.prePage = 0
    state.currentPage = 1
    nGetContentList('refresh')
  }
  function nGetContentList(type = 'refresh') {
    if (type === 'refresh') {
      emit('down', state.currentPage)
    } else {
      emit('up', state.currentPage)
    }
  }
  // 刷新
  function nTriggerDownScroll() {
    state.scrollable = true
    state.isDownReset = true
    state.isDownLoading = true
    state.downHeight = state.down.offset
    nRefresh()
  }
  function nEndDownScroll() {
    state.scrollable = true
    state.isDownReset = true
    state.isDownLoading = false
    state.downHeight = 0
  }
  // 加载更多
  function nTriggerUpScroll() {
    if (state.isDownLoading || state.isUpLoading || !state.hasMore || !state.up.use) return
    let canUp = false
    // we should check if reached bottom
    if (nGetScrollBottom() <= state.up.offset) {
      // 到底部
      canUp = true // 标记可上拉
    }
    if (!canUp) return
    state.isUpLoading = true
    nLoad()
  }
  function nEndUpScroll() {
    state.isUpLoading = false
  }
  function nEndSuccess(hasMore = false) {
    state.hasMore = hasMore || false
    if (state.isDownLoading) {
      nEndDownScroll()
    }
    if (state.isUpLoading) {
      nEndUpScroll()
    }
  }
  // 下拉刷新/上提加载，失败之后使用
  function nEndError() {
    // reback the current page
    state.currentPage = state.prePage
    if (state.isDownLoading) {
      nEndDownScroll()
    }
    if (state.isUpLoading) {
      nEndUpScroll()
    }
  }
  function nGetScrollBottom() {
    let contentHeight = sh.value
    if (state.theScrollHeight > 0) {
      contentHeight = state.theScrollHeight
    }
    return contentHeight - state.theScrollTop - sh.value
  }
  // #endif

  // #ifdef APP-NVUE
  return {
    pagerState: state,
    nInitContentList,
    nScroll,
    nRefresh,
    nMoreLoad,
    nLoad,
    nResetLoadmore,
    nReload,
    nEndSuccess,
    nEndError,
    setSpecialEffects,
  }
  // #endif
  // #ifndef APP-NVUE
  return {
    pagerState: state,
    nInitContentList,
    nScroll,
    nRefresh,
    nReload,
    nLoad,
    nEndSuccess,
    nEndError,
    nTouchstartEvent,
    nTouchmoveEvent,
    nTouchendEvent,
  }
  // #endif
}
