import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Tabs from '../views/Tabs.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/views/PesquisarImovel.vue')
  },
  {
    path: '/list',
    component: () => import('@/views/List.vue')
  },
  {
    path: '/login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/cadastrar-perfil',
    component: () => import('@/views/CadastrarPerfil.vue')
  },
  {
    path: '/cadastrar-imovel',
    component: () => import('@/views/CadastrarImovel.vue')
  },
  {
    path: '/editar-imovel/:id',
    component: () => import('@/views/CadastrarImovel.vue')
  },
  {
    path: '/meus-imoveis',
    component: () => import('@/views/MeusImoveis.vue')
  },
  {
    path: '/pesquisar-imovel',
    component: () => import('@/views/PesquisarImovel.vue')
  },
  {
    path: '/editar-perfil',
    component: () => import('@/views/EditarPerfil.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
