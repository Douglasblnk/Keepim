import type { AxiosError } from 'axios'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { checkAuthenticationRequest, refreshAccessTokenRequest } from '../datasource/authentication'
import useLocalStorage from '../composables/use-local-storage'
import { parseAxiosError } from './handle-error'
import { notify } from '.'

async function refreshAccessToken(to, next) {
  try {
    await refreshAccessTokenRequest()

    return next()
  }

  catch (error) {
    notify({
      message: 'Sessão expirada. Faça login novamente.',
      type: 'negative',
      timeout: 1000,
    })

    return next({ name: 'login' })
  }
}

export default async function handleRoutes(to: RouteLocationNormalized, prev: RouteLocationNormalized, next: NavigationGuardNext) {
  if (to.path === '/login') {
    const { getStorageState } = useLocalStorage()

    if (getStorageState('user-info'))
      next({ name: prev.name || 'home' })
  }

  if (!to.meta.auth)
    return next()

  try {
    const authenticated = await checkAuthenticationRequest()

    if (authenticated)
      return next()

    return next({ name: 'login' })
  }

  catch (error) {
    const { data } = parseAxiosError(error as AxiosError)

    if (data?.name === 'TokenExpiredError')
      return refreshAccessToken(to, next)

    notify({
      message: 'Sessão expirada. Faça login novamente.',
      type: 'negative',
      timeout: 1000,
    })

    return next({ name: 'login' })
  }
}
