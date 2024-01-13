import { env } from 'node:process'

export default {
  handler: 'src/functions/photos/get-signed-upload-url/handler.main',
  events: [
    {
      http: {
        method: 'post',
        path: 'get-signed-upload-url',
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
      Resource: `arn:aws:dynamodb:sa-east-1:531760387770:table/${env.SESSION_DB_TABLE}`,
    },
    {
      Effect: 'Allow',
      Action: ['s3:PutObject'],
      Resource: `arn:aws:s3:::${env.COLLECTION_BUCKET_NAME}/*`,
    },
  ],
}
