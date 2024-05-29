<template>
  <view
    :ref="(el) => elRefs.set(el)"
    :class="[
      'n-position-absolute',
      'n-bg-' + bgType,
      'n-border-' + border,
      'n-radius-' + radius,
      'n-flex-' + flex,
      'n-align-' + align,
      'n-justify-' + justify,
    ]"
    :style="mrStyle + boxStyle"
  >
    <slot></slot>
  </view>
</template>

<script setup>
import { computed, ref, inject } from 'vue'
import { makeProps } from '../utils/props.js'
// #ifdef APP-NVUE
const animation = uni.requireNativePlugin('animation')
// #endif

const props = defineProps(
  makeProps([
    'bgType',
    'border',
    'radius',
    ['flex', 'column'],
    ['justify', 'start'],
    ['align', 'start'],
    'boxStyle',
    'itemStyle',
  ])
)
const nSwiper = inject('nSwiper')

const index = ref(0)
import { useElRefs } from '../utils/element.js'
const elRefs = useElRefs()

index.value = nSwiper.children.length
nSwiper.pushChild({
  index: index,
  nswiperitem: elRefs,
  getExp,
  getScaleExp,
  toAdjust,
  toPosition,
})

const mrStyle = computed(() => {
  let style = ''
  let left =
    nSwiper.leftPx.value +
    nSwiper.spacePx.value * index.value +
    nSwiper.itemWidthPx.value * index.value
  if (nSwiper.center.value) {
    left =
      (nSwiper.widthPx.value - nSwiper.itemWidthPx.value) * 0.5 +
      nSwiper.spacePx.value * index.value +
      nSwiper.itemWidthPx.value * index.value
  }
  style += `left:${left}px;width:${nSwiper.itemWidthPx.value}px;;height:${nSwiper.itemHeightPx.value}px;`
  return style
})

