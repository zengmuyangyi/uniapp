<template>
  <div>
    <view class="bg-transparent">
      <blank v-if="!orderList.length"></blank>
      <view v-for="(order, index) in orderList" :key="index" class="order-info">
        <div class="flex-row" style="display: flex !important">
          <div
            class="inline-block w-auto p-2 m-5 rounded-20 mb-0"
            style="
              background-color: #c3d6ff;
              margin: 12px 20px -10px;
              margin-bottom: 0 !important;
              font-size: 12px;
            "
          >
            预订日期：{{ order.orderPlayDate }}
          </div>
          <div
            v-if="index === 0"
            class="inline-block w-auto p-2 m-5 rounded-20 mb-0 bg-green-200"
            style="margin: 12px 20px -10px; margin-bottom: 0 !important; font-size: 12px"
          >
            <div @click="refreshHandler">手动刷新</div>
          </div>
        </div>

        <uni-card style="margin-bottom: 0">
          <view class="order-info-content">
            <view class="page-title">
              <text class="long-text font-bold flex-grow flex-shrink" style="font-size: medium"
                >订单号：{{ order.wx_order_no }}
                <!-- {{ order.wx_order_no.slice(0, -5) + '...' }} -->
              </text>
            </view>
            <view class="page-title flex justify-between">
              <text class="ticketNum text-xl font-bold text-blue-500"
                >票 ×{{ order.orderTicketsNum }}</text
              >
              <text class="ticketPrice text-orange-400 font-bold text-3xl"
                >￥{{ order.price }}</text
              >
            </view>
            <view class="order-info-block flex justify-end">
              <span class="mr-250rpx relative" @click="viewDetail(order)">详情</span>
              <uni-tag
                :text="
                  orderStatusMap[order.status] ? orderStatusMap[order.status].label : order.status
                "
                :type="orderStatusMap[order.status].type"
              >
              </uni-tag>
            </view>

            <view class="order-ctrl pr-3px mt-10px text-right flex">
              <button plain size="mini" class="mr-2 font-bold" @click="handleDeleteOrder(order)">
                删除
              </button>
              <button plain size="mini" class="mr-2 font-bold" @click="handleCancelOrder(order)">
                取消
              </button>
              <button
                v-if="
                  canUse(order) &&
                  order.tickets &&
                  order.tickets[0] &&
                  order.tickets[0].qrcode &&
                  order.tickets[0].ticket_type.show_qrcode
                "
                plain
                size="mini"
                class="mr-2 text-black font-bold"
                @click="viewQRcode(order)"
              >
                二维码
              </button>
              <button v-if="false" plain size="mini" @click="viewDetail(order)">详情</button>
            </view>
          </view>
        </uni-card>
      </view>
    </view>

    <!-- 二维码Popup (需要在外层uni-popup加上@touchmove.prevent修饰符防止二维码随着页面滚动到弹出层之外)-->
    <div>
      <uni-popup ref="qrcodePopup" type="bottom" background-color="#fff" @touchmove.prevent>
        <div v-if="detailItem && detailItem.wx_order_no && false">
          二维码：{{ detailItem.tickets[qrcodeIndex].qrcode }}
        </div>
        <div>
          <p class="font-bold text-center mt=10rpx">检票信息</p>
          <!-- 需要考虑多个二维码的情况，需要detailItem.tickets.length有值 -->
          <div class="text-center mt-5rpx">
            <button
              v-if="
                detailItem &&
                detailItem.tickets &&
                detailItem.tickets.length &&
                detailItem.tickets.length > 1
              "
              size="mini"
              type="primary"
              @click="switchNextQRcode"
            >
              切换二维码 ({{ qrcodeIndex + 1 }} / {{ detailItem.tickets.length }})
            </button>
          </div>
          <uni-card class="">
            <div
              v-if="detailItem.tickets && detailItem.tickets[0]"
              class="text-center mt-20rpx font-bold"
            >
              <p>{{ detailItem.tickets[qrcodeIndex].ticket_type.name }}</p>
              <p>游玩日期：{{ detailItem.tickets[qrcodeIndex].play_date_begin }}</p>
            </div>
            <div flex justify-center items-cente>
              <canvas
                id="qrcode"
                ref="qr"
                canvas-id="qrcode"
                style="width: 180px; height: 180px"
              ></canvas>
            </div>
            <div
              v-if="detailItem.tickets && detailItem.tickets[0]"
              class="text-center mt-20rpx font-bold"
            >
              <div>票号：{{ detailItem.tickets[qrcodeIndex].qrcode }}</div>
              <div>取票码：{{ detailItem.tickets[qrcodeIndex].selfservice_code }}</div>
            </div>
          </uni-card>
        </div>
      </uni-popup>
    </div>

    <!-- 订单详情Popup -->
    <div>
      <uni-popup ref="detailPopup" type="bottom" background-color="#fff">
        <div
          v-if="detailItem && detailItem.wx_order_no"
          class="popupWrapper"
          style="overflow: scroll"
        >
          <div class="title text-center font-bold text-xl p-10px">订单详情</div>
          <div class="panel-content pr-20px pl-40px pb-20px">
            <ul class="mb-4 space-y-10">
              <li>
                <label>订单总额：{{ detailItem.price }} 元</label>
              </li>
              <li v-if="orderStatusMap[detailItem.status].label">
                <label>订单状态：{{ orderStatusMap[detailItem.status].label }}</label>
              </li>
              <li>
                <label>游玩日期：{{ detailItem.orderPlayDate }}</label>
              </li>
              <li>
                <label>
                  创建时间：{{ dayjs(detailItem.create_time).format('YYYY-MM-DD HH:mm:ss') }}
                </label>
              </li>
            </ul>
            <div>
              <section class="font-bold text-base bg-blue-200 flex rounded-30rpx mr-10rpx">
                <view>
                  <div class="ml-30px mb-0">
                    <div
                      v-for="ticket in detailItem.tickets"
                      :key="ticket.id"
                      class="mt-5rpx mb-10rpx"
                      style="border-bottom: 3px dashed #ddd"
                    >
                      <!-- 这里的“门票类型”实际上是门票的票名 -->
                      <p>
                        门票类型: <span class="font-normal"> {{ ticket.ticket_type.name }}</span>
                      </p>
                      <p>
                        门票单价: <span class="font-normal">{{ ticket.price }} 元</span>
                      </p>
                      <p>
                        游玩日期: <span class="font-normal">{{ ticket.play_date_begin }}</span>
                      </p>
                    </div>
                  </div>
                </view>
              </section>
            </div>
          </div>
        </div>
      </uni-popup>
    </div>
  </div>
