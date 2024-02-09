import { createPhotoThumbnails } from '@service/photos'
import { lambdaErrorResponse, lambdaOKResponse } from '@utils/lambda'
import type { S3Event } from 'aws-lambda'

const handler = async (event: S3Event) => {
  try {
    const s3Records = event.Records

    const photoKeys = s3Records.map(record => record.s3.object.key)

    const response = await createPhotoThumbnails(photoKeys)

    return lambdaOKResponse(response)
  }

  catch (error) {
    console.log('error resize-uploaded-photos :>> ', error)
    return lambdaErrorResponse(error)
  }
}

export const main = handler
