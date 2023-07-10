import { createSessionModel } from '@model/session'
import type { UserModel } from '@model/user'
import { putSession } from '@repository/session'
import { generateRandomText } from '@utils/utils'

export default async (user: UserModel) => {
  const refreshToken = generateRandomText(+process.env.REFRESH_TOKEN_LENGTH)

  const sessionModel = createSessionModel({
    username: user.username,
    refreshToken,
  })

  await putSession(sessionModel)

  return sessionModel
}
