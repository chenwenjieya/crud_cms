import './assets/main.css'

import { createApp } from 'vue'
import pinia from './stores/index'
import 'element-plus/dist/index.css'
import '@/style/element-pluse.scss'
import '@/style/index.scss'

import App from './App.vue'
import router from './router'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(pinia)
app.use(router)

app.mount('#app')
