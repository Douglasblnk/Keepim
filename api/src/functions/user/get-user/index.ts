export default {
  handler: 'src/functions/user/get-user/handler.main',
  events: [
    {
      http: {
        method: 'get',
        path: 'user/{id}',
      },
    },
  ],
}
