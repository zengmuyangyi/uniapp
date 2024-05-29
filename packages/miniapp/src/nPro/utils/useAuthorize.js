export function useGetSetting(scope) {
  return new Promise((resolve, reject) => {
    uni.getSetting({
      success: (res) => {
        if (res.authSetting.hasOwnProperty(scope)) {
          if (res.authSetting[scope]) {
            resolve({ success: true })
          } else {
            resolve({ success: false })
          }
        } else {
          resolve({ success: false })
        }
      },
      fail: (err) => {
        reject({ success: false, error: err })
      },
    })
  })
}

export function useAuthorize(scope) {
  return new Promise((resolve, reject) => {
    uni.authorize({
      scope: scope,
      success: (res) => {
        resolve({ success: true })
      },
      fail: (err) => {
        reject({ success: false, error: err })
      },
    })
  })
}

export function useOpenSetting(scope) {
  return new Promise((resolve, reject) => {
    uni.openSetting({
      success: (res) => {
        if (res.authSetting[scope]) {
          resolve({ success: true })
        } else {
          resolve({ success: false })
        }
      },
      fail: (err) => {
        reject({ success: false, error: err })
      },
    })
  })
}
