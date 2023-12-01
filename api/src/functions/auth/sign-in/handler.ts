import { env } from 'node:process'
import { checkLambdaBody, lambdaErrorResponse, lambdaOKResponse } from '@utils/lambda'
import type { CustomAPIGatewayProxyEvent } from '@type/api-gateway'
import { signIn } from '@service/auth'
import { serialize } from 'cookie'
import { middyfy } from '@middleware/middyfy'
import type { SignInSchemaBody } from './schema'

const handler = async (event: CustomAPIGatewayProxyEvent<SignInSchemaBody, any>) => {
  try {
    const signInSchema = checkLambdaBody(event.body, ['username', 'password'])

    const { accessToken, user } = await signIn(signInSchema)

    const cookies = serialize(
      'access_token',
      accessToken.token,
      {
        httpOnly: true,
        secure: true,
        maxAge: +env.REFRESH_TOKEN_EXPIRATION,
        ...(env.IS_OFFLINE ? { sameSite: 'none' } : {}),
      })

    return lambdaOKResponse(user, { 'Set-Cookie': cookies })
  }

  catch (error) {
    console.log('error sign-in :>> ', error)
    return lambdaErrorResponse(error)
  }
}

export const main = middyfy(handler)
