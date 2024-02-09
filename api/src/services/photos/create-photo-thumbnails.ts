import { env } from 'node:process'
import sharp from 'sharp'
import type { GetObjectCommandInput, PutObjectCommandInput } from '@aws-sdk/client-s3'
import { GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'
import s3Client from 'src/storage'

export default async (photoKeys: string[]) => {
  const client = s3Client()

  for (const key of photoKeys) {
    const getParams: GetObjectCommandInput = {
      Bucket: env.COLLECTION_BUCKET_NAME,
      Key: key,
    }

    const getCommand = new GetObjectCommand(getParams)

    const response = await client.send(getCommand)

    const image = await response.Body.transformToByteArray()

    const resizedPhoto = await sharp(image).resize(256).toBuffer()

    const putParams: PutObjectCommandInput = {
      Bucket: env.COLLECTION_THUMBNAIL_BUCKET_NAME,
      Key: key,
      Body: resizedPhoto,
    }

    const putCommand = new PutObjectCommand(putParams)

    await client.send(putCommand)
  }

  return true
}
