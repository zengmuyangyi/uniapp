import http from './request'

export function fetchPhotoAlbum() {
  return http.post('/mobile/template/photoAlbum/list', { pageNum: 0, pageSize: 0, status: 1 })
}

export function fetchPhotoList(albumId) {
  return http.post('/mobile/template/photos/list', { pageNum: 0, pageSize: 0, albumId })
}
