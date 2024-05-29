import http from './request'
// 判断是否收藏
export function ifCollect(params) {
  return http.post('/mobilenew/userCollect/ifCollect', params, {
    custom: { auth: true },
  })
}
// 保存收藏
export function saveCollect(params) {
  return http.post('/mobilenew/userCollect/save', params, {
    custom: { auth: true },
  })
}
// 取消收藏
export function cancelCollect(params) {
  return http.post('/mobilenew/userCollect/cancel', params, {
    custom: { auth: true },
  })
}
// 获取我的收藏列表
export function fetchMyCollect() {
  return http.get('/mobilenew/userCollect/list', {
    custom: { auth: true },
  })
}
