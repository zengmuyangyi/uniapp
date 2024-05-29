// 上犹县园区
const project = 'shangyouxian'
const theme = 'shangyouxian' // 主题文件夹

module.exports = {
  tabBar: {
    color: '#999',
    selectedColor: '#79B872',
    borderStyle: 'white',
    list: [
      {
        pagePath: `pages/${project}/index/index`,
        text: '首页',
        iconPath: `/static/tabs/${theme}/home.png`,
        selectedIconPath: `/static/tabs/${theme}/homeH.png`,
      },
      /*
      {
        pagePath: `pages/${project}/shopping/index`,
        text: '商城',
        iconPath: `/static/tabs/${theme}/shopping.png`,
        selectedIconPath: `/static/tabs/${theme}/shoppingH.png`,
      },
      */
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
        backgroundColor: '#f5f5f5',
      },
    },
    {
      path: `pages/${project}/shopping/index`,
      style: {
        navigationStyle: 'custom',
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
      path: `pages/common/mine/index`,
      style: {
        navigationStyle: 'custom',
        disableScroll: true,
      },
    },
    {
      path: `pages/common/feedback/index`,
      style: {
        navigationBarTitleText: '意见反馈',
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
      path: `pages/common/toPay/index`,
      style: {
        navigationBarTitleText: '支付',
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
    {
      path: `pages/common/news/index`,
      style: {
        navigationBarTitleText: '新闻',
        disableScroll: true,
      },
    },
    {
      path: `pages/common/map/index`,
      style: {
        navigationBarTitleText: '导游导览',
        disableScroll: true,
      },
    },
    {
      path: `pages/common/scenic/index`,
      style: {
        navigationBarTitleText: '景点详情',
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
  ],
  subPackages: [
    {
      root: 'pagesShangyou',
      pages: [
        {
          path: `pages/newsList/index`,
          style: {
            navigationBarTitleText: '上犹文旅',
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
            navigationBarTitleText: '娱乐',
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
