import { AxiosError } from 'axios'

interface RestApiErrorBody {
  error: Record<string, string[]>
  statusCode: number
}

type ApiError = AxiosError<RestApiErrorBody>

export function isApiError(error: unknown): error is ApiError {
  return error instanceof AxiosError && !!error.response && 'error' in error.response.data
}

export function isNetworkError(error: unknown): error is ApiError {
  return error instanceof AxiosError && error.request && error.message === 'Network Error'
}

export function getErrorMsg(error: unknown) {
  if (typeof error === 'string')
    return error

  if (isNetworkError(error))
    return 'Verifique sua conexão e tente novamente'

  if (isApiError(error) && error.response)
    return error.response.data.error

  return 'Ocorreu um erro inesperado.'
}

export function parseAxiosError(error: any) {
  const { data, status } = error.response || {}

  return {
    data,
    status,
  }
}
