import authenticationMiddleware from '@middleware/authentication'
import { checkLambdaBody, lambdaErrorResponse, lambdaOKResponse } from '@utils/lambda'
import type { CustomAPIGatewayProxyEvent } from '@type/api-gateway'
import { middyfy } from '@middleware/middyfy'
import { getCollection } from '@service/collection'
import type { CollectionSchemaPathParams } from './schema'

const handler = async (event: CustomAPIGatewayProxyEvent<{ username?: string }, CollectionSchemaPathParams, any>) => {
  try {
    const body = checkLambdaBody(event.body, ['username'])
    const params = event.pathParameters

    const response = await getCollection(body.username, params)

    return lambdaOKResponse(response)
  }

  catch (error) {
    console.log('error get-collection :>> ', error)
    return lambdaErrorResponse(error)
  }
}

export const main = middyfy(handler, authenticationMiddleware())
