export async function checkAuthenticationRequest() {
  const { data } = await axios.post('/validate-session', {}, { withCredentials: true })

  return data
}

export async function refreshAccessTokenRequest() {
  const { data } = await axios.post('/refresh-access-token', {}, { withCredentials: true })

  return data
}
