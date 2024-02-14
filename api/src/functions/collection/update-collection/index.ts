import { env } from 'node:process'

export default {
  handler: 'src/functions/collection/update-collection/handler.main',
  events: [
    {
      http: {
        method: 'patch',
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
      Action: ['dynamodb:PutItem'],
      Resource: `arn:aws:dynamodb:sa-east-1:531760387770:table/${env.COLLECTION_DB_TABLE}`,
    },
    {
      Effect: 'Allow',
      Action: ['dynamodb:GetItem'],
      Resource: `arn:aws:dynamodb:sa-east-1:531760387770:table/${env.SESSION_DB_TABLE}`,
    },
  ],
}
