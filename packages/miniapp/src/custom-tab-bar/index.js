// 人生影视城（清涧）
const project = 'aqibwg'
const theme = 'aqi' // 主题文件夹
Component({
  data: {
    selected: 0,
    color: '#5D5C5A',
    selectedColor: '#9F6C14',
    borderStyle: 'white',
    list: [
      {
        pagePath: `/pages/${project}/index/index`,
        text: '首页',
        iconPath: `/static/tabs/${theme}/home.png`,
        selectedIconPath: `/static/tabs/${theme}/homeH.png`,
      },
      {
        pagePath: `/pages/${project}/education/index`,
        text: '教育',
        iconPath: `/static/tabs/${theme}/education.png`,
        selectedIconPath: `/static/tabs/${theme}/educationH.png`,
      },
      {
        pagePath: `/pages/${project}/culturalRelicList/index`,
        text: '鉴赏',
        iconPath: `/static/tabs/${theme}/collection.png`,
        selectedIconPath: `/static/tabs/${theme}/collectionH.png`,
      },
      {
        pagePath: `/pages/${project}/mine/index`,
        text: '我的',
        iconPath: `/static/tabs/${theme}/mine.png`,
        selectedIconPath: `/static/tabs/${theme}/mineH.png`,
      },
    ],
  },
  attached() {},
  methods: {
    switchTab(e) {
      // console.log('%%%', e.currentTarget.dataset)
      const data = e.currentTarget.dataset
      const url = data.path

      wx.switchTab({ url: url })
      this.setData({
        selected: data.index,
      })
    },
  },
})
