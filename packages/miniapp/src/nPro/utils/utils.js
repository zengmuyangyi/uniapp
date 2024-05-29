export function isSrc(url) {
  return url.indexOf('http') === 0 || url.indexOf('data:image') === 0 || url.indexOf('//') === 0
}

function _typeof(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
}

export function isPlainObject(obj) {
  return _typeof(obj) === 'object'
}

export function isString(obj) {
  return typeof obj === 'string'
}

export function isNonEmptyArray(obj = []) {
  return obj && obj.length > 0 && Array.isArray(obj) && typeof obj !== 'undefined'
}

export function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item)
}

export function isEmptyObject(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object
}

export function decodeIconFont(text) {
  // 正则匹配 图标和文字混排 eg: 我去上学校&#xe600;,天天不&#xe600;迟到
  const regExp = /&#x[a-z|0-9]{4,5};?/g
  if (regExp.test(text)) {
    return text.replace(new RegExp(regExp, 'g'), function (iconText) {
      const replace = iconText.replace(/&#x/, '0x').replace(/;$/, '')
      return String.fromCharCode(replace)
    })
  } else {
    return text
  }
}

export function mergeDeep(target, ...sources) {
  if (!sources.length) return target
  const source = sources.shift()
  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) {
          Object.assign(target, {
            [key]: {},
          })
        }
        mergeDeep(target[key], source[key])
      } else {
        Object.assign(target, {
          [key]: source[key],
        })
      }
    }
  }
  return mergeDeep(target, ...sources)
}

export function deepCopy(obj) {
  var newobj = {}
  for (arr in obj) {
    if (typeof obj[arr] === 'object' && obj[arr] !== null) {
      newobj[arr] = deepCopy(obj[arr])
    } else {
      newobj[arr] = obj[arr]
    }
  }
  return newobj
}

export function compareVersion(currVer = '0.0.0', promoteVer = '0.0.0') {
  if (currVer === promoteVer) return true
  const currVerArr = currVer.split('.')
  const promoteVerArr = promoteVer.split('.')
  const len = Math.max(currVerArr.length, promoteVerArr.length)
  for (let i = 0; i < len; i++) {
    const proVal = ~~promoteVerArr[i]
    const curVal = ~~currVerArr[i]
    if (proVal < curVal) {
      return true
    } else if (proVal > curVal) {
      return false
    }
  }
  return false
}

export function arrayChunk(arr = [], size = 4, fill) {
  let groups = []
  if (arr && arr.length > 0) {
    groups = arr
      .map((e, i) => {
        return i % size === 0 ? arr.slice(i, i + size) : null
      })
      .filter((e) => {
        return e
      })
  }
  if (typeof fill != 'undefined') {
    while (groups[groups.length - 1].length < size) {
      groups[groups.length - 1].push(fill)
    }
  }
  return groups
}

export function arraySort(arr = [], key, asc = true, fn) {
  if (fn) {
    arr.sort(fn)
    return
  }
  arr.sort((a, b) => {
    const x = key ? a.key : a
    const y = key ? b.key : b
    if (asc) {
      return x - y
    }
    return y - x
  })
}

// 乱序array. 原地打乱。需要注意会覆盖传入的数组
export function derangeArray(arr = []) {
  for (
    var j, x, i = arr.length;
    i;
    j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x
  );
  return arr
}

// 使用reduce对数组去重
export function derepeatArray(arr = [], key = null) {
  if (key) {
    const obj = {}
    return arr.reduce((cur, next) => {
      obj[next[key]] ? '' : (obj[next[key]] = true && cur.push(next))
      return cur
    }, [])
  } else {
    return [...new Set(arr)]
  }
}

/**
 * 将字符串按照指定长度分割
 */
export function splitStringByStep(str, step = 12) {
  if (str) {
    const arr = []
    str.replace(new RegExp('(.{' + step + '})', 'gim'), (a) => {
      arr.push(a)
      return a
    })
    const len = str.length
    if (len > arr.length * step) {
      arr.push(str.substr(arr.length * step))
    }
    return arr
  }
  return []
}

/**
 * Mac地址的加减操作
 * step只支持1/-1
 */
export function macPlus(mac, step = 1) {
  const str = mac.split(':').join('')
  const arr = splitStringByStep(str, 2).reverse()
  return recursionMac(arr, 0, step).reverse()
}

export function recursionMac(arr = [], pos = 0, step = 1) {
  if (pos >= arr.length - 1) {
    let a = parseInt(parseInt(arr[arr.length - 1], 16).toString(10)) + step
    a = parseInt(a).toString(16)
    if (a.length <= 1) {
      a = '0' + a
    }
    arr[arr.length - 1] = a
    return arr
  }
  let a = parseInt(parseInt(arr[pos], 16).toString(10))
  if (a == 255 && step > 0) {
    arr[pos] = '00'
    return recursionMac(arr, pos + 1, step)
  } else if (a == 0 && step < 0) {
    arr[pos] = 'FF'
    return recursionMac(arr, pos + 1, step)
  } else {
    a += step
    let hex = parseInt(a).toString(16)
    if (hex.length <= 1) {
      hex = '0' + hex
    }
    arr[pos] = hex
    return arr
  }
}

