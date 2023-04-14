import routes from 'virtual:generated-pages'
import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

export function install(app) {
  app.use(router)
}
