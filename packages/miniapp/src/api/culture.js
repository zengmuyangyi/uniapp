import http from './request'

export const cultureApi = {
  getList: (params) => http.post('/mobile/template/culture/list', params),
  getItem: (params) => http.post('/mobile/template/culture/detail', params),
}
