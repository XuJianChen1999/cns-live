import { createApp } from 'vue'
import router from './router'
import longpress from './directives/longpress'
import SvgIcon from './components/svg-icon'

import 'vant/es/toast/style'
import './assets/styles/index.css'
import 'virtual:svg-icons-register'

import App from './App.vue'

const app = createApp(App)

app.component('svg-icon', SvgIcon)
app.directive('longpress', longpress)
app.use(router).mount('#app')
