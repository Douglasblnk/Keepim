import { lambdaErrorResponse, lambdaOKResponse, middyfy } from '@utils/lambda'
import type { CustomAPIGatewayProxyEvent } from '@utils/api-gateway'
import { errMissingParams } from '@exceptions/auth-exceptions'
import { signIn } from '@service/auth'
import { serialize } from 'cookie'
import type { SignInSchemaBody } from './schema'

const getBody = (body: SignInSchemaBody) => {
  if (!body.username || !body.password)
    throw errMissingParams()

  return body
}

const handler = async (event: CustomAPIGatewayProxyEvent<SignInSchemaBody, any>) => {
  try {
    const signInSchema = getBody(event.body)

    const { accessToken, user } = await signIn(signInSchema)

    const cookies = serialize('access_token', accessToken.token, { httpOnly: true, secure: true })

    return lambdaOKResponse(user, { 'Set-Cookie': cookies })
  }

  catch (error) {
    console.log('error sign-in :>> ', error)
    return lambdaErrorResponse(error)
  }
}

export const main = middyfy(handler)
