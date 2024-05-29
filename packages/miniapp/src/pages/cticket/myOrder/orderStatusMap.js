const blue = '#1890ff'
const light_green = '#13c2c2'
const orange = '#fa8c16'
const pink = '#eb2f96'
// const green = '#52c41a'
// const red = '#f5222d'

export const orderStatusMap = {
  WAIT_PROCESS: {
    label: '待处理',
    color: pink,
    type: 'info',
  },
  WAIT_PAY: {
    label: '待支付',
    color: blue,
    type: 'primary',
    enable: true,
  },
  WAIT_CONFIRM: {
    label: '待确认',
    color: orange,
    type: 'info',
  },
  WAIT_USE: {
    label: '待使用',
    color: blue,
    type: 'success',
  },
  PART_USE: {
    label: '部分使用',
    color: light_green,
    type: 'info',
  },
  WAIT_CONFIRM_WAIT_AUDIT: {
    label: '待审核',
    color: orange,
    type: 'info',
  },
  WAIT_USE_WAIT_AUDIT: {
    label: '待审核',
    color: orange,
    type: 'warning',
  },
  PART_USE_WAIT_AUDIT: {
    label: '待审核',
    color: orange,
    type: 'warning',
  },
  COMPLETE_WAIT_AUDIT: {
    label: '待审核',
    color: orange,
    type: 'info',
  },
  AUDITED: {
    label: '已审核',
    color: blue,
    type: 'info',
  },
  CLOSED: {
    label: '已关闭',
    color: '',
    type: 'info',
  },
  COMPLETE: {
    label: '已完成',
    color: blue,
    type: 'info',
  },
  CANCELED: {
    label: '已取消',
    color: '',
    type: 'info',
  },
}
