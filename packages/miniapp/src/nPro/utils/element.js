// #ifdef APP-NVUE
const dom = uni.requireNativePlugin('dom')
// #endif

/**
 * name: in query it is id selector. in dnvue-dom, it is ref
 * we recommended use query selector
 */
export function getElSize(name, useQuery = false, ins) {
  return new Promise((res, rej) => {
    if (useQuery) {
      const el = ins
        ? uni
            .createSelectorQuery()
            .in(ins)
            .select('#' + name)
        : uni
            .createSelectorQuery()
            .in()
            .select('#' + name)
      el.fields(
        {
          size: true,
          rect: true,
        },
        (data) => {
          if (data) {
            res(data)
          } else {
            rej({})
          }
        }
      ).exec()
    } else {
      // #ifndef APP-NVUE
      const el = ins
        ? uni
            .createSelectorQuery()
            .in(ins)
            .select('#' + name)
        : uni
            .createSelectorQuery()
            .in()
            .select('#' + name)
      el.fields(
        {
          size: true,
          rect: true,
        },
        (data) => {
          if (data) {
            res(data)
          } else {
            rej({})
          }
        }
      ).exec()
      // #endif
      // #ifdef APP-NVUE
      // the name here is ref
      let _el = name[0]
      if (!_el) {
        _el = name
      }
      dom.getComponentRect(_el, (data) => {
        if (data.result) {
          res(data.size)
        } else {
          rej({})
        }
      })
      // #endif
    }
  })
}

export function getTouchPoint(e) {
  if (!e) {
    return {
      x: 0,
      y: 0,
      sX: 0,
      sY: 0,
    }
  }
  if (e.touches && e.touches[0]) {
    return {
      x: e.touches[0].pageX,
      y: e.touches[0].pageY,
      sX: e.touches[0].screenX,
      sY: e.touches[0].screenY,
    }
  } else if (e.changedTouches && e.changedTouches[0]) {
    return {
      x: e.changedTouches[0].pageX,
      y: e.changedTouches[0].pageY,
      sX: e.changedTouches[0].screenX,
      sY: e.changedTouches[0].screenY,
    }
  } else {
    return {
      x: e.clientX,
      y: e.clientY,
    }
  }
}

export function scrollToElement(ref, options = { offset: 0, animated: true }) {
  // #ifdef APP-NVUE
  dom.scrollToElement(ref, options || { offset: 0, animated: true })
  // #endif
}

export function useElRefs() {
  function setElRef(el, key) {
    if (el) {
      elRefs[key || 'el'] = el
    }
  }
  const elRefs = { set: setElRef }
  return elRefs
}
