export default {
  middleware: [
    'src/functions/middlewares/authentication.main',
    { then: 'src/functions/user/get-user/handler.main' },
    { catch: 'src/utils/utils.handleError' },
  ],
  events: [
    {
      http: {
        method: 'get',
        path: 'user/{id}',
        cors: {
          origin: 'https://keepim.douglasblnk.com',
        },
      },
    },
  ],
  iamRoleStatements: [{
    Effect: 'Allow',
    Action: ['dynamodb:GetItem'],
    Resource: 'arn:aws:dynamodb:sa-east-1:531760387770:table/Keepim.User',
  }],
}
