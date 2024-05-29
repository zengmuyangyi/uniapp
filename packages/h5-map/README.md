# 腾讯地图

[api文档](https://lbs.qq.com/webApi/javascriptGL/glGuide/glOverview)

[demo](https://lbs.qq.com/webDemoCenter/glAPI/glMap/mapTilesloaded)

[轨迹回放](https://lbs.qq.com/webDemoCenter/glAPI/glMarker/markerMoveAlong)

[轨迹回放2](https://lbs.qq.com/webDemoCenter/glAPI/glMarker/markerMoveAlongFollow)

注意有普通版和GL版。两个版本的api不一样

## 自定义图层

https://lbs.qq.com/webApi/javascriptGL/glGuide/glImagetilelayer

# 高德地图

https://lbs.amap.com/api/jsapi-v2/summary/

## 自定义图层

https://lbs.amap.com/api/jsapi-v2/guide/layers/canvaslayer

# 移动端模板

vite+vue3+unocss

# vue\vue-router\vant 全自动按需导入

无需import语句，自动导入所需模块
demo

```vue
<template>
  <main class="w-375"><van-button type="primary">主要按钮</van-button></main>
</template>

<script setup>
const a = ref('1231231')
</script>

```

# vant

https://vant-ui.github.io/vant/v4/#/zh-CN/quickstart

# unocss

https://github.com/unocss/unocss

# 图标库

https://icones.js.org/collection/ic

## 使用: 安装对应图标库

如url 结尾为ic,则对于图标库为 `@iconify-json/ic`

页面中使用对应图标

```html
<span class="i-ic-baseline-access-time-filled"></span>
```

图标默认样式配置见 unocss.config.js

# H5 兼容处理

https://github.com/vitejs/vite/tree/main/packages/plugin-legacy

注意 vite3 对应 plugin-legacy 2.0 以上版本，且需要单独安装 terser
注意 vite2 对应 plugin-legacy 1.0 以上版本

# 折现编辑器

https://lbs.amap.com/demo/jsapi-v2/example/overlay-editor/polyline-editor

# 轨迹回放

https://lbs.amap.com/demo/jsapi-v2/example/marker/replaying-historical-running-data

# webView报错the permission value is offline verifying

https://developers.weixin.qq.com/community/develop/doc/000a24a11e8c786fdf29b6dc659c09?page=1#comment-list
