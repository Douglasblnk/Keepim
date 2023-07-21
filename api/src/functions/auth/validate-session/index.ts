export default {
  handler: 'src/functions/auth/validate-session/handler.main',
  events: [
    {
      http: {
        method: 'post',
        path: 'validate-session',
        cors: {
          origin: 'https://keepim.douglasblnk.com',
          allowCredentials: true,
        },
      },
    },
  ],
  iamRoleStatements: [{
    Effect: 'Allow',
    Action: ['dynamodb:GetItem'],
    Resource: 'arn:aws:dynamodb:sa-east-1:531760387770:table/Keepim.Session',
  }],
}
