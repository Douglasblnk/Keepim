export default {
  handler: 'src/functions/collection/create-collection/handler.main',
  events: [
    {
      http: {
        method: 'post',
        path: 'collection',
        cors: {
          origin: 'https://keepim.douglasblnk.com',
          allowCredentials: true,
        },
      },
    },
  ],
  iamRoleStatements: [{
    Effect: 'Allow',
    Action: ['dynamodb:PutItem'],
    Resource: 'arn:aws:dynamodb:sa-east-1:531760387770:table/Keepim.Collection',
  }],
}
