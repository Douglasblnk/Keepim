import { lambdaErrorResponse, lambdaOKResponse, middyfy } from '@utils/lambda'
import type { CustomAPIGatewayProxyEvent } from '@type/api-gateway'
import { validateAccessToken } from '@service/auth'
import { getAccessToken } from '@utils/auth'
import { errAuthorizationFailed } from '@exceptions/auth-exceptions'

const handler = async (event: CustomAPIGatewayProxyEvent<{}, any>) => {
  try {
    const accessToken = getAccessToken(event)

    if (!accessToken)
      throw errAuthorizationFailed()

    const valid = await validateAccessToken(accessToken)

    return lambdaOKResponse(valid)
  }

  catch (error) {
    console.log('error validate session :>> ', error)
    return lambdaErrorResponse(error)
  }
}

export const main = middyfy(handler)
