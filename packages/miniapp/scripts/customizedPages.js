const customizedPages = [
  {
    path: `pages/feedbackFirst/index`,
    style: {
      navigationBarTitleText: '投诉管理平台',
    },
  },
  {
    path: `pages/feedbackProgress/index`,
    style: {
      navigationBarTitleText: '进度查询',
    },
  },
  {
    path: `pages/feedback/index`,
    style: {
      navigationBarTitleText: '意见反馈',
    },
  },
  {
    path: `pages/serviceAi/index`,
    style: {
      navigationBarTitleText: '智能客服',
      usingComponents: {
        chat: 'plugin://chatbot/chat',
      },
    },
  },
]

module.exports = customizedPages
