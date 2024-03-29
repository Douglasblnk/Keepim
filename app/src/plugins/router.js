import routes from 'virtual:generated-pages'
import { createRouter, createWebHistory } from 'vue-router'
import handleRoutes from '../middleware/handle-route-auth'

const { setRouteTransition } = useRouteTransition()

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, prev, next) => {
  const { transition } = to.meta
  const { backTransition } = prev.meta

  setRouteTransition(transition || backTransition)

  return handleRoutes(to, prev, next)
})

export function install(app) {
  app.use(router)
}
