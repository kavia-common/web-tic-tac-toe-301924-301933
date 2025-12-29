import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import GameView from '../views/GameView.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'game',
    component: GameView,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
