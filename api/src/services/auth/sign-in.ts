import type { SignInSchemaBody } from '@functions/auth/sign-in/schema'
import { signInResponseDto } from '@dto/auth'
import { findConfigByUsername } from '@repository/config'
import validateUser from './validate-user'
import createSession from './create-session'
import createAccessToken from './create-access-token'

export default async (signInSchema: SignInSchemaBody) => {
  const user = await validateUser(signInSchema.username, signInSchema.password)
  const session = await createSession(user)
  const accessToken = await createAccessToken(session.refreshToken)

  const userConfig = await findConfigByUsername(user.username)

  return signInResponseDto({
    accessToken,
    refreshToken: session.refreshToken,
    userConfig,
    user,
  })
}
