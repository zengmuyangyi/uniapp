<template>
  <view
    :class="['n-cp', 'n-flex-column', 'n-align-center', 'n-justify-center', 'n-bg-' + bgType]"
    :style="mrBoxStyle"
  >
    <slot></slot>
    <view class="n-cp-right" :style="{ width: evenWidth / 2 + 'px', height: evenWidth + 'px' }">
      <view
        ref="nright"
        class="n-cp-right-rotate"
        :style="mrRightStyle + noWeexRightAni + noWeexRightOpacity"
      ></view>
    </view>
    <view class="n-cp-left" :style="{ width: evenWidth / 2 + 'px', height: evenWidth + 'px' }">
      <view
        ref="nleft"
        class="n-cp-left-rotate"
        :style="mrLeftStyle + noWeexLeftAni + noWeexLeftOpacity"
      ></view>
    </view>
    <slot name="extra"></slot>
  </view>
</template>

<script setup>
/**
 * progress-circle
 * @description 环形进度条
 * @property {Number} progress 进度。0-1
 * @property {String} width 自定义宽度
 * @property {String} borderWidth 自定义边框宽度
 * @property {String} borderColor 自定义边框颜色
 * @property {String} bgType = [nav|primary|success|warning|error|light|dark|inverse|custom|link|none|page|hover|mask|mask-dark|border|border-light|border-dark|gradient] 背景主题
 * @property {String} boxStyle 外层样式
 * @property {Boolean} fromZero = [true|false] 是否每次从0开始
 * @property {Boolean} aniToZero = [true|false] 是否动画回到0
 * @property {Number} duration 0-100的整体动画周期
 * @property {String} timingFunction 动画函数
 * @property {Boolean} twoWay = [true|false] 是否同时动画
 */
import { ref, computed, watch } from 'vue'
// #ifdef APP-NVUE
const animation = uni.requireNativePlugin('animation')
// #endif
import { getPx } from '../utils/system.js'
import { makeProps } from '../utils/props.js'

const props = defineProps(
  makeProps([
    ['progress', 0],
    ['width', '80rpx'],
    ['borderWidth', '6rpx'],
    ['borderColor', '#8F9CFF'],
    ['bgType', 'inverse'],
    'boxStyle',
    ['fromZero', false],
    ['aniToZero', true],
    ['duration', 2000],
    ['timingFunction', 'ease-out'],
    ['twoWay', false],
  ])
)

const evenWidth = ref(0)
const lastPr = ref(0)
const noWeexLeftAni = ref('')
const noWeexRightAni = ref('')
const noWeexLeftOpacity = ref('')
const noWeexRightOpacity = ref('')
const nright = ref(null)
const nleft = ref(null)

const mrBoxStyle = computed(() => {
  const style = `width:${evenWidth.value}px;height:${evenWidth.value}px;border-radius:${evenWidth.value}px;`
  return style + props.boxStyle
})
const mrRightStyle = computed(() => {
  return `width:${evenWidth.value}px;height:${evenWidth.value}px;border-radius:${evenWidth.value}px;border-width:${props.borderWidth};border-left-color:${props.borderColor};border-bottom-color:${props.borderColor};`
})
const mrLeftStyle = computed(() => {
  return `width:${evenWidth.value}px;height:${evenWidth.value}px;border-radius:${evenWidth.value}px;border-width:${props.borderWidth};border-left-color:${props.borderColor};border-bottom-color:${props.borderColor};`
})

const w = getPx(props.width)
evenWidth.value = parseInt(w / 2) * 2
setTimeout(() => {
  // #ifdef APP-NVUE
  initOpacityState()
  // #endif
  toProgress(props.progress)
}, 0)

watch(
  () => props.progress,
  (newV, oldV) => {
    if (props.fromZero) {
      toProgress(newV)
    } else {
      if (newV !== oldV) {
        toProgress(newV)
      }
    }
  }
)

