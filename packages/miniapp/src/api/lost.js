import http from './request'

export function addLost(params) {
  return http.post('/mobilenew/lostFound/add', params, {
    custom: { auth: true },
  })
}
export function fetchMyLostList(params) {
  return http.post('/mobilenew/lostFound/myList', params, {
    custom: { auth: true },
  })
}
// 修改失物招领信息
export function updateLost(params) {
  return http.post('/mobilenew/lostFound/update', params, {
    custom: { auth: true },
  })
}
// 失物招领展示
export function fetchLostList(params) {
  return http.post('/mobilenew/lostFound/getPublishedInfo', params, {
    custom: { auth: true },
  })
}
// 确认领回
export function lostFound(params) {
  return http.post('/mobilenew/lostFound/foundBack', params, {
    custom: { auth: true },
  })
}
