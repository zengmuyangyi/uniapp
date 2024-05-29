import { defineStore } from 'pinia'
import { login, getCode, isLogin, getUserInfo, setPhone } from '@/api/user'
import { to } from '@/service/util'
import cticketApi from '@/api/cticket'

const isDev = import.meta.env.MODE === 'development'

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo:
      UNI_PROJECT === 'dayan'
        ? {
            nickName: '⚡️',
            gender: 0,
            avatarUrl:
              'https://thirdwx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEKxe7kz6xFISGHjzoSxBzrk08d2qotTKria2DZiaPlib2auibcCgxicVn8MzUHpnywNFuanYKs3K1BRDbQ/132',
            phoneNumber: null,
            age: null,
            community: null,
            enterprise: null,
            openId: 'oFWCb4jq5vbXTW6OJKd3eTD5Tp6I',
          }
        : null, // 用户信息
    project: '',
    mode: false,
  }),
  getters: {
    // 以用户手机信息作为登录标识
    isLogin() {
      return UNI_PROJECT === 'dayan' ? true : this.userInfo?.phoneNumber
    },
  },
  actions: {
    async login() {
      // ------------------------一机游登录--------------------------
      const [wxErr, code] = await to(wxLogin())
      if (wxErr) {
        console.log(
          '%c [ 微信登录失败 ]-23',
          'font-size:13px; background:pink; color:#bf2c9f;',
          wxErr
        )
        return
      }

      const { extConfig } = useStore('scenic')
      const [err, res] = await to(login({ code, project: extConfig.value.project }))
      this.project = extConfig.value.project
      console.log('%c [ err, res ]-26', 'font-size:13px; background:pink; color:#bf2c9f;', err, res)
      if (err) return
      uni.setStorageSync('token', res.token)

      const [infoErr, infoRes] = await to(getUserInfo())
      console.log('%c [ 用户信息 ]-33', 'font-size:13px; background:pink; color:#bf2c9f;', infoRes)
      if (infoErr) return
      this.userInfo = infoRes

      // ------------------------第三方登录--------------------------
      const [err2, codeRes] = await to(getCode())
      if (err2) return

      // eslint-disable-next-line prefer-const
      let { projectName: project, code: request_code } = codeRes

      if (isDev) {
        project = 'demo'
      }
      uni.setStorageSync('cticket_projectName', project) // 后续接口请求从本地获取

      const [err3, thirdLoginRes] = await to(cticketApi.login({ project, request_code }))
      if (err3) return
      uni.setStorageSync('cticket_token', thirdLoginRes?.data?.extraInfo?.token) // 后续接口请求从本地获取
    },

    async setPhone(e) {
      const [err] = await to(
        setPhone({
          phoneData: e.detail.encryptedData,
          phoneIv: e.detail.iv,
        })
      )

      if (err) return

      this.updateUserInfo()
    },

    async updateUserInfo() {
      const [infoErr, infoRes] = await to(getUserInfo())
      console.log('%c [ 用户信息 ]-33', 'font-size:13px; background:pink; color:#bf2c9f;', infoRes)
      if (infoErr) return
      this.userInfo = infoRes
    },

    // -------------------------设置关怀模式----------------------------
    setMode(value) {
      this.mode = value
    },
  },
})

async function wxLogin() {
  return new Promise((resolve, reject) => {
    uni.login({
      success(res) {
        resolve(res.code)
      },
      fail(err) {
        reject(err)
      },
    })
  })
}
