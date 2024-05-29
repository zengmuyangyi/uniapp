import { parseObject } from '@/service/util'
import Request from 'luch-request'
import { getBaseUrl, getExtConfig } from '@/service/util'

const http = new Request({
  // baseURL: 'http://192.168.30.180:81/',
  baseURL: getBaseUrl(),
})

const extConfig = getExtConfig()

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

    if (response.data.resCode === 200) {
      const data = response.data?.extraInfo
      if (data) {
        parseObject(data)
      }

      const listData = response.data?.extraInfo?.list || []

      // JSON字符串数据预处理
      listData.forEach((item) => {
        parseObject(item)
      })

      return response.data.extraInfo
    }
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
    config.header.tpAuthToken = uni.getStorageSync('token')
  }

  const project = extConfig.project === 'dayan' ? 'dayan' : extConfig.project

  if (!config.url.includes('weather') && !config.url.includes('restapi')) {
    // 根据方法，添加项目参数
    switch (config.method) {
      case 'GET':
        config.url = config.url + `?project=${project}`
        break
      case 'POST':
        config.url = config.url + `?project=${project}`
        if (config.data) {
          config.data.project = project
        }
        break
      default:
        break
    }
  }

  return config
}

export default http
