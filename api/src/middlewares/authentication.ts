import type middy from '@middy/core'
import type { CustomAPIGatewayProxyEvent } from '@type/api-gateway'
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { getAccessToken } from '@utils/auth'
import { validateAccessToken } from '@service/auth'
import { errAuthorizationFailed } from '@exceptions/auth-exceptions'
import { handleAuthMiddlewareError } from '@utils/utils'

const authenticationMiddleware = () => {
  const before: middy.MiddlewareFn<CustomAPIGatewayProxyEvent<any, any>, APIGatewayProxyResult> = async (request) => {
    try {
      const accessToken = getAccessToken(request.event)

      const session = await validateAccessToken(accessToken)

      if (!session)
        throw errAuthorizationFailed()

      request.event.body = {
        ...request.event.body,
        username: session.username,
        sessionId: session.id,
      }
    }

    catch (error) {
      console.log('error authenticationMiddleware :>> ', error)
      throw errAuthorizationFailed()
    }
  }

  const onError: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> = async (request) => {
    return handleAuthMiddlewareError(request.error)
  }

  return {
    before,
    onError,
  }
}

export default authenticationMiddleware
