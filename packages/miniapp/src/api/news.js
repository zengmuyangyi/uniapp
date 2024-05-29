import http from './request'
import { useScenic } from '@/store/scenic'

export default {
  // 获取室内地图
  async getExhibitionList(params) {
    const store = useScenic()
    const menu = await store.getMenu('exhibition')
    console.log('%c [ menu ]-9', 'font-size:13px; background:pink; color:#bf2c9f;', menu)

    params.menuId = menu.id
    return http.post('/mobile/template/news/list', params)
  },
  getExhibition(mapId) {
    return http.post('/mobile/template/mapPOI/list', { pageNum: 0, pageSize: 0, mapId })
  },
}

export function fetchNewsType() {
  return http.post('/mobile/template/newsType/list', { pageNum: 0, pageSize: 0 })
}
export function fetchNewsTypeNew(params) {
  return http.post('/mobile/template/newsType/list', params)
}

export async function fetchNewsList(params) {
  return http.post('/mobile/template/news/list', params)
}

export async function fetchNews(id) {
  return http.post('/mobile/template/news/detail', { id })
}
