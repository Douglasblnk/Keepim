import authenticationMiddleware from '@middleware/authentication'
import { checkLambdaEvent, lambdaErrorResponse, lambdaOKResponse } from '@utils/lambda'
import type { CustomAPIGatewayProxyEvent } from '@type/api-gateway'
import { middyfy } from '@middleware/middyfy'
import { updateCollection } from '@service/collection'

import type {
  UpdateCollectionSchemaBody,
  UpdateCollectionSchemaPathParams,
} from './schema'

const handler = async (event: CustomAPIGatewayProxyEvent<UpdateCollectionSchemaBody, UpdateCollectionSchemaPathParams, any>) => {
  try {
    const body = checkLambdaEvent(event.body, ['username'])
    const params = event.pathParameters

    const response = await updateCollection(body, params.id)

    return lambdaOKResponse(response)
  }

  catch (error) {
    console.log('error update-collection :>> ', error)
    return lambdaErrorResponse(error)
  }
}

export const main = middyfy(handler, authenticationMiddleware())
