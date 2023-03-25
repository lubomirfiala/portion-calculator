import { createRouter, createWebHistory } from 'vue-router'
import Calculator from '../views/Calculator.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Calculator',
      component: Calculator,
    },
  ]
})

export default router
