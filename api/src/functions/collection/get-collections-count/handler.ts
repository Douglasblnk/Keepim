import authenticationMiddleware from '@middleware/authentication'
import { checkLambdaEvent, lambdaErrorResponse, lambdaOKResponse } from '@utils/lambda'
import type { CustomAPIGatewayProxyEvent } from '@type/api-gateway'
import { middyfy } from '@middleware/middyfy'
import getCollectionsCount from '@service/collection/get-collections-count'

const handler = async (event: CustomAPIGatewayProxyEvent<{ username?: string }, any>) => {
  try {
    const body = checkLambdaEvent(event.body, ['username'])

    const response = await getCollectionsCount(body.username)

    return lambdaOKResponse(response)
  }

  catch (error) {
    console.log('error get-collections-count :>> ', error)
    return lambdaErrorResponse(error)
  }
}

export const main = middyfy(handler, authenticationMiddleware())
