// 上犹县园区
const project = 'jilinUniversity'
const theme = 'jilinUniversity' // 主题文件夹

module.exports = {
  tabBar: {
    color: '#909090',
    selectedColor: '#0052D9',
    borderStyle: 'white',
    list: [
      {
        pagePath: `pages/${project}/index/index`,
        text: '首页',
        iconPath: `/static/tabs/leifengmuseum/home.png`,
        selectedIconPath: `/static/tabs/${theme}/homeH.png`,
      },
      {
        pagePath: `pages/${project}/resource/index`,
        text: '资源中心',
        iconPath: `/static/tabs/szgbxy/resource.png`,
        selectedIconPath: `/static/tabs/${theme}/resourceH.png`,
      },
      {
        pagePath: `pages/${project}/mine/index`,
        text: '我的',
        iconPath: `/static/tabs/leifengmuseum/mine.png`,
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
      path: `pages/${project}/resource/index`,
      style: {
        navigationBarTitleText: '资源中心',
        disableScroll: false,
      },
    },
    {
      path: `pages/${project}/mine/index`,
      style: {
        navigationBarTitleText: '我的',
        disableScroll: false,
      },
    },
    {
      path: `pages/${project}/courseOnline/index`,
      style: {
        navigationBarTitleText: '线上课程库',
        disableScroll: true,
      },
    },
    {
      path: `pages/${project}/course/index`,
      style: {
        navigationBarTitleText: '课程详情',
        disableScroll: false,
      },
    },
    {
      path: `pages/${project}/courseTraining/index`,
      style: {
        navigationBarTitleText: '集中培训班',
        disableScroll: true,
      },
    },
    {
      path: `pages/${project}/userInfo/index`,
      style: {
        navigationBarTitleText: '个人信息',
        disableScroll: true,
      },
    },
    {
      path: `pages/${project}/changePassword/index`,
      style: {
        navigationBarTitleText: '修改登录密码',
        disableScroll: true,
      },
    },
    {
      path: `pages/${project}/myTraining/list`,
      style: {
        navigationBarTitleText: '我的培训',
        disableScroll: true,
      },
    },
    {
      path: `pages/${project}/myTraining/detail`,
      style: {
        navigationBarTitleText: '培训班详情',
        disableScroll: true,
      },
    },
    {
      path: `pages/${project}/myTraining/schedule`,
      style: {
        navigationBarTitleText: '查看课表',
        disableScroll: false,
      },
    },
    {
      path: `pages/${project}/myTraining/signIn`,
      style: {
        navigationBarTitleText: '我的签到情况',
        disableScroll: false,
      },
    },
    {
      path: `pages/${project}/myTraining/upload`,
      style: {
        navigationBarTitleText: '培训文档上传',
        disableScroll: false,
      },
    },
    {
      path: `pages/${project}/myCourse/index`,
      style: {
        navigationBarTitleText: '我的课程',
        disableScroll: true,
      },
    },
    {
      path: `pages/${project}/login/index`,
      style: {
        navigationStyle: 'custom',
        disableScroll: true,
      },
    },
    {
      path: `pages/${project}/notice/list`,
      style: {
        navigationBarTitleText: '通知公告',
        disableScroll: true,
      },
    },
    {
      path: `pages/${project}/notice/detail`,
      style: {
        navigationBarTitleText: '通知详情',
        disableScroll: true,
      },
    },
    {
      path: `pages/${project}/attendance/index`,
      style: {
        navigationBarTitleText: '签到',
        disableScroll: true,
      },
    },
  ],
}
