import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '@/views/IndexView.vue'
import ManagerView from '@/views/ManagerView.vue'
import TestView from '@/views/TestView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: IndexView,
    },
    {
      path: '/manager',
      name: 'manager',
      component: ManagerView,
    },
    {
      path: '/test',
      name: 'test',
      component: TestView,
    }
  ],
})

export default router
