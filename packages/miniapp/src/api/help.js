import http from './request'

// 获取问答类型
export function fetchHelpType(params) {
  return http.post('/mobile/template/qsType/list', params)
}
// 获取问答内容
export function fetchHelpList(params) {
  return http.post('/mobile/template/qsDetail/list', params)
}
