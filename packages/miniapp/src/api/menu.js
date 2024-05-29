import http from './request'

// 获取后台菜单，根据菜单获取数据
export default {
  async getMenu() {
    return http.post('/mobile/menu/list', { pageNum: 0, pageSize: 0 })
  },
}
