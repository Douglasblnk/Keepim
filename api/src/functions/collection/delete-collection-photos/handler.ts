import authenticationMiddleware from '@middleware/authentication'
import { checkLambdaEvent, lambdaErrorResponse, lambdaOKResponse } from '@utils/lambda'
import type { CustomAPIGatewayProxyEvent } from '@type/api-gateway'
import { middyfy } from '@middleware/middyfy'
import { deleteCollectionPhotos } from '@service/collection'

const handler = async (event: CustomAPIGatewayProxyEvent<{ username?: string }, { id: string }, string[]>) => {
  try {
    const {
      id: collectionId,
      username,
    } = checkLambdaEvent({
      ...event.body,
      ...event.pathParameters,
    }, ['username', 'id'])

    const photoKeys = Object.values(event.queryStringParameters)

    const response = await deleteCollectionPhotos(username, collectionId, photoKeys)

    return lambdaOKResponse(response)
  }

  catch (error) {
    console.log('error update-collection-cover :>> ', error)
    return lambdaErrorResponse(error)
  }
}

export const main = middyfy(handler, authenticationMiddleware())
