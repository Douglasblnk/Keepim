import type { GetObjectCommandInput } from '@aws-sdk/client-s3'
import { GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import s3Client from 'src/storage'

export default async (photos: string[], bucket: string) => {
  if (!photos || !photos.length)
    return []

  const client = s3Client()

  return Promise.all(photos.map(async (file) => {
    const params: GetObjectCommandInput = {
      Bucket: bucket,
      Key: file,
    }

    const command = new GetObjectCommand(params)

    return getSignedUrl(client, command, { expiresIn: 3600 })
  }))
}
