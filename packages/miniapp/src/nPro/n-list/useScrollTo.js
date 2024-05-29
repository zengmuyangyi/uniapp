// #ifdef APP-NVUE
const dom = uni.requireNativePlugin('dom')
// #endif
import { ref } from 'vue'

export function useScrollTo() {
  const nCurrentView = ref(null)
  const nScrollTop = ref(0)

  function nScrollTo(ref, options = { offset: 0, animated: true }) {
    // #ifdef APP-NVUE
    dom.scrollToElement(ref, options)
    // #endif
    // #ifndef APP-NVUE
    if (typeof ref == 'string') {
      nCurrentView.value = ref
      return
    }
    nCurrentView.value = null
    if (nScrollTop.value === ref) {
      nScrollTop.value = ref + 0.1
    } else {
      nScrollTop.value = ref
    }
    // #endif
  }
  function nScrollToTop(ref, options = { offset: 0, animated: true }) {
    // #ifdef APP-NVUE
    nScrollTo(ref, options)
    // #endif
    // #ifndef APP-NVUE
    nCurrentView.value = 'nlisttop'
    // #endif
  }
  function nScrollToBottom(ref, options = { offset: 0, animated: true }) {
    // #ifdef APP-NVUE
    nScrollTo(ref, options)
    // #endif
    // #ifndef APP-NVUE
    nCurrentView.value = 'nlistbottom'
    // #endif
  }

  return {
    nCurrentView,
    nScrollTop,
    nScrollTo,
    nScrollToTop,
    nScrollToBottom,
  }
}
