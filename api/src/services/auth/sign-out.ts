import { errSessionNotFound } from '@exceptions/auth-exceptions'
import { deleteSession, findSessionByUsername } from '@repository/session'
import { isObjectEmpty } from '@utils/utils'

export default async (username: string) => {
  const session = await findSessionByUsername(username)

  if (!session || isObjectEmpty(session))
    throw errSessionNotFound()

  await deleteSession(session.id)

  return 'OK'
}
