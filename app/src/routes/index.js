import { ref } from 'vue'
import routes from 'virtual:generated-pages'
import { createRouter, createWebHistory } from 'vue-router'

import {
  getToken,
  removeToken,
} from '@/utils/token'

const replace = ref()

export function removeAccess() {
  removeToken()
  return replace.value('/')
}

function hasToken() {
  const token = getToken()

  return !!token
}

function handleIndexPage() {
  return hasToken() && replace.value('home')
}

function handleUncauthRoute() {
  if (hasToken()) { return replace.value('/home') }

  removeAccess()
}

function handleCommonRoutes({ to }) {
  const { meta, name } = to

  if (!name) { return handleUncauthRoute() }

  if (!meta.auth || !hasToken()) { removeAccess() }
}

function handleRoutes({ to, next }) {
  if (to.name === 'index') {
    handleIndexPage()
    return next()
  }

  handleCommonRoutes({ to })
  return next()
}

export default function createRouterInstance() {
  const router = createRouter({
    history: createWebHistory(),
    routes,
  })

  // replace.value = router.replace

  // router.beforeEach((to, from, next) => handleRoutes({ to, next }))

  return router
}
