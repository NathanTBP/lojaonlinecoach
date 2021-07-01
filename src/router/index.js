import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/contato',
    name: 'Contato',
    component: () => import('../views/Contato.vue')
  },
  {
    path: '/quem-somos',
    name: 'Quemsomos',
    component: () => import('../views/Quemsomos.vue')
  },
  {
    path: '/produtos',
    name: 'Produtos',
    component: () => import('../views/Produtos.vue')
  },
  {
    path: '/carrinho',
    name: 'Carrinho',
    component: () => import('../views/Carrinho.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
