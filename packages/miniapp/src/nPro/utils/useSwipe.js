import { getTouchPoint } from './element.js'

import { reactive } from 'vue'

export function useSwipe() {
  const state = reactive({
    minTime: 60, // ms
    minOffset: 30, // px
    startPoint: null,
    startTime: 0,
  })

  function nSwipeTouchStart(e) {
    state.swipeStartTime = Date.now()
    state.swipeStartPoint = getTouchPoint(e)
  }
  function nSwipeTouchEnd(e) {
    const end = getTouchPoint(e)
    const endX = end.x
    const endY = end.y
    const time = Date.now() - state.swipeStartTime

    if (time >= state.swipeMinTime) {
      const xOffset = endX - state.swipeStartPoint.x
      const yOffset = endY - state.swipeStartPoint.y
      let xDirection = '' // x方向
      let yDirection = '' // y方向
      let xyDirection = '' // 取间距最大的那个
      if (Math.abs(xOffset) >= state.swipeMinOffset) {
        if (xOffset < 0) {
          xDirection = 'left'
        } else {
          xDirection = 'right'
        }
      }
      if (Math.abs(yOffset) >= state.swipeMinOffset) {
        if (yOffset < 0) {
          yDirection = 'up'
        } else {
          yDirection = 'down'
        }
      }
      if (Math.abs(xOffset) >= Math.abs(yOffset)) {
        xyDirection = xDirection
      } else {
        xyDirection = yDirection
      }
      return {
        x: xDirection,
        y: yDirection,
        xy: xyDirection,
        time: time,
      }
    }
    return {
      x: '',
      y: '',
      xy: '',
      time: time,
    }
  }
  function nSwipeTouchCancel(e) {
    state.swipeStartTime = 0
    state.swipeStartPoint = null
  }

  return {
    swipeState: state,
    nSwipeTouchStart,
    nSwipeTouchEnd,
    nSwipeTouchCancel,
  }
}
