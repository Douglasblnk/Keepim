import { lambdaOKResponse, middyfy } from '@utils/lambda'
import type { CustomAPIGatewayProxyEvent } from '@type/api-gateway'
import { getAccessToken } from '@utils/auth'
import { validateAccessToken } from '@service/auth'
import { errAuthorizationFailed } from '@exceptions/auth-exceptions'

const handler = async (event: CustomAPIGatewayProxyEvent<any, {}>) => {
  const accessToken = getAccessToken(event)

  const valid = await validateAccessToken(accessToken)

  if (valid !== 'OK')
    throw errAuthorizationFailed()

  return lambdaOKResponse(valid)
}

export const main = middyfy(handler)
