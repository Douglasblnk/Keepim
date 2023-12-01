import authenticationMiddleware from '@middleware/authentication'
import { checkLambdaBody, lambdaErrorResponse, lambdaOKResponse } from '@utils/lambda'
import type { CustomAPIGatewayProxyEvent } from '@type/api-gateway'
import { middyfy } from '@middleware/middyfy'
import { getCollections } from '@service/collection'
import type { CollectionSchemaQueryString } from './schema'

const handler = async (event: CustomAPIGatewayProxyEvent<{ username?: string }, any, CollectionSchemaQueryString>) => {
  try {
    const body = checkLambdaBody(event.body, ['username'])
    const params = event.queryStringParameters

    const response = await getCollections(body.username, params)

    return lambdaOKResponse(response)
  }

  catch (error) {
    console.log('error get-collections :>> ', error)
    return lambdaErrorResponse(error)
  }
}

export const main = middyfy(handler, authenticationMiddleware())
