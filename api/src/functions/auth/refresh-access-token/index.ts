export default {
  handler: 'src/functions/auth/refresh-access-token/handler.main',
  events: [
    {
      http: {
        method: 'post',
        path: 'refresh-access-token',
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
      Action: [
        'dynamodb:GetItem',
        'dynamodb:UpdateItem',
        'dynamodb:DeleteItem',
      ],
      Resource: 'arn:aws:dynamodb:sa-east-1:531760387770:table/Keepim.Session',
    },
    {
      Effect: 'Allow',
      Action: [
        'dynamodb:Query',
      ],
      Resource: 'arn:aws:dynamodb:sa-east-1:531760387770:table/Keepim.Session/index/session-refresh-token-index',
    },
    {
      Effect: 'Allow',
      Action: ['dynamodb:GetItem'],
      Resource: 'arn:aws:dynamodb:sa-east-1:531760387770:table/Keepim.User',
    },
  ],
}
