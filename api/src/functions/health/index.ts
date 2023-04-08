export default {
  handler: 'src/functions/health/handler.main',
  events: [
    {
      http: {
        method: 'get',
        path: 'health',
      },
    },
  ],
}
