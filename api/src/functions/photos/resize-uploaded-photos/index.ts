import { env } from 'node:process'

export default {
  handler: 'src/functions/photos/resize-uploaded-photos/handler.main',
  events: [
    {
      s3: {
        bucket: 'douglasblnk-keepim-prod-storage',
        event: 's3:ObjectCreated:*',
        existing: true,
      },
    },
  ],
  memorySize: 1536,
  iamRoleStatements: [
    {
      Effect: 'Allow',
      Action: ['s3:PutObject'],
      Resource: `arn:aws:s3:::${env.COLLECTION_THUMBNAIL_BUCKET_NAME}/*`,
    },
    {
      Effect: 'Allow',
      Action: ['s3:GetObject'],
      Resource: `arn:aws:s3:::${env.COLLECTION_BUCKET_NAME}/*`,
    },
  ],
}
