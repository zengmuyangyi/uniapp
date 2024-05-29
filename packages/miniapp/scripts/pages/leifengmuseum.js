// 雷锋纪念馆项目
const project = 'leifengmuseum'
const theme = 'leifengmuseum' // 主题文件夹

module.exports = {
  tabBar: {
    color: '#909090',
    selectedColor: '#8B0500',
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
        text: '景区地图',
        iconPath: `/static/tabs/${theme}/map.png`,
        selectedIconPath: `/static/tabs/${theme}/mapH.png`,
      },
      {
        pagePath: `pages/${project}/cultureList/index`,
        text: '文创商城',
        iconPath: `/static/tabs/${theme}/shop.png`,
        selectedIconPath: `/static/tabs/${theme}/shopH.png`,
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
        navigationStyle: 'custom',
        disableScroll: true,
      },
    },
    {
      path: `pages/${project}/newsList/index`,
      style: {
        navigationStyle: 'custom',
        disableScroll: true,
      },
    },
    {
      path: `pages/${project}/lostCenter/index`,
      style: {
        navigationStyle: 'custom',
        disableScroll: true,
      },
    },
    {
      path: `pages/${project}/lostList/index`,
      style: {
        navigationStyle: 'custom',
        disableScroll: true,
      },
    },
    {
      path: `pages/${project}/lostForm/index`,
      style: {
        disableScroll: false,
        navigationBarTitleText: '遗失申请',
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
      path: `pages/${project}/cultureList/index`,
      style: {
        navigationStyle: 'custom',
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
      path: `pages/common/vr/index`,
      style: {
        navigationBarTitleText: 'VR全景导览',
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
      path: `pages/common/scenic/index`,
      style: {
        navigationStyle: 'custom',
        // disableScroll: true,
        navigationBarTextStyle: 'white',
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
      path: `pages/common/news/index`,
      style: {
        navigationBarTitleText: '新闻',
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
      path: `pages/common/login/index`,
      style: {
        navigationBarTitleText: '登录',
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
      path: `pages/common/userInfo/index`,
      style: {
        navigationBarTitleText: '个人信息',
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
}
