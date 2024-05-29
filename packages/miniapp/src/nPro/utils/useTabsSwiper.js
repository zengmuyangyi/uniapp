//
// 用于tabs-swiper联动参考
//
import { reactive } from 'vue'

export function useTabsSwiper() {
  const state = reactive({
    isTap: false,
    dx: 0,
    lastTabIndex: 0,
    tapIndex: 0,
    currentTab: 0,
  })

  // @change
  function nOnSwiperChange(e) {
    // #ifndef APP-PLUS || H5 || MP-WEIXIN || MP-QQ
    const index = e.detail.current
    nToSwitchTab(index)
    // #endif
  }
  // @transition
  function nOnSwiperScroll(e) {
    if (state.isTap) return
    // #ifdef APP-PLUS || H5 || MP-WEIXIN || MP-QQ
    const offsetX = e.detail.dx
    state.dx = offsetX
    // #endif
  }
  // @onAnimationEnd and @animationfinish
  function nOnSwiperAnimationFinish(e) {
    // #ifdef APP-PLUS || H5 || MP-WEIXIN || MP-QQ
    const index = e.detail.current
    state.lastTabIndex = index
    nToSwitchTab(index)
    if (state.tapIndex === index) {
      state.isTap = false
    }
    // #endif
  }
  // @change for n-tabs-h
  function nOnTabChange(i) {
    state.isTap = true
    state.tapIndex = i
    nToSwitchTab(i)
  }
  function nToSwitchTab(i) {
    state.currentTab = i
  }

  return {
    tabsSwiperState: state,
    nOnSwiperChange,
    nOnSwiperScroll,
    nOnSwiperAnimationFinish,
    nOnTabChange,
    nToSwitchTab,
  }
}
