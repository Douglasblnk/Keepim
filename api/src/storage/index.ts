import { env } from 'node:process'

import { S3Client } from '@aws-sdk/client-s3'

export default function s3Client(): S3Client {
  if (env.IS_OFFLINE) {
    return new S3Client({
      region: 'sa-east-1',
      endpoint: 'http://localhost:4569',
      forcePathStyle: true,
      credentials: {
        accessKeyId: 'S3RVER',
        secretAccessKey: 'S3RVER',
      },
    })
  }

  return new S3Client({ region: 'sa-east-1' })
}
