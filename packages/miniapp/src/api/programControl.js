import http from './request'

export function fetchProgramTree() {
  return http.post('/mobile/template/home/treeselect', {
    pageNum: 0,
    pageSize: 0,
    status: 1,
  })
}
export function fetchProgramList(parentId) {
  const params = {
    pageNum: 0,
    pageSize: 0,
    status: 1,
    parentId: parentId,
  }
  return http.post('/mobile/template/home/list', params)
}
