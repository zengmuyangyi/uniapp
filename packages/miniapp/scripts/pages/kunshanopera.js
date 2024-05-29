const commonPages = require('../common')
const customizedPages = require('../customizedPages')
// 人生影视城（清涧）
const project = 'kunshanopera'
const theme = 'bwg' // 主题文件夹

module.exports = {
  tabBar: {
    color: '#4e4e4e',
    selectedColor: '#4e4e4e',
    borderStyle: 'white',
    list: [
      {
        pagePath: `pages/${project}/index/index`,
        text: '首页',
        iconPath: `/static/tabs/${theme}/home.png`,
        selectedIconPath: `/static/tabs/${theme}/home.png`,
      },
      {
        // pagePath: `pages/${project}/patrimonyList/index`,
        pagePath: `pages/${project}/exhibit/index`,
        text: '看展',
        iconPath: `/static/tabs/${theme}/collection.png`,
        selectedIconPath: `/static/tabs/${theme}/collection.png`,
      },
      {
        pagePath: `pages/${project}/scanPage/index`,
        text: '扫一扫',
        iconPath: `/static/tabs/${theme}/qr.png`,
        selectedIconPath: `/static/tabs/${theme}/qr.png`,
      },
      {
        pagePath: `pages/${project}/tour/index`,
        text: '导览',
        iconPath: `/static/tabs/${theme}/tour.png`,
        selectedIconPath: `/static/tabs/${theme}/tour.png`,
      },
      {
        pagePath: `pages/common/mine/index`,
        text: '我的',
        iconPath: `/static/tabs/${theme}/mine.png`,
        selectedIconPath: `/static/tabs/${theme}/mine.png`,
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
      path: `pages/${project}/scanPage/index`,
      style: {
        navigationStyle: 'custom',
        disableScroll: true,
      },
    },
    {
      path: `pages/${project}/exhibit/index`,
      style: {
        navigationBarTitleText: '全部展览',
        disableScroll: true,
      },
    },
    {
      path: `pages/${project}/education/index`,
      style: {
        navigationBarTitleText: '活动发布',
        disableScroll: true,
      },
    },
    {
      path: `pages/${project}/patrimonyList/index`,
      style: {
        navigationBarTitleText: '文物藏馆',
        disableScroll: true,
      },
    },
    {
      path: `pages/${project}/collection/index`,
      style: {
        navigationBarTitleText: '文物藏馆',
        disableScroll: false,
      },
    },
    {
      path: `pages/${project}/commonDetail/index`,
      style: {
        navigationBarTitleText: '详情',
        disableScroll: true,
      },
    },
    {
      path: `pages/${project}/patrimonyDetail/index`,
      style: {
        navigationBarTitleText: '文物详情',
        disableScroll: true,
      },
    },
    {
      path: `pages/${project}/bookPage/index`,
      style: {
        navigationBarTitleText: '线上预约',
        disableScroll: true,
      },
    },
    {
      path: `pages/${project}/video/index`,
      style: {
        navigationBarTitleText: '展厅讲解',
        disableScroll: true,
      },
    },
    {
      path: `pages/${project}/tour/index`,
      style: {
        navigationBarTitleText: '导览',
        disableScroll: true,
      },
    },
    {
      path: `pages/${project}/introduction/index`,
      style: {
        navigationBarTitleText: '博物馆介绍',
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
      path: `pages/common/webLink/index`,
      style: {
        navigationBarTitleText: '外链接',
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
      root: 'pagesCustom',
      pages: [...customizedPages],
    },
  ],
}
