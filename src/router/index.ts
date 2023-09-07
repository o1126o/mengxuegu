import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../views/Layout/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Layout,
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('@/views/Home/index.vue'),
          meta: {
            title: '首页'
          }
        },
        {
          path: '/category',
          name: 'category',
          component: () => import('@/views/Category/index.vue'),
          meta: {
            title: '分类'
          }
        },
        {
          path: '/article',
          name: 'article',
          component: () => import('@/views/Article/index.vue'),
          meta: {
            title: '阅读'
          }
        },
        {
          path: '/question',
          name: 'question',
          component: () => import('@/views/Question/index.vue'),
          meta: {
            title: '问答'
          }
        },
        {
          path: '/my',
          name: 'my',
          component: () => import('@/views/My/index.vue'),
          meta: {
            title: '我的'
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login/index.vue'),
      meta: {
        title: '登录'
      }
    }
  ]
})

export default router
