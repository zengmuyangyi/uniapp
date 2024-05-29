import http from './request'

// 获取购票列表
export function fetchTicketList(params) {
  return http.post('/mobile/template/season/list', params)
}
