export default {
  handler: 'src/functions/collection/delete-collection-photos/handler.main',
  events: [
    {
      http: {
        method: 'delete',
        path: 'collection-photo/{id}',
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
      Action: ['dynamodb:PutItem'],
      Resource: 'arn:aws:dynamodb:sa-east-1:531760387770:table/Keepim.Collection',
    },
    {
      Effect: 'Allow',
      Action: ['dynamodb:GetItem'],
      Resource: 'arn:aws:dynamodb:sa-east-1:531760387770:table/Keepim.Session',
    },
  ],
}
