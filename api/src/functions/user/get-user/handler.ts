import { lambdaErrorResponse, lambdaOKResponse, middyfy } from '@utils/lambda'
import { getUserById } from '@service/user'
import type { CustomAPIGatewayProxyEvent } from '@utils/api-gateway'
import type { UserSchemaParams } from './schema'

const handler = async (event: CustomAPIGatewayProxyEvent<any, UserSchemaParams>) => {
  try {
    const { id } = event.pathParameters

    const response = await getUserById(id)

    return lambdaOKResponse(response)
  }

  catch (error) {
    return lambdaErrorResponse({ error })
  }
}

export const main = middyfy(handler)
