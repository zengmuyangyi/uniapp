// 芳兰湖项目
const project = 'fanglanhu'
const theme = 'fanglanhu' // 主题文件夹

module.exports = {
  tabBar: {
    color: '#909090',
    selectedColor: '#4C92FF',
    borderStyle: 'white',
    list: [
      {
        pagePath: `pages/${project}/index/index`,
        text: '首页',
        iconPath: `/static/tabs/${theme}/home.png`,
        selectedIconPath: `/static/tabs/${theme}/homeH.png`,
      },
      {
        pagePath: `pages/${project}/discover/index`,
        text: '发现',
        iconPath: `/static/tabs/${theme}/tour.png`,
        selectedIconPath: `/static/tabs/${theme}/tourH.png`,
      },
      {
        pagePath: `pages/${project}/mine/index`,
        text: '我的',
        iconPath: `/static/tabs/${theme}/mine.png`,
        selectedIconPath: `/static/tabs/${theme}/mineH.png`,
      },
    ],
  },
  pages: [
    {
      path: `pages/${project}/index/index`,
      style: {
        disableScroll: true,
        navigationStyle: 'custom',
      },
    },
    {
      path: `pages/${project}/discover/index`,
      style: {
        disableScroll: true,
        navigationStyle: 'custom',
      },
    },
    {
      path: `pages/${project}/mine/index`,
      style: {
        disableScroll: true,
        navigationStyle: 'custom',
      },
    },
    {
      path: `pages/${project}/strategy/list`,
      style: {
        disableScroll: true,
        navigationStyle: 'custom',
      },
    },
    {
      path: `pages/${project}/strategy/detail`,
      style: {
        disableScroll: true,
        navigationBarTitleText: '游记详情',
      },
    },
    {
      path: `pages/${project}/release/index`,
      style: {
        disableScroll: true,
        navigationBarTitleText: '发布图文',
      },
    },
    {
      path: `pages/${project}/scenicList/index`,
      style: {
        disableScroll: true,
        navigationStyle: 'custom',
      },
    },
    {
      path: `pages/${project}/newsList/index`,
      style: {
        disableScroll: true,
        navigationStyle: 'custom',
      },
    },
    {
      path: `pages/${project}/more/index`,
      style: {
        disableScroll: true,
        navigationBarTitleText: '全部类目',
      },
    },
    {
      path: `pages/${project}/myStrategy/index`,
      style: {
        disableScroll: true,
        navigationStyle: 'custom',
      },
    },
    {
      path: `pages/common/map/index`,
      style: {
        navigationBarTitleText: '智慧导览',
        disableScroll: true,
      },
    },
    {
      path: `pages/common/webLink/index`,
      style: {
        navigationBarTitleText: '加载中...',
        disableScroll: true,
      },
    },
    {
      path: `pages/common/news/index`,
      style: {
        navigationBarTitleText: '资讯详情',
        disableScroll: true,
      },
    },
    {
      path: `pages/common/suggestedLine/index`,
      style: {
        navigationStyle: 'custom',
        disableScroll: true,
      },
    },
    {
      path: `pages/common/video/videoList`,
      style: {
        navigationBarTitleText: '视频',
        disableScroll: true,
      },
    },
    {
      path: `pages/common/video/videoDetail`,
      style: {
        navigationBarTitleText: '视频详情',
        disableScroll: true,
      },
    },
    {
      path: `pages/common/photos/index`,
      style: {
        navigationBarTitleText: '相册列表',
        disableScroll: true,
      },
    },
    {
      path: `pages/common/login/index`,
      style: {
        navigationBarTitleText: '登录',
        disableScroll: true,
      },
    },
    {
      path: `pages/common/userInfo/index`,
      style: {
        navigationBarTitleText: '个人信息',
        disableScroll: true,
      },
    },
    {
      path: `pages/common/rescue/index`,
      style: {
        navigationBarTitleText: '救援中心',
        disableScroll: false,
      },
    },
    {
      path: `pages/common/scenic/index`,
      style: {
        navigationBarTitleText: '景点详情',
        // disableScroll: true,
        // navigationBarTextStyle: 'white',
      },
    },
    {
      path: `pages/common/scenicList/index`,
      style: {
        navigationStyle: 'custom',
        disableScroll: true,
      },
    },
    {
      path: `pages/common/location/index`,
      style: {
        navigationBarTitleText: '正在跳转，请稍候',
        disableScroll: true,
      },
    },
  ],
  subPackages: [
    {
      root: 'pagesShangyou',
      pages: [
        {
          path: `pages/feedbackFirst/index`,
          style: {
            navigationBarTitleText: '投诉建议',
          },
        },
      ],
    },
    {
      root: 'pagesCustom',
      pages: [
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
      ],
      plugins: {
        chatbot: {
          version: '1.4.0',
          provider: 'wx8c631f7e9f2465e1',
        },
      },
    },
  ],
}
