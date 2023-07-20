import { getLambdaBody, lambdaErrorResponse, lambdaOKResponse, middyfy } from '@utils/lambda'
import { joinWithContextUsername } from '@utils/utils'
import type { CustomAPIGatewayProxyEvent } from '@type/api-gateway'
import { createCollection } from '@service/collection'
import type { MiddlewareContext } from '@type/lambda'
import type { CollectionSchemaBody } from './schema'

const handler = async (event: CustomAPIGatewayProxyEvent<CollectionSchemaBody, any>, context: MiddlewareContext) => {
  try {
    const body = getLambdaBody(event.body, ['collectionDate', 'collectionName'])

    const response = await createCollection(joinWithContextUsername(body, context))

    return lambdaOKResponse(response)
  }

  catch (error) {
    console.log('error create-collection :>> ', error)
    return lambdaErrorResponse(error)
  }
}

export const main = middyfy(handler)
