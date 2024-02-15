import authenticationMiddleware from '@middleware/authentication'
import { checkLambdaEvent, lambdaErrorResponse, lambdaOKResponse } from '@utils/lambda'
import type { CustomAPIGatewayProxyEvent } from '@type/api-gateway'
import { middyfy } from '@middleware/middyfy'
import { deleteCollection } from '@service/collection'

const handler = async (event: CustomAPIGatewayProxyEvent<{ username?: string }, { id: string }, string[]>) => {
  try {
    const {
      id: collectionId,
      username,
    } = checkLambdaEvent({
      ...event.body,
      ...event.pathParameters,
    }, ['username', 'id'])

    const response = await deleteCollection(username, collectionId)

    return lambdaOKResponse(response)
  }

  catch (error) {
    console.log('error delete-collection :>> ', error)
    return lambdaErrorResponse(error)
  }
}

export const main = middyfy(handler, authenticationMiddleware())
