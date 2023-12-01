import authenticationMiddleware from '@middleware/authentication'
import { checkLambdaBody, lambdaErrorResponse, lambdaOKResponse } from '@utils/lambda'
import type { CustomAPIGatewayProxyEvent } from '@type/api-gateway'
import { middyfy } from '@middleware/middyfy'
import { getSignedUploadUrl } from '@service/photos'
import type { PhotosBodySchema } from './schema'

const handler = async (event: CustomAPIGatewayProxyEvent<PhotosBodySchema, any, any>) => {
  try {
    const body = checkLambdaBody(event.body, ['username', 'files', 'collectionName'])

    const response = await getSignedUploadUrl(body)

    return lambdaOKResponse(response)
  }

  catch (error) {
    console.log('error get-signed-upload-url :>> ', error)
    return lambdaErrorResponse(error)
  }
}

export const main = middyfy(handler, authenticationMiddleware())
