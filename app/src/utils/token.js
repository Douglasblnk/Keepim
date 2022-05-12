import useAxios from '@/composables/use-axios'
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

  const { Post } = useAxios()

  const { data, error } = await Post('validate-token')
    .data({
      token: `Bearer ${ getToken() }`,
    })

  if (!data && error)
    removeAccess()
}
