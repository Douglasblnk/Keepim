import { accessTokenDto } from '@dto/auth'
import { errSessionNotFound } from '@exceptions/auth-exceptions'
import { errUserNotFound } from '@exceptions/user-exceptions'
import { findSessionByRefreshToken } from '@repository/session'
import { findUserByUsername } from '@repository/user'
import { sign } from 'jsonwebtoken'

export default async (refreshToken: string) => {
  const session = await findSessionByRefreshToken(refreshToken)

  if (!session.refreshToken)
    throw errSessionNotFound()

  const user = await findUserByUsername(session.username)

  if (!user.username)
    throw errUserNotFound()

  const jwtPayload = {
    username: user.username,
    sessionID: session.id,
  }

  const jwtSecret = process.env.JWT_SECRET
  const jwtExpiration = +process.env.JWT_EXPIRATION_TIME

  const accessToken = sign(jwtPayload, jwtSecret, { expiresIn: jwtExpiration })

  return accessTokenDto(accessToken, jwtExpiration)
}
