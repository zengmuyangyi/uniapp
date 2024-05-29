// 宁波奉化大堰镇项目
const project = 'dayan'
const theme = 'default-molv' // 主题文件夹
// 通用页面
const commonPages = require('../common')
module.exports = {
  tabBar: {
    color: '#999696',
    selectedColor: '#4F765B',
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
        pagePath: `pages/dayan/scan/index`,
        text: '扫一扫',
        iconPath: `/static/tabs/${theme}/scan.png`,
        selectedIconPath: `/static/tabs/${theme}/scanH.png`,
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
        navigationBarTitleText: '首页',
      },
    },
    {
      path: `pages/dayan/scan/index`,
      style: {
        navigationBarTitleText: '扫一扫',
        disableScroll: true,
      },
    },
    {
      path: `pages/baoquan/notice/index`,
      style: {
        navigationBarTitleText: '公告详情',
        disableScroll: true,
      },
    },
    ...commonPages,
  ],
  subPackages: [
    {
      root: 'pagesShangyou',
      pages: [
        {
          path: `pages/newsList/index`,
          style: {
            navigationBarTitleText: '旅行月历',
          },
        },
        {
          path: `pages/foodList/index`,
          style: {
            navigationBarTitleText: '美食列表',
          },
        },
        {
          path: `pages/foodRecommand/index`,
          style: {
            navigationBarTitleText: '推荐菜品',
          },
        },
        {
          path: `pages/scenicList/index`,
          style: {
            navigationBarTitleText: '周边景点',
          },
        },
        {
          path: `pages/feedbackFirst/index`,
          style: {
            navigationBarTitleText: '投诉建议',
          },
        },
        {
          path: `pages/play/index`,
          style: {
            navigationBarTitleText: '游玩项目',
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
      ],
    },
  ],
}
