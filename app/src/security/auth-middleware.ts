import { httpCodes } from '@constants/http-codes'
import { router } from '../plugins/router'
import { parseAxiosError } from '@/utils/handle-error'
import { notify } from '@/utils'

export default async function authMiddleware<T = any>(fn: () => Promise<T>) {
  try {
    const response = await fn()

    return response as T
  }

  catch (error) {
    const { status } = parseAxiosError(error)

    if (status === httpCodes.UNAUTHORIZED) {
      try {
        await refreshAccessTokenRequest()

        return authMiddleware(fn)
      }

      catch (err) {
        notify({
          message: 'Sessão expirada. Faça login novamente.',
          type: 'negative',
          timeout: 1000,
        })

        useLocalStorage().deleteStorageState('user-info')
        router.replace({ name: 'login' })
      }
    }
  }
}
