import http from './request'
import { useRoute } from 'vue-router'

const route = useRoute()
export function fetchScenic() {
  return http.post('/mobile/template/scenic/list', {
    pageNum: 0,
    pageSize: 0,
    // project: route?.query.project || 'eling',
  })
}

export function fetchMapList() {
  return http.post('/mobile/template/map/list', {
    pageNum: 0,
    pageSize: 0,
    // project: route?.query.project || 'eling',
  })
}

export async function fetchMapPOIType() {
  const params = {
    pageNum: 0,
    pageSize: 0,
    // parentId: 0,
    // project: route?.query.project || 'eling',
    menuId: 2,
  }

  return http.post('/mobile/template/mapPOIType/list', params)
}

export async function fetchMapPOIList({ typeId, name, recommend, mapId }) {
  //   const mapRes = await fetchMapList() // 获取地图id

  const params = {
    pageNum: 0,
    pageSize: 0,
    mapId: mapId,
    name,
    typeId,
    recommend,
    status: 1,
    // project: route?.query.project || 'eling',
  }

  return http.post('/mobile/template/mapPOI/list', params)
}
export function fetchMacPOI(params) {
  return http.post('/mobile/template/mapPOI/list', params)
}
export function fetchChildPOI(params) {
  return http.post('/mobile/template/mapPOI/listChildPoi', params)
}

export async function fetchMapPOI(id) {
  return http.post('/mobile/template/mapPOI/selectById', { id })
}

export async function fetchMapPath() {
  //   const mapRes = await fetchMapList() // 获取地图id

  return http.post('/mobile/template/mapRoute/list', {
    pageNum: 0,
    pageSize: 0,
    // project: route?.query.project || 'eling',
    // mapId: mapRes.list?.[0].id || null,
  })
}
