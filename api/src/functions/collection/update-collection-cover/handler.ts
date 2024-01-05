import authenticationMiddleware from '@middleware/authentication'
import { checkLambdaEvent, lambdaErrorResponse, lambdaOKResponse } from '@utils/lambda'
import type { CustomAPIGatewayProxyEvent } from '@type/api-gateway'
import { middyfy } from '@middleware/middyfy'
import { updateCollectionCover } from '@service/collection'
import type { CollectionCoverBodySchema } from './schema'

const handler = async (event: CustomAPIGatewayProxyEvent<CollectionCoverBodySchema, any, any>) => {
  try {
    const body = checkLambdaEvent(event.body, ['username', 'coverKey', 'collectionId'])

    const response = await updateCollectionCover(body)

    return lambdaOKResponse(response)
  }

  catch (error) {
    console.log('error update-collection-cover :>> ', error)
    return lambdaErrorResponse(error)
  }
}

export const main = middyfy(handler, authenticationMiddleware())
