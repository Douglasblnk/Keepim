import { env } from 'node:process'
import { v4 as uuid } from 'uuid'
import { getCurrentDate } from '@utils/utils'

export interface SessionModel {
  id: string
  username: string
  refreshToken: string
  expiredAt: number
}

export const createSessionModel = (session: Omit<SessionModel, 'id' | 'expiredAt' | 'deleted'>): SessionModel => {
  const currentTimestamp = getCurrentDate()

  return {
    id: uuid(),
    username: session.username,
    refreshToken: session.refreshToken,
    expiredAt: currentTimestamp + +env.REFRESH_TOKEN_EXPIRATION,
  }
}
