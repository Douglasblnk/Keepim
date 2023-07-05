import { lambdaErrorResponse, middyfy } from '@utils/lambda'
import type { CustomAPIGatewayProxyEvent } from '@utils/api-gateway'

const handler = async (event: CustomAPIGatewayProxyEvent<{}, any>) => {
  try {
    console.log('event.headers :>> ', event.headers)
  }

  catch (error) {
    console.log('error validate session :>> ', error)
    return lambdaErrorResponse(error)
  }
}

export const main = middyfy(handler)
