import mitt from 'mitt'
import { useApp } from '@/stores'
export const emitter = mitt()
// 多语言文本
export function getImage(imgObj) {
  if (!imgObj) return ''
  const { language } = useApp()
  return imgObj[language] || imgObj.cn
}

// 多语言文本
export function getText(strObj) {
  if (!strObj) return ''
  const { language } = useApp()
  return strObj[language] || strObj.cn
}

// 处理后台返回的多语言json字符串数据
export function parseObject(data) {
  const keys = Object.keys(data || {})

  keys.forEach((key) => {
    if (isJSON(data[key])) {
      data[key] = JSON.parse(data[key])
    }
  })

  if (data?.tags) {
    data.tags = data.tags.split(',')
  } else if (data?.tags === '') {
    data.tags = []
  }
  if (data?.tag) {
    data.tag = data.tag.split(',')
  } else if (data?.tag === '') {
    data.tag = []
  }
}

export function isJSON(str) {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}
// 距离计算
export function getDistance(point1, point2) {
  const { latitude: lat1, longitude: lng1 } = point1
  const { latitude: lat2, longitude: lng2 } = point2

  let dis = 0
  const radLat1 = toRadians(lat1)
  const radLat2 = toRadians(lat2)
  const deltaLat = radLat1 - radLat2
  const deltaLng = toRadians(lng1) - toRadians(lng2)
  dis =
    2 *
    Math.asin(
      Math.sqrt(
        Math.pow(Math.sin(deltaLat / 2), 2) +
          Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(deltaLng / 2), 2)
      )
    )
  return dis * 6378137

  function toRadians(d) {
    return (d * Math.PI) / 180
  }
}

export function navigateTo(data) {
  console.log(data)
  // 通知小程序父页面
  window.parent.postMessage(JSON.stringify({ action: 'navigateTo', data: data }), '*')
}
