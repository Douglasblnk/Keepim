import { lambdaErrorResponse, lambdaOKResponse } from '@utils/lambda'
import { getUserByUsername } from '@service/user'
import type { CustomAPIGatewayProxyEvent } from '@type/api-gateway'
import { middyfy } from '@middleware/middyfy'
import authenticationMiddleware from '@middleware/authentication'
import type { UserSchemaParams } from './schema'

const handler = async (event: CustomAPIGatewayProxyEvent<any, UserSchemaParams>) => {
  try {
    const { id: username } = event.pathParameters

    const response = await getUserByUsername(username)

    return lambdaOKResponse(response)
  }

  catch (error) {
    console.log('error get-user :>> ', error)
    return lambdaErrorResponse({ error })
  }
}

export const main = middyfy(handler, authenticationMiddleware())
