import { computed } from 'vue'
import Axios from 'axios'

import { handleAuthorizationError } from '@/utils'

export default function () {
  const baseUrl = computed(() => {
    const { MODE, VITE_BASE_API_URL } = import.meta.env

    if (MODE === 'development')
      return 'http://localhost:3000'
    return VITE_BASE_API_URL
  })

  const handleError = (error) => {
    const { response } = error

    if (!response)
      return error

    const { data, status } = response

    if (status !== 200)
      return { data, status }
  }

  const execute = async (args) => {
    const { path, ...options } = args
    const axiosResponse = {}

    try {
      const response = await Axios(
        `${ baseUrl.value }/${ path }`,
        { ...options },
      )

      axiosResponse.response = response
      axiosResponse.data = response.data
    }
    catch (error) {
      axiosResponse.error = handleAuthorizationError(
        handleError(error),
      )
    }

    return { ...axiosResponse }
  }

  const Get = () => {
    execute({ method: 'GET', ...options, path })
  }

  const Post = () => {
    execute({ method: 'POST', ...options, path })
  }

  const Put = () => {
    execute({ method: 'PUT', ...options, path })
  }

  const Delete = () => {
    execute({ method: 'DELETE', ...options, path })
  }

  return {
    Get,
    Post,
    Put,
    Delete,
  }
}
