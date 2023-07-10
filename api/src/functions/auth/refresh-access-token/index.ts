export default {
  handler: 'src/functions/auth/refresh-access-token/handler.main',
  events: [
    {
      http: {
        method: 'post',
        path: 'refresh-access-token',
        cors: true,
      },
    },
  ],
  iamRoleStatements: [{
    Effect: 'Allow',
    Action: ['dynamodb:Query'],
    Resource: 'arn:aws:dynamodb:sa-east-1:531760387770:table/Keepim.Session',
  }],
}
