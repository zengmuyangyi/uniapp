<template>
  <div v-if="curentTicket" class="min-h-100vh bg-#f2f6fe text-#3e3e3e box-border p-20rpx">
    <div class="bg-white p-20rpx rounded-10rpx">
      <div class="mb-20rpx flex items-center justify-between" @click="popup.open(curentTicket)">
        <span class="font-bold"> {{ curentTicket.name }}</span>
        <span class="ic-round-keyboard-arrow-right"></span>
      </div>

      <div class="flex flex-wrap">
        <div
          v-for="(tag, index) in curentTicket?.tags || []"
          :key="index"
          class="border-1rpx border-green-500 text-20rpx color-green-500 px-16rpx py-5rpx rounded-30rpx mr-10rpx mb-10rpx"
        >
          {{ tag.name }}
        </div>
      </div>

      <!-- <div class="text-26rpx">选择日期</div> -->

      <div v-if="false">
        {{ dateOptions }}
      </div>

      <div v-if="false">
        {{ params }}
      </div>
    </div>

    <div v-if="false" class="bg-white p-20rpx rounded-10rpx">
      {{ curentTicket }}
    </div>

    <!-- 日期UI开始 -->
    <div date-picker bg-white p-20rpx rounded-10rpx>
      <div class="font-bold text-lg mb-15rpx">选择日期</div>
      <!-- 日期选择 -->
      <div
        v-if="dateOptions"
        class="dates border-1 border-gray-300 rounded-md mt-4rpx flex flex-grow"
      >
        <div class="date-option-wrapper overflow-x-auto flex-grow">
          <div class="date-option-container flex">
            <div
              v-for="(day, index) in [...dateOptions]"
              :key="index"
              class="date-option cursor-pointer text-center border-green-300 border-gray-300 rounded-md flex-shrink-0 mr-4 py-2 px-3 text-sm"
              :class="{
                'bg-blue-500 text-white opacity-100': isActive(index),
                'bg-blue-50 text-gray-700 opacity-95': !isActive(index),
                'border-gray-400': !isActive(index),
              }"
              @click="selectDate(index)"
            >
              <div class="text-base font-bold mb-1">
                {{ day.date }}
              </div>
              <div class="text-sm mb-1">
                <span class="font-bold">
                  {{ day.isToday ? '今' : '' }}
                  {{ day.isTomorrow ? '明' : '' }}
                </span>
                {{ day.week.replace('星期', '周') }}
              </div>
              <div v-if="day.isValid" class="price text-orange-500 text-sm font-bold">
                {{ `￥${day.price}元` }}
              </div>
              <div v-else class="font-bold">不可订</div>
            </div>
          </div>
        </div>
        <!-- 更多日期 -->
        <div v-if="false" class="more-date flex-shrink-0 flex items-center justify-end bg-white">
          <div class="bg-white flex text-blue-600 ml-22rpx mr-10rpx" @click="moreDateHandler">
            <div class="flex-1 flex flex-col justify-center items-end space-x-11">
              <div class="text-rightc">更多&nbsp;</div>
              <div class="text-right">日期&nbsp;</div>
            </div>
            <div class="flex items-center justify-center ml-4rpx">&gt;</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 日期UI结束 -->

    <div class="bg-white p-20rpx rounded-10rpx">
      <div v-if="form?.play_date_begin" class="text-base">
        <span>选中日期：</span>
        <span class="font-bold">{{ form.play_date_begin }} &nbsp;</span>
        <span>当日票价：</span>
        <span class="font-bold">￥{{ thatDayPriceDisplayOnly }}&nbsp;元</span>
      </div>
      <div v-else class="text-indigo-800 font-bold">请先选择日期</div>
    </div>

    <div v-if="false" class="bg-white p-20rpx rounded-10rpx">
      <view>
        <div>选择日期</div>
        <div>
          <uni-datetime-picker
            v-model="form.play_date_begin"
            type="date"
            :clear-icon="false"
            :start="params.start"
            :end="params.end"
          />
        </div>
      </view>
    </div>

    <!-- 横向灰色虚线 -->
    <div class="bg-white pt-20rpx">
      <div class="mx-auto w-11/12 h-px bg-gray-200"></div>
    </div>

    <div class="flex justify-end bg-white p-20rpx rounded-10rpx">
      <div class="mr-30rpx font-bold text-lg">购买数量</div>
      <!-- 若未选择日期，则展示静态的 -->
      <div v-if="!form?.play_date_begin" class="mr-20rpx" @click="toastSelectDateFirst">
        <uni-number-box :min="1" :max="1" class="bg-gray-800" :disabled="true"></uni-number-box>
      </div>
      <!-- 为1且选中日期时，还是1，@change事件不会被触发，若不手动触发会导致price为null -->
      <div v-else class="mr-20rpx">
        <uni-number-box
          v-model="form.count"
          :min="1"
          background="#2979FF"
          color="#fff"
          @change="changeTicketsCount"
        ></uni-number-box>
      </div>
    </div>

    <div class="bg-white p-20rpx rounded-10rpx mt-25rpx">
      <div class="font-bold text-lg mb-25rpx">购买人信息</div>
      <uni-forms>
        <uni-forms-item v-if="curentTicket && curentTicket.need_realname" label="姓名" required>
          <uni-easyinput v-model="form.buyer_name" type="text" placeholder="请输入购买人姓名" />
        </uni-forms-item>
        <uni-forms-item v-if="curentTicket && curentTicket.need_realname" label="身份证" required>
          <uni-easyinput
            v-model="form.buyer_identify"
            type="text"
            placeholder="请输入购买人身份证"
          />
        </uni-forms-item>
        <uni-forms-item label="手机号" required>
          <uni-easyinput
            v-model="form.buyer_phone"
            type="text"
            placeholder="请输入购买人电话号码"
          />
        </uni-forms-item>
      </uni-forms>
      <button v-if="false" @click="fooBarHandler">测试</button>
    </div>

    <!-- 游客们的信息 -->
    <div v-if="form.tickets" class="bg-white p-20rpx rounded-10rpx mt-25rpx">
      <div class="font-bold text-lg mb-25rpx">游客信息</div>
      <div v-for="(item, index) in form.tickets" :key="index">
        <uni-forms>
          <uni-forms-item label="姓名" required>
            <uni-easyinput
              v-model="item.guest_name"
              type="text"
              :placeholder="`请输入游客${index + 1}的姓名`"
            />
          </uni-forms-item>
          <uni-forms-item label="身份证" required>
            <uni-easyinput
              v-model="item.guest_identify"
              type="text"
              :placeholder="`请输入游客${index + 1}的身份证`"
            />
          </uni-forms-item>
        </uni-forms>
      </div>
    </div>

    <ticket-detail ref="popup"></ticket-detail>

    <!-- 白条占位符 -->
    <div class="p-65rpx">
      <!-- 与底部白条等高（略高）的占位元素 (底部去支付白横幅为固定的，为防止可滚动部分被遮挡，故设置与白条登高的占位元素，实际不会被看到) -->
    </div>
    <!-- 去支付按钮 -->
    <div
      class="fixed bottom-0 left-0 w-full bg-white p-20rpx flex justify-between items-center"
      style="z-index: 9999; box-shadow: -7px -7px 10px rgba(200, 200, 200, 0.5)"
    >
      <!-- 通过设置适当的z-index值，横条div将遮挡住其他元素，并且这些元素在横条div上方的区域将无法进行用户输入操作。 -->
      <div class="text-orange-500 text-xl font-bold mr-24rpx">
        <!-- ￥72 -->
        ￥{{ form.price ? form.price : HavClicked ? form.price : '--' }}
      </div>
      <div class="ml-auto">
        <button
          class="bg-gradient-to-r from-yellow-400 to-red-500 rounded-10rpx text-white px-22rpx py-2rpx mr-24rpx"
          @click="gotoPay"
        >
          <!-- 实际是去下单，展示上就写“去支付”了 -->
          去支付
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import 'dayjs/locale/zh-cn'
import cticketApi from '@/api/cticket'
// import data from './data'