</template>

<script setup>
import cticketApi from '@/api/cticket'
import { orderStatusMap } from './orderStatusMap.js'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import UQRCode from 'uqrcodejs'
dayjs.locale('zh-cn')

const orderList = ref([])

onLoad(() => {
  // TODO: 目前使用的默认参数，对页数有个默认的限制；后期需要去除
  fetchOrder()
})

const fetchOrder = () => {
  cticketApi.getOrderList({}).then((res) => {
    orderList.value = res.data.extraInfo.list
  })
}

const qrcodePopup = ref() // 二维码popup元素

const qrcodeIndex = ref(0) // 二维码index，需要考虑多张二维码的情况

const viewQRcode = (order) => {
  // qrcodeIndex首先要置0，这很重要
  qrcodeIndex.value = 0
  // 赋值当前item
  detailItem.value = JSON.parse(JSON.stringify(order))
  qrcodePopup.value.open()
  // 赋值
  if (
    detailItem.value.tickets &&
    detailItem.value.tickets[qrcodeIndex.value] &&
    detailItem.value.tickets[qrcodeIndex.value].qrcode
  ) {
    const style = 'font-size:13px; background:pink; color:#bf2c9f;'
    console.log('%c [订单order]', style, JSON.parse(JSON.stringify(order)))
    console.log('头个二维码', detailItem.value.tickets[qrcodeIndex.value].qrcode)
    console.log(
      '所有二维码',
      detailItem.value.tickets
        .filter((ticket) => Object.prototype.hasOwnProperty.call(ticket, 'qrcode'))
        .map((ticket) => ticket.qrcode)
    )
    // 经过尝试，所有二维码不一样，需要支持多个二维码（已支持，在switchNextQRcode函数中完成切换）
    // 若不加延时，编译为h5时二维码会是空白
    setTimeout(() => {
      data2QRcode(detailItem.value.tickets[qrcodeIndex.value].qrcode) // 设置二维码内容
    }, 300)
  }
}

