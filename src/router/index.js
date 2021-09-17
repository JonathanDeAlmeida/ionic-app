import { createRouter, createWebHistory } from '@ionic/vue-router';
// import Tab2 from '../views/Tab2.vue'
import Tabs from '../views/Tabs.vue'
import MemoriesPage from '../components/MemoriesPage.vue'

const routes = [
  {
    path: '/',
    redirect: '/tabs/tab1'
  },
  {
    path: '/memories',
    component: MemoriesPage
  },
  {
    path: '/memories/:id',
    component: () => import('@/components/MemoriesDetails.vue')
  },
  {
    path: '/tabs/',
    component: Tabs,
    children: [
      {
        path: '',
        redirect: '/tabs/tab1'
      },
      {
        path: 'tab1',
        component: () => import('@/views/Tab1.vue')
      },
      // {
      //   path: 'tab2',
      //   component: () => import('@/views/Tab2.vue')
      // },
      {
        path: 'tab3',
        component: () => import('@/views/Tab3.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