const popup = ref()
dayjs.extend(isBetween)
dayjs.locale('zh-cn')

// const curentTicket = ref(data.ticketList.list[0])
const curentTicket = ref(null)
const curentTicketId = ref(null)
const form = ref({})
const fooBarHandler = () => {
  // const style = 'font-size:13px; background:pink; color:#bf2c9f;'
  // console.log('%c [form表单信息]', style, Object.assign({}, form.value))
  // console.log(JSON.stringify(params.value))
  // console.log(JSON.stringify(dateOptions.value))
  uni.navigateTo({
    url: `/pages/cticket/weixinPay/index?id=123`,
  })
  // const { id: tid, ...restParams } = params.value
  // cticketApi.getTicketInfo(tid, restParams).then((res) => {
  //   if (res?.data) {
  //     const style = 'font-size:13px; background:pink; color:#bf2c9f;'
  //     console.log('%c [获取该票种日期价格]', style, res.data.extraInfo.prices)
  //   }
  // })
  // wantMoreDatePrices()
}

// 通过请求详情，更新当前票种的日期价格（默认较少）
const wantMoreDatePrices = () => {
  if (params?.value) {
    const { id: tid, ...restParams } = params.value
    cticketApi.getTicketInfo(tid, restParams).then((res) => {
      if (res?.data) {
        const style = 'font-size:13px; background:pink; color:#bf2c9f;'
        console.log('%c [获取该票种日期价格]', style, res.data.extraInfo.prices)
        curentTicket.value.prices = res.data.extraInfo.prices
        // dateOptions会根据curentTicket.value.prices去更新日期列表
      }
    })
  }
}

