import { defineStore } from 'pinia'
import { login, logout, fetchUserInfo, fetchCourseType } from '@/api/szgbxy'
import { to } from '@/service/util'
export const useSzgbxyStore = defineStore('szgbxy', {
  state: () => ({
    userInfo: null,
    isLog: false,
  }),
  getters: {},
  actions: {
    async setToken(params) {
      const [err, res] = await to(login(params))
      if (err) {
        uni.showToast({
          title: err.data.msg,
          icon: 'none',
        })
        return
      }
      uni.setStorageSync('token', res.token)
      this.getUserInfo()
      this.isLog = true
      uni.showToast({
        title: '登录成功',
        icon: 'none',
      })
      uni.navigateBack({
        delta: 1,
      })
    },
    async getUserInfo() {
      const [err, res] = await to(fetchUserInfo())
      if (err) return
      this.userInfo = res
      this.isLog = true
    },
    async cleanToken() {
      uni.removeStorage('token')
      this.isLog = false
      this.userInfo = null
      await logout()
    },
  },
})
