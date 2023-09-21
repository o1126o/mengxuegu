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
    },
    {
      path: `/course/details/:id`,
      name: 'course-details',
      component: () => import('../views/Course/CourseDetails.vue'),
      meta: {
        title: '商品详情'
      }
    },
    {
      path: `/article/details/:id`,
      name: 'article-details',
      component: () => import('../views/Article/ArticleDetail.vue'),
      meta: {
        title: '文章详情'
      }
    },
    {
      path: `/question/details/:id`,
      name: 'question-details',
      component: () => import('../views/Question/QuestionDetail.vue'),
      meta: {
        title: '问答详情'
      }
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/Search/index.vue'),
      meta: {
        title: '搜索'
      }
    },
    {
      path: '/search/input',
      name: 'searchInput',
      component: () => import('../views/Search/SearchInput.vue'),
      meta: {
        title: '搜索页'
      }
    },
    {
      path: '/my/user',
      name: 'user',
      component: () => import('../views/My/MyUser.vue'),
      meta: {
        title: '用户信息'
      }
    },
    {
      path: '/my/order',
      name: 'order',
      component: () => import('../views/My/MyOrder.vue'),
      meta: {
        title: '订单详情'
      }
    },
    {
      path: '/my/study',
      name: 'study',
      component: () => import('../views/My/MyStudy.vue'),
      meta: {
        title: '我的学习'
      }
    },
    {
      path: '/course/course-play/:id',
      name: 'course-play',
      component: () => import('../views/Course/CoursePlay.vue'),
      meta: {
        title: '课程视频'
      }
    },
    {
      path: '/order/confirm-buy',
      name: 'confirm-buy',
      component: () => import('../views/My/MyCount.vue'),
      meta: {
        title: '确认购买'
      }
    },
    {
      path: '/order/order',
      name: 'orders',
      component: () => import('../views/My/MyPrice.vue'),
      meta: {
        title: '支付订单'
      }
    }
  ]
})

export default router
