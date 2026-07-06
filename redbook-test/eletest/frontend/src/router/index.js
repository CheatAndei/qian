import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import QuizPage from '../pages/QuizPage.vue'
import ResultPage from '../pages/ResultPage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/quiz', component: QuizPage, meta: { transition: 'fade' } },
  { path: '/result', component: ResultPage, meta: { transition: 'fade' } },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