function getExp(current, factor = 1) {
  const baseWidth = nSwiper.baseWidthPx.value
  let left = -current * baseWidth
  const indexA = index.value
  const length = nSwiper.children.length
  if (nSwiper.circular.value) {
    left = toGetLeft(baseWidth, current, indexA, true)
    if (left === '') {
      return `0+${5 * baseWidth}`
    }
  }
  // 最大允许拉开
  const maxX = nSwiper.maxX.value
  // 最外层必须加一个()，否则异常
  const x = `(abs(x*${factor}) >= ${maxX} ? (x>0?${maxX}:(${-1 * maxX})) : (x*${factor}))`
  // console.log(x)
  if (nSwiper.linear.value) {
    return `${x}+${left}`
  }
  // 利用正弦函数来做动画曲线
  return `abs(sin(${(3.14 * 0.5) / maxX}*${x}))*${x}+${left}`
}
function getScaleExp(current, factor = 1) {
  const sameExp = `${nSwiper.scale.value}+0`
  const baseWidth = nSwiper.baseWidthPx.value
  const minusExp = `max(1 - abs(x*${factor}/${baseWidth}), ${nSwiper.scale.value})`
  const plusExp = `min(1, ${nSwiper.scale.value}+abs(x*${factor}/${baseWidth}))`
  const circle = nSwiper.circular.value
  const indexA = index.value
  const length = nSwiper.children.length
  let exp = sameExp
  if (current === indexA) {
    exp = minusExp
  } else {
    if (current - 1 === indexA) {
      exp = `x>=0?${plusExp}:${sameExp}`
    } else if (current + 1 === indexA) {
      exp = `x>=0?${sameExp}:${plusExp}`
    }
    if (circle) {
      if (current === 0 && indexA === length - 1) {
        exp = `x>=0?${plusExp}:${sameExp}`
      } else if (current === length - 1 && indexA === 0) {
        exp = `x>=0?${sameExp}:${plusExp}`
      }
    }
  }
  return exp
}
function toAdjust(x, time, init) {
  const current = nSwiper.inCurrent.value
  const circle = nSwiper.circular.value
  const length = nSwiper.children.length
  const indexA = index.value
  let duration = nSwiper.duration.value
  const baseWidth = nSwiper.baseWidthPx.value
  const scale = nSwiper.scale.value
  // 确定当前的current，以及调整每一个item的位置
  let iScale = scale
  const percent = nSwiper.percent.value
  let needChange = Math.abs(x) >= percent * baseWidth
  if (!needChange) {
    // 60ms 30px 算swipe动作
    if (time <= 60 && Math.abs(x) >= 30) {
      needChange = true
    }
  }
  let toCurrent = current
  if (needChange) {
    toCurrent = x > 0 ? current - 1 : current + 1
    if (toCurrent < 0) {
      if (circle) {
        toCurrent = length - 1
      } else {
        toCurrent = 0
      }
    } else if (toCurrent >= length) {
      if (circle) {
        toCurrent = 0
      } else {
        toCurrent = length - 1
      }
    }
  }
  if (toCurrent === indexA) {
    iScale = 1
  }
  let left = baseWidth * toCurrent * -1
  if (circle) {
    //
    // 初始化，拼凑5个数据，然后按照数据进行移动，移动之后，在根据移动的方向上进行内容补贴
    //
    if (init) {
      toInitCircle(baseWidth, current, indexA, iScale)
      return
    }
    // 先平移，移动之后再补充内容
    left = toGetLeft(baseWidth, current, indexA)
    if (current != toCurrent) {
      left += x >= 0 ? baseWidth : -baseWidth
    }
  }
  animation.transition(
    elRefs.el,
    {
      styles: {
        transform: `translateX(${left}px) scale(${iScale})`,
      },
      duration: duration,
      delay: 0,
      timingFunction: nSwiper.timingFunction.value || 'ease',
      needLayout: false,
    },
    (res) => {
      nSwiper.inCurrent.value = toCurrent
      nSwiper.inMoving.value = false
      // 补充数据
      if (needChange && circle) {
        // 可以移除掉5级的补充策略，不补充其实就是3级的策略
        toSupplyCircle(baseWidth, current, toCurrent, length)
      }
      if (needChange && toCurrent === indexA) {
        nSwiper.emitChange('change', toCurrent)
      }
    }
  )
}
function toPosition(current, toCurrent, silence) {
  const length = nSwiper.children.length
  const indexA = index.value
  const duration = silence ? 0 : nSwiper.duration.value
  const baseWidth = nSwiper.baseWidthPx.value
  const scale = nSwiper.scale.value
  let iScale = scale
  if (toCurrent === indexA) {
    iScale = 1
  }
  const left = baseWidth * toCurrent * -1
  animation.transition(
    elRefs.el,
    {
      styles: {
        transform: `translateX(${left}px) scale(${iScale})`,
      },
      duration: duration,
      delay: 0,
      timingFunction: nSwiper.timingFunction.value || 'ease',
      needLayout: false,
    },
    (res) => {
      nSwiper.inCurrent.value = toCurrent
      nSwiper.inMoving.value = false
      if (toCurrent === indexA) {
        nSwiper.emitChange('change', toCurrent)
      }
    }
  )
}
// 因为在Android上面，哪怕设置不重复的transition，以前的别的transition效果也可能会被清除掉
// 所以，我们这里不仅仅只是opacity，还要保留以前的结果
function toOpacityShow(left, scale) {
  animation.transition(
    elRefs.el,
    {
      styles: {
        transform: `translateX(${left}px) scale(${scale})`,
        opacity: 1,
      },
      duration: 0, // nSwiper.duration,
      delay: 0,
      timingFunction: nSwiper.timingFunction.value || 'ease',
      needLayout: false,
    },
    (res) => {}
  )
}
function toInitCircle(baseWidth, toCurrent, indexA, iScale) {
  const duration = nSwiper.duration.value
  const left = toGetLeft(baseWidth, toCurrent, indexA)
  let opacity = 0
  if (toCurrent === indexA) {
    opacity = 1
  }
  animation.transition(
    elRefs.el,
    {
      styles: {
        opacity: `${opacity}`,
      },
      duration: 0,
      delay: 0,
      timingFunction: nSwiper.timingFunction.value || 'ease',
      needLayout: false,
    },
    (res) => {
      animation.transition(
        elRefs.el,
        {
          styles: {
            transform: `translateX(${left}px) scale(${iScale})`,
            opacity: opacity,
          },
          duration: duration,
          delay: 0,
          timingFunction: nSwiper.timingFunction.value || 'ease',
          needLayout: false,
        },
        (res) => {
          nSwiper.inCurrent.value = toCurrent
          nSwiper.inMoving.value = false
          if (opacity === 0) {
            toOpacityShow(left, iScale)
          }
          if (toCurrent === indexA) {
            nSwiper.emitChange('change', toCurrent)
          }
        }
      )
    }
  )
}
function toSupplyCircle(baseWidth, current, toCurrent, length) {
  const iScale = nSwiper.scale.value
  // 检查两端的数据，需要移动的，先隐藏，再移动
  // 向左还是向右
  let toLeft = false
  if (current === length - 1 && toCurrent === 0) {
    toLeft = true
  } else if (current === 0 && toCurrent === length - 1) {
    toLeft = false
  } else if (current < toCurrent) {
    toLeft = true
  }
  if (toLeft) {
    let popIdx = current - 2
    if (popIdx + 1 < 0) {
      popIdx = length - 2
    }
    if (popIdx < 0) {
      popIdx = length - 1
    }
    let pushIdx = toCurrent + 2
    if (pushIdx - 1 >= length) {
      pushIdx = 1
    }
    if (pushIdx >= length) {
      pushIdx = 0
    }
    if (index.value === popIdx) {
      animation.transition(
        elRefs.el,
        {
          styles: {
            opacity: 0,
            transform: `translateX(${5 * baseWidth}px) scale(${iScale})`,
          },
          duration: 0,
          delay: 0,
          needLayout: false,
        },
        (res) => {
          toOpacityShow(5 * baseWidth, iScale)
        }
      )
    }
    if (index.value === pushIdx) {
      animation.transition(
        elRefs.el,
        {
          styles: {
            opacity: 0,
            transform: `translateX(${-1 * baseWidth * (pushIdx - 2)}px) scale(${iScale})`,
          },
          duration: 0,
          delay: 0,
          needLayout: false,
        },
        (res) => {
          toOpacityShow(-1 * baseWidth * (pushIdx - 2), iScale)
        }
      )
    }
    return
  }
  let popIdx = current + 2
  if (popIdx - 1 >= length) {
    popIdx = 1
  }
  if (popIdx >= length) {
    popIdx = 0
  }
  let pushIdx = toCurrent - 2
  if (pushIdx + 1 < 0) {
    pushIdx = length - 2
  }
  if (pushIdx < 0) {
    pushIdx = length - 1
  }
  if (index.value === popIdx) {
    animation.transition(
      elRefs.el,
      {
        styles: {
          opacity: 0,
          transform: `translateX(${5 * baseWidth}px) scale(${iScale})`,
        },
        duration: 0,
        delay: 0,
        needLayout: false,
      },
      (res) => {
        toOpacityShow(5 * baseWidth, iScale)
      }
    )
  }
  if (index.value === pushIdx) {
    animation.transition(
      elRefs.el,
      {
        styles: {
          opacity: 0,
          transform: `translateX(${-1 * baseWidth * (pushIdx + 2)}px) scale(${iScale})`,
        },
        duration: 0,
        delay: 0,
        needLayout: false,
      },
      (res) => {
        toOpacityShow(-1 * baseWidth * (pushIdx + 2), iScale)
      }
    )
  }
}
function toGetLeft(baseWidth, toCurrent, indexA, isExp) {
  const length = nSwiper.children.length
  let left = baseWidth * toCurrent * -1
  // circle的话，至少准备5个数据
  // 不足5个数据请自行重复拼凑，不会检验
  let leftIdx = toCurrent - 1
  let leftIdx2 = toCurrent - 2
  if (leftIdx < 0) {
    leftIdx = length - 1
    leftIdx2 = length - 2
  }
  if (leftIdx2 < 0) {
    leftIdx2 = length - 1
  }
  let rightIdx = toCurrent + 1
  let rightIdx2 = toCurrent + 2
  if (rightIdx >= length) {
    rightIdx = 0
    rightIdx2 = 1
  }
  if (rightIdx2 >= length) {
    rightIdx2 = 0
  }
  if (indexA === leftIdx) {
    left = baseWidth * (leftIdx + 1) * -1
  } else if (indexA === rightIdx) {
    left = baseWidth * (rightIdx - 1) * -1
  } else if (indexA === leftIdx2) {
    left = baseWidth * (leftIdx2 + 2) * -1
  } else if (indexA === rightIdx2) {
    left = baseWidth * (rightIdx2 - 2) * -1
  } else if (indexA != toCurrent) {
    if (isExp) {
      return ''
    }
    left = baseWidth * 5
  }
  return left
}
</script>

<style></style>
