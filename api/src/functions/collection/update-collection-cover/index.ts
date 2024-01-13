export default {
  handler: 'src/functions/collection/update-collection-cover/handler.main',
  events: [
    {
      http: {
        method: 'patch',
        path: 'collection-cover',
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
      Action: ['dynamodb:Update*'],
      Resource: 'arn:aws:dynamodb:sa-east-1:531760387770:table/Keepim.Collection',
    },
    {
      Effect: 'Allow',
      Action: ['dynamodb:GetItem'],
      Resource: 'arn:aws:dynamodb:sa-east-1:531760387770:table/Keepim.Session',
    },
  ],
}
