import { lambdaErrorResponse, lambdaOKResponse } from '@utils/lambda'
import type { CustomAPIGatewayProxyEvent } from '@type/api-gateway'
import { validateAccessToken } from '@service/auth'
import { getAccessToken } from '@utils/auth'
import { errAuthorizationFailed } from '@exceptions/auth-exceptions'
import { middyfy } from '@middleware/middyfy'

const handler = async (event: CustomAPIGatewayProxyEvent<{}, any>) => {
  try {
    const accessToken = getAccessToken(event)

    if (!accessToken)
      throw errAuthorizationFailed()

    const session = await validateAccessToken(accessToken)

    return lambdaOKResponse(!!session)
  }

  catch (error) {
    console.log('error validate session :>> ', error)
    return lambdaErrorResponse(error)
  }
}

export const main = middyfy(handler)
