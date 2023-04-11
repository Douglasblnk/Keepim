import { lambdaErrorResponse, lambdaOKResponse, middyfy } from '@utils/lambda'
import type { CustomAPIGatewayProxyEvent } from '@utils/api-gateway'
import { errMissingParams } from '@exceptions/auth-exceptions'
import { signIn } from '@service/auth'
import type { SignInSchemaBody } from './schema'

const getBody = (body: SignInSchemaBody) => {
  if (!body.username || !body.password)
    throw errMissingParams()

  return body
}

const handler = async (event: CustomAPIGatewayProxyEvent<SignInSchemaBody, any>) => {
  try {
    const signInSchema = getBody(event.body)

    const response = await signIn(signInSchema)

    return lambdaOKResponse(response)
  }

  catch (error) {
    console.log('error sign-in :>> ', error)
    return lambdaErrorResponse(error)
  }
}

export const main = middyfy(handler)
