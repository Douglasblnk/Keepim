import authMiddleware from '@/middleware/auth-middleware'

interface SignInBody {
  username: string
  password: string
}

export async function signInRequest(body: SignInBody) {
  const { data } = await axios.post('/sign-in', body, { withCredentials: true })

  return data
}

export async function signOutRequest() {
  return authMiddleware(async () => {
    const { data } = await axios.post('/sign-out', {}, { withCredentials: true })

    return data
  })
}