function toProgress(pr, duration) {
  const oPr = lastPr.value
  lastPr.value = pr
  if (props.twoWay) {
    if (props.fromZero) {
      twoWayZeroProgress(pr, oPr, duration)
    } else {
      twoWayProgress(pr, oPr, duration)
    }
  } else {
    if (props.fromZero) {
      oneWayZeroProgress(pr, oPr, duration)
    } else {
      oneWayProgress(pr, oPr, duration)
    }
  }
}
function getDeg(pr) {
  let rightDeg = 45
  let leftDeg = 225
  if (pr > 0.5) {
    rightDeg = 225
    leftDeg += (pr - 0.5) * 360
  } else {
    rightDeg += pr * 360
  }
  return {
    right: rightDeg,
    left: leftDeg,
  }
}
// forward duration
function getDuration(pr, duration) {
  let right = 0
  let left = 0
  if (props.twoWay) {
    if (duration) {
      return {
        left: duration,
        right: duration,
      }
    }
    if (pr >= 0.5) {
      return {
        left: props.duration * (pr - 0.5),
        right: props.duration * 0.5,
      }
    }
    return {
      left: 0,
      right: props.duration * pr,
    }
  } else {
    if (duration) {
      if (pr > 0.5) {
        return {
          left: parseInt((duration * (pr - 0.5)) / pr),
          right: parseInt((duration * 0.5) / pr),
        }
      }
      return {
        left: 0,
        right: duration,
      }
    }
    if (pr > 0.5) {
      return {
        left: props.duration * (pr - 0.5),
        right: props.duration * 0.5,
      }
    } else {
      return {
        left: 0,
        right: props.duration * pr,
      }
    }
  }
}
// back to zero duration. the duration is props.duration
function getBackDuration(pr, duration) {
  if (pr > 0.5) {
    return {
      left: duration * (pr - 0.5),
      right: duration * 0.5,
    }
  } else {
    return {
      left: 0,
      right: duration * pr,
    }
  }
}
// #ifndef APP-NVUE
function twoWayZeroProgress(pr, lastPrA, duration) {
  let delay = 0
  if (props.aniToZero) {
    const lastDur = getBackDuration(lastPrA, props.duration)
    delay = lastDur.left > lastDur.right ? lastDur.left : lastDur.right
  }
  noWeexRightAni.value = `transition-duration: ${delay}ms; transform: rotate(45deg);`
  noWeexLeftAni.value = `transition-duration: ${delay}ms; transform: rotate(225deg);`
  setTimeout(() => {
    if (pr > 0.5) {
      noWeexLeftOpacity.value = 'opacity: 1;'
      noWeexRightOpacity.value = 'opacity:1;'
    } else {
      noWeexLeftOpacity.value = 'opacity:0;'
      if (pr <= 0) {
        noWeexRightOpacity.value = 'opacity:0;'
      } else {
        noWeexRightOpacity.value = 'opacity:1;'
      }
    }
    const newDur = getDuration(pr, duration)
    const dur = newDur.left > newDur.right ? newDur.left : newDur.right
    const newDeg = getDeg(pr)
    noWeexRightAni.value = `transition-duration: ${dur}ms; transform: rotate(${newDeg.right}deg);`
    noWeexLeftAni.value = `transition-duration: ${dur}ms; transform: rotate(${newDeg.left}deg);`
  }, delay)
}
function twoWayProgress(pr, lastPrA, duration) {
  // continue
  let dur = duration
  const newDeg = getDeg(pr)
  if (!duration) {
    const newDur = getDuration(pr, duration)
    const lastDur = getBackDuration(lastPrA, props.duration)
    dur = Math.max(Math.abs(newDur.left - lastDur.left), Math.abs(newDur.right - lastDur.right))
  }
  if (lastPrA > 0.5) {
  } else {
    if (pr > 0.5) {
      noWeexLeftOpacity.value = 'opacity:1;'
    }
    if (pr > 0) {
      noWeexRightOpacity.value = 'opacity:1;'
    }
  }
  noWeexRightAni.value = `transition-duration: ${dur}ms; transform: rotate(${newDeg.right}deg);`
  noWeexLeftAni.value = `transition-duration: ${dur}ms; transform: rotate(${newDeg.left}deg);`

  setTimeout(() => {
    if (pr <= 0.5) {
      noWeexLeftOpacity.value = 'opacity:0;'
    }
    if (pr <= 0) {
      noWeexRightOpacity.value = 'opacity:0;'
    }
  }, dur)
}
function oneWayZeroProgress(pr, lastPrA, duration) {
  // back to zero
  let leftDelay = 0
  let rightDelay = 0
  if (props.aniToZero) {
    const lastDur = getBackDuration(lastPrA, props.duration)
    leftDelay = lastDur.left
    rightDelay = lastDur.right
  }
  const newDur = getDuration(pr, duration)
  const newDeg = getDeg(pr)

  noWeexLeftAni.value = `transition-duration: ${leftDelay}ms; transform: rotate(225deg);`

  setTimeout(() => {
    noWeexLeftOpacity.value = 'opacity:0;'
    noWeexRightAni.value = `transition-duration: ${rightDelay}ms; transform: rotate(45deg);`
  }, leftDelay)

  setTimeout(() => {
    if (pr <= 0) {
      noWeexRightOpacity.value = 'opacity:0;'
    } else {
      noWeexRightOpacity.value = 'opacity:1;'
    }
    noWeexRightAni.value = `transition-duration: ${newDur.right}ms; transform: rotate(${newDeg.right}deg);`
  }, leftDelay + rightDelay)

  setTimeout(() => {
    if (pr > 0.5) {
      noWeexLeftOpacity.value = 'opacity:1;'
    } else {
      noWeexLeftOpacity.value = 'opacity:0;'
    }
    noWeexLeftAni.value = `transition-duration: ${newDur.left}ms; transform: rotate(${newDeg.left}deg);`
  }, leftDelay + rightDelay + newDur.right)
}
function oneWayProgress(pr, lastPrA, duration) {
  const newDur = getDuration(pr, duration)
  const newDeg = getDeg(pr)
  if (pr > 0) {
    noWeexRightOpacity.value = 'opacity:1;'
  }
  if (duration) {
    if (pr >= lastPrA) {
      noWeexRightAni.value = `transition-duration: ${newDur.right}ms; transform: rotate(${newDeg.right}deg);`
      setTimeout(() => {
        if (pr <= 0) {
          noWeexRightOpacity.value = 'opacity:0;'
        }
        if (pr > 0.5 && lastPrA <= 0.5) {
          noWeexLeftOpacity.value = 'opacity:1;'
        }
        noWeexLeftAni.value = `transition-duration: ${newDur.left}ms; transform: rotate(${newDeg.left}deg);`
      }, newDur.right)
    } else {
      noWeexLeftAni.value = `transition-duration: ${newDur.left}ms; transform: rotate(${newDeg.left}deg);`
      setTimeout(() => {
        if (pr < 0.5) {
          noWeexLeftOpacity.value = 'opacity:0;'
        }
        noWeexRightAni.value = `transition-duration: ${newDur.right}ms; transform: rotate(${newDeg.right}deg);`
      }, newDur.left)
      setTimeout(() => {
        if (pr <= 0) {
          noWeexRightOpacity.value = 'opacity:0;'
        }
      }, newDur.left + newDur.right)
    }
  } else {
    const lastDur = getBackDuration(lastPrA, props.duration)
    if (pr >= lastPrA) {
      noWeexRightAni.value = `transition-duration: ${
        newDur.right - lastDur.right
      }ms; transform: rotate(${newDeg.right}deg);`
      setTimeout(() => {
        if (pr <= 0) {
          noWeexRightOpacity.value = 'opacity:0;'
        }
        if (pr > 0.5 && lastPrA <= 0.5) {
          noWeexLeftOpacity.value = 'opacity:1;'
        }
        noWeexLeftAni.value = `transition-duration: ${
          newDur.left - lastDur.left
        }ms; transform: rotate(${newDeg.left}deg);`
      }, newDur.right - lastDur.right)
    } else {
      noWeexLeftAni.value = `transition-duration: ${
        lastDur.left - newDur.left
      }ms; transform: rotate(${newDeg.left}deg);`
      setTimeout(() => {
        if (pr < 0.5) {
          noWeexLeftOpacity.value = 'opacity:0;'
        }
        noWeexRightAni.value = `transition-duration: ${
          lastDur.right - newDur.right
        }ms; transform: rotate(${newDeg.right}deg);`
      }, lastDur.left - newDur.left)
      setTimeout(() => {
        if (pr <= 0) {
          noWeexRightOpacity.value = 'opacity:0;'
        }
      }, lastDur.left - newDur.left + lastDur.right - newDur.right)
    }
  }
}
// #endif
// #ifdef APP-NVUE
function initOpacityState() {
  const rightEl = nright.value
  const leftEl = nleft.right
  animation.transition(rightEl, {
    styles: {
      opacity: 0,
    },
  })
  animation.transition(leftEl, {
    styles: {
      opacity: 0,
    },
  })
}
function twoWayZeroProgress(pr, lastPrA, duration) {
  const rightEl = nright.value
  const leftEl = nleft.value

  let delay = 0
  if (props.aniToZero) {
    const lastDur = getBackDuration(lastPrA, props.duration)
    delay = lastDur.left > lastDur.right ? lastDur.left : lastDur.right
  }
  // back to zero
  animation.transition(leftEl, {
    styles: {
      transform: 'rotate(225deg)',
    },
    duration: delay,
    delay: 0,
  })
  animation.transition(
    rightEl,
    {
      styles: {
        transform: 'rotate(45deg)',
      },
      duration: delay,
      delay: 0,
    },
    () => {
      if (pr > 0.5) {
        animation.transition(leftEl, {
          styles: {
            opacity: 1,
            transform: 'rotate(225deg)',
          },
        })
        animation.transition(rightEl, {
          styles: {
            opacity: 1,
            transform: 'rotate(45deg)',
          },
        })
      } else {
        animation.transition(leftEl, {
          styles: {
            opacity: 0,
            transform: 'rotate(225deg)',
          },
        })
        if (pr <= 0) {
          animation.transition(rightEl, {
            styles: {
              opacity: 0,
              transform: 'rotate(45deg)',
            },
          })
        } else {
          animation.transition(rightEl, {
            styles: {
              opacity: 1,
              transform: 'rotate(45deg)',
            },
          })
        }
      }
      // forward
      const newDur = getDuration(pr, duration)
      const dur = newDur.left > newDur.right ? newDur.left : newDur.right
      const newDeg = getDeg(pr)
      animation.transition(leftEl, {
        styles: {
          transform: `rotate(${newDeg.left}deg)`,
        },
        duration: dur,
      })
      animation.transition(rightEl, {
        styles: {
          transform: `rotate(${newDeg.right}deg)`,
        },
        duration: dur,
      })
    }
  )
}
function twoWayProgress(pr, lastPrA, duration) {
  const rightEl = nright.value
  const leftEl = nleft.value
  // continue
  let dur = duration
  const newDeg = getDeg(pr)
  if (!duration) {
    const newDur = getDuration(pr, duration)
    const lastDur = getBackDuration(lastPrA, props.duration)
    dur = Math.max(Math.abs(newDur.left - lastDur.left), Math.abs(newDur.right - lastDur.right))
  }
  if (lastPrA > 0.5) {
  } else {
    if (pr > 0.5) {
      animation.transition(leftEl, {
        styles: {
          opacity: 1,
          transform: 'rotate(225deg)',
        },
      })
    }
    if (lastPrA <= 0 && pr > 0) {
      animation.transition(rightEl, {
        styles: {
          opacity: 1,
          transform: 'rotate(45deg)',
        },
      })
    }
  }
  animation.transition(leftEl, {
    styles: {
      transform: `rotate(${newDeg.left}deg)`,
    },
    duration: dur,
  })
  animation.transition(
    rightEl,
    {
      styles: {
        transform: `rotate(${newDeg.right}deg)`,
      },
      duration: dur,
    },
    () => {
      if (pr <= 0.5) {
        animation.transition(leftEl, {
          styles: {
            opacity: 0,
            transform: 'rotate(225deg)',
          },
        })
      }
      if (pr <= 0) {
        animation.transition(rightEl, {
          styles: {
            opacity: 0,
            transform: 'rotate(45deg)',
          },
        })
      }
    }
  )
}
function oneWayZeroProgress(pr, lastPrA, duration) {
  const rightEl = nright.value
  const leftEl = nleft.value
  // back to zero
  let leftDelay = 0
  let rightDelay = 0
  if (props.aniToZero) {
    const lastDur = getBackDuration(lastPrA, props.duration)
    leftDelay = lastDur.left
    rightDelay = lastDur.right
  }
  animation.transition(
    leftEl,
    {
      styles: {
        transform: 'rotate(225deg)',
      },
      duration: leftDelay,
    },
    () => {
      animation.transition(leftEl, {
        styles: {
          opacity: 0,
          transform: 'rotate(225deg)',
        },
      })
      animation.transition(
        rightEl,
        {
          styles: {
            transform: 'rotate(45deg)',
          },
          duration: rightDelay,
        },
        () => {
          if (pr <= 0) {
            animation.transition(rightEl, {
              styles: {
                opacity: 0,
                transform: 'rotate(45deg)',
              },
            })
          } else {
            animation.transition(rightEl, {
              styles: {
                opacity: 1,
                transform: 'rotate(45deg)',
              },
            })
          }
          // forward
          const newDur = getDuration(pr, duration)
          const newDeg = getDeg(pr)
          animation.transition(
            rightEl,
            {
              styles: {
                transform: `rotate(${newDeg.right}deg)`,
              },
              duration: newDur.right,
            },
            () => {
              if (pr > 0.5) {
                animation.transition(leftEl, {
                  styles: {
                    opacity: 1,
                    transform: 'rotate(225deg)',
                  },
                })
              } else {
                animation.transition(leftEl, {
                  styles: {
                    opacity: 0,
                    transform: 'rotate(225deg)',
                  },
                })
              }
              animation.transition(leftEl, {
                styles: {
                  transform: `rotate(${newDeg.left}deg)`,
                },
                duration: newDur.left,
              })
            }
          )
        }
      )
    }
  )
}
function oneWayProgress(pr, lastPrA, duration) {
  const rightEl = nright.value
  const leftEl = nleft.value
  const newDur = getDuration(pr, duration)
  const newDeg = getDeg(pr)
  if (lastPrA <= 0 && pr > 0) {
    animation.transition(rightEl, {
      styles: {
        opacity: 1,
        transform: 'rotate(45deg)',
      },
    })
  }
  if (duration) {
    if (pr >= lastPrA) {
      animation.transition(
        rightEl,
        {
          styles: {
            transform: `rotate(${newDeg.right}deg)`,
          },
          duration: newDur.right,
        },
        () => {
          if (pr <= 0) {
            animation.transition(rightEl, {
              styles: {
                opacity: 0,
                transform: 'rotate(45deg)',
              },
            })
          }
          if (pr > 0.5 && lastPrA <= 0.5) {
            animation.transition(leftEl, {
              styles: {
                opacity: 1,
                transform: 'rotate(225deg)',
              },
            })
          }
          animation.transition(leftEl, {
            styles: {
              transform: `rotate(${newDeg.left}deg)`,
            },
            duration: newDur.left,
          })
        }
      )
    } else {
      animation.transition(
        leftEl,
        {
          styles: {
            transform: `rotate(${newDeg.left}deg)`,
          },
          duration: newDur.left,
        },
        () => {
          if (pr < 0.5) {
            animation.transition(leftEl, {
              styles: {
                opacity: 0,
                transform: 'rotate(225deg)',
              },
            })
          }
          animation.transition(
            rightEl,
            {
              styles: {
                transform: `rotate(${newDeg.right}deg)`,
              },
              duration: newDur.right,
            },
            () => {
              if (pr <= 0) {
                animation.transition(rightEl, {
                  styles: {
                    opacity: 0,
                    transform: 'rotate(45deg)',
                  },
                })
              }
            }
          )
        }
      )
    }
  } else {
    const lastDur = getBackDuration(lastPrA, props.duration)
    if (pr >= lastPrA) {
      animation.transition(
        rightEl,
        {
          styles: {
            transform: `rotate(${newDeg.right}deg)`,
          },
          duration: newDur.right - lastDur.right,
        },
        () => {
          if (pr <= 0) {
            animation.transition(rightEl, {
              styles: {
                opacity: 0,
                transform: 'rotate(45deg)',
              },
            })
          }
          if (pr > 0.5 && lastPrA <= 0.5) {
            animation.transition(leftEl, {
              styles: {
                opacity: 1,
                transform: 'rotate(225deg)',
              },
            })
          }
          animation.transition(leftEl, {
            styles: {
              transform: `rotate(${newDeg.left}deg)`,
            },
            duration: newDur.left - lastDur.left,
          })
        }
      )
    } else {
      animation.transition(
        leftEl,
        {
          styles: {
            transform: `rotate(${newDeg.left}deg)`,
          },
          duration: lastDur.left - newDur.left,
        },
        () => {
          if (pr < 0.5) {
            animation.transition(leftEl, {
              styles: {
                opacity: 0,
                transform: 'rotate(225deg)',
              },
            })
          }
          animation.transition(
            rightEl,
            {
              styles: {
                transform: `rotate(${newDeg.right}deg)`,
              },
              duration: lastDur.right - newDur.right,
            },
            () => {
              if (pr <= 0) {
                animation.transition(rightEl, {
                  styles: {
                    opacity: 0,
                    transform: 'rotate(45deg)',
                  },
                })
              }
            }
          )
        }
      )
    }
  }
}
// #endif
</script>

<style lang="scss" scoped>
.n-cp {
  position: relative;
  overflow: hidden;

  &-right {
    position: absolute;
    overflow: hidden;
    top: 0;
    right: 0;

    &-rotate {
      position: absolute;
      /* #ifndef APP-NVUE */
      opacity: 0;
      /* #endif */
      top: 0;
      right: 0;
      border-top-color: transparent;
      border-right-color: transparent;
      transition-property: transform;
      transform-origin: center;
      transform: rotate(45deg);
    }
  }
  &-left {
    position: absolute;
    overflow: hidden;
    top: 0;
    left: 0;

    &-rotate {
      position: absolute;
      /* #ifndef APP-NVUE */
      opacity: 0;
      /* #endif */
      top: 0;
      left: 0;
      border-top-color: transparent;
      border-right-color: transparent;
      transition-property: transform;
      transform-origin: center;
      transform: rotate(225deg);
    }
  }
}
</style>
