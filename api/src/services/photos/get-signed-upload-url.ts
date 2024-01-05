import { env } from 'node:process'

import type { PutObjectCommandInput } from '@aws-sdk/client-s3'
import type { PhotosBodySchema } from '@functions/photos/get-signed-upload-url/schema'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

export default async (data: PhotosBodySchema) => {
  const { collectionName, files, username } = data

  const client = new S3Client({ region: 'sa-east-1' })

  const response = Promise.all(files.map(async (file) => {
    const key = `${username}/${collectionName}/${file.name}`

    const params: PutObjectCommandInput = {
      Bucket: env.COLLECTION_BUCKET_NAME,
      Key: key,
    }

    const command = new PutObjectCommand(params)

    return {
      url: await getSignedUrl(client, command, { expiresIn: 10 }),
      fileName: file.name,
    }
  }))

  return response
}
