import { createApp } from 'vue'
import router from './router'

import SvgIcon from './components/svg-icon'

import 'vant/es/toast/style'
import './assets/styles/index.css'
import 'virtual:svg-icons-register'

import App from './App.vue'

const app = createApp(App)

app.component('svg-icon', SvgIcon)
app.use(router).mount('#app')
