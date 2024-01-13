import { env } from 'node:process'

import type { GetObjectCommandInput } from '@aws-sdk/client-s3'
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

export default async (photos: string[]) => {
  if (!photos || !photos.length)
    return []

  const client = new S3Client({ region: 'sa-east-1' })

  return Promise.all(photos.map(async (file) => {
    const params: GetObjectCommandInput = {
      Bucket: env.COLLECTION_BUCKET_NAME,
      Key: file,
    }

    const command = new GetObjectCommand(params)

    return getSignedUrl(client, command, { expiresIn: 3600 })
  }))
}
