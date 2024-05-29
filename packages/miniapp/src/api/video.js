import http from './request'

export function fetchVideoList(params) {
  return http.post('/mobile/template/video/list', params)
}
export function fetchVideo(id) {
  return http.post('/mobile/template/video/detail', { id })
}
// -------------------------获取视频类型----------------
export function fetchVideoType(params) {
  return http.post('/mobile/template/video/typeList', params)
}
