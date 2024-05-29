# 测试修改项目名

`packages\miniapp\src\service\util.js`

```
default: {
      const extConfig = serverConfig.project
        ? serverConfig
        : {
            name: isDev ? '清鹤票务测试' : '清鹤票务',
            project: isDev ? 'luyao' : 'luyao',
          }
      return extConfig
    }
```

# 页面跳转统一使用方法

`navigateTo` 方法名已经做了全局自动导入。方法所在文件路径为 `src\service\util.js `

方法自动导入在 vite.config.js 中进行配置。

注意：传入的 url 属性，不需要 `/pages/` 前缀。默认会带上 `/pages/项目定制名/` 。如果 url 包含 `/pages` 字符串，则使用直接使用 url 属性的原始值，不会带上项目和 pages 前置目录

# 注意事项

根目录 scripts 目录的 js 文件。会在项目启动时导入页面相关配置到 `src/pages.json` 如果涉及项目定制。则到该目录进行相应配置的修改。不要直接修改 `src/pages.json` 。由于最后文件打包是根据 pages.json 中配置的页面进行打包。所以通过在项目启动时，修改 pages.json 控制项目定制需要的页面，达到减少项目体积的目的。并解决不同项目定制代码混在一起不好维护的问题。

# 项目定制需要修改的文件

- `src\service\customPageMap.js`

  - 指定需要项目定制的页面路径
  - ```js
    export default {
      default: ['index/index'], // 只需要指定子目录的路径。例如完整路径为 pages/default/index/index。则省略 pages/default
    }
    ```

- `scripts/pages` 目录 新增定制的页面配置文件。

  - 可以配置页面路由和底部 tabbar 的按钮图片及路径。具体设置可参考 default.js。index.js 文件配置了当前目录模块的自动导入。只需要新加文件即可。

- `package.json` 新增开发和打包指令，指定需要的环境变量。

  - project 可以不传，在项目中通过 UNI_PROJECT （在 `vite.config.js`中进行了定义）获取的值默认为 default。
  - `scripts/pages` 目录下的文件就是对不同项目进行的定制页面。文件名和 package.json 中定义的环境变量相互对应。如果未设置，则默认为 default
  - 例如人生影视城的项目定制。定义 project 为 luyao 。则新增下面的开发和打包命令。

    ```
      "dev:mp-weixin_luyao": "cross-env project=luyao uni -p mp-weixin",
      "build:mp-weixin_luyao": "cross-env project=luyao uni build -p mp-weixin",
    ```

    注意这个项目标识仅用于前端开发，和后台返回的项目名可能并不一致。

- `src\static\tabs` 如果有新增的 tabbar 主题。在这里新建对应的 project 环境变量的目录

# 参考配置

https://github.com/ttk-cli/uni-vue3-vite-ts-pinia/blob/main/vite.config.ts

# 云梦山全景

https://a4emcecucew.720yun.com/t/6cvk6y87zqh

# 微信开发者工具

[下载地址](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)

# 组件库文档

[uniapp](https://zh.uniapp.dcloud.io/component/cover-image.html)
[原生程序](https://developers.weixin.qq.com/miniprogram/dev/component/image.html)
[npro-nvue](https://npro.redou.vip/)
[github](https://github.com/uni-kit/npro)

# 高德小程序

[文档](https://lbs.amap.com/api/wx/summary)

# [条件编译](https://uniapp.dcloud.net.cn/tutorial/platform.html#preprocessor)

#ifdef #ifndef #endif 三者的意思

#ifdef 仅在某个平台上使用

#ifndef 在除了这个平台的其他平台上使用(非此平台使用）

#endif 结束条件编译

# unocss 小程序插件

https://github.com/MellowCo/unocss-preset-weapp

地址:https://yjy.elvyoo.com/jqadmin/login
帐号:Hlgz
密码:Hlgz.123

# http 请求

https://github.com/lei-mu/luch-request

# 登录接口调整

https://developers.weixin.qq.com/community/develop/doc/000cacfa20ce88df04cb468bc52801

# 路由页面跳转

https://zh.uniapp.dcloud.io/api/router.html#navigateto

# 富文本

https://github.com/jin-yufeng/mp-html
https://developers.weixin.qq.com/community/develop/article/doc/00002c34fa8a60c86568279fe59413

# 用户授权弹窗

https://juejin.cn/post/6844903816823832589

# H5 demo

台州全域旅游：https://yjy.elvyoo.com/h5/tz/pages/more/index
新密一机游：https://xmwl.dizwzz.com/pages/main/index

# 安全距离问题

https://ask.dcloud.net.cn/question/150842

# H5 兼容处理

https://github.com/vitejs/vite/tree/main/packages/plugin-legacy

注意 vite3 对应 plugin-legacy 2.0 以上版本，且需要单独安装 terser
注意 vite2 对应 plugin-legacy 1.0 以上版本

# 待优化

- [x] 新闻相同 seq 排序，按发表或更新时间排序，新的排在最前面
- [ ] 点赞功能
- [ ] 地图缺少瓦片路径设置、范围设置、背景色、最大最小缩放级别、
- [ ] 景区信息增加 LOGO 设置

# TODO

- [x] 相册
- [x] 我的
- [ ] 全局搜索页
- [x] webview 项目名、语言传参

# 高德地图天气图标对应

https://lbs.amap.com/api/webservice/guide/tools/weather-code/
https://blog.csdn.net/Junan1/article/details/120333032

# 全景域名地址

https://a4emcecucew.720yun.com

## 配置说明

https://www.720yun.com/bbs/article?id=687

# 智能客服

## api 调用模式

创建机器人地址：https://openai.weixin.qq.com/login
开放 API 调取文档：https://developers.weixin.qq.com/doc/aispeech/confapi/INTERFACEDOCUMENT.html

创建机器人 => 选择左侧列表对话配置 => 根据需求创建简单对话或高级技能 => 对话问题完成 => 选择左侧列表的发布管理中的应用绑定 => 选择开放 API => 点击申请即可

## 插件模式(仅微信小程序端可使用)

插件使用的文档地址：https://developers.weixin.qq.com/doc/aispeech/mini_program/introduce.html

1.在微信公众平台【设置】-【第三方设置】-【插件管理】-->添加 wx8c631f7e9f2465e1 插件的使用申请

2.在项目中的 manifest.json 中的 mp-weixin 模块中, 添加 plugins 属性, 再在 pages.json 中使用页面配置 style 属性的 usingComponents 属性即可

3.选择左侧列表的发布管理中的应用绑定 => 小程序 => 小程序插件获取 appID

4.在展示页面使用条件编译，初始化插件

**`<font color=red>`PS:新开项目，需新创建机器人 `</font>`**
