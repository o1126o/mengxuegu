import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 全局样式
import './styles/main.scss'

// 引入组件样式
import 'vant/lib/index.css'

import { Icon } from 'vant'

const app = createApp(App)

app.use(Icon)

app.use(createPinia())
app.use(router)

app.mount('#app')
