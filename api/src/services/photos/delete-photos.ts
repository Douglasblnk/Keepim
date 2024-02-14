import { env } from 'node:process'

import type { PutObjectCommandInput } from '@aws-sdk/client-s3'
import { DeleteObjectCommand } from '@aws-sdk/client-s3'
import s3Client from 'src/storage'

export default async (photos: string[]) => {
  const client = s3Client()
  // TODO remove from thumbnail bucket too
  return Promise.all(photos.map(async (file) => {
    const params: PutObjectCommandInput = {
      Bucket: env.COLLECTION_BUCKET_NAME,
      Key: file,
    }

    const command = new DeleteObjectCommand(params)

    return client.send(command)
  }))
}
