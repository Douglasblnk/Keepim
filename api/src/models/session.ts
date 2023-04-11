import { v4 as uuid } from 'uuid'
import { getCurrentDate } from '@utils/utils'

export interface SessionModel {
  id: string
  username: string
  refreshToken: string
  createdAt: number
  updatedAt: number
  deleted: boolean
}

export const createSessionModel = (session: Omit<SessionModel, 'id' | 'createdAt' | 'updatedAt' | 'deleted'>): SessionModel => {
  const currentTimestamp = getCurrentDate()

  return {
    id: uuid(),
    username: session.username,
    refreshToken: session.refreshToken,
    createdAt: currentTimestamp,
    updatedAt: currentTimestamp,
    deleted: false,
  }
}
