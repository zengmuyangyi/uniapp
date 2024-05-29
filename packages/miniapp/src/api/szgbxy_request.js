import { parseObject } from '@/service/util'
import Request from 'luch-request'
const isDev = import.meta.env.MODE === 'development'
function getBaseUrl() {
  switch (UNI_PLATFORM) {
    case 'h5':
      return isDev ? '/szgbxy' : window.config.baseUrl
    default:
      return isDev ? 'https://nettraindev.pcleartv.cn' : 'https://nettraindev.pcleartv.cn'
  }
}
const http = new Request({
  baseURL: getBaseUrl(),
})
console.log('%%%', getBaseUrl())

http.interceptors.request.use(handleConfig, (config) => {
  // 可使用async await 做异步操作
  return Promise.reject(config)
})

http.interceptors.response.use(
  (response) => {
    // console.log('%c [ response ]-44', 'font-size:13px; background:pink; color:#bf2c9f;', response)
    /* 对响应成功做点什么 可使用async await 做异步操作*/
    //  if (response.data.code !== 200) { // 服务端返回的状态码不等于200，则reject()
    //    return Promise.reject(response) // return Promise.reject 可使promise状态进入catch
    // if (response.config.custom.verification) { // 演示自定义参数的作用
    //   return response.data
    // }

    if (
      response.config.url.indexOf('weather') > -1 ||
      response.config.url.indexOf('restapi') > -1
    ) {
      return response
    }
    if (response.config.url.indexOf('auth') > -1) {
      if (response.data.code === '200000') {
        uni.showToast({
          title: '当前未登录',
          icon: 'none',
        })
        return Promise.reject(response)
      }
      if (response.data.code === '200') {
        return response.data.data
      }
      return Promise.reject(response)
    }

    if (response.data.code === '200') {
      const data = response.data?.data
      if (data) {
        parseObject(data)
      }

      const listData = response.data?.data?.records || []

      // JSON字符串数据预处理
      listData.forEach((item) => {
        parseObject(item)
      })

      return response.data.data
    }
    if (response.data.code === '200000') {
      console.log('****')
      uni.showToast({
        title: '请登录',
        icon: 'none',
      })
      setTimeout(() => {
        uni.navigateTo({
          url: `/pages/${UNI_PROJECT}/login/index`,
        })
      }, 1000)
    }
    uni.showToast({
      title: response.data.msg,
      icon: 'none',
    })
    return Promise.reject(response)
  },
  (response) => {
    /*  对响应错误做点什么 （statusCode !== 200）*/
    console.log(response)
    return Promise.reject(response)
  }
)

function handleConfig(config) {
  if (config.custom.auth && uni.getStorageSync('token')) {
    config.header.token = uni.getStorageSync('token')
  }
  return config
}

export default http
