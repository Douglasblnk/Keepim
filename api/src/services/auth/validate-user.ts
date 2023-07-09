import { errAuthorizationFailed } from '@exceptions/auth-exceptions'
import { errUserNotFound } from '@exceptions/user-exceptions'
import { findUserByEmail, findUserByUsername } from '@repository/user'
import { isEmail, isObjectEmpty } from '@utils/utils'
import { compareSync } from 'bcryptjs'

export default async (username: string, password: string) => {
  const user = isEmail(username)
    ? await findUserByEmail(username)
    : await findUserByUsername(username)

  if (isObjectEmpty(user) || user.deleted)
    throw errUserNotFound()

  const passwordMatches = compareSync(password, user.password)

  if (!passwordMatches)
    throw errAuthorizationFailed()

  return user
}
