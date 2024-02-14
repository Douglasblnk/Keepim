import { env } from 'node:process'

import type { PutObjectCommandInput } from '@aws-sdk/client-s3'
import { DeleteObjectCommand } from '@aws-sdk/client-s3'
import s3Client from 'src/storage'

export default async (photos: string[]) => {
  const client = s3Client()

  const { fullSize, thumbnail } = photos.reduce((acc, file) => {
    const fullSize: PutObjectCommandInput = {
      Bucket: env.COLLECTION_BUCKET_NAME,
      Key: file,
    }

    const thumbail: PutObjectCommandInput = {
      Bucket: env.COLLECTION_THUMBNAIL_BUCKET_NAME,
      Key: file,
    }

    const fullCommand = new DeleteObjectCommand(fullSize)
    const thumbnailCommand = new DeleteObjectCommand(thumbail)

    acc.fullSize.push(client.send(fullCommand))
    acc.thumbnail.push(client.send(thumbnailCommand))

    return acc
  }, { fullSize: [], thumbnail: [] })

  return Promise.all([...fullSize, ...thumbnail])
}
