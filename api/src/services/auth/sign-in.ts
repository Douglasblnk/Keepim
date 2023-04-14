import type { SignInSchemaBody } from '@functions/auth/sign-in/schema'
import { signInResponseDto } from '@dto/auth'
import validateUser from './validate-user'
import createSession from './create-session'
import createAccessToken from './create-access-token'

const signIn = async (signInSchema: SignInSchemaBody) => {
  const user = await validateUser(signInSchema.username, signInSchema.password)
  const session = await createSession(user)
  const accessToken = await createAccessToken(session.refreshToken)

  return signInResponseDto({
    accessToken,
    refreshToken: session.refreshToken,
    user,
  })
}

export default signIn
