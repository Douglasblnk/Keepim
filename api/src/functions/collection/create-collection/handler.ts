import authenticationMiddleware from '@middleware/authentication'
import { getLambdaBody, lambdaErrorResponse, lambdaOKResponse } from '@utils/lambda'
import type { CustomAPIGatewayProxyEvent } from '@type/api-gateway'
import { middyfy } from '@middleware/middyfy'
import createCollection from '@service/collection/create-collection'
import type { CollectionSchemaBody } from './schema'

const handler = async (event: CustomAPIGatewayProxyEvent<CollectionSchemaBody, any>) => {
  try {
    const body = getLambdaBody(event.body, ['collectionDate', 'collectionName', 'username'])

    const response = await createCollection(body)

    return lambdaOKResponse(response)
  }

  catch (error) {
    console.log('error create-collection :>> ', error)
    return lambdaErrorResponse(error)
  }
}

export const main = middyfy(handler, authenticationMiddleware())
