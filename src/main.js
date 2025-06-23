import { createApp } from 'vue'
import router from './router'

import 'vant/es/toast/style'
import './assets/styles/index.css'

import App from './App.vue'

const app = createApp(App)
app.use(router).mount('#app')
