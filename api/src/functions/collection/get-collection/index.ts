import { env } from 'node:process'

export default {
  handler: 'src/functions/collection/get-collection/handler.main',
  events: [
    {
      http: {
        method: 'get',
        path: 'collection/{id}',
        cors: {
          origin: 'https://keepim.douglasblnk.com',
          allowCredentials: true,
        },
      },
    },
  ],
  iamRoleStatements: [
    {
      Effect: 'Allow',
      Action: ['dynamodb:GetItem'],
      Resource: `arn:aws:dynamodb:sa-east-1:531760387770:table/${env.COLLECTION_DB_TABLE}`,
    },
    {
      Effect: 'Allow',
      Action: ['dynamodb:GetItem'],
      Resource: `arn:aws:dynamodb:sa-east-1:531760387770:table/${env.SESSION_DB_TABLE}`,
    },
    {
      Effect: 'Allow',
      Action: ['s3:GetObject'],
      Resource: `arn:aws:s3:::${env.COLLECTION_BUCKET_NAME}/*`,
    },
    {
      Effect: 'Allow',
      Action: ['s3:GetObject'],
      Resource: `arn:aws:s3:::${env.COLLECTION_THUMBNAIL_BUCKET_NAME}/*`,
    },
  ],
}
