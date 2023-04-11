import { errAuthorizationFailed } from '@exceptions/auth-exceptions'
import { errUserNotFound } from '@exceptions/user-exceptions'
import { findUserByEmail, findUserByUsername } from '@repository/user'
import { compareHash } from '@utils/security'
import { isEmail, isObjectEmpty } from '@utils/utils'

export default async (username: string, password: string) => {
  const user = isEmail(username)
    ? await findUserByEmail(username)
    : await findUserByUsername(username)

  if (isObjectEmpty(user) || user.deleted)
    throw errUserNotFound()

  const passwordMatches = compareHash(user.password, password)

  if (!passwordMatches)
    throw errAuthorizationFailed()

  return user
}
