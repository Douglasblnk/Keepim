import { errSessionNotFound } from '@exceptions/auth-exceptions'
import { deleteSession, findSessionByID } from '@repository/session'
import { isObjectEmpty } from '@utils/utils'

export default async (sessionId: string) => {
  const session = await findSessionByID(sessionId)

  if (!session || isObjectEmpty(session))
    throw errSessionNotFound()

  await deleteSession(session.id)

  return 'OK'
}
