export default {
  handler: 'src/functions/auth/sign-out/handler.main',
  events: [
    {
      http: {
        method: 'post',
        path: 'sign-out',
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
      Resource: 'arn:aws:dynamodb:sa-east-1:531760387770:table/Keepim.Session',
    },
    {
      Effect: 'Allow',
      Action: ['dynamodb:Query'],
      Resource: 'arn:aws:dynamodb:sa-east-1:531760387770:table/Keepim.Session/index/session-username-index',
    },
    {
      Effect: 'Allow',
      Action: ['dynamodb:DeleteItem'],
      Resource: 'arn:aws:dynamodb:sa-east-1:531760387770:table/Keepim.Session',
    },
  ],
}
