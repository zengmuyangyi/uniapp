import http from './request'

export function fetchLanguageList() {
  return http.post('/mobile/language/list')
}

export function fetchSliderImage() {
  return http.post(`/mobile/template/loopImages/list`, {
    name: '',
    pageNum: 0,
    pageSize: 0,
  })
}

export function fetchCurrentScenic() {
  return http.post(`/mobile/template/scenic/list`, {
    name: '',
    pageNum: 1,
    pageSize: 1,
  })
}

export function getScenicList() {
  return http.get(`/mobile/template/scenic/list`)
}

export function fetchAnnouncement() {
  return http.post(`/mobile/template/announcement/list`, {
    name: '',
    status: 1,
    pageNum: 0,
    pageSize: 0,
  })
}
export function fetchHelpList(parentId) {
  return http.get(`/mobile/template/typeChild/${parentId}`)
}
export function fetchAnnouncementDetail(id) {
  return http.post('/mobile/template/announcement/detail', { id })
}
export function fetchAnnouncementList(params) {
  return http.post('/mobile/template/announcement/list', params)
}
