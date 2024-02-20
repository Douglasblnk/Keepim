import authMiddleware from '@/middleware/auth-middleware'

interface SignInBody {
  username: string
  password: string
}

interface SignInResponse {
  user: {
    email: string
    name: string
    username: string
  }
  userConfig: {
    collectionConfig: {
      fixedCollection: number
    }
    id: string
    username: string
  }
}

export async function signInRequest(body: SignInBody) {
  const { data } = await axios.post<SignInResponse>('/sign-in', body, { withCredentials: true })

  return data
}

export async function signOutRequest() {
  return authMiddleware(async () => {
    const { data } = await axios.post('/sign-out', {}, { withCredentials: true })

    return data
  })
}