const switchNextQRcode = () => {
  console.log('切换二维码')
  const qrcodeArr = detailItem.value.tickets
    .filter((ticket) => Object.prototype.hasOwnProperty.call(ticket, 'qrcode'))
    .map((ticket) => ticket.qrcode)
  // qrcodeArr此数组每个元素都是二维码的值，不必再加.qrcode去访问了
  // 因为票状态的原因，可能不是每张票都能出码，这里qrcodeArr是有效二维码的数组
  const style = 'font-size:13px; background:pink; color:#bf2c9f;'
  console.log(`%c 实际有${qrcodeArr.length}张二维码`, style)
  // // qrcodeArr为实际有多少二维码的数组
  qrcodeIndex.value = (qrcodeIndex.value + 1) % qrcodeArr.length // 二维码index循环加
  console.log(`%c 实际有${qrcodeArr.length}张二维码，现切换到第${qrcodeIndex.value + 1}张`, style)
  console.log(`第${qrcodeIndex.value + 1}张有效二维码为：${qrcodeArr[qrcodeIndex.value]}`)
  data2QRcode(qrcodeArr[qrcodeIndex.value]) // 设置二维码内容
}

onReady(() => {
  data2QRcode('https://uqrcode.cn/doc')
})

const data2QRcode = (data) => {
  // 获取uQRCode实例
  const qr = new UQRCode()
  // 设置二维码内容
  qr.data = data
  // 设置二维码大小，必须与canvas设置的宽高一致
  qr.size = 180
  // 调用制作二维码方法
  qr.make()
  // 获取canvas上下文
  const canvasContext = uni.createCanvasContext('qrcode', this) // 如果是组件，this必须传入
  // 设置uQRCode实例的canvas上下文
  qr.canvasContext = canvasContext
  // 调用绘制方法将二维码图案绘制到canvas上
  qr.drawCanvas()
}

const isDev = import.meta.env.MODE === 'development'

const canUse = (order) => {
  const status = {
    WAIT_PROCESS: 1,
    WAIT_PAY: 1,
    WAIT_CONFIRM: 1,
    CANCELED: 1,
  }
  return !status[order.status]
}

const detailPopup = ref() // 详情popup元素
const detailItem = ref({})

const viewDetail = (order) => {
  detailItem.value = JSON.parse(JSON.stringify(order))
  detailPopup.value.open()
}

const handleCancelOrder = (order) => {
  uni.showModal({
    title: '提示',
    content: '确定取消订单？',
    success: function (res) {
      if (res.confirm) {
        console.log('用户确认取消订单')
        cancelOrder(order) // 实际执行取消订单操作
      } else if (res.cancel) {
        console.log('用户取消操作')
      }
    },
  })
}
const cancelOrder = (order) => {
  detailItem.value = JSON.parse(JSON.stringify(order))
  // 发起取消订单
  cticketApi.cancelTicketOrder(order.id).then((res) => {
    console.log('取消订单：', order.id)
    // 刷新列表
    const style = 'font-size:13px; background:pink; color:#bf2c9f;'
    console.log('%c [取消订单]', style, res)
    // 取消订单需要给出提示信息，不然客户出现“点不动”情况
    uni.showToast({
      title: res.data.errInfo === 'Success' ? '取消订单成功' : res.data.errInfo + ': 取消失败',
      mask: true,
      icon: res.data.errInfo === 'Success' ? 'success' : 'none', // 其他失败情况不要显示成功icon
      duration: 2000,
    })
    cticketApi.getOrderList({}).then((res) => {
      orderList.value = res.data.extraInfo.list
    })
  })
}

