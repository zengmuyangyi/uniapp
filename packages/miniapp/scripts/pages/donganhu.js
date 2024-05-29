// 东安湖
const project = 'donganhu'
const theme = 'contracted' // 主题文件夹

// 通用页面
const commonPages = require('../common')
module.exports = {
  tabBar: {
    color: '#595959',
    selectedColor: '#309DDA',
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
        disableScroll: true,
        navigationStyle: 'custom',
      },
    },
    {
      path: `pages/${project}/ticketList/index`,
      style: {
        disableScroll: true,
        navigationBarTitleText: '购票列表',
      },
    },
    ...commonPages,
  ],
}
