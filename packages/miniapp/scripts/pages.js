import fs from 'fs'
import path from 'node:path'
import modules from './pages/index.js'
try {
  const projectName = process.env.project || 'default'

  const pagesData = modules[projectName] || modules.default

  const data = {
    easycom: {
      autoscan: true,
      custom: {
        '^n-(.*)': '@/nPro/n-$1/n-$1.vue', // 匹配nPro内的vue文件
        '^u-(.*)': 'vk-uview-ui/components/u-$1/u-$1.vue',
        '^uni-(.*)': '@dcloudio/uni-ui/lib/uni-$1/uni-$1.vue',
      },
    },
    pages: pagesData.pages,
    subPackages: pagesData.subPackages,
    globalStyle: {
      // 竖屏
      pageOrientation: 'portrait',
      navigationBarTextStyle: 'black',
      // "navigationBarTitleText": "",
      backgroundColor: '#fbfbfb',
      // 设置默认的navbar背景色，根据自己的项目更改
      // (mp端页面渲染的时候导航栏处会先出现导航栏的背景色，哪怕你用的是自定义的导航栏)
      navigationBarBackgroundColor: '#FFFFFF',
      // 我们默认会取消掉所有的导航栏，使用自定义的导航栏
      // "navigationStyle": "custom"
    },
    tabBar: pagesData.tabBar,
    condition: {
      //模式配置，仅开发期间生效
      current: 1, //当前激活的模式(list 的索引项)
      list: [
        {
          name: '新闻页', //模式名称
          path: 'pages/common/news/index', //启动页面，必选
          query: 'id=2', //启动参数，在页面的onLoad函数里面得到
        },
        {
          name: '地图', //模式名称
          path: 'pages/common/map/index', //启动页面，必选
          query: '', //启动参数，在页面的onLoad函数里面得到
        },
        {
          name: '新闻列表页', //模式名称
          path: 'pages/common/newsList/index', //启动页面，必选
          query: 'id=21', //启动参数，在页面的onLoad函数里面得到
        },
        {
          name: '景点列表页', //模式名称
          path: 'pages/common/scenicList/index', //启动页面，必选
          query: '', //启动参数，在页面的onLoad函数里面得到
        },
        {
          name: '景点', //模式名称
          path: 'pages/common/scenic/index', //启动页面，必选
          query: '', //启动参数，在页面的onLoad函数里面得到
        },
        {
          name: '天气', //模式名称
          path: 'pages/common/weather/index', //启动页面，必选
          query: '', //启动参数，在页面的onLoad函数里面得到
        },
        {
          name: '相册', //模式名称
          path: 'pages/common/photos/index', //启动页面，必选
          query: '', //启动参数，在页面的onLoad函数里面得到
        },
        {
          name: '我的', //模式名称
          path: 'pages/common/mine/index', //启动页面，必选
          query: '', //启动参数，在页面的onLoad函数里面得到
        },
        {
          name: '个人信息', //模式名称
          path: 'pages/common/userInfo/index', //启动页面，必选
          query: '', //启动参数，在页面的onLoad函数里面得到
        },
        {
          name: '意见反馈', //模式名称
          path: 'pages/common/feedback/index', //启动页面，必选
          query: '', //启动参数，在页面的onLoad函数里面得到
        },
        {
          name: '景区文创', //模式名称
          path: 'pages/common/culture/index', //启动页面，必选
          query: '', //启动参数，在页面的onLoad函数里面得到
        },
        {
          name: '景区文创详情', //模式名称
          path: 'pages/common/culture/detail', //启动页面，必选
          query: 'id=2', //启动参数，在页面的onLoad函数里面得到
        },
        {
          name: '登录', //模式名称
          path: 'pages/common/login/index', //启动页面，必选
          query: '', //启动参数，在页面的onLoad函数里面得到
        },
      ],
    },
  }

  console.log(process.env.NODE_ENV)

  fs.writeFileSync(path.resolve(`src/pages.json`), JSON.stringify(data, null, 4), {
    flag: 'w',
  })
} catch (e) {
  console.log(e)
}
