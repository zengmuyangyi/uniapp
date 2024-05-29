import http from './request'

// 获取藏品列表
export function fetchCollectionList(params) {
  return http.post('/mobile/template/collection/list', params)
}
// 获取某个藏品
export function fetchCollectionDetail(id) {
  return http.post('/mobile/template/collection/detail', { id })
}
