const commonPages = require('../common')
// 购票页面
const cticketPages = require('../cticket')

// 人生影视城（清涧）
const project = 'luyao'
const theme = 'qingxin' // 主题文件夹

module.exports = {
  tabBar: {
    color: '#999696',
    selectedColor: '#0CAF83',
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
    ...commonPages,
    ...cticketPages,
  ],
}
