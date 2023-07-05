import routes from 'virtual:generated-pages'
import { createRouter, createWebHistory } from 'vue-router'
import handleRoutes from './auth'

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, _, next) => handleRoutes(to, next))

export function install(app) {
  app.use(router)
}
