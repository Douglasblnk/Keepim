export default {
  middleware: [
    'src/middlewares/authentication.main',
    {
      then: 'src/functions/collection/create-collection/handler.main',
      catch: 'src/utils/utils.handleError',
    },
  ],
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
