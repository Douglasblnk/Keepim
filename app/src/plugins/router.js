import routes from 'virtual:generated-pages'
import { createRouter, createWebHistory } from 'vue-router'
import handleRoutes from '../utils/auth'

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, prev, next) => handleRoutes(to, prev, next))

export function install(app) {
  app.use(router)
}
