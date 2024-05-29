import http from './request'

export function login({ code, project }) {
  return http.post('/wx/wxmini/login', {
    code,
    project,
  })
}

export function isLogin() {
  return http.get('/wx/wxmini/checklogin', {
    custom: { auth: true },
  })
}

export function getUserInfo() {
  return http.get('/wx/wxmini/userinfo', {
    custom: { auth: true },
  })
}

export function setUserInfo(params) {
  return http.post('/wx/wxmini/userinfo', params, {
    custom: { auth: true },
  })
}

export function setAge(params) {
  return http.post('/wx/wxmini/age', params, {
    custom: { auth: true },
  })
}

export function directSetUserinfo(params) {
  return http.post('/wx/wxmini/directSetUserinfo', params, {
    custom: { auth: true },
  })
}

export function setPhone(params) {
  return http.post('/wx/wxmini/phone', params, {
    custom: { auth: true },
  })
}

export function addFeedback(params) {
  return http.post('/mobile/template/feedBack/add', params)
}
// 查询意见反馈
export function fetchFeedBack(params) {
  return http.post('/mobile/template/feedBack/list', params)
}

export function getCode(params = {}) {
  return http.post('/wx/wxmini/getCode', params, {
    custom: { auth: true },
  })
}
