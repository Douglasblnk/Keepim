import type { CustomAPIGatewayProxyEvent } from '@type/api-gateway'
import { getAccessToken } from '@utils/auth'
import { validateAccessToken } from '@service/auth'
import { errAuthorizationFailed } from '@exceptions/auth-exceptions'

export const main = async (event: CustomAPIGatewayProxyEvent<any, {}>) => {
  const accessToken = getAccessToken(event)

  const session = await validateAccessToken(accessToken)

  if (!session)
    throw errAuthorizationFailed()

  return session.username
}
