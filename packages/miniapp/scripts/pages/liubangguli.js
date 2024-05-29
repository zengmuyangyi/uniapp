const commonPages = require('../common')
const customizedPages = require('../customizedPages')
// 刘邦故里
const project = 'liubangguli'
const theme = 'contractedRed' // 主题文件夹

module.exports = {
  tabBar: {
    color: '#595959',
    selectedColor: '#AA272E',
    borderStyle: 'white',
    list: [
      {
        pagePath: `pages/${project}/index/index`,
        text: '首页',
        iconPath: `/static/tabs/${theme}/home.png`,
        selectedIconPath: `/static/tabs/${theme}/homeH.png`,
      },
      {
        pagePath: `pages/common/map/index`,
        text: '导览',
        iconPath: `/static/tabs/${theme}/tour.png`,
        selectedIconPath: `/static/tabs/${theme}/tourH.png`,
      },
      {
        pagePath: `pages/common/mine/index`,
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
        navigationStyle: 'custom',
        disableScroll: true,
      },
    },
    {
      path: `pages/${project}/ticket/index`,
      style: {
        navigationBarTitleText: '购票链接',
        disableScroll: true,
      },
    },
    {
      path: `pages/common/map/index`,
      style: {
        navigationBarTitleText: '导览',
        disableScroll: true,
      },
    },
    {
      path: `pages/common/scenicList/index`,
      style: {
        navigationBarTitleText: '景点列表',
        disableScroll: true,
      },
    },
    {
      path: `pages/common/scenic/index`,
      style: {
        navigationStyle: 'custom',
        disableScroll: true,
        navigationBarTextStyle: 'white',
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
      path: `pages/common/weather/index`,
      style: {
        navigationStyle: 'custom',
        disableScroll: true,
        navigationBarTextStyle: 'white',
        backgroundColor: '#F3EEE4',
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
      path: `pages/common/myCollect/index`,
      style: {
        navigationBarTitleText: '我的收藏',
        disableScroll: false,
      },
    },
    {
      path: `pages/common/feedback/index`,
      style: {
        navigationBarTitleText: '意见反馈',
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
      path: `pages/common/mine/index`,
      style: {
        navigationBarTitleText: '我的',
        disableScroll: true,
      },
    },
    {
      path: `pages/common/news/index`,
      style: {
        navigationBarTitleText: '新闻',
        disableScroll: true,
      },
    },
    {
      path: `pages/common/newsList/index`,
      style: {
        navigationBarTitleText: '新闻列表',
        disableScroll: true,
      },
    },
    {
      path: `pages/common/help/index`,
      style: {
        navigationBarTitleText: '有问必答',
        disableScroll: false,
      },
    },
    {
      path: `pages/common/helpStyle/index`,
      style: {
        navigationBarTitleText: '问题类型',
      },
    },
    {
      path: `pages/common/location/index`,
      style: {
        navigationBarTitleText: '正在跳转，请稍候',
        disableScroll: true,
      },
    },
    {
      path: `pages/common/webLink/index`,
      style: {
        navigationBarTitleText: '外链接',
        disableScroll: true,
      },
    },
    {
      path: `pages/common/culture/index`,
      style: {
        navigationBarTitleText: '景区文创',
        disableScroll: true,
      },
    },
    {
      path: `pages/common/culture/detail`,
      style: {
        navigationBarTitleText: '景区文创详情',
      },
    },
  ],
  subPackages: [
    {
      root: 'pagesCustom',
      pages: [...customizedPages],
    },
  ],
}
