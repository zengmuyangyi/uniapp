import 'uno.css'
import { createSSRApp } from 'vue'
import store from '@/store'
import App from './App.vue'
import uView from 'vk-uview-ui'

export function createApp() {
  const app = createSSRApp(App)
  app.use(store)
  app.use(uView)
  return {
    app,
  }
}
