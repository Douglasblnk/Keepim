export default async function handleRoutes(to, next) {
  if (!to.meta.auth)
    return next()

  const authenticated = await checkAuthentication()

  if (!authenticated)
    return next({ name: 'login' })
}