const moreDateHandler = () => {
  wantMoreDatePrices()
}

const savedTicketInfo = ref(null)

// onLoad从options里取参数
onLoad((options) => {
  logData(options)
  init(options)
  changeTicketsCount(1) // 首先确保游客数组有效
})

const init = async (options) => {
  if (options?.id) {
    curentTicketId.value = options?.id
    // TODO: 选择了日期后，需要把start和end加入参数，获取相应的票价
    cticketApi.getTicketInfo(curentTicketId.value).then((res) => {
      curentTicket.value = res?.data?.extraInfo // 设置curentTicket
      const style = 'font-size:13px; background:pink; color:#bf2c9f;'
      console.log('%c [下单票信息]', style, Object.assign({}, curentTicket.value))
      wantMoreDatePrices() // 获取更多日期价格 (在页面加载时就获取更多日期价格)
    })
  }
  safeForm()
}

const safeForm = () => {
  // 初始化form的tickets，避免未定义
  if (!form.value.tickets) {
    form.value.tickets = []
  }
  if (!form.value.count) {
    form.value.count = 1
  }
}

const logData = (options) => {
  // 在onLoad的小程序生命周期里，获取query参数；参考 [uni.navigateTo小程序路由跳转取参](https://zh.uniapp.dcloud.io/api/router.html#navigateto)
  const style = 'font-size:13px; background:pink; color:#bf2c9f;'
  console.log('%c [票种id传参]', style, options?.id)
  console.log('%c [dateOptions]', style, Object.assign({}, dateOptions.value)) // 输出普通对象
  console.log('%c [curentTicket]', style, Object.assign({}, curentTicket.value)) // 输出普通对象
}

const params = computed(() => {
  if (!curentTicket.value) return {} // 处理curentTicket为空情况
  const { start, end } = calcStartEnd(curentTicket.value)
  return {
    id: curentTicket.value.id,
    start,
    end,
  }
})

const datePricesMap = ref({})

const state = reactive({
  selectedDateIndex: null,
})

const isActive = (index) => {
  return state.selectedDateIndex === index
}

let HavClicked = false // 是否已经点击过至少一次

const selectDate = (index) => {
  if (state.selectedDateIndex !== null) {
    dateOptions.value[state.selectedDateIndex].isActive = false
  }
  dateOptions.value[index].isActive = true
  state.selectedDateIndex = index
  console.log(
    '%c [选中日期的date,price,isValid]',
    'font-size:13px; background:pink; color:#bf2c9f;',
    getSelectedDateInfo(state.selectedDateIndex)
  )
  const chosenDateObj = getSelectedDateInfo(state.selectedDateIndex)
  handleChoseDateObj(chosenDateObj)
  updateTicketsPlayDateandPrice() // 更新订单价（去支付那边显示的总价）
  HavClicked = true
}

const thatDayPriceDisplayOnly = ref(null)

const handleChoseDateObj = (chosenDateObj) => {
  // e.g. {date: "2023-07-01", price: 0.01, isValid: true}
  const { date, price, isValid } = chosenDateObj
  if (!isValid) {
    uni.showToast({
      title: '该日期无效',
      icon: 'error',
      duration: 2000,
    })
  } else {
    // TODO: 更新订单中的tickets数组
    form.value.play_date_begin = date
    thatDayPriceDisplayOnly.value = price
  }
  // 确定有效之后才会更新
}

