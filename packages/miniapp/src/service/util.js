import customPageMap from './customPageMap'

export function to(promise) {
  return promise.then((data) => [null, data]).catch((err) => [err])
}

// 获取商城登录时伴随code的project
export function getShopCodeProject() {
  return 'shangyouyuancun'
}
// 获取商城H5的基本地址
export function getMallH5BaseUrl() {
  return 'https://mall.pcleartv.cn/frontend/mall-mobile/' // #
}

// 跳转页面
export function navigateTo({ url: _url, redirect }) {
  if (!_url) return
  // tab页
  const project = UNI_PROJECT || 'default'
  console.log('%c [ project ]-8', 'font-size:13px; background:pink; color:#bf2c9f;', project)

  const tabPages = [
    `/pages/${project}/index/index`,
    `/pages/common/map/index`,
    `/pages/common/mine/index`,
    `/pages/${project}/mine/index`,
  ]

  let url
  if (_url.includes('pages/') || _url.includes('pagesCustom/')) {
    url = _url
  } else if (customPageMap[project]?.some((i) => _url.includes(i))) {
    url = `/pages/${project}/${_url}`
  } else {
    url = `/pages/common/${_url}`
  }

  console.log('%c [ 跳转页面 ]-32', 'font-size:13px; background:pink; color:#bf2c9f;', url)
  const options = { url }

  if (tabPages.includes(url)) {
    uni.switchTab(options)
  } else if (redirect) {
    console.log('%c [ redirect ]-26', 'font-size:13px; background:pink; color:#bf2c9f;', redirect)
    uni.redirectTo(options)
  } else {
    uni.navigateTo(options)
  }
}

export function getDistance(point1, point2) {
  const { lat1, lng1 } = point1
  const { lat2, lng2 } = point2

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

// 多语言文本
export function getImage(imgObj) {
  if (!imgObj) return ''
  const { language } = useStore('scenic')

  return imgObj[language.value] || imgObj.cn
}

// 多语言文本
export function getText(strObj) {
  if (!strObj) return ''
  const { language } = useStore('scenic')

  return strObj[language.value] || strObj.cn
}

// 处理后台返回的多语言json字符串数据
export function parseObject(data) {
  if (!data) return {}
  if (data.toString() === '[object Object]') {
    const keys = Object.keys(data)

    keys.forEach((key) => {
      if (isJSON(data[key]) && key !== '') {
        data[key] = JSON.parse(data[key])
      }
    })

    if (data.tags) {
      data.tags = data.tags.split(',')
    } else if (data.tags === '') {
      data.tags = []
    }
  } else {
    return data
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

const isDev = import.meta.env.MODE === 'development'

export function getBaseUrl() {
  console.log(UNI_PLATFORM)
  console.log('$$$', window)

  switch (UNI_PLATFORM) {
    case 'h5':
      return isDev ? '/api' : window.config.baseUrl
    default:
      return isDev
        ? 'https://tourismbackenddev.pcleartv.cn/'
        : 'https://tourismbackend.pcleartv.cn/'
  }
}

export function getExtConfig() {
  const serverConfig = uni.getExtConfigSync ? uni.getExtConfigSync() : {}

  switch (UNI_PLATFORM) {
    case 'h5': {
      const query = getQuery()
      const project = query.project || UNI_PROJECT
      console.log('%c [ project ]-92', 'font-size:13px; background:pink; color:#bf2c9f;', project)

      if (!project) {
        uni.showToast({
          icon: 'none',
          title: '缺少项目参数',
        })
      }

      return {
        project: project,
      }
    }
    default: {
      const extConfig = serverConfig.project
        ? serverConfig
        : {
            name: isDev ? '清鹤票务测试' : '清鹤票务',
            project: isDev ? UNI_PROJECT : UNI_PROJECT,
          }
      return extConfig
    }
  }
}

// get url query
export function getQuery() {
  const query = {}
  const search = location.href.split('?')[1]

  if (search) {
    const params = search.split('&')
    params.forEach((param) => {
      const [key, value] = param.split('=')
      query[key] = value
    })
  }
  return query
}
export function getTag(status) {
  if (!status) {
    return '已提交'
  } else if (status === 1) {
    return '已发布'
  }
  return '已领回'
}
export function textOmission(textNum, text) {
  if (text.length > textNum) {
    return text.slice(0, textNum) + '...'
  }
  return text
}
export function formatImage(image) {
  if (image) {
    return image.split(',')
  }
  return []
}

// ---------------------播放时长转换------------
export function sToHs(s) {
  //计算分钟
  //算法：将秒数除以60，然后下舍入，既得到分钟数
  let h
  h = Math.floor(s / 60)
  //计算秒
  //算法：取得秒%60的余数，既得到秒数
  s = s % 60
  //将变量转换为字符串
  h += ''
  s += ''
  //如果只有一位数，前面增加一个0
  h = h.length === 1 ? '0' + h : h
  s = s.length === 1 ? '0' + s : s
  return h + ':' + s
}

// -----------------------随机验证码生成---------------
export function genRandomStr(size = 4) {
  const range = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const rangeArr = range.split('')
  const strList = []
  for (let i = 0; i < size; i++) {
    const randomStr = rangeArr[Math.floor(Math.random() * rangeArr.length)]
    strList.push(randomStr)
  }
  return strList.join('')
}
// ------------------------状态返回--------------
export function statusFormat(status, list, type) {
  const temp = list.find((item) => item.status === status)
  if (type === 'color') {
    return temp.color
  }
  if (type === 'name') {
    return temp.name
  }
}
// -------------------------转化object---------------
export function turnObject(obj) {
  let str = ''
  const keys = Object.keys(obj)
  keys.forEach((key) => {
    if (obj[key] || obj[key] === 0) {
      str = str ? str + '&' + key + '=' + obj[key] : key + '=' + obj[key]
    }
  })
  return str
}
// -----------------------手机号脱敏-----------------
export function phoneHandel(num) {
  num = num + ''
  return num.slice(0, 3) + '****' + num.slice(num.length - 4, num.length)
}
// --------------------------分类名称----------------
export function typeFormat(list, id, isInterface = false, parentId) {
  const tempList = JSON.parse(JSON.stringify(list))
  const obj = tempList.find((i) => i.id === id)
  if (obj?.nick_name) {
    return obj.nick_name
  }
  if (parentId && parentId === id) {
    obj.name = '无分类'
    return obj.name
  }
  // 如果是接口返回的JSON格式的类型
  return obj ? (isInterface ? getText(obj.name || obj.title) : obj.name || obj.title) : '无分类'
}
