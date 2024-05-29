<template>
  <div>
    <!-- 订单支付页面 -->
    <div v-show="false">订单id: {{ id }}</div>
    <div v-if="isLoading">加载中...</div>
    <div v-else class="bg-#f2f6fe text-#3e3e3e box-border p-20rpx mb-0">
      <h1>订单号：{{ order.wx_order_no }}</h1>
      <div>
        <div>
          <div>下单时间 {{ order.create_time }}</div>
          <div>购买人手机 {{ order.buyer_phone }}</div>
          <div v-if="order.name">购买人姓名 {{ order.name }}</div>
          <div>
            订单状态
            {{ orderStatus[order.status] ? orderStatus[order.status] : order.status }}
          </div>
        </div>
        <section class="font-bold text-base bg-blue-200 flex rounded-30rpx mr-10rpx">
          <!-- <h2>Tickets</h2> -->
          <ul class="ml-30px mb-0">
            <li v-for="ticket in order.tickets" :key="ticket.id" class="mb-10rpx">
              <!-- 这里的“门票类型”实际上是门票的票名 -->
              <p>
                门票类型: <span class="font-normal"> {{ ticket.ticket_name }}</span>
              </p>
              <p>
                单价: <span class="font-normal">{{ ticket.price }} 元</span>
              </p>
              <p>
                游玩日期: <span class="font-normal">{{ ticket.play_date_begin }}</span>
              </p>
            </li>
          </ul>
        </section>
        <div>
          <div>数量 {{ order.tickets.length }} 张</div>
          <div>应付总额 {{ order.price }} 元</div>
        </div>
      </div>
    </div>
    <div>
      <button
        class="bg-orange-500 rounded-30rpx p-10rpx text-white"
        style="width: 75%; padding-bottom: 10px; margin-bottom: 10px"
        @click="confirmPay"
      >
        <!-- 确认支付 -->
        待支付
      </button>
      <button
        class="bg-blue-700 rounded-30rpx p-10rpx text-white"
        style="width: 75%; padding-bottom: 10px; margin-bottom: 10px"
        @click="redirectToHome"
      >
        返回首页
      </button>
      <button v-if="false" @click="fooBarHandler">测试</button>
    </div>
  </div>
</template>

<script setup>
import cticketApi from '@/api/cticket'
import { reactive } from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')

const id = ref(null)
onLoad((options) => {
  id.value = options?.id // 先根据地址获取订单id
  if (!id.value) {
    goHome()
    return
  }
  getOrderDetail() // 页面加载时用订单id请求详情
  logServerTime() // 获取服务器时间

  startPolling()
  /* startPolling() 继续轮询监控支付状态（参考大陈岛小程序没有轮询，暂时先不做轮询）*/
})

const isLoading = ref(true)
let timer = null
let elapsedSeconds = 0

const order = reactive({
  id: null,
  status: null,
  buyer_name: null,
  buyer_phone: null,
  tickets: [],
})

const goHome = () => {
  uni.navigateTo({
    url: '/pages/cticket/index/index',
  })
}
// FIXME: 跳转到首页时，门票会多展示一些，可能缺少参数或初始化时没有筛选

// navigateTo用多了可能会报错 Error: MiniProgramError {"errMsg":"navigateTo:fail webview count limit exceed"}
// 也就是超过了webview打开数量的限制，会导致首页预订按了无效，不会跳转
// 因此这里回到首页改用redirectTo，栈中不保存之前页面
const redirectToHome = () => {
  uni.redirectTo({
    url: '/pages/cticket/index/index',
  })
}

const getOrderDetail = () => {
  if (!id.value) return // 订单id无效时不处理
  isLoading.value = true
  cticketApi.getOrderDetail(id.value).then((res) => {
    if (res?.data?.extraInfo && res?.data?.extraInfo?.tickets) {
      Object.assign(order, res.data.extraInfo) // 使用Object.assign赋值给reactive对象
      isLoading.value = false // 不展示加载中
    }
  })
}

