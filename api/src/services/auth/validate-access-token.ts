import { errSessionNotFound } from '@exceptions/auth-exceptions'
import { findSessionByID } from '@repository/session'
import { verifyAccessToken } from '@utils/auth'
import { isObjectEmpty } from './../../utils/utils'

export default async (accessToken: string) => {
  const verifiedAccessToken = verifyAccessToken(accessToken)

  const session = await findSessionByID(verifiedAccessToken.sessionID)

  if (isObjectEmpty(session))
    throw errSessionNotFound()

  return 'OK'
}
