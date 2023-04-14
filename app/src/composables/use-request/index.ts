import type { AxiosRequestConfig } from 'axios'
import Axios from 'axios'
import { useAxios } from '@vueuse/integrations/useAxios'
import { eventHook } from '@utils/index'
import type { UseAxiosOptions } from '@vueuse/integrations/useAxios'
import type { MaybeRef } from '@vueuse/core'
import type { DatasourceType } from './types'

const baseUrl = computed(() => {
  const { MODE, VITE_BASE_API_URL } = import.meta.env

  if (MODE === 'development')
    return 'http://localhost:3000'

  return VITE_BASE_API_URL
})

const instance = Axios.create({
  baseURL: `${baseUrl.value}/`,
})

export default (datasource: DatasourceType, variables: MaybeRef<any> = {}, config: UseAxiosOptions) => {
  const onDone = eventHook()
  const onError = eventHook()

  const getUri = (vars: any) => {
    if (typeof datasource.uri === 'function')
      return datasource.uri(vars)

    return datasource.uri
  }

  const getParams = (vars: any) => {
    return datasource.params?.(vars)
  }

  const getHeaders = (vars: any) => {
    return datasource.headers?.(vars)
  }

  const getData = (vars: any) => {
    const varsCopy = { ...vars }

    const nonDataVars = Object.keys({ ...getParams(vars), ...getHeaders(vars) })

    for (const nonDataVar of nonDataVars)
      delete varsCopy[nonDataVar]

    return varsCopy
  }

  const {
    abort,
    cancel,
    execute: executeOriginal,
    data,
    error,
    isAborted,
    isCanceled,
    isFinished,
    isLoading,
    response,
  } = useAxios(
    getUri(unref(variables)),
    {
      ...datasource.requestMethod,
      headers: getHeaders(unref(variables)),
      params: getParams(unref(variables)),
    },
    instance,
    { immediate: config?.immediate },
  )

  const executeRequest = (executeUrl?: string | AxiosRequestConfig<any>, options?: AxiosRequestConfig<any>) => {
    const mapConfig = (_data: AxiosRequestConfig<any> | undefined) => {
      return {
        data: getData(_data),
        params: _data?.params || getParams({ ...unref(variables), ..._data }),
        headers: _data?.headers || getHeaders({ ...unref(variables), ..._data }),
      }
    }

    const _url = typeof executeUrl === 'string'
      ? executeUrl
      : getUri(unref(variables)) ?? ''

    const _data = typeof executeUrl === 'object'
      ? executeUrl
      : options

    return executeOriginal(
      _url,
      mapConfig(_data),
    )
  }

  watch(
    () => data.value,
    () => {
      if (data.value !== undefined)
        onDone.trigger(data)
    },
  )

  watch(
    () => error.value,
    () => {
      if (error.value !== undefined)
        onError.trigger(error)
    },
  )

  return {
    abort,
    cancel,
    execute: executeRequest,
    data,
    error,
    isAborted,
    isCanceled,
    isFinished,
    isLoading,
    response,
    onDone: onDone.on,
    onError: onError.on,
  }
}