// 在 uni-number-box 输入数量，页面显示值修改了，但实际上打印时还是原来的值
// [uni-app uni-number-box使用踩坑记录（Vue3）](https://blog.csdn.net/qq_39998026/article/details/127125048)
const changeTicketsCount = (val) => {
  form.value.count = val // 此步有必要，在uni-number-box的@change里获取的值并不是展示的值
  form.value.tickets = form.value.tickets ? form.value.tickets : [] //确保tickets数组有效
  while (form.value.tickets.length < val) {
    form.value.tickets.push({
      ticket_type_id: curentTicketId.value, // 设置票种号为当前票种号
      buyer_papers_type: 'ID_CARD', // 设置购买人证件为身份证
      guest_name: '',
      guest_phone: '', // 游客手机不必填，暂不使用
      guest_identify: '',
      guest_papers_type: 'ID_CARD', // 游客证件类型固定为身份证
    })
  }
  form.value.tickets.splice(val)
  updateTicketsPlayDateandPrice() // 每次加入订单时，更新订单价（去支付那边显示的总价）
}

const updateTicketsPlayDateandPrice = () => {
  const updatedTickets = form.value.tickets.map((ticket) => {
    return {
      ...ticket,
      play_date_begin: form.value.play_date_begin,
      price: thatDayPriceDisplayOnly.value,
    }
  })
  form.value.tickets = updatedTickets
  form.value.count = form.value.count ? form.value.count : 1 // 确保票的张数为有效值，不然price为null
  form.value.price = form.value.count * thatDayPriceDisplayOnly.value // 把订单总价也一并更新
  form.value.price = form.value.price ? form.value.price.toFixed(2) : form.value.price // 保留两位小数
}

/**
 * 示例用法：
 * const phoneNumber1 = '13812345678'
 * const phoneNumber2 = '12345678901'
 * console.log(validatePhoneNumber(phoneNumber1)) // true
 * console.log(validatePhoneNumber(phoneNumber2)) // false
 */
const validatePhoneNumber = (phoneNumber) => {
  const regExp = /^1[3456789]\d{9}$/
  return regExp.test(phoneNumber)
}

const checkFieldsGuard = () => {
  // 校验表单参数，返回false则不允许下单
  if (!form?.value.buyer_phone) {
    // 购买人手机号是必填项，设置购买人手机号等表单项必填
    uni.showToast({
      title: '请先填写手机号',
      icon: 'error',
      duration: 2000,
    })
    return false // 不允许下单
  }

  if (!validatePhoneNumber(form?.value.buyer_phone)) {
    // 购买人手机号是必填项
    uni.showToast({
      title: '手机号格式不对',
      icon: 'error',
      duration: 2000,
    })
    return false // 不允许下单
  }

  // const isDev = import.meta.env.MODE === 'development'
  // if (isDev) return true // 暂时开发环境不必填

  const need_realname = curentTicket.value.need_realname
  const style = 'font-size:13px; background:pink; color:#bf2c9f;'
  console.log('%c [是否需要实名]', style, curentTicket.value.need_realname)

  if (need_realname) {
    // 根据自营的购买人是否实名来配置是否要必填手机号和身份证号
    if (!form?.value.buyer_name) {
      // 购买人姓名
      uni.showToast({
        title: '姓名未填写',
        icon: 'error',
        duration: 2000,
      })
      return false // 不允许下单
    }

    if (!form?.value.buyer_identify) {
      // 购买人身份证号
      uni.showToast({
        title: '身份证未填写',
        icon: 'error',
        duration: 2000,
      })
      return false // 不允许下单
    }

    // 需要实名时，需要加填身份证类型，不然返回会提示需要实名
    form.value.buyer_papers_type = 'ID_CARD'
  }

  return true // 可以允许下单
}

