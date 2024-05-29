import http from './request'

// 获取部门接口
export function fetchFeedbackDepartment(params) {
  return http.post('/mobile/template/feedBack/listDepartments', params)
}
// 获取意见分类
export function fetchFeedbackType(params) {
  return http.post('/mobile/template/feedBack/listTypes', params)
}
