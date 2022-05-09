import useRequest from '@/composables/use-axios'
import { removeAccess } from '@/routes/index'

export function getToken() {
  return localStorage.getItem('token')
}

export function setToken(token) {
  localStorage.setItem('token', token)
}

export function removeToken() {
  localStorage.removeItem('token')
}

export async function validateToken(router) {
  const { name } = router.value

  if (name === 'index')
    return

  const { useAxios } = useRequest()

  const { data, error } = await useAxios('validate-token')
    .post({
      data: { token: `Bearer ${ getToken() }` },
    })

  if (!data && error)
    removeAccess()
}
