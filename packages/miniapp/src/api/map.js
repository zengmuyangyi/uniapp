import http from './request'
import { useScenic } from '@/store/scenic'

export default {
  // 获取室内地图
  async getIndoorMap() {
    const store = useScenic()
    const menu = await store.getMenu('indoorMap')

    return http.post('/mobile/template/map/list', { pageNum: 0, pageSize: 0, menuId: menu.id })
  },
  getIndoorPOIList(mapId) {
    return http.post('/mobile/template/mapPOI/list', { pageNum: 0, pageSize: 0, mapId })
  },
}

export function fetchMapList() {
  return http.post('/mobile/template/map/list', { pageNum: 0, pageSize: 0 })
}

export async function fetchMapPOIType() {
  const params = {
    pageNum: 0,
    pageSize: 0,
    status: 1,
  }

  return http.post('/mobile/template/mapPOIType/list', params)
}

export async function fetchMapPOIList({ typeId, name, recommend }) {
  // const mapRes = await fetchMapList() // 获取地图id

  const params = {
    pageNum: 0,
    pageSize: 0,
    // mapId: mapRes.list?.[0].id || null,
    name,
    typeId,
    recommend,
    status: 1,
  }

  return http.post('/mobile/template/mapPOI/list', params)
}

export async function fetchMapPOI(id) {
  return http.post('/mobile/template/mapPOI/selectById', { id })
}

export async function fetchMapPath() {
  // const mapRes = await fetchMapList() // 获取地图id

  return http.post('/mobile/template/mapRoute/list', {
    pageNum: 0,
    pageSize: 0,
    // mapId: mapRes.list?.[0].id || null,
  })
}
export async function newFetchMapPOIList(params) {
  return http.post('/mobile/template/mapPOI/list', params)
}
// ----------------------获取子景点------------------------
export function fetchMapPOIChildren(params) {
  return http.post('/mobile/template/mapPOI/listChildPoi', params)
}
export function fetchMapPOITypeNew(params) {
  return http.post('/mobile/template/mapPOIType/list', params)
}