// 更新下单视图
const updateOrderDetail = () => {
  cticketApi.getOrderDetail(id.value).then((res) => {
    if (res?.data?.extraInfo && res?.data?.extraInfo?.tickets) {
      Object.assign(order, res.data.extraInfo) // 使用Object.assign赋值给reactive对象
      isLoading.value = false // 不展示加载中
    }
  })
}

const genPrePayParams = () => {
  const { price, wx_order_no } = order // 解构赋值，变量名不能改
  const style = 'font-size:13px; background:pink; color:#bf2c9f;'
  console.log('%c [确认支付]', style, price, wx_order_no)
  const params = {
    fee: order.price, // 总价
    order_no: order.wx_order_no,
  }
  console.log('%c [支付参数]', style, params)
  return params
}

const confirmPay = () => {
  const prePayParams = genPrePayParams()
  // 发起支付前的请求，注意这并不是支付，只是获取支付的时间戳和加密签名
  cticketApi.createNewWXyjyPay(prePayParams).then((res) => {
    const style = 'font-size:13px; background:pink; color:#bf2c9f;'
    console.log('%c [支付结果]', style, res)
    if (res?.data.resCode === 200 && res?.data.errInfo === 'Success') {
      console.log('确认支付')
      const extraInfo = res.data.extraInfo
      console.log('%c [获取的支付加密签名]', style, extraInfo)
      invokeWxPay(extraInfo) // 拿获取到的支付的加密签名去调微信的官方支付接口
    }
  })
  // TODO: 支付前二次确认
  // TODO: 待支付二维码
  // TODO: 支付成功跳转订单列表
  // TODO: 请求订单列表
  // TODO: 订单列表里展示游览的二维码
  // TODO: 首页添加订单入口
  // TODO: 新建订单列表路由
  // TODO: 订单超时跳转
  // TODO: 确认支付
  // TODO: 处理中动画
  // TODO: 支付成功后toast及跳转页面
  // TODO: 调微信官方的支付接口
  // TODO: 后期再对接银联建行等多种支付方式
  // TODO: 异常和取消支付等情况处理
  // TODO: 未登录时统一拦截并跳转要求登录
}

// 一机游的支付pay接口实际上并不是打钱，它只是获得时间戳和一些加密签名
// 在调了一机游的pay接口之后，需要拿获取到的时间戳和签名去调微信官方的支付接口
const invokeWxPay = (info) => {
  const params = {
    timeStamp: String(info.timeStamp - 0), // 时间戳，自1970年以来的秒数
    nonceStr: info.nonceStr, // 随机串
    package: info.package,
    signType: 'MD5', // 微信签名方式：
    paySign: info.paySign, // 微信签名
    success: (res) => {
      // 支付成功后的回调函数
      // TODO: toast成功及跳转订单列表
      const style = 'font-size:13px; background:pink; color:#bf2c9f;'
      console.log('%c [微信支付成功]', style, res)
      /**
       * 错误的写法：X res.data.errInfo === 'Success' ? '微信支付成功' : res.data.errInfo,
       * 注意一下，此为微信官方接口，和我们自己的接口不一样，不会有res.data.errInfo之类的字段。
       * 文档：[小程序调起支付API 回调结果](https://pay.weixin.qq.com/wiki/doc/apiv3_partner/apis/chapter4_5_4.shtml)
       * success requestPayment:ok 调用支付成功
       * fail requestPayment:fail cancel 用户取消支付
       * fail requestPayment:fail (detail message) 调用支付失败，其中 detail message 为后台返回的详细失败原因
       * 实际上res返回 {errMsg: "requestPayment:ok"}
       */
      uni.showToast({
        title: res.errMsg.includes('ok') ? '微信支付成功' : res.errMsg,
        mask: true,
        duration: 2000,
      })
      updateOrderDetail() // 更新视图
      // 支付后跳转我的订单
      uni.reLaunch({
        url: '/pages/cticket/myOrder/index',
      })
    },
    fail: (res) => {
      uni.showToast({
        title: res.errMsg,
        mask: true,
        duration: 2000,
      })
      console.log('failres', res)
    },
    complete: (res) => {
      // 支付成功后的回调函数
      uni.showToast({
        title: res.errMsg,
        mask: true,
        duration: 2000,
      })
      console.log('completeres', res)
    },
  }
  wx.requestPayment(params) // 调微信官方接口来实际打钱
}

