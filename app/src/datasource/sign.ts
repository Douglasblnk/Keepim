interface SignInBody {
  username: string
  password: string
}

export async function signInRequest(body: SignInBody) {
  const { data } = await axios.post('/sign-in', body, { withCredentials: true })

  return data
}
