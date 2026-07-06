import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import ResultPage from '../pages/ResultPage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/result', component: ResultPage }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