// 清除定时器
onUnmounted(() => {
  clearInterval(timer)
})

onUnload(() => {
  clearInterval(timer)
})

onHide(() => {
  clearInterval(timer)
})

// 轮询支付状态 （暂时先不用）
const startPolling = () => {
  timer = setInterval(async () => {
    const res = await cticketApi.getOrderDetail(id.value)
    if (res?.data?.extraInfo && res?.data?.extraInfo?.tickets) {
      Object.assign(order, res.data.extraInfo) // 不断地轮询，并使用Object.assign赋值给reactive对象
    }
    if (order.status === 'PAYED') {
      // 切换到我的订单MyOrder页面去使用
      clearInterval(timer) // 已支付，清除定时器
      console.log('已支付')
      // 防止webview嵌套过多导致超出限制报错
      uni.redirectTo({
        url: '/pages/cticket/myOrder/index',
      })
    }
    if (order.status === 'WAIT_USE') {
      // 切换到我的订单MyOrder页面去使用
      clearInterval(timer) // 待使用，清除定时器
      console.log('待使用')
      uni.redirectTo({
        url: '/pages/cticket/myOrder/index',
      })
    } else {
      // order.status === 'WAIT_CONFIRM'
      // 继续等待
      elapsedSeconds += 1 // 增加经过的秒数
      // 如果经过了一分半还未支付，则跳转到首页
      console.log('elapsedSeconds:', elapsedSeconds, ` [${order.status}]`)
      const WAIT_SECONDS = 90 // 180
      console.log(`等${WAIT_SECONDS}秒,等不到PAYED就跳转首页`)
      console.log(order.status)
      if (elapsedSeconds >= WAIT_SECONDS) {
        // 暂时把三分钟改成三十秒看能不能跳转
        clearInterval(timer) // 清除定时器
        // 小程序不支持直接跳转到外部链接。navigateTo 只能用于跳转到小程序内的页面
        // 如果是0元票就跳转首页
        uni.navigateTo({
          url: '/pages/cticket/index/index',
        })
      }
      // clearInterval(timer) // 其他状态，清除定时器
      // 其他状态一直查,不清除定时器
    }
  }, 1000) // 每隔1秒请求一次
}

const fooBarHandler = () => {
  // console.log('测试')
  // getOrderDetail()
  const params = {
    fee: order.price, // 总价
    order_no: order.wx_order_no,
  }
  console.log('测试支付', params)
  cticketApi.createNewWXyjyPay(params).then((res) => {
    console.log('支付结果', res)
  })
}

const orderStatus = {
  WAIT_PROCESS: '待处理',
  WAIT_PAY: '未支付',
  WAIT_CONFIRM: '待确认',
  WAIT_USE: '待使用',
  PART_USE: '部分使用',
  WAIT_CONFIRM_WAIT_AUDIT: '退单审核',
  WAIT_USE_WAIT_AUDIT: '退单审核',
  AUDITED: '审核通过',
  CANCELED: '已取消',
  CLOSED: '已关闭',
  COMPLETE: '已完成',
}

const logServerTime = () => {
  cticketApi.getServerTime().then((res) => {
    const serverTime = res.data.extraInfo.current_time
    const style = 'font-size:13px; background:pink; color:#bf2c9f;'
    console.log('%c [服务器时间]', style, dayjs(serverTime).format('YYYY-MM-DD HH:mm:ss'))
    console.log('%c [与服务器时间差]', style, dayjs(serverTime).diff(new Date()))
    console.log('%c [当前时间]', style, dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'))
  })
}
</script>
