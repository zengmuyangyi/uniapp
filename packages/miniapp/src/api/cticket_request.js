import { parseObject } from '@/service/util'
import { getQuery } from '@/service/util'
import Request from 'luch-request'
// import { getExtConfig } from '@/service/util'
const isDev = import.meta.env.MODE === 'development'

function getExtConfig() {
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
const http = new Request({
  baseURL: isDev ? 'https://pwxdev.cleartv.cn' : 'https://pwx.cleartv.cn',
})

const extConfig = getExtConfig()

// 统一拦截票务thirdparty请求相关设置
const customConfigGetter = (config) => {
  config = modifyProjectFromGetCode(config)
  return config
}

const modifyProjectFromGetCode = (config) => {
  // getCode请求时，会获取票务thirdparty请求用的项目名，同时写入本地存储
  // 这里拦截其他请求，把项目名设置为从本地存储中读出的项目名
  // 比如luyao项目的getCode请求时，可以获取项目名为demo，并且在thirdparty请求时都采用demo的项目名，动态设置方便测试和生产切换
  if (config?.params?.project) {
    config.params.project = uni.getStorageSync('cticket_projectName')
  }
  return config
}

http.interceptors.request.use(
  (config) => {
    console.log('%c [ config ]-9', 'font-size:13px; background:pink; color:#bf2c9f;', config)
    // 可使用async await 做异步操作
    config.header = {
      ...config.header,
      a: 1, // 演示拦截器header加参
    }

    const project = extConfig.project
    //演示custom 用处
    if (config.custom.auth && uni.getStorageSync('cticket_token')) {
      config.header.tpAuthToken = uni.getStorageSync('cticket_token')
    }
    /**
   /* 演示
   if (!token) { // 如果token不存在，return Promise.reject(config) 会取消本次请求
      return Promise.reject(config)
    }
   **/
    const style = 'font-size:13px; background:pink; color:#bf2c9f;'
    console.log('%c [extConfig项目名]:', style, project)
    // extConfig中获取的x
    config = customConfigGetter(config)
    return config
  },
  (config) => {
    // 可使用async await 做异步操作
    return Promise.reject(config)
  }
)

http.interceptors.response.use(
  (response) => {
    return response
  },
  (response) => {
    /*  对响应错误做点什么 （statusCode !== 200）*/
    console.log(response)
    return Promise.reject(response)
  }
)

export default http
