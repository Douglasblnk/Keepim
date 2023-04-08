import type { APIGatewayProxyEvent } from 'aws-lambda'
import { lambdaErrorResponse, lambdaOKResponse, middyfy } from '@utils/lambda'
import { getUserById } from '@service/user'

const handler = async (event: APIGatewayProxyEvent) => {
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
