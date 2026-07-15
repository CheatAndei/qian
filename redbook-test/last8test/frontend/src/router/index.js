import { createRouter, createWebHashHistory } from 'vue-router'
import QuizPage from '../pages/QuizPage.vue'
import ResultPage from '../pages/ResultPage.vue'

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: QuizPage },
    { path: '/result', component: ResultPage },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})
