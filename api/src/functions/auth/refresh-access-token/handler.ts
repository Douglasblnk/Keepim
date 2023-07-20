import { lambdaErrorResponse, lambdaOKResponse } from '@utils/lambda'
import type { CustomAPIGatewayProxyEvent } from '@type/api-gateway'
import { errAuthorizationFailed } from '@exceptions/auth-exceptions'
import { getAccessToken } from '@utils/auth'
import { refreshAccessToken } from '@service/auth'
import { serialize } from 'cookie'
import { middyfy } from '@middleware/middyfy'

const handler = async (event: CustomAPIGatewayProxyEvent<{}, any>) => {
  try {
    const accessToken = getAccessToken(event)

    if (!accessToken)
      throw errAuthorizationFailed()

    const newAccessToken = await refreshAccessToken(accessToken)

    const cookies = serialize(
      'access_token',
      newAccessToken.token,
      {
        httpOnly: true,
        secure: true,
        maxAge: +process.env.REFRESH_TOKEN_EXPIRATION,
      },
    )

    return lambdaOKResponse('OK', { 'Set-Cookie': cookies })
  }

  catch (error) {
    console.log('error validate session :>> ', error)

    const cookies = serialize(
      'access_token',
      '',
      {
        httpOnly: true,
        secure: true,
        maxAge: 20000,
      })

    return lambdaErrorResponse(error, { 'Set-Cookie': cookies })
  }
}

export const main = middyfy(handler)
