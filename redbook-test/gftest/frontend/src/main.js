import { createApp } from 'vue'
import { Button, Progress, RadioGroup, Radio, Toast, Overlay } from 'vant'
import { MotionPlugin } from '@vueuse/motion'
import { Icon } from '@iconify/vue'
import LottieAnimation from 'vue3-lottie'
import 'vant/lib/index.css'
import App from './App.vue'
import router from './router'
import './style.css'

const app = createApp(App)
app.use(router)
app.use(MotionPlugin)
app.component('Iconify', Icon)
app.component('LottieAnimation', LottieAnimation)
app.use(Button)
app.use(Progress)
app.use(RadioGroup)
app.use(Radio)
app.use(Toast)
app.use(Overlay)
app.mount('#app')
