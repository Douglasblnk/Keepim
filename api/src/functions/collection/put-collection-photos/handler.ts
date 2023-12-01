import authenticationMiddleware from '@middleware/authentication'
import { checkLambdaBody, lambdaErrorResponse, lambdaOKResponse } from '@utils/lambda'
import type { CustomAPIGatewayProxyEvent } from '@type/api-gateway'
import { middyfy } from '@middleware/middyfy'
import { persistCollectionPhotos } from '@service/collection'
import type { CollectionPhotosBodySchema } from './schema'

const handler = async (event: CustomAPIGatewayProxyEvent<CollectionPhotosBodySchema, any, any>) => {
  try {
    const body = checkLambdaBody(event.body, ['username', 'photos'])

    const response = await persistCollectionPhotos(body)

    return lambdaOKResponse(response)
  }

  catch (error) {
    console.log('error put-collection-photos :>> ', error)
    return lambdaErrorResponse(error)
  }
}

export const main = middyfy(handler, authenticationMiddleware())
