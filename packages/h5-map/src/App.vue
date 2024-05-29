<script setup>
import { initHttp } from './api/request'
import 'vant/es/toast/style'

// import { RouterView } from 'vue-router'
onMounted(() => {
  initHttp()
})
</script>

<template>
  <RouterView />
</template>

<style>
* {
  padding: 0;
  margin: 0;
}
html,
body {
  height: 100%;
}

.amap-logo {
  opacity: 0 !important;
}
.amap-copyright {
  opacity: 0 !important;
}
.amap-marker-label {
  border: 0 !important;
  padding: 0;
  background: none;
}
.siyuan_st {
  font-family: 'Source Han Serif CN VF';
}
.siyuan_ht {
  font-family: 'Source Han Sans Regular';
}
</style>
