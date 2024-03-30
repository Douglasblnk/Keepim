import authenticationMiddleware from '@middleware/authentication'
import { checkLambdaEvent, lambdaErrorResponse, lambdaOKResponse } from '@utils/lambda'
import type { CustomAPIGatewayProxyEvent } from '@type/api-gateway'
import { middyfy } from '@middleware/middyfy'
import { updateFavoriteCollection } from '@service/collection'

const handler = async (event: CustomAPIGatewayProxyEvent<{ username: string }, { id: string }, any>) => {
  try {
    const {
      id: collectionId,
      username,
    } = checkLambdaEvent({
      ...event.body,
      ...event.pathParameters,
    }, ['username', 'id'])

    const response = await updateFavoriteCollection(username, collectionId)

    return lambdaOKResponse(response)
  }

  catch (error) {
    console.log('error update-favorite-collection :>> ', error)
    return lambdaErrorResponse(error)
  }
}

export const main = middyfy(handler, authenticationMiddleware())
