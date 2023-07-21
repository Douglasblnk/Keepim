export default {
  handler: 'src/functions/auth/sign-in/handler.main',
  events: [
    {
      http: {
        method: 'post',
        path: 'sign-in',
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
      Resource: 'arn:aws:dynamodb:sa-east-1:531760387770:table/Keepim.User',
    },
    {
      Effect: 'Allow',
      Action: ['dynamodb:Query'],
      Resource: 'arn:aws:dynamodb:sa-east-1:531760387770:table/Keepim.User/index/email-index',
    },
    {
      Effect: 'Allow',
      Action: ['dynamodb:PutItem'],
      Resource: 'arn:aws:dynamodb:sa-east-1:531760387770:table/Keepim.Session',
    },
    {
      Effect: 'Allow',
      Action: ['dynamodb:Query'],
      Resource: 'arn:aws:dynamodb:sa-east-1:531760387770:table/Keepim.Session/index/session-refresh-token-index',
    },
  ],
}
