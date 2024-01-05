import { env } from 'node:process'

import type { PutObjectCommandInput } from '@aws-sdk/client-s3'
import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3'

export default async (photos: string[]) => {
  const client = new S3Client({ region: 'sa-east-1' })

  return Promise.all(photos.map(async (file) => {
    const params: PutObjectCommandInput = {
      Bucket: env.COLLECTION_BUCKET_NAME,
      Key: file,
    }

    const command = new DeleteObjectCommand(params)

    return client.send(command)
  }))
}
