import { removeAccess } from '@/routes/index'

export function getToken() {
  return localStorage.getItem('accessToken')
}

export function setToken(data) {
  const { Token } = data.AccessToken

  localStorage.setItem('accessToken', Token)
  localStorage.setItem('refreshToken', data.RefreshToken)
}

export function removeToken() {
  localStorage.removeItem('accessToken')
}

export async function validateToken(router) {
  const { name } = router.value

  if (name === 'index') { return }

  const { Post } = useRequest()

  const { data, error } = await Post('validate-token')
    .data({
      token: `Bearer ${getToken()}`,
    })
    .execute()

  if (!data && error) { removeAccess() }
}
