import type { AxiosError } from 'axios'
import { checkAuthenticationRequest, refreshAccessTokenRequest } from '../datasource/authentication'
import { parseAxiosError } from './handle-error'
import { notify } from '.'

async function refreshAccessToken(to, next) {
  try {
    const response = await refreshAccessTokenRequest()
    console.log('response :>> ', response)
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

export default async function handleRoutes(to, next) {
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

    return next({ name: 'login' })
  }
}
