export default {
  handler: 'src/functions/collection/get-collections/handler.main',
  events: [
    {
      http: {
        method: 'get',
        path: 'collections',
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
      Action: ['dynamodb:Query'],
      Resource: 'arn:aws:dynamodb:sa-east-1:531760387770:table/Keepim.Collection',
    },
    {
      Effect: 'Allow',
      Action: ['dynamodb:Query'],
      Resource: 'arn:aws:dynamodb:sa-east-1:531760387770:table/Keepim.Collection/index/collection-date-index',
    },
    {
      Effect: 'Allow',
      Action: ['dynamodb:Query'],
      Resource: 'arn:aws:dynamodb:sa-east-1:531760387770:table/Keepim.Collection/index/collection-name-index',
    },
    {
      Effect: 'Allow',
      Action: ['dynamodb:GetItem'],
      Resource: 'arn:aws:dynamodb:sa-east-1:531760387770:table/Keepim.Session',
    },
  ],
}
