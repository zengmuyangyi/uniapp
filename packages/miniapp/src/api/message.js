import http from './request'

// ---------------添加poi用户评价体系------------
export function addPoiMessage(params) {
  return http.post('/mobilenew/template/poiUser/add', params, {
    custom: { auth: true },
  })
}
// -----------------获取poi用户留言----------------
export function fetchPoiMessage(params) {
  return http.post('/mobilenew/template/poiUser/list', params)
}
