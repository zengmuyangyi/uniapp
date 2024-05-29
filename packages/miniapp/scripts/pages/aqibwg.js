const commonPages = require('../common')
// 人生影视城（清涧）
const project = 'aqibwg'
const theme = 'aqi' // 主题文件夹

module.exports = {
  tabBar: {
    custom: true,
    color: '#999696',
    selectedColor: '#41b28d',
    borderStyle: 'white',
    list: [
      {
        pagePath: `pages/${project}/index/index`,
        text: '首页',
        iconPath: `/static/tabs/${theme}/home.png`,
        selectedIconPath: `/static/tabs/${theme}/homeH.png`,
      },
      {
        pagePath: `pages/${project}/education/index`,
        text: '教育',
        iconPath: `/static/tabs/${theme}/education.png`,
        selectedIconPath: `/static/tabs/${theme}/educationH.png`,
      },
      {
        pagePath: `pages/${project}/culturalRelicList/index`,
        text: '鉴赏',
        iconPath: `/static/tabs/${theme}/collection.png`,
        selectedIconPath: `/static/tabs/${theme}/collectionH.png`,
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
      path: `pages/${project}/education/index`,
      style: {
        disableScroll: true,
        navigationStyle: 'custom',
      },
    },
    {
      path: `pages/${project}/map/index`,
      style: {
        disableScroll: true,
        navigationStyle: 'custom',
      },
    },
    {
      path: `pages/${project}/culturalRelicList/index`,
      style: {
        disableScroll: true,
        navigationStyle: 'custom',
      },
    },
    {
      path: `pages/${project}/culturalRelic/index`,
      style: {
        disableScroll: true,
        navigationStyle: 'custom',
      },
    },
    {
      path: `pages/${project}/pavilion/index`,
      style: {
        disableScroll: true,
        navigationStyle: 'custom',
      },
    },
    {
      path: `pages/${project}/pavilionList/index`,
      style: {
        disableScroll: true,
        navigationStyle: 'custom',
      },
    },
    {
      path: `pages/${project}/pavilionRelic/index`,
      style: {
        disableScroll: true,
        navigationStyle: 'custom',
      },
    },
    {
      path: `pages/${project}/introduction/index`,
      style: {
        navigationStyle: 'custom',
        disableScroll: true,
      },
    },
    {
      path: `pages/${project}/mine/index`,
      style: {
        navigationStyle: 'custom',
        disableScroll: true,
      },
    },
    {
      path: `pages/${project}/exhibition/index`,
      style: {
        navigationBarTitleText: '展览',
        disableScroll: true,
      },
    },
    {
      path: `pages/${project}/exhibitionList/index`,
      style: {
        navigationBarTitleText: '展览列表',
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
      path: `pages/baoquan/notice/index`,
      style: {
        navigationBarTitleText: '公告详情',
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
      path: `pages/common/myCollect/index`,
      style: {
        navigationBarTitleText: '我的收藏',
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
      path: `pages/common/webLink/index`,
      style: {
        navigationBarTitleText: '外链接',
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
      ],
    },
  ],
}
