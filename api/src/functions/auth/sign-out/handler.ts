import { getLambdaBody, lambdaErrorResponse, lambdaOKResponse } from '@utils/lambda'
import type { CustomAPIGatewayProxyEvent } from '@type/api-gateway'
import { signOut } from '@service/auth'
import { middyfy } from '@middleware/middyfy'
import authenticationMiddleware from '@middleware/authentication'
import { serialize } from 'cookie'

const handler = async (event: CustomAPIGatewayProxyEvent<{ sessionId?: string }, any>) => {
  try {
    const body = getLambdaBody(event.body, ['sessionId'])

    const response = await signOut(body.sessionId)

    const cookies = serialize(
      'access_token',
      '',
      {
        httpOnly: true,
        secure: true,
        maxAge: 20000,
      })

    return lambdaOKResponse(response, { 'Set-Cookie': cookies })
  }

  catch (error) {
    console.log('error sign-out :>> ', error)
    return lambdaErrorResponse(error)
  }
}

export const main = middyfy(handler, authenticationMiddleware())
