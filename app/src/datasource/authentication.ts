export async function checkAuthentication() {
  const { data } = await axios.post('/validate-session', {}, { withCredentials: true })

  return data
}
