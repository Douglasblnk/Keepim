import dayjs from 'dayjs'

import type { SessionModel } from '@model/session'
import { generateRandomText, getCurrentDate, isObjectEmpty } from '@utils/utils'
import { decodeAccessToken } from '@utils/auth'
import { deleteSession, findSessionByID, updateSession } from '@repository/session'
import { errAuthorizationFailed, errSessionNotFound } from '@exceptions/auth-exceptions'
import createAccessToken from './create-access-token'

async function updateCurrentSession(session: SessionModel) {
  const newRefreshToken = generateRandomText(+process.env.REFRESH_TOKEN_LENGTH)
  const expiredAt = getCurrentDate() + +process.env.REFRESH_TOKEN_EXPIRATION

  return updateSession(session.id, newRefreshToken, expiredAt)
}

export default async (accessToken: string) => {
  const decodedAccessToken = decodeAccessToken(accessToken)

  const session = await findSessionByID(decodedAccessToken.sessionID)

  try {
    if (isObjectEmpty(session))
      throw errSessionNotFound()

    const isExpired = dayjs(getCurrentDate()).isAfter(session.expiredAt)

    if (isExpired)
      throw errAuthorizationFailed()

    const newAccessToken = await createAccessToken(session.refreshToken)

    await updateCurrentSession(session)

    return newAccessToken
  }

  catch (error) {
    await deleteSession(session.id)

    throw error
  }
}
