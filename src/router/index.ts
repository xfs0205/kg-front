import { createRouter, createWebHistory } from 'vue-router'
import home from '../components/HomeCover.vue'
import view from '../views/ViewOut.vue'
import time from '../views/TimeOut.vue'
import place from '../views/PlaceOut.vue'
import person from '../views/PersonOut.vue'
import recommend from '../views/RecommendOut.vue'
import answer from '../views/AnswerOut.vue'
import AppLayout from '../components/AppLayout.vue'
import LargeDataScreen from '../components/LargeDataScreen.vue'
import Message from '@/views/Message/MessageView.vue'
import changZheng from '@/views/ToTopic/changZheng/changZheng.vue'
import { useTokenStore } from '@/stores/loginToken'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginUsers/LoginView.vue'),
      meta: { requiresLogin: true }
    },
    {
      path: '/enroll',
      name: 'enroll',
      component: () => import('../views/LoginUsers/EnrollUser.vue')
    },
    {
      path: '/message',
      name: 'message',
      component: Message
    },
    {
      path: '/large/data',
      name: 'largedata',
      component: LargeDataScreen,
	  children:[
		  
	  ]
    },
    {
      path: '/changzheng',
      name: 'changzheng',
      component: changZheng
    },
    {
      path: '/dashboard/:user',
      component: AppLayout,
      children: [
        {
          path: '', // 根路径，相当于首页
          name: 'recommend',
          component: recommend // 默认子路径对应的组件
        },
        {
          path: 'view',
          name: 'view',
          component: view
        },
        {
          path: 'time',
          name: 'time',
          component: time
        },
        {
          path: 'place',
          name: 'place',
          component: place
        },
        {
          path: 'person',
          name: 'person',
          component: person
        },
        {
          path: 'answer',
          name: 'answer',
          component: answer,
          meta: { requiresAuth: true }
        },
        {
          path: 'about',
          name: 'about',
          component: () => import('../views/AboutView.vue')
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'ErrorPage',
      component: () => import('../components/ErrorPage.vue')
    }
  ]
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
router.beforeEach((to, from) => {

  const source = useTokenStore()
  if (to.meta.requiresAuth && (!source.token.access_token)) {
    return {
      path: '/login',
      query: { redirect: to.fullPath },
    }
  }
  // else if(to.name == 'login'){
  //   return {
  //     path: '/login',
  //     query: { redirect: from.fullPath },
  //   }
  // }
})

export default router