export function supplyStr(str, supply, target, prefix = true) {
  const strLen = str.length
  if (strLen >= target) return str
  let a = ''
  for (let i = 0; i < target - strLen; i++) {
    a = a + '' + supply
  }
  return prefix ? a + str : str + a
}

/*
 * 截断字符串
 * @param str 传入字符串
 * @param len 截断长度
 * @param hasDot 末尾是否...
 * @returns {String}
 */
export function truncateString(str, len, hasDot = true) {
  let newLength = 0
  let newStr = ''
  let singleChar = ''
  const chineseRegex = /[^\x00-\xff]/g
  const strLength = str.replace(chineseRegex, '**').length
  for (let i = 0; i < strLength; i++) {
    singleChar = str.charAt(i).toString()
    if (singleChar.match(chineseRegex) !== null) {
      newLength += 2
    } else {
      newLength++
    }
    if (newLength > len) {
      break
    }
    newStr += singleChar
  }

  if (hasDot && strLength > len) {
    newStr += '...'
  }
  return newStr
}

/**
 * 判断两个行政代码地址是否包含
 * code1是否是code2的超集。
 * 比如：code1是11，code2是110101，表明code1是code2的超集，code1在scode2范围之内
 * @param {Object} code1
 * @param {Object} code2
 */
export function judgeAreaInArea(code1, code2) {
  if (!code1 || !code2) return false
  const p = code1.slice(0, 2)
  const pc = code1.slice(2, 4) || ''
  const area = code1.slice(4, 6) || ''
  if (!code2.startsWith(p)) {
    return false
  } else {
    // 在省里面，考察是不是要限制市
    if (pc && pc != '00' && !code2.startsWith(p + pc)) {
      return false
    } else {
      // 在省市内，考察区域限制
      if (area && area != '0' && area != '00') {
        // 全匹配
        if (code2 != code1) {
          return false
        }
      }
    }
  }
  return true
}

/*
 * 转换 obj 为 url params参数
 * @param obj 传入字符串
 * @returns {String}
 */
export function objToParams(obj) {
  let str = ''
  for (const key in obj) {
    if (str !== '') {
      str += '&'
    }
    str += key + '=' + encodeURIComponent(obj[key])
  }
  return str
}

/*
 * 转换 url params参数为obj
 * @param str 传入url参数字符串
 * @returns {Object}
 */
export function paramsToObj(str) {
  let obj = {}
  try {
    obj = JSON.parse(
      '{"' + decodeURI(str).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}'
    )
  } catch (e) {
    console.log(e)
  }
  return obj
}

// only simple css to js
export function cssToJs(str) {
  const arr = (str || '').split(';')
  const a = {}
  arr.forEach((val) => {
    if (val && val.length >= 3) {
      const b = val.trim().split(':')
      const attr = b[0].trim()
      const value = b[1].trim()
      a[attr] = value
    }
  })
  return a
}

export const toLine = (name) => {
  return name.replace(/([A-Z])/g, '-$1').toLowerCase()
}
/**
 * style对象转化为style字符串
 * @return {string}
 */
export function styleObjToStr(styleObject) {
  let transfrom = ''
  for (let i in styleObject) {
    let line = toLine(i)
    transfrom += line + ':' + styleObject[i] + ';'
  }
  return transfrom
}

/**
 * 防抖：
 * 一定时间内连续触发事件，只会执行最后的一次触发
 * @param {Object} fn
 * @param {Number} delay
 */
export function debounce(fn, delay = 300) {
  let timer = null
  return function () {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(fn, delay)
  }
}

/**
 * 节流：
 * 对于不断触发的事件，只会每隔一段时间触发一次
 * @param {Object} fn
 * @param {Number} delay
 */
export function throttle(fn, delay = 300) {
  let valid = true
  return function () {
    if (!valid) {
      return false
    }
    valid = false
    setTimeout(() => {
      fn()
      valid = true
    }, delay)
  }
}

export default {
  isSrc,
  isPlainObject,
  isString,
  isObject,
  isNonEmptyArray,
  isEmptyObject,
  decodeIconFont,
  mergeDeep,
  deepCopy,
  compareVersion,
  arrayChunk,
  derangeArray,
  derepeatArray,
  splitStringByStep,
  macPlus,
  truncateString,
  objToParams,
  paramsToObj,
  cssToJs,
  styleObjToStr,
  debounce,
  throttle,
}
