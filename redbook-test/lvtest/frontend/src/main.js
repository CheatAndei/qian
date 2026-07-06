import { createApp } from 'vue'
import { MotionPlugin } from '@vueuse/motion'
import App from './App.vue'
import router from './router'
import Icon from './components/Icon.vue'
import './style.css'

const app = createApp(App)
app.use(router)
app.use(MotionPlugin)
app.component('Icon', Icon)
app.mount('#app')
