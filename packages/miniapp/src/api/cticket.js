import http from './cticket_request'

// 购票相关接口
export default {
  login(params = {}) {
    return http.post('/thirdparty/yijiyou/login', params)
  },
  logout() {
    return http.post('/thirdparty/yijiyou/logout')
  },
  // url为 `/thirdparty/scenic?project=demo` 这种时，应当把project写在params里，最终也会写进url里；并且方便拦截器拦截
  getScenic() {
    return http.get(`/thirdparty/scenic`, {
      params: {
        project: '项目名会被统一拦截并设置为getCode返回的项目名', // 在http.interceptors.request.use的第一个函数参数里，可以统一拦截修改
      },
      custom: { auth: true }, // 会统一拦截并在header里的tpAuthToken带上一机游的cticket_token
    })
  },
  // 根据景点获取票种，获取票种列表
  getTicketType(id, type = 'TICKET', start, end) {
    return http.get('thirdparty/tickettype', {
      params: {
        type: 'TICKET',
        pageNum: 0,
        pageSize: 0,
        scenic: id,
        start: start,
        end: end,
      },
      custom: { auth: true },
    })
  },
  // 获取票种详情（当选择了start和end的日期后，获取相应的票价）
  getTicketInfo(id, params) {
    return http.get(`thirdparty/tickettype/${id}`, {
      params: params,
      custom: { auth: true },
    })
  },
  // 创建订单
  // luch-request中，POST和GET处理方法有不同之处，需要读文档 https://www.quanzhan.co/luch-request/guide/3.x/#example
  createOrder(params) {
    return http.post('thirdparty/order', params, {
      custom: { auth: true },
    })
  },
  // 由订单号获取订单详情 /thirdparty/order/{id} 获取订单详情
  getOrderDetail(id) {
    return http.get(`thirdparty/order/${id}`, {
      custom: { auth: true },
    })
  },
  // 发起支付请求
  // 接口信息: https://pwxdev.cleartv.cn/swagger-ui.html?urls.primaryName=第三方#/一机游验证接口/
  // 要使用【一机游验证接口】里的“一机游支付请求”
  createNewWXyjyPay(params) {
    return http.post(
      '/thirdparty/yijiyou/pay',
      { fee: params.fee, order_no: params.order_no },
      {
        custom: { auth: true },
      }
    )
  },
  // 订单列表 /thirdparty/order 获取订单列表
  getOrderList(params) {
    let orderStr
    const { pageNum = 0, pageSize = 0, status = [] } = params
    if (status.length > 0) {
      orderStr = status
        .map((i) => {
          return `status=${i}`
        })
        .join('&')
    }
    return http.get(`thirdparty/order?pageNum=${pageNum}&pageSize=${pageSize}&${orderStr || ''}`, {
      params: {
        pageNum: pageNum,
        pageSize: 10,
        pay_status: params.pay_status,
        status: status,
      },
      custom: { auth: true },
    })
  },
  // 获取服务器时间 （支付倒计时需要）
  // https://pwxdev.cleartv.cn/swagger-ui.html?urls.primaryName=管理端#/通用服务
  getServerTime() {
    return http.get('common/current_time', {
      custom: { auth: true },
    })
  },
  // 取消订单 /thirdparty/order/{id}
  cancelTicketOrder(id) {
    return http.delete(
      `thirdparty/order/${id}`,
      {},
      {
        custom: { auth: true },
      }
    )
  },
  // 删除订单 POST /thirdparty/order/{id}/delete
  deleteTicketOrder(id) {
    return http.post(
      `thirdparty/order/${id}/delete`,
      {},
      {
        custom: { auth: true },
      }
    )
  },
}