const confirmSubmission = (newOrderCallBack) => {
  uni.showModal({
    title: '提示',
    content: '确认下单？',
    success: function (res) {
      if (res.confirm) {
        console.log('用户点击确定')
        newOrderCallBack() // 实际去发下单请求
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    },
  })
}

const gotoPay = () => {
  if (!form?.value.play_date_begin) {
    // 未选择日期则不予处理
    toastSelectDateFirst()
    return
  }
  if (!checkFieldsGuard()) {
    // 校验表单，不通过就不下单了
    return
  }
  if (!form?.value.count || form?.value.count === 1) {
    // 由于最低为1,@change不会触发，需要手动触发，不然price为null
    changeTicketsCount(1)
  }
  updateTicketsPlayDateandPrice()

  // 目前下单的所有日期都为同一个，这也和之前的大陈岛购票小程序是一致的
  const style = 'font-size:13px; background:pink; color:#bf2c9f;'
  console.log('%c [去支付表单]', style, JSON.parse(JSON.stringify(form.value)))

  // 发支付请求（真正下单的函数）
  const newOrderCallBack = () => {
    cticketApi.createOrder(form.value).then((res) => {
      if (res?.data?.resCode === 200) {
        // 成功下单
        uni.showToast({
          title: res.data.errInfo === 'Success' ? '下单成功' : res.data.errInfo,
          mask: true,
          duration: 2000,
        })
        const style = 'font-size:13px; background:pink; color:#bf2c9f;'
        console.log('%c [下单返回信息]', style, res.data.extraInfo)
        // TODO: 跳转支付页面
        redirectwxPay(res.data.extraInfo)
      } else {
        // 下单失败，给出提示信息，也可以跳转出错页面
        uni.showToast({
          title: res.data.errInfo,
          icon: 'none', // icon需要为none，否则有7个字的限制
          mask: true,
          duration: 2000,
        })
        // 购买人手机号是必填项
      }
    })
  }

  confirmSubmission(newOrderCallBack) // 发下单请求前还需要二次确认
}

const redirectwxPay = (extraInfo) => {
  const orderId = extraInfo.id
  // TODO: 若订单号无效，跳转出错界面
  uni.navigateTo({
    url: `/pages/cticket/weixinPay/index?id=${orderId}`,
  })

  const style = 'font-size:13px; background:pink; color:#bf2c9f;'
  console.log('%c [订单id为]', orderId)
  console.log('%c [已知下单信息]', style, extraInfo)
}

const toastSelectDateFirst = () => {
  uni.showToast({
    title: '请先选择日期',
    icon: 'error',
    duration: 2000,
  })
}

function getSelectedDateInfo(
  selectedDateIndex,
  curentTicketValue = curentTicket.value,
  dateOptionsValue = dateOptions.value
) {
  /**
   *  const selectedDatePrice = JSON.parse(
   *    JSON.stringify(curentTicket.value.prices[state.selectedDateIndex])
   *  )
   *  const style = 'font-size:13px; background:pink; color:#bf2c9f;'
   *  console.log('%c [选中] ', style, dateOptions.value[state.selectedDateIndex])
   *  console.log('%c [日期价格为] ', style, curentTicket.value.prices[state.selectedDateIndex])
   *  console.log('%c [选中有效?(isValid)]', style, dateOptions.value[state.selectedDateIndex].isValid) //  true
   *  console.log('%c [日期价格分别为] ', style, selectedDatePrice.date, selectedDatePrice.price) // 2023-07-02 0.01
   */
  const selectedDate = curentTicketValue.prices[selectedDateIndex]
  const { isValid } = dateOptionsValue[state.selectedDateIndex]
  const { date, price } = selectedDate
  // e.g. {date: "2023-07-01", price: 0.01, isValid: true}
  return { date, price, isValid }
}

const dateOptions = computed(() => {
  const prices = curentTicket.value?.prices || []

  const { start, end } = params.value
  return prices.map((i) => {
    console.log(
      '%c [ start, end ]-59',
      'font-size:13px; background:pink; color:#bf2c9f;',
      start,
      end,
      i.date
    )
    return {
      isToday: dayjs(i.date).isSame(dayjs(), 'day'),
      isTomorrow: dayjs(i.date).isSame(dayjs().add(1, 'days'), 'day'),
      isValid: dayjs(i.date).isBetween(start, end, 'day', '[]'),
      date: dayjs(i.date).format('MM-DD'),
      price: i.price,
      week: dayjs(i.date).format('dddd'),
    }
  })
})

function calcStartEnd(ticketType) {
  // 下面这一段用于判断开始时间
  let start = ''
  const today = dayjs().format('YYYY-MM-DD')
  if (dayjs().isBefore(ticketType.use_startdate)) {
    // 今天早于use_startdate，start设为use_startdate
    start = ticketType.use_startdate
  } else if (
    ticketType.is_book_today &&
    dayjs().isBefore(today + ' ' + ticketType.book_today_endtime)
  ) {
    // 今天可买，start设为今天
    start = today
  } else {
    // 今天已过book_today_endtime，所start设为明天
    start = dayjs().add(1, 'days').format('YYYY-MM-DD')
  }
  // 下面这一段用于判断结束时间
  let end = ''
  // futureDays是今天加上book_future_days
  const futureDays = dayjs().add(ticketType.book_future_days, 'days')
  // 判断futureDays和use_enddate哪个早，取早的为end
  if (futureDays.isBefore(ticketType.use_enddate)) {
    end = futureDays.format('YYYY-MM-DD')
  } else {
    end = ticketType.use_enddate
  }
  return { start, end }
}
</script>

<style lang=""></style>
