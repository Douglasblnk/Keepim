import { lambdaErrorResponse, middyfy } from '@utils/lambda'
import type { CustomAPIGatewayProxyEvent } from '@type/api-gateway'
import type { CollectionSchemaParams } from './schema'

const handler = async (event: CustomAPIGatewayProxyEvent<any, CollectionSchemaParams>) => {
  try {

  }

  catch (error) {
    console.log('error create-collection :>> ', error)
    return lambdaErrorResponse({ error })
  }
}

export const main = middyfy(handler)
