import { ref } from 'vue'

export function useParent(elRefs) {
  const headerHeight = ref(400)
  const current = ref(0)

  // scrollable相关只是在非nvue-app上作为控制条件
  // nvue-app下不需要设置scrollable相关内容
  const parentScrollable = ref(true)
  // #ifndef APP-NVUE
  const childScrollable = ref(false)
  // #endif
  // #ifdef APP-NVUE
  const childScrollable = ref(true)
  // #endif

  function toSetSpecialEffects(idx) {
    // #ifdef APP-NVUE
    elRefs['list_' + idx].setSpecialEffects()
    // #endif
  }
  function toRefresh() {
    elRefs['list_' + current.value].refresh(
      () => {
        elRefs['list'].nEndSuccess(false)
      },
      () => {
        elRefs['list'].nEndError()
      }
    )
  }
  function onChangeSwiper(e) {
    toSetSpecialEffects(e.detail.current)
    current.value = e.detail.current
  }
  function onChangeTab(i) {
    toSetSpecialEffects(i)
    current.value = i
  }
  function onParentScroll(e) {
    // #ifndef APP-NVUE
    const scrollTop = e.detail.scrollTop
    // 缓冲8px
    if (scrollTop >= headerHeight.value - 8) {
      // #ifdef H5
      if (!parentScrollable.value) return
      elRefs['list'].nScrollTo(headerHeight.value)
      setTimeout(() => {
        parentScrollable.value = false
        childScrollable.value = true
      }, 0)
      return
      // #endif
      parentScrollable.value = false
      elRefs['list'].nScrollTo(headerHeight.value)
      childScrollable.value = true
    } else {
      parentScrollable.value = true
      childScrollable.value = false
    }
    // #endif
  }
  function onScrollableChange(e) {
    // #ifndef APP-NVUE
    // 将内部改变的状态同步过来
    parentScrollable.value = e
    // #endif
  }
  // 只是非nvue-app使用
  function onChildTouchMove(downHeight) {
    // #ifndef APP-NVUE
    let dh = downHeight
    if (downHeight >= headerHeight.value) {
      dh = headerHeight.value
    }
    if (downHeight <= 0) {
      dh = 0
    }
    dh = headerHeight.value - dh
    // 限制10px移动距离，否则不动
    // 一次性全部打开
    if (downHeight > 10) {
      parentScrollable.value = true
      childScrollable.value = false
      setTimeout(() => {
        elRefs['list'].nScrollTo(0)
      }, 0)
    }
    // #endif
  }

  return {
    current,
    headerHeight,
    parentScrollable,
    childScrollable,
    toSetSpecialEffects,
    toRefresh,
    onChangeSwiper,
    onChangeTab,
    onParentScroll,
    onScrollableChange,
    onChildTouchMove,
  }
}
