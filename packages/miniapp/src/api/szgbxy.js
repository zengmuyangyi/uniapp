import http from './szgbxy_request'
import { turnObject } from '@/service/util'

// -------------------------获取轮播图-------------------------
export function fetchBanner(params) {
  return http.get(`/app/banner?${turnObject(params)}`)
}
// -------------------------获取通知公告-----------------------
export function fetchNotice(params) {
  return http.get(`/app/notice?${turnObject(params)}`, {
    custom: { auth: true },
  })
}
// ---------------------------获取公告详情---------------------
export function fetchNoticeDetail(id) {
  return http.get(`/app/notice/getNoticeById/${id}`, {
    custom: { auth: true },
  })
}
// -------------------------登录---------------------------
export function login(params) {
  return http.post('/app/auth/login', { data: params })
}
// -------------------------获取当前登录用户信息----------------
export function fetchUserInfo() {
  return http.get('/app/auth/getCurrentUserInfo', {
    custom: { auth: true },
  })
}
// -----------------------修改密码-------------------------
export function updatePassword(params) {
  return http.post(
    '/app/auth/updateUserInfo',
    { data: params },
    {
      custom: { auth: true },
    }
  )
}
// -------------------------退出登录------------------------
export function logout() {
  return http.post('/app/auth/logout')
}
// -------------------------发送验证码---------------------
export function authSmsSend(params) {
  return http.post('/noAuth/authSmsSend', { data: params })
}
// -------------------------获取课程分类-----------------------
export function fetchCourseType(params) {
  return http.get(`/app/course?${turnObject(params)}`)
}
// ------------------------获取精选课程-----------------------
export function fetchTopCourse(params) {
  return http.get(`/app/course/topCourse?${turnObject(params)}`)
}
// ------------------------获取课程列表------------------------
export function fetchCourseList(params) {
  return http.get(`/app/course/list?${turnObject(params)}`)
}
// -------------------------获取课程详情-----------------------
export function fetchCourseById(id) {
  return http.get(`/app/course/getCourseById/${id}`, {
    custom: { auth: true },
  })
}
// -------------------------用户对课程评价--------------------
export function evaluateCourse(params) {
  return http.post(
    '/app/course/evaluate',
    { data: params },
    {
      custom: { auth: true },
    }
  )
}
// -------------------------记录用户学习记录-------------------
export function saveCourseLearnRecord(params) {
  return http.post(
    '/app/course/saveCourseLearnRecord',
    { data: params },
    {
      custom: { auth: true },
    }
  )
}
// --------------------------报名课程---------------------
export function signUpCourse(id) {
  return http.post(
    '/app/course/signUp',
    { data: { courseId: id } },
    {
      custom: { auth: true },
    }
  )
}
// --------------------------收藏或取消收藏课程-------------------
export function collectCourse(id) {
  return http.post(
    '/app/course/collect',
    { data: { courseId: id } },
    {
      custom: { auth: true },
    }
  )
}
// --------------------------获取我的课程--------------------------
export function fetchMyCourse(params) {
  return http.get(`/app/course/myCourse?${turnObject(params)}`, {
    custom: { auth: true },
  })
}
// ---------------------------取消报名课程-------------------------
export function signUpCancel(id) {
  return http.post(
    '/app/course/signUpCancel',
    { data: { courseId: id } },
    {
      custom: { auth: true },
    }
  )
}
// ---------------------------获取培训列表-------------------------
export function fetchTrainList(params) {
  return http.get(`/app/train/list?${turnObject(params)}`, {
    custom: { auth: true },
  })
}
// ----------------------------获取培训详情-------------------------
export function fetchTrain(id) {
  return http.get(`/app/train/getTrainById/${id}`, {
    custom: { auth: true },
  })
}
// ----------------------------获取课表信息--------------------------
export function fetchTrainClass(id) {
  return http.get(`/app/train/trainClass/${id}`, {
    custom: { auth: true },
  })
}
// ----------------------------培训文档上传---------------------------
export function addTrainFile(params) {
  return http.post('/app/trainFile/add', { data: params }, { custom: { auth: true } })
}
// ----------------------------获取我的培训列表------------------------
export function fetchMyTrain(params) {
  return http.get(`/app/train/myTrain?${turnObject(params)}`, { custom: { auth: true } })
}
// -----------------------------课程签到------------------------------
export function signInClass(params) {
  return http.post(`/app/train/signIn?${turnObject(params)}`, { custom: { auth: true } })
}
