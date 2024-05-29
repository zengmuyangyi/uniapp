import http from './request'

export function addActive(params) {
  return http.post('/mobilenew/template/templateActivity/add', params, {
    custom: { auth: true },
  })
}
export function fetchMyActive(params) {
  return http.post('/mobilenew/template/templateActivity/myList', params, {
    custom: { auth: true },
  })
}
// 撤回我的活动
export function cancelActive(params) {
  return http.post('/mobilenew/template/templateActivity/cancel', params, {
    custom: { auth: true },
  })
}
// 修改活动
export function updateActive(params) {
  return http.post('/mobilenew/template/templateActivity/update', params, {
    custom: { auth: true },
  })
}