const refreshHandler = () => {
  fetchOrder()
  uni.showToast({
    title: '已刷新',
    icon: 'none',
    mask: true,
    duration: 2000,
  })
}
// deleteTicketOrder
const handleDeleteOrder = (order) => {
  uni.showModal({
    title: '提示',
    content: '确定删除订单？',
    success: function (res) {
      if (res.confirm) {
        console.log('用户确认删除订单')
        deleteOrder(order) // 实际执行删除订单操作
      } else if (res.cancel) {
        console.log('用户取消操作')
      }
    },
  })
}

const deleteOrder = (order) => {
  detailItem.value = JSON.parse(JSON.stringify(order))
  // 发起取消订单
  cticketApi.deleteTicketOrder(order.id).then((res) => {
    console.log('删除订单：', order.id)
    // 刷新列表
    const style = 'font-size:13px; background:pink; color:#bf2c9f;'
    console.log('%c [删除订单]', style, res)
    // 取消订单需要给出提示信息，不然客户出现“点不动”情况
    uni.showToast({
      title: res.data.errInfo === 'Success' ? '删除订单成功' : res.data.errInfo + ': 删除失败',
      mask: true,
      icon: res.data.errInfo === 'Success' ? 'success' : 'none', // 其他失败情况不要显示成功icon
      duration: 2000,
    })
    cticketApi.getOrderList({}).then((res) => {
      orderList.value = res.data.extraInfo.list
    })
  })
}
// TODO: [x] 请求订单
// TODO: [x] 订单列表
// TODO: [ ] 订单项展示二维码Popup
// TODO: [ ] 订单删除
// TODO: [x] 订单详情Popup
// TODO: [ ] 订单详情Popup添加更多字段
// TODO: [x] 订单样式
// TODO: [ ] 订单Tab筛选
// TODO: [ ] FooterTab切换我的和首页
// TODO: [x] 日期拉近订单些
// TODO: [ ] 点更多日期弹出日历组件
// TODO: [x] 二维码样式优化
// TODO: [ ] 二维码支持多张票切换
// TODO: [ ] 取消订单
// TODO: [ ] 每个游客信息填写（不是购买人）
</script>

<style lang="scss" scoped>
.popupWrapper {
  // height: 80vh;
  .panel-content {
    // padding: 0 20px 20px;
    // box-sizing: border-box;
  }
}
.order-ctrl {
  width: 100%;
  padding-right: 3px;
  margin-top: 10px;
  text-align: right;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  button {
    width: 70px;
    margin-left: 6px;
    font-size: 12px;
    color: #555;
    background-color: #f2f2f2;
    border-radius: 20px;
    white-space: nowrap;
    margin-right: 0px;
    border: 1px solid #f2f2f2;
  }
  .pay-round-btn {
    box-sizing: border-box;
    background-color: #facb83;
    border: 1px solid #e0aa63;
  }
}

.page-title {
  display: flex;
  height: 40px;
  font-size: 16px;
  align-items: center;
  .long-text {
    font-size: 16px;
    width: calc(100% - 180px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex-grow: 1;
    flex-shrink: 1;
  }
}

label {
  display: inline-block;
  width: 92px;
  font-weight: bold;
  color: #666;
  white-space: nowrap;
  margin-bottom: 5rpx;
}
</style>
