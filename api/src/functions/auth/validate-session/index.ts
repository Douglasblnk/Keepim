export default {
  handler: 'src/functions/auth/validate-session/handler.main',
  events: [
    {
      http: {
        method: 'post',
        path: 'validate-session',
      },
    },
  ],
  iamRoleStatements: [{
    Effect: 'Allow',
    Action: ['dynamodb:Query'],
    Resource: 'arn:aws:dynamodb:sa-east-1:531760387770:table/Keepim.Session',
  }],
}
