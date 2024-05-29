import { parseObject } from '@/utils'
import axios from 'axios'
import { useRoute } from 'vue-router'

axios.defaults.baseURL = import.meta.env.DEV ? '/api' : window.config && window.config.baseUrl

// query参数需在拿到后再进行数据请求，在APP初始化后修改拦截器
export function initHttp() {
  const route = useRoute()

  axios.interceptors.request.use(
    (config) => {
      console.log('%c [ query ]-9', 'font-size:13px; background:pink; color:#bf2c9f;', route.query)
      config.url = config.url + `?project=${route.query.project || 'eling'}`
      if (config.data) {
        config.data.project = route.query.project
      }
      return config
    },
    (error) => {
      // do something
      return Promise.reject(error)
    }
  )

  axios.interceptors.response.use(
    (response) => {
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

        return data || response.data
      }

      return Promise.reject(response)
    },
    (error) => {
      return Promise.reject(error)
    }
  )
}

export default axios
