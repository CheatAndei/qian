import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import QuizPage from '../pages/QuizPage.vue'
import ResultPage from '../pages/ResultPage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/quiz', component: QuizPage },
  { path: '/result', component: ResultPage }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
